# Peyrano 3D

Juego web de exploración 3D de **Peyrano, Santa Fe, Argentina**, hecho con [Three.js](https://threejs.org/) en **ES Modules nativos** (sin paso de compilación obligatorio, compatible directo con GitHub Pages o Vite).

👉 **Jugar online:** https://renzoscollo.github.io/peyrano-3d/

## Controles

### A pie
- **WASD / Flechas:** moverse
- **Shift:** correr
- **Espacio:** saltar (con bunnyhop encadenado)
- **Mouse (clic para capturar):** mover cámara
- **Rueda del mouse:** zoom
- **E:** subir / bajar del auto · entrar / salir de la Comuna
- **M:** abrir mapa completo
- **Esc:** pausa / opciones

### En auto
- **W / S:** acelerar / frenar y reversa
- **A / D:** doblar
- **Shift:** turbo (nitro)
- **Espacio:** freno de mano (derrape)
- **F:** cargar nafta (en la Shell)
- **E:** bajar del auto

### Modo Admin
- **F2 / º:** abrir panel Admin (volar con `V`, noclip con `N`, ciclo **Día / Tarde / Noche** con barra de hora y pausa, visor de colisiones, teletransporte y nafta/turbo infinitos).

## Arquitectura del proyecto

- [`index.html`](./index.html) y [`styles/main.css`](./styles/main.css) — Estructura DOM y estilos del HUD, menú, opciones y minimapa.
- [`src/main.js`](./src/main.js) — Punto de entrada que inicializa el motor y arma la escena en orden.
- [`src/core/engine.js`](./src/core/engine.js) — Motor Three.js, `Flat`, `RoadLayer`, `InstancedMesh`, colisiones AABB/OBB, pisos caminables y helpers (`bx`, `addTree`, `signIn`, `extrudePoly`, `makeCar`, etc.).
- `src/data/` — Datos separados del código: `overture.js` (`REAL_BUILDINGS`), `osm.js` (`OSM`) y `polygons.js` (polígonos de exclusión `*_POLY`, rutas rurales y `CAR_OPEN`).
- `src/world/` — Infraestructura y sistemas: `roads.js`, `plazas.js`, `civic.js`, `autofill.js`, `collisions.js` y `daynight.js`.
- `src/blocks/` — Manzanas y cuadras modeladas a mano, **un archivo por sector** para trabajar en equipo sin conflictos en Git:
  - `norte_iriondo_shell.js` · `centro_oeste_brunet.js` · `festival_monguillot.js` · `sur_clubes_diablito.js`
  - `oeste_ferrocarril_rural.js` · `plaza_se_agua.js` · `manzana_amfac_malvinas.js` · `sur_terminal_quinta.js`
- [`src/gameplay/game.js`](./src/gameplay/game.js) — Jugador, auto, físicas/bunnyhop, interior de la Comuna, opciones, minimapa, mapa grande, modo admin y loop principal.

## Ejecutar localmente

Al usar ES Modules nativos, abrilo desde un servidor local (no con doble clic `file://`):

```bash
npx serve .
```

*(o `python -m http.server 8080`, o `npm run vite:dev` si instalás Vite).*
