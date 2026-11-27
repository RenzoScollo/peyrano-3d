// Edificios Overture (REAL_BUILDINGS), Cooperativa, patios/medianeras automáticas, arbolado urbano y optimizador anti z-fighting
export function buildAutofill(ctx) {
  const {
    AB, ACOPIO_POLY, AGUA_POLY, AMFAC_INT_POLY, ARIGA_POLY, AVC_O_POLY, BOMB_N_POLY, BRUNET_IND_POLY, BRUNET_N_POLY, BRUNET_S_POLY, BV_FC_NE, BV_FC_SO, CAR_OPEN, CASA1070_POLY, CASA_IRI_POLY, CASITAS_COOP_POLY, CATAMARCA_CONN, CENT_BOL_POLY, CENT_EAST_POLY, CENT_O_BOL_POLY, CHACABUCO_PTS, COMISARIA_POLY, COOP_FP, COOP_POLY, CORDOBA_E_POLY, CORD_BOMB_POLY, CORREO_N_POLY, DIABLITO_S_POLY, ENTRERIOS_O_POLY, ESC186_POLY, ESCEN_E_POLY, ESCEN_N_POLY, ESC_BRUNET_POLY, ESQ_AGUA_POLY, G, GALP26_POLY, HOGAR_POLY, JUJUY_N_POLY, JUJUY_SO_POLY, JUJUY_S_POLY, LAV25_E_POLY, LAV25_POLY, LAV_ER_MONG_POLY, MALV_POLY, MANZANA_BRUNET_POLY, MONG_POLY, MONG_S_POLY, MUSEO_POLY, NA, NB, PASO_OESTE, PLAZA_INM, PLAZA_SE_SUR_POLY, QUINTA_POLY, R, REAL_BUILDINGS, S, SAGARDUY_POLY, SANLUIS_E_POLY, SHELL_POLY, TERM_POLY, THREE, W, addBush, addCol, addTree, bboxOf, box, boxGeo, boxIn, bx, colLocal, crowns, cylIn, darks, distToPolyline, extrudePoly, fillPoly, flat, gableIn, ground, group, inOsmPark, inPlaza, inPoly, inRailZone, inTownBox, inYard, inner, isPlaza, lam, lampSpots, mapLabels, mapRects, nearRail, nearRuralRoad, obb, overlap, pick, plazaRects, poleIn, poles, polyArea, polyCenter, railDist, region, regionRect, renderer, rnd, roofs, ruralExcl, ruralTreeSpots, scene, segs, shA, shB, signIn, streetReg, streetTreeSpots, treeSpots, trims, walls, xs
  } = ctx;

function pointOnRoad(x, z){
  const [a, b] = AB(x, z);
  if (nearRuralRoad(x, z, 6)) return true;
  if (inRailZone(x, z)) return true;
  if (Math.abs(railDist(a, b)) * S < 8) return true;
  if (distToPolyline(x, z, BV_FC_NE) < 7.5 || distToPolyline(x, z, BV_FC_SO) < 7.5 ||
      distToPolyline(x, z, PASO_OESTE) < 7.5 || distToPolyline(x, z, CHACABUCO_PTS) < 7.5 ||
      distToPolyline(x, z, CATAMARCA_CONN) < 7.5) return true;
  const ia = Math.round(a / G), jb = Math.round(b / G);
  if (ia >= 0 && ia <= NA && Math.abs(a - ia * G) * S < shA(ia * G) - .15 && streetReg('A', ia * G, b)) return true;
  if (jb >= 0 && jb <= NB && Math.abs(b - jb * G) * S < shB(jb * G) - .15 && streetReg('B', jb * G, a)) return true;
  return false;
}

const USE_REAL_BUILDINGS = REAL_BUILDINGS.length > 0;
{
  const RB_WALL = ['#f2ede3','#e8dcc4','#d9c7a7','#f5f0e6','#cfd8dc','#e7c9a9','#c97b5a','#b5654a','#e6d8ad','#d7e3c8','#f0d9d0','#efe3b8','#d6c2c9','#ece6da'];
  const RB_TILE = ['#8e3b2f','#a24a35','#7a3229','#9a5a3a','#6b4a3a'];
  const RB_FLAT = ['#cfc9bd','#bdb6a8','#d8d2c6','#a9a39a','#c4beb2'];
  const RB_SHED = ['#a9adb0','#9aa3a8','#b8bcbe','#c7c2b6'];
  const distToStreet = (x, z) => { const [a, b] = AB(x, z); return Math.min(Math.abs(a - Math.round(a / G) * G), Math.abs(b - Math.round(b / G) * G)) * S; };
  const badPt = (x, z) => pointOnRoad(x, z) || inOsmPark(x, z) || ruralExcl.some(r => x > r[0] && x < r[2] && z > r[1] && z < r[3]);
  const wp = [], wc = [], rp = [], rc = [], col = new THREE.Color();
  const tri = (P, C, a, b, c, color) => { col.set(color); for (const v of [a, b, c]){ P.push(v[0], v[1], v[2]); C.push(col.r, col.g, col.b); } };
  let kept = 0, skipped = 0, clamped = 0;
  for (const [hRaw, floors, cls, flatPts] of REAL_BUILDINGS){
    if (cls === 'warehouse' || cls === 'train_station'){ skipped++; continue; }
    const pts = []; for (let i = 0; i < flatPts.length; i += 2) pts.push([flatPts[i], flatPts[i + 1]]);
    if (pts.length < 3) continue;
    { const [qx, qz] = polyCenter(pts);   // la Cooperativa y la Plazoleta del Inmigrante se arman aparte
      if (inPoly(qx, qz, COOP_POLY)){ COOP_FP.push(pts); continue; }
      if (inPoly(qx, qz, PLAZA_INM) || inPoly(qx, qz, AGUA_POLY) || inPoly(qx, qz, ESQ_AGUA_POLY) || inPoly(qx, qz, PLAZA_SE_SUR_POLY) || inPoly(qx, qz, CENT_EAST_POLY) || inPoly(qx, qz, AMFAC_INT_POLY) || inPoly(qx, qz, ESC186_POLY) || inPoly(qx, qz, MALV_POLY) || inPoly(qx, qz, TERM_POLY) || inPoly(qx, qz, QUINTA_POLY) || inPoly(qx, qz, GALP26_POLY) || inPoly(qx, qz, SANLUIS_E_POLY) || inPoly(qx, qz, ENTRERIOS_O_POLY) || inPoly(qx, qz, JUJUY_S_POLY) || inPoly(qx, qz, CASITAS_COOP_POLY) || inPoly(qx, qz, CASA1070_POLY) || inPoly(qx, qz, CORREO_N_POLY) || inPoly(qx, qz, DIABLITO_S_POLY) || inPoly(qx, qz, COMISARIA_POLY) || inPoly(qx, qz, JUJUY_SO_POLY) || inPoly(qx, qz, JUJUY_N_POLY) || inPoly(qx, qz, AVC_O_POLY) || inPoly(qx, qz, BRUNET_N_POLY) || inPoly(qx, qz, MANZANA_BRUNET_POLY) || inPoly(qx, qz, ARIGA_POLY) || inPoly(qx, qz, BRUNET_S_POLY) || inPoly(qx, qz, CORDOBA_E_POLY) || inPoly(qx, qz, ESCEN_N_POLY) || inPoly(qx, qz, ESCEN_E_POLY) || inPoly(qx, qz, LAV_ER_MONG_POLY) || inPoly(qx, qz, MONG_POLY) || inPoly(qx, qz, MONG_S_POLY) || inPoly(qx, qz, CORD_BOMB_POLY) || inPoly(qx, qz, MUSEO_POLY) || inPoly(qx, qz, BOMB_N_POLY) || inPoly(qx, qz, SAGARDUY_POLY) || inPoly(qx, qz, LAV25_POLY) || inPoly(qx, qz, LAV25_E_POLY) || inPoly(qx, qz, ACOPIO_POLY) || inPoly(qx, qz, HOGAR_POLY) || inPoly(qx, qz, SHELL_POLY) || inPoly(qx, qz, CENT_BOL_POLY) || inPoly(qx, qz, ESC_BRUNET_POLY) || inPoly(qx, qz, BRUNET_IND_POLY) || inPoly(qx, qz, CASA_IRI_POLY) || inPoly(qx, qz, CENT_O_BOL_POLY)){ skipped++; continue; } }
    const area = Math.abs(polyArea(pts));
    let bo = obb(pts);
    if (!cls && (area < 28 || !bo || Math.min(bo.len, bo.wid) < 3.4)){ skipped++; continue; }
    let [x0, z0, x1, z1] = bboxOf(pts), [cx, cz] = polyCenter(pts);
    let [ca, cb] = AB(cx, cz);
    const bi = Math.floor(ca / G), bj = Math.floor(cb / G);
    // Enderezar casas que Overture detectó muy diagonales respecto a la vereda en manzanas ortogonales
    if (bi >= 0 && bi < NA && bj >= 0 && bj < NB &&
        distToPolyline(cx, cz, BV_FC_NE) > 22 && distToPolyline(cx, cz, BV_FC_SO) > 22 && distToPolyline(cx, cz, CHACABUCO_PTS) > 22){
      const snapped = Math.round(bo.ang / (Math.PI / 2)) * (Math.PI / 2), delta = snapped - bo.ang;
      if (Math.abs(delta) > .14){
        const cs = Math.cos(delta), sn = Math.sin(delta);
        for (const p of pts){ const rx = p[0] - cx, rz = p[1] - cz; p[0] = cx + rx * cs - rz * sn; p[1] = cz + rx * sn + rz * cs; }
        [x0, z0, x1, z1] = bboxOf(pts); [cx, cz] = polyCenter(pts); [ca, cb] = AB(cx, cz);
        bo = obb(pts);
      }
    }
    // Ajuste hacia adentro de la manzana si una esquina toca apenas la vereda/calle (hasta 6.5 m)
    let dx = 0, dz = 0, fit = true;
    if (bi >= 0 && bi < NA && bj >= 0 && bj < NB){
      const [ix0, iz0, ix1, iz1] = inner(bi, bj);
      const bx0 = ix0 + .3, bz0 = iz0 + .3, bx1 = ix1 - .3, bz1 = iz1 - .3;
      const hasW = !!streetReg('A', bi * G, cb), hasE = !!streetReg('A', (bi + 1) * G, cb);
      const hasN = !!streetReg('B', bj * G, ca), hasS = !!streetReg('B', (bj + 1) * G, ca);
      if (hasW && x0 < bx0){ if (hasE && x1 - x0 > bx1 - bx0) fit = false; else dx = bx0 - x0; }
      else if (hasE && x1 > bx1){ if (hasW && x1 - x0 > bx1 - bx0) fit = false; else dx = bx1 - x1; }
      if (hasN && z0 < bz0){ if (hasS && z1 - z0 > bz1 - bz0) fit = false; else dz = bz0 - z0; }
      else if (hasS && z1 > bz1){ if (hasN && z1 - z0 > bz1 - bz0) fit = false; else dz = bz1 - z1; }
      if (Math.abs(dx) > 6.5 || Math.abs(dz) > 6.5) fit = false;
    }
    if (!fit){ skipped++; continue; }
    if (dx || dz){
      for (const p of pts){ p[0] += dx; p[1] += dz; }
      [x0, z0, x1, z1] = bboxOf(pts); [cx, cz] = polyCenter(pts); [ca, cb] = AB(cx, cz);
      if (bo){ bo.cx += dx; bo.cz += dz; }
    }
    // Filtro estricto sobre vértices, puntos medios, cuartos de arista y centro
    let ok = !badPt(cx, cz) && !inPlaza(x0, z0, x1, z1) && !overlap(x0 + .4, z0 + .4, x1 - .4, z1 - .4);
    for (let i = 0; ok && i < pts.length; i++){
      const p = pts[i], q = pts[(i + 1) % pts.length];
      if (badPt(p[0], p[1]) || badPt((p[0] + q[0]) / 2, (p[1] + q[1]) / 2)) ok = false;
      else if (Math.hypot(q[0] - p[0], q[1] - p[1]) > 9 && (badPt(p[0] * .75 + q[0] * .25, p[1] * .75 + q[1] * .25) || badPt(p[0] * .25 + q[0] * .75, p[1] * .25 + q[1] * .75))) ok = false;
    }
    if (!ok){ skipped++; continue; }
    if (dx || dz) clamped++;
    // altura: Overture no trae alturas en Peyrano -> según el tamaño (galpones) y la zona (centro con más 2 pisos)
    const shed = area > 380, core = ca > 78 && ca < 351 && cb > 39 && cb < 351;
    const h = hRaw > 0 ? hRaw : floors > 0 ? floors * 3.1 : shed ? R(5, 7.5) : (rnd() < (core ? .22 : .07) ? R(5.8, 6.8) : R(3, 4.1));
    const wall = shed ? pick(RB_SHED) : pick(RB_WALL);
    // paredes
    for (let i = 0; i < pts.length; i++){
      const p = pts[i], q = pts[(i + 1) % pts.length], A = [p[0], 0, p[1]], B = [q[0], 0, q[1]], C = [q[0], h, q[1]], D = [p[0], h, p[1]];
      tri(wp, wc, A, B, C, wall); tri(wp, wc, A, C, D, wall);
    }
    // techo: a dos aguas en parte de las casas rectangulares, plano en el resto (chapa en galpones)
    const o = pts.length === 4 && !shed && area < 260 && rnd() < .45 ? bo : null;
    if (o){
      const ux = Math.cos(o.ang), uz = Math.sin(o.ang), vx = -uz, vz = ux, hl = o.len / 2 + .3, hw = o.wid / 2 + .3, rh = Math.min(o.len, o.wid) * R(.28, .38), tc = pick(RB_TILE);
      const c = (su, sv, y) => [o.cx + ux * su * hl + vx * sv * hw, y, o.cz + uz * su * hl + vz * sv * hw];
      const r0 = [o.cx - ux * hl, h + rh, o.cz - uz * hl], r1 = [o.cx + ux * hl, h + rh, o.cz + uz * hl];
      tri(rp, rc, c(-1, -1, h), c(1, -1, h), r1, tc); tri(rp, rc, c(-1, -1, h), r1, r0, tc);
      tri(rp, rc, c(-1, 1, h), r0, r1, tc); tri(rp, rc, c(-1, 1, h), r1, c(1, 1, h), tc);
      tri(rp, rc, c(-1, -1, h), r0, c(-1, 1, h), wall); tri(rp, rc, c(1, -1, h), c(1, 1, h), r1, wall);
    } else {
      const rcol = shed ? pick(RB_SHED) : pick(RB_FLAT);
      for (const [i, j, k] of THREE.ShapeUtils.triangulateShape(pts.map(p => new THREE.Vector2(p[0], p[1])), [])) tri(rp, rc, [pts[i][0], h, pts[i][1]], [pts[j][0], h, pts[j][1]], [pts[k][0], h, pts[k][1]], rcol);
    }
    // puerta y ventanas sobre el lado que da a la calle
    let best = -1, bd = 1e9;
    for (let i = 0; i < pts.length; i++){ const p = pts[i], q = pts[(i + 1) % pts.length], L = Math.hypot(q[0] - p[0], q[1] - p[1]); if (L < 3.5) continue; const d = distToStreet((p[0] + q[0]) / 2, (p[1] + q[1]) / 2); if (d < bd){ bd = d; best = i; } }
    if (best >= 0 && !shed){
      const p = pts[best], q = pts[(best + 1) % pts.length], dx = q[0] - p[0], dz = q[1] - p[1], L = Math.hypot(dx, dz), mx = (p[0] + q[0]) / 2, mz = (p[1] + q[1]) / 2;
      let nx = -dz / L, nz = dx / L; if ((mx - cx) * nx + (mz - cz) * nz < 0){ nx = -nx; nz = -nz; }
      const ry = Math.atan2(-dz, dx), at = t => [p[0] + dx * t + nx * .06, p[1] + dz * t + nz * .06];
      const door = R(.3, .7), [ddx, ddz] = at(door);
      darks.add(ddx, 0, ddz, 1.1, 2.2, .16, ry, '#5a3b22');
      for (let t = .15; t < .9; t += 2.8 / L){ if (Math.abs(t - door) * L < 1.6) continue; const [wx, wz] = at(t); darks.add(wx, 1.1, wz, 1.3, 1.25, .16, ry, '#2b3440'); if (h > 5.5) darks.add(wx, 4.2, wz, 1.3, 1.25, .16, ry, '#2b3440'); }
    }
    addCol(x0, z0, x1, z1); mapRects.push([x0, z0, x1, z1]);
    kept++;
  }
  const mk = (P, C) => {
    const g = new THREE.BufferGeometry(); g.setAttribute('position', new THREE.Float32BufferAttribute(P, 3)); g.setAttribute('color', new THREE.Float32BufferAttribute(C, 3)); g.computeVertexNormals();
    const m = new THREE.Mesh(g, new THREE.MeshLambertMaterial({ vertexColors: true, side: THREE.DoubleSide })); m.castShadow = m.receiveShadow = true; scene.add(m);
  };
  if (kept){ mk(wp, wc); mk(rp, rc); }
  window.__realBuildings = { kept, skipped, clamped, onRoadAfter: 0 };
  window.__pointOnRoad = pointOnRoad;
}

/* =========================================================
   Cooperativa Agrícola Ganadera de Peyrano (planta sobre Gran Av. 25 de Mayo) y Plazoleta del Inmigrante
   Huellas de Overture (silos / galpones) + Street View (Semillero "Don Enrique") + video de la Comuna (plazoleta renovada)
   ========================================================= */
{
  // edificios del frente sobre Gran Av. 25 de Mayo armados a mano: no se superponen con huellas crudas de Overture
  const CUSTOM = [[-527, -138, -492, -12]];
  const hitCustom = (x0, z0, x1, z1) => CUSTOM.some(r => x0 < r[2] && x1 > r[0] && z0 < r[3] && z1 > r[1]);
  // playón de tierra/cemento del predio (termina en z = -82.5 al norte del segundo galpón verde y sus silitos laterales)
  fillPoly(COOP_POLY, .06, '#b4ae9f');
  mapRects.push([-583, -98, -526, -12, '#b4ae9f'], [-526, -82.5, -492, -12, '#b4ae9f']);
  // silos interiores del predio (se excluyen huellas al norte de z = -96 que en el satélite son galponcitos traseros de las casas)
  const silos = [], big = [];
  for (const pts of COOP_FP){
    const area = Math.abs(polyArea(pts)), [x0, z0, x1, z1] = bboxOf(pts), [cx, cz] = polyCenter(pts);
    if (cz < -96 || hitCustom(x0, z0, x1, z1)) continue;
    if (area <= 45){
      const northSide = cz < -68;
      const d = northSide ? Math.max(3.4, Math.min(5.2, Math.sqrt(area) * .88)) : Math.max(4.2, Math.min(7.5, Math.sqrt(area) * 1.12));
      const h = northSide ? (7.2 + d * 1.0) : (12.5 + d * 1.45);
      const body = new THREE.Mesh(new THREE.CylinderGeometry(d / 2, d / 2, h, 22).translate(0, h / 2, 0), lam({ color: 0xa9b1b8 }));
      body.position.set(cx, 0, cz); body.castShadow = body.receiveShadow = true; scene.add(body);
      for (let y = 2.2; y < h; y += 2.2){ const band = new THREE.Mesh(new THREE.CylinderGeometry(d / 2 + .04, d / 2 + .04, .12, 22), lam({ color: 0x8f979e })); band.position.set(cx, y, cz); scene.add(band); }
      const top = new THREE.Mesh(new THREE.ConeGeometry(d / 2 + .15, d * .32, 22).translate(0, d * .16, 0), lam({ color: 0x969ea5 }));
      top.position.set(cx, h, cz); top.castShadow = true; scene.add(top);
      silos.push([cx, cz, h + d * .32]);
      addCol(cx - d / 2, cz - d / 2, cx + d / 2, cz + d / 2);
      mapRects.push([cx - d / 2, cz - d / 2, cx + d / 2, cz + d / 2, '#a9b1b8']);
    } else if (area > 150){ big.push(pts); }
    else { extrudePoly(pts, 0, 6, '#c9cdd0'); extrudePoly(pts, 6, .3, '#a3a9ae'); addCol(x0, z0, x1, z1); mapRects.push([x0, z0, x1, z1, '#c9cdd0']); }
  }
  // norias (torres elevadoras) con caños hacia los silos interiores de cada grupo
  const groups = [silos.filter(s => s[1] < -65), silos.filter(s => s[1] >= -65)];
  groups.forEach((gs, gi) => {
    if (!gs.length) return;
    const cx = gs.reduce((s, p) => s + p[0], 0) / gs.length + 9, cz = gs.reduce((s, p) => s + p[1], 0) / gs.length, H = Math.max(...gs.map(s => s[2])) + (gi === 0 ? 6.5 : 9);
    const t = group(cx, cz);
    for (const [px, pz] of [[-.9, -.9], [.9, -.9], [-.9, .9], [.9, .9]]) poleIn(t, [px, 0, pz], [px, H, pz], .09, '#b8bcbf');
    for (let y = 1.5; y < H; y += 3){ poleIn(t, [-.9, y, -.9], [.9, y + 3, -.9], .05, '#b8bcbf'); poleIn(t, [-.9, y, .9], [.9, y + 3, .9], .05, '#b8bcbf'); }
    bx(t, 0, H, 0, 3, 2.4, 3, '#c9cdd0');
    for (const [sx, sz, sh] of gs) if (Math.hypot(sx - cx, sz - cz) < 32) poleIn(t, [0, H, 0], [sx - cx, sh + .3, sz - cz], .18, '#d6d9db');
    addCol(cx - 1.2, cz - 1.2, cx + 1.2, cz + 1.2);
  });
  // Conjunto ROJO del mapa satelital (z = -14 a -72.5):
  // 1) 2 silos aéreos Piccinini sobre patas naranjas + noria pegados al muro sur del Semillero
  // 2) Semillero "Don Enrique" (z = -22.5..-42.5) con el anexo blanco de oficinas delante de sus 2/3 derechos
  // 3) 2 galpones parabólicos verdes adosados pared con pared al norte del Semillero (z = -42.5..-72.5)
  // 4) Hilera de 4 silitos bajos y tanque cisterna horizontal junto a la pared norte del segundo galpón verde (z = -73..-81)
  {
    const g = group(-496.5, -32.5, Math.PI / 2);   // frente mirando a la avenida (+x); +lx va hacia el norte (-z)
    const BRICK = '#8f4a36';

    // --- 1) Silos aéreos Piccinini sobre patas naranjas (pegados a la izquierda/sur del Semillero, lx = -13.3 y -19.0) ---
    for (const [lx, lz] of [[-13.3, -.8], [-19.0, -2.2]]){
      const legs = new THREE.Group(); legs.position.set(lx, 0, lz); g.add(legs);
      for (let k = 0; k < 6; k++){
        const a = k / 6 * Math.PI * 2;
        poleIn(legs, [Math.cos(a) * 2.7, 0, Math.sin(a) * 2.7], [Math.cos(a) * 2.8, 5.8, Math.sin(a) * 2.8], .13, '#d9772b');
      }
      // anillo naranja y cono tolva inferior
      const ring = new THREE.Mesh(new THREE.CylinderGeometry(2.9, 2.9, .24, 22), lam({ color: 0xd9772b })); ring.position.y = 5.8; legs.add(ring);
      const hopper = new THREE.Mesh(new THREE.ConeGeometry(2.95, 2.5, 22).rotateX(Math.PI), lam({ color: 0xa5adb3 })); hopper.position.y = 4.55; legs.add(hopper);
      cylIn(legs, 0, 5.8 + 3.7, 0, 2.95, 7.4, '#b3bbc1');
      for (let y = 7.2; y < 13; y += 1.9){
        const bnd = new THREE.Mesh(new THREE.CylinderGeometry(2.99, 2.99, .1, 22), lam({ color: 0x949ca3 })); bnd.position.y = y; legs.add(bnd);
      }
      const roof = new THREE.Mesh(new THREE.ConeGeometry(3.08, 1.55, 22).translate(0, .775, 0), lam({ color: 0x9ea6ac })); roof.position.y = 13.2; legs.add(roof);
      signIn(legs, 'PICCININI', 0, 10.7, 2.98, 2.5, .44, '#b3bbc1', '#3f444a');
      const wx = -496.5 + lz, wz = -32.5 - lx;
      addCol(wx - 3, wz - 3, wx + 3, wz + 3);
      mapRects.push([wx - 2.9, wz - 2.9, wx + 2.9, wz + 2.9, '#a9b1b8']);
    }
    // Noria elevadora blanca detrás de los 2 silos Piccinini (como se ve asomando arriba a la izquierda en la foto)
    {
      const nx = -14.8, nz = -6.2, nH = 22.5;
      for (const [px, pz] of [[-.75, -.75], [.75, -.75], [-.75, .75], [.75, .75]]) poleIn(g, [nx + px, 0, nz + pz], [nx + px, nH, nz + pz], .09, '#d8dce0');
      for (let y = 2; y < nH; y += 2.8){
        poleIn(g, [nx - .75, y, nz + .75], [nx + .75, y + 2.8, nz + .75], .05, '#cfd4d8');
        poleIn(g, [nx - .75, y, nz - .75], [nx + .75, y + 2.8, nz - .75], .05, '#cfd4d8');
      }
      bx(g, nx, nH, nz, 2.4, 2.2, 2.4, '#d8dce0');
      poleIn(g, [nx, nH + .4, nz], [-13.3, 14.6, -.8], .16, '#d8dce0');
      poleIn(g, [nx, nH + .4, nz], [-19.0, 14.6, -2.2], .16, '#d8dce0');
      poleIn(g, [nx, nH + .4, nz], [-8.5, 8.2, -4.5], .15, '#d8dce0');
    }

    // --- 2) Semillero "Don Enrique" (edificio de ladrillo de 2 plantas: lx = -10..+10, w = 20 m, h = 7.6 m, d = 12 m) ---
    bx(g, 0, 0, -6, 20, 7.6, 12, BRICK);
    bx(g, 0, 7.6, -6, 20.3, .35, 12.3, '#7a3f2e');
    // 6 ventanales superiores con columnas de ladrillo intermedias y franjas azules
    for (let k = 0; k < 6; k++) bx(g, -7.75 + k * 3.1, 4.95, .05, 2.65, 1.55, .1, '#b8c5cc');
    bx(g, 0, 4.65, .08, 19.6, .26, .1, '#2452a0');
    bx(g, 0, 6.58, .08, 19.6, .18, .1, '#2452a0');
    // Cartel blanco corrido sobre todo el ancho del edificio de ladrillo
    bx(g, 0, 3.18, .07, 19.5, 1.46, .08, '#f4f2ec');
    signIn(g, 'SEMILLERO "DON ENRIQUE"', .5, 4.02, .13, 11.5, .64, '#f4f2ec', '#1f4796');
    signIn(g, 'COOPERATIVA AGRIC. GANAD. DE PEYRANO LTDA.', 0, 3.4, .13, 19.0, .58, '#f4f2ec', '#22262e');
    // Portón verde alto de camiones a la izquierda (lx = -10..-4, descubierto junto al anexo blanco)
    bx(g, -7.0, 0, .06, 4.6, 3.08, .1, '#2b4f37');
    bx(g, -7.0, 0, .09, .08, 3.08, .06, '#1a3322');
    for (const y of [.75, 1.5, 2.25]) bx(g, -7.0, y, .09, 4.5, .06, .05, '#213f2b');

    // Anexo blanco de oficinas de 1 planta DELANTE de los 2/3 derechos del Semillero (lx = -4..+10, w = 14 m, d = 3.6 m, h = 3.12 m)
    bx(g, 3.0, 0, 1.8, 14.0, 3.12, 3.6, '#f2f2ee');
    bx(g, 3.0, 0, 1.8, 14.08, .88, 3.68, BRICK);                 // zócalo de ladrillo a la vista
    bx(g, 3.0, 2.82, 3.62, 14.06, .28, .08, '#2452a0');          // franja azul superior
    bx(g, 3.0, 3.12, 1.8, 14.16, .12, 3.74, '#e6e6e0');          // parapeto blanco del techo
    bx(g, .5, 0, 3.62, 1.05, 2.25, .1, '#f7f7f4');
    bx(g, .5, 0, 3.65, .86, 2.15, .08, '#2b4f37');
    bx(g, .5, 0, 4.35, 1.6, .28, 1.4, '#bdb8ac');                // escalón/rampa de entrada con baranda
    poleIn(g, [-.2, .28, 3.7], [-.2, 1.05, 4.95], .03, '#2b2b2b');
    poleIn(g, [1.2, .28, 3.7], [1.2, 1.05, 4.95], .03, '#2b2b2b');
    for (const wx of [-1.9, 3.0, 5.9, 8.4]){
      bx(g, wx, 1.02, 3.62, 1.95, 1.18, .08, '#ffffff');
      bx(g, wx, 1.08, 3.65, 1.75, 1.06, .08, '#2b4f37');
    }

    // --- 3) Dos galpones parabólicos verdes PEGADOS al lado derecho/norte del Semillero (lx = +10..+22 y lx = +22..+40 -> z = -42.5..-72.5) ---
    const addArchedRoof = (cx, yBase, cz, w, archH, len, colorHex, frontWallColor) => {
      const segs = 18;
      for (let i = 0; i < segs; i++){
        const t0 = -0.5 + i / segs, t1 = -0.5 + (i + 1) / segs, tm = (t0 + t1) / 2;
        const x0 = t0 * w, x1 = t1 * w, xm = tm * w;
        const y0 = (1 - 4 * t0 * t0) * archH, y1 = (1 - 4 * t1 * t1) * archH, ym = (y0 + y1) / 2;
        const dx = x1 - x0, dy = y1 - y0, sl = Math.hypot(dx, dy) + .04, ang = Math.atan2(dy, dx);
        const p = new THREE.Mesh(new THREE.BoxGeometry(sl, .1, len), lam({ color: colorHex }));
        p.position.set(cx + xm, yBase + ym, cz); p.rotation.z = ang; p.castShadow = p.receiveShadow = true; g.add(p);
        if (ym > .05){
          for (const fz of [cz + len / 2 - .06, cz - len / 2 + .06]){
            const tymp = new THREE.Mesh(new THREE.BoxGeometry(dx + .05, ym, .12), lam({ color: frontWallColor }));
            tymp.position.set(cx + xm, yBase + ym / 2, fz); g.add(tymp);
          }
        }
      }
    };

    // Galpón parabólico verde 1 (lx = 10..22, z = -42.5..-54.5)
    bx(g, 16.0, 0, -7.2, 12.0, 4.3, 17.6, '#2e6645');
    bx(g, 12.6, 0, 1.85, 5.2, 4.2, .34, '#eeeeea');
    bx(g, 20.3, 0, 1.85, 3.4, 4.2, .34, '#eeeeea');
    bx(g, 11.4, 1.0, 2.06, 1.3, 1.3, .08, '#274e36');
    bx(g, 13.5, 0, 2.06, .95, 2.1, .08, '#dcdcd6');
    bx(g, 16.9, 0, 1.82, 3.4, 4.45, .28, '#14291c');
    bx(g, 15.6, 0, 2.06, 1.1, 4.4, .08, '#28583c');
    addArchedRoof(16.0, 4.25, -7.0, 12.2, 1.85, 18.2, 0x2e6645, 0x295c3e);

    // Galpón parabólico verde 2 (lx = 22..40, z = -54.5..-72.5)
    bx(g, 31.0, 0, -8.2, 18.0, 4.1, 19.6, '#2c6041');
    bx(g, 24.4, 0, 1.85, 4.8, 4.05, .34, '#eeeeea');
    bx(g, 37.6, 0, 1.85, 4.8, 4.05, .34, '#eeeeea');
    bx(g, 31.0, 0, 1.82, 8.4, 4.15, .28, '#122419');
    bx(g, 27.6, 0, 2.06, 1.8, 4.1, .08, '#255237');
    bx(g, 34.4, 0, 2.06, 1.8, 4.1, .08, '#255237');
    addArchedRoof(31.0, 4.05, -8.0, 18.2, 1.75, 20.2, 0x2c6041, 0x255237);

    // --- 4) Hilera de 4 silitos bajos junto al muro norte del galpón verde 2 (lx = 43.2, lz = -6..-19) + tanque cisterna horizontal al frente ---
    for (const sz of [-6.5, -10.5, -14.5, -18.5]){
      cylIn(g, 43.0, 3.1, sz, 1.65, 6.2, '#b2bac0');
      const cn = new THREE.Mesh(new THREE.ConeGeometry(1.75, .95, 18).translate(0, .475, 0), lam({ color: 0x9aa2a8 }));
      cn.position.set(43.0, 6.2, sz); g.add(cn);
    }
    {
      const tk = new THREE.Mesh(new THREE.CylinderGeometry(1.15, 1.15, 4.8, 18), lam({ color: 0xc2c7cb }));
      tk.rotation.z = Math.PI / 2; tk.position.set(45.5, 1.55, -1.8); tk.castShadow = true; g.add(tk);
      for (const sx of [44.0, 47.0]) bx(g, sx, 0, -1.8, .45, 1.1, 1.8, '#8d8b84');
    }

    // Playón / vereda de hormigón frente al Semillero y galpones verdes + transformador sobre doble poste de hormigón
    bx(g, 13.0, 0, 4.2, 54.0, .18, 4.6, '#bdb8ac');
    {
      const tx = 19.5, tz = 6.2;
      for (const dx of [-1.1, 1.1]){
        cylIn(g, tx + dx, 4.6, tz, .22, 9.2, '#aba69c');
        bx(g, tx + dx, 8.6, tz, .14, .14, 1.4, '#7a7e82');
      }
      bx(g, tx, 4.8, tz, 2.6, .18, .7, '#9a968c');
      bx(g, tx, 5.0, tz, 1.35, 1.25, .85, '#8a9196');
      bx(g, tx, 7.6, tz, 2.5, .12, .15, '#7a7e82');
    }

    colLocal(g, -10, -12, 10, 3.7, '#8f4a36');
    colLocal(g, 10, -18, 40, 2.1, '#2e6645');
    colLocal(g, 41.2, -20.2, 47.8, -.5, '#b2bac0');
    mapLabels.push([-505, -45, 'Cooperativa']);
  }

  // Si quedó algún galpón grande en el fondo oeste del predio, dibujarlo también
  big.forEach(pts => {
    const o = obb(pts), g = group(o.cx, o.cz, Math.PI / 2 - o.ang), l = o.len, w = o.wid;
    bx(g, 0, 0, 0, w, 8.5, l, '#c3c7ca'); bx(g, 0, 0, 0, w + .1, 1, l + .1, '#9aa1a6');
    gableIn(g, 0, 8.5, 0, l + .8, Math.min(3.2, w * .2), w + 1, '#9aa3a8', Math.PI / 2);
    colLocal(g, -w / 2, -l / 2, w / 2, l / 2, '#c3c7ca');
  });

  // alambrado divisorio en z = -82.5 (entre la Cooperativa y la Casa Azul) y cortina de árboles sobre la RP 20-S
  const fence = (ax, az, bx2, bz) => { const l = Math.hypot(bx2 - ax, bz - az), n = Math.max(1, Math.round(l / 3)); for (let k = 0; k <= n; k++){ const t = k / n; poles.add(ax + (bx2 - ax) * t, 0, az + (bz - az) * t, .08, 1.9, .08, 0, '#9aa0a5'); } const g = group(0, 0); poleIn(g, [ax, 1.8, az], [bx2, 1.8, bz], .025, '#9aa0a5'); poleIn(g, [ax, .9, az], [bx2, .9, bz], .02, '#9aa0a5'); addCol(Math.min(ax, bx2) - .1, Math.min(az, bz) - .1, Math.max(ax, bx2) + .1, Math.max(az, bz) + .1); };
  fence(-522, -82.5, -492.3, -82.5); fence(-492.3, -82.5, -492.3, -74.5);
  for (let t = 0; t < 1; t += .045){ const x = -548 + (-588 + 548) * t, z = -24 + (-140 + 24) * t; treeSpots.push([x - 6, z, R(1.1, 1.5), false]); }

  // =========================================================================
  // CASITAS AL NORTE DEL SEMILLERO sobre Gran Av. 25 de Mayo (fotos de Street View + satélite del usuario), de sur a norte:
  // A) galpón de chapa blanca con portón doble · B) casa blanca de techo plano con cenefa naranja, zócalo salmón y ventana con persiana gris ·
  // C) tramo rosado con puerta · D) pilares de ladrillo con portón de malla, puentecito de tablas sobre la zanja y galponcito de ladrillo atrás ·
  // E) casa blanca con alero de tejas, jardín tupido y torrecita de 2 pisos con techo de tejas y chimenea ·
  // F) pilares de ladrillo con portón de reja negro, cerco de santa rita roja, pilar con buzón y tranquera de caño al camino de tierra ·
  // G) galpón gris grande con techo redondo (parabólico) al fondo del camino. Adelante de todo, la zanja con pasto.
  // =========================================================================
  {
    const G = group(-498.5, -84.0, Math.PI / 2);   // local: +lz = hacia la avenida (+x), +lx = hacia el norte (-z)
    const Wd = (lx, lz) => [-498.5 + lz, -84.0 - lx];
    const rectL = (lx0, lz0, lx1, lz1, y, col) => { const [ax, az] = Wd(lx0, lz0), [bx2, bz] = Wd(lx1, lz1); flat.rect(Math.min(ax, bx2), Math.min(az, bz), Math.max(ax, bx2), Math.max(az, bz), y, col); };
    const LAD = '#a95f45', NAR = '#d9804e', SAL = '#d98c78', IRON = '#232323';
    const barras = (x, y0, z, w, h, col = IRON, step = .13) => { for (let k = 1; k < Math.round(w / step); k++) bx(G, x - w / 2 + k * step, y0, z, .03, h, .03, col); for (const y of [y0, y0 + h - .04]) bx(G, x, y, z, w, .04, .04, col); };
    const pilar = (lx, lz, h = 1.9) => bx(G, lx, 0, lz, .45, h, .45, LAD);

    // --- piso: pasto adelante, zanja con agua y pasto, entradas de tierra / cemento
    rectL(0, 0, 42, 6.2, .05, '#6f8f45');
    rectL(0, 3.3, 42, 4.9, .066, '#4f6b33'); rectL(0, 3.9, 42, 4.3, .068, '#5d5a3e');            // zanja
    rectL(.4, 0, 4.6, 6.2, .075, '#a89678');                                                       // entrada al galpón de chapa
    rectL(36.3, 0, 39.9, 6.2, .075, '#a69476'); rectL(36.6, -11.2, 39.6, 0, .06, '#a69476');        // camino de tierra al galpón gris
    rectL(26.6, 0, 28, 6.2, .075, '#c2bdb2');                                                      // caminito de cemento al portón negro
    { const pg = group(...Wd(2.5, 4.1)); poleIn(pg, [0, .25, -2.4], [0, .25, 2.4], .28, '#9a958a'); }  // caño de la alcantarilla
    for (let k = 0; k < 9; k++) bx(G, 13.95 + k * .27, 0, 4.1, .24, .1, 2.0, k % 2 ? '#8a6e52' : '#9c7f60');   // puentecito de tablas (foto)

    // --- A) galpón de chapa blanca con portón doble (lx 0.4..4.6)
    bx(G, 2.5, 0, -5, 4.2, 3.0, 10, '#e4e7e9'); boxIn(G, 2.5, 3.08, -5, 4.4, .1, 10.3, '#cfd3d6', -.04);
    for (const s of [-1, 1]) bx(G, 2.5 + s * .95, 0, .03, 1.85, 2.7, .05, '#f1f2f3');
    for (let x = .7; x < 4.4; x += .22) bx(G, x, 0, .07, .04, 2.7, .02, '#c3c8cc');
    colLocal(G, .4, -10, 4.6, 0, '#e4e7e9');

    // --- B) casa blanca, techo plano, cenefa naranja arriba y zócalo salmón; ventana chica con reja y ventana con persiana gris
    bx(G, 7.8, 0, -4.5, 6.4, 3.0, 9, '#eceae4');
    bx(G, 7.8, 2.7, .03, 6.45, .32, .1, NAR); bx(G, 7.8, 0, .03, 6.45, .45, .08, SAL);
    for (const [x, y, w, h] of [[5.6, 1.6, .8, .6], [9.9, .7, 1.1, .5], [7.2, 2.0, .6, .4]]) bx(G, x, y, .05, w, h, .02, '#d6d2c8');   // manchas
    bx(G, 6.2, 1.1, .05, 1.0, 1.0, .05, '#3b4a55'); barras(6.2, 1.1, .1, 1.0, 1.0, '#e6e6e6', .12);
    bx(G, 8.9, .8, .04, 1.65, 1.6, .06, '#b9b6ae');                                                // marco gris
    bx(G, 8.9, .95, .08, 1.3, 1.3, .04, '#9a9da0'); for (let y = 1.0; y < 2.2; y += .09) bx(G, 8.9, y, .105, 1.3, .015, .01, '#86898c');   // persiana de enrollar
    bx(G, 8.9, 0, .45, 1.3, .2, .7, '#b9b6ae');                                                    // escalón
    cylIn(G, 9.2, 3.6, -6, .55, 1.2, '#9aa0a5');                                                   // tanque en el techo
    colLocal(G, 4.6, -9, 11, 0, '#eceae4');

    // --- C) tramo rosado con puerta
    bx(G, 12.3, 0, -4.8, 2.6, 3.0, 9, SAL); bx(G, 12.3, 2.7, .03, 2.65, .32, .1, NAR);
    bx(G, 12.3, 0, .04, .9, 2.1, .06, '#9a4a35');
    colLocal(G, 11, -9.6, 13.6, 0, SAL);

    // --- D) pilares de ladrillo con portón de malla; tapiales de ladrillo hacia adentro y galponcito de ladrillo con techo oscuro
    pilar(13.85, 0); pilar(16.15, 0);
    bx(G, 15, 0, 0, 1.85, .05, .05, IRON); barras(15, .05, 0, 1.85, 1.75, '#6a6e72', .1);
    for (const x of [13.85, 16.15]) bx(G, x, 0, -2, .25, 1.9, 4, LAD);
    bx(G, 15.6, 0, -6.6, 4.4, 2.6, 5.2, LAD); gableIn(G, 15.6, 2.6, -6.6, 5.8, .9, 4.9, '#3a3d40', Math.PI / 2);
    rectL(13.9, -4, 16.1, 0, .06, '#c2bdb2');
    colLocal(G, 13.4, -9.2, 17.8, -4, LAD); colLocal(G, 13.6, -.3, 14.1, .3, null); colLocal(G, 15.9, -.3, 16.4, .3, null);

    // --- E) casa blanca con alero de tejas, jardín tupido y torrecita de 2 pisos con techo de tejas y chimenea
    bx(G, 21.4, 0, -6, 9.6, 2.8, 9, '#f2efe8');
    { const eave = new THREE.Mesh(new THREE.BoxGeometry(9.9, .14, 1.2), lam({ color: 0xb5583a })); eave.position.set(21.4, 2.7, -1.1); eave.rotation.x = .3; eave.castShadow = true; G.add(eave);
      for (let k = 0; k < 20; k++){ const t = new THREE.Mesh(new THREE.BoxGeometry(.08, .1, 1.2), lam({ color: 0x9e4a30 })); t.position.set(16.75 + k * .49, 2.77, -1.1); t.rotation.x = .3; G.add(t); } }
    bx(G, 17.9, 1.0, -1.45, 1.3, 1.2, .06, '#3b4a55'); barras(17.9, 1.0, -1.4, 1.3, 1.2, '#e6e6e6', .14);
    bx(G, 20.4, 0, -1.45, .95, 2.1, .06, '#5f8f6a');
    bx(G, 23.8, .95, -1.44, 1.5, 1.25, .08, '#e2ddd2'); for (let y = 1.0; y < 2.15; y += .1) bx(G, 23.8, y, -1.39, 1.4, .02, .01, '#c9c3b6');
    bx(G, 20.6, 2.8, -6.5, 4.2, 2.8, 4.2, '#efebe2'); gableIn(G, 20.6, 5.6, -6.5, 4.8, 1.3, 4.8, '#b5583a', 0);
    bx(G, 21.7, 5.6, -7.4, .55, 1.5, .55, '#9a5a40'); bx(G, 21.7, 7.1, -7.4, .7, .12, .7, '#7f4a36');   // chimenea
    bx(G, 20.6, 3.6, -4.37, 1.0, .9, .06, '#3b4a55');
    cylIn(G, 23.3, 3.4, -8.5, .5, 1.1, '#e6e9ec');
    colLocal(G, 16.6, -10.5, 26.2, -1.5, '#f2efe8');
    for (const [lx, lz, s] of [[17.2, -.4, .9], [18.6, .3, 1.1], [19.8, -.6, .8], [21.2, .4, 1.2], [22.6, -.3, .9], [24.0, .5, 1.0], [25.2, -.5, .8], [23.4, 1.6, .7], [18.0, 1.9, .6]]){ const [x, z] = Wd(lx, lz); addBush(x, z, s, 0); }
    addTree(...Wd(22.2, -.6), .75, false, ['#4b7a30', '#5e8a3a', '#557f35']);                    // naranjo del jardín
    // cerco bajo con pilares de ladrillo sobre el frente del jardín
    pilar(16.4, .2, 1.2); pilar(26.2, .2, 1.2);

    // --- F) portón de reja negro entre pilares, cerco de santa rita roja tras rejita negra, pilar con buzón y tranquera de caño
    pilar(26.4, .2, 2.0); pilar(28.8, .2, 2.0); barras(27.6, 0, .2, 2.0, 1.85, IRON, .12);
    barras(32.2, 0, .25, 6.6, 1.1, IRON, .14);
    for (let lx = 29.2; lx < 35.4; lx += .9){ const [x, z] = Wd(lx, -.5); const s = R(.9, 1.2);
      crowns.add(x, .8 * s, z, 1.1 * s, .95 * s, 1.0 * s, R(0, 6), '#3f6b2a');
      for (let k = 0; k < 4; k++) crowns.add(x + R(-.6, .6), R(.6, 1.7) * s, z + R(-.6, .4), .38, .32, .38, R(0, 6), pick(['#c43e2d', '#d9583a', '#b8322a', '#e0603f'])); }
    colLocal(G, 28.8, -1.1, 35.6, .4, null);
    pilar(35.85, .2, 1.6); bx(G, 35.85, .95, .45, .3, .35, .1, '#c0392b'); bx(G, 35.85, 1.4, .44, .35, .25, .03, '#f2f2f2');
    bx(G, 36.15, 0, .2, .22, 1.7, .22, '#6e523a'); bx(G, 40.1, 0, .2, .22, 1.7, .22, '#6e523a');   // postes de la tranquera
    for (const y of [.35, .75, 1.15]) bx(G, 38.1, y, .2, 3.8, .06, .06, '#8d8f8c');
    for (const x of [37.1, 38.1, 39.1]) bx(G, x, .3, .2, .06, .9, .06, '#8d8f8c');
    { const d = new THREE.Mesh(new THREE.CylinderGeometry(.03, .03, 4.1, 6), lam({ color: 0x8d8f8c })); d.position.set(38.1, .75, .2); d.rotation.z = Math.atan2(.85, 3.8) + Math.PI / 2; G.add(d); }
    colLocal(G, 36.1, -.1, 40.2, .3, null);
    // alambrado del campo, después de la tranquera
    for (let lx = 40.4; lx < 46; lx += 2.6) bx(G, lx, 0, .2, .12, 1.3, .12, '#6e523a');
    for (const y of [.5, .9, 1.25]) bx(G, 43.2, y, .2, 5.8, .02, .02, '#9a9a95');

    // --- G) galpón gris grande de techo redondo al fondo del camino (frente con portones mirando a la avenida)
    {
      const gg = group(-520.5, -122.1, Math.PI / 2), W2 = 6.8, L = 22, HS = 4.2, HR = 3.6;   // local x = ancho (hacia el norte), z = largo (hacia la avenida)
      const top = x => HS + HR * Math.sqrt(Math.max(0, 1 - (x / W2) ** 2));
      const arc = off => { const p = []; for (let k = 0; k <= 28; k++){ const x = -W2 + k * 2 * W2 / 28; p.push(new THREE.Vector2(x, top(x) + off)); } return p; };
      bx(gg, 0, 0, 0, 2 * W2, HS, L, '#8f969c');
      { const sh = new THREE.Shape(); sh.moveTo(-W2, 0); for (const p of arc(0)) sh.lineTo(p.x, p.y); sh.lineTo(W2, 0); sh.closePath();
        const geo = new THREE.ExtrudeGeometry(sh, { depth: .2, bevelEnabled: false });
        for (const z of [L / 2 - .2, -L / 2]){ const m = new THREE.Mesh(geo, lam({ color: '#9aa1a7' })); m.position.z = z; m.castShadow = m.receiveShadow = true; gg.add(m); } }
      { const t = arc(.15), b = arc(0).reverse(), sh = new THREE.Shape(); sh.moveTo(t[0].x, t[0].y); for (const p of t) sh.lineTo(p.x, p.y); for (const p of b) sh.lineTo(p.x, p.y); sh.closePath();
        const m = new THREE.Mesh(new THREE.ExtrudeGeometry(sh, { depth: L + .4, bevelEnabled: false }), lam({ color: '#7f878d', side: THREE.DoubleSide })); m.position.z = -L / 2 - .2; m.castShadow = true; gg.add(m); }
      for (let x = -W2 + .6; x < W2; x += .55) bx(gg, x, 0, L / 2 + .01, .04, Math.min(top(x), HS + 2) - .1, .02, '#808890');   // chapa acanalada del frente
      for (const s of [-1, 1]) bx(gg, s * 1.6, 0, L / 2 + .03, 3.1, 4.6, .06, '#a3aab0');          // portones corredizos
      bx(gg, 0, 0, L / 2 + .05, .08, 4.6, .03, '#6f767c');
      colLocal(gg, -W2, -L / 2, W2, L / 2, '#8f969c');
    }

    // árboles y postes de la vereda (fotos)
    addTree(...Wd(4.9, 3.0), 1.05, false, ['#a0642c', '#8a5a2b', '#9c6b35']);
    addTree(...Wd(11.8, 5.2), 1.2, false, ['#a0642c', '#8a5a2b', '#9c6b35']);
    addTree(...Wd(17.6, 2.6), 1.15, false, ['#a0642c', '#8a5a2b', '#9c6b35']);
    addTree(...Wd(33.2, 5.0), 1.05, false, ['#a0642c', '#8a5a2b', '#9c6b35']);
    { const [x, z] = Wd(13.2, 5.4); poles.add(x, 0, z, .12, 8, .12, 0, '#d9907a'); addCol(x - .15, z - .15, x + .15, z + .15); }
    { const [x, z] = Wd(41, 5.6); poles.add(x, 0, z, .12, 7.5, .12, 0, '#d9622b'); trims.add(x, 7.4, z + .8, .12, .12, 1.8, 0, '#d9622b'); addCol(x - .15, z - .15, x + .15, z + .15); }
    // acoplado chico de madera en el pasto, frente a la casa blanca (foto)
    bx(G, 8.6, .48, 3.0, 2.4, .62, 1.4, '#6b5340'); for (const z of [2.25, 3.75]) bx(G, 8.6, .6, z, 2.4, .5, .05, '#7a6048');
    for (const z of [3.85, 2.15]) poleIn(G, [9.2, .34, z - .09], [9.2, .34, z + .09], .34, '#262626');
    poleIn(G, [7.4, .44, 3.0], [6.0, .12, 3.0], .05, '#3b3b3b');
    mapLabels.push([-520.5, -122.1, 'Galpón']);
  }
}

// =========================================================================
// AV. 25 DE MAYO 1070 (lado este, entre Monguillot y Bv. Lavalle) — Street View, fotos del patio y dibujo del usuario sobre el satélite
// El frente da a la avenida. De adelante hacia el fondo: casa ocre de techo plano a todo el ancho del lote (con la cochera techada
// adelante, del lado de la canchita) · galería a todo el ancho detrás de la casa, mirando al patio · patio con pileta del lado del
// baldío, parque con hamaca de madera, muro ocre y cerco de cañas. Al costado: baldío hacia la esquina de Monguillot y del otro lado
// la canchita de fútbol con dos arcos de madera y un techito para el auto.
// =========================================================================





/* =========================================================
   Subdivisión interior de manzanas: patios, medianeras y tapiales
   ========================================================= */
function buildBlockPatiosAndWalls(){
  const GRASS = ['#648441','#708e48','#5c7b3b','#77924e','#678246'];
  const PATIO = ['#bfb8aa','#c8c1b4','#b4ada0'];
  const MED_C = ['#d9d2c5','#cfc7b8','#c79a7e','#e2dcd0','#c4beb2'];
  const HEDGE = ['#436b33','#4e783c','#3c622e'];
  const CIVIC_EXCL = [
    [-90, -330, -55, -250],   // Esc. 186 + Escuela Taller 167 + casas esquina Córdoba/Lavalle + iglesia
    [-60, -281, -13, -250],   // Iglesia + salón trasero y patio con garaje
    [-91, -400, -63, -352],   // Museo + Bomberos
    [13, -432, 62, -398]      // Comuna extendida
  ];
  // lotes armados a mano (casa de 25 de Mayo 1070 con canchita y baldío, casas de San Luis / Entre Ríos / Jujuy): sin medianeras ni patios automáticos encima
  const HAND_LOTS = [CASA1070_POLY, AMFAC_INT_POLY, ESQ_AGUA_POLY, PLAZA_SE_SUR_POLY, SANLUIS_E_POLY, ENTRERIOS_O_POLY, JUJUY_S_POLY, CORREO_N_POLY, DIABLITO_S_POLY, COMISARIA_POLY, JUJUY_SO_POLY, JUJUY_N_POLY, AVC_O_POLY, BRUNET_N_POLY, MANZANA_BRUNET_POLY, ARIGA_POLY, BRUNET_S_POLY, CORDOBA_E_POLY, ESCEN_N_POLY, ESCEN_E_POLY, LAV_ER_MONG_POLY, MONG_POLY, MONG_S_POLY, CORD_BOMB_POLY, MUSEO_POLY, BOMB_N_POLY, SAGARDUY_POLY, LAV25_POLY, LAV25_E_POLY, ACOPIO_POLY, HOGAR_POLY, SHELL_POLY, CENT_BOL_POLY, ESC_BRUNET_POLY, BRUNET_IND_POLY, CASA_IRI_POLY, CENT_O_BOL_POLY];
  const inExcl = (x, z) => CIVIC_EXCL.some(r => x > r[0] && x < r[2] && z > r[1] && z < r[3]) || HAND_LOTS.some(p => inPoly(x, z, p));
  const ptFree = (x, z) => !!region(...AB(x, z), 0) && !pointOnRoad(x, z) && !inPlaza(x - .5, z - .5, x + .5, z + .5) && !inOsmPark(x, z) && !inRailZone(x, z) && !inExcl(x, z);
  const segClear = (x0, z0, x1, z1, pad) => ptFree((x0 + x1) / 2, (z0 + z1) / 2) && ptFree(x0, z0) && ptFree(x1, z1) && !overlap(x0 - pad, z0 - pad, x1 + pad, z1 + pad);
  const putWallSeg = (horiz, fixed, a0, a1, h, th, col) => {
    const step = 2.5;
    let run = null;
    const flush = () => {
      if (!run || run[1] - run[0] < 1.8) return;
      const len = run[1] - run[0], mid = (run[0] + run[1]) / 2;
      const x = horiz ? mid : fixed, z = horiz ? fixed : mid;
      const sx = horiz ? len : th, sz = horiz ? th : len;
      walls.add(x, 0, z, sx, h, sz, 0, col);
      addCol(x - sx / 2, z - sz / 2, x + sx / 2, z + sz / 2);
    };
    for (let u = a0; u < a1 - .5; u += step){
      const v = Math.min(u + step, a1);
      const x0 = horiz ? u : fixed - th / 2, z0 = horiz ? fixed - th / 2 : u;
      const x1 = horiz ? v : fixed + th / 2, z1 = horiz ? fixed + th / 2 : v;
      if (segClear(x0, z0, x1, z1, .45)){ if (!run) run = [u, v]; else run[1] = v; }
      else { flush(); run = null; }
    }
    flush();
  };

  // Elevar el césped base de todas las manzanas urbanas (fuera de las 4 plazas centrales y vías) al nivel de la vereda
  for (let i = 0; i < NA; i++) for (let j = 0; j < NB; j++){
    if (isPlaza(i, j)) continue;
    const [ix0, iz0, ix1, iz1] = inner(i, j);
    if (ix1 - ix0 < 16 || iz1 - iz0 < 16) continue;
    if (!regionRect(ix0, iz0, ix1, iz1, 0)) continue;
    const cx = (ix0 + ix1) / 2, cz = (iz0 + iz1) / 2;
    if (inRailZone(cx, cz) || inRailZone(ix0, iz0) || inRailZone(ix1, iz1) || inRailZone(ix0, iz1) || inRailZone(ix1, iz0)) continue;
    flat.rect(ix0, iz0, ix1, iz1, .175, '#6f8c48');
  }

  for (let i = 0; i < NA; i++) for (let j = 0; j < NB; j++){
    const [ix0, iz0, ix1, iz1] = inner(i, j);
    if (ix1 - ix0 < 24 || iz1 - iz0 < 24) continue;
    // omitir manzanas totalmente cubiertas por un predio entero (ej. Polideportivo)
    if (plazaRects.some(r => ix0 + 2 >= r[0] && ix1 - 2 <= r[2] && iz0 + 2 >= r[1] && iz1 - 2 <= r[3])) continue;
    let any = false;
    for (const fx of [.2, .5, .8]) for (const fz of [.2, .5, .8]) if (ptFree(ix0 + (ix1 - ix0) * fx, iz0 + (iz1 - iz0) * fz)) any = true;
    if (!any) continue;

    // División tipo catastral argentina: lotes frentistas en los 4 lados + espina central / pulmón de manzana
    const cw = Math.min(18, (ix1 - ix0) * .24), midZ = (iz0 + iz1) / 2 + R(-2.5, 2.5);
    const xs = [ix0, ix0 + cw];
    for (let x = ix0 + cw + R(12, 16); x < ix1 - cw - 8; x += R(12, 16)) xs.push(x);
    xs.push(ix1 - cw, ix1);
    const parcels = [];
    for (let k = 0; k < xs.length - 1; k++){
      parcels.push([xs[k], iz0, xs[k + 1], midZ], [xs[k], midZ, xs[k + 1], iz1]);
    }
    // 1) Pasto variado por lote, losas de patio y alguna pileta en el pulmón libre
    let hadPool = false;
    for (const [lx0, lz0, lx1, lz1] of parcels){
      const cx = (lx0 + lx1) / 2, cz = (lz0 + lz1) / 2;
      if (!ptFree(cx, cz) || !ptFree(lx0 + 1.5, lz0 + 1.5) || !ptFree(lx1 - 1.5, lz1 - 1.5) ||
          !ptFree(lx0 + 1.5, lz1 - 1.5) || !ptFree(lx1 - 1.5, lz0 + 1.5)) continue;
      flat.rect(lx0 + .25, lz0 + .25, lx1 - .25, lz1 - .25, .032, pick(GRASS));
      const inBack = cz < midZ ? lz1 - R(4, 9) : lz0 + R(4, 9);
      const pw = R(4.2, Math.min(7.2, (lx1 - lx0) - 3)), pd = R(3.6, 5.8);
      const px0 = cx - pw / 2, pz0 = Math.max(lz0 + 1.5, inBack - pd / 2);
      const px1 = cx + pw / 2, pz1 = Math.min(lz1 - 1.5, pz0 + pd);
      if (px1 - px0 < 3 || pz1 - pz0 < 3) continue;
      if (segClear(px0, pz0, px1, pz1, .85)){
        if (!hadPool && rnd() < .14 && px1 - px0 >= 4.5 && pz1 - pz0 >= 3.2){
          hadPool = true;
          const ox0 = cx - 2.4, oz0 = (pz0 + pz1) / 2 - 1.4, ox1 = cx + 2.4, oz1 = (pz0 + pz1) / 2 + 1.4;
          flat.rect(ox0, oz0, ox1, oz1, .045, '#e7e2d7');
          flat.rect(ox0 + .35, oz0 + .35, ox1 - .35, oz1 - .35, .052, '#3498db');
          addCol(ox0, oz0, ox1, oz1);
        } else if (rnd() < .52){
          flat.rect(px0, pz0, px1, pz1, .042, pick(PATIO));
        }
      }
    }
    // 2) Medianeras internas continuas por tramo limpio (alejadas de la vereda, sin tapiales frontales)
    putWallSeg(true, midZ, ix0 + 6, ix1 - 6, pick([1.9, 2.1, 2.2]), .24, pick(MED_C));
    for (let k = 1; k < xs.length - 1; k++){
      putWallSeg(false, xs[k], iz0 + 6, midZ - .2, pick([1.85, 2.05, 2.2]), .22, pick(MED_C));
      putWallSeg(false, xs[k], midZ + .2, iz1 - 6, pick([1.85, 2.05, 2.2]), .22, pick(MED_C));
    }
  }
}
buildBlockPatiosAndWalls();

/* =========================================================
   Casas en cada manzana
   ========================================================= */
const WALL_COLS = ['#f2ede3','#e8dcc4','#d9c7a7','#f5f0e6','#cfd8dc','#e7c9a9','#c97b5a','#b5654a','#e6d8ad','#d7e3c8','#f0d9d0','#efe3b8','#d6c2c9'];
const ROOF_COLS = ['#8e3b2f','#a24a35','#6b4a3a','#7a3229','#5f6366','#4a5a6a','#9a5a3a'];
const TRIM_COLS = ['#d8d4cc','#bfb9ae','#e9e5dc','#a9a39a'];
function tryHouse(cx, cz, w, d, front, core, twoFloorP, gableP, prob){
  if (USE_REAL_BUILDINGS) return;   // con los techos reales de Overture ya no se inventan casas
  const along = front === 'N' || front === 'S';
  const sx = along ? w : d, sz = along ? d : w;
  const reg = regionRect(cx - sx/2, cz - sz/2, cx + sx/2, cz + sz/2, 14);
  if (!reg || rnd() > prob[reg]) return;
  if (inPlaza(cx - sx/2, cz - sz/2, cx + sx/2, cz + sz/2) || inYard(cx, cz) || inOsmPark(cx, cz)) return;
  if (overlap(cx - sx/2 - .4, cz - sz/2 - .4, cx + sx/2 + .4, cz + sz/2 + .4)) return;
  const floors = rnd() < twoFloorP ? 2 : 1, h = floors * 3.1 + R(0, .4);
  walls.add(cx, 0, cz, sx, h, sz, 0, pick(WALL_COLS));
  if (rnd() < gableP){
    const rh = Math.min(sx, sz) * R(.28, .4), rc = pick(ROOF_COLS);
    if (along) roofs.add(cx, h, cz, sx + .6, rh, sz + .6, 0, rc); else roofs.add(cx, h, cz, sz + .6, rh, sx + .6, Math.PI/2, rc);
  } else trims.add(cx, h, cz, sx + .25, .55, sz + .25, 0, pick(TRIM_COLS));
  addCol(cx - sx/2, cz - sz/2, cx + sx/2, cz + sz/2);
  mapRects.push([cx - sx/2, cz - sz/2, cx + sx/2, cz + sz/2]);
  // puerta y ventanas en el frente
  const n = { N: [0,-1], S: [0,1], E: [1,0], W: [-1,0] }[front];
  const fx = cx + n[0] * sx/2, fz = cz + n[1] * sz/2;
  const put = (off, y, ww, hh, col) => along ? darks.add(fx + off, y, fz, ww, hh, .16, 0, col) : darks.add(fx, y, fz + off, .16, hh, ww, 0, col);
  const door = R(-.25, .25) * w;
  put(door, 0, 1.1, 2.2, '#5a3b22');
  for (let o = -w/2 + 1.6; o <= w/2 - 1.6; o += 2.8){
    if (Math.abs(o - door) > 1.6) put(o, 1.1, 1.3, 1.25, '#2b3440');
    if (floors > 1) put(o, 4.2, 1.3, 1.25, '#2b3440');
  }
}
function lots(start, end, make){
  let u = start;
  while (u < end - 6){ const e = Math.min(u + R(9, 15), end), w = e - u - R(.6, 2.5); if (w > 5.5) make(u + (e - u)/2, w); u = e; }
}
for (let i = 0; i < NA; i++) for (let j = 0; j < NB; j++){
  const [ix0, iz0, ix1, iz1] = inner(i, j);
  const ac = i*G + G/2, bc = j*G + G/2;
  const core = ac >= 78 && ac <= 351 && bc >= 39 && bc <= 351;
  const prob = { NE: core ? .93 : .62, SO: .6 };
  const twoFloorP = core && Math.abs(ac - 195) < 90 && bc < 260 ? .35 : .07;
  const gableP = core ? .35 : .6;
  const dMax = Math.min(17, (iz1 - iz0) / 2 - 1);
  const sb = () => core ? R(0, .6) : R(.5, 4);
  const corner = 15;
  lots(ix0, ix1, (u, w) => { const d = R(9, dMax), b = sb(); tryHouse(u, iz0 + b + d/2, w, d, 'N', core, twoFloorP, gableP, prob); });
  lots(ix0, ix1, (u, w) => { const d = R(9, dMax), b = sb(); tryHouse(u, iz1 - b - d/2, w, d, 'S', core, twoFloorP, gableP, prob); });
  lots(iz0 + corner, iz1 - corner, (u, w) => { const d = R(9, dMax), b = sb(); tryHouse(ix0 + b + d/2, u, w, d, 'W', core, twoFloorP, gableP, prob); });
  lots(iz0 + corner, iz1 - corner, (u, w) => { const d = R(9, dMax), b = sb(); tryHouse(ix1 - b - d/2, u, w, d, 'E', core, twoFloorP, gableP, prob); });
  // árboles en los fondos
  const n = core ? R(5, 10) : R(10, 18);
  for (let k = 0; k < n; k++) treeSpots.push([R(ix0 + 3, ix1 - 3), R(iz0 + 3, iz1 - 3), R(.8, 1.35), true]);
}

/* =========================================================
   Árboles y faroles
   ========================================================= */

for (const [x, z, s, c] of treeSpots) addTree(x, z, s, c);
const SIN_ARBOLES = [[-37, -435, -23, -429.5], [-90, -336, -54, -327], [-94, -321, -89, -307]];   // veredas donde no van árboles automáticos (Taller de Mario, frente Bv. Lavalle y frente Lo del Pollo)
const frentePorton = (x, z) => CAR_OPEN.some(([x0, z0, x1, z1]) => x > x0 - 1.8 && x < x1 + 1.8 && z > z0 - 1.8 && z < z1 + 1.8)
  || SIN_ARBOLES.some(([x0, z0, x1, z1]) => x > x0 && x < x1 && z > z0 && z < z1);   // nada de árboles delante de un portón
for (const [x, z, s] of streetTreeSpots) if (!overlap(x - .8, z - .8, x + .8, z + .8) && !frentePorton(x, z)) addTree(x, z, s, false);
for (const [x, z, s] of ruralTreeSpots) if (!nearRuralRoad(x, z) && !nearRail(x, z, 7) && !inTownBox(x, z, 10) && !ruralExcl.some(r => x > r[0] && x < r[2] && z > r[1] && z < r[3])) addTree(x, z, s, false);
for (const [x, z] of lampSpots){
  poles.add(x, 0, z, .22, 7, .22, 0, '#5d6066');
  trims.add(x, 7, z, 3.4, .2, .4, 0, '#5d6066');
  trims.add(x - 1.5, 6.85, z, .7, .15, .5, 0, '#fff4c8');
  trims.add(x + 1.5, 6.85, z, .7, .15, .5, 0, '#fff4c8');
}

// Eliminación automática de z-fighting 3D en toda la escena:
// 1) Carteles, murales y calcos (PlaneGeometry, excepto ground) reciben polygonOffset negativo.
// 2) En cada edificio (Group), detecta cajas BoxGeometry hermanas con caras exteriores coplanares superpuestas y desplaza 4 mm hacia afuera solo la cara de la caja menor.
{
  const EPS = .0028, NUDGE = .004;
  const maxAniso = Math.min(renderer.capabilities.getMaxAnisotropy(), 16);
  const containers = [scene];
  scene.traverse(o => {
    if (o.isMesh && o.material){
      const mats = Array.isArray(o.material) ? o.material : [o.material];
      for (const m of mats){
        if (m && m.map){
          m.map.anisotropy = Math.max(m.map.anisotropy || 1, maxAniso);
          m.map.generateMipmaps = true;
          m.map.minFilter = THREE.LinearMipmapLinearFilter;
          m.map.magFilter = THREE.LinearFilter;
          m.map.needsUpdate = true;
        }
      }
    }
    if (o !== ground && o.isMesh && o.geometry && o.geometry.type === 'PlaneGeometry' && o.material && !Array.isArray(o.material)){
      o.material.polygonOffset = true;
      o.material.polygonOffsetFactor = -2;
      o.material.polygonOffsetUnits = -2;
    }
    if (o.isGroup && o.children.length > 1) containers.push(o);
  });
  for (const grp of containers){
    const boxes = [];
    for (const c of grp.children){
      if (!c.isMesh || !c.geometry || c.geometry.type !== 'BoxGeometry') continue;
      if (Math.abs(c.rotation.x) > 1e-4 || Math.abs(c.rotation.y) > 1e-4 || Math.abs(c.rotation.z) > 1e-4) continue;
      const p = c.geometry.parameters;
      if (!p) continue;
      const sx = p.width * Math.abs(c.scale.x), sy = p.height * Math.abs(c.scale.y), sz = p.depth * Math.abs(c.scale.z);
      if (sx < 1e-4 || sy < 1e-4 || sz < 1e-4) continue;
      // centro real de la caja: las de box() usan boxGeo, que está corrida para apoyar en el piso (no centrada)
      if (!c.geometry.boundingBox) c.geometry.computeBoundingBox();
      const gc = c.geometry.boundingBox.getCenter(new THREE.Vector3());
      const cx = c.position.x + gc.x * c.scale.x, cy = c.position.y + gc.y * c.scale.y, cz = c.position.z + gc.z * c.scale.z;
      boxes.push({ m: c, gc, x0: cx - sx/2, x1: cx + sx/2, y0: cy - sy/2, y1: cy + sy/2, z0: cz - sz/2, z1: cz + sz/2, sx, sy, sz });
    }
    // agrandar una cara NUDGE hacia afuera sin mover la opuesta (respeta geometrías no centradas)
    const pushFace = (b, axis, side) => {
      if (axis === 'x'){ const ns = b.sx + NUDGE, s0 = b.m.scale.x; b.m.scale.x *= ns / b.sx; b.m.position.x += side * NUDGE / 2 - b.gc.x * (b.m.scale.x - s0); b.sx = ns; if (side < 0) b.x0 -= NUDGE; else b.x1 += NUDGE; }
      else if (axis === 'y'){ const ns = b.sy + NUDGE, s0 = b.m.scale.y; b.m.scale.y *= ns / b.sy; b.m.position.y += side * NUDGE / 2 - b.gc.y * (b.m.scale.y - s0); b.sy = ns; if (side < 0) b.y0 -= NUDGE; else b.y1 += NUDGE; }
      else { const ns = b.sz + NUDGE, s0 = b.m.scale.z; b.m.scale.z *= ns / b.sz; b.m.position.z += side * NUDGE / 2 - b.gc.z * (b.m.scale.z - s0); b.sz = ns; if (side < 0) b.z0 -= NUDGE; else b.z1 += NUDGE; }
    };
    const ov = (a0, a1, b0, b1) => Math.min(a1, b1) - Math.max(a0, b0) > .015;
    // OPTIMIZACIÓN: antes se comparaba cada caja con todas las demás del grupo (la escena tiene miles sueltas).
    // Ahora cada caja solo se compara con las de su misma celda de 8 m (margen de 25 cm por los corrimientos),
    // en el mismo orden que antes, así que el resultado es el mismo.
    const CS = 8, MG = .25, nB = boxes.length, cells = new Map(), bigL = [];
    for (let i = 0; i < nB; i++){
      const b = boxes[i];
      b.c0 = Math.floor((b.x0 - MG) / CS); b.c1 = Math.floor((b.x1 + MG) / CS); b.d0 = Math.floor((b.z0 - MG) / CS); b.d1 = Math.floor((b.z1 + MG) / CS);
      b.big = (b.c1 - b.c0 + 1) * (b.d1 - b.d0 + 1) > 64;
      if (b.big) { bigL.push(i); continue; }
      for (let cx = b.c0; cx <= b.c1; cx++) for (let cz = b.d0; cz <= b.d1; cz++){ const k = cx * 65536 + cz; let l = cells.get(k); if (!l) cells.set(k, l = []); l.push(i); }
    }
    const stamp = new Int32Array(nB).fill(-1);
    for (let i = 0; i < nB; i++){
      const a = boxes[i], js = [];
      if (a.big) for (let j = i + 1; j < nB; j++) js.push(j);
      else {
        const add = j => { if (j > i && stamp[j] !== i){ stamp[j] = i; js.push(j); } };
        for (const j of bigL) add(j);
        for (let cx = a.c0; cx <= a.c1; cx++) for (let cz = a.d0; cz <= a.d1; cz++){ const l = cells.get(cx * 65536 + cz); if (l) for (const j of l) add(j); }
        js.sort((p, q) => p - q);
      }
      for (const j of js){
        const b = boxes[j];
        if (a.x1 <= b.x0 - EPS || a.x0 >= b.x1 + EPS || a.y1 <= b.y0 - EPS || a.y0 >= b.y1 + EPS || a.z1 <= b.z0 - EPS || a.z0 >= b.z1 + EPS) continue;
        if (ov(a.y0, a.y1, b.y0, b.y1) && ov(a.z0, a.z1, b.z0, b.z1)){
          const target = (b.sy * b.sz <= a.sy * a.sz) ? b : a;
          if (Math.abs(a.x0 - b.x0) < EPS) pushFace(target, 'x', -1);
          if (Math.abs(a.x1 - b.x1) < EPS) pushFace(target, 'x', 1);
        }
        if (ov(a.x0, a.x1, b.x0, b.x1) && ov(a.y0, a.y1, b.y0, b.y1)){
          const target = (b.sx * b.sy <= a.sx * a.sy) ? b : a;
          if (Math.abs(a.z0 - b.z0) < EPS) pushFace(target, 'z', -1);
          if (Math.abs(a.z1 - b.z1) < EPS) pushFace(target, 'z', 1);
        }
        if (ov(a.x0, a.x1, b.x0, b.x1) && ov(a.z0, a.z1, b.z0, b.z1)){
          const target = (b.sx * b.sz <= a.sx * a.sz) ? b : a;
          if (Math.abs(a.y1 - b.y1) < EPS) pushFace(target, 'y', 1);
          if (a.y0 > .05 && b.y0 > .05 && Math.abs(a.y0 - b.y0) < EPS) pushFace(target, 'y', -1);
        }
      }
    }
  }
}

  Object.assign(ctx, { pointOnRoad, USE_REAL_BUILDINGS });
}
