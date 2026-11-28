// Centro Oeste: Comisaría, Jujuy SO/N, Av. Centenario O, Farmacia Ferretti, Dr. Brunet N/S, Lo del Ariga y Córdoba E
export function buildCentroOesteBrunet(ctx) {
  const {
    BUSH_W, FLAT_W, G, GROUP_W, MZ, NA, R, THREE, TREE_W, W, addBush, addCol, addTree, boxIn, bx, canvas, colLocal, crowns, cylIn, extrudePoly, flat, group, lam, makeCar, mapLabels, mapRects, pick, plazaRects, poleIn, poles, signIn, trims, zs
  } = ctx;

// (el Correo Argentino se arma junto a la Plaza de Malvinas, en el bloque "Plaza Islas Malvinas y Correo")
// =========================================================================
// COMISARÍA de Peyrano (sobre Jujuy, pegada a la Plaza Islas Malvinas del lado oeste) — fotos de Street View del usuario
// Edificio blanco de techo plano con cenefa gris arriba y zócalo gris, ventanas con marco gris ancho y persianas, puerta doble de hierro
// trabajado con placa, farolitos, banderas de Santa Fe y de Peyrano a los costados de la puerta, mástil con la bandera argentina,
// patio lateral hacia la plaza con murito de ladrillo blanqueado, tinglado y cedros; patrullero negro estacionado en Jujuy.
// =========================================================================
{
  const ZF = -153, X1 = -44.2, W = 12.5, D = 11, H = 4.2, XC = X1 - W / 2;   // frente sobre Jujuy (mira al +z), del patio lateral hacia el oeste
  const g = group(XC, ZF, 0);   // local: +z = hacia Jujuy, +x = hacia la plaza (este) = la derecha en las fotos
  const BL = '#f1f1ee', GR = '#7d8288', GR2 = '#8c9197';
  bx(g, 0, 0, -D / 2, W, H, D, BL);
  bx(g, 0, H - .55, -D / 2, W + .12, .55, D + .12, GR);                     // cenefa gris
  bx(g, 0, H, -D / 2, W + .2, .12, D + .2, GR2);
  bx(g, 0, 0, -D / 2, W + .08, .45, D + .08, GR);                            // zócalo gris
  colLocal(g, -W / 2, -D, W / 2, 0, BL);
  // ventanas altas con marco gris ancho y persianas de madera verde grisácea
  const ventana = (x, z, ry = 0) => { const v = group(0, 0); g.add(v); v.position.set(x, 0, z); v.rotation.y = ry;
    bx(v, 0, .95, .02, 1.45, 2.0, .14, GR); bx(v, 0, 1.13, .1, 1.0, 1.64, .02, '#8f9a8a'); for (let y = 1.2; y < 2.75; y += .1) bx(v, 0, y, .115, .98, .02, .01, '#76806f'); bx(v, 0, .88, .12, 1.5, .08, .2, GR); };
  ventana(-4.85, 0); ventana(.8, 0); ventana(4.2, 0);
  ventana(W / 2, -2.6, Math.PI / 2); ventana(W / 2, -7.4, Math.PI / 2);                    // costado hacia la plaza
  // puerta doble de hierro trabajado con vidrio, escalones, placa y farolitos
  bx(g, -2.25, 0, .02, 1.5, 2.75, .12, GR);
  for (const s of [-1, 1]){ const x = -2.25 + s * .33; bx(g, x, .05, .09, .6, 2.6, .04, '#9fb0a6'); bx(g, x, .4, .12, .44, 1.9, .02, '#2e3a40');
    for (let k = 0; k < 5; k++) bx(g, x - .18 + k * .09, .45, .14, .02, 1.8, .02, '#c9d3cd'); for (const y of [.9, 1.5, 2.0]) bx(g, x, y, .14, .44, .02, .02, '#c9d3cd'); boxIn(g, x, 1.35, .15, .22, .22, .02, '#c9d3cd', 0, Math.PI / 4); }
  bx(g, -2.25, 0, .3, 1.8, .15, .6, '#c9c6bd'); bx(g, -2.25, 0, .55, 1.8, .08, .4, '#c9c6bd');
  bx(g, -2.25, 3.05, .04, 1.6, .6, .05, '#3a3d40');
  signIn(g, 'COMISARÍA 1° PEYRANO', -2.25, 3.22, .08, 1.5, .17, '#3a3d40', '#e8e8e8'); signIn(g, 'POLICÍA DE LA PROV. SANTA FE', -2.25, 2.95, .08, 1.5, .15, '#3a3d40', '#d0d0d0');
  for (const x of [-3.45, -1.05]){ bx(g, x, 2.25, .06, .08, .3, .1, '#2a2a2a'); const l = new THREE.Mesh(new THREE.SphereGeometry(.13, 10, 8), lam({ color: 0xf6f3ea, emissive: 0x2a2a22 })); l.position.set(x, 2.5, .2); g.add(l); }
  bx(g, -.75, 1.4, .05, .25, .3, .04, '#c9a46a');                                            // plaquita de bronce
  bx(g, 2.3, 3.1, .2, .85, .5, .32, '#f4f4f2');                                              // aire acondicionado
  bx(g, W / 2 + .2, 2.5, -4.5, .32, .5, .85, '#f4f4f2');
  // banderas de Santa Fe (izquierda de la puerta) y de Peyrano (derecha), en mástiles cortos inclinados desde la pared
  const flagTex = draw => { const c = document.createElement('canvas'); c.width = 96; c.height = 64; draw(c.getContext('2d')); const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; return t; };
  const santaFe = flagTex(x => { x.fillStyle = '#d22630'; x.fillRect(0, 0, 96, 22); x.fillStyle = '#ffffff'; x.fillRect(0, 21, 96, 22); x.fillStyle = '#5ba4e0'; x.fillRect(0, 42, 96, 22); x.fillStyle = '#ffffff'; x.beginPath(); x.moveTo(0, 0); x.lineTo(26, 32); x.lineTo(0, 64); x.closePath(); x.fill(); });
  const peyrano = flagTex(x => { x.fillStyle = '#2f8a3c'; x.fillRect(0, 0, 96, 64); x.fillStyle = '#f2c21b'; x.beginPath(); x.moveTo(96, 0); x.lineTo(96, 64); x.lineTo(0, 64); x.closePath(); x.fill(); x.strokeStyle = '#ffffff'; x.lineWidth = 10; x.beginPath(); x.moveTo(0, 64); x.lineTo(96, 0); x.stroke(); });
  const argentina = flagTex(x => { x.fillStyle = '#74acdf'; x.fillRect(0, 0, 96, 64); x.fillStyle = '#ffffff'; x.fillRect(0, 21, 96, 22); x.fillStyle = '#f6b40e'; x.beginPath(); x.arc(48, 32, 7, 0, 7); x.fill(); });
  const flag = (parent, tex, x, y, z, w, h, ry = 0) => { const m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), new THREE.MeshLambertMaterial({ map: tex, side: THREE.DoubleSide })); m.position.set(x, y, z); m.rotation.y = ry; parent.add(m); return m; };
  for (const [x, tex] of [[-3.55, santaFe], [-.4, peyrano]]){
    poleIn(g, [x, 1.25, .08], [x, 3.0, 1.0], .025, '#4a4a4a'); bx(g, x, 1.15, .05, .12, .2, .1, '#4a4a4a');
    const f = flag(g, tex, x, 2.45, .78, .9, .6, Math.PI / 2); f.rotation.z = -.5;           // cuelga del mástil inclinado
  }
  // mástil con la bandera argentina en la esquina de la vereda, sobre base escalonada
  { const fx = XC - W / 2 + .9, fz = ZF + 1.6, mg = group(fx, fz);
    for (let k = 0; k < 3; k++) bx(mg, 0, k * .18, 0, 1.3 - k * .35, .18, 1.3 - k * .35, '#5a6f8f');
    poleIn(mg, [0, .5, 0], [0, 7.5, 0], .05, '#eeeeee'); const fl = flag(mg, argentina, .62, 6.9, 0, 1.2, .8); fl.rotation.y = .3;
    addCol(fx - .65, fz - .65, fx + .65, fz + .65); }
  // vereda de baldosas amarillas al frente y franja de pasto con arbolito y cesto
  flat.rect(XC - W / 2, ZF, X1, ZF + 2.2, .206, '#c9b27a');
  flat.rect(XC - W / 2, ZF + 2.2, X1 + 3.3, ZF + 3.5, .207, '#6f8f45');
  addTree(XC + 2.0, ZF + 2.9, .6, false, ['#8a6a3a', '#9c7a45']);
  { const cx = XC + 4.6, cz = ZF + 2.8, cg = group(cx, cz); poleIn(cg, [0, 0, 0], [0, .6, 0], .03, '#2a2a2a'); bx(cg, 0, .6, 0, .7, .8, .55, '#2f3236'); addCol(cx - .1, cz - .1, cx + .1, cz + .1); }
  // patio lateral hacia la plaza: murito de ladrillo blanqueado, tinglado con techo de chapa, piso de lajas y cedros
  { const pg = group(0, 0), PX0 = X1, PX1 = -40.75;
    bx(pg, (PX0 + PX1) / 2 - .4, 0, ZF - .15, PX1 - PX0 - .8, 1.0, .28, '#e4e0d8'); addCol(PX0, ZF - .3, PX1 - .8, ZF);
    // (el costado hacia la plaza lo cierra la pared de murales de la Plaza Malvinas)
    flat.rect(PX0, ZF - 12, PX1, ZF, .055, '#b8b2a6');
    boxIn(pg, (PX0 + PX1) / 2, 2.55, ZF - 5, PX1 - PX0 + .3, .06, 5.5, '#a9adb0', .06); for (const [x, z] of [[PX1 - .3, ZF - 2.4], [PX1 - .3, ZF - 7.6]]) bx(pg, x, 0, z, .1, 2.5, .1, '#6a6e72');
    bx(pg, PX0 + 1.2, 0, ZF - 6.5, .8, .9, .8, '#3f8a5a');                                    // tacho verde
    for (const [x, z, s] of [[PX1 - 1.4, ZF - 9.5, 1.7], [PX0 + 1.6, ZF - 11.5, 1.5]]) addTree(x, z, s, false, ['#2c4a26', '#34552b', '#2f5a24']); }
  // patrullero negro con "POLICÍA" estacionado sobre Jujuy
  { const pc = makeCar(0x1d2127); pc.g.position.set(XC + .5, 0, ZF + 4.7); pc.g.rotation.y = Math.PI / 2;
    const lb = new THREE.Mesh(new THREE.BoxGeometry(1.1, .15, .3), lam({ color: 0x2255ff, emissive: 0x112266 })); lb.position.set(0, 1.52, -.3); pc.g.add(lb);
    for (const s of [-1, 1]) signIn(pc.g, 'POLICÍA', s * .93, .75, .2, 2.4, .42, '#1d2127', '#ffffff', s * Math.PI / 2);
    addCol(XC - 1.7, ZF + 3.8, XC + 2.7, ZF + 5.6); }
  plazaRects.push([XC - W / 2, ZF - 14, -40.75, ZF]);
  mapLabels.push([XC, ZF - 5, 'Comisaría']);
}

