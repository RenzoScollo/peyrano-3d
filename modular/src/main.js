// Punto de entrada de Peyrano 3D (arquitectura modular)
import { ctx } from './core/engine.js';
import { buildRoads } from './world/roads.js';
import { buildPlazas } from './world/plazas.js';
import { buildCivic } from './world/civic.js';
import { buildAllBlocks } from './blocks/index.js';
import { buildAutofill } from './world/autofill.js';
import { buildMissingCollisions } from './world/collisions.js';
import { initDayNight } from './world/daynight.js';
import { startGame } from './gameplay/game.js';

// 1. Infraestructura base y plazas
buildRoads(ctx);
buildPlazas(ctx);
buildCivic(ctx);

// 2. Manzanas y cuadras modeladas a mano (cada zona en su propio archivo en src/blocks/)
buildAllBlocks(ctx);

// 3. Relleno Overture/OSM, patios/medianeras en lotes restantes, arbolado y anti z-fighting
buildAutofill(ctx);

// 4. Auditoría y generación de colisiones faltantes (AABB + OBB rotadas) antes de fusionar mallas
buildMissingCollisions(ctx);

// 5. Ciclo Día / Tarde / Noche (cielo, sol/luna, estrellas, faroles)
initDayNight(ctx);

// 6. Jugador, auto, interior de la Comuna, HUD, minimapa y loop principal
startGame(ctx);
