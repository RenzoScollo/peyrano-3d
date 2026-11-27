// Acceso Sur: Paso a nivel central, Terminal de Ómnibus, Quinta de Maipú y Galpón RP 26-S
export function buildSurTerminalQuinta(ctx) {
  const {
    QUINTA_POLY, R, ROAD_Y, S, THREE, addBush, addCol, addPalm, addTree, bboxOf, box, boxIn, bx, canvas, colLocal, crowns, cylIn, fillPoly, flat, group, inPoly, lam, mapLabels, mapRects, overlap, pick, plazaRects, poleIn, poles, polyCenter, rnd, signIn, trims
  } = ctx;

{
  const cx = -81.5, cz = 177.0;
  // Dirección de la calzada de SO (-97.4, 221.0) hacia NE (-71.9, 146.9): +z = hacia Catamarca/Terminal, +x = izquierda (Estación), -x = derecha (Chacabuco)
  const ry = Math.atan2(-71.9 - (-97.4), 146.9 - 221.0);
  const cs = Math.cos(ry), sn = Math.sin(ry);
  const W2 = (lx, lz) => [cx + lx * cs + lz * sn, cz - lx * sn + lz * cs];
  const quadL = (x0, z0, x1, z1, y, col) => flat.quad(W2(x0, z0), W2(x1, z0), W2(x1, z1), W2(x0, z1), y, col);
  const colPt = (lx, lz, r = .35) => { const [wx, wz] = W2(lx, lz); addCol(wx - r, wz - r, wx + r, wz + r); };
  const cylB = (p, x, y0, z, r, h, col) => cylIn(p, x, y0 + h / 2, z, r, h, col);
  const g = group(cx, cz, ry);

  // Banquinas de tierra/ripio a ambos lados de la calzada de hormigón (lado SO antes de las vías)
  quadL(-8.6, -26, -4.4, -1.6, .085, '#9d9382');
  quadL(4.4, -26, 7.6, -1.6, .085, '#9d9382');
  // Borde irregular del hormigón sobre la banquina derecha (como en Street View)
  quadL(-5.3, -24, -4.4, -14.5, ROAD_Y + .012, '#9d9b96');
  quadL(-5.8, -22, -5.2, -16.5, ROAD_Y + .012, '#9d9b96');
  // Juntas de dilatación de las losas de hormigón (longitudinal central y transversales)
  for (const [zA, zB] of [[-25, -2.0], [12.0, 27]]){
    quadL(-.05, zA, .05, zB, ROAD_Y + .018, '#83817b');
    for (let z = zA + 2; z < zB - .5; z += 4.5) quadL(-4.45, z - .04, 4.45, z + .04, ROAD_Y + .018, '#83817b');
  }

  // Planchas de madera/durmientes en LAS TRES VÍAS (vía principal z=0, desvío 1 z=4.8, desvío 2 z=10.1)
  for (const tz of [0, 4.8, 10.1]){
    // Tablones exteriores e interiores entre rieles cubriendo todo el ancho de la calle (9.6 m)
    bx(g, 0, .12, tz, 9.6, .175, 1.32, '#695846');                         // entre rieles
    bx(g, 0, .12, tz - 1.22, 9.6, .165, .72, '#5d4e3e');                   // lado SO de la vía
    bx(g, 0, .12, tz + 1.22, 9.6, .165, .72, '#5d4e3e');                   // lado NE de la vía
    // Ranuras oscuras (canaletas de pestaña de rueda) y rieles de acero embutidos
    for (const ro of [-.75, .75]){
      bx(g, 0, .285, tz + ro * .91, 9.6, .02, .08, '#26221e');
      bx(g, 0, .29, tz + ro, 10.4, .045, .13, '#aeb3ba');
    }
    // Topes laterales de hormigón en los extremos de las planchas
    for (const sx of [-4.85, 4.85]) bx(g, sx, .12, tz, .22, .20, 3.25, '#c2beb6');
  }

  // Guardarrail metálico (flex-beam) lado DERECHO SO (z = -24 a -3.4) con reflectores rojos y blancos
  const addGuardrail = (lx, z0, z1) => {
    const len = z1 - z0, zm = (z0 + z1) / 2;
    bx(g, lx, .54, zm, .08, .22, len, '#c6cbd0');                          // chapa galvanizada principal
    bx(g, lx + .03, .63, zm, .04, .05, len, '#969da5');                    // nervadura superior
    bx(g, lx + .03, .56, zm, .04, .05, len, '#969da5');                    // nervadura inferior
    let idx = 0;
    for (let z = z0 + .3; z <= z1 - .2; z += 2.3){
      bx(g, lx - .06, 0, z, .11, .84, .11, '#798088');                     // poste metálico
      bx(g, lx + .055, .60, z, .025, .07, .24, idx % 2 === 0 ? '#d62822' : '#f4f4ef'); // reflector rojo/blanco
      colPt(lx, z, .32);
      idx++;
    }
  };
  addGuardrail(-5.4, -24.5, -3.4);                                         // guardarrail largo lado derecho SO
  addGuardrail(-5.2, 14.5, 22.0);                                          // guardarrail corto lado derecho NE

  // Cruces de San Andrés detalladas (poste blanco con franjas negras + aspas blancas/rojas + doble V de múltiples vías)
  const addSanAndres = (lx, lz, faceRy) => {
    const sg = new THREE.Group(); sg.position.set(lx, 0, lz); sg.rotation.y = faceRy; g.add(sg);
    bx(sg, 0, 0, 0, .52, .22, .52, '#c8c4bc');                             // dado de hormigón
    cylB(sg, 0, .22, 0, .065, 3.45, '#f2f1ec');                            // poste blanco
    for (const by of [.7, 1.3, 1.9]) cylB(sg, 0, by, 0, .07, .24, '#242628'); // franjas negras
    for (const a of [.64, -.64]){
      const arm = new THREE.Group(); arm.position.set(0, 3.05, .07); arm.rotation.z = a; sg.add(arm);
      bx(arm, 0, -.10, 0, 1.48, .20, .05, '#f5f4f0');                      // aspa blanca
      for (const ex of [-.56, .56]) bx(arm, ex, -.105, .005, .36, .205, .055, '#cc2420'); // puntas rojas
    }
    // Placa inferior en V (indica cruce de más de una vía)
    for (const a of [.42, -.42]){
      const vArm = new THREE.Group(); vArm.position.set(a > 0 ? -.26 : .26, 2.38, .07); vArm.rotation.z = a; sg.add(vArm);
      bx(vArm, 0, -.06, 0, .62, .12, .04, '#f5f4f0');
      bx(vArm, a > 0 ? -.20 : .20, -.062, .004, .22, .124, .045, '#cc2420');
    }
    colPt(lx, lz, .35);
  };
  addSanAndres(-6.8, -3.8, Math.PI);                                       // lado derecho SO (detrás del guardarrail)
  addSanAndres(5.6, 13.5, 0);                                              // lado izquierdo NE (cruzando las vías)

  // Cartel triangular de advertencia ferroviaria (lado derecho SO, detrás del guardarrail)
  {
    const wg = new THREE.Group(); wg.position.set(-7.7, 0, -11.5); wg.rotation.y = Math.PI; g.add(wg);
    cylB(wg, 0, 0, 0, .045, 2.35, '#7a6855');
    // Triángulo vial blanco con borde rojo (canvas con transparencia)
    const cv = document.createElement('canvas'); cv.width = 128; cv.height = 128; const c = cv.getContext('2d');
    c.beginPath(); c.moveTo(64, 8); c.lineTo(120, 116); c.lineTo(8, 116); c.closePath();
    c.fillStyle = '#f6f4ee'; c.fill(); c.lineWidth = 11; c.strokeStyle = '#c82420'; c.stroke();
    c.strokeStyle = '#1f2226'; c.lineWidth = 7;
    c.beginPath(); c.moveTo(46, 62); c.lineTo(82, 98); c.moveTo(82, 62); c.lineTo(46, 98); c.stroke();
    const tex = new THREE.CanvasTexture(cv); tex.colorSpace = THREE.SRGBColorSpace;
    const pl = new THREE.Mesh(new THREE.PlaneGeometry(.95, .95), new THREE.MeshLambertMaterial({ map: tex, transparent: true, alphaTest: .4, side: THREE.DoubleSide }));
    pl.position.set(0, 2.25, .06); wg.add(pl);
    colPt(-7.7, -11.5, .25);
  }

  // Farola roja curva ferroviaria (lado izquierdo SO — detalle característico de Street View)
  {
    const fx = 9.4, fz = -14.5, RCOL = '#b84232';
    cylB(g, fx, 0, fz, .065, 4.3, RCOL);
    poleIn(g, [fx, 4.25, fz], [fx - .45, 4.75, fz], .045, RCOL);
    poleIn(g, [fx - .45, 4.75, fz], [fx - 1.15, 4.82, fz], .04, RCOL);
    poleIn(g, [fx - 1.15, 4.82, fz], [fx - 1.35, 4.55, fz], .035, RCOL);
    cylB(g, fx - 1.35, 4.35, fz, .24, .18, '#e8e4da');                     // pantalla/tulipa blanca
    colPt(fx, fz, .25);
  }

  // Poste alto de hormigón (primer plano izquierda SO), poste de madera con crucetas (derecha SO) y poste NE
  {
    // Hormigón izquierda SO
    cylB(g, 5.5, 0, -17.5, .14, 9.4, '#c8c4bc');
    poleIn(g, [5.5, 9.0, -17.5], [3.6, 9.6, -17.5], .045, '#aeb3b8');
    bx(g, 3.45, 9.52, -17.5, .55, .12, .22, '#dde0e2');
    colPt(5.5, -17.5, .3);
    // Madera con crucetas derecha SO
    cylB(g, -10.5, 0, -18.5, .13, 8.6, '#6d543e');
    for (const cy of [7.2, 8.1]){
      bx(g, -10.5, cy, -18.5, 2.1, .12, .12, '#624b37');
      for (const ix of [-.85, 0, .85]) cylB(g, -10.5 + ix, cy + .12, -18.5, .04, .11, '#eceae4');
    }
    colPt(-10.5, -18.5, .3);
    // Poste alumbrado NE derecha
    cylB(g, -6.0, 0, 24.5, .10, 7.8, '#8d9298');
    poleIn(g, [-6.0, 7.5, 24.5], [-4.5, 8.0, 24.5], .04, '#8d9298');
    colPt(-6.0, 24.5, .25);
  }

  // Torre / mástil metálico de señalización ferroviaria (predio a la izquierda)
  {
    const tx = 19.5, tz = -4.5, MC = '#6a6e73';
    for (const [ox, oz] of [[-.22, -.22], [.22, -.22], [.22, .22], [-.22, .22]])
      poleIn(g, [tx + ox, 0, tz + oz], [tx + ox * .65, 9.2, tz + oz * .65], .035, MC);
    for (let y = .8; y < 9.0; y += 1.0){
      const s = 1 - (y / 9.2) * .35;
      poleIn(g, [tx - .22 * s, y, tz - .22 * s], [tx + .22 * s, y + .9, tz - .22 * s], .02, MC);
      poleIn(g, [tx - .22 * s, y, tz + .22 * s], [tx + .22 * s, y + .9, tz + .22 * s], .02, MC);
    }
    bx(g, tx, 8.2, tz, 1.1, .08, .9, MC);                                  // plataforma superior
    bx(g, tx - .85, 8.75, tz, 1.3, .22, .05, '#c9382e');                   // brazo semafórico rojo
    bx(g, tx - .55, 8.76, tz + .03, .24, .20, .02, '#f2f0ea');             // banda blanca
    colPt(tx, tz, .45);
  }

  // Dos mojones bajos de hormigón blanco junto a la vía derecha + postes de alambrado izquierda + arbustos
  for (const [mx, mz] of [[-11.5, -2.2], [-13.2, -2.6]]){ bx(g, mx, 0, mz, .65, .62, .45, '#dad6cd'); colPt(mx, mz, .4); }
  for (let k = 0; k < 5; k++) bx(g, 9.6 + k * 2.1, 0, -10.5 + k * 1.1, .14, 1.15, .14, '#6e5742');
  for (const [bxL, bzL, sc] of [[10.8, -13.5, 1.1], [12.5, -12.0, .95], [14.2, -10.2, 1.2], [8.4, -15.5, .75]]){
    const [wx, wz] = W2(bxL, bzL); addBush(wx, wz, sc, .05);
  }

  // Acoplado verde estacionado en el pasto al costado derecho detrás de las vías (fiel a Street View)
  {
    const ag = new THREE.Group(); ag.position.set(-17.0, 0, 4.2); ag.rotation.y = .04; g.add(ag);
    bx(ag, 0, .95, 0, 6.8, .22, 2.35, '#3b3e42');                          // chasis
    bx(ag, 0, 1.17, 0, 6.7, 1.55, 2.3, '#3c6343');                         // caja con barandas verde oscuro
    for (let sx = -2.8; sx <= 2.9; sx += 1.12) bx(ag, sx, 1.18, 0, .09, 1.56, 2.36, '#325438'); // parantes
    bx(ag, 0, 2.72, 0, 6.75, .28, 2.32, '#7d847c');                        // lona gris-verdosa arriba
    for (const wx of [-2.1, 2.0]) for (const wz of [-1.05, 1.05]){
      const wh = new THREE.Mesh(new THREE.CylinderGeometry(.48, .48, .32, 12).rotateX(Math.PI / 2), lam({ color: 0x222426 }));
      wh.position.set(wx, .48, wz); wh.castShadow = true; ag.add(wh);
    }
    colPt(-17.0, 4.2, 3.6);
  }
  mapLabels.push([cx, cz, 'Paso a nivel RP 10-S']);
}

// Final de Av. Centenario, pasando Catamarca y antes de la vía: Terminal de Ómnibus con el bar "Lo del Tío",
// y hacia el oeste (a la derecha mirando el frente) una casita gris, el Almacén de Arébalo y el galpón de ladrillo de la esquina.
{
  const FZ = 157.5;                   // línea de frente (mirando al norte, hacia Catamarca)
  plazaRects.push([-56, 150, 15, 176]);
  flat.rect(-56, 151, 15, 176, .05, '#6f9a4a');                       // pasto del predio
  flat.rect(-56, 155.5, 15, FZ - .2, .204, '#c4bdb0');                  // vereda frente a la Terminal (empalma al ras con Catamarca)
  // lot local: x = a lo largo del frente (hacia el oeste = -x mundo), z = hacia la calle (frente en z = 0)
  const front = (xE, xW, depth) => { const g = group((xE + xW) / 2, FZ, Math.PI); return { g, w: xE - xW, d: depth, xc: (xE + xW) / 2 }; };
  const win = (g, x, y, w, h, frame = '#e6e6e2', glass = '#3b4650') => { bx(g, x, y - .08, .05, w + .16, h + .16, .08, frame); bx(g, x, y, .1, w, h, .05, glass); };

  // ---- Terminal de Ómnibus y bar "Lo del Tío" (blanca, con triángulos oscuros arriba de las ventanas) ----
  {
    const T = front(12, -10, 12), g = T.g, WH = '#f3f2ee';
    bx(g, 0, 0, -T.d / 2, T.w, 4.3, T.d, WH);
    bx(g, 0, 4.3, -T.d / 2, T.w + .2, .35, T.d + .2, '#e7e5df');
    bx(g, -7.3, 0, -.5, 4.6, 3.9, 1, WH);                                 // cuerpo saliente sobre la izquierda (lado este)
    // triángulos (como frontoncitos) con vidrio oscuro arriba de las ventanas
    for (const x of [-9.3, -6.8, -3.2, -.4, 3.4]){
      const tri = new THREE.Mesh(new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(-1.1, 0, 0), new THREE.Vector3(1.1, 0, 0), new THREE.Vector3(0, 1.1, 0)]), lam({ color: 0x3a4652, side: THREE.DoubleSide }));
      tri.geometry.computeVertexNormals(); tri.position.set(x, 3.05, .07); g.add(tri);
      const fr = new THREE.Mesh(new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(-1.3, -.1, 0), new THREE.Vector3(1.3, -.1, 0), new THREE.Vector3(0, 1.25, 0)]), lam({ color: 0xe2e0da, side: THREE.DoubleSide }));
      fr.geometry.computeVertexNormals(); fr.position.set(x, 3.05, .04); g.add(fr);
    }
    // ventanales con cortinas y la puerta de entrada con alero metálico
    for (const x of [-3.2, -.4, 3.4]){ win(g, x, .7, 2.2, 2.1, '#d9d9d4', '#b9bcbc'); bx(g, x - .55, .8, .13, .9, 1.9, .03, '#ece6d6'); bx(g, x + .55, .8, .13, .9, 1.9, .03, '#ece6d6'); }
    win(g, -7.6, .1, 2.6, 2.6, '#9aa0a5', '#2e3a44'); bx(g, -7.6, .1, .14, .06, 2.6, .04, '#9aa0a5');
    bx(g, -7.6, 2.8, 1.5, 3.6, .08, 2.8, '#b7bcc0');                         // alero de chapa sobre la entrada
    for (const x of [-9.3, -5.9]) bx(g, x, 0, 2.8, .07, 2.8, .07, '#5d646b');
    // letras pintadas en el paño liso de la derecha (sin tapar ventanas ni triángulos)
    signIn(g, 'Lo del Tío', 8.4, 3.45, .12, 3, .5, WH, '#a9aeb2');
    signIn(g, 'TERMINAL DE ÓMNIBUS', 8.4, 2.75, .12, 4.6, .4, WH, '#a8adb1');
    // reflectores en el techo
    for (const x of [-3.5, -1.6, 1.4]){ bx(g, x, 4.65, -.3, .4, .25, .3, '#2b2f33'); }
    // canteros bajos de cemento con tierra adelante
    for (const [x, w] of [[-12.5, 5], [-.2, 6.5], [8.4, 5.2]]){ bx(g, x, 0, 2.2, w, .45, 2.2, '#dfe6e6'); bx(g, x, .45, 2.2, w - .3, .03, 1.9, '#6b5a46'); }
    colLocal(g, -T.w / 2 - .1, -T.d, T.w / 2, .5, '#f3f2ee');
    mapLabels.push([1, FZ + 6, 'Terminal / Lo del Tío']);
    // ---- fachada trasera (da contra la vía): también con triángulos, puerta, ventanas y doble puerta vidriada ----
    {
      const b = group(1, FZ + T.d);   // local +z = hacia la vía (sur)
      for (const x of [-7.6, -4.6, -1.6, 1.6, 4.4]){
        const tri = new THREE.Mesh(new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(-1.1, 0, 0), new THREE.Vector3(0, 1.1, 0), new THREE.Vector3(1.1, 0, 0)]), lam({ color: 0x3a4652, side: THREE.DoubleSide }));
        tri.geometry.computeVertexNormals(); tri.position.set(x, 3.05, .07); b.add(tri);
      }
      bx(b, -7.6, 0, .02, 1.3, 2.4, .08, '#2a3138');                                // puerta oscura
      for (const x of [-4.6, -1.6]) win(b, x, .7, 1.8, 1.9, '#d9d9d4', '#3b4650');
      win(b, 3.2, .1, 3.8, 2.6, '#d9d9d4', '#3b4650'); for (const x of [2.25, 3.2, 4.15]) bx(b, x, .1, .14, .06, 2.6, .04, '#d9d9d4');   // doble puerta vidriada
      // anexo con tanque de agua en el extremo oeste (pintadas en las puertas grises)
      bx(b, -12.6, 0, -2, 3.2, 3.2, 4, '#e9e7e1'); bx(b, -12.6, .1, .02, 2.6, 2.6, .06, '#b9b6ae');
      bx(b, -12.6, 3.2, -2.5, 1.6, 1.6, 1.6, '#e9e7e1'); cylIn(b, -12.6, 5.1, -2.5, .7, .9, '#c9c6be');
      colLocal(b, -14.2, -4, -11, 0, null);
    }
    // ---- galería de chapa en la parte de atrás, sobre postes de hierro, cubriendo la fachada que da a la vía ----
    {
      const GZ0 = FZ + T.d - 1.5, GZ1 = FZ + T.d + 7.5, GX0 = -14.5, GX1 = 19, HY = 5.3;
      for (const x of [GX0 + .3, -6, 3.5, 12, GX1 - .3]) for (const z of [GZ0 + .3, GZ1 - .3]){ box(x, 0, z, .22, HY, .22, '#2f353a'); addCol(x - .14, z - .14, x + .14, z + .14); }
      box((GX0 + GX1) / 2, HY - .35, GZ0 + .3, GX1 - GX0, .3, .2, '#2f353a'); box((GX0 + GX1) / 2, HY - .35, GZ1 - .3, GX1 - GX0, .3, .2, '#2f353a');
      const roof = box((GX0 + GX1) / 2, HY, (GZ0 + GZ1) / 2, GX1 - GX0 + .6, .1, GZ1 - GZ0 + .6, '#a3a8ac'); roof.rotation.x = -.05;
      for (let x = GX0; x <= GX1; x += .45) box(x, HY + .08, (GZ0 + GZ1) / 2, .06, .06, GZ1 - GZ0 + .6, '#8e9499');
      flat.rect(GX0, FZ + T.d, GX1, GZ1, .21, '#a7a29a');                          // piso de cemento bajo la galería
      mapRects.push([GX0, GZ0, GX1, GZ1, '#a3a8ac']);
    }
    // carteles verdes de dirección: a la derecha de la terminal mirándola de frente (lado oeste)
    const sg = group(-12.5, FZ - 1.5, Math.PI);
    for (const x of [-.8, .8]) poleIn(sg, [x, 0, 0], [x, 3.2, 0], .06, '#d9d9d4');
    signIn(sg, 'S.A.M.Co. (03460) 470466  →', 0, 2.85, .08, 3.4, .45, '#2f6b4a', '#ffffff');
    signIn(sg, 'POLIDEPORTIVO GRAL. JOSÉ DE SAN MARTÍN  →', 0, 2.3, .08, 3.4, .45, '#2f6b4a', '#ffffff');
    signIn(sg, 'GUARDIA URBANA (03460) 15 400 545', 0, 1.75, .08, 3.4, .45, '#2f6b4a', '#ffffff');
    addCol(-13.5, FZ - 1.7, -11.5, FZ - 1.3);
  }
  // ---- Casita gris entre la terminal y el almacén ----
  {
    const H = front(-15, -23, 11), g = H.g;
    bx(g, 0, 0, -H.d / 2, H.w, 3.6, H.d, '#b9b6ae'); bx(g, 0, 0, .04, H.w, 1.2, .08, '#e9e6de');
    bx(g, 0, 2.5, .35, H.w, .15, .7, '#9d9a92');
    win(g, -1.8, 1, 1.8, 1.3, '#9d9a92', '#d6d2ca'); for (let k = 0; k < 6; k++) bx(g, -2.6 + k * .32, 1, .14, .04, 1.3, .04, '#ffffff');
    bx(g, 1.5, 0, .08, .9, 2.2, .06, '#f2f2ee'); bx(g, 1.5, .4, .12, .4, 1.6, .03, '#a8442f');
    const tk = new THREE.Mesh(new THREE.CylinderGeometry(.45, .45, .9, 12).translate(0, .45, 0), lam({ color: 0xe8e8e4 })); tk.position.set(0, 3.6, -3); g.add(tk);
    colLocal(g, -H.w / 2, -H.d, H.w / 2, 0, '#b9b6ae');
  }
  // ---- Almacén de Arébalo (blanco con guarda turquesa, alero turquesa y pizarras con precios) ----
  {
    const A = front(-23, -33, 12), g = A.g, TQ = '#38b8a8';
    bx(g, 0, 0, -A.d / 2, A.w, 4.6, A.d, '#f4f4f1'); bx(g, 0, 4.3, .05, A.w, .12, .08, TQ);
    bx(g, 1, 2.45, .45, 6, .3, .9, TQ);                                    // alero turquesa
    bx(g, -3.8, .2, .08, 1.6, 2.4, .06, '#e6e6e2'); for (let k = 0; k < 4; k++) bx(g, -4.4 + k * .4, .3, .12, .05, 2.2, .03, '#cfcfcf');
    bx(g, .9, 0, .08, 1.2, 2.3, .06, '#8fa3ad'); win(g, -.7, .9, 1, 1.3); win(g, 2.6, .9, 1.6, 1.2, '#e6e6e2', '#c98a3c');
    bx(g, .5, 3.1, .25, 1.1, .7, .5, '#f0f0ee'); cylIn(g, .5, 3.45, .52, .25, .05, '#6b7075', Math.PI / 2).rotation.set(Math.PI / 2, 0, 0);   // aire acondicionado
    signIn(g, 'ALMACÉN DE ARÉBALO', -2.9, 3.45, .12, 3.4, .42, '#f4f4f1', '#2a8c80');   // a la izquierda, sin quedar detrás del aire acondicionado
    // pizarras con precios en la vereda
    const boards = [['PATA MUSLO', '$4200'], ['MAPLE HUEVOS', '$4600'], ['MILANESA POLLO', '$6500'], ['ALITAS', '$3000']];
    boards.forEach(([t1, t2], i) => { const bgx = -2.2 + i * 1.6; const bg = group(0, 0); g.add(bg); bg.position.set(bgx, 0, 1.4); bg.rotation.x = -.12; boxIn(bg, 0, .65, 0, .9, 1.3, .05, '#1f2326'); signIn(bg, t1, 0, .95, .03, .8, .25, '#1f2326', '#f2f2f2'); signIn(bg, t2, 0, .55, .03, .8, .25, '#1f2326', '#f2f2f2'); });
    colLocal(g, -A.w / 2, -A.d, A.w / 2, 0, '#f4f4f1');
    mapLabels.push([-28, FZ + 6, 'Almacén Arébalo']);
  }
  // ---- Galpón de ladrillo blanqueado de la esquina (portón blanco grande y persiana metálica) ----
  {
    const B = front(-33, -46, 14), g = B.g, BR = '#cdb9a8';
    bx(g, 0, 0, -B.d / 2, B.w, 5, B.d, BR);
    for (let y = .3; y < 5; y += .35) bx(g, 0, y, .02, B.w, .03, .03, '#b49a85');
    bx(g, 0, 5, -B.d / 2, B.w + .2, .25, B.d + .2, '#b49a85');
    bx(g, -3, 0, .06, 3.6, 3.7, .08, '#f2f0ea'); bx(g, -3, 3.7, .06, 4, .3, .1, '#e6e2d8');
    bx(g, 3.2, 0, .06, 2.4, 2.7, .08, '#9aa0a5'); for (let y = .2; y < 2.7; y += .2) bx(g, 3.2, y, .1, 2.4, .03, .03, '#8a9095');
    colLocal(g, -B.w / 2, -B.d, B.w / 2, 0, BR);
  }
  // árboles jóvenes en la vereda
  for (const [x, z] of [[-24, FZ - 2.4], [-34.8, FZ - 2.4], [16, FZ + 8]]) addTree(x, z, .75, false, ['#6f9a3c', '#7da545']);
}

