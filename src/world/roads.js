// Red vial, ferrocarril, pasos a nivel, campos rurales y Acceso a Peyrano
export function buildRoads(ctx) {
  const {
    ACC_PTS, ACC_RAMP_N, ACC_RAMP_S, AMAX, BMAX, BV_FC_NE, BV_FC_SO, CA, CAR_OPEN, CB, CHACABUCO_PTS, CINCO_ESQ, FIELD_COLS, G, IRIONDO_TIERRA, NA, NB, NUEVE_JULIO_N, OSM, PASO_OESTE, R, R18_PTS, RAIL_YARD_POLY, ROAD_Y, RP10S_E, RP20S_PTS, RP26S_PTS, S, ST, THREE, TX0, TX1, TZ0, TZ1, W, addBush, addCarCol, addCol, addPalm, addTree, balls, box, bx, chacabucoB, cylIn, distToPolyline, flat, group, inPoly, inTownBox, mapFields, mapLabels, mapRects, mapRoads, nameA, nameB, nearRail, nearRuralRoad, overlap, pick, poleIn, poles, railB, railDist, region, rnd, roadLayer, roofs, scene, signIn, sleepers, textTex, trims, walls
  } = ctx;


const xs = [], zs = [];
for (let x = -3600; x < 3600; x += R(180, 420)) xs.push(x);
for (let z = -3600; z < 3600; z += R(220, 480)) zs.push(z);
const ruralTreeSpots = [];
for (let i = 0; i < xs.length - 1; i++) for (let j = 0; j < zs.length - 1; j++){
  const x0 = xs[i] + 4, x1 = xs[i+1] - 4, z0 = zs[j] + 4, z1 = zs[j+1] - 4;
  if (x1 > TX0 - 40 && x0 < TX1 + 40 && z1 > TZ0 - 40 && z0 < TZ1 + 40) continue;
  const col = pick(FIELD_COLS);
  flat.rect(x0, z0, x1, z1, -.12, col); mapFields.push([x0, z0, x1, z1, col]);
  // cortinas de árboles
  if (rnd() < .3){ const side = Math.floor(rnd()*4);
    for (let t = 0; t < 1; t += 6 / ((side < 2 ? x1 - x0 : z1 - z0))){
      const px = side < 2 ? x0 + (x1-x0)*t : (side === 2 ? x0 + 2 : x1 - 2);
      const pz = side < 2 ? (side === 0 ? z0 + 2 : z1 - 2) : z0 + (z1-z0)*t;
      ruralTreeSpots.push([px, pz, R(.9, 1.3)]);
    }
  }
  // chacra
  if (rnd() < .1){
    const cx = R(x0 + 40, x1 - 40), cz = R(z0 + 40, z1 - 40);
    if (!nearRuralRoad(cx, cz, 40) && !nearRail(cx, cz, 40)){
      ruralHouse(cx, cz);
      for (let a = 0; a < Math.PI*2; a += .22) ruralTreeSpots.push([cx + Math.cos(a)*26, cz + Math.sin(a)*26, R(1, 1.4)]);
    }
  }
}
function ruralHouse(cx, cz){
  const w = R(9,14), d = R(7,10), h = 3.2;
  walls.add(cx, 0, cz, w, h, d, 0, pick(['#f2ede3','#e8dcc4','#d9c7a7']));
  roofs.add(cx, h, cz, w + .6, d * .35, d + .6, 0, pick(['#8e3b2f','#6b4a3a','#5f6366']));
  addCol(cx - w/2, cz - d/2, cx + w/2, cz + d/2);
  mapRects.push([cx - w/2, cz - d/2, cx + w/2, cz + d/2]);
}

// (el arroyo, las zanjas y los desagües ahora salen de los datos reales de OpenStreetMap: ver "Datos reales de OSM")

/* =========================================================
   Vías del tren
   ========================================================= */
const railPts = [];
for (let a = -2200; a <= 1040; a += 1.5) railPts.push(W(a, railB(a)));
flat.ribbon(railPts, 4.6, .06, '#8a8070');
flat.ribbon(railPts, .14, .32, '#b9bcc2', .75);
flat.ribbon(railPts, .14, .32, '#b9bcc2', -.75);
mapRoads.push({ pts: railPts, w: 9, col: '#e02020', top: true });
{ // durmientes
  let acc = 0;
  for (let i = 1; i < railPts.length; i++){
    const [x0, z0] = railPts[i-1], [x1, z1] = railPts[i], l = Math.hypot(x1-x0, z1-z0);
    const ang = Math.atan2(x1-x0, z1-z0);
    for (; acc < l; acc += 1.1){ const t = acc / l; sleepers.add(x0 + (x1-x0)*t, .06, z0 + (z1-z0)*t, 2.5, .2, .26, ang, '#5a4636'); }
    acc -= l;
  }
}
// Árboles a lo largo de las vías, fuera del pueblo
for (let i = 0; i < railPts.length; i += 3){
  const [x, z] = railPts[i];
  if (inTownBox(x, z, 30)) continue;
  for (const s of [-1, 1]) if (rnd() < .45){
    const p = railPts[Math.min(i+1, railPts.length-1)], tx = p[0]-x, tz = p[1]-z, l = Math.hypot(tx,tz)||1;
    ruralTreeSpots.push([x - tz/l * s * R(9,13), z + tx/l * s * R(9,13), R(.9,1.3)]);
  }
}

/* =========================================================
   Calles: grilla A/B recortada por las vías
   ========================================================= */

function classify(s){
  const mid = (s.s0 + s.s1) / 2, a = s.axis === 'A' ? s.v : mid, b = s.axis === 'A' ? mid : s.v;
  if (s.reg === 'SO'){
    if (s.axis === 'A' && s.v === 78) return 'pAve';   // Bv. Independencia pavimentado pasando la vía
    if ((s.axis === 'A' && s.v === 195) || (s.axis === 'B' && s.v === 429)) return 'dAve';
    return 'dirt';
  }
  if (s.axis === 'A'){
    if (s.v === 195) return b <= 300 ? 'main' : 'paved';
    if (s.v === 78)  return b < 117 ? 'gAve' : 'pAve';
    if (s.v === 312) return b < 39 ? 'dirt' : 'gAve';   // Bv. Constitución: entre Bolívar e Iriondo es una calle de tierra simple
    if (s.v === 0 || s.v === AMAX) return 'gravel';
  } else {
    if (s.v === 117) return a < 117 ? 'gAve' : (a <= 234 ? 'pAve' : 'gAve');
    if (s.v === 0) return 'gravel';
  }
  return (a >= 78 && a <= 351 && b >= 39 && b <= 351) ? 'paved' : 'gravel';
}
const segs = [];
function pushSeg(s){ if (s && s.s1 - s.s0 > 2){ s.type = s.type || classify(s); segs.push(s); } }
function streetReg(axis, v, t){
  const a = axis === 'A' ? v : t, b = axis === 'A' ? t : v;
  if (a < -0.5 || a > AMAX + 0.5 || b < -0.5 || b > BMAX + 0.5) return null;
  const [x, z] = W(a, b);
  if (axis === 'A' && v === 0 && b > 260 && b < 291.5) return null;   // Av. 25 de Mayo conecta por PASO_OESTE
  if (axis === 'B' && v === 0 && a > 363) return null;                 // Iriondo termina antes de 9 de Julio: sigue como RP 10-S en diagonal
  if (axis === 'B' && v === 273 && a < 126.5) return null;             // La Rioja termina en Bv. Ferrocarril
  if (axis === 'B' && v === 312 && a < 166) return null;               // Catamarca termina en Bv. Ferrocarril
  if (axis === 'B' && v === 351 && a > 196.5 && a < 271.5) return null; // Tucumán (SO) / Maipú (NE)
  if (axis === 'B' && v === 390 && a > 314) return null;               // Santiago del Estero termina en Chacabuco
  if (axis === 'A' && v === 78 && b > 405.2 && b < 453.8) return null; // Bv. Independencia llega hasta la calle que rodea al Polideportivo
  if (axis === 'B' && v === 429 && a > 54.6 && a < 102) return null;   // Bv. Gálvez llega hasta la calle que rodea al Polideportivo
  if (a <= 166.5 && inPoly(x, z, RAIL_YARD_POLY)) return null;
  const d = railDist(a, b);
  if (a <= 166.5){
    if (d < 0 && b <= 390.5) return 'NE';
    if (d > 0 && b >= 272.5) return 'SO';
    return null;
  }
  if (d < 0){
    if (axis === 'A' && v === 195 && b > 312.5) return null;           // Av. Centenario llega hasta Catamarca
    if (d > -4.5 && !(axis === 'B' && v === 312)) return null;
    return 'NE';
  }
  return b >= chacabucoB(a) ? 'SO' : null;
}
function lineSegs(axis, v){
  const max = axis === 'A' ? BMAX : AMAX;
  for (let p0 = 0; p0 < max - .01; p0 += G){
    const p1 = p0 + G; let cur = null;
    for (let t = p0; t <= p1 + 1e-6; t += .5){
      const reg = streetReg(axis, v, t);
      if (cur && reg === cur.reg) cur.s1 = t;
      else { pushSeg(cur); cur = reg ? { axis, v, s0: t, s1: t, reg } : null; }
    }
    pushSeg(cur);
  }
}
for (let i = 0; i <= NA; i++) lineSegs('A', i * G);
for (let j = 0; j <= NB; j++) lineSegs('B', j * G);

// Índice de intersecciones de grilla: cada cruce se dibuja una sola vez con el tipo prioritario y los tramos se cortan en su borde
const gridNodes = new Map();
const snapG = v => { const k = Math.round(v / G) * G; return Math.abs(v - k) < .6 ? k : null; };
const getNode = (a, b) => {
  const key = a + ',' + b;
  let n = gridNodes.get(key);
  if (!n){ n = { a, b, A: [], B: [], hA: 0, hB: 0, best: null }; gridNodes.set(key, n); }
  return n;
};
for (const s of segs){
  for (const end of [s.s0, s.s1]){
    const g = snapG(end);
    if (g === null) continue;
    const n = s.axis === 'A' ? getNode(s.v, g) : getNode(g, s.v);
    (s.axis === 'A' ? n.A : n.B).push(s);
  }
}
for (const n of gridNodes.values()){
  if (!n.A.length || !n.B.length) continue;
  for (const s of n.A) n.hA = Math.max(n.hA, ST[s.type].w / 2);
  for (const s of n.B) n.hB = Math.max(n.hB, ST[s.type].w / 2);
  for (const s of [...n.A, ...n.B]){
    const st = ST[s.type];
    if (!n.best || st.prio > n.best.prio) n.best = st;
  }
  const [x, z] = W(n.a, n.b);
  roadLayer.addRect(x - n.hA, z - n.hB, x + n.hA, z + n.hB, n.best.prio, n.best.c);
}

const lampSpots = [], streetTreeSpots = [];
const swWidthOf = type => type === 'main' ? 4.5 : type === 'pAve' ? 2.0 : 3.5;
function drawSeg(s){
  const st = ST[s.type];
  const horiz = s.axis === 'B';
  const c = horiz ? (s.v - CB) * S : (s.v - CA) * S;
  const u0 = (s.s0 - (horiz ? CA : CB)) * S, u1 = (s.s1 - (horiz ? CA : CB)) * S;
  const g0 = snapG(s.s0), g1 = snapG(s.s1);
  const n0 = g0 !== null ? gridNodes.get(horiz ? (g0 + ',' + s.v) : (s.v + ',' + g0)) : null;
  const n1 = g1 !== null ? gridNodes.get(horiz ? (g1 + ',' + s.v) : (s.v + ',' + g1)) : null;
  const trim0 = (n0 && n0.hA && n0.hB) ? (horiz ? n0.hA : n0.hB) : 0;
  const trim1 = (n1 && n1.hA && n1.hB) ? (horiz ? n1.hA : n1.hB) : 0;
  const P = (u, off) => horiz ? [u, c + off] : [c + off, u];
  const nearDiagRoad = (x, z, m) => distToPolyline(x, z, BV_FC_NE) < m || distToPolyline(x, z, BV_FC_SO) < m || distToPolyline(x, z, PASO_OESTE) < m || distToPolyline(x, z, CHACABUCO_PTS) < m;
  // Si un extremo no cae en nodo de grilla y llega a Bv. Ferrocarril o Chacabuco, extenderlo 4.5 m para que el recorte diagonal quede sin huecos
  const ext0 = (!trim0 && nearDiagRoad(...P(u0, 0), 8)) ? 4.5 : 0;
  const ext1 = (!trim1 && nearDiagRoad(...P(u1, 0), 8)) ? 4.5 : 0;
  const r0 = u0 + trim0 - ext0, r1 = u1 - trim1 + ext1;
  const strip = (off, w, a0, a1, y, col) => {
    const lo = c + off - w/2, hi = c + off + w/2;
    if (horiz) flat.rect(a0, lo, a1, hi, y, col); else flat.rect(lo, a0, hi, a1, y, col);
  };
  // tramos [a0, a1] de una franja (desplazada offLo..offHi del eje) que no caen en un rebaje de CAR_OPEN
  const freeRuns = (offLo, offHi, a0, a1) => {
    let runs = [[a0, a1]];
    for (const [ox0, oz0, ox1, oz1] of CAR_OPEN){
      const [ulo, uhi, vlo, vhi] = horiz ? [ox0, ox1, oz0 - c, oz1 - c] : [oz0, oz1, ox0 - c, ox1 - c];
      if (vhi <= offLo || vlo >= offHi) continue;
      runs = runs.flatMap(([r0, r1]) => (uhi <= r0 || ulo >= r1) ? [[r0, r1]] : [[r0, ulo], [uhi, r1]].filter(([p, q]) => q - p > .3));
    }
    return runs;
  };
  // cordón: caja con cara vertical (instanciada); curbEnd: cordón que cierra la punta de una franja; carBlock: la franja frena al auto
  const curb = (off, w, h, a0, a1, col) => { for (const [r0, r1] of freeRuns(off - w/2, off + w/2, a0, a1)){ const [x, z] = P((r0 + r1) / 2, off); trims.add(x, 0, z, horiz ? r1 - r0 : w, h, horiz ? w : r1 - r0, 0, col); } };
  const curbEnd = (u, offLo, offHi, h, col) => { const [x, z] = P(u, (offLo + offHi) / 2), w = Math.max(.05, offHi - offLo - .02); trims.add(x, 0, z, horiz ? .2 : w, h - .003, horiz ? w : .2, 0, col); };
  const carBlock = (offLo, offHi, a0, a1) => { for (const [r0, r1] of freeRuns(offLo, offHi, a0, a1)){ if (horiz) addCarCol(r0, c + offLo, r1, c + offHi); else addCarCol(c + offLo, r0, c + offHi, r1); } };
  if (s.reg === 'X') mapRoads.push({ pts: [P(u0,0), P(u1,0)], w: st.w, col: st.map, y: 1, top: true });
  if (r1 > r0 + .05){
    const lo = c - st.w / 2, hi = c + st.w / 2;
    const clipRail = (ext0 || ext1) ? s.reg : false;
    if (horiz) roadLayer.addRect(r0, lo, r1, hi, st.prio, st.c, clipRail);
    else roadLayer.addRect(lo, r0, hi, r1, st.prio, st.c, clipRail);
  }
  // textura sutil de escoria/ripio (piedritas y huellas) en calles de ripio, recortada fuera de intersecciones
  if (s.type === 'gravel' || s.type === 'gAve'){
    for (let u = r0 + 2.5; u < r1 - 2.5; u += 4.5){
      const o = R(-st.w * .38, st.w * .38), sw = R(.7, 1.8), sl = R(1.2, 2.8);
      const uEnd = Math.min(u + sl, r1 - .5);
      if (uEnd <= u + .2) continue;
      const [fx, fz] = P((u + uEnd) / 2, o);
      if (nearDiagRoad(fx, fz, 5.5) || inPoly(fx, fz, RAIL_YARD_POLY)) continue;
      strip(o, sw, u, uEnd, ROAD_Y + .012, rnd() < .5 ? '#66696e' : '#8b8f94');
    }
  }
  mapRoads.push({ pts: [P(u0,0), P(u1,0)], w: st.w, col: st.map, y: st.y });
  const trim = 12, t0 = u0 + trim, t1 = u1 - trim;
  if (st.sw && !s.nosw){
    const swW = swWidthOf(s.type);   // vereda más ancha en Av. Centenario y continua hasta la esquina
    const crossH = v => horiz ? (v === 195 ? 9 : (v === 78 || v === 312) ? 8.5 : 4.5) : ((v === 117 || v === 429) ? 8.5 : 4.5);
    const hasPerpOnSide = (node, sg) => {
      if (!node) return true;
      const arr = horiz ? node.A : node.B;
      return arr.some(seg => sg < 0 ? Math.abs(seg.s1 - s.v) < .6 : Math.abs(seg.s0 - s.v) < .6);
    };
    const perpSw = (node, sg) => {
      if (!horiz || !node) return 0;
      const hit = node.A.find(a => (sg < 0 ? Math.abs(a.s1 - s.v) < .6 : Math.abs(a.s0 - s.v) < .6) && ST[a.type].sw && !a.nosw);
      return hit ? swWidthOf(hit.type) : 0;
    };
    const swStrip = (off, w, a0, a1, col) => {
      const lo = c + off - w/2, hi = c + off + w/2;
      const clipRail = (ext0 || ext1) ? s.reg : false;
      if (horiz) roadLayer.addSidewalk(a0, lo, a1, hi, col, clipRail);
      else roadLayer.addSidewalk(lo, a0, hi, a1, col, clipRail);
    };
    for (const sg of [-1, 1]){
      // En cruces en T, el lado cerrado (sin calle perpendicular) mantiene la vereda y el cordón continuos
      const open0 = hasPerpOnSide(n0, sg), open1 = hasPerpOnSide(n1, sg);
      const swExt = horiz ? 12 : 6;
      const sw0 = ext0 ? (u0 - swExt) : (u0 + (open0 ? (trim0 || crossH(Math.round(s.s0))) : 0));
      const sw1 = ext1 ? (u1 + swExt) : (u1 - (open1 ? (trim1 || crossH(Math.round(s.s1))) : 0));
      // En Av. Centenario y Bv. Lavalle, dejar abiertas las bocacalles perimetrales de las plazas al ancho exacto del asfalto
      const swGaps = s.type === 'main'
        ? [[-400.4, -393.1], [-286.9, -279.6]].filter(([g0, g1]) => g1 > sw0 && g0 < sw1)
        : (horiz && s.v === 117)
          ? [[-63.5, -56.0], [56.0, 63.5]].filter(([g0, g1]) => g1 > sw0 && g0 < sw1)
          : [];
      const pSw0 = open0 ? perpSw(n0, sg) : 0, pSw1 = open1 ? perpSw(n1, sg) : 0;
      const q0 = sw0 + pSw0, q1 = sw1 - pSw1;
      let c0 = sw0 + (pSw0 ? .12 : 0), c1 = sw1 - (pSw1 ? .12 : 0);
      // Recortar el cordón 3D justo hasta el borde de Bv. Ferrocarril / Chacabuco
      const o0 = sg * st.w/2, o1 = sg * (st.w/2 + swW), oLo = Math.min(o0, o1), oHi = Math.max(o0, o1);
      const curbHitsDiag = u => { const [px, pz] = P(u, sg * (st.w/2 + .06)); return nearDiagRoad(px, pz, 4.6) || inPoly(px, pz, RAIL_YARD_POLY); };
      if (ext0){ while (c0 < c1 && curbHitsDiag(c0)) c0 += .25; }
      if (ext1){ while (c1 > c0 && curbHitsDiag(c1)) c1 -= .25; }
      if (sw1 > sw0 + 1){
        // vereda con cordón; en los huecos de las bocacalles el cordón dobla y cierra la punta
        const run = (a0, a1, endA, endB) => {
          const sa0 = Math.max(a0, q0), sa1 = Math.min(a1, q1);
          const ca0 = Math.max(a0, c0), ca1 = Math.min(a1, c1);
          if (sa1 > sa0 + .1) swStrip(sg * (st.w/2 + swW/2), swW, sa0, sa1, '#bdb6a8');
          if (ca1 > ca0 + .1){
            curb(sg * (st.w/2 + .06), .12, .10, ca0, ca1, '#cbc5b8');
            carBlock(oLo, oHi, ca0, ca1);
          }
          if (endA) curbEnd(a0 + .1, oLo, oHi, .10, '#cbc5b8');
          if (endB) curbEnd(a1 - .1, oLo, oHi, .10, '#cbc5b8');
        };
        let cur = sw0, afterGap = false;
        for (const [g0, g1] of swGaps){
          if (g0 > cur + .5) run(cur, g0, afterGap, true);
          cur = Math.max(cur, g1); afterGap = true;
        }
        if (sw1 > cur + .5) run(cur, sw1, afterGap, false);
      }
      for (let u = t0 + 4; u < t1 - 3; u += 11){
        if (swGaps.some(([g0, g1]) => u > g0 - 2.5 && u < g1 + 2.5)) continue;
        if (rnd() < .45) streetTreeSpots.push([...P(u, sg * (st.w/2 + Math.min(1.6, swW * .45))), R(.7, 1)]);
      }
    }
  }
  if (t1 - t0 < 6) return;
  if (st.dash) for (let u = t0; u < t1 - 3; u += 8) strip(0, .25, u, u + 3, ROAD_Y + .018, '#e9e4d0');
  if (st.blvd){
    // cantero central con cordón amarillo (en Bv. Lavalle deja hueco libre para las calles perimetrales de las plazas en x ≈ ±59.75)
    const mw = st.blvd, paved = s.type === 'pAve', ccol = paved ? '#d8b13a' : '#cfc8b8';
    const drawBlvdSpan = (a0, a1) => {
      if (a1 - a0 < 3) return;
      strip(0, mw, a0, a1, .22, paved ? '#5a7a3a' : '#617f3f');
      for (const sg of [-1, 1]){ strip(sg * (mw/2 - .12), .25, a0, a1, .24, ccol); curb(sg * (mw/2 - .12), .25, .13, a0, a1, ccol); }
      for (const u of [a0 + .1, a1 - .1]) curbEnd(u, -mw/2, mw/2, .235, ccol);
      carBlock(-mw/2, mw/2, a0, a1);
      for (let u = a0 + 3; u < a1 - 2; u += paved ? 3.2 : 14){
        const [x, z] = P(u, R(-.4, .4)), r = rnd();
        if (!paved) addTree(x, z, R(1.1, 1.5), false, rnd() < .5 ? ['#a0642c','#b5793a','#8a5a2b'] : null, '#b9ad94');
        else if (r < .6) addBush(x, z, R(.5, .8), .22);
        else if (r < .72) addPalm(x, z, R(.4, .55), .22);
        else if (r < .82) addTree(x, z, R(.7, .9), false, ['#a0642c','#b5793a','#8a5a2b'], '#b9ad94');
      }
    };
    const blvdGaps = (horiz && s.v === 117) ? [[-64.5, -55.0], [55.0, 64.5]].filter(([g0, g1]) => g1 > t0 && g0 < t1) : [];
    let bCur = t0;
    for (const [g0, g1] of blvdGaps){
      if (g0 > bCur + 3) drawBlvdSpan(bCur, g0);
      bCur = Math.max(bCur, g1);
    }
    if (t1 > bCur + 3) drawBlvdSpan(bCur, t1);
  }
  if (st.median){
    for (let u = t0 + 6; u < t1; u += 24) for (const sg of [-1, 1]) lampSpots.push(P(u, sg * (st.w/2 + .4)));
    if (s.s1 <= 117.5){
      // del mástil hacia afuera: cantero angosto con bolas de luz repartidas de forma pareja
      strip(0, 1.6, t0, t1, .24, '#d6d1c6');
      for (const sg of [-1, 1]) curb(sg * .74, .12, .13, t0, t1, '#cfc9bd');
      for (const u of [t0 + .1, t1 - .1]) curbEnd(u, -.8, .8, .235, '#cfc9bd');
      carBlock(-.8, .8, t0, t1);
      const nb = Math.max(1, Math.round((t1 - t0 - 2) / 5.6));
      for (let k = 0; k <= nb; k++){
        const u = t0 + 1 + (t1 - t0 - 2) * (k / nb);
        const [x, z] = P(u, 0);
        balls.add(x, .74, z, .5, .5, .5, 0, '#f3f1ea');
        addCol(x - .5, z - .5, x + .5, z + .5);
      }
    } else {
      // del mástil hacia la vía: canteros con palmeras repartidos de forma uniforme (sin tramos verdes vacíos en las puntas)
      // y con hueco de cruce vehicular en la calle al lado de la Iglesia (z = -283.25) para pasar de un lado al otro
      const drawMedianSpan = (a0, a1) => {
        const L = a1 - a0;
        if (L < 6) return;
        strip(0, 3, a0, a1, .22, '#5d7f3c');
        for (const sg of [-1, 1]) curb(sg * 1.44, .12, .115, a0, a1, '#cfc9bd');
        for (const u of [a0 + .1, a1 - .1]) curbEnd(u, -1.5, 1.5, .215, '#cfc9bd');
        carBlock(-1.5, 1.5, a0, a1);
        const n = Math.max(1, Math.round(L / 13));
        const step = L / n;
        const len = Math.min(9.6, Math.max(4.5, step - 2.4));
        const bOff = Math.max(1.2, len / 2 - 1.0);
        for (let k = 0; k < n; k++){
          const u = a0 + (k + .5) * step;
          const [x, z] = P(u, 0), sx = horiz ? len : 2.8, sz = horiz ? 2.8 : len;
          trims.add(x, 0, z, sx, .5, sz, 0, '#d9d4ca');
          trims.add(x, .5, z, sx - .4, .04, sz - .4, 0, '#4a3a2a');
          addPalm(x, z, R(.9, 1.15), .5);
          for (let j = 0; j < 4; j++){ const [bx, bz] = P(u + (j < 2 ? -1 : 1) * R(bOff * .5, bOff), R(-.5, .5)); addBush(bx, bz, R(.5, .75), .5); }
          addCol(x - sx/2, z - sz/2, x + sx/2, z + sz/2);
        }
      };
      const gap0 = -288.5, gap1 = -278.0;   // cruce vehicular frente a la calle al lado de la Iglesia
      if (t0 < gap0 && t1 > gap1){
        drawMedianSpan(t0, gap0);
        drawMedianSpan(gap1, t1);
      } else {
        drawMedianSpan(t0, t1);
      }
    }
  }
}
for (const s of segs) drawSeg(s);

// calles reales alrededor del ferrocarril y pasos a nivel (OSM)
{
  const drawPolyRoad = (pts, type, prio, top = false, capStart = true, capEnd = true) => {
    const st = ST[type];
    roadLayer.addRibbon(pts, st.w, prio, st.c, 0, capStart, capEnd);
    mapRoads.push({ pts, w: st.w, col: st.map, y: top ? 1 : st.y, top });
  };
  drawPolyRoad(BV_FC_NE.slice(0, 7), 'paved', 63, false, true, false);  // Bv. Ferrocarril NE tramo este (Catamarca -> Santa Fe)
  drawPolyRoad(BV_FC_NE.slice(6), 'gravel', 62, false, false, true);    // Bv. Ferrocarril NE tramo oeste -> RP20-S (ripio/escoria)
  roadLayer.addRibbon(BV_FC_SO, ST.paved.w, 64, ST.paved.c, 0, true, true); // Bv. Ferrocarril SO (detrás de la vía) todo pavimentado
  mapRoads.push({ pts: BV_FC_SO.slice(0, 7), w: ST.paved.w, col: ST.paved.map, y: ST.paved.y, top: false });
  mapRoads.push({ pts: BV_FC_SO.slice(6), w: ST.paved.w, col: ST.paved.map, y: 1, top: true });
  drawPolyRoad(PASO_OESTE, 'paved', 64, true);              // Paso a nivel oeste (RP20-S)
  drawPolyRoad(RP20S_PTS, 'dirt', 22);                      // RP 20-S de tierra: bordea la Cooperativa y sigue al NO (OSM)
  drawPolyRoad(RP26S_PTS, 'dirt', 22);                      // RP 26-S de tierra: hacia el oeste, pasa junto al cementerio (OSM)
  drawPolyRoad(CINCO_ESQ, 'gravel', 32);                    // cruce de 5 esquinas: Dr. Brunet / Maipú / RP 20-S
  drawPolyRoad(CHACABUCO_PTS, 'dirt', 38);                  // Chacabuco paralela SE del lado SO de las vías
  drawPolyRoad(RP10S_E, 'dirt', 24, false, false, true);    // RP 10-S de tierra: de Iriondo a la Ruta 18 (OSM)
  drawPolyRoad(NUEVE_JULIO_N, 'dirt', 23, false, false, false);   // Av. 9 de Julio de tierra hasta la RP 10-S
  roadLayer.addRibbon(IRIONDO_TIERRA, 6, 21, '#a98a5f', 0, false, false);   // callecita de tierra de Iriondo hasta 9 de Julio
  mapRoads.push({ pts: IRIONDO_TIERRA, w: 6, col: '#e8d23a', y: .08 });
  // banquinas de pasto de la RP 10-S fuera del pueblo
  flat.ribbon(RP10S_E.slice(3), 16, .035, '#7d9650');
  // cruce de San Andrés y plataforma de madera en el paso a nivel oeste (el central RP 10-S se arma detallado aparte)
  for (const [cx, cz, ang] of [[-473.1, 49.6, .32]]){
    box(cx, .15, cz, 10, .14, 4.4, '#8b7355', ang);
    for (const s of [-1, 1]){
      const px = cx + s * 6.2 * Math.cos(ang), pz = cz + s * 6.2 * Math.sin(ang);
      poles.add(px, 0, pz, .12, 3.4, .12, 0, '#e8e8e8');
      trims.add(px, 2.75, pz, 1.5, .18, .08, ang + .65, '#f4f4f2');
      trims.add(px, 2.75, pz, 1.5, .18, .08, ang - .65, '#f4f4f2');
      addCol(px - .2, pz - .2, px + .2, pz + .2);
    }
  }
}

// caminos rurales de tierra
for (const [a0, b0, a1, b1] of [[-1500,429,0,429],[0,BMAX,0,1500]]){   // (la salida al NE ahora es la RP 10-S real)
  const pts = [W(a0, b0), W(a1, b1)];
  roadLayer.addRibbon(pts, 8, 18, '#a98a5f');
  mapRoads.push({ pts, w: 8, col: '#e8d23a', y: .08 });
}

/* =========================================================
   Edificios especiales: plaza, iglesia, estación, silos
   ========================================================= */

{
  const trimPolyEnd = (pts, dist) => {
    const out = pts.map(p => [p[0], p[1]]);
    let rem = dist;
    while (out.length > 1 && rem > 0){
      const a = out[out.length - 2], b = out[out.length - 1], l = Math.hypot(b[0] - a[0], b[1] - a[1]);
      if (l <= rem){ out.pop(); rem -= l; }
      else { const t = (l - rem) / l; out[out.length - 1] = [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t]; rem = 0; }
    }
    return out;
  };
  const trimPolyStart = (pts, dist) => trimPolyEnd(pts.slice().reverse(), dist).reverse();
  const drawAsphalt = (pts, ramps = false) => {
    roadLayer.addRibbon(pts, 13, ramps ? 14 : 15, '#a49a86');
    roadLayer.addRibbon(pts, 7.4, ramps ? 66 : 68, '#55575c');
    let lPts = trimPolyEnd(pts, 4.2);
    if (ramps) lPts = trimPolyStart(lPts, 8.5);
    for (const o of [-3.45, 3.45]) flat.ribbon(lPts, .18, ROAD_Y + .022, '#e8e8e8', o);
    if (!ramps) for (const o of [-.18, .18]) flat.ribbon(lPts, .15, ROAD_Y + .022, '#e3b52b', o);
    mapRoads.push({ pts, w: 8, col: '#3b4fd0', y: .1 });
  };
  drawAsphalt(ACC_PTS);
  drawAsphalt(ACC_RAMP_S, true);
  drawAsphalt(ACC_RAMP_N, true);
  // túnel de árboles siguiendo las curvas reales del acceso
  const TREE = ['#7d6a52', '#8a765c', '#6f6048', '#7a8a4a', '#6b7a45'];
  let totalLen = 0; for (let i = 1; i < ACC_PTS.length; i++) totalLen += Math.hypot(ACC_PTS[i][0] - ACC_PTS[i-1][0], ACC_PTS[i][1] - ACC_PTS[i-1][1]);
  let acc = 0, passed = 0, lastTree = [49.0, -2642, 0];
  for (let i = 1; i < ACC_PTS.length; i++){
    const [x0, z0] = ACC_PTS[i-1], [x1, z1] = ACC_PTS[i], l = Math.hypot(x1-x0, z1-z0) || 1;
    const tx = (x1 - x0) / l, tz = (z1 - z0) / l, nx = -tz, nz = tx;
    for (; acc < l; acc += 7){
      const d = passed + acc;
      if (d > 10 && d < totalLen - 55){
        const px = x0 + tx * acc, pz = z0 + tz * acc;
        lastTree = [px, pz, Math.atan2(tx, -tz)];
        for (const s of [-1, 1]) if (rnd() < .93){
          const off = s * R(8.6, 10), j = R(-1.2, 1.2);
          addTree(px + nx * off + tx * j, pz + nz * off + tz * j, R(1.15, 1.5), false, TREE, '#77726a');
        }
      }
    }
    acc -= l; passed += l;
  }
  // portal de entrada (pilar de ladrillo + torre reticulada + cartel) justo en los últimos árboles antes de la Ruta 18
  const [px, pz, pang] = lastTree, g = group(px, pz, pang);
  bx(g, 7.6, 0, 0, 1.7, 8.2, 1.7, '#a8553e');
  for (let k = 0; k < 16; k++) bx(g, 7.6, .5 * k + .25, 0, 1.74, .03, 1.74, '#94493a');
  bx(g, -7.6, 0, 0, 1.4, 1.6, 1.4, '#a8553e');
  const T = [[-7.9, -.3], [-7.3, -.3], [-7.3, .3], [-7.9, .3]];
  for (const [x, z] of T) poleIn(g, [x, 1.6, z], [x, 7.2, z], .05, '#cfd3d6');
  for (let y = 1.6; y < 7; y += 1.1){ poleIn(g, [-7.9, y, -.3], [-7.3, y + 1.1, -.3], .035, '#cfd3d6'); poleIn(g, [-7.9, y, .3], [-7.3, y + 1.1, .3], .035, '#cfd3d6'); }
  for (const y of [6.2, 7.2]) poleIn(g, [-7.9, y, 0], [7.6, y, 0], .06, '#cfd3d6');
  for (let x = -7.6; x < 7.4; x += 1) poleIn(g, [x, 6.2, 0], [x + 1, 7.2, 0], .03, '#cfd3d6');
  signIn(g, 'PEYRANO', 0, 6.7, -.12, 9, 1.15, '#3f5e3a', '#f2c53a', Math.PI);
  signIn(g, 'PEYRANO', 0, 6.7, .12, 9, 1.15, '#3f5e3a', '#f2c53a');
  addCol(px + 6.7, pz - .9, px + 8.5, pz + .9); addCol(px - 8.3, pz - .7, px - 6.9, pz + .7);
  // cartel de 60
  const sg = group(px + 5.6, pz + 30, Math.PI);
  poleIn(sg, [0, 0, 0], [0, 2.2, 0], .04, '#9aa0a6');
  cylIn(sg, 0, 2.4, .02, .42, .04, '#d8261f', Math.PI/2).rotation.set(Math.PI/2, 0, 0);
  signIn(sg, '60', 0, 2.4, .06, .56, .56, '#ffffff', '#111111');
  mapLabels.push([px, pz, 'Acceso']);
  var ACC_PORTAL = [px, pz, pang];   // para la cinemática del menú (el cartel mira a lo largo del camino)
}
// Ruta 18 (traza real curva de OSM)
{
  roadLayer.addRibbon(R18_PTS, 15, 16, '#a49a86');
  roadLayer.addRibbon(R18_PTS, 7.8, 75, '#4d4f54');
  for (const o of [-3.6, 3.6]) flat.ribbon(R18_PTS, .2, ROAD_Y + .025, '#e8e8e8', o);
  for (let i = 1; i < R18_PTS.length; i++){
    const [x0, z0] = R18_PTS[i-1], [x1, z1] = R18_PTS[i], l = Math.hypot(x1-x0, z1-z0) || 1;
    const tx = (x1 - x0) / l, tz = (z1 - z0) / l;
    for (let t = 0; t + 4.5 < l; t += 12) flat.ribbon([[x0 + tx * t, z0 + tz * t], [x0 + tx * (t + 4.5), z0 + tz * (t + 4.5)]], .18, ROAD_Y + .025, '#e3b52b');
  }
  mapRoads.push({ pts: R18_PTS, w: 9, col: '#8a8a8a', y: .11 });
  mapLabels.push([68.4, -2710, 'Ruta 18']);
}

// Casa grande de ladrillo de la esquina Av. Centenario e Iriondo, lado oeste (enfrente de la Shell, a la derecha apenas termina el acceso)
// (fotos de Street View del usuario; medidas de las huellas de edificios):
//  · sobre la avenida, de la esquina hacia el sur: cuerpo principal de dos plantas con planta baja elevada, escalera al frente, garaje en el
//    semisótano, losas con borde blanco, balcón corrido arriba y aire acondicionado · cuerpo bajo con techo de tejas coloradas y chimenea ·
//    cuerpo de dos plantas con techo de tejas, portón de garaje de madera de dos hojas, entrada metida y repisa con la vasija de barro
//  · sobre Iriondo: semisótano con ventanas bajas de madera y ojo de buey, persianas de madera, losa volada con columna redonda,

// Carteles nomencladores en las esquinas del centro
{
  const texCache = {};
  const bladeMat = name => texCache[name] || (texCache[name] = new THREE.MeshLambertMaterial({ map: textTex(name, 320, 64, '#1d4f91', '#ffffff') }));
  const bladeGeo = new THREE.PlaneGeometry(1.5, .3);
  const halfW = (axis, v) => { const s = segs.find(s => s.axis === axis && s.v === v && s.reg === 'NE'); return s ? ST[s.type].w / 2 : 4.5; };
  for (let i = 2; i <= 9; i++) for (let j = 1; j <= 8; j++){
    const a = i * G, b = j * G; if (!region(a, b, 16)) continue;
    const x = (a - CA) * S + halfW('A', a) + 2.4, z = (b - CB) * S + halfW('B', b) + 2.4;
    if (overlap(x - .4, z - .4, x + .4, z + .4)) continue;
    poles.add(x, 0, z, .09, 3.1, .09, 0, '#2d3a4a');
    for (const s of [1, -1]){
      const ma = new THREE.Mesh(bladeGeo, bladeMat(nameA(i, 'NE'))); ma.position.set(x + s * .02, 2.75, z); ma.rotation.y = s > 0 ? Math.PI/2 : -Math.PI/2; scene.add(ma);
      const mb = new THREE.Mesh(bladeGeo, bladeMat(nameB(j, 'NE'))); mb.position.set(x, 3.08, z + s * .02); mb.rotation.y = s > 0 ? 0 : Math.PI; scene.add(mb);
    }
    addCol(x - .15, z - .15, x + .15, z + .15);
  }
}

/* ---------- Edificios e instituciones reales ---------- */
// Construye un edificio en su coordenada GPS real, con el frente hacia la calle más cercana

  Object.assign(ctx, { xs, zs, ruralTreeSpots, ruralHouse, railPts, classify, segs, pushSeg, streetReg, lineSegs, gridNodes, snapG, getNode, lampSpots, streetTreeSpots, swWidthOf, drawSeg });
}
