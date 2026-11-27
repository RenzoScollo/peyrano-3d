// Registro de todos los sectores/manzanas modelados a mano (1 archivo por zona = cero conflictos en Git)
import { buildNorteIriondoShell } from './norte_iriondo_shell.js';
import { buildCentroOesteBrunet } from './centro_oeste_brunet.js';
import { buildFestivalMonguillot } from './festival_monguillot.js';
import { buildSurClubesDiablito } from './sur_clubes_diablito.js';
import { buildOesteFerrocarrilRural } from './oeste_ferrocarril_rural.js';
import { buildPlazaSEAgua } from './plaza_se_agua.js';
import { buildManzanaAmfacMalvinas } from './manzana_amfac_malvinas.js';
import { buildSurTerminalQuinta } from './sur_terminal_quinta.js';

export function buildAllBlocks(ctx) {
  buildNorteIriondoShell(ctx);
  buildCentroOesteBrunet(ctx);
  buildFestivalMonguillot(ctx);
  buildSurClubesDiablito(ctx);
  buildOesteFerrocarrilRural(ctx);
  buildPlazaSEAgua(ctx);
  buildManzanaAmfacMalvinas(ctx);
  buildSurTerminalQuinta(ctx);
}
