// Polígonos de exclusión de lotes armados a mano, trazas de rutas rurales y rebajes de cordón
// Acceso a Peyrano (traza real curva de OSM, incluye la curva S a ~550 m al NE) y Ruta Provincial 18 (curva real OSM)
const ACC_PTS = [[0,-632.5],[-0.3,-634.3],[-2.3,-1133.0],[-1.2,-1153.7],[0.8,-1162.6],[3.9,-1172.5],[36.3,-1243.1],[47.8,-1272.7],[51.0,-1290.6],[52.7,-1308.4],[53.2,-1327.2],[49.0,-2663.0],[50.5,-2671.7],[54.3,-2680.3],[58.7,-2687.7],[63.8,-2693.5],[68.4,-2697.8]];
const ACC_RAMP_S = [[49.0,-2663.0],[56.2,-2673.4],[62.1,-2677.5],[69.5,-2681.7],[74.0,-2682.8],[78.4,-2682.1],[82.3,-2680.3]];
const ACC_RAMP_N = [[49.0,-2663.0],[48.1,-2676.5],[47.1,-2692.3],[46.9,-2703.4],[45.0,-2713.8],[41.5,-2722.1],[34.6,-2735.8],[29.0,-2744.5]];
const R18_PTS = [[4329.8,-592.0],[2616.8,-1137.4],[1224.5,-1580.9],[1095.4,-1620.0],[1049.2,-1637.9],[1011.1,-1653.7],[966.9,-1676.0],[929.1,-1696.9],[892.9,-1719.8],[855.2,-1746.8],[820.9,-1775.3],[788.8,-1803.8],[761.0,-1834.0],[729.7,-1869.5],[82.3,-2680.3],[68.4,-2697.8],[50.0,-2719.5],[29.0,-2744.5],[-72.4,-2870.8],[-892.7,-3896.1]];
// Zona Cooperativa / Plazoleta del Inmigrante (OSM): RP 20-S de tierra hacia el NO, RP 26-S (pasa junto al cementerio)
const RP20S_PTS = [[-466.6,26.6],[-489.1,16.4],[-579.5,-24.6],[-613.2,-42.6],[-633.3,-55.1],[-649.1,-67.4],[-681.4,-95.6],[-705.6,-119.4],[-726.6,-144.2],[-765.3,-197.3],[-1254.1,-926.1],[-1487,-1270],[-2166.2,-2280.2],[-3188.4,-3804]];
const RP26S_PTS = [[-478.9,66.9],[-737.8,-17.8],[-1180.2,-157.4],[-1330.5,-206.7],[-2166.3,-480.7],[-2755.2,-670.8],[-3129,-796.2]];
const CINCO_ESQ = [[-439.6,-35.8],[-440.2,-43.5]];   // une la curva de Maipú con Dr. Brunet (cruce de 5 esquinas)
const COOP_POLY = [[-492,-82.5],[-492,-12],[-535,-12],[-583,-60],[-583,-98],[-526,-98],[-526,-82.5]];   // predio de la Cooperativa Agríc. Ganad.
const CASA1070_POLY = [[-480, -430], [-434, -430], [-434, -383], [-480, -383]];   // Av. 25 de Mayo 1070 (casa, galería y pileta) + baldío de la esquina de Monguillot + canchita de al lado (armados a mano)
const LAV25_POLY = [[-480, -386], [-449, -386], [-449, -350.4], [-480, -350.4]];   // esquina Av. 25 de Mayo y Bv. Lavalle (lado norte): casa de ladrillo con cipreses y pileta (armada a mano)
const LAV25_E_POLY = [[-449, -386], [-437, -386], [-437, -350.4], [-449, -350.4]];   // Bv. Lavalle lado norte, al lado de la esquina de 25 de Mayo: casa del cartel VENDO (armada a mano)
const ACOPIO_POLY = [[-437.5, -405.5], [-398.5, -405.5], [-398.5, -350.4], [-437.5, -350.4]];   // planta de acopio de Bv. Lavalle y Buenos Aires: galpón, silos y maquinaria (armada a mano)
const BRUNET_IND_POLY = [[-282, -39.5], [-257, -39.5], [-257, -16.5], [-282, -16.5]];   // Dr. Brunet lado sur, de la escuela a la esquina de Bv. Independencia (cerco de piedra, chalet de techo azul, esquina con tuyas)
const ESC_BRUNET_POLY = [[-257, -39.5], [-203, -39.5], [-203, -25.5], [-231, -25.5], [-231, -8], [-257, -8]];   // Escuela Secundaria sobre Dr. Brunet y casas hasta la esquina de Santa Fe (armadas a mano)
const CASA_IRI_POLY = [[-52, -624.5], [-13.5, -624.5], [-13.5, -590], [-52, -590]];   // casa grande de ladrillo de Av. Centenario e Iriondo, enfrente de la Shell (armada a mano)
const CENT_O_BOL_POLY = [[-52, -590], [-13.5, -590], [-13.5, -543], [-52, -543]];   // Av. Centenario lado oeste, de la casa de ladrillo de Iriondo a la esquina de Bolívar (armado a mano)
const CENT_BOL_POLY = [[13.5, -582], [47, -582], [47, -543], [13.5, -543]];   // Av. Centenario lado este, de la Shell a la esquina de Bolívar (casas armadas a mano)
const SHELL_POLY = [[12, -628], [89.5, -628], [89.5, -582], [12, -582]];   // Shell de Av. Centenario e Iriondo y patio de camiones hasta Entre Ríos (armado a mano)
const HOGAR_POLY = [[398, -624.5], [428, -624.5], [436, -629], [479.5, -680], [479.5, -543], [398, -543]];   // cuadra San Juan / Iriondo-RP 10-S / Av. 9 de Julio / Bolívar: Hogar de Ancianos y casas de Bolívar (armada a mano)
// RP 10-S (OSM): sale de Iriondo antes de 9 de Julio, dobla en diagonal, recibe a 9 de Julio y sigue de tierra hasta cruzar la Ruta 18
const RP10S_E = [[412, -632.5], [421, -632.8], [429.8, -636], [437.5, -640.8], [482.3, -694.4], [827.7, -1118.5], [842.5, -1140.7], [849.8, -1158.1], [853.8, -1175], [865.4, -1271.1], [870.8, -1284.9], [878.2, -1296], [1224.5, -1580.9], [1747, -2010.3]];
const IRIONDO_TIERRA = [[419, -632.5], [432, -631.2], [450, -630.6], [468, -631], [481, -632.2], [488, -632.5]];   // callecita de tierra: Iriondo sigue derecho hasta 9 de Julio, entre el Hogar y la diagonal
const NUEVE_JULIO_N =[[487.5, -628], [487.8, -679], [486.8, -684.8], [482.3, -694.4]];   // Av. 9 de Julio pasando Iriondo hasta la RP 10-S
const CASITAS_COOP_POLY =[[-492,-82.5],[-526,-82.5],[-526,-98],[-536,-98],[-536,-135],[-492,-135]];   // casitas al norte del Semillero + galpón gris de techo redondo (armados a mano)
const PLAZA_INM = [[-433.3,-42],[-395.5,-42],[-395.5,-30.5]];   // Plazoleta del Inmigrante (triángulo Dr. Brunet / Maipú / Buenos Aires)
const COOP_FP = [];
const AGUA_POLY = [[105.3, -329.7], [121.2, -329.7], [121.2, -295.8], [105.3, -295.8]];   // lote del tanque de agua potable (Entre Ríos 978 y Bv. Lavalle)
const ESQ_AGUA_POLY = [[63.5, -329.5], [89.6, -329.5], [89.6, -276.5], [63.5, -276.5]];   // casa simétrica de la esquina Bv. Lavalle / Entre Ríos / Plaza SE y lote baldío lindante al sur (enfrente del tanque de agua)
const PLAZA_SE_SUR_POLY = [[13.5, -279.5], [89.6, -279.5], [89.6, -250.5], [13.5, -250.5]];   // mitad sur completa de la manzana de Plaza SE (calle de la plaza, esquina Av. Centenario/San Luis, San Luis y Entre Ríos hasta el baldío)
const QUINTA_POLY = [[-70.4, 95.0], [-95.2, 87.3], [-97, 128], [-78.1, 128]];   // (retirada 5 m de las calles para la cuneta con vereda)   // quinta de la esquina de Maipú (curva) — cercada con enredaderas, invernadero y casetita
const TERM_POLY =[[-56, 150], [15, 150], [15, 176], [-56, 176]];   // Terminal de Ómnibus "Lo del Tío", casita, Almacén de Arébalo y galpón (Av. Centenario y Catamarca, antes de la vía)
const GALP26_POLY = [[-505, 80], [-505, 100.5], [-523.5, 100.5], [-523.5, 80]];   // galpón de ladrillo al arrancar la RP 26-S (entrada con alcantarilla) — se arma aparte
const SANLUIS_E_POLY = [[33.5, -234.5], [90, -234.5], [90, -216], [33.5, -216]];
const ENTRERIOS_O_POLY = [[76, -222.5], [90, -222.5], [90, -153], [76, -153]];
const JUJUY_S_POLY = [[46, -172], [77, -172], [77, -152.5], [46, -152.5]];   // Jujuy (lado sur) entre el galpón de la esquina y Entre Ríos (casas armadas a mano)   // Entre Ríos (lado oeste) entre San Luis y Jujuy (casas armadas a mano)   // San Luis entre el tapial de la esquina de Av. Centenario y Entre Ríos (casas armadas a mano)
const DIABLITO_S_POLY = [[13.5, -125], [36, -125], [36, -50], [13.5, -50]];   // Av. Centenario lado este, de Diablito Bar a la esquina de Dr. Brunet (casas armadas a mano)
const AVC_O_POLY = [[-42, -120], [-13.5, -120], [-13.5, -55.5], [-42, -55.5]];   // Av. Centenario lado oeste, de Jujuy a Dr. Brunet con la Farmacia Ferretti (casas armadas a mano)
const SAGARDUY_POLY = [[-77.5, -409], [-21.5, -409], [-21.5, -400.4], [-77.5, -400.4]];   // calle Sagarduy (tramo norte de la L de la plaza de la Comuna), casas armadas a mano
const BOMB_N_POLY =[[-77.5, -409], [-63.4, -409], [-63.4, -398], [-77.5, -398]];   // sector beige del Cuartel de Bomberos (lado de la plaza)
const MUSEO_POLY =[[-89.6, -372], [-66, -372], [-66, -350.4], [-89.6, -350.4]];   // Museo con su anexo, tanque rojo, fuente y patio con maquinaria (armado a mano)
const CORD_BOMB_POLY =[[-89.6, -409], [-77.5, -409], [-77.5, -398.2], [-89.6, -398.2]];   // Córdoba lado este, casitas crema hasta el Cuartel de Bomberos (armadas a mano)
const MONG_S_POLY =[[-89.6, -429.6], [-34, -429.6], [-34, -409], [-89.6, -409]];   // Monguillot lado sur, del Taller de Mario a la esquina de Córdoba (casas armadas a mano)
const MONG_POLY =[[-38, -429.6], [-13.4, -429.6], [-13.4, -402.4], [-38, -402.4]];   // esquina Av. Centenario y Monguillot (frente a la Comuna): casa de ladrillo, Taller de Mario / tatuajes MatiMarc
const ESCEN_N_POLY =[[41, -429.5], [66.5, -429.5], [66.5, -400.4], [41, -400.4]];   // calle en L de la plaza del escenario, lado norte (baldío a la derecha de la Comuna y casa de la esquina)
const ESCEN_E_POLY = [[63.4, -403], [80, -403], [80, -350.4], [63.4, -350.4]];   // calle en L de la plaza del escenario, lado este (hasta Bv. Lavalle)
const LAV_ER_MONG_POLY = [[66.5, -429.5], [89.6, -429.5], [89.6, -350.5], [66.5, -350.5]];   // mitad este de la manzana del Festival/Comuna: Bv. Lavalle, Entre Ríos y Monguillot (armada a mano)
const CORDOBA_E_POLY =[[-89.6, -114.4], [-70, -114.4], [-70, -80], [-89.6, -80]];   // Córdoba lado este, de Dr. Brunet al Banco Macro (casas armadas a mano)
const BRUNET_S_POLY = [[-89.6, -39.6], [-44, -39.6], [-44, -18], [-89.6, -18]];   // Dr. Brunet lado sur, del playón de Lo del Ariga a la esquina de Córdoba con el Punto Digital (casas armadas a mano)
const ARIGA_POLY =[[-54, -39.6], [-13.4, -39.6], [-13.4, -13], [-54, -13]];   // esquina Av. Centenario y Dr. Brunet (lado sur): vieja estación de servicio con el kiosco "Lo del Ariga" (armada a mano)
const BRUNET_N_POLY =[[-89.6, -80], [-26, -80], [-26, -55.4], [-89.6, -55.4]];   // Dr. Brunet lado norte, de la Ferretti a la esquina de Córdoba (casas armadas a mano)
const MANZANA_BRUNET_POLY = [[-89.6, -137], [-13.5, -137], [-13.5, -55.4], [-89.6, -55.4]];   // manzana completa Dr. Brunet / Av. Centenario / Jujuy / Córdoba (frentes e interior armados a mano)
const JUJUY_N_POLY =[[-60.8, -137], [-13.5, -137], [-13.5, -118], [-60.8, -118]];   // Jujuy lado norte, del Banco Macro a la esquina de Av. Centenario (casas armadas a mano)
const JUJUY_SO_POLY =[[-89.6, -172], [-56.8, -172], [-56.8, -153], [-89.6, -153]];   // Jujuy lado sur, de la Comisaría a la esquina de Córdoba (casas armadas a mano)
const COMISARIA_POLY =[[-57.5, -172], [-40.6, -172], [-40.6, -153], [-57.5, -153]];   // Comisaría sobre Jujuy, al oeste de la Plaza Malvinas (armada a mano)
const CORREO_N_POLY =[[-48, -234.5], [-13.5, -234.5], [-13.5, -187.3], [-48, -187.3]];   // Av. Centenario lado oeste, del Correo a San Luis (casas armadas a mano)
const SANLUIS_SO_POLY = [[-89.6, -234.5], [-19.3, -234.5], [-19.3, -221.5], [-35.0, -221.5], [-35.0, -183.0], [-48.0, -183.0], [-48.0, -172.0], [-71.5, -172.0], [-71.5, -216.5], [-89.6, -216.5]];   // San Luis lado sur (Av. Centenario a Córdoba) + pulmón interno con pileta en L (armado a mano)
const MALV_POLY =[[-47, -185], [-13, -185], [-13, -152.5], [-47, -152.5]];   // Plaza Islas Malvinas (esquina Jujuy y Av. Centenario, lado oeste) + Correo Argentino (Av. Centenario 821)
const CENT_EAST_POLY =[[13, -234.5], [53, -234.5], [53, -152.5], [13, -152.5]];   // Av. Centenario lado este, de la esquina de Jujuy hasta San Luis (incluye lote de naranjos y AMFAC)
const AMFAC_INT_POLY = [[13, -234.5], [90, -234.5], [90, -152.5], [13, -152.5]];   // manzana completa de AMFAC / Peghi / Soc. Italiana (frentes e interior armados a mano)
const ESC186_POLY = [[-89.6, -300], [-55.5, -300], [-55.5, -250.5], [-89.6, -250.5]];   // Escuela Primaria N° 186 + Escuela Taller N° 167 (sin cajas sueltas de Overture en el patio)