// =========================================================================
// Jujuy lado sur, de la Comisaría hacia la esquina de Córdoba (fotos de Street View del usuario, en orden hacia la izquierda):
// 1 casa baja con losa de hormigón gris, pilastras de piedra laja, persianas blancas, jardín y cochera con pared de piedra y portón de madera ·
// 2 casa amarilla y ladrillo con portón de garaje con ventanitas en arco, ventana de bloques de vidrio, persiana y puerta de madera ·
// 3 casa blanca con listones de piedra gris, ventanal con reja blanca, cenefa salmón y entrada hundida ·
// 4 casa de la esquina: beige con zócalo de laja, rejas oscuras, galería con portón de reja, chimenea de piedra y jardín con murito y reja.
// =========================================================================
{
  const ZF = -153;
  // local: frente en z = 0 sobre la línea de Jujuy, +z = hacia la calle, +x = hacia la Comisaría (este) = la derecha en las fotos
  const casa = (x0, x1) => { const cx = (x0 + x1) / 2; return { g: group(cx, ZF, 0), w: x1 - x0, cx }; };
  const body = (g, x0, x1, d0, d1, h, col) => { bx(g, (x0 + x1) / 2, 0, -(d0 + d1) / 2, x1 - x0, h, d1 - d0, col); colLocal(g, x0, -d1, x1, -d0, col); };
  const rejaV = (g, x, y0, z, w, h, col, step = .13) => { for (let k = 1; k < Math.round(w / step); k++) bx(g, x - w / 2 + k * step, y0, z, .03, h, .03, col); for (const y of [y0, y0 + h - .04]) bx(g, x, y, z, w + .04, .04, .04, col); };
  const persiana = (g, x, y0, z, w, h, col = '#f2f2ee', lin = '#d9d6cf') => { bx(g, x, y0 - .07, z + .02, w + .16, h + .14, .06, '#e6e3dc'); bx(g, x, y0, z + .05, w, h, .04, col); for (let y = y0 + .1; y < y0 + h - .05; y += .11) bx(g, x, y, z + .075, w, .02, .01, lin); };
  const puerta = (g, x, z, w, h, col) => { bx(g, x, 0, z + .02, w + .14, h + .07, .06, '#e6e3dc'); bx(g, x, 0, z + .05, w, h, .06, col); bx(g, x + w * .33, h * .45, z + .1, .06, .06, .06, '#c9a227'); };
  const tex = (draw, w = 128, h = 128) => { const c = document.createElement('canvas'); c.width = w; c.height = h; draw(c.getContext('2d'), w, h); const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; t.wrapS = t.wrapT = THREE.RepeatWrapping; return t; };
  const laja = tex((x, W, H) => { x.fillStyle = '#8f8576'; x.fillRect(0, 0, W, H); for (let k = 0; k < 70; k++){ x.fillStyle = pick(['#c9bba2', '#b9a98e', '#d6c9b0', '#a89880', '#bfae92', '#cbb99c']); const px = R(0, W), py = R(0, H), w = R(14, 34), h = R(9, 20); x.beginPath(); x.moveTo(px, py); x.lineTo(px + w, py + R(-3, 3)); x.lineTo(px + w + R(-4, 4), py + h); x.lineTo(px + R(-4, 4), py + h + R(-3, 3)); x.closePath(); x.fill(); } });
  const listones = tex((x, W, H) => { for (let y = 0; y < H; y += 6){ let px = -R(0, 20); while (px < W){ const L = R(16, 40); x.fillStyle = pick(['#a9a9a6', '#8f908e', '#bdbdb9', '#9c9d9a', '#b3b2ae']); x.fillRect(px, y, L - 1, 5); px += L; } } });
  const plano = (g, x, y, z, w, h, t, rx, ry, rotY = 0) => { const tt = t.clone(); tt.needsUpdate = true; tt.repeat.set(rx, ry); const m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), lam({ map: tt })); m.position.set(x, y, z); m.rotation.y = rotY; g.add(m); return m; };
  const piedra = (g, x, y0, z, w, h, rotY = 0) => plano(g, x, y0 + h / 2, z, w, h, laja, w / 1.4, h / 1.4, rotY);
  const pasto = (x0, x1) => flat.rect(x0, -150.8, x1, -149.5, .205, '#6f8f45');   // franja de pasto junto al cordón

  // 1) casa baja con losa de hormigón gris, pilastras de piedra, persianas blancas, jardín y cochera
  { const { g, w, cx } = casa(-67.2, -56.7);   // w = 10.5 · local -5.25..5.25
    body(g, -5.25, 2.6, 3, 13, 2.85, '#ecebe4');
    bx(g, 0, 2.85, -6.5, w + .2, .35, 7.8, '#a9a59b'); bx(g, 0, 2.85, -2.4, w + .3, .35, .5, '#b5b1a7');   // losa gruesa con alero (también techa la cochera)
    for (const [x, ww] of [[-2.0, .85], [2.25, .75]]) piedra(g, x, 0, -2.95, ww, 2.85);
    persiana(g, -3.4, 1.15, -3, 1.6, .95); bx(g, -3.4, .75, -2.95, 1.6, .38, .05, '#dfe6e8');      // persiana blanca con vidrios abajo
    puerta(g, -1.05, -3, .8, 2.1, '#f4f4f2'); bx(g, -.45, .9, -2.95, .3, 1.2, .04, '#dfe6e8');
    persiana(g, .95, 1.15, -3, 1.6, .95); bx(g, .95, .75, -2.95, 1.6, .38, .05, '#dfe6e8');
    bx(g, -2.55, 2.0, -2.92, .14, .25, .14, '#2a2a2a');                                              // farolito
    // cochera: pared lateral de piedra (contra la Comisaría), portón de madera blanco al fondo y piso de piedra
    piedra(g, 5.08, 0, -3, 6, 2.6, -Math.PI / 2); bx(g, 5.2, 0, -3, .2, 2.6, 6, '#e9e6de'); colLocal(g, 5.1, -6, 5.3, 0, null);
    bx(g, 3.9, 0, -4.2, 2.5, 1.9, .08, '#f2efe6'); for (let x = 2.75; x < 5.1; x += .18) bx(g, x, 0, -4.15, .03, 1.9, .02, '#d9d4c8');
    rectG(g, 2.6, 0, 5.25, -4.2, '#9a958a');
    colLocal(g, 2.6, -4.4, 5.25, -4.1, null);
    // jardín con pasto, caminito al frente y plantas
    rectG(g, -5.25, 0, 2.6, -3, '#6a9a45'); rectG(g, -1.5, 0, -.6, -3, '#a9a59b');
    for (const [lx, s] of [[-4.6, .7], [-3.6, .5], [.2, .6], [1.0, .55], [1.8, .6]]) addBush(cx + lx, ZF - 2.6, s, 0);
    addTree(cx - 4.4, ZF - 1.2, .55, false, ['#4b7a30', '#5e8a3a']);
    cylIn(g, -.2, 3.55, -6, .45, 1.1, '#efefec'); bx(g, 3.1, 3.2, -7, .9, .7, .9, '#efefec');       // tanque y cajita en el techo
    pasto(cx - w / 2, cx + w / 2);
    { const kx = cx + 3.8, kz = -150.2, cg = group(kx, kz); poleIn(cg, [0, 0, 0], [0, .65, 0], .03, '#3a3a3a'); bx(cg, 0, .65, 0, 1.0, .5, .6, '#8d9296'); boxIn(cg, 0, 1.2, 0, 1.1, .05, .7, '#c9cdd0', .1); addCol(kx - .1, kz - .1, kx + .1, kz + .1); }   // cesto con techito
  }
  // 2) casa amarilla y ladrillo: portón de garaje blanco con ventanitas en arco, bloques de vidrio, persiana blanca, puerta de madera con vidrios
  { const { g, w, cx } = casa(-76.2, -67.2);   // w = 9 · local -4.5..4.5
    const AM = '#ecd27a', LA = '#8f3f2f';
    // (sobre la línea de la vereda, a diferencia de la casa de su derecha que está retirada con jardín)
    body(g, -w / 2, w / 2, 0, 13, 3.6, AM);
    bx(g, -3.5, 0, .05, 1.0, 2.55, .06, LA); bx(g, -.5, 0, .05, .4, 2.55, .06, LA); bx(g, 2.0, 0, .05, .8, 2.55, .06, LA); bx(g, 4.0, 0, .05, 1.0, 2.55, .06, LA);
    bx(g, -.75, 0, .05, .9, .95, .06, LA); bx(g, .3, 0, .05, 1.1, .95, .06, LA);
    for (const x of [-4.45, 1.0]) bx(g, x, 0, .1, .15, 3.5, .12, '#e3c45f');
    bx(g, -2.0, 0, .06, 1.9, 2.45, .06, '#f4f4f2'); for (const x of [-2.5, -1.5]) bx(g, x, 0, .11, .03, 2.45, .02, '#d9d6cf');   // portón de garaje
    for (const x of [-2.6, -2.0, -1.4]){ bx(g, x, 1.75, .12, .45, .35, .02, '#3b4a55'); cylIn(g, x, 2.0, .12, .22, .02, '#3b4a55', Math.PI / 2).rotation.set(Math.PI / 2, 0, 0); }
    bx(g, -.75, .95, .06, .85, 1.35, .06, '#d6e6ea'); for (let k = 1; k < 4; k++) bx(g, -.75 - .425 + k * .2125, .95, .11, .02, 1.35, .02, '#b7c9ce'); for (let k = 1; k < 6; k++) bx(g, -.75, .95 + k * .225, .11, .85, .02, .02, '#b7c9ce');   // bloques de vidrio
    persiana(g, .3, .95, 0, 1.0, 1.4);
    bx(g, 2.9, 0, .04, 1.35, 2.3, .06, '#f4f4f2'); puerta(g, 2.9, .05, .55, 2.15, '#9a6a3a'); for (const s of [-1, 1]) bx(g, 2.9 + s * .45, .2, .13, .28, 1.9, .02, '#3b4a55');
    for (const x of [2.2, 3.6]) { cylIn(g, x, .45, .45, .2, .5, '#c9773a'); cylIn(g, x, .9, .45, .3, .4, '#4c7a30'); }   // macetas en la vereda, junto a la puerta
    bx(g, 3.7, 1.9, .1, .2, .2, .04, '#e9e9e6');
    flat.rect(cx - w / 2, ZF, cx + w / 2, -150.8, .207, '#5a5450');                                  // vereda de hormigón estampado oscuro delante de la casa
    cylIn(g, -2.3, 3.95, -7, .45, .7, '#7f878d'); bx(g, -3.0, 3.6, -7, .6, .5, .6, '#b9bdc0');
    pasto(cx - w / 2 + 1.2, cx + w / 2 - .8); addTree(cx - 3.4, -150.2, .9, false); addTree(cx + .6, -150.2, 1.0, false);
    { const kx = cx - 1.2, kz = -150.0, cg = group(kx, kz); poleIn(cg, [0, 0, 0], [0, .6, 0], .03, '#3a3a3a'); bx(cg, 0, .6, 0, .7, .6, .5, '#5a5e62'); for (const s of [-1, 1]) cylIn(cg, s * .15, .9, 0, .14, .4, '#f2f2f2'); addCol(kx - .1, kz - .1, kx + .1, kz + .1); }
  }
  // 3) casa blanca con listones de piedra gris, ventanal con reja blanca, cenefa salmón y entrada hundida con puerta de reja
  { const { g, w, cx } = casa(-82.2, -76.2);   // w = 6 · local -3..3
    body(g, -1.0, 3, 0, 12, 3.0, '#efeee9'); body(g, -2.2, -1.0, 1.2, 12, 3.0, '#e9e8e2'); body(g, -3, -2.2, 0, 12, 3.0, '#efeee9');
    plano(g, 2.6, 1.5, .02, .8, 3.0, listones, .9, 3.3); plano(g, .8, .45, .02, 3.6, .9, listones, 3.8, 1);
    plano(g, -2.6, .45, .02, .8, .9, listones, .9, 1); plano(g, -1.6, 1.5, -1.18, 1.2, 3.0, listones, 1.3, 3.3);
    bx(g, 0, 2.7, .02, w + .2, .32, .45, '#e8a690');                                                // cenefa salmón
    bx(g, .4, .95, .03, 2.6, 1.55, .05, '#3b4a55'); for (let k = 0; k <= 10; k++) bx(g, .4 - 1.3 + k * .26, .95, .08, .04, 1.55, .04, '#f2f2ee'); for (const y of [.95, 1.7, 2.46]) bx(g, .4, y, .08, 2.64, .04, .04, '#f2f2ee');   // ventanal con reja blanca
    bx(g, -1.6, 0, -1.17, .85, 2.2, .05, '#e9e9e6'); bx(g, -1.6, .3, -1.13, .6, 1.7, .02, '#3b4a55'); rejaV(g, -1.6, .3, -1.1, .6, 1.7, '#f2f2ee', .1);
    bx(g, 2.2, 1.9, .05, .35, .35, .04, '#e8a690');
    bx(g, -2.3, 3.0, -1.2, 1.6, .9, .25, '#e8a690'); cylIn(g, 1.3, 4.0, -6, .5, .9, '#7a7e82'); for (const s of [-1, 1]) poleIn(g, [1.3 + s * .35, 3.0, -6], [1.3 + s * .35, 3.6, -6], .03, '#9a9a95');
    pasto(cx - w / 2, cx + w / 2 - .6); addTree(cx - .4, -150.2, .85, false);
  }
  // 4) casa de la esquina de Córdoba: beige con zócalo de laja, rejas oscuras, galería con portón de reja, chimenea de piedra,
  //    jardín en la esquina con murito de laja y reja negra que sigue por Córdoba
  { const { g, w, cx } = casa(-89.5, -82.2);   // w = 7.3 · local -3.65..3.65 (izquierda = esquina)
    const BE = '#d9d4c4', RJ = '#1f2e28';
    body(g, -.9, w / 2, 1.6, 12, 3.1, BE); body(g, -2.4, -.9, 3.2, 12, 3.1, BE);
    bx(g, .7, 3.1, -6.6, 6.6, .25, 11, '#cfc9bb'); bx(g, .7, 2.9, -1.35, 6.8, .25, .7, '#c4beb0');   // losa con alero
    piedra(g, 1.4, 0, -1.58, 4.5, .9); piedra(g, -1.65, 0, -3.18, 1.5, .9);
    for (const x of [.4, 2.6]){ bx(g, x, .95, -1.57, 1.3, 1.4, .04, '#3b4a55'); rejaV(g, x, .95, -1.52, 1.3, 1.4, RJ, .12); bx(g, x, .9, -1.5, 1.4, .06, .14, '#cfc9bb'); }
    bx(g, -1.65, 0, -3.17, .9, 2.2, .05, '#6e5a46'); rejaV(g, -1.65, 0, -.2, 1.5, 1.4, RJ, .12);   // puerta de la galería y portoncito de reja en el hueco del murito
    // costado sobre Córdoba (local -x): dos ventanales con reja, puerta vidriada, alero saliente y banco de madera (c7)
    { const sg = group(0, 0); g.add(sg); sg.position.set(-2.4, 0, -6); sg.rotation.y = -Math.PI / 2;
      bx(sg, 2.2, .92, .02, 1.65, 1.38, .04, '#3b4a55'); rejaV(sg, 2.2, .92, .07, 1.65, 1.38, RJ, .12);
      bx(sg, -.3, 0, .02, 1.1, 2.15, .04, '#5a4a3a'); rejaV(sg, -.3, 0, .07, 1.1, 2.15, RJ, .12);
      bx(sg, -2.5, .92, .02, 1.35, 1.35, .04, '#3b4a55'); rejaV(sg, -2.5, .92, .07, 1.35, 1.35, RJ, .12);
      bx(sg, -.4, 2.86, .45, 9.6, .26, 1.05, '#c7b8a0');   // alero plano beige sobresaliendo sobre el jardín de Córdoba
      bx(sg, -1.4, .42, .45, 1.25, .10, .38, '#a65c2e');   // banco de madera naranja bajo el alero
      piedra(sg, 0, 0, .02, 9.6, .8); }
    bx(g, -2.0, 3.1, -7.5, .9, 1.9, .9, '#a89880'); piedra(g, -2.0, 3.1, -7.04, .9, 1.9);
    cylIn(g, 2.4, 4.0, -9, .45, .8, '#7f878d');
    // murito de laja con reja negra: frente sobre Jujuy (con hueco en la galería) y lado de Córdoba, encerrando el jardín de la esquina
    const murito = (x0, z0, x1, z1) => { const len = Math.hypot(x1 - x0, z1 - z0), along = Math.abs(x1 - x0) > Math.abs(z1 - z0), mx = (x0 + x1) / 2, mz = (z0 + z1) / 2;
      bx(g, mx, 0, mz, along ? len : .3, .6, along ? .3 : len, '#b48a64');
      piedra(g, mx, 0, mz + (along ? .16 : 0), along ? len : .3, .6, along ? 0 : 0);
      if (along) rejaV(g, mx, .6, mz, len, .8, '#1a1a1a', .12); else { const sg = group(0, 0); g.add(sg); sg.position.set(mx - .16, 0, mz); sg.rotation.y = -Math.PI / 2; piedra(sg, 0, 0, 0, len, .6); rejaV(sg, 0, .6, .16, len, .8, '#1a1a1a', .12); }
      colLocal(g, Math.min(x0, x1) - .15, Math.min(z0, z1) - .15, Math.max(x0, x1) + .15, Math.max(z0, z1) + .15, null); };
    murito(-w / 2, -.2, -2.4, -.2); murito(-.9, -.2, w / 2, -.2); murito(-w / 2, -.2, -w / 2, -11);
    for (const x of [-w / 2, -2.4, -.9, w / 2]) { bx(g, x, 0, -.2, .45, 1.5, .45, '#b48a64'); }
    rectG(g, -w / 2, -.2, -2.4, -11, '#5f8f3e'); rectG(g, -2.4, -.2, w / 2, -1.6, '#5f8f3e');
    for (const [lx, lz, s] of [[-2.6, -1.2, 1.0], [-2.6, -3.5, .92], [-2.6, -6.5, .85], [-2.6, -9, .92], [1.4, -.9, .8]]) addBush(cx + lx, ZF + lz, s, 0);
    addTree(cx - 2.9, ZF - 4.8, .9, false, ['#4b7a30', '#3f6b2a']);
    // árboles de la vereda (aguaribay), poste de luz y cartel de la esquina
    pasto(cx - w / 2, cx + w / 2); flat.rect(-92.88, -153, -91.4, -162, .205, '#6f8f45');
    for (const x of [cx - 1.6, cx + 2.6]) addTree(x, -150.2, 1.0, false, ['#8fb04a', '#9ab85a', '#7da23f']);
    addTree(-92.2, -158, 1.05, false, ['#8fb04a', '#9ab85a']);
    poles.add(-90.8, 0, -150.4, .16, 8.5, .16, 0, '#bdb8ac'); addCol(-90.95, -150.55, -90.65, -150.25);
    { const sg = group(-92.3, -151.2); poleIn(sg, [0, 0, 0], [0, 2.9, 0], .05, '#2a3b6b');
      for (const s of [-1, 1]) signIn(sg, 'Jujuy', 0, 2.7, s * .03, 1.0, .26, '#1f3a8a', '#ffffff', s > 0 ? 0 : Math.PI);          // paralelo a Jujuy
      for (const s of [-1, 1]) signIn(sg, 'Córdoba', s * .03, 2.38, 0, 1.0, .26, '#1f3a8a', '#ffffff', s * Math.PI / 2);          // paralelo a Córdoba
      addCol(-92.4, -151.3, -92.2, -151.1); }
  }
  plazaRects.push([-89.5, -172, -56.8, ZF]);   // sin árboles ni casas al azar en estos lotes
  function rectG(g, lx0, lz0, lx1, lz1, col){   // piso dentro del lote, en coordenadas locales del grupo (grupos sin giro)
    const x0 = g.position.x + Math.min(lx0, lx1), x1 = g.position.x + Math.max(lx0, lx1), z0 = g.position.z + Math.min(lz0, lz1), z1 = g.position.z + Math.max(lz0, lz1);
    flat.rect(x0, z0, x1, z1, .06, col);
  }
}

