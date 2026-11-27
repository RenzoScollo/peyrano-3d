# Peyrano 3D — Versión Modular

Versión modularizada de `peyrano-3d` (ES Modules nativos, sin paso de compilación obligatorio — funciona directo en GitHub Pages o con Vite).

## Estructura

- `index.html` — Estructura DOM del HUD, menú, opciones y minimapa.
- `styles/main.css` — Estilos de la interfaz.
- `src/main.js` — Punto de entrada que arma la escena en orden.
- `src/core/engine.js` — Motor Three.js, `Flat`, `RoadLayer`, `InstancedMesh`, colisiones y helpers (`bx`, `addTree`, `signIn`, etc.).
- `src/data/` — Datos pesados separados del código (`overture.js`, `osm.js`, `polygons.js`).
- `src/world/` — Red vial (`roads.js`), plazas centrales (`plazas.js`), edificios cívicos (`civic.js`) y relleno automático Overture/OSM (`autofill.js`).
- `src/blocks/` — Manzanas y cuadras modeladas a mano, **un archivo por zona** para trabajar de a dos sin conflictos en Git.
- `src/gameplay/game.js` — Jugador, auto, interior de la Comuna, opciones, minimapa, modo admin y loop.

## Cómo probarlo localmente

Al usar ES Modules, abrilo desde un servidor local (no con doble click `file://`):

```bash
npx serve .
```

o con Python:

```bash
python -m http.server 8080
```