// rebajes de cordón: zonas [x0, z0, x1, z1] donde la vereda no frena al auto (entrada a la Shell)
const CAR_OPEN = [[8.8, -624.5, 13.7, -586],
  [-14, -604.6, -8.5, -600.2], [-14, -615, -8.5, -612.2], [-45.6, -629, -41, -624],   // garajes y portón de la casa de ladrillo de enfrente de la Shell
  [-14, -589.8, -8.5, -580.3], [-14, -573, -8.5, -568.6],   // portón verde con la cochera de la casa moderna y portón blanco (Av. Centenario oeste)
  [13.5, -630, 67, -624],   // playón de la Shell abierto sobre Iriondo
  [8.5, -584.9, 13.7, -579.2],   // portón de chapa al lado de la Shell sobre Av. Centenario
  [-214.8, -43.5, -211.6, -39.5], [-253.1, -43.5, -250.1, -39.5], [-266.2, -43.5, -263.2, -39.5],   // portones de Dr. Brunet: chapa blanco cerca de Santa Fe, garaje de la casa blanca y portón de madera   // portón de chapa blanco de Dr. Brunet, cerca de la esquina de Santa Fe
  // portones de garaje / pasillos de autos (sin cordón enfrente): Dr. Brunet lado norte y Av. Centenario lado oeste (Jujuy–Brunet)
  [-72.3, -56, -68.7, -49.5], [-42.8, -56, -39.8, -49.5],
  [-14, -115.3, -8.5, -113.5], [-14, -106.2, -8.5, -103.6], [-14, -99.6, -8.5, -96.8], [-14, -96.4, -8.5, -93.6],
  // playón de la vieja estación "Lo del Ariga" (esquina Av. Centenario y Dr. Brunet, lado sur) y portón del edificio de al lado
  [-31, -44.5, -13.5, -38.5], [-14, -39.5, -8.5, -18.4],
  // portones de Dr. Brunet lado sur (casa rosada, portón de chapa, galpón, esquina del Punto Digital)
  [-43.5, -44.5, -41, -38.5], [-53.9, -44.5, -51.4, -38.5], [-69.9, -44.5, -66.1, -38.5], [-86.1, -44.5, -83.7, -38.5],
  // portones de Córdoba lado este (portón de chapa acanalada, portón marrón, portón de reja del pasillo)
  [-94.5, -80.1, -88.5, -76.4], [-94.5, -83.6, -88.5, -80.8], [-94.5, -87.4, -88.5, -85.5],
  // Monguillot lado sur: garaje metido, galpón grande y portones oxidados
  [-39.5, -434.5, -36, -428.5], [-66.6, -434.5, -48.5, -428.5],
  [-94.5, -419.4, -88.5, -416.6],   // garaje de la casa de tejas sobre Córdoba
  [-462.2, -350.5, -459.2, -347.5],
  [-432, -350.5, -428, -347.5],   // tranquera de la planta de acopio sobre Bv. Lavalle
  [-398.6, -392, -394.5, -386],
  // portones de San Luis lado sur (Peyrano Diesel, chalet, portón de chapa + garaje, casa VENDO)
  [-43.8, -238.5, -36.8, -234.0], [-48.2, -238.5, -44.8, -234.0], [-60.5, -238.5, -54.5, -234.0], [-72.8, -238.5, -69.8, -234.0],
  [424.5, -543.5, 428.5, -539.5], [441, -543.5, 445.5, -539.5], [394.5, -577.5, 398.5, -573.5]];   // portones de la cuadra del Hogar de Ancianos (Bolívar y San Juan)   // tranqueras de la planta de acopio sobre Buenos Aires   // tranquera con camino de ripio de la esquina 25 de Mayo y Bv. Lavalle