// =========================================================================
// Jujuy lado norte, del Banco Macro hacia la esquina de Av. Centenario (fotos de Street View del usuario):
// A casa blanca con zócalo de ladrillo, postigos oscuros y baranda de hierro en la terraza + portón de reja con azulejos al patio salmón ·
// B paredón blanco con portón de garaje · C casa retirada con reja negra y jardín · D casa vieja de ladrillo blanqueado con persianas de
// madera y portón de reja verde · E casa crema con faja roja y puerta con abanico · F local con letras rojas y portón de chapa + portón marrón ·
// G esquina de ladrillo con ochava blanca y rejas trabajadas, que sigue por Av. Centenario; poste doble de hormigón y cartel de la esquina.
// =========================================================================
{
  const ZF = -137;
  // local: frente en z = 0 sobre la línea de Jujuy, +z = hacia la calle (-z), +x = hacia el Banco (oeste) = la derecha en las fotos
  const casa = (xa, xb) => { const cx = (xa + xb) / 2; return { g: group(cx, ZF, Math.PI), w: xb - xa, cx }; };
  const body = (g, x0, x1, d0, d1, h, col) => { bx(g, (x0 + x1) / 2, 0, -(d0 + d1) / 2, x1 - x0, h, d1 - d0, col); colLocal(g, x0, -d1, x1, -d0, col); };
  const rejaV = (g, x, y0, z, w, h, col, step = .13) => { for (let k = 1; k < Math.round(w / step); k++) bx(g, x - w / 2 + k * step, y0, z, .03, h, .03, col); for (const y of [y0, y0 + h - .04]) bx(g, x, y, z, w + .04, .04, .04, col); };
  const puerta = (g, x, z, w, h, col) => { bx(g, x, 0, z + .02, w + .14, h + .07, .06, '#e6e3dc'); bx(g, x, 0, z + .05, w, h, .06, col); bx(g, x - w * .33, h * .45, z + .1, .06, .06, .06, '#c9a227'); };
  const postigos = (g, x, y0, w, h, col = '#2f3a30') => { bx(g, x, y0, .03, w, h, .04, '#e9dcc8'); for (const s of [-1, 1]) bx(g, x + s * (w / 2 + w / 4), y0, .06, w / 2, h, .05, col); bx(g, x, y0 - .08, .06, w + .2, .08, .12, '#e6e3dc'); };
  const persianaMadera = (g, x, y0, w, h) => { bx(g, x, y0 - .07, .02, w + .16, h + .14, .06, '#d9d0c0'); bx(g, x, y0, .05, w, h, .04, '#8a6a45'); for (let y = y0 + .08; y < y0 + h - .05; y += .09) bx(g, x, y, .075, w, .02, .01, '#6f5236'); };
  const pastoN = (xa, xb, col = '#8f8a5a') => flat.rect(xa, -140.5, xb, -139.2, .205, col);   // franja junto al cordón
  const vereda = (xa, xb, col) => flat.rect(xa, -139.2, xb, ZF, .206, col);
  const toLocalWorld = (cx, lx, lz) => [cx - lx, ZF - lz];

  // A) casa blanca con zócalo de ladrillo, postigos oscuros, puerta de madera, baranda de hierro arriba + portón de reja con azulejos al patio
  { const { g, w, cx } = casa(-60.9, -50.9);   // w = 10 · local -5..5 (+x = oeste, hacia el banco)
    const LR = '#b5603a';
    body(g, -5, 1.6, 0, 12, 3.3, '#f2f0ea');
    for (const [x, ww] of [[-3.75, 2.3], [-.3, 2.8]]) bx(g, x, 0, .03, ww, .95, .06, LR);
    postigos(g, -3.75, 1.1, .9, 1.3); puerta(g, -1.75, 0, .9, 2.3, '#9a5a3a'); postigos(g, .5, 1.1, .9, 1.3);
    bx(g, 1.45, 0, .02, .4, 3.6, .3, LR);                                                     // pilar de ladrillo
    rejaV(g, -1.7, 3.3, -.1, 6.6, .75, '#2a2a2a', .16); for (const x of [-4.9, -1.7, 1.5]) bx(g, x, 3.3, -.1, .3, .95, .3, LR);   // baranda de la terraza
    cylIn(g, -3.8, 3.75, -3, .25, .9, '#9aa0a5'); cylIn(g, -2.6, 3.65, -2.5, .35, .2, '#b9bdc0', Math.PI / 2).rotation.set(.6, 0, 0);   // caño y antenita
    // patio: pilar blanco con azulejos, portón de reja blanco, pilar salmón con placa, murito blanco; porche salmón al fondo
    bx(g, 2.0, 0, .02, .55, 2.0, .45, '#f2f0ea'); for (const [y, c] of [[.4, '#c0392b'], [.75, '#2f6fb5'], [1.1, '#e8a33a'], [1.45, '#3a8a5a']]) bx(g, 2.0, y, .26, .4, .28, .02, c);
    rejaV(g, 3.0, .05, -.05, 1.5, 1.7, '#f2f2ee', .12); for (const y of [.6, 1.2]) cylIn(g, 3.0, y, -.03, .25, .03, '#f2f2ee', Math.PI / 2).rotation.set(Math.PI / 2, 0, 0);
    bx(g, 4.05, 0, .02, .55, 2.1, .45, '#e0a37a'); bx(g, 4.05, 1.35, .26, .5, .3, .03, '#c98f68'); signIn(g, 'PORTO GRANADO', 4.05, 1.35, .28, .48, .2, '#c98f68', '#5a2a1a');
    bx(g, 4.65, 0, .02, .7, 1.4, .3, '#f2f0ea');
    colLocal(g, 1.7, -.25, 2.3, .25, null); colLocal(g, 3.8, -.25, 5, .25, null);
    body(g, 1.6, 5, 4, 12, 3.0, '#e8a07a'); bx(g, 3.3, 2.9, -3.6, 3.5, .35, .9, '#e0956c');
    { const [x0, z0] = toLocalWorld(cx, 1.6, 0), [x1, z1] = toLocalWorld(cx, 5, -4); flat.rect(Math.min(x0, x1), Math.min(z0, z1), Math.max(x0, x1), Math.max(z0, z1), .06, '#b55a3a'); }
    bx(g, 2.6, 0, -3.97, .85, 2.1, .05, '#4a4038'); bx(g, 4.1, 1.0, -3.97, 1.2, .8, .05, '#3b4a55');
    for (const x of [3.6, 2.3]) { cylIn(g, x, .25, -2.2, .25, .5, '#b5603a'); cylIn(g, x, .65, -2.2, .3, .35, '#4c7a30'); }
    vereda(-60.9, -50.9, '#c9b7a0'); pastoN(-60.9, -50.9); addTree(cx + 2.2, -139.9, 1.1, false, ['#c9a67a', '#b58f5a', '#9c7a45']);
  }
  // B) paredón blanco con portón de garaje grande
  { const { g, w, cx } = casa(-50.9, -46.4);   // w = 4.5
    body(g, -w / 2, w / 2, 0, 12, 3.6, '#f2f1ec');
    bx(g, 0, 0, .04, 3.0, 2.45, .06, '#f8f8f6'); bx(g, 0, 2.45, .04, 3.2, .1, .08, '#dcd9d2');
    for (const [x, y, ww, hh] of [[1.2, 2.9, 1.2, .5], [-1.6, 2.7, .6, .7]]) bx(g, x, y, .03, ww, hh, .02, '#d4d0c6');
    bx(g, 1.9, 1.5, .05, .2, .25, .04, '#c98f68');
    flat.rect(-50.9, -140.5, -46.4, ZF, .207, '#c4bfb4');                                    // entrada de cemento
  }
  // C) casa blanca retirada con reja negra al frente, jardín con plantas y galería
  { const { g, w, cx } = casa(-46.4, -39.9);   // w = 6.5 · local -3.25..3.25
    body(g, -w / 2, w / 2, 3, 12, 3.0, '#f2f1ec');
    bx(g, 1.5, .95, -2.96, 1.5, 1.2, .05, '#f8f8f6'); bx(g, 1.5, 1.0, -2.93, 1.3, 1.1, .03, '#3b4a55'); for (let k = 1; k < 4; k++) bx(g, 1.5 - .65 + k * .325, 1.0, -2.9, .03, 1.1, .02, '#f8f8f6');
    bx(g, -.6, 2.7, -2.2, 2.4, .12, 1.7, '#e6e3dc'); for (const x of [-1.7, .5]) bx(g, x, 0, -1.45, .14, 2.7, .14, '#f2f1ec');   // galería
    bx(g, -.6, 0, -2.97, .85, 2.1, .05, '#e9e9e6'); bx(g, -.6, .4, -2.93, .6, 1.4, .02, '#3b4a55');
    rejaV(g, 0, 0, -.1, w, 1.4, '#1f1f1f', .12); for (const x of [-w / 2, w / 2]) bx(g, x, 0, -.1, .25, 1.6, .25, '#f2f1ec');
    colLocal(g, -w / 2, -.25, -1.3, 0, null); colLocal(g, .2, -.25, w / 2, 0, null);           // hueco del portoncito
    { const [x0, z0] = toLocalWorld(cx, -w / 2, -.2), [x1, z1] = toLocalWorld(cx, w / 2, -3); flat.rect(Math.min(x0, x1), Math.min(z0, z1), Math.max(x0, x1), Math.max(z0, z1), .05, '#6a9a45'); }
    for (const [lx, s] of [[2.4, .9], [1.4, .7], [-2.6, .6]]) addBush(cx - lx, ZF - 1.4, s, 0);
    for (const lx of [-1.3, .2]) { const [x, z] = toLocalWorld(cx, lx, -1.0); poles.add(x, 0, z, .04, 1.2, .04, 0, '#2a2a2a'); trims.add(x, 1.2, z, .2, .25, .2, 0, '#2a2a2a'); }   // farolitos del jardín
    vereda(-46.4, -39.9, '#c9b7a0'); pastoN(-46.4, -39.9, '#9a9264');
    { const kx = cx - 1.2, kz = -139.7, kg = group(kx, kz); poleIn(kg, [0, 0, 0], [0, .6, 0], .03, '#3a3a3a'); bx(kg, 0, .6, 0, .9, .55, .5, '#6a6e72'); addCol(kx - .1, kz - .1, kx + .1, kz + .1); }
  }
  // D) casa vieja de ladrillo blanqueado con cornisa, persianas de madera viejas y puerta de madera; portón de reja verde al costado
  { const { g, w, cx } = casa(-39.9, -32.4);   // w = 7.5 · local -3.75..3.75
    const BLQ = '#e6ddd0';
    body(g, -3.75, 1.7, 0, 12, 4.3, BLQ);
    for (let k = 0; k < 40; k++) bx(g, R(-3.6, 1.6), R(.6, 4.0), .03, R(.3, .9), R(.08, .2), .02, pick(['#c9a48a', '#b88a70', '#d8c4b2']));   // ladrillo a la vista donde se cayó la cal
    bx(g, -1.0, 3.75, .06, 5.5, .15, .12, '#efe8dc'); bx(g, -1.0, 4.15, .03, 5.6, .25, .2, '#efe8dc'); bx(g, -1.0, 0, .04, 5.45, .55, .06, '#f2efe8');
    persianaMadera(g, -2.85, 1.0, 1.0, 1.8); persianaMadera(g, .5, 1.0, 1.0, 1.8);
    puerta(g, -1.05, 0, .85, 2.5, '#7a5a3a');
    bx(g, 1.85, 0, -2, .3, 3.0, 4, '#b88a70');                                                // medianera de ladrillo
    for (const x of [1.95, 3.6]) bx(g, x, 0, .02, .3, 2.3, .3, '#b88a70');
    bx(g, 2.78, 0, .02, 1.5, 2.15, .04, '#2f4a2f'); rejaV(g, 2.78, 0, .06, 1.5, 2.15, '#4f7a3f', .14); for (const y of [.7, 1.4]) bx(g, 2.78, y, .06, 1.5, .04, .04, '#4f7a3f');   // portón de reja verde
    colLocal(g, 1.8, -.2, 3.75, .2, null);
    vereda(-39.9, -32.4, '#b88a76'); flat.rect(-36, -139.2, -34.6, ZF, .207, '#e2dccd'); pastoN(-39.9, -32.4, '#9a9264');
    addTree(cx + 1.8, -139.9, 1.0, false, ['#c9a67a', '#b58f5a']); addTree(cx - 2.8, -139.9, 1.0, false, ['#c9a67a', '#b58f5a']);
    poles.add(cx - 2.2, 0, -139.6, .13, 6.5, .13, 0, '#d9622b'); addCol(cx - 2.35, -139.75, cx - 2.05, -139.45);
  }
  // E) casa crema con faja roja arriba y zócalo rojo, ventanas, puerta blanca con abanico, banco de madera y macetas
  { const { g, w, cx } = casa(-32.4, -26.4);   // w = 6 · local -3..3
    body(g, -w / 2, w / 2, 0, 12, 3.4, '#ecdfb8');
    bx(g, 0, 3.15, .04, w, .15, .08, '#8f3a2e'); bx(g, 0, 0, .04, w, .35, .06, '#8f3a2e');
    for (const [x, y, ww, hh] of [[-2.3, 1.6, .8, .6], [.9, 2.5, 1.2, .5]]) bx(g, x, y, .03, ww, hh, .02, '#ddd0a8');
    bx(g, -1.75, 1.05, .03, 1.0, 1.0, .05, '#e6e3dc'); bx(g, -1.75, 1.1, .06, .85, .9, .02, '#3b4a55'); bx(g, -1.75, 1.55, .08, .85, .03, .02, '#e6e3dc');
    puerta(g, .05, 0, .8, 2.2, '#f4f4f2'); bx(g, .05, 1.75, .12, .5, .25, .02, '#3b4a55'); cylIn(g, .05, 1.95, .12, .25, .02, '#3b4a55', Math.PI / 2).rotation.set(Math.PI / 2, 0, 0);
    bx(g, 1.8, 1.05, .03, 1.0, 1.0, .05, '#e6e3dc'); bx(g, 1.8, 1.1, .06, .85, .9, .02, '#f2f1ec');
    bx(g, -.8, 1.3, .06, .2, .3, .1, '#b03a2a');                                              // casita de pájaros roja
    bx(g, -2.5, .45, .35, 1.4, .08, .4, '#8a6a45'); for (const x of [-3.1, -1.9]) bx(g, x, 0, .35, .08, .45, .35, '#5a4a3a');   // banco de madera
    for (const x of [1.0, 1.5]) { cylIn(g, x, .15, .3, .15, .3, '#b5603a'); cylIn(g, x, .45, .3, .2, .3, '#4c7a30'); }
    vereda(-32.4, -26.4, '#c9b7a0'); pastoN(-32.4, -26.4, '#8a7a5a'); addTree(cx + .7, -139.9, 1.0, false, ['#c9a67a', '#b58f5a']);
  }
  // F) imprenta: letras rojas verticales "IMPRENTA" y portón de chapa con barrotes oxidado, enredadera arriba; portón marrón de chapa al lado
  { const { g, w, cx } = casa(-26.4, -21.4);   // w = 5 · local -2.5..2.5 (+x = oeste)
    body(g, -.1, 2.5, 0, 10, 2.8, '#ebe4d6');
    bx(g, 1.35, 0, .04, 1.9, 2.2, .05, '#9a6a48'); rejaV(g, 1.35, .9, .08, 1.9, 1.3, '#6a4a30', .16); bx(g, 1.35, 0, .08, 1.9, .9, .03, '#8a5638');
    bx(g, 1.35, 2.3, .05, 2.2, .1, .06, '#c0392b');
    { const c = document.createElement('canvas'); c.width = 64; c.height = 256; const x = c.getContext('2d'); x.fillStyle = '#ebe4d6'; x.fillRect(0, 0, 64, 256); x.fillStyle = '#d0302a'; x.font = 'bold 30px Arial'; x.textAlign = 'center'; [...'IMPRENTA'].forEach((ch, i) => x.fillText(ch, 32, 30 + i * 29));
      const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; const m = new THREE.Mesh(new THREE.PlaneGeometry(.4, 1.9), lam({ map: t })); m.position.set(.2, 1.15, .03); g.add(m); }
    for (let k = 0; k < 8; k++){ const [x, z] = toLocalWorld(cx, R(-.1, 2.4), -.15); crowns.add(x, R(2.6, 3.1), z, .55, .4, .35, R(0, 6), pick(['#3f6b2a', '#4c7a30', '#55803a'])); }   // enredadera que asoma arriba
    bx(g, -1.3, 0, -.05, 2.4, 2.2, .06, '#7a4a32'); for (let x = -2.4; x < -.1; x += .2) bx(g, x, 0, -.01, .03, 2.2, .02, '#5f3826');   // portón marrón
    colLocal(g, -2.5, -.2, -.1, .1, null);
    vereda(-26.4, -21.4, '#c4bfb4'); pastoN(-26.4, -21.4, '#8a7a5a');
  }
  // G) esquina de ladrillo viejo con ochava blanca, zócalo y cornisa blancos, ventanas con rejas trabajadas; sigue por Av. Centenario
  {
    const LAD = '#a8735a', BLc = '#f0efea', foot = [[-21.4, ZF], [-16, ZF], [-13.5, -134.5], [-13.5, -120], [-21.4, -120]];
    extrudePoly(foot, 0, 4.3, LAD); extrudePoly(foot, 4.3, .18, BLc);
    addCol(-21.4, -134.5, -13.5, -120); addCol(-21.4, ZF, -16, -134.5); addCol(-16, -136, -14.5, -134.5); mapRects.push([-21.4, -137, -13.5, -120, LAD]);
    const rejaTrab = (gg, x, y0, w, h) => { bx(gg, x, y0, .03, w, h, .04, '#3b4a55'); rejaV(gg, x, y0, .08, w, h, '#f2f2ee', .1); for (let k = 0; k < 3; k++) cylIn(gg, x, y0 + h * (k + .5) / 3, .09, Math.min(w, h / 3) * .32, .03, '#f2f2ee', Math.PI / 2).rotation.set(Math.PI / 2, 0, 0); bx(gg, x, y0 - .1, .05, w + .3, .12, .12, BLc); bx(gg, x, y0 + h + .05, .05, w + .3, .14, .12, BLc); };
    // frente sobre Jujuy (mira al -z)
    { const gj = group(-18.7, ZF, Math.PI);   // local +x = oeste
      bx(gj, 0, 0, .03, 5.4, .75, .06, BLc); bx(gj, 0, 3.85, .05, 5.5, .2, .12, BLc); for (const y of [3.1, 3.4]) bx(gj, 0, y, .04, 5.4, .06, .06, '#8f5e48');
      rejaTrab(gj, -1.3, .9, 1.0, 1.9); rejaTrab(gj, 1.5, .9, 1.0, 1.9); }
    // ochava blanca con puerta con reja
    { const go = group(-14.75, -135.75, Math.PI * 3 / 4);
      bx(go, 0, 0, .03, 3.6, 4.3, .08, BLc); bx(go, 0, 4.1, .1, 3.7, .3, .15, '#e2ddd2'); bx(go, 0, 3.4, .1, 2.6, .12, .1, '#e2ddd2');
      bx(go, 0, 0, .09, 1.2, 2.4, .04, '#3b4a55'); rejaV(go, 0, 0, .13, 1.2, 2.4, '#f2f2ee', .1); bx(go, 0, 0, .3, 1.5, .15, .4, '#c9c6bd'); }
    // frente sobre Av. Centenario (mira al +x): anexo blanco junto a la ochava y ladrillo con ventanas y puerta
    { const ga = group(-13.5, -127.25, Math.PI / 2);   // local +x = hacia el norte (-z), local z -> +x mundo (foto 1 de la cuadra hacia Dr. Brunet)
      // anexo blanco más bajo junto a la ochava, con ventana enrejada
      bx(ga, 5.75, 0, .04, 3.0, 3.1, .1, BLc); bx(ga, 5.75, 3.0, .08, 3.1, .15, .2, '#e2ddd2'); bx(ga, 5.75, 1.1, .1, 1.2, 1.0, .04, '#3b4a55'); rejaV(ga, 5.75, 1.1, .14, 1.2, 1.0, '#2a2a2a', .1);
      // ladrillo viejo: zócalo de cemento gris, dinteles revocados y cornisa
      bx(ga, -1.1, 0, .03, 10.3, .7, .06, '#9a948a'); bx(ga, -1.1, 3.95, .05, 10.4, .2, .14, '#8f5e48');
      for (const x of [3.05, 1.35, -.75, -3.45, -5.75]) bx(ga, x, 2.7, .04, 1.2, .35, .05, '#b9b2a6');
      // ventana con marco revocado y reja, puerta de madera, puerta doble blanca, puerta doble con banderola y ventana con reja
      bx(ga, 3.05, .75, .04, 1.4, 1.75, .05, '#d9d2c4'); bx(ga, 3.05, .95, .08, 1.0, 1.3, .03, '#3b4a55'); rejaV(ga, 3.05, .95, .11, 1.0, 1.3, '#6a6a6a', .12);
      bx(ga, 1.35, 0, .05, .9, 2.3, .05, '#7a5a3a');
      bx(ga, -.75, .1, .05, 1.05, 2.3, .05, '#f2f2ee'); bx(ga, -.75, .1, .08, .04, 2.3, .02, '#c9c6bd'); for (const s of [-1, 1]) bx(ga, -.75 + s * .26, 1.0, .09, .3, 1.0, .02, '#3b4a55');
      bx(ga, -3.45, .1, .05, 1.0, 2.6, .05, '#f2f2ee'); bx(ga, -3.45, 2.3, .09, .9, .3, .02, '#3b4a55'); for (const s of [-1, 1]) bx(ga, -3.45 + s * .25, 1.0, .09, .28, 1.0, .02, '#3b4a55');
      rejaTrab(ga, -5.75, .9, .9, 1.8); }
    // poste doble de hormigón en el cordón de Jujuy y cartel de la esquina
    { const pg = group(-17.6, -139.8); for (const s of [-1, 1]) poleIn(pg, [s * .35, 0, 0], [s * .35, 8, 0], .14, '#c9c4b8'); for (const y of [2.6, 5.4, 7.6]) bx(pg, 0, y, 0, .95, .35, .32, '#c9c4b8'); addCol(-18.1, -140, -17.1, -139.6); }
    { const sg = group(-10.6, -139.6); poleIn(sg, [0, 0, 0], [0, 2.9, 0], .05, '#2a3b6b');
      for (const s of [-1, 1]) signIn(sg, 'Av. Centenario', s * .03, 2.7, 0, 1.2, .26, '#1f3a8a', '#ffffff', s * Math.PI / 2);
      for (const s of [-1, 1]) signIn(sg, 'Jujuy', 0, 2.38, s * .03, .9, .26, '#1f3a8a', '#ffffff', s > 0 ? 0 : Math.PI);
      addCol(-10.7, -139.7, -10.5, -139.5); }
    vereda(-21.4, -13.5, '#c4bfb4'); pastoN(-21.4, -13.5, '#6f8f45'); flat.rect(-11.6, -136, -9, -120, .205, '#6f8f45');
  }
  plazaRects.push([-60.8, -137, -13.5, -118]);   // sin árboles ni casas al azar en estos lotes
}

