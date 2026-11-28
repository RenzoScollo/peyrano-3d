// Manzana del Festival/Comuna (calle en L, Bv. Lavalle/Entre Ríos/Monguillot), Taller de Mario, Monguillot O, Córdoba/Bomberos, Sagarduy e interior manzana Brunet
export function buildFestivalMonguillot(ctx) {
  const {
    G, R, THREE, W, addBush, addCol, addPalm, addTree, bikeWheels, boxIn, bx, civic, colLocal, cylIn, extrudePoly, flat, gableIn, greenCross, group, lam, mapLabels, mapRects, mesh, plazaRects, poleIn, scene, signIn, trims
  } = ctx;

// =========================================================================
{
  const body = (g, x0, x1, d0, d1, h, col) => { bx(g, (x0 + x1) / 2, 0, -(d0 + d1) / 2, x1 - x0, h, d1 - d0, col); colLocal(g, x0, -d1, x1, -d0, col); };
  const rejaV = (g, x, y0, z, w, h, col, step = .13) => { for (let k = 1; k < Math.round(w / step); k++) bx(g, x - w / 2 + k * step, y0, z, .03, h, .03, col); for (const y of [y0, y0 + h - .04]) bx(g, x, y, z, w + .04, .04, .04, col); };
  const PELADO = ['#9c7a45', '#8a6a3a'], VERDE = ['#4b7a30', '#5e8a3a', '#557f35'];
  const XE = 66.5, ZN = -403;   // línea de las casas: lado este (mira al -x) y lado norte (mira al +z); la vereda va entre la calle y esa línea
  // veredas con franja de pasto y cordón (con cortes en las entradas de autos)
  flat.rect(63.5, ZN, XE, -350.5, .204, '#c4bfb4'); flat.rect(63.5, -400.5, 64.9, -350.5, .210, '#6f8f45');
  flat.rect(41, ZN, 63.5, -400.5, .204, '#c4bfb4'); flat.rect(41, -401.6, 63.5, -400.5, .210, '#6f8f45');
  const cordonE = (z0, z1) => { const g = group(63.58, (z0 + z1) / 2); bx(g, 0, 0, 0, .16, .24, z1 - z0, '#bdb8ac'); };
  for (const [z0, z1] of [[-400.5, -399.4], [-397.6, -391.4], [-387.6, -376.9], [-371.3, -350.5]]) cordonE(z0, z1);
  for (const [z0, z1] of [[-399.4, -397.6], [-391.4, -387.6], [-376.9, -371.3]]) flat.rect(63.5, z0, 64.9, z1, .216, '#c4bfb4');
  { const g = group(50.5, -400.58); bx(g, 0, 0, 0, 19, .24, .16, '#bdb8ac'); }
  flat.rect(60, -401.6, 62.6, -400.5, .216, '#c4bfb4');   // entrada al garaje de la casa de la esquina
  { const g = group(63.25, -400.58); bx(g, 0, 0, 0, .5, .24, .16, '#bdb8ac'); }

  // ---- LADO NORTE ----
  // N1) baldío a la derecha de la Comuna (x 41..57.5): pasto, el techito a dos aguas apoyado en el piso, poste y árbol grande
  { flat.rect(41, -429.5, 57.5, ZN, .06, '#7d9a4a'); flat.rect(45, -415, 54, -406, .062, '#8aa555');
    const g = group(48.5, -409.5, 1.35);
    for (const s of [-1, 1]) boxIn(g, s * .78, .55, 0, 1.9, .08, 4.2, '#6e6a62', 0, s * .62);
    for (const z of [-2.1, 2.1]) { const sh = new THREE.Shape(); sh.moveTo(-1.55, 0); sh.lineTo(1.55, 0); sh.lineTo(0, 1.15); sh.lineTo(-1.55, 0);
      const m = new THREE.Mesh(new THREE.ShapeGeometry(sh), lam({ color: '#8a7a62', side: THREE.DoubleSide })); m.position.set(0, 0, z); g.add(m); }
    addCol(46.3, -411, 50.7, -408);
    addTree(46.5, -401.9, 1.3, false, VERDE); poleIn(group(54.5, -401.3), [0, 0, 0], [0, 8, 0], .12, '#8a8a88');
    addTree(53, -420, 1.2, false, PELADO);
  }
  // N2) casa con galería y columnas (retirada), reja negra sobre murito blanco, dos chimeneas; garaje con portón de madera sobre la línea (x 57.5..66.5)
  { const g = group(62, ZN, 0);   // local -4.5..4.5, +x = este (la derecha en la foto)
    body(g, -4.5, 1.5, 3, 13, 3.2, '#ece6da'); bx(g, -1.5, 3.0, -8, 6.1, .35, 10.2, '#b9ae98');
    bx(g, -1.5, 2.9, -2.0, 6.1, .15, 2.0, '#d9d2c4'); for (const x of [-4.3, -1.6, 1.3]) bx(g, x, 0, -1.1, .25, 2.9, .25, '#e6e1d4');
    bx(g, -1.5, 0, -2.0, 6.0, .15, 2.0, '#c9c2b4');
    bx(g, -1.7, 0, -2.96, .95, 2.3, .06, '#e6e3dc'); bx(g, -1.7, .02, -2.92, .8, 2.2, .04, '#3b4a55'); rejaV(g, -1.7, .1, -2.86, .8, 2.0, '#2a2a2a', .1);
    for (const x of [-3.5, .2]) { bx(g, x, .8, -2.96, 1.2, 1.3, .05, '#e6e3dc'); bx(g, x, .85, -2.93, 1.05, 1.2, .02, '#3b4a55'); rejaV(g, x, .85, -2.88, 1.05, 1.2, '#2a2a2a', .12); }
    for (const x of [-3.5, .5]) bx(g, x, 3.0, -6, .6, 1.5, .6, '#cfc6b4');                                                   // chimeneas
    body(g, 1.5, 4.5, 0, 13, 3.0, '#d9d2c4'); for (let y = .3; y < 3; y += .35) bx(g, 3.0, y, .02, 3.0, .03, .02, '#c4bcaa');
    bx(g, 3.0, 3.0, -.1, 3.2, .15, .4, '#b9ae98'); bx(g, 2.6, 0, .03, 2.1, 2.3, .05, '#e6e3dc'); bx(g, 2.6, .02, .07, 1.95, 2.2, .04, '#8a5a32');
    for (let x = 1.75; x < 3.5; x += .2) bx(g, x, .05, .1, .06, 2.1, .02, '#6e4428');
    bx(g, -1.5, 0, -.1, 6.0, .45, .25, '#ece9e2'); rejaV(g, -1.5, .45, -.1, 6.0, 1.1, '#1f1f1f', .12);
    for (const x of [-4.5, -1.0, 1.5]) bx(g, x, 0, -.1, .22, 1.6, .22, '#1f1f1f');
    colLocal(g, -4.5, -.25, 1.5, 0, null);
    for (let z = 0; z <= 13; z += 2.6) poleIn(g, [-4.52, 0, -z], [-4.52, 1.6, -z], .03, '#9aa6ae'); poleIn(g, [-4.52, 1.6, 0], [-4.52, 1.6, -13], .02, '#9aa6ae');   // alambrado al baldío
    flat.rect(57.5, ZN - 3, 63.5, ZN, .062, '#6f9a45'); addBush(59, ZN - .7, .45, 0);
    addTree(58.6, -401.9, 1.25, false, PELADO); addTree(61.4, -402.1, 1.25, false, PELADO);
  }

  // ---- LADO ESTE (local +x = sur = la derecha en las fotos; frente en x = XE mirando a la plaza) ----
  const casaE = (zN, zS) => { const zc = (zN + zS) / 2; return { g: group(XE, zc, -Math.PI / 2), w: zS - zN, zc }; };
  // E1) muro de ladrillo con portón de chapa galvanizada (z -403..-397.5)
  { const { g } = casaE(-403, -397.5);   // local -2.75..2.75
    body(g, -2.75, .9, 0, .3, 2.3, '#a8624a'); for (let y = .15; y < 2.3; y += .15) bx(g, -.93, y, .02, 3.65, .015, .01, '#c48a72');
    bx(g, 1.75, 0, -.12, 1.7, 2.3, .06, '#c9ccce'); for (let x = .95; x < 2.6; x += .14) bx(g, x, 0, -.08, .04, 2.3, .02, '#a9adb0');
    body(g, 2.6, 2.75, 0, .3, 2.3, '#a8624a');
    colLocal(g, .9, -.2, 2.6, 0, null); flat.rect(XE, -403, 79.5, -397.5, .062, '#6f8f45');
  }
  // E2) muro de revoque rústico con puertita negra (z -397.5..-392.5); atrás jardín con árboles y una casita
  { const { g } = casaE(-397.5, -392.5);   // local -2.5..2.5
    body(g, -2.5, 1.5, 0, .3, 2.3, '#8f8676'); for (let k = 0; k < 18; k++) bx(g, R(-2.4, 1.4), R(.1, 2.1), .02, R(.15, .4), R(.1, .3), .02, k % 2 ? '#7f7666' : '#a09685');
    bx(g, 1.95, 0, -.12, .8, 2.0, .05, '#1f1f1f'); body(g, 2.35, 2.5, 0, .3, 2.3, '#8f8676');
    colLocal(g, 1.5, -.2, 2.35, 0, null);
    body(g, -2.5, 2.5, 8, 13, 2.7, '#e2ddd0'); flat.rect(XE, -397.5, 79.5, -392.5, .062, '#6f9a45');
    addTree(XE + 3.5, -396, 1.0, false, VERDE); addTree(XE + 5.5, -393.6, .8, false, VERDE); addBush(XE + 2, -393.4, .6, 0);
    addTree(64.6, -395, 1.3, false, VERDE);
  }
  // E3) galpón de ladrillo (z -392.5..-383.5) con portón rojo de chapa, ventanitas arriba y dos ventanas altas con reja; el tractor adelante
  { const { g } = casaE(-392.5, -383.5), LAD = '#a8624a';   // local -4.5..4.5
    body(g, -4.5, 4.5, 0, 13, 5.4, LAD); for (let y = .2; y < 5.4; y += .2) bx(g, 0, y, .02, 9, .015, .01, '#c48a72'); bx(g, 0, 5.35, .02, 9.05, .12, .12, '#8a4a3a');
    bx(g, -1.5, 0, .03, 3.8, 3.6, .05, '#c9c4b8'); bx(g, -1.5, .03, .06, 3.6, 3.1, .04, '#8a3a2a'); for (let x = -3.25; x < .3; x += .25) bx(g, x, .05, .09, .05, 3.05, .02, '#6e2a1e');
    for (let k = 0; k < 4; k++) bx(g, -2.85 + k * .9, 3.2, .07, .8, .35, .02, '#3b4a55');
    for (let k = 0; k < 6; k++) bx(g, -1.5 + R(-1.5, 1.5), R(.3, 2.6), .1, R(.15, .35), R(.3, .7), .01, '#5a2a1e');   // óxido
    for (const x of [1.8, 3.3]) { bx(g, x, 3.5, .03, 1.1, .6, .05, '#e6e3dc'); bx(g, x, 3.53, .06, 1.0, .52, .02, '#3b4a55'); rejaV(g, x, 3.53, .1, 1.0, .52, '#f2f2ee', .09); }
    bx(g, 2.6, 0, .03, .9, 2.2, .05, '#e6e3dc'); bx(g, 2.6, .02, .06, .78, 2.1, .03, '#8a5a3a');
    flat.rect(63.5, -391.4, XE, -387.6, .2016, '#b8b2a6');
    // tractor McCormick Farmall naranja estacionado en la entrada (mirando al norte)
    { const t = group(65.0, -388.8, Math.PI), OR = '#c8501e';
      for (const s of [-1, 1]) { cylIn(t, s * .75, .85, -.9, .85, .4, '#2a2a2a', Math.PI / 2); cylIn(t, s * .75, .85, -.9, .55, .42, OR, Math.PI / 2);
        cylIn(t, s * .35, .4, 1.4, .38, .22, '#2a2a2a', Math.PI / 2); cylIn(t, s * .35, .4, 1.4, .22, .24, OR, Math.PI / 2); }
      bx(t, 0, .7, .5, .6, .65, 2.0, OR); bx(t, 0, .55, -.6, .8, .6, .9, OR); bx(t, 0, 1.3, -.7, .5, .1, .45, '#2a2a2a'); bx(t, 0, 1.15, -1.0, .45, .4, .08, '#2a2a2a');
      poleIn(t, [0, 1.35, .9], [0, 2.1, .9], .05, '#2a2a2a'); bx(t, -.32, 1.0, .9, .02, .14, .9, '#efe4c8'); bx(t, 0, 1.35, -.2, .12, .12, .12, '#3a9a4a');
      addCol(64.2, -390.2, 65.8, -387.4); }
    { const p = group(64.0, -386.9); poleIn(p, [0, 0, 0], [0, 7.5, 0], .13, '#c0392b'); }
    { const m = group(64.9, -386.2, 1.2); for (const s of [-1, 1]) cylIn(m, s * .55, .3, 0, .3, .1, '#2a2a2a', Math.PI / 2); bx(m, 0, .35, 0, 1.0, .3, .3, '#c0392b'); }   // moto roja
    addTree(64.6, -384.6, 1.2, false, VERDE);
  }
  // E4) reja sobre murito de ladrillo con pilares y portoncito, casa de tejas retirada atrás; portón doble de madera con alerito (z -383.5..-374)
  { const { g } = casaE(-383.5, -374), LAD = '#a8624a';   // local -4.75..4.75
    bx(g, -1.6, 0, -.1, 6.3, .55, .25, LAD); rejaV(g, -3.3, .55, -.1, 2.7, .9, '#1f1f1f', .12); rejaV(g, .3, .55, -.1, 2.2, .9, '#1f1f1f', .12);
    rejaV(g, -1.5, .05, -.1, .8, 1.4, '#1f1f1f', .1);
    for (const x of [-4.75, -1.95, -1.05, 1.5]) { bx(g, x, 0, -.1, .38, 1.55, .38, LAD); bx(g, x, 1.55, -.1, .44, .08, .44, '#8a4a3a'); }
    colLocal(g, -4.75, -.25, 1.5, 0, null);
    body(g, -4.75, 1.5, 5, 13, 3.0, '#e8e2d6'); bx(g, -1.6, 3.0, -9, 6.5, .55, 8.3, '#b0503a'); bx(g, -3.2, 3.0, -7, .6, 1.8, .6, '#a8563e'); bx(g, -.4, 3.0, -10, .5, 1.3, .5, '#a8563e');
    bx(g, -1.6, .9, -4.96, 1.2, 1.2, .05, '#3b4a55'); bx(g, -3.4, 0, -4.96, .85, 2.2, .05, '#6e4a2a'); bx(g, .4, .9, -4.96, 1.0, 1.2, .05, '#3b4a55');
    flat.rect(XE, -383.5, XE + 5, -377.2, .062, '#6f9a45'); addBush(XE + 1.2, -380.5, .7, 0); addBush(XE + 2.5, -378, .5, 0);
    body(g, 1.5, 4.75, 0, 9, 2.8, LAD); for (const x of [1.65, 4.6]) bx(g, x, 0, .02, .3, 2.9, .3, '#9a5440');
    bx(g, 3.1, 0, .03, 2.3, 2.2, .05, '#8a5a32'); for (const s of [-1, 1]) { boxIn(g, 3.1 + s * .57, 1.1, .08, 1.3, .07, .03, '#6e4428', 0, s * .95); boxIn(g, 3.1 + s * .57, 1.1, .08, 1.3, .07, .03, '#6e4428', 0, -s * .95); }
    bx(g, 3.1, 2.5, .5, 3.1, .08, 1.0, '#a9b0b4');
    addTree(64.6, -379.8, .45, false, PELADO); addTree(64.6, -382.6, .45, false, PELADO);
    { const t = group(64.5, -381.2); cylIn(t, 0, .35, 0, .2, .55, '#4a6a9a'); poleIn(t, [.6, 0, 0], [.6, .9, 0], .04, '#8a6a4a'); }   // tacho azul y estaca
  }
  // E5) galpón de chapa con techo curvo (z -374..-368), frente de chapa con puerta
  { const { g } = casaE(-374, -368), CH = '#b8bdc0', R0 = 3;   // local -3..3
    body(g, -3, 3, 0, 13, 3.0, CH); for (let x = -2.9; x < 3; x += .16) bx(g, x, 0, .02, .05, 3.0, .02, '#9fa4a7');
    bx(g, 1.8, 0, .04, 1.4, 2.4, .03, '#c9cdd0');
    { const f = new THREE.Mesh(new THREE.CircleGeometry(R0, 20, 0, Math.PI), lam({ color: '#ece9e2' })); f.position.set(0, 3.0, .01); g.add(f); }
    for (let k = 0; k < 6; k++) { const a = -Math.PI * 75 / 180 + k * Math.PI / 6; boxIn(g, R0 * Math.sin(a), 3.0 + R0 * Math.cos(a), -6.5, 1.62, .07, 13.1, k % 2 ? '#b8603a' : '#c0683e', 0, -a); }
    for (let k = 0; k < 3; k++) bx(g, R(-2, 2), R(3.4, 5.2), .02, R(.3, .7), .25, .01, '#d9d6cf');
  }
  // E6) muro de ladrillo con árboles atrás (z -368..-361)
  { const { g } = casaE(-368, -361);
    body(g, -3.5, 3.5, 0, .3, 2.6, '#a8624a'); for (let y = .15; y < 2.6; y += .15) bx(g, 0, y, .02, 7, .015, .01, '#c48a72'); bx(g, 0, 2.6, -.15, 7.05, .08, .35, '#9a5440');
    flat.rect(XE, -368, 79.5, -361, .062, '#6f8f45'); addTree(XE + 3, -366, 1.3, false, VERDE); addTree(XE + 4, -362.5, 1.1, false, VERDE);
    addTree(64.6, -366.5, 1.3, false, VERDE); addTree(64.6, -362.5, 1.2, false, VERDE);
  }
  // E7) ESQUINA con Bv. Lavalle (z -361..-350.5): construcción alta de revoque manchado con ladrillo a la vista, portón rojo y puerta roja
  { const { g } = casaE(-361, -350.5);   // local -5.25..5.25
    body(g, -5.25, 5.25, 0, 9, 6.0, '#8a7f72'); for (let k = 0; k < 12; k++) bx(g, R(-5, 5), R(.3, 5.5), .02, R(.5, 1.4), R(.3, .8), .02, k % 3 ? '#9a5a44' : '#776c60');
    bx(g, 0, 5.9, .02, 10.6, .15, .15, '#7a7064');
    bx(g, 1.6, 0, .03, 2.6, 2.9, .05, '#8a7f72'); bx(g, 1.6, .02, .06, 2.4, 2.8, .04, '#b04040'); bx(g, 1.6, .02, .09, .04, 2.8, .02, '#8a2a2a');
    bx(g, -2.4, 0, .03, .9, 2.2, .05, '#8a7f72'); bx(g, -2.4, .02, .06, .78, 2.1, .04, '#b04040');
    for (const x of [-3.6, -1.2, 1.2, 3.6]) bx(g, x, 4.1, .03, .7, .7, .04, '#3b4a55');
    poleIn(group(64.0, -352.5), [0, 0, 0], [0, 8, 0], .12, '#8a8a88');
    addTree(64.6, -356.5, 1.4, false, VERDE); addTree(64.6, -359.5, 1.2, false, VERDE);
  }
  plazaRects.push([41, -429.5, 66.5, -400.5]); plazaRects.push([63.5, -403, 80, -350.5]);   // sin árboles ni casas al azar
}

// =========================================================================
// Mitad este de la manzana del Festival Folklórico / Comuna (Bv. Lavalle, Entre Ríos y Monguillot — Street View):
// - Bv. Lavalle: fachada sur del edificio alto E7 + casa esquina con galería en voladizo y garaje rojo
// - Entre Ríos (de sur a norte): costado casa esquina · tapial + portón gris + tinglado oxidado ·
//   casa blanca con tejas rojas y jardincito · comercio/pinturería + galpón de ladrillo y revoque blanco ·
//   casita vieja gris + huerta alambrada · tapial premoldeado + portón de chapa galvanizada en la esquina
// - Monguillot (de este a oeste): tapial premoldeado continuo · garaje blanco con portón acanalado · tapial hasta la Comuna
// =========================================================================
{
  const rejaV = (g, x, y0, z, w, h, col, step = .14) => {
    for (let k = 1; k < Math.round(w / step); k++) bx(g, x - w / 2 + k * step, y0, z, .028, h, .028, col);
    for (const y of [y0, y0 + h - .04]) bx(g, x, y, z, w + .04, .035, .035, col);
  };
  const PELADO = ['#9c7a45', '#8a6a3a'], VERDE = ['#4b7a30', '#5e8a3a', '#557f35'];
  const REV = '#9b9284', REV_D = '#7d7568', LAD = '#ae5a3e', LAD_D = '#8e452e', WH = '#f1eee7';

  // ---- 1) Fachada sur de E7 sobre Bv. Lavalle (x = 66.5..75.5, z = -350.5) ----
  {
    const g = group(71.0, -350.5, 0);   // local x = world x - 71.0 (-4.5..4.5), +z mira hacia Bv. Lavalle
    // Pilastras verticales y moldura horizontal
    for (const px of [-4.4, -1.7, 1.35, 4.4]) bx(g, px, 0, .05, .24, 6.0, .14, '#7a7064');
    bx(g, 2.9, 2.65, .06, 3.05, .18, .16, '#7a7064');
    bx(g, 0, 5.88, .06, 9.05, .16, .16, '#746a5e');
    // Portón doble grande rojo óxido en el centro + ventanita alta
    bx(g, -.18, 0, .04, 2.65, 3.25, .08, '#7a6f62');
    bx(g, -.18, .02, .08, 2.45, 3.10, .05, '#a34434');
    bx(g, -.18, .02, .11, .05, 3.10, .03, '#6e281d');
    for (const wy of [2.55, 2.90]) bx(g, -.18, wy, .11, 2.45, .04, .03, '#6e281d');
    bx(g, -.18, 4.35, .05, .82, .55, .05, '#3b4349');
    // Paño derecho: abertura baja tapiada marrón-rojiza, puertita angosta marrón y ventana alta con reja
    bx(g, 2.35, .42, .05, 1.55, 1.25, .06, '#8c4438');
    bx(g, 2.35, 1.67, .06, 1.65, .10, .10, '#726a5e');
    bx(g, 3.78, 0, .05, .82, 2.20, .06, '#5c4b42');
    bx(g, 3.78, .02, .08, .70, 2.10, .04, '#8c4438');
    bx(g, 2.85, 3.95, .05, .88, .92, .05, '#363f46');
    rejaV(g, 2.85, 3.95, .09, .84, .88, '#222222', .18);
    // Franja de pasto frente a E7 en Bv. Lavalle
    flat.rect(66.5, -350.5, 75.5, -348.5, .212, '#62883c');
    addBush(68.2, -349.6, .65, 0);
  }

  // ---- 2) Casa esquina Bv. Lavalle × Entre Ríos (x = 75.5..89.6, z = -363.5..-350.5) ----
  {
    const g = group(0, 0);
    // Sector izquierdo adelantado sobre Bv. Lavalle (garaje rojo + ventana izq, x = 75.5..81.4, z = -363.5..-350.5)
    bx(g, 78.45, 0, -357.0, 5.9, 3.05, 13.0, REV);
    // Sector derecho remetido 1.8 m bajo la losa en voladizo (x = 81.4..87.8, z = -363.5..-352.3)
    bx(g, 84.6, 0, -357.9, 6.4, 3.05, 11.2, REV);
    // Losa plana continua cubriendo todo + alero/galería en voladizo sobre puerta, ventanal y esquina SE
    bx(g, 82.45, 3.05, -357.0, 13.9, .28, 13.0, '#a69e90');
    bx(g, 82.45, 3.33, -357.0, 14.0, .14, 13.1, REV_D);
    // Columna esquinera + piso de galería bajo el voladizo (puerta + ventanal + esquina SE)
    bx(g, 88.85, 0, -351.05, .30, 3.05, .30, '#a8a296');
    flat.rect(81.4, -352.3, 89.4, -350.5, .072, '#b9b2a4');
    flat.rect(87.8, -355.2, 89.4, -350.5, .072, '#b9b2a4');
    // Chimenea chica de ladrillo sobre el techo
    bx(g, 86.2, 3.45, -355.0, .65, .75, .65, '#8e5a44');
    // Frente Bv. Lavalle (z = -350.5): garaje rojo óxido + ventana izquierda con persiana blanca
    bx(g, 77.0, 0, -350.46, 2.45, 2.25, .08, '#9e3e30');             // portón garaje rojo
    bx(g, 77.0, 0, -350.41, .05, 2.25, .04, '#6e261c');
    bx(g, 79.8, .82, -350.46, 1.95, 1.48, .07, '#3d474f');           // ventana izquierda
    bx(g, 79.8, 1.72, -350.42, 1.90, .58, .05, '#e8e5dc');           // persiana blanca arriba
    for (let gx = 78.95; gx <= 80.65; gx += .24) bx(g, gx, .82, -350.39, .025, 1.48, .025, '#222222');
    for (const gy of [.88, 1.55, 2.24]) bx(g, 79.8, gy, -350.39, 1.95, .03, .03, '#222222');
    addBush(79.8, -350.0, .55, 0);
    // Pared remetida bajo la losa (z = -352.3): puerta de entrada + gran ventanal con reja
    bx(g, 82.25, 0, -352.26, .92, 2.15, .08, '#5a3a28');             // puerta entrada
    bx(g, 85.1, .78, -352.26, 2.45, 1.52, .08, '#3b444c');           // ventanal ancho bajo galería
    for (let gx = 84.0; gx <= 86.2; gx += .24) bx(g, gx, .78, -352.19, .025, 1.52, .025, '#222222');
    for (const gy of [.84, 1.52, 2.24]) bx(g, 85.1, gy, -352.19, 2.45, .03, .03, '#222222');
    // Murito bajo con pilares sobre Bv. Lavalle (corte frente a la puerta x = 81.6..82.8) + bicicleta
    bx(g, 79.9, 0, -350.15, 3.2, .62, .22, '#8c8478');
    bx(g, 86.1, 0, -350.15, 6.4, .62, .22, '#8c8478');
    for (const px of [78.4, 81.5, 82.9, 89.2]) bx(g, px, 0, -350.15, .32, .96, .32, '#8c8478');
    for (const dx of [-.52, .52]) bikeWheels.add(84.4 + dx, .34, -349.82, 1, 1, 1, 0, '#1d1d1d');
    trims.add(84.4, .52, -349.82, 1.0, .05, .05, 0, '#2a4668');
    // Entrada de cemento al garaje rojo + vereda embaldosada y pasto sobre Bv. Lavalle
    flat.rect(75.5, -350.5, 78.4, -348.5, .216, '#c8c3b8');
    flat.rect(78.4, -350.5, 89.6, -348.5, .212, '#62883c');
    flat.rect(78.4, -350.5, 89.6, -349.2, .216, '#c4bfb4');
    addTree(86.8, -349.1, .95, false, PELADO);
    // Frente Entre Ríos (x = 87.8..89.6, z = -350.5..-363.5): aire acondicionado, ventana lateral + gran ventana con persiana blanca
    bx(g, 87.92, 2.22, -353.3, .32, .52, .82, '#eceae4');            // aire acondicionado blanco
    bx(g, 87.84, .88, -359.6, .08, 1.55, 2.65, '#3b444b');           // ventana grande sobre Entre Ríos
    bx(g, 87.88, 1.75, -359.6, .06, .68, 2.60, '#e8e5dc');           // persiana blanca semi-baja
    for (let rz = -360.8; rz <= -358.4; rz += .18) bx(g, 87.94, .88, rz, .03, 1.55, .03, '#1e1e1e');
    for (const ry of [.92, 1.65, 2.38]) bx(g, 87.94, ry, -359.6, .03, .04, 2.65, '#1e1e1e');
    // Murito bajo delantero sobre Entre Ríos (x = 89.2) con pilares y pasito de entrada
    bx(g, 89.2, 0, -352.4, .22, .62, 3.6, REV_D);
    bx(g, 89.2, 0, -359.3, .22, .62, 8.2, REV_D);
    for (const pz of [-350.7, -354.1, -355.2, -363.3]) bx(g, 89.2, 0, pz, .34, 1.05, .34, REV_D);
    // Canasto de basura metálico en la vereda + poste naranja/blanco en la esquina
    { const cx0 = 90.4, cz0 = -359.4;
      for (const [ox, oz] of [[-.28, -.4], [.28, -.4], [.28, .4], [-.28, .4]]) poleIn(g, [cx0 + ox, 0, cz0 + oz], [cx0 + ox, .95, cz0 + oz], .02, '#6e4e36');
      bx(g, cx0, .48, cz0, .58, .48, .82, '#8b684a'); }
    poleIn(g, [91.0, 0, -355.0], [91.0, 7.8, -355.0], .10, '#c85028');
    poleIn(g, [91.0, 2.8, -355.0], [91.0, 5.2, -355.0], .105, WH);
    addCol(75.5, -363.5, 87.8, -350.5); mapRects.push([75.5, -363.5, 87.8, -350.5, REV]);
  }

  // ---- 3) Tapial de bloques + Portón de chapa gris + Tinglado oxidado (x = 75.5..89.6, z = -372.5..-363.5) ----
  {
    const g = group(0, 0);
    flat.rect(75.5, -372.5, 89.5, -363.5, .066, '#b5b0a4');          // piso patio/galpón
    bx(g, 89.2, 0, -364.25, .24, 2.15, 1.5, REV_D);                  // tramo sur del tapial
    bx(g, 89.2, 0, -370.65, .24, 2.15, 3.7, REV_D);                  // tramo norte del tapial
    bx(g, 89.2, 0, -372.4, .34, 2.35, .34, WH);                      // pilar blanco límite norte
    // Portón doble de chapa gris (#8d949a) en z = -365.0..-368.8
    bx(g, 89.2, 0, -366.9, .10, 2.08, 3.75, '#8d949a');
    bx(g, 89.26, 0, -366.9, .04, 2.08, .05, '#5a6066');
    for (let pz = -368.6; pz <= -365.2; pz += .45) bx(g, 89.25, 0, pz, .02, 2.05, .03, '#7b8288');
    // Tinglado abierto atrás con techo de chapa oxidada
    bx(g, 82.0, 3.05, -368.0, 12.4, .12, 8.6, '#9c5c40');
    for (const px of [76.2, 87.6]) for (const pz of [-372.0, -364.0]) poleIn(g, [px, 0, pz], [px, 3.05, pz], .08, '#4a4e52');
    addCol(89.0, -372.5, 89.4, -363.5);
    mapRects.push([76.0, -372.2, 88.2, -363.8, '#9c5c40']);
  }

  // ---- 4) Casa blanca con techo de tejas rojas y jardincito delantero (x = 75.5..89.6, z = -386.8..-372.5) ----
  {
    const g = group(0, 0);
    // Cuerpo principal retirado 3 m con nicho central remetido para la puerta (x = 75.5..86.5, z = -384.4..-372.6)
    bx(g, 80.5, 0, -378.5, 10.0, 2.95, 11.8, WH);                    // volumen trasero (x = 75.5..85.5)
    bx(g, 86.0, 0, -374.6, 1.0, 2.95, 4.0, WH);                      // frente sur (ventana izq)
    bx(g, 86.0, 0, -379.5, 1.0, 2.95, 2.6, WH);                      // frente centro (ventana der)
    bx(g, 86.0, 0, -382.6, 1.0, 2.95, 3.6, WH);                      // frente norte (garaje)
    bx(g, 86.0, 2.45, -377.4, 1.0, .50, 1.65, WH);                   // dintel del nicho de la puerta
    bx(g, 86.54, 0, -374.6, .08, .54, 4.0, '#9e7c64');               // zócalo de ladrillo/piedra
    bx(g, 86.54, 0, -379.5, .08, .54, 2.6, '#9e7c64');
    // Alero horizontal blanco + faldón inclinado de tejas rojas con cumbrera, parapeto superior y chimeneas
    bx(g, 86.75, 2.90, -378.5, .55, .18, 12.2, WH);                  // cenefa blanca del alero
    boxIn(g, 84.4, 3.42, -378.5, 5.2, .16, 12.2, '#9b4634', 0, -.24);
    for (let tz = -384.3; tz <= -372.7; tz += .55) boxIn(g, 84.4, 3.51, tz, 5.1, .03, .08, '#7a3324', 0, -.24);
    bx(g, 79.0, 2.95, -378.5, 6.8, 1.15, 11.8, WH);                  // cuerpo superior blanco
    bx(g, 82.42, 3.72, -378.5, .12, .26, 11.8, '#9b4634');           // franja de ladrillo bajo parapeto
    bx(g, 82.46, 3.98, -378.5, .24, .14, 11.9, WH);                  // cornisa blanca superior
    bx(g, 84.6, 3.35, -379.3, .55, .95, .55, LAD);                   // chimenea delantera con sombrerete
    bx(g, 84.6, 4.30, -379.3, .72, .10, .72, WH);
    bx(g, 80.2, 4.10, -383.6, .85, .90, .95, LAD_D);                 // chimenea trasera norte
    // Costado norte (mirando al pasillo): 3 ventanitas altas + aire acondicionado blanco
    for (const vx of [84.8, 83.2, 81.6]) bx(g, vx, 2.05, -384.44, .75, .52, .06, '#434d55');
    bx(g, 85.4, 2.35, -384.56, .75, .48, .28, '#eceae4');
    // Aire acondicionado blanco a la izquierda + 2 ventanas con persiana blanca y reja negra
    bx(g, 86.68, 2.25, -373.2, .30, .48, .78, '#eceae4');
    for (const wz of [-375.1, -379.5]){
      bx(g, 86.54, .76, wz, .08, 1.54, 2.15, '#e8e5dc');
      for (let rz = wz - .96; rz <= wz + .98; rz += .20) bx(g, 86.60, .76, rz, .025, 1.54, .025, '#2b2b2b');
      for (const ry of [.82, 1.54, 2.26]) bx(g, 86.60, ry, wz, .025, .035, 2.15, '#2b2b2b');
    }
    // Puerta de madera remetida en el nicho central + farolito
    bx(g, 85.54, 0, -377.4, .08, 2.25, .95, '#6e3422');
    bx(g, 85.85, 2.15, -376.8, .18, .22, .18, '#2b2b2b');
    // Portón de garaje de madera con cuarterones en relieve
    bx(g, 86.54, 0, -382.5, .10, 2.28, 2.65, '#5a2c1b');
    for (let gz = -383.5; gz <= -381.5; gz += .65) for (const gy of [.35, 1.0, 1.65]) bx(g, 86.60, gy, gz, .03, .45, .48, '#6e3824');
    // 2 macetas terracota bajo la ventana derecha
    for (const mz of [-378.9, -379.8]) cylIn(g, 86.85, .24, mz, .18, .48, '#b55638');
    // Jardincito verde delantero + murito bajo de ladrillo con pilares + escaloncitos + doble huella al garaje
    flat.rect(86.5, -384.4, 89.5, -372.6, .064, '#668f40');
    bx(g, 89.3, 0, -374.7, .22, .48, 4.2, '#a66b52');
    bx(g, 89.3, 0, -379.6, .22, .48, 3.0, '#a66b52');
    for (const pz of [-376.8, -378.1]) bx(g, 89.3, 0, pz, .30, .62, .30, '#a66b52');
    flat.rect(86.5, -378.1, 89.6, -376.7, .072, '#c8c3b8');          // pasillo a la puerta
    flat.rect(86.5, -383.6, 89.6, -382.9, .072, '#c8c3b8');          // huella norte garaje
    flat.rect(86.5, -382.1, 89.6, -381.4, .072, '#c8c3b8');          // huella sur garaje
    // Pasillo lateral norte entre la casa blanca y la pinturería (z = -386.8..-384.4)
    flat.rect(75.5, -386.8, 89.5, -384.4, .064, '#668f40');
    bx(g, 89.3, 0, -385.6, .22, .48, 2.4, '#a66b52');
    bx(g, 83.2, 0, -385.6, .24, 2.15, 2.4, LAD);
    addBush(87.2, -385.5, .75, 0);
    addCol(75.5, -384.4, 86.5, -372.6); mapRects.push([75.5, -384.4, 86.5, -372.6, '#9b4634']);
    poleIn(g, [90.3, 0, -372.8], [90.3, 8.2, -372.8], .12, '#7d7366');
    addTree(90.6, -382.0, .95, false, PELADO);
  }

  // ---- 5) Pinturería/Comercio + Galpón de ladrillo visto y revoque blanco envejecido (x = 75.5..89.6, z = -398.5..-386.8) ----
  {
    const g = group(0, 0);
    // Paño sur (Pinturería, z = -392.4..-386.8, h = 4.9 m)
    bx(g, 82.55, 0, -389.6, 14.1, 2.85, 5.6, LAD);                   // planta baja ladrillo
    bx(g, 82.55, 2.85, -389.6, 14.1, 2.05, 5.6, '#d6d2ca');          // parte superior revoque blanco manchado
    bx(g, 89.70, 2.80, -389.6, .26, .20, 5.7, LAD_D);                // voladizo/moldura de ladrillo sobre la vidriera
    // Vidriera grande con marcos oscuros, estantes con tachos de pintura y carteles Superboard / Knauf
    bx(g, 89.64, .32, -389.1, .08, 2.25, 3.45, '#3b4852');
    bx(g, 89.67, .38, -389.1, .04, .68, 3.30, '#e2e0d8');            // base clara de placas/tachos
    for (const tz of [-387.9, -388.4, -388.9, -389.4, -389.9]){      // latas de pintura en estantes
      bx(g, 89.69, 1.12, tz, .04, .32, .26, '#e6e4dc');
      bx(g, 89.69, 1.56, tz, .04, .30, .24, tz > -389 ? '#d8c89a' : '#8cb2cf');
    }
    bx(g, 89.70, 1.72, -387.95, .04, .34, .88, '#dce6dc');           // cartel Superboard (izq arriba)
    bx(g, 89.71, 1.80, -387.95, .02, .12, .75, '#3a7a42');
    bx(g, 89.70, .42, -390.15, .04, .58, .85, '#3d82c4');            // cartel celeste Knauf (der abajo)
    for (const mz of [-387.38, -388.55, -389.68, -390.82]) bx(g, 89.71, .32, mz, .04, 2.25, .05, '#262a2e');
    // Puerta vidriada a la derecha de la vidriera
    bx(g, 89.64, 0, -391.45, .08, 2.52, .95, '#3b322c');
    bx(g, 89.68, .92, -391.45, .04, 1.40, .74, '#52626d');
    // Celosía horizontal larga de barrotes verticales oscuros arriba (y = 3.18..3.98)
    bx(g, 89.62, 3.18, -389.6, .08, .82, 4.7, '#262b2f');
    for (let cz = -391.8; cz <= -387.4; cz += .22) bx(g, 89.67, 3.18, cz, .05, .82, .06, '#7a766e');
    // Paño norte (Galpón alto, z = -398.5..-392.4, h = 5.5 m)
    bx(g, 82.55, 0, -395.45, 14.1, 3.85, 6.1, LAD);
    bx(g, 82.55, 3.85, -395.45, 14.1, 1.65, 6.1, '#d6d2ca');
    bx(g, 89.68, 3.80, -395.45, .20, .18, 6.2, LAD_D);
    // Portón gigante marrón rojizo con fila de 7 ventanitas cuadradas arriba
    bx(g, 89.64, 0, -395.45, .10, 3.65, 4.7, '#753121');
    for (let pz = -397.5; pz <= -393.3; pz += .42) bx(g, 89.70, 0, pz, .02, 3.15, .03, '#521f14');
    for (let k = 0; k < 7; k++) bx(g, 89.70, 3.18, -397.45 + k * .66, .04, .42, .52, '#2d363d');
    addTree(90.6, -390.2, 1.15, false, PELADO);
    addCol(75.5, -398.5, 89.6, -386.8); mapRects.push([75.5, -398.5, 89.6, -386.8, LAD]);
  }

  // ---- 6) Casita vieja gris + Huerta alambrada sobre Entre Ríos (x = 75.5..89.6, z = -414.5..-398.5) ----
  {
    const g = group(0, 0);
    flat.rect(75.5, -414.5, 89.5, -398.5, .062, '#62883c');
    // Casita vieja baja retirada (x = 78.5..86.5, z = -405.5..-398.8, h = 3.0 m)
    bx(g, 82.5, 0, -402.15, 8.0, 3.0, 6.7, '#9e988c');
    bx(g, 86.54, 0, -403.4, .08, 2.05, .88, '#58646e');              // puerta gris-azulada
    bx(g, 86.54, .95, -400.9, .08, 1.15, 1.35, '#3b434a');           // ventana oscura
    // Murito bajo viejo adelante + pilarcitos de ladrillo y portoncito al patio
    bx(g, 89.3, 0, -400.6, .22, .52, 3.4, '#928c80');
    bx(g, 89.3, 0, -404.0, .22, .52, 2.2, '#928c80');
    for (const pz of [-402.3, -403.0]) bx(g, 89.3, 0, pz, .32, .85, .32, '#928c80');
    bx(g, 89.2, 0, -406.0, .28, 1.45, 1.4, '#968f82');
    for (const pz of [-406.7, -407.7]) bx(g, 89.2, 0, pz, .36, 1.75, .36, LAD);
    addTree(88.2, -400.8, .9, false, VERDE);
    // Galponcito/depósito al fondo del lote de huerta (x = 75.5..80.5, z = -413.8..-406.5)
    bx(g, 78.0, 0, -410.15, 5.0, 2.7, 7.3, '#847e74');
    addCol(78.5, -405.5, 86.5, -398.8); addCol(75.5, -413.8, 80.5, -406.5);
    mapRects.push([78.5, -405.5, 86.5, -398.8, '#9e988c']);
    // Surcos de tierra/huerta y alambrado con postes sobre Entre Ríos (z = -414.5..-407.8)
    for (let hz = -413.6; hz <= -408.6; hz += 1.4) flat.rect(81.5, hz, 88.5, hz + .75, .068, '#6f5c46');
    for (let pz = -414.2; pz <= -408.0; pz += 2.0) poleIn(g, [89.35, 0, pz], [89.35, 1.35, pz], .055, '#6e543a');
    for (const wy of [.45, .85, 1.25]) poleIn(g, [89.35, wy, -414.5], [89.35, wy, -407.8], .015, '#9aa2a8');
    addTree(90.6, -406.8, 1.15, false, PELADO); addTree(90.6, -412.5, 1.0, false, PELADO);
  }

  // ---- 7) Tapial premoldeado + Portón de chapa galvanizada (esquina Entre Ríos × Monguillot) + toda la cuadra de Monguillot con Garaje Blanco ----
  {
    const g = group(0, 0);
    flat.rect(66.5, -429.4, 89.4, -414.5, .062, '#62883c');
    // Helper para tapial premoldeado de placas con columnas
    const premoldeadoZ = (x, z0, z1, col, colP) => {
      const len = z1 - z0, n = Math.max(1, Math.round(len / 2.1));
      bx(g, x, 0, (z0 + z1) / 2, .16, 2.15, len, col);
      for (let y = .42; y < 2.1; y += .42) bx(g, x + .09, y, (z0 + z1) / 2, .02, .025, len, colP);
      for (let k = 0; k <= n; k++) bx(g, x, 0, z0 + len * k / n, .24, 2.22, .20, colP);
      addCol(x - .15, z0, x + .15, z1);
    };
    const premoldeadoX = (z, x0, x1, col, colP) => {
      const len = x1 - x0, n = Math.max(1, Math.round(len / 2.2));
      bx(g, (x0 + x1) / 2, 0, z, len, 2.15, .16, col);
      for (let y = .42; y < 2.1; y += .42) bx(g, (x0 + x1) / 2, y, z - .09, len, .025, .02, colP);
      for (let k = 0; k <= n; k++) bx(g, x0 + len * k / n, 0, z, .20, 2.22, .24, colP);
      addCol(x0, z - .15, x1, z + .15);
    };
    // Lado Entre Ríos (x = 89.4, z = -429.3..-414.5): tapial premoldeado + portón ancho chapa galvanizada + esquina
    premoldeadoZ(89.4, -422.5, -414.5, '#7e7468', '#686056');
    bx(g, 89.4, 0, -425.15, .10, 2.15, 5.2, '#c7cbce');              // portón chapa sinusoidal galvanizada
    for (let pz = -427.6; pz <= -422.7; pz += .22) bx(g, 89.46, 0, pz, .02, 2.15, .05, '#a6abb0');
    addCol(89.25, -427.8, 89.55, -422.5);
    premoldeadoZ(89.4, -429.3, -427.8, '#7e7468', '#686056');
    // Poste naranja/blanco frente al portón + cartel azul de calles Entre Ríos / Monguillot en la esquina
    poleIn(g, [91.0, 0, -423.2], [91.0, 7.8, -423.2], .10, '#c85028');
    poleIn(g, [91.0, 2.8, -423.2], [91.0, 5.2, -423.2], .105, WH);
    poleIn(g, [91.0, 0, -430.5], [91.0, 2.65, -430.5], .045, '#2b4078');
    bx(g, 91.0, 2.30, -430.5, .75, .20, .06, '#233b7a');
    bx(g, 91.0, 2.08, -430.5, .06, .20, .75, '#233b7a');
    addTree(90.5, -419.0, 1.15, false, PELADO);

    // Lado Monguillot (z = -429.3, x = 57.8..89.4): tapial premoldeado + Garaje Blanco; al lado de la Comuna (x = 41..57.8) queda el baldío abierto sin tapial
    premoldeadoX(-429.3, 63.2, 89.4, '#b5afa2', '#948e82');
    // Garaje blanco con portón acanalado blanco sobre Monguillot (sv8)
    bx(g, 60.5, 0, -425.7, 5.4, 3.15, 7.2, '#9a8678');               // cuerpo ladrillo/revoque
    bx(g, 60.5, 0, -429.32, 5.5, 3.25, .24, '#f0eee8');              // frente blanco alto
    bx(g, 60.5, 0, -429.46, 3.85, 2.42, .08, '#e6e8ea');             // portón blanco acanalado
    for (let px = 58.7; px <= 62.3; px += .20) bx(g, px, 0, -429.51, .03, 2.40, .02, '#c6cacd');
    addCol(57.8, -429.4, 63.2, -422.1); mapRects.push([57.8, -429.4, 63.2, -422.1, '#f0eee8']);
    // Tapial divisorio perpendicular (x = 57.7) separando el garaje blanco y la casa N2 del baldío abierto de la Comuna
    premoldeadoZ(57.7, -429.3, -415.8, '#b5afa2', '#948e82');

    // Interior del terreno esquinero (x = 66.5..89.3, z = -429.2..-414.6): ripio, camioneta blanca, galponcito y árboles
    flat.rect(74.0, -427.6, 89.2, -422.5, .068, '#b6b0a2');
    bx(g, 71.0, 0, -418.2, 6.8, 2.75, 5.8, '#8a8278');               // galponcito interior
    addCol(67.6, -421.1, 74.4, -415.3); mapRects.push([67.6, -421.1, 74.4, -415.3, '#8a8278']);
    { const t = group(78.5, -423.8, .15);                            // camioneta blanca asomando sobre el tapial
      bx(t, 0, .35, 0, 4.4, .85, 1.85, '#eceae4'); bx(t, -.4, 1.20, 0, 1.75, .75, 1.70, '#eceae4');
      bx(t, -.4, 1.28, 0, 1.45, .52, 1.74, '#3a4a55'); }
    addTree(72.0, -425.5, 1.2, false, VERDE); addTree(82.5, -417.5, 1.1, false, PELADO);

    // Vereda de pasto y entradas sobre Entre Ríos (x = 89.6..91.5, z = -429.5..-350.5)
    flat.rect(89.6, -429.5, 91.5, -350.5, .210, '#668b3e');
    flat.rect(89.6, -398.5, 91.5, -386.8, .216, '#c4bfb4');          // entrada ancha comercio + galpón
    flat.rect(89.6, -383.9, 91.5, -381.1, .216, '#c4bfb4');          // entrada garaje casa blanca
    flat.rect(89.6, -378.1, 91.5, -376.7, .216, '#c4bfb4');          // acceso peatonal casa blanca
    flat.rect(89.6, -368.8, 91.5, -365.0, .216, '#c4bfb4');          // acceso portón gris
    flat.rect(89.6, -427.8, 91.5, -422.5, .214, '#aba596');          // acceso portón chapa galvanizada
    // Vereda de pasto sobre Monguillot (z = -431.5..-429.5, x = 41.0..89.6) + rampa garaje blanco + tronco podado (sv7) y árboles
    flat.rect(41.0, -431.5, 89.6, -429.5, .210, '#668b3e');
    flat.rect(58.0, -431.5, 63.0, -429.5, .216, '#c4bfb4');          // rampa ancha garaje blanco
    cylIn(g, 76.5, 1.35, -430.5, .22, 2.7, '#9c9282');               // tronco seco/podado (sv7)
    for (const tx of [85.5, 69.5, 55.2, 46.2]) addTree(tx, -430.5, 1.25, false, PELADO);
    addTree(63.6, -430.5, 1.35, false, PELADO);

    // Medianeras internas entre lotes sobre Entre Ríos
    for (const mz of [-363.5, -372.5, -384.5, -398.5, -414.5]) bx(g, 76.0, 0, mz, 2.0, 2.1, .22, '#9a9488');
  }
  plazaRects.push([66.5, -429.5, 89.6, -350.5]);
}

// =========================================================================
// Esquina Av. Centenario y Monguillot, enfrente de la Comuna (lado oeste, fotos del usuario):
// casa de ladrillo con galería y techo de chapa a cuatro aguas sobre la avenida · sobre Monguillot el edificio de 2 plantas rosado:
// abajo el TALLER DE MARIO (motos, toldos blancos, banderas de lubricantes), arriba el estudio de tatuajes de MatiMarc ·
// hacia el sur, patio con reja negra y bandera, y la casita blanca con dos ventanas con reja hasta la calle de la plaza.
// =========================================================================
{
  const rejaV = (g, x, y0, z, w, h, col, step = .13) => { for (let k = 1; k < Math.round(w / step); k++) bx(g, x - w / 2 + k * step, y0, z, .03, h, .03, col); for (const y of [y0, y0 + h - .04]) bx(g, x, y, z, w + .04, .04, .04, col); };
  const body = (g, x0, x1, d0, d1, h, col) => { bx(g, (x0 + x1) / 2, 0, -(d0 + d1) / 2, x1 - x0, h, d1 - d0, col); colLocal(g, x0, -d1, x1, -d0, col); };
  const ventana = (g, x, y0, z, w, h, rejCol = '#2a2a2a') => { bx(g, x, y0, z + .02, w + .14, h + .12, .05, '#f2f2ee'); bx(g, x, y0 + .06, z + .05, w, h, .02, '#3b4a55'); rejaV(g, x, y0 + .06, z + .09, w, h, rejCol, .13); };
  const moto = (x, z, ry, col) => { const m = group(x, z, ry);
    for (const s of [-1, 1]){ const t = new THREE.Mesh(new THREE.TorusGeometry(.3, .07, 6, 14), lam({ color: 0x1f1f1f })); t.position.set(s * .65, .32, 0); m.add(t); }
    bx(m, 0, .45, 0, 1.0, .35, .3, col); bx(m, -.15, .8, 0, .6, .12, .28, '#1f1f1f'); poleIn(m, [.55, .4, 0], [.7, 1.05, 0], .03, '#9a9a9a'); bx(m, .72, 1.05, 0, .06, .05, .6, '#2a2a2a'); };
  const bandera = (x, z, ry, c1, c2) => { const b = group(x, z, ry); poleIn(b, [0, 0, 0], [0, 2.7, 0], .025, '#cfcfcf');
    const f = new THREE.Mesh(new THREE.PlaneGeometry(.75, 1.4), lam({ color: c1, side: THREE.DoubleSide })); f.position.set(.4, 1.95, 0); b.add(f);
    const f2 = new THREE.Mesh(new THREE.PlaneGeometry(.75, .3), lam({ color: c2, side: THREE.DoubleSide })); f2.position.set(.4, 2.1, .01); b.add(f2); };

  // 1) casa de ladrillo de la esquina (frente a la avenida, retirada 2 m con galería; local +x = norte, hacia Monguillot)
  // planta (dibujo del usuario, visto desde arriba): al sur el frente adelantado con 2 ventanas; después la casa se mete 1,7 m con la
  // puerta y otra ventana (todo eso bajo el techo de chapa con galería); contra Monguillot un hueco descubierto con la puerta del costado,
  // y sobre Monguillot la pared con una ventana
  { const LAD = '#a8604a', XF = -15.5, XR = -17.17, XN = -21.7, XB = -24, ZS = -416, ZM = -424.05, ZK = -428.15, ZM2 = -429.5;
    const FOOT = [[XF, ZS], [XF, ZM], [XR, ZM], [XR, ZK], [XN, ZK], [XN, ZM2], [XB, ZM2], [XB, ZS]];
    extrudePoly(FOOT, 0, 3.0, LAD); extrudePoly(FOOT, 3.0, .12, '#9a5440');
    addCol(XB, ZM, XF, ZS); addCol(XB, ZK, XR, ZM); addCol(XB, ZM2, XN, ZK);   // (z de menor a mayor: con el orden al revés las cajas quedaban vacías) mapRects.push([XB, ZM2, XF, ZS, LAD]);
    const fr = (x, z0, z1) => group(x, (z0 + z1) / 2, Math.PI / 2);   // frente que mira a la avenida: local x = -(z - zc)
    { const g = fr(XF, ZS, ZM); for (let y = .2; y < 3; y += .18) bx(g, 0, y, .02, ZS - ZM, .015, .01, '#c48a72');
      ventana(g, -2.525, .9, 0, 1.8, 1.3); ventana(g, 1.575, .9, 0, 1.8, 1.3); bx(g, -.5, 2.05, .2, .7, .45, .3, '#efefec'); }
    { const g = fr(XR, ZM, ZK); for (let y = .2; y < 3; y += .18) bx(g, 0, y, .02, ZM - ZK, .015, .01, '#c48a72');
      bx(g, -1.25, 0, .03, .95, 2.25, .05, '#f2f2ee'); bx(g, -1.25, .02, .07, .8, 2.15, .04, '#f6f6f4'); ventana(g, .7, .9, 0, 1.8, 1.3); }
    { const g = fr(XN, ZK, ZM2); bx(g, 0, 0, .03, .95, 2.25, .05, '#e6e3dc'); bx(g, 0, .02, .07, .8, 2.15, .03, '#3b4a55'); rejaV(g, 0, .05, .12, .8, 2.1, '#1f1f1f', .1); }   // puerta del costado (descubierta)
    flat.rect(XN, ZK, XF, ZM2, .07, '#c9c2b4');
    // galería bajo el techo: piso, postes y macetas
    flat.rect(-13.7, ZS, XF, ZK, .08, '#c9c2b4'); flat.rect(XF, ZM, XR, ZK, .081, '#c9c2b4');
    for (const z of [-416.3, -420.1, -424.1, -427.9]) { poleIn(group(-13.8, z), [0, 0, 0], [0, 2.95, 0], .06, '#8a8a86'); addCol(-13.9, z - .1, -13.7, z + .1); }
    for (const z of [-418.9, -423.2]) { const m = group(-14.3, z); bx(m, 0, 0, 0, .45, .45, .45, '#b0603a'); addBush(-14.3, z, .4, .45); }
    bx(group(-13.75, -415.75), 0, 0, 0, .45, 1.6, .45, LAD);                                                                   // pilar de ladrillo
    // techo de chapa a cuatro aguas: tapa todo el frente (con la galería) pero no el hueco de la puerta del costado
    { const geo = new THREE.ConeGeometry(1, 1.4, 4, 1); geo.rotateY(Math.PI / 4); const m = new THREE.Mesh(geo, lam({ color: '#a9b0b4' }));
      m.scale.set(11.2 / Math.SQRT2, 1, 12.9 / Math.SQRT2); m.position.set(-18.9, 3.0 + .7, -422.0); scene.add(m); }
    bx(group((XN + XB) / 2, (ZK + ZM2) / 2), 0, 3.0, 0, XN - XB + .3, .12, ZK - ZM2 + .2, '#a9b0b4');
    // tapial que separa la casa del baldío de la bandera (no es la misma casa)
    { const t = group(-24, ZS + .15); bx(t, 0, 0, 0, 20.8, 2.3, .25, '#e6dfd2'); bx(t, 0, 2.3, 0, 20.9, .08, .32, '#cfc8ba'); addCol(-34.4, ZS - .15, -13.6, ZS + .15); }
    { const sg = group(-12.3, -430.6); poleIn(sg, [0, 0, 0], [0, 2.9, 0], .04, '#1f3a8a'); signIn(sg, 'Av Centenario 1000-1100', 0, 2.65, .03, 1.5, .25, '#1f3a8a', '#ffffff', Math.PI / 2);
      signIn(sg, '←', .9, 2.65, .03, .3, .25, '#1f3a8a', '#ffffff', Math.PI / 2); }                                               // cartel de la esquina
    addTree(-10.6, -421.5, 1.25, false, ['#9c7a45', '#8a6a3a']);
  }
  // 2) sobre Monguillot: edificio de 2 plantas rosado — TALLER DE MARIO abajo, tatuajes de MatiMarc arriba (local +x = oeste)
  { const g = group(-29, -429.5, Math.PI);   // local -5..5 (x -24..-34), frente mirando al norte
    body(g, -5, 5, 0, 10, 6.2, '#c47e66'); bx(g, 0, 6.1, .02, 10.05, .14, .2, '#b87260'); bx(g, 0, 3.0, .04, 9.3, .1, .08, '#b87260');   // todo el mismo marroncito (terracota)
    bx(g, 4.65, 0, .05, .7, 6.2, .12, '#9a5a44'); for (let y = .2; y < 6.2; y += .2) bx(g, 4.65, y, .12, .72, .015, .01, '#b47a62');   // pilar de ladrillo
    ventana(g, -3.6, .9, 0, 1.1, 1.3, '#f2f2ee'); bx(g, -1.7, 2.05, .2, .8, .55, .3, '#efefec');
    bx(g, 1.4, 0, .03, 1.7, 2.35, .05, '#f2f2ee'); bx(g, 1.4, .05, .07, 1.5, 2.25, .02, '#3b4a55'); rejaV(g, 1.4, .05, .1, 1.5, 2.2, '#f2f2ee', .16);   // entrada del taller
    for (const [x, w] of [[-3.6, 2.7], [2.0, 6.4]]) { boxIn(g, x, 2.55, .5, w, .06, 1.1, '#f6f6f4', -.3); bx(g, x, 2.2, 1.02, w, .28, .03, '#f6f6f4'); }   // toldos blancos
    signIn(g, 'TALLER DE MARIO', 2.0, 2.34, 1.05, 3.2, .22, '#f6f6f4', '#c0392b');
    ventana(g, -3.7, 3.6, 0, 1.0, 1.1); bx(g, -.6, 4.6, .03, .4, .35, .04, '#3b4a55');
    ventana(g, 2.3, 3.3, 0, 2.8, 2.1, '#f2f2ee');
    signIn(g, 'TATTOO · MatiMarc', -2.3, 3.95, .05, 1.4, .3, '#1f1f1f', '#f2f2ee');
    cylIn(g, -.6, 3.65, .05, .36, .04, '#f2f2ee', 0).rotation.set(Math.PI / 2, 0, 0); cylIn(g, -.6, 3.65, .08, .26, .02, '#c0392b', 0).rotation.set(Math.PI / 2, 0, 0);
    flat.rect(-34, -433.5, -24, -429.5, .2058, '#c9c5ba');
    moto(-26.8, -431.6, Math.PI / 2, '#3a3a3a'); moto(-29.6, -431.9, Math.PI / 2 + .3, '#d9d9d9'); moto(-31.8, -431.3, Math.PI / 2 - .2, '#8a8a8a');
    bandera(-24.6, -432.6, -.5, '#2f5fa8', '#f2f2ee'); bandera(-25.6, -432.9, -.3, '#f2f2ee', '#c0392b');
    poleIn(group(-24.3, -432.6), [0, 0, 0], [0, 3.2, 0], .07, '#c0392b');                                                     // poste rojo
    for (const x of [-16.6, -21.4]) { addTree(x, -432.2, 1.35, false, ['#6f9a45', '#7da54f', '#68903f']); addTree(x + .6, -432.4, .9, false, ['#7da54f', '#86ad55']); }   // aguaribay (pimientero) frente al costado de ladrillo, no tapan el cartel
    { const k = group(-19, -431.3); poleIn(k, [0, 0, 0], [0, .7, 0], .05, '#3a3a3a'); bx(k, 0, .7, 0, 1.1, .6, .7, '#3a3a3a'); cylIn(k, 0, .95, 0, .18, .45, '#f2f2f2'); }   // canasto
    // (al oeste sigue Monguillot lado sur: bloque "Monguillot lado sur, del Taller de Mario a la esquina de Córdoba")
    mapLabels.push([-29, -426, 'Taller de Mario']);
  }
  // 3) patio con reja negra, mástil con bandera celeste (z -417.5..-409) y casita blanca con dos ventanas con reja (z -409..-402.5)
  { const g = group(-13.5, -412.6, Math.PI / 2);   // local -3.4..3.4 (z -409..-416)
    bx(g, 0, 0, -.1, 6.8, .3, .25, '#2a2a2a'); rejaV(g, 0, .3, -.1, 6.8, 1.3, '#1f1f1f', .14); bx(g, -3.4, 0, -.1, .4, 1.7, .4, '#a8604a');
    colLocal(g, -3.4, -.3, 3.4, 0, null);
    flat.rect(-24, -416, -13.6, -409, .062, '#6f9a45');
    poleIn(group(-18.5, -413), [0, 0, 0], [0, 6, 0], .05, '#e8e8e8'); { const f = new THREE.Mesh(new THREE.PlaneGeometry(1.1, .7), lam({ color: '#74acdf', side: THREE.DoubleSide })); f.position.set(-18.5, 5.55, -413.55); f.rotation.y = .4; scene.add(f); }
    { const s = group(-22, -412.8); bx(s, 0, 0, 0, 3, 2.6, 3, '#a05a44'); bx(s, 0, 2.6, 0, 3.3, .1, 3.3, '#9a8a7a'); addCol(-23.5, -414.3, -20.5, -411.3); }   // construcción de ladrillo del fondo
    const c = group(-13.5, -405.75, Math.PI / 2);   // local -3.25..3.25
    body(c, -3.25, 3.25, 0, 8, 3.1, '#e6cc84'); bx(c, 0, 3.0, .03, 6.6, .12, .15, '#d9bd72'); bx(c, 0, 0, .03, 6.5, .3, .05, '#cfb46a');
    { const s = group(-17.5, -402.5, 0);   // costado que da a la calle de la plaza (Sagarduy): ventana con reja, puerta blanca y ventanita
      bx(s, 0, 2.95, .1, 8.1, .1, .25, '#d9bd72'); bx(s, -2.2, .9, .02, 1.4, 1.2, .04, '#2a2a2a'); for (let k = 1; k < 9; k++) bx(s, -2.9 + k * .155, .9, .06, .03, 1.2, .03, '#3a3a3a');
      bx(s, .9, 0, .02, .85, 2.15, .04, '#f2f2ee'); bx(s, 2.6, 1.2, .02, .6, .7, .04, '#3b4a55'); }
    ventana(c, -1.95, 1.0, 0, 1.1, 1.0); ventana(c, 1.4, 1.0, 0, 1.1, 1.0); bx(c, -.1, 0, .03, .8, 2.15, .05, '#f6f6f4');
    addTree(-10.8, -411.3, 1.2, false, ['#9c7a45', '#8a6a3a']); addTree(-10.8, -404.4, 1.1, false, ['#3f6a2a', '#4b7a30', '#557f35']);
  }
  plazaRects.push([-38, -429.5, -13.5, -402.5]);   // sin árboles ni casas al azar
}

// =========================================================================
// Monguillot lado sur, del Taller de Mario (x -34) a la esquina de Córdoba (fotos del usuario, de este a oeste):
// murito blanco · garaje de madera bien metido · casa blanca con faja gris, puerta doble de madera y vidrios, ventanas con reja y entrada metida ·
// galpón grande de techo curvo con dos portones blancos de chapa y pilar de ladrillo · muro viejo con portoncito marrón y 2 portones blancos oxidados ·
// muro de bloques y casa blanca retirada detrás de reja negra (zócalo y alero anaranjados, chimenea) · terreno con muro blanco con enredadera ·
// esquina de Córdoba: casa de ladrillo con techo de tejas a cuatro aguas y ventanas con postigos de madera.
// =========================================================================
{
  const ZL = -429.5;   // línea municipal sur de Monguillot · grupos con ry = PI: local +z = hacia la calle (norte), local +x = oeste = la derecha en las fotos
  const rejaV = (g, x, y0, z, w, h, col, step = .13) => { for (let k = 1; k < Math.round(w / step); k++) bx(g, x - w / 2 + k * step, y0, z, .03, h, .03, col); for (const y of [y0, y0 + h - .04]) bx(g, x, y, z, w + .04, .04, .04, col); };
  const body = (g, x0, x1, d0, d1, h, col) => { bx(g, (x0 + x1) / 2, 0, -(d0 + d1) / 2, x1 - x0, h, d1 - d0, col); colLocal(g, x0, -d1, x1, -d0, col); };
  const ventana = (g, x, y0, z, w, h, rejCol = '#f2f2ee') => { bx(g, x, y0, z + .02, w + .14, h + .12, .05, '#e6e3dc'); bx(g, x, y0 + .06, z + .05, w, h, .02, '#3b4a55'); rejaV(g, x, y0 + .06, z + .09, w, h, rejCol, .12); };
  const postigos = (g, x, y0, z, w, h, col = '#c0703a') => { bx(g, x, y0, z + .02, w + .14, h + .1, .05, '#d9a070'); bx(g, x, y0 + .05, z + .05, w, h, .02, '#3b4a55');
    for (const s of [-1, 1]) { bx(g, x + s * w / 4, y0 + .05, z + .08, w / 2 - .04, h, .03, col); for (let y = y0 + .15; y < y0 + h; y += .11) bx(g, x + s * w / 4, y, z + .1, w / 2 - .1, .02, .01, '#8a4a22'); } };
  const casa = (x0, x1) => group((x0 + x1) / 2, ZL, Math.PI);   // x0 > x1 (este → oeste)
  const PELADO = ['#9c7a45', '#8a6a3a'], VERDE = ['#3f6a2a', '#4b7a30', '#557f35'];

  // M0) murito blanco bajo con escalón (x -34..-36)
  { const g = casa(-34, -36); bx(g, 0, 0, -.15, 2, 1.25, .3, '#f2f0ea'); bx(g, 0, 0, .3, 2, .25, .6, '#c9c5ba'); colLocal(g, -1, -.3, 1, 0, null);
    body(g, -1.02, 1, 5, 14, 2.9, '#f2f0ea'); bx(g, 0, 2.8, -5, 2.05, .15, .3, '#d9d6cf');   // el garaje sigue hasta pegarse al taller (sin hueco entre los dos)
    bx(g, -1, 0, -2.5, .2, 1.25, 5, '#f2f0ea'); flat.rect(-36, ZL, -34, ZL + 5, .065, '#c9c5ba'); }
  // M1) garaje con portón de madera, bien metido hacia adentro (x -36..-39.5, frente a 5 m de la línea)
  { const g = casa(-36, -39.5);   // local -1.75..1.75
    body(g, -1.75, 1.75, 5, 14, 2.9, '#f2f0ea'); bx(g, 0, 2.8, -5, 3.6, .15, .3, '#d9d6cf');
    bx(g, 0, 0, -4.97, 2.8, 2.3, .05, '#e6e3dc'); bx(g, 0, .02, -4.93, 2.6, 2.2, .04, '#b5683a'); for (let y = .25; y < 2.2; y += .22) bx(g, 0, y, -4.9, 2.6, .03, .01, '#8a4a22');
    flat.rect(-39.5, ZL, -36, ZL + 5, .065, '#c9c5ba'); flat.rect(-39.5, ZL - 3.38, -36, ZL, .2058, '#c9c5ba');
  }
  // M2) casa blanca con faja gris arriba: puerta doble de madera con vidrios, ventanas con reja blanca, entrada metida con panel blanco (x -39.5..-48.5)
  { const g = casa(-39.5, -48.5);   // local -4.5..4.5
    body(g, -4.5, .9, 0, 12, 3.2, '#f2f0ea'); body(g, .9, 2.4, 1.0, 12, 3.2, '#f2f0ea'); body(g, 2.4, 4.5, 0, 12, 3.2, '#f2f0ea');
    bx(g, 1.65, 2.4, -.5, 1.5, .8, 1.0, '#f2f0ea'); bx(g, 0, 2.85, .03, 9.05, .4, .08, '#b9b6ae'); bx(g, 0, 0, .03, 9, .3, .05, '#d9d6cf');
    bx(g, -2.85, 0, .03, 2.2, 2.5, .05, '#e6e3dc'); bx(g, -2.85, .02, .07, 2.0, 2.4, .04, '#c06a3a');
    for (let k = 0; k < 6; k++) bx(g, -3.7 + k * .34, .6, .1, .16, 1.6, .01, k % 2 ? '#e8a35a' : '#7a3a1a');                        // puerta doble de madera con vidrios
    ventana(g, -.35, 1.05, 0, .95, .85); ventana(g, 3.45, 1.05, 0, .85, .85);
    bx(g, 1.65, 0, -.97, 1.4, 2.25, .04, '#f6f6f4'); for (let y = .4; y < 2.2; y += .45) bx(g, 1.65, y, -.94, 1.3, .03, .01, '#d9d6cf'); bx(g, 2.2, 0, -.96, .2, 2.25, .03, '#b04a2a');
    flat.rect(-48.5, ZL - 1.6, -39.5, ZL, .2058, '#c9c5ba');
    addTree(-41.5, ZL - 2.7, 1.25, false, PELADO); addTree(-46.4, ZL - 2.7, 1.2, false, PELADO); poleIn(group(-43.3, ZL - 2.4), [0, 0, 0], [0, 8, 0], .12, '#9a9690');
  }
  // M3) galpón grande (x -48.5..-60.5): frente blanco de chapa con dos portones, pilar de ladrillo y pilastras beige; techo curvo
  { const g = casa(-48.5, -56);   // local -3.75..3.75 (más angosto, para que del otro lado entre la reja del patio)
    body(g, -3.75, 3.75, 0, 26.9, 5.2, '#9a5a44'); bx(g, 0, 0, .02, 7.5, 5.2, .03, '#eceae4');   // atraviesa la manzana: sale también a la calle de la plaza (Sagarduy)
    for (const x of [-3.6, 3.6]) bx(g, x, 0, .05, .35, 5.2, .12, '#d9c9a8');
    bx(g, -2.2, 0, .04, 2.5, 4.0, .05, '#f6f6f4'); bx(g, 1.95, 0, .04, 3.0, 4.3, .05, '#f6f6f4');
    for (let x = -3.4; x < -.95; x += .12) bx(g, x, 0, .08, .03, 4.0, .01, '#dcdcd6'); for (let x = .5; x < 3.4; x += .12) bx(g, x, 0, .08, .03, 4.3, .01, '#dcdcd6');
    bx(g, 1.95, 0, .09, .05, 4.3, .02, '#b9b9b3'); bx(g, -.3, 0, .05, 1.0, 4.2, .1, '#a8604a'); for (let y = .2; y < 4.2; y += .2) bx(g, -.3, y, .11, 1.02, .015, .01, '#c48a72');
    bx(g, 0, 4.35, .07, 7.5, .1, .05, '#8f9a8a');
    { const R0 = 6.46, yc = 5.2 + 1.2 - R0; for (let k = 0; k < 6; k++){ const a = -.62 + (k + .5) * 1.24 / 6; boxIn(g, R0 * Math.sin(a), yc + R0 * Math.cos(a), -13.45, 1.45, .08, 27.1, '#d9dcdc', 0, -a); } }   // techo curvo
    flat.rect(-56, ZL - 4, -48.5, ZL, .2058, '#c9c5ba');
    addTree(-47.6, ZL - 2.8, 1.1, false, PELADO);
  }
  // M3b) donde se angostó el galpón: muro de ladrillo con portón de chapa y patio (x -56..-60.5)
  { const g = casa(-56, -60.5);   // local -2.25..2.25
    bx(g, -1.0, 0, -.15, 2.5, 2.4, .3, '#a8604a'); for (let y = .15; y < 2.4; y += .15) bx(g, -1.0, y, .02, 2.5, .015, .01, '#c48a72');
    bx(g, 1.25, 0, -.12, 2.0, 2.3, .06, '#c9ccce'); for (let x = .35; x < 2.2; x += .14) bx(g, x, 0, -.08, .04, 2.3, .02, '#a9adb0');
    colLocal(g, -2.25, -.3, 2.25, 0, null); flat.rect(-60.5, ZL, -56, ZL + 26, .062, '#6f8f45');
  }
  // M4) muro viejo de revoque con portoncito marrón y dos portones blancos de chapa oxidados (x -60.5..-67)
  { const g = casa(-60.5, -67);   // local -3.25..3.25
    body(g, -3.25, 3.25, 0, 10, 3.0, '#b8a890'); for (let k = 0; k < 8; k++) bx(g, R(-3, 3), R(2.3, 2.9), .02, R(.4, 1.2), R(.2, .5), .02, '#a89878');
    bx(g, -2.9, 0, .04, .7, 2.3, .05, '#7a4a2a'); for (let x = -3.15; x < -2.6; x += .12) bx(g, x, .05, .08, .03, 2.2, .02, '#5a3420');
    for (const x of [-1.45, 1.55]) { bx(g, x, 0, .03, 2.5, 2.35, .05, '#8a4a3a'); bx(g, x, .03, .07, 2.35, 2.25, .03, '#ecebe6');
      for (let k = 0; k < 4; k++) bx(g, x + R(-1, 1), R(.1, 1.8), .09, R(.1, .25), R(.3, .7), .01, '#b0603a'); bx(g, x, .03, .1, .03, 2.25, .01, '#9a9a96'); }
    flat.rect(-67, ZL - 4, -60.5, ZL, .2058, '#c9c5ba');
    addTree(-67.6, ZL - 2.8, 1.15, false, PELADO);
  }
  // M5) muro de bloques y casa blanca retirada detrás de reja negra sobre murito anaranjado: zócalo y alero anaranjados, chimenea (x -67..-75.5)
  { const g = casa(-67, -75.5);   // local -4.25..4.25
    body(g, -4.25, -2.4, 0, .3, 2.4, '#a9a69e'); for (let y = .2; y < 2.4; y += .2) bx(g, -3.3, y, .02, 1.85, .015, .01, '#8f8c84');
    bx(g, .9, 0, -.1, 6.6, .5, .25, '#c8663a'); rejaV(g, .9, .5, -.1, 6.6, 1.2, '#1f1f1f', .12); for (const x of [-2.4, 4.2]) bx(g, x, 0, -.1, .3, 1.9, .3, '#e6e3dc');
    colLocal(g, -2.4, -.25, 4.25, 0, null);
    body(g, -2.4, 4.25, 3, 12, 3.0, '#f2f0ea'); bx(g, .9, 0, -2.97, 6.65, .55, .05, '#c8663a');
    boxIn(g, .9, 3.05, -2.7, 7.0, .1, .9, '#c0703a', .35); bx(g, .9, 3.0, -7.5, 6.65, .5, 9, '#d9d6cf');
    bx(g, -.4, 0, -2.97, 1.1, 2.4, .05, '#c0703a'); bx(g, -.4, .05, -2.93, .9, 2.25, .03, '#3b4a55'); rejaV(g, -.4, .05, -2.88, .9, 2.25, '#1f1f1f', .11);
    bx(g, 2.9, .9, -2.97, 1.2, 1.2, .05, '#c0703a'); bx(g, 2.9, .95, -2.93, 1.0, 1.1, .02, '#3b4a55'); rejaV(g, 2.9, .95, -2.88, 1.0, 1.1, '#1f1f1f', .12);
    bx(g, 1.3, 3.0, -5, .7, 1.5, .7, '#a8563e'); bx(g, 1.3, 4.5, -5, .9, .12, .9, '#e6e3dc');                                    // chimenea
    flat.rect(-75.5, ZL, -69.4, ZL + 3, .062, '#b9b4aa'); addBush(-70.5, ZL + 1.5, .5, 0);
    addTree(-69.6, ZL - 2.8, 1.05, false, PELADO); addTree(-74.6, ZL - 2.8, 1.2, false, PELADO);
    { const m = group(-71.5, ZL - 1.2); for (const [x, z] of [[-.3, -.25], [.3, -.25], [-.3, .25], [.3, .25]]) poleIn(m, [x, 0, z], [x, .75, z], .02, '#4a4a4a'); bx(m, 0, .75, 0, .75, .45, .55, '#6a6e66'); }   // canasto
  }
  // M6) terreno con muro blanco viejo cubierto de enredadera, árboles y un toldo verde atrás (x -75.5..-81.5)
  { const g = casa(-75.5, -81.5);   // local -3..3
    bx(g, -2.3, 0, -.15, 1.4, 2.3, .3, '#8a8a84'); bx(g, .7, 0, -.15, 4.6, 1.7, .3, '#e6e3dc'); colLocal(g, -3, -.3, 3, 0, null);
    for (let k = 0; k < 9; k++) bx(g, R(-1.4, 2.8), R(1.0, 1.75), R(-.05, .08), R(.5, 1.2), R(.3, .8), .35, k % 2 ? '#3f6a2a' : '#4f7a35');   // enredadera
    flat.rect(-81.5, ZL, -75.5, ZL + 12, .062, '#6f8f45');
    addTree(-77, ZL + 3, 1.3, false, VERDE); addTree(-79.5, ZL + 6, 1.1, false, ['#6a5a3a', '#7a6a45']); addTree(-76.5, ZL + 8, 1.2, false, VERDE);
    { const a = group(-80.6, ZL + 1.5, Math.PI); const m = new THREE.Mesh(new THREE.CylinderGeometry(.9, .9, 2.2, 12, 1, true, 0, Math.PI), lam({ color: '#2f6a4a', side: THREE.DoubleSide })); m.rotation.z = Math.PI / 2; m.position.set(0, 2.2, 0); a.add(m); }   // toldo verde
    addTree(-78.5, ZL - 2.8, 1.15, false, PELADO);
  }
  // M7) ESQUINA Monguillot y Córdoba: casa de ladrillo claro con techo de tejas a cuatro aguas y ventanas con postigos de madera (x -81.5..-89.5)
  { const LAD = '#b98a6a', P = [[-89.5, ZL], [-81.5, ZL], [-81.5, ZL + 10], [-89.5, ZL + 10]];
    extrudePoly(P, 0, 3.0, LAD); addCol(-89.5, ZL, -81.5, ZL + 10); mapRects.push([-89.5, ZL, -81.5, ZL + 10, '#b0563a']);
    { const geo = new THREE.ConeGeometry(1, 2.1, 4, 1); geo.rotateY(Math.PI / 4); const m = new THREE.Mesh(geo, lam({ color: '#b0563a' }));
      m.scale.set(9.3 / Math.SQRT2, 1, 11.3 / Math.SQRT2); m.position.set(-85.5, 3.0 + 1.05, ZL + 5); scene.add(m); }
    const g = group(-85.5, ZL, Math.PI);   // frente sobre Monguillot (local -4..4, +x = oeste)
    for (let y = .2; y < 3; y += .16) bx(g, 0, y, .02, 8, .015, .01, '#a8785a');
    postigos(g, -2.3, .9, 0, 1.4, 1.25); bx(g, -.2, 0, .03, .5, 3.0, .1, '#a8785a');
    bx(g, 1.6, .55, .03, 2.0, 1.85, .05, '#c0703a'); for (let i = 0; i < 4; i++) for (let j = 0; j < 3; j++) bx(g, .95 + i * .44, .65 + j * .58, .07, .38, .5, .01, '#3b4a55');   // ventanal de madera
    bx(g, 1.6, 0, .03, 2.1, .55, .1, '#a8785a'); bx(g, 3.6, 0, .05, .5, 3.0, .12, '#a8785a'); bx(g, .9, 0, .4, .4, .45, .4, '#b0603a'); addBush(-85.5 - .9, ZL - .4, .35, .45);
    const c = group(-89.5, ZL + 5, -Math.PI / 2);   // costado sobre Córdoba (local +x = sur): puerta de madera junto a la esquina, 3 ventanas con postigos
    for (let y = .2; y < 3; y += .16) bx(c, 0, y, .02, 10, .015, .01, '#a8785a');
    bx(c, -3.3, 0, .03, 1.0, 2.3, .05, '#d9a070'); bx(c, -3.3, .02, .07, .85, 2.2, .04, '#9a5a2a'); for (let y = .3; y < 2.1; y += .3) bx(c, -3.3, y, .1, .75, .03, .01, '#7a4420');
    postigos(c, -1.5, .9, 0, 1.1, 1.25); postigos(c, .7, .9, 0, 1.1, 1.25); postigos(c, 3.2, .9, 0, 1.4, 1.25);
    bx(c, .5, 0, .6, 4.2, .4, .6, '#a8785a'); bx(c, .5, .4, .6, 4.0, .05, .5, '#4f7a35');                                        // cantero bajo de ladrillo
    // garaje con portón de madera pegado al sur, bajo el mismo techo de tejas
    { const P2 = [[-89.5, ZL + 10], [-81.5, ZL + 10], [-81.5, ZL + 13], [-89.5, ZL + 13]]; extrudePoly(P2, 0, 2.8, LAD); addCol(-89.5, ZL + 10, -81.5, ZL + 13);
      const geo = new THREE.ConeGeometry(1, 1.2, 4, 1); geo.rotateY(Math.PI / 4); const m = new THREE.Mesh(geo, lam({ color: '#b0563a' }));
      m.scale.set(8.8 / Math.SQRT2, 1, 3.8 / Math.SQRT2); m.position.set(-85.5, 2.8 + .6, ZL + 11.5); scene.add(m);
      const gg = group(-89.5, ZL + 11.5, -Math.PI / 2); bx(gg, 0, 0, .03, 2.6, 2.3, .05, '#d9a070'); bx(gg, 0, .02, .07, 2.4, 2.2, .04, '#b5683a'); bx(gg, 0, .02, .1, .03, 2.2, .01, '#7a4420');
      flat.rect(-92.88, ZL + 10.1, -89.5, ZL + 12.9, .2058, '#c9c5ba'); }
    bx(group(-81.3, ZL + 1.2), 0, 0, 0, .3, 2.2, 2.4, '#e6e3dc');                                                                  // murito blanco al lado
    poleIn(group(-81.7, ZL - 3.0), [0, 0, 0], [0, 7.5, 0], .1, '#c0392b'); poleIn(group(-87.8, ZL - 3.1), [0, 0, 0], [0, 8, 0], .14, '#c9c4b8');
    addTree(-85.2, ZL - 2.7, 1.15, false, PELADO);
    { const m = group(-83.2, ZL - 1.4); for (const [x, z] of [[-.3, -.25], [.3, -.25], [-.3, .25], [.3, .25]]) poleIn(m, [x, 0, z], [x, .75, z], .02, '#4a4a4a'); bx(m, 0, .75, 0, .75, .45, .55, '#6a6e66'); }
  }
  plazaRects.push([-89.6, -429.5, -34, -409]);   // sin árboles ni casas al azar
}

// =========================================================================
// Córdoba lado este, de la casa de tejas de la esquina de Monguillot al Cuartel de Bomberos (fotos del usuario, de norte a sur):
// terreno con alambrado verde y jardín · casitas color crema: cubo bajo con puerta y tanque, ventana con postigos de madera,
// galería con reja negra alta, ventanal y puerta bajo un alero de chapa, y el sector con la lona azul pegado a los bomberos.
// =========================================================================
{
  const XL = -89.5;   // grupos con ry = -PI/2: local +z = hacia Córdoba (oeste), local +x = sur = la derecha en las fotos
  const rejaV = (g, x, y0, z, w, h, col, step = .13) => { for (let k = 1; k < Math.round(w / step); k++) bx(g, x - w / 2 + k * step, y0, z, .03, h, .03, col); for (const y of [y0, y0 + h - .04]) bx(g, x, y, z, w + .04, .04, .04, col); };
  const body = (g, x0, x1, d0, d1, h, col) => { bx(g, (x0 + x1) / 2, 0, -(d0 + d1) / 2, x1 - x0, h, d1 - d0, col); colLocal(g, x0, -d1, x1, -d0, col); };
  const CRE = '#ddd3be';
  // terreno con alambrado verde sobre murito, jardín con bananos y un poste de luz (z -416.5..-411)
  { const g = group(XL, -413.75, -Math.PI / 2);   // local -2.75..2.75
    bx(g, 0, 0, -.1, 5.5, .4, .25, '#bdb8ac'); for (const x of [-2.7, -.9, .9, 2.7]) bx(g, x, 0, -.1, .2, 1.9, .2, '#c9c4b8');
    const mesh = new THREE.Mesh(new THREE.PlaneGeometry(5.4, 1.5), new THREE.MeshLambertMaterial({ color: 0x2f6a3a, transparent: true, opacity: .45, side: THREE.DoubleSide })); mesh.position.set(0, 1.15, -.1); g.add(mesh);
    colLocal(g, -2.75, -.25, 2.75, 0, null);
    flat.rect(XL, -416.5, XL + 12, -411, .062, '#6f9a45');
    addTree(XL + 3, -414, .9, false, ['#5f9a3a', '#6dab45']); addTree(XL + 6, -412.5, 1.2, false, ['#3f6a2a', '#4b7a30']); addBush(XL + 1.5, -412, .9, 0); addBush(XL + 2, -415.3, .7, 0);
    poleIn(group(XL - 1.2, -412.3), [0, 0, 0], [0, 7.5, 0], .12, '#b9b2a2');
    for (const [x, z, c] of [[XL - 2.6, -415.6, '#2f5fa8'], [XL - 2.2, -414.4, '#f2f2f2'], [XL - 2.9, -411.4, '#f2c21b']]) { const b = cylIn(group(x, z), 0, .25, 0, .2, .5, c, 0); b.rotation.z = R(0, 1.6); }   // baldes tirados
  }
  // casitas color crema (z -411..-398): todo seguido hasta el Cuartel de Bomberos
  { const g = group(XL, -404.5, -Math.PI / 2);   // local -6.5..6.5
    body(g, -6.5, -4.5, 0, 12, 2.8, CRE); body(g, -4.5, -2.25, 0, 12, 3.1, CRE); body(g, -2.25, 1.5, 1.2, 12, 3.1, CRE); body(g, 1.5, 6.5, 0, 12, 3.1, '#e2d8c4');
    bx(g, -.4, 2.6, -.6, 3.75, .5, 1.2, CRE); bx(g, 0, 3.0, .03, 13, .15, .2, '#c9c2b0');
    cylIn(g, -5.4, 3.35, -2, .45, 1.0, '#e8e8e8'); bx(g, -1.0, 3.1, -3, .5, .9, .5, '#d9d6cf');
    bx(g, -5.5, 0, .03, .8, 2.1, .05, '#d9d2c0'); bx(g, -5.5, .02, .07, .68, 2.05, .03, '#2e3236');                              // puerta oscura del cubo bajo
    bx(g, -3.0, .85, .03, 1.15, 1.3, .05, '#3b4a55'); for (const s of [-1, 1]) bx(g, -3.0 + s * .85, .85, .1, .55, 1.3, .04, '#8a4a2a');   // ventana con postigos abiertos
    // galería con reja negra alta y portón (adentro ventana, puerta y otra ventana)
    rejaV(g, -.4, .1, -.1, 3.7, 2.4, '#1f1f1f', .16); for (const x of [-2.2, -.4, 1.4]) bx(g, x, 0, -.1, .14, 2.6, .14, '#1f1f1f');
    colLocal(g, -2.25, -.25, 1.5, 0, null);
    bx(g, -1.5, .9, -1.17, 1.0, 1.1, .03, '#3b4a55'); bx(g, -.3, 0, -1.17, .8, 2.1, .03, '#3a3030'); bx(g, .9, 1.0, -1.17, .6, .9, .03, '#3b4a55');
    bx(g, -.4, 0, -.6, 3.75, .1, 1.2, '#c9c2b4');
    // ventanal y puerta bajo un alero de chapa sobre postes; sector de la lona azul junto a los bomberos
    bx(g, 2.2, .7, .03, 1.2, 1.5, .05, '#2e3236'); for (let k = 1; k < 4; k++) bx(g, 1.6 + k * .3, .7, .07, .03, 1.5, .02, '#5a5a5a');
    bx(g, 3.5, 0, .03, .85, 2.2, .05, '#2e3236');
    boxIn(g, 4.0, 2.5, 1.1, 5.0, .06, 2.4, '#b9bec2', .12); for (const x of [2.9, 4.6, 6.3]) poleIn(g, [x, 0, 2.2], [x, 2.35, 2.2], .04, '#3a3a3a');
    bx(g, 5.6, .3, .08, 1.6, 2.0, .04, '#2f5fb5'); for (let k = 0; k < 4; k++) bx(g, 5.0 + k * .4, .5, .1, .25, 1.6, .02, '#3a6ac8');   // lona azul
    bx(g, 5.0, 2.2, .2, .7, .45, .3, '#efefec');
    flat.rect(XL - 1.9, -411, XL, -398, .206, '#c4bfb4');
    addTree(XL - 2.8, -410, 1.15, false, ['#9c7a45', '#8a6a3a']); addTree(XL - 2.8, -403.2, .5, false, ['#9c7a45', '#8a6a3a']);
    poleIn(group(XL - 2.6, -398.6), [0, 0, 0], [0, 8, 0], .12, '#c0392b');
  }
  plazaRects.push([-89.6, -419.5, -77.5, -398]);   // sin árboles ni casas al azar
}

// =========================================================================
// Calle Sagarduy (tramo norte de la L de la plaza de la Comuna), de la esquina de los Bomberos a la avenida (fotos del usuario, de oeste a este):
// terreno con reja negra, portón blanco y cerco de ligustro · muro de ladrillo con portón de madera · casa de ladrillo oscuro con marcos amarillos ·
// el galpón grande (el mismo de Monguillot, atraviesa la manzana) con su abertura y el portón blanco · murito verde con puerta ·
// galpón de chapa con techo curvo y portones abiertos · muro amarillo con portón blanco doble · portón de reja hasta la casita amarilla de la esquina.
// =========================================================================
{
  const ZF = -402.5;   // línea de los frentes (miran al sur, a la plaza) · grupos sin rotar: local +x = este = la derecha en las fotos
  const rejaV = (g, x, y0, z, w, h, col, step = .13) => { for (let k = 1; k < Math.round(w / step); k++) bx(g, x - w / 2 + k * step, y0, z, .03, h, .03, col); for (const y of [y0, y0 + h - .04]) bx(g, x, y, z, w + .04, .04, .04, col); };
  const body = (g, x0, x1, d0, d1, h, col) => { bx(g, (x0 + x1) / 2, 0, -(d0 + d1) / 2, x1 - x0, h, d1 - d0, col); colLocal(g, x0, -d1, x1, -d0, col); };
  const casa = (x0, x1) => group((x0 + x1) / 2, ZF, 0);
  const VERDE = ['#3f6a2a', '#4b7a30', '#557f35'];
  flat.rect(-63.5, ZF, -21.5, -400.5, .075, '#c9c4b8');   // vereda
  // (el terreno con la reja negra y el portón blanco está en la esquina, siguiendo la línea del cuartel: bloque de los Bomberos)
  addTree(-73, -405.5, 1.4, false, VERDE); addTree(-76, -398.5, 1.2, false, VERDE); addPalm(-70.5, -400, .7); addBush(-68, -404, .6, 0); addTree(-69, -407.5, 1.1, false, VERDE);   // patio de atrás
  // el patio es de las casitas crema de Córdoba (va desde el terreno del alambrado sobre Córdoba hasta la reja de Sagarduy):
  // tapiales que lo separan de las casas que NO son dueñas (las de Monguillot al norte y las de Sagarduy al este)
  { const tap = (x0, z0, x1, z1) => { const g = group((x0 + x1) / 2, (z0 + z1) / 2), L = Math.hypot(x1 - x0, z1 - z0), hz = Math.abs(x1 - x0) > Math.abs(z1 - z0);
      bx(g, 0, 0, 0, hz ? L : .25, 2.4, hz ? .25 : L, '#e6e1d6'); bx(g, 0, 2.4, 0, hz ? L + .05 : .32, .08, hz ? .32 : L + .05, '#d4cec2');
      addCol(Math.min(x0, x1) - .15, Math.min(z0, z1) - .15, Math.max(x0, x1) + .15, Math.max(z0, z1) + .15); };
    tap(-81.5, -417.3, -63.5, -417.3);   // al norte: contra el terreno de la enredadera, la casa de la reja y los portones oxidados de Monguillot
    tap(-63.4, -417.3, -63.4, -402.7);   // al este: contra el muro del portón de madera, la casa de marcos amarillos y el patio del galpón
    flat.rect(-81.5, -417.3, -63.5, -402.5, .063, '#6f9a45'); flat.rect(-89.5, -416.5, -81.5, -411, .063, '#6f9a45');
    addTree(-79, -414, 1.3, false, VERDE); addTree(-66.5, -414.5, 1.2, false, VERDE); addBush(-72, -415.8, .8, 0);
    // alambrado (malla verde sobre postes de cemento) en los lados del patio que dan a la calle de la plaza (detrás del ligustro y en la esquina)
    const alam = (x0, z0, x1, z1) => { const L = Math.hypot(x1 - x0, z1 - z0), g = group((x0 + x1) / 2, (z0 + z1) / 2, Math.atan2(x1 - x0, z1 - z0) + Math.PI / 2);
      const m = new THREE.Mesh(new THREE.PlaneGeometry(L, 1.6), new THREE.MeshLambertMaterial({ color: 0x2f6a3a, transparent: true, opacity: .45, side: THREE.DoubleSide })); m.position.y = .95; g.add(m);
      for (let k = 0; k <= Math.round(L / 2.5); k++) bx(g, -L / 2 + k * L / Math.round(L / 2.5), 0, 0, .14, 1.9, .14, '#c9c4b8');
      addCol(Math.min(x0, x1) - .1, Math.min(z0, z1) - .1, Math.max(x0, x1) + .1, Math.max(z0, z1) + .1); };
    alam(-65.9, -398.3, -65.9, -402.6); alam(-65.9, -402.9, -63.5, -402.9); }
  // S2) muro de ladrillo con portón de madera (x -63.5..-62)
  { const g = casa(-63.5, -62); bx(g, -.35, 0, -.15, .8, 2.2, .3, '#a8604a'); bx(g, .35, 0, -.1, .7, 2.0, .06, '#8a7a62'); colLocal(g, -.75, -.3, .75, 0, null); }
  // S3) casa de ladrillo oscuro con marcos amarillos: portón de madera del garaje, puerta de madera, ventana con postigos (x -62..-56)
  { const g = casa(-62, -56), AM = '#e8a838';   // local -3..3
    body(g, -3, 3, 0, 12, 3.1, '#7a3a2e'); bx(g, 0, 2.85, .05, 6.1, .3, .15, AM); for (const x of [-2.9, 2.9]) bx(g, x, 0, .05, .25, 3.1, .15, AM);
    for (let y = .2; y < 2.8; y += .17) bx(g, 0, y, .02, 5.8, .015, .01, '#8e4a3c');
    bx(g, -1.55, 0, .03, 2.4, 2.3, .05, AM); bx(g, -1.55, .02, .07, 2.2, 2.2, .04, '#b5683a'); for (let x = -2.55; x < -.6; x += .27) bx(g, x, .05, .1, .03, 2.1, .01, '#8a4a22');
    bx(g, .55, 0, .03, .95, 2.25, .05, AM); bx(g, .55, .02, .07, .8, 2.15, .04, '#b5683a');
    bx(g, 2.0, .8, .03, 1.4, 1.3, .05, AM); for (let x = 1.4; x < 2.7; x += .21) bx(g, x, .85, .07, .17, 1.2, .03, '#b5683a');
    flat.rect(-62, ZF, -56, ZF + 1.5, .076, '#6a6460');
  }
  // S4) frente del galpón grande sobre Sagarduy (el mismo de Monguillot, un poco más angosto): ladrillo, abertura oscura y portón blanco corrido (x -56..-48.5)
  { const g = casa(-56, -48.5);   // local -3.75..3.75
    bx(g, -2.3, 0, .02, 2.9, 4.6, .04, '#b08a6a'); for (let y = .2; y < 4.6; y += .2) bx(g, -2.3, y, .05, 2.9, .015, .01, '#c9a88a');
    for (const x of [-3.6, -.85, 3.6]) bx(g, x, 0, .06, .3, 4.8, .1, '#d9c9a8');
    bx(g, .4, 0, .03, 2.5, 4.1, .05, '#2a2622'); bx(g, 2.6, 0, .08, 1.9, 4.3, .06, '#f2f0ea'); for (let x = 1.75; x < 3.5; x += .2) bx(g, x, .05, .12, .03, 4.2, .01, '#d9d6cf');
    bx(g, 0, 4.6, .03, 7.5, .6, .05, '#c9cccc');
    flat.rect(-56, ZF, -48.5, -400.5, .0765, '#bdb8ac');
  }
  // S5) murito verde claro con puerta gris (x -48.5..-46.5)
  { const g = casa(-48.5, -46.5); bx(g, 0, 0, -.15, 2, 1.9, .3, '#b9c9b0'); bx(g, .1, 0, -.05, .8, 1.8, .05, '#8a8f8c'); colLocal(g, -1, -.3, 1, 0, null); }
  // S6) galpón de chapa con techo curvo y portones corredizos (uno abierto con cosas adentro) (x -46.5..-34.5)
  { const g = casa(-46.5, -34.5);   // local -6..6
    body(g, -6, 6, 0, 12.5, 4.4, '#9a9ea0'); bx(g, -5.6, 0, .03, .8, 4.4, .05, '#a8604a');
    bx(g, -2.7, 0, .05, 4.4, 4.2, .05, '#b9bdbf'); for (let x = -4.85; x < -.5; x += .2) bx(g, x, .05, .09, .03, 4.1, .01, '#9ea2a4');
    bx(g, 1.2, 0, .03, 3.6, 4.0, .05, '#1f1d1b'); bx(g, 1.2, 0, -.6, 3.6, .05, 1.2, '#6a6460');
    bx(g, 4.3, 0, .05, 3.2, 4.2, .05, '#b9bdbf'); for (let x = 2.8; x < 5.9; x += .2) bx(g, x, .05, .09, .03, 4.1, .01, '#9ea2a4');
    { const R0 = 10.3, yc = 4.4 + 1.8 - R0; for (let k = 0; k < 6; k++){ const a = -.62 + (k + .5) * 1.24 / 6; boxIn(g, R0 * Math.sin(a), yc + R0 * Math.cos(a), -6.25, 2.15, .08, 12.6, '#a9adb0', 0, -a); } }
    { const t = group(-39.6, -401.5); bx(t, 0, .75, 0, 1.4, .05, .7, '#8a6a4a'); for (const [x, z] of [[-.6, -.3], [.6, -.3], [-.6, .3], [.6, .3]]) poleIn(t, [x, 0, z], [x, .75, z], .02, '#3a3a3a'); }   // mesita de caballete
    flat.rect(-46.5, ZF, -34.5, -400.5, .0765, '#bdb8ac');
  }
  // S7) muro amarillo con portón blanco doble (vidrios angostos) y tanque arriba; portón de reja negra con alero de lona azul hasta la casita amarilla (x -34.5..-21.5)
  { const g = casa(-34.5, -26);   // local -4.25..4.25
    body(g, -4.25, 4.25, 0, 6.5, 2.7, '#e6cc84'); bx(g, 0, 2.6, .05, 8.6, .12, .2, '#d9bd72');
    bx(g, -.3, 0, .03, 2.4, 2.3, .05, '#f2f2ee'); for (const x of [-.95, .35]) bx(g, x, .4, .07, .2, 1.6, .02, '#8a4a3a'); bx(g, -.3, 0, .08, .03, 2.3, .01, '#d9d6cf');
    cylIn(g, 2.2, 3.4, -3.5, .55, 1.1, '#2a2a2a'); bx(g, 2.2, 2.7, -3.5, 1.2, .3, 1.2, '#e6cc84');
    const r = casa(-26, -21.5); rejaV(r, 0, .05, -.1, 4.5, 1.6, '#1f1f1f', .12); colLocal(r, -2.25, -.25, 2.25, 0, null);
    { const lona = new THREE.Mesh(new THREE.PlaneGeometry(4.2, 3), lam({ color: '#2f6fd0', side: THREE.DoubleSide })); lona.rotation.x = -Math.PI / 2 + .12; lona.position.set(-23.8, 2.5, -405); scene.add(lona); }
    flat.rect(-26, -409, -21.5, ZF, .065, '#c9c4b8');
    addTree(-26.6, -401.3, 1.25, false, VERDE);
  }
  // árboles grandes de la vereda (sin tapar portones)
  addTree(-62.8, -401.4, 1.35, false, VERDE); addTree(-56.0, -401.4, 1.25, false, VERDE); addTree(-45.6, -401.3, .9, false, ['#9c7a45', '#8a6a3a']);
  plazaRects.push([-77.5, -409, -21.5, -400.5]);   // sin árboles ni casas al azar
}

// =========================================================================
// Dr. Brunet lado norte, de la Farmacia Ferretti (x -26) a la esquina de Córdoba (fotos de Street View del usuario, de este a oeste):
// A "KECO QUETA" blanca con cornisa y paneles grises, entrada con toldito gris y puerta doble de madera, ventanas con reja blanca ·
// B casa de techo a dos aguas de teja: abajo ladrillo con portón enrollable y puerta de madera, hastial blanco con dos cuadritos naranjas,
//   chimenea de piedra, reja negra sobre muro de ladrillo, jardín con figuras blancas, portón del pasillo de autos y araucaria atrás ·
// C ladrillo retirada con reja verde · D gris manchada con portón de garaje de madera, persianas y entrada metida ·
// E planta baja de ladrillo con pilastras blancas y parapeto gris manchado · F esquina con ochava (Córdoba y Dr. Brunet): techo de chapa verde,
//   puerta-ventana blanca con cortinas rojas entre rejas, toldo verde, aire acondicionado y ventana con reja y toldito.
// =========================================================================
{
  const ZB = -55.5;   // línea municipal sobre Dr. Brunet · local: +z = hacia la calle (sur), +x = este = la derecha en las fotos
  const body = (g, x0, x1, d0, d1, h, col) => { bx(g, (x0 + x1) / 2, 0, -(d0 + d1) / 2, x1 - x0, h, d1 - d0, col); colLocal(g, x0, -d1, x1, -d0, col); };
  const rejaV = (g, x, y0, z, w, h, col, step = .13) => { for (let k = 1; k < Math.round(w / step); k++) bx(g, x - w / 2 + k * step, y0, z, .03, h, .03, col); for (const y of [y0, y0 + h - .04]) bx(g, x, y, z, w + .04, .04, .04, col); };
  const enrollar = (g, x, y0, w, h, col, lin) => { bx(g, x, y0, .04, w, h, .05, col); for (let y = y0 + .1; y < y0 + h - .04; y += .1) bx(g, x, y, .07, w, .02, .01, lin); bx(g, x, y0 + h, .06, w + .1, .18, .1, lin); };
  const veredaB = (x0, x1, col = '#c4bfb4', gr = '#6f8f45') => { flat.rect(x0, ZB, x1, ZB + 1.9, .206, col); flat.rect(x0, ZB + 1.9, x1, ZB + 3.5, .205, gr); };
  const PELADO = ['#9c7a45', '#8a6a3a'];
  const sub = (g, z) => { const f = group(0, 0); g.add(f); f.position.set(0, 0, z); return f; };   // subgrupo con el frente corrido hacia atrás
  const hastial = (g, cx, y0, z, w, h, col) => { const sh = new THREE.Shape(); sh.moveTo(-w / 2, 0); sh.lineTo(w / 2, 0); sh.lineTo(0, h); sh.lineTo(-w / 2, 0);
    const m = new THREE.Mesh(new THREE.ExtrudeGeometry(sh, { depth: .2, bevelEnabled: false }), lam({ color: col })); m.position.set(cx, y0, z - .2); g.add(m); };
  const techo2 = (g, cx, y0, z0, z1, w, h, col) => {   // dos aguas con la cumbrera a lo largo de z (hastial al frente)
    const half = w / 2, ang = Math.atan2(h, half), sl = Math.hypot(half, h) + .4;
    for (const s of [-1, 1]) { const m = new THREE.Mesh(new THREE.BoxGeometry(sl, .14, z1 - z0), lam({ color: col })); m.position.set(cx + s * half / 2, y0 + h / 2 + .06, (z0 + z1) / 2); m.rotation.z = -s * ang; g.add(m); } };
  const techo4 = (cx, cz, y0, W, D, h, col) => {       // techo a cuatro aguas (pirámide estirada)
    const geo = new THREE.ConeGeometry(1, h, 4, 1); geo.rotateY(Math.PI / 4); const m = new THREE.Mesh(geo, lam({ color: col }));
    m.scale.set(W / Math.SQRT2, 1, D / Math.SQRT2); m.position.set(0, y0 + h / 2, 0); group(cx, cz).add(m); };
  const bici = (x, z, ry) => { const b = group(x, z, ry); for (const s of [-1, 1]) { const t = new THREE.Mesh(new THREE.TorusGeometry(.32, .03, 6, 16), lam({ color: 0x222222 })); t.position.set(s * .5, .34, 0); b.add(t); }
    poleIn(b, [-.5, .34, 0], [0, .72, 0], .025, '#333333'); poleIn(b, [0, .72, 0], [.5, .34, 0], .025, '#333333'); poleIn(b, [-.25, .72, 0], [.42, .78, 0], .025, '#333333'); poleIn(b, [.42, .78, 0], [.42, .95, 0], .02, '#333333'); };

  // A) KECO QUETA (x -40..-26): blanca, cornisa corrida, paneles grises arriba, zócalo rosado; pilastra de piedra contra la Ferretti
  { const g = group(-33, ZB), w = 14;   // local -7..7
    body(g, -7, 7, 0, 16, 4.8, '#efede8');
    bx(g, 0, 2.95, .25, w, .16, .55, '#e4e1da'); bx(g, 0, 4.72, .02, w + .05, .12, .18, '#e4e1da');
    bx(g, -4.85, 3.45, .03, 2.6, .65, .04, '#a9a7a2'); bx(g, -.15, 3.45, .03, 1.9, .65, .04, '#a9a7a2'); bx(g, -4.6, 3.95, .05, .8, .45, .03, '#f6f6f4');
    signIn(g, 'KECO QUETA', 2.8, 4.15, .05, 2.6, .42, '#efede8', '#6a6a6a');
    bx(g, 4.4, 3.3, .03, 1.2, .45, .03, '#f6f6f4'); bx(g, 5.9, 3.3, .2, .8, .55, .3, '#efefec');
    bx(g, -5.4, 0, .03, 3.2, .35, .06, '#9a948a'); bx(g, 1.5, 0, .03, 11, .35, .06, '#d9a090');
    bx(g, -6.2, 0, .06, .4, 2.9, .1, '#9a9894'); bx(g, -5, 0, .06, 1.1, 2.9, .1, '#9a9894');
    for (const x of [-5.8, -4.2]) { bx(g, x, .05, .04, .55, 2.3, .07, '#f6f6f4'); bx(g, x, .15, .09, .4, 2.1, .02, '#3b4a55'); }
    bx(g, -1.75, .4, .04, 1.4, 2.0, .06, '#f6f6f4'); bx(g, -1.75, .5, .08, 1.25, 1.8, .02, '#d8d4cc'); bx(g, -1.75, .5, .09, .04, 1.8, .02, '#f6f6f4');   // ventanal con cortina
    bx(g, -.15, .3, .04, 1.1, 2.4, .06, '#7d8085'); for (let x = -.6; x < .4; x += .15) bx(g, x, .35, .08, .03, 2.3, .02, '#666a6f');                       // chapa gris
    bx(g, 1.8, 0, .04, 1.4, 2.45, .06, '#f6f6f4'); bx(g, 1.8, .05, .08, 1.15, 2.3, .03, '#8a4a2a'); for (const s of [-1, 1]) bx(g, 1.8 + s * .29, .9, .1, .38, 1.15, .01, '#e6e8ea');
    bx(g, 1.8, 0, .3, 1.6, .12, .5, '#c9c6bd'); bx(g, 1.8, 2.55, .4, 1.8, .1, .75, '#6e7277'); bx(g, 1.8, 2.4, .77, 1.8, .25, .03, '#6e7277');                 // escalón y toldito gris
    for (const x of [.95, 2.65]) { bx(g, x, 0, .3, .28, .3, .28, '#8a6a50'); bx(g, x, .3, .3, .32, .3, .32, '#4f7a3a'); }                                    // macetas
    for (const x of [3.6, 5.0]) { bx(g, x, .4, .04, 1.2, 1.75, .06, '#f6f6f4'); bx(g, x, .45, .07, 1.05, 1.65, .02, '#3b4a55'); for (let k = 1; k < 8; k++) bx(g, x - .525 + k * .131, .45, .11, .03, 1.65, .03, '#ededed'); }
    bx(g, 6.7, 0, .15, .6, 5.0, .35, '#b5aa94'); for (let y = .25; y < 5; y += .25) bx(g, 6.7, y, .33, .62, .02, .02, '#9a8f7a');                            // pilastra de piedra
    poleIn(g, [6.2, 0, 3.4], [6.2, 8, 3.4], .12, '#8a8a88');
    veredaB(-40, -26, '#bdb6aa', '#bdb6aa'); flat.rect(-37.6, -54.2, -35.6, -52.2, .207, '#5a4a3a'); addTree(-36.6, -53.2, 1.0, false, PELADO);
    bici(-29.3, -53.6, 0);
  }
  // B) casa de techo a dos aguas (x -53..-40): la casa retirada 3,5 m, reja negra sobre muro de ladrillo, jardín con figuras, pasillo de autos al este
  { const g = group(-46.5, ZB), F = -3.5, LAD = '#9a5040', BL = '#f2f0ea';   // local -6.5..6.5
    body(g, -3.2, 1.5, 3.5, 15.5, 2.55, LAD); body(g, 1.5, 3.6, 3.5, 15.5, 2.55, BL); bx(g, .2, 2.55, -9.5, 6.8, .45, 12, BL);
    hastial(g, .2, 3.0, F, 6.8, 1.9, BL); hastial(g, .2, 3.0, -15.3, 6.8, 1.9, BL); techo2(g, .2, 3.0, -15.9, -3.1, 6.8, 1.9, '#a8564a');
    const f = sub(g, F);
    enrollar(f, -1.35, 0, 2.3, 2.05, '#f2f2ee', '#d9d6cf');                                                                   // portón enrollable blanco
    bx(f, .8, 0, .03, .95, 2.25, .06, '#e6e3dc'); bx(f, .8, 0, .06, .8, 2.15, .05, '#7a4a2a'); bx(f, .8, .3, .1, .03, 1.6, .02, '#5a3420');   // puerta de madera
    bx(f, .8, 2.3, .1, .12, .2, .12, '#2a2a2a'); bx(f, .2, 1.4, .04, .25, .3, .02, '#f2f2ee');
    for (const x of [-.9, .9]) { bx(f, x, 3.3, .02, .55, .55, .04, '#d9822b'); bx(f, x, 3.37, .05, .4, .4, .02, '#5a7ab0'); }                                // cuadritos del hastial
    signIn(f, 'Brandenburger Str.', 1.7, 2.8, .05, .9, .18, '#1f3a8a', '#ffffff');
    bx(f, 2.55, .9, .04, .7, 1.3, .05, '#f6f6f4');
    bx(g, -3.55, 0, F - .3, .75, 6.0, .75, '#c9bfae'); for (let y = .3; y < 6; y += .3) bx(g, -3.55, y, F + .09, .77, .03, .02, '#a89e8a');                   // chimenea de piedra
    // reja negra sobre muro de ladrillo con pilares, portoncito y portón del pasillo
    bx(g, -3.05, 0, -.1, 6.9, .5, .25, LAD); bx(g, 2.75, 0, -.1, 2.3, .5, .25, LAD);
    rejaV(g, -3.05, .5, -.1, 6.9, 1.0, '#1f1f1f', .15); rejaV(g, 2.75, .5, -.1, 2.3, 1.0, '#1f1f1f', .15); rejaV(g, 1.0, .05, -.1, 1.2, 1.45, '#1f1f1f', .15); rejaV(g, 5.2, .05, -.1, 2.6, 1.5, '#1f1f1f', .18);
    for (const x of [-6.4, -3.7, -.9, .4, 1.6, 3.85]) { bx(g, x, 0, -.1, .42, 1.6, .42, LAD); bx(g, x, 1.6, -.1, .5, .08, .5, '#8a4030'); }
    colLocal(g, -6.5, -.25, 6.5, 0, null);
    flat.rect(-53, ZB - 14, -50.3, ZB, .07, '#6f8f45'); flat.rect(-50.3, ZB - 3.5, -42.9, ZB, .065, '#b8a99a'); flat.rect(-42.6, ZB - 16, -40, ZB, .065, '#b9b4aa');
    for (const [x, z] of [[-5.6, -1.6], [-4.7, -2.6], [-5.9, -3.8]]) { cylIn(g, x, .45, z, .18, .9, '#f4f4f0'); const h = new THREE.Mesh(new THREE.SphereGeometry(.13, 8, 6), lam({ color: 0xf4f4f0 })); h.position.set(x, 1.0, z); g.add(h); }   // figuras blancas del jardín
    bx(g, 5.2, 0, -15.5, 2.6, 2.6, 3, '#efefec'); bx(g, 5.2, 2.3, -13.95, 2.7, .35, .15, '#3a8a5a');                                                         // cochera del fondo con borde verde
    addBush(-45.3, ZB + .9, .7, 0); addTree(-45.7, -53.3, .4, false, PELADO);
    veredaB(-53, -40, '#a89a8a', '#6f8f45'); flat.rect(-42.8, ZB + 1.9, -39.8, ZB + 3.5, .2058, '#b9b4aa');   // entrada al pasillo de autos
    { const ag = group(-48.5, -73.5); cylIn(ag, 0, 6, 0, .25, 12, '#5a4030'); for (let k = 0; k < 6; k++) { const m = new THREE.Mesh(new THREE.ConeGeometry(2.6 - k * .35, 1.6, 8), lam({ color: '#2f4a2a' })); m.position.set(0, 5.5 + k * 1.25, 0); ag.add(m); } }   // araucaria
  }
  // C) casa de ladrillo retirada (x -62..-53) con reja verde sobre muro, portón de madera y ventanas con reja; árbol y buzón en la vereda
  { const g = group(-57.5, ZB), F = -3.5, LAD = '#9a5a42';   // local -4.5..4.5
    body(g, -4.5, 4.5, 3.5, 15, 3.1, LAD); bx(g, 0, 3.1, F - .05, 9, .25, .2, '#8a4e3a');
    const f = sub(g, F);
    bx(f, -3.0, 0, .04, 1.5, 2.4, .06, '#7a4a2a'); for (let k = 0; k < 5; k++) bx(f, -3.6 + k * .3, .1, .08, .03, 2.2, .02, '#5a3420');
    for (const x of [-.6, 1.7]) { bx(f, x, .9, .04, 1.2, 1.4, .06, '#f2f2ee'); bx(f, x, .95, .07, 1.05, 1.3, .02, '#3b4a55'); for (let k = 1; k < 8; k++) bx(f, x - .525 + k * .131, .95, .12, .03, 1.3, .03, '#2a2a2a'); }
    bx(f, 3.4, 0, .06, .6, 2.6, .12, '#8f5a44');
    bx(g, -.8, 0, -.1, 7.4, .45, .25, LAD); rejaV(g, -.8, .45, -.1, 7.4, .95, '#2f6a3a', .15); rejaV(g, 3.65, .05, -.1, 1.5, 1.4, '#2f6a3a', .15);
    for (const x of [-4.4, -1.4, 1.6, 2.9, 4.4]) bx(g, x, 0, -.1, .42, 1.5, .42, LAD);
    colLocal(g, -4.5, -.25, 4.5, 0, null);
    bx(g, 4.5, 0, -8, .25, 2.4, 16, '#ecebe6'); bx(g, 4.5, 2.4, -8, .35, .08, 16, '#dcdad2'); colLocal(g, 4.38, -16, 4.62, 0, null);   // tapial blanco que la separa de la casa de teja
    flat.rect(-62, ZB - 3.5, -53, ZB, .065, '#6f8f45'); addBush(-54.9, ZB - 1.5, .6, 0); addBush(-61.1, ZB - 1, .5, 0);
    veredaB(-62, -53, '#b8a99a', '#9a8a6a'); addTree(-57, -53.2, 1.05, false, ['#3f6a2a', '#4b7a30', '#557f35']);
    { const m = group(-58.8, -53.6); poleIn(m, [0, 0, 0], [0, 1.1, 0], .04, '#c9b89a'); bx(m, 0, 1.1, 0, .5, .25, .35, '#d9cbb5'); const s = new THREE.Mesh(new THREE.SphereGeometry(.18, 8, 6), lam({ color: 0xf2f2f2 })); s.position.set(0, 1.5, 0); m.add(s); }   // canasto con bolsa
  }
  // D) casa gris manchada sobre la línea (x -73..-62): portón de garaje de madera, persianas de madera, entrada metida con macetas, aire arriba
  { const g = group(-67.5, ZB), GR = '#a9a596';   // local -5.5..5.5
    body(g, -5.5, .9, 0, 14, 4.0, GR); body(g, 3.5, 5.5, 0, 14, 4.0, GR); body(g, .9, 3.5, 1.3, 14, 4.0, GR); bx(g, 2.2, 2.55, -.65, 2.6, 1.45, 1.3, GR);   // hueco de la entrada (1,3 m para adentro)
    bx(g, 0, 3.85, .04, 11, .15, .08, '#9a968a'); for (const y of [3.0, 3.45]) bx(g, 0, y, .04, 11, .05, .04, '#8a877c');
    for (let k = 0; k < 7; k++) { const x = R(-5, 5), y = R(.3, 3.4); if (x > .2 && x < 4.2 && y < 2.7) continue; bx(g, x, y, .03, R(.6, 1.6), R(.3, .9), .02, '#8f8c80'); }
    bx(g, -3.0, 0, .04, 3.3, 2.5, .06, '#b9b4a6'); bx(g, -3.0, .05, .08, 3.1, 2.4, .04, '#7a4a32');                                                          // portón de garaje de madera
    for (let i = 0; i < 7; i++) bx(g, -4.55 + i * .52, .05, .11, .04, 2.4, .02, '#5a3420'); for (let j = 1; j < 6; j++) bx(g, -3.0, .05 + j * .4, .11, 3.1, .04, .02, '#5a3420');
    bx(g, -1.15, 1.0, .05, .35, .45, .1, '#3a3a3a');
    enrollar(g, -.1, .9, 1.25, 1.55, '#a0673f', '#7a4a2a'); enrollar(g, 4.9, .9, 1.05, 1.5, '#a0673f', '#7a4a2a');
    // entrada metida (según las fotos): piso de cerámica marrón en escalón, puerta de madera tallada a la derecha,
    // a la izquierda ventana de madera con persiana sobre un murito blanco, dos macetones blancos con plantas, farol y número 423
    bx(g, 2.2, 0, -.62, 2.6, .15, 1.36, '#8a6a52'); bx(g, 2.2, 2.55, .02, 2.6, .08, .04, '#8a877c');
    bx(g, 3.0, .15, -1.27, .95, 2.35, .05, '#5a3420'); bx(g, 3.0, .15, -1.24, .8, 2.25, .04, '#7a4a32');
    for (let i = 0; i < 2; i++) for (let j = 0; j < 7; j++) bx(g, 2.82 + i * .36, .3 + j * .3, -1.2, .28, .24, .03, '#5e3622');
    bx(g, 1.65, .15, -1.15, 1.4, .85, .25, '#e9e6de');
    bx(g, 1.65, 1.0, -1.27, 1.4, 1.55, .05, '#6e3a2a'); bx(g, 1.65, 1.05, -1.23, 1.25, .5, .02, '#d8dde0'); for (let k = 0; k < 4; k++) bx(g, 1.2 + k * .3, 1.05, -1.21, .03, .5, .02, '#6e3a2a');
    bx(g, 1.65, 1.55, -1.23, 1.25, .95, .03, '#7a4a32'); for (let y = 1.65; y < 2.45; y += .1) bx(g, 1.65, y, -1.2, 1.25, .02, .01, '#5e3622');
    for (const [x, z] of [[1.15, -.55], [1.75, -.75]]) { bx(g, x, .15, z, .32, .6, .32, '#f2f2ee'); bx(g, x, .75, z, .55, .45, .55, '#3f5a3a'); }
    bx(g, .95, 2.0, -.8, .08, .25, .12, '#2a2a2a'); bx(g, 3.45, 1.0, -.6, .04, .04, .5, '#cfcfcf');
    signIn(g, '423', 3.85, 1.75, .05, .35, .16, '#f2f2ee', '#2a2a2a');
    bx(g, 3.9, 3.1, .2, .8, .55, .3, '#efefec');
    veredaB(-73, -62, '#8a6e62', '#6f8f45'); flat.rect(-72.3, ZB + 1.9, -68.7, ZB + 3.5, .2058, '#8a6e62'); addTree(-66.6, -53.0, 1.0, false, PELADO);   // frente al portón: sin pasto, sin cordón y sin árbol
    { const t = group(-65.3, -53.7); for (const s of [-1, 1]) poleIn(t, [s * .3, 0, 0], [s * .3, .9, 0], .03, '#5a5a5a'); bx(t, 0, .55, 0, .7, .05, .4, '#5a5a5a'); cylIn(t, -.15, .78, 0, .14, .35, '#f2f2f2'); cylIn(t, .17, .78, 0, .14, .35, '#e8c23a'); }   // canasto con baldes
  }
  // E) planta baja de ladrillo con pilastras blancas y parapeto gris manchado (x -81..-73): persianas, puerta blanca, buzón
  { const g = group(-77, ZB);   // local -4..4
    body(g, -4, 4, 0, 14, 4.8, '#8f8f88');
    bx(g, 0, 0, .03, 8, 2.9, .06, '#b5603f'); for (let y = .15; y < 2.9; y += .15) bx(g, 0, y, .065, 8, .015, .01, '#c9a08a');
    bx(g, 0, 2.9, .08, 8.1, .15, .2, '#9a9a92'); bx(g, 0, 3.25, .04, 7.2, 1.15, .03, '#6f706a'); bx(g, 0, 4.7, .05, 8.2, .12, .25, '#9a9a92');
    for (let k = 0; k < 4; k++) bx(g, R(-3.5, 3.5), R(3.1, 4.4), .06, R(.6, 1.4), R(.2, .5), .02, '#7a7b74');
    for (const x of [-3.85, 3.85]) bx(g, x, 0, .08, .3, 2.95, .12, '#f2f2ee');
    bx(g, -2.6, .85, .04, 1.3, 1.55, .05, '#f2f2ee'); enrollar(g, -2.6, .9, 1.15, 1.35, '#8a6f5a', '#6e5644');
    bx(g, 1.9, .85, .04, 1.3, 1.55, .05, '#f2f2ee'); enrollar(g, 1.9, .9, 1.15, 1.35, '#cbbfae', '#b2a690');
    bx(g, -.3, 0, .04, .95, 2.2, .06, '#e6e3dc'); bx(g, -.3, .02, .08, .8, 2.12, .04, '#f6f6f4'); for (let k = 0; k < 3; k++) bx(g, -.5 + k * .2, .9, .11, .08, 1.0, .01, '#7a8a95');
    bx(g, -1.2, 1.2, .08, .25, .35, .12, '#2a2a2a');
    addBush(-73.8, ZB + .6, .6, 0); veredaB(-81, -73, '#a8a090', '#6f8f45'); addTree(-79, -53.2, 1.0, false, PELADO);
  }
  // F) ESQUINA Córdoba y Dr. Brunet (x -89.5..-81): casa crema con ochava, techo de chapa verde a cuatro aguas con borde rojizo
  { const XC = -89.5, XE = -81, ZN = -66, OC = 3, CRM = '#dcd9c6';
    const FOOT = [[XC, ZN], [XE, ZN], [XE, ZB], [XC + OC, ZB], [XC, ZB - OC]];
    extrudePoly(FOOT, 0, 2.85, CRM); extrudePoly(FOOT, 2.85, .25, '#8a3a2a');
    addCol(XC, ZN, XE, ZB - OC); addCol(XC + OC, ZB - OC, XE, ZB); addCol(XC + OC / 2, ZB - OC, XC + OC, ZB - OC / 2); mapRects.push([XC, ZN, XE, ZB, CRM]);
    techo4((XC + XE) / 2, (ZN + ZB) / 2, 3.05, 9.1, 11.1, 1.4, '#5f8f6a');
    // ochava (mira a la esquina, -x +z): puerta-ventana blanca con cortinas rojas, rejas a los lados, toldo verde y poste de madera
    { const len = OC * Math.SQRT2, og = group(XC + OC / 2, ZB - OC / 2, -Math.PI / 4);   // local +x = hacia Dr. Brunet
      bx(og, 0, 0, .03, len, .35, .06, '#b8b3a0');
      bx(og, 0, 0, .04, 1.3, 2.3, .06, '#f6f6f4'); for (const s of [-1, 1]) { bx(og, s * .3, .15, .08, .5, 2.0, .02, '#e8eef2'); bx(og, s * .45, .15, .1, .15, 2.0, .02, '#c0392b'); }
      bx(og, 0, 1.95, .1, 1.1, .2, .02, '#c0392b');
      for (const s of [-1, 1]) { bx(og, s * 1.45, 0, .03, 1.0, 2.3, .03, '#3b4a55'); rejaV(og, s * 1.45, .05, .12, 1.0, 2.2, '#2a2a2a', .12); }
      bx(og, 0, 2.4, .45, len + .2, .1, .9, '#3a9a6a'); bx(og, 0, 2.2, .9, len + .2, .25, .03, '#3a9a6a'); for (let k = 0; k < 10; k++) bx(og, -len / 2 + .25 + k * .45, 2.22, .92, .18, .2, .01, '#c0392b');
      poleIn(og, [1.7, 0, 1.9], [1.7, 2.6, 1.9], .07, '#7a5a3a');
    }
    // frente sobre Dr. Brunet: aire acondicionado y ventana con reja blanca y toldito verde
    { const L = XE - XC - OC, bg = group((XC + OC + XE) / 2, ZB, 0);
      bx(bg, 0, 0, .03, L, .35, .06, '#b8b3a0'); bx(bg, -1.0, 2.0, .2, .85, .6, .3, '#efefec');
      bx(bg, 1.3, .9, .04, 1.3, 1.3, .05, '#f2f2ee'); bx(bg, 1.3, .95, .07, 1.15, 1.2, .02, '#3b4a55'); rejaV(bg, 1.3, .9, .12, 1.2, 1.3, '#f2f2ee', .13);
      bx(bg, 1.3, 2.3, .35, 1.5, .08, .65, '#3a9a6a'); bx(bg, 1.3, 2.15, .67, 1.5, .2, .03, '#3a9a6a');
    }
    // frente sobre Córdoba (mira al -x): ventana con reja y toldito verde, puerta de madera — local +x = sur (hacia la ochava)
    { const L = (ZB - OC) - ZN, cg = group(XC, (ZB - OC + ZN) / 2, -Math.PI / 2);
      bx(cg, 0, 0, .03, L, .35, .06, '#b8b3a0');
      bx(cg, 2.0, .9, .04, 1.2, 1.3, .05, '#f2f2ee'); bx(cg, 2.0, .95, .07, 1.05, 1.2, .02, '#3b4a55'); rejaV(cg, 2.0, .9, .12, 1.1, 1.3, '#f2f2ee', .13);
      bx(cg, 2.0, 2.3, .35, 1.4, .08, .65, '#3a9a6a'); bx(cg, 2.0, 2.15, .67, 1.4, .2, .03, '#3a9a6a');
      bx(cg, -1.5, 0, .04, .9, 2.2, .06, '#e6e3dc'); bx(cg, -1.5, .02, .07, .78, 2.1, .04, '#6e4a2a');
    }
    // (detrás, sobre Córdoba, sigue el ladrillo viejo con arcos: se arma en el bloque "Córdoba lado este, de Dr. Brunet al Banco Macro")
    cylIn(group(-84, -62), 0, 3.9, 0, .55, 1.1, '#e8e8e8');   // tanque de agua sobre la casa de la esquina
    veredaB(XC + OC, XE, '#c4bfb4', '#6f8f45');
    flat.rect(XC - 1.9, -66, XC, ZB - OC, .206, '#c4bfb4'); flat.rect(XC - 3.5, -66, XC - 1.9, ZB + 3.5, .205, '#6f8f45');
    flat.rect(XC - 1.9, ZB - OC, XC + OC, ZB + 1.9, .2065, '#c4bfb4');
    addTree(-83.6, -52.6, 1.0, false, PELADO); addTree(-92.5, -63, .9, false, PELADO);
    bici(XC - .6, ZB + .3, Math.PI / 4);
  }
  plazaRects.push([-89.6, -137, -13.5, -55.5]);   // cubre toda la manzana para evitar árboles o casas al azar en el interior
}

// =========================================================================
// INTERIOR DE LA MANZANA Dr. Brunet / Av. Centenario / Jujuy / Córdoba (según foto satelital de Google Maps, ignorando el pin "Casa Arca"):
// - Sector SO (detrás de Siglo 21 Verdulería / Dr. Brunet D-E y Córdoba C1-C3): jardín verde con pileta arriñonada celeste y solárium blanco,
//   quincho de chapa gris, galería larga de techo rojizo detrás de Brunet C y galponcito trasero sobre Córdoba.
// - Sector SE (detrás de Farmacia Ferretti, Dr. Brunet A-B y Av. Centenario H4-H7): patio embaldosado interno, ala de techo rojizo detrás de H6-H7,
//   gran galpón/quincho cuadrado de techo de chapa marrón-rojiza a dos aguas (x = -48..-36.5, z = -93..-81.5) y anexo blanco detrás de H4-H5.
// - Pulmón verde central y Sector O (detrás de la Mutual / Córdoba C4-C5): gran salón trasero blanco de la Mutual, amplio parque central de césped
//   dividido por medianeras con árboles frondosos, pabellón de techo gris a dos aguas, ala transversal blanca y quincho en L de tejas al norte.
// - Sector E y NE (detrás de Av. Centenario H1-H3 y Jujuy C-G): patio parquizado con segunda pileta rectangular celeste, solárium y quincho blanco,
//   ala trasera de chapa rojiza detrás de H3, taller/galpón largo de chapa gris detrás de H1 y patios arbolados.
// - Sector NO (detrás del Banco Macro y Jujuy A-B): anexos traseros blancos del banco, edificio gris claro de archivo, ala salmón/terracota detrás
//   de Jujuy A ("Porto Granado") y extensión blanca con jardín y parrilla detrás de Jujuy B-C.
// =========================================================================
{
  const g = group(0, 0);
  const VERDE = ['#43702b', '#528036', '#3a6224'], COPA_OSC = ['#2f5420', '#3b6329', '#487332'];
  const blk = (x0, z0, x1, z1, h, wallCol, roofCol = null) => {
    const cx = (x0 + x1) / 2, cz = (z0 + z1) / 2, w = x1 - x0, d = z1 - z0;
    bx(g, cx, 0, cz, w, h, d, wallCol);
    if (roofCol) bx(g, cx, h, cz, w + .24, .14, d + .24, roofCol);
    addCol(x0, z0, x1, z1);
    mapRects.push([x0, z0, x1, z1, roofCol || wallCol]);
  };
  const shed2 = (x0, z0, x1, z1, h, ridgeH, wallCol, roofCol, ry = 0) => {
    const cx = (x0 + x1) / 2, cz = (z0 + z1) / 2, w = x1 - x0, d = z1 - z0;
    bx(g, cx, 0, cz, w, h, d, wallCol);
    gableIn(g, cx, h, cz, (ry === 0 ? w : d) + .5, ridgeH, (ry === 0 ? d : w) + .5, roofCol, ry);
    addCol(x0, z0, x1, z1);
    mapRects.push([x0, z0, x1, z1, roofCol]);
  };
  const med = (x0, z0, x1, z1, h = 2.1, col = '#d6cfc2') => {
    const cx = (x0 + x1) / 2, cz = (z0 + z1) / 2, w = Math.max(.22, x1 - x0), d = Math.max(.22, z1 - z0);
    bx(g, cx, 0, cz, w, h, d, col);
    addCol(x0, z0, x1, z1);
  };

  // --- 1) Suelos base de los patios internos (césped en distintos tonos y patios embaldosados) ---
  flat.rect(-78.0, -125.5, -25.2, -69.2, .032, '#5e883c');                       // base general de pasto del pulmón
  flat.rect(-69.0, -111.5, -52.5, -85.0, .036, '#679444');                       // gran parque verde central
  for (let z = -110; z < -86; z += 3.2) flat.rect(-68.6, z, -53.0, z + 1.5, .038, '#5b863a');   // franjas de césped cortado en el parque central
  flat.rect(-77.5, -84.5, -58.0, -69.5, .036, '#628e40');                        // jardín SO de la pileta arriñonada (detrás de Siglo 21)
  flat.rect(-46.5, -111.5, -31.8, -95.5, .036, '#659243');                       // jardín E de la segunda pileta rectangular
  flat.rect(-40.0, -79.5, -25.5, -63.5, .042, '#c8c2b6');                        // patio embaldosado SE detrás de Farmacia Ferretti y KECO QUETA
  flat.rect(-35.5, -112.0, -25.5, -94.0, .042, '#c2bbb0');                       // patio interno detrás de Av. Centenario H2-H3
  flat.rect(-36.2, -95.5, -25.5, -80.0, .042, '#beb7ab');                        // patio interno detrás de Av. Centenario H4-H5
  flat.rect(-88.5, -114.5, -75.0, -106.0, .042, '#b9b4aa');                      // playón trasero de servicio del Banco Macro
  flat.rect(-60.9, -125.0, -51.0, -112.5, .042, '#b86b4b');                      // patio color terracota detrás de Jujuy A

  // --- 2) Sector SO (detrás de "Siglo 21 Verdulería" / Dr. Brunet C-E y Córdoba C1-C3) ---
  // Pileta arriñonada/ovalada celeste con solárium blanco (x ≈ -68.2, z ≈ -76.2)
  {
    const pg = group(-68.2, -76.2, .38);
    // solárium blanco con puntas redondeadas
    bx(pg, 0, .02, 0, 4.1, .06, 6.2, '#ebe7dd');
    cylIn(pg, 0, .05, -2.9, 2.05, .06, '#ebe7dd');
    cylIn(pg, 0, .05, 2.9, 2.05, .06, '#ebe7dd');
    // espejo de agua celeste
    bx(pg, 0, .05, 0, 3.1, .06, 5.4, '#36a6de');
    cylIn(pg, 0, .08, -2.5, 1.55, .06, '#36a6de');
    cylIn(pg, 0, .08, 2.5, 1.55, .06, '#36a6de');
    mapRects.push([-70.4, -79.6, -66.0, -72.8, '#36a6de']);
  }
  // Quincho de techo de chapa gris junto a la pileta SO (x = -65.5..-61.5, z = -82.2..-76.0)
  shed2(-65.5, -82.2, -61.5, -76.0, 2.9, .75, '#e8e4da', '#9aa0a6', Math.PI / 2);
  // Galería/ala larga de techo de chapa rojiza detrás de Dr. Brunet C (x = -58.0..-53.0, z = -79.5..-70.5)
  blk(-58.0, -79.5, -53.0, -70.5, 3.1, '#d8cec0', '#a4523d');
  // Galponcito trasero de chapa detrás de Dr. Brunet E y Córdoba C1-C2 (x = -81.0..-75.5, z = -76.5..-69.5 y x = -77.5..-72.0, z = -85.5..-80.2)
  blk(-81.0, -76.5, -75.5, -69.5, 3.2, '#cfc9bc', '#8f9498');
  blk(-77.5, -85.5, -72.0, -80.2, 3.0, '#dcd6c8', '#7d8488');

  // --- 3) Sector SE (detrás de Farmacia Ferretti, Dr. Brunet A-B y Av. Centenario H4-H7) ---
  // Ala trasera de techo rojizo detrás de H6 y H7 (x = -32.5..-25.5, z = -75.5..-64.5)
  shed2(-32.5, -75.5, -25.5, -64.5, 3.4, .85, '#e6e0d4', '#a64e38', Math.PI / 2);
  // Anexo interno blanco de techo plano detrás de Dr. Brunet A ("KECO QUETA") (x = -39.5..-32.8, z = -77.5..-69.5)
  blk(-39.5, -77.5, -32.8, -69.5, 3.3, '#eceae2', '#d8d4c8');
  // Gran galpón/quincho cuadrado de techo marrón-rojizo a dos aguas en el corazón SE (x = -48.2..-36.4, z = -93.2..-81.2)
  shed2(-48.2, -93.2, -36.4, -81.2, 3.5, 1.35, '#d9cfc0', '#8c4a36', 0);
  // Extensión trasera blanca de techo plano detrás de Av. Centenario H4-H5 (x = -31.8..-25.5, z = -89.5..-80.5)
  blk(-31.8, -89.5, -25.5, -80.5, 3.2, '#f0eee8', '#dcd8ce');

  // --- 4) Pulmón Verde Central y Sector O (detrás de la Mutual / Córdoba C4-C5) ---
  // Gran salón trasero blanco de losa plana de la Mutual (x = -77.5..-69.0, z = -106.2..-93.2)
  blk(-77.5, -106.2, -69.0, -93.2, 3.8, '#f2f0ea', '#dfdcd2');
  for (const [ax, az] of [[-74.5, -102.5], [-72.0, -97.0]]) bx(g, ax, 3.94, az, 1.1, .55, .8, '#c8ccd0');   // equipos de aire en la azotea de la Mutual
  // Quincho en L con techo de tejas/chapa terracota al norte del parque central (x = -59.5..-46.8, z = -109.8..-102.0)
  blk(-59.5, -109.8, -53.0, -104.8, 3.0, '#eeeae0', '#b2583c');
  shed2(-53.0, -109.8, -46.8, -102.0, 3.1, .95, '#eeeae0', '#b2583c', Math.PI / 2);

  // --- 5) Sector E y NE (segunda pileta detrás de Av. Centenario H1-H3 y Jujuy C-G) ---
  // Pileta rectangular celeste con borde atérmico blanco (x = -42.4..-36.6, z = -104.4..-100.8)
  flat.rect(-43.1, -105.1, -35.9, -100.1, .048, '#eeeae0');
  flat.rect(-42.4, -104.4, -36.6, -100.8, .056, '#2d9fe0');
  mapRects.push([-42.4, -104.4, -36.6, -100.8, '#2d9fe0']);
  // Quincho blanco con parrilla junto a la pileta E (x = -46.3..-41.5, z = -109.5..-105.4)
  blk(-46.3, -109.5, -41.5, -105.4, 2.9, '#f2f0ea', '#dcd8ce');
  bx(g, -45.6, 2.9, -108.8, .75, 1.3, .75, '#9a543e');                           // chimenea de la parrilla
  // Ala trasera de techo rojizo detrás de Av. Centenario H3 (x = -31.8..-25.5, z = -105.2..-95.5) y cuartito blanco detrás de H2
  shed2(-31.8, -105.2, -25.5, -95.5, 3.3, .85, '#e2dad0', '#a6503a', Math.PI / 2);
  blk(-31.2, -111.8, -25.5, -106.5, 3.0, '#f0eee8', '#d6d2c8');
  // Galpón/taller largo de chapa gris detrás de Av. Centenario H1 y esquina G (x = -28.8..-21.4, z = -125.0..-112.0)
  shed2(-28.8, -125.0, -21.4, -112.0, 3.5, .95, '#d4d0c8', '#9ea4aa', Math.PI / 2);
  // Ala trasera blanca/crema detrás de Jujuy D-E (x = -41.2..-33.0, z = -125.0..-118.2)
  blk(-41.2, -125.0, -33.0, -118.2, 3.4, '#e8e0d2', '#c8c0b2');

  // --- 6) Sector NO (detrás del Banco Macro y Jujuy A-C) ---
  // Anexos blancos de techo plano detrás del Banco Macro (x = -88.2..-76.2, z = -114.2..-109.5 y x = -80.8..-76.2, z = -109.5..-106.2)
  blk(-88.2, -114.2, -76.2, -109.5, 3.5, '#f0eee8', '#dcd8ce');
  blk(-80.8, -109.5, -76.2, -106.2, 3.0, '#eceae4', '#d4d0c6');
  // Volumen gris claro de 1 planta alta al este del Banco Macro (x = -74.5..-61.2, z = -132.0..-120.2)
  shed2(-74.5, -132.0, -61.2, -120.2, 4.2, 1.1, '#e6e4de', '#b6bcc2', 0);
  // Ala trasera salmón/terracota detrás de Jujuy A ("Porto Granado") (x = -58.2..-51.6, z = -125.0..-113.2)
  shed2(-58.2, -125.0, -51.6, -113.2, 3.0, .8, '#e49c76', '#9c523c', Math.PI / 2);
  // Extensión trasera blanca con galería detrás de Jujuy B y C (x = -50.8..-43.5, z = -125.0..-117.5)
  blk(-50.8, -125.0, -43.5, -117.5, 3.1, '#f2f0ea', '#dedad0');

  // --- 7) Red de medianeras internas (muros divisorios de ladrillo y revoque entre los lotes) ---
  // Medianeras horizontales (este-oeste)
  med(-77.5, -111.6, -25.5, -111.35, 2.15, '#d4cdc0');
  med(-77.5, -106.3, -60.9, -106.05, 2.2, '#b87458');
  med(-69.0, -85.2, -25.5, -84.95, 2.1, '#cfc8ba');
  med(-77.5, -80.2, -53.0, -79.95, 2.05, '#c28268');
  med(-46.5, -95.6, -25.5, -95.35, 2.1, '#d8d2c6');
  // Medianeras verticales (norte-sur)
  med(-69.1, -111.5, -68.85, -80.0, 2.15, '#cfc7b8');
  med(-61.0, -125.0, -60.75, -106.0, 2.15, '#c48066');
  med(-53.2, -111.5, -52.95, -70.0, 2.1, '#d6cfc2');
  med(-46.6, -125.0, -46.35, -95.5, 2.1, '#cbc3b4');
  med(-40.1, -81.2, -39.85, -69.5, 2.05, '#d4cdc0');
  med(-35.6, -111.5, -35.35, -95.5, 2.05, '#c8886e');

  // --- 8) Arboleda tupida del pulmón de manzana (según las copas verdes oscuras de la foto satelital) ---
  for (const [tx, tz, ts, col] of [
    [-65.8, -96.8, 1.45, COPA_OSC], [-63.2, -90.5, 1.35, VERDE], [-67.0, -87.8, 1.25, COPA_OSC],
    [-57.8, -110.2, 1.3, VERDE],    [-65.5, -113.5, 1.35, COPA_OSC], [-71.8, -115.2, 1.2, VERDE],
    [-43.8, -97.5, 1.35, COPA_OSC], [-34.8, -108.2, 1.4, COPA_OSC],  [-33.8, -98.2, 1.25, VERDE],
    [-42.5, -115.8, 1.25, VERDE],   [-48.0, -114.0, 1.2, COPA_OSC],  [-35.2, -114.8, 1.35, COPA_OSC],
    [-30.5, -119.5, 1.3, VERDE],    [-72.0, -88.5, 1.3, COPA_OSC],   [-70.2, -82.8, 1.25, VERDE],
    [-72.8, -75.2, 1.25, COPA_OSC], [-60.0, -76.5, 1.3, VERDE],      [-55.8, -82.8, 1.35, COPA_OSC],
    [-44.2, -76.2, 1.25, VERDE],    [-35.0, -78.8, 1.15, VERDE]
  ]) addTree(tx, tz, ts, false, col);

  for (const [bx0, bz0, bs] of [
    [-68.0, -104.5, .85], [-64.5, -86.2, .75], [-45.2, -102.5, .8],
    [-38.0, -109.5, .75], [-66.5, -71.5, .8],  [-59.5, -83.5, .75],
    [-50.5, -113.0, .8],  [-62.5, -116.5, .85]
  ]) addBush(bx0, bz0, bs, 0);
}
// (la Farmacia Ferretti se arma a mano en la esquina de Av. Centenario y Dr. Brunet, en el bloque "Av. Centenario lado oeste, de Jujuy a Dr. Brunet")
civic(-33.5385018, -60.8039401, { w: 9, d: 13, wall: '#eef3ee', trim: '#21b24b', sign: 'FARMACIA CIALONI', signBg: '#ffffff', signFg: '#118a3a', label: 'Farm. Cialoni', extra: (g, w) => greenCross(g, w/2 - .6, 2.6) });
civic(-33.5383107, -60.8048523, { w: 13, d: 15, h: 5.2, wall: '#e8dcc0', trim: '#d2c3a2', sign: 'BIBLIOTECA POPULAR BARTOLOMÉ MITRE', signBg: '#e8dcc0', signFg: '#5a4630', label: 'Biblioteca',
  extra: (g, w, d, h) => { for (const x of [-w/2 + .4, -2, 2, w/2 - .4]) bx(g, x, 0, .2, .55, h, .4, '#d2c3a2'); gableIn(g, 0, h + .6, -.4, 1, 1.4, 6, '#d2c3a2', Math.PI/2); } });
civic(-33.5402056, -60.8084540, { w: 26, d: 16, wall: '#f1ead8', trim: '#e4d9bf', sign: 'ESCUELA ESPECIAL N° 2086 "PAQUITA MARTÍN"', signBg: '#2f5f9a', signFg: '#ffffff', signW: 12, label: 'Esc. Especial 2086',
  windows: [-11, -8, -5, 5, 8, 11] });

// Club Atlético Bernardino Rivadavia (La Rioja 604 — ocupa toda la manzana entre La Rioja, Catamarca, Entre Ríos y Mendoza)
}
