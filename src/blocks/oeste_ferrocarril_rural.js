// Predio ferroviario (Estación, silos, mesa giratoria), RP 26-S, 25 de Mayo 1070, Acopio, Hogar, Iriondo/RP 10-S y Plazoleta del Inmigrante
export function buildOesteFerrocarrilRural(ctx) {
  const {
    AB, CA, G, GALP26_POLY, HOGAR_POLY, OSM, PLAZA_INM, R, REAL_BUILDINGS, RP26S_PTS, S, THREE, W, addBush, addCol, addFlowers, addTree, anims, bboxOf, box, boxIn, bx, canvas, colLocal, crowns, cylIn, darks, fillPoly, flat, gableIn, group, inPoly, lam, latLonToXZ, mapLabels, mapRects, osmPts, pick, plazaRects, poleIn, poles, railAngAt, railDist, railFrame, rnd, roofs, ruralExcl, scene, signIn, trims, trunks, walls
  } = ctx;

// Estación Peyrano y andén (lado SO, a ≈ 84)
{
  const [sx, sz] = latLonToXZ(-33.5394806, -60.8067806), [px, pz] = latLonToXZ(-33.5396081, -60.8065863), ang = railAngAt(85);
  const pg = group(px, pz, ang); bx(pg, 0, 0, 0, 4.5, .9, 80, '#bdb6a8'); bx(pg, -2.1, .9, 0, .3, .02, 80, '#f2c21b');
  const g = group(sx, sz, ang);
  bx(g, 0, 0, 0, 8, 5, 26, '#e9d9b8'); bx(g, 0, 0, 0, 8.3, 1, 26.3, '#a5795a');
  gableIn(g, 0, 5, 0, 27, 2.4, 9.6, '#7a3229', Math.PI/2);
  for (const z of [-9, -4, 4, 9]) for (const s of [-1, 1]) bx(g, s * 4.05, 1.1, z, .1, 2.4, 1.4, '#3a2f28');
  signIn(g, 'PEYRANO', -4.2, 4.1, 0, 4, .6, '#1d1d1d', '#ffffff', -Math.PI/2);
  signIn(g, 'PEYRANO', 4.2, 4.1, 0, 4, .6, '#1d1d1d', '#ffffff', Math.PI/2);
  colLocal(g, -4.2, -13.2, 4.2, 13.2, '#c9b7a0');
  mapLabels.push([sx, sz, 'Estación']);
}
// batería de 10 silos cilíndricos de chapa galvanizada del semillero (2 filas de 5)
{
  const [x, z] = latLonToXZ(-33.5399000, -60.8054800), g = group(x, z, railAngAt(121));
  const body = new THREE.CylinderGeometry(3.6, 3.6, 15, 20).translate(0, 7.5, 0), top = new THREE.ConeGeometry(3.8, 3, 20).translate(0, 1.5, 0);
  for (let r = 0; r < 2; r++) for (let c = 0; c < 5; c++){
    const m = new THREE.Mesh(body, lam({ color: 0xc3c8cd })); m.position.set(-4 + r * 8, 0, -16 + c * 8); m.castShadow = true; g.add(m);
    const t = new THREE.Mesh(top, lam({ color: 0xaeb3b8 })); t.position.set(-4 + r * 8, 15, -16 + c * 8); g.add(t);
  }
  bx(g, 0, 18.2, 0, 1.2, 1.2, 36, '#8f969c');
  colLocal(g, -8, -20, 8, 20, '#c3c8cd');
}
// mesa giratoria ferroviaria
{
  const f = railFrame(149), side = railDist(...AB(f.p[0] - f.tz * 10, f.p[1] + f.tx * 10)) < 0 ? 1 : -1;
  let [x, z] = latLonToXZ(-33.5408666, -60.8052359); x -= f.tz * side * 14; z += f.tx * side * 14;
  const g = group(x, z);
  const pit = new THREE.Mesh(new THREE.CylinderGeometry(9, 9, .12, 40), lam({ color: 0x5a5246 })); pit.position.y = .24; g.add(pit);
  const rim = new THREE.Mesh(new THREE.TorusGeometry(9, .25, 6, 40).rotateX(Math.PI/2), lam({ color: 0x9a948a })); rim.position.y = .3; g.add(rim);
  const br = new THREE.Group(); br.position.y = .35; g.add(br); boxIn(br, 0, .25, 0, 2.4, .5, 18, '#4a4038');
  for (const s of [-.75, .75]) boxIn(br, s, .55, 0, .12, .1, 18, '#b9bcc2');
  br.rotation.y = f.ang; anims.push((t, dt) => { br.rotation.y += dt * .05; });
  mapRects.push([x - 9, z - 9, x + 9, z + 9, '#5a5246']);
}

/* ---------- Afueras: antena y cementerio ---------- */
{
  const [x, z] = latLonToXZ(-33.5374462, -60.8094625), g = group(x, z), H = 46;
  const legs = [0, 1, 2].map(k => k * Math.PI * 2 / 3);
  for (let s = 0; s < H; s += 5){
    const r0 = 2.6 * (1 - s / H) + .4, r1 = 2.6 * (1 - Math.min(H, s + 5) / H) + .4, col = (s / 5) % 2 ? '#e8e8e8' : '#d8261f';
    legs.forEach((t, k) => {
      poleIn(g, [Math.cos(t) * r0, s, Math.sin(t) * r0], [Math.cos(t) * r1, Math.min(H, s + 5), Math.sin(t) * r1], .09, col);
      const t2 = legs[(k + 1) % 3]; poleIn(g, [Math.cos(t) * r0, s, Math.sin(t) * r0], [Math.cos(t2) * r1, Math.min(H, s + 5), Math.sin(t2) * r1], .04, col);
    });
  }
  const lamp = new THREE.Mesh(new THREE.SphereGeometry(.4, 10, 8), new THREE.MeshBasicMaterial({ color: 0xff3020 })); lamp.position.y = H + .3; g.add(lamp);
  anims.push(t => { lamp.visible = Math.sin(t * 3) > 0; });
  addCol(x - 2.5, z - 2.5, x + 2.5, z + 2.5); mapRects.push([x - 3, z - 3, x + 3, z + 3, '#d8261f']); mapLabels.push([x, z, 'Antena']);
}

/* ---------- RP 26-S: el camino real al cementerio (Street View + dibujo del usuario sobre la foto satelital) ----------
   Ruta de tierra; del lado del cementerio: banquina, cuneta, hilera de plátanos, senderito peatonal y alambrado;
   al arrancar, el galpón de ladrillo con su entrada sobre una alcantarilla con barandas; del otro lado, postes de teléfono.
   El cementerio tiene el frente sobre la ruta: explanada de ripio con cipreses, muro blanco y portón. */
const RP26_AT = d => {
  let acc = 0;
  for (let i = 0; i < RP26S_PTS.length - 1; i++){
    const [ax, az] = RP26S_PTS[i], [bx2, bz] = RP26S_PTS[i + 1], l = Math.hypot(bx2 - ax, bz - az);
    if (d <= acc + l || i === RP26S_PTS.length - 2){ const k = (d - acc) / l; return [ax + (bx2 - ax) * k, az + (bz - az) * k, (bx2 - ax) / l, (bz - az) / l]; }
    acc += l;
  }
};
// punto a "d" metros por la ruta (desde el pueblo) y "t" metros al costado (t > 0 = lado del cementerio); ry = giro con +x a lo largo de la ruta
const RP26_F = (d, t) => { const [x, z, ux, uz] = RP26_AT(d); return [x + uz * t, z - ux * t, Math.atan2(-uz, ux)]; };
{
  const D1 = Math.hypot(RP26S_PTS[1][0] - RP26S_PTS[0][0], RP26S_PTS[1][1] - RP26S_PTS[0][1]);
  const [, , ux, uz] = RP26_AT(D1 + 1), NX = uz, NZ = -ux, P1 = RP26S_PTS[1];
  const toDT = (x, z) => [D1 + (x - P1[0]) * ux + (z - P1[1]) * uz, (x - P1[0]) * NX + (z - P1[1]) * NZ];
  const xz = p => [p[0], p[1]];
  const line = (d0, d1, step = 4) => { const r = []; for (let d = d0; d < d1; d += step) r.push(xz(RP26_F(d, 0))); r.push(xz(RP26_F(d1, 0))); return r; };
  const segCol = (a, b, r) => { const l = Math.hypot(b[0] - a[0], b[1] - a[1]) || 1; for (let k = 0; k <= l; k += .7){ const x = a[0] + (b[0] - a[0]) * k / l, z = a[1] + (b[1] - a[1]) * k / l; addCol(x - r, z - r, x + r, z + r); } };

  // --- el polígono de OSM del cementerio queda pegado a la ruta: se corre 12 m hacia adentro (en la foto el muro está a ~15 m del centro de la ruta)
  const SH = 12;
  let raw = OSM.cemetery.length ? osmPts(OSM.cemetery[0].p) : [];
  if (raw.length !== 4) raw = [[-875.7, 9.9], [-800.1, 34.9], [-802.2, -34.5], [-872.3, -56.8]];
  const poly = raw.map(([x, z]) => [x + NX * SH, z + NZ * SH]);
  let fi = 0, best = 1e9;
  for (let i = 0; i < 4; i++){ const t = toDT(...poly[i])[1] + toDT(...poly[(i + 1) % 4])[1]; if (t < best){ best = t; fi = i; } }
  let iA = fi, iB = (fi + 1) % 4; if (toDT(...poly[iA])[0] > toDT(...poly[iB])[0]) [iA, iB] = [iB, iA];
  const A = poly[iA], B = poly[iB];                                   // frente: A = esquina del lado del pueblo (SE), B = esquina NO
  const CA = poly[(iA + 1) % 4] === B ? poly[(iA + 3) % 4] : poly[(iA + 1) % 4];   // fondo detrás de A
  const DB = poly[(iB + 1) % 4] === A ? poly[(iB + 3) % 4] : poly[(iB + 1) % 4];   // fondo detrás de B
  const dA = toDT(...A)[0], dB = toDT(...B)[0], tW = (toDT(...A)[1] + toDT(...B)[1]) / 2, dG = (dA + dB) / 2;
  // coordenadas locales en metros: x a lo largo del frente desde la esquina SE, y hacia adentro desde el muro del frente
  const LF = (Math.hypot(B[0] - A[0], B[1] - A[1]) + Math.hypot(DB[0] - CA[0], DB[1] - CA[1])) / 2;
  const D = (Math.hypot(CA[0] - A[0], CA[1] - A[1]) + Math.hypot(DB[0] - B[0], DB[1] - B[1])) / 2;
  const Q = (xl, yl) => { const u = xl / LF, v = yl / D;
    return [(1 - v) * ((1 - u) * A[0] + u * B[0]) + v * ((1 - u) * CA[0] + u * DB[0]), (1 - v) * ((1 - u) * A[1] + u * B[1]) + v * ((1 - u) * CA[1] + u * DB[1])]; };
  const xg = LF / 2, M = Q(xg, 0);
  const fu = [(B[0] - A[0]) / Math.hypot(B[0] - A[0], B[1] - A[1]), (B[1] - A[1]) / Math.hypot(B[0] - A[0], B[1] - A[1])];
  const ryF = Math.atan2(-fu[1], fu[0]);   // grupos con +z mirando a la ruta
  window.__cem = { A, B, CA, DB, M, LF, D };
  { const pts = [...raw, ...poly, xz(RP26_F(dA - 3, 3)), xz(RP26_F(dA + 122, 3)), xz(RP26_F(dA + 122, tW + 34))], ex = bboxOf(pts);
    ruralExcl.push([ex[0] - 4, ex[1] - 4, ex[2] + 4, ex[3] + 4]); }

  // --- banquinas, cuneta, senderito
  flat.ribbon(line(14, dA + 160), 11.5, .06, '#6f8f45', -10.25);   // banquina de pasto del lado del cementerio
  flat.ribbon(line(14, dA + 160), 5, .06, '#7a9147', 7);           // banquina del otro lado
  flat.ribbon(line(14, dA - 3), 2.6, .068, '#4f6b33', -7);         // cuneta
  flat.ribbon(line(14, dA - 3), .9, .07, '#5f5a3e', -7);
  flat.ribbon(line(18, dA + 1), 1.9, .074, '#a8825a', -12.6);      // senderito peatonal hasta el cementerio

  // --- galpón de ladrillo al arrancar la ruta (huella real de Overture) con su entrada sobre la alcantarilla
  { const [x0, z0, x1, z1] = bboxOf(GALP26_POLY), g = group((x0 + x1) / 2, (z0 + z1) / 2), w = x1 - x0 - 3.5, dd = z1 - z0 - 4;
    boxIn(g, 0, 2.5, 0, w, 5, dd, '#9a5f45');
    gableIn(g, 0, 5, 0, w + .7, 1.2, dd + .7, '#b9bdc0');
    boxIn(g, 0, 2, -dd / 2 - .03, 5, 4, .08, '#6f7377');
    colLocal(g, -w / 2, -dd / 2, w / 2, dd / 2, '#9a5f45'); }
  { const dL = 26;
    flat.ribbon([xz(RP26_F(dL, 4)), xz(RP26_F(dL, 22))], 5, .085, '#a98a5f');
    for (const s of [-1, 1]){
      const [x, z, ry] = RP26_F(dL + s * 2.8, 7);
      trims.add(x, 0, z, .35, .55, 3.4, ry, '#c9c6bd');                       // cabezal de hormigón de la alcantarilla
      for (const tt of [5.6, 8.4]){ const [px, pz] = RP26_F(dL + s * 2.8, tt); poles.add(px, .55, pz, .05, .75, .05, 0, '#8d8f8c'); }
      trims.add(x, 1.28, z, .06, .06, 2.9, ry, '#8d8f8c');                     // baranda de caño
      addCol(x - .3, z - .3, x + .3, z + .3);
    }
  }
  // arco de caño al empezar el senderito
  { const [x, z, ry] = RP26_F(31, 12.6), g = group(x, z, ry);
    for (const s of [-1, 1]) cylIn(g, 0, 1.25, s * 1.15, .05, 2.5, '#c8c8c4');
    boxIn(g, 0, 2.5, 0, .08, .08, 2.4, '#c8c8c4');
    boxIn(g, 0, 2.95, 0, .05, .55, 1.5, '#6b4a2a'); }

  // --- hilera de plátanos (lado del cementerio), alambrado detrás del senderito, postes de teléfono del otro lado
  const PLAT = ['#7d9a46', '#6f8f3e', '#8aa552', '#93a04a', '#b08a3e', '#a5773a'];
  for (let d = 33; d < dA - 3; d += R(5.5, 7)){
    const [x, z] = RP26_F(d, R(9.5, 10.5)), s = R(.9, 1.15), th = 5 * s, c = pick(PLAT);
    trunks.add(x, 0, z, .55 * s, th, .55 * s, 0, '#a39a82');
    for (let k = 0; k < 3; k++){ const cr = R(2.6, 3.3) * s; crowns.add(x + R(-1.2, 1.2), th + 1.2 + k * 1.7 * s, z + R(-1.2, 1.2), cr, cr * R(.8, 1), cr, R(0, 6), c); }
    addCol(x - .4, z - .4, x + .4, z + .4);
  }
  { let prev = null;
    for (let d = 40; d <= dA - 2; d += 3.2){
      const [x, z] = RP26_F(d, 14.8);
      poles.add(x, 0, z, .09, 1.35, .09, 0, '#7a6448'); addCol(x - .1, z - .1, x + .1, z + .1);
      if (prev) for (const y of [.5, .85, 1.2]) trims.add((x + prev[0]) / 2, y, (z + prev[1]) / 2, Math.hypot(x - prev[0], z - prev[1]), .025, .025, Math.atan2(-(z - prev[1]), x - prev[0]), '#9a9a95');
      prev = [x, z];
    } }
  { let prev = null;
    for (let d = 30; d < dA + 160; d += 55){
      const tops = [];
      for (const tt of [-8.2, -9]){ const [x, z] = RP26_F(d, tt); poles.add(x, 0, z, .16, 8.6, .16, 0, '#6b5a45'); tops.push([x, z]); addCol(x - .2, z - .2, x + .2, z + .2); }
      const [mx, mz, ry] = RP26_F(d, -8.6);
      for (const y of [7.6, 6.9]) trims.add(mx, y, mz, .12, .14, 1.5, ry, '#6b5a45');
      if (prev) for (let k = 0; k < 2; k++){ const a = prev[k], b = tops[k]; trims.add((a[0] + b[0]) / 2, 7.75, (a[1] + b[1]) / 2, Math.hypot(b[0] - a[0], b[1] - a[1]), .03, .03, Math.atan2(-(b[1] - a[1]), b[0] - a[0]), '#2b2b2b'); }
      prev = tops;
    } }

  // --- explanada de ripio frente al muro, con la hilera de cipreses (hueco frente al portón)
  flat.quad(xz(RP26_F(dA, 4.6)), xz(RP26_F(dB, 4.6)), B, A, .07, '#d6cdb6');
  for (const [d0, d1] of [[dA, dG - 3], [dG + 3, dB + 9]]) flat.quad(xz(RP26_F(d0, 4.6)), xz(RP26_F(d1, 4.6)), xz(RP26_F(d1, 8.8)), xz(RP26_F(d0, 8.8)), .075, '#66863e');
  const cypress = (x, z, h) => { trunks.add(x, 0, z, .35, 1.4, .35, 0, '#4a3a2a'); const c = pick(['#2c4a26', '#34552b', '#294423']);
    crowns.add(x, h * .42, z, 1.35, h * .36, 1.35, R(0, 6), c); crowns.add(x, h * .7, z, .95, h * .32, .95, R(0, 6), c); addCol(x - .4, z - .4, x + .4, z + .4); };
  for (let d = dA + 1.5; d < dB + 8; d += 3.4){ if (Math.abs(d - dG) < 3.2) continue; const [x, z] = RP26_F(d, 6.8); cypress(x, z, R(10, 12.5)); }
  // explanada al NO del cementerio, con los dos galpones de nichos de afuera
  flat.quad(xz(RP26_F(dB + 1, 4.6)), xz(RP26_F(dA + 120, 4.6)), xz(RP26_F(dA + 120, tW + 33)), xz(RP26_F(dB + 1, tW + 33)), .066, '#cfc6ae');

  // --- galpones de nichos ("paredes llenas de cajones")
  const nichoTex = (() => { const c = document.createElement('canvas'); c.width = 256; c.height = 192; const x = c.getContext('2d');
    x.fillStyle = '#d9d4c8'; x.fillRect(0, 0, 256, 192);
    for (let r = 0; r < 4; r++) for (let k = 0; k < 5; k++){ const px = 4 + k * 50.4, py = 4 + r * 47;
      x.fillStyle = pick(['#eeeae2', '#e4dfd4', '#cfc8ba', '#f4f1ea', '#bfb8aa']); x.fillRect(px, py, 46, 42);
      x.strokeStyle = '#9d968a'; x.lineWidth = 2; x.strokeRect(px, py, 46, 42);
      x.fillStyle = '#7a7266'; x.fillRect(px + 13, py + 11, 20, 3); x.fillRect(px + 16, py + 17, 14, 2);
      if (rnd() < .35){ x.fillStyle = pick(['#d8344a', '#f2c230', '#e86fa8', '#ffffff', '#8b5cc7']); x.beginPath(); x.arc(px + 37, py + 31, 5, 0, 7); x.fill(); x.fillStyle = '#3b6a2a'; x.fillRect(px + 36, py + 35, 2, 6); }
    }
    const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; t.wrapS = THREE.RepeatWrapping; t.anisotropy = 4; return t; })();
  const gallery = (p0, p1, h = 3) => {
    const len = Math.hypot(p1[0] - p0[0], p1[1] - p0[1]), ry = Math.atan2(-(p1[1] - p0[1]), p1[0] - p0[0]);
    const g = group((p0[0] + p1[0]) / 2, (p0[1] + p1[1]) / 2, ry);
    const tex = nichoTex.clone(); tex.needsUpdate = true; tex.repeat.set(len / 4, 1);
    const face = lam({ map: tex }), plain = lam({ color: '#e2ddd2' });
    const body = new THREE.Mesh(new THREE.BoxGeometry(len, h, 2.4), [plain, plain, plain, plain, face, face]);
    body.position.y = h / 2; body.castShadow = body.receiveShadow = true; g.add(body);
    boxIn(g, 0, h + .35, 0, len + 1.2, .14, 5.4, '#a9adb0');                                     // techo de chapa
    for (let k = -len / 2; k <= len / 2 + .01; k += len / Math.max(1, Math.round(len / 4))) for (const s of [-1, 1]) boxIn(g, k, (h + .3) / 2, s * 2.55, .16, h + .3, .16, '#cfc9bd');
    segCol(p0, p1, 1.3);
    const bb = bboxOf([p0, p1]); mapRects.push([bb[0] - 1.5, bb[1] - 1.5, bb[2] + 1.5, bb[3] + 1.5, '#cfc9bd']);
  };
  gallery(xz(RP26_F(dA + 99, tW + 10)), xz(RP26_F(dA + 115, tW + 10)));    // afuera, paralelo a la ruta
  gallery(xz(RP26_F(dA + 79, tW + 13)), xz(RP26_F(dA + 79, tW + 29)));     // afuera, hacia adentro

  // --- muro blanco (con el hueco del portón en el frente)
  const WALL = '#f1eee6';
  const wallTo = (a, b) => {
    const l = Math.hypot(b[0] - a[0], b[1] - a[1]); if (l < .3) return;
    const cx = (a[0] + b[0]) / 2, cz = (a[1] + b[1]) / 2, ry = Math.atan2(-(b[1] - a[1]), b[0] - a[0]);
    trims.add(cx, 0, cz, l, 2.5, .35, ry, WALL); trims.add(cx, 2.5, cz, l + .1, .14, .5, ry, '#e2ddd2');
    segCol(a, b, .4);
  };
  wallTo(A, [M[0] - fu[0] * 2.6, M[1] - fu[1] * 2.6]); wallTo([M[0] + fu[0] * 2.6, M[1] + fu[1] * 2.6], B);
  wallTo(B, DB); wallTo(DB, CA); wallTo(CA, A);
  // portón: pilares color arena, dintel con cruz, rejas de hierro abiertas hacia adentro, macetones verdes
  { const g = group(M[0], M[1], ryF), TAN = '#cfae72', IRON = '#2a2a2a';
    for (const s of [-1, 1]){
      boxIn(g, s * 2.15, 2.1, 0, .9, 4.2, .9, TAN);
      colLocal(g, s * 2.15 - .45, -.45, s * 2.15 + .45, .45, null);
      for (let k = 0; k < 8; k++) boxIn(g, s * 1.55, 1.1, -.25 - k * .2, .05, 2.2, .05, IRON);
      for (const y of [.15, 1.1, 2.15]) boxIn(g, s * 1.55, y, -.95, .06, .07, 1.6, IRON);
      for (const x of [3.5, 4.8, 6.1]){ cylIn(g, s * x, .45, 1, .45, .9, '#a9cdb0'); cylIn(g, s * x, .92, 1, .38, .05, '#4a3a2a'); }
    }
    boxIn(g, 0, 4.55, 0, 5.2, .7, .95, TAN);
    boxIn(g, 0, 5.15, 0, 2.2, .5, .7, TAN);
    boxIn(g, 0, 5.95, 0, .16, 1.1, .16, TAN); boxIn(g, 0, 6.1, 0, .65, .16, .16, TAN);
    signIn(g, 'CEMENTERIO', 0, 4.55, .48, 4.6, .55, TAN, '#3a2e1e');
    signIn(g, 'CEMENTERIO DE PEYRANO', 9, 1.6, .19, 2.6, .55, '#e9e4d8', '#4a4030');
  }

  // --- adentro (según el dibujo): fila de casitas de familias contra todos los muros, camino perimetral,
  //     camino central desde el portón; mitad SE = tumbas en el piso; mitad NO = filas de casitas y 2 galpones de nichos
  fillPoly(poly, .05, '#a9a48e');
  const PATH = '#ddd5bf';
  const pathL = (xa, ya, xb, yb, w = 2.8) => { const pts = []; for (let k = 0; k <= 8; k++) pts.push(Q(xa + (xb - xa) * k / 8, ya + (yb - ya) * k / 8)); flat.ribbon(pts, w, .062, PATH); };
  const PR = 5.5;   // camino perimetral
  pathL(PR - 1.4, PR, LF - PR + 1.4, PR); pathL(PR - 1.4, D - PR, LF - PR + 1.4, D - PR); pathL(PR, PR, PR, D - PR); pathL(LF - PR, PR, LF - PR, D - PR);
  pathL(xg, 0, xg, D - PR, 3.2);           // central, desde el portón
  pathL(xg - 8, PR, xg - 8, D - PR, 2.4);  // borde de la zona de tumbas
  pathL(xg + 8, PR, xg + 8, D - PR, 2.4);
  pathL(xg + 21.5, PR, xg + 21.5, D - PR, 2.4);
  const CAS = ['#f2efe8', '#e9e4d8', '#ddd8cc', '#d9d0c4', '#efe3d3', '#cfd3d6', '#e8d9d2'];
  const casita = (x, z, fx, fz) => {
    const ry = Math.atan2(fx, fz), w = R(2.2, 2.7), d = R(2.7, 3.2), h = R(2.5, 3.1);
    walls.add(x, 0, z, w, h, d, ry, pick(CAS));
    if (rnd() < .55) roofs.add(x, h, z, d + .3, .7, w + .3, ry + Math.PI / 2, pick(['#bcb6aa', '#a9a49a', '#8e3b2f', '#d6d0c4']));
    else { const cxp = x + fx * (d / 2 - .3), czp = z + fz * (d / 2 - .3);
      trims.add(x, h, z, w + .25, .22, d + .25, ry, '#d6d0c4');
      trims.add(cxp, h + .22, czp, .12, .9, .12, ry, '#8a857b'); trims.add(cxp, h + .75, czp, .5, .1, .1, ry, '#8a857b'); }
    darks.add(x + fx * (d / 2 + .01), 0, z + fz * (d / 2 + .01), .95, 2, .05, ry, pick(['#3a3632', '#4a4038', '#2e3236']));
    addCol(x - 1.35, z - 1.35, x + 1.35, z + 1.35);
  };
  const row = (xa, ya, xb, yb, fxl, fyl, skip = () => false) => {
    const l = Math.hypot(xb - xa, yb - ya), n = Math.max(1, Math.floor(l / 3));
    for (let k = 0; k < n; k++){
      const t = (k + .5) / n, xl = xa + (xb - xa) * t, yl = ya + (yb - ya) * t;
      if (skip(xl, yl) || rnd() < .08) continue;
      const [x, z] = Q(xl, yl), [x2, z2] = Q(xl + fxl, yl + fyl), fl = Math.hypot(x2 - x, z2 - z);
      casita(x, z, (x2 - x) / fl, (z2 - z) / fl);
    }
  };
  // contra los muros (mirando al camino perimetral)
  row(1.5, 2.2, LF - 1.5, 2.2, 0, 1, xl => Math.abs(xl - xg) < 4);
  row(1.5, D - 2.2, LF - 1.5, D - 2.2, 0, -1);
  row(2.2, 4, 2.2, D - 4, 1, 0);
  row(LF - 2.2, 4, LF - 2.2, D - 4, -1, 0);
  // a los costados del camino central y en la mitad NO
  row(xg - 4.5, 8, xg - 4.5, D - 8, 1, 0);
  row(xg + 4.5, 8, xg + 4.5, D - 8, -1, 0, (xl, yl) => yl < 14);
  row(xg + 11.5, 8, xg + 11.5, D - 8, -1, 0);
  gallery(Q(xg + 16.5, 9), Q(xg + 16.5, D - 9));
  gallery(Q(xg + 26.5, 9), Q(xg + 26.5, D - 9));
  // panteón con cúpula al lado del portón (se ve desde la ruta)
  { const [x, z] = Q(xg + 5, 10.5), [x2, z2] = Q(xg + 4, 10.5), g = group(x, z, Math.atan2(x2 - x, z2 - z));
    boxIn(g, 0, 2.2, 0, 4.2, 4.4, 4.2, '#efe6d2'); boxIn(g, 0, 4.55, 0, 4.6, .3, 4.6, '#e0d6bf');
    cylIn(g, 0, 5.3, 0, 1.6, 1.2, '#efe6d2');
    const dome = new THREE.Mesh(new THREE.SphereGeometry(1.7, 20, 12, 0, Math.PI * 2, 0, Math.PI / 2), lam({ color: '#d9cfb8' }));
    dome.position.y = 5.9; dome.castShadow = true; g.add(dome);
    boxIn(g, 0, 8.05, 0, .14, .9, .14, '#cfae72'); boxIn(g, 0, 8.2, 0, .5, .12, .12, '#cfae72');
    boxIn(g, 0, 1.3, 2.12, 1.4, 2.6, .08, '#3a3530');
    colLocal(g, -2.1, -2.1, 2.1, 2.1, null); }
  // zona de tumbas en el piso (mitad SE)
  flat.quad(Q(9, 9), Q(xg - 9.5, 9), Q(xg - 9.5, D - 9), Q(9, D - 9), .056, '#7d9550');
  const GR = ['#bdb8ad', '#d9d5cc', '#a9a49a', '#e8e4dc', '#8f8a80'];
  for (let xl = 10.5; xl < xg - 10; xl += 2.4) for (let yl = 10.5; yl < D - 9.5; yl += 3.3){
    if (rnd() < .2) continue;
    const xx = xl + R(-.3, .3), yy = yl + R(-.3, .3), [x, z] = Q(xx, yy), [x2, z2] = Q(xx, yy + 1), fl = Math.hypot(x2 - x, z2 - z), fx = (x2 - x) / fl, fz = (z2 - z) / fl, ry = Math.atan2(fx, fz);
    trims.add(x, 0, z, .95, R(.18, .4), 2, ry, pick(GR));
    if (rnd() < .5) trims.add(x - fx * .9, 0, z - fz * .9, .8, R(.6, 1), .14, ry, pick(GR));
    else if (rnd() < .5){ trims.add(x - fx * .9, 0, z - fz * .9, .1, 1.1, .1, ry, '#6f6a60'); trims.add(x - fx * .9, .75, z - fz * .9, .55, .09, .09, ry, '#6f6a60'); }
    if (rnd() < .2) addFlowers(x, z);
  }
  const bb = bboxOf(poly); mapRects.push([...bb, '#8a9a7a']); mapLabels.push([...Q(xg, D / 2), 'Cementerio']);
}

/* =========================================================
   Edificios reales: huellas de techos de Overture Maps (release 2026-11-18, theme=buildings)
   convertidas al mundo (x, z) con la calibración del documento. Reemplazan a las casas al azar.
   Formato: [altura, pisos, clase, [x0, z0, x1, z1, ...]]
   ========================================================= */

{
  const ZC = -404.75, HW = 5.75, FD = 29;           // centro del frente del lote, medio ancho (11,5 m) y fondo (29 m)
  const G = group(-479.5, ZC, -Math.PI / 2);        // local: +lz = hacia la avenida (-x), +lx = hacia la canchita / Lavalle (+z) = la derecha en las fotos
  const Wd = (lx, lz) => [-479.5 - lz, ZC + lx];
  const rectL = (lx0, lz0, lx1, lz1, y, col) => { const [ax, az] = Wd(lx0, lz0), [bx2, bz] = Wd(lx1, lz1); flat.rect(Math.min(ax, bx2), Math.min(az, bz), Math.max(ax, bx2), Math.max(az, bz), y, col); };
  const OCRE = '#c8a06b', OCRE2 = '#d2ad7a', NEGRO = '#2a2c2e', MAD = '#b89c74';
  const tablas = (lx0, lz0, lx1, lz1, h, col = MAD) => {   // cerco de tablas verticales (o de cañas)
    const len = Math.hypot(lx1 - lx0, lz1 - lz0), along = Math.abs(lx1 - lx0) > Math.abs(lz1 - lz0);
    bx(G, (lx0 + lx1) / 2, 0, (lz0 + lz1) / 2, along ? len : .08, h, along ? .08 : len, col);
    for (let k = .15; k < len; k += .3){ const t = k / len, x = lx0 + (lx1 - lx0) * t, z = lz0 + (lz1 - lz0) * t; bx(G, x, 0, z, along ? .03 : .1, h + .05, along ? .1 : .03, '#9d845f'); }
    colLocal(G, Math.min(lx0, lx1) - .05, Math.min(lz0, lz1) - .05, Math.max(lx0, lx1) + .05, Math.max(lz0, lz1) + .05, null);
  };
  const muro = (lx0, lz0, lx1, lz1, h = 2.4) => { const cx = (lx0 + lx1) / 2, cz = (lz0 + lz1) / 2, sx = Math.max(.25, Math.abs(lx1 - lx0)), sz = Math.max(.25, Math.abs(lz1 - lz0)); bx(G, cx, 0, cz, sx, h, sz, OCRE); bx(G, cx, h, cz, sx + .05, .08, sz + .05, OCRE2); colLocal(G, cx - sx / 2, cz - sz / 2, cx + sx / 2, cz + sz / 2, null); };
  const XB0 = -24.75, XC1 = HW + 13;                // borde del baldío (línea de Monguillot) y borde de la canchita

  // --- piso: banquina con zanja, baldío de pasto seco, terreno de la casa, canchita pelada
  rectL(XB0, 0, XC1, 3.6, .05, '#7f9a4f');
  rectL(XB0, 2.0, XC1, 3.2, .064, '#4f6b33'); rectL(XB0, 2.4, XC1, 2.8, .066, '#5d5a3e');   // zanja
  rectL(XB0, -FD, -HW, 0, .05, '#a39a5a');
  for (let k = 0; k < 10; k++){ const lx = R(XB0 + .5, -HW - 3), lz = R(-FD + 1, -1); rectL(lx, lz, lx + R(1, 3), lz + R(.8, 2.5), .052, pick(['#8f8a50', '#b3a873', '#7d8f4c'])); }
  rectL(-HW, -FD, HW, 0, .05, '#6a9a45');
  rectL(HW, -FD, XC1, 0, .05, '#7d9a4a');
  for (let k = 0; k < 6; k++){ const lx = R(HW + 2, XC1 - 3), lz = R(-FD + 3, -5); rectL(lx, lz, lx + R(1.5, 3), lz + R(1, 2.5), .052, '#a89a6a'); }
  // entrada de dos huellas de cemento hacia el portón, ripio blanco, alcantarilla, buzón, poste de luz
  rectL(2.0, 0, 2.7, 3.6, .07, '#cfcac0'); rectL(4.0, 0, 4.7, 3.6, .07, '#cfcac0'); rectL(2.7, 0, 4.0, 3.6, .06, '#8d8a7a');
  rectL(.2, .5, 5.6, 1.9, .068, '#e2e0da');
  { const [x, z] = Wd(3.35, 2.6); const pg = group(x, z); poleIn(pg, [0, .22, -2.2], [0, .22, 2.2], .26, '#a5a29a'); }
  { const [x, z] = Wd(.4, 1.1); poles.add(x, 0, z, .04, 1.0, .04, 0, '#3a3a3a'); trims.add(x, 1.0, z, .3, .3, .45, 0, '#3a3a3a'); }
  { const [x, z] = Wd(6.3, 1.2); poles.add(x, 0, z, .14, 8.5, .14, 0, '#8a7a66'); trims.add(x - .6, 8.2, z, 1.4, .08, .08, 0, '#8a7a66'); trims.add(x - 1.3, 8.1, z, .35, .12, .35, 0, '#d8d4c8'); addCol(x - .15, z - .15, x + .15, z + .15); }

  // --- frente: tejido romboidal con cortaderas (delante de la casa), cerco de tablas, pilar ocre con buzón y portón corredizo gris (a la cochera)
  for (let lx = -HW; lx <= -1; lx += 2.4){ const [x, z] = Wd(lx, -.3); poles.add(x, 0, z, .04, 1.6, .04, 0, '#8d8f8c'); }
  { const p = new THREE.Mesh(new THREE.PlaneGeometry(4.85, 1.55), new THREE.MeshLambertMaterial({ color: 0x8d8f8c, transparent: true, opacity: .35, side: THREE.DoubleSide })); p.position.set(-3.33, .8, -.3); G.add(p); }
  bx(G, -3.33, 1.55, -.3, 4.85, .04, .04, '#8d8f8c'); colLocal(G, -HW, -.4, -.9, -.2, null);
  for (const [lx, lz] of [[-5, -1.2], [-4.3, -2.6], [-1.6, -1.3]]){ const [x, z] = Wd(lx, lz); for (let k = 0; k < 9; k++) trims.add(x + R(-.3, .3), 0, z + R(-.3, .3), .05, R(1.6, 2.6), .05, R(-.4, .4), '#cfc4a0'); crowns.add(x, 2.3, z, .5, .7, .5, 0, '#e8e0c4'); crowns.add(x, .7, z, .9, .7, .9, 0, '#7a8a4a'); }
  addBush(...Wd(-2.8, -2.4), 1.0, 0); addTree(...Wd(-3.2, -1.4), .7, false, ['#7d8f4c', '#8a9a55']);
  rectL(-.9, -.4, .6, -4, .06, '#cfcac0');                                       // caminito a la puerta
  tablas(-.9, -.3, .55, -.3, 1.9);
  bx(G, .85, 0, -.3, .6, 2.1, .6, OCRE); bx(G, .85, 1.2, -.02, .3, .25, .05, '#c9c4b8'); colLocal(G, .55, -.6, 1.15, 0, null);
  bx(G, 3.3, 0, -.3, 4.2, 1.95, .1, '#5a6066'); for (let x = 1.4; x < 5.3; x += .5) bx(G, x, 0, -.24, .03, 1.95, .03, '#4a5056');
  bx(G, 3.3, .97, -.24, 4.2, .04, .04, '#4a5056');                               // portón (sin colisión: se entra a la cochera)
  tablas(5.4, -.3, HW, -.3, 2.0);

  // --- casa ocre de techo plano, a todo el ancho (adelante del lado del baldío; la cochera ocupa la esquina del lado de la canchita)
  const F = -4, B = -15.7;                                                       // frente y contrafrente de la casa
  bx(G, -2.45, 0, (F - 7.6) / 2, 6.6, 3.1, 3.6, OCRE);                         // ala delantera (lado baldío): lz -4..-7.6
  bx(G, 0, 0, (-7.6 + B) / 2, 2 * HW, 3.1, -7.6 - B, OCRE);                      // cuerpo de atrás a todo el ancho: lz -7.6..-15.7
  bx(G, -2.45, 3.1, (F - 7.6) / 2, 6.7, .3, 3.7, OCRE2); bx(G, 0, 3.1, (-7.6 + B) / 2, 2 * HW + .1, .3, -7.6 - B + .1, OCRE2);
  bx(G, -2.1, .95, F + .03, 2.0, 1.25, .06, '#2f3a42'); for (let x = -3.0; x < -1.15; x += .14) bx(G, x, .95, F + .1, .03, 1.25, .03, '#3a3a3a');   // ventana enrejada
  bx(G, -2.1, 2.25, F + .05, 2.3, .12, .1, OCRE2);
  bx(G, .1, 0, F + .03, .95, 2.15, .06, '#6e5236');                              // puerta de entrada
  bx(G, -3.6, 3.4, -6.2, 1.5, 1.7, 1.3, OCRE); bx(G, -3.6, 5.1, -6.2, 1.6, .12, 1.4, OCRE2);   // torre con el tanque
  boxIn(G, -2.0, 4.3, -6.2, 1.1, .05, 1.9, '#2d3f5c', .6); cylIn(G, -2.0, 4.9, -6.9, .22, 1.9, '#e8e8e6', Math.PI / 2);   // calefón solar
  bx(G, 3.6, 0, -7.6 + .03, .95, 2.1, .06, '#6e5236');                           // puerta de la cochera a la casa
  colLocal(G, -HW, -7.6, .85, F, OCRE); colLocal(G, -HW, B, HW, -7.6, OCRE);
  // cochera techada (techo negro) entre el portón y la casa
  bx(G, 3.3, 2.55, -4, 4.9, .18, 7.4, NEGRO); for (const z of [-.6, -4]) bx(G, HW - .15, 0, z, .12, 2.55, .12, NEGRO);
  rectL(.85, -.4, HW, -7.6, .06, '#cfcac0');

  // --- galería a todo el ancho detrás de la casa: postes negros, cielorraso blanco, piso oscuro, mesa larga, lámparas de mimbre, barra con parrilla
  const GZ0 = B, GZ1 = B - 4.2;
  rectL(-HW, GZ0, HW, GZ1, .07, '#4a4d52');
  bx(G, 0, 2.85, (GZ0 + GZ1) / 2, 2 * HW, .14, GZ0 - GZ1, '#ecebe6');
  bx(G, 0, 2.65, GZ1, 2 * HW, .38, .14, NEGRO); bx(G, 0, 2.99, (GZ0 + GZ1) / 2, 2 * HW + .1, .05, GZ0 - GZ1 + .1, '#3a3d40');
  for (let x = -HW + .3; x <= HW; x += 3.7) bx(G, x, 0, GZ1 + .08, .12, 2.7, .12, NEGRO);
  for (const x of [-3, 3]) bx(G, x, 2.1, GZ1 + .05, 2.2, .5, .05, '#30353a');   // cortinas enrolladas
  bx(G, -.5, .72, -17.8, 3.4, .08, 1.0, '#7a5a3a'); for (const [x, z] of [[-1.9, -17.4], [-1.9, -18.2], [.9, -17.4], [.9, -18.2]]) bx(G, x, 0, z, .08, .72, .08, '#6a4a2e');
  for (const s of [-1, 1]) for (const x of [-1.7, -.9, -.1, .7]) { bx(G, x, 0, -17.8 + s * .75, .42, .46, .42, '#b08f63'); bx(G, x, .46, -17.8 + s * .95, .42, .45, .05, '#b08f63'); }
  for (const x of [-1.3, .3]){ const l = new THREE.Mesh(new THREE.CylinderGeometry(.22, .34, .45, 10, 1, true), lam({ color: 0x9a7a52, side: THREE.DoubleSide })); l.position.set(x, 2.2, -17.8); G.add(l); poleIn(G, [x, 2.42, -17.8], [x, 2.78, -17.8], .01, '#333333'); }
  bx(G, 3.6, 0, -18.2, 1.5, .45, .7, '#7a5a3a'); for (const x of [2.6, 4.6]) { bx(G, x, 0, -18.9, .7, .42, .7, '#a07a50'); bx(G, x, .42, -18.9, .7, .12, .7, '#e3ded4'); }   // sillones
  bx(G, -4.6, 0, -16.6, .7, 1.0, 1.9, OCRE2); bx(G, -4.6, 1.0, -16.6, .8, .05, 2.0, '#3a3632');   // barra
  bx(G, -4.8, 1.0, -15.85, 1.4, .8, .3, '#2b2b2b'); bx(G, -3.2, 1.0, -15.85, .6, .5, .3, '#4a4a4a');   // parrilla y horno en la pared
  colLocal(G, -4.95, -17.55, -4.25, -15.7, null);

  // --- patio: deck, pileta (lado del baldío), reposeras, parque con hamaca, árboles y matas
  const PZ0 = GZ1;
  rectL(-HW + .3, PZ0, 1.0, PZ0 - 1.5, .075, '#8a5a3a'); for (let x = -HW + .4; x < 1; x += .3) rectL(x, PZ0, x + .04, PZ0 - 1.5, .077, '#6e4a2e');
  rectL(-5.2, PZ0 - 1.5, -.6, -28.2, .08, '#e4dccb'); rectL(-4.8, PZ0 - 1.9, -1.0, -27.8, .09, '#4fbfd3'); rectL(-4.5, PZ0 - 2.2, -1.3, -27.5, .092, '#6fd0e0');
  for (const x of [.3, 1.2]) boxIn(G, x, .3, -23.5, .6, .05, 1.7, '#3e4246', .2);
  bx(G, -.4, 0, PZ0 - 1.3, .45, .4, .45, '#cfcac0');
  { const hx = 3.2, hz = -27.2; for (const sx of [-1, 1]) for (const sz of [-.6, .6]) poleIn(G, [hx + sx * 1.1, 0, hz + sz], [hx + sx * 1.1, 2.1, hz], .06, '#e2dccd');
    poleIn(G, [hx - 1.2, 2.1, hz], [hx + 1.2, 2.1, hz], .07, '#e2dccd'); poleIn(G, [hx - 1.2, 2.3, hz], [hx + 1.2, 2.3, hz], .05, '#e2dccd');
    bx(G, hx, .45, hz, 1.6, .08, .5, '#e2dccd'); bx(G, hx, .45, hz - .25, 1.6, .5, .05, '#e2dccd'); for (const s of [-.7, .7]) poleIn(G, [hx + s, .5, hz], [hx + s, 2.1, hz], .01, '#9a9a95');
    colLocal(G, hx - 1.3, hz - .7, hx + 1.3, hz + .7, null); }
  addTree(...Wd(1.2, -26.8), 1.0, false, ['#5e8a3a', '#6b8f3d', '#4b7a30']);
  for (const [lx, lz] of [[-5.2, -21], [-5.2, -24.5], [-3, -28.3], [4.9, -22], [4.9, -25], [5, -28]]){ const [x, z] = Wd(lx, lz); crowns.add(x, .45, z, .9, .6, .9, R(0, 6), pick(['#4c7a30', '#5e8a3a', '#3f6b2a'])); }
  for (let lz = -20.5; lz > -27; lz -= 1.3){ const [x, z] = Wd(5.1, lz); crowns.add(x, 1.2, z, 1.0, 1.4, .9, R(0, 6), '#3f6b2a'); }   // ligustro contra las cañas
  // muros ocres (fondo y lado del baldío), cerco de tablas adelante del lado del baldío, cerco de cañas del lado de la canchita
  muro(-HW, -FD - .1, HW, -FD + .1); muro(-HW - .1, F - 4, -HW + .1, -FD);
  tablas(-HW, -.3, -HW, F - 4, 1.9);
  tablas(HW, -.3, HW, -FD, 2.2, '#cdbb94');

  // --- canchita de al lado: dos arcos de madera enfrentados, techito para el auto adelante junto al cerco, alambrado con arbolitos y pinos
  const AX = (HW + XC1) / 2 + .8;
  for (const az of [-7.5, -26]){
    for (const s of [-1, 1]){ poleIn(G, [AX + s * 1.6, 0, az], [AX + s * 1.6, 1.9, az], .07, '#d8ccb0'); const [x, z] = Wd(AX + s * 1.6, az); addCol(x - .1, z - .1, x + .1, z + .1); }
    poleIn(G, [AX - 1.65, 1.9, az], [AX + 1.65, 1.9, az], .07, '#d8ccb0');
    for (const s of [-1, 1]) poleIn(G, [AX + s * 1.6, 0, az + (az > -15 ? 1 : -1)], [AX + s * 1.6, 1.9, az], .04, '#c9bd9f');
  }
  { const cx = HW + 2.2, cz = -2.8; for (const [dx, dz] of [[-1.5, -2.3], [1.5, -2.3], [-1.5, 2.3], [1.5, 2.3]]){ bx(G, cx + dx, 0, cz + dz, .12, 2.45, .12, '#6f6a62'); const [x, z] = Wd(cx + dx, cz + dz); addCol(x - .1, z - .1, x + .1, z + .1); }
    boxIn(G, cx, 2.5, cz, 3.4, .08, 5.0, '#d9d9d4', -.04); }
  for (let lz = -2; lz > -FD - 1; lz -= 3){ const [x, z] = Wd(XC1, lz); poles.add(x, 0, z, .07, 1.4, .07, 0, '#8a7458'); }
  for (const y of [.5, .9, 1.3]) bx(G, XC1, y, -FD / 2, .02, .02, FD, '#9a9a95');
  for (let lz = -4; lz > -FD; lz -= 4.5) addTree(...Wd(XC1 - .8, lz), .45, false, ['#6b8f3d', '#7a9a4a']);
  for (const [lx, lz, s] of [[XC1 - 1.5, -3, 1.5], [XC1 - 3.5, -27, 1.4]]) addTree(...Wd(lx, lz), s, false, ['#2c4a26', '#34552b', '#2f5a24']);
  mapLabels.push([...Wd(0, -10), 'Av. 25 de Mayo 1070']);
  plazaRects.push([-479.5, ZC + XB0, -479.5 + FD, ZC + XC1]);   // sin árboles ni casas al azar en el baldío, la casa y la canchita
}

// =========================================================================
// ESQUINA AV. 25 DE MAYO Y BV. LAVALLE (lado norte de Lavalle) — Street View y satélite del usuario
// Casa baja de ladrillo visto con frente a Lavalle, retirada detrás de un cerco de ligustro con alambre y una tranquera de
// madera con camino de ripio. De izquierda (25 de Mayo) a derecha: ala de techo de chapa casi plano con ventanal y aire,
// chimenea con tanquecito, y un volumen más alto a dos aguas. Pilar de ladrillo con el medidor y poste de luz junto al cerco.
// Sobre 25 de Mayo: fila de cipreses altos detrás del alambrado. Atrás: pileta ovalada y un pino alto.
// =========================================================================
{
  const g = group(0, 0);
  const X0 = -479.5, X1 = -449, Z0 = -386, ZF = -357, ZL = -350.4;   // lote: 25 de Mayo → vecino, fondo (canchita) → cerco → línea de Lavalle
  const LAD = '#a98f7d', LAD2 = '#8d7564', CHAPA = '#80868c', OSC = '#2f3a42', MAD = '#8a6a48';
  // --- piso: parque, banquina de pasto adelante del cerco, camino de ripio a la tranquera
  flat.rect(X0, Z0, X1, ZF, .05, '#6f9a45');
  flat.rect(X0, ZF, X1, ZL, .05, '#7fa04c');
  flat.rect(-462.2, -362, -459.2, -348.5, .07, '#9b9585');
  for (const x of [-461.6, -459.8]) flat.rect(x - .35, -361.5, x + .35, -348.6, .072, '#b3ad9c');   // huellas más claras
  // --- cerco del frente: postes de madera con alambre, ligustro detrás (menos en la tranquera y en la esquina, donde hay árboles)
  const alambre = (x0, z0, x1, z1) => {
    const len = Math.hypot(x1 - x0, z1 - z0), n = Math.max(1, Math.round(len / 2.6));
    for (let k = 0; k <= n; k++){ const t = k / n; poles.add(x0 + (x1 - x0) * t, 0, z0 + (z1 - z0) * t, .1, 1.35, .1, 0, MAD); }
    const along = Math.abs(x1 - x0) > Math.abs(z1 - z0);
    for (const y of [.45, .85, 1.25]) bx(g, (x0 + x1) / 2, y, (z0 + z1) / 2, along ? len : .02, .02, along ? .02 : len, '#8f918e');
  };
  const ligustro = (x0, z0, x1, z1, h = 1.6) => {
    const along = Math.abs(x1 - x0) > Math.abs(z1 - z0), len = Math.hypot(x1 - x0, z1 - z0);
    trims.add((x0 + x1) / 2, 0, (z0 + z1) / 2, along ? len : .9, h - .3, along ? .9 : len, 0, '#3d6a2c');
    for (let k = .6; k < len; k += 1.1){ const t = k / len; crowns.add(x0 + (x1 - x0) * t, h - .35, z0 + (z1 - z0) * t, .75, .45, .75, R(0, 6), pick(['#3b6a2a', '#466f2e', '#4c7a30'])); }
    addCol(Math.min(x0, x1) - .45, Math.min(z0, z1) - .45, Math.max(x0, x1) + .45, Math.max(z0, z1) + .45);
  };
  alambre(X0 + .2, ZF, -462.4, ZF); alambre(-459, ZF, X1 - .2, ZF);
  ligustro(-474, ZF - .7, -462.5, ZF - .7); ligustro(-458.8, ZF - .7, X1 - .5, ZF - .7);
  addCol(X0 + .1, ZF - .1, -474, ZF + .1);   // tramo de la esquina: solo alambre
  // tranquera de madera de dos hojas (cerrada, sin colisión para poder entrar)
  for (const x of [-462.4, -459]) bx(g, x, 0, ZF, .22, 1.6, .22, MAD);
  for (const [xa, xb] of [[-462.3, -460.75], [-460.65, -459.1]]){
    const cx = (xa + xb) / 2, w = xb - xa;
    for (const y of [.3, .7, 1.1]) bx(g, cx, y, ZF + .05, w, .1, .05, '#9a7a55');
    for (const x of [xa + .05, xb - .05]) bx(g, x, .2, ZF + .05, .08, 1.05, .05, '#9a7a55');
    boxIn(g, cx, .8, ZF + .08, Math.hypot(w, .8), .08, .04, '#9a7a55', 0, Math.atan2(.8, w) * (xa < -461 ? 1 : -1));
  }
  // pilar de ladrillo con el medidor y poste de luz con brazo hacia Lavalle
  bx(g, -456.6, 0, ZF - .15, .55, 1.85, .45, LAD); bx(g, -456.6, 1.85, ZF - .15, .65, .08, .55, LAD2);
  bx(g, -456.6, .95, ZF + .1, .32, .42, .06, '#dcdcd6'); bx(g, -456.6, 1.05, ZF + .14, .16, .12, .02, '#3a3e42');
  addCol(-456.9, ZF - .4, -456.3, ZF + .1);
  poles.add(-455.9, 0, ZF + .3, .2, 8.4, .2, 0, '#9a958c'); addCol(-456.05, ZF + .15, -455.75, ZF + .45);
  poleIn(g, [-455.9, 7.8, ZF + .3], [-455.9, 8.6, ZF + 2.4], .05, '#7a7d80'); bx(g, -455.9, 8.4, ZF + 2.5, .3, .15, .5, '#cfd2d4');
  poles.add(-478.2, 0, -351.2, .24, 8.6, .24, 0, '#8a7a66'); addCol(-478.4, -351.4, -478, -351);   // poste de madera de la esquina
  // arbolitos jóvenes en la banquina y canasto de madera para la basura (con una bolsa azul)
  for (const [x, z, s] of [[-471, -353.2, .45], [-466.4, -353.6, .42], [-452.8, -354, .45]]) addTree(x, z, s, false, ['#7d8f4c', '#8a9a55', '#6b8f3d']);
  { const cx = -469.2, cz = -352.6;
    for (const [dx, dz] of [[-.4, -.3], [.4, -.3], [-.4, .3], [.4, .3]]) bx(g, cx + dx, 0, cz + dz, .08, 1.25, .08, '#9b8664');
    for (let y = .35; y < 1.2; y += .18){ bx(g, cx, y, cz - .3, .85, .08, .03, '#a8936f'); bx(g, cx, y, cz + .3, .85, .08, .03, '#a8936f'); bx(g, cx - .4, y, cz, .03, .08, .6, '#a8936f'); bx(g, cx + .4, y, cz, .03, .08, .6, '#a8936f'); }
    crowns.add(cx + .65, .3, cz + .2, .22, .3, .2, 0, '#2f6fd1'); addCol(cx - .45, cz - .35, cx + .45, cz + .35); }

  // --- la casa (frente en z = -362)
  const FZ = -362;
  const ladrillos = (x0, x1, h, z = FZ + .02) => { for (let y = .25; y < h; y += .25) bx(g, (x0 + x1) / 2, y, z, x1 - x0, .015, .02, LAD2); };
  // ala oeste + centro: techo de chapa casi plano corrido
  bx(g, -468.5, 0, (FZ - 371) / 2, 11, 2.9, 9, LAD); bx(g, -460.5, 0, (FZ - 370) / 2, 5, 2.9, 8, LAD);
  ladrillos(-474, -458, 2.9);
  boxIn(g, -466, 3.02, -366.3, 16.9, .1, 10, CHAPA, -.04); bx(g, -466, 2.9, FZ + .45, 16.9, .25, .06, '#6e7378');
  // ventanal grande con marco de madera, aire acondicionado, ventana con postigos de madera
  bx(g, -471.2, .25, FZ + .03, 2.6, 2.1, .06, '#7a5a3a'); bx(g, -471.2, .35, FZ + .06, 2.4, 1.9, .04, OSC);
  bx(g, -468.6, 2.05, FZ + .2, .8, .5, .3, '#eeeeea');
  bx(g, -466.2, .95, FZ + .03, 1.3, 1.15, .06, '#7a5a3a'); bx(g, -466.2, 1.0, FZ + .06, 1.15, 1.05, .04, OSC);
  for (const s of [-1, 1]) bx(g, -466.2 + s * .95, .95, FZ + .07, .6, 1.15, .05, '#8a6a48');
  bx(g, -463.4, 0, FZ + .03, .95, 2.1, .06, '#6e5236');                                     // puerta de entrada
  bx(g, -460.4, .95, FZ + .03, 1.5, 1.2, .06, '#e8e4dc'); bx(g, -460.4, 1.0, FZ + .06, 1.35, 1.1, .04, OSC);
  // chimenea con tanquecito cilíndrico arriba
  bx(g, -461.6, 2.9, -365.5, 1.3, 2.0, 1.3, LAD); bx(g, -461.6, 4.9, -365.5, 1.45, .1, 1.45, LAD2);
  cylIn(g, -461.6, 5.45, -365.5, .45, 1.0, '#d7d9d8');
  // volumen este, más alto, a dos aguas con la cumbrera hacia la calle (techo oscuro)
  bx(g, -454.75, 0, -366.6, 6.5, 3.2, 10.8, LAD); ladrillos(-458, -451.5, 3.2, -361.18);
  gableIn(g, -454.75, 3.2, -366.6, 10.8, 1.5, 6.5, LAD, Math.PI / 2);
  { const a = Math.atan2(1.5, 3.25), L = Math.hypot(3.25, 1.5) + .35;
    for (const s of [-1, 1]) boxIn(g, -454.75 + s * 1.62, 3.98, -366.6, L, .08, 11.4, '#4a4c50', 0, -s * a); }
  bx(g, -454.75, 1.0, -361.17, 1.5, 1.25, .06, '#e8e4dc'); bx(g, -454.75, 1.05, -361.13, 1.35, 1.15, .04, OSC);
  for (let y = 1.05; y < 2.2; y += .12) bx(g, -454.75, y, -361.1, 1.35, .04, .03, '#c9c4b8');   // persiana
  // ala de atrás (forma de L hacia la pileta), techo plano
  bx(g, -470.5, 0, -374.5, 7, 2.8, 7, LAD); bx(g, -470.5, 2.8, -374.5, 7.3, .12, 7.3, CHAPA);
  addCol(-474, -371, -463, FZ); addCol(-463, -370, -458, FZ); addCol(-458, -372, -451.5, -361.2); addCol(-474, -378, -467, -371);
  mapRects.push([-474, -371, -451.5, FZ, LAD]); mapRects.push([-474, -378, -467, -371, LAD]);
  flat.rect(-462.2, -363.2, -458.9, -362, .075, '#c9c4b8');                                   // veredita frente a la puerta

  // --- sobre 25 de Mayo: alambrado con fila de cipreses altos; al costado del vecino y al fondo, ligustro
  alambre(X0 + .2, ZF, X0 + .2, Z0 + .3);
  for (let z = -359; z > Z0 + 1; z -= 1.9){
    trunks.add(-477.8, 0, z, .18, 1.2, .18, 0, '#5a4636');
    crowns.add(-477.8 + R(-.15, .15), 3.6, z, 1.15, 3.4 + R(-.4, .5), 1.15, R(0, 6), pick(['#2c4a26', '#34552b', '#2f5a24', '#3a5f2c']));
  }
  addCol(-479.4, Z0 + .5, -476.6, -358.4);
  ligustro(X1 - .5, ZF - 1.2, X1 - .5, Z0 + .6, 1.9); ligustro(-476, Z0 + .6, X1 - .5, Z0 + .6, 1.8);
  // árboles: los de la esquina detrás del alambre, pino alto atrás de la casa, otro al fondo
  addTree(-476.2, -360.2, 1.3, false, ['#3f6a2a', '#4b7a30', '#557f35']);
  addTree(-472.4, -359.4, 1.0, false, ['#4b7a30', '#557f35']);
  addTree(-459.5, -377.5, 1.5, false, ['#2c4a26', '#34552b', '#3a5f2c']);
  addTree(-452.5, -382.5, 1.1, false, ['#3f6a2a', '#4b7a30']);
  // --- pileta ovalada al fondo, del lado del vecino
  { const cx = -462, cz = -381, rx = 1.7, rz = 3.0, N = 28, ring = (k, s) => [cx + Math.cos(k / N * Math.PI * 2) * rx * s, cz + Math.sin(k / N * Math.PI * 2) * rz * s];
    // _triRaw: los gajos del abanico se tocan entre sí y el anti-parpadeo los iría subiendo uno sobre otro
    for (let k = 0; k < N; k++){ flat._triRaw([cx, cz], ring(k, 1.25), ring(k + 1, 1.25), .072, '#e6e2d6'); flat._triRaw([cx, cz], ring(k, 1), ring(k + 1, 1), .082, '#2f6f86'); }
    addCol(cx - rx, cz - rz, cx + rx, cz + rz); }
  plazaRects.push([X0, Z0, X1, ZL]);   // sin árboles ni casas al azar en el lote
  mapLabels.push([-465, -372, 'Esq. 25 de Mayo y Lavalle']);
}

// =========================================================================
// BV. LAVALLE (lado norte), al lado de la casa de la esquina de 25 de Mayo — Street View del usuario
// Casa baja de ladrillo con techo de chapa clara y galería de postes, casi tapada por dos árboles grandes; alambrado con
// portoncito y el cartel "VENDO", caminito de tierra con la tapa redonda de la cámara. Al lado, un lote con alambrado de
// postes de madera donde guardan maquinaria agrícola (una sembradora verde con el sinfín levantado y un carro).
// =========================================================================
{
  const g = group(0, 0);
  const X0 = -449, XM = -437, X1 = -421, Z0 = -386, ZF = -353.5, ZL = -350.4;
  const LAD = '#a3826a', LAD2 = '#87695a', MAD = '#8a7458', VERDE = '#3f8a3a';
  const alambre = (x0, z0, x1, z1, h = 1.35) => {
    const len = Math.hypot(x1 - x0, z1 - z0), n = Math.max(1, Math.round(len / 2.4));
    for (let k = 0; k <= n; k++){ const t = k / n; poles.add(x0 + (x1 - x0) * t, 0, z0 + (z1 - z0) * t, .11, h + R(-.1, .15), .11, 0, MAD); }
    const along = Math.abs(x1 - x0) > Math.abs(z1 - z0);
    for (const y of [.4, .8, 1.2]) bx(g, (x0 + x1) / 2, y, (z0 + z1) / 2, along ? len : .02, .02, along ? .02 : len, '#8f918e');
    addCol(Math.min(x0, x1) - .08, Math.min(z0, z1) - .08, Math.max(x0, x1) + .08, Math.max(z0, z1) + .08);
  };
  // --- piso
  flat.rect(X0, Z0, XM, ZF, .05, '#6a9a45');
  flat.rect(X0, ZF, XM, ZL, .05, '#7fa04c');
  flat.rect(-442.6, -358, -440.9, ZL, .068, '#8a7556');                                        // caminito de tierra
  cylIn(g, -441.75, .08, -351.6, .55, .05, '#b9b6ae');                                         // tapa de la cámara

  // --- casa: ladrillo, techo de chapa clara casi plano, galería de postes adelante con murito claro
  bx(g, -443, 0, -362.5, 9, 2.8, 7, LAD);
  for (let y = .25; y < 2.8; y += .25) bx(g, -443, y, -358.98, 9, .015, .02, LAD2);
  boxIn(g, -443, 3.0, -361.3, 9.6, .08, 9.8, '#d9dbd6', .03);                                  // techo (cubre también la galería, cae hacia adelante)
  bx(g, -445.1, 0, -356.9, 4.8, .5, .2, '#ddd6c6'); bx(g, -439.6, 0, -356.9, 2.2, .5, .2, '#ddd6c6');   // murito de la galería (con paso a la puerta)
  for (let x = -447.4; x <= -438.5; x += 1.1) bx(g, x, .5, -356.9, .16, 2.4, .16, '#7a5f48');   // postes de la galería
  bx(g, -443, 2.75, -356.9, 9.2, .2, .2, '#7a5f48');
  flat.rect(-447.5, -358.9, -438.5, -356.8, .07, '#b7aea0');                                    // piso de la galería
  bx(g, -444.8, .95, -358.97, 1.6, 1.2, .06, '#e6e2da'); bx(g, -444.8, 1.0, -358.93, 1.45, 1.1, .04, '#2f3a42');
  bx(g, -441.75, 0, -358.97, .95, 2.1, .06, '#6e5236');
  bx(g, -439.6, .95, -358.97, 1.2, 1.2, .06, '#e6e2da'); bx(g, -439.6, 1.0, -358.93, 1.05, 1.1, .04, '#2f3a42');
  addCol(-447.5, -366, -438.5, -359); addCol(-447.6, -357.05, -442.7, -356.75); addCol(-440.8, -357.05, -438.4, -356.75);   // casa y murito (deja el paso)
  mapRects.push([-447.5, -366, -438.5, -356.8, LAD]);
  bx(g, -446.5, 0, -368.5, 2.5, 2.2, 2.5, '#c9c2b4'); bx(g, -446.5, 2.2, -368.5, 2.7, .08, 2.7, '#9aa0a6');   // piecita de atrás
  addCol(-447.75, -369.75, -445.25, -367.25);

  // --- alambrado del frente con portoncito y el cartel VENDO; árboles grandes adelante
  alambre(X0 + .3, ZF, -442.7, ZF); alambre(-440.8, ZF, XM, ZF);
  for (const x of [-442.7, -440.8]) bx(g, x, 0, ZF, .14, 1.55, .14, '#5f6266');
  bx(g, -442.55, .1, ZF - .9, .03, 1.3, 1.75, '#8f918e'); bx(g, -442.55, 1.35, ZF - .9, .05, .05, 1.8, '#5f6266');   // portoncito de alambre, abierto hacia adentro
  const vendo = signIn(g, 'VENDO', -441.75, 1.0, ZF + .1, 1.1, .55, '#f4f2ec', '#c0262d');
  addTree(-447, -352.2, 1.35, false, ['#4b6a2c', '#56783a', '#3f5e28']);
  addTree(-439.2, -352.4, 1.25, false, ['#5a7a34', '#4e6e30', '#6b8a3e']);
  addTree(-444.6, -355.2, .7, false, ['#7d8f4c', '#8a9a55']);
  addTree(-446, -378, 1.1, false, ['#3f6a2a', '#4b7a30']); addTree(-440, -381.5, 1.0, false, ['#4b7a30', '#557f35']);
  alambre(XM, ZF, XM, Z0 + .5); alambre(X0 + .3, Z0 + .5, XM, Z0 + .5);
  plazaRects.push([X0, Z0, XM, ZL]);
}

// =========================================================================
// PLANTA DE ACOPIO de Bv. Lavalle y Buenos Aires — toda la esquina hasta Buenos Aires (Street View y satélite del usuario)
// Predio de pasto con alambrado de postes de madera, tranquera sobre Lavalle y dos tranqueras abiertas sobre Buenos Aires.
// Galpón grande de techo curvo (paredes de bloque gris, franja de chapas amarillas y azules), anexo y muro blancos,
// silos sobre patas (tres en fila y dos grandes), sembradora verde, carro rojo, tolva azul y rastras.
// =========================================================================
{
  const g = group(0, 0);
  const XA = -437, XB = -398.8, ZN = -405, ZF = -351, ZL = -350.4;
  const MAD = '#8a7458', VERDE = '#3f8a3a', BLANCO = '#eeeeea', TIERRA = '#a08a63';
  const alambre = (x0, z0, x1, z1, h = 1.5) => {
    const len = Math.hypot(x1 - x0, z1 - z0), n = Math.max(1, Math.round(len / 2.4));
    for (let k = 0; k <= n; k++){ const t = k / n; poles.add(x0 + (x1 - x0) * t, 0, z0 + (z1 - z0) * t, .12, h + R(-.15, .2), .12, 0, MAD); }
    const along = Math.abs(x1 - x0) > Math.abs(z1 - z0);
    for (const y of [.4, .85, 1.3]) bx(g, (x0 + x1) / 2, y, (z0 + z1) / 2, along ? len : .02, .02, along ? .02 : len, '#8f918e');
    addCol(Math.min(x0, x1) - .08, Math.min(z0, z1) - .08, Math.max(x0, x1) + .08, Math.max(z0, z1) + .08);
  };
  const tranquera = (px, pz, ry, w = 3.6) => {   // tranquera de madera (una hoja), girada ry desde el poste
    const p = group(px, pz, ry);
    for (const y of [.25, .6, .95, 1.3]) bx(p, w / 2, y, 0, w, .1, .06, '#a3875f');
    for (const x of [.05, w / 2, w - .05]) bx(p, x, .15, 0, .1, 1.3, .07, '#a3875f');
    boxIn(p, w / 4, .8, .03, Math.hypot(w / 2, 1.05), .09, .05, '#a3875f', 0, Math.atan2(1.05, w / 2));
    boxIn(p, 3 * w / 4, .8, .03, Math.hypot(w / 2, 1.05), .09, .05, '#a3875f', 0, -Math.atan2(1.05, w / 2));
  };
  // --- piso: pasto, huellas de tierra de las dos tranqueras a los silos, playón de tierra de los silos, vereda de ripio del galpón
  flat.rect(XA, ZN, XB, ZL, .05, '#7d9a4a');
  flat.rect(-431.5, -386, -428.5, ZL, .066, TIERRA);
  flat.rect(-431.5, -392, XB, -386, .066, TIERRA);
  flat.rect(XA, -399.5, -412, -392, .064, '#a8946c');
  flat.rect(-421, -368, -400, -364.5, .064, '#b0a890');
  for (let k = 0; k < 7; k++){ const x = R(-426, -402), z = R(-362, -353); flat.rect(x, z, x + R(1.5, 3.5), z + R(1, 2), .052, pick(['#a39a6a', '#9a8f5e', '#8a9a50'])); }   // pasto pisado
  // --- alambrados: Lavalle (con la tranquera cerrada, sin colisión para pasar), Buenos Aires (con dos tranqueras abiertas), fondo y costado
  alambre(XA, ZF, -432, ZF); alambre(-428, ZF, XB, ZF);
  for (const x of [-432, -428]) bx(g, x, 0, ZF, .24, 1.8, .24, MAD);
  tranquera(-432, ZF, 0, 3.9);
  alambre(XB, ZF, XB, -386); alambre(XB, -392, XB, ZN);
  for (const z of [-386, -392]) bx(g, XB, 0, z, .24, 1.8, .24, MAD);
  tranquera(XB, -386, Math.PI / 2 + 1.2, 2.9); tranquera(XB, -392, -Math.PI / 2 - 1.2, 2.9);   // abiertas hacia adentro
  alambre(XA, ZN, XB, ZN); alambre(XA, -386, XA, ZN);
  // poste de luz pintado de rojo y blanco junto a la tranquera de Buenos Aires
  { const x = -399.8, z = -383.5; for (let k = 0; k < 8; k++) poles.add(x, k, z, .16, 1, .16, 0, k % 2 ? '#c0262d' : '#f2f2ee'); poleIn(g, [x, 7.6, z], [x + 1.6, 8.2, z], .05, '#7a7d80'); bx(g, x + 1.7, 8.0, z, .5, .15, .3, '#cfd2d4'); addCol(x - .15, z - .15, x + .15, z + .15); }

  // --- silos sobre patas: tres en fila (al lado de la huella de Lavalle) y dos grandes cerca del galpón
  const silo = (x, z, r, h, leg = 2.2) => {
    for (let k = 0; k < 6; k++){ const a = k / 6 * Math.PI * 2; poles.add(x + Math.cos(a) * r * .85, 0, z + Math.sin(a) * r * .85, .18, leg + .4, .18, 0, '#8d9094'); }
    const hop = new THREE.Mesh(new THREE.ConeGeometry(r, 1.4, 20), lam({ color: 0xa9aeb3 })); hop.rotation.x = Math.PI; hop.position.set(x, leg + .7, z); hop.castShadow = true; g.add(hop);
    const y0 = leg + 1.4;
    cylIn(g, x, y0 + h / 2, z, r, h, '#b9bec3');
    for (let y = y0 + .6; y < y0 + h; y += .75) cylIn(g, x, y, z, r + .03, .07, '#a3a8ad');   // anillos de la chapa
    const top = new THREE.Mesh(new THREE.ConeGeometry(r + .15, r * .55, 20), lam({ color: 0xc4c9ce })); top.position.set(x, y0 + h + r * .275, z); top.castShadow = true; g.add(top);
    cylIn(g, x, y0 + h + r * .55 + .15, z, .35, .3, '#a3a8ad');
    poleIn(g, [x + r + .05, .3, z], [x + r + .05, y0 + h, z], .03, '#8d9094');   // escalera
    addCol(x - r, z - r, x + r, z + r);
  };
  silo(-434, -385.5, 2.2, 6.5); silo(-434, -390.5, 2.2, 6.5); silo(-434, -395.5, 2.2, 6.5);
  silo(-421.5, -396.5, 2.8, 8.5, 2.6); silo(-415.5, -397, 2.8, 8.5, 2.6);
  poleIn(g, [-418.5, .5, -401], [-418.5, 13.2, -397], .22, '#3d5fa8'); bx(g, -418.5, 0, -401.3, 1, 1, 1, '#3d5fa8');   // elevador (sinfín azul) entre los silos grandes
  poleIn(g, [-418.5, 13.2, -397], [-421.5, 12.6, -396.5], .1, '#3d5fa8'); poleIn(g, [-418.5, 13.2, -397], [-415.5, 12.6, -397], .1, '#3d5fa8');
  addCol(-419.1, -401.9, -417.9, -400.7);

  // --- galpón grande: bloque gris, franja de chapas amarillas y azules, techo curvo; portón grande hacia Buenos Aires
  { const x0 = -421, x1 = -400, z0 = -382, z1 = -368, cx = (x0 + x1) / 2, cz = (z0 + z1) / 2, L = x1 - x0, W = z1 - z0, HW = 4.2, HB = 5.4, RISE = 2.6;
    bx(g, cx, 0, cz, L, HW, W, '#d4d5d0');
    for (let y = .4; y < HW; y += .4){ for (const zz of [z1 + .02, z0 - .02]) bx(g, cx, y, zz, L, .02, .02, '#b9bab4'); for (const xx of [x0 - .02, x1 + .02]) bx(g, xx, y, cz, .02, .02, W, '#b9bab4'); }
    const n = 14; for (let k = 0; k < n; k++){ const px = x0 + (k + .5) * L / n; for (const zz of [z1, z0]) bx(g, px, HW, zz, L / n, HB - HW, .14, k % 2 ? '#3d5fa8' : '#e2c13c'); }
    for (let k = 0; k < 8; k++){ const pz = z0 + (k + .5) * W / 8; for (const xx of [x0, x1]) bx(g, xx, HW, pz, .14, HB - HW, W / 8, k % 2 ? '#3d5fa8' : '#e2c13c'); }
    bx(g, cx, HW, cz, L - .1, HB - HW, W - .1, '#c9cac6');
    const Rr = (W * W / 4 + RISE * RISE) / (2 * RISE), half = Math.asin(Math.min(1, (W / 2 + .35) / Rr));
    const roof = new THREE.Mesh(new THREE.CylinderGeometry(Rr, Rr, L + .6, 36, 1, true, Math.PI / 2 - half, 2 * half), lam({ color: 0x8f9aa6, side: THREE.DoubleSide }));
    roof.rotation.z = Math.PI / 2; roof.position.set(cx, HB + RISE - Rr, cz); roof.castShadow = roof.receiveShadow = true; g.add(roof);
    const sh = new THREE.Shape(); sh.moveTo(-W / 2, 0);
    for (let k = 0; k <= 24; k++){ const zz = -W / 2 + k / 24 * W; sh.lineTo(zz, Math.sqrt(Rr * Rr - zz * zz) - (Rr - RISE)); }
    sh.lineTo(-W / 2, 0);
    for (const xx of [x0 - .02, x1 + .02]){
      const m = new THREE.Mesh(new THREE.ShapeGeometry(sh), lam({ color: 0x3d5fa8, side: THREE.DoubleSide })); m.position.set(xx, HB, cz); m.rotation.y = Math.PI / 2; g.add(m);
      for (let k = -3; k <= 3; k += 2){ const zz = k * 1.6, hh = Math.sqrt(Rr * Rr - zz * zz) - (Rr - RISE) - .05; bx(g, xx + (xx < cx ? -.03 : .03), HB, cz + zz, .04, hh, .7, '#e2c13c'); }
    }
    bx(g, x1 + .06, 0, cz, .12, 4.0, 5.2, '#7c8186'); for (let k = -2; k <= 2; k++) bx(g, x1 + .13, 0, cz + k * 1.04, .03, 4.0, .04, '#5f6468');   // portón corredizo
    bx(g, x0 - .06, 0, cz + 3, .12, 2.2, 1.1, '#7c8186');                                                                        // puerta chica
    addCol(x0, z0, x1, z1); mapRects.push([x0, z0, x1, z1, '#8f9aa6']);
  }
  // anexo blanco alto pegado al galpón con un silito arriba, y muro blanco de bloque hacia la huella
  bx(g, -422.5, 0, -372, 3, 5.6, 8, BLANCO); bx(g, -422.5, 5.6, -372, 3.2, .15, 8.2, '#d8d8d2');
  cylIn(g, -422.5, 6.7, -374.5, .9, 2.0, '#c4c8cc'); { const c = new THREE.Mesh(new THREE.ConeGeometry(1, .6, 16), lam({ color: 0xc4c9ce })); c.position.set(-422.5, 8.0, -374.5); g.add(c); }
  bx(g, -426, 0, -368.1, 4, 2.8, .25, BLANCO); bx(g, -426, 2.8, -368.1, 4.1, .1, .35, '#d8d8d2');
  addCol(-424, -376, -421, -368); addCol(-428, -368.25, -424, -367.95);
  mapRects.push([-424, -376, -421, -368, BLANCO]);

  // --- máquinas
  // sembradora verde con el sinfín levantado (sobre el alambrado del vecino)
  { const s = group(-435, -362, Math.PI / 2 + .08);
    bx(s, 0, .55, 0, 6.2, .22, 2.6, VERDE); bx(s, 0, .78, 0, 5.4, .9, 1.6, '#4a9a42');
    for (const x of [-2.4, -1.2, 0, 1.2, 2.4]) bx(s, x, .2, 1.3, .1, .45, .5, '#2d5f2a');        // cuerpos de siembra
    for (const sx of [-2.6, 2.6]) { const w = cylIn(s, sx, .5, -1.4, .5, .3, '#222222'); w.rotation.x = Math.PI / 2; w.rotation.z = 0; }
    bx(s, 3.4, .55, 0, 1.6, .14, .3, VERDE);                                                     // lanza de enganche
    poleIn(s, [-1.8, 1.6, -.6], [2.2, 4.0, -.6], .2, VERDE); bx(s, 2.2, 3.7, -.6, .5, .6, .5, '#2d5f2a');   // sinfín levantado
    poleIn(s, [-1, .7, -.6], [.6, 2.7, -.6], .07, '#2d5f2a');
    bx(s, -2.9, 1.1, .2, .3, .35, .3, '#d8b13a'); }
  addCol(-436.5, -366.2, -433.5, -357.8);
  // carro rojo
  { const c = group(-434.8, -374, Math.PI / 2); bx(c, 0, .7, 0, 4.2, .9, 2.1, '#b84232'); bx(c, 0, .55, 0, 4.4, .15, 2.2, '#5a5d60');
    for (const [x, z] of [[-1.3, -1.1], [1.3, -1.1], [-1.3, 1.1], [1.3, 1.1]]) { const w = cylIn(c, x, .4, z, .4, .25, '#222222'); w.rotation.x = Math.PI / 2; } }
  addCol(-436, -376.2, -433.6, -371.8);
  // tolva azul junto a los silos grandes
  { const t = group(-427.8, -396.5, Math.PI);
    bx(t, 0, .9, 0, 4.4, 1.7, 2.3, '#2f5fb8'); bx(t, 0, 2.6, 0, 4.6, .12, 2.5, '#e8e8e4'); bx(t, 0, .7, 0, 4.6, .15, 1.2, '#4a4d52');
    bx(t, 2.9, .55, 0, 1.6, .12, .2, '#4a4d52');
    for (const [x, z] of [[-1.2, -1.25], [1.2, -1.25], [-1.2, 1.25], [1.2, 1.25]]) { const w = cylIn(t, x, .5, z, .5, .3, '#222222'); w.rotation.x = Math.PI / 2; }
    poleIn(t, [-1.8, 2.6, .9], [1.2, 4.2, .9], .12, '#2f5fb8'); }   // sinfín de descarga
  addCol(-430.2, -397.8, -425.4, -395.2);
  // rastras de discos en fila delante del muro blanco y del galpón
  for (let k = 0; k < 5; k++){
    const x = -427 + k * 3.4, z = -365.5;
    bx(g, x, .55, z, 2.6, .12, 1.4, '#3a3c3f'); bx(g, x + 1.8, .45, z, 1.2, .1, .15, '#3a3c3f');
    for (let d = 0; d < 6; d++) cylIn(g, x - 1.1 + d * .44, .35, z, .33, .04, '#55585c', Math.PI / 2);
    addCol(x - 1.4, z - .8, x + 1.4, z + .8);
  }
  // árboles: arbolito junto a la tranquera de Lavalle, pino y arbusto grande al fondo, árboles pelados sobre Buenos Aires
  addTree(-424.5, -353.5, .55, false, ['#7d8f4c', '#8a9a55']);
  addTree(-405, -400.5, 1.15, false, ['#2c4a26', '#34552b', '#2f5a24']);
  addTree(-410.5, -398, .85, false, ['#2f5a24', '#3a5f2c']);
  for (const z of [-356, -363, -398]) addTree(-400.6, z, .8, false, ['#8a7a5a', '#9a8a68', '#7d8f4c']);
  mapLabels.push([-415, -385, 'Acopio']);
  plazaRects.push([XA, ZN, XB, ZL]);
}

// =========================================================================
// CUADRA DEL HOGAR DE ANCIANOS: San Juan / Iriondo (RP 10-S) / Av. 9 de Julio / Bolívar — Street View y satélite del usuario
// Hogar en la esquina de San Juan e Iriondo: edificio en L color crema con zócalo de lajas, alero rojo y galería de postes
// rojos en la esquina; tapial de ladrillo con pilares y tejido sobre Iriondo con un cedro enorme detrás; reja verde con
// murito de ladrillo, tinglado verde y tanque de gas sobre San Juan; cerco premoldeado blanco al fondo.
// Sobre Bolívar: esquina tapada de yuyos y arbustos, casa vieja blanca con portón de chapa, pasillo de pasto hasta un
// galponcito de ladrillo, casa vieja con portón de madera y un carrito con lona azul, y en la esquina de 9 de Julio una
// casita de ladrillo entre árboles. El resto es un campito con alambrado hasta la diagonal de la RP 10-S.
// =========================================================================
{
  const g = group(0, 0);
  const CREMA = '#e2c88e', ROJO = '#c4553a', LAJA = '#a8957a', OSC = '#2f3a42', VERDE = '#2f6e4a', LAD = '#a9806a', LAD2 = '#8d6a58', MAD = '#8a7458', BL = '#eceae4', TIERRA = '#8a7556';
  // alambrado recto o en diagonal (postes de madera e hilos)
  const alambre = (x0, z0, x1, z1, h = 1.35) => {
    const dx = x1 - x0, dz = z1 - z0, len = Math.hypot(dx, dz), n = Math.max(1, Math.round(len / 2.5));
    for (let k = 0; k <= n; k++){ const t = k / n; poles.add(x0 + dx * t, 0, z0 + dz * t, .11, h + R(-.1, .15), .11, 0, MAD); }
    const p = group((x0 + x1) / 2, (z0 + z1) / 2, Math.atan2(-dz, dx));
    for (const y of [.4, .8, 1.2]) bx(p, 0, y, 0, len, .02, .02, '#8f918e');
    if (Math.abs(dx) < .01 || Math.abs(dz) < .01) addCol(Math.min(x0, x1) - .08, Math.min(z0, z1) - .08, Math.max(x0, x1) + .08, Math.max(z0, z1) + .08);
    else for (let s = 0; s < len; s += .6){ const x = x0 + dx * s / len, z = z0 + dz * s / len; addCol(x - .3, z - .3, x + .3, z + .3); }
  };
  // --- piso: pasto de toda la cuadra (con la punta que llega a la diagonal), vereda de cemento del Hogar, manchas de pasto
  flat.rect(398, -624.5, 479.5, -543, .05, '#6f9a45');
  flat.quad([428, -624.5], [436, -629], [479.5, -680], [479.5, -624.5], .05, '#76a04a');
  flat.rect(396.5, -621.5, 401, -589, .07, '#bdb8ad');
  flat.rect(398.8, -626, 409.2, -621.5, .072, '#c4bfb4');
  for (let k = 0; k < 14; k++){ const x = R(448, 476), z = R(-670, -570); if (inPoly(x, z, HOGAR_POLY)) flat.rect(x, z, x + R(2, 5), z + R(1.5, 4), .056, pick(['#7fa650', '#86a855', '#679440', '#8a9a55'])); }

  // ===== HOGAR DE ANCIANOS =====
  // ala sobre Iriondo (x 401..425) y ala sobre San Juan (z -611..-589), techo plano con alero rojo
  bx(g, 413, 0, -616.25, 24, 3, 10.5, CREMA); bx(g, 406, 0, -600, 10, 3, 22, CREMA);
  bx(g, 413, 2.75, -616.25, 24.6, .5, 11.1, ROJO); bx(g, 406, 2.75, -600, 10.6, .5, 22.6, ROJO);
  bx(g, 413, 3.0, -616.25, 23.8, .3, 10.3, '#cfcfc8'); bx(g, 406, 3.0, -600, 9.8, .3, 21.8, '#cfcfc8');
  addCol(401, -621.5, 425, -611); addCol(401, -611, 411, -589);
  mapRects.push([401, -621.5, 425, -611, CREMA]); mapRects.push([401, -611, 411, -589, CREMA]);
  // zócalo de lajas sobre San Juan
  bx(g, 400.96, 0, -600, .08, 1.0, 22, LAJA);
  for (let z = -610.4; z < -589.5; z += R(.5, .9)) bx(g, 400.92, R(.08, .7), z, .04, R(.18, .3), R(.3, .55), pick(['#b9a68a', '#9a8770', '#c2b29a', '#8f7d66']));
  // ventanas con persianas blancas (San Juan, mirando a -x) y puerta
  const persianaX = z => { bx(g, 400.97, 1.0, z, .06, 1.35, 1.55, BL); bx(g, 400.93, 1.05, z, .04, 1.25, 1.4, '#f1f0ea'); for (let y = 1.15; y < 2.3; y += .13) bx(g, 400.9, y, z, .02, .03, 1.4, '#d2d0c8'); };
  for (const z of [-608, -603.5, -594.5, -591]) persianaX(z);
  bx(g, 400.97, 0, -599, .06, 2.2, 1.1, BL); bx(g, 400.93, .1, -599, .04, 2.0, .9, '#7f9e98');
  // frente sobre Iriondo (mirando a -z): puerta vidriada de la entrada y ventanas con persianas
  bx(g, 404.5, 0, -621.53, 1.7, 2.3, .06, '#4f6f62'); bx(g, 404.5, .1, -621.57, 1.45, 2.1, .04, '#a9c2ba'); bx(g, 404.5, .1, -621.6, .05, 2.1, .03, '#4f6f62');
  for (const x of [410, 415, 420]){ bx(g, x, 1.0, -621.53, 1.55, 1.35, .06, BL); bx(g, x, 1.05, -621.57, 1.4, 1.25, .04, '#f1f0ea'); for (let y = 1.15; y < 2.3; y += .13) bx(g, x, y, -621.6, 1.4, .03, .02, '#d2d0c8'); }
  signIn(g, 'HOGAR DE ANCIANOS', 415, 2.2, -621.62, 5.4, .45, '#f4f2ec', '#8a2e20', Math.PI);
  // galería de la esquina: chapa roja sobre postes rojos (en L, sobre Iriondo y San Juan)
  bx(g, 404, 2.75, -622.9, 10.4, .14, 3.2, ROJO); bx(g, 404, 2.45, -624.45, 10.4, .35, .08, ROJO);
  bx(g, 399.9, 2.75, -617, 2.2, .14, 9, ROJO); bx(g, 398.85, 2.45, -617, .08, .35, 9, ROJO);
  for (const [x, z] of [[399.1, -624.2], [404, -624.2], [409, -624.2], [399.1, -617], [399.1, -612.8]]){ bx(g, x, 0, z, .14, 2.75, .14, ROJO); addCol(x - .1, z - .1, x + .1, z + .1); }
  // tanques de agua sobre el techo
  for (const [x, c] of [[408.5, '#d9dbd8'], [410, '#d9dbd8'], [411.6, '#2b2d30']]){ bx(g, x, 3.3, -616, .9, .5, .9, '#9aa0a6'); cylIn(g, x, 4.35, -616, .55, 1.1, c); }
  // tinglado verde pegado al ala de San Juan, tanque de gas blanco
  for (const [x, z] of [[402, -581.2], [409.5, -581.2], [402, -585.5], [409.5, -585.5]]){ poles.add(x, 0, z, .12, 2.6, .12, 0, VERDE); addCol(x - .1, z - .1, x + .1, z + .1); }
  boxIn(g, 405.75, 2.65, -585.1, 8.6, .06, 8.2, '#3f8a5a', -.04);
  flat.rect(401.5, -589, 410, -581, .068, '#b9b4aa');
  cylIn(g, 405.8, .8, -577, .65, 2.6, '#f2f2ee', Math.PI / 2); for (const x of [404.9, 406.7]) bx(g, x, 0, -577, .3, .25, .9, '#8a8c8e');
  addCol(404.4, -577.7, 407.2, -576.3);
  // reja verde con murito de ladrillo y pilares sobre San Juan, portón verde
  const reja = (z0, z1) => {
    const zc = (z0 + z1) / 2, len = Math.abs(z1 - z0);
    bx(g, 398.6, 0, zc, .25, .55, len, LAD); bx(g, 398.6, 1.75, zc, .05, .05, len, VERDE); bx(g, 398.6, .7, zc, .05, .05, len, VERDE);
    for (let z = Math.min(z0, z1) + .15; z < Math.max(z0, z1); z += .16) poles.add(398.6, .55, z, .025, 1.25, .025, 0, VERDE);
    for (const z of [z0, z1]) { bx(g, 398.6, 0, z, .45, 1.9, .45, LAD); bx(g, 398.6, 1.9, z, .55, .08, .55, LAD2); }
    addCol(398.4, Math.min(z0, z1), 398.8, Math.max(z0, z1));
  };
  reja(-589, -577.5); reja(-573.5, -563.2);
  bx(g, 398.6, .1, -575.5, .05, .55, 3.8, VERDE); bx(g, 398.6, 1.75, -575.5, .05, .05, 3.8, VERDE);   // portón verde (se puede pasar)
  for (let z = -577.3; z < -573.6; z += .16) poles.add(398.6, .65, z, .025, 1.1, .025, 0, VERDE);
  // cerco premoldeado blanco al fondo del Hogar y alambrado del costado este
  bx(g, 411.3, 0, -563, 25.6, 1.9, .1, '#e4e1d8'); for (let x = 398.8; x <= 424; x += 2.4) poles.add(x, 0, -563, .18, 2.0, .18, 0, '#d8d5cc');
  addCol(398.5, -563.1, 424, -562.9);
  alambre(424, -563.2, 424, -585); alambre(424, -585, 446, -585); alambre(446, -585, 446, -624);
  // tapial de ladrillo con pilares y tejido sobre Iriondo, cedro enorme detrás
  bx(g, 435.5, 0, -624.2, 21, .6, .25, LAD); bx(g, 435.5, 1.55, -624.2, 21, .04, .04, '#6f7a72'); bx(g, 435.5, 1.0, -624.2, 21, .03, .03, '#6f7a72');
  for (let x = 425.3; x <= 446; x += 3){ bx(g, x, 0, -624.2, .5, 1.75, .5, LAD); bx(g, x, 1.75, -624.2, .6, .08, .6, LAD2); }
  addCol(425, -624.4, 446, -624);
  trunks.add(432, 0, -616.5, .7, 3.2, .7, 0, '#4a3a2c'); addCol(431.6, -616.9, 432.4, -616.1);
  [[3.4, 4.2], [5, 3.5], [6.6, 2.8], [8.1, 2], [9.4, 1.2]].forEach(([y, w]) => crowns.add(432 + R(-.3, .3), y, -616.5 + R(-.3, .3), w, 1.15, w,R(0, 6), pick(['#2c4a2a', '#335532', '#2a4628'])));
  // árboles del parque del Hogar y plátanos de la vereda de San Juan; mástil rojo y canasto de basura
  for (const [x, z, s] of [[420, -600, 1.2], [431, -596, 1.1], [438, -606, 1.3], [430, -574, 1.0], [440, -571, 1.2], [416, -572, .9], [441, -592, 1.0]]) addTree(x, z, s, false, ['#3f6a2a', '#4b7a30', '#557f35']);
  for (const z of [-618, -608, -597, -587, -580, -568]) addTree(395.8, z, .85, false, ['#7d8f4c', '#8a9a55', '#6b8f3d']);
  poles.add(396.2, 0, -602.5, .18, 7.5, .18, 0, '#d23a2a'); addCol(396, -602.7, 396.4, -602.3);
  { const cx = 396.3, cz = -583.5;
    for (const [dx, dz] of [[-.35, -.35], [.35, -.35], [-.35, .35], [.35, .35]]) poles.add(cx + dx, 0, cz + dz, .05, 1.2, .05, 0, '#3a3c3f');
    for (let y = .3; y < 1.2; y += .2){ bx(g, cx, y, cz - .35, .7, .03, .03, '#3a3c3f'); bx(g, cx, y, cz + .35, .7, .03, .03, '#3a3c3f'); bx(g, cx - .35, y, cz, .03, .03, .7, '#3a3c3f'); bx(g, cx + .35, y, cz, .03, .03, .7, '#3a3c3f'); }
    crowns.add(cx, .55, cz, .28, .25, .28, 0, '#2a2a2c'); crowns.add(cx + .1, .85, cz, .2, .18, .2, 0, '#e8e2d0'); addCol(cx - .4, cz - .4, cx + .4, cz + .4); }
  mapLabels.push([418, -604, 'Hogar de Ancianos']);

  // ===== SOBRE BOLÍVAR (frente en z = -543.5, mirando a +z) =====
  // esquina de San Juan y Bolívar: yuyos, arbustos y árboles; cartel de calles
  for (let k = 0; k < 14; k++) crowns.add(R(400.5, 409.5), R(.4, .9), R(-560, -547), R(.9, 1.6), R(.6, 1.1), R(.9, 1.6),R(0, 6), pick(['#4a6e2c', '#5a7a34', '#3f6228', '#6b8a3e']));
  addCol(400.5, -560, 409.5, -547);
  addTree(403, -556, 1.1, false, ['#5a7a34', '#6b8a3e']); addTree(408, -549.5, .9, false, ['#8a7a5a', '#7d8f4c']);
  poles.add(396.4, 0, -540.8, .08, 2.6, .08, 0, '#d8d8d8'); bx(g, 396.4, 2.3, -540.8, .04, .2, .9, '#1e4fa0'); bx(g, 396.4, 2.05, -540.8, .9, .2, .04, '#1e4fa0');
  addCol(396.3, -540.9, 396.5, -540.7);
  // casa vieja blanca descascarada: portón de chapa, pilar de ladrillo, puerta con cortina violeta, aire acondicionado, caño de chimenea
  bx(g, 412.75, 0, -543.5, 2.5, 1.6, .06, '#6f8a6a'); for (let x = 411.6; x < 414; x += .25) bx(g, x, 0, -543.45, .05, 1.6, .03, '#5f7a5a');
  bx(g, 414.3, 0, -543.5, .45, 1.8, .45, '#a37a62'); addCol(411.5, -543.6, 414.5, -543.4);
  alambre(414.6, -543.5, 424, -543.5);
  flat.rect(412, -548, 413.6, -543.5, .068, TIERRA);
  bx(g, 417.5, 0, -551, 9, 2.9, 6, '#e2e0da'); bx(g, 417.5, 2.9, -551, 9.2, .35, 6.2, '#d6d3cb');
  for (const [x, y, w, h] of [[414, .3, 1.4, .9], [420.8, 1.4, 1.1, 1.2], [418.2, .1, .9, .6], [416.8, 2.1, 1.6, .5]]) bx(g, x, y, -547.98, w, h, .03, pick(['#c9c6bd', '#bfbab0', '#d0ccc2']));
  bx(g, 415, 0, -547.97, 1.0, 2.1, .06, '#7a5a46'); bx(g, 415, .6, -547.93, .8, 1.4, .03, '#8a3a8a');
  bx(g, 419.5, 1.0, -547.97, 1.3, 1.2, .06, '#d8d8d0'); bx(g, 419.5, 1.05, -547.93, 1.1, 1.1, .04, OSC);
  bx(g, 417.3, 1.9, -547.8, .8, .55, .3, '#eeeeea');
  poles.add(418.5, 3.2, -552.5, .12, 1.1, .12, 0, '#55585c');
  addCol(413, -554, 422, -548); mapRects.push([413, -554, 422, -548, '#e2e0da']);
  // pasillo de pasto con tapia a un costado y galponcito de ladrillo al fondo; portón de reja abierto entre pilares
  for (const x of [424.6, 428.4]) { bx(g, x, 0, -543.5, .45, 1.8, .45, LAD); addCol(x - .25, -543.75, x + .25, -543.25); }
  for (let k = 0; k < 9; k++) poles.add(428.2, 0, -543.9 - k * .2, .03, 1.5, .03, 0, '#2a2c2e');
  bx(g, 428.2, 1.45, -544.7, .04, .05, 1.7, '#2a2c2e');
  bx(g, 424.2, 0, -556, .25, 2.0, 24, '#cdc8bd'); addCol(424.05, -568, 424.35, -544);
  for (const x of [426.6, 429.9]) flat.rect(x, -574, x + .8, -543.5, .068, '#8f8060');
  bx(g, 428.5, 0, -578, 7, 3.2, 8, '#9c7c66'); gableIn(g, 428.5, 3.2, -578, 8, 1.0, 7, '#9c7c66', Math.PI / 2);
  { const a = Math.atan2(1.0, 3.5), L = Math.hypot(3.5, 1.0) + .35; for (const s of [-1, 1]) boxIn(g, 428.5 + s * 1.72, 3.73, -578, L, .08, 8.4, '#7a6a5a', 0, -s * a); }
  bx(g, 428.5, 0, -573.97, 3, 2.4, .06, '#2a2622');
  addCol(425, -582, 432, -574); mapRects.push([425, -582, 432, -574, '#9c7c66']);
  // casa vieja con portón de madera, puerta roja y un carrito con lona azul adelante
  bx(g, 440.5, 0, -559.5, 13, 3.0, 7, '#cfc6b4'); bx(g, 440.5, 3.0, -559.5, 13.2, .3, 7.2, '#bdb4a2');
  for (const [x, y, w, h] of [[435.5, .2, 1.8, 1.0], [438.6, 2.0, 1.4, .7], [446, .4, 1.0, 1.5]]) bx(g, x, y, -555.98, w, h, .03, pick(['#b9b09c', '#c2b9a6', '#a9a08c']));
  bx(g, 437, 0, -555.97, .95, 2.1, .06, '#a83a2c'); bx(g, 439.4, 1.0, -555.97, 1.1, 1.0, .06, '#8a7458'); bx(g, 439.4, 1.05, -555.93, .95, .9, .04, OSC);
  bx(g, 443.3, 0, -555.97, 3.2, 2.5, .06, '#8a7458'); for (let x = 441.9; x < 444.8; x += .32) bx(g, x, 0, -555.93, .05, 2.5, .03, '#6e5a42');
  addCol(434, -563, 447, -556); mapRects.push([434, -563, 447, -556, '#cfc6b4']);
  for (const x of [441.8, 444]) flat.rect(x, -556, x + .8, -543.5, .068, TIERRA);
  bx(g, 439, .3, -549.2, 1.6, .5, 2.4, '#4a4440'); bx(g, 439, .8, -549.2, 1.72, .55, 2.5, '#2f5fb0'); bx(g, 439, .3, -547.2, .08, .08, 1.6, '#3a3c3f');
  for (const x of [438.1, 439.9]) cylIn(g, x, .32, -549.4, .32, .18, '#222222', Math.PI / 2);
  addCol(438.1, -550.5, 439.9, -547.5);
  cylIn(g, 446.6, .45, -554.8, .3, .9, '#b03a2a');
  alambre(432, -543.5, 441.5, -543.5); alambre(445.5, -543.5, 448, -543.5);
  addTree(433.5, -548, 1.0, false, ['#5a7a34', '#6b8a3e']); addTree(446.8, -566, 1.2, false, ['#4b6a2c', '#56783a']);
  // esquina de 9 de Julio: casita de ladrillo entre árboles, tachos naranjas, alambrado sobre Bolívar y 9 de Julio
  bx(g, 458.5, 0, -557.5, 7, 2.7, 5, LAD); for (let y = .25; y < 2.7; y += .25) bx(g, 458.5, y, -554.98, 7, .015, .02, LAD2);
  boxIn(g, 458.5, 2.82, -557.5, 7.6, .08, 5.8, '#8e9296', .04);
  bx(g, 457, 0, -554.97, .9, 2.05, .06, '#6e5236'); bx(g, 460.2, 1.0, -554.97, 1.1, 1.0, .06, '#8a7458'); bx(g, 460.2, 1.05, -554.93, .95, .9, .04, OSC);
  addCol(455, -560, 462, -555); mapRects.push([455, -560, 462, -555, LAD]);
  for (const [x, z] of [[463.2, -552.5], [464, -553.4], [463.5, -554.6]]) cylIn(g, x, .45, z, .3, .9, '#e07a2a');
  bx(g, 465.5, 0, -551.5, 1.2, .9, .9, '#e8853a');
  alambre(448, -543.5, 479.2, -543.5); alambre(479.2, -543.5, 479.2, -627.3); alambre(479.2, -634.6, 479.2, -679.6);
  for (const [x, z, s] of [[451.5, -549, 1.2], [468, -556, 1.4], [474.5, -548.5, 1.1], [457, -566, 1.3], [470, -569, 1.0], [452, -562, .9]]) addTree(x, z, s, false, ['#3f6a2a', '#4b7a30', '#557f35', '#5a7a34']);

  // ===== CAMPITO hasta la diagonal de la RP 10-S =====
  // (la callecita de tierra corta el campito: alambrado a lo largo de ella del lado del Hogar, y la punta norte queda de pasto)
  alambre(441, -635, 479.2, -679.6);
  alambre(446, -624, 446, -627.2); alambre(446, -627.2, 479.2, -627.2);
  alambre(448, -543.5, 448, -570); alambre(446, -585, 446, -570); alambre(446, -570, 479.2, -570);
  for (const [x, z, s] of [[455, -600, 1.3], [470, -612, 1.0], [462, -646, 1.2], [452, -640, 1.0], [470, -658, 1.25], [474, -604, .9]]) addTree(x, z, s, false, ['#3f6a2a', '#4b7a30', '#557f35']);

  // ===== VEGETACIÓN TUPIDA adentro de la cuadra (para que no se vea vacía): árboles y arbustos amontonados =====
  const VERDES = ['#3f6a2a', '#4b7a30', '#557f35', '#5a7a34', '#2f5a24', '#6b8a3e'], ARBUSTOS = ['#4a6e2c', '#5a7a34', '#3f6228', '#6b8a3e', '#557a30', '#7d8f4c'];
  const monte = (x0, z0, x1, z1, nT, nB, excl = []) => {
    const libre = (x, z, m) => !excl.some(([a0, b0, a1, b1]) => x > a0 - m && x < a1 + m && z > b0 - m && z < b1 + m);
    for (let k = 0; k < nT; k++){ const x = R(x0, x1), z = R(z0, z1); if (libre(x, z, 1.5)) addTree(x, z, R(.7, 1.35), false, VERDES); }
    for (let k = 0; k < nB; k++){ const x = R(x0, x1), z = R(z0, z1); if (libre(x, z, .6)) crowns.add(x, R(.35, .8), z, R(.8, 1.5), R(.55, 1.05), R(.8, 1.5), R(0, 6), pick(ARBUSTOS)); }
  };
  monte(399.5, -562, 410.5, -544.5, 6, 22);                                                        // esquina San Juan y Bolívar
  monte(433, -584, 445.5, -564, 7, 16);                                                            // fondos detrás de la casa del portón de madera
  monte(447, -592, 478.5, -571, 12, 24);                                                           // franja del campito pegada a los fondos
  monte(447.5, -569, 478.5, -545, 12, 26, [[454, -561.5, 467, -549.5]]);                           // esquina de 9 de Julio, alrededor de la casita
  // fila de árboles del otro lado de la RP 10-S, en la diagonal
  for (let t = .05; t < 1; t += .16){ const x = 437.5 + 44.8 * t - .772 * 10, z = -640.8 - 53.6 * t - .636 * 10; addTree(x + R(-.6, .6), z + R(-.6, .6), R(1.0, 1.4), false, ['#2f5a24', '#3a5f2c', '#4b7a30']); }

  plazaRects.push([398, -624.5, 479.5, -543]); plazaRects.push([428, -680, 479.5, -624.5]);
  ruralExcl.push([395, -700, 495, -540]);
}

// =========================================================================
// CUADRAS DE IRIONDO (RP 10-S) ENTRE MENDOZA Y SAN JUAN, hasta Bolívar — satélite del usuario
// Las casas son las huellas reales de Overture (quedan como están); acá va lo que las rodea:
//  · Mendoza–Constitución: casi todo un campito de pasto, con una zona de pastizal alto y matorrales hacia Constitución,
//    árboles junto a las casas de Mendoza, tierra pelada con cachivaches al lado de la casa de Bolívar y un cuadrado
//    cercado con una casilla cerca de la esquina de Constitución y Bolívar.
//  · Constitución–San Juan: un monte tupido de árboles en el medio, entre las casas; tierra pelada en la esquina de
//    Constitución y Bolívar, pasto abierto sobre Constitución, San Juan y Bolívar.
//  · Del otro lado de la RP 10-S, una hilera de árboles a lo largo de la ruta.
// =========================================================================
{
  const g = group(0, 0);
  const VERDES = ['#3f6a2a', '#4b7a30', '#557f35', '#5a7a34', '#2f5a24', '#34552b'], ARBUSTOS = ['#4a6e2c', '#5a7a34', '#3f6228', '#6b8a3e', '#557a30', '#7d8f4c'];
  // casas reales de estas dos cuadras (con margen) para no plantar nada encima
  const casas = [];
  for (const [, , , p] of REAL_BUILDINGS){
    let x0 = 1e9, z0 = 1e9, x1 = -1e9, z1 = -1e9;
    for (let k = 0; k < p.length; k += 2){ x0 = Math.min(x0, p[k]); x1 = Math.max(x1, p[k]); z0 = Math.min(z0, p[k + 1]); z1 = Math.max(z1, p[k + 1]); }
    const cx = (x0 + x1) / 2, cz = (z0 + z1) / 2;
    if (cx > 195 && cx < 390 && cz > -632.5 && cz < -535) casas.push([x0, z0, x1, z1]);
  }
  const monte = (x0, z0, x1, z1, nT, nB, excl = [], sMin = .75, sMax = 1.35) => {
    const ex = excl.concat(casas);
    const libre = (x, z, m) => !ex.some(([a0, b0, a1, b1]) => x > a0 - m && x < a1 + m && z > b0 - m && z < b1 + m);
    for (let k = 0; k < nT; k++){ const x = R(x0, x1), z = R(z0, z1); if (libre(x, z, 2.5)) addTree(x, z, R(sMin, sMax), false, VERDES); }
    for (let k = 0; k < nB; k++){ const x = R(x0, x1), z = R(z0, z1); if (libre(x, z, 1)) crowns.add(x, R(.35, .8), z, R(.8, 1.6), R(.55, 1.05), R(.8, 1.6), R(0, 6), pick(ARBUSTOS)); }
  };
  const manchas = (x0, z0, x1, z1, n, cols, w0 = 2, w1 = 6) => { for (let k = 0; k < n; k++){ const x = R(x0, x1 - w0), z = R(z0, z1 - w0); flat.rect(x, z, Math.min(x1, x + R(w0, w1)), Math.min(z1, z + R(w0, w1)), .052, pick(cols)); } };

  // ===== MENDOZA – CONSTITUCIÓN (lotes x 203..284.5) =====
  flat.rect(203, -624.5, 284.5, -543, .045, '#76a04a');
  manchas(240, -612, 284, -556, 26, ['#4f7a32', '#5a8236', '#466e2c', '#628a3a'], 3, 9);   // pastizal alto, más oscuro
  manchas(206, -620, 280, -548, 14, ['#86ad56', '#7fa650', '#8ab05a']);
  for (let k = 0; k < 40; k++){ const x = R(242, 283), z = R(-612, -556); crowns.add(x, .25, z, R(.5, 1.1), R(.25, .5), R(.5, 1.1), R(0, 6), pick(['#5a7a34', '#6b8a3e', '#4f7030', '#7d8f4c'])); }   // matas de pastizal
  monte(244, -608, 283, -560, 6, 16);                                         // matorrales sueltos y algunos árboles en el pastizal
  monte(203.5, -588, 216, -545, 7, 10);                                       // árboles junto a las casas de Mendoza
  monte(203.5, -624, 232, -612, 3, 6);
  flat.rect(217, -557, 225, -546, .06, '#7a6a52');                            // tierra pelada con cachivaches al lado de la casa de Bolívar
  for (const [x, z, sx, sy, sz, c] of [[219, -552, 1.4, .5, .9, '#6a6e72'], [221.5, -549.5, .9, .9, .9, '#8a5a3a'], [219.8, -555, 2, .3, 1.2, '#7a7d80'], [223, -553.5, .6, .8, .6, '#3a5fa0']]) bx(g, x, 0, z, sx, sy, sz, c);
  addCol(218.3, -556, 223.5, -548.5);
  // cuadrado cercado con la casilla (murito blanco y tejido)
  { const X0 = 262, X1 = 280, Z0 = -557.5, Z1 = -543.6;
    flat.rect(X0, Z0, X1, Z1, .058, '#a9a596');
    for (const [a, b, c, d] of [[X0, Z0, X1, Z0], [X0, Z1, X1, Z1], [X0, Z0, X0, Z1], [X1, Z0, X1, Z1]]){
      const along = a !== c, len = along ? c - a : d - b, mx = (a + c) / 2, mz = (b + d) / 2;
      bx(g, mx, 0, mz, along ? len : .2, .45, along ? .2 : len, '#e8e6df');
      bx(g, mx, 1.9, mz, along ? len : .04, .04, along ? .04 : len, '#8f918e');
      for (let t = 0; t <= len; t += 2.5) poles.add(along ? a + t : a, 0, along ? b : b + t, .07, 1.95, .07, 0, '#8f918e');
      bx(g, mx, .45, mz, along ? len : .015, 1.45, along ? .015 : len, '#9aa0a0');
      addCol(Math.min(a, c) - .12, Math.min(b, d) - .12, Math.max(a, c) + .12, Math.max(b, d) + .12);
    } }

  // ===== CONSTITUCIÓN – SAN JUAN (lotes x 300.5..382) =====
  flat.rect(300.5, -624.5, 382, -543, .045, '#72a048');
  manchas(312, -612, 372, -552, 22, ['#4a7230', '#557a34', '#3f6a2a'], 4, 10);   // sombra del monte
  flat.rect(306.5, -557, 321, -543.5, .06, '#8a6e50');                         // tierra pelada de la esquina de Constitución y Bolívar
  manchas(304, -556, 324, -544, 5, ['#7a6248', '#94785a']);
  monte(312, -611, 372, -553, 52, 60, [[306.5, -557, 321, -543.5]], .85, 1.5);  // el monte del medio
  monte(301, -624, 330, -614, 6, 10);                                         // árboles cerca de la esquina de Iriondo
  monte(322, -551, 342, -544, 5, 8);                                          // árboles sobre Bolívar
  monte(342, -624, 372, -614, 5, 8);                                          // entre las casas de Iriondo
  manchas(301, -620, 311, -560, 6, ['#86ad56', '#8ab05a']);                    // pasto abierto sobre Constitución
  manchas(346, -555, 381, -544, 8, ['#86ad56', '#8ab05a', '#7fa650']);         // pasto abierto sobre Bolívar y San Juan

  // ===== hilera de árboles del otro lado de la RP 10-S =====
  for (let x = 197; x < 418; x += R(4.5, 6.5)) addTree(x, -643.5 + R(-1.2, 1.2), R(1.0, 1.45), false, ['#2f5a24', '#3a5f2c', '#34552b', '#4b7a30']);
  ruralExcl.push([190, -660, 420, -535]);
}

// Plazoleta del Inmigrante (inaugurada en 1991, renovada por la Escuela Secundaria y la Comuna)
{
  const P = PLAZA_INM;
  plazaRects.push(bboxOf(P));
  fillPoly(P, .055, '#5f9140');
  const [px, pz] = [-404, -37.3];   // centro de la explanada (extremo ancho, hacia Buenos Aires)
  const ring = []; for (let k = 0; k <= 40; k++){ const a = k / 40 * Math.PI * 2; ring.push([px + Math.cos(a) * 1.9, pz + Math.sin(a) * 1.9]); }
  const disc = new THREE.Mesh(new THREE.CylinderGeometry(4.2, 4.2, .14, 40), lam({ color: 0xd9d4c9 })); disc.position.set(px, .07, pz); disc.receiveShadow = true; scene.add(disc);
  flat.ribbon([[-431, -41.2], [px - 4, pz - .5]], 2.2, .07, '#d3cec2');
  // anillo de asientos de piedra
  for (let k = 0; k < 10; k++){ const a = k / 10 * Math.PI * 2; if (k === 5) continue; const sx = px + Math.cos(a) * 3.7, sz = pz + Math.sin(a) * 3.7; box(sx, 0, sz, 1.6, .45, .55, '#a39a8c', -a + Math.PI / 2); }
  // monumento de piedra con placa
  box(px - 5.6, 0, pz - 1.6, 2.6, 1.0, 1.1, '#9a9184'); box(px - 5.6, .45, pz - 1.04, 1.4, .45, .04, '#4b4f55');
  addCol(px - 6.9, pz - 2.2, px - 4.3, pz - 1);
  // mástil central (Argentina) y mástiles de las colectividades
  const flagTex = draw => { const cv = document.createElement('canvas'); cv.width = 150; cv.height = 100; draw(cv.getContext('2d')); const t = new THREE.CanvasTexture(cv); t.colorSpace = THREE.SRGBColorSpace; return t; };
  const FLAGS = {
    ar: c => { c.fillStyle = '#74acdf'; c.fillRect(0, 0, 150, 100); c.fillStyle = '#fff'; c.fillRect(0, 33, 150, 34); c.fillStyle = '#f6b40e'; c.beginPath(); c.arc(75, 50, 9, 0, 7); c.fill(); },
    it: c => { c.fillStyle = '#009246'; c.fillRect(0, 0, 50, 100); c.fillStyle = '#fff'; c.fillRect(50, 0, 50, 100); c.fillStyle = '#ce2b37'; c.fillRect(100, 0, 50, 100); },
    es: c => { c.fillStyle = '#c60b1e'; c.fillRect(0, 0, 150, 100); c.fillStyle = '#ffc400'; c.fillRect(0, 25, 150, 50); c.fillStyle = '#ad1519'; c.fillRect(35, 40, 14, 20); },
    hr: c => {   // Croacia: rojo, blanco y azul con el escudo ajedrezado
      c.fillStyle = '#ff0000'; c.fillRect(0, 0, 150, 34); c.fillStyle = '#ffffff'; c.fillRect(0, 33, 150, 34); c.fillStyle = '#171796'; c.fillRect(0, 66, 150, 34);
      c.fillStyle = '#ffffff'; c.fillRect(60, 24, 30, 38); c.strokeStyle = '#171796'; c.lineWidth = 2; c.strokeRect(60, 24, 30, 38);
      for (let r = 0; r < 5; r++) for (let k = 0; k < 4; k++) if ((r + k) % 2 === 0){ c.fillStyle = '#ff0000'; c.fillRect(61 + k * 7, 25 + r * 7.2, 7, 7.2); }
      c.fillStyle = '#3a6fd0'; for (let k = 0; k < 5; k++) c.fillRect(60 + k * 6, 16, 5, 7);
    },
  };
  const flagPole = (x, z, h, key, sz) => {
    const g = group(x, z);
    poleIn(g, [0, 0, 0], [0, h, 0], h > 10 ? .1 : .07, '#e9e9e9');
    const geo = new THREE.PlaneGeometry(sz * 1.5, sz, 12, 6).translate(sz * .75, 0, 0), base = geo.attributes.position.array.slice();
    const f = new THREE.Mesh(geo, new THREE.MeshLambertMaterial({ map: flagTex(FLAGS[key]), side: THREE.DoubleSide })); f.position.set(.06, h - sz / 2 - .2, 0); f.rotation.y = .6; g.add(f);
    anims.push(t => { const a = geo.attributes.position.array; for (let i = 0; i < a.length; i += 3){ const xx = base[i]; a[i + 2] = Math.sin(xx * 2.2 - t * 5 + x) * .16 * (xx / (sz * 1.5)); } geo.attributes.position.needsUpdate = true; });
    addCol(x - .15, z - .15, x + .15, z + .15);
  };
  flagPole(px, pz, 12, 'ar', 1.4);
  // colectividades: Croacia, España e Italia
  flagPole(px - 3.4, pz - 2.4, 8, 'hr', 1); flagPole(px + 3.4, pz - 2.4, 8, 'es', 1); flagPole(px + 3.4, pz + 2.6, 8, 'it', 1);
  // pérgolas metálicas oscuras
  const pergola = (x, z, w, d) => { const g = group(x, z); for (const [sx, sz2] of [[-1, -1], [1, -1], [-1, 1], [1, 1]]) bx(g, sx * (w / 2 - .1), 0, sz2 * (d / 2 - .1), .14, 2.6, .14, '#2f3236'); bx(g, 0, 2.6, 0, w + .3, .12, d + .3, '#2f3236'); for (let k = -w / 2; k <= w / 2; k += .5) bx(g, k, 2.72, 0, .06, .06, d + .2, '#3a3e43'); for (const [sx, sz2] of [[-1, -1], [1, -1], [-1, 1], [1, 1]]) addCol(x + sx * (w / 2 - .1) - .1, z + sz2 * (d / 2 - .1) - .1, x + sx * (w / 2 - .1) + .1, z + sz2 * (d / 2 - .1) + .1); };
  pergola(-418, -39.6, 3.6, 2.6); pergola(-398.2, -35.6, 2.6, 3.6);
  // faroles de cabeza redonda
  for (const [x, z] of [[-412, -40.8], [-397, -40.8], [-426, -41.3]]){ poles.add(x, 0, z, .12, 5.2, .12, 0, '#2f3236'); const l = new THREE.Mesh(new THREE.CylinderGeometry(.45, .45, .12, 16), lam({ color: 0xf4f2e8, emissive: 0x333322 })); l.position.set(x, 5.25, z); scene.add(l); addCol(x - .15, z - .15, x + .15, z + .15); }
  // canteros de piedra con flores rojas
  for (const [x, z] of [[px - 5.6, pz + 1.4], [px + 5.4, pz - 2.2], [-421, -41]]){ box(x, 0, z, 1.6, .5, 1, '#b5ab9b'); for (let k = 0; k < 5; k++) crowns.add(x + R(-.6, .6), .62, z + R(-.3, .3), .25, .2, .25, R(0, 6), rnd() < .75 ? '#d8344a' : '#3b6a2a'); }
  // árboles en la punta angosta
  for (const [x, z] of [[-428.5, -40.6], [-423.5, -40.8]]) addTree(x, z, .9, false, ['#4b7a30', '#557f35']);
  mapRects.push([...bboxOf(P), '#3f9a3a']);
  mapLabels.push([-410, -37, 'Pl. del Inmigrante']);
}

// Tanque de agua potable de la Comuna / Cooperativa de Obras y Servicios Públicos (Entre Ríos 978, esquina Bv. Lavalle)
// Torre blanca de hormigón con fuste y ventanitas, ensanche con ménsulas y tambor manchado; al lado, el edificio de un piso
// donde la gente carga "el agua potable". Lote con reja de pilares de ladrillo y alambre verde.

  Object.assign(ctx, { RP26_AT, RP26_F });
}
