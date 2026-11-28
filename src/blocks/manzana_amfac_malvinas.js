// Manzana AMFAC / Peghi / Soc. Italiana (frentes e interior), Entre Ríos O, Jujuy S, Plaza Islas Malvinas y Correo Argentino
export function buildManzanaAmfacMalvinas(ctx) {
  const {
    R, S, THREE, W, addBush, addCol, addPalm, addTree, balls, box, boxIn, bx, canvas, colLocal, crowns, cylIn, flat, gableIn, group, lam, mapLabels, mapRects, pick, plazaRects, poleIn, poles, rnd, scene, signIn, trims, trunks
  } = ctx;

{
  const FX = 13.6, ZJ = -153.5;   // línea de vereda sobre la avenida y esquina de Jujuy
  // lot(s0, s1, retiro, fondo): s = metros desde la esquina de Jujuy hacia San Luis
  const lot = (s0, s1, sb, depth) => { const z0 = ZJ - s1, z1 = ZJ - s0, x = FX + sb; const g = group(x, (z0 + z1) / 2, -Math.PI / 2); if (sb > .5) flat.rect(FX, z0, x, z1, .205, '#c4bdb0'); return { g, w: z1 - z0, d: depth, z0, z1, x, zc: (z0 + z1) / 2 }; };
  // local: x = a lo largo de la avenida (hacia +z / Jujuy), z = hacia la calle (frente en z = 0), el edificio va hacia -z
  const done = (L, col, label) => { colLocal(L.g, -L.w / 2, -L.d, L.w / 2, 0, col); if (label) mapLabels.push([L.x + L.d / 2, L.zc, label]); };
  const win = (g, x, y, w, h, frame = '#ffffff', glass = '#3b4a55') => { bx(g, x, y - .08, .05, w + .16, h + .16, .08, frame); bx(g, x, y, .1, w, h, .05, glass); };
  const reja = (g, x, y, w, h, col = '#ffffff', step = .14) => { for (let k = 0; k <= Math.round(w / step); k++) bx(g, x - w / 2 + k * step, y, .15, .035, h, .035, col); };
  const lampPost = (x, z) => { poles.add(x, 0, z, .1, 3.6, .1, 0, '#e9e9e6'); const l = new THREE.Mesh(new THREE.SphereGeometry(.22, 10, 8), lam({ color: 0xf4f2e6, emissive: 0x2a2a20 })); l.position.set(x, 3.75, z); scene.add(l); addCol(x - .12, z - .12, x + .12, z + .12); };

  // ---- AMFAC (876) — frente blanco enmarcado por un marco gris oscuro grueso, logos verdes y vidrieras con gráfica verde ----
  {
    const L = lot(51, 63.5, .4, 13), g = L.g, GR = '#5f6468', GN = '#3db34a';
    bx(g, 0, 0, -L.d / 2, L.w, 5.6, L.d, '#f4f4f2');
    bx(g, 0, 4.4, -.1, L.w + .3, 1.4, .5, GR);
    for (const x of [-L.w / 2, L.w / 2]) bx(g, x, 0, -.1, .6, 5.8, .55, GR);
    bx(g, 1.6, 0, -.05, .9, 4.4, .4, GR);
    bx(g, -3.3, 4.55, .2, 1.1, 1.1, .06, GN); signIn(g, 'a', -3.3, 5.1, .24, .9, .9, GN, '#ffffff');
    signIn(g, 'amfac', -1.3, 5.1, .2, 2.8, .8, '#f4f4f2', GN);
    bx(g, 2.6, 4.55, .2, .9, .9, .06, GN); signIn(g, 'a', 2.6, 5, .24, .75, .75, GN, '#ffffff');
    for (const [x, w] of [[-3.9, 2.9], [-.8, 2.9], [4.2, 2.9]]){ bx(g, x, .75, .06, w + .2, 2.5, .08, '#e2e2de'); bx(g, x, .8, .11, w, 2.4, .05, '#9cc9a3'); bx(g, x, .8, .14, w, 1.1, .04, GN); }
    bx(g, 2.6, 0, .08, 1, 2.8, .06, '#cfd5d8'); bx(g, 2.6, .2, .12, .45, 2.4, .04, GN);
    { const fg = group(L.x - .3, L.zc + 3.3); poleIn(fg, [0, 3.4, 0], [-.9, 5.6, 0], .03, '#cccccc'); const cv = document.createElement('canvas'); cv.width = 60; cv.height = 36; const c = cv.getContext('2d'); ['#e40303','#ff8c00','#ffed00','#008026','#004dff','#750787'].forEach((col, i) => { c.fillStyle = col; c.fillRect(0, i * 6, 60, 6); }); const t = new THREE.CanvasTexture(cv); t.colorSpace = THREE.SRGBColorSpace; const f = new THREE.Mesh(new THREE.PlaneGeometry(.9, .55), new THREE.MeshLambertMaterial({ map: t, side: THREE.DoubleSide })); f.position.set(-.8, 5.2, .2); f.rotation.y = Math.PI / 2; fg.add(f); }
    // tapial bajo blanco con portón gris del lado de San Luis
    box(FX + .2, 0, L.z0 - 3.5, .4, 2.1, 7, '#e9e6df'); box(FX + .15, 0, L.z0 - 1.2, .2, 2.2, 1.6, '#8f969c'); addCol(FX, L.z0 - 7, FX + .4, L.z0);
    done(L, '#f4f4f2', 'AMFAC');
  }
  // ---- Esquina San Luis y Av. Centenario (a la izquierda de AMFAC) — fotos de Street View del usuario ----
  // sin vereda (pasto y tierra), tapia de ladrillo encalada y descascarada, ochava con mural "EEMPA 1044",
  // subestación aérea (torre de dos postes de hormigón con plataforma y transformadores) en el pasto, poste de hormigón en la ochava
  {
    const ZS = -234.5, ZE = -217.5, XSL = 33.5, OCH = 2.2;   // línea de San Luis, fin del pasto (AMFAC), largo de la tapia por San Luis, catetos de la ochava
    flat.rect(9, ZS, FX, ZE, .208, '#6f8f45');                      // pasto en lugar de vereda sobre la avenida (sin solaparse con San Luis)
    flat.rect(9, -237.8, XSL, ZS, .208, '#6f8f45');                 // y sobre San Luis (sin montar sobre el cordón)
    flat.rect(10.3, -237.5, 11.1, ZE, .214, '#9a8466');             // huella de tierra pisada
    for (let k = 0; k < 7; k++){ const av = k < 4, x = av ? R(9.3, 11.3) : R(16, 31), z = av ? R(-237, -222) : R(-237.4, -236); flat.rect(x, z, x + R(.8, 2.2), z + R(.5, 1.3), .214, pick(['#8f7a5a', '#a08a68', '#7d8f4c'])); }
    // ladrillo encalado (blanco gastado con ladrillos a la vista)
    const brickTex = (() => { const c = document.createElement('canvas'); c.width = 256; c.height = 128; const x = c.getContext('2d');
      x.fillStyle = '#e4ded2'; x.fillRect(0, 0, 256, 128);
      for (let r = 0; r < 16; r++) for (let k = -1; k < 9; k++){ const px = k * 30 + (r % 2) * 15, py = r * 8;
        if (rnd() < .2){ x.fillStyle = pick(['#b9876a', '#c49a7e', '#a87458', '#d2b8a2', '#cfc6b6']); x.fillRect(px + 1, py + 1, 28, 6); }
        x.strokeStyle = 'rgba(120,110,95,.28)'; x.lineWidth = 1; x.strokeRect(px + .5, py + .5, 30, 8); }
      x.fillStyle = 'rgba(110,100,85,.18)'; x.fillRect(0, 118, 256, 10);   // mancha de humedad abajo
      const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; t.wrapS = t.wrapT = THREE.RepeatWrapping; t.anisotropy = 4; return t; })();
    const HT = 2.2;
    const tapia = (x0, z0, x1, z1, tex = brickTex, faceCol = null) => {
      const len = Math.hypot(x1 - x0, z1 - z0), ry = Math.atan2(-(z1 - z0), x1 - x0), g = group((x0 + x1) / 2, (z0 + z1) / 2, ry);
      const t = tex.clone(); t.needsUpdate = true; t.repeat.set(len / 2, 2);
      const face = faceCol ? lam({ color: faceCol }) : lam({ map: t }), top = lam({ color: '#d9d2c4' });
      const m = new THREE.Mesh(new THREE.BoxGeometry(len, HT, .3), [top, top, top, top, face, face]); m.position.y = HT / 2; m.castShadow = m.receiveShadow = true; g.add(m);
      boxIn(g, 0, HT + .05, 0, len + .05, .1, .36, '#cfc8b8');
      return g;
    };
    const xA = FX + .15, zO = ZS + .15;   // la tapia va justo adentro de la línea municipal
    tapia(xA, ZS + OCH, xA, ZS + OCH + 2, brickTex, '#f2f0ea');            // tramo blanco del mural sobre la avenida
    tapia(xA, ZS + OCH + 2, xA, -224);                                   // sobre la avenida hasta el tapial de AMFAC
    addCol(FX, ZS + OCH, FX + .35, -224);
    tapia(FX + OCH, zO, XSL, zO); addCol(FX + OCH, ZS, XSL, ZS + .35);   // sobre San Luis
    // ochava con el mural
    { const ax = xA, az = ZS + OCH, bx2 = FX + OCH, bz = zO, len = Math.hypot(bx2 - ax, bz - az);
      const g = group((ax + bx2) / 2, (az + bz) / 2, Math.atan2(-(bz - az), bx2 - ax));
      bx(g, 0, 0, 0, len + .2, HT, .3, '#f2f0ea'); bx(g, 0, HT, 0, len + .25, .1, .36, '#cfc8b8');
      const c = document.createElement('canvas'); c.width = 480; c.height = 340; const x = c.getContext('2d');
      x.fillStyle = '#f4f2ec'; x.fillRect(0, 0, 480, 340);
      // árbol: tronco marrón con ramas
      x.fillStyle = '#5a3d2b'; x.beginPath(); x.moveTo(205, 300); x.lineTo(275, 300); x.lineTo(258, 200); x.lineTo(330, 110); x.lineTo(312, 98); x.lineTo(250, 170); x.lineTo(246, 70); x.lineTo(228, 70); x.lineTo(226, 165); x.lineTo(160, 95); x.lineTo(145, 110); x.lineTo(218, 200); x.closePath(); x.fill();
      // hojas = cuadraditos de colores (libros)
      for (const [px, py, col] of [[300, 80, '#2f6fb5'], [335, 120, '#3aa04a'], [140, 80, '#e0a020'], [215, 45, '#c0392b'], [255, 50, '#7a3fa0'], [120, 125, '#2f6fb5'], [355, 85, '#e67e22'], [180, 60, '#3aa04a'], [100, 160, '#1b2a3a']]){ x.fillStyle = col; x.save(); x.translate(px, py); x.rotate(R(-.4, .4)); x.fillRect(-15, -12, 30, 24); x.restore(); }
      x.fillStyle = '#d23a4a'; for (const [px, py] of [[400, 150], [425, 190], [395, 225], [420, 260]]){ x.beginPath(); x.arc(px - 6, py, 7, 0, 7); x.arc(px + 6, py, 7, 0, 7); x.fill(); x.beginPath(); x.moveTo(px - 13, py + 2); x.lineTo(px + 13, py + 2); x.lineTo(px, py + 17); x.fill(); }
      x.fillStyle = '#2a2a2a'; x.font = 'bold 34px Arial, sans-serif'; x.textAlign = 'center'; x.fillText('EEMPA 1044', 160, 325);
      x.font = '20px Arial, sans-serif'; x.fillStyle = '#4a4a4a'; x.fillText('crecer', 100, 40);
      const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 4;
      const mural = new THREE.Mesh(new THREE.PlaneGeometry(len, HT * .95), new THREE.MeshLambertMaterial({ map: t }));
      // el grupo tiene +x de la avenida hacia San Luis; la cara de afuera (hacia la esquina) es -z del grupo
      mural.position.set(0, HT * .5, -.16); mural.rotation.y = Math.PI; g.add(mural);
      for (let k = 0; k <= 4; k++){ const px = ax + (bx2 - ax) * k / 4, pz = az + (bz - az) * k / 4; addCol(px - .25, pz - .25, px + .25, pz + .25); }
    }
    // poste de hormigón frente a la ochava
    poles.add(11.6, 0, -236.6, .2, 8.6, .2, 0, '#c4bfb4'); addCol(11.4, -236.8, 11.8, -236.4);
    // lote baldío detrás de la tapia con árboles de naranjas (sin casa en la esquina)
    plazaRects.push([13.5, -234.5, 33.5, -217.5]);
    flat.rect(13.8, -234.2, 33.4, -217.8, .05, '#648b3c');
    mapRects.push([13.8, -234.2, 33.4, -217.8, '#5a8a38']);
    const ORANGE_LEAF = ['#366b26', '#437c2f', '#2d5c1f'];
    for (const [ox, oz, sc] of [[18.5, -230.8, .92], [24.2, -231.2, 1.02], [29.8, -230.2, .95], [17.8, -225.2, .88], [23.6, -225.8, .96], [29.5, -224.6, 1.0], [21.2, -220.8, .85], [27.5, -220.4, .90]]){
      addTree(ox, oz, sc, false, ORANGE_LEAF, '#6b5139');
      // naranjas visibles alrededor de la copa
      const cy = 2.6 * sc + 1.05 * sc, cr = 1.65 * sc;
      for (let k = 0; k < 7; k++){
        const a = k * 0.9 + ox * .3, r = cr * (.72 + (k % 2) * .16);
        balls.add(ox + Math.cos(a) * r, cy + ((k % 3) - 1) * .35 * sc, oz + Math.sin(a) * r, .14, .14, .14, 0, k % 2 ? '#f28718' : '#e67212');
      }
    }
    // subestación aérea: dos postes de hormigón, plataforma con baranda oxidada y transformadores
    { const g = group(10.9, -228.2, -Math.PI / 2), HC = '#cfcac0', ST2 = '#a8977c', RUST = '#8a4b35';
      // local: x = a lo largo de la avenida (entre los dos postes), +z = hacia la calle
      for (const s of [-1, 1]){
        poleIn(g, [s * 1.3, 0, 0], [s * 1.3, 8.4, 0], .2, HC);
        poleIn(g, [s * 1.3, 8.2, 0], [s * 1.95, 10.1, 0], .13, HC);                  // remate en V
        poleIn(g, [s * 1.3, 2.5, 0], [s * 1.55, 3.25, 1.55], .05, '#6f6458');        // mensulas de la plataforma
        cylIn(g, s * 1.95, 10.35, 0, .08, .45, '#4a3d35');                           // aisladores de arriba
      }
      cylIn(g, 0, 9.4, 0, .08, .45, '#4a3d35');
      for (const [y, w] of [[9.1, 4.2], [7.2, 3.3], [6.1, 3.2], [5.1, 3.1]]) boxIn(g, 0, y, .05, w, .12, .14, ST2);   // crucetas
      for (const x of [-.9, 0, .9]){ cylIn(g, x, 7.45, .05, .07, .4, '#3a3a3a'); cylIn(g, x, 6.35, .2, .05, .45, '#3a3a3a'); poleIn(g, [x, 6.1, .2], [x * .6, 4.7, .6], .015, '#222222'); }
      // plataforma
      boxIn(g, 0, 3.3, .75, 3.5, .12, 1.9, '#6b6258');
      for (let k = 0; k < 9; k++) boxIn(g, -1.6 + k * .4, 3.37, .75, .06, .03, 1.85, '#4f4842');
      for (const [x, z] of [[-1.7, -.15], [1.7, -.15], [-1.7, 1.65], [1.7, 1.65]]) boxIn(g, x, 3.95, z, .06, 1.1, .06, RUST);
      boxIn(g, 0, 4.5, 1.65, 3.46, .06, .06, RUST); boxIn(g, 0, 4.5, -.15, 3.46, .06, .06, RUST);
      for (const s of [-1, 1]) boxIn(g, s * 1.7, 4.5, .75, .06, .06, 1.86, RUST);
      for (const x of [-.6, 0, .6]){ cylIn(g, x, 3.95, .65, .28, 1.1, '#c9ccce'); cylIn(g, x, 4.52, .65, .3, .06, '#b3b7ba'); cylIn(g, x, 4.75, .65, .05, .4, '#3a3a3a'); }
      colLocal(g, -1.5, -.2, -1.1, .2, null); colLocal(g, 1.1, -.2, 1.5, .2, null);
    }
  }
  // ---- San Luis, del tapial hacia Entre Ríos (fotos de Street View del usuario, en orden) ----
  // 1 casa con guarda gris, canteros de ladrillo rojo y cochera con puertas de vidrio · 2 casa retirada con cerco de celosía blanca y cica ·
  // 3 casona antigua con cornisa y dos puertas de madera · 4 Kiosco de la Eli (fachada salpicada con ventanal enrejado y chimenea +
  //   galería con alero de tejas, toldo verde festoneado y rejita blanca) · 5 cochera alta con tres ventanitas · 6 casa baja de la esquina
  {
    const ZL = -234.5, WH = '#f3f1ec', RED = '#c2654a';
    // local: frente en z = 0 sobre la línea municipal, +z = hacia la calle, +x = hacia Av. Centenario (= la derecha en las fotos)
    const casa = (x0, x1) => { const cx = (x0 + x1) / 2; return { g: group(cx, ZL, Math.PI), w: x1 - x0, cx, Wd: (lx, lz) => [cx - lx, ZL - lz] }; };
    const body = (g, x0, x1, d0, d1, h, col) => { bx(g, (x0 + x1) / 2, 0, -(d0 + d1) / 2, x1 - x0, h, d1 - d0, col); colLocal(g, x0, -d1, x1, -d0, col); };
    const rejaV = (g, x, y0, z, w, h, col = '#f4f4f2', step = .15) => { for (let k = 1; k < Math.round(w / step); k++) bx(g, x - w / 2 + k * step, y0, z, .03, h, .03, col); for (const y of [y0, y0 + h - .04]) bx(g, x, y, z, w + .04, .04, .04, col); };
    const ventana = (g, x, y0, z, w, h, rejCol = '#f4f4f2') => { bx(g, x, y0 - .07, z + .02, w + .2, h + .14, .06, '#e6e3dc'); bx(g, x, y0, z + .04, w, h, .04, '#3b4a55'); rejaV(g, x, y0, z + .1, w, h, rejCol); };
    const puerta = (g, x, z, w, h, col) => { bx(g, x, 0, z + .02, w + .16, h + .08, .06, '#e6e3dc'); bx(g, x, 0, z + .05, w, h, .06, col); bx(g, x + w * .33, h * .45, z + .1, .06, .06, .06, '#c9a227'); };
    const moldura = (g, x, y, w) => bx(g, x, y, .05, w + .4, .14, .12, '#e6e3dc');
    const cesto = (x, z) => { const g = group(x, z); poleIn(g, [0, 0, 0], [0, .75, 0], .04, '#4a4a4a'); bx(g, 0, .75, 0, .9, .5, .45, '#3a3a3a'); for (const s of [-1, 1]) cylIn(g, s * .2, 1.0, 0, .19, .44, '#f2f2f2'); addCol(x - .1, z - .1, x + .1, z + .1); };
    const pasto = (x0, x1, col = '#6f8f45') => flat.rect(x0, -238, x1, -236.3, .205, col);   // franja junto al cordón
    const arbol = (x, s = .9) => addTree(x, -237.3, s, false);
    const rectL = (Wd, lx0, lz0, lx1, lz1, y, col) => { const [ax, az] = Wd(lx0, lz0), [bx2, bz] = Wd(lx1, lz1); flat.rect(Math.min(ax, bx2), Math.min(az, bz), Math.max(ax, bx2), Math.max(az, bz), y, col); };
    const tex = (draw, w = 128, h = 128) => { const c = document.createElement('canvas'); c.width = w; c.height = h; draw(c.getContext('2d'), w, h); const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; t.wrapS = t.wrapT = THREE.RepeatWrapping; return t; };
    const latTex = tex((x, w, h) => { x.strokeStyle = '#f4f4f0'; x.lineWidth = 7; x.beginPath(); x.moveTo(0, 0); x.lineTo(w, h); x.moveTo(w, 0); x.lineTo(0, h); x.stroke(); }, 64, 64);
    const speckTex = tex((x, w, h) => { x.fillStyle = '#efeee9'; x.fillRect(0, 0, w, h); for (let k = 0; k < 260; k++){ x.fillStyle = pick(['#b9b6ad', '#9c998f', '#c9c6bd']); x.beginPath(); x.arc(R(0, w), R(0, h), R(.8, 2.4), 0, 7); x.fill(); } });
    const lattice = (g, a, b, y, h, z) => { const t = latTex.clone(); t.needsUpdate = true; t.repeat.set((b - a) / .3, h / .3);
      const p = new THREE.Mesh(new THREE.PlaneGeometry(b - a, h), new THREE.MeshLambertMaterial({ map: t, transparent: true, alphaTest: .5, side: THREE.DoubleSide })); p.position.set((a + b) / 2, y + h / 2, z); g.add(p); };

    // 1) casa blanca con guarda gris arriba, zócalo rojo, jardín con canteros de ladrillo rojo y cochera con puertas de vidrio
    { const { g, w, cx, Wd } = casa(33.5, 46.5), F = 2.8, H = 3.2;   // w = 13
      body(g, -w / 2, 5.1, F, 14, H, WH);
      bx(g, -.7, H - .5, -F + .15, 11.6, .5, .3, '#5b5d5f');                                  // guarda gris
      bx(g, -w / 2 + .5, H, -F - .6, 1.0, .5, 1.2, WH);                                       // tanque/murete arriba a la izquierda
      bx(g, -3.6, 0, -F + .03, 5.8, .45, .06, RED); bx(g, 1.1, 0, -F + .03, 1.6, .45, .06, RED);   // zócalo
      ventana(g, -4.3, .9, -F, 2.0, 1.2); ventana(g, -1.75, 1.0, -F, 1.3, 1.1); ventana(g, 1.15, 1.0, -F, 1.2, 1.1);
      puerta(g, -.2, -F, .95, 2.15, '#c99a72');
      bx(g, 3.3, 0, -F + .03, 2.7, 2.45, .05, '#d6dde0'); for (const x of [2.0, 2.65, 3.3, 3.95, 4.6]) bx(g, x, 0, -F + .07, .05, 2.45, .04, '#a9b0b3');   // cochera
      bx(g, 5.8, 0, -F, 1.4, 2.3, .25, WH); bx(g, 5.8, 0, -F + .14, 1.4, .45, .04, RED);       // muro blanco con zócalo rojo hacia el tapial
      // canteros: murete rojo con tierra y plantas (agave, arbustos), caminito al frente de la puerta
      bx(g, -3.575, 0, -.25, 5.65, .45, .2, RED); bx(g, 1.1, 0, -.25, 1.5, .45, .2, RED);
      for (const x of [-.75, .35, 1.85]) bx(g, x, 0, -1.5, .2, .45, 2.5, RED);
      bx(g, -3.575, 0, -1.525, 5.45, .38, 2.35, '#5e4a36'); bx(g, 1.1, 0, -1.525, 1.3, .38, 2.35, '#5e4a36');
      rectL(Wd, -.65, 0, .25, -F, .06, '#c98f78'); rectL(Wd, 1.95, 0, 4.7, -F, .06, '#c98f78');
      for (const [lx, lz, s] of [[-5.6, -1.6, .7], [-4.4, -2.1, .6], [-2.8, -1.4, .9], [-1.5, -2.0, .7], [1.1, -1.6, .8]]){ const [x, z] = Wd(lx, lz); addBush(x, z, s, .38); }
      { const [x, z] = Wd(.95, -1.3); for (let k = 0; k < 10; k++){ const a = k / 10 * Math.PI * 2; trims.add(x + Math.cos(a) * .35, .5, z + Math.sin(a) * .35, .9, .05, .14, -a, '#7f9a6a'); } }   // agave
      pasto(33.5, 46.5); cesto(...Wd(-.6, 3.2)); arbol(cx - .9, .75);
    }
    // 2) casa retirada con cerco bajo de celosía blanca (pilares y portoncito), cica y plantas
    { const { g, w, cx, Wd } = casa(46.5, 56.5), F = 4.8, H = 3.1;   // w = 10
      body(g, -3.6, w / 2, F, 14, H, WH);
      bx(g, 3.2, 0, -F - 4, 3.6, 3.8, 8, '#efede7');                                          // volumen más alto a la derecha
      bx(g, .7, H, -F + .05, 8.6, .15, .3, '#e2dfd8');
      bx(g, .7, 0, -F + .02, 1.6, 2.5, .05, '#d2cec6'); puerta(g, .7, -F + .03, .85, 2.05, '#e9e6df');
      bx(g, -1.3, 2.5, -F + .6, 3.6, .15, 1.2, '#7c7f82');                                     // alerito gris de la entrada
      ventana(g, -2.4, 1.0, -F, 1.2, 1.1); ventana(g, 3.3, 1.0, -F, 1.2, 1.2);
      bx(g, 0, 0, -.15, w, .45, .22, '#f2f0ea');
      const posts = [-w / 2 + .15, -2.4, 0, 1.0, 2.6, w / 2 - .15];
      for (const x of posts) bx(g, x, 0, -.15, .3, 1.35, .3, '#f2f0ea');
      for (let i = 0; i < posts.length - 1; i++) lattice(g, posts[i] + .15, posts[i + 1] - .15, i === 2 ? .05 : .45, i === 2 ? 1.2 : .8, -.15);   // el del medio es el portoncito
      colLocal(g, -w / 2, -.3, 0, 0, null); colLocal(g, 1.0, -.3, w / 2, 0, null);
      rectL(Wd, -w / 2, -.3, w / 2, -F, .05, '#6a8a40'); rectL(Wd, .1, -.3, 1.2, -F, .06, '#c9b8a6');
      { const [x, z] = Wd(-3.9, -2.0); trunks.add(x, 0, z, .6, .5, .6, 0, '#6b5a40'); for (let k = 0; k < 12; k++){ const a = k / 12 * Math.PI * 2; trims.add(x + Math.cos(a) * .75, .45 + (k % 2) * .12, z + Math.sin(a) * .75, 1.7, .06, .26, -a, '#3d6a2c'); } }   // cica
      for (const [lx, lz, s] of [[-1.6, -1.0, .8], [2.0, -1.0, .9], [3.9, -1.1, .8], [-.5, -4.0, .6], [2.2, -4.1, .6]]){ const [x, z] = Wd(lx, lz); addBush(x, z, s, .05); }
      pasto(46.5, 56.5); arbol(cx + 4.2, .85); arbol(cx - 4.6, .8);
    }
    // 3) casona antigua sobre la línea: cornisa y parapeto, dos puertas de madera, ventana con reja trabajada; portón de reja blanca con pared gris azulada
    { const { g, w, cx } = casa(56.5, 68.5), H = 4.6;   // w = 12
      body(g, -w / 2, 3.5, 0, 14, H, '#f4f3ef');
      bx(g, -1.25, 3.85, .08, 9.5, .2, .18, '#e6e3dc'); bx(g, -1.25, H, -.1, 9.5, .55, .2, '#f4f3ef'); bx(g, -1.25, H + .55, -.05, 9.6, .12, .3, '#e6e3dc');
      for (const x of [-w / 2 + .2, 3.3]) bx(g, x, 0, .05, .4, H, .1, '#eeece6');
      bx(g, -1.25, 0, .04, 9.5, .35, .06, '#dedad2');
      ventana(g, -4.9, .9, 0, 1.3, 1.4); moldura(g, -4.9, 2.5, 1.3);
      puerta(g, -3.2, 0, 1.0, 2.55, '#b8643a'); moldura(g, -3.2, 2.85, 1.0);
      bx(g, -1.5, 1.7, .05, .45, .45, .06, '#d9d6cf');                                         // plaquita
      ventana(g, .4, .9, 0, 1.15, 1.4, '#7a4a30'); moldura(g, .4, 2.5, 1.15);
      puerta(g, 2.3, 0, 1.0, 2.6, '#b06a3c'); moldura(g, 2.3, 2.9, 1.0);
      body(g, 3.5, w / 2, 1.2, 14, 3.0, '#6f7f8f');                                            // pared gris azulada retirada
      for (const x of [3.65, 5.85]) bx(g, x, 0, -.05, .3, 2.2, .3, WH);
      rejaV(g, 4.75, 0, -.05, 1.9, 1.9, '#f4f4f2', .12); colLocal(g, 3.5, -.2, w / 2, .1, null);
      pasto(56.5, 68.5, '#a08a68'); arbol(cx + 4.5, 1.0); arbol(cx + 1.2, .9); arbol(cx - 3.2, 1.0);
    }
    // 4) Kiosco de la Eli: a la derecha la fachada salpicada con ventanal de reja blanca y chimenea; a la izquierda la galería
    //    con alero de tejas, toldo verde festoneado, rejita blanca y la ventana del kiosco al fondo
    { const { g, w, cx, Wd } = casa(68.5, 77.5);   // w = 9
      body(g, 1, w / 2, 0, 13, 3.5, '#ecebe6');
      { const t = speckTex.clone(); t.needsUpdate = true; t.repeat.set(3.5 / 1.5, 3.5 / 1.5); const p = new THREE.Mesh(new THREE.PlaneGeometry(3.5, 3.5), lam({ map: t })); p.position.set(2.75, 1.75, .012); g.add(p); }
      ventana(g, 2.75, .95, 0, 2.3, 1.15); bx(g, 2.75, 2.25, .05, 2.6, .12, .1, '#d9d6cf');
      bx(g, 3.7, 3.5, -1.5, .5, .9, .5, '#ecebe6');                                            // chimenea
      body(g, -w / 2, 1, 2.2, 13, 3.4, '#f1efea');
      bx(g, -1.75, 3.0, -2.15, 5.5, .6, .25, '#ecebe6');
      boxIn(g, -1.75, 2.85, -1.0, 5.6, .14, 2.6, '#b5583a', -.22);                              // alero de tejas
      for (let k = 0; k < 14; k++) boxIn(g, -4.4 + k * .4, 2.93, -1.0, .07, .1, 2.6, '#9e4a30', -.22);
      for (const x of [-4.35, .85]) bx(g, x, 0, -.05, .3, 2.6, .3, WH);
      boxIn(g, -1.75, 2.35, .35, 5.0, .06, .9, '#3fa07a', -.5);                                 // toldo verde
      for (let k = 0; k < 14; k++) bx(g, -4.1 + k * .36, 1.95, .76, .32, .18, .03, '#3fa07a');  // festón
      rejaV(g, -2.4, 0, -.1, 3.6, 1.0); colLocal(g, -4.2, -.2, -.6, 0, null);                   // rejita blanca (el hueco es la entrada)
      ventana(g, -2.6, 1.0, -2.2, 2.4, 1.2); puerta(g, -.2, -2.2, .9, 2.1, '#5a4a3a');
      rectL(Wd, -w / 2, 0, 1, -2.2, .06, '#c98f78');
      mapLabels.push([cx, ZL + 5, 'Kiosco de la Eli']);
      pasto(68.5, 77.5); arbol(cx + 1.5, 1.0); cesto(...Wd(2.2, 3.2));
    }
    // 5) cochera alta blanca: banda de rejilla arriba, portón blanco con tres ventanitas enrejadas
    { const { g, w } = casa(77.5, 82.5), H = 4.6;   // w = 5
      body(g, -w / 2, w / 2, 0, 12, H, WH);
      bx(g, 0, H, -.3, w + .3, .12, 1.2, '#c9c9c4');
      bx(g, 0, 3.75, .03, w - .5, .6, .04, '#3a3d40'); rejaV(g, 0, 3.75, .08, w - .5, .6, '#e9e9e6', .25);
      bx(g, 0, 0, .03, w - .6, 3.4, .03, '#eeede8');
      for (const x of [-1.7, -.2, 1.6]) ventana(g, x, 1.2, 0, .5, 1.6);
    }
    // 6) casa baja de la esquina (Entre Ríos): puerta verde grisácea, ventana enrejada, guarda gris y galería con portón de reja
    { const { g, w, cx } = casa(82.5, 89.5), H = 3.0;   // w = 7
      body(g, -1.2, w / 2, 0, 12, H, WH);
      body(g, -w / 2, -1.2, .9, 12, H, '#efede8');
      bx(g, 1.9, H - .55, .06, 3.2, .55, .12, '#6b6d6f'); bx(g, -.45, H, -.1, 1.5, .4, .2, WH);
      puerta(g, 2.6, 0, .85, 2.05, '#8d9470'); bx(g, 1.6, 1.3, .05, .3, .35, .12, '#d0d0cc');
      ventana(g, -.3, 1.0, 0, 1.0, 1.3);
      for (const x of [-3.3, -1.35]) bx(g, x, 0, -.15, .25, 2.4, .25, WH);
      rejaV(g, -2.35, 0, -.15, 1.65, 2.2, '#3a3a3a', .12); bx(g, -2.35, 2.3, -.45, 2.3, .15, .9, '#d9d6cf');
      colLocal(g, -w / 2, -.3, -1.2, 0, null);
      pasto(82.5, 89.5); arbol(cx + 3, .9);
    }

    // ===== Entre Ríos (lado oeste), de la esquina de San Luis hacia Jujuy — fotos del usuario, en orden, todas pegadas =====
    const XE = 89.5;
    // local: frente en z = 0 sobre la línea de Entre Ríos, +z = hacia la calle, +x = hacia San Luis (= la derecha en las fotos)
    const casaE = (z0, z1) => { const zc = (z0 + z1) / 2; return { g: group(XE, zc, Math.PI / 2), w: z1 - z0, zc, Wd: (lx, lz) => [XE + lz, zc - lx] }; };
    const pastoE = (zc, lx0, lx1, col = '#6f8f45') => flat.rect(91.7, zc - lx1, 93, zc - lx0, .205, col);   // franja de pasto junto al cordón
    const arbolE = (zc, lx, s = .9, cols) => addTree(92.3, zc - lx, s, false, cols);
    const IR = '#232323', STONE = '#b48a64', BRK = '#a9573c';
    const portonBarras = (g, x, w, h) => { bx(g, x, 0, .04, w, h, .06, '#f4f4f2'); const n = Math.max(3, Math.round(w / .26)); for (const [y0, hh] of [[.25, h * .36], [h * .56, h * .36]]) for (let k = 0; k < n; k++) bx(g, x - w / 2 + (k + .5) * w / n, y0, .075, .09, hh, .02, '#3a2e28'); };
    const persiana = (g, x, y0, z, w, h) => { bx(g, x, y0 - .07, z + .02, w + .2, h + .14, .06, '#e6e3dc'); bx(g, x, y0, z + .05, w, h, .04, '#ece8dc'); for (let y = y0 + .1; y < y0 + h - .05; y += .12) bx(g, x, y, z + .075, w, .025, .01, '#cfcabd'); };
    const tanque = (g, x, y, z, col = '#2f7ad1') => { cylIn(g, x, y + .55, z, .55, 1.1, col); cylIn(g, x, y + 1.15, z, .3, .15, col); };

    // 0) costado de la casa de la esquina sobre Entre Ríos: galería con rejas de lanzas junto a la esquina, ventana y puerta con reja, ventana de rombos
    { const { g, zc } = casaE(-234.5, -222.5);
      bx(g, 0, 0, .02, 12, .4, .04, '#b9b6ad');
      for (const x of [2.3, 4.7]) bx(g, x, 0, .03, 1.6, 2.3, .04, '#5a4030');                  // persianas de madera atrás de la reja
      rejaV(g, 3.5, 0, .28, 4.6, 2.3, IR, .13); for (const x of [1.2, 3.5, 5.8]) bx(g, x, 0, .28, .12, 2.5, .12, IR);
      colLocal(g, 1.1, 0, 5.9, .4, null);
      ventana(g, -1.9, .9, 0, 1.2, 1.5, IR); puerta(g, -.5, 0, .9, 2.2, '#4a4038'); rejaV(g, -.5, 0, .12, .9, 2.2, IR, .12);
      ventana(g, -3.7, 1.0, 0, 1.3, 1.1, IR);
      bx(g, -1, 2.95, -.05, 12, .35, .2, '#cfcac0');
      tanque(g, -3.2, 3.0, -2.5, '#8d8a82');
      pastoE(zc, -6, 6); arbolE(zc, 2.6, .9); arbolE(zc, -2.8, .8);
      // cartel de calle en la esquina
      { const sg = group(92.6, -237.4); poleIn(sg, [0, 0, 0], [0, 3.1, 0], .05, '#2a3b6b');
        for (const s of [-1, 1]) signIn(sg, 'Entre Ríos  800 · 900', s * .03, 2.75, 0, 1.3, .32, '#1f3a8a', '#ffffff', s * Math.PI / 2);
        addCol(92.5, -237.5, 92.7, -237.3); }
    }
    // 1) casa gris con dos portones blancos de barrotes
    { const { g, w, zc } = casaE(-222.5, -215.5);
      body(g, -w / 2, w / 2, 0, 12, 3.2, '#d8d4cc'); bx(g, 0, 3.2, -.1, w, .25, .3, '#c9c5bc');
      portonBarras(g, 1.9, 2.4, 2.4); portonBarras(g, -2.2, 2.2, 2.4);
      pastoE(zc, -.9, .5); arbolE(zc, -.2, .85);
    }
    // 2) portón doble de chapa roja bajo un tinglado
    { const { g, w } = casaE(-215.5, -212.5);
      body(g, -w / 2, w / 2, 1.2, 12, 3.4, '#cfcac0');
      bx(g, 0, 0, .03, 2.8, 2.4, .06, '#9a4a32'); for (const x of [-.7, 0, .7]) bx(g, x, 0, .07, .04, 2.4, .02, '#7a3a26');
      bx(g, 0, 2.4, .0, 2.8, .8, .05, '#3a3633'); boxIn(g, 0, 3.35, -.4, 3.2, .06, 1.8, '#a9adb0', -.1);
      for (const x of [-1.45, 1.45]) bx(g, x, 0, -.05, .15, 3.2, .15, '#cfcac0');
      colLocal(g, -w / 2, -1.2, w / 2, 0, null);
    }
    // 3) casa blanca con ventanita enrejada y galería oscura con rejas
    { const { g, w, zc } = casaE(-212.5, -207);
      body(g, -.3, w / 2, 0, 12, 3.3, WH); body(g, -w / 2, -.3, 2.2, 12, 3.0, '#d9d6cf');
      bx(g, -1.55, 2.6, -1.1, 2.5, .12, 2.2, '#bdb8ad'); rejaV(g, -1.55, 0, -.1, 2.3, 2.4, IR, .12); colLocal(g, -w / 2, -.2, -.3, 0, null);
      ventana(g, 1.3, 1.4, 0, 1.0, .7, IR); bx(g, .3, 1.2, .05, .4, .35, .1, '#e9e9e6');
      bx(g, 1.2, 3.3, -.1, 3.1, .22, .25, '#e6e3dc');
      arbolE(zc, -.6, .9);
    }
    // 4) cerco de chapa verde con pilares de ladrillo; atrás una construcción vieja gris con cica y palmera
    { const { g, w, zc, Wd } = casaE(-207, -199);
      bx(g, -2.7, 0, -.1, .4, 2.3, .4, BRK); bx(g, .85, 0, -.1, .3, 2.1, .3, BRK);
      bx(g, -3.4, 0, -.1, 1.2, 2.1, .06, '#2f4f45');
      bx(g, -.85, 0, -.1, 3.1, .7, .25, BRK); bx(g, -.85, .7, -.1, 3.1, 1.4, .06, '#3e6b5c');
      bx(g, 2.45, 0, -.1, 2.9, 2.1, .06, '#3e6b5c'); for (const x of [1.4, 2.45, 3.5]) bx(g, x, 0, -.06, .04, 2.1, .02, '#2f5a4c');
      colLocal(g, -w / 2, -.25, w / 2, 0, null);
      rectL(Wd, -w / 2, -.2, 1.5, -6, .05, '#8a8a6a');
      body(g, -w / 2, 1.5, 6, 13, 4.6, '#8d8a82'); body(g, 1.5, w / 2, 3.5, 13, 5.2, '#9a968c');
      { const [x, z] = Wd(-2.2, -3); trunks.add(x, 0, z, .5, .6, .5, 0, '#6b5a40'); for (let k = 0; k < 12; k++){ const a = k / 12 * Math.PI * 2; trims.add(x + Math.cos(a) * .7, .6 + (k % 2) * .12, z + Math.sin(a) * .7, 1.6, .06, .25, -a, '#3d6a2c'); } }
      addPalm(...Wd(-.4, -4.6), .55);
      { const [x, z] = Wd(1.0, 1.9); poles.add(x, 0, z, .05, 1.9, .05, 0, '#2f6b3e'); trims.add(x, 1.9, z, .05, .05, 1.0, 0, '#2f6b3e'); }   // poste del tender
      pastoE(zc, -w / 2, -1);
    }
    // 5) casa naranja con borde de tejas, ventana enrejada y galería con rejas, macetas; tramo blanco con aire acondicionado; tanque azul en torre
    { const { g, w, zc } = casaE(-199, -191), ORG = '#d9774a';
      body(g, -w / 2, -.9, 0, 12, 3.2, ORG); body(g, 2.6, 2.9, 0, 12, 3.2, ORG); body(g, -.9, 2.6, 1.6, 12, 3.2, '#f0e6d0');
      body(g, 2.9, w / 2, 0, 12, 3.5, WH);
      bx(g, .85, 2.6, -.05, 3.5, .6, .2, ORG);
      boxIn(g, -.55, 3.25, .12, 7, .12, .55, '#b5583a', -.3);                                    // borde de tejas
      ventana(g, -2.7, .9, 0, 1.5, 1.2);
      rejaV(g, .85, 0, -.1, 3.4, 2.5, '#e6e6e6', .12); colLocal(g, -.9, -.2, 2.6, 0, null);
      puerta(g, -.4, -1.6, .9, 2.1, '#3a3632'); bx(g, 1.6, 1.0, -1.55, 1, 1.2, .06, '#8a4a32');
      for (const x of [.2, .9, 1.5, 2.1]) { cylIn(g, x, .17, -.6, .16, .34, '#b5583a'); cylIn(g, x, .5, -.6, .22, .35, '#4c7a30'); }
      bx(g, 2.75, 1.9, .05, .2, .25, .05, '#e9e9e6');                                            // numerito
      bx(g, 3.45, 2.2, .1, .6, .45, .25, '#e9e9e6');                                             // aire acondicionado
      for (const [dx, dz] of [[-.5, -.5], [.5, -.5], [-.5, .5], [.5, .5]]) poleIn(g, [3.2 + dx, 0, -5 + dz], [3.2 + dx * .6, 4.6, -5 + dz * .6], .04, '#9aa0a6');
      tanque(g, 3.2, 4.6, -5);
      pastoE(zc, -w / 2, 3); arbolE(zc, .6, .7);
    }
    // 6) casa con portón de cochera de chapa marrón violácea y tanque azul en el techo
    { const { g, w } = casaE(-191, -187);
      body(g, -w / 2, w / 2, 0, 12, 3.6, '#ece6d6'); bx(g, 0, 3.6, -.1, w, .3, .25, '#cfc9bd');
      bx(g, 0, 0, .03, 2.7, 2.6, .06, '#8b7a80'); for (const y of [.65, 1.3, 1.95]) bx(g, 0, y, .07, 2.7, .03, .02, '#6f6066');
      bx(g, 0, 2.6, .05, 3.0, .15, .1, '#d9d2c0');
      tanque(g, 1.2, 3.6, -2.5);
    }
    // 7) casa con muro bajo y pilar de piedra laja con chimenea, galería, ventanas con persiana y tramo blanco con rejita baja
    { const { g, w, zc, Wd } = casaE(-187, -178.5), ST2 = '#b07a5a';
      body(g, -w / 2, 1.3, 2.4, 12, 3.0, '#ece4cc'); body(g, 1.3, w / 2, 1.5, 12, 3.2, WH);
      bx(g, -2.5, 0, -.15, 2.6, .75, .35, STONE); bx(g, .45, 0, -.15, 1.7, .75, .35, STONE);
      for (const x of [-3.9, -1.2, -.4, 1.25]) bx(g, x, 0, -.15, .4, .95, .4, STONE);
      bx(g, -.8, 0, -.15, .75, .9, .04, IR);                                                     // portoncito
      colLocal(g, -w / 2, -.35, -1.2, 0, null); colLocal(g, -.4, -.35, 1.3, 0, null);
      bx(g, -1.4, 0, -1.2, .6, 3.0, .6, ST2); bx(g, -1.4, 3.0, -1.2, .6, 1.1, .6, ST2);          // pilar de piedra con chimenea
      bx(g, -.6, 2.85, -1.2, 3.6, .15, 2.6, '#d9d2c0');
      persiana(g, -2.8, .9, -2.4, 1.5, 1.3); puerta(g, -.8, -2.4, .9, 2.1, '#7f7f7f'); persiana(g, .4, .9, -2.4, 1.0, 1.2);
      ventana(g, 2.4, 1.3, -1.5, .8, .8, IR); rejaV(g, 2.75, 0, -.1, 2.9, .9, IR, .12); colLocal(g, 1.3, -.2, w / 2, 0, null);
      rectL(Wd, -w / 2, -.35, 1.3, -2.4, .06, '#c9b8a6');
      for (const [lx, lz, s] of [[-3.3, -.9, .85], [-2.0, -.9, .8], [.6, -.9, .8]]){ const [x, z] = Wd(lx, lz); addBush(x, z, s, 0); }
      pastoE(zc, -w / 2, -1.3); pastoE(zc, -.3, 1.6); arbolE(zc, .3, .95);
    }
    // 8) casa blanca con zócalo de laja, dos ventanas con persiana y puerta con escalón; galería con rejas a la izquierda;
    //    portón de reja negro a la derecha con patio de baldosas; pino atrás
    { const { g, w, zc, Wd } = casaE(-178.5, -167);
      body(g, -3.8, 2.6, 0, 13, 3.3, WH);
      bx(g, -.6, 0, .03, 6.4, .55, .06, STONE); bx(g, -.6, 3.1, .06, 6.4, .18, .14, '#e6e3dc');
      persiana(g, -2.4, .9, 0, 1.4, 1.3); persiana(g, 1.3, .9, 0, 1.4, 1.3);
      puerta(g, -.5, 0, .9, 2.4, '#d9d6cf'); rejaV(g, -.5, .3, .12, .7, 1.9, IR, .1); bx(g, -.5, 0, .3, 1.3, .18, .5, STONE);
      body(g, -w / 2, -3.8, 2.5, 13, 3.1, '#efede8'); bx(g, -4.78, 2.6, -1.2, 1.9, .12, 2.4, '#d9d6cf');
      rejaV(g, -4.78, 0, -.1, 1.9, 2.3, IR, .12); colLocal(g, -w / 2, -.2, -3.8, 0, null);
      for (const x of [2.7, 5.65]) bx(g, x, 0, -.1, .2, 2.4, .2, IR);
      rejaV(g, 4.18, 0, -.1, 2.8, 2.2, IR, .12); colLocal(g, 2.6, -.2, w / 2, 0, null);
      rectL(Wd, 2.6, -.1, w / 2, -6, .06, '#c98f78'); body(g, 2.6, w / 2, 6, 13, 3.2, '#ece6d6');
      addTree(...Wd(-2, -14.5), 1.6, false, ['#2c4a26', '#34552b', '#2f5a24']);
      pastoE(zc, -w / 2, -1); pastoE(zc, 0, 2.6); arbolE(zc, -3.3, .9); arbolE(zc, 1.4, 1.0);
    }
    // 9) última antes de la ochava de Jujuy: edificio alto blanco con bandas de ladrillo rojo, ventana con persiana de enrollar
    //    enmarcada en ladrillo, antena en el techo; a la derecha un tapial blanco largo
    { const { g, w, zc } = casaE(-167, -153);
      body(g, -w / 2, 1.5, 0, 12, 5.8, WH);
      bx(g, -2.75, 0, .04, 8.5, .6, .06, BRK); bx(g, -6.4, 0, .05, 1.2, 1.0, .1, BRK);
      bx(g, -2.75, 2.95, .06, 8.6, .25, .12, BRK); bx(g, -2.75, 5.5, .06, 8.6, .35, .14, BRK);
      bx(g, -2.6, 3.6, .04, 2.0, .45, .04, '#3b4a55');
      bx(g, .2, .85, .03, 1.75, 1.6, .06, BRK); bx(g, .2, 1.0, .07, 1.4, 1.3, .04, '#e6e0d0');
      for (let y = 1.05; y < 2.25; y += .1) bx(g, .2, y, .09, 1.4, .02, .01, '#cfc8b6');           // persiana de enrollar
      poleIn(g, [-3, 5.8, -5], [-3, 14, -5], .06, '#c0c0c0'); for (let y = 8; y < 14; y += 1.5) poleIn(g, [-3.8, y, -5], [-2.2, y, -5], .02, '#c0c0c0');
      bx(g, 4.25, 0, 0, 5.5, 2.7, .3, '#efede7'); bx(g, 6.4, 0, .18, 1.0, 2.2, .05, '#e6e3dc'); colLocal(g, 1.5, -.3, w / 2, 0, null);
      body(g, 1.5, w / 2, 4, 12, 3.0, '#ece9e2');
      flat.rect(91.7, zc - w / 2, 93, zc + w / 2, .205, '#8f7a5a');
      for (const lx of [-5.3, 1.1, 6.0]) arbolE(zc, lx, 1.05, ['#4b7a30', '#557f35', '#3f6b2a']);
    }

    // ===== Jujuy (lado sur), del galpón de la esquina de Av. Centenario hacia Entre Ríos — fotos del usuario =====
    const ZJ = -153;
    // local: frente en z = 0 sobre la línea de Jujuy, +z = hacia la calle, +x = hacia Entre Ríos (= la derecha en las fotos)
    const casaJ = (x0, x1) => { const cx = (x0 + x1) / 2; return { g: group(cx, ZJ, 0), w: x1 - x0, cx, Wd: (lx, lz) => [cx + lx, ZJ + lz] }; };
    const pastoJ = (cx, lx0, lx1, col = '#6f8f45') => flat.rect(cx + lx0, -150.8, cx + lx1, -149.5, .205, col);
    const arbolJ = (cx, lx, s = .9, cols) => addTree(cx + lx, -150.1, s, false, cols);
    const VERDE = ['#4b7a30', '#557f35', '#3f6b2a', '#5e8a3a'];
    const chapa = (g, x, w, h, col, rib) => { bx(g, x, 0, 0, w, h, .06, col); for (let k = 1; k < Math.round(w / .25); k++) bx(g, x - w / 2 + k * .25, 0, .04, .04, h, .02, rib); bx(g, x, h - .06, .04, w, .06, .03, rib); };
    // lateral del galpón: pasto sin vereda y dos árboles pelados
    flat.rect(13.6, -153, 46.6, -149.5, .205, '#6f8f45'); addTree(23, -150.6, .85, false); addTree(40.5, -150.6, .8, false);
    // 1) cerco de chapa gris con grafiti "AGUANTE MILEI", detrás un edificio alto de ladrillo con tanque de hormigón
    { const { g, w, cx } = casaJ(46.6, 53);
      chapa(g, -1.6, 3.1, 2.3, '#9a9ea2', '#868a8e'); chapa(g, 1.6, 3.1, 2.3, '#9a9ea2', '#868a8e'); bx(g, 0, 0, 0, .12, 2.4, .12, '#7a7e82');
      signIn(g, 'AGUANTE', -1.6, 1.6, .05, 2.6, .5, '#9a9ea2', '#c0392b'); signIn(g, 'MILEI', -1.5, 1.05, .05, 1.8, .5, '#9a9ea2', '#c0392b');
      signIn(g, 'AGUA', 1.9, 1.65, .05, 1.3, .42, '#9a9ea2', '#c0392b');
      colLocal(g, -w / 2, -.1, w / 2, .1, null);
      body(g, -w / 2, 1.0, 1.5, 13, 5.5, '#9a5a40'); cylIn(g, -.6, 6.3, -3, .6, 1.6, '#a8a49a');
      pastoJ(cx, -w / 2, w / 2);
      for (const lx of [-2.6, -1.6]){ const [x, z] = [cx + lx, -150.6]; addBush(x, z, .6, 0); }
    }
    // 2) portón y cerco de chapa verde; poste naranja con cesto azul
    { const { g, w, cx } = casaJ(53, 57.5);
      chapa(g, 0, w, 2.3, '#2f7a55', '#256446'); colLocal(g, -w / 2, -.1, w / 2, .1, null);
      body(g, -w / 2, w / 2, 6, 13, 3.0, '#d9d6cf');
      { const x = cx - w / 2 - .2, z = -149.9; poles.add(x, 0, z, .13, 6.5, .13, 0, '#d9622b'); trims.add(x, 0, z, .5, .2, .5, 0, '#b9b4a8');
        const cg = group(x, z); cylIn(cg, 0, 1.35, .3, .22, .45, '#2f6fb5'); cylIn(cg, 0, 1.62, .3, .18, .12, '#f2f2f2'); addCol(x - .15, z - .15, x + .15, z + .15); }
    }
    // 3) casita blanca con puerta verde sobre la línea y casa retirada con frente de piedra laja y ventanas enrejadas
    { const { g, w, cx } = casaJ(57.5, 65.5);
      body(g, -w / 2, -2.2, 0, 6, 2.6, '#e6e3dc'); puerta(g, -3.1, 0, .8, 2.0, '#2f7a55');
      body(g, -2.2, w / 2, 1.3, 12, 3.2, '#d9d6cf');
      bx(g, .9, .8, -1.27, 6.2, 2.4, .04, '#9a8a78');
      for (let k = 0; k < 26; k++) bx(g, -2 + rnd() * 5.8, .9 + rnd() * 2.1, -1.24, R(.3, .7), R(.2, .45), .02, pick(['#8a7a68', '#a8998a', '#7f705f']));   // lajas
      ventana(g, -.7, 1.2, -1.3, 1.5, 1.0, IR); ventana(g, 2.4, 1.2, -1.3, 1.2, 1.0, IR);
      bx(g, .9, 0, -.1, 6.2, .6, .25, '#ece9e2'); colLocal(g, -2.2, -.25, w / 2, 0, null);
      cylIn(g, -1.2, 3.8, -4, .5, 1.2, '#a8a49a');
      pastoJ(cx, -1.5, 2); arbolJ(cx, .4, .8);
    }
    // 4) tapial blanco manchado con portón de chapa gris; atrás una construcción vieja; poste de luz
    { const { g, w, cx } = casaJ(65.5, 75);
      bx(g, -3.1, 0, 0, 3.3, 2.2, .25, '#e9e6df'); bx(g, 3.1, 0, 0, 3.3, 2.3, .25, '#e9e6df');
      for (const x of [-1.3, 1.45]) bx(g, x, 0, 0, .35, 2.45, .35, '#e9e6df'); bx(g, -3.8, 0, .1, .3, 2.3, .1, '#e9e6df');
      chapa(g, .07, 2.4, 2.3, '#6f7479', '#5c6166');
      for (const [x, y, ww, hh] of [[-3.5, .3, 1.2, 1.0], [2.4, .6, 1.6, .9], [3.9, .2, .8, 1.4], [-2.2, 1.3, .8, .6]]) bx(g, x, y, .14, ww, hh, .02, '#cfcbc1');   // manchas
      colLocal(g, -w / 2, -.2, w / 2, .2, null);
      body(g, -3, 2.5, 3, 12, 4.2, '#d9d6cf');
      poles.add(cx - 2.4, 0, -149.9, .14, 8, .14, 0, '#8a7a66'); addCol(cx - 2.55, -150.05, cx - 2.25, -149.75);
      pastoJ(cx, -w / 2, -1.6); pastoJ(cx, 1.6, w / 2); arbolJ(cx, 3.3, .95, VERDE);
    }
    // 5) casa de ladrillo de la esquina de Entre Ríos: zócalo de ladrillo con rayado horizontal, puerta de madera, ventanas,
    //    portón doble de madera rojiza entre pilares, pilar de la esquina con placa blanca; muchos árboles verdes adelante
    { const { g, w, cx } = casaJ(75, 89.5), LR = '#c4683f', LO = '#b85a36';
      body(g, -w / 2, -4.75, 0, 10, 3.1, LR);
      bx(g, 0, 0, .02, w, 3.1, .04, LR); bx(g, 0, 2.95, .06, w, .2, .12, '#a9573c');
      bx(g, -2.1, 0, .05, 10.3, 1.25, .06, '#b5603a'); for (let y = .15; y < 1.2; y += .15) bx(g, -2.1, y, .085, 10.3, .03, .01, '#8f452a');
      persiana(g, -4.6, 1.55, .05, 1.5, .9); puerta(g, -2.6, .05, .9, 2.2, '#7a3524'); persiana(g, .9, 1.55, .05, 1.6, .9);
      for (const x of [3.2, 6.4]) bx(g, x, 0, .07, .5, 3.0, .2, LO);
      bx(g, 4.8, 0, .06, 2.7, 2.5, .06, '#8a3a2a'); for (const x of [4.15, 4.8, 5.45]) bx(g, x, 0, .1, .04, 2.5, .02, '#6f2d20');
      bx(g, 3.2, 1.5, .18, .4, .7, .04, '#e9e9e6'); bx(g, 6.95, 0, .05, .6, 3.2, .25, LO); bx(g, 6.95, 1.2, .19, .45, .6, .04, '#e9e9e6');
      flat.rect(cx - w / 2, -151, cx + w / 2, -149.5, .205, '#7d6a4f');
      for (const lx of [-5.6, -2.0, 1.6, 5.0]) arbolJ(cx, lx, 1.1, VERDE);
      addTree(cx - 6.5, ZJ - 12, 1.5, false, ['#2c4a26', '#34552b']);
    }
  }
  // ---- Heladería PEGHI (860) — casa baja antigua, pérgola verde abierta sobre la vereda, bancos rojos y cartel "PeGhi" ----
  {
    const L = lot(40.5, 51, .4, 16), g = L.g, GV = '#3e7a55';
    bx(g, 0, 0, -L.d / 2, L.w, 4, L.d, '#eeeae1');
    bx(g, 0, 3.2, .1, L.w + .2, .8, .3, '#d9d3c4'); bx(g, 0, 0, .06, L.w, .5, .08, '#d3cdbf');
    for (const x of [-3, 2.3]){ win(g, x, .9, 1.9, 1.9, '#eeeae1', '#c9cdd0'); reja(g, x, .9, 1.9, 1.9, '#a7adb1', .16); }
    bx(g, -.4, 0, .1, 1.4, 2.6, .07, '#8b8d8a'); reja(g, -.4, .1, 1.3, 2.4, '#b8bcbf', .2);
    bx(g, 4.5, .5, .1, .8, 2, .05, '#cfd3d6');
    bx(g, -.3, 3.9, .25, 4.2, 1.3, .1, '#f6f6f3'); signIn(g, 'PeGhi', -.3, 4.75, .32, 3.6, .75, '#f6f6f3', '#1f4fa8'); signIn(g, 'Helado artesanal', -.3, 4.2, .32, 3.2, .3, '#f6f6f3', '#1f4fa8');
    for (const x of [-2.4, 1.8]) poleIn(g, [x, 3.9, .25], [x, 3.5, .25], .03, GV);
    const PZ = 3.4;
    for (const x of [-L.w / 2 + .3, -2.1, 1.6, L.w / 2 - .3]) bx(g, x, 0, PZ, .1, 2.9, .1, GV);
    bx(g, 0, 2.85, PZ, L.w, .1, .1, GV); bx(g, 0, 2.85, .3, L.w, .1, .1, GV);
    for (let x = -L.w / 2 + .3; x <= L.w / 2; x += .9) bx(g, x, 2.95, PZ / 2 + .15, .06, .06, PZ, GV);
    for (const x of [-2.9, 2.2]){ bx(g, x, .42, 2.6, 3, .07, .45, '#c8322a'); bx(g, x, .72, 2.85, 3, .35, .05, '#c8322a'); for (const sx of [-1.3, 1.3]) bx(g, x + sx, 0, 2.6, .07, .42, .42, '#7a1f1a'); }
    // faroles en los extremos de la pérgola (sobre la vereda)
    lampPost(L.x - PZ, L.z0 + .3); lampPost(L.x - PZ, L.z1 - .3);
    done(L, '#eeeae1', 'Heladería PEGHI');
  }
  // ---- Sociedad Italiana (840) — art déco blanco de 2 pisos, retirado con patio de baldosas, ala con portón marrón ----
  {
    const L = lot(28, 37.5, 5, 33), g = L.g, WH = '#efebe2', MAD = '#6b4630';
    bx(g, 0, 0, -L.d / 2, L.w, 7.2, L.d, WH);
    bx(g, 0, 0, -5, 3.4, 9.4, 10, WH);                                       // cuerpo central más alto (adelante)
    for (const x of [-1.3, -.45, .45, 1.3]) bx(g, x, 2.9, .12, .16, 6.5, .2, '#f6f3ec');
    bx(g, 0, 9.4, -5, 3.6, .25, 10.2, '#e2ddd2'); bx(g, 0, 7.2, -L.d / 2, L.w + .2, .25, L.d + .2, '#e2ddd2');
    for (const x of [-2.6, 2.6]) bx(g, x, 5, .06, .8, 1.4, .06, '#3b4650');
    for (const x of [-3.9, 3.9]){ win(g, x, 4.6, 1.1, 1, '#e6e2d8', '#d6d2c8'); win(g, x, 1.3, 1.2, 1.2, '#e6e2d8', '#d6d2c8'); for (let y = 1.4; y < 2.4; y += .2) bx(g, x, y, .14, 1.2, .04, .03, '#cfcac0'); }
    bx(g, 0, 2.9, .9, 4, .15, 1.8, '#d9d4c9');
    bx(g, 0, 0, .08, 1.9, 2.8, .08, MAD); for (const x of [-.45, .45]) bx(g, x, 1, .14, .55, 1.3, .03, '#3a2a20');
    signIn(g, 'SOCIEDAD ITALIANA', 0, 8.1, .2, 3, .4, WH, '#5a5348');
    // ala baja hacia San Luis con portón de madera
    const W2 = lot(37.5, 40.5, 5, 16), g2 = W2.g;
    bx(g2, 0, 0, -W2.d / 2, W2.w, 4.2, W2.d, '#ebe7de'); bx(g2, 0, 0, .06, 2.6, 3.4, .08, MAD); for (let x = -1.2; x <= 1.2; x += .4) bx(g2, x, 0, .12, .04, 3.4, .03, '#563724');
    bx(g2, 0, 3.5, .5, W2.w, .12, 1, '#dcd7cc');
    colLocal(g2, -W2.w / 2, -W2.d, W2.w / 2, 0, '#ebe7de');
    lampPost(FX + 1.5, L.zc - 2.6); lampPost(FX + 1.5, L.zc + 2.6);
    done(L, WH, 'Soc. Italiana');
  }
  // ---- "Los Bolita" — local rojo contra la vereda, con la esquina curva del lado de la Sociedad Italiana ----
  {
    const L = lot(21.8, 28, 0, 15), g = L.g, RJ = '#d94b46';
    bx(g, .9, 0, -L.d / 2, L.w - 1.8, 4.4, L.d, RJ);
    const curve = new THREE.Mesh(new THREE.CylinderGeometry(1.8, 1.8, 4.4, 20, 1, false, Math.PI * 1.5, Math.PI / 2).translate(0, 2.2, 0), lam({ color: 0xd94b46 }));
    curve.position.set(-L.w / 2 + 1.8, 0, -1.8); g.add(curve); bx(g, -L.w / 2 + .9, 0, -L.d / 2 - .9, 1.8, 4.4, L.d - 1.8, RJ);
    const capa = new THREE.Mesh(new THREE.CylinderGeometry(2.05, 2.05, .3, 20, 1, false, Math.PI * 1.5, Math.PI / 2).translate(0, .15, 0), lam({ color: 0x55595d })); capa.position.set(-L.w / 2 + 1.8, 4.4, -1.8); g.add(capa);
    bx(g, .9, 4.4, -L.d / 2 + .1, L.w - 1.6, .3, L.d + .2, '#55595d');
    bx(g, .9, 2.75, .55, L.w - 1.4, .12, 1.1, '#55595d');
    bx(g, -.5, .5, .06, 1.6, 2.2, .06, '#f4f2ee'); reja(g, -.5, .5, 1.6, 2.2, '#ffffff', .18);
    bx(g, 1.3, 0, .08, 1, 2.6, .06, '#f4f2ee'); reja(g, 1.3, 0, 1, 2.6, '#e8e6e2', .22);
    bx(g, 2.55, .9, .06, .8, 1.6, .06, '#f4f2ee'); reja(g, 2.55, .9, .8, 1.6, '#ffffff', .18);
    signIn(g, '"LOS BOLITA"', .9, 3.55, .1, 2.6, .42, RJ, '#fff3c4');
    done(L, RJ, '"Los Bolita"');
  }
  // ---- Aberturas — angosto, retirado, blanco con franja azul abajo y cartel azul arriba ----
  {
    const L = lot(16.8, 21.8, 5, 10), g = L.g, AZ = '#1e5fb0';
    bx(g, 0, 0, -L.d / 2, L.w, 4.3, L.d, '#f4f4f1'); bx(g, 0, 0, .05, L.w, .7, .08, AZ); bx(g, 0, 4.1, .05, L.w, .25, .08, AZ);
    signIn(g, 'ABERTURAS', .3, 3.55, .12, 3.6, .55, '#f4f4f1', AZ);
    bx(g, -1.6, .1, .1, 1, 2.6, .06, '#f7f7f5'); reja(g, -1.6, .1, 1, 2.6, '#cfcfcf', .16);
    win(g, .6, 1.1, 1.6, 1.6); reja(g, .6, 1.1, 1.6, 1.6, '#e5e5e5', .14);
    bx(g, 1.95, .8, .2, .6, .9, .25, '#e9e9e6');
    done(L, '#f4f4f1', 'Aberturas');
  }
  // ---- Galpón de la esquina de Jujuy — retirado, portones blancos abajo, ladrillo hueco con estructura de hormigón arriba ----
  {
    const L = lot(0, 16.8, 5, 28), g = L.g, LAD = '#b8603f', HOR = '#d9d4ca';
    // muros de ladrillo hasta 6,2 m y techo de chapa a dos aguas CURVO (bóveda) a lo largo del fondo; frontón y contrafrente curvos
    const W2 = L.w / 2, HS = 6.2, HR = 2.6, yTop = x => HS + HR * (1 - (x / W2) ** 2);
    const arch = off => { const p = []; for (let k = 0; k <= 24; k++){ const x = -W2 + k * L.w / 24; p.push(new THREE.Vector2(x, yTop(x) + off)); } return p; };
    bx(g, 0, 0, -L.d / 2, L.w, HS, L.d, LAD);
    { const sh = new THREE.Shape(); sh.moveTo(-W2, 0); for (const p of arch(0)) sh.lineTo(p.x, p.y); sh.lineTo(W2, 0); sh.closePath();
      const geo = new THREE.ExtrudeGeometry(sh, { depth: .3, bevelEnabled: false });
      for (const z of [-.3, -L.d]){ const m = new THREE.Mesh(geo, lam({ color: LAD })); m.position.z = z; m.castShadow = m.receiveShadow = true; g.add(m); } }
    { const top = arch(.2), bot = arch(.02).reverse(), sh = new THREE.Shape();
      sh.moveTo(-W2 - .4, top[0].y - .1); for (const p of top) sh.lineTo(p.x, p.y); sh.lineTo(W2 + .4, top[0].y - .1); for (const p of bot) sh.lineTo(p.x, p.y); sh.closePath();
      const m = new THREE.Mesh(new THREE.ExtrudeGeometry(sh, { depth: L.d + .5, bevelEnabled: false }), lam({ color: '#a3a8ab', side: THREE.DoubleSide }));
      m.position.z = -L.d - .35; m.castShadow = m.receiveShadow = true; g.add(m); }
    bx(g, 0, 0, .02, L.w + .1, 3.2, .1, '#f2f1ec');                                              // abajo blanco solo en el frente
    for (const x of [-W2 + .15, -L.w / 6, L.w / 6, W2 - .15]) bx(g, x, 3.2, .08, .35, yTop(x) - 3.2, .2, HOR);
    bx(g, 0, 5.9, .08, L.w, .3, .2, HOR);
    { const p = arch(0); for (let k = 0; k < p.length - 1; k++){ const a = p[k], b = p[k + 1]; boxIn(g, (a.x + b.x) / 2, (a.y + b.y) / 2, .08, Math.hypot(b.x - a.x, b.y - a.y) + .05, .3, .22, HOR, 0, Math.atan2(b.y - a.y, b.x - a.x)); } }
    for (let y = 3.5; y < HS + HR - .2; y += .3){ const ww = y <= HS ? L.w : L.w * Math.sqrt(Math.max(0, 1 - (y - HS) / HR)); if (ww > .3) bx(g, 0, y, .03, ww - .1, .025, .03, '#a0533a'); }
    // lateral sobre Jujuy (local +x): pilastras de hormigón, viga con musgo, ventanales de hierro arriba, humedad abajo
    { const SX = W2 + .05, n = 8, step = (L.d - .6) / n;
      for (let k = 0; k <= n; k++) bx(g, SX, 0, -.3 - k * step, .14, HS, .3, HOR);
      bx(g, SX, 4.0, -L.d / 2, .16, .28, L.d, '#8f8f7a'); bx(g, SX, HS - .25, -L.d / 2, .16, .25, L.d, HOR);
      for (let k = 0; k < n; k++){ const z = -.3 - (k + .5) * step; if (k % 3 === 2) continue;
        bx(g, SX, 4.55, z, .08, 1.25, 2.2, '#3b4a55'); for (const dz of [-.55, 0, .55]) bx(g, SX + .03, 4.55, z + dz, .04, 1.25, .04, '#5a5f63'); bx(g, SX + .03, 5.15, z, .04, .04, 2.2, '#5a5f63'); }
      bx(g, SX - .02, 0, -L.d / 2, .1, .45, L.d, '#6f7a55');
      signIn(g, 'FAUTI', SX + .04, 1.8, -17, 1.3, .4, LAD, '#e8e8e8', Math.PI / 2); }
    for (const x of [-4.8, -.6, 3.6]) bx(g, x, 0, .06, 3.2, 2.9, .06, '#f7f7f5');
    bx(g, 6.8, 1, .06, 1, .9, .05, '#9aa0a5');
    done(L, LAD, 'Galpón');
  }
}

// =========================================================================
// INTERIOR DE LA MANZANA DE AMFAC / HELADERÍA PEGHI / SOCIEDAD ITALIANA (Av. Centenario, San Luis, Entre Ríos y Jujuy):
// Elimina las casitas aleatorias del centro y arma los patios, medianeras, anexos traseros, pileta y arboleda según el satélite
// =========================================================================
{
  const g = group(0, 0);
  const VERDE = ['#43702b', '#528036', '#3a6224'], COPA_OSC = ['#2f5420', '#3b6329', '#487332'];
  const blk = (x0, z0, x1, z1, h, wallCol, roofCol = null) => {
    const cx = (x0 + x1) / 2, cz = (z0 + z1) / 2, w = x1 - x0, d = z1 - z0;
    bx(g, cx, 0, cz, w, h, d, wallCol);
    if (roofCol) bx(g, cx, h, cz, w + .22, .14, d + .22, roofCol);
    addCol(x0, z0, x1, z1);
    mapRects.push([x0, z0, x1, z1, roofCol || wallCol]);
  };
  const shed2 = (x0, z0, x1, z1, h, rH, wallCol, roofCol, ry = 0) => {
    const cx = (x0 + x1) / 2, cz = (z0 + z1) / 2, w = x1 - x0, d = z1 - z0;
    bx(g, cx, 0, cz, w, h, d, wallCol);
    gableIn(g, cx, h, cz, (ry === 0 ? w : d) + .45, rH, (ry === 0 ? d : w) + .45, roofCol, ry);
    addCol(x0, z0, x1, z1);
    mapRects.push([x0, z0, x1, z1, roofCol]);
  };
  const med = (x0, z0, x1, z1, h = 2.15, col = '#d4cdc0') => {
    const cx = (x0 + x1) / 2, cz = (z0 + z1) / 2, w = Math.max(.22, x1 - x0), d = Math.max(.22, z1 - z0);
    bx(g, cx, 0, cz, w, h, d, col);
    addCol(x0, z0, x1, z1);
  };

  // --- 1) Suelos de patios internos (césped y pisos embaldosados) ---
  flat.rect(34.0, -217.5, 76.2, -170.5, .034, '#5e883c');                        // base verde del pulmón interno
  flat.rect(34.0, -217.0, 52.5, -199.0, .038, '#557d36');                        // jardín arbolado detrás de AMFAC / Peghi
  flat.rect(52.0, -198.5, 64.5, -181.0, .044, '#c6bfb2');                        // patio embaldosado interno detrás de la Sociedad Italiana
  flat.rect(64.5, -195.5, 76.0, -183.5, .044, '#dcd6ca');                        // solárium/patio claro detrás de las casas de Entre Ríos
  flat.rect(48.0, -182.0, 64.5, -171.0, .038, '#5a8238');                        // patio verde arbolado detrás del galpón grande y Jujuy

  // --- 2) Anexos traseros y quinchos según la foto satelital ---
  // Detrás de Heladería Peghi: anexo blanco de servicio (x = 34.0..40.2, z = -208.5..-200.5)
  blk(34.0, -208.5, 40.2, -200.5, 3.0, '#efede6', '#d8d4c8');
  // Detrás de las casas de San Luis: quincho/galponcito de techo rojizo (x = 56.0..62.2, z = -215.5..-209.5)
  shed2(56.0, -215.5, 62.2, -209.5, 2.95, .8, '#e6e0d4', '#a4523b', 0);
  // Detrás del salón de la Sociedad Italiana: anexo blanco de cocina/salón (x = 52.0..59.0, z = -196.5..-188.5) y galponcito sur (x = 57.5..63.8, z = -187.5..-180.8)
  blk(52.0, -196.5, 59.0, -188.5, 3.3, '#f0eee8', '#dad6cc');
  blk(57.5, -187.5, 63.8, -180.8, 3.0, '#eae6dc', '#c6c2b8');
  // Detrás de Entre Ríos (sector centro-este): quincho de techo marrón-rojizo (x = 65.5..72.8, z = -203.2..-196.5) y pileta rectangular celeste (x = 67.6..73.4, z = -192.2..-187.6)
  shed2(65.5, -203.2, 72.8, -196.5, 3.1, .85, '#e8e2d6', '#9a523c', 0);
  flat.rect(67.0, -192.8, 74.0, -187.0, .052, '#f0ece2');
  flat.rect(67.6, -192.2, 73.4, -187.6, .062, '#34a4de');
  mapRects.push([67.6, -192.2, 73.4, -187.6, '#34a4de']);
  // Detrás del galpón grande y Jujuy (sector sur): extensión trasera (x = 48.2..54.8, z = -181.5..-174.5) y galponcito SE (x = 69.2..75.6, z = -179.0..-172.0)
  blk(48.2, -181.5, 54.8, -174.5, 3.2, '#e6e2d8', '#b8bcc0');
  blk(69.2, -179.0, 75.6, -172.0, 3.0, '#dfd9ce', '#7c8286');

  // --- 3) Red de medianeras internas extendidas hasta los fondos de las casas (sin el muro horizontal que cortaba detrás de San Luis) ---
  // Horizontales (este-oeste), extendidas hasta las casas de Av. Centenario y Entre Ríos
  med(33.5, -199.1, 64.5, -198.88, 2.2, '#c4b8a6');
  med(64.5, -203.6, 79.0, -203.38, 2.15, '#d4cdc0');
  med(64.5, -195.8, 79.0, -195.58, 2.15, '#c8886e');
  med(48.0, -182.1, 79.0, -181.88, 2.15, '#cfc7b8');
  // Verticales (norte-sur), extendidas hasta tocar las casas de San Luis (z = -223) y Jujuy (z = -167.5)
  med(52.1, -223.0, 52.32, -199.0, 2.15, '#c4b8a6');
  med(64.3, -223.0, 64.52, -167.5, 2.2, '#d4cdc0');
  med(55.4, -182.0, 55.62, -167.5, 2.1, '#c8b8a4');

  // --- 4) Arboleda tupida del pulmón interno (según las copas oscuras del satélite) ---
  for (const [tx, tz, ts, col] of [
    [43.5, -212.0, 1.35, COPA_OSC], [48.5, -209.0, 1.3, VERDE],     [44.5, -203.5, 1.4, COPA_OSC],
    [49.5, -202.0, 1.25, VERDE],    [55.0, -204.5, 1.2, COPA_OSC],  [60.5, -203.0, 1.3, VERDE],
    [70.0, -210.5, 1.25, COPA_OSC], [67.0, -212.5, 1.15, VERDE],    [61.2, -193.0, 1.2, VERDE],
    [59.5, -176.5, 1.4, COPA_OSC],  [56.2, -173.5, 1.35, COPA_OSC], [62.8, -175.0, 1.3, VERDE],
    [66.8, -175.5, 1.25, COPA_OSC], [72.5, -184.5, 1.15, VERDE]
  ]) addTree(tx, tz, ts, false, col);

  plazaRects.push([13.0, -234.5, 90.0, -152.5]);   // evita casas y árboles aleatorios en el interior de toda la manzana de AMFAC
}

// Plaza Islas Malvinas (esquina Jujuy y Av. Centenario, lado oeste, enfrente del galpón) y Correo Argentino (Av. Centenario 821)
{
  const X0 = -40.5, X1 = -13.5, Z0 = -168.5, Z1 = -153;   // plaza: de la línea de Av. Centenario (X1) hacia el oeste, de Jujuy (Z1) hacia el norte
  plazaRects.push([X0 - 6, -185, X1, Z1]);
  // piso de lajas de piedra irregulares
  flat.rect(X0, Z0, X1, Z1, .06, '#bdb6aa');
  for (let k = 0; k < 170; k++){ const x = R(X0 + .5, X1 - .5), z = R(Z0 + .5, Z1 - .5), w = R(.5, 1.3), h = R(.4, 1.1); flat.rect(x - w / 2, z - h / 2, x + w / 2, z + h / 2, .062, pick(['#a9a296', '#c7c0b3', '#b3ac9f', '#cfc9bd'])); }
  // canteros de pasto
  for (const r of [[-38.5, -167, -30.5, -163], [-25, -167, -16, -163.5], [-38.5, -158.5, -31, -154.5], [-25.5, -158, -15.5, -154.6]]){ flat.rect(r[0], r[1], r[2], r[3], .07, '#6a9a45'); }
  // pérgolas de pilares de ladrillo con enredadera, sobre el camino central hacia el monumento
  const pergola = (x, z, w, d) => {
    for (const sx of [-1, 1]) for (const sz of [-1, 1]){ box(x + sx * w / 2, 0, z + sz * d / 2, .6, 2.7, .6, '#a8583f'); addCol(x + sx * w / 2 - .3, z + sz * d / 2 - .3, x + sx * w / 2 + .3, z + sz * d / 2 + .3); }
    for (const sz of [-1, 1]) box(x, 2.7, z + sz * d / 2, w + .6, .15, .18, '#6b4a33');
    for (let k = 0; k < 6; k++) crowns.add(x + R(-w / 2, w / 2), 3.05, z + R(-d / 2, d / 2), R(1, 1.5), R(.45, .7), R(1, 1.4), R(0, 6), pick(['#5f8f35', '#6d9a3c', '#4f7f2d']));
    for (const sx of [-1, 1]) crowns.add(x + sx * w / 2, 1.8, z + d / 2, .5, 1.2, .5, 0, '#55852f');
  };
  pergola(-18.5, -160.8, 2.4, 2.8); pergola(-24.5, -160.8, 2.4, 2.8); pergola(-36.5, -155.6, 2.2, 2.6);
  // monumento: estela de piedra oscura con el contorno de las islas y placa, sobre cantero con plantas
  {
    const mx = -34.5, mz = -160.8;
    box(mx, 0, mz, 2.2, .45, 3.4, '#8f8a80'); flat.rect(mx - .9, mz - 1.5, mx + .9, mz + 1.5, .46, '#4b6a2f');
    for (let k = 0; k < 6; k++) crowns.add(mx + R(-.7, .7), .75, mz + R(-1.3, 1.3), .4, .35, .4, R(0, 6), pick(['#4f7f2d', '#6d9a3c']));
    box(mx - .4, .45, mz, .35, 2.3, 2.5, '#6c706d');
    const cv = document.createElement('canvas'); cv.width = 200; cv.height = 180; const c = cv.getContext('2d');
    c.fillStyle = '#6c706d'; c.fillRect(0, 0, 200, 180); c.strokeStyle = '#d9d6cf'; c.lineWidth = 4; c.fillStyle = '#7a7f7c';
    for (const isl of [[[30, 70], [55, 50], [80, 60], [92, 85], [75, 110], [50, 105], [35, 95]], [[110, 75], [140, 60], [170, 75], [165, 105], [140, 125], [115, 110]]]){ c.beginPath(); isl.forEach(([x, y], i) => i ? c.lineTo(x, y) : c.moveTo(x, y)); c.closePath(); c.fill(); c.stroke(); }
    c.fillStyle = '#d9d6cf'; c.font = 'bold 15px Arial'; c.textAlign = 'center'; c.fillText('ISLAS MALVINAS', 100, 160);
    const tex = new THREE.CanvasTexture(cv); tex.colorSpace = THREE.SRGBColorSpace;
    const face = new THREE.Mesh(new THREE.PlaneGeometry(2.4, 2.2), new THREE.MeshLambertMaterial({ map: tex })); face.position.set(mx - .2, 1.6, mz); face.rotation.y = Math.PI / 2; scene.add(face);
    const pg = group(mx + .9, mz, Math.PI / 2); signIn(pg, 'A LOS HÉROES DE MALVINAS', 0, .75, 0, 2.2, .45, '#f4f2ec', '#2a3a55');
    addCol(mx - 1.1, mz - 1.7, mx + 1.1, mz + 1.7);
    mapLabels.push([mx + 8, mz, 'Plaza Malvinas']);
  }
  // setos redondeados
  for (const [x, z, sx, sz] of [[-20, -165.3, 2.6, 1.3], [-29, -156.5, 1.6, 1.6], [-22.5, -156.2, 1.5, 1.5], [-37.5, -165, 1.3, 1.3]]) crowns.add(x, .75, z, sx, 1, sz, 0, '#3e6b2c');
  // faroles naranjas de cabeza redonda
  for (const [x, z] of [[-14.6, -166.5], [-14.6, -155.5], [-27.5, -167.8], [-39.6, -157.5], [-30, -153.8], [-21.5, -162.8]]){ poles.add(x, 0, z, .12, 4.4, .12, 0, '#e0622a'); const l = new THREE.Mesh(new THREE.SphereGeometry(.24, 10, 8), lam({ color: 0xf6f3ea, emissive: 0x2a2a22 })); l.position.set(x, 4.55, z); scene.add(l); addCol(x - .12, z - .12, x + .12, z + .12); }
  // bancos blancos con asiento azul
  for (const [x, z, ry] of [[-29.5, -165.8, 0], [-38.8, -161, Math.PI / 2], [-16.5, -157.2, 0]]){ const g = group(x, z, ry); boxIn(g, -.7, .2, 0, .25, .4, .4, '#efefea'); boxIn(g, .7, .2, 0, .25, .4, .4, '#efefea'); boxIn(g, 0, .45, 0, 1.8, .1, .45, '#3a74c4'); addCol(x - .9, z - .9, x + .9, z + .9); }
  // árboles: pino grande, palmeras y árboles sobre la vereda
  addTree(-38.6, -166.6, 1.7, false, ['#2c4f22', '#2f5a24']);
  addPalm(-31.5, -167.7, 1); addPalm(-26, -167.9, .95);
  for (const [x, z] of [[-14.8, -163], [-14.8, -158.6], [-33, -153.8]]) addTree(x, z, .9, false, ['#9c7a45', '#8a6a3a', '#5e8a3a']);
  // tapial del fondo con murales de Malvinas
  {
    const cv = document.createElement('canvas'); cv.width = 512; cv.height = 64; const c = cv.getContext('2d');
    c.fillStyle = '#ecebe6'; c.fillRect(0, 0, 512, 64);
    for (let k = 0; k < 4; k++){ const x0 = 10 + k * 128; c.fillStyle = '#74acdf'; c.fillRect(x0, 8, 108, 16); c.fillStyle = '#ffffff'; c.fillRect(x0, 24, 108, 14); c.fillStyle = '#74acdf'; c.fillRect(x0, 38, 108, 16); c.fillStyle = '#3d5a7a'; c.beginPath(); c.ellipse(x0 + 40, 31, 16, 7, 0, 0, 7); c.ellipse(x0 + 70, 31, 14, 6, 0, 0, 7); c.fill(); }
    c.fillStyle = '#1f3b6b'; c.font = 'bold 13px Arial'; c.fillText('LAS MALVINAS SON ARGENTINAS', 150, 60);
    const tex = new THREE.CanvasTexture(cv); tex.colorSpace = THREE.SRGBColorSpace;
    box(X0 - .2, 0, (Z0 + Z1) / 2, .3, 2.4, Z1 - Z0, '#ecebe6'); addCol(X0 - .4, Z0, X0, Z1);
    const m = new THREE.Mesh(new THREE.PlaneGeometry(Z1 - Z0 - 1, 2), new THREE.MeshLambertMaterial({ map: tex })); m.position.set(X0 - .03, 1.2, (Z0 + Z1) / 2); m.rotation.y = Math.PI / 2; scene.add(m);
    box((X0 + X1 - 9) / 2, 0, Z0 - .2, X1 - X0 - 9, 2.4, .3, '#d9d6cf'); addCol(X0, Z0 - .4, X1 - 9, Z0);
  }
  // antena de comunicaciones roja y blanca: en el patio del edificio de ladrillo blanqueado al lado del Correo (hacia San Luis)
  {
    const g = group(-31, -193.5), H = 40, legs = [0, 1, 2].map(k => k * Math.PI * 2 / 3);
    for (let s = 0; s < H; s += 4){
      const r0 = 1.8 * (1 - s / H) + .35, r1 = 1.8 * (1 - Math.min(H, s + 4) / H) + .35, col = (s / 4) % 2 ? '#e8e8e8' : '#d8261f';
      legs.forEach((t, k) => { poleIn(g, [Math.cos(t) * r0, s, Math.sin(t) * r0], [Math.cos(t) * r1, Math.min(H, s + 4), Math.sin(t) * r1], .07, col); const t2 = legs[(k + 1) % 3]; poleIn(g, [Math.cos(t) * r0, s, Math.sin(t) * r0], [Math.cos(t2) * r1, Math.min(H, s + 4), Math.sin(t2) * r1], .035, col); });
    }
    addCol(-33, -195.5, -29, -191.5); mapRects.push([-33, -195.5, -29, -191.5, '#d8261f']);
  }
  // ---- Correo Argentino (Av. Centenario 821): frente a dos aguas asimétrico bajo, ventanas celestes (2x2 y 3x3), porche en esquina con lajas, mástil y cartel colgante (Street View) ----
  {
    const g = group(-17.6, -177.5, Math.PI / 2);   // frente hacia la avenida (+x); local x = hacia el norte (-z)
    const WH = '#eae7e0', IV = '#f1ece2', AZ = '#4fa3d9', LAJA = '#c9c2b4';
    bx(g, -1.9, 0, -6.5, 8.2, 3.65, 13, WH);                 // cuerpo principal (izquierda y centro)
    bx(g, 4.1, 0, -7.45, 3.8, 3.65, 11.1, IV);               // sector del porche (retirado 1.9 m)
    bx(g, 2.22, 0, -.95, .08, 3.65, 1.9, IV);                // pared lateral izquierda interior del porche
    bx(g, 4.1, 0, -.95, 3.8, .16, 2.1, LAJA);                // piso de lajas del porche (1 escalón)
    bx(g, 0, 0, .42, 12.2, .12, .85, LAJA);                  // escalón/vereda de lajas frontal
    // Techo a dos aguas asimétrico de poca pendiente (cumbrera desplazada a la derecha x = +1.55, altura 1.45 m)
    {
      const sh = new THREE.Shape([new THREE.Vector2(-6.2, 0), new THREE.Vector2(6.2, 0), new THREE.Vector2(1.55, 1.45)]);
      const rg = new THREE.ExtrudeGeometry(sh, { depth: 13.4, bevelEnabled: false });
      const rm = new THREE.Mesh(rg, lam({ color: '#e2dfd7' }));
      rm.position.set(0, 3.65, -13.1); rm.castShadow = rm.receiveShadow = true; g.add(rm);
      // Cenefa fina bordeando las dos aguas
      poleIn(g, [-6.25, 3.67, .32], [1.55, 5.12, .32], .055, '#c8c4bc');
      poleIn(g, [1.55, 5.12, .32], [6.25, 3.67, .32], .055, '#c8c4bc');
    }
    bx(g, 5.82, 0, -.20, .38, 3.65, .38, WH);                // columna cuadrada del porche
    // Ventanas con marco celeste y cortinas/persianas verticales crema (cols × rows exactos)
    const winGrid = (x, y, z, w, h, cols, rows) => {
      bx(g, x, y - .07, z, w + .16, h + .14, .08, AZ);
      bx(g, x, y, z + .04, w, h, .04, '#e2dccb');
      for (let k = 1; k < cols; k++) bx(g, x - w / 2 + k * w / cols, y, z + .07, .05, h, .03, AZ);
      for (let r = 1; r < rows; r++) bx(g, x, y + r * h / rows, z + .07, w, .05, .03, AZ);
    };
    winGrid(-4.65, 1.25, .02, 1.15, 1.15, 2, 2);             // paño izq: ventana cuadrada 2x2
    winGrid(-.95, 1.05, .02, 2.50, 1.55, 3, 3);              // paño centro: ventana ancha 3x3
    winGrid(4.05, 1.15, -1.88, 2.10, 1.45, 3, 3);            // fondo del porche: ventana 3x3 (libre de puerta)
    // Puerta de entrada en la pared lateral izquierda del porche (mirando hacia +x) + paño vidriado celeste
    bx(g, 2.27, .16, -1.15, .08, 2.18, .92, '#7c6b56');      // puerta de entrada
    bx(g, 2.27, .85, -.42, .08, 1.45, .36, AZ); bx(g, 2.29, .92, -.42, .04, 1.30, .26, '#d9d3c2');
    // Cartel colgante azul/negro "CORREO ARGENTINO" sobre la abertura del porche
    bx(g, 4.0, 3.42, .20, .06, .06, .75, '#2b3036');
    signIn(g, 'CORREO', 4.0, 3.10, .56, 1.45, .42, '#1c355e', '#f7d117', 0);
    signIn(g, 'CORREO', 4.0, 3.10, .52, 1.45, .42, '#1c355e', '#f7d117', Math.PI);
    // Mástil fino metálico óxido entre la ventana central y el porche + aplique redondo + placa de altura
    cylIn(g, 1.65, 2.75, .14, .032, 5.5, '#8b4a34');
    cylIn(g, -2.95, 2.65, .08, .14, .06, '#3a3d40', Math.PI / 2);
    bx(g, -5.65, 2.25, .05, .28, .18, .03, '#2d5a3c');
    // bloque bajo con los dos medidores de ladrillo contra la vereda y cantero delante de la ventana grande
    bx(g, -5.2, 0, 3.75, 2.0, .85, .45, '#e2ded5'); for (const x of [-5.65, -4.75]) bx(g, x, .12, 3.99, .7, .6, .03, '#a8583f');
    colLocal(g, -6.2, 3.5, -4.2, 4, null);
    bx(g, -2.1, 0, .95, 5.0, .28, .95, '#e2ded5'); bx(g, -2.1, .28, .95, 4.8, .02, .75, '#5d7f3c');
    for (const x of [-3.9, -2.7, -1.5, -.3]) crowns.add(-17.6 + .95, .52, -177.5 - x, .42, .32, .42, R(0, 6), pick(['#4c7a30', '#5e8a3a']));
    // ---- frente de cemento/lajas y tapiales a los dos lados del Correo ----
    flat.rect(-17.6, -188, -13.5, -168.7, .058, '#cfcac0');
    flat.rect(-22.6, -171.4, -17.6, -168.7, .058, '#c4bfb4');
    const PLACA = '#a9ad9f', POSTE = '#9a958c';
    const malla = (x, w, h) => { const p = new THREE.Mesh(new THREE.PlaneGeometry(w, h), new THREE.MeshLambertMaterial({ color: 0x8f969c, transparent: true, opacity: .4, side: THREE.DoubleSide })); p.position.set(x, h / 2 + .05, 0); g.add(p); };
    // lado sur (plaza): portón celeste de malla al ras del frente + tapial de placas
    bx(g, -7.4, 0, 0, 2.4, .06, .06, AZ); bx(g, -7.4, 1.9, 0, 2.4, .06, .06, AZ); for (const x of [-8.57, -6.23]) bx(g, x, 0, 0, .06, 1.95, .06, AZ);
    bx(g, -7.4, .95, 0, 2.4, .05, .05, AZ); malla(-7.4, 2.3, 1.85);
    bx(g, -8.75, 0, 0, .3, 2.3, .32, POSTE); bx(g, -6.05, 0, 0, .3, 2.3, .32, POSTE);
    bx(g, -8.8, 0, -2.45, .22, 2.1, 4.9, PLACA); for (let z = -1.2; z > -4.9; z -= 1.25) bx(g, -8.8, 0, z, .3, 2.3, .3, POSTE);
    colLocal(g, -8.95, -4.9, -8.6, .2, null);
    // lado norte: portón doble celeste tubular y paño de placas premoldeadas entre postes de hormigón
    for (const x of [6.25, 7.7, 9.1, 10.45]) bx(g, x, 0, 0, .3, 2.45, .35, POSTE);
    bx(g, 6.97, 0, 0, 1.2, .06, .06, AZ); bx(g, 6.97, 1.9, 0, 1.2, .06, .06, AZ); bx(g, 6.97, .95, 0, 1.2, .05, .05, AZ); malla(6.97, 1.15, 1.85);
    for (const x of [8.4, 9.77]) bx(g, x, 0, 0, 1.12, 2.15, .2, PLACA);
    for (const x of [8.4, 9.77]) for (const y of [.55, 1.1, 1.65]) bx(g, x, y, .11, 1.1, .03, .02, '#8f9387');
    colLocal(g, 7.55, -.2, 10.6, .2, null);
    // medianera con el edificio de la antena
    bx(g, 10.55, 0, -4.5, .25, 2.2, 17, PLACA); colLocal(g, 10.4, -13, 10.7, 4, null);
    colLocal(g, -6, -13, 6, 0, WH);
    mapLabels.push([-24, -177.5, 'Correo']);
  }
  // buzón rojo clásico en la vereda, con boca de cartas, postes y cadenas
  {
    const bx0 = -11.2, bz0 = -180;
    box(bx0, 0, bz0, 1.1, .12, 1.1, '#c9c3b5');
    const b = new THREE.Mesh(new THREE.CylinderGeometry(.32, .32, 1.25, 16).translate(0, .62, 0), lam({ color: 0xc8261e })); b.position.set(bx0, .12, bz0); b.castShadow = true; scene.add(b);
    const cap = new THREE.Mesh(new THREE.SphereGeometry(.34, 14, 8, 0, Math.PI * 2, 0, Math.PI / 2), lam({ color: 0xb5201a })); cap.position.set(bx0, 1.37, bz0); scene.add(cap);
    const band = new THREE.Mesh(new THREE.CylinderGeometry(.33, .33, .12, 16), lam({ color: 0xf7c600 })); band.position.set(bx0, .95, bz0); scene.add(band);
    box(bx0 + .31, 1.12, bz0, .05, .09, .24, '#1b1d20');     // boca de cartas
    const pg = group(0, 0); const P = [[bx0 - .55, bz0 - .55], [bx0 + .55, bz0 - .55], [bx0 + .55, bz0 + .55], [bx0 - .55, bz0 + .55]];
    P.forEach(([x, z], i) => { poleIn(pg, [x, .12, z], [x, .75, z], .025, '#222222'); const [x2, z2] = P[(i + 1) % 4]; poleIn(pg, [x, .7, z], [x2, .62, z2], .012, '#444444'); });
    addCol(bx0 - .6, bz0 - .6, bx0 + .6, bz0 + .6);
  }
}

// =========================================================================
// Av. Centenario lado oeste, del Correo hacia la esquina de San Luis (fotos de Street View del usuario, en orden):
// A) edificio de ladrillo blanqueado con 3 ventanitas con alero (la antena roja y blanca está en su patio), tapial de ladrillo
//    con paño de malla, medidor azul y portón blanco de caños · B) casa con frente de piedra en listones, ventana con reja de madera,
//    puerta de madera y friso de madera arriba · C) casa de 2 pisos celeste agua con pilastras grises, zócalo de mármol negro,
//    puertas blancas, portón de garaje y persianas · D) tapial de ladrillo con grafitis y casita al fondo, portón de chapa con "ONE" ·
//    E) almacén de la esquina: planta baja blanca y planta alta de ladrillo viejo con cornisa · F) jardín con reja negra hasta la esquina.
// =========================================================================
{
  const XL = -13.5;
  // local: frente en z = 0 sobre la línea municipal, +z = hacia la avenida (+x), +x = hacia San Luis (-z) = la derecha en las fotos
  const casaW = (za, zb) => { const zc = (za + zb) / 2; return { g: group(XL, zc, Math.PI / 2), w: za - zb, zc, Wd: (lx, lz) => [XL + lz, zc - lx] }; };
  const body = (g, x0, x1, d0, d1, h, col) => { bx(g, (x0 + x1) / 2, 0, -(d0 + d1) / 2, x1 - x0, h, d1 - d0, col); colLocal(g, x0, -d1, x1, -d0, col); };
  const rejaV = (g, x, y0, z, w, h, col, step = .14) => { for (let k = 1; k < Math.round(w / step); k++) bx(g, x - w / 2 + k * step, y0, z, .03, h, .03, col); for (const y of [y0, y0 + h - .04]) bx(g, x, y, z, w + .04, .04, .04, col); };
  const ventana = (g, x, y0, z, w, h, marco = '#e6e3dc', rej = null) => { bx(g, x, y0 - .07, z + .02, w + .18, h + .14, .06, marco); bx(g, x, y0, z + .04, w, h, .04, '#3b4a55'); if (rej) rejaV(g, x, y0, z + .1, w, h, rej, .13); };
  const persiana = (g, x, y0, z, w, h) => { bx(g, x, y0 - .07, z + .02, w + .16, h + .14, .06, '#e6e3dc'); bx(g, x, y0, z + .05, w, h, .04, '#dcd4c2'); for (let y = y0 + .1; y < y0 + h - .05; y += .11) bx(g, x, y, z + .075, w, .02, .01, '#c2b9a4'); };
  const puerta = (g, x, z, w, h, col) => { bx(g, x, 0, z + .02, w + .14, h + .07, .06, '#e6e3dc'); bx(g, x, 0, z + .05, w, h, .06, col); bx(g, x + w * .33, h * .45, z + .1, .06, .06, .06, '#c9a227'); };
  const tex = (draw, w = 256, h = 128) => { const c = document.createElement('canvas'); c.width = w; c.height = h; draw(c.getContext('2d'), w, h); const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; t.wrapS = t.wrapT = THREE.RepeatWrapping; t.anisotropy = 4; return t; };
  const plano = (g, x, y, z, w, h, t, rx = 1, ry = 1) => { const tt = t.clone(); tt.needsUpdate = true; tt.repeat.set(rx, ry); const m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), lam({ map: tt })); m.position.set(x, y, z); g.add(m); return m; };
  const pasto = (za, zb, col = '#6f8f45') => flat.rect(-10.7, zb, -9, za, .205, col);   // franja de pasto junto al cordón
  const arbol = (z, s = 1) => addTree(-9.85, z, s, false);
  const LAD = '#d9d5cb';   // ladrillo blanqueado

  // A) edificio de ladrillo blanqueado (la antena está en su patio)
  { const { g, w, zc, Wd } = casaW(-188, -200.5);   // w = 12.5 · local -6.25..6.25
    // tapial del frente: ladrillo, paño de malla gris, pilar con medidor azul, portón blanco de caños, ladrillo
    bx(g, -4.8, 0, -.15, 2.9, 2.2, .3, LAD); bx(g, .9, 0, -.15, 1.0, 2.25, .32, LAD); bx(g, 5.3, 0, -.15, 1.9, 2.1, .3, LAD);
    bx(g, -3.35, 0, -.15, .32, 2.3, .34, LAD); bx(g, .45, 0, -.15, .32, 2.3, .34, LAD);
    bx(g, -1.45, 0, -.15, 3.5, .5, .28, LAD);
    { const p = new THREE.Mesh(new THREE.PlaneGeometry(3.5, 1.6), new THREE.MeshLambertMaterial({ color: 0x9aa0a4, transparent: true, opacity: .45, side: THREE.DoubleSide })); p.position.set(-1.45, 1.3, -.15); g.add(p); }
    for (const y of [.5, 2.1]) bx(g, -1.45, y, -.15, 3.5, .05, .05, '#9aa0a4'); for (const x of [-2.6, -1.45, -.3]) bx(g, x, .5, -.15, .05, 1.6, .05, '#9aa0a4');
    bx(g, 1.05, 1.1, .03, .35, .45, .1, '#2f5fb8');                                         // medidor azul
    for (const x of [1.7, 4.3]) bx(g, x, 0, -.15, .12, 1.95, .12, '#f2f2ee');
    rejaV(g, 3.0, .05, -.15, 2.5, 1.8, '#f2f2ee', .62); bx(g, 3.0, .95, -.15, 2.5, .05, .05, '#f2f2ee');   // portón de caños blanco
    colLocal(g, -w / 2, -.35, 1.6, .05, null); colLocal(g, 4.3, -.35, w / 2, .05, null);
    // edificio retirado: 2 plantas de ladrillo blanqueado, 3 ventanitas con alero de hormigón, chimenea y campanita redonda
    body(g, -5.2, 1.4, 3.2, 12, 5.0, LAD); bx(g, -1.9, 5.0, -7.6, 6.7, .18, 8.9, '#cfcac0');
    for (const x of [-4.0, -1.9, .2]){ bx(g, x, 3.25, -3.18, 1.1, .7, .05, '#e8e6e0'); bx(g, x, 3.35, -3.16, .9, .5, .04, '#3b4a55'); bx(g, x, 4.0, -2.95, 1.3, .12, .55, '#5c5f63'); }
    bx(g, -2.6, 0, -3.17, .95, 2.1, .05, '#8a8f93');
    cylIn(g, .9, 4.4, -3.15, .22, .06, '#2a2a2a', Math.PI / 2);
    cylIn(g, -4.6, 5.4, -9, .16, .9, '#8a8a85');
    rectL(1.7, 0, 4.3, -12, .06, '#bdb8ac');
    body(g, 4.45, w / 2, 1.5, 13, 3.4, '#efede7');                                         // construcción blanca a la derecha, al lado del portón
    rectL(-5.2, -12, 6.25, -20, .05, '#9a9a88');                                           // patio de la antena
    pasto(-188, -200.5); arbol(zc + 1.5, 1.1);
    function rectL(lx0, lz0, lx1, lz1, y, col){ const [ax, az] = Wd(lx0, lz0), [bx2, bz] = Wd(lx1, lz1); flat.rect(Math.min(ax, bx2), Math.min(az, bz), Math.max(ax, bx2), Math.max(az, bz), y, col); }
  }
  // B) casa con frente de piedra en listones (beige y gris), ventana con reja de madera, puerta de madera y friso de madera arriba
  { const { g, w, zc } = casaW(-200.5, -206.5);   // w = 6
    const piedra = tex((x, W, H) => { for (let y = 0; y < H; y += 8){ let px = -R(0, 30); while (px < W){ const L = R(18, 46); x.fillStyle = pick(['#cfc6b4', '#b9b2a4', '#d8d0bf', '#a9a396', '#c4b9a3', '#9c968b']); x.fillRect(px, y, L - 1.5, 6.5); px += L; } } x.fillStyle = 'rgba(80,70,60,.25)'; });
    body(g, -w / 2, w / 2, .6, 12, 3.7, '#d8d0bf');
    plano(g, -.1, 1.45, -.58, 5.8, 2.9, piedra, 2.2, 1.6);
    bx(g, 0, 2.9, -.55, w, .85, .12, '#7a6248'); for (let y = 2.95; y < 3.75; y += .17) bx(g, 0, y, -.48, w, .03, .02, '#5e4a36');   // friso de madera
    bx(g, -1.1, .9, -.56, 1.4, 1.45, .06, '#3b2a20'); for (let x = -1.65; x < -.5; x += .16) bx(g, x, .9, -.5, .05, 1.45, .04, '#6e3a26');   // ventana con reja de madera
    puerta(g, 1.6, -.6, .9, 2.15, '#6e3226');
    bx(g, -2.6, 0, -.6, .6, 2.2, .1, '#cfc6b4'); bx(g, .7, 1.3, -.5, .15, .25, .05, '#2a2a2a');
    pasto(-200.5, -206.5); arbol(zc - 2.6, 1.0);
  }
  // C) casa de 2 pisos verde agua/turquesa pastel con pilastras gris-lavanda, zócalo de piedra oscura, puertas blancas, portón de 3 hojas y persianas (Street View Av. Centenario 867)
  { const { g, w, zc } = casaW(-206.5, -215);   // w = 8.5 · local -4.25..4.25
    const AG = '#7ec4b8', GR = '#b5b0b6', MN = '#2a2d30', WH = '#f4f4f0', GL = '#3a4a56';
    body(g, -w / 2, w / 2, 0, 12, 6.2, AG);
    // alero delantero saliente con cenefa blanca y cabios/vigas a la vista abajo
    bx(g, 0, 6.2, .12, w + .32, .18, 1.05, '#f0efea');
    for (let rx = -3.9; rx <= 3.95; rx += .65) bx(g, rx, 6.08, .35, .07, .12, .55, '#c9b89e');
    // tanque de agua cilíndrico blanco asomando atrás en la azotea
    cylIn(g, -1.6, 6.85, -3.6, .68, 1.15, '#eaeae5');
    // 2 pilastras verticales gris-lavanda flanqueando el paño central + borde derecho blanco
    for (const x of [-1.52, 1.42]) bx(g, x, .85, .05, .48, 5.35, .10, GR);
    bx(g, 4.14, 0, .04, .24, 6.2, .08, '#efede7');
    // zócalo continuo de piedra pizarra oscura (altura ~0.85 m) entre las aberturas + gabinete de medidor gris claro
    for (const [x0, x1] of [[-4.25, -3.32], [-2.38, -.82], [.62, 1.72]]){
      bx(g, (x0 + x1) / 2, 0, .05, x1 - x0, .85, .10, MN);
      bx(g, (x0 + x1) / 2, .85, .06, x1 - x0 + .02, .05, .12, '#45484c');
    }
    bx(g, 1.15, .20, .11, .42, .48, .04, '#cfd2d4');                                         // gabinete de medidor
    // Paño izquierdo (x = -2.85): puerta peatonal blanca con paño vidriado superior, placa y aplique
    puerta(g, -2.85, 0, .86, 2.12, WH); bx(g, -2.85, 1.56, .10, .48, .28, .02, GL);
    bx(g, -2.22, 1.45, .06, .18, .12, .03, WH); bx(g, -2.85, 2.42, .08, .26, .12, .08, '#e8e8e4');
    // Paño central (x = 0): entrada principal blanca con 3 vidrios horizontales + paño vidriado lateral izquierdo + maceta
    bx(g, -.10, 0, .02, 1.42, 2.22, .08, '#2d3136');                                         // marco oscuro rebajado
    puerta(g, .08, 0, .88, 2.15, WH);
    for (const y of [1.42, 1.66, 1.90]) bx(g, .08, y, .10, .52, .12, .02, GL);               // 3 vidrios horizontales
    bx(g, -.58, .08, .06, .30, 2.04, .04, GL);                                               // paño lateral vidriado
    for (const y of [.60, 1.12, 1.64]) bx(g, -.58, y, .08, .30, .03, .02, '#2d3136');
    bx(g, -.98, 1.38, .07, .22, .14, .03, '#d6d8da'); bx(g, -1.52, 2.68, .12, .20, .14, .08, '#e8e8e4');
    bx(g, -.82, 0, .30, .28, .30, .28, '#9b6b4e'); const mp = new THREE.Mesh(new THREE.IcosahedronGeometry(.22, 0), lam({ color: '#457a34', flatShading: true })); mp.position.set(-.82, .45, .30); g.add(mp);
    // Paño derecho (x = 2.90): portón de garaje blanco de 3 hojas con 3 vidrios horizontales arriba en cada hoja
    bx(g, 2.90, 0, .04, 2.26, 2.18, .06, WH);
    for (const sx of [2.15, 3.65]) bx(g, sx, 0, .08, .03, 2.18, .02, '#c5c5c0');             // juntas de 3 hojas
    for (const gx of [2.15, 2.90, 3.65]) bx(g, gx, 1.68, .08, .56, .20, .02, GL);
    // Planta alta: 3 ventanas cuadradas centradas en cada paño con persianas crema cerradas
    for (const wx of [-2.85, 0.0, 2.85]){
      bx(g, wx, 3.66, .03, 1.14, 1.14, .06, '#383c40');
      persiana(g, wx, 3.72, .04, 1.02, 1.02);
    }
    // Dos aires acondicionados split blancos montados debajo de la ventana derecha (sin pisar la pilastra)
    for (const ax of [2.42, 3.38]){
      bx(g, ax, 2.75, .20, .78, .48, .28, '#efefec');
      bx(g, ax - .15, 2.82, .35, .32, .32, .02, '#3a3e42');
      bx(g, ax + .34, 2.22, .06, .05, .56, .05, '#2f3236');                                  // cañería oscura
    }
    // Acceso vehicular / vereda de hormigón frente al garaje y entrada (con cazuelas para los dos árboles)
    flat.rect(-13.5, -215, -9, -206.5, .203, '#c8c3b8');
    arbol(zc + 3.2, 1.05); arbol(zc - 3.4, 1.1);
  }
  // D) tapial de ladrillo con grafitis, casita con techo de chapa gris al fondo y portón de chapa con "ONE"
  { const { g, w, zc } = casaW(-215, -223);   // w = 8 · local -4..4
    const graf = tex((x, W, H) => { x.fillStyle = '#8f5a46'; x.fillRect(0, 0, W, H); for (let r = 0; r < H; r += 6) for (let k = -1; k < 12; k++){ x.strokeStyle = 'rgba(60,35,25,.35)'; x.strokeRect(k * 24 + (r / 6 % 2) * 12, r, 24, 6); }
      x.font = 'bold 30px Arial'; x.fillStyle = '#8fb3e0'; x.fillText('Leoro', 10, 40); x.fillStyle = '#7d9be0'; x.fillText('NADOR', 40, 100);
      for (const [cx, cy, c] of [[260, 60, '#d9c34a'], [330, 90, '#e07a9a'], [400, 50, '#d9c34a'], [460, 85, '#6fae6a']]){ x.fillStyle = c; x.beginPath(); x.ellipse(cx, cy, 34, 16, .3, 0, 7); x.fill(); } }, 512, 128);
    bx(g, -.75, 0, -.15, 6.5, 2.0, .3, '#8f5a46'); plano(g, -.75, 1.0, .02, 6.5, 2.0, graf);
    colLocal(g, -w / 2, -.3, 2.5, 0, null);
    bx(g, 3.25, 0, -.1, 1.5, 2.1, .06, '#8d9a9f'); plano(g, 3.25, 1.4, -.045, 1.3, .45, tex((x, W, H) => { x.fillStyle = '#8d9a9f'; x.fillRect(0, 0, W, H); x.fillStyle = '#e8e8e8'; x.font = 'bold 70px Arial'; x.fillText('ONE', 40, 95); }));
    flat.rect(XL - 14, zc - 4, XL, zc + 4, .05, '#6f9a4a');
    body(g, -2.2, 2.4, 14, 21, 3.0, '#d8cfbd'); gableIn(g, .1, 3.0, -17.5, 5.2, 1.2, 7.6, '#7f878d', 0);
    bx(g, -1, 3.0, -16.5, .7, 1.6, .7, '#b9b2a4'); bx(g, 1.2, 1.4, -13.98, .7, .45, .25, '#efefec');
    bx(g, 3.96, 0, -4.08, .22, 3.2, 7.84, '#7d4a38');                                        // medianera alta de ladrillo del almacén (sin invadir su frente blanco)
    pasto(-215, -223); flat.rect(XL + .3, zc - 4, XL + 1.6, zc + 4, .205, '#6f8f45'); arbol(zc + .6, 1.0);
  }
  // E) almacén de la esquina: planta baja blanca (ventana con reja, cartel redondo, puerta con pizarrón) y planta alta de ladrillo viejo (poco profundo, con parapeto inclinado hacia el fondo)
  { const { g, w, zc } = casaW(-223, -229);   // w = 6 · local -3..3
    const LV = '#b37458', D = 5.8;
    body(g, -w / 2, w / 2, 0, D, 3.0, '#efeee9');
    bx(g, 0, 3.0, -D / 2, w, 2.55, D, LV);
    // parapeto inclinado de ladrillo en planta alta (más alto sobre la avenida z=0, baja hacia atrás z=-D como en sv_esq)
    {
      const sh = new THREE.Shape([new THREE.Vector2(0, 0), new THREE.Vector2(D, 0), new THREE.Vector2(D, .08), new THREE.Vector2(0, .85)]);
      const pm = new THREE.Mesh(new THREE.ExtrudeGeometry(sh, { depth: w, bevelEnabled: false }), lam({ color: LV }));
      pm.rotation.y = Math.PI / 2; pm.position.set(-w / 2, 5.55, 0); pm.castShadow = pm.receiveShadow = true; g.add(pm);
    }
    // cuerpo trasero revocado beige más bajo detrás del almacén (asoma arriba de la casa blanca en sv_esq)
    body(g, -w / 2, .6, D, D + 3.8, 4.45, '#d5cbb8');
    bx(g, 0, 2.9, .2, w + .3, .2, .7, '#9a978c');                                           // cornisa / balcón de hormigón
    for (const x of [-1.5, 1.5]){ bx(g, x, 3.7, .03, 2.2, 1.3, .05, '#965c44'); bx(g, x, 3.6, .04, 2.4, .1, .06, '#c4967c'); }   // paños hundidos
    bx(g, 0, 6.15, .05, w + .2, .25, .14, '#8d563f');
    ventana(g, -1.7, 1.0, 0, 1.4, 1.1, '#e6e3dc', '#2a2a2a'); cylIn(g, -.45, 1.6, .06, .28, .05, '#2a2a2a', Math.PI / 2);
    for (const x of [-.1, 2.6]) bx(g, x, 0, .05, .35, 2.9, .12, '#e3d6b5');
    bx(g, 1.25, 0, .02, 1.4, 2.3, .05, '#2a2a2a'); bx(g, 1.25, 0, .05, 1.1, 2.0, .03, '#4a4038'); rejaV(g, 1.25, 0, .1, 1.3, 2.2, '#3a3a3a', .1);
    bx(g, 1.25, 0, .6, .5, .9, .06, '#1f2a22'); bx(g, 1.25, .9, .6, .55, .05, .08, '#7a5a3a');   // pizarrón en la vereda
    bx(g, 2.6, 0, .1, .4, 1.1, .1, '#cfc6b4');                                              // revoque caído en la esquina del frente
    // poste de caño blanco con espiral roja en la vereda
    { const [x, z] = [XL + 3.8, zc + .6]; const pg = group(x, z); cylIn(pg, 0, 1.4, 0, .06, 2.8, '#f2f2ee'); for (let y = .2; y < 2.7; y += .3) boxIn(pg, 0, y, 0, .13, .08, .13, '#d8261f', 0, .5); poleIn(pg, [0, 2.8, 0], [-1.6, 3.6, 0], .06, '#f2f2ee'); addCol(x - .1, z - .1, x + .1, z + .1); }
    pasto(-223, -229); arbol(zc + 2.2, 1.0);
  }
  // F) pequeño patio de la esquina con reja negra (5.8 m sobre San Luis) y tapial de placas premoldeadas separándolo de la casa blanca
  { const { g, w, zc } = casaW(-229, -234.5);   // w = 5.5
    const D = 5.8;
    flat.rect(XL - D, -234.5, XL, -229, .05, '#6f9a4a');
    rejaV(g, 0, 0, -.1, w, 1.6, '#1f1f1f', .12); for (let x = -w / 2; x <= w / 2 + .01; x += 2.75) bx(g, x, 0, -.1, .1, 1.75, .1, '#1f1f1f');
    colLocal(g, -w / 2, -.2, w / 2, 0, null);
    // reja negra sobre el lado de San Luis (solo el ancho del pequeño patio de la esquina)
    for (let lz = -D + .1; lz < 0; lz += .13) bx(g, w / 2 - .08, 0, lz, .03, 1.6, .03, '#1f1f1f');
    for (const y of [.04, 1.56]) bx(g, w / 2 - .08, y, -D / 2, .04, .04, D, '#1f1f1f');
    for (const lz of [-2.0, -4.0, -D]) bx(g, w / 2 - .08, 0, lz, .09, 1.72, .09, '#6b4a3a');
    colLocal(g, w / 2 - .2, -D, w / 2, 0, null);
    // tapial de placas premoldeadas grises entre el patio de la esquina y el jardín de la casa blanca (x = -19.3, z = -234.4..-227.5)
    bx(g, -.5, 0, -D, w + 1.4, 2.05, .18, '#b4b1a8');
    for (let px = -w / 2 - 1.2; px <= w / 2 + .05; px += 1.35) bx(g, px, 0, -D, .16, 2.15, .24, '#928f88');
    for (const y of [.52, 1.04, 1.56]) bx(g, -.5, y, -D, w + 1.4, .03, .20, '#8d8a82');
    colLocal(g, -w / 2 - 1.4, -D - .15, w / 2, -D + .15, null);
    for (const [lx, lz, s] of [[-1.5, -1.8, 1.05], [.7, -2.8, .95], [-1.8, -4.3, .85], [1.4, -4.5, .9]]){ const [x, z] = [XL + lz, zc - lx]; addBush(x, z, s, 0); }
    for (const z of [-233.8]) { poles.add(-9.3, 0, z, .16, 8.5, .16, 0, '#7a6a55'); addCol(-9.5, z - .2, -9.1, z + .2); }
    flat.rect(-13.5, -234.5, -12, -229, .205, '#6f8f45'); pasto(-229, -234.5); arbol(zc + 1.5, .95);
    flat.rect(XL - D, -237.88, XL, -236.15, .205, '#688c3e');
    flat.rect(XL - D, -236.15, XL, -234.5, .206, '#c6bfb2');
  }
  plazaRects.push([-48, -234.5, -13.5, -187.3]);   // sin árboles ni casas al azar en estos lotes
  mapLabels.push([-22, -226, 'Almacén']);
}

// Paso a nivel central (RP 10-S, frente a Catamarca / cerca de Av. Centenario — basado en Street View real)
}