// =========================================================================
// Av. Centenario lado oeste, de la esquina de Jujuy hacia Dr. Brunet, hasta la Farmacia Ferretti (fotos de Street View del usuario):
// H1 sigue el ladrillo viejo: persiana de enrollar y portón de madera enrollable · H2 ladrillo más bajo con puerta blanca y persiana ·
// H3 frente rojo-anaranjado con portón blanco, vidriera con toldito negro y tramo de ladrillo con portón de madera ·
// H4 casa beige con pilastras naranjas, retirada detrás de una reja negra · H5 dos plantas: planta baja de ladrillo con ventanas de arco
// y arriba violeta · H5b angosta verde con ventanal de arco arriba · H6 dos plantas beige con planta baja de piedra ·
// H7 dos plantas blanca con fajas horizontales, balcón con baranda roja y logo rosa · Farmacia Ferretti en la esquina de Dr. Brunet.
// =========================================================================
{
  const XL = -13.5;
  // local: frente en z = 0 sobre la línea de la avenida, +z = hacia la avenida (+x), +x = hacia Jujuy (-z) = la derecha en las fotos
  const casa = (zN, zS) => { const zc = (zN + zS) / 2; return { g: group(XL, zc, Math.PI / 2), w: zS - zN, zc }; };
  const body = (g, x0, x1, d0, d1, h, col) => { bx(g, (x0 + x1) / 2, 0, -(d0 + d1) / 2, x1 - x0, h, d1 - d0, col); colLocal(g, x0, -d1, x1, -d0, col); };
  const rejaV = (g, x, y0, z, w, h, col, step = .13) => { for (let k = 1; k < Math.round(w / step); k++) bx(g, x - w / 2 + k * step, y0, z, .03, h, .03, col); for (const y of [y0, y0 + h - .04]) bx(g, x, y, z, w + .04, .04, .04, col); };
  const enrollar = (g, x, y0, w, h, col, lin) => { bx(g, x, y0, .04, w, h, .05, col); for (let y = y0 + .1; y < y0 + h - .04; y += .1) bx(g, x, y, .07, w, .02, .01, lin); bx(g, x, y0 + h, .06, w + .1, .18, .1, lin); };
  const puerta = (g, x, z, w, h, col) => { bx(g, x, 0, z + .02, w + .14, h + .07, .06, '#e6e3dc'); bx(g, x, 0, z + .05, w, h, .06, col); bx(g, x - w * .33, h * .45, z + .1, .06, .06, .06, '#c9a227'); };
  const arco = (g, x, y0, w, h, glass = '#dfe8ec', marco = '#f2f2ee') => {   // ventana / puerta con medio punto
    bx(g, x, y0, .05, w, h - w / 2, .05, glass); const a = new THREE.Mesh(new THREE.CircleGeometry(w / 2, 16, 0, Math.PI), lam({ color: glass })); a.position.set(x, y0 + h - w / 2, .08); g.add(a);
    for (const s of [-1, 1]) bx(g, x + s * (w / 2 + .05), y0, .07, .1, h - w / 2, .08, marco); const r = new THREE.Mesh(new THREE.TorusGeometry(w / 2 + .05, .05, 6, 16, Math.PI), lam({ color: marco })); r.position.set(x, y0 + h - w / 2, .08); g.add(r); bx(g, x, y0 + (h - w / 2) * .55, .09, w, .04, .03, marco); };
  const pasto = (zN, zS, col = '#8a8a5a') => flat.rect(-10.6, zN, -9, zS, .205, col);
  const vereda = (zN, zS, col) => flat.rect(-13.5, zN, -10.6, zS, .206, col);
  const arbol = (z, s = 1, cols = ['#c9a67a', '#b58f5a', '#9c7a45']) => addTree(-9.8, z, s, false, cols);
  const LAD = '#9a5a42', ZOC = '#9a948a';

  // H1) sigue el ladrillo viejo de la esquina: persiana de enrollar y portón de madera enrollable
  { const { g, w, zc } = casa(-120, -112);   // w = 8 · local -4..4 (+x = norte)
    body(g, -w / 2, w / 2, 0, 12, 4.3, LAD);
    bx(g, 0, 0, .03, w, .7, .06, ZOC); bx(g, 0, 3.95, .05, w + .05, .2, .14, '#8f5e48');
    enrollar(g, 2.1, .7, 1.3, 1.6, '#c9b89a', '#a89878'); bx(g, 2.1, 2.7, .05, 1.5, .35, .05, '#b9b2a6');
    enrollar(g, -1.6, 0, 1.5, 2.45, '#7a4a32', '#5f3826'); bx(g, -1.6, 2.85, .05, 1.7, .35, .05, '#b9b2a6');
    for (const [x, y, ww, hh] of [[0, .9, .8, .5], [3.4, 1.4, .5, .9], [-3.2, 2.0, .9, .5]]) bx(g, x, y, .04, ww, hh, .02, '#8a4e3a');
    vereda(-120, -112, '#b8826e'); pasto(-120, -115.3); pasto(-113.5, -112); flat.rect(-10.6, -115.3, -9, -113.5, .2058, '#b8826e'); arbol(zc - 2.2, 1.05);
  }
  // H2) ladrillo más bajo con zócalo gris, puerta blanca y persiana blanca de enrollar
  { const { g, w, zc } = casa(-112, -106.5);   // w = 5.5
    body(g, -w / 2, w / 2, 0, 12, 3.3, '#8f5a44');
    bx(g, 0, 0, .03, w, .6, .06, ZOC); bx(g, 0, 3.2, .05, w, .12, .1, '#7f4e3a');
    puerta(g, 1.65, 0, .9, 2.2, '#f2f2ee'); for (const s of [-1, 1]) bx(g, 1.65 + s * .22, 1.1, .1, .3, .8, .02, '#3b4a55');
    enrollar(g, -.6, .75, 1.5, 1.15, '#f2f2ee', '#d9d6cf'); bx(g, -2.3, .2, .05, .3, .2, .03, '#5a5a5a');
    pasto(-112, -106.5, '#7d8f4c'); vereda(-112, -106.5, '#b5ab9a');
  }
  // H3) frente rojo-anaranjado: portón blanco con ventanitas, cartelito, vidriera con toldito negro y luces; tramo de ladrillo retirado con portón de madera
  { const { g, w, zc } = casa(-106.5, -96.5);   // w = 10 · local -5..5
    const RO = '#c1532f';
    body(g, -1.6, w / 2, 0, 12, 3.7, RO); body(g, -w / 2, -1.6, .6, 12, 3.6, '#9a5a42');
    bx(g, 1.7, 3.0, .05, 6.6, .12, .1, '#a8452a'); bx(g, 1.7, 3.6, .05, 6.7, .15, .12, '#a8452a');
    bx(g, 3.4, 0, .04, 2.3, 2.3, .05, '#f8f8f6'); bx(g, 3.4, 0, .08, .03, 2.3, .02, '#d9d6cf'); for (const x of [2.7, 3.4, 4.1]) bx(g, x, 1.75, .08, .5, .25, .02, '#3b4a55');
    bx(g, 1.85, 1.9, .06, .45, .35, .03, '#f2f2ee'); signIn(g, 'B Sito', 1.85, 1.9, .08, .4, .25, '#f2f2ee', '#3a3a3a');
    bx(g, -.2, 0, .03, 2.7, 2.4, .05, '#1f1f1f'); bx(g, -.2, .45, .06, 2.3, 1.85, .02, '#2e3a44'); bx(g, -.2, .4, .07, .05, 1.9, .03, '#1f1f1f');
    bx(g, -.2, 0, .05, 2.7, .45, .06, '#f2f2ee');
    boxIn(g, -.2, 2.65, .35, 2.9, .06, .7, '#1f1f1f', -.15); for (let k = 0; k < 6; k++){ const l = new THREE.Mesh(new THREE.SphereGeometry(.05, 6, 4), lam({ color: 0xfff1c0, emissive: 0x6a5a20 })); l.position.set(-1.4 + k * .48, 2.5, .62); g.add(l); }
    bx(g, -3.3, 0, -.55, 2.5, 2.4, .06, '#9a4a30'); for (let x = -4.45; x < -2.1; x += .25) bx(g, x, 0, -.51, .03, 2.4, .02, '#7a3a24');   // portón de madera
    bx(g, -3.3, 2.45, -.55, 3.4, .25, .06, '#2f2f2f'); for (const x of [-4.9, -1.7]) bx(g, x, 0, -.3, .15, 3.6, .6, '#8f5a44');
    bx(g, -1.1, 0, -.1, .3, 1.4, .4, '#3a3a3a');                                           // cartel de pie
    vereda(-106.5, -96.5, '#c9b7a0'); pasto(-106.5, -101.5, '#6f8f45'); pasto(-100.5, -96.5, '#6f8f45'); arbol(zc + .4, 1.1);
    for (const [z0, z1] of [[-106.2, -103.6], [-99.6, -96.8]]) flat.rect(-10.6, z0, -9, z1, .2058, '#bdb6aa');   // entradas de autos (sin pasto ni cordón)
    { const rg = group(-11.5, zc - 1.1); for (let k = 0; k < 3; k++) poleIn(rg, [-.4 + k * .4, 0, -.3], [-.4 + k * .4, 0, .3], .02, '#8a8a8a'); }   // bicicletero
  }
  // H4) casa beige con pilastras naranjas, retirada, con reja negra moderna al frente (portón y portoncito)
  { const { g, w, zc } = casa(-96.5, -87.5);   // w = 9 · local -4.5..4.5
    const BE = '#d9cbb5', NA = '#e08a3c';
    body(g, -w / 2, 2.6, 3.4, 12, 3.1, BE); body(g, 2.6, w / 2, 1.8, 12, 3.3, '#ddd0bc');
    for (const x of [-4.35, -.9, 2.6, 4.35]) bx(g, x, 0, x > 2 ? -1.75 : -3.35, .35, x > 2 ? 3.3 : 3.1, .12, NA);
    for (const x of [-3.0, -1.7]) { bx(g, x, 1.0, -3.36, 1.1, 1.1, .05, '#e9e6de'); bx(g, x, 1.05, -3.33, .95, 1.0, .02, '#3b4a55'); }
    bx(g, .7, 0, -4.2, 1.0, 2.2, .05, '#7a5a3a'); bx(g, .7, 2.6, -3.8, 2.6, .12, 1.0, BE);
    bx(g, 3.6, 1.6, -1.78, .5, .4, .03, '#f2f2ee');
    rejaV(g, -1.2, .1, -.1, 6.6, 1.5, '#1f1f1f', .9); bx(g, -1.2, .1, -.1, 6.6, .06, .06, '#1f1f1f'); bx(g, -1.2, 1.55, -.1, 6.6, .06, .06, '#1f1f1f');
    rejaV(g, 3.0, .1, -.1, 2.6, 1.5, '#1f1f1f', .9); for (const x of [-4.5, 2.1, 4.4]) bx(g, x, 0, -.1, .12, 1.65, .12, '#1f1f1f');
    bx(g, 3.3, .05, -.08, 1.6, 1.5, .02, '#2a2a2a');                                          // panel del portón de autos
    colLocal(g, -4.5, -.2, 1.0, 0, null); colLocal(g, 1.9, -.2, 4.5, 0, null);
    { const gg = new THREE.Mesh(new THREE.PlaneGeometry(6.6, 1.4), new THREE.MeshLambertMaterial({ color: 0x2a2a2a, transparent: true, opacity: .25, side: THREE.DoubleSide })); gg.position.set(-1.2, .85, -.1); g.add(gg); }
    flat.rect(-13.5 - 3.4, zc - 4.5, -13.5, zc + 4.5, .06, '#c9c3b6');
    for (const [lx, s] of [[-2.4, .5], [-.4, .45]]) addBush(XL - 2.4, zc - lx, s, 0);
    vereda(-96.5, -87.5, '#c9b7a0'); pasto(-96.5, -87.5, '#6f8f45'); arbol(zc + 1.3, .9);
    flat.rect(-10.6, -96.4, -9, -93.6, .2058, '#bdb6aa');   // entrada de autos frente al portón
    { const kx = -10.2, kz = zc - 5.1, kg = group(kx, kz); poleIn(kg, [0, 0, 0], [0, .65, 0], .03, '#3a3a3a'); bx(kg, 0, .65, 0, .9, .55, .5, '#5a5e62'); addCol(kx - .1, kz - .1, kx + .1, kz + .1); }
  }
  // H5) dos plantas: planta baja de ladrillo con ventanas de arco y puerta, planta alta violeta con ventanita; faroles
  { const { g, w, zc } = casa(-87.5, -80);   // w = 7.5 · local -3.75..3.75
    body(g, -w / 2, w / 2, 0, 12, 3.0, '#9a4a35'); bx(g, 0, 3.0, -6, w, 3.0, 12, '#8a6fb0');
    bx(g, 0, 2.95, .1, w + .1, .15, .3, '#ece9e2'); bx(g, 0, 6.0, -.05, w + .1, .2, .25, '#7c63a0');
    arco(g, 2.0, .3, 1.1, 2.2); arco(g, .55, .3, 1.0, 2.2, '#c9d8e0'); puerta(g, -1.1, 0, .85, 2.3, '#4a3a30'); arco(g, -2.55, 0, 1.0, 2.5);
    bx(g, .9, 3.8, .03, .9, .6, .05, '#3b4a55'); for (const x of [-3.4, 3.4]) { bx(g, x, 2.3, .06, .1, .3, .12, '#2a2a2a'); const l = new THREE.Mesh(new THREE.SphereGeometry(.12, 8, 6), lam({ color: 0xf6f3ea, emissive: 0x2a2a22 })); l.position.set(x, 2.55, .2); g.add(l); }
    bx(g, -1.9, 1.2, .05, .3, .3, .04, '#f2f2ee');
    vereda(-87.5, -80, '#c9c3b6'); pasto(-87.5, -80, '#6f8f45'); arbol(zc, 1.05);
    { const rg = group(-11.4, zc + 2.6); for (let k = 0; k < 3; k++) poleIn(rg, [0, 0, -.4 + k * .4], [0, .5, -.4 + k * .4], .02, '#8a8a8a'); }
  }
  // H5b) angosta: arriba verde con ventanal de arco de madera, abajo ladrillo con puerta de madera, puerta de vidrio y ventanita redonda
  { const { g, w, zc } = casa(-80, -76);   // w = 4 · local -2..2
    body(g, -w / 2, w / 2, 0, 12, 3.0, '#9a4a35'); bx(g, 0, 3.0, -6, w, 3.0, 12, '#7fd06a'); bx(g, 0, 2.95, .1, w + .1, .15, .3, '#ece9e2'); bx(g, 0, 6.0, -.05, w + .2, .15, .3, '#6fb85a');
    arco(g, 0, 3.4, 1.4, 1.9, '#e8e0d0', '#7a5a3a');
    puerta(g, -1.3, 0, .8, 2.3, '#7a5a3a'); bx(g, .1, .15, .05, 1.0, 2.2, .05, '#f2f2ee'); bx(g, .1, .3, .08, .8, 1.9, .02, '#c9d8e0');
    cylIn(g, 1.35, 1.6, .06, .22, .05, '#f2f2ee', Math.PI / 2).rotation.set(Math.PI / 2, 0, 0); cylIn(g, 1.35, 1.6, .09, .16, .02, '#3b4a55', Math.PI / 2).rotation.set(Math.PI / 2, 0, 0);
    vereda(-80, -76, '#c9c3b6'); pasto(-80, -76, '#6f8f45');
  }
  // H6) dos plantas beige: planta baja de piedra clara con persiana de enrollar y puerta; arriba ventana y aire acondicionado
  { const { g, w, zc } = casa(-76, -70.5);   // w = 5.5
    body(g, -w / 2, w / 2, 0, 12, 3.0, '#cfc6b2'); bx(g, 0, 3.0, -6, w, 3.3, 12, '#d8c4a2'); bx(g, 0, 6.3, -.05, w + .1, .15, .2, '#c4b08e');
    for (let y = .3; y < 3; y += .3) bx(g, 0, y, .02, w, .02, .02, '#b8ae98');
    enrollar(g, 1.2, .9, 1.3, 1.2, '#f2f2ee', '#d9d6cf'); puerta(g, -1.5, 0, .85, 2.2, '#6e3a2a');
    bx(g, .2, 3.7, .03, 1.3, 1.1, .05, '#3b4a55'); bx(g, -1.7, 4.3, .2, .8, .5, .3, '#efefec');
    vereda(-76, -70.5, '#c9c3b6'); pasto(-76, -70.5, '#7d8f4c'); arbol(zc + .5, .8, ['#4b7a30', '#5e8a3a', '#557f35']);
  }
  // H7) dos plantas blanca con fajas horizontales, puerta doble de madera, vidriera, persiana; balcón retirado con baranda roja; logo rosa
  { const { g, w, zc } = casa(-70.5, -63.5);   // w = 7 · local -3.5..3.5
    body(g, -w / 2, w / 2, 0, 12, 4.2, '#f2f1ec');
    for (let y = 3.0; y < 4.2; y += .2) bx(g, 0, y, .03, w, .04, .05, '#d9d6cf');
    bx(g, 0, 0, .03, w, .45, .05, '#cfcbc2');
    bx(g, 2.2, .45, .04, 1.6, 1.8, .05, '#3b4a55'); bx(g, 2.2, .45, .07, 1.7, .05, .04, '#f2f2ee');
    bx(g, .2, 0, .04, 1.1, 2.3, .05, '#a08a6a'); bx(g, .2, 0, .08, .03, 2.3, .02, '#7a6a50');
    enrollar(g, -2.2, .7, 1.7, 1.5, '#f2f2ee', '#d9d6cf');
    bx(g, 1.4, 3.35, .06, .55, .35, .04, '#e88aa8'); bx(g, 1.4, 3.6, .06, .2, .2, .04, '#e88aa8');
    bx(g, 0, 4.2, -4.5, w, 2.6, 5, '#ece9e2'); bx(g, 0, 4.2, -.4, w, .9, .08, '#9a3a2a'); for (let x = -3.3; x < 3.4; x += .35) bx(g, x, 4.2, -.38, .05, .9, .05, '#9a3a2a');   // balcón con baranda roja
    bx(g, -1.2, 4.5, -1.98, 2.2, 1.2, .05, '#3b4a55'); bx(g, 1.8, 5.6, -1.8, .8, .5, .3, '#efefec');
    vereda(-70.5, -63.5, '#c9c3b6'); pasto(-70.5, -63.5, '#7d8f4c'); arbol(zc - 1.6, 1.0);
  }
  // FARMACIA FERRETTI (esquina Av. Centenario y Dr. Brunet): crema con banda verde, zócalo de piedra clara, vidriera y puerta sobre la avenida,
  // pilastra verde, cruz verde, cartel grande arriba y frente sobre Dr. Brunet con ventanas de persiana
  {
    const ZB = -55.5, XF = -26, CRM = '#f2ecd8', VE = '#2e9a4a', PIE = '#d6cdb8', OCH = 3.6;   // ochava con catetos de 3,6 m (frente de ~5 m)
    const FOOT = [[XF, -63.5], [XL, -63.5], [XL, ZB - OCH], [XL - OCH, ZB], [XF, ZB]];
    extrudePoly(FOOT, 0, 4.6, CRM); extrudePoly(FOOT, 4.6, .15, '#e2dccb');
    addCol(XF, -63.5, XL, ZB - OCH); addCol(XF, ZB - OCH, XL - OCH, ZB); addCol(XL - OCH, ZB - OCH, XL - OCH / 2, ZB - OCH / 2); mapRects.push([XF, -63.5, XL, ZB, CRM]);
    // OCHAVA (la entrada): puerta de vidrio doble, vidrieras a los lados, banda verde y el cartel grande arriba
    { const ax = XL, az = ZB - OCH, bx2 = XL - OCH, bz = ZB, len = Math.hypot(bx2 - ax, bz - az);
      const g = group((ax + bx2) / 2, (az + bz) / 2, Math.PI / 4);   // +z del grupo mira hacia la esquina (+x, +z)
      bx(g, 0, 0, .03, len, .8, .06, PIE); for (let k = 0; k < 9; k++) bx(g, -len / 2 + .3 + k * .55, R(.1, .6), .07, .45, .12, .02, '#c4b89e');
      bx(g, 0, 2.75, .2, len + .1, .2, .45, VE);
      bx(g, 0, 0, .04, 1.7, 2.45, .06, '#f2f2ee'); for (const s of [-1, 1]) bx(g, s * .4, .05, .08, .7, 2.25, .02, '#3b4a55'); bx(g, 0, 0, .09, .05, 2.35, .02, '#f2f2ee');
      bx(g, 0, 0, .35, 2.0, .12, .6, '#c9c6bd');                                              // escalón de la entrada
      for (const s of [-1, 1]) { bx(g, s * 1.7, .8, .04, 1.2, 1.55, .06, '#f2f2ee'); bx(g, s * 1.7, .85, .08, 1.05, 1.45, .02, '#3b5a6a'); }
      { const c = document.createElement('canvas'); c.width = 512; c.height = 160; const x = c.getContext('2d'); x.fillStyle = CRM; x.fillRect(0, 0, 512, 160);
        x.textAlign = 'center'; x.fillStyle = '#c8261e'; x.font = 'bold 22px Arial'; x.fillText('Farmacia', 256, 32); x.fillStyle = '#1f8a3a'; x.font = 'bold 62px Arial'; x.fillText('Ferretti', 256, 92);
        x.fillStyle = '#c8261e'; x.font = 'bold 20px Arial'; x.fillText('Farmacia - Perfumería - Accesorios', 256, 124); x.strokeStyle = '#c8261e'; x.lineWidth = 3; x.beginPath(); x.moveTo(140, 140); x.bezierCurveTo(220, 128, 290, 152, 372, 138); x.stroke();
        const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; const m = new THREE.Mesh(new THREE.PlaneGeometry(len - .4, 1.45), lam({ map: t })); m.position.set(0, 3.75, .04); g.add(m); }
      bx(g, 1.9, 3.95, .1, .35, .3, .05, '#3a3d40');
    }
    // frente sobre la avenida (mira al +x): vidriera, pilastra verde, cruz verde y aire acondicionado — local +x = norte
    { const zs = ZB - OCH, zn = -63.5, g = group(XL, (zs + zn) / 2, Math.PI / 2), L = zs - zn;   // L = 4.4
      bx(g, 0, 0, .03, L, .8, .06, PIE); bx(g, 0, 2.75, .2, L + .1, .2, .45, VE); bx(g, L / 2 - .2, 0, .06, .4, 4.6, .14, VE);
      bx(g, -.3, .8, .04, 2.6, 1.6, .06, '#f2f2ee'); bx(g, -.3, .85, .08, 2.4, 1.5, .02, '#3b5a6a'); for (let k = 0; k < 5; k++) bx(g, -1.3 + k * .5, 1.0 + (k % 3) * .35, .1, .3, .25, .1, pick(['#e8f0f4', '#8ac9e8', '#f2c21b', '#e88aa8']));
      { const cg = group(0, 0); g.add(cg); cg.position.set(L / 2 - .8, 3.3, .5); bx(cg, 0, -.35, 0, .25, .7, .12, VE); bx(cg, 0, -.12, 0, .7, .25, .12, VE); poleIn(cg, [0, 0, -.1], [0, 0, -.5], .03, '#888'); }
      bx(g, 1.0, 3.9, .25, .8, .5, .3, '#efefec'); cylIn(g, 1.6, .25, .35, .22, .5, '#5a5a5a');
    }
    // frente sobre Dr. Brunet (mira al +z), según la foto: portón blanco doble con 3 ventanitas, persiana de ventana, persiana de puerta,
    // ventana-vidriera con marco, rejilla arriba y la banda verde fina corrida — local +x = este (hacia la ochava)
    { const xw = XF, xe = XL - OCH, g = group((xw + xe) / 2, ZB, 0), L = xe - xw;   // L = 8.9 · local -4.45..4.45
      bx(g, 0, 0, .03, L, .45, .06, PIE); for (let k = 0; k < 14; k++) bx(g, -4.2 + k * .62, .12, .07, .5, .1, .02, '#c4b89e');
      bx(g, 0, 2.7, .25, L + .1, .1, .5, VE);
      bx(g, -3.75, 0, .04, 1.3, 2.45, .06, '#f2f2ee'); bx(g, -3.75, 0, .08, .03, 2.4, .02, '#d9d6cf');      // portón blanco doble
      for (const x of [-4.15, -3.75, -3.35]) bx(g, x, 1.95, .08, .28, .22, .02, '#3b4a55');
      for (const x of [-3.9, -3.6]) bx(g, x, .2, .08, .2, 1.5, .02, '#e6e3dc');
      enrollar(g, -2.0, .8, 1.05, 1.6, '#e6e1d2', '#cfc8b4');                                               // persiana de ventana
      enrollar(g, 0, 0, .95, 2.35, '#e6e1d2', '#cfc8b4');                                                    // persiana de puerta
      bx(g, 1.8, .55, .04, 1.35, 1.85, .08, '#e9e4d6'); bx(g, 1.8, .65, .09, 1.15, 1.65, .02, '#3b5a6a');   // ventana-vidriera
      bx(g, 1.8, .65, .11, .04, 1.65, .02, '#e9e4d6'); bx(g, 2.15, .7, .12, .3, 1.0, .1, '#5fd06a'); bx(g, 1.45, .7, .12, .35, .5, .1, '#e8f0f4');
      bx(g, 1.8, .45, .12, 1.4, .08, .2, '#d6cdb8');                                                        // alféizar
      bx(g, 3.65, 3.85, .03, .3, .2, .03, '#2a2a2a'); bx(g, 1.2, .12, .05, .25, .18, .03, '#6a6a6a');
    }
    // vereda: pasto con cordón amarillo en la esquina, arbustos pelados y árbol
    flat.rect(-13.5, -63.5, -10.6, ZB, .206, '#c4bfb4'); pasto(-63.5, -55.5, '#6f8f45'); arbol(-62, 1.15);
    flat.rect(XF, ZB, XL - OCH, ZB + 1.9, .206, '#b8a99a'); flat.rect(XF, ZB + 1.9, -13.5, ZB + 3.5, .205, '#6f8f45');
    addTree(-24.3, -53.4, .75, false, ['#9c7a45', '#8a6a3a']); addTree(-22.5, -53.3, .5, false, ['#9c7a45', '#8a6a3a']); addTree(-16.5, -53.2, .45, false, ['#9c7a45', '#8a6a3a']);
    { const cg = group(-23.6, -54.2); bx(cg, 0, .1, 0, .65, .5, .35, '#3a3a3a'); bx(cg, 0, .15, 0, .55, .4, .28, '#9cb0c8'); for (const s of [-1, 1]) bx(cg, s * .28, 0, 0, .04, .6, .04, '#3a3a3a'); }   // canasto de basura
    mapLabels.push([-20, -59.5, 'Farm. Ferretti']);
  }
  plazaRects.push([-42, -120, -13.5, -55.5]);   // sin árboles ni casas al azar en estos lotes
}