// Quinta de la esquina de Maipú (curva, cerca de la mesa giratoria): cordón bajo de ladrillo, cerco tupido con enredaderas
// que no deja ver adentro, portón blanco de caño, invernadero, casetita y vegetación frondosa. Atrás queda la planicie hasta la vía.
{
  const Q = QUINTA_POLY, [qx0, qz0, qx1, qz1] = bboxOf(Q), cen = polyCenter(Q);
  plazaRects.push([qx0, qz0, qx1, qz1]);
  fillPoly(Q, .055, '#5c8a3a');
  for (let k = 0; k < 40; k++){ const x = R(qx0, qx1), z = R(qz0, qz1); if (inPoly(x, z, Q)) flat.rect(x - R(.8, 2), z - R(.6, 1.6), x + R(.8, 2), z + R(.6, 1.6), .058, pick(['#6b5a43', '#7a6a4f', '#4f7a34'])); }
  const HEDGE = ['#2f5a24', '#38602a', '#3b6a2a', '#2c4f22', '#466f2e'];
  // gaps: [índice de lado, desde t, hasta t]  — lado 0: sobre Maipú, lado 3: sobre la calle que baja a la vía
  const gaps = [[0, .42, .5], [3, .2, .34], [1, -.01, .6]];   // lado 1 (oeste) abierto hacia la huerta: quedan unidas
  const inGap = (i, t) => gaps.some(([gi, a, b]) => gi === i && t > a && t < b);
  for (let i = 0; i < Q.length; i++){
    const [ax, az] = Q[i], [bx2, bz] = Q[(i + 1) % Q.length], L = Math.hypot(bx2 - ax, bz - az), street = i === 0 || i === 3;
    // (el cordón de ladrillo ahora es la pared de la cuneta: ver "cuneta con vereda" en el bloque de la huerta)
    if (false){
      const g = group((ax + bx2) / 2, (az + bz) / 2, Math.atan2(bx2 - ax, bz - az));
      for (let s = -L / 2; s < L / 2; s += 3.2){ const t = (s + L / 2) / L; if (inGap(i, t) || inGap(i, t + 3.2 / L)) continue; boxIn(g, 0, .22, s + 1.6, .32, .45, 3.1, '#a0533a'); boxIn(g, 0, .46, s + 1.6, .4, .05, 3.1, '#b7684c'); }
    }
    // cerco con enredaderas (muy tupido) + colisión por tramos
    for (let t = 0; t <= 1.0001; t += 1.6 / L){
      const x = ax + (bx2 - ax) * t, z = az + (bz - az) * t;
      if (inGap(i, t)) continue;
      crowns.add(x + R(-.3, .3), R(1.1, 1.6), z + R(-.3, .3), R(1.3, 1.8), R(1.6, 2.4), R(1.1, 1.5), R(0, 6), pick(HEDGE));
      if (rnd() < .35) crowns.add(x, R(2.6, 3.4), z, R(.9, 1.4), R(.8, 1.2), R(.9, 1.4), R(0, 6), pick(HEDGE));
      addCol(x - .9, z - .9, x + .9, z + .9);
    }
    // árboles de vereda (fila) y faroles oxidados por fuera de los lados sobre calle
    if (street){
      const nx = (bz - az) / L, nz = -(bx2 - ax) / L, out = ((ax + nx * 5 - cen[0]) * nx + (az + nz * 5 - cen[1]) * nz) > 0 ? 1 : -1;
      for (let s = 4; s < L - 2; s += 8.5){ const x = ax + (bx2 - ax) * s / L + nx * out * 1.2, z = az + (bz - az) * s / L + nz * out * 1.2; if (!overlap(x - 1, z - 1, x + 1, z + 1)) addTree(x, z, R(1.1, 1.35), false, ['#7d6a52', '#8a765c', '#6f6048', '#7a8a4a'], '#6e6a62'); }
      for (let s = 9; s < L - 2; s += 17){ const x = ax + (bx2 - ax) * s / L + nx * out * 1.6, z = az + (bz - az) * s / L + nz * out * 1.6; poles.add(x, 0, z, .12, 6.5, .12, 0, '#b0603a'); trims.add(x, 6.45, z, .45, .15, .45, 0, '#d8d4c8'); addCol(x - .12, z - .12, x + .12, z + .12); }
    }
  }
  // entrada con caminito de cemento (sobre Maipú) y portón blanco de caño (sobre la calle que baja a la vía)
  {
    const [ax, az] = Q[0], [bx2, bz] = Q[1], t = .46, x = ax + (bx2 - ax) * t, z = az + (bz - az) * t, nx = (bz - az), nz = -(bx2 - ax), l = Math.hypot(nx, nz);
    const out = ((x + nx / l * 5 - cen[0]) * nx + (z + nz / l * 5 - cen[1]) * nz) > 0 ? 1 : -1;
    flat.ribbon([[x + nx / l * out * 4.5, z + nz / l * out * 4.5], [x - nx / l * out * 6, z - nz / l * out * 6]], 1.3, .07, '#c4bdb0');
  }
  {
    const [ax, az] = Q[3], [bx2, bz] = Q[0], t = .27, x = ax + (bx2 - ax) * t, z = az + (bz - az) * t, ang = Math.atan2(bx2 - ax, bz - az);
    const g = group(x, z, ang);
    for (const s of [-1.9, 1.9]) boxIn(g, 0, .8, s, .18, 1.6, .18, '#7a6a55');
    poleIn(g, [0, .2, -1.7], [0, .2, 1.7], .035, '#f2f2f0'); poleIn(g, [0, 1.35, -1.7], [0, 1.35, 1.7], .035, '#f2f2f0'); poleIn(g, [0, .2, -1.7], [0, 1.35, -1.7], .035, '#f2f2f0'); poleIn(g, [0, .2, 1.7], [0, 1.35, 1.7], .035, '#f2f2f0'); poleIn(g, [0, .2, -1.7], [0, 1.35, 1.7], .03, '#f2f2f0');
    addCol(x - 1.9, z - 1.9, x + 1.9, z + 1.9);
  }
  // invernadero (túnel de nylon blanco sobre arcos) y casetita de ladrillo con techo de chapa
  {
    const gx = cen[0] - 3, gz = cen[1] + 4, g = group(gx, gz, .3);
    const tun = new THREE.Mesh(new THREE.CylinderGeometry(3, 3, 14, 20, 1, true, Math.PI / 2, Math.PI), new THREE.MeshLambertMaterial({ color: 0xf4f4ee, transparent: true, opacity: .6, side: THREE.DoubleSide, depthWrite: false }));
    tun.rotation.x = Math.PI / 2; g.add(tun);
    for (let k = -7; k <= 7; k += 2){ const arc = new THREE.Mesh(new THREE.TorusGeometry(3, .04, 4, 16, Math.PI), lam({ color: 0xd9dcde })); arc.position.z = k; g.add(arc); }
    for (const s of [-1, 1]){ const end = new THREE.Mesh(new THREE.CircleGeometry(3, 16, 0, Math.PI), new THREE.MeshLambertMaterial({ color: 0xf4f4ee, transparent: true, opacity: .45, side: THREE.DoubleSide, depthWrite: false })); end.position.z = s * 7; g.add(end); }
    for (let k = -6; k <= 6; k += 1.2) for (const sx of [-1.4, 1.4]) boxIn(g, sx, .3, k, .9, .5, .9, pick(['#4f7f2d', '#6d9a3c', '#3b6a2a']));
    colLocal(g, -3, -7, 3, 7, '#e8e8e0');
    const s = group(cen[0] + 7, cen[1] - 6, .3);
    boxIn(s, 0, 1.25, 0, 3.2, 2.5, 3, '#b0603f'); boxIn(s, 0, 2.6, 0, 3.8, .12, 3.6, '#9aa1a7'); boxIn(s, 0, 1, 1.52, .9, 2, .05, '#5a4636');
    colLocal(s, -1.6, -1.5, 1.6, 1.5, '#b0603f');
  }
  // vegetación frondosa adentro: frutales, palmera y arbustos (tapa la planicie de atrás)
  for (let k = 0; k < 70; k++){
    const x = R(qx0 + 2, qx1 - 2), z = R(qz0 + 2, qz1 - 2);
    if (!inPoly(x, z, Q) || overlap(x - 1.6, z - 1.6, x + 1.6, z + 1.6)) continue;
    const r = rnd();
    if (r < .45) addTree(x, z, R(.9, 1.45), false, HEDGE);
    else if (r < .52) addPalm(x, z, R(.9, 1.1));
    else addBush(x, z, R(.9, 1.6));
  }
  mapLabels.push([cen[0], cen[1], 'Quinta']);
}
// Huerta de la quinta (dibujo del usuario): sector cercado entre la quinta, la mesa giratoria y el galpón del semillero.
// Cerco con enredadera sobre Maipú (con portón blanco) y hacia el galpón, cerca blanca de madera junto a la mesa giratoria,
// tierra arada con surcos y dos frutales.
{
  // unida a la quinta: arranca en la esquina oeste de la quinta y el cerco sigue en línea con el de la quinta sobre Maipú
  const mz = x => 87.3 + (x + 95.2) * .321;
  const ZT = 110, XL = -95.2, XLT = -96.2;     // lado izquierdo = lado oeste de la quinta (de z 82.5 a 110)
  // borde derecho: lo más cerca posible del galpón del semillero sin tocarlo (2 m de margen)
  let XR = -152;
  while (XR < -112 && overlap(XR - 2, mz(XR) + 3, XR + .5, ZT + 1)) XR += 1;
  const H = [[XL, mz(XL)], [XR, mz(XR)], [XR, ZT], [XLT, ZT]];
  plazaRects.push([XR - 1, mz(XR) - 1, XL, ZT + 1]);
  fillPoly(H, .056, '#6a9445');
  const HEDGE = ['#2f5a24', '#38602a', '#3b6a2a', '#2c4f22', '#466f2e'];
  const hedgeLine = (ax, az, bx2, bz, gap) => {
    const L = Math.hypot(bx2 - ax, bz - az);
    for (let t = 0; t <= 1.0001; t += 1.6 / L){
      if (gap && t > gap[0] && t < gap[1]) continue;
      const x = ax + (bx2 - ax) * t, z = az + (bz - az) * t;
      crowns.add(x + R(-.3, .3), R(1, 1.5), z + R(-.3, .3), R(1.2, 1.7), R(1.4, 2.1), R(1, 1.4), R(0, 6), pick(HEDGE));
      if (rnd() < .3) crowns.add(x, R(2.3, 3), z, R(.8, 1.2), R(.7, 1.1), R(.8, 1.2), R(0, 6), pick(HEDGE));
      addCol(x - .9, z - .9, x + .9, z + .9);
    }
  };
  // sobre Maipú (con hueco para el portón blanco, cerca del galpón) y del lado del galpón
  hedgeLine(XL, mz(XL), XR, mz(XR), [.7, .8]);
  hedgeLine(XR, mz(XR), XR, ZT);
  // fondo: cerco junto a la mesa giratoria, cerca blanca de madera y cerco hasta el galpón
  hedgeLine(XLT, ZT, -114, ZT); if (XR < -133) hedgeLine(-133, ZT, XR, ZT);
  {
    const g = group(0, 0);
    for (let x = -115; x >= -132; x -= 2.4){ boxIn(g, x, .65, ZT, .16, 1.3, .16, '#f1efe9'); addCol(x - .1, ZT - .1, x + .1, ZT + .1); }
    for (const y of [.45, 1.05]) boxIn(g, -123.5, y, ZT, 17.2, .12, .07, '#e6e3dc');
    addCol(-132, ZT - .1, -115, ZT + .1);
  }
  // portón blanco de caño en el hueco sobre Maipú
  {
    const t = .75, x = XL + (XR - XL) * t, z = mz(XL) + (mz(XR) - mz(XL)) * t, ang = Math.atan2(XR - XL, mz(XR) - mz(XL));
    const g = group(x, z, ang);
    for (const s of [-2.2, 2.2]) boxIn(g, 0, .8, s, .18, 1.6, .18, '#7a6a55');
    poleIn(g, [0, .2, -2], [0, .2, 2], .035, '#f2f2f0'); poleIn(g, [0, 1.35, -2], [0, 1.35, 2], .035, '#f2f2f0');
    poleIn(g, [0, .2, -2], [0, 1.35, -2], .035, '#f2f2f0'); poleIn(g, [0, .2, 2], [0, 1.35, 2], .035, '#f2f2f0'); poleIn(g, [0, .2, -2], [0, 1.35, 2], .03, '#f2f2f0');
    addCol(x - 2.2, z - 2.2, x + 2.2, z + 2.2);
  }
  // tierra arada con surcos (y plantitas en algunas filas)
  {
    const fx0 = Math.max(-138, XR + 4), fx1 = -110, fz0 = mz(-110) + 4, fz1 = ZT - 5;
    flat.rect(fx0, fz0, fx1, fz1, .06, '#9a6238');
    for (let z = fz0 + .4; z < fz1; z += 1.1){
      flat.rect(fx0 + .3, z, fx1 - .3, z + .45, .064, '#7d4a28');
      if (rnd() < .45) for (let x = fx0 + 1; x < fx1 - 1; x += .9) crowns.add(x, .18, z + .2, .22, .18, .22, R(0, 6), pick(['#5f9a3a', '#6dab45']));
    }
    mapRects.push([fx0, fz0, fx1, fz1, '#9a6238']);
  }
  // dos frutales
  addTree(-104.5, 99, .85, false, ['#4fa83f', '#5cb548']);
  addTree(-109.5, 86 + 3, .8, false, ['#4fa83f', '#5cb548']);
  mapLabels.push([-125, 95, 'Huerta']);
  // ---- Cuneta con vereda (foto de la entrada de la huerta): da toda la vuelta a la esquina ----
  // perfil desde el cerco hacia la calle: vereda elevada encima -> pared de ladrillo -> fondo de la cuneta -> subida de pasto -> pasto
  {
    const Q = QUINTA_POLY;
    const path = [[XR, mz(XR)], [XL, mz(XL)], Q[0], Q[3]];   // huerta (Maipú) -> quinta (Maipú) -> esquina -> calle que baja a la vía
    const bridges = [[0, .2, .3], [1, .5, .58], [2, .66, .8]];   // planchadas frente al portón de la huerta, la entrada de la quinta y el portón blanco
    const IN = [-100, 110];   // un punto adentro de la quinta/huerta (para saber de qué lado está la calle)
    for (let i = 0; i < path.length - 1; i++){
      const [ax, az] = path[i], [bx2, bz] = path[i + 1], L = Math.hypot(bx2 - ax, bz - az), ux = (bx2 - ax) / L, uz = (bz - az) / L;
      const mx = (ax + bx2) / 2, mzz = (az + bz) / 2;
      const sgn = ((mx + uz - IN[0]) * uz + (mzz - ux - IN[1]) * -ux) > 0 ? 1 : -1;   // local +x (= (uz,-ux)) apunta hacia la calle?
      const g = group(mx, mzz, Math.atan2(ux, uz)), o = v => v * sgn;
      const LL = L + 1.2;   // un poco más largo para cerrar las esquinas
      bx(g, o(1), 0, 0, 1.4, .55, LL, '#c4bdb0');                                    // vereda elevada encima
      bx(g, o(1.75), 0, 0, .12, .55, LL, '#a0533a');                                  // pared de ladrillo de la cuneta
      for (let s = -LL / 2; s < LL / 2; s += .5) bx(g, o(1.82), .5, s, .06, .04, .25, '#8a4630');   // ladrillos de canto arriba
      bx(g, o(2.3), 0, 0, 1.1, .03, LL, '#6c7a46');                                   // fondo de la cuneta
      const ang = Math.atan2(.45, 2.2), slope = new THREE.Mesh(new THREE.BoxGeometry(2.25, .08, LL), lam({ color: 0x6f9a48 }));
      slope.position.set(o(3.95), .2, 0); slope.rotation.z = ang * sgn; slope.receiveShadow = true; g.add(slope);   // subida de pasto
      bx(g, o(5.9), 0, 0, 1.8, .45, LL, '#6f9a48');                                   // pasto del lado de la calle
      // planchadas para cruzar la cuneta en las entradas
      for (const [bi, t0, t1] of bridges) if (bi === i){ const s = -L / 2 + L * (t0 + t1) / 2; bx(g, o(2.9), .4, s, 4.2, .15, 2.4, '#c9c3b5'); }
    }
  }
}
}
