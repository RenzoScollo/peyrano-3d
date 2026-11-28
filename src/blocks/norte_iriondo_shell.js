// Zona Norte: Av. Centenario e Iriondo, Shell, Av. Centenario oeste/este hasta Bolívar
export function buildNorteIriondoShell(ctx) {
  const {
    OSM, PUMPS, R, S, THREE, W, addCol, anims, bx, canvas, crowns, cylIn, flat, group, lam, mapLabels, mapRects, palmTrunks, pick, plazaRects, poleIn, poles, scene, signIn, trunks
  } = ctx;

//    puertita en el muro de ladrillo con alerito y escalera, y el muro de ladrillo con pilastras y portón de madera
//  · jardín al frente con palmera, arbusto redondo y cantero de ladrillo; caminos de adoquines al garaje
{
  const g = group(0, 0), XF = -13.5, ZI = -624.5;   // líneas municipales de Av. Centenario (lado oeste) y de Iriondo (lado sur)
  const LAD = '#b98a70', LADO = '#a9785f', MAD = '#a8643a', BLANCO = '#efeee9', TEJA = '#b5462e';
  const rayas = (x0, x1, y0, y1, fixed, alongZ) => {   // juntas horizontales de ladrillo sobre una cara
    for (let y = y0 + .2; y < y1; y += .24) alongZ ? bx(g, fixed, y, (x0 + x1) / 2, .02, .02, x1 - x0, LADO) : bx(g, (x0 + x1) / 2, y, fixed, x1 - x0, .02, .02, LADO);
  };
  // persiana de madera (abertura) sobre la cara +x (frente a la avenida) o -z (Iriondo)
  const persX = (x, z, y, w, h) => { bx(g, x + .03, y, z, .06, h, w + .2, '#8a5232'); bx(g, x + .07, y + .05, z, .03, h - .1, w, MAD); for (let yy = y + .15; yy < y + h - .1; yy += .14) bx(g, x + .09, yy, z, .02, .02, w, '#8a5232'); };
  const persZ = (x, z, y, w, h) => { bx(g, x, y, z - .03, w + .2, h, .06, '#8a5232'); bx(g, x, y + .05, z - .07, w, h - .1, .03, MAD); for (let yy = y + .15; yy < y + h - .1; yy += .14) bx(g, x, yy, z - .09, w, .02, .02, '#8a5232'); };
  const tejas = (cx, cz, w, d, y, rise, alongX) => {   // techo de tejas a dos aguas; alongX = cumbrera a lo largo de x
    const span = alongX ? d : w, ang = Math.atan2(rise, span / 2), L = Math.hypot(rise, span / 2);
    for (const s of [-1, 1]){
      if (alongX) bx(g, cx, y + rise / 2 - .07, cz + s * d / 4, w + .6, .14, L + .6, TEJA, s * ang, 0);
      else bx(g, cx + s * w / 4, y + rise / 2 - .07, cz, L + .6, .14, d + .6, TEJA, 0, -s * ang);
    }
    for (let k = 0; k < 6; k++){ const ww = span * (1 - (k + .5) / 6);   // hastiales de ladrillo
      if (alongX) for (const x of [cx - w / 2, cx + w / 2]) bx(g, x, y + k * rise / 6, cz, .1, rise / 6, ww, LAD);
      else for (const z of [cz - d / 2, cz + d / 2]) bx(g, cx, y + k * rise / 6, z, ww, rise / 6, .1, LAD); }
  };

  // ---- jardín al frente, caminos y vereda ----
  flat.rect(XF - 4.2, ZI, XF, -595, .075, '#6fa046');
  flat.rect(-16, -604.4, XF, -600.4, .078, '#8d8f93'); flat.rect(XF, -604.4, -9.2, -600.4, .2072, '#8d8f93');   // adoquines al garaje de dos hojas
  flat.rect(-17.5, -614.8, XF, -612.4, .078, '#b9b4a8'); flat.rect(XF, -614.8, -9.2, -612.4, .2072, '#b9b4a8');  // al garaje del semisótano
  flat.rect(XF, -617.3, -9.2, -615.9, .2072, '#c9c4b8');                                                         // caminito a la escalera
  flat.rect(-52, ZI - 3.5, XF, ZI, .2062, '#7a9a4a');                                                             // vereda de pasto sobre Iriondo
  bx(g, -15.6, 0, -622, 2.4, .45, 4.2, LAD); bx(g, -15.6, .45, -622, 2.5, .06, 4.3, BLANCO);                    // cantero de ladrillo con pasto
  crowns.add(-15.6, .55, -622, 1.1, .25, 1.9, 0, '#6fa046');
  addCol(-16.8, -624.1, -14.4, -619.9);
  palmTrunks.add(-15.2, 0, -618.3, .38, 6.2, .38, 0, '#7a6a4a'); addCol(-15.4, -618.5, -15, -618.1);
  for (let k = 0; k < 8; k++){ const a = k / 8 * Math.PI * 2; crowns.add(-15.2 + Math.cos(a) * 1.3, 6.4 - (k % 2) * .25, -618.3 + Math.sin(a) * 1.3, 1.7, .2, .4, -a, '#5f8a3c'); }
  crowns.add(-14.8, 1.0, -597.4, 1.35, 1.05, 1.35, 0, '#4f7f35'); addCol(-15.8, -598.4, -13.8, -596.4);   // arbusto redondo
  crowns.add(-16.6, .6, -606.4, .9, .6, .8, 0, '#3e6a2e'); crowns.add(-16.4, .6, -598.8, .7, .5, .7, 1, '#3e6a2e');
  { const p = group(-15.3, -605.8); bx(p, 0, 0, 0, .18, 1.5, .18, '#9a7a56'); bx(p, 0, 1.5, 0, .6, .12, .12, '#9a7a56'); bx(p, 0, 1.62, 0, .14, .3, .14, '#9a7a56'); addCol(-15.4, -605.9, -15.2, -605.7); }   // poste tallado

  // ---- A) cuerpo principal en la esquina: dos plantas con planta baja elevada ----
  { const a = -29.2, b = -17.5, z0 = -624, z1 = -612.3, P = 1.3, H1 = 4.2, cx = (a + b) / 2, cz = (z0 + z1) / 2;
    bx(g, cx, 0, cz, b - a, H1, z1 - z0, LAD); rayas(z0, z1, 0, H1, b + .01, true); rayas(a, b, 0, H1, z0 - .01, false);
    bx(g, cx, P - .08, cz, b - a + .3, .16, z1 - z0 + .3, BLANCO);                       // borde blanco a la altura de la planta baja
    // losa del balcón, volada 1,2 m al frente y sobre Iriondo, con parapeto de ladrillo y baranda de caño
    const sx0 = a, sx1 = b + 1.2, sz0 = z0 - 1.2, sz1 = z1, scx = (sx0 + sx1) / 2, scz = (sz0 + sz1) / 2;
    bx(g, scx, H1, scz, sx1 - sx0, .22, sz1 - sz0, BLANCO);
    bx(g, sx1 - .12, H1 + .22, scz, .25, .45, sz1 - sz0, LAD); bx(g, scx, H1 + .22, sz0 + .12, sx1 - sx0, .45, .25, LAD);
    bx(g, sx1 - .12, H1 + .95, scz, .05, .05, sz1 - sz0, '#3a3a36'); bx(g, scx, H1 + .95, sz0 + .12, sx1 - sx0, .05, .05, '#3a3a36');
    for (let z = sz0 + .2; z < sz1; z += 1.6) bx(g, sx1 - .12, H1 + .6, z, .04, .4, .04, '#3a3a36');
    for (let x = sx0 + .2; x < sx1; x += 1.6) bx(g, x, H1 + .6, sz0 + .12, .04, .4, .04, '#3a3a36');
    // planta alta retirada, con borde verde
    const ua = a + .3, ub = b - 1.4, uz0 = z0 + 1.1, uz1 = z1;
    bx(g, (ua + ub) / 2, H1 + .22, (uz0 + uz1) / 2, ub - ua, 2.8, uz1 - uz0, LAD); rayas(uz0, uz1, H1 + .22, H1 + 3, ub + .01, true); rayas(ua, ub, H1 + .22, H1 + 3, uz0 - .01, false);
    bx(g, (ua + ub) / 2, H1 + 3.02, (uz0 + uz1) / 2, ub - ua + 1.2, .25, uz1 - uz0 + 1.2, '#e9e7e0'); bx(g, (ua + ub) / 2, H1 + 3.0, (uz0 + uz1) / 2, ub - ua + 1.25, .12, uz1 - uz0 + 1.25, '#3d6b45');
    bx(g, -22, H1 + 3.27, -617, 2.2, .9, 1.6, LAD);   // tanque / sala de máquinas
    // frente a la avenida
    persX(b, -620.6, P + .45, 2.0, 1.6); persX(b, -613.6, P + .45, 1.5, 1.6);
    bx(g, b + .03, P, -616.4, .06, 2.2, 1.5, '#8a5232'); bx(g, b + .07, P + .05, -616.8, .03, 2.1, .65, MAD); bx(g, b + .07, P + .05, -616, .03, 2.1, .65, MAD);   // puerta doble
    bx(g, b + .1, P + 2.35, -616.4, .05, .25, .25, '#f2eccc');   // aplique
    bx(g, b + .03, 0, -613.5, .06, 1.15, 2.1, '#7a4428');         // portón del semisótano
    for (const [y, z] of [[P + .3, -617.8], [P + .3, -615]]) crowns.add(b + .5, y + .3, z, .4, .35, .4, 0, '#4f7f35');   // macetas
    // escalera de la entrada con baranda
    for (let k = 0; k < 6; k++){ const h = P * (k + 1) / 6; bx(g, b + 2.7 - k * .45, 0, -616.4, .45, h, 1.6, k % 2 ? '#bdb7ab' : '#c8c2b6'); }
    poleIn(g, [b + 2.9, .9, -617.25], [b + .2, P + .9, -617.25], .03, '#e6e6e2'); poleIn(g, [b + 2.9, .9, -615.55], [b + .2, P + .9, -615.55], .03, '#e6e6e2');
    bx(g, b + 1.3, 0, -614.15, 2.6, P, .3, LAD); bx(g, b + 1.3, P, -614.15, 2.7, .08, .4, BLANCO);   // murito al costado de la rampa del garaje
    // arriba al frente: ventanales con persianas y el aire acondicionado
    persX(ub, -620.4, H1 + .6, 2.4, 1.9); persX(ub, -616.4, H1 + .6, 1.4, 1.9); bx(g, ub + .25, H1 + 2.25, -614.2, .4, .5, .85, '#f2f2f0');
    // sobre Iriondo
    for (const x of [-27, -25]) { bx(g, x, .25, z0 - .03, 1.5, .75, .06, '#8a5232'); bx(g, x, .3, z0 - .07, 1.35, .65, .03, MAD); }
    { const o = new THREE.Mesh(new THREE.TorusGeometry(.33, .07, 6, 18), lam({ color: 0x6f4a32 })); o.position.set(-21.2, .7, z0 - .05); scene.add(o); bx(g, -21.2, .4, z0 - .03, .5, .6, .02, '#3a3430'); }
    persZ(-26.4, z0, P + .45, 1.9, 1.7); persZ(-22.4, z0, P + .45, 1.5, 1.4); persZ(-19, z0, P + .3, 2.0, 1.9);
    for (const x of [-26.2, -23.8]){ bx(g, x, H1 + .9, uz0 - .03, 1.0, 1.6, .06, '#f2f0ea'); bx(g, x, H1 + .95, uz0 - .07, .8, 1.5, .03, '#3a4148'); }   // ventanitas de arco
    persZ(-20.6, uz0, H1 + .6, 1.6, 1.9);
    crowns.add(-24, H1 + .55, z0 - 1.1, 1.8, .3, .3, 0, "#5d8a3e"); crowns.add(-19.5, H1 + .55, z0 - 1.1, 1.2, .3, .3, 0, "#5d8a3e");   // plantas colgando del balcón
    addCol(a, z0, b, z1); addCol(b, -617.3, b + 2.95, -615.5);
    mapRects.push([a, z0, b, z1, '#b98a70']);
    // losa volada con columna redonda en la punta oeste y puertita en el muro con alerito
    bx(g, -31, H1, -622.4, 3.8, .22, 3.6, BLANCO); cylIn(g, -32.4, H1 / 2, -623.6, .17, H1, '#efeee9'); addCol(-32.6, -623.8, -32.2, -623.4);
    bx(g, -31.6, 0, ZI + .15, 3.4, 2.5, .3, LAD); rayas(-33.3, -29.9, 0, 2.5, ZI - .01, false);
    bx(g, -31.6, 2.5, ZI - .1, 3.8, .14, .9, BLANCO); bx(g, -31, 0, ZI - .02, 1.0, 2.15, .06, '#8a5232'); bx(g, -31, .1, ZI - .06, .8, 1.95, .03, MAD);
    poleIn(g, [-29.8, 0, ZI - .6], [-29.3, 1.3, ZI - .2], .04, '#f0f0ec');   // borde blanco de la escalera que baja al semisótano
    bx(g, -27.6, .3, ZI - 1.0, .45, .8, .3, '#4a4a46');                       // cesto de basura
    addCol(-33.3, ZI, -29.2, ZI + .3);
  }

  // ---- B) cuerpo bajo con techo de tejas coloradas y chimenea ----
  { const a = -24, b = -15.5, z0 = -612.3, z1 = -605.5, H = 3.0;
    bx(g, (a + b) / 2, 0, (z0 + z1) / 2, b - a, H, z1 - z0, LAD); rayas(z0, z1, 0, H, b + .01, true);
    tejas((a + b) / 2, (z0 + z1) / 2, b - a, z1 - z0, H, 1.6, true);
    persX(b, -609.6, .9, 1.2, 1.5); bx(g, b + .05, .75, -609.6, .12, .1, 1.5, BLANCO);
    bx(g, b + .6, 0, -608.6, 1.0, .4, 5.2, LAD); crowns.add(b + .6, .7, -609.8, .55, .45, 1.4, 0, '#3f6a2e');   // cantero
    bx(g, -24.6, 0, -608.6, 1.0, 8.4, 1.0, LAD); bx(g, -24.6, 8.4, -608.6, 1.2, .15, 1.2, '#8f6a55');           // chimenea
    addCol(a, z0, b, z1); addCol(-25.1, -609.1, -24.1, -608.1);
    mapRects.push([a, z0, b, z1, '#b5462e']);
  }

  // ---- C) cuerpo de dos plantas con techo de tejas: portón de garaje de dos hojas, entrada metida y repisa con la vasija ----
  { const a = -27, b = -16, z0 = -605.5, z1 = -595.5, H = 5.8, F = 2.9;
    bx(g, (a + b) / 2, 0, (z0 + z1) / 2, b - a, H, z1 - z0, LAD); rayas(z0, z1, 0, H, b + .01, true);
    tejas((a + b) / 2, (z0 + z1) / 2, b - a, z1 - z0, H, 2.0, false);
    bx(g, b + .4, F, (z0 + z1) / 2, .9, .25, z1 - z0 + .2, LAD); bx(g, b + .4, F - .06, (z0 + z1) / 2, .95, .08, z1 - z0 + .25, BLANCO);   // repisa
    for (let y = F + .3; y < F + .75; y += .15) bx(g, b + .82, y, (z0 + z1) / 2, .04, .05, z1 - z0, LADO);
    // portón de dos hojas con tableros
    bx(g, b + .03, 0, -602.4, .06, 2.35, 3.6, '#8a5232');
    for (const zz of [-603.3, -601.5]) for (let r = 0; r < 4; r++) for (let c = 0; c < 2; c++) bx(g, b + .07, .2 + r * .52, zz + (c - .5) * .82, .03, .42, .72, MAD);
    bx(g, b - .3, 0, -599.6, .1, 2.3, 1.2, '#3a3430'); for (const z of [-600.25, -598.95]) bx(g, b + .02, 0, z, .12, 2.4, .1, LADO);   // entrada metida
    persX(b, -597.4, .5, 1.5, 1.7);
    persX(b, -603.2, F + .6, 1.4, 1.6); bx(g, b + .03, F + 1.35, -599.4, .06, .55, 1.0, '#f2f0ea'); bx(g, b + .06, F + 1.4, -599.4, .03, .45, .85, '#3a4148');
    { const v = new THREE.Mesh(new THREE.SphereGeometry(.38, 12, 10), lam({ color: 0xb5603a })); v.scale.set(1, 1.15, 1); v.position.set(b + .45, F + .55, -601.4); scene.add(v);
      for (const s of [-1, 1]) poleIn(g, [b + .45, F + .8, -601.4], [b + .45 + s * .15, F + 1.6, -601.4 + s * .35], .015, '#b8a46a'); }
    addCol(a, z0, b, z1);
    mapRects.push([a, z0, b, z1, '#b5462e']);
  }
  // muro de ladrillo al costado del garaje, sobre la avenida
  bx(g, XF - .15, 0, -592.6, .3, 1.9, 5.8, LAD); rayas(-595.5, -589.7, 0, 1.9, XF + .01, true); addCol(XF - .3, -595.5, XF, -589.7);

  // ---- muro de ladrillo con pilastras sobre Iriondo y portón de madera con cruces ----
  { const x0 = -52, x1 = -33.3, zf = ZI + .15;
    for (const [a, b] of [[x0, -45.4], [-41.2, x1]]){
      bx(g, (a + b) / 2, 0, zf, b - a, 2.3, .25, LAD); rayas(a, b, 0, 2.3, zf - .14, false); bx(g, (a + b) / 2, 2.3, zf, b - a, .08, .32, LADO);
      for (let x = a; x <= b + .01; x += 3.6) bx(g, Math.min(x, b), 0, zf - .08, .4, 2.5, .4, LAD);
      addCol(a, zf - .2, b, zf + .2);
    }
    bx(g, -43.3, 0, zf, 4.2, 2.2, .08, '#c2a27a');
    for (const s of [-1, 1]){ const cx = -43.3 + s * 1.05; bx(g, cx, 1.1, zf - .06, 2.6, .12, .04, '#a88a62', 0, s * .75); bx(g, cx, 1.1, zf - .06, 2.6, .12, .04, '#a88a62', 0, -s * .75); }
    for (const x of [-45.4, -41.2]) bx(g, x, 0, zf - .08, .5, 2.6, .5, LAD);
    addCol(-45.4, zf - .05, -41.2, zf + .05);
    bx(g, (-52 + -29.2) / 2, 0, -590.2, 22.8, 1.8, .2, '#b9b2a4'); addCol(-52, -590.3, -29.2, -590.1);   // medianera del fondo
    bx(g, -52, 0, (ZI + -590.2) / 2, .2, 1.8, -590.2 - ZI, '#b9b2a4'); addCol(-52.1, ZI, -51.9, -590.2);
  }
  // patio del fondo: pasto, araucaria y árboles
  flat.rect(-52, ZI, -27, -590.2, .07, '#6e9a45');
  trunks.add(-40, 0, -612, .5, 9, .5, 0, '#6b5240');
  for (let k = 0; k < 5; k++) crowns.add(-40, 5.5 + k * 1.1, -612, 2.6 - k * .45, .45, 2.6 - k * .45, k, '#2f5a2e');
  for (const [x, z, s, c] of [[-46, -600, 1.3, '#4b7a30'], [-34, -598, 1.1, '#9c7a45'], [-47.5, -617, 1.2, '#3f6b2a']]){ trunks.add(x, 0, z, .45 * s, 2.4 * s, .45 * s, 0, '#5b4330'); crowns.add(x, 2.4 * s + 2.4 * s * .7, z, 2.4 * s, 2.2 * s, 2.4 * s, 1, c); addCol(x - .3, z - .3, x + .3, z + .3); }
}

// Av. Centenario lado oeste, de la casa de ladrillo de Iriondo hacia el sur hasta la esquina de Bolívar (fotos de Street View del usuario, en orden):
//  · muro de ladrillo con pilastras y portón verde de chapa con marco de reja
//  · casa moderna baja: paredes beige, borde gris grueso, columna de piedra, cochera abierta, galería con la puerta y ventanal; adoquines al frente
//  · pilar de ladrillo y portón de chapa blanco, con la construcción de bloques grises y el tanque atrás
//  · galpón viejo de techo curvo oxidado, con murito bajo, media sombra verde, palos y yuyos al frente; tronco cortado en la vereda
//  · casa de la esquina de Bolívar con techo a dos aguas muy empinado (frente triangular), zócalo de piedra, chimenea de ladrillo,
//    persiana y puerta blancas, canteros bajos de ladrillo con celosía y mucho pasto adelante
{
  const g = group(0, 0), XF = -13.5;   // línea municipal de Av. Centenario (lado oeste); los frentes miran al +x
  const hsh = k => { const s = Math.sin(k * 71.3 + 2.7) * 43758.5453; return s - Math.floor(s); };
  flat.rect(XF, -589.7, -9.2, -543.5, .2062, '#6f9a47');   // vereda de pasto

  // ---- muro de ladrillo con pilastras (sigue el de la casa de ladrillo) y portón verde ----
  for (const z of [-595.3, -592.5, -589.9]) bx(g, XF - .15, 0, z, .45, 2.05, .45, '#a9785f');
  { const z0 = -589.6, z1 = -585.8, zc = (z0 + z1) / 2;
    bx(g, XF - .1, 0, zc, .06, 2.2, z1 - z0, '#3f9a5c');
    for (let z = z0 + .1; z < z1; z += .16) bx(g, XF - .02, 2.2, z, .03, .25, .03, '#2f6b45');
    for (const y of [0, 1.1, 2.2]) bx(g, XF - .02, y, zc, .05, .06, z1 - z0, '#2f6b45');
    bx(g, XF - .02, 0, zc, .05, 2.45, .06, '#2f6b45');
    for (const z of [z0, z1]) bx(g, XF - .15, 0, z, .35, 2.5, .35, '#d9d4c8');
    addCol(XF - .3, z0, XF, z1); }

  // ---- casa moderna baja ----
  { const a = -25, b = -15.5, z0 = -585.6, z1 = -573.4, H = 3.3, BEIGE = '#e6dfcc';
    bx(g, (a + b) / 2, 0, (z0 + z1) / 2, b - a, H, z1 - z0, BEIGE);
    bx(g, (a + b) / 2, H - .75, (z0 + z1) / 2, b - a + .5, .8, z1 - z0 + .5, '#7b7d80');   // borde gris grueso
    // de norte a sur: cochera abierta, columna de piedra, galería con la puerta, ventanal
    bx(g, b - 1.5, 0, -583.5, 3, H - .75, 3.4, '#3b3a36'); bx(g, b + .01, 0, -585.4, .4, H - .75, .4, BEIGE);   // cochera
    bx(g, b - 3.2, 0, -583.5, .05, 2.2, 2.6, '#5a5d60');
    bx(g, b + .1, 0, -581.3, .9, 4.7, .9, '#a8a094');                                          // columna de piedra
    for (let k = 0; k < 26; k++) bx(g, b + .57, .1 + hsh(k) * 4.4, -581.3 + (hsh(k + 50) - .5) * .7, .04, .2, .25 + hsh(k + 90) * .2, hsh(k + 3) > .5 ? '#bdb5a8' : '#8f877b');
    bx(g, b - 1.4, 0, -578.6, 2.8, H - .75, 3.4, '#cfc7b3');                                  // galería metida
    bx(g, b - 2.82, 0, -578, .05, 2.1, .9, '#3a3d40'); bx(g, b - 2.82, .9, -579.5, .05, 1.2, 1.4, '#2f3a44');
    crowns.add(b - .6, .45, -577.4, .3, .4, .3, 0, '#4f7f35');
    bx(g, b + .03, .7, -575.4, .06, 1.6, 2.6, '#2b3138'); bx(g, b + .05, .7, -575.4, .03, 1.6, .06, '#9a9a96');   // ventanal
    bx(g, b + .03, .9, -582.4, .06, .02, .02, BEIGE);
    addCol(a, z0, b - 3, z1); addCol(b - 3, -580.2, b, z1); addCol(b - .35, -581.75, b + .55, -580.85);
    mapRects.push([a, z0, b, z1, '#7b7d80']);
    // adoquines a la cochera y al portón verde; obra con bolsas y escombros (foto)
    flat.rect(b, -589.6, XF, -580.4, .078, '#c4c1ba'); flat.rect(XF, -589.6, -9.2, -580.4, .2072, '#c4c1ba');
    flat.rect(b, -580.4, XF, -573.4, .075, '#6f9a47');
    bx(g, -14.5, 0, -578.4, .9, .9, .9, '#ececea'); bx(g, -12.1, .2, -575.5, 1.4, .35, 1.0, '#cfc6b5');
  }

  // ---- pilar de ladrillo y portón de chapa blanco; construcción de bloques grises con el tanque ----
  { const z0 = -572.9, z1 = -568.7;
    bx(g, XF - .2, 0, -573.15, .5, 2.4, .5, '#a0634a');
    bx(g, XF - .1, 0, (z0 + z1) / 2, .06, 2.0, z1 - z0, '#eceeee'); for (let z = z0 + .2; z < z1; z += .35) bx(g, XF - .06, 0, z, .03, 2.0, .05, '#c9cdcf');
    addCol(XF - .45, -573.4, XF, z1);
    bx(g, -23, 0, (z0 + z1) / 2 + .2, 8, 3.4, 4.6, '#8c8c88'); for (let y = .2; y < 3.4; y += .4) bx(g, -19, y, (z0 + z1) / 2 + .2, .02, .02, 4.6, '#7a7a76');
    cylIn(g, -21.5, 3.4 + 1.05, -570.4, .85, 2.1, '#c9c9c4');
    bx(g, -27.5, 0, -566.5, 1.2, 4.2, 1.2, '#9a9a96');   // tanque/chimenea gris de bloques
    addCol(-27, z0, -19, z1 + .4);
    flat.rect(-19, z0, XF, z1, .076, '#a7a397');
  }

  // ---- galpón viejo de techo curvo (frente abierto, costado sur de tablas, techo oxidado adelante) ----
  { const a = -31, b = -17.4, z0 = -568.5, z1 = -559.8, H = 3.1, rise = 2.5, zc = (z0 + z1) / 2, R = (z1 - z0) / 2;
    for (const z of [z0 + .1, z1 - .1]) bx(g, (a + b) / 2, 0, z, b - a, H, .1, '#8a8478');
    bx(g, a + .05, 0, zc, .1, H + rise * .95, z1 - z0, '#4a443c');   // fondo
    for (let k = 0; k < 14; k++){   // arco del techo en tramos
      const t0 = k / 14 * Math.PI, t1 = (k + 1) / 14 * Math.PI, y0 = H + rise * Math.sin(t0), y1 = H + rise * Math.sin(t1), za = zc + R * Math.cos(t0), zb = zc + R * Math.cos(t1);
      const L = Math.hypot(zb - za, y1 - y0), ang = Math.atan2(y1 - y0, zb - za);
      for (const [xa, xb, col] of [[a, b - 3, k % 3 === 1 ? 0x8a8276 : 0x9c9284], [b - 3, b + .8, k % 2 ? 0x8a5a3a : 0x9a6a46]]){   // atrás gris, adelante oxidado
        const m = new THREE.Mesh(new THREE.BoxGeometry(xb - xa, .08, L + .05), lam({ color: col }));
        m.position.set((xa + xb) / 2, (y0 + y1) / 2, (za + zb) / 2); m.rotation.x = -ang; m.castShadow = m.receiveShadow = true; scene.add(m);
      }
    }
    for (let x = a + 2; x < b; x += 3.2) for (const s of [-1, 1]) bx(g, x, 0, zc + s * (R - .4), .2, H, .2, '#6e5a44');   // postes
    // costado sur del frente cerrado con tablas verticales; el resto abierto con trastos adentro
    bx(g, b + .05, 0, z1 - 1.6, .1, H + 1.2, 3.0, '#9c8a6e'); for (let z = z1 - 3; z < z1; z += .25) bx(g, b + .11, 0, z, .02, H + 1.2, .03, '#7a6a52');
    bx(g, b + .05, 0, z0 + .5, .1, H, .9, '#8d7a62');
    for (let k = 0; k < 9; k++) bx(g, b - 1.2 - hsh(k) * 9, 0, zc + (hsh(k + 9) - .5) * 6, .8 + hsh(k + 3), .5 + hsh(k + 5) * 1.3, .8, ['#6a5a48', '#8a3a2a', '#5a6a6e', '#c9b23a'][k % 4]);
    addCol(a, z0, b, z0 + .2); addCol(a, z1 - .2, b, z1); addCol(a, z0, a + .2, z1); addCol(b, z1 - 3.1, b + .1, z1);
    mapRects.push([a, z0, b, z1, '#9c9284']);
    flat.rect(b, z0, XF, z1, .075, '#7b8f48');
  }
  // ---- murito bajo de ladrillo, cerco de palos con media sombra verde y yuyos: del galpón al lote de al lado ----
  { const z0 = -568.5, z1 = -554.8, zc = (z0 + z1) / 2;
    bx(g, XF - .9, 0, -564.2, .3, 1.3, 8.6, '#8a6a52');
    const ms = new THREE.Mesh(new THREE.PlaneGeometry(z1 - z0, .8), new THREE.MeshLambertMaterial({ color: 0x3fa38a, side: THREE.DoubleSide })); ms.position.set(XF - .12, .55, zc); ms.rotation.y = Math.PI / 2; scene.add(ms);
    for (let z = z0 + .2; z < z1; z += .25 + hsh(z) * .25) bx(g, XF - .1, 0, z, .07, 1.1 + hsh(z + 1) * .8, .07, '#7a6a50');
    bx(g, XF - .1, .9, zc, .05, .05, z1 - z0, '#6a5a44');
    for (let k = 0; k < 16; k++) crowns.add(XF - .6 - hsh(k + 30) * 2.5, .6, z0 + .5 + hsh(k + 40) * (z1 - z0 - 1), .6 + hsh(k) * .5, .5 + hsh(k + 2) * .6, .6, hsh(k + 4) * 6, k % 2 ? '#7f8f45' : '#a39a62');
    addCol(XF - .35, z0, XF, z1);
    bx(g, XF - .2, 0, -554.6, .5, 1.9, .5, '#a0634a');   // pilar de ladrillo
    bx(g, -11.6, 0, -563.5, .55, .75, .55, '#7a5a3e'); addCol(-11.9, -563.8, -11.3, -563.2);   // tronco cortado
  }
  // ---- lote con vegetación frondosa entre el galpón y la casa de la esquina ----
  { flat.rect(-31, -559.8, XF, -554.8, .075, '#4f7a35');
    trunks.add(-20.5, 0, -557.3, .7, 2.6, .7, 0, '#4a3a2c');
    crowns.add(-20.5, 5.2, -557.3, 3.6, 2.8, 3.3, 0, '#2f5a2a'); crowns.add(-18.4, 4.2, -556.2, 2.4, 2.2, 2.2, 1, '#3a6530'); crowns.add(-23, 4.6, -558.4, 2.6, 2.4, 2.2, 2, '#2c5228');
    for (let k = 0; k < 14; k++) crowns.add(-15 - hsh(k + 70) * 15, .9 + hsh(k + 71) * .8, -559.3 + hsh(k + 72) * 4, 1.0 + hsh(k + 73) * .8, .8 + hsh(k + 74) * .8, 1.0 + hsh(k + 75) * .6, hsh(k) * 6, ['#3f6a2e', '#4f7a35', '#355e2a'][k % 3]);
    addCol(-21, -557.8, -20, -556.8);
    for (const z of [-559.8, -554.8]) bx(g, -24, 0, z, 14, 1.8, .2, '#a9a59c'); addCol(-31, -559.9, -17, -559.7); addCol(-31, -554.9, -17, -554.7);
  }

  // ---- casa de la esquina con techo a dos aguas muy empinado de chapa oxidada y frente triangular ----
  { const a = -24, b = -16, z0 = -554.4, z1 = -546.2, W = 1.3, rise = 5.3, zc = (z0 + z1) / 2, half = (z1 - z0) / 2;
    bx(g, (a + b) / 2, 0, zc, b - a, W, z1 - z0, '#cfcac0');
    const ang = Math.atan2(rise, half), L = Math.hypot(rise, half);
    for (const s of [-1, 1]){
      bx(g, (a + b) / 2, W + rise / 2 - .07, zc + s * half / 2, b - a + .5, .14, L + .5, '#9a5e3c', s * ang, 0);
      for (let x = a - .2; x < b + .2; x += .35) bx(g, x, W + rise / 2 - .02 + .03, zc + s * half / 2, .05, .04, L + .4, '#7e4a2e', s * ang, 0);   // ondas de la chapa
    }
    for (let k = 0; k < 12; k++){ const ww = (z1 - z0) * (1 - (k + .5) / 12); for (const x of [b + .02, a - .02]) bx(g, x, W + k * rise / 12, zc, .1, rise / 12, ww, '#a9aaa6'); }   // hastiales grises
    bx(g, b + .05, 0, zc, .1, W, z1 - z0, '#9a9488');
    for (let k = 0; k < 30; k++) bx(g, b + .11, .05 + hsh(k) * 1.1, z0 + .2 + hsh(k + 60) * (z1 - z0 - .4), .03, .22, .3 + hsh(k + 8) * .3, hsh(k + 2) > .5 ? '#b4ad9f' : '#857d70');   // zócalo de piedra
    bx(g, b + .08, 3.2, zc, .05, .55, .9, '#f2f2ee');                                                       // tablero blanco
    bx(g, b + .1, .55, -551.8, .06, 1.1, 1.9, '#f4f4f2'); for (let y = .65; y < 1.6; y += .12) bx(g, b + .14, y, -551.8, .02, .02, 1.8, '#d4d4d0');   // persiana blanca
    bx(g, b + .1, 0, -549.4, .06, 2.0, .9, '#f4f4f2');                                                      // puerta blanca
    bx(g, -18.2, 0, -545.4, 1.0, 7.8, 1.0, '#a0523a'); for (let y = .2; y < 7.8; y += .25) bx(g, -18.2, y, -545.4, 1.02, .02, 1.02, '#c9876e');   // chimenea
    // piecita blanca de atrás con la celosía de bloques arriba
    bx(g, -26.2, 0, -550.2, 3.6, 2.6, 4, '#f2f1ec'); for (let z = -551.9; z < -548.5; z += .4) bx(g, -24.38, 2.25, z, .05, .3, .3, '#9a9a96');
    addCol(a, z0, b, z1); addCol(-18.7, -545.9, -17.7, -544.9); addCol(-28, -552.2, -24.4, -548.2);
    mapRects.push([a, z0, b, z1, '#9a5e3c']);
    // canteros bajos de ladrillo con celosía y caminito a la puerta
    for (const [za, zb] of [[-554.4, -550.1], [-548.7, -545]]){
      bx(g, -14.3, 0, (za + zb) / 2, .35, .75, zb - za, '#8a5a42');
      for (let z = za + .2; z < zb; z += .3) for (const r of [-.75, .75]) bx(g, -14.12, .4, z, .02, .45, .02, '#5a3a2a', r, 0);
      crowns.add(-14.9, .7, (za + zb) / 2, .5, .35, (zb - za) / 2 - .2, 0, '#7a8f45');
      addCol(-14.5, za, -14.1, zb);
    }
    flat.rect(-16, -549.8, XF, -549, .078, '#c9c4b8'); flat.rect(XF, -549.8, -9.2, -549, .2072, '#c9c4b8');
    flat.rect(-28, -554.6, XF, -543, .075, '#6f9a47');
    crowns.add(-29.5, 1.6, -547, 1.8, 1.6, 1.8, 0, '#3f6a2e'); addCol(-30, -547.5, -29, -546.5);
  }
  // fondos de pasto y algún árbol
  flat.rect(-52, -590, -25, -543, .07, '#6e9a45');
  for (const [x, z, s, c] of [[-40, -580, 1.2, '#4b7a30'], [-44, -561, 1.3, '#2f5a2e'], [-36, -548, 1.1, '#557f35']]){ trunks.add(x, 0, z, .45 * s, 2.4 * s, .45 * s, 0, '#5b4330'); crowns.add(x, 2.4 * s + 1.7 * s, z, 2.4 * s, 2.2 * s, 2.4 * s, 1, c); addCol(x - .3, z - .3, x + .3, z + .3); }
  for (const z of [-573.4]) bx(g, -38.5, 0, z, 27, 1.8, .2, '#b9b2a4');   // medianeras
}

// Estación de servicio Shell (Ruano Hnos), esquina Av. Centenario e Iriondo, hasta la esquina de Entre Ríos
// (dibujo del usuario sobre el satelital + fotos 360 de Street View; medidas de las huellas de edificios):
//  · marquesina grande sobre la avenida y otra más chica sobre Iriondo, con los surtidores
//  · tiendita / café (Shop) entre las dos marquesinas
//  · oficinas y baños al lado, con las puertas mirando a Iriondo
//  · taller pasante (se entra de un lado y se sale del otro) con la fosa abajo, lubricentro Helix y lavadero
//  · tira larga de garajes / talleres al fondo, con paneles solares
//  · patio de camiones (Transporte Salazar) cercado con murito blanco y tejido sobre Iriondo y Entre Ríos, abierto hacia el playón

{
  const g = group(0, 0);
  plazaRects.push([12, -628, 89.5, -582]);
  const hsh = k => { const s = Math.sin(k * 127.1 + 311.7) * 43758.5453; return s - Math.floor(s); };
  // árbol armado sin usar el aleatorio global (para no correr el resto del pueblo)
  const arbol = (x, z, s, cols, k) => {
    const th = 2.4 * s, cr = 2.4 * s * (.88 + hsh(k) * .25);
    trunks.add(x, 0, z, .45 * s, th, .45 * s, 0, '#5b4330');
    crowns.add(x, th + cr * .7, z, cr, cr * (.88 + hsh(k + 7) * .2), cr, hsh(k + 3) * 6, cols[k % cols.length]);
    crowns.add(x + (hsh(k + 5) - .5) * 1.6 * s, th + cr * 1.2, z + (hsh(k + 9) - .5) * 1.6 * s, cr * .7, cr * .7, cr * .7, hsh(k + 11) * 6, cols[(k + 1) % cols.length]);
    addCol(x - .3 * s, z - .3 * s, x + .3 * s, z + .3 * s);
  };
  // logo de Shell
  const cv = document.createElement('canvas'); cv.width = cv.height = 256; const c = cv.getContext('2d');
  c.fillStyle = '#ffffff'; c.fillRect(0, 0, 256, 256); c.translate(128, 150);
  c.beginPath(); c.moveTo(-38, 55); c.lineTo(38, 55); c.lineTo(80, 0); c.arc(0, 0, 82, 0, Math.PI, true); c.lineTo(-38, 55); c.closePath();
  c.fillStyle = '#f7d117'; c.fill(); c.lineWidth = 11; c.strokeStyle = '#dd1d21'; c.stroke();
  c.lineWidth = 6; for (let k = 0; k < 7; k++){ const a = Math.PI + (k + 1) / 8 * Math.PI; c.beginPath(); c.moveTo(0, 48); c.lineTo(Math.cos(a) * 74, Math.sin(a) * 74); c.stroke(); }
  const logo = new THREE.CanvasTexture(cv); logo.colorSpace = THREE.SRGBColorSpace;
  const logoMat = new THREE.MeshLambertMaterial({ map: logo });
  const logoAt = (p, x, y, z, s, ry) => { const m = new THREE.Mesh(new THREE.PlaneGeometry(s, s), logoMat); m.position.set(x, y, z); m.rotation.y = ry; p.add(m); return m; };
  // letras sueltas pintadas sobre una pared (fondo transparente)
  const letras = (p, txt, x, y, z, w, h, col, font, ry) => {
    const cc = document.createElement('canvas'); cc.width = 1024; cc.height = 128; const k = cc.getContext('2d');
    k.fillStyle = col; k.font = font; k.textAlign = 'center'; k.textBaseline = 'middle'; k.fillText(txt, 512, 66);
    const t = new THREE.CanvasTexture(cc); t.colorSpace = THREE.SRGBColorSpace;
    const m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), new THREE.MeshLambertMaterial({ map: t, transparent: true, alphaTest: .3, side: THREE.DoubleSide }));
    m.position.set(x, y, z); m.rotation.y = ry; p.add(m); return m;
  };
  const ruedaMat = lam({ color: 0x1c1c1c });
  const ruedaCam = new THREE.CylinderGeometry(.52, .52, .34, 14).rotateX(Math.PI / 2);   // eje a lo largo de z
  const ruedaAuto = new THREE.CylinderGeometry(.32, .32, .22, 12).rotateX(Math.PI / 2);
  const rueda = (p, geo, x, y, z) => { const m = new THREE.Mesh(geo, ruedaMat); m.position.set(x, y, z); m.castShadow = true; p.add(m); };
  // auto estacionado (largo a lo largo del +x local)
  const auto = (x, z, ry, col, pick) => {
    const a = group(x, z, ry);
    if (pick){ bx(a, 0, .4, 0, 5.1, .75, 1.85, col); bx(a, .55, 1.15, 0, 2.0, .7, 1.7, '#2b3440'); bx(a, .55, 1.82, 0, 1.9, .07, 1.65, col); for (const s of [-1, 1]) bx(a, -1.4, 1.15, s * .9, 2.2, .3, .06, col); }
    else { bx(a, 0, .3, 0, 4.1, .68, 1.75, col); bx(a, -.25, .98, 0, 2.2, .55, 1.58, '#2b3440'); bx(a, -.25, 1.53, 0, 2.0, .06, 1.52, col); }
    const lx = pick ? 1.7 : 1.3;
    for (const sx of [-lx, lx]) for (const sz of [-.82, .82]) rueda(a, ruedaAuto, sx, .32, sz);
    const v = Math.abs(Math.sin(ry)) > .5, hl = pick ? 2.6 : 2.05;
    addCol(x - (v ? .95 : hl), z - (v ? hl : .95), x + (v ? .95 : hl), z + (v ? hl : .95));
  };

  // ---- playón de cemento (sin cordón sobre la avenida ni sobre Iriondo), juntas y manchas ----
  flat.rect(13.5, -624.5, 67, -592.6, .075, '#bdb8ae');
  flat.rect(51, -605.3, 67, -587, .075, '#bdb8ae');
  flat.rect(13.5, -629.5, 67, -624.5, .072, '#b2ada3');
  for (const [x0, z0, x1, z1] of [[14, -603, 27, -594], [38, -604, 47, -594], [14, -628.5, 26, -625], [52, -626, 64, -620], [55, -600, 66, -592]]) flat.rect(x0, z0, x1, z1, .078, '#a8a296');
  for (let x = 41.5; x < 67; x += 6) flat.rect(x, -624.5, x + .08, -618.6, .079, '#9a958b');
  for (let z = -598.5; z > -625; z -= 6) flat.rect(13.5, z, 27.8, z + .08, .079, '#9a958b');
  flat.rect(13.6, -629.7, 67, -629.45, .08, '#d9b23a');   // línea amarilla al borde de Iriondo

  // ---- marquesinas: la grande sobre la avenida y la chica sobre Iriondo ----
  const marquesina = (x0, z0, x1, z1, h, logos) => {
    const cx = (x0 + x1) / 2, cz = (z0 + z1) / 2, w = x1 - x0, d = z1 - z0;
    bx(g, cx, h, cz, w, .12, d, '#f4f4f2');
    bx(g, cx, h + .12, cz, w + .3, .26, d + .3, '#d7261e');
    bx(g, cx, h + .38, cz, w + .32, .62, d + .32, '#f3b21c');
    bx(g, cx, h + 1.0, cz, w + .32, .1, d + .32, '#f7f6f2');
    for (const [x, z, ry] of logos) logoAt(g, x, h + .69, z, 1.05, ry);
    for (let x = x0 + 2; x < x1 - 1; x += 3.2) for (let z = z0 + 1.8; z < z1 - 1; z += 3.2) bx(g, x, h - .05, z, 1.3, .05, .35, '#fffbe8');
    mapRects.push([x0, z0, x1, z1, '#f2c21b']);
  };
  marquesina(12.2, -613.4, 27.8, -604, 5.3, [[20, -613.58, Math.PI], [12.02, -608.7, -Math.PI / 2], [20, -603.82, 0]]);
  marquesina(27.8, -627, 35.4, -619.4, 4.9, [[31.6, -627.18, Math.PI], [35.58, -623.2, Math.PI / 2], [27.62, -623.2, -Math.PI / 2]]);
  // islas con surtidores (las columnas de la marquesina salen de las puntas de cada isla)
  // isla a lo largo del +x local; vert = a lo largo de z (paralela a la avenida), así los autos entran por un lado y salen por el otro
  const isla = (x, z, len, h, vert) => {
    const q = group(x, z, vert ? Math.PI / 2 : 0);
    bx(q, 0, 0, 0, len, .22, 1.4, '#d9d5cd'); bx(q, 0, 0, 0, len + .2, .1, 1.6, '#f2c21b');
    for (const dx of [-len / 2 + .45, len / 2 - .45]) bx(q, dx, .22, 0, .4, h - .22, .4, '#f4f4f2');
    for (const dx of (len >= 7 ? [-1.7, 1.7] : [0])){
      bx(q, dx, .22, 0, 1.0, 1.95, .62, '#f4f4f2'); bx(q, dx, .22, 0, 1.02, .5, .64, '#f2c21b'); bx(q, dx, 2.17, 0, 1.04, .22, .66, '#d7261e');
      for (const s of [-1, 1]){ bx(q, dx, 1.05, s * .32, .55, .45, .03, '#1d2a33'); bx(q, dx + .33, .75, s * .35, .08, .55, .08, '#2a2a2a'); }
    }
    bx(q, -len / 2 + 1.05, .22, 0, .45, .7, .45, '#3a3d40');   // cesto
    const hx = vert ? .8 : len / 2, hz = vert ? len / 2 : .8;
    addCol(x - hx, z - hz, x + hx, z + hz);
    if (vert) PUMPS.push([x - 2.6, z], [x + 2.6, z]); else PUMPS.push([x, z - 2.6], [x, z + 2.6]);
  };
  isla(17, -608.7, 7.2, 5.3, true); isla(23, -608.7, 7.2, 5.3, true); isla(31.6, -623.2, 6, 4.9);
  // "Aire y Agua" junto a la marquesina grande
  bx(g, 14.2, 0, -601.5, .7, 1.25, .5, '#f2c21b'); signIn(g, 'Aire y Agua', 14.2, 1.0, -601.24, .66, .3, '#f2c21b', '#d7261e');
  addCol(13.8, -601.8, 14.6, -601.2);

  // ---- cartel alto con el logo en la esquina y cartel de precios ("Tarjetas Habilitadas") sobre la avenida ----
  bx(g, 15, 0, -623, 1.4, .35, 1.4, '#f1f1ee');
  bx(g, 15, 0, -623, .45, 8.2, .45, '#e9e9e6');
  bx(g, 15, 6.4, -623, 3.3, 3.4, .5, '#f7f7f5');
  for (const s of [-1, 1]) logoAt(g, 15, 8.1, -623 + s * .26, 2.9, s > 0 ? 0 : Math.PI);
  addCol(14.6, -623.4, 15.4, -622.6);
  bx(g, 15.6, 0, -617, 2.7, .4, 1.3, '#e6e5e0');   // cantero con flores al pie
  crowns.add(15.1, .55, -617, .5, .25, .4, 0, '#6f9a3c'); crowns.add(16.2, .55, -617, .4, .22, .4, 0, '#d9a62a');
  bx(g, 15.6, .4, -617, 2.1, 2.9, .34, '#f4f4f2');
  const precios = [['Súper', '$.2345'], ['V-Power', '$.2555'], ['Diesel', '$.2497'], ['V-Power D', '$.2689']];
  for (const s of [-1, 1]){
    const zz = -617 + s * .18, ry = s > 0 ? 0 : Math.PI;
    precios.forEach(([n, p], k) => { signIn(g, n, 15.6 - s * .62, 2.85 - k * .52, zz, .8, .4, '#ffffff', '#444444', ry); signIn(g, p, 15.6 + s * .33, 2.85 - k * .52, zz, 1.2, .44, '#ffffff', '#c8201c', ry); });
    signIn(g, 'Tarjetas Habilitadas', 15.6, .8, zz, 1.9, .3, '#ffffff', '#c8201c', ry);
  }
  addCol(14.2, -617.6, 17, -616.4);

  // ---- tiendita / café (Shop): vidriera hacia la marquesina grande (oeste) y hacia la chica (norte) ----
  const X0 = 27.8, X1 = 36.3, Z0 = -618.6, Z1 = -605.3;
  bx(g, (X0 + X1) / 2, 0, (Z0 + Z1) / 2, X1 - X0, 3.9, Z1 - Z0, '#f4f4f2');
  bx(g, (X0 + X1) / 2, 3.05, (Z0 + Z1) / 2, X1 - X0 + .16, .32, Z1 - Z0 + .16, '#d7261e'); bx(g, (X0 + X1) / 2, 3.37, (Z0 + Z1) / 2, X1 - X0 + .2, .5, Z1 - Z0 + .2, '#f3b21c');
  bx(g, X0 - .06, .25, -611.5, .06, 2.5, 11, '#2c3f4f');
  for (let z = -616.6; z <= -606.4; z += 1.7) bx(g, X0 - .1, .25, z, .05, 2.5, .07, '#d5d8da');
  bx(g, X0 - .1, 0, -609.2, .07, 2.3, 1.6, '#4a6272');   // puerta de vidrio
  bx(g, 32, .25, Z0 - .06, 6.5, 2.5, .06, '#2c3f4f');
  for (let x = 29.4; x <= 34.7; x += 1.6) bx(g, x, .25, Z0 - .1, .07, 2.5, .05, '#d5d8da');
  signIn(g, 'Shop', X0 - .22, 3.62, -615.5, 2.2, .42, '#d7261e', '#ffffff', -Math.PI / 2);
  signIn(g, 'Shell Select · Café', X0 - .22, 3.62, -609, 3.6, .42, '#f3b21c', '#d7261e', -Math.PI / 2);
  signIn(g, 'Shop', 32, 3.62, Z0 - .22, 2.2, .42, '#d7261e', '#ffffff', Math.PI);
  addCol(X0, Z0, X1, Z1);
  bx(g, 35.6, 0, -619.1, 1.4, .45, .45, '#8a6a4a');   // banquito del café contra la vidriera

  // ---- oficinas y baños (puertas mirando a Iriondo) ----
  { const A0 = 36.3, A1 = 51, h = 3.4;
    bx(g, (A0 + A1) / 2, 0, (Z0 + Z1) / 2, A1 - A0, h, Z1 - Z0, '#f1f0ec');
    bx(g, (A0 + A1) / 2, h, (Z0 + Z1) / 2, A1 - A0 + .2, .2, Z1 - Z0 + .2, '#e2e1dc');
    bx(g, (A0 + A1) / 2, 2.75, Z0 - .05, A1 - A0, .14, .05, '#d84a3a'); bx(g, (A0 + A1) / 2, 2.95, Z0 - .05, A1 - A0, .08, .05, '#f3b21c');
    const puertas = [[38.2, 'Oficina'], [41.6, ''], [44.2, 'Damas'], [46.6, 'Caballeros'], [49.4, '']];
    for (const [x, t] of puertas){
      bx(g, x, 0, Z0 - .05, 1.0, 2.15, .06, t ? '#6b7a86' : '#2f3a44');
      if (t) signIn(g, t, x, 2.35, Z0 - .1, 1.1, .22, '#1f3a8a', '#ffffff', Math.PI);
    }
    for (const x of [39.9, 47.9]){ bx(g, x, 1.1, Z0 - .05, 1.2, 1.0, .05, '#33414c'); bx(g, x, 2.35, Z0 - .4, 1.6, .07, .75, '#7b7f84'); }   // ventanas con alerito
    for (const x of [43, 48.2]) bx(g, x, 1.3, Z1 + .05, 1.1, .9, .05, '#33414c');
    for (const z of [-615.5, -610, -607.5]) bx(g, A1 + .05, 1.2, z, .05, .9, 1.1, '#33414c');
    bx(g, A1 + .3, .6, -612.6, .5, .7, .7, '#c9cbcd');   // equipo de aire
    for (const x of [42.5, 47.5]){ bx(g, x, 0, Z0 - .9, .5, .45, .5, '#e7c51e'); crowns.add(x, .78, Z0 - .9, .35, .38, .35, 0, '#4f7a3a'); }
    addCol(A0, Z0, A1, Z1);
    mapRects.push([X0, Z0, X1, Z1, '#d7261e'], [A0, Z0, A1, Z1, '#e8e8e8']);
  }

  // ---- taller pasante con fosa: lavadero / lubricentro Helix (se entra desde el playón de la avenida y se sale hacia el fondo) ----
  { const T0 = 27.8, T1 = 37.2, U0 = -605.3, U1 = -596, h = 5.0, cz = (U0 + U1) / 2;
    for (const z of [U0 + .15, U1 - .15]) bx(g, (T0 + T1) / 2, 0, z, T1 - T0, h, .3, '#f4f4f2');   // paredes laterales
    bx(g, (T0 + T1) / 2, h, cz, T1 - T0 + .2, .3, U1 - U0 + .2, '#e4e4df');                          // techo
    for (const x of [T0 + .15, T1 - .15]) bx(g, x, 3.4, cz, .3, h - 3.4, U1 - U0, '#f4f4f2');        // dinteles sobre los portones
    bx(g, (T0 + T1) / 2, h - .9, U0 - .02, T1 - T0, .14, .04, '#e0603e'); bx(g, (T0 + T1) / 2, h - .65, U0 - .02, T1 - T0, .1, .04, '#f3b21c');
    signIn(g, 'Lavado', T0 - .02, 4.15, cz, 2.4, .42, '#ffffff', '#d7261e', -Math.PI / 2);
    signIn(g, 'HELIX Lubricentro', T0 - .02, 3.75, cz + 3.1, 2.4, .36, '#f2c21b', '#d7261e', -Math.PI / 2);
    letras(g, 'Gomería', T1 + .04, 4.25, cz, 6, .62, '#d0483a', 'bold 92px Arial', Math.PI / 2);
    for (const y of [3.7, 4.8]) bx(g, T1 + .02, y, cz, .04, .12, 7.5, '#e0603e');
    // fosa con escalones y baranda; mangueras e hidrolavadora
    flat.rect(30.2, cz - .45, 35.6, cz + .45, .082, '#2a2622'); flat.rect(30.2, cz - .62, 35.6, cz - .45, .083, '#e7c51e'); flat.rect(30.2, cz + .45, 35.6, cz + .62, .083, '#e7c51e');
    bx(g, 34.8, 0, U1 - .7, 1.0, 1.0, .6, '#2f6fb5'); bx(g, 34.8, 1.0, U1 - .7, .6, .1, .4, '#2a2a2a');
    for (const x of [29.5, 31.5]) bx(g, x, 0, U1 - .55, .5, .9, .5, '#3c3c3c');   // bidones de aceite
    cylIn(g, 36.4, .45, U1 - .7, .3, .9, '#c62a22');                               // tambor rojo
    addCol(T0, U0, T1, U0 + .3); addCol(T0, U1 - .3, T1, U1);
    mapRects.push([T0, U0, T1, U1, '#5aa9e6']);
  }

  // ---- garajes / talleres al fondo: tira larga con portones, paneles solares sobre la parte de la avenida ----
  { const tramos = [[14.9, 34.6, -593, -585.5, 3.6], [34.6, 47.3, -590, -585.5, 3.2], [47.3, 77.1, -592.6, -585, 4.2]];
    for (const [a0, a1, z0, z1, h] of tramos){
      bx(g, (a0 + a1) / 2, 0, (z0 + z1) / 2, a1 - a0, h, z1 - z0, '#f2f2ee');
      bx(g, (a0 + a1) / 2, h, (z0 + z1) / 2, a1 - a0 + .2, .2, z1 - z0 + .2, '#e2e2dc');
      bx(g, (a0 + a1) / 2, h - .7, z0 - .04, a1 - a0, .14, .05, '#d84a3a'); bx(g, (a0 + a1) / 2, h - .48, z0 - .04, a1 - a0, .08, .05, '#f3b21c');
      addCol(a0, z0, a1, z1);
      mapRects.push([a0, z0, a1, z1, '#e8e8e8']);
    }
    for (const x of [18.5, 23.5]) bx(g, x, 0, -593.05, 3.6, 2.8, .06, '#7e868d');   // portones
    for (const x of [27.6, 31.6]) bx(g, x, 1.1, -593.05, 1.4, 1.1, .05, '#33414c');
    bx(g, 29.6, 0, -593.05, 1.0, 2.2, .05, '#5c6670');
    bx(g, 14.85, 1.1, -589.25, .05, 1.1, 1.6, '#33414c');
    for (let x = 16.4; x < 34; x += 2.05) bx(g, x, 3.95, -589.4, 1.9, .06, 3.2, '#1f2c4a', -.32);   // paneles solares
    for (const x of [38, 42.5]) bx(g, x, 0, -590.05, 3.2, 2.6, .06, '#8e959b');
    for (let x = 50.5; x < 76; x += 4.6) bx(g, x, 0, -592.65, 3.6, 3.1, .06, (Math.round(x) % 2) ? '#7e868d' : '#8e959b');
    bx(g, 21, 0, -594.4, 4.5, .35, 1.0, '#d8d6d0');   // cantero con yuca
    for (const [x, s] of [[19.6, 1], [21.1, .8], [22.5, 1.1]]){ trunks.add(x, .35, -594.4, .18, .4 * s, .18, 0, '#6a5a3a'); crowns.add(x, .75 + .55 * s, -594.4, .22, .65 * s, .22, 0, '#5d8a3e'); crowns.add(x, .7 + .4 * s, -594.4, .55 * s, .2, .2, .6, '#6b9445'); }
    addCol(18.75, -594.9, 23.25, -593.9);
    bx(g, 13.6, 0, -588.5, .25, 2.0, 5, '#efefea'); addCol(13.4, -591, 13.8, -586);   // tapialito contra la avenida
  }
  auto(41, -594, 0, '#f2f2f0'); auto(46.5, -602.5, Math.PI / 2, '#b9bdc2'); auto(56, -611.5, Math.PI / 2, '#f4f4f2', true); auto(60.5, -596.5, 0, '#8a1f1f');

  // ---- antena reticulada entre el taller y los garajes ----
  { const ag = group(42, -599.5), H = 34, legs = [0, 1, 2].map(k => k * Math.PI * 2 / 3 + .3);
    for (let s = 0; s < H; s += 4){
      const s1 = Math.min(H, s + 4), r0 = .9 * (1 - s / H) + .25, r1 = .9 * (1 - s1 / H) + .25;
      legs.forEach((t, k) => {
        poleIn(ag, [Math.cos(t) * r0, s, Math.sin(t) * r0], [Math.cos(t) * r1, s1, Math.sin(t) * r1], .05, '#c9ccd0');
        const t2 = legs[(k + 1) % 3]; poleIn(ag, [Math.cos(t) * r0, s, Math.sin(t) * r0], [Math.cos(t2) * r1, s1, Math.sin(t2) * r1], .025, '#c9ccd0');
      });
    }
    bx(ag, 0, 0, 0, 2.6, .3, 2.6, '#bdbab2'); addCol(40.8, -600.7, 43.2, -598.3); }

  // ---- tres mástiles con banderas donde empieza el cerco del patio ----
  const bTex = draw => { const cc = document.createElement('canvas'); cc.width = 96; cc.height = 64; draw(cc.getContext('2d')); const t = new THREE.CanvasTexture(cc); t.colorSpace = THREE.SRGBColorSpace; return t; };
  const banderas = [
    bTex(k => { k.fillStyle = '#74acdf'; k.fillRect(0, 0, 96, 64); k.fillStyle = '#ffffff'; k.fillRect(0, 21, 96, 22); k.fillStyle = '#f6b40e'; k.beginPath(); k.arc(48, 32, 6, 0, 7); k.fill(); }),
    bTex(k => { k.fillStyle = '#d52b1e'; k.fillRect(0, 0, 96, 32); k.fillStyle = '#74acdf'; k.fillRect(0, 32, 96, 32); k.fillStyle = '#ffffff'; k.fillRect(0, 26, 96, 12); }),
    bTex(k => { k.fillStyle = '#ffffff'; k.fillRect(0, 0, 96, 64); k.fillStyle = '#c0392b'; k.fillRect(0, 0, 96, 14); k.fillRect(0, 50, 96, 14); })
  ];
  banderas.forEach((t, i) => {
    const x = 64 + i * 1.2, z = -622.8 + i * .7, h = 8.2 - i * .5;
    poles.add(x, 0, z, .12, h, .12, 0, '#e6e6e3');
    const f = new THREE.Mesh(new THREE.PlaneGeometry(1.5, 1), new THREE.MeshLambertMaterial({ map: t, side: THREE.DoubleSide }));
    f.geometry.translate(.75, 0, 0); f.position.set(x, h - .6, z); f.rotation.y = .3; scene.add(f);
    anims.push(tt => { f.rotation.y = .3 + Math.sin(tt * 1.7 + i) * .25; });
    addCol(x - .12, z - .12, x + .12, z + .12);
  });
  crowns.add(66.2, .5, -623.6, .7, .5, .6, 0, '#4f7a3a');

  // ---- patio de camiones (Transporte Salazar) cercado sobre Iriondo y Entre Ríos, abierto hacia el playón ----
  flat.rect(67, -624.5, 89.5, -587, .072, '#a59e90');
  for (const [x0, z0, x1, z1] of [[67, -624.5, 89.5, -622], [80, -606, 89.5, -594], [68, -606, 76, -598], [82, -620, 89, -612]]) flat.rect(x0, z0, x1, z1, .074, '#7f9c52');
  flat.rect(67, -630, 89.5, -624.5, .073, '#6f9a47');     // franja de pasto de la vereda sobre Iriondo
  flat.rect(89.5, -624.5, 92.88, -587, .073, '#6f9a47');   // y sobre Entre Ríos
  poles.add(76, 0, -626.5, .3, 8, .3, 0, '#c4c2bb');      // poste de hormigón con farol sobre la vereda
  poleIn(g, [76, 7.6, -626.5], [77.6, 7.9, -626.8], .05, '#9a9a96'); bx(g, 77.8, 7.75, -626.8, .7, .16, .3, '#d8d8d2');
  addCol(75.8, -626.7, 76.2, -626.3);
  // cerco: murito blanco bajo, postes blancos cada 2,4 m y paños de tejido
  const tejido = new THREE.MeshLambertMaterial({ color: 0xd9ded6, transparent: true, opacity: .38, side: THREE.DoubleSide, depthWrite: false });
  const cerco = (x0, z0, x1, z1) => {
    const L = Math.hypot(x1 - x0, z1 - z0), fg = group(x0, z0, -Math.atan2(z1 - z0, x1 - x0));
    bx(fg, L / 2, 0, 0, L, .5, .22, '#eeeeea');
    for (let u = 0; u <= L + .01; u += 2.4) bx(fg, Math.min(u, L), 0, 0, .13, 2.0, .13, '#f1f1ec');
    bx(fg, L / 2, 1.95, 0, L, .05, .05, '#f1f1ec');
    const m = new THREE.Mesh(new THREE.PlaneGeometry(L, 1.45), tejido); m.position.set(L / 2, 1.22, 0); fg.add(m);
    addCol(Math.min(x0, x1) - .15, Math.min(z0, z1) - .15, Math.max(x0, x1) + .15, Math.max(z0, z1) + .15);
  };
  cerco(67, -624.5, 89.5, -624.5); cerco(89.5, -624.5, 89.5, -587); cerco(77.1, -587, 89.5, -587);
  // paño de tejido verde con ligustro al lado de los mástiles (foto)
  { const verde = new THREE.MeshLambertMaterial({ color: 0x7fa86a, transparent: true, opacity: .6, side: THREE.DoubleSide, depthWrite: false });
    const m = new THREE.Mesh(new THREE.PlaneGeometry(2.3, 1.45), verde); m.position.set(68.3, 1.22, -624.42); scene.add(m);
    crowns.add(70.6, 1.1, -623.7, 1.0, 1.0, .6, 0, '#3f6a2a'); }
  // cipreses contra el cerco de Iriondo, sauce, árbol pelado y los árboles del patio (satelital)
  const cipres = (x, z, h) => { trunks.add(x, 0, z, .3, 1.2, .3, 0, '#5b4632'); crowns.add(x, h * .45 + .6, z, .95, h * .45, .95, 0, '#34512c'); crowns.add(x, h * .8, z, .6, h * .22, .6, .5, '#3b5a30'); addCol(x - .4, z - .4, x + .4, z + .4); };
  cipres(73.2, -622.9, 10); cipres(79.5, -622.9, 11.5); cipres(85.2, -622.9, 9.5); cipres(88.3, -621.5, 10.5);
  arbol(68.6, -619.3, 1.05, ['#b5ad55', '#a9a64a', '#c2b862'], 1);   // sauce
  arbol(59.4, -617.3, .95, ['#8e8c70', '#9a9678'], 2);                // árbol pelado en el playón, al lado de las oficinas
  arbol(66.7, -611.6, 1.1, ['#4b7a30', '#557f35', '#3f6b2a'], 3);
  arbol(73.7, -598.7, 1.2, ['#3f6b2a', '#4b7a30'], 4);
  arbol(85, -602, 1.15, ['#4b7a30', '#557f35'], 5);
  arbol(88, -596.5, 1.05, ['#38602a', '#466f2e'], 6);
  // semirremolque blanco "TRANSP. SALAZAR" con franja azul, paralelo a Iriondo
  { const t = group(77.5, -619.6);
    bx(t, 0, .85, 0, 13, .3, 2.5, '#2a2b2e');
    bx(t, .2, 1.15, 0, 12.4, 1.65, 2.5, '#f2f2ee');
    for (const s of [-1, 1]){ bx(t, .2, 1.3, s * 1.26, 12.4, .2, .03, '#2f6fb5'); letras(t, 'TRANSP. SALAZAR', 1.5, 2.25, s * 1.28, 6.5, .7, '#3b4a5a', 'bold 88px Arial', s > 0 ? 0 : Math.PI); }
    for (const x of [-5.2, -4, -2.8]) for (const s of [-1, 1]) rueda(t, ruedaCam, x, .52, s * 1.05);
    bx(t, 5.5, 0, 0, .2, .85, 1.6, '#3a3a3a');
    addCol(71, -620.9, 84, -618.3); }
  // acoplado con lona gris
  { const t = group(78, -614);
    bx(t, 0, .85, 0, 11, .3, 2.5, '#2b2d30'); bx(t, 0, 1.15, 0, 11, .9, 2.5, '#d9d6cc');
    bx(t, 0, 2.05, 0, 10.8, 1.1, 2.45, '#8d9296'); bx(t, 0, 3.15, 0, 10.6, .25, 2.2, '#848a8e');
    for (const x of [-4, -2.9, 2.9, 4]) for (const s of [-1, 1]) rueda(t, ruedaCam, x, .52, s * 1.05);
    addCol(72.5, -615.4, 83.5, -612.6); }
  // casilla de chapa (huella del satelital) y tractor rojo
  bx(g, 74.1, 0, -606.5, 6.8, 2.6, 3, '#9aa1a6'); bx(g, 74.1, 2.6, -606.5, 7.1, .12, 3.3, '#7f878d'); bx(g, 72, 0, -608.03, .9, 2, .05, '#5b6168');
  addCol(70.7, -608, 77.5, -605);
  { const t = group(86.5, -609, Math.PI / 2);
    bx(t, 0, .55, 0, 6, .4, 2.3, '#2b2b2b'); bx(t, 1.8, .9, 0, 2.2, 2.4, 2.4, '#b3261e'); bx(t, 1.85, 2.2, 0, 2.25, .7, 2.3, '#253039'); bx(t, 3.0, .6, 0, .2, 1.0, 2.3, '#9a9a9a');
    for (const x of [-2, -.8, 2.1]) for (const s of [-1, 1]) rueda(t, ruedaCam, x, .52, s * 1.05);
    addCol(85.2, -612.5, 87.8, -605.5); }
  mapRects.push([67, -624.5, 89.5, -587, '#a59e90'], [71, -620.9, 84, -618.3, '#f2f2ee']);
  // cortina de árboles oscuros del otro lado de Iriondo
  for (let k = 0; k < 18; k++){ const x = 16 + k * 4.6 + (hsh(k) - .5) * 1.5, z = -642.5 - hsh(k + 40) * 3; arbol(x, z, 1.15 + hsh(k + 80) * .45, ['#2f4f2a', '#3a5b30', '#2c4627'], k + 10); }

  mapLabels.push([30, -610, 'Shell']);
}
// Av. Centenario lado este, de la Shell a la esquina de Bolívar (fotos de Street View del usuario, en orden; huellas de edificios):
// subestación aérea sobre la vereda y cartel "Entrada" de la Shell · portón y cerco de chapa con el galpón de ladrillo atrás ·
// casa vieja revocada gris (ventana azul y ventana con reja) · casa blanca con frente de cerámica ocre y cenefa roja, murito con reja,
// puertas de madera y aire acondicionado · tapial blanco con la rueda de carreta · casa blanca de la esquina con tanques, jardín con
// agaves y arbustos · bloque gris y cerco de madera sobre Bolívar. Vereda de pasto con caminitos de cemento.
{
  const g = group(0, 0);
  const hsh = k => { const s = Math.sin(k * 91.7 + 17.3) * 43758.5453; return s - Math.floor(s); };
  const arbol = (x, z, s, cols, k) => {
    const th = 2.4 * s, cr = 2.4 * s * (.88 + hsh(k) * .25);
    trunks.add(x, 0, z, .45 * s, th, .45 * s, 0, '#5b4330');
    crowns.add(x, th + cr * .7, z, cr, cr * (.88 + hsh(k + 7) * .2), cr, hsh(k + 3) * 6, cols[k % cols.length]);
    crowns.add(x + (hsh(k + 5) - .5) * 1.6 * s, th + cr * 1.2, z + (hsh(k + 9) - .5) * 1.6 * s, cr * .7, cr * .7, cr * .7, hsh(k + 11) * 6, cols[(k + 1) % cols.length]);
    addCol(x - .3 * s, z - .3 * s, x + .3 * s, z + .3 * s);
  };
  const agave = (x, z, s) => { for (let k = 0; k < 6; k++){ const a = k * Math.PI / 3 + hsh(x + k) * .5; crowns.add(x + Math.cos(a) * .35 * s, .35 * s, z + Math.sin(a) * .35 * s, .55 * s, .14 * s, .16 * s, -a, '#6f9a5a'); } crowns.add(x, .5 * s, z, .18 * s, .45 * s, .18 * s, 0, '#5f8a4c'); };
  const reja = (x, z0, z1, y0, h) => { for (let z = z0 + .12; z < z1; z += .16) bx(g, x, y0, z, .03, h, .03, '#2a2626'); bx(g, x, y0 + h - .04, (z0 + z1) / 2, .05, .05, z1 - z0, '#2a2626'); };

  // vereda de pasto (como en las fotos) con caminitos de cemento hasta cada puerta
  flat.rect(9.2, -582, 13.5, -543.5, .2065, '#6f9a47');
  for (const [z0, z1] of [[-583.5, -579.5], [-576.2, -575], [-567.7, -566.3], [-554.4, -553.2]]) flat.rect(9.2, z0, 13.5, z1, .2075, '#c2bdb2');
  flat.rect(13.5, -582, 47, -543, .07, '#78a050');   // fondos de pasto

  // ---- subestación aérea: plataforma con el transformador entre dos postes de hormigón, crucetas con aisladores ----
  { const sx = 10.6, za = -581.3, zb = -578.4;
    for (const z of [za, zb]) poles.add(sx, 0, z, .38, 10, .38, 0, '#a9a69e');
    poles.add(sx + .9, 0, -575.4, .3, 9, .3, 0, '#a9a69e');
    bx(g, sx, 3.1, (za + zb) / 2, 1.4, .2, 4.4, '#7e786c');                 // plataforma
    for (const s of [-1, 1]) bx(g, sx + s * .65, 3.3, (za + zb) / 2, .08, .08, 4.2, '#6d675c');
    bx(g, sx, 3.3, (za + zb) / 2, 1.1, 1.5, 1.4, '#b8653e');                // transformador
    for (const k of [-1, 0, 1]) bx(g, sx - .58, 3.4, (za + zb) / 2 + k * .4, .12, 1.2, .3, '#a55a37');   // aletas
    for (const k of [-1, 0, 1]) cylIn(g, sx, 5.05, (za + zb) / 2 + k * .38, .07, .35, '#5a3a2a');
    for (const [y, w] of [[6.2, 4.6], [7.4, 3.8], [8.9, 2.6]]){
      bx(g, sx, y, (za + zb) / 2, .16, .16, w, '#8a7a62');
      for (let k = 0; k < 3; k++) cylIn(g, sx, y + .22, (za + zb) / 2 + (k - 1) * w * .4, .08, .28, '#3a2c26');
    }
    addCol(sx - .3, za - .3, sx + .3, za + .3); addCol(sx - .3, zb - .3, sx + .3, zb + .3); addCol(sx + .65, -575.7, sx + 1.15, -575.1); }
  // cartel "Entrada" de la Shell sobre una base de cemento
  { bx(g, 11.2, 0, -584.3, 1.3, .6, .9, '#d8d6d0'); poles.add(11.2, .6, -584.3, .08, 1.1, .08, 0, '#9a9a9a');
    for (const s of [-1, 1]) signIn(g, 'Entrada  →', 11.2, 1.3, -584.3 + s * .05, 1.0, .55, '#f3b21c', '#c8201c', s > 0 ? 0 : Math.PI);
    addCol(10.55, -584.75, 11.85, -583.85); }

  // ---- 1) portón y cerco de chapa acanalada con pilar, galpón de ladrillo atrás ----
  bx(g, 13.75, 0, -582, .08, 2.4, 5.4, '#c9ced2');
  for (let z = -584.55; z < -579.4; z += .3) bx(g, 13.7, 0, z, .04, 2.4, .05, '#aeb4b8');
  bx(g, 13.8, 0, -579.1, .45, 2.6, .45, '#e6e2d8'); bx(g, 13.8, 0, -584.9, .45, 2.6, .45, '#e6e2d8');
  bx(g, 21, 0, -582, 12, 4.6, 5.4, '#8f5a42'); bx(g, 21, 4.6, -582, 12.2, .2, 5.6, '#7a7671');
  addCol(13.5, -584.9, 27, -579.3);

  // ---- 2) casa vieja revocada gris, ventana de marco azul y ventana con reja ----
  bx(g, 17.7, 0, -576.05, 8.4, 3.1, 5.9, '#a39d90'); bx(g, 17.7, 3.1, -576.05, 8.6, .25, 6.1, '#9a9488');
  for (const [z, h, w] of [[-578.4, .5, 1.4], [-575.1, .4, .9], [-573.7, .35, 1.1]]) bx(g, 13.47, .3, z, .04, h, w, '#8b5b45');   // revoque caído con ladrillo
  bx(g, 13.46, 1.2, -577, .05, 1.0, .9, '#2b5fa8'); bx(g, 13.44, 1.28, -577, .03, .84, .74, '#7aa0c8');
  bx(g, 13.46, 1.0, -574.3, .05, 1.2, 1.6, '#3a3d3e'); reja(13.4, -575.1, -573.5, 1.0, 1.2);
  bx(g, 13.46, 0, -575.6, .05, 2.1, .9, '#6b5a48');
  bx(g, 25, 0, -574.1, 5.2, 2.6, 8, '#9c9890'); bx(g, 25, 2.6, -574.1, 5.4, .15, 8.2, '#8a8781');   // galponcito del fondo
  addCol(13.5, -579, 22, -573.1); addCol(22.4, -578.1, 27.6, -570.1);

  // ---- 3) casa blanca con frente de cerámica ocre y cenefa roja, patio de baldosas rojas, murito con reja ----
  { const fx = 16.6, z0 = -572.7, z1 = -561.9, zc = (z0 + z1) / 2;
    flat.rect(13.5, z0, fx, z1, .08, '#b55a3e');
    bx(g, 20.4, 0, zc, 7.6, 3.0, z1 - z0, '#f1ede4');
    bx(g, fx - .05, 2.25, zc, .1, .85, z1 - z0, '#d9a77a');                          // cerámica ocre arriba
    for (let z = z0 + .3; z < z1; z += .45) bx(g, fx - .11, 2.25, z, .02, .85, .03, '#c4936a');
    bx(g, fx - .2, 2.0, zc, .4, .25, z1 - z0 + .3, '#c8502e');                       // cenefa roja
    bx(g, 20.4, 3.0, zc, 7.8, .45, z1 - z0 + .2, '#d29a6e');
    bx(g, fx - .04, 0, -570.4, .06, 2.0, 1.7, '#6a4128'); reja(fx - .1, -571.3, -569.5, 0, 2.0);   // puerta doble de madera con reja
    bx(g, fx - .04, 0, -567.3, .06, 2.0, 1.0, '#6a4128');                                           // puerta
    bx(g, fx - .04, .9, -563.8, .06, 1.25, 1.5, '#3a2a20'); reja(fx - .1, -564.6, -563, .9, 1.25);  // ventana con reja
    bx(g, fx - .2, 2.05, -565.3, .3, .5, .8, '#f4f4f2');                                            // aire acondicionado
    // murito blanco con reja roja y negra, portoncito frente a la puerta
    for (const [a, b] of [[z0, -568.1], [-566.5, z1]]){
      bx(g, 13.7, 0, (a + b) / 2, .25, .5, b - a, '#f2f0ea'); bx(g, 13.7, .5, (a + b) / 2, .28, .06, b - a, '#b5452e');
      reja(13.7, a, b, .56, .55);
      for (let z = a; z <= b + .01; z += 2.3) bx(g, 13.7, 0, Math.min(z, b), .32, 1.15, .32, '#f2f0ea');
      addCol(13.55, a, 13.85, b);
    }
    bx(g, 13.7, 0, -567.3, .05, 1.0, 1.5, '#2a2626');
    addCol(fx, z0, 24.2, z1); }

  // ---- 4) tapial blanco con la rueda de carreta y una palmerita ----
  bx(g, 14.3, 0, -560.1, .25, 2.2, 3.6, '#f1efe8'); addCol(14.15, -561.9, 14.45, -558.3);
  { const w = new THREE.Mesh(new THREE.TorusGeometry(.55, .05, 6, 20), lam({ color: 0xf6f6f2 })); w.position.set(14.13, 1.3, -560.1); w.rotation.y = Math.PI / 2; scene.add(w);
    for (let k = 0; k < 4; k++) bx(g, 14.13, 1.3, -560.1, .04, 1.05, .04, '#f6f6f2', k * Math.PI / 4); }
  palmTrunks.add(15.8, 0, -559.6, .25, 1.6, .25, 0, '#7a6a4a'); crowns.add(15.8, 1.9, -559.6, 1.0, .35, 1.0, 0, '#5f8a3c');
  bx(g, 26, 0, -560.1, 2.4, 2.2, 1.4, '#e8e6e0');   // piecita del fondo

  // ---- 5) casa blanca de la esquina: techo plano con borde crema, tanques, dos ventanas con reja y puerta; jardín con agaves ----
  { const fx = 15.1, z0 = -558.3, z1 = -548.8, zc = (z0 + z1) / 2;
    bx(g, 21.4, 0, zc, 12.6, 3.0, z1 - z0, '#f3f2ee');
    bx(g, 21.4, 3.0, zc, 12.8, .45, z1 - z0 + .2, '#ddd2a8');
    for (const z of [-556.4, -550.9]){ bx(g, fx - .04, 1.0, z, .06, 1.15, 1.4, '#3a3f44'); reja(fx - .1, z - .75, z + .75, 1.0, 1.15); }
    bx(g, fx - .04, 0, -553.8, .06, 2.05, .9, '#f7f7f4'); bx(g, fx - .07, .25, -553.8, .03, 1.2, .5, '#cfd6dc');
    bx(g, 21.4, 1.0, z1 + .04, 1.4, 1.1, .06, '#3a3f44');   // ventana sobre Bolívar
    for (const [x, z] of [[18.5, -551], [24.5, -556.5]]){ cylIn(g, x, 3.95, z, .5, .95, '#f4f4f2'); }
    addCol(fx, z0, 27.7, z1);
    flat.rect(13.5, z1, 28, -543, .075, '#75a04a'); flat.rect(13.5, -558.3, fx, z1, .075, '#75a04a');
    crowns.add(14.4, 1.2, -557.4, 1.1, 1.25, 1.0, 0, '#3e6a2e'); addCol(13.8, -558, 15, -556.8);   // arbusto grande
    crowns.add(15, .7, -547, .8, .7, .8, 1, '#4b7a33');
    for (const [x, z, s] of [[16.4, -546, 1.1], [19.2, -545.4, 1], [22.6, -546.4, 1.2], [14.3, -549.6, .9], [25.5, -545.2, .9], [17.5, -548.1, .8]]) agave(x, z, s);
    bx(g, 13.9, 0, -545.5, .5, .55, 3, '#8f7d62');   // cantero de troncos
  }
  // bloque gris y cerco de madera (tablas verticales) sobre Bolívar
  bx(g, 29.3, 0, -543.3, 3.2, 3.1, .25, '#8f8f8a'); addCol(27.7, -543.45, 30.9, -543.15);
  { bx(g, 38.9, 0, -543.3, 16, 2.2, .1, '#a8875e');
    for (let x = 31.05; x < 46.9; x += .26) bx(g, x, 0, -543.37, .03, 2.25, .03, '#8c6e48');
    bx(g, 38.9, 2.0, -543.42, 16, .08, .06, '#7d6040');
    addCol(30.9, -543.45, 46.9, -543.15); }
  // medianeras y fondo
  for (const z of [-572.9, -558.3]) bx(g, 35.5, 0, z, 23, 1.9, .2, '#b9b2a4');
  bx(g, 46.9, 0, -562.5, .2, 1.9, 39, '#b9b2a4');
  addCol(24, -573, 47, -572.8); addCol(27.7, -558.4, 47, -558.2); addCol(46.8, -582, 47, -543);
  arbol(35, -576, 1.1, ['#4b7a30', '#557f35'], 1); arbol(39.5, -565, 1.0, ['#3f6b2a', '#5e8a3a'], 2); arbol(34.5, -550, 1.15, ['#466f2e', '#4b7a30'], 3); arbol(42.5, -553, .9, ['#8e8c70', '#9a9678'], 4);
  // esquina: cartel de calles, poste de luz y poste de cemento
  { const sg = group(12.6, -542.2); poleIn(sg, [0, 0, 0], [0, 2.9, 0], .04, '#1f3a8a');
    signIn(sg, 'Av. Centenario', 0, 2.75, .03, 1.2, .24, '#1f3a8a', '#ffffff', Math.PI / 2); signIn(sg, 'Bolívar', 0, 2.45, 0, 1.0, .24, '#1f3a8a', '#ffffff');
    addCol(12.5, -542.3, 12.7, -542.1); }
  poles.add(16.5, 0, -541.9, .3, 8.5, .3, 0, '#c4c2bb'); addCol(16.3, -542.1, 16.7, -541.7);
  mapRects.push([13.5, -584.9, 27, -579.3, '#8f5a42'], [13.5, -579, 22, -573.1, '#a39d90'], [16.6, -572.7, 24.2, -561.9, '#e8e8e8'], [15.1, -558.3, 27.7, -548.8, '#e8e8e8']);
}
/* ---------- Datos reales de OpenStreetMap (descargados de api.openstreetmap.org, © colaboradores de OSM, ODbL) ----------
   Coordenadas ya convertidas al mundo (x, z) con la calibración del documento. */
}