// =========================================================================
// Esquina Av. Centenario y Dr. Brunet (lado sur de Brunet, enfrente de la Ferretti): vieja estación de servicio con el kiosco "Lo del Ariga".
// Playón de cemento sin cordón, casilla blanca con paneles rojos y alero redondo sobre una columna, letras "ESTACION DE SERVICIO",
// aleta con torrecita de hierro; atrás galpón blanco con dos portones (uno tapiado con ladrillo), tapial blanco manchado,
// casa con pilastras rosadas sobre Brunet; sobre la avenida edificio blanco con portón de franja roja y el cartel viejo vacío.
// =========================================================================
{
  const WH = '#f2f0ea', RJ = '#c8442a';
  const rejaV = (g, x, y0, z, w, h, col, step = .13) => { for (let k = 1; k < Math.round(w / step); k++) bx(g, x - w / 2 + k * step, y0, z, .03, h, .03, col); for (const y of [y0, y0 + h - .04]) bx(g, x, y, z, w + .04, .04, .04, col); };
  const textoPlano = (txt, w, h, col, font) => { const c = document.createElement('canvas'); c.width = 1024; c.height = 128; const x = c.getContext('2d');
    x.fillStyle = col; x.font = font; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(txt, 512, 66);
    const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; return new THREE.Mesh(new THREE.PlaneGeometry(w, h), new THREE.MeshLambertMaterial({ map: t, transparent: true, alphaTest: .3, side: THREE.DoubleSide })); };
  // playón de cemento (con vereda sin cordón sobre Brunet y la avenida) y manchas de tierra
  // forma (dibujo del usuario): playón en L abierto a las dos calles; atrás, el frente del galpón mira a la avenida (x = -31, de Brunet a z -26.6),
  // escalón hasta x -26.2 y la pared norte del edificio de la avenida (z = -24) hasta la esquina de la avenida
  flat.rect(-31, -39.5, -13.5, -24, .07, '#c9c5ba'); flat.rect(-31, -43, -13.5, -39.5, .2058, '#c9c5ba'); flat.rect(-13.5, -43, -9, -24, .2058, '#c9c5ba');
  for (const [x, z, w, d] of [[-27, -36, 2.4, 1.2], [-24, -38, 1.6, .9], [-19, -26.5, 2.0, 1.0], [-28.5, -30, 1.4, 1.6]]) flat.rect(x - w / 2, z - d / 2, x + w / 2, z + d / 2, .075, '#a89a7a');
  flat.rect(-54, -29, -44, -13, .06, '#a8a088'); mapRects.push([-31, -39.5, -13.5, -24, '#c9c5ba']);
  // KIOSCO "Lo del Ariga" (la casilla de la estación) suelto en el playón, en diagonal mirando derecho a la esquina; el alero sale hacia la esquina
  { const g = group(-19.2, -31.0, 2.5);   // local +z = hacia la esquina (+x, -z)
    // alero redondo sobre una columna, isla con barandas rojas y letras arriba del borde redondo
    bx(g, 0, 3.4, 2.5, 4.2, .3, 5.5, '#ece9e2'); cylIn(g, 0, 3.55, 5.25, 2.1, .3, '#ece9e2');
    for (const s of [-1, 1]) bx(g, s * 2.1, 3.3, 2.5, .08, .45, 5.5, '#d9d6cc');
    cylIn(g, 0, 1.7, 4.0, .22, 3.4, '#ece9e2'); bx(g, 0, 0, 4.0, 4.4, .15, 1.0, '#d9d6cc');
    for (const x of [-1.9, 1.9]) { for (const z of [3.7, 4.3]) poleIn(g, [x, .15, z], [x, .75, z], .04, RJ); bx(g, x, .72, 4.0, .08, .06, .64, RJ); }
    colLocal(g, -.3, 3.7, .3, 4.3, null);
    { const L = textoPlano('ESTACION DE SERVICIO', 4.4, .6, '#8a8a86', 'bold 92px Arial'); L.position.set(0, 3.95, 6.4); g.add(L); }
    bx(g, 0, 0, -1.75, 4, 3.2, 3.5, WH); colLocal(g, -2, -3.5, 2, 0, WH);
    bx(g, 0, 0, .03, 4.02, .25, .06, RJ); bx(g, 0, 2.9, .03, 4.05, .3, .08, '#e8e6e0');
    bx(g, -1.6, .25, .04, .55, 1.95, .06, RJ); bx(g, 1.62, .25, .04, .5, 1.95, .06, RJ);
    bx(g, -.5, .7, .04, 1.15, 1.45, .06, WH); bx(g, -.5, .78, .08, 1.0, 1.3, .02, '#d9824a');                                                     // ventana con cortina naranja
    for (let k = 1; k < 5; k++) { bx(g, -1.0 + k * .2, .78, .1, .025, 1.3, .02, '#f2f2ee'); } for (let k = 1; k < 6; k++) bx(g, -.5, .78 + k * .217, .1, 1.0, .025, .02, '#f2f2ee');
    bx(g, .75, 0, .04, .8, 2.3, .06, WH); bx(g, .75, .25, .08, .62, 1.95, .03, '#5a6670'); rejaV(g, .75, .9, .11, .55, 1.1, '#f2f2ee', .09);  // puerta con reja
    signIn(g, 'LO DEL ARIGA · KIOSCO', -.3, 2.4, .06, 2.4, .32, WH, RJ);
    // papel pegado con cinta en la puerta
    { const c = document.createElement('canvas'); c.width = 128; c.height = 160; const x = c.getContext('2d'); x.fillStyle = '#fbfbf6'; x.fillRect(0, 0, 128, 160);
      x.fillStyle = '#1f2a6a'; x.textAlign = 'center'; x.font = 'bold 26px Arial'; x.fillText('VUELVO', 64, 46); x.fillText('EN 15', 64, 80); x.font = 'italic 20px Arial'; x.fillText('-el ariga', 64, 122);
      const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; const p = new THREE.Mesh(new THREE.PlaneGeometry(.34, .42), lam({ map: t })); p.position.set(.75, 1.4, .125); p.rotation.z = .04; g.add(p);
      for (const s of [-1, 1]) { const tp = new THREE.Mesh(new THREE.PlaneGeometry(.14, .045), lam({ color: '#e6d9a8' })); tp.position.set(.75 + s * .15, 1.6, .13); tp.rotation.z = s * .6; g.add(tp); } }
    cylIn(g, -1.6, .4, .55, .3, .8, RJ); cylIn(g, 1.9, .35, .5, .25, .7, RJ);                                                                  // tachos rojos
    bx(g, -1.2, 3.2, -1.75, .35, 2.6, 1.2, '#ece9e2');                                                                                        // aleta
    for (const [px, pz] of [[-1.5, -2.05], [-.9, -2.05], [-1.5, -1.45], [-.9, -1.45]]) poleIn(g, [px, 5.8, pz], [px, 8.6, pz], .03, '#b8743a');    // torrecita de hierro
    for (let y = 6.0; y < 8.6; y += .35) for (const pz of [-2.05, -1.45]) bx(g, -1.2, y, pz, .6, .03, .03, '#b8743a'); bx(g, -1.2, 8.6, -1.75, .7, .06, .7, '#b8743a');
  }
  // galpón blanco: frente al playón mirando a la avenida (x = -31), llega hasta la línea de Brunet; su costado sobre Brunet es la pared larga
  // blanca con la parte de abajo gris manchada (local +x = norte, hacia Brunet; la parte sur del frente queda tapada por el cuerpo bajo)
  { const g = group(-31, -26.25, Math.PI / 2);
    bx(g, 0, 0, -6.5, 26.5, 4.4, 13, WH); colLocal(g, -13.25, -13, 13.25, 0, WH);
    bx(g, 6.8, 0, .03, 12.9, .6, .04, '#b8b6ae'); bx(g, 6.8, 4.3, .02, 13, .15, .15, '#e2dfd6');
    bx(g, 6.8, 0, .05, 12.9, 1.5, .04, '#a9a79f'); for (let k = 0; k < 5; k++) bx(g, R(1, 12.5), R(.6, 1.6), .08, R(.8, 2), R(.3, .8), .02, '#b9b7af');   // pared lisa (sin portones), abajo gris manchada
  }   // (este volumen es la casa rosada de Brunet: su frente se arma en el bloque "Dr. Brunet lado sur")
  // (sobre Brunet, la casa rosada que sigue al playón se arma en el bloque "Dr. Brunet lado sur")
  // sobre la avenida: edificio blanco con portón de franja roja (local +x = norte)
  { const g = group(-13.5, -19, Math.PI / 2);
    bx(g, 0, 0, -6.35, 10, 4.3, 12.7, WH); colLocal(g, -5, -12.7, 5, 0, WH); bx(g, 0, 0, .03, 10, .5, .04, '#b8b6ae');   // llega atrás hasta x -26.2
    bx(g, 5.02, 0, -6.35, .04, .5, 12.7, '#b8b6ae');
    // costado largo al playón (mira a Brunet): dos portones viejos tapiados con ladrillo y parches de revoque (world x -23..-20 y -17.9..-14.3)
    for (const [zc, w] of [[-8.0, 3.0], [-2.6, 3.6]]) { bx(g, 5.03, 0, zc, .06, 3.0, w + .2, '#e2dfd6'); bx(g, 5.07, .05, zc, .03, 2.85, w, '#b0705a');
      for (let y = .2; y < 2.9; y += .2) bx(g, 5.09, y, zc, .01, .015, w, '#9a5a48');
      for (let k = 0; k < 3; k++) bx(g, 5.1, R(.3, 2.2), zc + R(-w / 3, w / 3), .02, R(.4, .8), R(.5, 1.1), '#ece9e2'); }
    // frente sobre la avenida: portón de franja roja (hacia el lado del playón) y puerta chica
    bx(g, 1.6, 0, .04, 4.0, 3.1, .06, '#e2dfd6'); bx(g, 1.6, 1.2, .08, 3.8, 1.8, .03, '#f6f6f4'); bx(g, 1.6, .05, .08, 3.8, 1.1, .03, '#8f9296'); bx(g, 1.6, 1.12, .1, 3.8, .08, .02, RJ);
    for (let y = .2; y < 1.1; y += .12) bx(g, 1.6, y, .1, 3.8, .015, .01, '#7a7d82');
    bx(g, -3.0, 0, .04, .95, 2.25, .06, '#e2dfd6'); bx(g, -3.0, .02, .08, .8, 2.15, .03, '#f6f6f4'); bx(g, -1.4, 1.1, .05, .3, .4, .08, '#9a9a96');
  }
  // cuerpo blanco más bajo en el escalón (x -31..-26.2, desde z -26.6 hasta el fondo): une el galpón con el edificio de la avenida, sin callejón
  { const f = group(0, 0);
    bx(f, -28.6, 0, -19.8, 4.8, 3.8, 13.6, WH); addCol(-31, -26.6, -26.2, -13); mapRects.push([-31, -26.6, -26.2, -13, WH]);
    bx(f, -28.6, 0, -26.62, 4.8, .55, .04, '#b8b6ae'); bx(f, -28.6, 3.7, -26.65, 4.85, .12, .12, '#e2dfd6');
    bx(f, -28.75, 0, -26.64, 3.5, 3.1, .06, '#e2dfd6'); bx(f, -28.75, .05, -26.68, 3.3, 2.95, .03, '#f6f6f4');                   // portón blanco del escalón
    for (let y = .6; y < 3; y += .6) bx(f, -28.75, y, -26.71, 3.3, .03, .02, '#d9d6cf');
    bx(f, -26.18, 0, -25.3, .04, .55, 2.6, '#b8b6ae');
    cylIn(f, -26.4, 2.6, -26.4, .9, 5.2, WH);                                                                          // cilindro en la esquina del escalón
  }
  flat.rect(-13.5, -24, -9, -18.4, .2058, '#c9c5ba');   // entrada de autos frente al portón
  // cartel viejo vacío sobre la vereda de la avenida
  { const sp = group(-10.8, -12.6, .35); poleIn(sp, [0, 0, 0], [0, 7.2, 0], .14, '#c0603a');
    for (const y of [5.0, 7.6]) bx(sp, 0, y, 0, .12, .12, 2.4, '#d9d6cc'); for (const z of [-1.2, 1.2]) bx(sp, 0, 5.0, z, .12, 2.7, .12, '#d9d6cc');
    poleIn(sp, [0, 5.2, -1.1], [0, 7.4, 1.1], .03, '#b0aca0'); addCol(-11, -12.8, -10.6, -12.4); }
  mapLabels.push([-22, -31, 'Lo del Ariga']);
  plazaRects.push([-54, -39.5, -13.5, -13]);   // sin árboles ni casas al azar en estos lotes
}

