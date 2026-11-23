# Peyrano 3D — Contexto completo para otro agente de IA

> Resumen de la conversación con Claude (Claude Code, app de escritorio) donde se construyó el juego.
> Leelo entero antes de tocar `index.html`. Idioma del usuario: **español rioplatense** (Argentina).

---

## 1. Qué es el proyecto

Un **juego 3D de un solo jugador, modo historia, en tercera persona**, ambientado en el pueblo real de
**Peyrano** (Departamento Constitución, Santa Fe, Argentina; GPS aprox. `-33.5383, -60.7997`).
Por ahora es un **mapa explorable** (base para después agregar historia/misiones). El usuario es de ahí y conoce
el pueblo: corrige ubicaciones, manda fotos de Street View y mapas dibujados a mano.

- Todo está en **un solo archivo**: `index.html` (Three.js `0.160.0` por importmap desde jsDelivr + addons `BufferGeometryUtils`).
- Se abre con doble click en Chrome/Edge (necesita internet solo para cargar Three.js). No hay build ni servidor.
- Pesa ~250 KB porque incluye datos reales embebidos (OSM + Overture).
- Para probar en la app se usó un servidor PowerShell (`HttpListener`) en `localhost:8123` (`.claude/launch.json` → `serve.ps1`).
- **Copias de seguridad** en la misma carpeta:
  - `index.backup-2026-11-20.html` → antes de implementar el documento de datos reales.
  - `index.backup-antes-overture.html` → antes de reemplazar casas al azar por edificios reales de Overture.
- El usuario también editó el archivo a mano (p. ej. cambió el `<title>` a **"PEYRANO"**): respetar sus cambios, leer el archivo antes de editar.

---

## 2. Controles actuales

| Tecla | A pie | En auto |
|---|---|---|
| WASD / flechas | moverse | acelerar / frenar-reversa / doblar |
| Shift | correr | **turbo** (barra que se gasta en ~4 s y se recarga) |
| Espacio | saltar | **freno de mano → derrape** (deja marcas en el piso) |
| E | subir al auto (a ≤ 6 m) | bajar (si va < ~14 km/h) |
| F | — | cargar nafta (frenado al lado de un surtidor de la Shell) |
| M | mapa grande (con nombres de calles y lugares) | ídem |
| Mouse | cámara (click para capturar, Esc suelta; también arrastrando) | ídem (la cámara se acomoda sola detrás del auto) |
| Rueda | zoom | zoom |
| **º (Backquote) o F2** | **panel ADMIN** (solo para pruebas) | ídem |

**Modo ADMIN** (bloque marcado `===== MODO ADMIN =====` … `===== fin MODO ADMIN =====` + líneas con comentario "ADMIN" en
`updateFoot`, `updateCar` y la cámara; el usuario dijo que **después lo va a sacar**):
volar (V; Espacio sube, C/Ctrl baja), noclip (N), velocidad 5–150 m/s (Shift x3), teletransporte por lista o
**click en el mapa grande**, nafta/turbo infinitos, "traer auto", coordenadas en vivo (x/y/z, a/b, lat/lon).

HUD: cartel azul arriba al centro con **calle y altura real** donde está el jugador (ej. "Av. Centenario 857"),
minimapa circular girado como el satélite (auto = cuadrado rojo), panel del auto (velocidad, nafta, turbo).

---

## 3. Sistema de coordenadas (clave para todo)

La foto/mapa del pueblo tiene la grilla girada ~42°. Se usa una grilla interna **(a, b)** alineada con las cuadras:

- `G = 39` unidades por cuadra; `S = 2.5` m por unidad → **cuadra ≈ 97,5 m**.
- `NA = 10` (a: 0…390), `NB = 13` (b: 0…507). Centro de referencia `CA = 195`, `CB = 253`.
- `W(a,b) = [(a-195)*2.5, (b-253)*2.5]` → mundo Three.js `(x, z)`; `AB(x,z)` es la inversa.
- **Mástil de Plaza Colón** = cruce Av. Centenario × Bv. Lavalle = `W(195,117) = (0, -340)`.
- Puente GPS (calibrado por mínimos cuadrados sobre 189 intersecciones reales de OSM, viene del documento del usuario):
  ```js
  const LAT0 = -33.5315236, LON0 = -60.8021159;
  const DLAT_DA = -0.000019558, DLAT_DB = -0.000020939;
  const DLON_DA =  0.000025655, DLON_DB = -0.000022607;
  // latLonToAB(lat, lon), latLonToXZ(lat, lon), abToLatLon(a, b) ya están en index.html
  ```
