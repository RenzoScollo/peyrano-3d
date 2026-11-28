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
  // 1) Casa moderna blanca ancha detrás de reja negra + tapial derecho + portón de chapa rojiza (x = -19.3 .. -34.5, w = 15.2 m) — sv1, sv2 & sv_esq
  // =========================================================================
  {
    const { g, w, cx, Wd } = casa(-19.3, -34.5);   // local -7.6..7.6 (+x hacia oeste)
    // frente sobre línea municipal: reja vertical negra ancha con postes oxidados + portoncito + tapial de placas + pilar ladrillo + portón chapa rojiza
    const fencePosts = [-7.5, -5.2, -2.9, -.6, 1.5, 2.7, 3.85];
    for (const px of fencePosts) bx(g, px, 0, -.08, .08, 1.65, .08, '#7a5240');
    rejaV(g, -3.0, 0, -.08, 9.0, 1.58, '#282a2c', .12);
    rejaV(g, 2.1, 0, -.06, 1.1, 1.55, '#303234', .11);   // portoncito peatonal frente al porche
    rejaV(g, 3.28, 0, -.08, 1.1, 1.58, '#282a2c', .12);
    // tapial de placas premoldeadas derecho (separa el jardín del portón de chapa)
    bx(g, 3.92, 0, -3.6, .18, 2.0, 7.0, '#b4b1a8');
    for (let dz = -.3; dz > -6.8; dz -= 1.45) bx(g, 3.92, 0, dz, .24, 2.1, .16, '#928f88');
    colLocal(g, 3.78, -7.1, 4.06, 0, null);
    // pilar de ladrillo visto + portón de chapa acanalada rojiza + enredadera
    bx(g, 4.45, 0, -.14, 1.1, 2.05, .32, '#b87254');
    plano(g, 4.45, 1.02, .03, 1.1, 2.05, brickTex, .8, 1.4);
    bx(g, 6.25, 0, -.10, 2.55, 1.98, .07, '#a55244');
    for (let px = 5.05; px < 7.45; px += .22) bx(g, px, .02, -.06, .04, 1.94, .02, '#843e32');
    bx(g, 7.52, 0, -.12, .18, 2.05, .28, '#4a6b34');
    colLocal(g, -7.6, -.25, 7.6, .05, null);

    // jardín delantero verde ancho con sendero al porche y farolito negro
    rectL(Wd, -7.5, -.2, 7.5, -7.0, .048, '#678c40');
    rectL(Wd, 1.55, -.2, 2.75, -7.0, .054, '#c7bfb0');
    poleIn(g, [1.2, 0, -4.8], [1.2, 2.4, -4.8], .04, '#242628');
    bx(g, 1.2, 2.4, -4.8, .24, .32, .24, '#242628');
    for (const [lx, lz, s] of [[-5.6, -5.6, .65], [-3.8, -5.8, .7], [3.3, -2.5, .75], [3.2, -5.0, .65]]) addBush(...Wd(lx, lz), s, .05);

    // casa moderna blanca ancha (arranca pegada al tapial del patio de la esquina hasta el fondo del portón rojo)
    body(g, -7.45, 1.25, 6.9, 12.6, 2.98, '#efece5');    // cuerpo principal horizontal ancho (8.7 m)
    body(g, 1.25, 4.35, 8.8, 12.6, 3.28, '#ece9e1');     // fondo del porche cuadrado derecho
    body(g, 4.35, 7.4, 7.6, 12.6, 2.65, '#eae7df');      // anexo bajo a la derecha detrás del portón rojo
    bx(g, -3.1, 2.94, -6.85, 8.85, .28, .42, '#bdb9ae'); // cenefa plana gris del cuerpo principal
    bx(g, 2.8, 2.88, -7.75, 3.25, .44, 2.15, '#efece5'); // losa saliente del porche
    bx(g, 2.8, 3.26, -6.68, 3.3, .14, .22, '#bdb9ae');
    bx(g, 4.22, 0, -6.85, .30, 2.92, .30, '#efece5');    // columna derecha del porche
    bx(g, 1.38, 0, -6.85, .30, 2.92, .30, '#efece5');    // pilastra izquierda del porche
    // zócalo de ladrillo/piedra claro + 4 ventanales horizontales agrupados en dos pares (como en sv_esq)
    bx(g, -3.1, 0, -6.88, 8.7, .98, .05, '#c9b398');
    for (const wx of [-6.05, -4.5, -1.65, -.1]) {
      bx(g, wx, 1.06, -6.87, 1.25, 1.05, .04, '#3b4a55');
      rejaV(g, wx, 1.06, -6.82, 1.25, 1.05, '#eceae4', .16);
    }
    bx(g, 2.8, 1.08, -8.76, 1.55, 1.02, .04, '#3b4a55');
    rejaV(g, 2.8, 1.08, -8.71, 1.55, 1.02, '#2a2c2e', .15);

    // vereda (sv1-sv2-sv_esq): pasto ancho, sendero de hormigón, poste blanco/rojo, dos arbolitos y cesto de alambre
    veredaSL(-34.5, -19.3, '#c6bfb2', '#688c3e');
    poles.add(-21.2, 0, -237.2, .13, 8.2, .13, 0, '#eceae4');
    poles.add(-21.2, 0, -237.2, .15, 2.4, .15, 0, '#c8684e');
    addCol(-21.35, -237.35, -21.05, -237.05);
    addTree(-22.2, -236.6, .82, false, PELADO);
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
  // 5) Casa crema con galería y alero de tejas coloniales (x = -60.5 .. -65.0, w = 4.5 m) — sv5 & sv6
  // =========================================================================
  {
    const { g, w, cx, Wd } = casa(-60.5, -65.0);   // local -2.25..2.25
    const CRE = '#eee6d4', TEJ = '#c4643f';
    // lado izquierdo: porche/galería cubierta con alero de tejas y pilar crema
    body(g, -2.25, -.15, 2.1, 13.5, 3.45, CRE);
    body(g, -.15, 2.25, 0, 13.5, 3.65, CRE);
    bx(g, 1.05, 3.65, -.1, 2.45, .22, .3, '#dcd4c2');
    bx(g, -2.08, 0, -.25, .34, 2.45, .5, CRE);           // pilar izquierdo del porche
    boxIn(g, -1.2, 2.55, -.95, 2.2, .14, 2.45, TEJ, -.24);  // techo inclinado de tejas de la galería
    for (let k = 0; k < 6; k++) boxIn(g, -2.15 + k * .36, 2.63, -.95, .08, .10, 2.45, '#a64d2c', -.24);
    // aire acondicionado blanco sobre la galería
    bx(g, -.4, 2.95, -.9, .72, .48, .28, '#f0efeb');
    // puerta de madera + ventana con persiana crema dentro del porche
    bx(g, -.65, 0, -2.06, .82, 2.1, .05, '#9e5d38');
    bx(g, -1.6, 1.05, -2.06, .98, 1.1, .05, '#dfd7c5');
    rectL(Wd, -2.25, 0, -.15, -2.1, .058, '#c5beb0');
    // lado derecho: pared crema con ventana cerrada blanca + alerito de tejas a dos aguas
    bx(g, 1.05, 1.05, .03, 1.2, 1.15, .05, '#f2f1ec');
    boxIn(g, .45, 2.62, .18, 1.35, .12, .45, TEJ, -.15, .18);
    boxIn(g, 1.65, 2.62, .18, 1.35, .12, .45, TEJ, -.15, -.18);
    veredaSL(-65.0, -60.5, '#d9caa8', '#6f8d42');
    addTree(-63.7, -236.8, 1.15, false, PELADO);
  }

  // =========================================================================
  // 6) "La pelu de viki" (VG Peluquería) — frente blanco moderno con ingreso y vidriera rehundidos (x = -65.0 .. -69.6, w = 4.6 m) — sv_pelu
  // =========================================================================
  {
    const { g, w, cx, Wd } = casa(-65.0, -69.6);   // local -2.3..2.3 (+x hacia oeste)
    const WH = '#f7f4f0', PIE = '#d8c2b2', MAD = '#945f3e', MAD_D = '#6e452b';
    // cuerpo trasero (detrás del ingreso rehundido 0.65 m y la vidriera rehundida 0.28 m)
    body(g, -2.3, 2.3, .68, 13.5, 3.35, WH);
    // frente en línea municipal con huecos reales: pilastra izq (-2.3..-1.88), pilar central (-.28..+.28), pilastra der (+1.88..+2.3)
    bx(g, -2.09, 0, -.34, .42, 3.35, .68, WH);
    bx(g, 0, 0, -.34, .56, 3.35, .68, WH);
    bx(g, 2.09, 0, -.34, .42, 3.35, .68, WH);
    // dintel superior continuo arriba de puerta y vidriera (y = 2.28..3.35) + antepecho debajo de la vidriera derecha (y = 0..0.64)
    bx(g, 0, 2.28, -.34, w, 1.07, .68, WH);
    bx(g, 1.08, 0, -.34, 1.64, .64, .68, WH);
    // guarda superior de piedra travertino rosado/arena (y = 3.02..3.36) con juntas sutiles
    bx(g, 0, 3.02, .025, w + .02, .34, .05, PIE);
    for (let sx = -1.6; sx <= 1.7; sx += .78) bx(g, sx, 3.02, .055, .02, .34, .01, '#c1ab9b');
    // zócalo de piedra travertino (solo del pilar central hacia la derecha, como en sv_pelu)
    bx(g, 1.02, 0, .025, 2.58, .48, .05, PIE);
    bx(g, -2.09, 0, .025, .42, .48, .05, PIE);
    for (let sx = .15; sx <= 2.1; sx += .62) bx(g, sx, 0, .055, .02, .48, .01, '#c1ab9b');

    // ---- Ingreso rehundido (palier izquierdo: local -1.88 .. -0.28, profundidad 0.65 m) ----
    rectL(Wd, -1.88, 0, -.28, -.68, .062, '#d6c1a6');    // piso de baldosas cálidas del palier
    bx(g, -1.08, 2.26, -.34, 1.6, .04, .68, '#ece8e2');  // cielorraso del palier
    // carpintería de madera en el fondo del palier (-0.64): puerta vidriada izq (-1.82..-0.92) + paño lateral der (-0.92..-0.34)
    bx(g, -1.37, 0, -.62, .92, 2.26, .06, MAD);
    bx(g, -1.37, 0, -.58, .82, .44, .04, '#a66d48');     // tablero inferior de madera de la puerta
    const vgTex = tex((x, W, H) => {
      x.fillStyle = '#5a4334'; x.fillRect(0, 0, W, H);
      // óvalo blanco esmerilado con monograma VG clásico
      x.fillStyle = '#f6f5f2';
      x.beginPath(); x.ellipse(W * .50, H * .50, W * .42, H * .40, 0, 0, 7); x.fill();
      x.fillStyle = '#262422'; x.textAlign = 'center';
      x.font = 'bold 68px Georgia, serif'; x.fillText('V', W * .39, H * .62);
      x.font = 'bold 46px Georgia, serif'; x.fillText('G', W * .67, H * .50);
    }, 160, 224);
    plano(g, -1.37, 1.32, -.57, .74, 1.56, vgTex);
    bx(g, -1.02, 1.05, -.55, .04, .18, .05, '#c9b38a');  // picaporte
    // paño lateral vidriado derecho del ingreso
    bx(g, -.62, 0, -.62, .58, 2.26, .06, MAD);
    bx(g, -.62, 0, -.58, .50, .48, .04, '#9a6542');
    bx(g, -.62, .52, -.59, .44, 1.62, .03, '#4f4238');   // vidrio interior cálido

    // ---- Vidriera rehundida derecha (local +0.28 .. +1.88, y = 0.64..2.28, profundidad 0.28 m) ----
    bx(g, 1.08, .64, -.16, 1.60, .06, .34, '#e6d7c4');   // alféizar claro
    bx(g, 1.08, 2.08, -.14, 1.60, .20, .28, '#f0ede7');  // cajón de persiana blanco arriba
    bx(g, 1.08, .68, -.32, 1.56, 1.40, .06, MAD_D);      // marco de madera interior
    const peluTex = tex((x, W, H) => {
      x.fillStyle = '#473e36'; x.fillRect(0, 0, W, H);   // fondo interior oscuro arriba y abajo
      // franja esmerilada blanca traslúcida con texto "Peluquería" y dibujo floral (sv_pelu)
      x.fillStyle = '#e7e4df'; x.fillRect(0, H * .16, W, H * .68);
      x.fillStyle = '#5c5852'; x.font = 'italic 22px Georgia, serif'; x.fillText('Peluquería', 14, H * .34);
      x.strokeStyle = '#6e6a64'; x.lineWidth = 2;
      for (const [fx, fy, r] of [[85, 118, 24], [148, 104, 28], [208, 122, 22], [116, 146, 16]]) {
        for (let k = 0; k < 6; k++) {
          const a = k * Math.PI / 3;
          x.beginPath(); x.ellipse(fx + Math.cos(a) * r * .55, fy + Math.sin(a) * r * .55, r * .45, r * .22, a, 0, 7); x.stroke();
        }
      }
      // caballete de madera asomando abajo a la derecha (visible en sv_pelu)
      x.fillStyle = '#b48a5c'; x.fillRect(W * .78, H * .72, 8, H * .28); x.fillRect(W * .88, H * .72, 8, H * .28);
    }, 256, 192);
    plano(g, 1.08, 1.38, -.28, 1.50, 1.36, peluTex);

    // vereda acanalada beige, pasillo de cemento recto al ingreso y cesto negro perforado (sv_pelu)
    veredaSL(-69.6, -65.0, '#d9caa8', '#6f8d42');
    entradaSL(-67.6, -66.5, '#c5beb0');
    cesto(-65.85, -236.9, true);
    mapLabels.push([cx, ZL + 6.5, 'La pelu de viki']);
  }

  // =========================================================================
  // 7) Casa blanca con faja de ladrillo visto, portón marrón y cartel VENDO (x = -69.6 .. -78.5, w = 8.9 m) — sv7
  // =========================================================================
  {
    const { g, w, cx } = casa(-69.6, -78.5);   // local -4.45..4.45
    const WH = '#f2f1ed', PAR = '#cfc9bc', LAD = '#c46c54';
    body(g, -4.45, 4.45, 0, 14.0, 3.65, WH);
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

    veredaSL(-78.5, -69.6, '#c9c2b4', '#728c44');
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

    // vereda sobre San Luis (sv8: baldosas grises, franja de pasto, árbol y poste blanco de luminaria) + Córdoba (c1: dos árboles y cesto de madera con techito)
    veredaSL(XW, XE, '#c4bdb0', '#6a8b40');
    flat.rect(-92.88, ZN, XW, ZS, .205, '#6a8b40');
    flat.rect(XW - 1.65, ZN, XW, ZS, .206, '#c4bdb0');
    addTree(-81.6, -236.7, 1.15, false, PELADO);
    addTree(-92.0, -231.5, 1.15, false, PELADO);
    addTree(-92.0, -225.2, 1.15, false, PELADO);
    addTree(-92.0, -219.4, 1.15, false, PELADO);
    // cesto rústico de madera con techito a dos aguas en la esquina sur del baldío (c1/c2)
    { const cg = group(-91.8, -217.2); poleIn(cg, [0, 0, 0], [0, .82, 0], .05, '#6e5c48'); bx(cg, 0, .75, 0, .55, .52, .62, '#7d6c58');
      boxIn(cg, -.2, 1.38, 0, .44, .06, .72, '#3d5e42', 0, .55); boxIn(cg, .2, 1.38, 0, .44, .06, .72, '#3d5e42', 0, -.55); }
    poles.add(-84.5, 0, -237.2, .13, 8.2, .13, 0, '#f0efeb');
    addCol(-84.65, -237.35, -84.35, -237.05);
    poles.add(-89.3, 0, -234.8, .12, 7.8, .12, 0, '#8d8272');
    addCol(-89.45, -234.95, -89.15, -234.65);
  }

  // =========================================================================
  // 8B) CÓRDOBA LADO ESTE — de San Luis (baldío Lote 1) hasta la esquina de Jujuy (Lote 6) — fotos c2..c7 + satélite
  // =========================================================================
  {
    const XL = -89.5;     // línea municipal este de Córdoba · grupos con ry = -PI/2: local +z = calle (oeste), local +x = sur (derecha en las fotos)
    const CURB_C = -92.88;
    const casaC = (zN, zS) => {
      const zc = (zN + zS) / 2;
      return { g: group(XL, zc, -Math.PI / 2), w: zS - zN, zc, Wd: (lx, lz) => [XL - lz, zc + lx] };
    };
    const veredaC = (zN, zS, pave = '#cdc3b0', gr = '#6b8c42') => {
      flat.rect(XL - 1.75, zN, XL, zS, .206, pave);
      flat.rect(CURB_C, zN, XL - 1.75, zS, .205, gr);
    };
    const entradaC = (zN, zS, col = '#c6bfb2') => flat.rect(CURB_C, zN, XL, zS, .2068, col);
    const hipRoof = (g, x, y, z, w, h, d, col) => {
      const geo = new THREE.ConeGeometry(1, h, 4, 1); geo.rotateY(Math.PI / 4);
      const m = new THREE.Mesh(geo, lam({ color: col }));
      m.scale.set((w + .5) / Math.SQRT2, 1, (d + .5) / Math.SQRT2);
      m.position.set(x, y + h / 2, z); m.castShadow = m.receiveShadow = true; g.add(m);
    };

    // ---- Lote 2 (z = -216.5 .. -204.0, w = 12.5 m): Casa moderna blanca con columnas pareadas, friso de madera y Carpintería CG Garabello atrás (c2 & c3) ----
    {
      const { g, w, zc, Wd } = casaC(-216.5, -204.0);   // local -6.25..6.25
      const WH = '#f2f1ec', BEI = '#bfb28e', MAD = '#b4622e';
      // izquierda (-6.25..-3.0): entrada vehicular a Carpintería CG Garabello (pared con enredadera + portón rojo/marrón y reja "CG")
      rectL(Wd, -6.25, 0, -3.0, -10.5, .054, '#b8b1a4');
      bx(g, -6.12, 0, -5.2, .26, 2.2, 10.4, '#4c7536');   // muro norte cubierto de enredadera
      bx(g, -4.6, 0, -4.2, 3.1, 2.05, .08, '#9a4d36');    // portón de madera/chapa rojizo
      bx(g, -5.3, 0, -3.8, 1.35, 1.95, .08, '#5a5f64');   // hojita metálica gris con "CG"
      colLocal(g, -6.25, -4.4, -3.0, -3.7, null);

      // cuerpo principal casa blanca con galería y techo plano saliente (-3.0..+6.25)
      body(g, -2.8, 2.6, 2.4, 10.2, 3.12, WH);            // centro retirado detrás de la galería
      body(g, 2.6, 5.9, 1.2, 10.2, 3.12, WH);             // ala derecha adelantada
      bx(g, 1.5, 2.92, -5.1, 9.4, .34, 10.4, '#c4bfb4');  // losa techo plana saliente sobre la galería
      // pares de columnas beige características de la galería (izquierda y centro)
      for (const px of [-2.85, -2.35, -.15, .35]) bx(g, px, 0, -.35, .26, 2.94, .26, BEI);
      // friso horizontal de machimbre naranja-marrón + zócalo oliva abajo
      bx(g, .9, 2.15, -2.36, 3.55, .75, .06, MAD);
      bx(g, .9, 0, -2.36, 5.4, .65, .05, '#a49b76');
      bx(g, 4.25, 0, -1.16, 3.3, .65, .05, '#a49b76');
      // aberturas: puerta de madera izq, ventanal con persiana blanca, puerta principal de madera, ventanal derecho
      bx(g, -1.35, 0, -2.36, .88, 2.12, .05, '#9a542e');
      bx(g, .4, .75, -2.36, 1.85, 1.35, .05, '#e8e5dc');
      bx(g, 1.95, 0, -2.36, .92, 2.15, .06, '#a45b32');
      bx(g, 4.1, .75, -1.16, 2.1, 1.35, .05, '#e8e5dc');
      rectL(Wd, -3.0, 0, 6.2, -2.4, .058, '#c8c0b2');
      // murete bajo frontal con tranquera de troncos oscuros y pilares blancos
      bx(g, 1.5, 0, -.12, 9.0, .42, .22, '#d5d0c5');
      for (const px of [-3.0, -.5, 2.4, 6.1]) bx(g, px, 0, -.12, .38, .92, .38, '#dcd8ce');
      for (const [x0, x1] of [[-2.8, -.7], [-.3, 2.2], [2.6, 5.9]]) {
        bx(g, (x0 + x1) / 2, .56, -.12, x1 - x0, .06, .08, '#4e3c2e');
        bx(g, (x0 + x1) / 2, .78, -.12, x1 - x0, .06, .08, '#4e3c2e');
      }
      colLocal(g, -3.1, -.3, 6.25, .1, null);
      // yucas/palmeritas en el jardín derecho + tanque de agua blanco en torre metálica atrás
      for (const [lx, lz] of [[4.8, -.7], [5.4, -.9]]) { poleIn(g, [lx, 0, lz], [lx, 1.9, lz], .07, '#6b5a45'); addBush(...Wd(lx, lz), .58, 1.75); }
      for (const [dx, dz] of [[-.45, -.45], [.45, -.45], [-.45, .45], [.45, .45]]) poleIn(g, [0 + dx, 3.1, -9.2 + dz], [0 + dx * .55, 6.4, -9.2 + dz * .55], .035, '#8a8e92');
      cylIn(g, 0, 7.0, -9.2, .58, 1.15, '#e8e7e2');
      // galpón trasero de techo rojo terracota de Carpintería CG Garabello (satélite 2, limpio hasta x = -71.7)
      body(g, -6.0, 5.6, 10.6, 17.8, 3.55, '#dcd6ca');
      boxIn(g, -.2, 3.72, -14.2, 11.8, .22, 7.6, '#9e4e3c', .06);
      mapLabels.push([XL + 12, zc, 'Carpintería CG']);

      veredaC(-216.5, -204.0, '#cdbda5', '#6c8d40');
      entradaC(-216.4, -213.2, '#c5beb0');
      addTree(-92.0, -208.8, 1.2, false, PELADO);
      poles.add(-90.2, 0, -211.8, .12, 7.8, .12, 0, '#8d8272');
      addCol(-90.35, -211.95, -90.05, -211.65);
    }

    // ---- Lote 3 (z = -204.0 .. -191.5, w = 12.5 m): Casa blanca con techo de tejas en el centro, entrada de autos a la izq y murito blanco (c4) ----
    {
      const { g, w, zc, Wd } = casaC(-204.0, -191.5);   // local -6.25..6.25
      const WH = '#f2f1ec', TEJ = '#a9553c';
      // entrada de autos izquierda (-6.25..-3.1) con portón negro de reja y pilares blancos gastados
      rectL(Wd, -6.25, 0, -3.1, -11.5, .054, '#bdb7aa');
      bx(g, -5.95, 0, -.15, .65, 1.55, .36, '#dad6cc');
      bx(g, -2.95, 0, -.15, .75, 1.55, .36, '#dad6cc');
      rejaV(g, -4.45, .05, -.15, 2.6, 1.4, '#242a26', .14);
      // murete blanco con rejita negra y portoncito peatonal (-2.6..+6.25)
      bx(g, 1.8, 0, -.15, 8.8, .72, .26, '#dedad0');
      for (const px of [-2.4, -.55, .35, 3.1, 6.1]) bx(g, px, 0, -.15, .42, 1.45, .42, '#dcd8ce');
      rejaV(g, -.1, .05, -.15, .8, 1.25, '#242a26', .11);      // portoncito peatonal
      rejaV(g, 1.72, .72, -.15, 2.4, .58, '#242a26', .14);
      rejaV(g, 4.6, .72, -.15, 2.7, .58, '#242a26', .14);
      colLocal(g, -6.25, -.35, 6.25, .08, null);
      rectL(Wd, -3.1, -.2, 6.2, -3.6, .048, '#6a8b42');
      rectL(Wd, -.55, -.2, .4, -3.6, .056, '#c7bfb0');

      // casa blanca retirada 3.5 m: cuerpo central con techo de tejas a 4 aguas + ala derecha blanca de techo plano
      body(g, -2.5, 2.8, 3.5, 12.2, 2.95, WH);
      hipRoof(g, .15, 2.95, -7.8, 5.4, 1.45, 8.8, TEJ);
      body(g, 2.8, 5.8, 3.5, 12.2, 3.45, WH);
      bx(g, 4.3, 3.45, -7.8, 3.1, .24, 8.8, '#d4d0c6');
      // aberturas: ventanal grande bajo las tejas + puerta en sombra + ventana derecha con reja
      bx(g, .75, .95, -3.46, 2.0, 1.4, .05, '#3b4a55');
      bx(g, -1.2, 0, -3.46, .95, 2.15, .05, '#5a4a3a');
      bx(g, 4.3, .95, -3.46, 1.85, 1.4, .05, '#3b4a55');
      rejaV(g, 4.3, .95, -3.41, 1.85, 1.4, '#e5e4df', .18);
      // patio trasero verde hasta el límite del pulmón interno (x = -71.6)
      rectL(Wd, -6.0, -12.2, 6.0, -17.8, .042, '#628a40');
      addTree(XL + 14.5, zc + 2.5, 1.1, false, VERDE);

      veredaC(-204.0, -191.5, '#d4c3a8', '#6c8d40');
      entradaC(-203.8, -200.6, '#d4c3a8');
      entradaC(-198.2, -197.1, '#c5beb0');
      addTree(-92.0, -203.2, 1.15, false, PELADO);
      addTree(-92.0, -196.2, 1.2, false, PELADO);
    }

    // ---- Lote 4 (z = -191.5 .. -178.0, w = 13.5 m): Chalet ocre/mostaza con techo de tejas grises y pilares de ladrillo (c5) ----
    {
      const { g, w, zc, Wd } = casaC(-191.5, -178.0);   // local -6.75..6.75
      const OCR = '#b68a48', LAD = '#b89476', TEJG = '#7c7a76';
      // frente sobre línea municipal: 4 pilares de ladrillo claro + base baja de ladrillo + reja negra alta + portones
      const pillars = [-6.45, -2.55, .15, 1.75, 5.85];
      for (const px of pillars) {
        bx(g, px, 0, -.15, .48, 1.92, .48, LAD);
        bx(g, px, 1.92, -.15, .54, .08, .54, '#9e7d62');
      }
      rejaV(g, -4.5, .05, -.15, 3.4, 1.75, '#222426', .14);    // portón vehicular izquierdo
      for (const [a, b] of [[-2.3, -.1], [2.0, 5.6]]) {
        bx(g, (a + b) / 2, 0, -.15, b - a, .38, .24, LAD);
        rejaV(g, (a + b) / 2, .38, -.15, b - a, 1.42, '#222426', .14);
      }
      rejaV(g, .95, .05, -.15, 1.1, 1.75, '#222426', .12);     // portón peatonal central
      bx(g, 6.3, 0, -.15, .85, 2.05, .3, '#cfc5b4');           // pilar muro derecho hacia Lote 5
      colLocal(g, -6.75, -.38, 6.75, .1, null);
      // jardín frontal verde con sendero peatonal y entrada de coche
      rectL(Wd, -6.6, -.2, 6.6, -4.8, .048, '#668d40');
      rectL(Wd, -6.3, -.2, -2.6, -6.5, .055, '#c4beb2');
      rectL(Wd, .3, -.2, 1.6, -4.8, .056, '#d2cdc2');
      addBush(...Wd(4.4, -2.2), 1.35, .05);

      // garaje izquierdo retirado (-6.3..-2.4, d = 6.2..13.0) + chalet ocre con techo gris a 4 aguas (-2.4..+5.4, d = 4.6..13.2)
      body(g, -6.3, -2.4, 6.2, 13.0, 2.85, '#3b3f44');
      bx(g, -4.35, 0, -6.16, 3.1, 2.25, .05, '#ecebe6');       // portón blanco del garaje
      body(g, -2.4, 5.4, 4.6, 13.2, 2.95, OCR);
      hipRoof(g, 1.5, 2.95, -8.9, 8.2, 1.75, 9.0, TEJG);
      // puerta principal blanca con vidrio en arco + marco blanco + ventana ancha derecha
      bx(g, .95, 0, -4.56, 1.65, 2.35, .08, '#f4f3ef');
      bx(g, .95, 0, -4.52, 1.15, 2.15, .05, '#faf9f5');
      bx(g, .95, 1.45, -4.48, .65, .52, .02, '#3b4a55');
      bx(g, 3.65, .85, -4.56, 1.9, 1.35, .06, '#f4f3ef');
      bx(g, 3.65, .92, -4.51, 1.7, 1.2, .03, '#4e5c64');
      // quincho/anexo trasero + patiecito blanco (satélite 4, limpio dentro de x = -71.6)
      body(g, -3.2, 2.4, 13.8, 17.6, 2.9, '#e5e0d5');
      bx(g, -.4, 2.9, -15.7, 5.8, .18, 4.0, '#787d82');
      rectL(Wd, 2.4, -13.4, 6.2, -17.6, .052, '#e6e2d6');

      veredaC(-191.5, -178.0, '#d2cdc2', '#6a8d3f');
      entradaC(-191.2, -187.4, '#c7c1b4');
      entradaC(-184.4, -182.8, '#d2cdc2');
      addTree(-92.0, -185.8, 1.2, false, PELADO);
      addTree(-92.0, -178.8, 1.15, false, PELADO);
      cesto(-91.6, -180.6, true);
      poles.add(-90.1, 0, -191.2, .12, 8.0, .12, 0, '#8d8272');
      addCol(-90.25, -191.35, -89.95, -191.05);
    }

    // ---- Lote 5 (z = -178.0 .. -165.0, w = 13.0 m): Casa moderna de 2 plantas color taupe con balcón + garaje blanco 3 hojas (c6 & c7) ----
    {
      const { g, w, zc, Wd } = casaC(-178.0, -165.0);   // local -6.5..6.5
      const TAU = '#aba094', TAU_D = '#968b7f', WH = '#f5f4f0', TEJ = '#8d503a';
      // izquierda (-6.5..-3.9): portón blanco alto de chapa horizontal con pilar taupe
      bx(g, -6.32, 0, -.15, .36, 2.45, .36, TAU);
      bx(g, -5.05, 0, -.12, 2.25, 2.38, .08, WH);
      for (let y = .3; y < 2.3; y += .32) bx(g, -5.05, y, -.07, 2.2, .025, .02, '#d6d4ce');
      colLocal(g, -6.5, -.3, -3.9, .05, null);

      // cuerpo central de 2 plantas (-3.9..+3.3, w = 7.2 m)
      body(g, -3.9, 3.3, 1.8, 11.2, 3.05, TAU);          // planta baja fondo
      body(g, .05, 3.3, 0, 1.8, 3.05, TAU);              // volumen derecho adelantado al ras de la vereda
      bx(g, -3.72, 0, -.15, .36, 3.05, .36, TAU);        // columna izquierda de la galería
      bx(g, -2.0, 0, -.15, .36, 3.05, .36, TAU);         // pilar intermedio de la galería
      bx(g, -.3, 2.65, -.95, 7.25, .72, 2.0, TAU);       // viga/banda frontal del balcón
      bx(g, 1.68, 0, .03, 3.25, .24, .05, WH);           // zócalo blanco abajo
      bx(g, -2.86, 0, -.2, 1.45, .62, .55, TAU_D);       // macetero bajo integrado en el vano izquierdo
      bx(g, -2.86, .62, -.2, 1.32, .05, .42, '#4e7533');
      addBush(...Wd(-2.86, -.2), .42, .62);
      // aberturas planta baja: ventanita izq, ventanal con postigos blancos y puerta blanca en la galería, ventanal blanco derecho
      bx(g, -2.86, .95, -1.76, .68, 1.15, .05, WH);
      bx(g, -1.0, .92, -1.76, 1.48, 1.25, .05, WH);
      bx(g, -.02, 0, -1.76, .82, 2.15, .05, WH);
      bx(g, 1.65, .85, .04, 1.95, 1.45, .05, WH);
      for (let y = .95; y < 2.25; y += .13) bx(g, 1.65, y, .07, 1.85, .02, .01, '#cfd2d6');
      rectL(Wd, -3.9, 0, .05, -1.8, .06, '#a9a29a');

      // planta alta retirada 1.2 m detrás del balcón con baranda de madera, macetas y techo de tejas
      body(g, -3.9, 3.3, 1.35, 11.2, 6.05, TAU);
      bx(g, -.3, 3.35, -.08, 7.2, .72, .22, TAU);        // baranda baja del balcón
      bx(g, -.3, 4.18, -.08, 7.2, .07, .12, '#6b4a34');  // pasamanos de madera
      for (const [bx0, s] of [[-2.0, .48], [.45, .46], [2.75, .52]]) addBush(...Wd(bx0, -.25), s, 3.85);
      bx(g, -2.8, 4.15, -1.32, .72, 1.25, .05, WH);
      bx(g, -.7, 3.65, -1.32, 1.65, 1.85, .05, WH);
      bx(g, 1.7, 3.65, -1.32, 1.75, 1.85, .05, WH);
      // techo inclinado oscuro/terracota sobre la planta alta (satélite 5 + c6)
      boxIn(g, -.3, 6.22, -6.2, 7.6, .24, 10.6, TEJ, -.12);

      // derecha (+3.3..+6.5, w = 3.2 m): garaje taupe de 1 planta con portón blanco de 3 hojas con vidrios arriba (c6 & c7)
      body(g, 3.3, 6.5, 0, 10.8, 3.05, TAU);
      bx(g, 4.9, 2.95, .04, 3.25, .24, .12, TAU_D);
      bx(g, 4.9, 0, .04, 2.7, 2.28, .06, WH);
      for (const sx of [4.0, 4.9, 5.8]) {
        bx(g, sx, 1.72, .08, .72, .42, .02, '#3b4a55');
        for (const gx of [sx - .18, sx + .18]) bx(g, gx, 1.72, .095, .03, .42, .01, WH);
      }
      for (const sx of [4.45, 5.35]) bx(g, sx, 0, .08, .03, 2.28, .02, '#c8c6c0');

      // fondo del Lote 5: piletita angosta + quincho de techo gris claro (satélite 5, dentro de x = -71.6)
      rectL(Wd, -6.2, -11.4, 6.2, -17.8, .045, '#c4bdb0');
      flat.rect(XL + 12.0, zc + 1.0, XL + 15.2, zc + 5.2, .055, '#e7e2d6');
      flat.rect(XL + 12.3, zc + 1.3, XL + 14.9, zc + 4.9, .062, '#36a2d6');
      body(g, -6.0, 1.0, 12.4, 17.6, 2.85, '#dfdad0');
      bx(g, -2.5, 2.85, -15.0, 7.2, .16, 5.4, '#b8bdc0');

      veredaC(-178.0, -165.0, '#d2cdc2', '#6a8d3f');
      entradaC(-177.8, -175.4, '#d2cdc2');
      entradaC(-173.0, -171.6, '#d2cdc2');
      entradaC(-168.4, -165.2, '#c6bfb2');
      addTree(-92.0, -174.6, 1.15, false, PELADO);
      addTree(-92.0, -169.4, 1.15, false, PELADO);
      cesto(-91.5, -175.5, true);
    }

    // Empalme limpio de la franja verde de vereda del Lote 6 (esquina Jujuy ya armada en centro_oeste_brunet.js)
    flat.rect(CURB_C, -165.0, -91.4, -162.0, .205, '#6f8f45');
    plazaRects.push([-89.6, -216.5, -71.5, -165.0]);
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
    plazaRects.push([-89.6, -234.5, -19.3, -216.5]);
    plazaRects.push([-71.5, -216.5, -35.0, -183.0]);
    plazaRects.push([-71.5, -183.0, -48.0, -172.0]);
  }
}
