// San Luis lado sur (entre Av. Centenario y Córdoba) + pulmón interno de manzana con pileta en L
// Basado en las 8 fotos de Street View (de Av. Centenario hacia Córdoba) y la vista satelital:
// 1) Casa retirada blanca detrás de reja negra y portón de chapa rojiza · 2) PEYRANO DIESEL (galpón parabólico con portones corredizos) ·
// 3) Chalet blanco con cenefa y canteros terracota + cochera de madera · 4) Portón ancho de chapa galvanizada + garaje blanco oxidado ·
// 5) Casa crema con galería de tejas coloniales · 6) "La pelu de viki" (VG Peluquería) ·
// 7) Casa blanca con faja de ladrillo visto, portón marrón y cartel VENDO · 8) Terreno baldío de la esquina de Córdoba con tapial y arboleda ·
// 9) Interior de manzana: patio grande con pileta en L, quinchos/anexos, medianeras y arboleda.
export function buildSanLuisSurOeste(ctx) {
  const {
    R, THREE, addBush, addCol, addTree, box, boxIn, bx, colLocal, cylIn, flat, group, lam, mapLabels, mapRects, pick, plazaRects, poleIn, poles, scene, signIn, trims
  } = ctx;

  const ZL = -234.5;   // línea municipal sur de San Luis · grupos con ry = PI: local +z = calle (norte), local +x = oeste (derecha en las fotos)
  const CURB = -237.88; // borde interior del cordón sur de San Luis (sin pisarlo ni salirse a la calle)
  const casa = (xE, xW) => {
    const cx = (xE + xW) / 2;
    return { g: group(cx, ZL, Math.PI), w: xE - xW, cx, Wd: (lx, lz) => [cx - lx, ZL - lz] };
  };
  const body = (g, x0, x1, d0, d1, h, col) => {
    bx(g, (x0 + x1) / 2, 0, -(d0 + d1) / 2, x1 - x0, h, d1 - d0, col);
    colLocal(g, x0, -d1, x1, -d0, col);
  };
  const rejaV = (g, x, y0, z, w, h, col = '#222426', step = .13) => {
    for (let k = 1; k < Math.round(w / step); k++) bx(g, x - w / 2 + k * step, y0, z, .028, h, .028, col);
    for (const y of [y0, y0 + h - .04]) bx(g, x, y, z, w + .04, .035, .035, col);
  };
  const rectL = (Wd, lx0, lz0, lx1, lz1, y, col) => {
    const [ax, az] = Wd(lx0, lz0), [bx2, bz] = Wd(lx1, lz1);
    flat.rect(Math.min(ax, bx2), Math.min(az, bz), Math.max(ax, bx2), Math.max(az, bz), y, col);
  };
  const tex = (draw, w = 256, h = 128) => {
    const c = document.createElement('canvas'); c.width = w; c.height = h;
    draw(c.getContext('2d'), w, h);
    const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace;
    t.wrapS = t.wrapT = THREE.RepeatWrapping; t.anisotropy = 4; return t;
  };
  const plano = (g, x, y, z, w, h, t, rx = 1, ry = 1) => {
    const tt = t.clone(); tt.needsUpdate = true; tt.repeat.set(rx, ry);
    const m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), lam({ map: tt }));
    m.position.set(x, y, z); g.add(m); return m;
  };
  // vereda estándar en San Luis: baldosas junto a la línea municipal + franja de pasto sin tocar el cordón
  const veredaSL = (xW, xE, pave = '#c7bfb0', gr = '#6a8b42') => {
    flat.rect(xW, ZL - 1.65, xE, ZL, .206, pave);
    flat.rect(xW, CURB, xE, ZL - 1.65, .205, gr);
  };
  const entradaSL = (xW, xE, col = '#c5beb0') => flat.rect(xW, CURB, xE, ZL, .2068, col);
  const cesto = (x, z, dark = false) => {
    const g = group(x, z);
    poleIn(g, [0, 0, 0], [0, .72, 0], .035, dark ? '#2a2c2e' : '#7a6856');
    bx(g, 0, .72, 0, .82, .48, .44, dark ? '#252729' : '#6c6256');
    addCol(x - .12, z - .12, x + .12, z + .12);
  };
  const PELADO = ['#9b7946', '#88673a', '#a88450'];
  const VERDE = ['#3f6c2b', '#4d7c34', '#365e24'];
  const COPA_OSC = ['#2a4d1e', '#335c24', '#234218'];

  // Textura de ladrillo visto rústico (galpón Peyrano Diesel y pilares)
  const brickTex = tex((x, W, H) => {
    x.fillStyle = '#c9a68b'; x.fillRect(0, 0, W, H);
    for (let r = 0; r < 16; r++) for (let k = -1; k < 10; k++) {
      const px = k * 28 + (r % 2) * 14, py = r * 8;
      x.fillStyle = pick(['#b87152', '#a86045', '#c58464', '#9a543c', '#cf9c7e']);
      x.fillRect(px + 1, py + 1, 26, 6);
    }
  });
  // Textura de chapa acanalada galvanizada
  const chapaTex = tex((x, W, H) => {
    x.fillStyle = '#b9c1be'; x.fillRect(0, 0, W, H);
    for (let px = 0; px < W; px += 8) {
      x.fillStyle = 'rgba(70,78,76,.22)'; x.fillRect(px, 0, 3, H);
      x.fillStyle = 'rgba(245,248,246,.22)'; x.fillRect(px + 3, 0, 2, H);
    }
  }, 128, 128);

  // =========================================================================
  // 1) Casa retirada blanca detrás de reja negra + portón de chapa rojiza (x = -23.5 .. -34.5, w = 11.0 m) — sv1 & sv2
  // =========================================================================
  {
    const { g, w, cx, Wd } = casa(-23.5, -34.5);   // local -5.5..5.5 (+x hacia oeste)
    // frente sobre línea municipal: reja vertical negra con postes oxidados + portoncito + pilar de ladrillo + portón de chapa rojiza
    const fencePosts = [-5.4, -3.5, -1.6, .2, 1.3, 2.3];
    for (const px of fencePosts) bx(g, px, 0, -.08, .08, 1.65, .08, '#7a5240');
    rejaV(g, -2.6, 0, -.08, 5.6, 1.58, '#282a2c', .12);
    rejaV(g, .75, 0, -.06, 1.0, 1.55, '#303234', .11);   // portoncito peatonal
    rejaV(g, 1.8, 0, -.08, .95, 1.58, '#282a2c', .12);
    bx(g, 2.6, 0, -.12, .65, 2.05, .32, '#b06e50');      // pilar de ladrillo
    bx(g, 4.15, 0, -.10, 2.5, 1.98, .07, '#a55244');     // portón de chapa acanalada rojiza
    for (let px = 3.0; px < 5.35; px += .22) bx(g, px, .02, -.06, .04, 1.94, .02, '#843e32');
    bx(g, 5.42, 0, -.12, .18, 2.05, .28, '#4a6b34');     // enredadera trepando junto al galpón
    colLocal(g, -5.5, -.25, 5.5, .05, null);

    // jardín delantero verde con sendero al porche y farolito negro
    rectL(Wd, -5.4, -.2, 5.4, -7.2, .048, '#678c40');
    rectL(Wd, .2, -.2, 1.4, -7.2, .054, '#c7bfb0');
    poleIn(g, [.05, 0, -4.5], [.05, 2.3, -4.5], .04, '#242628');
    bx(g, .05, 2.3, -4.5, .24, .32, .24, '#242628');
    for (const [lx, lz, s] of [[-4.0, -3.5, .75], [-2.0, -5.8, .65], [1.9, -4.6, .7]]) addBush(...Wd(lx, lz), s, .05);

    // casa moderna baja retirada (encaja limpia entre el almacén y la casita trasera de D)
    body(g, -4.6, 2.0, 7.2, 12.6, 3.0, '#efece5');
    body(g, 2.0, 4.5, 8.8, 12.6, 3.25, '#ece9e1');
    bx(g, -.05, 2.95, -7.15, 9.2, .28, .4, '#bdb9ae');   // cenefa plana grisácea
    bx(g, 3.25, 2.85, -7.8, 2.6, .42, 2.0, '#efece5');   // techo del porche derecho
    bx(g, 4.38, 0, -7.1, .28, 2.9, .28, '#efece5');      // columna derecha del porche
    // zócalo de ladrillo/piedra claro + 4 ventanales horizontales con rejas blancas
    bx(g, -1.3, 0, -7.18, 6.5, .95, .05, '#c9b398');
    for (const wx of [-3.7, -2.2, -.5, .95]) {
      bx(g, wx, 1.05, -7.17, 1.15, 1.05, .04, '#3b4a55');
      rejaV(g, wx, 1.05, -7.12, 1.15, 1.05, '#eceae4', .16);
    }
    bx(g, 3.25, 1.1, -8.76, 1.2, 1.0, .04, '#3b4a55');
    rejaV(g, 3.25, 1.1, -8.71, 1.2, 1.0, '#2a2c2e', .15);

    // vereda (sv1-sv2): pasto ancho, sendero de hormigón, poste blanco/rojo, dos arbolitos y cesto de alambre
    veredaSL(-34.5, -23.5, '#c6bfb2', '#688c3e');
    poles.add(-25.4, 0, -237.2, .13, 8.2, .13, 0, '#eceae4');
    poles.add(-25.4, 0, -237.2, .15, 2.4, .15, 0, '#c8684e');
    addCol(-25.55, -237.35, -25.25, -237.05);
    addTree(-24.6, -236.6, .82, false, PELADO);
    addTree(-33.4, -236.9, .88, false, PELADO);
    cesto(-31.7, -236.9, false);
  }

  // =========================================================================
  // 2) PEYRANO DIESEL — Galpón parabólico grande (x = -34.5 .. -44.5, w = 10.0 m, depth = 18.5 m) — sv3
  // =========================================================================
  {
    const { g, w, cx } = casa(-34.5, -44.5);   // local -5.0..5.0
    const D = 18.5, HE = 4.55, HR = 1.65;
    // cuerpo lateral + fondo del galpón (deja el hueco central de los portones abierto con profundidad visible)
    body(g, -5.0, -1.7, 0, D, HE, '#a8684c');
    body(g, 1.7, 5.0, 0, D, HE, '#a8684c');
    body(g, -1.7, 1.7, 3.8, D, HE, '#4a4e50');
    bx(g, 0, .02, -1.9, 3.4, .06, 3.8, '#b8b2a6');       // piso de hormigón del ingreso
    bx(g, 0, 0, -3.5, 3.2, 2.35, .12, '#7d8a72');        // portón interno verde oliva del fondo del vano
    // frente izquierdo/central: portones corredizos altos de chapa galvanizada + riel rojo arriba
    bx(g, -3.3, 0, .06, 3.35, HE - .1, .12, '#b9c1be');
    plano(g, -3.3, (HE - .1) / 2, .13, 3.35, HE - .1, chapaTex, 3.2, 2.2);
    bx(g, 2.05, 0, .06, 2.8, HE - .1, .12, '#b9c1be');
    plano(g, 2.05, (HE - .1) / 2, .13, 2.8, HE - .1, chapaTex, 2.8, 2.2);
    bx(g, 1.05, 0, .14, .82, 2.05, .04, '#aeb6b3');      // puertita peatonal en la hoja derecha
    bx(g, 0, HE - .04, .12, w + .1, .14, .18, '#b54c36');// riel superior rojo óxido
    // paño derecho de ladrillo visto
    plano(g, 4.22, HE / 2, .02, 1.56, HE, brickTex, 1.1, 3.0);
    // techo parabólico de chapa (gris plateado adelante, tonos oxidados arriba como en el satélite)
    {
      const W2 = w / 2;
      const top = x => HE + HR * Math.sqrt(Math.max(0, 1 - (x / W2) ** 2));
      const sh = new THREE.Shape();
      sh.moveTo(-W2, HE);
      for (let k = 0; k <= 24; k++) { const px = -W2 + (2 * W2 * k) / 24; sh.lineTo(px, top(px)); }
      sh.lineTo(W2, HE); sh.closePath();
      const archFront = new THREE.Mesh(new THREE.ExtrudeGeometry(sh, { depth: .22, bevelEnabled: false }), lam({ map: chapaTex }));
      archFront.position.z = -.18; archFront.castShadow = archFront.receiveShadow = true; g.add(archFront);
      const archRoof = new THREE.Mesh(new THREE.ExtrudeGeometry(sh, { depth: D, bevelEnabled: false }), lam({ color: '#8f5e4a' }));
      archRoof.position.z = -D; archRoof.castShadow = archRoof.receiveShadow = true; g.add(archRoof);
      // franjas de chapa clara alternadas con óxido en la bóveda (tal cual satélite)
      for (let dz = 1.2; dz < D - .5; dz += 2.6) {
        const stripe = new THREE.Mesh(new THREE.ExtrudeGeometry(sh, { depth: 1.0, bevelEnabled: false }), lam({ color: '#a89f96' }));
        stripe.position.set(0, .025, -dz - 1.0); g.add(stripe);
      }
    }
    // vereda: bajada de hormigón ancha frente al portón + poste de madera a la izquierda
    veredaSL(-44.5, -34.5, '#c7bfb0', '#698c40');
    entradaSL(-43.8, -36.8, '#c7c1b4');
    poles.add(-34.7, 0, -234.8, .12, 7.6, .12, 0, '#8d8272');
    addCol(-34.85, -234.95, -34.55, -234.65);
    mapLabels.push([cx, ZL + 8.5, 'Peyrano Diesel']);
  }

  // =========================================================================
  // 3) Chalet blanco con cenefa y canteros terracota + cochera de madera (x = -44.5 .. -54.5, w = 10.0 m) — sv4
  // =========================================================================
  {
    const { g, w, cx, Wd } = casa(-44.5, -54.5);   // local -5.0..5.0
    const WH = '#f5f4f0', TER = '#d3765b', MAD = '#b87644', F = 3.5;
    // patio frontal embaldosado beige claro + pared lateral izquierda (con farolito) y derecha alta
    rectL(Wd, -5.0, 0, 5.0, -F, .058, '#d4cdc0');
    bx(g, -4.88, 0, -F / 2, .24, 3.05, F, WH); colLocal(g, -5.0, -F, -4.75, 0, null);
    bx(g, -4.74, 2.2, -1.6, .14, .22, .16, '#7a4834');   // farolito lateral
    bx(g, 4.88, 0, -F / 2, .24, 3.85, F, WH); colLocal(g, 4.75, -F, 5.0, 0, null);

    // cochera izquierda (local -4.75 .. -1.45, w = 3.3 m)
    body(g, -4.75, -1.45, F, 14.2, 2.95, WH);
    bx(g, -3.1, 2.65, -F + .08, 3.35, .42, .22, TER);    // cenefa terracota
    bx(g, -3.1, 0, -F + .04, 2.85, 2.25, .07, MAD);      // portón de madera de 4 hojas
    for (const sx of [-4.45, -3.77, -3.1, -2.42, -1.75]) bx(g, sx, 0, -F + .09, .05, 2.25, .03, '#8c5328');
    for (const gx of [-4.11, -3.43, -2.76, -2.08]) bx(g, gx, 1.35, -F + .09, .46, .68, .02, '#435461');

    // cuerpo principal blanco con techo a dos aguas suave y cenefa terracota (local -1.45 .. 4.75)
    body(g, -1.45, 1.8, F, 14.5, 3.1, WH);
    body(g, 1.8, 4.75, F + 1.4, 14.5, 3.1, WH);          // galería/retiro de la entrada a la derecha
    // frontón triangular + techo inclinado con borde terracota
    {
      const sh = new THREE.Shape([new THREE.Vector2(-1.6, 0), new THREE.Vector2(4.8, 0), new THREE.Vector2(1.85, 1.15)]);
      const roof = new THREE.Mesh(new THREE.ExtrudeGeometry(sh, { depth: 11.4, bevelEnabled: false }), lam({ color: '#d8d4cb' }));
      roof.position.set(0, 3.05, -14.6); roof.castShadow = roof.receiveShadow = true; g.add(roof);
      const fascia = new THREE.Mesh(new THREE.ExtrudeGeometry(sh, { depth: .26, bevelEnabled: false }), lam({ color: TER }));
      fascia.position.set(0, 3.12, -F - .02); g.add(fascia);
      // triángulo blanco debajo de la cenefa
      const triW = new THREE.Shape([new THREE.Vector2(-1.45, 0), new THREE.Vector2(1.8, 0), new THREE.Vector2(1.8, .92)]);
      const wallTop = new THREE.Mesh(new THREE.ExtrudeGeometry(triW, { depth: .2, bevelEnabled: false }), lam({ color: WH }));
      wallTop.position.set(0, 3.0, -F - .2); g.add(wallTop);
    }
    // ventana izquierda con postigos de madera marrón-naranja
    bx(g, .15, 1.05, -F + .04, 1.65, 1.2, .05, '#3b4a55');
    for (const s of [-1, 1]) bx(g, .15 + s * .68, 1.05, -F + .09, .42, 1.2, .04, '#b85c32');
    // entrada y segunda ventana en el porche derecho
    bx(g, 2.35, 0, -F - 1.35, .88, 2.15, .05, '#b85c32');
    bx(g, 3.5, 1.05, -F - 1.35, 1.1, 1.15, .05, '#b85c32');
    // canteros bajos terracota con plantitas + nicho de medidor a la izquierda
    bx(g, .35, 0, -F + .45, 3.3, .58, .75, TER);
    bx(g, .35, .58, -F + .45, 3.1, .04, .58, '#4e6f33');
    bx(g, -1.0, .14, -F + .83, .45, .42, .04, '#b8b4ac');
    bx(g, 3.5, 0, -F + .45, 2.2, .58, .75, TER);
    bx(g, 3.5, .58, -F + .45, 2.0, .04, .58, '#4e6f33');
    for (const [lx, lz, s] of [[-.6, -F + .45, .42], [.4, -F + .45, .45], [1.4, -F + .45, .4], [3.5, -F + .45, .52]]) addBush(...Wd(lx, lz), s, .55);

    // vereda (sv4): baldosas crema, pasto + 2 huellas de coche al garaje + sendero peatonal a la derecha, árbol grande y cesto negro
    veredaSL(-54.5, -44.5, '#d4cdc0', '#7c8b48');
    entradaSL(-45.5, -44.8, '#c6bfb2');
    entradaSL(-47.5, -46.8, '#c6bfb2');
    entradaSL(-54.2, -53.4, '#c6bfb2');
    addTree(-51.6, -236.7, 1.25, false, PELADO);
    cesto(-53.8, -236.7, true);
  }

  // =========================================================================
  // 4) Portón grande de chapa galvanizada + garaje blanco oxidado (x = -54.5 .. -60.5, w = 6.0 m) — sv5
  // =========================================================================
  {
    const { g, w, cx, Wd } = casa(-54.5, -60.5);   // local -3.0..3.0
    const WH = '#f2f1ec';
    // izquierda (local -3.0 .. .65, 3.65 m): portón grande de chapa galvanizada + galería/cochera abierta detrás
    bx(g, -1.18, 0, -.08, 3.55, 2.28, .08, '#c6cecc');
    plano(g, -1.18, 1.14, -.03, 3.55, 2.28, chapaTex, 3.5, 1.6);
    bx(g, -2.55, 0, -.02, .72, 1.9, .04, '#b4bcba');     // puertita peatonal integrada
    bx(g, -1.18, 2.75, -4.0, 3.6, .48, 8.0, WH);         // losa techo de la galería pasante
    bx(g, -2.88, 0, -4.0, .24, 3.0, 8.0, '#e5e3dc');
    bx(g, .55, 0, -4.0, .24, 3.0, 8.0, '#e5e3dc');
    rectL(Wd, -2.85, -.1, .55, -8.5, .055, '#c5beb2');
    colLocal(g, -3.0, -.25, .65, .05, null);

    // derecha (local .65 .. 3.0, 2.35 m): garaje blanco con portón de 3 hojas oxidado y 3 ventanitas con reja
    body(g, .65, 3.0, 0, 10.5, 3.15, WH);
    bx(g, 1.82, 0, .03, 1.98, 2.15, .05, '#e8e5dc');
    for (const sx of [1.16, 1.82, 2.48]) {
      bx(g, sx, 1.62, .07, .50, .38, .02, '#4a555c');    // ventanitas altas
      bx(g, sx, .25, .065, .48, .9, .01, '#b8764c');     // manchas de óxido abajo
    }
    for (const sx of [1.49, 2.15]) bx(g, sx, 0, .07, .03, 2.15, .02, '#8a684e');

    // vereda toda de hormigón (bajada vehicular doble) + poste de madera entre ambos portones
    entradaSL(-60.5, -54.5, '#c7bfb2');
    poles.add(-58.2, 0, -234.8, .12, 7.8, .12, 0, '#8d8272');
    addCol(-58.35, -234.95, -58.05, -234.65);
  }

  // =========================================================================
  // 5) Casa crema con galería y alero de tejas coloniales (x = -60.5 .. -65.5, w = 5.0 m) — sv5 & sv6
  // =========================================================================
  {
    const { g, w, cx, Wd } = casa(-60.5, -65.5);   // local -2.5..2.5
    const CRE = '#eee6d4', TEJ = '#c4643f';
    // lado izquierdo: porche/galería cubierta con alero de tejas y pilar crema
    body(g, -2.5, -.2, 2.1, 13.5, 3.45, CRE);
    body(g, -.2, 2.5, 0, 13.5, 3.65, CRE);
    bx(g, 1.15, 3.65, -.1, 2.75, .22, .3, '#dcd4c2');
    bx(g, -2.32, 0, -.25, .36, 2.45, .5, CRE);           // pilar izquierdo del porche
    boxIn(g, -1.35, 2.55, -.95, 2.45, .14, 2.45, TEJ, -.24);  // techo inclinado de tejas de la galería
    for (let k = 0; k < 7; k++) boxIn(g, -2.4 + k * .35, 2.63, -.95, .08, .10, 2.45, '#a64d2c', -.24);
    // aire acondicionado blanco sobre la galería
    bx(g, -.45, 2.95, -.9, .72, .48, .28, '#f0efeb');
    // puerta de madera + ventana con persiana crema dentro del porche
    bx(g, -.72, 0, -2.06, .85, 2.1, .05, '#9e5d38');
    bx(g, -1.75, 1.05, -2.06, 1.05, 1.1, .05, '#dfd7c5');
    rectL(Wd, -2.5, 0, -.2, -2.1, .058, '#c5beb0');
    // lado derecho: pared crema con ventana cerrada blanca + alerito de tejas a dos aguas
    bx(g, 1.15, 1.05, .03, 1.25, 1.15, .05, '#f2f1ec');
    boxIn(g, .5, 2.62, .18, 1.5, .12, .45, TEJ, -.15, .18);
    boxIn(g, 1.8, 2.62, .18, 1.5, .12, .45, TEJ, -.15, -.18);
    veredaSL(-65.5, -60.5, '#d4c9b2', '#6f8d42');
    addTree(-63.8, -236.8, 1.15, false, PELADO);
  }

  // =========================================================================
  // 6) "La pelu de viki" (VG Peluquería) — frente blanco comercial (x = -65.5 .. -69.5, w = 4.0 m) — sv6
  // =========================================================================
  {
    const { g, w, cx } = casa(-65.5, -69.5);   // local -2.0..2.0
    const WH = '#f7f5f2', PIE = '#dfccc0';
    body(g, -2.0, 2.0, 0, 13.5, 3.45, WH);
    bx(g, 0, 3.05, .04, w, .42, .08, PIE);               // guarda superior rosada/arena
    bx(g, 0, 0, .04, w, .36, .08, PIE);                  // zócalo inferior
    // puerta vidriada con marco de madera y vinilo "VG" a la izquierda
    bx(g, -.95, 0, .03, 1.38, 2.32, .06, '#7d5438');
    const vgTex = tex((x, W, H) => {
      x.fillStyle = '#5c4636'; x.fillRect(0, 0, W, H);
      x.fillStyle = '#f5f4f0'; x.beginPath(); x.ellipse(W / 2, H * .48, W * .38, H * .34, 0, 0, 7); x.fill();
      x.fillStyle = '#2d2926'; x.font = 'bold 62px Georgia, serif'; x.textAlign = 'center';
      x.fillText('VG', W / 2, H * .58);
    }, 128, 192);
    plano(g, -.95, 1.16, .08, 1.12, 2.1, vgTex);
    // vidriera derecha con vinilo esmerilado "Peluquería"
    bx(g, .95, .62, .03, 1.52, 1.72, .06, '#6e4e38');
    const peluTex = tex((x, W, H) => {
      x.fillStyle = '#4f463d'; x.fillRect(0, 0, W, H);
      x.fillStyle = '#e7e4de'; x.fillRect(0, H * .25, W, H * .62);
      x.fillStyle = '#4e4a45'; x.font = 'italic 24px Georgia, serif'; x.fillText('Peluquería', 18, H * .44);
      x.strokeStyle = '#7c7872'; x.lineWidth = 2;
      for (let k = 0; k < 4; k++) { x.beginPath(); x.arc(55 + k * 45, H * .68, 18, 0, 7); x.stroke(); }
    }, 256, 192);
    plano(g, .95, 1.48, .08, 1.38, 1.58, peluTex);

    veredaSL(-69.5, -65.5, '#d4c9b2', '#6f8d42');
    entradaSL(-67.2, -66.1, '#c5beb0');
    cesto(-65.8, -236.8, true);
    mapLabels.push([cx, ZL + 6.5, 'La pelu de viki']);
  }

  // =========================================================================
  // 7) Casa blanca con faja de ladrillo visto, portón marrón y cartel VENDO (x = -69.5 .. -78.5, w = 9.0 m) — sv7
  // =========================================================================
  {
    const { g, w, cx } = casa(-69.5, -78.5);   // local -4.5..4.5
    const WH = '#f2f1ed', PAR = '#cfc9bc', LAD = '#c46c54';
    body(g, -4.5, 4.5, 0, 14.0, 3.65, WH);
    bx(g, 0, 3.15, .02, w, .52, .08, PAR);               // parapeto superior grisáceo gastado
    bx(g, 0, 2.52, .05, w + .06, .62, .12, LAD);         // faja continua de ladrillo visto naranja
    for (let y = 2.62; y < 3.12; y += .14) bx(g, 0, y, .12, w, .018, .01, '#a3523c');
    // portón de garaje de madera marrón claro de 4 hojas a la izquierda (local -4.1 .. -1.9)
    bx(g, -3.0, 0, .04, 2.2, 2.28, .06, '#a88464');
    for (const sx of [-3.55, -3.0, -2.45]) bx(g, sx, 0, .08, .035, 2.28, .02, '#7d5f46');
    // ventana central con reja blanca (local -.2)
    bx(g, -.15, .92, .04, 1.45, 1.38, .05, '#3b4a55');
    rejaV(g, -.15, .92, .10, 1.45, 1.38, '#eceae4', .13);
    // puerta de madera rojiza con paño lateral enrejado (local 1.55)
    bx(g, 1.55, 0, .03, 1.15, 2.22, .06, '#6e3a28');
    bx(g, 1.7, 0, .06, .78, 2.18, .04, '#a64d36');
    rejaV(g, 1.12, 0, .09, .26, 2.18, '#383838', .09);
    // ventana derecha con reja blanca y cartel rojo/blanco "VENDO" (local 3.35)
    bx(g, 3.35, .92, .04, 1.35, 1.38, .05, '#3b4a55');
    rejaV(g, 3.35, .92, .10, 1.35, 1.38, '#eceae4', .13);
    signIn(g, 'VENDO', 3.22, 1.28, .13, .68, .48, '#f5f4f0', '#cc2824');

    veredaSL(-78.5, -69.5, '#c9c2b4', '#728c44');
    entradaSL(-72.8, -69.8, '#c5beb0');
    addTree(-73.5, -236.8, 1.2, false, PELADO);
    poles.add(-75.2, 0, -234.8, .12, 7.6, .12, 0, '#9a9488');
    addCol(-75.35, -234.95, -75.05, -234.65);
  }

  // =========================================================================
  // 8) Terreno baldío de la esquina San Luis y Córdoba (x = -78.5 .. -89.5, z = -234.5 .. -216.5) — sv8
  // =========================================================================
  {
    const XW = -89.5, XE = -78.5, ZN = -234.5, ZS = -216.5;
    const TAP = '#cdc6b6';
    flat.rect(XW, ZN, XE, ZS, .046, '#5c843c');
    mapRects.push([XW, ZN, XE, ZS, '#5c843c']);
    // tapial revocado gastado (h = 1.65 m) + alambrado arriba sobre San Luis y Córdoba
    box((XW + XE) / 2, 0, ZN + .15, XE - XW, 1.65, .3, TAP);
    addCol(XW, ZN, XE, ZN + .35);
    box(XW + .15, 0, (ZN + ZS) / 2, .3, 1.65, ZS - ZN, TAP);
    addCol(XW, ZN, XW + .35, ZS);
    // malla metálica sobre el tapial
    const wireMat = new THREE.MeshLambertMaterial({ color: 0x5c645e, transparent: true, opacity: .35, side: THREE.DoubleSide });
    const wN = new THREE.Mesh(new THREE.PlaneGeometry(XE - XW, .85), wireMat);
    wN.position.set((XW + XE) / 2, 2.08, ZN + .15); scene.add(wN);
    const wW = new THREE.Mesh(new THREE.PlaneGeometry(ZS - ZN, .85), wireMat);
    wW.position.set(XW + .15, 2.08, (ZN + ZS) / 2); wW.rotation.y = Math.PI / 2; scene.add(wW);
    // medianera sur y este del terreno
    box((XW + XE) / 2, 0, ZS - .12, XE - XW, 2.05, .24, '#c4bdb0');
    addCol(XW, ZS - .25, XE, ZS);
    // arboleda y matorrales tupidos adentro del baldío (como en sv8 y el satélite)
    for (const [tx, tz, ts, col] of [
      [-81.2, -230.2, 1.25, COPA_OSC], [-85.5, -229.8, 1.35, COPA_OSC],
      [-83.2, -225.2, 1.2, VERDE],     [-87.2, -224.0, 1.15, COPA_OSC],
      [-81.0, -221.0, 1.1, VERDE],     [-85.8, -219.5, 1.05, VERDE]
    ]) addTree(tx, tz, ts, false, col);
    for (const [bx0, bz0, bs] of [[-79.8, -232.0, .95], [-84.0, -232.4, 1.0], [-87.8, -231.2, .9], [-82.0, -218.5, .85]]) addBush(bx0, bz0, bs, .05);

    // vereda sobre San Luis (sv8: baldosas grises, franja de pasto, árbol y poste blanco de luminaria) + Córdoba
    veredaSL(XW, XE, '#c4bdb0', '#6a8b40');
    flat.rect(-92.88, ZN, XW, ZS, .205, '#6a8b40');
    flat.rect(XW - 1.65, ZN, XW, ZS, .206, '#c4bdb0');
    addTree(-81.6, -236.7, 1.15, false, PELADO);
    poles.add(-84.5, 0, -237.2, .13, 8.2, .13, 0, '#f0efeb');
    addCol(-84.65, -237.35, -84.35, -237.05);
    poles.add(-89.3, 0, -234.8, .12, 7.8, .12, 0, '#8d8272');
    addCol(-89.45, -234.95, -89.15, -234.65);
  }

  // =========================================================================
  // 9) Pulmón interno de manzana: jardín grande con PILETA EN L, anexos, medianeras y arboleda (satélite)
  // =========================================================================
  {
    const med = (x0, z0, x1, z1, h = 2.15, col = '#cfc7b8') => {
      box((x0 + x1) / 2, 0, (z0 + z1) / 2, x1 - x0, h, z1 - z0, col);
      addCol(x0, z0, x1, z1, h);
    };
    const annex = (x0, z0, x1, z1, h, wCol, rCol) => {
      box((x0 + x1) / 2, 0, (z0 + z1) / 2, x1 - x0, h, z1 - z0, wCol);
      box((x0 + x1) / 2, h, (z0 + z1) / 2, x1 - x0 + .2, .18, z1 - z0 + .2, rCol);
      addCol(x0, z0, x1, z1, h + .4);
      mapRects.push([x0, z0, x1, z1, rCol]);
    };

    // Base verde de los dos patios internos (oeste con pileta en L + este detrás del chalet/galpón)
    flat.rect(-71.5, -216.5, -51.8, -172.0, .036, '#5c843c');
    flat.rect(-51.8, -216.5, -35.2, -183.0, .038, '#679044');
    // patio de baldosas detrás del chalet (sv4) y el portón de chapa (sv5)
    flat.rect(-58.5, -220.5, -45.5, -212.0, .046, '#c8c1b4');

    // ---- Pileta en L (ver vista satelital: lado oeste del pulmón, con borde crema y agua turquesa) ----
    // Brazo principal N-S: x = -65.2..-62.0, z = -191.5..-184.0 | Brazo lateral E: x = -62.0..-59.2, z = -191.5..-188.3
    flat.rect(-65.7, -192.0, -61.5, -183.5, .054, '#e7e2d6');   // veredín crema brazo principal
    flat.rect(-62.0, -192.0, -58.7, -187.8, .055, '#e7e2d6');   // veredín crema brazo lateral
    flat.rect(-65.2, -191.5, -62.0, -184.0, .064, '#36a2d6');   // agua brazo principal
    flat.rect(-62.2, -191.5, -59.2, -188.3, .065, '#36a2d6');   // agua brazo lateral
    flat.rect(-67.8, -191.2, -65.7, -185.0, .050, '#d5cec0');   // solárium junto a la pileta
    addCol(-65.4, -191.7, -61.8, -183.8, .5);
    addCol(-62.0, -191.7, -59.0, -188.1, .5);
    mapRects.push([-65.4, -191.7, -61.8, -183.8, '#36a2d6'], [-62.0, -191.7, -59.0, -188.1, '#36a2d6']);

    // Anexos / quinchos traseros visibles en el satélite
    annex(-67.8, -179.5, -60.5, -173.2, 2.9, '#e5e0d5', '#585d62');   // quincho de techo gris oscuro al sur de la pileta
    annex(-47.2, -189.2, -39.5, -183.2, 3.0, '#ddd8cd', '#4b5056');   // anexo oscuro al sudeste del patio

    // Medianeras divisorias del pulmón interno
    med(-71.5, -216.5, -71.26, -172.0, 2.15, '#c9c2b4');   // límite oeste (con las casas de Córdoba)
    med(-52.0, -216.0, -51.76, -172.0, 2.15, '#d2cbc0');   // divisoria central entre el patio de la pileta y el patio este
    med(-71.5, -172.24, -48.0, -172.0, 2.15, '#c7bfb0');   // límite sur (con Jujuy / Comisaría)
    med(-51.8, -183.24, -35.2, -183.0, 2.15, '#cbc4b6');   // cierre sur del patio este
    med(-35.44, -216.0, -35.2, -183.0, 2.15, '#c9947a');   // cierre este (separa de la zona de la antena/Correo)

    // Arboleda tupida del pulmón interno (coincide con las copas oscuras del satélite)
    for (const [tx, tz, ts, col] of [
      [-68.0, -206.5, 1.4, COPA_OSC], [-63.2, -204.0, 1.35, COPA_OSC], [-58.0, -206.0, 1.25, VERDE],
      [-55.2, -198.5, 1.35, COPA_OSC], [-56.8, -193.0, 1.15, VERDE],   [-68.5, -196.5, 1.25, VERDE],
      [-55.0, -181.5, 1.3, COPA_OSC],  [-44.5, -198.0, 1.45, COPA_OSC], [-41.2, -204.5, 1.2, VERDE],
      [-48.0, -203.0, 1.15, VERDE],    [-38.5, -193.0, 1.2, COPA_OSC]
    ]) addTree(tx, tz, ts, false, col);

    // Excluir árboles y casas automáticas en todo el sector trabajado
    plazaRects.push([-89.6, -234.5, -23.5, -216.5]);
    plazaRects.push([-71.5, -216.5, -35.0, -183.0]);
    plazaRects.push([-71.5, -183.0, -48.0, -172.0]);
  }
}