- Las **vías del tren (FC Mitre)** parten el pueblo: región **'NE'** (lado grande, b ≤ 390) y **'SO'** (b ≥ 273). Ver `railB(a)`,
  `railDist(a,b)` (+ = lado SO), `region(a,b,margen)`. El trazado `RAIL` ahora es el **real de OSM** (puntas extrapoladas).
- "Norte" en el mundo = `(-0.667, -0.745)` normalizado (constante `R18N`).

### Nomenclador real (OSM) — líneas de la grilla
- **Eje A** (a = i·39), i=0..10: Av. 25 de Mayo, Buenos Aires, **Bv. Independencia**, Santa Fe, **Córdoba**, **Av. Centenario** (principal, i=5),
  Entre Ríos, Mendoza, **Bv. Constitución**, San Juan, Av. 9 de Julio. (i=2 del lado SO se llama "Independencia".)
- **Eje B** (b = j·39), j=0..13: Iriondo, Bolívar, Monguillot, **Bv. Lavalle** (j=3), San Luis, Jujuy, Dr. Brunet, La Rioja, Catamarca,
  Tucumán (SO) / Maipú (NE), Santiago del Estero, **Bv. Gálvez** (j=11), Corrientes, Av. 3 de Febrero.
- Paralelas a las vías: **Bv. Ferrocarril**.
- Numeración: en calles del eje A crece hacia Iriondo (b=0 → 1300, b=117 → 1000, …; lado SO de 400 a 100);
  en calles del eje B crece con a (100 por cuadra). Pares del lado SE / lado de b mayor. Implementado en `streetAt(x,z)`.

---

## 4. Arquitectura de `index.html` (orden aproximado del código)

1. Random con semilla (`rnd`, `R`, `pick`) → el pueblo siempre sale igual.
2. Coordenadas, `RAIL` (OSM), `railB`, `region`, `regionRect`.
3. Renderer/escena, sol con sombras que sigue al jugador, niebla, `logarithmicDepthBuffer`.
4. **`Flat`**: todo lo plano (pasto, calles, veredas, canteros, campos, vías, ríos) en UNA malla con colores por vértice
   (`flat.rect`, `flat.ribbon`, `flat.tri` — corrige el winding solo). Alturas en capas: campos .03, calles .08–.16, veredas .2, canteros .22.
5. **`Inst`** (InstancedMesh): `walls, roofs, trims, darks (puertas/ventanas), trunks, crowns, poles, sleepers, balls, palmTrunks, palmCrowns, bikeWheels`.
6. Colisiones: grilla espacial `CELL=16`, `addCol(x0,z0,x1,z1)`, `overlap()`, `pushOut()`, `insideCol()` (la cámara no atraviesa paredes).
7. Campos alrededor con cortinas de árboles y chacras; `nearRuralRoad()`; constantes `ACC_END`, `R18J`, `R18N`.
8. Vías (balasto, rieles, durmientes) y calles: `segs` generadas por línea de grilla recortadas por las vías; tipos en `ST`:
   - `dirt` (tierra), `dAve` (avenida de tierra **con cantero de pasto y árboles**), `paved` (hormigón claro),
     `pAve` (bulevar pavimentado **con cantero de plantas y cordón amarillo**), `main` (Av. Centenario, cantero central).
   - Av. Centenario: **del mástil hacia las vías: canteros con palmeras**; **hacia el otro lado: fila de bolas blancas** (foto del usuario).
   - Calles paralelas a las vías, pasos a nivel (a=39 y a=195), caminos rurales.
9. Plazas, mástil, edificios del centro (ver §5), acceso, Ruta 18, Shell.
10. Bloque **Datos reales de OSM** (`const OSM = {...}`), bloque **landmarks** (puente GPS, nomenclador, `civic()`, ferrocarril, antena, cementerio).
11. Bloque **edificios reales de Overture** (`const REAL_BUILDINGS = [...]`, `USE_REAL_BUILDINGS = true` → `tryHouse()` retorna sin hacer nada).
12. Casas al azar (`tryHouse`, `lots`) — **desactivadas** por Overture; los árboles de los fondos se siguen generando.
13. Árboles, faroles, build de instancias.
14. Jugador (personaje de bloques animado), **auto** (`makeCar`, física arcade con derrape, turbo, nafta, marcas de derrape), controles, cámara.
15. Minimapa/mapa grande (canvas offscreen `OFF=6400`, `OSC=2` m/px, girado `MAPROT≈41.8°` como el satélite; `mapRoads`, `mapRects`, `mapFields`, `mapLabels`, `mapStreetNames`).
16. Modo ADMIN, loop (`anims[]` para bandera, hamacas, calesita, mesa giratoria, luz de la antena).
- `window.__game = { pos, car, segs, houses, trees, view(pitch, dist, yaw) }` sirve para depurar/teletransportar desde la consola.

