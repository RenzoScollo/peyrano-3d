// Edificios cívicos centrales (Parroquia, Escuela 186, Córdoba×Lavalle, Museo, Bomberos, Comuna, Banco Macro) y parques/arroyo OSM
export function buildCivic(ctx) {
  const {
    AB, BV_FC_NE, CA, CB, G, MX, MZ, OSM, OSM_PARKS, R, ROAD_Y, S, THREE, W, addBush, addCol, addPalm, addTree, bboxOf, bikeWheels, boxIn, bx, canvas, colLocal, cylIn, distToPolyline, extrudePoly, fillPoly, flat, frustumMesh, gableIn, group, hipIn, inPoly, inTownBox, lam, makeCar, mapLabels, mapRects, mapRoads, obb, offsetPoly, osmPts, overlap, pick, plazaRects, poleIn, poles, polyArea, polyCenter, railDist, rnd, scene, shA, shB, signIn, treeSpots, trims
  } = ctx;

// Iglesia: Parroquia Ntra. Sra. de Luján (en el brazo de la L que toca la avenida principal — Street View)
{
  const g = group(-18.5, -264.5, Math.PI/2);
  const WH = '#f5f3ee', CRM = '#d8be92', SALP = '#7a7168', OCH = '#c9a974', TILE = '#d8cebc';
  // Textura de piedra laja poligonal para el pilar izquierdo de la torre
  const stoneTex = (() => {
    const c = document.createElement('canvas'); c.width = 128; c.height = 256; const x = c.getContext('2d');
    x.fillStyle = '#5a5650'; x.fillRect(0, 0, 128, 256);
    const cols = ['#8c8982', '#6a6864', '#b2a692', '#9b7556', '#7d7a74', '#c2b6a2'];
    for (let y = 0; y < 256; y += 18) for (let cx = 0; cx < 128; cx += 24){
      x.fillStyle = cols[(y * 3 + cx) % cols.length];
      x.beginPath(); x.moveTo(cx + 2, y + 2); x.lineTo(cx + 21, y + 3); x.lineTo(cx + 22, y + 15); x.lineTo(cx + 3, y + 16); x.closePath(); x.fill();
    }
    const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; t.wrapS = t.wrapT = THREE.RepeatWrapping; t.repeat.set(1, 5); return t;
  })();
  // Nave principal con techo a dos aguas (techo gris pizarra oscuro como en Street View)
  bx(g, 0, 0, -13.2, 16, 7.0, 22.4, '#f1ece2');
  gableIn(g, 0, 7.0, -13, 24, 3.6, 15.6, '#626870', Math.PI/2);
  // Fachada SUR de la nave (hacia calle San Luis, x = -8.0): 4 paños con pilastras crema, arcos crema en relieve y ventanales arqueados de madera oscura
  {
    const archTex = (() => {
      const c = document.createElement('canvas'); c.width = 512; c.height = 256; const x = c.getContext('2d');
      x.fillStyle = '#f3f1ec'; x.fillRect(0, 0, 512, 256);
      // zócalo grisáceo abajo
      x.fillStyle = '#d4d0c8'; x.fillRect(0, 232, 512, 24);
      // cornisa superior gris clara
      x.fillStyle = '#c8c5be'; x.fillRect(0, 0, 512, 10);
      // 4 paños con pilastras crema, arco semicircular crema y ventana arqueada de madera/vidrio oscuro
      for (let i = 0; i < 4; i++){
        const x0 = i * 128, cx2 = x0 + 64;
        // pilastra izquierda
        x.fillStyle = '#d4bc90'; x.fillRect(x0, 8, 12, 248);
        // arco crema decorativo
        x.strokeStyle = '#d4bc90'; x.lineWidth = 10;
        x.beginPath(); x.arc(cx2, 148, 48, Math.PI, 0); x.stroke();
        // ventana arqueada de madera oscura/vitral
        x.fillStyle = '#4e382b';
        x.beginPath(); x.arc(cx2, 142, 18, Math.PI, 0); x.lineTo(cx2 + 18, 206); x.lineTo(cx2 - 18, 206); x.closePath(); x.fill();
        x.strokeStyle = '#33231a'; x.lineWidth = 2; x.stroke();
        // divisiones finas del vitral
        x.beginPath(); x.moveTo(cx2, 124); x.lineTo(cx2, 206); x.moveTo(cx2 - 18, 165); x.lineTo(cx2 + 18, 165); x.stroke();
      }
      x.fillStyle = '#d4bc90'; x.fillRect(500, 8, 12, 248); // pilastra derecha final
      const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 4; return t;
    })();
    const sWall = new THREE.Mesh(new THREE.PlaneGeometry(19.6, 7.0), lam({ map: archTex }));
    sWall.position.set(-8.03, 3.5, -14.2); sWall.rotation.y = -Math.PI / 2; g.add(sWall);
    // Pilastras en relieve físico + cornisa sobre la pared sur
    bx(g, -8.04, 6.88, -14.2, .16, .22, 19.8, '#d4d0c8');
    for (let k = 0; k <= 4; k++) bx(g, -8.04, 0, -4.4 - k * 4.9, .14, 6.9, .36, '#d4bc90');
    // Jardín sur entre la nave y calle San Luis: arbustos ornamentales, arbolitos bajos y farola doble en V
    for (const [sz, sc] of [[-6.5, .72], [-10.8, .85], [-16.2, .68], [-20.5, .80]]){
      const sb = new THREE.Mesh(new THREE.IcosahedronGeometry(sc, 0), lam({ color: '#457430', flatShading: true }));
      sb.position.set(-10.2, sc * .75, sz); g.add(sb);
    }
    for (const [tz, sc] of [[-5.2, .68], [-13.5, .75], [-19.2, .65]])
      addTree(-18.5 + tz, -254.2, sc, false, ['#5a7a3a', '#6b8544', '#4d6b32']);
    // Farola metálica con 2 brazos en V junto a la vereda de San Luis
    cylIn(g, -13.2, 3.6, -21.8, .06, 7.2, '#4a4f54');
    poleIn(g, [-13.2, 7.0, -21.8], [-13.2, 7.8, -20.2], .04, '#4a4f54');
    poleIn(g, [-13.2, 7.0, -21.8], [-13.2, 7.8, -23.4], .04, '#4a4f54');
  }
  // Pórtico delantero con porche central rehundido (profundidad 1.5 m)
  bx(g, -6.2, 0, -.65, 4.2, 7.3, 1.5, WH);                                   // paño izquierdo del pórtico
  bx(g, 5.55, 0, -.65, 5.5, 7.3, 1.5, WH);                                   // paño derecho del pórtico
  bx(g, -.65, 4.35, -.65, 6.9, 2.95, 1.5, WH);                               // dintel alto sobre el porche central
  bx(g, -.65, 0, -1.55, 6.9, 4.45, .3, '#e8e3d8');                           // pared del fondo del porche
  bx(g, -.65, 4.30, -.65, 6.9, .10, 1.5, '#d8d2c6');                         // cielorraso del porche
  // Revestimiento salpicado gris-marrón oscuro en los paños bajos laterales
  bx(g, -6.2, .65, .14, 3.55, 3.7, .08, SALP);
  for (const px of [-3.95, 2.65]) bx(g, px, .65, .14, .65, 3.7, .08, SALP);
  // 4 pilastras esbeltas crema/beige + cornisa saliente + reflector central + gran cruz latina en relieve
  for (const x of [-8.1, -4.3, 3.0, 8.1]) bx(g, x, 0, .22, .52, 7.45, .32, CRM);
  bx(g, 0, 7.15, .28, 16.9, .38, .44, CRM);
  bx(g, 0, 7.55, .42, .45, .24, .22, '#2a2d30');                             // reflector en el centro de la cornisa
  bx(g, 3.0, 3.6, .34, .54, 3.55, .28, CRM);                                 // brazo vertical de la cruz (sobre pilastra)
  bx(g, 3.0, 5.15, .34, 6.2, .46, .28, CRM);                                 // brazo horizontal de la cruz
  // Puerta doble de madera miel/roble con 4 paños horizontales, vidrios laterales y banderola de 3 paños dentro del porche
  bx(g, -.65, .65, -1.36, 5.6, 3.55, .10, '#2a221d');                        // marco oscuro general
  for (const x of [-1.72, .42]){
    bx(g, x, .68, -1.30, 2.04, 2.68, .08, '#b27130');                        // hojas de madera miel
    for (const ty of [1.35, 2.02, 2.68]) bx(g, x, ty, -1.25, 2.04, .05, .03, '#4a321f'); // flejes horizontales
    bx(g, x + (x < 0 ? .82 : -.82), 1.85, -1.23, .05, .42, .06, '#d0b060');  // manijones metálicos
  }
  for (const sx of [-3.05, 1.75]) bx(g, sx, .72, -1.32, .62, 2.60, .04, '#5a6e7d'); // paños vidriados laterales
  for (const tx of [-2.3, -.65, 1.0]) bx(g, tx, 3.48, -1.32, 1.55, .62, .04, '#667a8a'); // banderola horizontal 3 paños
  // Dos maceteros cuadrados grises con plantitas flanqueando la puerta + farol negro interior
  for (const mx of [-3.4, 2.1]){
    bx(g, mx, .65, -.55, .62, .52, .62, '#9fa2a6');
    const pl = new THREE.Mesh(new THREE.IcosahedronGeometry(.34, 0), lam({ color: '#457a34', flatShading: true })); pl.position.set(mx, 1.38, -.55); g.add(pl);
  }
  bx(g, -4.02, 2.7, -.6, .16, .34, .18, '#1f2226');                          // farol negro en pared izq. del porche
  // Nicho vidriado de la Virgen María (paño derecho) con alféizar blanco y figura iluminada
  bx(g, 5.55, .75, .14, 1.75, 2.65, .18, '#e8e5dc');                         // marco del nicho
  bx(g, 5.55, .68, .22, 1.95, .12, .28, '#f5f4f0');                          // alféizar blanco
  bx(g, 5.55, .90, .20, 1.45, 2.30, .06, '#f6eed6');                         // fondo iluminado cálido
  bx(g, 5.55, 1.05, .25, .44, 1.35, .10, '#f4f4f2');                         // túnica blanca
  bx(g, 5.55, 1.35, .28, .50, .85, .08, '#4e88c9');                          // manto celeste
  const vHead = new THREE.Mesh(new THREE.SphereGeometry(.14, 8, 8), lam({ color: '#f0dcc4' })); vHead.position.set(5.55, 2.52, .26); g.add(vHead);
  for (const fx of [5.1, 5.55, 6.0]) bx(g, fx, .92, .28, .16, .16, .10, fx === 5.55 ? '#e04848' : '#e8c448'); // flores/velas
  // Escalinata ancha de 3 escalones con baldosas beige/arena + baranda negra de caño junto a la torre
  bx(g, 0, 0, 1.55, 15.8, .22, 3.1, TILE);
  bx(g, 0, .22, 1.05, 14.8, .22, 2.1, TILE);
  bx(g, 0, .44, .55, 13.8, .22, 1.1, TILE);
  poleIn(g, [-8.0, .2, 3.0], [-8.0, 1.15, 3.0], .03, '#222428');
  poleIn(g, [-8.0, .65, .2], [-8.0, 1.60, .2], .03, '#222428');
  poleIn(g, [-8.0, 1.15, 3.0], [-8.0, 1.60, .2], .03, '#222428');
  // Torre campanario: frente salpicado ocre, esquina delantera izquierda en piedra laja (media cara sur en piedra y media cara sur blanca con abertura superior)
  bx(g, -10.1, 0, -2.0, 4.2, 24, 4.4, OCH);
  const stPier = new THREE.Mesh(new THREE.BoxGeometry(1.15, 24, 2.35), lam({ map: stoneTex })); stPier.position.set(-12.05, 12, -.82); stPier.castShadow = stPier.receiveShadow = true; g.add(stPier);
  bx(g, -12.05, 0, -3.12, 1.15, 24, 2.28, '#f5f3ee');                        // mitad trasera de la cara sur en blanco liso
  bx(g, -12.64, 20.6, -3.1, .05, 2.6, 1.2, '#3a342c');                       // abertura oscura del campanario arriba
  bx(g, -7.85, 0, -2.0, .42, 24, 4.45, '#f7f5f0');                           // cara derecha blanca lisa
  for (let r = 0; r < 5; r++) for (let c = 0; c < 3; c++) bx(g, -7.62, 18.8 + r * .72, -3.2 + c * 1.1, .05, .36, .36, '#3a342c'); // grilla campanario
  bx(g, -10.0, 19.2, .22, 2.2, 3.0, .1, '#6e3a2c');
  for (let k = 0; k < 4; k++) bx(g, -10.0, 19.5 + k * .7, .3, 2.2, .08, .05, OCH);
  bx(g, -10.0, 24, -2, .25, 3.2, .25, '#d9d9d9'); bx(g, -10.0, 26, -2, 1.7, .25, .25, '#d9d9d9');
  // 4 aletas verticales blancas en la base de la torre + cantero con arbustos y farola negra de 2 globos
  bx(g, -10.0, 0, .18, 3.4, 3.3, .14, '#2f2b27');
  for (const fx of [-11.3, -10.45, -9.6, -8.75]) bx(g, fx, 0, .30, .24, 3.3, .36, '#f6f4ef');
  bx(g, -10.3, 0, 1.85, 4.2, .32, 2.4, '#6e6a64'); bx(g, -10.3, .32, 1.85, 3.9, .04, 2.1, '#4c7534');
  for (const [sx, sz] of [[-11.3, 1.8], [-10.1, 2.1], [-9.1, 1.6]]){ const sb = new THREE.Mesh(new THREE.IcosahedronGeometry(.48, 0), lam({ color: '#3f722e', flatShading: true })); sb.position.set(sx, .65, sz); g.add(sb); }
  cylIn(g, -9.0, 1.65, 2.75, .05, 3.3, '#222428');                           // farola negra doble globo
  bx(g, -9.0, 3.25, 2.75, .95, .06, .06, '#222428');
  for (const gx of [-9.45, -8.55]){ const gl = new THREE.Mesh(new THREE.SphereGeometry(.18, 10, 8), lam({ color: '#f8f4e4', emissive: 0x3a3628 })); gl.position.set(gx, 3.45, 2.75); g.add(gl); }
  // Nave principal: pilastras estructurales y cornisa gris en la cara norte (visible sobre el salón) + techo trasero de chapa oxidada
  bx(g, 8.02, 6.85, -13.0, .18, .22, 22.8, '#cfd2d6');
  for (let pz = -3.5; pz >= -21.5; pz -= 4.5) bx(g, 8.04, 3.5, pz, .16, 3.4, .34, '#e6e2d8');
  gableIn(g, 0, 5.2, -26.8, 6.2, 1.9, 14.8, '#8e4c34', Math.PI/2);            // techo trasero ábside chapa oxidada

  // ---- Salón pequeño / Ala derecha (1 planta, x = +8.1..+12.2 -> termina ANTES de la vereda y calle perimetral en z=-279.5) ----
  const BLK = '#8c8e8b';
  const blockTex = (() => {
    const c = document.createElement('canvas'); c.width = 128; c.height = 128; const x = c.getContext('2d');
    x.fillStyle = '#8b8d8a'; x.fillRect(0, 0, 128, 128);
    x.strokeStyle = 'rgba(55,57,54,.45)'; x.lineWidth = 2;
    for (let r = 0; r < 8; r++) for (let k = -1; k < 5; k++){
      const px = k * 32 + (r % 2) * 16, py = r * 16;
      x.fillStyle = (r + k) % 3 === 0 ? '#838582' : '#929490';
      x.fillRect(px + 1, py + 1, 30, 14); x.strokeRect(px, py, 32, 16);
    }
    const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; t.wrapS = t.wrapT = THREE.RepeatWrapping; return t;
  })();
  const muralTex = (mode) => {
    const c = document.createElement('canvas'); c.width = 256; c.height = 256; const x = c.getContext('2d');
    x.fillStyle = '#f4f2ec'; x.fillRect(0, 0, 256, 256);
    if (mode === 0){
      // Mural Virgen María (celeste/blanco con rayos dorados)
      x.fillStyle = '#e7d5a8'; x.fillRect(0, 175, 256, 81);
      x.strokeStyle = '#e0b848'; x.lineWidth = 4;
      for (let a = -1.2; a <= 1.2; a += .26){ x.beginPath(); x.moveTo(128, 95); x.lineTo(128 + Math.sin(a) * 118, 95 - Math.cos(a) * 88); x.stroke(); }
      x.fillStyle = '#5f9ed4'; x.beginPath(); x.moveTo(128, 62); x.lineTo(176, 215); x.lineTo(80, 215); x.closePath(); x.fill();
      x.fillStyle = '#ffffff'; x.beginPath(); x.arc(128, 66, 17, 0, 7); x.fill();
    } else {
      // Segundo mural circular/arqueado en el frente derecho
      x.fillStyle = '#6da6d8'; x.beginPath(); x.arc(128, 132, 98, 0, 7); x.fill();
      x.fillStyle = '#e5c158'; x.beginPath(); x.arc(128, 102, 34, 0, 7); x.fill();
      x.fillStyle = '#7ca86e'; x.beginPath(); x.moveTo(32, 195); x.lineTo(95, 135); x.lineTo(155, 175); x.lineTo(224, 140); x.lineTo(224, 230); x.lineTo(32, 230); x.closePath(); x.fill();
      x.fillStyle = '#ffffff'; x.fillRect(108, 155, 40, 48);
    }
    const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; return t;
  };
  // Cuerpo del salón pequeño (retirado 0.4 m del pórtico, llega hasta z = -22.5, x <= 12.2)
  bx(g, 10.15, 0, -11.45, 4.1, 3.45, 22.1, '#f4f2ec');
  bx(g, 10.15, 3.45, -11.45, 4.2, .12, 22.2, '#e6e2d8');                     // remate parapeto
  bx(g, 12.22, 2.42, -11.45, .10, .16, 22.1, '#eae6dc');                     // faja/dintel horizontal sobre aberturas (cara norte)
  // Frente hacia Av. Centenario: mural Virgen + panel saliente con segundo mural (todo dentro de x <= 12.2)
  const m1 = new THREE.Mesh(new THREE.PlaneGeometry(1.9, 2.45), lam({ map: muralTex(0) })); m1.position.set(9.25, 1.85, -.38); g.add(m1);
  bx(g, 11.25, 0, -.30, 1.85, 3.45, .28, '#f5f3ee');
  const m2 = new THREE.Mesh(new THREE.PlaneGeometry(1.65, 2.15), lam({ map: muralTex(1) })); m2.position.set(11.25, 1.85, -.14); g.add(m2);
  // Cara norte del salón (mirando a la calle perimetral, x = +12.2): 3 ventanas horizontales con celosías blancas + puerta doble rehundida + farol
  const celosiaWin = (lz) => {
    bx(g, 12.21, .95, lz, .10, 1.25, 2.25, '#dcd9d0');                       // marco
    bx(g, 12.24, 1.00, lz, .06, 1.15, 2.12, '#3a4248');                      // fondo oscuro
    for (let y = 1.08; y < 2.12; y += .13) bx(g, 12.27, y, lz, .04, .06, 2.10, '#f4f3ee'); // listones horizontales blancos
  };
  celosiaWin(-3.8); celosiaWin(-12.4); celosiaWin(-17.6);
  // Puerta doble rehundida beige/oliva con vidrios repartidos + aplique negro (entre ventana 1 y 2)
  bx(g, 12.16, 0, -7.8, .18, 2.38, 1.82, '#3a3834');
  for (const dz of [-8.22, -7.38]){
    bx(g, 12.19, .02, dz, .06, 2.32, .80, '#c4bc9e');
    for (let r = 0; r < 3; r++) for (let c = 0; c < 2; c++)
      bx(g, 12.23, .95 + r * .42, dz - .18 + c * .36, .03, .32, .26, '#50606b');
  }
  bx(g, 12.30, 2.38, -6.7, .22, .12, .16, '#1f2226');                        // aplique negro cónico
  // Pequeña chimenea/ventilación al final del techo del salón + pilar terminal + poste de madera
  bx(g, 11.4, 3.55, -20.5, .55, .45, .55, '#e8e5dc'); bx(g, 11.4, 4.05, -20.5, .72, .08, .72, '#d4d0c6');
  bx(g, 12.18, 0, -22.55, .30, 3.45, .30, '#f4f2ec');                        // pilar terminal del salón
  cylIn(g, 13.25, 3.6, -22.6, .11, 7.2, '#6b523c'); cylIn(g, 13.25, 1.1, -22.6, .115, 2.2, '#eceae4'); // poste madera con base blanca
  bx(g, 13.25, 6.6, -22.6, 1.5, .10, .10, '#5e4734');

  // ---- Patio abierto con reja negra + Casa parroquial trasera (z = -22.5..-26.2) ----
  for (let z = -22.9; z >= -26.0; z -= .22) bx(g, 12.20, 0, z, .03, 1.95, .03, '#222528');
  for (const y of [.25, 1.90]) bx(g, 12.20, y, -24.4, .05, .05, 3.6, '#222528');
  bx(g, 9.2, 0, -24.8, 3.4, 2.95, 4.6, '#eceae2');                           // volumen casa parroquial dentro del patio
  bx(g, 10.92, 0, -24.3, .08, 2.1, .9, '#5e4030');                           // puerta marrón
  bx(g, 10.92, .95, -25.8, .08, 1.1, 1.1, '#d8d2c4');                        // ventana patio

  // ---- Tapial de bloques grises sin revocar (z = -26.2..-32.8) + Garaje proporcionado de 1 auto (z = -32.8..-37.0) ----
  const blkWall = (lx, y0, lz, sx, sy, sz, rx = 1, ry = 1) => {
    const t = blockTex.clone(); t.needsUpdate = true; t.repeat.set(rx, ry);
    const m = new THREE.Mesh(new THREE.BoxGeometry(sx, sy, sz), lam({ map: t }));
    m.position.set(lx, y0 + sy / 2, lz); m.castShadow = m.receiveShadow = true; g.add(m);
  };
  blkWall(12.15, 0, -29.5, .24, 2.35, 6.6, 3.4, 1.8);                        // tapial de bloques CMU
  // Arbustos/enredaderas verdes asomando por arriba del tapial
  for (const bz of [-27.5, -29.1, -30.7, -32.0]){
    const sb = new THREE.Mesh(new THREE.IcosahedronGeometry(.55, 0), lam({ color: '#457630', flatShading: true }));
    sb.position.set(11.9, 2.46, bz); g.add(sb);
  }
  // Garaje trasero de bloques grises sin revocar (proporción real 1 auto: 4.2 m × 4.4 m × 3.0 m)
  blkWall(10.0, 0, -34.9, 4.4, 3.0, 4.2, 2.4, 2.2);
  bx(g, 12.20, 0, -34.9, .14, 2.20, 2.72, '#2d3034');                        // marco rehundido
  bx(g, 12.24, .02, -34.9, .06, 2.15, 2.60, '#43484e');                      // portón gris oscuro
  bx(g, 12.28, .02, -34.9, .03, 2.15, .04, '#2a2d30');                       // junta central
  for (const hy of [.48, .92, 1.36, 1.80]) bx(g, 12.28, hy, -34.9, .02, .045, 2.48, '#cfd3d6'); // 4 franjas plateadas
  // Tanque de agua cilíndrico elevado sobre torre de 4 patas detrás del garaje
  {
    const tx = 8.4, tz = -35.6;
    for (const [ox, oz] of [[-.5, -.5], [.5, -.5], [.5, .5], [-.5, .5]])
      poleIn(g, [tx + ox, 0, tz + oz], [tx + ox * .78, 5.2, tz + oz * .78], .04, '#5b6066');
    bx(g, tx, 5.2, tz, 1.1, .08, 1.1, '#5b6066');
    cylIn(g, tx, 6.0, tz, .62, 1.45, '#c4c7ca');
  }

  // ---- Vereda norte, franja de pasto, huellas de hormigón al garaje, canasto de basura y farol rojo de la esquina ----
  const [nx0, nx1] = [-18.5 - 37.2, -18.5 + 1.5];
  flat.rect(nx0, -277.9, nx1, -276.7, .072, '#cbc5b8');                      // vereda angosta pegada al salón/tapial/garaje
  flat.rect(nx0, -279.5, nx1, -277.9, .065, '#668b3e');                      // franja verde de pasto hasta la calle perimetral
  // Dos huellas paralelas de hormigón cruzando el pasto frente al garaje (local z = -34.1 y -35.7 -> world x = -52.6 y -54.2)
  for (const hx of [-52.6, -54.2]) flat.rect(hx - .24, -279.5, hx + .24, -277.9, .073, '#c8c2b6');
  // Cordón amarillo en la esquina de Av. Centenario × calle perimetral
  bx(g, 14.85, 0, 2.2, .18, .22, 4.2, '#e2b82a');
  // Canasto de basura de alambre con techito de chapa inclinado en la franja de pasto (View 2)
  {
    const cx0 = 14.05, cz0 = -4.2;
    for (const [ox, oz] of [[-.42, -.52], [.42, -.52], [.42, .52], [-.42, .52]]) poleIn(g, [cx0 + ox, 0, cz0 + oz], [cx0 + ox, 1.12, cz0 + oz], .025, '#4c5055');
    const cage = new THREE.Mesh(new THREE.BoxGeometry(.84, .72, 1.04), new THREE.MeshLambertMaterial({ color: 0x70767c, transparent: true, opacity: .42, side: THREE.DoubleSide }));
    cage.position.set(cx0, .74, cz0); g.add(cage);
    const roof = bx(g, cx0, 1.12, cz0, .96, .05, 1.16, '#aeb3b8'); roof.rotation.z = .12;
  }
  // Farol rojo curvo en la esquina norte + árboles de vereda en la franja de pasto
  {
    const fx = 14.2, fz = 1.8, RC = '#b84232';
    cylIn(g, fx, 2.2, fz, .06, 4.4, RC);
    poleIn(g, [fx, 4.35, fz], [fx + .85, 4.75, fz], .04, RC);
    cylIn(g, fx + .95, 4.55, fz, .20, .16, '#eae6dc');
  }
  for (const [tz, sc] of [[-2.0, .95], [-10.0, .92], [-18.5, .90], [-28.5, .52], [-33.0, .48]])
    addTree(-18.5 + tz, -278.7, sc, false, ['#3f702c', '#4f8238', '#356124']);

  // Cuerpo trasero parroquial de 2 plantas (x_local -8..+8, z_local -24..-36.8 -> termina en world x = -55.3, pegado a la Escuela Taller N°167)
  bx(g, 0, 0, -30.5, 16, 5.4, 12.6, '#f3f1ec');
  // Ventanas con rejas blancas en el frente sur (San Luis, x=-8) y espalda oeste (hacia la escuela/calle)
  for (const lz of [-26.2, -30.2, -34.2]){
    bx(g, -8.04, 1.1, lz, .10, 1.25, 1.65, '#cfd4d8'); bx(g, -8.07, 1.15, lz, .04, 1.15, 1.55, '#4a5660');
    bx(g, -8.04, 3.25, lz, .10, 1.10, 1.50, '#cfd4d8'); bx(g, -8.07, 3.30, lz, .04, 1.00, 1.40, '#4a5660');
  }
  for (const lx of [1.5, 5.0]){
    bx(g, lx, 1.1, -36.84, 1.4, 1.25, .10, '#cfd4d8'); bx(g, lx, 3.2, -36.84, 1.4, 1.15, .10, '#cfd4d8');
  }
  colLocal(g, -12.5, -37.2, 12.3, 0, '#e8dcc4');
  flat.rect(-18.5, -276.7, -13.5, -251, .07, '#cfc6b6');
  mapLabels.push([-30, -265, 'Iglesia']);
}


// =========================================================================
// Escuela Primaria N°186 "Gral. José de San Martín" + Escuela Taller N°167
// Rehecha completa según mapa satelital y Street View (Córdoba, San Luis y calle de la plaza):
// Claustro en U/cuadrado alrededor del patio central con líneas en cruz, ala norte de techo plano y chapa marrón,
// entrada principal sobre Córdoba con escudo nacional, ala larga sobre San Luis con 7 ventanales y Escuela Taller N°167 pegada a la Iglesia.
// =========================================================================
{
  const CREAM = '#efe7d2', WH = '#f5f2ea', TRIM = '#f8f5ec', ROOF = '#7d8a94', ROOF_B = '#8e5a44', BASE = '#a4553f', GLASS = '#3b4a52';
  const g = group(0, 0);
  const win = (x, y0, z, w, h, face, shutter = true, frameCol = TRIM) => {
    const d = { W: [-1, 0], E: [1, 0], S: [0, 1], N: [0, -1] }[face], alongZ = face === 'W' || face === 'E';
    const f = (o, ww, hh, col, yy) => alongZ ? bx(g, x + d[0] * o, yy, z, .12, hh, ww, col) : bx(g, x, yy, z + d[1] * o, ww, hh, .12, col);
    f(.04, w + .32, h + .34, frameCol, y0 - .16);
    f(.09, w, h, GLASS, y0);
    f(.13, .07, h, TRIM, y0);
    alongZ ? bx(g, x + d[0] * .13, y0 + h * .60, z, .05, .07, w, TRIM) : bx(g, x, y0 + h * .60, z + d[1] * .13, w, .07, .05, TRIM);
    if (shutter){
      for (let sy = y0 + .12; sy < y0 + h - .08; sy += .16)
        alongZ ? bx(g, x + d[0] * .11, sy, z, .04, .05, w - .08, '#eae6dc') : bx(g, x, sy, z + d[1] * .11, w - .08, .05, .04, '#eae6dc');
    }
  };
  const wing = (x0, z0, x1, z1, h, roof, wallCol = CREAM, baseCol = BASE, roofCol = ROOF) => {
    const sx = x1 - x0, sz = z1 - z0, cx = (x0 + x1) / 2, cz = (z0 + z1) / 2;
    bx(g, cx, 0, cz, sx, h, sz, wallCol);
    if (baseCol) bx(g, cx, 0, cz, sx + .12, .72, sz + .12, baseCol);
    if (roof === 'hip') hipIn(g, cx, h, cz, sx + .9, sz + .9, 2.0, roofCol);
    else if (roof === 'gable') gableIn(g, cx, h, cz, Math.max(sx, sz) + .4, 1.8, Math.min(sx, sz) + .4, roofCol, sx > sz ? 0 : Math.PI / 2);
    else { bx(g, cx, h, cz, sx + .18, .55, sz + .18, TRIM); bx(g, cx, h + .55, cz, sx - .3, .05, sz - .3, '#b9b4aa'); }
    addCol(x0, z0, x1, z1); mapRects.push([x0, z0, x1, z1, wallCol]);
  };

  // ---- 1) Frente sobre Córdoba REHECHO COMPLETO según Street View (-SbL, qnSI, olV) ----
  // A) Ala Norte techo plano (z = -299.5..-288.5, adelantada hasta x = -88.2): crema pálido, 2 ventanales 4x4 a la izq., porche profundo rehundido a la der.
  {
    const CN = '#f4efdd', CND = '#e5ddc4';
    // Cuerpo principal del ala norte (x = -88.2..-78.0, z = -299.5..-288.5, h = 5.15 m), con hueco de porche en esquina SO (x = -88.2..-86.2, z = -291.6..-288.5)
    bx(g, -83.1, 0, -295.55, 10.2, 5.15, 7.9, CN);                        // mitad norte maciza (-299.5..-291.6)
    bx(g, -82.1, 0, -290.05, 8.2, 5.15, 3.1, CN);                         // mitad sur detrás del porche (-291.6..-288.5)
    bx(g, -87.2, 3.45, -290.05, 2.0, 1.70, 3.1, CN);                      // dintel alto sobre el porche
    bx(g, -88.0, 0, -288.72, .45, 3.45, .45, CN);                         // pilar delantero derecho del porche
    bx(g, -83.1, 5.15, -294.0, 10.4, .22, 11.2, CND);                     // cornisa superior techo plano
    bx(g, -88.24, 4.45, -294.0, .08, .12, 11.0, CND);                     // moldura horizontal superior
    bx(g, -88.24, 0, -295.55, .08, .65, 7.9, CND);                        // zócalo crema oscuro
    // 2 ventanales blancos multipanel 4x4 a la izquierda (-297.2 y -293.8) con marcos crema en relieve
    for (const wz of [-297.2, -293.8]){
      bx(g, -88.24, 1.15, wz, .10, 2.45, 2.05, CND);
      bx(g, -88.28, 1.25, wz, .05, 2.25, 1.85, '#3b4a56');
      for (let gz = wz - .62; gz <= wz + .65; gz += .42) bx(g, -88.31, 1.25, gz, .03, 2.25, .05, '#f8f7f2');
      for (let gy = 1.65; gy <= 3.15; gy += .46) bx(g, -88.31, gy, wz, .03, .05, 1.85, '#f8f7f2');
    }
    // Puerta doble blanca multipanel al fondo del porche rehundido (x = -86.2, z = -290.1)
    bx(g, -86.24, 0, -290.1, .08, 3.35, 1.95, '#f8f7f2');
    bx(g, -86.28, .08, -290.1, .04, 3.20, 1.75, '#465866');
    for (let gz = -290.7; gz <= -289.5; gz += .40) bx(g, -86.31, .08, gz, .03, 3.20, .05, '#f8f7f2');
    for (let gy = .55; gy <= 3.05; gy += .45) bx(g, -86.31, gy, -290.1, .03, .05, 1.75, '#f8f7f2');
    // Placa crema con letras oscuras en la cara sur del ala norte mirando hacia el jardín delantero
    signIn(g, 'ESCUELA N°186 GRAL. JOSÉ DE SAN MARTÍN', -85.4, 2.45, -288.45, 3.4, .75, '#ebe4d0', '#2b323a', 0);
    addCol(-88.2, -299.5, -78.0, -288.5); mapRects.push([-88.2, -299.5, -78.0, -288.5, CN]);
  }
  // B) Jardín delantero + Ala Central MUY RETIRADA (x = -81.2..-74.0, z = -288.5..-274.5) + Pórtico con Escudo Nacional
  {
    const ROOF_L = '#bcc5cd';
    wing(-81.2, -288.5, -74.0, -274.5, 4.3, 'hip', '#f4f2ea', BASE, ROOF_L);
    // 2 ventanas con postigos crema + aire acondicionado blanco en la fachada retirada
    for (const wz of [-285.8, -281.4]) win(-81.2, 1.15, wz, 1.25, 2.15, 'W', true, '#e6dec8');
    bx(g, -81.36, 2.35, -279.6, .30, .48, .76, '#f0f0ec');                // aire acondicionado
    // Jardín de pasto + murete crema con pilares + arbusto verde oscuro delante del cuerpo retirado
    flat.rect(-88.5, -288.5, -81.2, -277.0, .068, '#5a8a38');
    bx(g, -88.4, 0, -282.8, .22, .65, 11.2, '#ebe4cf');
    for (const pz of [-288.2, -284.6, -281.0, -277.4]) bx(g, -88.4, 0, pz, .34, 1.15, .34, '#f0ead8');
    for (const ry of [.82, 1.05]) poleIn(g, [-88.4, ry, -288.2], [-88.4, ry, -277.4], .025, '#555a60');
    const sbJ = new THREE.Mesh(new THREE.IcosahedronGeometry(.85, 0), lam({ color: '#345e24', flatShading: true })); sbJ.position.set(-83.0, .82, -280.0); g.add(sbJ);
    // Pórtico de entrada principal adelantado (z = -277.0..-274.2, x = -86.5..-81.2) con Escudo Nacional oval celeste/blanco y puerta madera miel
    bx(g, -83.85, 3.35, -275.6, 5.3, 1.05, 2.8, '#f5f0df');               // dintel alto del pórtico
    bx(g, -86.35, 0, -276.85, .36, 3.35, .36, '#f5f0df');                 // pilar izquierdo
    bx(g, -86.35, 0, -274.35, .36, 3.35, .36, '#f5f0df');                 // pilar derecho
    bx(g, -81.26, 0, -275.6, .10, 2.65, 1.55, '#c48f48');                 // puerta de madera miel al fondo del pórtico
    bx(g, -81.30, 1.25, -275.6, .04, 1.10, 1.15, GLASS);
    cylIn(g, -86.54, 3.88, -275.6, .34, .08, '#5ea8df', Math.PI / 2);     // Escudo Nacional celeste/blanco
    cylIn(g, -86.57, 3.78, -275.6, .27, .06, '#f8f8f5', Math.PI / 2);
    // Pasillo embaldosado de entrada saliendo al cordón amarillo
    flat.rect(-89.8, -276.8, -81.2, -274.4, .082, '#cfc9bd');
    for (const cz of [-276.85, -274.35]) bx(g, -89.4, 0, cz, .95, .20, .14, '#e5b822');
  }
  // C) Ala Sur Principal sobre Córdoba (z = -274.2..-258.0, x = -86.4..-77.5, techo a cuatro aguas chapa galvanizada clarita, 5 ventanales con postigos abiertos)
  {
    const ROOF_L = '#bcc5cd';
    wing(-86.4, -274.2, -77.5, -258.0, 4.5, 'hip', '#f4f1e8', BASE, ROOF_L);
    bx(g, -86.46, 4.32, -266.1, .16, .24, 16.4, '#ede7d5');               // cornisa moldeada
    for (const wz of [-272.2, -269.2, -266.2, -262.8, -259.8]){
      // Marco crema con remate escalonado + ventana madera + postigos crema abiertos a los costados
      bx(g, -86.44, 1.10, wz, .10, 2.45, 1.65, '#eae2cc');
      bx(g, -86.46, 3.55, wz, .12, .22, 1.85, '#eae2cc');
      bx(g, -86.49, 1.20, wz, .05, 2.25, 1.22, '#6e634e');
      bx(g, -86.51, 1.25, wz, .03, 2.15, 1.08, '#3f4a4f');
      for (const sz of [-.72, .72]) bx(g, -86.52, 1.20, wz + sz, .05, 2.25, .36, '#ddd5be'); // postigos abiertos
    }
    for (const pz of [-271.5, -260.5]) poleIn(g, [-82.0, 6.45, pz], [-82.0, 7.45, pz], .03, '#6a727a'); // pináculos metálicos
  }
  // D) Bloque de Esquina Córdoba × San Luis (z = -258.0..-252.5, techo plano crema un poco más bajo con 2 ventanas y aire acondicionado — Street View olV)
  {
    wing(-86.4, -258.0, -77.5, -252.5, 4.05, 'flat', '#f4f0e4', BASE);
    for (const wz of [-256.4, -253.8]) win(-86.4, 1.10, wz, 1.15, 2.15, 'W', true, '#e6dec8');
    bx(g, -86.56, 2.65, -255.1, .30, .50, .80, '#f0f0ec');                // aire acondicionado en la esquina
  }

  // ---- 2) Ala larga sobre calle San Luis (x = -86.2..-65.5, z = -260.5..-252.5) — Street View 10 ----
  wing(-77.5, -260.5, -65.5, -252.5, 4.5, 'hip', CREAM, '#c9bca0', '#75828c');
  // 7 ventanales altos sobre San Luis (desde esquina Córdoba hasta Escuela Taller) con celosías blancas
  for (let i = 0; i < 7; i++) win(-84.2 + i * 2.85, 1.15, -252.5, 1.20, 2.35, 'S', true);
  // Murete bajo crema con pilares cuadrados y 2 caños metálicos horizontales a lo largo de San Luis (sin reja alta)
  bx(g, -76.8, 0, -250.6, 22.8, .52, .22, '#ebe4cf');
  for (let px = -88.0; px <= -65.6; px += 3.2) bx(g, px, 0, -250.6, .30, 1.05, .30, '#f0ead8');
  for (const ry of [.72, .96]) poleIn(g, [-88.0, ry, -250.6], [-65.6, ry, -250.6], .028, '#4e5358');
  addCol(-88.2, -250.8, -65.5, -250.4);

  // ---- 3) Anexo Este sobre San Luis: "ESCUELA TALLER DE EDUCACIÓN MANUAL N° 167" (x = -65.5..-55.7, z = -260.5..-250.8) — Street View 11 ----
  {
    const tx0 = -65.5, tx1 = -55.7, tz0 = -260.5, tz1 = -250.8;
    bx(g, (tx0 + tx1) / 2, 0, (tz0 + tz1) / 2, tx1 - tx0, 4.55, tz1 - tz0, '#ede5d2');
    bx(g, (tx0 + tx1) / 2, 4.55, (tz0 + tz1) / 2, tx1 - tx0 + .15, .32, tz1 - tz0 + .15, '#e2d8c2');
    // 4 pilastras de ladrillo marrón oscuro formando 3 paños + marquesina horizontal crema
    for (const px of [-65.35, -62.15, -58.95, -55.85]) bx(g, px, 0, tz1 + .08, .38, 4.55, .24, '#6d4030');
    bx(g, (tx0 + tx1) / 2, 2.75, tz1 + .32, tx1 - tx0 + .1, .22, .68, '#ebe3cf');   // marquesina horizontal
    // Ventanas altas (clerestory) sobre la marquesina + 2 ventanas anchas marco bordó con rejas + puerta doble bordó derecha
    for (const cx of [-63.75, -60.55, -57.40]) bx(g, cx, 3.25, tz1 + .05, 2.45, .62, .06, '#3e4850');
    for (const cx of [-63.75, -60.55]){
      bx(g, cx, 1.05, tz1 + .05, 2.35, 1.45, .08, '#7a2626');            // marco bordó
      bx(g, cx, 1.12, tz1 + .08, 2.18, 1.30, .04, GLASS);
      for (let by = 1.28; by < 2.38; by += .26) bx(g, cx, by, tz1 + .11, 2.20, .03, .03, '#4a1b1b');
    }
    bx(g, -57.40, 0, tz1 + .05, 1.85, 2.45, .08, '#7a2626');             // puerta doble vidriada bordó
    bx(g, -57.40, 1.10, tz1 + .09, 1.55, 1.15, .04, GLASS);
    signIn(g, 'ESCUELA TALLER N° 167', -57.40, 2.60, tz1 + .67, 2.7, .34, '#f5f1e6', '#3d241c', 0);
    flat.rect(-58.4, -250.8, -56.4, -247.0, .075, '#cbc5b8');            // senderito de acceso sobre San Luis
    addCol(tx0, tz0, tx1, tz1); mapRects.push([tx0, tz0, tx1, tz1, '#ede5d2']);
  }

  // ---- 4) Edificio blanco 2 plantas al lado del garaje de la Iglesia + Portón en la esquina + Anexo 1 planta hacia la calle de la plaza ----
  const EX = -65.2;                                                      // línea de fachada sobre calle de la plaza (deja 1.7 m de vereda/pasto hasta el cordón en -63.5)
  // Franja de pasto verde y cordón a lo largo de toda la calle de la plaza frente a la escuela y las casas
  flat.rect(EX, -329.5, -63.5, -276.7, .068, '#638a3c');
  bx(g, -63.56, 0, -303.1, .14, .21, 52.8, '#cbc5b8');
  // Edificio blanco de 2 plantas pegado al garaje de la Iglesia (cierra el hueco x = -55.7..-63.8, z = -276.7..-268.0)
  {
    const bx0 = -63.8, bx1 = -55.7, bz0 = -276.7, bz1 = -268.0;
    bx(g, (bx0 + bx1) / 2, 0, (bz0 + bz1) / 2, bx1 - bx0, 5.9, bz1 - bz0, '#f4f3ef');
    bx(g, (bx0 + bx1) / 2, 5.9, (bz0 + bz1) / 2, bx1 - bx0 + .12, .16, bz1 - bz0 + .12, '#e2dfd8');
    // 4 ventanas con rejas blancas (2 abajo, 2 arriba) mirando hacia el norte (calle perimetral, z = -276.7)
    for (const wx of [-61.8, -57.9]) for (const wy of [1.15, 3.65]){
      bx(g, wx, wy, bz0 - .04, 1.95, 1.35, .08, '#d4d0c8');
      bx(g, wx, wy + .04, bz0 - .07, 1.82, 1.24, .04, '#5a636a');
      for (let gx = wx - .78; gx <= wx + .80; gx += .26) bx(g, gx, wy + .04, bz0 - .10, .03, 1.24, .03, '#f4f4f0');
      for (let gy = wy + .28; gy <= wy + 1.15; gy += .30) bx(g, wx, gy, bz0 - .10, 1.82, .03, .03, '#f4f4f0');
    }
    addCol(bx0, bz0, bx1, bz1); mapRects.push([bx0, bz0, bx1, bz1, '#f4f3ef']);
  }
  // Ala norte del claustro (techo chapa marrón/rojiza — termina en x = -70.9 para no atravesar el anexo de 1 planta)
  wing(-77.5, -299.5, -70.9, -291.0, 4.5, 'gable', CREAM, '#d6cbb4', ROOF_B);
  // Esquina completamente cerrada (sin huecos ni columnas): tapial blanco en L pegado al edificio de 2 plantas + portón beige justo en la esquina pegado al anexo
  bx(g, -64.5, 0, -276.82, 1.65, 2.35, .24, WH);                         // cierre en L contra el edificio blanco (-63.8..-65.2)
  bx(g, EX, 0, -277.9, .24, 2.10, 2.2, WH);                              // tramo tapial blanco hacia el portón (-276.8..-279.0)
  for (let rz = -277.0; rz >= -278.9; rz -= .22) bx(g, EX, 2.10, rz, .04, .32, .04, WH); // rejita blanca superior
  bx(g, EX, 2.40, -277.9, .05, .05, 2.2, WH);
  addCol(EX - .15, -279.0, -63.8, -276.7);
  bx(g, EX, 0, -280.6, .16, 2.42, 3.25, '#c8b694');                      // portón metálico beige JUSTO en la esquina (-279.0..-282.2), pegado al anexo
  for (let gz = -279.2; gz >= -282.0; gz -= .22) bx(g, EX + .05, 2.08, gz, .04, .32, .04, '#9c8a6c');
  bx(g, EX + .05, 2.38, -280.6, .05, .05, 3.25, '#9c8a6c');
  flat.rect(EX, -281.5, -63.5, -279.7, .076, '#cbc5b8');                 // sendero de cemento al portón
  // Canasto de basura de alambre negro frente al anexo escolar
  { const cx0 = EX + .75, cz0 = -284.2;
    for (const [ox, oz] of [[-.32, -.45], [.32, -.45], [.32, .45], [-.32, .45]]) poleIn(g, [cx0 + ox, 0, cz0 + oz], [cx0 + ox, 1.05, cz0 + oz], .02, '#222528');
    const cg = new THREE.Mesh(new THREE.BoxGeometry(.64, .58, .90), new THREE.MeshLambertMaterial({ color: 0x222528, transparent: true, opacity: .35, side: THREE.DoubleSide })); cg.position.set(cx0, .74, cz0); g.add(cg); }
  // Anexo escolar 1 planta crema corrido a la izquierda (z = -282.2..-294.5), limpio sin atravesarse con el ala marrón ni con Casa 4
  bx(g, -68.0, 0, -288.35, 5.6, 3.05, 12.3, '#ece6d8');
  bx(g, -68.0, 3.05, -288.35, 5.75, .24, 12.45, WH);
  bx(g, -68.0, 2.86, -282.16, 5.75, .24, .16, '#8f4432');                // cenefa marrón-rojiza borde sur
  for (const cz of [-283.9, -285.7]) bx(g, EX + .04, 2.38, cz, .08, .34, 1.35, '#32383e'); // 2 ventanitas altas horizontales
  for (const lz of [-287.8, -289.1, -290.4, -291.7]) win(EX, 1.15, lz, .95, 1.15, 'E', true, '#d8cfb8');
  // Pórtico de piedra beige en el extremo norte del anexo escolar (z = -293.6, limpio antes de Casa 4)
  bx(g, EX - .08, 0, -293.6, .42, 3.30, 1.85, '#c2b398');
  bx(g, EX + .14, 0, -293.6, .06, 2.25, .95, '#3b2b20');
  flat.rect(EX, -294.6, -63.5, -292.2, .076, '#cbc5b8');                 // entrada de cemento
  addCol(-70.8, -294.5, EX, -282.2); mapRects.push([-70.8, -294.5, EX, -282.2, '#ece6d8']);

  // ---- 5) Centro de la Escuela 186: claustro cerrado en 4 lados, galerías blancas perimetrales y piso gris parejo (sin pasto adentro) ----
  // Piso gris parejo en todo el interior de la escuela para que no asome pasto detrás del portón ni en ningún rincón del patio
  flat.rect(-86.2, -298.5, -64.0, -252.5, .064, '#b8b5ac');
  // Ala este de aulas (techo a dos aguas gris-azulado) cerrando el lado este del patio (x = -68.2..-63.8, z = -275.5..-260.5)
  wing(-68.2, -275.5, -63.8, -260.5, 4.1, 'gable', CREAM, '#c9bca0', '#75828c');
  // Ala norte interna corrida hacia el norte/derecha detrás del portón (z = -282.2..-278.0)
  wing(-75.8, -282.2, -68.2, -278.0, 4.1, 'gable', CREAM, '#c9bca0', '#75828c');
  // Galerías cubiertas blancas con columnas rodeando los lados oeste (x = -77.5..-75.3) y sur (z = -262.7..-260.5) del patio
  bx(g, -76.4, 3.05, -270.3, 2.2, .28, 15.4, WH);
  for (let pz = -277.2; pz <= -262.5; pz += 3.0) bx(g, -75.45, 0, pz, .26, 3.05, .26, WH);
  bx(g, -71.8, 3.05, -261.6, 7.6, .28, 2.2, WH);
  for (let px = -75.45; px <= -68.4; px += 3.4) bx(g, px, 0, -262.55, .26, 3.05, .26, WH);
  // Patio central rectangular gris con borde oscuro, cruz + diagonales blancas en estrella y mástil central
  flat.rect(-77.5, -278.0, -68.2, -260.5, .068, '#d4cfc4');                      // piso bajo las galerías
  flat.rect(-75.3, -277.6, -68.3, -262.7, .074, '#8f9088');                      // borde oscuro del patio
  flat.rect(-75.0, -277.3, -68.6, -263.0, .078, '#a8a79e');                      // patio central gris
  const pcx = -71.8, pcz = -270.15;
  flat.rect(pcx - .18, -277.2, pcx + .18, -263.1, .084, '#efece4');              // línea blanca N-S
  flat.rect(-74.9, pcz - .18, -68.7, pcz + .18, .084, '#efece4');                // línea blanca E-O
  for (const ang of [Math.atan2(14.0, 6.2), -Math.atan2(14.0, 6.2)]){            // diagonales blancas en estrella
    const dm = new THREE.Mesh(new THREE.PlaneGeometry(.24, 14.8), lam({ color: 0xefece4 }));
    dm.rotation.x = -Math.PI / 2; dm.rotation.z = ang; dm.position.set(pcx, .086, pcz); g.add(dm);
  }
  bx(g, pcx, 0, pcz, .75, .22, .75, '#e8e4da');                                  // base del mástil
  poleIn(g, [pcx, .2, pcz], [pcx, 9.2, pcz], .06, '#f2f2ee');
  // Patio embaldosado trasero entre el edificio blanco de 2 plantas y la Escuela Taller N° 167 (x = -63.8..-55.7, z = -268.0..-260.5)
  flat.rect(-63.8, -268.0, -55.7, -260.5, .07, '#c8c3b8');
  plazaRects.push([-89.6, -300.0, -55.5, -250.5]);                               // sin casas ni árboles aleatorios adentro de la escuela

  // ---- 6) Vereda embaldosada sobre Córdoba, murete bajo crema, baranda verde tubular de cordón, bicicleteros y lomo de burro ----
  flat.rect(-89.5, -299.5, -86.4, -251.0, .065, '#cec8bc');              // vereda embaldosada frente a la escuela
  // Murete bajo crema con zócalo de ladrillo y pilares a lo largo del ala sur sobre Córdoba (-274.2..-251.2)
  bx(g, -87.4, 0, -262.7, .22, .68, 22.8, '#ebe4cf');
  bx(g, -87.35, .68, -262.7, .26, .35, 22.8, '#a4553f');
  for (let pz = -274.0; pz <= -251.5; pz += 3.8) bx(g, -87.4, 0, pz, .34, 1.15, .34, '#f0ead8');
  const greenRail = (z0, z1) => {
    const n = Math.max(1, Math.round((z1 - z0) / 2.4));
    for (let k = 0; k <= n; k++) poles.add(-89.45, 0, z0 + (z1 - z0) * k / n, .065, 1.05, .065, 0, '#2e9e4a');
    for (const y of [.45, .95]) poleIn(g, [-89.45, y, z0], [-89.45, y, z1], .032, '#2e9e4a');
    addCol(-89.6, z0, -89.25, z1);
  };
  greenRail(-296.0, -277.0); greenRail(-274.2, -251.2);
  // Bicicletas estacionadas junto a la baranda verde sobre Córdoba
  const BIKE = ['#2b6fd1', '#d13b2b', '#2e9a4a', '#e2b021', '#222222', '#8b5cc7', '#e86fa8'];
  for (let z = -295; z < -252.5; z += 1.05) if ((z < -277.5 || z > -273.8) && rnd() < .52){
    const c = pick(BIKE), x = -88.5;
    for (const dx of [-.50, .50]) bikeWheels.add(x + dx, .34, z, 1, 1, 1, 0, '#1d1d1d');
    trims.add(x, .5, z, 1.0, .05, .05, 0, c); trims.add(x - .15, .42, z, .05, .38, .05, 0, c);
    trims.add(x - .2, .84, z, .24, .05, .1, 0, '#111111'); trims.add(x + .44, .54, z, .05, .44, .05, 0, c); trims.add(x + .44, .98, z, .05, .05, .52, 0, '#333333');
  }
  // Lomo de burro amarillo y negro sobre calle Córdoba frente al ala norte (Street View -SbL)
  for (let k = 0; k < 6; k++) flat.rect(-97.2 + k * 1.4, -296.2, -95.8 + k * 1.4, -295.0, ROAD_Y + .018, k % 2 ? '#1e2022' : '#f0c422');
  for (const z of [-297.8, -289.2, -271.0, -255.0]) addTree(-89.4, z, .78, false, ['#967642', '#856638', '#a07e4a']);
  mapLabels.push([-75, -276, 'Escuela 186']);
}

// =========================================================================
// Casas de la esquina Córdoba × Bv. Lavalle × calle de la plaza (zona negra del mapa satelital)
// Detalladas según Street View (x = -89.5..-65.2 con 1.7 m de vereda/pasto hacia la calle de la plaza)
// =========================================================================
{
  const g = group(0, 0), EX = -65.2;
  plazaRects.push([-90, -330, -55, -250]);
  flat.rect(-89.5, -329.5, EX, -299.5, .05, '#648c3e');
  // Textura de piedra laja poligonal (para pilares de Casa 1 sobre Lavalle y zócalo de Casa 4)
  const lajaTex = (() => {
    const c = document.createElement('canvas'); c.width = 128; c.height = 128; const x = c.getContext('2d');
    x.fillStyle = '#5c5852'; x.fillRect(0, 0, 128, 128);
    const cols = ['#c8c2b6', '#8a867e', '#b5a489', '#706d68', '#dcd6ca', '#a39276'];
    for (let r = 0; r < 6; r++) for (let k = 0; k < 5; k++){
      x.fillStyle = cols[(r * 5 + k * 3) % cols.length];
      x.fillRect(k * 26 + (r % 2) * 8 + 2, r * 22 + 2, 22, 18);
    }
    const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; t.wrapS = t.wrapT = THREE.RepeatWrapping; return t;
  })();
  const lajaBox = (x, y0, z, sx, sy, sz, rx = 1, ry = 1) => {
    const t = lajaTex.clone(); t.needsUpdate = true; t.repeat.set(rx, ry);
    const m = new THREE.Mesh(new THREE.BoxGeometry(sx, sy, sz), lam({ map: t }));
    m.position.set(x, y0 + sy / 2, z); m.castShadow = m.receiveShadow = true; g.add(m);
  };

  // --- Casa 1: Esquina NO (Córdoba × Bv. Lavalle, x = -89.5..-75.0, z = -329.5..-319.5) — galería envolvente en L, arbusto grande y tapial blanco (Street View lH8V e IREk) ---
  {
    bx(g, -81.4, 0, -323.5, 12.6, 3.15, 7.6, '#f0eee8');                 // cuerpo principal retirado detrás de la galería en L (x = -87.7..-75.1, z = -327.3..-319.7)
    bx(g, -82.25, 3.15, -324.4, 14.6, .24, 10.2, '#dad7cf');             // losa/cenefa continua cubriendo toda la galería en L
    bx(g, -82.2, 0, -328.25, 4.4, 3.15, 1.9, '#f0eee8');                 // frente cerrado blanco sobre Lavalle (-84.4..-80.0)
    // Galería cubierta envolviendo la esquina NO (tanto sobre Lavalle como sobre Córdoba) con columnas finas cilíndricas blancas
    for (const [cx, cz] of [[-89.1, -329.1], [-86.8, -329.1], [-84.6, -329.1], [-89.1, -326.8], [-89.1, -324.5], [-89.1, -322.2]])
      cylIn(g, cx, 1.58, cz, .085, 3.15, '#f6f5f0');
    bx(g, -86.6, 1.10, -327.34, 2.0, 1.25, .08, '#46545e');              // ventana bajo galería Lavalle
    for (const wz of [-326.0, -323.5]){ bx(g, -87.74, 1.10, wz, .08, 1.25, 1.75, '#3b4852'); for (let sy = 1.20; sy < 2.28; sy += .20) bx(g, -87.80, sy, wz, .03, .04, 1.70, '#222528'); }
    // Tanque de agua blanco + ventilaciones en la azotea (visibles en Street View lH8V)
    cylIn(g, -86.0, 3.95, -325.5, .52, 1.05, '#e8e6df');
    // Ventana horizontal con persiana blanca y pilares de piedra laja sobre Lavalle
    bx(g, -82.2, 1.10, -329.26, 2.35, 1.32, .08, '#2d3136');
    bx(g, -82.2, 1.15, -329.31, 2.20, 1.22, .04, '#e9e6de');
    for (let sy = 1.25; sy < 2.32; sy += .14) bx(g, -82.2, sy, -329.34, 2.18, .04, .03, '#c9c6be');
    lajaBox(-83.95, 0, -329.24, .82, 3.15, .22, 1, 3);
    lajaBox(-80.45, 0, -329.24, .82, 3.15, .22, 1, 3);
    // Garaje blanco de 3 hojas sobre Bv. Lavalle (-79.98..-75.02)
    bx(g, -77.5, 0, -328.25, 4.92, 3.05, 1.9, '#9c6e50');
    bx(g, -77.5, 3.05, -328.35, 5.0, .24, 2.2, '#cfccc4');
    bx(g, -77.5, 0, -329.25, 3.2, 2.22, .08, '#f5f5f1');
    for (const sx of [-78.55, -76.45]) bx(g, sx, 0, -329.31, .03, 2.22, .02, '#c5c5bf');
    for (const gx of [-78.55, -77.5, -76.45]) bx(g, gx, 1.72, -329.31, .74, .26, .02, '#3a4a55');
    flat.rect(-79.6, -331.5, -75.4, -329.2, .204, '#c2b4a4');
    // Reja baja de ladrillo + pilastras blancas + hierro negro en la esquina + arbusto grande frondoso sobre Córdoba + tapial blanco hacia Lo del Pollo
    bx(g, -84.8, 0, -329.45, 9.2, .52, .20, '#a86b52'); bx(g, -89.45, 0, -325.4, .20, .52, 8.2, '#a86b52');
    for (const [px, pz] of [[-89.45, -329.45], [-85.2, -329.45], [-89.45, -325.5], [-89.45, -321.5]]) bx(g, px, 0, pz, .26, 1.15, .26, '#f0eee8');
    for (let x = -89.2; x <= -80.4; x += .26) bx(g, x, .52, -329.45, .025, .62, .025, '#222528');
    for (let z = -329.2; z <= -321.6; z += .26) bx(g, -89.45, .52, z, .025, .62, .025, '#222528');
    // Arbusto grande frondoso sobre el lado Córdoba + tapial blanco liso de cierre hacia Lo del Pollo (z = -321.5..-319.5)
    for (const [ax, az, sc] of [[-88.4, -323.0, 1.35], [-88.2, -321.8, 1.15], [-88.6, -328.4, .65]]){
      const sb = new THREE.Mesh(new THREE.IcosahedronGeometry(sc, 0), lam({ color: '#426e2c', flatShading: true })); sb.position.set(ax, sc * .9, az); g.add(sb);
    }
    bx(g, -89.42, 0, -320.5, .24, 2.05, 2.1, '#ebe8e0');                 // tapial blanco hacia Lo del Pollo
    addCol(-89.4, -329.3, -75.1, -319.6); mapRects.push([-89.4, -329.3, -75.1, -319.6, '#f0eee8']);
  }

  // --- Casa 2: Esquina NE sobre Bv. Lavalle y calle de la plaza (x = -74.98..EX, z = -329.5..-319.5) ---
  {
    bx(g, -72.3, 0, -324.4, 5.32, 2.75, 9.8, '#e6e0d4');
    {
      const sh = new THREE.Shape([new THREE.Vector2(0, 0), new THREE.Vector2(5.2, 0), new THREE.Vector2(5.2, .72), new THREE.Vector2(2.4, .72)]);
      const rg = new THREE.ExtrudeGeometry(sh, { depth: 5.4, bevelEnabled: false }).rotateY(-Math.PI / 2);
      const rm = new THREE.Mesh(rg, lam({ color: '#aeb5bc' }));
      rm.position.set(-69.6, 2.75, -329.6); rm.castShadow = rm.receiveShadow = true; g.add(rm);
    }
    bx(g, -73.0, 1.05, -329.34, 2.55, 1.40, .08, '#d4d8dc'); bx(g, -73.0, 1.12, -329.39, 2.38, 1.26, .04, '#3a4a55');
    bx(g, -73.0, 0, -329.60, 2.65, .52, .52, '#b4b2aa');
    for (let fx = -74.0; fx <= -72.0; fx += .48){
      const fl = new THREE.Mesh(new THREE.IcosahedronGeometry(.26, 0), lam({ color: '#3f762c', flatShading: true })); fl.position.set(fx, .68, -329.60); g.add(fl);
      bx(g, fx, .86, -329.65, .14, .12, .14, '#d83830');
    }
    bx(g, -70.6, 0, -329.34, .95, 2.15, .08, '#f4f3ee'); bx(g, -70.6, .85, -329.39, .75, 1.15, .04, '#4c5e6c');
    // Vereda cortada AL RAS del cordón de Bv. Lavalle (z = -331.5)
    flat.rect(-75.0, -331.5, -69.6, -329.3, .204, '#cbc5b8');
    // Tapial de placas premoldeadas gris-arena rodeando el patio esquina NE
    bx(g, -67.4, 0, -329.35, 4.4, 2.15, .22, '#e2dfd8');
    for (let px = -69.5; px <= EX + .1; px += 1.5) bx(g, px, 0, -329.35, .24, 2.22, .28, '#cbc7be');
    bx(g, EX, 0, -324.5, .22, 2.15, 10.0, '#b9b4a6');
    for (let z = -329.3; z <= -319.5; z += 1.65) bx(g, EX, 0, z, .28, 2.24, .28, '#a49f92');
    const polyR = new THREE.Mesh(new THREE.BoxGeometry(3.4, .06, 5.0), new THREE.MeshLambertMaterial({ color: 0xd8e4ea, transparent: true, opacity: .60 }));
    polyR.position.set(-67.2, 2.55, -322.2); g.add(polyR);
    addPalm(-68.2, -325.2, .82, .05); addPalm(-66.6, -322.0, .62, .05);
    cylIn(g, EX + .95, 3.8, -325.0, .10, 7.6, '#6e5640');
    addCol(-75.0, -329.3, EX, -319.6); mapRects.push([-75.0, -329.3, EX, -319.6, '#e6e0d4']);
  }

  // --- Casa 3: Casa amarilla-ocre con techo chapa apoyado + garaje marrón oscuro (x = -76.5..EX, z = -319.5..-311.5) — Street View _ryW ---
  {
    // Cuerpo amarillo-ocre (z = -319.5..-315.4) con alero chapa bien apoyado, aire acondicionado, ventana con reja negra y arbusto
    bx(g, -70.8, 0, -317.45, 11.2, 2.75, 4.1, '#dfbe62');
    bx(g, -70.8, 2.75, -317.45, 11.6, .14, 4.3, '#aeb5bc');              // techo de chapa gris apoyado limpio
    bx(g, EX + .04, 1.05, -317.2, .08, 1.25, 1.45, '#2b3238');           // ventana con reja negra
    for (let gz = -317.8; gz <= -316.6; gz += .28) bx(g, EX + .09, 1.05, gz, .03, 1.25, .03, '#1e2022');
    bx(g, EX + .16, 2.22, -316.0, .28, .44, .72, '#efefef');             // aire acondicionado blanco izq.
    const sb3 = new THREE.Mesh(new THREE.IcosahedronGeometry(.88, 0), lam({ color: '#3f762a', flatShading: true })); sb3.position.set(EX + .45, .95, -319.0); g.add(sb3);
    // Garaje marrón chocolate (z = -315.4..-311.6) con portón seccional negro + rampa de hormigón cruzando el pasto
    bx(g, -70.8, 0, -313.5, 11.2, 3.10, 3.8, '#594133');
    bx(g, EX + .04, 0, -313.5, .10, 2.22, 2.55, '#26292e');
    for (const py of [.55, 1.10, 1.65]) bx(g, EX + .10, py, -313.5, .02, .03, 2.48, '#5a6066');
    flat.rect(EX, -314.9, -63.5, -312.1, .076, '#cbc5b8');               // rampa de hormigón del garaje
    addCol(-76.4, -319.4, EX, -311.6); mapRects.push([-76.4, -319.4, EX, -311.6, '#dfbe62']);
  }

  // --- Casa 4: Casa moderna marrón chocolate + muro crema transición (x = -76.5..EX, z = -311.5..-294.7) — Street View csnT ---
  {
    bx(g, EX, 0, -310.6, .22, 2.45, 2.0, '#d8ccb8');                     // muro crema de transición hacia Casa 3
    bx(g, -70.8, 0, -302.15, 11.2, 3.35, 14.9, '#5c4538');               // fachada principal marrón chocolate (hasta -294.7, pegada al pórtico de piedra del anexo)
    // Planta alta sin revocar de bloques grises con 2 huecos de ventanas atrás
    bx(g, -72.8, 3.35, -305.5, 6.0, 2.2, 7.2, '#929592');
    for (const wz of [-307.5, -303.5]) bx(g, -69.78, 4.15, wz, .08, .95, 1.45, '#5a6672');
    // Izquierda (sur): portón doble vidriado negro + 2 macetas grises + estructura amarilla liviana + 3 ventanitas ranura con apliques
    bx(g, EX + .04, 0, -296.4, .10, 2.25, 2.30, '#1f2226'); bx(g, EX + .08, .10, -296.4, .04, 2.05, 2.10, '#465866');
    for (const mz of [-298.0, -298.6]){ bx(g, EX + .28, 0, mz, .35, .58, .35, '#8c8e90'); const pl = new THREE.Mesh(new THREE.IcosahedronGeometry(.26, 0), lam({ color: '#457832', flatShading: true })); pl.position.set(EX + .28, .75, mz); g.add(pl); }
    for (const yz of [-299.4, -301.0]) poleIn(g, [EX + .45, 0, yz], [EX + .45, 1.55, yz], .025, '#d6b428');
    poleIn(g, [EX + .45, 1.55, -299.1], [EX + .45, 1.55, -301.3], .025, '#d6b428');
    for (const wz of [-299.5, -301.8, -304.2]){
      bx(g, EX + .04, 1.82, wz, .08, .34, .88, '#1f2226');
      bx(g, EX + .06, 1.45, wz, .08, .12, .12, '#1f2226');
    }
    // Derecha (norte): puerta negra + ventana apaisada larga marco negro sobre zócalo de piedra laja + pilar crema + rampa de hormigón
    bx(g, EX + .04, 0, -306.6, .10, 2.20, .92, '#1f2226');
    lajaBox(EX + .04, 0, -308.2, .14, 1.15, 2.15, 1.5, 1);
    bx(g, EX + .04, 1.20, -308.2, .08, .68, 2.15, '#1f2226'); bx(g, EX + .08, 1.26, -308.2, .04, .56, 2.05, '#4c5f6e');
    bx(g, EX + .05, 0, -309.52, .26, 3.35, .36, '#e2d7c4');
    flat.rect(EX, -309.6, -63.5, -306.0, .076, '#d6d2c8');
    cylIn(g, EX + 1.15, 3.1, -304.8, .055, 6.2, '#c84b36');
    addCol(-76.4, -309.6, EX, -294.7); mapRects.push([-76.4, -309.6, EX, -294.7, '#5c4538']);
  }

  // --- Casa 5: "Lo del Pollo" sobre Córdoba (x = -89.5..-76.5, z = -319.5..-308.5) — MUY DETALLADO según Street View cJq7 ---
  {
    const BR = '#6b5544', BRD = '#594637', BLK = '#1f2327';
    // Explanada ancha de hormigón claro al frente + bicicletero metálico
    flat.rect(-91.2, -319.5, -86.2, -308.5, .204, '#cfc9be');
    for (let bz = -312.6; bz <= -311.4; bz += .40){
      poleIn(g, [-90.8, 0, bz], [-90.8, .42, bz], .02, '#4a4f54');
      poleIn(g, [-90.2, 0, bz], [-90.2, .42, bz], .02, '#4a4f54');
      poleIn(g, [-90.8, .42, bz], [-90.2, .42, bz], .02, '#4a4f54');
    }
    // Ala izquierda saliente (Garaje, z = -319.4..-316.0, h = 3.55 m, adelantado hasta x = -89.4)
    bx(g, -83.1, 0, -317.7, 12.6, 3.55, 3.4, BR);
    bx(g, -89.44, 0, -317.7, .12, 2.82, 2.45, '#2b3336');                // portón alto doble oscuro verde-antracita
    bx(g, -89.51, 0, -317.7, .03, 2.82, .05, BLK);
    for (const py of [1.25, 2.15]) bx(g, -89.51, py, -317.7, .03, .04, 2.38, '#3f484c');
    bx(g, -89.48, 3.05, -317.7, .10, .14, .14, '#e8e8e4');               // aplique centrado arriba del portón
    for (const sz of [-319.15, -316.25]) bx(g, -89.46, 2.25, sz, .10, .16, .10, BLK); // apliques laterales
    // Cuerpo central y derecho retirado (x = -86.8..-76.8, z = -316.0..-309.5, h = 3.25 m) + planta alta blanca atrás
    bx(g, -81.8, 0, -312.75, 10.0, 3.25, 6.5, BR);
    bx(g, -80.2, 3.25, -312.8, 4.6, .85, 5.2, '#ebe8e0');                // remate blanco planta alta atrás
    // Pérgola / marquesina negra saliente (z = -314.8..-311.6, x = -88.7..-86.8) con 2 columnas finas negras
    bx(g, -87.75, 2.72, -313.2, 2.1, .26, 3.45, BLK);
    for (const pz of [-314.85, -311.55]) bx(g, -88.72, 0, pz, .09, 2.72, .09, BLK);
    // 2 pilares revestidos en piedra cálida + 2 macetones altos grises con plantas flanqueando la entrada
    for (const pz of [-314.45, -311.95]){
      lajaBox(-86.88, 0, pz, .38, 2.72, .48, 1, 2.5);
      bx(g, -87.25, 0, pz, .34, .82, .34, '#929699');
      const pl = new THREE.Mesh(new THREE.IcosahedronGeometry(.26, 0), lam({ color: '#4d7c36', flatShading: true })); pl.position.set(-87.25, 1.02, pz); g.add(pl);
    }
    // Puerta doble vidriada negra rehundida en el centro
    bx(g, -86.82, 0, -313.2, .12, 2.38, 1.88, BLK);
    bx(g, -86.87, .08, -313.2, .04, 2.24, 1.72, '#2d3a42');
    for (const gy of [.65, 1.25, 1.85]) bx(g, -86.90, gy, -313.2, .03, .04, 1.72, BLK);
    // 4 ventanitas horizontales altas tipo ranura (2 a la izq., 2 a la der.) + puerta de servicio negra a la derecha
    for (const wz of [-315.6, -314.9, -311.3, -310.6]) bx(g, -86.84, 2.18, wz, .08, .26, .58, BLK);
    bx(g, -86.84, 0, -309.95, .08, 2.15, .72, BLK);
    // Muro marrón cerrando el espacio derecho desde el edificio hasta el pilar del portero y el muro de piedra de Casa 6 (sin hueco abierto)
    bx(g, -87.6, 0, -309.1, 1.8, 2.25, .65, BR);
    bx(g, -88.4, 0, -308.85, .58, 2.25, .65, BR);
    bx(g, -88.72, 1.35, -308.85, .06, .34, .24, '#f0f0ec');
    addPalm(-88.0, -308.1, .52, .05);
    addCol(-89.4, -319.4, -76.8, -308.6); mapRects.push([-89.4, -319.4, -76.8, -308.6, BR]);
  }

  // --- Casa 6: Casa de piedra clara natural + porche durazno + garaje de madera de 4 hojas (x = -89.5..-76.5, z = -308.5..-299.6) — Street View j4_5 ---
  {
    const TAN = '#c7986e', WOOD = '#8b4c24';
    // Textura de piedra clara irregular color crema/arena (fiel a Street View j4_5)
    const lightStoneTex = (() => {
      const c = document.createElement('canvas'); c.width = 128; c.height = 128; const x = c.getContext('2d');
      x.fillStyle = '#bfb7a6'; x.fillRect(0, 0, 128, 128);
      const cols = ['#dfd8c8', '#d2cab8', '#e6e0d2', '#c8bfa8', '#d9d1c0'];
      for (let r = 0; r < 8; r++) for (let k = 0; k < 6; k++){
        x.fillStyle = cols[(r * 7 + k * 3) % cols.length];
        x.fillRect(k * 22 + (r % 2) * 7 + 1, r * 16 + 1, 19, 13);
      }
      const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; t.wrapS = t.wrapT = THREE.RepeatWrapping; t.repeat.set(2, 2); return t;
    })();
    // Izquierda: muro saliente revestido en piedra natural clara crema/arena (z = -308.4..-305.5, h = 3.25 m)
    const stM = new THREE.Mesh(new THREE.BoxGeometry(12.2, 3.25, 2.9), lam({ map: lightStoneTex }));
    stM.position.set(-83.1, 1.625, -306.95); stM.castShadow = stM.receiveShadow = true; g.add(stM);
    // Centro: porche rehundido (pared en x = -87.4, alero plano durazno hasta x = -89.2, z = -305.5..-302.5, h = 3.15 m)
    bx(g, -82.1, 0, -304.0, 10.6, 3.15, 3.0, TAN);                        // cuerpo retirado detrás del porche
    bx(g, -88.3, 2.38, -304.0, 1.85, .78, 3.0, TAN);                      // alero/cenefa alta sobre el porche
    bx(g, -87.44, 0, -304.95, .08, 2.15, .86, WOOD);                      // puerta madera barnizada izq.
    bx(g, -87.44, .75, -303.4, .08, 1.50, 1.80, '#5a361e');               // ventanal ancho con cortina enrollable marrón arriba
    bx(g, -87.48, .80, -303.4, .04, 1.05, 1.66, '#46545e');
    bx(g, -87.48, 1.88, -303.4, .05, .36, 1.68, '#54331d');
    flat.rect(-89.4, -305.5, -87.4, -302.6, .072, '#62903e');             // canterito de pasto frente al porche
    // Derecha: volumen de garaje MÁS ALTO (h = 3.55 m, z = -302.5..-299.6) con portón ancho de madera barnizada de 4 hojas
    bx(g, -83.1, 0, -301.05, 12.6, 3.55, 2.9, TAN);
    bx(g, -88.9, 3.55, -302.05, .85, .55, .85, TAN);                      // pequeño remate/chimenea arriba a la izq.
    bx(g, -89.44, 0, -301.05, .10, 2.22, 2.48, WOOD);                     // portón madera barnizada 4 hojas
    for (const gz of [-301.67, -301.05, -300.43]) bx(g, -89.50, 0, gz, .03, 2.22, .04, '#5a2f14'); // juntas 4 hojas
    flat.rect(-91.2, -302.6, -89.4, -299.6, .204, '#cfc9be');             // acceso vehicular garaje
    addCol(-89.4, -308.4, -76.8, -299.6); mapRects.push([-89.4, -308.4, -76.8, -299.6, TAN]);
  }
}

// Museo: brazo oeste de la L de la plaza de ejercicios, entrada del lado de la plaza
{
  const STONE = '#b3a58b', DARK = '#9c8e74';
  const g = group(-66.5, -361, Math.PI/2);
  // (según el 360 del usuario: una sola planta alta de piedra con cornisa recta, sin frontón; esquinas y puerta con sillares salientes)
  bx(g, 0, 0, -6, 14, 5.6, 12, STONE);
  bx(g, 0, 0, .05, 14.4, .6, .3, DARK);
  for (const x of [-6.6, -2.6, 2.6, 6.6]) for (let k = 0; k < 8; k++) bx(g, x, .6 + k * .6, .1, k % 2 ? .75 : 1.0, .58, .3, k % 2 ? DARK : '#c2b598');
  bx(g, 0, 5.4, .1, 14.8, .4, .6, DARK); bx(g, 0, 5.8, -.1, 14.2, .5, .5, STONE);
  for (const x of [-4.6, 4.6]) bx(g, x, 4.4, .12, 1.9, .6, .08, '#a89a80');                                                   // molduras sobre las ventanas
  bx(g, 0, 0, .12, 2.2, 3.4, .1, '#28323a'); for (const s of [-1, 1]) bx(g, s * .5, .1, .18, .8, 3.1, .02, '#5a6a72'); bx(g, 0, 3.4, .12, 2.6, .3, .2, DARK);   // puerta vidriada
  for (const x of [-4.6, 4.6]){ bx(g, x, .9, .12, 1.6, 3.2, .1, '#8d8878'); for (let k = 0; k < 9; k++) bx(g, x, 1.1 + k * .34, .18, 1.5, .05, .05, '#6f6a5d'); }   // ventanas altas con persiana
  bx(g, 0, 4.3, .25, .9, .5, .1, '#c2b598');
  bx(g, 0, 0, .9, 3.5, .2, 1.6, '#c9c3b5');
  for (const s of [-1, 1]){
    const lx = s * 2.6, lz = 2.2;
    bx(g, lx, 0, lz, .8, .45, 1.5, '#cfc9bd');
    bx(g, lx, .45, lz, .5, .45, 1.1, '#bdb8ad'); bx(g, lx, .7, lz + .55, .55, .55, .5, '#bdb8ad'); bx(g, lx, 1.05, lz + .75, .35, .35, .3, '#c9c4b9');
    addCol(-66.5 + lz - .8, -361 - lx - .5, -66.5 + lz + .8, -361 - lx + .5);
  }
  bx(g, -4.6, 0, 2, 1.6, .45, .45, '#a59e90'); bx(g, 4.6, 0, 2, 1.6, .45, .45, '#a59e90');
  colLocal(g, -7, -12, 7, .3, '#b3a58b');
  flat.rect(-66.5, -368, -63.5, -354, .07, '#b9b1a3');
  mapLabels.push([-74, -361, 'Museo']);
  // ---- alrededores del museo según el 360 (del frente hacia atrás) ----
  // frente: cantero con plantas, banco, cartel en poste verde y poste rojo
  bx(group(-65.4, -365.6), 0, 0, 0, 1.2, .3, 2.2, '#bdb8ad'); for (let k = 0; k < 3; k++) addBush(-65.4 + R(-.3, .3), -366.4 + k * .75, .45, .3);   // cantero al costado (la puerta queda libre)
  { const b = group(-64.4, -365.6, Math.PI / 2); bx(b, 0, .42, 0, 1.6, .08, .45, '#cfc9bd'); for (const s of [-1, 1]) bx(b, s * .65, 0, 0, .15, .42, .4, '#bdb8ad'); addCol(-64.7, -366.4, -64.1, -364.8); }
  { const p = group(-63.8, -363.2); poleIn(p, [0, 0, 0], [0, 2.3, 0], .05, '#2f7a3a'); cylIn(p, 0, 2.15, .04, .28, .04, '#f2f0ea', 0).rotation.set(Math.PI / 2, 0, 0); }
  poleIn(group(-63.4, -357.5), [0, 0, 0], [0, 4.5, 0], .07, '#c0392b');
  // costado sur (hacia Lavalle): revoque crema viejo con una ventana ciega, sillares en la esquina del frente, yucas y la fuente con estatua dentro de una rejita
  { const s = group(-72.5, -354, 0); bx(s, 0, 0, .02, 12, 5.6, .03, '#e6dcbc'); bx(s, -1.5, 1.2, .05, 1.3, 2.4, .04, '#d6cca8'); bx(s, 2.0, 1.0, .05, 1.2, 2.2, .04, '#d9cfac');
    for (let k = 0; k < 8; k++) bx(s, 5.85, .6 + k * .6, .1, .35, .58, k % 2 ? .5 : .7, k % 2 ? DARK : '#c2b598'); }
  addPalm(-70.5, -352.2, .75); addPalm(-73, -352.4, .8);
  { const fx = -65.3, fz = -352.4, f = group(fx, fz);
    cylIn(f, 0, .3, 0, 1.0, .6, '#e2ddd2'); cylIn(f, 0, .62, 0, .85, .05, '#7fa6c0'); cylIn(f, 0, 1.0, 0, .22, .8, '#e2ddd2'); cylIn(f, 0, 1.45, 0, .55, .14, '#e2ddd2');
    cylIn(f, 0, 1.9, 0, .14, .8, '#f2f0ea'); const h = new THREE.Mesh(new THREE.SphereGeometry(.13, 8, 6), lam({ color: 0xf2f0ea })); h.position.set(0, 2.4, 0); f.add(h);
    for (const [x0, z0, x1, z1] of [[-1.5, -1.5, 1.5, -1.5], [-1.5, 1.5, 1.5, 1.5], [-1.5, -1.5, -1.5, 1.5], [1.5, -1.5, 1.5, 1.5]]) { poleIn(f, [x0, .9, z0], [x1, .9, z1], .025, '#2f5a3a'); for (let t = 0; t <= 1; t += .2) poleIn(f, [x0 + (x1 - x0) * t, 0, z0 + (z1 - z0) * t], [x0 + (x1 - x0) * t, .9, z0 + (z1 - z0) * t], .02, '#2f5a3a'); }
    addCol(fx - 1.6, fz - 1.6, fx + 1.6, fz + 1.6); for (let k = 0; k < 3; k++) addBush(fx + R(-1.1, 1.1), fz + R(-1.1, 1.1), .4, 0); }
  // tanque de agua rojo sobre patas de hierro rojas, con el caño hacia el museo
  { const tx = -81, tz = -353.2, t = group(tx, tz), RT = '#a8423a';
    for (const [x, z] of [[-1.3, -1.3], [1.3, -1.3], [-1.3, 1.3], [1.3, 1.3]]) poleIn(t, [x, 0, z], [x, 3.4, z], .08, RT);
    for (const [a, b] of [[[-1.3, 0, -1.3], [1.3, 3.2, -1.3]], [[1.3, 0, -1.3], [-1.3, 3.2, -1.3]], [[-1.3, 0, 1.3], [1.3, 3.2, 1.3]], [[1.3, 0, 1.3], [-1.3, 3.2, 1.3]], [[-1.3, 0, -1.3], [-1.3, 3.2, 1.3]], [[1.3, 0, -1.3], [1.3, 3.2, 1.3]]]) poleIn(t, a, b, .04, RT);
    bx(t, 0, 3.4, 0, 3.0, .12, 3.0, '#8a3a32'); bx(t, 0, 3.5, 0, 3.0, 2.9, 3.0, '#b0473d'); for (const x of [-.75, .75]) bx(t, x, 3.5, 1.52, .04, 2.9, .03, '#8a3a32');
    poleIn(t, [1.3, 4.0, 0], [4.2, 4.0, 0], .09, '#8a3a32'); poleIn(t, [-1.3, 2.6, 0], [-3.6, 2.6, 0], .09, '#8a3a32'); poleIn(t, [-3.6, 2.6, 0], [-3.6, 0, 0], .09, '#8a3a32');
    addCol(tx - 1.5, tz - 1.5, tx + 1.5, tz + 1.5); }
  // atrás (hacia Córdoba): anexo moderno gris con la puerta vidriada (pintura de sandías) entre dos estatuas blancas,
  // pared blanca con puerta y aire acondicionado, volumen bajo gris con un cartelito; maquinaria agrícola vieja en el patio junto a los bomberos
  { const a = group(-84, -361, -Math.PI / 2);   // frente al oeste (Córdoba), local +x = sur · local -4..4 (z -365..-357)
    bx(a, 0, 0, -2.75, 8, 4.4, 5.5, '#a9a8a2'); bx(a, 0, 4.3, -2.75, 8.1, .12, 5.6, '#bdbcb6'); colLocal(a, -4, -5.5, 4, 0, '#a9a8a2');
    bx(a, .3, 0, .03, 3.4, 3.2, .05, '#8f8e88'); bx(a, .3, 0, -.4, 3.2, 3.0, .8, '#9a9993');                                         // nicho de la entrada
    { const c = document.createElement('canvas'); c.width = 192; c.height = 192; const x = c.getContext('2d');
      x.fillStyle = '#5a3a7a'; x.fillRect(0, 0, 192, 192); x.fillStyle = '#2f8a3a'; x.beginPath(); x.arc(96, 120, 70, Math.PI, 0); x.fill();
      x.fillStyle = '#e8453a'; x.beginPath(); x.arc(96, 120, 58, Math.PI, 0); x.fill(); x.fillStyle = '#1f1f1f'; for (const [px, py] of [[70, 100], [96, 90], [122, 100], [84, 110], [108, 110]]) x.fillRect(px, py, 5, 8);
      x.fillStyle = '#3a9a8a'; x.fillRect(0, 0, 192, 40); const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace;
      const m = new THREE.Mesh(new THREE.PlaneGeometry(2.4, 2.6), lam({ map: t })); m.position.set(.3, 1.4, .02 - .8 + .82); a.add(m); bx(a, .3, 0, .0, 2.6, 2.8, .04, '#f2f2ee'); m.position.z = .05; }
    for (const x of [-1.9, 2.5]) { bx(a, x, 0, .6, .7, .5, .7, '#e8e6e0'); cylIn(a, x, .9, .6, .14, .8, '#f4f2ec'); cylIn(a, x, 1.55, .6, .18, .5, '#f4f2ec'); const h = new THREE.Mesh(new THREE.SphereGeometry(.14, 8, 6), lam({ color: 0xf4f2ec })); h.position.set(x, 2.0, .6); a.add(h); bx(a, x - .2, 1.35, .6, .07, .5, .07, '#f4f2ec'); }   // estatuas blancas
    bx(a, 3.6, .3, .03, .06, 3.5, .1, '#d9d9d4'); bx(a, 3.75, .3, .03, .06, 3.5, .1, '#d9d9d4');                                    // caños de bajada
  }
  { const w = group(-80.5, -366.8, -Math.PI / 2);   // pared blanca retirada con puerta y aire (z -368.5..-365)
    bx(w, 0, 0, -1, 3.5, 3.6, 2, '#efeee8'); colLocal(w, -1.75, -2, 1.75, 0, '#efeee8'); bx(w, .4, 0, .03, .9, 2.2, .05, '#e6e6e2'); for (let y = .4; y < 2; y += .2) bx(w, .4, y, .07, .8, .03, .01, '#b9b9b4');
    bx(w, 1.2, 2.3, .2, .7, .45, .3, '#e4e4e0'); }
  // entre el museo y el cuartel de bomberos: cerco de alambre cuadriculado (con la maquinaria vieja detrás)
  { const f = group(-67.2, -370, Math.PI / 2), L = 4.2, H = 1.8;   // local x a lo largo del cerco (z -372.1..-367.9)
    for (const x of [-L / 2, 0, L / 2]) bx(f, x, 0, 0, .08, H + .1, .08, '#8f969a');
    for (let x = -L / 2; x <= L / 2 + .01; x += .2) bx(f, x, 0, 0, .015, H, .015, '#a9b0b4');
    for (let y = .1; y <= H; y += .2) bx(f, 0, y, 0, L, .015, .015, '#a9b0b4');
    addCol(-67.4, -372.1, -67, -367.9); }
  { const m = group(-70.5, -370, .3); for (const s of [-1, 1]) { const w = new THREE.Mesh(new THREE.TorusGeometry(.55, .05, 6, 16), lam({ color: 0x5a4a3a })); w.position.set(s * 1.0, .55, 0); w.rotation.y = Math.PI / 2; m.add(w); }
    poleIn(m, [-1, .55, 0], [1, .55, 0], .05, '#4a3a2e'); poleIn(m, [0, .55, 0], [-.3, .3, 1.5], .05, '#6a3a2a'); addCol(-71.6, -371.2, -69.4, -368.8); }
  // maquinaria agrícola vieja (arados y ruedas de carro) en el patio, junto a la pared de los bomberos
  for (const [x, z, r] of [[-86, -369, .2], [-84.5, -371, -.3], [-87.5, -366.8, .1]]) { const m = group(x, z, r);
    for (const s of [-1, 1]) { const w = new THREE.Mesh(new THREE.TorusGeometry(.55, .05, 6, 16), lam({ color: 0x5a4a3a })); w.position.set(s * 1.0, .55, 0); w.rotation.y = Math.PI / 2; m.add(w); }
    poleIn(m, [-1, .55, 0], [1, .55, 0], .05, '#4a3a2e'); poleIn(m, [0, .55, 0], [0, .3, 1.8], .05, '#6a3a2a'); bx(m, 0, .2, -.6, 1.6, .12, .9, '#7a4a34'); addCol(x - 1.2, z - 1.2, x + 1.2, z + 1.2); }
  flat.rect(-89.5, -372, -78.5, -350.5, .06, '#6f9a45');
  addTree(-87.2, -356.2, 1.4, false, ['#9c7a45', '#8a6a3a']);
}

// Cuartel de bomberos: brazo oeste, entrada por ambos lados (calle Córdoba y lado de la plaza)
{
  const BRICK = '#b8978a', RED = '#d8261f';
  const g = group(-89, -385, -Math.PI/2);
  bx(g, -7, 0, -5.5, 12, 6, 11, BRICK);     // (la mitad del lado de la plaza de este tramo es el ala de techo curvo, armada más abajo)
  bx(g, 6, 0, -8.3, 14, 8.6, 16.6, BRICK);   // cuerpo de 2 plantas: del lado de la plaza su cara (la del portón) queda metida en x = -72.4
  for (const side of [1]){   // portones rojos y cartel: solo sobre Córdoba (el lado de la plaza se arma aparte, según la foto)
    const zf = side > 0 ? .02 : -21.02, ry = side > 0 ? 0 : Math.PI;
    for (const [x, w] of [[-7.4, 8.6], [6, 10]]){
      bx(g, x, 0, zf, w, 4.5, .12, RED);
      for (let k = 0; k < 7; k++) bx(g, x - w/2 + .6 + k * (w - 1.2) / 6, 3.2, zf + side * .05, .6, .4, .05, '#3b2220');
      for (let k = 1; k < 12; k++) bx(g, x - w/2 + k * w / 12, 0, zf + side * .05, .04, 4.5, .04, '#a51b16');
    }
    bx(g, -1.2, 0, zf, 1.2, 2.4, .12, RED);
  }
  signIn(g, 'BOMBEROS VOLUNTARIOS DE PEYRANO', -7, 5.1, .12, 11, 1.1, '#c0201a', '#ffffff');
  for (let k = 0; k < 5; k++){ bx(g, 2.2 + k * 1.9, 6.1, .05, 1.2, .9, .1, '#f2efe8'); bx(g, 2.2 + k * 1.9, 6.2, .1, 1, .7, .05, '#2f5f9a'); }
  poleIn(g, [-1.2, 0, 2.2], [-1.2, 7, 2.2], .05, '#e8e8e8');
  for (const x of [-12, -2.6, 0.2, 12.5]) poleIn(g, [x, 0, 2], [x, 1.1, 2], .08, RED);
  addCol(-89, -386, -72.4, -372); addCol(-89, -398, -78, -386); mapRects.push([-89, -398, -72.4, -372, '#b8978a']);
  flat.rect(-68, -397, -63.5, -373, .07, '#bdb6a8');
  mapLabels.push([-79, -385, 'Bomberos']);
  // ---- lado de la plaza (planta dibujada por el usuario, vista desde arriba; de izquierda/sur a derecha/norte) ----
  // alero con murito adelantado (z -372..-376) · cara del cuerpo de 2 plantas METIDA con el portón rojo (x = -72.4) ·
  // sector beige el más adelantado (x hasta -65.5, z -383.1..-398) con su costado de techo curvo (borde blanco) mirando al portón
  const XM = -72.4, XA = -68.5, XB = -65.5, ZB = -383.1;
  const fr = (x, z0, z1) => group(x, (z0 + z1) / 2, Math.PI / 2);   // mira al +x (plaza): local x = -(z - zc), +x = norte = la derecha en la foto
  const rejaR = (g, x, y0, z, w, h) => { for (let k = 1; k < Math.round(w / .13); k++) bx(g, x - w / 2 + k * .13, y0, z, .03, h, .03, '#1f1f1f'); for (const y of [y0, y0 + h - .04]) bx(g, x, y, z, w + .04, .04, .04, '#1f1f1f'); };
  { const f = fr(XM, -372, -386);   // cara metida: portón corredizo rojo, puertita roja, faja blanca con 6 ventanitas
    for (let y = .2; y < 8.6; y += .2) bx(f, 0, y, .02, 14, .015, .01, '#c9a99a');
    bx(f, .5, 5.3, .03, 8.0, 1.2, .05, '#ece8e0'); for (let k = 0; k < 6; k++) bx(f, -3.1 + k * 1.3, 5.55, .07, .8, .7, .03, '#3b4a55');
    bx(f, .4, 0, .03, 4.8, 3.9, .05, '#b02a22'); bx(f, .4, .02, .07, 4.6, 3.8, .04, RED); bx(f, .4, .02, .1, .04, 3.8, .02, '#8a1a14');
    for (let k = 0; k < 7; k++) bx(f, -1.6 + k * .62, 2.75, .1, .45, .3, .02, '#3b2220');
    bx(f, 3.3, 0, .03, 1.1, 2.3, .05, '#c9a99a'); bx(f, 3.3, .02, .07, .95, 2.2, .04, RED);
    bx(f, 3.0, 8.6, -.4, .6, 1.0, .6, BRICK);                                                                                  // chimenea
  }
  { // alero adelantado: murito bajo de ladrillo al frente y a los costados, losa de hormigón sobre columnas, adentro oscuro
    const w = group(0, 0);
    bx(w, XA - .15, 0, -374, .3, 1.4, 4, BRICK); bx(w, (XM + XA) / 2, 0, -375.85, XA - XM, 1.4, .3, BRICK); bx(w, (XM + XA) / 2, 0, -372.15, XA - XM, 1.4, .3, BRICK);
    for (let y = .15; y < 1.4; y += .15) bx(w, XA, y, -374, .02, .015, 4, '#c9a99a');
    bx(w, XA + .02, .6, -374.6, .03, .4, .8, '#ece8e0');                                                                       // placa
    bx(w, (XM + XA) / 2 + .1, 2.85, -374, XA - XM + .4, .3, 4.5, '#b9b4aa'); bx(w, XA + .2, 2.85, -374, .08, .3, 4.5, '#ece8e0');
    for (const z of [-372.3, -374, -375.7]) bx(w, XA - .2, 1.4, z, .2, 1.45, .2, '#b9b4aa');
    bx(w, XM + .05, 0, -374, .1, 2.8, 3.6, '#3a3532');
    flat.rect(XM, -376, XA, -372, .073, '#a9a49a');
    addCol(XA - .3, -376, XA, -372); addCol(XM, -376, XA, -375.7); addCol(XM, -372.3, XA, -372);
  }
  { // sector beige (el más adelantado): faja gruesa gris arriba, ventana angosta, ventanal, galería con columnas de ladrillo, ventana y puerta
    const ZN = -394.5;   // el sector beige termina acá: más al norte va la reja del patio
    const P = [[-78, ZN], [XB, ZN], [XB, -393.95], [XB - 2, -393.95], [XB - 2, -389.75], [XB, -389.75], [XB, ZB], [-78, ZB]]; extrudePoly(P, 0, 3.4, '#e2d6bc');
    addCol(-78, ZN, XB, ZB); mapRects.push([-78, ZN, XB, ZB, '#e2d6bc']);
    const h = fr(XB, ZB, ZN);   // local -5.7..5.7 (centro z -388.8)
    bx(h, 0, 2.45, .2, 11.6, .95, .45, '#a9a59c');
    bx(h, -4.3, .2, .03, .4, 2.1, .05, '#3b4a55'); bx(h, -1.8, .8, .03, 2.0, 1.4, .05, '#e6e3dc'); bx(h, -1.8, .85, .07, 1.85, 1.3, .02, '#3b4a55');
    bx(h, 3.05, 0, -1.0, 4.2, .1, 2.0, '#c9c2b4'); bx(h, 3.05, 2.45, -1.0, 4.2, .95, 2.0, '#e2d6bc');                          // galería (piso y dintel)
    for (const x of [1.15, 4.95]) bx(h, x, 0, -.25, .45, 2.45, .45, '#b0603a');
    bx(h, 2.25, .9, -1.95, 1.1, 1.3, .04, '#3b4a55'); bx(h, 3.95, 0, -1.95, .9, 2.2, .04, '#b0603a');
    bx(h, .75, 3.4, -4, .6, .7, .6, '#c9c2b4');
    // costado sur con el techo curvo de ladrillo y borde blanco (mira al portón): bajo adelante, alto contra el cuerpo de 2 plantas
    const LW = XB - XM, HW = 6.6;
    const sh = new THREE.Shape(); sh.moveTo(0, 0); for (let k = 0; k <= 18; k++){ const u = k / 18 * LW; sh.lineTo(u, HW * Math.sqrt(Math.max(0, 1 - (u / LW) ** 2))); } sh.lineTo(0, 0);
    const a = group(XM, -386.1); a.add(new THREE.Mesh(new THREE.ExtrudeGeometry(sh, { depth: 3, bevelEnabled: false }), lam({ color: BRICK })));
    for (let k = 0; k < 18; k++){ const u = (k + .5) / 18 * LW, s = Math.sqrt(Math.max(.02, 1 - (u / LW) ** 2)), v = HW * s, dv = -HW * (u / (LW * LW)) / s;
      boxIn(a, u, v, 3.04, LW / 18 * 1.15 * Math.hypot(1, dv), .26, .16, '#ece8e0', 0, Math.atan(dv)); }
    for (let y = .2; y < HW; y += .2) { const half = y / HW; const ul = LW * Math.sqrt(Math.max(0, 1 - half * half)); bx(a, ul / 2, y, 3.012, ul, .015, .008, '#c9a99a'); }
    const s2 = group(0, ZB + .028, 0); bx(s2, -70.6, .9, .02, 1.5, 1.4, .05, '#b02a22'); bx(s2, -70.6, .95, .06, 1.35, 1.3, .02, '#3b4a55'); for (let k = 1; k < 5; k++) bx(s2, -71.27 + k * .27, .95, .08, .03, 1.3, .02, '#b02a22');
    bx(s2, -68.7, 0, .02, .95, 2.2, .05, '#ece8e0'); bx(s2, -68.7, .02, .06, .8, 2.1, .03, '#f2f2ee'); bx(s2, -67.6, 0, .02, 1.0, 1.0, .05, '#e6e1d6');
    flat.rect(XB, ZN, -63.5, ZB, .065, '#6f9a45'); flat.rect(XB, -392.6, -63.5, -391.6, .068, '#c9c4b8');
    // reja del patio (sigue la línea del sector beige hasta la esquina de Sagarduy): murito, reja negra, portón blanco de chapa calada y cerco de ligustro;
    // atrás el patio con árboles, que se une con los patios de las casas de Monguillot
    { const r = fr(XB - .1, ZN, -402.5);   // local -4..4 (+x = norte)
      bx(r, 0, 0, 0, 8, .35, .25, '#bdb8ac'); rejaR(r, -2.6, .35, 0, 2.7, 1.4);
      bx(r, -.55, 0, 0, 1.8, 1.75, .06, '#f2f2ee'); for (let k = 0; k < 5; k++) bx(r, -1.25 + k * .35, .3, .04, .12, 1.2, .01, '#cfcfca');
      bx(r, .55, 0, 0, .4, 2.0, .4, '#c9c4b8'); bx(r, 2.4, .35, -.2, 3.1, 1.4, .7, '#4f7a35');
      colLocal(r, -4, -.2, 4, .2, null); }
    { const r2 = group(-64.55, -402.5); bx(r2, 0, 0, 0, 2, .35, .25, '#bdb8ac'); rejaR(r2, 0, .35, 0, 2, 1.4); addCol(-65.6, -402.7, -63.5, -402.3); }
    flat.rect(-77.5, -402.5, XB - .1, ZN, .064, '#6f9a45');
  }
  flat.rect(XM, ZB, -63.5, -376, .072, '#c9c4b8'); flat.rect(XA, -376, -63.5, -372, .072, '#c9c4b8');   // playón del portón
  addTree(-64.4, -374.5, 1.25, false, ['#3f6a2a', '#4b7a30', '#557f35']);
  { // al norte del cuartel: jardín con reja negra y portoncito (z -398..-409)
    flat.rect(-77.5, -409, -63.5, -398, .065, '#6f9a45'); plazaRects.push([-77.5, -409, -63.5, -398]);
    // (el frente de este terreno, con la reja negra, mira a la calle Sagarduy: se arma en el bloque "Sagarduy")
    signIn(group(-65.4, -394.7), 'Sagarduy  1000', 0, 2.5, 0, 1.3, .28, '#1f3a8a', '#ffffff', Math.PI / 2);
  }
}

// Comuna de Peyrano: extendida hacia el costado con puerta principal mirando hacia la plaza del escenario,
// base de piedra, paredes verde lima, ventanas con rejas, mansarda gris y canteros de hormigón.
{
  const g = group(20, -415.5, -Math.PI/2);       // z local = 0 mira a la avenida; x = 13 local mira al sur (hacia la plaza)
  const CH = 4.2;
  const foot = [[-13, 0], [13 - CH, 0], [13, -CH], [13, -21], [-13, -21]];
  const extrudeIn = (poly, y0, h, col) => {
    const sh = new THREE.Shape(poly.map(([x, z]) => new THREE.Vector2(x, -z)));
    const geo = new THREE.ExtrudeGeometry(sh, { depth: h, bevelEnabled: false }).rotateX(-Math.PI/2);
    const m = new THREE.Mesh(geo, lam({ color: col })); m.position.y = y0; m.castShadow = m.receiveShadow = true; g.add(m); return m;
  };
  extrudeIn(offsetPoly(foot, .14), 0, 1.0, '#d9d0bf');
  extrudeIn(foot, 0, 3.7, '#c8d94a');
  g.add(frustumMesh(offsetPoly(foot, 1.0), offsetPoly(foot, -1.4), 3.7, 1.15, '#8e9398'));
  extrudeIn(offsetPoly(foot, -1.4), 4.85, .1, '#a7abaf');
  // Cartel sobre la mansarda en la esquina mirando a la plaza / avenida
  const sg = signIn(g, 'COMUNA DE PEYRANO', -1.5, 4.28, .32, 8.5, .62, '#8e9398', '#f1ead6');
  sg.rotation.x = -Math.atan2(2.4, 1.15);
  const sgP = signIn(g, 'COMUNA DE PEYRANO', 13.36, 4.28, -9, 9, .62, '#8e9398', '#f1ead6', Math.PI/2);
  sgP.rotation.order = 'YXZ'; sgP.rotation.x = -Math.atan2(2.4, 1.15);
  // Ventanas con rejas sobre la cara de la avenida
  const barred = (x, w) => { bx(g, x, 1.15, .04, w, 1.95, .1, '#3a4248'); for (let k = 0; k <= Math.round(w / .3); k++) bx(g, x - w/2 + k * w / Math.round(w / .3), 1.15, .11, .06, 1.95, .05, '#80858b'); };
  const grid = (x, w) => { bx(g, x, 1.05, .04, w, 2.1, .1, '#2c3338'); for (let k = 0; k <= 4; k++){ bx(g, x - w/2 + k * w/4, 1.05, .11, .07, 2.1, .05, '#3a4248'); } bx(g, x, 2.1, .11, w, .07, .05, '#3a4248'); };
  barred(-11.2, 1.6); barred(-8.6, 1.6); barred(-6, 1.6); grid(-2.6, 2.6); grid(.8, 2.6); barred(4.3, 1.6);
  // Fachada larga mirando hacia la plaza del escenario (x = 13 local) con PUERTA PRINCIPAL y ventanas con rejas
  const barredSide = (z, w) => { bx(g, 13.05, 1.15, z, .1, 1.95, w, '#3a4248'); for (let k = 0; k <= Math.round(w / .32); k++) bx(g, 13.11, 1.15, z - w/2 + k * w / Math.round(w / .32), .05, 1.95, .06, '#80858b'); };
  barredSide(-6.0, 2.4); barredSide(-9.2, 2.2);
  // Puerta principal vidriada blanca/aluminio mirando a la plaza
  bx(g, 13.06, 0, -12.0, .14, 2.75, 2.3, '#eceef0');
  bx(g, 13.12, .15, -12.0, .06, 2.45, 1.9, '#394b59');
  bx(g, 13.15, 0, -12.0, .05, 2.7, .08, '#eceef0');
  for (let y = .75; y <= 2.1; y += .65) bx(g, 13.15, y, -12.0, .05, .07, 1.9, '#eceef0');
  barredSide(-15.0, 2.2);
  bx(g, 13.06, 0, -19.2, .12, 2.4, 1.1, '#5f6a4a');
  // Canteros de hormigón gris, mástil y utilitario blanco estacionado al costado (como en Street View)
  const planter = (x, z, w, dd) => { bx(g, x, 0, z, w, .6, dd, '#c9cfd4'); bx(g, x, .6, z, w - .2, .05, dd - .2, '#3a2c20'); };
  planter(-4.5, 1.2, 9.5, 1.1); planter(-12, 1.2, 1.8, 1.1); planter(15.2, -5.0, 2.0, 4.2);
  for (const [lx, lz] of [[-8.5, 1.2], [-5, 1.2], [-1.5, 1.2], [15.2, -5.0], [-12, 1.2]]){
    const wx = 20 + -lz, wz = -415.5 + lx;
    addBush(wx + .01, wz, .55, .6);
  }
  poleIn(g, [15.2, 0, -6.2], [15.2, 8.8, -6.2], .06, '#e8e8e8');
  cylIn(g, 6.5, .45, 2.2, .3, .9, '#4c9a3a');
  const van = makeCar(0xf3f5f7); g.add(van.g); van.g.position.set(16.8, 0, -25.5); van.g.rotation.y = Math.PI/2;
  colLocal(g, -13, -21, 13, 0, '#c8d94a');
  // Pasto delantero y acceso de baldosas desde la vereda/calle de la plaza hasta la puerta principal
  flat.rect(13.5, -429, 20, -402, .06, '#6a9a45');
  flat.rect(29, -403.5, 35, -399.5, .075, '#cfc9bd');
  mapLabels.push([30, -415, 'Comuna']);
}

{
  const WATER = '#4f7f99';
  for (const w of OSM.green) fillPoly(osmPts(w.p), -.045, '#7d9c55');
  for (const w of OSM.landfill) fillPoly(osmPts(w.p), -.045, '#9a8a6a');
  for (const w of OSM.wetland) fillPoly(osmPts(w.p), -.04, '#6a8a5c');
  for (const w of OSM.scrub){ const pts = osmPts(w.p); if (pts.length < 3) continue; fillPoly(pts, -.042, '#5f7c40'); const [x0, z0, x1, z1] = bboxOf(pts); const n = Math.min(80, Math.abs(polyArea(pts)) / 120); for (let k = 0; k < n; k++){ const x = R(x0, x1), z = R(z0, z1); if (inPoly(x, z, pts) && !inTownBox(x, z, -20)) addBush(x, z, R(.8, 1.6)); } }
  for (const w of OSM.water){ const pts = osmPts(w.p); if (pts.length > 2){ fillPoly(pts, -.025, WATER); mapRoads.push({ pts: [...pts, pts[0]], w: 4, col: WATER, y: .05 }); } }
  for (const w of OSM.waterway){ const pts = []; for (let i = 0; i < w.p.length; i += 2) pts.push([w.p[i], w.p[i + 1]]); const wd = w.k === 'river' ? 10 : w.k === 'stream' ? 5 : 3; flat.ribbon(pts, wd + 3, -.035, '#6f8a52'); flat.ribbon(pts, wd, -.025, WATER); mapRoads.push({ pts, w: wd, col: WATER, y: .05 }); if (w.n) mapLabels.push([...pts[Math.floor(pts.length / 2)], w.n]); }
  // parques reales (los del centro ya son las cuatro plazas)
  for (const w of OSM.park){
    const pts = osmPts(w.p); if (pts.length < 3) continue;
    const [cx, cz] = polyCenter(pts);
    if (Math.abs(cx - MX) < 110 && Math.abs(cz - MZ) < 110) continue;
    OSM_PARKS.push(pts);
    fillPoly(pts, -.028, '#5f9140');
    const [x0, z0, x1, z1] = bboxOf(pts), n = Math.min(60, Math.abs(polyArea(pts)) / 260);
    for (let k = 0; k < n; k++){ const x = R(x0, x1), z = R(z0, z1); if (inPoly(x, z, pts) && !overlap(x - 1.5, z - 1.5, x + 1.5, z + 1.5)) treeSpots.push([x, z, R(.9, 1.4), false]); }
    mapRects.push([...bboxOf(pts), '#3f9a3a']); if (w.n) mapLabels.push([cx, cz, w.n]);
  }
  // desvíos ferroviarios en desuso / abandonados
  for (const w of OSM.siding){ const pts = []; for (let i = 0; i < w.p.length; i += 2) pts.push([w.p[i], w.p[i + 1]]); flat.ribbon(pts, 3.4, .058, '#8f8676'); for (const o of [-.72, .72]) flat.ribbon(pts, .12, .3, '#8a7766', o); }
  // hileras de árboles
  for (const w of OSM.treerow){ for (let i = 0; i + 3 < w.p.length; i += 2){ const ax = w.p[i], az = w.p[i + 1], bx2 = w.p[i + 2], bz = w.p[i + 3], l = Math.hypot(bx2 - ax, bz - az); for (let t = 0; t < l; t += 7) treeSpots.push([ax + (bx2 - ax) * t / l, az + (bz - az) * t / l, R(1, 1.4), false]); } }
  // Predio del SEMILLERO (silos y galpones junto a Maipú, NO es de la estación): galpones de chapa gris con su forma real (OSM).
  // El galpón más cercano a Maipú es blanco con letras rojas grandes (video del usuario).
  const GALPON_TEXTO = 'SEMILLERO';   // <- texto de las letras rojas del galpón blanco (a confirmar con el usuario)
  const whs = OSM.warehouse.map(w => osmPts(w.p)).filter(p => p.length >= 3);
  const dMaipu = p => { const [x, z] = polyCenter(p); return distToPolyline(x, z, BV_FC_NE); };
  const whiteIdx = whs.length ? whs.reduce((bi, p, i) => dMaipu(p) < dMaipu(whs[bi]) ? i : bi, 0) : -1;
  let whiteGalpon = null;
  whs.forEach((pts, i) => {
    const white = i === whiteIdx;
    const o = obb(pts), g = group(o.cx, o.cz, Math.PI / 2 - o.ang), l = o.len, wd = o.wid;
    bx(g, 0, 0, 0, wd, 7, l, white ? '#f1f0ec' : '#a9afb3'); bx(g, 0, 0, 0, wd + .1, .7, l + .1, white ? '#d9d6cf' : '#8d9296');
    if (!white) for (let k = -l/2 + .6; k < l/2; k += .9) for (const s of [-1, 1]) bx(g, s * (wd/2 + .02), .7, k, .05, 6.3, .08, '#969ca0');   // chapa acanalada
    gableIn(g, 0, 7, 0, l + .6, Math.min(3, wd * .22), wd + .8, '#9aa3a8', Math.PI/2);
    for (const s of [-1, 1]) bx(g, 0, 0, s * (l/2 + .02), Math.min(5, wd * .45), 5.2, .1, '#4f5559');
    if (white){
      for (const s of [-1, 1]) signIn(g, GALPON_TEXTO, s * (wd/2 + .07), 4.3, 0, Math.min(l * .75, 26), 2.2, '#f1f0ec', '#c8261e', s > 0 ? Math.PI/2 : -Math.PI/2);
      whiteGalpon = o;
    }
    colLocal(g, -wd/2, -l/2, wd/2, l/2, white ? '#f1f0ec' : '#a9afb3');
  });
  // silos de ladrillo (celdas con su forma real) con techo cónico gris
  for (const w of OSM.silo){
    const pts = osmPts(w.p); if (pts.length < 3) continue;
    const [x0, z0, x1, z1] = bboxOf(pts), [cx, cz] = polyCenter(pts), r = Math.min(x1 - x0, z1 - z0) / 2;
    extrudePoly(pts, 0, 22, '#9e5440');
    for (let y = 3; y < 22; y += 3) extrudePoly(pts.map(([x, z]) => [cx + (x - cx) * 1.01, cz + (z - cz) * 1.01]), y, .12, '#8a4636');
    const cap = new THREE.Mesh(new THREE.ConeGeometry(r + .25, r * .7, 20).translate(0, r * .35, 0), lam({ color: 0x9aa1a6 })); cap.position.set(cx, 22, cz); cap.castShadow = true; scene.add(cap);
    addCol(x0, z0, x1, z1); mapRects.push([x0, z0, x1, z1, '#9e5440']);
  }
  if (OSM.silo.length){ const c = polyCenter(osmPts(OSM.silo[0].p)); mapLabels.push([c[0], c[1], 'Semillero']); }
  // Maipú (OSM "Bv. Ferrocarril" NE) de Av. Centenario a Bv. Independencia: hilera de árboles viejos en la franja de pasto
  // del lado del semillero y faroles de poste oxidado del lado de las casas
  {
    let acc = 0, lampAcc = 0;
    for (let i = 0; i < BV_FC_NE.length - 1; i++){
      const [ax, az] = BV_FC_NE[i], [bx2, bz] = BV_FC_NE[i + 1];
      if (Math.max(ax, bx2) < -300) break;   // hasta Bv. Independencia
      const L = Math.hypot(bx2 - ax, bz - az), tx = (bx2 - ax) / L, tz = (bz - az) / L, nx = -tz, nz = tx;
      const sideSem = railDist(...AB(ax + nx * 10, az + nz * 10)) > railDist(...AB(ax - nx * 10, az - nz * 10)) ? 1 : -1;
      for (let d = acc; d < L; d += 9){
        const px = ax + tx * d, pz = az + tz * d, [pa, pb] = AB(px, pz);
        if (Math.abs(pa - Math.round(pa / G) * G) * S < 9 || Math.abs(pb - Math.round(pb / G) * G) * S < 9) continue;   // libre en los cruces
        const x = px + nx * sideSem * 8.5, z = pz + nz * sideSem * 8.5;
        if (!overlap(x - 1.5, z - 1.5, x + 1.5, z + 1.5)) treeSpots.push([x, z, R(1.25, 1.6), false]);
        if ((lampAcc += 9) >= 36){ lampAcc = 0; const lx = px - nx * sideSem * 6, lz = pz - nz * sideSem * 6; if (!overlap(lx - .3, lz - .3, lx + .3, lz + .3)){ poles.add(lx, 0, lz, .14, 8, .14, 0, '#a8603e'); trims.add(lx + nx * sideSem * .9, 7.9, lz + nz * sideSem * .9, .4, .15, .4, 0, '#d8d4c8'); addCol(lx - .15, lz - .15, lx + .15, lz + .15); } }
      }
      acc = (acc - L) % 9; if (acc < 0) acc += 9;
    }
  }
  // acoplado de camión (lona verde) estacionado sobre Maipú, frente al galpón blanco
  if (whiteGalpon){
    let best = null;
    for (let i = 0; i < BV_FC_NE.length - 1; i++){
      const [ax, az] = BV_FC_NE[i], [bx2, bz] = BV_FC_NE[i + 1], dx = bx2 - ax, dz = bz - az, L2 = dx * dx + dz * dz;
      const t = Math.max(0, Math.min(1, ((whiteGalpon.cx - ax) * dx + (whiteGalpon.cz - az) * dz) / L2)), qx = ax + dx * t, qz = az + dz * t;
      const d = Math.hypot(whiteGalpon.cx - qx, whiteGalpon.cz - qz); if (!best || d < best.d) best = { d, qx, qz, dx, dz };
    }
    const L = Math.hypot(best.dx, best.dz), tx = best.dx / L, tz = best.dz / L, nx = -tz, nz = tx;
    const s = ((whiteGalpon.cx - best.qx) * nx + (whiteGalpon.cz - best.qz) * nz) > 0 ? 1 : -1;
    const g = group(best.qx + nx * s * 3.2, best.qz + nz * s * 3.2, Math.atan2(tx, tz));
    bx(g, 0, .9, 0, 2.5, .35, 12, '#2b2d30');
    bx(g, 0, 1.25, 0, 2.5, 1.1, 12, '#3a7a4c');
    const tarp = new THREE.Mesh(new THREE.CylinderGeometry(1.25, 1.25, 12, 18, 1, false, Math.PI / 2, Math.PI), lam({ color: 0x2f7a4a, side: THREE.DoubleSide }));
    tarp.rotation.x = Math.PI / 2; tarp.position.y = 2.35; tarp.castShadow = true; g.add(tarp);
    for (const zz of [-4.2, -3, -1.8]) for (const sx of [-1, 1]) cylIn(g, sx * 1.05, .5, zz, .5, .4, '#1b1b1b', Math.PI / 2);
    for (const sx of [-1, 1]) poleIn(g, [sx * .9, .9, 4.6], [sx * .9, 0, 4.6], .06, '#555b60');
    colLocal(g, -1.3, -6, 1.3, 6, null);
  }
  // otros edificios mapeados
  for (const w of OSM.building){ const pts = osmPts(w.p); if (pts.length < 3) continue; extrudePoly(pts, 0, 4.2, '#e8dcc4'); extrudePoly(pts, 4.2, .4, '#cfc6b5'); addCol(...bboxOf(pts)); mapRects.push([...bboxOf(pts)]); }
}

// frente largo de ladrillo con aletas verticales sobre Jujuy y volumen de 2 pisos con marquesina blanca sobre Córdoba.
{
  const X0 = (156 - CA) * S + shA(156) + .6, Z0 = (195 - CB) * S + shB(195) + .6;   // esquina NO de la manzana
  const g = group(X0, Z0);   // local +x = hacia el este por Jujuy, local +z = hacia el sur por Córdoba
  const BR = '#9c5a45', BR2 = '#8e4f3c', WH = '#f1f0ec', GL = '#46596a', FR = '#d5dde0';
  // masa principal de dos pisos
  bx(g, 16, 0, 11, 24, 7.3, 22, BR); bx(g, 2, 0, 13, 4, 7.3, 18, BR);
  bx(g, 14, 7.3, 11, 28.6, .6, 22.6, WH);                         // coronamiento blanco
  // ---- frente sobre Jujuy (z = 0) ----
  for (let x = 4.4; x <= 18; x += 1.6){ bx(g, x, 0, -.2, .42, 7.3, .4, BR2); }                   // aletas verticales de ladrillo
  for (let x = 5.2; x < 18; x += 1.6){ bx(g, x, .6, .02, 1.1, 6.3, .06, GL); for (let y = 1; y < 6.8; y += .55) bx(g, x, y, -.03, 1.1, .05, .03, '#9fb0bb'); }
  bx(g, 23, 3.2, -.7, 10.4, .3, 1.4, WH);                         // losa blanca a media altura (parte izquierda de la foto)
  for (const [x, w] of [[20.6, 4.2], [25.4, 4.2]]){
    for (const [y0, h] of [[.8, 2.2], [4, 2.8]]){ bx(g, x, y0, .02, w, h, .06, FR); for (let k = 1; k < 5; k++) bx(g, x - w/2 + k * w / 5, y0, -.02, .05, h, .03, '#b9c2c6'); bx(g, x, y0 + h / 2, -.02, w, .05, .03, '#b9c2c6'); }
  }
  bx(g, 26.4, 1.6, -.25, 1, .55, .45, '#e8e8e6');                 // aire acondicionado
  bx(g, 16.5, 0, -1.2, 21, .7, 1.6, BR2); bx(g, 16.5, .7, -1.2, 20.6, .06, 1.3, '#6a8f45');   // cantero bajo de ladrillo con pasto
  // ---- frente sobre Córdoba (x = 0) ----
  for (let z = 7.4; z <= 20; z += 1.6) bx(g, -.2, 0, z, .4, 7.3, .42, BR2);
  for (let z = 8.2; z < 20; z += 1.6){ for (const [y0, h] of [[.7, 2.6], [4.1, 2.9]]){ bx(g, .02, y0, z, .06, h, 1.1, GL); for (let y = y0 + .4; y < y0 + h; y += .55) bx(g, -.03, y, z, .03, .05, 1.1, '#9fb0bb'); } }
  bx(g, -.02, 0, 5.6, .1, 3.4, 3, WH); bx(g, -.3, 1.9, 5.2, .45, .55, 1, '#e8e8e6');             // pared blanca con aire acondicionado
  bx(g, -.7, 3.4, 13.5, 1.6, .35, 27, WH);                        // marquesina blanca larga
  bx(g, -.1, 0, 23.5, .12, 2.7, 5, '#b9bec3'); for (let z = 21.2; z < 26; z += .35) bx(g, -.16, 0, z, .04, 2.7, .05, '#9ea4a9');   // portón gris
  bx(g, .3, 0, 21, .8, 3.4, .5, WH); bx(g, .3, 0, 26.2, .8, 3.4, .5, WH);
  bx(g, .2, 0, 28.45, .4, 2.6, 3.9, BR); bx(g, .2, 2.6, 28.45, .45, .08, 3.95, '#8e4f3c');   // muro de ladrillo que sigue (hasta la casita de ladrillo de Córdoba)
  bx(g, -.03, 0, 29.8, .06, 2.15, .85, '#f2f2ee'); bx(g, -.06, 1.6, 29.8, .02, .3, .6, '#cfd8e0');   // puerta blanca del muro
  bx(g, -1.1, 0, 13, 1.4, .6, 10, BR2);                           // basamento bajo de ladrillo
  // ---- vestíbulo vidriado del cajero en la esquina ----
  bx(g, 2, 0, 2, 4, .25, 4, '#d8d4cc');
  for (const [x, z, sx, sz] of [[2, -.02, 4, .06], [-.02, 2, .06, 4]]) bx(g, x, .25, z, sx, 2.75, sz, '#8fb4c9');
  for (const [x, z] of [[0, 0], [4, 0], [0, 4], [2, 0], [0, 2]]) bx(g, x, .25, z, .12, 2.8, .12, WH);
  bx(g, 2, 3.05, 2, 5, .4, 5, WH); bx(g, 2, 2.1, -.06, 1.2, .25, .04, '#0b3d91');
  signIn(g, 'Macro', 2, 2.55, -.1, 1.6, .45, '#0b3d91', '#ffffff', Math.PI);
  bx(g, 3.1, .25, 2.2, .6, 1.6, .5, '#0b3d91'); bx(g, 3.1, 1.3, 1.94, .4, .3, .02, '#7fb2e5');   // cajero
  bx(g, 2, 0, -.8, 4.4, .15, 1.6, '#cfc9bd'); poleIn(g, [4.6, .15, -1.6], [4.6, .95, -1.6], .025, '#d0d0d0'); poleIn(g, [4.6, .95, -1.6], [4.6, .95, 0], .025, '#d0d0d0');
  colLocal(g, 0, 0, 28, 22, '#9c5a45'); addCol(X0, Z0 + 26, X0 + .5, Z0 + 30.4);
  mapLabels.push([X0 + 10, Z0 + 10, 'Banco Macro']);
}
}