export {
  ACC_PTS,
  ACC_RAMP_S,
  ACC_RAMP_N,
  R18_PTS,
  RP20S_PTS,
  RP26S_PTS,
  CINCO_ESQ,
  COOP_POLY,
  CASA1070_POLY,
  LAV25_POLY,
  LAV25_E_POLY,
  ACOPIO_POLY,
  BRUNET_IND_POLY,
  ESC_BRUNET_POLY,
  CASA_IRI_POLY,
  CENT_O_BOL_POLY,
  CENT_BOL_POLY,
  SHELL_POLY,
  HOGAR_POLY,
  RP10S_E,
  IRIONDO_TIERRA,
  NUEVE_JULIO_N,
  CASITAS_COOP_POLY,
  PLAZA_INM,
  COOP_FP,
  AGUA_POLY,
  ESQ_AGUA_POLY,
  PLAZA_SE_SUR_POLY,
  QUINTA_POLY,
  TERM_POLY,
  GALP26_POLY,
  SANLUIS_E_POLY,
  ENTRERIOS_O_POLY,
  JUJUY_S_POLY,
  DIABLITO_S_POLY,
  AVC_O_POLY,
  SAGARDUY_POLY,
  BOMB_N_POLY,
  MUSEO_POLY,
  CORD_BOMB_POLY,
  MONG_S_POLY,
  MONG_POLY,
  ESCEN_N_POLY,
  ESCEN_E_POLY,
  LAV_ER_MONG_POLY,
  CORDOBA_E_POLY,
  BRUNET_S_POLY,
  ARIGA_POLY,
  BRUNET_N_POLY,
  MANZANA_BRUNET_POLY,
  JUJUY_N_POLY,
  JUJUY_SO_POLY,
  COMISARIA_POLY,
  CORREO_N_POLY,
  SANLUIS_SO_POLY,
  MALV_POLY,
  CENT_EAST_POLY,
  AMFAC_INT_POLY,
  ESC186_POLY,
  CAR_OPEN
};