// =========================================================================
// Dr. Brunet lado sur, del playón de "Lo del Ariga" (x -31) a la esquina de Córdoba (fotos de Street View del usuario, de este a oeste):
// S1 casa rosada (su costado liso es la pared del playón): ventanas con postigos abiertos, puerta de madera, ventana alta con reja y portón de madera ·
// S2 blanca vieja con galería metida (persiana blanca y puerta con vidrio de arco), chimenea, portón de chapa y puerta roja ·
// S3 blanca retirada con canteros (agave), reja verde, postigos de madera y un tramo sobre la línea con piedra abajo ·
// S4 galpón alto de ladrillo pintado de blanco con portón de chapa acanalada · S5 ladrillo con postigos verdes y puerta naranja ·
// S6 esquina con ochava: puerta de madera alta, cartelito azul, portón enrollable, y en la ochava el PUNTO DIGITAL (persiana levantada,
//    computadoras adentro y un hombre alto usándolas); sobre Córdoba el tramo violeta con la puerta y el aire.
// =========================================================================
{
  const ZS = -39.5;   // línea municipal sur de Brunet · grupos con ry = PI: local +z = hacia la calle (norte), local +x = oeste = la derecha en las fotos
  const body = (g, x0, x1, d0, d1, h, col) => { bx(g, (x0 + x1) / 2, 0, -(d0 + d1) / 2, x1 - x0, h, d1 - d0, col); colLocal(g, x0, -d1, x1, -d0, col); };
  const rejaV = (g, x, y0, z, w, h, col, step = .13) => { for (let k = 1; k < Math.round(w / step); k++) bx(g, x - w / 2 + k * step, y0, z, .03, h, .03, col); for (const y of [y0, y0 + h - .04]) bx(g, x, y, z, w + .04, .04, .04, col); };
  const enrollar = (g, x, y0, w, h, col, lin) => { bx(g, x, y0, .04, w, h, .05, col); for (let y = y0 + .1; y < y0 + h - .04; y += .1) bx(g, x, y, .07, w, .02, .01, lin); bx(g, x, y0 + h, .06, w + .1, .18, .1, lin); };
  const postigos = (g, x, y0, w, h, col, z = 0) => {   // ventana de madera con postigos abiertos a los lados
    bx(g, x, y0, z + .04, w + .14, h + .1, .05, '#f2f2ee'); bx(g, x, y0 + .05, z + .07, w, h, .02, '#3b4a55'); bx(g, x, y0 + .05, z + .09, .04, h, .02, '#6e4a2a');
    for (const s of [-1, 1]) { bx(g, x + s * (w / 2 + w / 4 + .08), y0, z + .1, w / 2, h, .04, col); for (let y = y0 + .12; y < y0 + h; y += .12) bx(g, x + s * (w / 2 + w / 4 + .08), y, z + .13, w / 2 - .06, .02, .01, '#b9b2a2'); } };
  const sub = (g, z) => { const f = group(0, 0); g.add(f); f.position.set(0, 0, z); return f; };   // subgrupo con el frente corrido hacia atrás
  const veredaS = (x0, x1, col = '#c4b6a6', gr = '#6f8f45') => { flat.rect(x1, ZS - 1.9, x0, ZS, .206, col); flat.rect(x1, ZS - 3.5, x0, ZS - 1.9, .205, gr); };   // x0 > x1 (este → oeste)
  const entrada = (x0, x1, col = '#c4b6a6') => flat.rect(x1, ZS - 3.5, x0, ZS - 1.9, .2058, col);   // frente a un portón: vereda en vez de pasto
  const PELADO = ['#9c7a45', '#8a6a3a'];

  // S1) casa rosada (x -31..-44) — el volumen ya está (es la pared lisa del playón); acá va su frente sobre Brunet
  { const g = group(-37.5, ZS, Math.PI);   // local -6.5..6.5
    bx(g, -2.75, 0, .02, 7.5, 4.4, .03, '#f0d3c9'); bx(g, 2.75, 0, .02, 5.5, 4.4, .03, '#f4f2ee'); bx(g, 0, 4.3, .03, 13.05, .12, .15, '#e6c8bc');
    bx(g, 1.0, 0, .04, .06, 4.4, .06, '#d9b8aa');
    postigos(g, -4.6, .9, 1.1, 1.3, '#f2f2ee'); for (let k = 1; k < 4; k++) bx(g, -4.6, .9 + k * .33, .1, 1.1, .03, .03, '#8a5a3a');
    bx(g, -3.5, 1.6, .04, .4, .3, .03, '#f2f2ee');
    bx(g, -2.3, 0, .04, 1.05, 2.4, .06, '#e6e3dc'); bx(g, -2.3, 0, .07, .9, 2.3, .04, '#8a4a2a'); bx(g, -2.3, 1.6, .1, .6, .45, .02, '#3b4a55'); rejaV(g, -2.3, 1.6, .12, .6, .45, '#2a2a2a', .12);   // puerta de madera
    postigos(g, -.45, .9, 1.0, 1.3, '#f2f2ee'); rejaV(g, -.45, .95, .12, 1.0, 1.2, '#4a3a30', .14);
    bx(g, 2.0, 2.2, .04, 2.0, 1.2, .05, '#7a7d82'); rejaV(g, 2.0, 2.2, .09, 2.0, 1.2, '#2f3a40', .16); bx(g, 2.0, 2.75, .1, .3, .3, .02, '#2f3a40');   // ventana alta con reja (corazón)
    bx(g, 4.7, 0, .04, 2.3, 2.45, .06, '#e6e3dc'); bx(g, 4.7, .03, .08, 2.15, 2.35, .04, '#c06a2a'); bx(g, 4.7, .03, .11, .04, 2.35, .02, '#8a4a1a');   // portón de madera
    for (const s of [-1, 1]) for (let k = 0; k < 3; k++) bx(g, 4.7 + s * .55 + (k - 1) * .28, 1.75, .11, .22, .22, .02, '#d9dde0');
    veredaS(-31, -44); entrada(-41, -43.5); addTree(-36.6, ZS - 2.7, 1.25, false, ['#4b7a30', '#5e8a3a', '#557f35']);
    { const t = group(-36.4, ZS - 2.4); cylIn(t, 0, 1.3, 0, .18, .45, '#2a2a2a'); poleIn(t, [0, 0, 0], [0, 1.1, 0], .03, '#2a2a2a'); }   // tacho colgado
  }
  // S2) blanca vieja con galería metida (x -44..-55.5): persiana blanca y puerta con vidrio de arco; chimenea; portón de chapa y puerta roja
  { const g = group(-49.75, ZS, Math.PI), W = '#f1efe8';   // local -5.75..5.75
    body(g, -5.75, -5.45, 0, 14, 3.8, W); body(g, -5.45, -1.0, 1.2, 14, 3.8, W); bx(g, -3.2, 2.6, -.6, 4.45, 1.2, 1.2, W); body(g, -1.0, 1.75, 0, 14, 3.8, W);
    body(g, 1.75, 5.75, 0, 14, 3.0, '#ecebe6');
    bx(g, -2.0, 3.55, .1, 7.6, .2, .3, '#e2dfd6'); bx(g, -2.0, 3.8, .05, 7.6, .12, .2, '#d9d6cf'); bx(g, -3.2, 2.55, .03, 4.45, .1, .12, '#e2dfd6');
    bx(g, -3.2, 0, -.6, 4.45, .12, 1.2, '#b8a99a');                                                                             // piso de la galería
    enrollar(sub(g, -1.2), -4.1, .55, 1.6, 1.55, '#f6f6f4', '#dcdad2');
    { const f = sub(g, -1.2); bx(f, -2.05, 0, .04, .9, 2.25, .06, '#e6e3dc'); bx(f, -2.05, 0, .07, .78, 2.2, .04, '#f6f6f4'); bx(f, -2.05, 1.3, .1, .5, .55, .02, '#3b4a55');
      bx(f, -1.4, .3, .05, .25, 1.9, .03, '#8a5a3a'); for (let y = .4; y < 2.1; y += .32) bx(f, -1.4, y, .08, .18, .25, .01, '#d9dde0'); bx(f, -2.9, 2.2, .1, .15, .2, .15, '#2a2a2a'); }
    enrollar(g, .5, .85, 1.5, 1.35, '#f6f6f4', '#dcdad2'); bx(g, .5, .8, .08, 1.65, .06, .15, '#e2dfd6');
    bx(g, -4.6, 3.8, -3, .6, 1.3, .6, '#a8563e');                                                                                  // chimenea de ladrillo
    bx(g, 2.95, 0, .04, 2.4, 2.55, .06, '#c9c9c3'); bx(g, 2.95, .03, .08, 2.25, 2.45, .03, '#e0e0da'); for (const x of [2.2, 2.95, 3.7]) bx(g, x, .05, .11, .03, 2.4, .02, '#a9a9a3');   // portón de chapa emparchado
    bx(g, 3.4, 1.1, .1, .9, .8, .02, '#d2d2cc'); bx(g, 5.0, 0, .04, .85, 2.15, .06, '#e6e3dc'); bx(g, 5.0, .02, .08, .72, 2.08, .04, '#b5503a');   // puerta roja
    for (let k = 0; k < 3; k++) bx(g, R(-5, 1), R(.3, 3), .03, R(.5, 1.2), R(.3, .7), .02, '#e2dfd6');
    veredaS(-44, -55.5); entrada(-51.4, -53.9);
    { const p = group(-55.6, ZS - 2.0); poleIn(p, [0, 0, 0], [0, 8, 0], .13, '#8a8a88'); }
    addTree(-47, ZS - 2.8, .5, false, PELADO); addTree(-56.6, ZS - 2.7, 1.2, false, PELADO);
    { const lg = group(-55.2, ZS - 2.9, .4); for (let k = 0; k < 9; k++) { const m = cylIn(lg, R(-.6, .6), .12 + (k % 3) * .2, R(-.3, .3), .08, R(.8, 1.4), '#8a6a4a'); m.rotation.set(R(-.3, .3), R(0, 3), Math.PI / 2 + R(-.4, .4)); } }   // pila de leña
  }
  // S3) blanca retirada con canteros (x -55.5..-65): reja verde, postigos de madera, agave; tramo sobre la línea con piedra abajo
  { const g = group(-60.25, ZS, Math.PI), W = '#f2f0ea';   // local -4.75..4.75
    body(g, -3.6, 1.5, 2.0, 14, 3.2, W); body(g, 1.5, 4.75, 0, 14, 3.4, W); bx(g, -4.2, 0, -.1, 1.2, 1.6, .2, W);
    rejaV(g, -4.2, .05, .02, 1.1, 1.5, '#3a6a4a', .12);                                                                         // portoncito de reja verde
    { const f = sub(g, -2.0);
      postigos(f, -2.7, .9, 1.1, 1.2, '#9a5a32'); bx(f, -1.3, 0, .04, .85, 2.25, .06, '#e6e3dc'); bx(f, -1.3, 0, .07, .72, 2.2, .04, '#8a4a2a'); bx(f, -1.3, 2.35, .1, .14, .22, .14, '#2a2a2a');
      bx(f, -1.3, 2.5, .3, 1.3, .1, .6, '#e2dfd6'); postigos(f, .3, .9, 1.1, 1.2, '#9a5a32'); bx(f, -1.0, 0, .03, 5.1, .4, .05, '#b9b2a0'); }
    for (const [x0, x1] of [[-3.5, -1.9], [-.8, 1.4]]) { bx(g, (x0 + x1) / 2, 0, -1.0, x1 - x0, .35, 1.4, '#cfc9b8'); flat.rect(-60.25 - x1, ZS + .4, -60.25 - x0, ZS + 1.6, .37, '#7a5a3a'); }   // canteros de piedra
    addBush(-60.25 + 2.7, ZS + 1.0, .7, .3); addBush(-60.25 - .2, ZS + .9, .6, .3); addBush(-60.25 - 1.0, ZS + 1.2, .5, .3);
    { const a = group(-60.25 - .6, ZS + .9); for (let k = 0; k < 9; k++) { const m = bx(a, 0, .3, 0, .1, 1.3, .05, '#6f9a6a'); m.rotation.set(R(-.5, .5), k * .7, R(-.5, .5)); } }   // agave
    bx(g, 3.1, 0, .03, 3.3, .55, .06, '#b9b2a0');
    bx(g, 2.4, 0, .04, .95, 2.3, .06, '#e6e3dc'); bx(g, 2.4, .02, .08, .8, 2.2, .04, '#9a5a32'); rejaV(g, 1.95, .05, .1, .1, 2.2, '#2a2a2a', .05);
    enrollar(g, 3.9, .8, 1.25, 1.35, '#8a8a7a', '#6f6f62');
    veredaS(-55.5, -65); flat.rect(-62.5, ZS - 1.9, -61.5, ZS, .207, '#c9c5ba');
    addTree(-63.6, ZS - 2.8, 1.15, false, PELADO);
    { const m = group(-59.6, ZS - 2.6); for (const [x, z] of [[-.35, -.2], [.35, -.2], [-.35, .2], [.35, .2]]) poleIn(m, [x, 0, z], [x, .75, z], .025, '#6a5a3a'); bx(m, 0, .75, 0, .85, .45, .5, '#8a7a5a'); }   // caja de metal vieja
  }
  // S4) galpón alto de ladrillo pintado de blanco (x -65..-73) con portón de chapa acanalada, puertita y ventana alta
  { const g = group(-69, ZS, Math.PI);   // local -4..4
    body(g, -4, 4, 0, 20, 6.6, '#ecebe6'); for (let y = .2; y < 6.6; y += .2) bx(g, 0, y, .03, 8, .015, .01, '#d9d7d0');
    bx(g, 0, 6.5, .02, 8.05, .12, .1, '#dcdad2');
    bx(g, -1.0, 0, .04, 3.9, 4.6, .06, '#d2d2cc'); bx(g, -1.0, .03, .08, 3.7, 4.5, .03, '#a9b0a8'); for (let x = -2.75; x < .8; x += .2) bx(g, x, .05, .11, .05, 4.45, .02, '#8f968e');   // portón de chapa
    bx(g, 2.5, 0, .04, .9, 2.1, .06, '#e6e3dc'); bx(g, 2.5, .02, .08, .78, 2.0, .04, '#f6f6f4'); bx(g, 2.5, 1.5, .1, .4, .3, .02, '#3b4a55');
    bx(g, 2.3, 4.0, .04, 1.1, .9, .06, '#8a7a6a'); rejaV(g, 2.3, 4.0, .09, 1.1, .9, '#3a3a3a', .14); bx(g, 2.6, 2.6, .05, .4, .5, .02, '#f2f2ee'); bx(g, 2.6, 2.75, .07, .3, .12, .01, '#c8261e');
    veredaS(-65, -73); entrada(-66.1, -69.9, '#c9c5ba'); flat.rect(-69.9, ZS - 1.9, -66.1, ZS, .2065, '#c9c5ba');
    addTree(-70.9, ZS - 2.6, .6, false, PELADO); poleIn(group(-70.6, ZS - .6), [0, 0, 0], [0, 7.5, 0], .12, '#8a8a88');
  }
  // S5) casa de ladrillo (x -73..-79.5): zócalo blanco, postigos verdes, puerta naranja, borde de tejas arriba
  { const g = group(-76.25, ZS, Math.PI);   // local -3.25..3.25
    body(g, -3.25, 3.25, 0, 14, 3.4, '#f2f0ea'); bx(g, 0, .5, .03, 6.5, 2.5, .05, '#b0705a'); for (let y = .6; y < 3.0; y += .15) bx(g, 0, y, .06, 6.5, .015, .01, '#c99a86');
    bx(g, 0, 3.3, .05, 6.6, .12, .3, '#a8563e');
    for (const x of [-1.95, 1.75]) { bx(g, x, .9, .07, 1.3, 1.35, .04, '#f2f0ea'); bx(g, x, 1.0, .1, .85, 1.15, .02, '#7a5a3a'); for (const s of [-1, 1]) bx(g, x + s * .6, 1.0, .13, .35, 1.15, .04, '#2f7a3a'); }
    bx(g, -.15, 0, .07, 1.0, 2.4, .04, '#f2f0ea'); bx(g, -.15, .02, .1, .82, 2.25, .04, '#d27a40'); for (let k = 0; k < 3; k++) bx(g, -.15 - .2 + k * .2, 1.85, .13, .15, .2, .01, '#d9dde0');
    veredaS(-73, -79.5); addTree(-77.2, ZS - 2.6, .6, false, PELADO);
  }
  // S6) ESQUINA Córdoba y Dr. Brunet (lado sur): blanca con ochava; en la ochava el PUNTO DIGITAL con la persiana levantada
  { const XC = -89.5, XE = -79.5, ZF = -32, OC = 3, WH = '#f2f0ea', VIO = '#8a5a8a';
    const P1 = [XC + OC, ZS], P2 = [XC, ZS + OC], IN = OC * .7071;   // la sala de computadoras se mete 3 m desde la ochava
    const FOOT = [[XE, ZS], P1, [P1[0] + IN, P1[1] + IN], [P2[0] + IN, P2[1] + IN], P2, [XC, ZF], [XE, ZF]];
    extrudePoly(FOOT, 0, 4.0, WH); extrudePoly(FOOT, 4.0, .15, '#e2dfd6');
    addCol(XC + OC, ZS, XE, ZF); addCol(XC, ZS + OC, XC + OC, ZF); mapRects.push([XC, ZS, XE, ZF, WH]);
    // frente sobre Brunet (local +x = oeste): puerta de madera alta, cartelito azul, ventana tapiada y portón enrollable blanco
    { const L = XE - (XC + OC), g = group((XE + XC + OC) / 2, ZS, Math.PI);   // L = 7 · local -3.5..3.5
      bx(g, 0, 0, .03, L, .3, .05, '#dcdad2');
      bx(g, -3.0, 0, .04, 1.1, 2.6, .06, '#e6e3dc'); bx(g, -3.0, .02, .08, .95, 2.5, .04, '#7a4a32'); bx(g, -3.0, .05, .11, .03, 2.4, .02, '#5a3420');
      bx(g, -2.0, 2.4, .05, 1.0, .3, .03, '#4a90d0'); bx(g, -1.0, .7, .04, 1.7, 1.5, .06, '#f6f6f4'); bx(g, .3, 0, .06, .25, 4.0, .1, '#e6e3dc');
      enrollar(g, 1.95, 0, 2.4, 2.6, '#f6f6f4', '#dcdad2');
    }
    // ochava: PUNTO DIGITAL — sala abierta con vidriera, persiana levantada, computadoras y un hombre alto usando una
    { const len = OC * Math.SQRT2, og = group((P1[0] + P2[0]) / 2, (P1[1] + P2[1]) / 2, -3 * Math.PI / 4);   // local +z = hacia la esquina (-x, -z)
      bx(og, 0, 0, -1.5, len, .08, 3, '#cfc8b8'); bx(og, 0, 2.95, -1.5, len, 1.05, 3, WH);                                   // piso y techo de la sala
      { const pl = new THREE.Mesh(new THREE.PlaneGeometry(1.6, .6), lam({ color: 0xffffff, emissive: 0xdedad0 })); pl.rotation.x = Math.PI / 2; pl.position.set(0, 2.93, -1.5); og.add(pl); }
      bx(og, 0, 0, -.05, len, .8, .12, VIO); for (const s of [-1, 1]) bx(og, s * (len / 2 - .1), 0, -.05, .2, 2.95, .12, VIO);   // antepecho y jambas violetas
      bx(og, 0, 2.6, .05, len, .35, .3, '#8a8a86'); for (let y = 2.65; y < 2.95; y += .08) bx(og, 0, y, .21, len, .02, .01, '#6f6f6a');   // persiana levantada (enrollada arriba)
      { const gl = new THREE.Mesh(new THREE.PlaneGeometry(len - .4, 1.8), new THREE.MeshLambertMaterial({ color: 0xbcd8e6, transparent: true, opacity: .18, side: THREE.DoubleSide })); gl.position.set(0, 1.7, -.04); og.add(gl); }
      bx(og, 0, 1.7, -.03, .05, 1.8, .04, VIO);
      signIn(og, 'PUNTO DIGITAL', 0, 3.4, .08, 3.4, .42, VIO, '#ffffff');
      colLocal(og, -len / 2, -.12, len / 2, .02, null);
      // escritorios con computadoras (contra el fondo y a un costado)
      const compu = (x, z, ry) => { const c = group(0, 0); og.add(c); c.position.set(x, 0, z); c.rotation.y = ry;
        bx(c, 0, .72, 0, 1.3, .05, .65, '#c9b18a'); for (const [lx, lz] of [[-.6, -.28], [.6, -.28], [-.6, .28], [.6, .28]]) bx(c, lx, 0, lz, .05, .72, .05, '#5a5a5a');
        bx(c, 0, .77, -.15, .1, .2, .1, '#2a2a2a'); bx(c, 0, .95, -.18, .62, .4, .05, '#1f1f1f');
        const s = new THREE.Mesh(new THREE.PlaneGeometry(.56, .34), lam({ color: 0x4a8ad0, emissive: 0x2a5a9a })); s.position.set(0, 1.15, -.15); c.add(s);
        bx(c, 0, .77, .08, .45, .02, .15, '#2a2a2a'); bx(c, .35, .77, .1, .08, .02, .1, '#2a2a2a');
        bx(c, 0, 0, .55, .45, .45, .45, '#3a3a3a'); bx(c, 0, .45, .76, .45, .5, .06, '#3a3a3a'); return c; };
      compu(-.9, -2.55, 0); compu(.95, -2.55, 0); compu(-1.65, -1.2, Math.PI / 2);
      // hombre alto (≈1,95 m) parado usando la computadora de la derecha
      { const m = group(0, 0); og.add(m); m.position.set(.95, 0, -1.5);
        for (const s of [-1, 1]) { bx(m, s * .11, 0, 0, .17, .95, .2, '#2b3445'); bx(m, s * .11, 0, .04, .18, .1, .3, '#1f1f1f'); }
        bx(m, 0, .95, 0, .5, .68, .26, '#c0392b'); bx(m, 0, 1.63, 0, .2, .08, .2, '#e0b08a'); bx(m, 0, 1.68, 0, .26, .27, .26, '#e0b08a'); bx(m, 0, 1.92, .01, .28, .08, .28, '#3a2616');
        for (const s of [-1, 1]) { bx(m, s * .3, 1.25, 0, .13, .38, .14, '#c0392b'); bx(m, s * .27, 1.1, -.22, .12, .12, .42, '#c0392b'); bx(m, s * .25, 1.05, -.45, .1, .1, .1, '#e0b08a'); }
        m.rotation.y = .15; }
    }
    // frente sobre Córdoba (mira al -x, local +x = sur): blanco con la persiana grande de enrollar
    { const L = ZF - (ZS + OC), g = group(XC, (ZS + OC + ZF) / 2, -Math.PI / 2);   // L = 4.5 · local -2.25..2.25
      bx(g, 0, 0, .03, L, .4, .05, '#dcdad2'); enrollar(g, .1, .7, 1.9, 1.6, '#e6e1d2', '#cfc8b4');
    }
    // S7) sobre Córdoba, a la derecha del Punto Digital: FERIA "La Turca" (violeta, x -89.5..-77, z -32..-24) y casa blanca con faja gris (z -24..-19.5)
    { const FT = '#c07aa0', XB = -79.5;   // fondo hasta la casa de ladrillo de Brunet
      extrudePoly([[XC, ZF], [XB, ZF], [XB, -24], [XC, -24]], 0, 4.2, FT); extrudePoly([[XC, ZF], [XB, ZF], [XB, -24], [XC, -24]], 4.2, .12, '#b06a90');
      addCol(XC, ZF, XB, -24); mapRects.push([XC, ZF, XB, -24, FT]);
      const g = group(XC, -28, -Math.PI / 2);   // local -4..4, +x = sur (la derecha en la foto)
      bx(g, 0, 0, .03, 8, .25, .05, '#a86888');
      bx(g, -1.1, 0, .04, 1.15, 2.5, .06, '#d9c9a8'); bx(g, -1.1, .03, .08, 1.0, 2.4, .04, '#a8884a');                                   // puerta de madera con vidrios
      for (let i = 0; i < 2; i++) for (let j = 0; j < 5; j++) bx(g, -1.33 + i * .46, 1.0 + j * .27, .11, .36, .21, .01, '#3b4a55');
      { const c = document.createElement('canvas'); c.width = 256; c.height = 96; const x = c.getContext('2d'); x.fillStyle = '#f6f2ea'; x.fillRect(0, 0, 256, 96);
        x.fillStyle = '#c8261e'; x.textAlign = 'center'; x.font = 'bold 30px Arial'; x.fillText('FERIA', 110, 36); x.font = 'italic bold 34px Georgia'; x.fillText('La Turca', 110, 78);
        x.fillStyle = '#4a7ac0'; x.fillRect(205, 15, 14, 60); x.fillStyle = '#e88aa8'; x.fillRect(225, 20, 14, 55);
        const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; const m = new THREE.Mesh(new THREE.PlaneGeometry(1.8, .65), lam({ map: t })); m.position.set(-1.3, 3.0, .05); g.add(m); }
      bx(g, -1.1, 2.55, .1, .12, .2, .14, '#2a2a2a'); bx(g, -.55, 2.25, .2, .8, .55, .3, '#efefec'); bx(g, -3.4, 1.2, .05, .2, .3, .05, '#f2f2ee');
      // maniquí con ropa en la vereda
      { const mq = group(0, 0); g.add(mq); mq.position.set(-1.85, 0, .45); poleIn(mq, [0, 0, 0], [0, .9, 0], .03, '#9a9a9a'); bx(mq, 0, 0, 0, .3, .03, .3, '#9a9a9a');
        for (const s of [-1, 1]) bx(mq, s * .08, .2, 0, .12, .75, .14, '#d8434a'); bx(mq, 0, .95, 0, .36, .55, .2, '#3a5ac0'); bx(mq, 0, 1.5, 0, .1, .1, .1, '#e8dccb'); bx(mq, 0, 1.55, 0, .2, .26, .2, '#e8dccb'); }
      poleIn(group(XC - 2.6, -31.9), [0, 0, 0], [0, 8, 0], .13, '#8a8a88');                                                        // poste
      poleIn(group(XC - 2.2, -27.3), [0, 0, 0], [0, .9, 0], .1, '#8a7a5a');                                                       // poste chico de madera
      addTree(XC - 2.4, -28.1, 1.1, false, PELADO);
      // casa blanca con faja gris arriba y puerta de madera
      extrudePoly([[XC, -24], [XB, -24], [XB, -19.5], [XC, -19.5]], 0, 4.2, '#f2f0ea'); addCol(XC, -24, XB, -19.5); mapRects.push([XC, -24, XB, -19.5, '#f2f0ea']);
      const h = group(XC, -21.75, -Math.PI / 2);   // local -2.25..2.25
      bx(h, 0, 2.9, .02, 4.5, 1.3, .03, '#a9a59a'); bx(h, 0, 2.85, .04, 4.5, .08, .06, '#8f8b80'); bx(h, 0, 0, .03, 4.5, .3, .05, '#c9c5ba');
      bx(h, .2, 0, .04, 1.1, 2.4, .06, '#c9c5ba'); bx(h, .2, .02, .08, .95, 2.3, .04, '#6e5a40'); for (let k = 0; k < 4; k++) bx(h, .2, .3 + k * .5, .11, .85, .03, .01, '#4a3a28');
      for (const [x, y, w, hh] of [[1.4, .4, .8, .3], [-1.5, .5, .6, .25]]) bx(h, x, y, .05, w, hh, .02, '#b0705a');   // revoque caído
      flat.rect(XC - 1.9, ZF, XC, -19.5, .206, '#c4b6a6'); flat.rect(-92.88, ZF, XC - 1.9, -19.5, .205, '#6f8f45');
      flat.rect(-92.88, -28.9, XC - 1.9, -27.1, .2058, '#c4b6a6');   // senderito de cemento hasta la puerta de la feria
      mapLabels.push([-84, -28, 'Feria La Turca']);
    }
    veredaS(XE, XC + OC); entrada(-83.7, -86.1);
    flat.rect(XC - 1.9, ZS, XC, ZF, .206, '#c4b6a6'); flat.rect(-92.88, ZS - 3.38, XC - 1.9, ZF, .205, '#6f8f45');
    flat.rect(XC - 1.9, ZS - 3.38, XC + OC, ZS + OC, .2065, '#c4b6a6');
    addTree(-92.4, -35.5, 1.0, false, PELADO); addTree(-81, ZS - 2.6, .9, false, PELADO);
    mapLabels.push([-86, -36, 'Punto Digital']);
  }
  plazaRects.push([-89.6, -39.5, -44, -18]);   // sin árboles ni casas al azar en estos lotes
}

