# Peyrano 3D

Juego web de exploración 3D de **Peyrano, Santa Fe, Argentina**, hecho en un único archivo HTML con [Three.js](https://threejs.org/).

👉 **Jugar online:** https://renzoscollo.github.io/peyrano-3d/

## Controles

### A pie
- **WASD / Flechas:** moverse
- **Shift:** correr
- **Espacio:** saltar
- **Mouse (clic para capturar):** mover cámara
- **Rueda del mouse:** zoom
- **E:** subir / bajar del auto
- **M:** abrir mapa completo
- **Esc:** pausa / opciones

### En auto
- **W / S:** acelerar / frenar y reversa
- **A / D:** doblar
- **Shift:** turbo (nitro)
- **Espacio:** freno de mano (derrape)
- **F:** cargar nafta
- **E:** bajar del auto

### Modo Admin
- **F2:** abrir panel Admin (volar con `V`, noclip con `N`, teletransporte y nafta/turbo infinitos).

## Ejecutar localmente

### Versión clásica (archivo único)
Solo abrí [index.html](./index.html) en tu navegador (Chrome, Edge o Firefox).

### Versión modular (`modular/`)
👉 **Probar online:** https://renzoscollo.github.io/peyrano-3d/modular/

La carpeta [`modular/`](./modular/) contiene exactamente el mismo pueblo dividido en **ES Modules nativos** (sin paso de compilación obligatorio, compatible directo con GitHub Pages o Vite), manteniendo [`index.html`](./index.html) intacto en la raíz.

#### Estructura de `modular/`
- `modular/index.html` y `modular/styles/main.css` — Estructura DOM y estilos del HUD, menú, opciones y minimapa.
- `modular/src/main.js` — Punto de entrada que inicializa el motor y arma la escena en orden.
- `modular/src/core/engine.js` — Motor Three.js, `Flat`, `RoadLayer`, `InstancedMesh`, colisiones y helpers (`bx`, `addTree`, `signIn`, `extrudePoly`, `makeCar`, etc.).
- `modular/src/data/` — Datos separados del código: `overture.js` (`REAL_BUILDINGS`), `osm.js` (`OSM`) y `polygons.js` (polígonos de exclusión `*_POLY`, rutas rurales y `CAR_OPEN`).
- `modular/src/world/` — Infraestructura y relleno: `roads.js`, `plazas.js`, `civic.js` y `autofill.js`.
- `modular/src/blocks/` — Manzanas y cuadras modeladas a mano, **un archivo por sector** para trabajar en equipo sin conflictos en Git:
  - `norte_iriondo_shell.js` · `centro_oeste_brunet.js` · `festival_monguillot.js` · `sur_clubes_diablito.js`
  - `oeste_ferrocarril_rural.js` · `plaza_se_agua.js` · `manzana_amfac_malvinas.js` · `sur_terminal_quinta.js`
- `modular/src/gameplay/game.js` — Jugador, auto, físicas/bunnyhop, interior de la Comuna, opciones, minimapa, mapa grande, modo admin y loop principal.

#### Cómo correr `modular/` localmente
Al usar ES Modules, abrilo desde un servidor local (no con doble clic `file://`):

```bash
cd modular
npx serve .
```

*(o `python -m http.server 8080`, o `npm run vite:dev` si instalás Vite).*
