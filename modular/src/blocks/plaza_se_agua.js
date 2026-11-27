// Plaza SE y Tanque de Agua: tanque de agua potable, esquina agua, Plaza SE sur, Farmacia Carino, San Luis y Entre Ríos
export function buildPlazaSEAgua(ctx) {
  const {
    AGUA_POLY, R, THREE, addBush, addCol, addTree, box, bx, canvas, cylIn, fillPoly, flat, gableIn, group, lam, mapLabels, mapRects, plazaRects, poleIn, poles, rnd, scene, signIn
  } = ctx;

{
  const [lx0, lz0] = AGUA_POLY[0], [lx1, lz1] = AGUA_POLY[2];
  plazaRects.push([lx0, lz0, lx1, lz1]);
  fillPoly(AGUA_POLY, .055, '#679347');
  const tx = 112.6, tz = -317.5, WH = '#e6e2d8';
  // textura del tambor: blanco gastado con chorreaduras oscuras de humedad
  const cv = document.createElement('canvas'); cv.width = 256; cv.height = 128; const c = cv.getContext('2d');
  c.fillStyle = '#e8e4da'; c.fillRect(0, 0, 256, 128);
  for (let k = 0; k < 26; k++){ const x = rnd() * 256, w = 2 + rnd() * 9, h = 20 + rnd() * 80; const gr = c.createLinearGradient(0, 0, 0, h); gr.addColorStop(0, `rgba(40,40,38,${.55 + rnd() * .35})`); gr.addColorStop(1, 'rgba(60,60,55,0)'); c.fillStyle = gr; c.fillRect(x, 0, w, h); }
  c.fillStyle = 'rgba(120,115,100,.25)'; for (let k = 0; k < 40; k++) c.fillRect(rnd() * 256, rnd() * 128, 3 + rnd() * 10, 2 + rnd() * 6);
  const drumTex = new THREE.CanvasTexture(cv); drumTex.colorSpace = THREE.SRGBColorSpace; drumTex.wrapS = THREE.RepeatWrapping;
  const g = group(tx, tz);
  // base y fuste
  bx(g, 0, 0, 0, 5, 3, 5, WH); bx(g, -2.53, 0, 0, .08, 2.2, 1, '#4a4f55');
  const shaft = new THREE.Mesh(new THREE.CylinderGeometry(1.9, 2.05, 20, 24).translate(0, 10, 0), lam({ color: 0xe9e6de })); shaft.castShadow = shaft.receiveShadow = true; g.add(shaft);
  for (const y of [5.5, 9.5, 13.5, 17]) for (const a of [Math.PI, Math.PI / 2]){ const w = new THREE.Mesh(new THREE.BoxGeometry(.75, 1.1, .12), lam({ color: 0x2c2f33 })); w.position.set(Math.sin(a - Math.PI / 2) * 1.97 * 0 + Math.cos(a) * 1.97, y, -Math.sin(a) * 1.97); w.rotation.y = Math.PI / 2 - a; g.add(w); }
  // ensanche y ménsulas
  const flare = new THREE.Mesh(new THREE.CylinderGeometry(3.3, 1.95, 1.8, 24).translate(0, .9, 0), lam({ color: 0xe2ded3 })); flare.position.y = 20; flare.castShadow = true; g.add(flare);
  for (let k = 0; k < 16; k++){ const a = k / 16 * Math.PI * 2; const m = new THREE.Mesh(new THREE.BoxGeometry(.35, 1.4, 1.1), lam({ color: 0xdedad0 })); m.position.set(Math.cos(a) * 2.9, 20.9, Math.sin(a) * 2.9); m.rotation.y = -a; g.add(m); }
  { const ring = new THREE.Mesh(new THREE.CylinderGeometry(3.55, 3.55, .35, 28).translate(0, .175, 0), lam({ color: 0xe2ded3 })); ring.position.y = 21.8; ring.castShadow = true; g.add(ring); }
  // tambor (tanque) con manchas, borde superior y pararrayos
  const drum = new THREE.Mesh(new THREE.CylinderGeometry(3.4, 3.4, 5.6, 32, 1, true).translate(0, 2.8, 0), new THREE.MeshLambertMaterial({ map: drumTex, side: THREE.DoubleSide }));
  drum.position.y = 22.15; drum.castShadow = true; g.add(drum);
  const lid = new THREE.Mesh(new THREE.CylinderGeometry(3.5, 3.5, .4, 32).translate(0, .2, 0), lam({ color: 0xd8d4ca })); lid.position.y = 27.75; g.add(lid);
  const dome = new THREE.Mesh(new THREE.SphereGeometry(3.2, 24, 8, 0, Math.PI * 2, 0, Math.PI / 6), lam({ color: 0xcfcbc0 })); dome.position.y = 25.4; g.add(dome);
  poleIn(g, [0, 28.6, 0], [0, 31, 0], .04, '#8a8a8a');
  addCol(tx - 2.6, tz - 2.6, tx + 2.6, tz + 2.6);
  mapRects.push([tx - 3.4, tz - 3.4, tx + 3.4, tz + 3.4, '#e6e2d8']);
  // edificio de un piso donde se carga el agua potable (borde sur del lote)
  {
    const b = group(113.7, -301.5);   // frente hacia Entre Ríos (-x)
    bx(b, 0, 0, 0, 13, 3.2, 8, '#ecebe6'); bx(b, 0, 0, 0, 13.1, .9, 8.1, '#a9573f');
    bx(b, 0, 3.2, 0, 13.4, .35, 8.4, '#d9d6cf');
    bx(b, -3.2, 0, -4.02, 3, 3.2, .1, '#b5654a');                        // paño de ladrillo
    bx(b, -6.6, 0, -1.4, .1, 2.2, 1, '#3d5a7a');                         // puerta hacia Entre Ríos
    bx(b, -6.6, 1.1, 1.8, .1, 1.2, 1.4, '#2f3c46');                      // ventanilla de atención
    const aw = new THREE.Mesh(new THREE.BoxGeometry(1.6, .08, 4), lam({ color: 0x8a5a3c })); aw.position.set(-7.3, 2.8, .4); aw.rotation.z = -.25; b.add(aw);   // toldo marrón
    const gr = new THREE.Mesh(new THREE.BoxGeometry(2.4, .08, 3), lam({ color: 0x3f8a5a })); gr.position.set(-4.8, 3.7, -2.6); gr.rotation.z = .2; b.add(gr);    // techito verde
    for (const [x, col] of [[1.5, '#e5dcc8'], [3.4, '#9aa3ab']]){ cylIn(b, x, 3.55 + .65, 1.5, .62, 1.3, col); }   // tanques plásticos en el techo
    signIn(b, 'AGUA POTABLE', -6.66, 2.6, 1.8, 2.2, .35, '#2a5aa8', '#ffffff', -Math.PI / 2);
    // canilla pública
    poleIn(b, [-7.6, 0, -2.6], [-7.6, .95, -2.6], .05, '#8f9499'); poleIn(b, [-7.6, .95, -2.6], [-7.9, .95, -2.6], .03, '#8f9499');
    addCol(107.2, -305.5, 120.2, -297.5); mapRects.push([107.2, -305.5, 120.2, -297.5, '#ecebe6']);
    mapLabels.push([113, -312, 'Tanque de agua']);
  }
  // reja: pilares de ladrillo, muro bajo y paños de alambre verde (sobre Entre Ríos y Bv. Lavalle, con portón)
  const meshMat = new THREE.MeshLambertMaterial({ color: 0x2f6b3e, transparent: true, opacity: .4, side: THREE.DoubleSide, depthWrite: false });
  const reja = (ax, az, bx2, bz) => {
    const l = Math.hypot(bx2 - ax, bz - az), n = Math.max(1, Math.round(l / 3.1)), ang = Math.atan2(-(bz - az), bx2 - ax);
    for (let k = 0; k <= n; k++){ const t = k / n; box(ax + (bx2 - ax) * t, 0, az + (bz - az) * t, .5, 1.7, .5, '#b5654a'); }
    box((ax + bx2) / 2, 0, (az + bz) / 2, Math.abs(bx2 - ax) + .3, .5, Math.abs(bz - az) + .3, '#a9573f');
    const m = new THREE.Mesh(new THREE.PlaneGeometry(l, 1.1), meshMat); m.position.set((ax + bx2) / 2, 1.05, (az + bz) / 2); m.rotation.y = ang; scene.add(m);
    addCol(Math.min(ax, bx2) - .25, Math.min(az, bz) - .25, Math.max(ax, bx2) + .25, Math.max(az, bz) + .25);
  };
  reja(lx0, lz0, lx1, lz0);                 // sobre Bv. Lavalle
  reja(lx0, lz0, lx0, -312); reja(lx0, -308, lx0, -306);   // sobre Entre Ríos, con portón
  { const pg = group(lx0, -310); for (let k = 0; k <= 8; k++) poleIn(pg, [0, .1, -2 + k * .5], [0, 1.6, -2 + k * .5], .03, '#2f6b3e'); poleIn(pg, [0, 1.6, -2], [0, 1.6, 2], .04, '#2f6b3e'); }
  // árboles del lote (coníferas y uno deciduo)
  for (const [x, z, s, cols] of [[108.5, -326, 1.05, ['#2f5a24', '#38602a']], [119, -326.5, 1.1, ['#2f5a24', '#3b6a2a']], [108, -313, .95, ['#3b6a2a', '#4b7a30']], [119.5, -311, 1, ['#2f5a24', '#38602a']], [116.5, -324, .8, ['#9c7a45', '#8a6a3a']]]) addTree(x, z, s, false, cols);
}

// =========================================================================
// Casa simétrica de la esquina (Bv. Lavalle, Entre Ríos y calle perimetral de Plaza SE, enfrente del Tanque de Agua)
// y lote baldío cercado lindante al sur (según las 4 fotos de Street View y foto satelital)
// =========================================================================
{
  const g = group(0, 0);
  const TAUPE = '#b9ad99', WALL_N = '#f2efe8', ROOF = '#34383d', EAVE = '#7d5236', WHITE = '#f6f5f1', DARK = '#24282c';
  const VERDE = ['#45702d', '#548238', '#3a6224'];
  // Suelo base verde de ambos lotes (x = 63.5..89.6, z = -329.5..-276.5)
  flat.rect(63.5, -329.5, 89.6, -302.5, .048, '#668f40');                        // césped del lote de la casa de la esquina
  flat.rect(63.5, -302.5, 89.6, -276.5, .048, '#6e8c44');                        // césped del lote baldío

  // Helper de tejado a dos aguas con tímpanos en los frentes
  const wingGable = (cx, cz, w, d, h, rH, wallCol, roofCol, axisZ = true) => {
    bx(g, cx, 0, cz, w, h, d, wallCol);
    // gableIn con ry = 0 tiene la cumbrera a lo largo de X (frontones mirando a ±X); con ry = PI/2 tiene la cumbrera a lo largo de Z (frontones mirando a ±Z)
    gableIn(g, cx, h, cz, (axisZ ? d : w) + .55, rH, (axisZ ? w : d) + .6, roofCol, axisZ ? Math.PI / 2 : 0);
    // tímpanos triangulares cerrando ambos frontones
    const span = axisZ ? w : d;
    const sh = new THREE.Shape(); sh.moveTo(-span / 2, 0); sh.lineTo(span / 2, 0); sh.lineTo(0, rH); sh.closePath();
    const geom = new THREE.ShapeGeometry(sh);
    for (const s of [-1, 1]){
      const m = new THREE.Mesh(geom, lam({ color: wallCol, side: THREE.DoubleSide }));
      if (axisZ){ m.position.set(cx, h, cz + s * (d / 2 + .01)); }
      else { m.position.set(cx + s * (w / 2 + .01), h, cz); m.rotation.y = Math.PI / 2; }
      g.add(m);
    }
    addCol(cx - w / 2, cz - d / 2, cx + w / 2, cz + d / 2);
    mapRects.push([cx - w / 2, cz - d / 2, cx + w / 2, cz + d / 2, roofCol]);
  };
  // Ventana con marco blanco saliente y persiana blanca de enrollar
  const winPers = (x, y, z, w, h, rotY = 0) => {
    const wg = group(x, z, rotY);
    bx(wg, 0, y, .04, w + .24, h + .22, .14, WHITE);
    bx(wg, 0, y + .06, .1, w, h, .04, '#e2e0da');
    for (let yy = y + .14; yy < y + h; yy += .11) bx(wg, 0, yy, .125, w - .04, .02, .01, '#c6c3ba');
  };
  // Ventana angosta con arco de medio punto (frente norte sobre Bv. Lavalle)
  const winArchN = (x, z) => {
    const wg = group(x, z, Math.PI);
    bx(wg, 0, 1.05, .04, .58, .95, .05, '#dfe6ea');
    const top = new THREE.Mesh(new THREE.CircleGeometry(.29, 14, 0, Math.PI), lam({ color: 0xdfe6ea }));
    top.position.set(0, 2.0, .065); wg.add(top);
    bx(wg, 0, 1.05, .07, .04, 1.22, .02, WHITE);
    for (const yy of [1.38, 1.72]) bx(wg, 0, yy, .07, .56, .04, .02, WHITE);
  };
  // Portón blanco de cochera con 3 ventanitas en arco arriba (frente este sobre Entre Ríos)
  const garageDoorE = (x, z) => {
    const dg = group(x, z, Math.PI / 2);
    bx(dg, 0, 0, .03, 2.85, 2.38, .08, WHITE);
    bx(dg, 0, .04, .08, 2.65, 2.26, .04, '#f0efeb');
    for (const px of [-.88, 0, .88]){
      bx(dg, px, .12, .105, .68, 1.48, .02, '#e4e3de');
      const ar = new THREE.Mesh(new THREE.CircleGeometry(.34, 14, 0, Math.PI), lam({ color: 0x2f3b44 }));
      ar.position.set(px, 1.76, .11); dg.add(ar);
      bx(dg, px, 1.76, .115, .03, .34, .01, WHITE);
    }
    bx(dg, -.22, 1.05, .12, .05, .18, .04, '#222');
  };

  // =========================================================================
  // 1) CASA DE LA ESQUINA (x = 66.2..86.8, z = -324.0..-310.8)
  // =========================================================================
  // Ala Oeste (da a la calle de la Plaza SE, x = 66.4..72.2): 2 cuerpos gemelos a dos aguas con frontón mirando al Oeste (-x)
  // más el cuerpo norte que también remata hacia Bv. Lavalle
  wingGable(69.3, -321.1, 5.8, 5.6, 3.05, 1.25, TAUPE, ROOF, false);             // cuerpo NO (frontón hacia Plaza SE)
  wingGable(69.3, -313.3, 5.8, 5.4, 3.05, 1.25, TAUPE, ROOF, false);             // cuerpo SO (frontón hacia Plaza SE)
  bx(g, 69.8, 0, -317.15, 4.8, 2.85, 2.5, TAUPE);                                // nexo central retraído en el frente oeste (entrada lateral)
  bx(g, 69.8, 2.85, -317.15, 4.9, .14, 2.6, '#d8d4ca');
  // Detalles frente Oeste (Plaza SE, x = 66.4, mirando al -x — Foto sv_2)
  winPers(66.4, 1.05, -321.1, 2.2, 1.45, -Math.PI / 2);
  winPers(66.4, 1.05, -313.3, 2.1, 1.45, -Math.PI / 2);
  {
    const pg = group(67.4, -317.15, -Math.PI / 2);                               // puerta blanca en el hueco central oeste
    bx(pg, 0, 0, .03, 1.08, 2.25, .08, WHITE);
    bx(pg, 0, .04, .08, .92, 2.15, .04, '#ecebe6');
    const ar = new THREE.Mesh(new THREE.CircleGeometry(.34, 14, 0, Math.PI), lam({ color: 0x2f3b44 }));
    ar.position.set(0, 1.65, .11); pg.add(ar);
    bx(pg, 0, 2.42, .12, .14, .22, .14, '#2a2a2a');                              // farolito sobre la puerta
  }
  // Frente norte del ala NO pintado de crema/blanco con ventana ciega (como en sv_3 derecha)
  bx(g, 69.3, 0, -323.92, 5.82, 3.05, .06, WALL_N);
  bx(g, 69.3, 2.95, -324.05, 5.9, .1, .35, EAVE);
  bx(g, 69.3, 1.35, -323.97, 1.75, 1.15, .04, '#e6e4de');

  // Cuerpo Central (x = 72.2..81.2, z = -323.2..-311.4): dos conectores planos blancos con ventanas en arco + pórtico central a dos aguas
  bx(g, 73.7, 0, -317.0, 3.0, 2.95, 9.6, WALL_N);                                // conector plano oeste (2 ventanas en arco al norte)
  bx(g, 79.7, 0, -317.0, 3.0, 2.95, 9.6, WALL_N);                                // conector plano este (2 ventanas en arco al norte)
  wingGable(76.7, -317.0, 4.8, 10.6, 3.1, 1.35, WALL_N, ROOF, true);             // cuerpo central con techo a dos aguas mirando a Bv. Lavalle
  // Pórtico blanco con 2 columnas cuadradas gruesas hacia Bv. Lavalle (z = -322.3..-324.4 — Foto sv_3)
  bx(g, 76.7, 2.55, -323.4, 4.4, .42, 2.3, WHITE);
  for (const px of [74.9, 78.5]) bx(g, px, 0, -324.25, .62, 2.55, .62, WHITE);
  flat.rect(74.7, -324.6, 78.7, -322.2, .08, '#c8c3b8');
  {
    const dg = group(76.7, -322.3, Math.PI);                                     // puerta principal blanca dentro del pórtico
    bx(dg, 0, 0, .03, 1.05, 2.25, .08, WHITE);
    const ar = new THREE.Mesh(new THREE.CircleGeometry(.34, 14, 0, Math.PI), lam({ color: 0x34424c }));
    ar.position.set(0, 1.65, .08); dg.add(ar);
  }
  for (const wx of [72.9, 74.1, 79.3, 80.5]) winArchN(wx, -321.8);               // 4 ventanas en arco (2 a cada lado del pórtico)
  // Tanque de agua negro cilíndrico sobre torrecita central (visible en sv_2, sv_3 y sv_4)
  bx(g, 76.7, 4.2, -316.0, 1.15, 1.15, 1.15, '#c4beb2');
  cylIn(g, 76.7, 5.95, -316.0, .6, 1.25, '#1d2024');

  // Ala Este (da a Entre Ríos, enfrente de la Torre de Agua, x = 81.2..86.8): 2 cocheras gemelas a dos aguas (Foto sv_4)
  wingGable(84.0, -321.1, 5.6, 5.4, 3.05, 1.25, TAUPE, ROOF, false);             // cochera norte (frontón hacia Entre Ríos)
  wingGable(84.0, -313.5, 5.6, 5.4, 3.05, 1.25, TAUPE, ROOF, false);             // cochera sur (frontón hacia Entre Ríos)
  bx(g, 83.4, 0, -317.3, 4.4, 2.85, 2.4, TAUPE);                                 // nexo retraído entre ambas cocheras
  bx(g, 83.4, 2.85, -317.3, 4.6, .14, 2.5, '#d8d4ca');
  // Detalles frente Este (Entre Ríos, x = 86.8, mirando al +x — Foto sv_4)
  garageDoorE(86.8, -321.1);
  garageDoorE(86.8, -313.5);
  // Dos tubos grandes blancos de YPF GAS + chimenea negra en el hueco entre las cocheras
  for (const gz of [-317.85, -316.75]){
    cylIn(g, 86.05, .7, gz, .36, 1.4, '#f4f4f0');
    bx(g, 86.05, .72, gz, .74, .22, .74, '#2458a8');                             // franja azul YPF Gas
    cylIn(g, 86.05, 1.45, gz, .16, .2, '#d8dce0');
  }
  cylIn(g, 86.1, 3.6, -317.3, .09, 1.9, '#1f2226');                              // caño chimenea negro vertical
  // Frente norte del ala NE pintado de crema/blanco con 2 apliques semicirculares (Foto sv_3 izquierda)
  bx(g, 84.0, 0, -323.82, 5.62, 3.05, .06, WALL_N);
  bx(g, 84.0, 2.95, -323.95, 5.7, .1, .35, EAVE);
  for (const lx of [82.6, 85.4]) bx(g, lx, 2.05, -323.88, .36, .22, .1, '#e6e2d8');

  // Huellas de hormigón de las 2 cocheras hasta el cordón de Entre Ríos (sin invadir la calle) + canasto de basura negro (Foto sv_4)
  for (const gz of [-321.1, -313.5]){
    flat.rect(86.8, gz - 1.5, 89.6, gz + 1.5, .06, '#cbc6bc');
    for (const dz of [-.95, .95]) flat.rect(89.6, gz + dz - .28, 92.85, gz + dz + .28, .204, '#c9c4ba');
  }
  {
    const cg = group(89.8, -317.3);
    for (const [dx, dz] of [[-.32, -.32], [.32, -.32], [-.32, .32], [.32, .32]]) poleIn(cg, [dx, 0, dz], [dx, 1.05, dz], .03, DARK);
    bx(cg, 0, .55, 0, .68, .48, .68, '#2b2f33');
  }

  // Tapiales escalonados color topo-beige cerrando el patio trasero de la casa (z = -310.8..-302.8 — Fotos sv_2 y sv_4)
  // Lado Oeste (Plaza SE, x = 66.4): placas escalonadas con respaldo continuo cerrado (sin ranuras transparentes) + portón negro vertical
  bx(g, 66.74, 0, -308.6, .22, 2.24, 4.4, TAUPE);                                // muro continuo de respaldo detrás de las placas
  for (const [z0, z1, xOff] of [[-310.5, -309.5, 0], [-309.2, -307.9, .18], [-307.6, -306.5, 0]]){
    bx(g, 66.55 + xOff, 0, (z0 + z1) / 2, .36, 2.25, z1 - z0, TAUPE);
    bx(g, 66.38 + xOff, 0, z0, .06, 2.25, .14, WHITE);
  }
  bx(g, 66.55, 0, -304.9, .12, 2.05, 3.0, DARK);                                 // portón negro vertical
  for (let pz = -306.3; pz <= -303.5; pz += .22) bx(g, 66.48, 0, pz, .05, 2.05, .06, '#14171a');
  bx(g, 66.55, 0, -303.1, .45, 2.25, .65, TAUPE);
  addCol(66.3, -310.8, 66.9, -302.7);
  // Lado Este (Entre Ríos, x = 86.8): larga pared de placas verticales escalonadas color topo-beige (Foto sv_4 izquierda)
  for (let k = 0; k < 8; k++){
    const pz = -310.3 + k * .98, xOff = (k % 2) * .22;
    bx(g, 86.65 + xOff, 0, pz, .42, 2.25, .88, TAUPE);
    bx(g, 86.86 + xOff, 0, pz - .42, .06, 2.25, .12, WHITE);
  }
  addCol(86.4, -310.8, 87.1, -302.7);

  // Patio trasero privado de la casa (z = -310.8..-302.8): pileta rectangular celeste (visible en satélite) + árboles verdes
  flat.rect(79.0, -310.0, 86.0, -304.2, .06, '#ece8de');
  flat.rect(79.6, -309.4, 85.4, -304.8, .072, '#34a4de');
  mapRects.push([79.6, -309.4, 85.4, -304.8, '#34a4de']);
  for (const [tx, tz, ts] of [[70.5, -306.5, .95], [75.0, -307.2, .85]]) addTree(tx, tz, ts, false, VERDE);

  // Cerco bajo de alambre en el frente norte (Bv. Lavalle, z = -326.8) y 2 perros acostados en el pasto (Foto sv_3)
  for (let px = 66.0; px <= 88.5; px += 2.8) poles.add(px, 0, -326.8, .06, .95, .06, 0, '#2a2e2c');
  poleIn(g, [66.0, .82, -326.8], [88.5, .82, -326.8], .015, '#555a58');
  poleIn(g, [66.0, .45, -326.8], [88.5, .45, -326.8], .015, '#555a58');
  // Perro negro y perro marrón descansando en el jardín delantero (sv_3)
  bx(g, 81.2, 0, -325.8, .9, .45, .48, '#1e2022'); bx(g, 81.65, .3, -325.8, .35, .32, .3, '#1e2022');
  bx(g, 79.0, 0, -324.8, .85, .42, .45, '#8c5a38'); bx(g, 78.55, .28, -324.8, .32, .3, .28, '#8c5a38');
  // Arbolitos de vereda y poste metálico rojizo sobre Plaza SE (Fotos sv_2, sv_3, sv_4)
  addTree(70.5, -327.2, .6, false, ['#9c7a45', '#8a6a3a']);
  addTree(88.8, -306.5, .7, false, ['#9c7a45', '#8a6a3a']);
  poleIn(g, [64.4, 0, -310.5], [64.4, 7.2, -310.5], .08, '#b85a42');

  // =========================================================================
  // 2) LOTE BALDÍO LINDANTE AL SUR (x = 63.5..89.6, z = -302.5..-276.5 — Foto sv_1 y satélite)
  // =========================================================================
  // Tapial premoldeado gris oscuro al norte (separando de la casa de la esquina, z = -302.7)
  bx(g, 76.6, 0, -302.7, 20.6, 2.18, .22, '#6c6964');
  for (let px = 66.5; px <= 86.7; px += 2.0) bx(g, px, 0, -302.7, .14, 2.22, .28, '#5a5853');
  addCol(66.3, -302.9, 86.9, -302.5);
  // Tapial de ladrillo visto claro al sur (separando de los vecinos, z = -276.8)
  bx(g, 76.6, 0, -276.8, 20.6, 2.08, .24, '#b8aa98');
  for (let y = .25; y < 2.0; y += .22) bx(g, 76.6, y, -276.93, 20.5, .02, .02, '#9e907e');
  addCol(66.3, -277.0, 86.9, -276.6);
  // Alambrado tejido con postes rústicos cerrando el baldío sobre Plaza SE (x = 66.3) y Entre Ríos (x = 86.9)
  const meshBald = new THREE.MeshLambertMaterial({ color: 0x7a8078, transparent: true, opacity: .35, side: THREE.DoubleSide, depthWrite: false });
  for (const fx of [66.3, 86.9]){
    for (let pz = -302.5; pz <= -276.5; pz += 3.25) poles.add(fx, 0, pz, .11, 1.85, .11, 0, '#7a6a55');
    const mm = new THREE.Mesh(new THREE.PlaneGeometry(26.0, 1.65), meshBald);
    mm.position.set(fx, .85, -289.5); mm.rotation.y = Math.PI / 2; g.add(mm);
    poleIn(g, [fx, 1.68, -302.5], [fx, 1.68, -276.5], .02, '#7d837b');
    addCol(fx - .12, -302.5, fx + .12, -276.5);
  }
  // Restos de contrapiso y cimientos de hormigón viejo en el centro del baldío (visibles en sv_1 y satélite)
  flat.rect(70.5, -295.5, 81.5, -284.5, .062, '#a39c8e');
  flat.rect(72.0, -298.0, 79.0, -295.5, .06, '#968f80');
  bx(g, 76.0, .06, -295.5, 11.0, .14, .25, '#8a8376');
  bx(g, 70.5, .06, -290.0, .25, .16, 11.0, '#8a8376');
  bx(g, 81.5, .06, -290.0, .25, .14, 11.0, '#8a8376');
  // Montón de ramas secas marrones junto al ángulo SO del baldío (Foto sv_1 derecha)
  for (const [rx, rz, rs] of [[67.6, -279.6, .85], [68.4, -278.8, .7], [67.4, -278.4, .65]]){
    const br = new THREE.Mesh(new THREE.DodecahedronGeometry(rs, 0), lam({ color: 0x6b4a2a }));
    br.position.set(rx, rs * .48, rz); br.scale.set(1.2, .7, 1.1); g.add(br);
  }
  // Árbol grande y frondoso en la vereda de la plaza (primer plano de sv_1) + árboles sobre Entre Ríos
  addTree(64.8, -283.5, 1.35, false, ['#4c722a', '#5d8434', '#3f6222']);
  addTree(86.2, -279.5, 1.15, false, VERDE);
  addTree(85.5, -298.5, .95, false, VERDE);

  plazaRects.push([63.5, -329.5, 89.6, -276.5]);   // sin árboles ni casas aleatorias en la esquina ni en el baldío
}

// =========================================================================
// Lado sur de la calle perimetral de Plaza SE (z = -276.8, mirando al norte -z hacia la plaza) y esquina con Av. Centenario (Farmacia Carino):
// De este (al lado del lote baldío) a oeste (esquina Av. Centenario), ajustando anchos para que entren todas las casas de Street View:
// 1) Esquina al lado del baldío (61.5..69.5): camioneta roja, acopladito negro, cerco bajo y galpón de chapa oxidada
// 2) Casa baja blanca con torre ocre y tanque gris (54.0..61.5)
// 3) Casa italiana alta blanca y verde-oliva (44.2..54.0)
// 4) Casa moderna de hormigón visto (27.5..44.2) con garaje blanco de madera, persianas horizontales, galería cubierta y portón gris con franja roja
// 5) Casa de la esquina 2 plantas (13.5..27.5): garaje blanco abierto con enredadera, zócalo de ladrillo, terraza con baranda de madera y 3 arcos de ladrillo arriba
// 6) FARMACIA CARINO sobre Av. Centenario (x = 13.5, z = -267.5..-259.5): frente blanco con cenefa y cruz verde, cartel, puerta con reja y persiana gris
// =========================================================================
{
  const g = group(0, 0);
  const ZF = -276.8;   // línea municipal sur de la calle de la plaza (frente mirando al -z)
  const XA = 13.5;     // línea municipal este de Av. Centenario (frente mirando al -x)
  // Vereda verde con pasto a lo largo de toda la cuadra de la plaza
  flat.rect(13.5, -279.5, 70.5, ZF, .204, '#6b8f42');
  flat.rect(13.5, ZF, 70.5, -259.5, .048, '#668840');

  // --- 1) Esquina al lado del baldío (x = 61.5..69.5): camioneta roja, acoplado negro, cerco bajo y galpón oxidado ---
  flat.rect(65.5, -279.5, 68.8, ZF, .205, '#9e8e74');
  bx(g, 67.6, 0, ZF + .15, 3.2, 1.05, .14, '#9a9892');
  for (const px of [66.1, 67.6, 69.1]) bx(g, px, 0, ZF + .15, .14, 1.7, .16, '#86847e');
  // Galpón de chapa acanalada oxidada con portón doble (x = 61.5..65.9, w = 4.4 m)
  bx(g, 63.7, 0, -271.7, 4.4, 3.05, 10.2, '#9a948a');
  bx(g, 63.7, 3.05, -271.7, 4.55, .14, 10.35, '#7e634e');
  for (let px = 61.7; px <= 65.7; px += .35){
    const ox = (px < 62.3 || px > 65.1) ? '#8a4f30' : '#a8a49c';
    bx(g, px, 0, ZF - .04, .18, 3.0, .06, ox);
  }
  bx(g, 63.7, 0, ZF - .07, 2.8, 2.45, .08, '#b2afa8');
  bx(g, 63.7, 2.48, ZF - .08, 2.9, .12, .08, '#8a4f30');
  addCol(61.5, -276.8, 65.9, -266.5);
  mapRects.push([61.5, -276.8, 65.9, -266.5, '#9a948a']);
  // Camioneta utilitaria roja + acoplado negro en el pasto al lado del baldío
  {
    const v = group(68.2, -277.9, -.25);
    bx(v, -.4, .32, 0, 2.0, 1.38, 1.44, '#c83424');
    bx(v, 1.05, .32, 0, 1.1, .78, 1.4, '#c83424');
    bx(v, .62, 1.05, 0, .72, .52, 1.34, '#2d3942');
    for (const [wx, wz] of [[-.85, .72], [1.05, .72], [-.85, -.72], [1.05, -.72]]){
      const wh = cylIn(v, wx, .32, wz, .3, .18, '#1e2022'); wh.rotation.x = Math.PI / 2;
    }
    const tr = group(70.4, -278.6, .35);
    bx(tr, 0, .42, 0, 1.6, .6, 1.05, '#232629');
    bx(tr, 0, .8, 0, 1.15, .34, .82, '#3b4a5e');
    for (const wz of [-.58, .58]){ const wh = cylIn(tr, 0, .3, wz, .28, .14, '#1b1d1f'); wh.rotation.x = Math.PI / 2; }
  }
  addTree(66.5, -273.5, .9, false, ['#8d7858', '#7a684a']);

  // --- 2) Casa baja blanca con torre ocre y tanque gris (x = 54.0..61.5, w = 7.5 m) ---
  bx(g, 57.75, 0, -270.9, 7.5, 3.08, 11.8, '#f5f4ef');
  bx(g, 57.75, 3.08, -270.9, 7.65, .2, 11.95, '#e8e4d8');
  bx(g, 57.75, 2.95, ZF - .06, 7.54, .18, .08, '#d4b878');
  bx(g, 60.95, 0, ZF - .05, .85, 2.1, .08, '#ffffff');
  bx(g, 60.95, 1.4, ZF - .09, .5, .45, .04, '#36444e');
  for (const wx of [59.15, 55.35]){
    bx(g, wx, .85, ZF - .05, 1.55, 1.25, .08, '#e8e6e0');
    for (let yy = .95; yy < 1.5; yy += .12) bx(g, wx, yy, ZF - .09, 1.45, .02, .02, '#4a4e52');
    for (let xx = wx - .62; xx <= wx + .64; xx += .18) bx(g, xx, .85, ZF - .1, .025, .62, .02, '#dcdad4');
    bx(g, wx, 1.5, ZF - .08, 1.45, .55, .04, '#f2f1ec');
  }
  bx(g, 57.25, 0, ZF - .04, .98, 2.25, .12, '#e6e3dc');
  bx(g, 57.25, 0, ZF - .08, .82, 2.15, .06, '#b8764a');
  bx(g, 57.25, 2.42, ZF - .12, .14, .2, .12, '#2a2a2a');
  bx(g, 59.3, 3.25, -274.8, 1.45, 1.35, 1.45, '#c49648');
  cylIn(g, 59.3, 5.2, -274.8, .62, 1.25, '#8a9096');
  flat.rect(54.0, ZF - .9, 61.5, ZF, .206, '#d6d2c8');
  flat.rect(56.8, -279.5, 57.8, ZF - .9, .206, '#c9c4ba');
  poleIn(g, [56.6, 0, ZF - .5], [56.6, 7.6, ZF - .5], .12, '#7d6850');
  addCol(54.0, -276.8, 61.5, -265.0);
  mapRects.push([54.0, -276.8, 61.5, -265.0, '#f5f4ef']);

  // --- 3) Casa italiana alta blanca y verde-oliva (x = 44.2..54.0, w = 9.8 m) ---
  const OLIVA = '#a69e6a', CAOB = '#8a4626';
  bx(g, 49.1, 0, -270.4, 9.8, 4.65, 12.8, '#f5f4f0');
  bx(g, 49.1, 4.65, -270.4, 9.95, .18, 12.95, '#e2dfd6');
  bx(g, 49.1, 0, ZF - .05, 9.84, .65, .08, OLIVA);
  bx(g, 49.1, 3.65, ZF - .06, 9.88, .22, .12, OLIVA);
  bx(g, 49.1, 4.18, ZF - .06, 9.88, .32, .14, OLIVA);
  for (const bxX of [51.9, 49.1, 46.3]){
    bx(g, bxX, .65, ZF - .03, 1.75, 2.95, .04, '#b8b07e');
    bx(g, bxX, 3.12, ZF - .06, 1.15, .28, .06, '#f6f5f0');
    bx(g, bxX, 4.34, ZF - .1, .28, .24, .06, '#f6f5f0');
  }
  for (const wx of [51.9, 46.3]){
    bx(g, wx, .78, ZF - .06, 1.08, 2.05, .08, CAOB);
    bx(g, wx, .86, ZF - .1, .88, 1.88, .04, '#2d453a');
    bx(g, wx, .86, ZF - .12, .05, 1.88, .03, CAOB);
    for (let yy = 1.2; yy < 2.6; yy += .38) bx(g, wx, yy, ZF - .12, .88, .04, .03, CAOB);
  }
  bx(g, 49.1, 0, ZF - .06, 1.18, 2.85, .08, CAOB);
  for (const s of [-.22, .22]) bx(g, 49.1 + s, 1.05, ZF - .1, .3, 1.2, .04, '#366846');
  bx(g, 49.1, 2.48, ZF - .1, 1.0, .36, .04, '#252a2e');
  for (const s of [-.78, .78]){
    bx(g, 49.1 + s, 2.45, ZF - .12, .14, .24, .14, '#2d3b2d');
    cylIn(g, 49.1 + s * 1.1, .35, ZF - .35, .24, .7, '#756648');
  }
  flat.rect(44.2, ZF - 1.1, 54.0, ZF, .206, '#d4cec2');
  flat.rect(48.3, -279.5, 49.9, ZF - 1.1, .206, '#cbc6bc');
  for (const tx of [52.2, 45.0]) addTree(tx, -278.4, .52, false, ['#9c7a45', '#8a6a3a']);
  addCol(44.2, -276.8, 54.0, -264.0);
  mapRects.push([44.2, -276.8, 54.0, -264.0, '#f5f4f0']);

  // --- 4) Casa moderna de hormigón visto (x = 27.5..44.2, w = 16.7 m) ---
  const HORM = '#9f9d96', HORM2 = '#8c8a84';
  // a) Patio lateral con portón de madera (42.4..44.2) y garaje blanco con portón de madera + banco + perro (40.0..42.4)
  bx(g, 43.3, 0, ZF + 2.0, 1.8, 2.2, .14, '#7d4628');
  bx(g, 41.2, 0, -271.0, 2.5, 3.25, 11.4, '#f2f1ed');
  bx(g, 41.2, 0, ZF - .05, 2.15, 2.3, .08, '#6e3a20');
  for (let px = 40.3; px <= 42.1; px += .45) bx(g, px, .1, ZF - .09, .04, 2.1, .02, '#4e2815');
  for (let py = .45; py < 2.2; py += .45) bx(g, 41.2, py, ZF - .09, 2.05, .04, .02, '#4e2815');
  bx(g, 42.9, .45, ZF - .55, 1.25, .08, .4, '#8a6242');
  bx(g, 42.9, .78, ZF - .38, 1.25, .26, .06, '#8a6242');
  for (const s of [-.55, .55]) bx(g, 42.9 + s, 0, ZF - .55, .07, .55, .4, '#282b2e');
  bx(g, 41.5, 0, ZF - .5, .72, .4, .4, '#1b1d1f');
  flat.rect(40.0, -279.5, 44.2, ZF, .206, '#cbc6bc');

  // b) Cuerpo saliente de hormigón visto (x = 35.0..40.0, w = 5.0 m)
  bx(g, 37.5, 0, -270.4, 5.0, 3.55, 12.8, HORM);
  bx(g, 37.5, 3.55, -270.4, 5.1, .14, 12.9, HORM2);
  for (const wx of [38.8, 36.2]){
    bx(g, wx, 1.15, ZF - .05, 1.55, 1.2, .08, '#dfe3e6');
    for (let yy = 1.22; yy < 2.32; yy += .1) bx(g, wx, yy, ZF - .09, 1.48, .03, .02, '#5c6266');
  }
  bx(g, 37.5, 2.0, ZF - .07, .14, .28, .08, '#222');
  addTree(39.0, -278.4, .62, false, ['#8d7452', '#7a6445']);
  poleIn(g, [35.3, 0, -278.5], [35.3, 7.2, -278.5], .07, '#b55842');

  // c) Galería cubierta retraída de hormigón visto (x = 30.8..35.0, w = 4.2 m)
  bx(g, 32.9, 0, -269.2, 4.2, 3.95, 10.6, HORM);
  bx(g, 32.9, 2.85, ZF - .95, 4.4, .35, 2.3, HORM2);
  bx(g, 34.2, 0, ZF - .95, .42, 2.85, .42, HORM);
  bx(g, 34.7, 0, -274.5, .12, 2.55, 1.1, '#b86832');
  bx(g, 32.8, 1.15, -274.55, 2.1, 1.2, .08, '#dfe3e6');
  for (let yy = 1.22; yy < 2.32; yy += .1) bx(g, 32.8, yy, -274.59, 2.02, .03, .02, '#5c6266');
  for (const mx of [33.4, 32.5]){
    bx(g, mx, 0, -275.3, .34, .5, .34, '#b8b6ae');
    const mb = new THREE.Mesh(new THREE.SphereGeometry(.2, 8, 6), lam({ color: 0x3f6e2e }));
    mb.position.set(mx, .62, -275.3); g.add(mb);
  }
  bx(g, 32.5, 3.95, -270.0, 1.65, 1.15, 1.15, '#e8e6de');
  flat.rect(34.0, -279.5, 35.1, ZF, .206, '#c9c4ba');
  addTree(31.5, -278.4, .62, false, ['#8d7452', '#7a6445']);

  // d) Garaje derecho de hormigón visto con portón levadizo gris y franja baja roja (x = 27.5..30.8, w = 3.3 m)
  bx(g, 29.15, 0, -270.6, 3.3, 3.45, 12.2, HORM);
  bx(g, 29.15, 0, ZF - .05, 2.75, 2.5, .08, '#8a9096');
  bx(g, 29.15, 0, ZF - .09, 2.7, .32, .04, '#a63426');
  for (let py = .55; py < 2.35; py += .5) bx(g, 29.15, py, ZF - .09, 2.7, .04, .02, '#62686e');
  flat.rect(27.5, -279.5, 30.8, ZF, .206, '#cbc6bc');
  addCol(27.5, -276.8, 44.2, -263.0);
  mapRects.push([27.5, -276.8, 42.5, -263.0, HORM]);

  // --- 5) CASA DE LA ESQUINA DE 2 PLANTAS (x = 13.5..27.5, z = -276.8..-267.5 — Fotos sv3_1 y sv3_2) ---
  const LAD_E = '#b45a3e', CREMA_E = '#ece9e0', MAD_B = '#7d5b40';
  // a) Garaje blanco abierto + pared con portón blanco ranurado y enredadera colgante (x = 22.8..27.5 — izquierda de sv3_1)
  bx(g, 25.15, 0, -271.5, 4.7, 2.95, 10.6, '#f4f3ef');
  bx(g, 26.0, 0, ZF - .04, 2.55, 2.35, .14, '#24272a');                           // boca oscura del garaje abierto
  bx(g, 23.8, 0, ZF - .04, 1.9, 2.35, .08, '#ffffff');                           // hojas blancas del portón
  for (const px of [23.4, 24.2]) bx(g, px, .1, ZF - .09, .12, 2.15, .03, '#4a4e52');
  // Baranda de tablas de madera sobre el techo del garaje + tanque negro atrás
  for (const ry of [3.2, 3.6]) bx(g, 25.15, ry, ZF + .15, 4.6, .14, .12, MAD_B);
  for (const rx of [23.0, 25.15, 27.3]) bx(g, rx, 2.95, ZF + .15, .14, .85, .14, MAD_B);
  cylIn(g, 24.4, 3.65, -274.2, .52, 1.05, '#1d2024');
  // Enredadera verde frondosa cayendo sobre la pared blanca (sv3_1)
  for (const [ex, ey, ez, es] of [[24.3, 2.75, ZF - .18, .65], [23.5, 2.55, ZF - .18, .7], [22.7, 2.45, ZF - .18, .65], [22.1, 2.6, ZF - .15, .55]]){
    const vn = new THREE.Mesh(new THREE.DodecahedronGeometry(es, 0), lam({ color: 0x3b6e28 }));
    vn.position.set(ex, ey, ez); vn.scale.set(1.2, .75, .55); g.add(vn);
  }
  flat.rect(22.8, -279.5, 27.5, ZF, .206, '#cbc6bc');                            // entrada de hormigón al garaje

  // b) Cuerpo principal de la esquina (x = 13.5..22.8, z = -276.8..-267.5, 9.3 m x 9.3 m — sv3_1 derecha y sv3_2 izquierda)
  // Planta baja crema con hueco real de entrada metida 1,3 m sobre Av. Centenario (z = -273.5..-272.1)
  bx(g, 18.8, 0, -272.15, 8.0, 3.02, 9.3, CREMA_E);                              // volumen principal detrás del zaguán (x = 14.8..22.8)
  bx(g, 14.15, 0, -275.15, 1.3, 3.02, 3.3, CREMA_E);                             // cuerpo frontal izq sobre Av. Centenario (z = -276.8..-273.5)
  bx(g, 14.15, 0, -269.8, 1.3, 3.02, 4.6, CREMA_E);                              // cuerpo frontal der sobre Av. Centenario (z = -272.1..-267.5)
  bx(g, 14.15, 2.25, -272.8, 1.32, .77, 1.42, CREMA_E);                          // dintel/techo sobre el zaguán metido
  bx(g, 14.15, 0, -272.8, 1.3, .12, 1.4, '#c4bdb0');                             // piso embaldosado del zaguán
  bx(g, 18.15, 0, ZF - .04, 9.34, .65, .08, LAD_E);                              // zócalo de ladrillo sobre calle de la plaza
  bx(g, XA - .04, 0, -275.15, .08, .78, 3.34, LAD_E);                            // zócalo de ladrillo izq sobre Av. Centenario
  bx(g, XA - .04, 0, -269.8, .08, .78, 4.64, LAD_E);                             // zócalo de ladrillo der sobre Av. Centenario
  bx(g, XA - .05, 2.25, -272.15, .1, .78, 9.36, LAD_E);                          // franja superior continua de ladrillo sobre Av. Centenario (sv3_2)
  // Aberturas frente norte (calle de la plaza, z = ZF — sv3_1)
  bx(g, 21.6, 0, ZF - .04, 1.15, 2.15, .08, '#ffffff');                          // portoncito blanco de reja
  for (let px = 21.15; px <= 22.05; px += .22) bx(g, px, .1, ZF - .09, .04, 1.95, .02, '#4a4e52');
  bx(g, 19.6, 1.05, ZF - .05, 1.85, 1.35, .08, LAD_E);                           // marco de ladrillo de la ventana
  bx(g, 19.6, 1.18, ZF - .09, 1.5, 1.1, .04, '#364652');
  for (let xx = 19.0; xx <= 20.2; xx += .24) bx(g, xx, 1.18, ZF - .12, .03, 1.1, .02, '#f2f2ee');
  bx(g, 16.5, 0, ZF - .05, 1.35, 2.35, .08, LAD_E);                              // marco de ladrillo de la puerta
  bx(g, 16.5, 0, ZF - .09, 1.0, 2.2, .05, '#c9b898');
  // Aberturas frente oeste (Av. Centenario — sv3_2): puerta metida en el fondo del zaguán (x = 14.8) + ventana con reja blanca cuadriculada (z = -269.7)
  bx(g, 14.78, .12, -272.8, .08, 2.13, 1.18, '#f4f4f0');                         // marco blanco de la puerta al fondo del hueco
  bx(g, 14.74, .14, -272.8, .05, 2.08, .96, '#8bb3cc');                          // hoja de puerta celeste-blanca con profundidad real
  bx(g, 14.71, .2, -272.8, .04, .65, .74, '#6e767d');                            // tablero inferior gris
  bx(g, 14.71, 1.1, -272.8, .04, .85, .68, '#d4e4ee');                           // vidrio superior
  // Ventana con reja blanca cuadriculada y persiana en Av. Centenario (z = -269.7, bien visible sobre la pared blanca)
  bx(g, XA - .04, .78, -269.7, .12, .08, 2.2, '#d8d2c6');                        // alféizar
  bx(g, XA - .05, .86, -269.7, .08, 1.32, 2.05, '#2f3d47');                      // vano/vidrio oscuro de fondo
  bx(g, XA - .08, 1.72, -269.7, .05, .44, 1.98, '#e6e4de');                      // persiana enrollable arriba
  for (let yy = 1.78; yy < 2.14; yy += .1) bx(g, XA - .1, yy, -269.7, .03, .02, 1.96, '#c4c0b6');
  for (let pz = -270.6; pz <= -268.8; pz += .22) bx(g, XA - .11, .88, pz, .03, 1.28, .03, '#ffffff');   // barrotes verticales blancos
  for (let py = 1.08; py <= 1.95; py += .28) bx(g, XA - .11, py, -269.7, .03, .03, 2.0, '#ffffff');     // barrotes horizontales blancos
  // Baranda de tablas de madera rodeando la terraza en L (sobre calle de la plaza y sobre Av. Centenario)
  for (const ry of [3.28, 3.68]){
    bx(g, 18.15, ry, ZF + .15, 9.2, .14, .12, MAD_B);
    bx(g, XA + .15, ry, -272.15, .12, .14, 9.2, MAD_B);
  }
  for (let rx = 13.7; rx <= 22.6; rx += 2.2) bx(g, rx, 3.02, ZF + .15, .14, .88, .14, MAD_B);
  for (let rz = -276.6; rz <= -267.7; rz += 2.2) bx(g, XA + .15, 3.02, rz, .14, .88, .14, MAD_B);
  // Planta alta retraída blanca con 3 arcos de ladrillo mirando a la plaza y balcón de madera hacia Av. Centenario (sv3_1 y sv3_2)
  bx(g, 18.4, 3.02, -271.2, 7.6, 2.65, 5.2, '#f5f4f0');
  gableIn(g, 18.4, 5.67, -271.2, 8.2, 1.15, 5.8, '#4a5056', 0);                  // techo de chapa gris oscuro a dos aguas
  bx(g, 17.6, 5.8, -272.8, .55, 1.25, .55, LAD_E);                               // chimenea de ladrillo
  // 3 arcos decorativos de ladrillo en la fachada norte de planta alta (sv3_1)
  for (const ax of [20.9, 18.4, 15.9]){
    const ar = new THREE.Mesh(new THREE.TorusGeometry(.85, .12, 6, 16, Math.PI), lam({ color: 0xb45a3e }));
    ar.position.set(ax, 4.15, -273.85); g.add(ar);
    bx(g, ax - .85, 3.05, -273.85, .24, 1.12, .12, LAD_E);
    bx(g, ax + .85, 3.05, -273.85, .24, 1.12, .12, LAD_E);
  }
  // Pilastras de ladrillo, persiana blanca y balcón de madera saliente mirando a Av. Centenario (sv3_2)
  for (const pz of [-272.6, -269.8]) bx(g, 14.58, 3.02, pz, .12, 2.35, .42, LAD_E);
  bx(g, 14.56, 3.15, -271.2, .1, 2.1, 2.15, '#e8e6df');
  for (let yy = 3.28; yy < 5.15; yy += .14) bx(g, 14.5, yy, -271.2, .03, .02, 2.1, '#c8c4ba');
  for (const ry of [3.4, 3.8]) bx(g, 13.7, ry, -271.2, .1, .16, 3.1, '#9c7c58');
  for (const rz of [-272.7, -269.7]) bx(g, 14.1, 3.4, rz, .9, .55, .1, '#9c7c58');
  // Jardín de la esquina: arbusto con flores naranjas, macetitas de colores y árbol grande en la esquina (sv3_1 y sv3_2)
  addBush(20.6, -278.0, .85, 0);
  for (const [fx, fz, fc] of [[18.6, -278.0, '#e85d3a'], [18.1, -278.1, '#f2c21b'], [16.5, -278.0, '#e85d3a'], [15.9, -278.1, '#48a842']]){
    bx(g, fx, .35, fz, .22, .22, .22, fc);
  }
  addTree(14.5, -278.0, 1.15, false, ['#3f6a28', '#4f7a32', '#355c22']);
  addTree(11.4, -274.2, 1.1, false, ['#8d7858', '#7a684a']);
  addCol(13.5, -276.8, 27.5, -267.5);
  mapRects.push([13.5, -276.8, 27.5, -267.5, CREMA_E]);

  // --- 6) FARMACIA CARINO (sobre Av. Centenario, pegada al sur de la casa de la esquina: x = 13.5..24.5, z = -267.5..-259.5 — Foto sv3_2) ---
  {
    const FC_G = '#26a65b';
    bx(g, 19.0, 0, -263.5, 11.0, 3.65, 8.0, '#f3f2ee');
    bx(g, 19.0, 3.65, -263.5, 11.15, .14, 8.15, '#e2e0d8');
    // Cenefa y visera verde esmeralda + pilastra verde derecha + cruz 3D verde en el frente sobre Av. Centenario (-x)
    bx(g, XA - .08, 3.48, -263.5, .16, .18, 8.06, FC_G);
    bx(g, XA - .32, 2.55, -263.5, .68, .18, 8.08, FC_G);                         // visera verde saliente
    bx(g, XA - .06, 0, -259.75, .24, 3.65, .48, FC_G);                           // pilastra derecha verde
    bx(g, XA - .45, 2.75, -259.75, .14, .88, .28, FC_G);                         // cruz verde saliente (brazo vertical)
    bx(g, XA - .45, 3.05, -259.75, .14, .28, .88, FC_G);                         // cruz verde saliente (brazo horizontal)
    // Cartel "FARMACIA CARINO · Perfumería y Accesorios" sobre la visera
    {
      const cv = document.createElement('canvas'); cv.width = 512; cv.height = 128;
      const cx2 = cv.getContext('2d');
      cx2.fillStyle = '#f3f2ee'; cx2.fillRect(0, 0, 512, 128);
      // cruz verde estilizada a la izquierda
      cx2.fillStyle = '#26a65b'; cx2.beginPath(); cx2.arc(108, 62, 34, 0, Math.PI * 2); cx2.fill();
      cx2.fillStyle = '#f3f2ee'; cx2.fillRect(101, 40, 14, 44); cx2.fillRect(86, 55, 44, 14);
      cx2.textAlign = 'left'; cx2.fillStyle = '#1f5a9a'; cx2.font = 'bold 20px Arial'; cx2.fillText('FARMACIA', 155, 40);
      cx2.fillStyle = '#26a65b'; cx2.font = 'bold 52px Arial'; cx2.fillText('CARINO', 152, 86);
      cx2.fillStyle = '#1f5a9a'; cx2.font = 'bold 17px Arial'; cx2.fillText('Perfumería y Accesorios', 165, 110);
      const tex = new THREE.CanvasTexture(cv); tex.colorSpace = THREE.SRGBColorSpace;
      const sm = new THREE.Mesh(new THREE.PlaneGeometry(6.6, .88), lam({ map: tex }));
      sm.position.set(XA - .08, 3.12, -263.5); sm.rotation.y = -Math.PI / 2; g.add(sm);
    }
    // Puerta doble blanca con rejas a la izquierda (z = -266.0) + persiana metálica gris ancha con zócalo verde a la derecha (z = -262.6)
    bx(g, XA - .05, 0, -266.0, .08, 2.45, 1.75, '#f6f6f4');
    bx(g, XA - .09, .1, -266.0, .04, 2.25, 1.55, '#3b4a55');
    for (let pz = -266.7; pz <= -265.3; pz += .22) bx(g, XA - .12, .1, pz, .03, 2.25, .03, '#f6f6f4');
    bx(g, XA - .06, .35, -262.5, .08, 2.15, 3.8, '#9aa0a6');                     // persiana metálica gris
    for (let yy = .45; yy < 2.45; yy += .14) bx(g, XA - .1, yy, -262.5, .03, .02, 3.76, '#7d8389');
    bx(g, XA - .08, 0, -262.5, .1, .38, 3.85, FC_G);                             // zócalo verde debajo de la persiana
    // Vereda ancha de baldosas claras + canasto y bicicletero sobre Av. Centenario
    flat.rect(9.0, -267.5, XA, -262.2, .206, '#d6d2c8');
    flat.rect(10.5, -262.2, XA, -259.5, .206, '#d6d2c8');
    {
      const bg = group(10.0, -260.8);
      poleIn(bg, [0, 0, 0], [0, .85, 0], .03, '#3a3a3a');
      bx(bg, 0, .85, 0, .55, .42, .85, '#5a6066');
    }
    addCol(XA, -267.5, 24.5, -259.5);
    mapRects.push([XA, -267.5, 24.5, -259.5, FC_G]);
    mapLabels.push([19, -263.5, 'Farm. Carino']);
  }

  // =========================================================================
  // RESTO DE LA MANZANA DE PLAZA SE: esquina Av. Centenario y San Luis, todo San Luis hasta Entre Ríos,
  // y Entre Ríos subiendo hasta el lote baldío + interior con pileta (según las 7 fotos de Street View y satélite)
  // =========================================================================
  const ZS = -250.5;   // línea municipal norte de San Luis (frente mirando al +z)
  const XE = 89.5;     // línea municipal oeste de Entre Ríos (frente mirando al +x)
  flat.rect(13.5, -264.5, 89.6, ZS, .048, '#628a3e');                            // césped interior del sector sur de la manzana

  // --- 7) Casa baja crema vieja de la esquina Av. Centenario y San Luis (x = 13.5..28.2, z = -259.5..-250.5 — Fotos sv4_1, sv4_2 y vista esquina) ---
  {
    const CR = '#dcd4c4', CR2 = '#c9c0ae';
    // Cuerpo principal completo con galería/porche cubierto en la esquina sobre Av. Centenario (z = -255.2..-251.5, metido 2,5 m)
    // y el volumen cerrado de la esquina sobre San Luis (x = 16.0..28.2, z = -252.5..-250.5) bajo un mismo techo plano corrido
    bx(g, 20.85, 0, -257.35, 14.7, 3.05, 4.3, CR);                               // ala norte (pegada a Farmacia Carino, z = -259.5..-255.2)
    bx(g, 22.1, 0, -252.85, 12.2, 3.05, 4.7, CR);                                // cuerpo principal sobre San Luis (x = 16.0..28.2, z = -255.2..-250.5)
    bx(g, 14.75, 2.68, -253.35, 2.5, .37, 3.7, CR);                              // losa/techo cubriendo el porche retraído de la esquina
    bx(g, 14.75, 0, -253.35, 2.5, .12, 3.7, '#c4bdb0');                          // piso del porche cubierto
    bx(g, 13.65, 0, -251.55, .32, 3.05, .32, CR);                                // columna de la esquina del porche
    bx(g, 20.85, 3.05, -255.0, 14.9, .14, 9.2, CR2);                             // parapeto continuo de todo el techo plano
    // Frente sobre Av. Centenario (x = 13.5, mirando al -x — sv4_1): 2 ventanas con rejas romboidales blancas + reja vertical cerrando el porche cubierto
    for (const wz of [-258.3, -256.3]){
      bx(g, XA - .04, 1.05, wz, .08, 1.15, 1.45, '#e8e4dc');
      bx(g, XA - .08, 1.12, wz, .04, 1.0, 1.32, '#5a5852');
      for (let dz = -.55; dz <= .55; dz += .22) bx(g, XA - .1, 1.12, wz + dz, .03, 1.0, .03, '#f2f0ea');
      for (let dy = 1.25; dy <= 1.95; dy += .24) bx(g, XA - .1, dy, wz, .03, .03, 1.32, '#f2f0ea');
    }
    // Reja blanca vertical cerrando el frente y costado del porche cubierto (x = 14.2, z = -255.2..-251.5) + puerta de madera adentro
    bx(g, 14.2, 2.6, -253.35, .08, .08, 3.6, '#e6e4de');
    for (let rz = -255.1; rz <= -251.6; rz += .18) bx(g, 14.2, .12, rz, .04, 2.52, .04, '#e6e4de');
    bx(g, 15.96, .12, -253.6, .08, 2.15, 1.0, '#cfc8bc');                        // puerta dentro del porche cubierto
    // Frente sobre San Luis (z = ZS, mirando al +z — sv4_2 y vista esquina): ventana izq con reja romboidal + 2 ventanitas der + puertita blanca + tanque arriba
    bx(g, 18.8, 1.02, ZS + .04, 2.15, 1.22, .08, '#e6e2da');
    bx(g, 18.8, 1.08, ZS + .08, 1.98, 1.08, .04, '#5a5852');
    for (let dx = -.88; dx <= .88; dx += .22) bx(g, 18.8 + dx, 1.08, ZS + .1, .03, 1.08, .03, '#f2f0ea');
    for (let dy = 1.24; dy <= 1.98; dy += .24) bx(g, 18.8, dy, ZS + .1, 1.98, .03, .03, '#f2f0ea');
    for (const wx of [23.6, 25.6]){
      bx(g, wx, 1.12, ZS + .04, 1.25, 1.08, .08, '#dedad0');
      bx(g, wx, 1.18, ZS + .08, 1.1, .95, .04, '#5a5852');
      for (let dx = -.45; dx <= .45; dx += .22) bx(g, wx + dx, 1.18, ZS + .1, .03, .95, .03, '#f2f0ea');
    }
    bx(g, 28.65, 0, ZS + .04, .95, 2.1, .08, '#f4f4f0');                         // puertita blanca lateral (sv4_2)
    bx(g, 26.2, 3.15, -253.5, 1.2, 1.0, 1.2, '#cfc8ba'); cylIn(g, 26.2, 4.7, -253.5, .52, 1.0, '#787e84');
    // Vereda ancha rojiza de la esquina, señal "Loma de burro 50 mts" y cartel azul Av. Centenario (sv4_1)
    flat.rect(10.0, -259.5, XA, ZS + 2.6, .206, '#b88272');
    flat.rect(10.0, ZS, 28.2, ZS + 2.6, .206, '#b88272');
    {
      const s1 = group(11.4, -255.8); poleIn(s1, [0, 0, 0], [0, 2.1, 0], .04, '#7d8286');
      const dm = new THREE.Mesh(new THREE.BoxGeometry(.05, .62, .62), lam({ color: 0xebd128 })); dm.position.set(0, 1.85, 0); dm.rotation.x = Math.PI / 4; s1.add(dm);
      const s2 = group(11.0, -250.2); poleIn(s2, [0, 0, 0], [0, 2.8, 0], .05, '#253b7a');
      signIn(s2, 'Av. Centenario', -.04, 2.55, 0, 1.15, .26, '#1f3a8a', '#ffffff', -Math.PI / 2);
      signIn(s2, 'San Luis', 0, 2.25, .04, .9, .26, '#1f3a8a', '#ffffff', 0);
    }
    poleIn(g, [21.5, 0, ZS + 2.2], [21.5, 7.0, ZS + 2.2], .09, '#c46232');
    addTree(11.4, -258.2, 1.2, false, ['#8d7858', '#7a684a']);
    addTree(26.5, ZS + 2.4, 1.15, false, ['#8d7858', '#7a684a']);
    addCol(13.5, -259.5, 28.2, ZS);
    mapRects.push([13.5, -259.5, 28.2, ZS, CR]);
  }

  // --- 8) Tapial largo, portón corredizo gris y cerco vivo sobre San Luis (x = 28.2..57.5, z = ZS — Fotos sv4_2, sv4_3 y sv4_4 izq) ---
  // Muro gris revocado (28.2..31.6) + portón corredizo gris oscuro entre 2 pilares blancos con faroles (31.6..36.4)
  bx(g, 29.9, 0, ZS, 3.4, 2.15, .24, '#a69e92');
  bx(g, 31.8, 0, ZS, .45, 2.4, .45, '#f2f1ed'); bx(g, 36.2, 0, ZS, .45, 2.4, .45, '#f2f1ed');
  bx(g, 34.0, 0, ZS, 4.0, 2.1, .12, '#4a5256');                                  // portón corredizo gris oscuro
  for (const py of [.5, 1.05, 1.6]) bx(g, 34.0, py, ZS + .07, 3.9, .05, .03, '#343a3e');
  flat.rect(31.6, ZS, 36.4, ZS + 3.5, .206, '#cbc6bc');                          // entrada de hormigón al portón
  // Tapial largo de ladrillo visto con columnas de hormigón (x = 36.4..47.5 — sv4_3)
  bx(g, 41.95, 0, ZS, 11.1, 2.22, .22, '#b09884');
  for (let px = 36.6; px <= 47.4; px += 2.7) bx(g, px, 0, ZS, .22, 2.26, .28, '#9a968e');
  // Cerco vivo alto y tupido de enredadera verde oscura con columnas de hormigón y puertita blanca (x = 47.5..57.5 — sv4_4 izq)
  bx(g, 52.5, 0, ZS, 10.0, 2.45, .48, '#3f5a2c');
  for (let px = 49.0; px <= 56.5; px += 2.5) bx(g, px, 0, ZS + .2, .16, 2.15, .16, '#969288');
  bx(g, 48.2, 0, ZS + .22, .85, 2.05, .08, '#f4f4f0');                           // puertita blanca en el cerco vivo
  addCol(28.2, ZS - .25, 57.5, ZS + .25);
  for (const tx of [39.5, 44.5, 50.0, 56.2]) addTree(tx, ZS + 2.2, 1.05, false, ['#8d7858', '#7a684a']);
  // Pileta interior en el patio detrás del cerco vivo verde (x = 49.2..55.8, separada del lote del tapial gris por medianera en x = 47.5)
  flat.rect(48.8, -260.8, 56.2, -254.8, .06, '#ece8de');
  flat.rect(49.5, -260.1, 55.5, -255.5, .072, '#34a4de');
  mapRects.push([49.5, -260.1, 55.5, -255.5, '#34a4de']);

  // --- Tapiales / medianeras internas separando todos los patios de la manzana de Plaza SE ---
  const medSE = (x0, z0, x1, z1, h = 2.15, col = '#cfc7b8') => {
    const cx = (x0 + x1) / 2, cz = (z0 + z1) / 2, w = Math.max(.22, x1 - x0), d = Math.max(.22, z1 - z0);
    bx(g, cx, 0, cz, w, h, d, col);
    addCol(x0, z0, x1, z1);
  };
  // Tapial clave entre el lote del tapial gris/ladrillo (x < 47.5) y el lote del cerco vivo verde con pileta (x > 47.5)
  medSE(47.4, -264.2, 47.62, ZS, 2.25, '#c4b8a6');
  // Medianeras separando los demás patios internos de las casas de Plaza SE, San Luis y Entre Ríos
  medSE(28.1, -263.5, 28.32, ZS, 2.2, '#b8a898');                                // entre esquina San Luis/Centenario y patio de casa hormigón
  medSE(31.5, -263.5, 31.72, ZS, 2.15, '#c9c2b4');                               // entre fondo de Farmacia Carino/esquina y entrada portón gris
  medSE(57.4, -265.2, 57.62, ZS, 2.2, '#cfc7b8');                                // entre lote del cerco vivo verde y casa del medio sobre San Luis
  medSE(61.4, -266.8, 61.62, -262.8, 2.15, '#c4b8a6');                           // entre casa blanca baja y galpón oxidado
  medSE(69.4, -266.8, 69.62, -252.5, 2.15, '#b8a898');                           // entre casa del medio y entrada del portón blanco
  medSE(75.4, -276.6, 75.62, ZS, 2.2, '#c8b8a4');                                // entre los lotes de Entre Ríos (chalet + casa naranja) y el interior
  medSE(57.5, -263.6, 75.5, -263.38, 2.15, '#d4cdc0');                           // medianera horizontal separando fondos de Plaza SE y San Luis
  medSE(75.5, -262.1, XE, -261.88, 2.15, '#b8684e');                             // entre chalet de esquina San Luis/Entre Ríos y casa terracota-naranja
  medSE(66.0, -273.6, 75.5, -273.38, 2.1, '#c4b8a6');                            // fondo detrás del galpón oxidado hacia Entre Ríos
  // Arbolitos y pisos de patio en los fondos separados para que se distingan bien desde arriba
  flat.rect(32.0, -263.0, 47.0, -251.0, .052, '#5c843c');
  flat.rect(32.5, -262.5, 42.0, -257.5, .056, '#c8c2b6');                        // patio trasero embaldosado de la casa de hormigón
  addTree(43.5, -255.0, 1.05, false, ['#43702b', '#528036']);
  addTree(35.0, -254.0, .95, false, ['#43702b', '#528036']);
  addTree(72.5, -258.5, 1.0, false, ['#43702b', '#528036']);

  // --- 9) Casa del medio sobre San Luis + portón ancho blanco (x = 57.5..75.5, z = -263.0..ZS — Fotos sv4_4 der y sv4_5 izq) ---
  {
    const TAN = '#bda68c', CRM = '#e2d8c5';
    // Cuerpo de la casa retirado 2,4 m detrás de un murito crema con reja negra (x = 57.5..69.5)
    bx(g, 63.5, 0, -257.8, 12.0, 3.25, 9.8, TAN);
    bx(g, 63.5, 2.85, -252.86, 12.05, .42, .1, CRM);                             // franja superior crema
    bx(g, 63.5, 3.25, -257.8, 12.15, .16, 9.95, '#cfc6b4');
    // Porche retraído izquierdo + gran ventana con reja negra y aire acondicionado a la derecha (sv4_4)
    bx(g, 60.2, .95, -252.84, 2.1, 1.35, .08, '#dfe4e8');
    for (let xx = 59.3; xx <= 61.1; xx += .24) bx(g, xx, .95, -252.8, .03, 1.35, .02, '#222');
    bx(g, 65.8, .9, -252.84, 2.8, 1.55, .08, '#e8ecee');
    for (let xx = 64.5; xx <= 67.1; xx += .22) bx(g, xx, .9, -252.8, .03, 1.55, .02, '#222');
    bx(g, 68.1, 1.1, -252.7, .85, .55, .42, '#dedcd4');                          // aire acondicionado de ventana
    cylIn(g, 68.4, 4.1, -254.0, .55, 1.0, '#969ca2');                            // tanque de agua en el techo
    // Murito bajo crema con reja negra y portoncito al frente (z = ZS)
    bx(g, 60.2, 0, ZS, 5.2, .65, .22, CRM); bx(g, 66.4, 0, ZS, 6.0, .65, .22, CRM);
    bx(g, 63.0, 0, ZS, .38, 1.1, .38, CRM);
    for (let rx = 57.8; rx <= 69.2; rx += .22) bx(g, rx, .65, ZS, .03, .5, .03, '#222629');
    flat.rect(57.5, -252.9, 69.5, ZS, .06, '#c4b8a6');
    flat.rect(62.8, ZS, 64.2, ZS + 3.5, .206, '#c8c3b8');
    // Portón ancho de chapa blanca acanalada entre muros de ladrillo (x = 69.5..75.5 — sv4_5 izq)
    bx(g, 72.5, 0, ZS, 4.4, 2.15, .12, '#e8e6df');
    for (let px = 70.5; px <= 74.5; px += .35) bx(g, px, 0, ZS + .07, .04, 2.15, .03, '#c4c2ba');
    bx(g, 69.9, 0, ZS, .8, 2.2, .24, '#b8a898'); bx(g, 75.1, 0, ZS, .8, 2.2, .24, '#b8a898');
    flat.rect(70.0, ZS, 75.0, ZS + 3.5, .206, '#c8c3b8');
    addTree(61.5, ZS + 2.2, 1.15, false, ['#8d7858', '#7a684a']);
    addTree(74.8, ZS + 2.2, 1.15, false, ['#8d7858', '#7a684a']);
    addCol(57.5, -263.0, 75.5, ZS);
    mapRects.push([57.5, -263.0, 69.5, -252.9, TAN]);
  }

  // --- 10) Chalet crema con alero de tejas y chimenea de piedra en la esquina San Luis y Entre Ríos (x = 75.5..89.5, z = -262.0..ZS — Fotos sv4_5 der y sv4_6 izq) ---
  {
    const CH = '#efe8d8', TEJA = '#b85436', LADR = '#a8523a';
    bx(g, 82.0, 0, -257.2, 11.2, 3.05, 8.8, CH);
    bx(g, 82.0, 3.05, -257.2, 11.4, .16, 9.0, '#ddd6c6');
    // Alero inclinado de tejas rojas sobre San Luis (+z) y sobre Entre Ríos (+x)
    const eS = new THREE.Mesh(new THREE.BoxGeometry(11.8, .18, 1.05), lam({ color: 0xb85436 }));
    eS.position.set(82.0, 2.95, -252.4); eS.rotation.x = .32; g.add(eS);
    const eE = new THREE.Mesh(new THREE.BoxGeometry(1.05, .18, 9.4), lam({ color: 0xb85436 }));
    eE.position.set(87.9, 2.95, -257.2); eE.rotation.z = -.32; g.add(eE);
    // Frente sobre San Luis (z = -252.8 — sv4_5): 2 persianas, puerta de madera oscura, columna blanca y ventanal con persiana
    for (const wx of [78.4, 80.7, 85.4]){
      bx(g, wx, 1.05, -252.76, wx > 84 ? 2.4 : 1.55, 1.25, .08, '#c8c6be');
      for (let yy = 1.15; yy < 2.25; yy += .12) bx(g, wx, yy, -252.71, wx > 84 ? 2.34 : 1.5, .02, .02, '#9e9c94');
    }
    bx(g, 82.8, 0, -252.76, 1.05, 2.25, .08, '#5a3622');                         // puerta madera oscura
    bx(g, 87.3, 0, -252.1, .28, 2.95, .28, '#f4f3ef');                           // columna de la esquina
    // Frente sobre Entre Ríos (x = 87.6 — sv4_6 izq): gran CHIMENEA DE PIEDRA GRIS entre 2 ventanales con persianas
    bx(g, 87.85, 0, -255.8, .95, 4.45, 1.45, '#9ea2a6');                         // chimenea exterior de piedra gris
    bx(g, 87.85, 4.45, -255.8, 1.15, .16, 1.65, '#b8bcc0');                      // sombrerete de la chimenea
    for (const wz of [-254.2, -258.5]){
      bx(g, 87.64, 1.0, wz, .08, 1.35, 2.15, '#c8c6be');
      for (let yy = 1.1; yy < 2.3; yy += .12) bx(g, 87.69, yy, wz, .02, .02, 2.1, '#9e9c94');
    }
    // Murito bajo de ladrillo visto rojo con pilares y reja baja rodeando la esquina (z = ZS y x = XE)
    bx(g, 82.5, 0, ZS, 13.8, .62, .22, LADR); bx(g, XE, 0, -256.2, .22, .62, 11.4, LADR);
    for (let px = 76.2; px <= 89.2; px += 3.2) bx(g, px, 0, ZS, .38, 1.05, .38, LADR);
    for (let pz = -261.6; pz <= -251.0; pz += 3.4) bx(g, XE, 0, pz, .38, 1.05, .38, LADR);
    for (let rx = 76.4; rx <= 89.0; rx += .24) bx(g, rx, .62, ZS, .03, .45, .03, '#3c4246');
    for (let rz = -261.4; rz <= -250.8; rz += .24) bx(g, XE, .62, rz, .03, .45, .03, '#3c4246');
    poleIn(g, [78.6, 0, ZS + 2.2], [78.6, 7.2, ZS + 2.2], .09, '#c46232');
    addTree(82.4, ZS + 2.2, 1.2, false, ['#8d7858', '#7a684a']);
    addTree(88.8, ZS + 2.2, 1.1, false, ['#8d7858', '#7a684a']);
    addTree(XE + 2.2, -256.5, 1.1, false, ['#8d7858', '#7a684a']);
    addCol(75.5, -262.0, XE, ZS);
    mapRects.push([76.4, -261.6, 87.6, -252.8, TEJA]);
  }

  // --- 11) Casa terracota-naranja y ladrillo con garaje de 4 arcos y auto gris sobre Entre Ríos (x = 76.0..89.5, z = -273.5..-262.0 — Fotos sv4_6 der y sv4_7) ---
  {
    const NARANJA = '#cf6344', LADR_O = '#7c4c3a';
    // Tramo sur (z = -268.5..-262.0 — sv4_6 der): muro naranja con bloques calados + puerta blanca + porche ladrillo con reja verde y techo de tejas
    bx(g, 83.2, 0, -265.25, 11.4, 3.05, 6.5, LADR_O);
    const roofT = new THREE.Mesh(new THREE.BoxGeometry(11.8, .18, 6.8), lam({ color: 0xb55034 }));
    roofT.position.set(83.2, 3.35, -265.25); roofT.rotation.z = -.12; g.add(roofT);
    bx(g, 89.2, 0, -263.1, .3, 2.35, 2.2, NARANJA);                              // muro frontal naranja con calados arriba
    bx(g, 89.2, 2.35, -263.1, .28, .45, 2.2, '#6b3828');
    bx(g, 89.1, 0, -264.6, .12, 2.15, .85, '#f2f1ed');                           // puerta blanca
    bx(g, 89.1, 2.75, -266.8, .35, .3, 3.6, NARANJA);                            // viga naranja del porche
    for (let rz = -268.2; rz <= -265.2; rz += .22) bx(g, 89.0, 0, rz, .04, 2.65, .04, '#2f5c3a');   // reja verde oscura
    // Tramo norte (z = -273.5..-268.5 — sv4_7 centro): garaje terracota-naranja con puerta blanca, ventana con reja y portón blanco con 4 arcos
    bx(g, 83.5, 0, -271.0, 12.0, 3.45, 5.0, NARANJA);
    bx(g, 89.54, 0, -269.0, .08, 2.15, .85, '#f2f1ed');                          // puertita blanca
    bx(g, 89.54, 1.05, -270.15, .08, .95, 1.05, '#dfe6ea');                      // ventana con reja blanca
    for (let rz = -270.6; rz <= -269.7; rz += .18) bx(g, 89.59, 1.05, rz, .03, .95, .03, '#3c4246');
    // Portón blanco de 4 paneles con 4 ventanitas en arco (z = -272.1)
    bx(g, 89.54, 0, -272.1, .08, 2.4, 2.55, '#f4f3ef');
    for (const dz of [-.9, -.3, .3, .9]){
      const ar = new THREE.Mesh(new THREE.CircleGeometry(.24, 12, 0, Math.PI), lam({ color: 0x2f3b44 }));
      ar.position.set(89.59, 1.88, -272.1 + dz); ar.rotation.y = Math.PI / 2; g.add(ar);
    }
    flat.rect(XE, -273.4, 92.85, -269.0, .205, '#c9c4ba');                       // entrada vehicular de hormigón (hasta el cordón)
    // Auto sedán gris estacionado en la entrada del garaje (Foto sv4_7)
    {
      const car = group(90.9, -271.8, Math.PI / 2);
      bx(car, 0, .28, 0, 1.72, .65, 3.85, '#c4c9ce');
      bx(car, 0, .92, -.15, 1.48, .52, 2.0, '#d2d7dc');
      bx(car, 0, .96, -.15, 1.5, .42, 1.7, '#2d3942');
      for (const [wx, wz] of [[-.88, 1.2], [.88, 1.2], [-.88, -1.2], [.88, -1.2]]){
        const wh = cylIn(car, wx, .28, wz, .28, .18, '#1e2022'); wh.rotation.z = Math.PI / 2;
      }
    }
    // Jardincito norte (z = -276.5..-273.5) conectando con el tapial de ladrillo del lote baldío (sv4_7 der)
    addTree(XE + 2.2, -264.5, 1.1, false, ['#8d7858', '#7a684a']);
    addTree(XE + 2.2, -267.8, 1.15, false, ['#8d7858', '#7a684a']);
    addTree(XE + 2.2, -274.8, 1.2, false, ['#8d7858', '#7a684a']);
    addCol(76.0, -273.5, XE, -262.0);
    mapRects.push([76.0, -273.5, XE, -262.0, NARANJA]);
  }

  plazaRects.push([13.5, -279.5, 89.6, -250.5]);   // toda la mitad sur de la manzana de Plaza SE armada a mano
}

// Av. Centenario, lado este entre San Luis y Jujuy (video + fotos + plano satelital del usuario):
// desde la esquina de Jujuy: galpón · Aberturas · "Los Bolita" · Sociedad Italiana (840) · Heladería PEGHI (860) · AMFAC (876)
// Contra la vereda: "Los Bolita", PEGHI, AMFAC. Retirados ~5 m con patio adelante: galpón, Aberturas, Sociedad Italiana.
}