// =========================================================================
// Córdoba lado este, de Dr. Brunet (casa de chapa verde de la esquina) al Banco Macro (fotos de Street View del usuario, de sur a norte):
// C1 ladrillo viejo con arcos, puerta roja y puerta oscura · C2 revoque verdecito con portón de chapa acanalada · C3 muro de ladrillo con
// puerta blanca y portón de chapa marrón (casita atrás con alero) · C4 casa gris con piedra abajo, galería, murito de piedra con reja y portón de reja ·
// C5 Mutual (blanca, ventanal con reja, torre con el logo, banderas) y local blanco con persiana · C6 casita de ladrillo · C7 muro de ladrillo hasta el Banco.
// =========================================================================

{
  // la cuadra se armó con medidas de -66 a -110 y se comprime (K) para que termine en -106, donde arranca el muro de ladrillo del Banco Macro
  const K = 40 / 44, MZ = z => -66 + (z + 66) * K;
  const group = (x, z, ry = 0) => GROUP_W(x, MZ(z), ry), addTree = (x, z, ...r) => TREE_W(x, MZ(z), ...r), addBush = (x, z, ...r) => BUSH_W(x, MZ(z), ...r);
  const flat = { rect: (x0, z0, x1, z1, ...r) => FLAT_W.rect(x0, MZ(z0), x1, MZ(z1), ...r) };
  const XL = -89.5;   // línea municipal este de Córdoba · grupos con ry = -PI/2: local +z = hacia la calle (oeste), local +x = sur = la derecha en las fotos
  const casa = (zN, zS) => { const zc = (zN + zS) / 2, g = group(XL, zc, -Math.PI / 2); g.scale.x = K; return { g, w: zS - zN, zc }; };
  const body = (g, x0, x1, d0, d1, h, col) => { bx(g, (x0 + x1) / 2, 0, -(d0 + d1) / 2, x1 - x0, h, d1 - d0, col); colLocal(g, x0, -d1, x1, -d0, col); };
  const rejaV = (g, x, y0, z, w, h, col, step = .13) => { for (let k = 1; k < Math.round(w / step); k++) bx(g, x - w / 2 + k * step, y0, z, .03, h, .03, col); for (const y of [y0, y0 + h - .04]) bx(g, x, y, z, w + .04, .04, .04, col); };
  const enrollar = (g, x, y0, w, h, col, lin) => { bx(g, x, y0, .04, w, h, .05, col); for (let y = y0 + .1; y < y0 + h - .04; y += .1) bx(g, x, y, .07, w, .02, .01, lin); bx(g, x, y0 + h, .06, w + .1, .18, .1, lin); };
  const arco = (g, x, y0, w, h, glass = '#3b4a55', marco = '#e6dcc8', z = 0) => {   // ventana / puerta / nicho con medio punto
    bx(g, x, y0, z + .05, w, h - w / 2, .05, glass); const a = new THREE.Mesh(new THREE.CircleGeometry(w / 2, 16, 0, Math.PI), lam({ color: glass })); a.position.set(x, y0 + h - w / 2, z + .08); g.add(a);
    for (const s of [-1, 1]) bx(g, x + s * (w / 2 + .05), y0, z + .07, .1, h - w / 2, .08, marco); const r = new THREE.Mesh(new THREE.TorusGeometry(w / 2 + .05, .05, 6, 16, Math.PI), lam({ color: marco })); r.position.set(x, y0 + h - w / 2, z + .08); g.add(r); };
  const veredaC = (z0, z1, col = '#c4b6a6', gr = '#6f8f45') => { flat.rect(XL - 1.9, z0, XL, z1, .206, col); flat.rect(-92.88, z0, XL - 1.9, z1, .205, gr); };
  const entradaC = (z0, z1, col = '#c4b6a6') => flat.rect(-92.88, z0, XL - 1.9, z1, .2058, col);
  const PELADO = ['#9c7a45', '#8a6a3a'], VERDE = ['#4b7a30', '#5e8a3a', '#557f35'];

  // C1) ladrillo viejo con arcos (z -77..-66): ventana con persiana, puerta blanca, ventana de arco con reja, puerta oscura, puerta roja con nicho de arco
  { const { g, w, zc } = casa(-77, -66), LAD = '#a8604a';   // local -5.5..5.5
    body(g, -5.5, 2.6, 0, 8.5, 4.6, LAD); body(g, 2.6, 5.5, 0, 8.5, 5.2, '#a05a44');
    bx(g, 0, 0, .03, w, .6, .06, '#8a4a3a'); for (let y = .7; y < 4.6; y += .15) bx(g, -1.45, y, .04, 8.1, .015, .01, '#c48a72');
    bx(g, -1.45, 3.75, .08, 8.1, .15, .2, '#9a5440'); bx(g, -1.45, 4.5, .06, 8.2, .12, .15, '#9a5440'); bx(g, 4.05, 5.1, .06, 3.0, .12, .15, '#9a5440');
    for (const x of [-5.4, 2.6, 5.4]) bx(g, x, 0, .08, .35, x === 2.6 ? 5.2 : 4.6, .18, '#9a5440');                                            // pilastras
    bx(g, -4.4, 1.0, .04, 1.1, 1.1, .05, '#e6dcc8'); enrollar(g, -4.4, 1.05, .95, 1.0, '#f2f2ee', '#d9d6cf');
    bx(g, -3.0, 0, .04, .95, 2.3, .06, '#e6dcc8'); bx(g, -3.0, 0, .08, .8, 2.2, .04, '#f2f2ee'); bx(g, -3.0, 1.5, .11, .2, .2, .01, '#3b4a55');
    arco(g, -1.4, .55, 1.0, 2.2); rejaV(g, -1.4, .6, .12, .95, 1.7, '#2a2a2a', .12);
    arco(g, .9, 0, .95, 2.6, '#4a3a30', '#e6dcc8');                                                                            // puerta oscura con arco
    bx(g, 4.1, 0, .04, 1.0, 2.35, .06, '#c9b8a0'); bx(g, 4.1, 0, .08, .85, 2.25, .04, '#7a2a2a'); arco(g, 4.1, 2.9, 1.3, 1.8, '#b0705a', '#c48a72');   // puerta roja y nicho de arco
    for (let y = .6; y < 2.4; y += .15) bx(g, 4.1, y, .02, 1.6, .02, .03, '#7a3a2a');                                         // ladrillo más oscuro abajo
    for (let y = 0; y < 4.2; y += .35) bx(g, .1 + R(-.1, .1), y, .14, .35, .4, .15, '#3f6a2a');   // enredadera
    veredaC(-77, -66); addTree(XL - 2.9, -74.2, 1.15, false, PELADO); poleIn(group(XL - 2.7, -70.3), [0, 0, 0], [0, 8, 0], .12, '#c0703a');
    addBush(XL - 1.2, -76.2, .6, 0); addBush(XL - 2.6, -72.5, .45, 0);
  }
  // C2) revoque verdecito (z -82..-77) con portón de chapa acanalada de dos hojas
  { const { g, w } = casa(-82, -77), VC = '#c9cfa8';   // local -2.5..2.5
    body(g, -2.5, 2.5, 0, 14, 3.6, VC); bx(g, 0, 3.45, .1, w + .1, .2, .3, '#b8bcc0');
    bx(g, .2, 0, .04, 4.1, 2.95, .06, '#d2d2cc'); bx(g, .2, .03, .08, 3.95, 2.85, .03, '#d8dcde'); for (let x = -1.7; x < 2.15; x += .2) bx(g, x, .05, .11, .05, 2.8, .02, '#b4b9bc');
    bx(g, .2, .03, .12, .04, 2.85, .02, '#9a9fa2'); bx(g, -.9, .1, .13, .8, 1.9, .01, '#c4c8ca'); bx(g, .2, 3.1, .15, .2, .12, .15, '#2a2a2a');
    for (const [x, y] of [[-2.3, 1.3], [-2.3, .8]]) bx(g, x, y, .05, .22, .3, .08, '#7a7d82');
    veredaC(-82, -77); entradaC(-81.5, -77.5);
    addBush(XL - 2.6, -76.6, .5, 0); for (let k = 0; k < 4; k++) addBush(XL - R(1.6, 3.2), R(-76.8, -74.6), R(.3, .5), 0);
  }
  // C3) muro de ladrillo con puerta blanca y portón de chapa marrón (z -87.5..-82); atrás casita blanca con alero de chapa
  { const { g, w, zc } = casa(-87.5, -82);   // local -2.75..2.75
    body(g, -2.75, -.75, 0, .3, 2.3, '#b0684a'); for (let y = .15; y < 2.3; y += .15) bx(g, -1.75, y, .02, 2.0, .015, .01, '#c99a86');
    bx(g, -1.85, 0, .03, .85, 2.1, .05, '#f2f2ee'); for (let y = .3; y < 2; y += .3) bx(g, -1.85, y, .06, .7, .02, .01, '#d9d6cf');
    bx(g, .85, 0, -.05, 3.1, 2.1, .08, '#8a5a3a'); for (let x = -.55; x < 2.4; x += .5) bx(g, x, .1, .0, .06, 1.9, .03, '#6e4428');   // portón de chapa marrón
    for (let k = 0; k < 6; k++) bx(g, -.45 + k * .52, 1.75, .02, .3, .3, .02, '#7a4a2e'); rejaV(g, .85, 2.1, -.05, 3.1, .6, '#3a3a3a', .15);
    bx(g, 2.55, 0, -.1, .4, 2.9, .4, '#c9cfa8'); bx(g, -.6, 0, -.1, .3, 2.5, .3, '#f2f2ee');
    colLocal(g, -.75, -.15, 2.75, 0, null);
    body(g, -2.75, 2.2, 4.5, 12, 2.9, '#f2f0ea'); bx(g, 0, 2.6, -2.6, 4.9, .08, 3.8, '#a9b0b4');                                      // casita del fondo y alero de chapa
    bx(g, .6, .9, -4.45, 1.0, .9, .05, '#3b4a55'); rejaV(g, .6, .9, -4.4, 1.0, .9, '#2a2a2a', .12);
    flat.rect(XL, -87.5, XL + 4.5, -82, .065, '#b9b4aa');
    veredaC(-87.5, -82); entradaC(-85.4, -82.3); addTree(XL - 2.9, -81.95, .75, false, PELADO); addTree(XL - 2.9, -87.3, 1.0, false, PELADO);
  }
  // C4) casa gris con piedra abajo (galería con puerta y ventana de vidrio en bloques), murito de piedra con reja y portoncito, portón de reja
  { const { g, w, zc } = casa(-97, -87.5), GR = '#a9b0b8', PIE = '#c9b89a';   // local -4.75..4.75
    body(g, -4.75, -2.3, 0, 12, 3.3, GR); body(g, -2.3, -.1, 1.6, 12, 3.3, GR); bx(g, -1.2, 2.6, -.8, 2.2, .7, 1.6, GR); body(g, -4.75, -.1, 2.5, 12, 4.2, '#b4bac2');
    bx(g, -2.35, 0, -.1, .35, 3.4, .35, '#7a8088');                                                                        // pilar oscuro de la galería
    bx(g, -3.5, 0, .03, 2.5, .9, .06, PIE); bx(g, -1.2, 0, -1.57, 2.2, .9, .06, PIE);
    bx(g, -3.5, 1.1, .04, 1.4, 1.1, .05, '#e6eaee'); for (let i = 0; i < 4; i++) for (let j = 0; j < 3; j++) bx(g, -4.0 + i * .33, 1.17 + j * .33, .08, .28, .28, .01, '#cfe0ea');   // ventana de vidrio en bloques
    bx(g, -3.5, 1.0, .08, 1.5, .08, .15, '#d9dde0');
    bx(g, -1.0, 0, -1.57, .95, 2.3, .06, '#e6e3dc'); bx(g, -1.0, 0, -1.53, .8, 2.2, .04, '#c9c2b0'); bx(g, -1.0, 1.2, -1.5, .5, .5, .02, '#3b4a55'); bx(g, -1.7, 0, -1.56, .35, 2.2, .04, '#3b4a55');
    bx(g, -1.2, 0, -.8, 2.2, .08, 1.6, '#b9a58a');
    bx(g, 1.75, 0, -.1, 2.0, .85, .3, PIE); for (const x of [-.05, .75, 2.75]) bx(g, x, 0, -.1, .3, 1.3, .35, '#e2dfd6'); rejaV(g, 1.75, .85, -.1, 1.9, .45, '#b9bdc0', .15);
    rejaV(g, .35, .05, -.05, .5, 1.25, '#9aa0a4', .1);                                                                      // portoncito
    rejaV(g, 3.8, .05, -.05, 1.9, 1.4, '#b9bdc0', .12); bx(g, 4.7, 0, -.1, .15, 1.6, .15, '#e2dfd6');                           // portón de reja del pasillo
    colLocal(g, -.1, -.2, 4.75, 0, null);
    bx(g, 4.62, 0, -6, .25, 2.8, 12, '#f2f0ea'); bx(g, 4.62, 2.8, -6, .32, .08, 12, '#dcdad2'); colLocal(g, 4.5, -12, 4.75, 0, null);   // tapial blanco que la separa de la casa de la derecha
    bx(g, 3.75, 0, -2.6, 1.8, 2.8, .25, '#f2f0ea'); colLocal(g, 2.85, -2.75, 4.75, -2.45, null);                                       // paredón blanco detrás del portón
    body(g, .3, 4.5, 5.5, 12, 3.0, '#f2f0ea'); bx(g, 2.6, 1.0, -5.45, 1.2, 1.0, .05, '#3b4a55'); for (let i = 0; i < 4; i++) bx(g, 2.15 + i * .3, 1.0, -5.42, .03, 1.0, .02, '#f2f0ea');
    flat.rect(XL, -91.5, XL + 5.5, -87.5, .065, '#6f8f45'); flat.rect(XL, -89.4, XL + 5.5, -87.6, .07, '#b9b4aa');
    veredaC(-97, -87.5, '#b8aca0'); entradaC(-89.5, -87.5, '#b8aca0'); flat.rect(-92.88, -96.5, XL - 1.9, -95.6, .2058, '#c9c5ba');
    addTree(XL - 2.8, -90.6, .7, false, PELADO); poleIn(group(XL - 2.9, -95.1), [0, 0, 0], [0, 7.5, 0], .1, '#8a8a88'); addTree(XL - 2.8, -96.6, 1.1, false, VERDE);
  }
  // C5) MUTUAL (blanca: ventanal con reja, torre con el logo, puerta con reja, banderas) y local blanco con persiana gris al lado (z -105.5..-97)
  { const { g, w, zc } = casa(-105.5, -97), WH = '#f2f0ea';   // local -4.25..4.25 (norte → sur)
    body(g, -4.25, -1.6, 0, 12, 3.6, '#ecebe6'); body(g, -1.6, 4.25, 0, 12, 3.8, WH); bx(g, 1.75, 0, .2, .9, 4.7, .4, WH); bx(g, 4.05, 0, .1, .35, 4.0, .25, WH);
    bx(g, -2.9, 3.2, .05, 2.7, .15, .15, '#dcdad2'); bx(g, -3.3, .6, .04, 1.3, 1.7, .05, '#8a8f94'); for (let y = .7; y < 2.3; y += .1) bx(g, -3.3, y, .07, 1.3, .02, .01, '#6f7478');
    bx(g, -2.2, 0, .04, .85, 2.2, .06, '#e6e3dc'); bx(g, -2.2, 0, .08, .72, 2.15, .04, '#f6f6f4');
    bx(g, .05, .35, .04, 2.4, 2.1, .06, '#e6e3dc'); bx(g, .05, .4, .08, 2.25, 2.0, .02, '#3b4a55'); rejaV(g, .05, .4, .11, 2.25, 2.0, '#f2f2ee', .12);   // ventanal con reja
    bx(g, 2.95, 0, .04, 1.2, 2.4, .06, '#e6e3dc'); bx(g, 2.95, .02, .08, 1.05, 2.3, .03, '#3b4a55'); rejaV(g, 2.75, .05, .11, .5, 2.2, '#f2f2ee', .08); bx(g, 3.25, 1.2, .1, .35, .45, .01, '#f6f6f4');
    { const c = document.createElement('canvas'); c.width = 128; c.height = 160; const x = c.getContext('2d'); x.fillStyle = '#e8e6e0'; x.fillRect(0, 0, 128, 160);
      x.strokeStyle = '#8a8a86'; x.lineWidth = 6; x.beginPath(); x.moveTo(40, 20); x.lineTo(64, 50); x.lineTo(88, 20); x.moveTo(64, 50); x.lineTo(64, 80); x.moveTo(36, 46); x.lineTo(92, 46); x.stroke();
      x.fillStyle = '#6a6a66'; x.textAlign = 'center'; x.font = 'bold 22px Arial'; x.fillText('Mutual', 64, 118); x.font = '16px Arial'; x.fillText('N.E.K.C.', 64, 142);
      const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; const m = new THREE.Mesh(new THREE.PlaneGeometry(.8, 1.0), lam({ map: t })); m.position.set(1.75, 3.35, .41); g.add(m); }
    for (const [x, c1, c2] of [[1.1, '#3a9a4a', '#f2c21b'], [2.4, '#74acdf', '#ffffff']]) { poleIn(g, [x, 3.2, .2], [x, 4.6, 1.2], .025, '#cfcfcf');
      const f = new THREE.Mesh(new THREE.PlaneGeometry(.55, .38), lam({ color: c1, side: THREE.DoubleSide })); f.position.set(x + .28, 4.3, 1.0); f.rotation.x = -.6; g.add(f);
      const f2 = new THREE.Mesh(new THREE.PlaneGeometry(.55, .13), lam({ color: c2, side: THREE.DoubleSide })); f2.position.set(x + .28, 4.3, 1.02); f2.rotation.x = -.6; g.add(f2); }
    for (const x of [1.15, 2.35]) { cylIn(g, x, 2.6, .12, .17, .04, '#d84a3a', 0).rotation.set(Math.PI / 2, 0, 0); }
    flat.rect(-92.88, -105.5, XL, -97.4, .2062, '#9a9690');                                                                 // vereda de baldosas grises hasta el cordón
    { const bk = group(XL - 2.4, -99.8); for (let k = 0; k < 4; k++) poleIn(bk, [0, .05, -.6 + k * .4], [0, .55, -.6 + k * .4], .025, '#c9c9c9'); poleIn(bk, [0, .55, -.65], [0, .55, .65], .02, '#c9c9c9'); }   // bicicletero
    addTree(XL - 2.6, -97.0, 1.15, false, VERDE);
    mapLabels.push([XL + 4, MZ(-101), 'Mutual']);
  }
  // C6) casita de ladrillo con borde blanco (z -110..-105.5): ventana con reja blanca y puerta blanca con macetero
  { const { g } = casa(-110, -105.5);   // local -2.25..2.25
    body(g, -2.25, 2.25, 0, 12, 3.1, '#f2f0ea'); bx(g, 0, .3, .03, 4.5, 2.45, .05, '#b5603f'); for (let y = .4; y < 2.75; y += .15) bx(g, 0, y, .06, 4.5, .015, .01, '#c99a86');
    bx(g, -1.1, .9, .07, 1.45, 1.2, .04, '#f2f0ea'); enrollar(g, -1.1, .95, 1.3, 1.1, '#f6f6f4', '#dcdad2');
    bx(g, 1.35, 0, .07, 1.0, 2.35, .04, '#f2f0ea'); bx(g, 1.35, .02, .1, .82, 2.2, .04, '#f6f6f4'); bx(g, .95, 0, .3, .3, .5, .3, '#e8e6e0'); bx(g, .95, .5, .3, .35, .3, .35, '#5f8a3a');
    veredaC(-110, -105.5);
    { const m = group(XL - 3.0, -109.2); poleIn(m, [0, 0, 0], [0, .9, 0], .03, '#5a5a5a'); bx(m, 0, .9, 0, .5, .3, .4, '#6a8a6a'); }
  }
  // (el muro de ladrillo con la puerta blanca que sigue hasta el portón del Banco Macro es parte del bloque del banco)
  FLAT_W.rect(XL, -110.2, XL + 12, -106, .065, '#6f8f45'); TREE_W(XL + 6, -108.5, 1.2, false, VERDE);   // patio detrás del muro
  FLAT_W.rect(XL - 1.9, -110.2, XL, -106, .206, '#c4b6a6'); FLAT_W.rect(-92.88, -110.2, XL - 1.9, -106, .205, '#6f8f45');
  TREE_W(XL - 2.8, -108.3, .9, false, PELADO); poleIn(GROUP_W(XL - 2.9, -107.6), [0, 0, 0], [0, 7.5, 0], .1, '#8a8a88');
  { const m = GROUP_W(XL - 3.1, -109.7); for (const [x, z] of [[-.3, -.3], [.3, -.3], [-.3, .3], [.3, .3]]) poleIn(m, [x, 0, z], [x, .5, z], .02, '#5a5a5a'); bx(m, 0, .5, 0, .7, .4, .7, '#8a9a8a'); }   // canasto de basura
  plazaRects.push([-89.6, -110.2, -70, -66]);   // sin árboles ni casas al azar en estos lotes
}

// =========================================================================
// Callecita en L que rodea la plaza del escenario (fotos del usuario tomadas de espaldas a la plaza):
// lado norte (z = -400.5): a la derecha de la Comuna (su costado blanco da al baldío) el baldío con el techito a dos aguas en el piso,
// y la casa con galería, reja negra y garaje de madera justo antes de doblar ·
// lado este (x = 63.5, hasta Bv. Lavalle): muro de ladrillo con portón de chapa · muro de revoque rústico con puertita negra ·
// galpón de ladrillo con portón rojo y el tractor McCormick Farmall · reja con casa de tejas atrás y portón de madera ·
// galpón de chapa con techo curvo · muro de ladrillo · esquina alta de Lavalle.
}