Helpers útiles: `group(x,z,ry)` (frente = +z local), `bx(g,x,y0,z,sx,sy,sz,col)` (caja con base en y0), `boxIn`, `cylIn`, `poleIn`,
`gableIn`, `hipIn` (cuatro aguas), `offsetPoly`, `frustumMesh` (mansardas), `signIn/textTex` (carteles con texto en canvas),
`colLocal(g, …)` (colisión + minimapa desde coords locales), `addTree`, `addPalm`, `addBush`, `addFlowers`, `fillPlants`,
`obb`, `inPoly`, `fillPoly`, `extrudePoly`, `inPlaza`, `inYard`, `inOsmPark`, `streetAt`.

---

## 5. Contenido del mapa (lo que pidió el usuario, en orden)

### Centro: "las cuatro plazas" alrededor del mástil (cruce Av. Centenario × Bv. Lavalle)
- Cada plaza ocupa **solo la esquina de su manzana que da al mástil (50×50 m)**; el resto de la manzana es una **L con casas/edificios**.
- Distribución final (después de que el usuario pidió intercambiar en diagonal):
  - **Noroeste (manzana 4,2): máquinas de ejercicio** solo en el medio (piso de goma, 6 máquinas típicas de comuna).
    En su L (calle Córdoba): **Museo de Peyrano** (fachada de piedra, frontón, 2 leones; entrada hacia la plaza) y
    **Bomberos Voluntarios de Peyrano** (ladrillo, portones rojos, entrada por ambos lados).
  - **Noreste (5,2): escenario del Festival Folklórico** con playón de cemento (estructura metálica abierta, techo de chapa),
    acceso de cemento desde la avenida con **arco "Festival Folklórico de Peyrano"**. En su L sobre la avenida: **Comuna de Peyrano**
    (esquina con ochava y entrada en la ochava, verde lima, base de piedra, mansarda gris con cartel, ventanas con rejas, pasto y canteros).
  - **Suroeste (4,3): juegos para niños** (torre con tobogán de tubo azul, hamacas, sube y baja, calesita, arenero).
    En su L: **Iglesia / Parroquia Ntra. Sra. de Luján** (lado que toca la avenida, mirando a la avenida: torre con piedra, cruz, fachada
    blanca con franjas beige) y **Escuela Primaria N°186 "Gral. José de San Martín"** (esquina Córdoba y San Luis, frente sobre Córdoba,
    techos a cuatro aguas gris azulado, patio central con mástil y **portón del patio hacia la plaza de juegos**, reja verde con bicis).
  - **Sureste (5,3): camino en diagonal** que la atraviesa y otro que la rodea.
- **Mástil** en isla redonda en el cruce, con pedestal blanco y bandera argentina animada.
- Bv. Lavalle tiene cantero central con plantas y **letras "PEYRANO"** en la cabecera junto al mástil (lado del Festival).
- Calles del centro de **hormigón claro** (como en Street View); plazas con **plátanos altos** de copa otoñal y palmeras.

### Edificios reales agregados (coordenadas GPS reales vía `civic()` / OSM)
Banco Macro, Correo Argentino, Comisaría 6ta (con patrullero), Farmacia Ferretti, Farmacia Cialoni, Veterinaria Peyrano,
Biblioteca Popular Bartolomé Mitre, Escuela Especial N°2086 (lado SO), **Polideportivo Gral. San Martín** (cancha, tribuna, torres de luz, club).
**Shell Ruano Hnos** (Av. Centenario 1282: a la izquierda apenas entrás al pueblo; marquesina, 2 islas con surtidores, shop, cartel).

### Ferrocarril (FC Mitre)
Vías con trazado real de OSM, desvíos abandonados/en desuso, **Estación Peyrano** en su lugar real (lado SO, a≈84) con andén,
**4 galpones** (forma/orientación real), **6 silos poligonales** (forma real OSM), **batería de 10 silos cilíndricos**, **mesa giratoria**
(corrida 14 m para no pisar la calle paralela). En el predio ferroviario no se generan casas (`inYard`).

### Afueras
**Acceso a Peyrano** (~2 km, sigue a la Av. Centenario hacia el NE) asfaltado, doble línea amarilla, **túnel de árboles** a ambos lados,
**portal "PEYRANO"** (pilar de ladrillo + torre reticulada + cartel verde con letras amarillas) y cartel de 60, empalme con la **Ruta 18**
(norte-sur). Antena de comunicaciones roja y blanca (46 m), **Cementerio** (medidas reales de OSM 97×65 m, tapial, portón, cipreses),
Arroyo del Medio / zanjas / desagües reales, parques y canteros reales, pastizales, campos con chacras.

### Casas
**2021 edificios reales de Overture Maps** (huellas de techos por satélite, release `2026-11-18.0`). Overture no trae alturas en Peyrano →
estimadas (1 piso, más 2 pisos en el centro, galpones 5–7,5 m); techos planos, a dos aguas (tejas) en parte de las casas rectangulares,
chapa en galpones; puerta y ventanas del lado de la calle; colisiones. Se omitieron los que caen sobre calles/plazas/edificios hechos a mano.

---

## 6. Datos externos y herramientas usadas

- **Google Maps** (navegador integrado): satélite para ubicar plazas, escuela, Comuna; Street View solo cargó sobre la avenida
  (se usó el endpoint de miniaturas `streetviewpixels-pa.googleapis.com/v1/thumbnail?panoid=…&yaw=…`). Las fachadas salieron sobre todo de **fotos del usuario**.
- **OpenStreetMap**: los servidores Overpass no respondían desde la PC (error TLS/timeout); se usó `https://api.openstreetmap.org/api/0.6/map?bbox=-60.8200,-33.5500,-60.7880,-33.5250`
  y se convirtió con un script PowerShell (`osm2game.ps1`) → JSON embebido (© colaboradores de OSM, ODbL).
- **Overture Maps** con **DuckDB 2.0.1** (CLI oficial firmado, bajado de GitHub a una carpeta temporal):
  ```sql
  INSTALL httpfs; LOAD httpfs; INSTALL spatial; LOAD spatial; SET s3_region='us-west-2';
  COPY (SELECT id, height, num_floors, class, subtype, roof_shape, ST_AsGeoJSON(geometry) AS geom
        FROM read_parquet('s3://overturemaps-us-west-2/release/2026-11-18.0/theme=buildings/type=building/*', hive_partitioning=1)
        WHERE bbox.xmin > -60.8180 AND bbox.xmax < -60.7820 AND bbox.ymin > -33.5520 AND bbox.ymax < -33.5240)
  TO 'overture_buildings.csv' (HEADER, DELIMITER '|');
  ```
  Convertido con `overture2game.ps1` a `[altura, pisos, clase, [x0,z0,x1,z1,…]]`.
- En Windows PowerShell 5.1 no hay Python ni Node; se usó `curl.exe` y scripts `.ps1`. Para empalmar bloques grandes en `index.html`
  se usó PowerShell con `ReadAllLines`/`WriteAllLines` en UTF-8 sin BOM.
- El documento del usuario `PEYRANO_DATOS_Y_RECURSOS_CLAUDE.md` (en Descargas) tiene la calibración GPS, el nomenclador, el catálogo
  de edificios con coordenadas y recursos gratuitos (Overpass, Overture, AWS Terrain, IDESF, IGN, Mapillary, KartaView, Wikimedia).

---

## 7. Decisiones y cosas a tener en cuenta

- **No hacer relieve**: el terreno de Peyrano varía solo 67–70 m; rehacer piso/calles/física no vale la pena (se le explicó al usuario).
- El usuario a veces **juega en el panel del navegador mientras el agente prueba**: no teletransportar ni recargar su pestaña;
  probar en una pestaña aparte. (Una vez un test movió el auto a la Shell y el usuario reportó "no me deja subir al auto".)
- Antes de cambios grandes, **hacer copia de seguridad** de `index.html` (el usuario lo pidió explícitamente).
- El usuario quiere **fidelidad con la realidad** (Google Maps / Street View / sus fotos) y **un solo archivo** para pasárselo a un amigo.
- La avenida principal (Av. Centenario) **no hay que cambiarla**: el usuario dijo que está bien así.
- No se recrean juegos existentes; todo es original basado en el pueblo real.
- Al compartir: mandar `index.html` (se abre con doble click). No se publicó como página web porque usa nombres reales de instituciones
  (el usuario puede decidir publicarlo).

---

## 8. Pendientes / ideas para seguir

- **Historia / misiones** (el objetivo original: "modo historia"): todavía no hay nada.
- Sacar el **modo ADMIN** cuando el usuario lo pida.
- Revisar en vivo los edificios reales de Overture: puede haber alguno pisando veredas o tapando algo; el usuario puede pasar coordenadas del panel admin.
- Fachadas con más detalle a partir de fotos nuevas (escuela desde San Luis, costado de la Comuna, etc.).
- Lugares sin datos todavía: **Club Atlético Bernardino Rivadavia**, **SAMCo Peyrano** (pedir dirección/fotos al usuario).
- Posibles mejoras: alturas reales de edificios, NPCs, tránsito, ciclo día/noche, sonido, guardado de partida.
