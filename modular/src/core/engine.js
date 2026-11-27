// Motor base de Peyrano 3D (Three.js, terreno, Flat, RoadLayer, InstancedMesh, colisiones y helpers)
import * as THREE from 'three';
import { OSM } from '../data/osm.js';
import { REAL_BUILDINGS } from '../data/overture.js';
import * as POLYS from '../data/polygons.js';

const {
  ACC_PTS,
  ACC_RAMP_S,
  ACC_RAMP_N,
  R18_PTS,
  RP20S_PTS,
  RP26S_PTS,
  CINCO_ESQ,
  COOP_POLY,
  CASA1070_POLY,
  LAV25_POLY,
  LAV25_E_POLY,
  ACOPIO_POLY,
  BRUNET_IND_POLY,
  ESC_BRUNET_POLY,
  CASA_IRI_POLY,
  CENT_O_BOL_POLY,
  CENT_BOL_POLY,
  SHELL_POLY,
  HOGAR_POLY,
  RP10S_E,
  IRIONDO_TIERRA,
  NUEVE_JULIO_N,
  CASITAS_COOP_POLY,
  PLAZA_INM,
  COOP_FP,
  AGUA_POLY,
  ESQ_AGUA_POLY,
  PLAZA_SE_SUR_POLY,
  QUINTA_POLY,
  TERM_POLY,
  GALP26_POLY,
  SANLUIS_E_POLY,
  ENTRERIOS_O_POLY,
  JUJUY_S_POLY,
  DIABLITO_S_POLY,
  AVC_O_POLY,
  SAGARDUY_POLY,
  BOMB_N_POLY,
  MUSEO_POLY,
  CORD_BOMB_POLY,
  MONG_S_POLY,
  MONG_POLY,
  ESCEN_N_POLY,
  ESCEN_E_POLY,
  LAV_ER_MONG_POLY,
  CORDOBA_E_POLY,
  BRUNET_S_POLY,
  ARIGA_POLY,
  BRUNET_N_POLY,
  MANZANA_BRUNET_POLY,
  JUJUY_N_POLY,
  JUJUY_SO_POLY,
  COMISARIA_POLY,
  CORREO_N_POLY,
  MALV_POLY,
  CENT_EAST_POLY,
  AMFAC_INT_POLY,
  ESC186_POLY,
  CAR_OPEN
} = POLYS;

import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';

/* =========================================================
   Random con semilla (el pueblo siempre sale igual)
   ========================================================= */
let seed = 1234567;
const rnd = () => { seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646; };
const R = (a, b) => a + (b - a) * rnd();
const pick = arr => arr[Math.floor(rnd() * arr.length)];

/* =========================================================
   Coordenadas del mapa
   La foto tiene la grilla girada ~42°. Uso un sistema A/B
   alineado a las cuadras (en "píxeles de la foto"):
     A = hacia abajo-derecha en la foto, B = hacia abajo-izquierda
   Cuadra = 39 px. Escala: 1 px = 2.5 m (cuadra ≈ 100 m).
   ========================================================= */
const S = 2.5, CA = 195, CB = 253, G = 39;
const NA = 10, NB = 13;                     // 10 cuadras en A, 13 en B
const AMAX = NA * G, BMAX = NB * G;         // 390, 507
const toAB = (px, py) => { const dx = px - 625, dy = py - 85; return [dx * 0.745 + dy * 0.667, -dx * 0.667 + dy * 0.745]; };
const W = (a, b) => [(a - CA) * S, (b - CB) * S];
const AB = (x, z) => [x / S + CA, z / S + CB];
const segDist = (x, z, ax, az, bx, bz) => { const dx = bx-ax, dz = bz-az, d2 = dx*dx + dz*dz, t = d2 < 1e-9 ? 0 : Math.max(0, Math.min(1, ((x-ax)*dx + (z-az)*dz) / d2)); return Math.hypot(x - ax - dx*t, z - az - dz*t); };
function distToPolyline(x, z, pts){ let best = 1e9; for (let i = 0; i < pts.length - 1; i++){ const d = segDist(x, z, pts[i][0], pts[i][1], pts[i+1][0], pts[i+1][1]); if (d < best) best = d; } return best; }
function inPoly(x, z, pts){ let c = false; for (let i = 0, j = pts.length - 1; i < pts.length; j = i++){ const [xi, zi] = pts[i], [xj, zj] = pts[j]; if ((zi > z) !== (zj > z) && x < (xj - xi) * (z - zi) / (zj - zi + 1e-12) + xi) c = !c; } return c; }

// Vías del tren (puntos tomados de la foto, en A/B)
// Trazado real del FC Mitre tomado de OpenStreetMap (convertido a la grilla a/b); las puntas están extrapoladas
const RAIL = [[-2234,-2965],[-1845.6,-2382.6],[-1814.6,-2336.1],[-1639.6,-2075],[-1593.4,-2009.0],[-1086.5,-1258.3],[-850,-904.0],[-679.9,-654.9],[-454.4,-320.1],[-111.9,188.1],[-100.2,204.2],[-89.6,216.8],[-78.1,229.4],[-68,238.4],[-61.4,243.7],[-53.7,248.7],[-44.8,253.8],[-36.1,257.4],[-23.6,261.7],[-10.6,267.6],[5.8,272.8],[162.4,323.8],[205.6,337.9],[216.9,341.6],[233.4,349.2],[502.1,436.9],[532.6,449.7],[551.9,458.6],[602.5,487.3],[616.6,496.7],[661.8,532.2],[681.9,550.9],[711.3,581.5],[748.8,629.1],[773.8,668.8],[796.0,709.3],[810.7,746.1],[825.0,787.9],[1052,1450]];
function railBlin(a){
  if (a <= RAIL[0][0]) return RAIL[0][1];
  for (let k = 0; k < RAIL.length - 1; k++){
    const [a0,b0] = RAIL[k], [a1,b1] = RAIL[k+1];
    if (a <= a1) return b0 + (b1 - b0) * (a - a0) / (a1 - a0);
  }
  return RAIL[RAIL.length-1][1];
}
const RT0 = -2300, RT1 = 1100, rtab = new Float32Array(RT1 - RT0 + 1);
for (let a = RT0; a <= RT1; a++){ let s = 0, n = 0; for (let k = -27; k <= 27; k += 3){ s += railBlin(a + k); n++; } rtab[a - RT0] = s / n; }
function railB(a){ const t = Math.min(Math.max(a - RT0, 0), RT1 - RT0 - 1.0001); const i = Math.floor(t), f = t - i; return rtab[i] * (1 - f) + rtab[i+1] * f; }
function railDist(a, b){ const s = (railB(a + 2) - railB(a - 2)) / 4; return (b - railB(a)) / Math.hypot(1, s); } // + = lado SO

// Trazado real de Bulevar Ferrocarril, pasos a nivel y Chacabuco alrededor de las vías (OSM)
const BV_FC_NE = [[-71.9,146.9],[-56.6,95.6],[-56.6,90.9],[-59.7,87.0],[-96.3,75.5],[-168.9,52.2],[-188.1,45.4],[-224.3,33.1],[-282.8,13.3],[-298.3,8.2],[-387.0,-22.2],[-432.9,-36.1],[-439.6,-35.8],[-446.1,-31.1],[-466.6,26.6]];
const PASO_OESTE = [[-466.6,26.6],[-470.4,40.8],[-471.8,45.2],[-473.1,49.6],[-478.9,66.9],[-488.3,96.8]];
const BV_FC_SO = [[-488.3,96.8],[-388.8,130.2],[-299.3,160.2],[-285.4,164.9],[-193.8,195.6],[-108.8,224.1],[-100.1,224.1],[-97.4,221.0],[-86.4,192.3],[-81.5,177.0],[-79.7,172.5],[-78.3,167.4],[-71.9,146.9]];
const RAIL_YARD_POLY = [...BV_FC_NE, ...PASO_OESTE.slice(1), ...BV_FC_SO.slice(1, -1)];
const CHACABUCO_PTS = [[-86.4,192.3],[4.5,222.5],[94.9,252.4],[192.9,285.0],[291.2,317.3],[388.3,349.7],[487.1,382.5]];
const CATAMARCA_CONN = [[6.0,145.9],[-4.5,145.9],[-71.9,146.9]];
const chacabucoB = a => 329.9 + (406.0 - 329.9) * (a - 160.4) / (389.8 - 160.4);
function inRailZone(x, z){
  const [a, b] = AB(x, z);
  if (a <= 167 && inPoly(x, z, RAIL_YARD_POLY)) return true;
  if (a > 165 && a < AMAX + 15 && railDist(a, b) > -5.5 && b < chacabucoB(a) - 1) return true;
  return false;
}

// Región del pueblo: 'NE' (lado grande) o 'SO' (cruzando las vías)
function region(a, b, m = 0){
  if (a < -0.5 || a > AMAX + 0.5) return null;
  const d = railDist(a, b);
  if (d < -m && b >= -0.5 && b <= 390.5) return 'NE';
  if (d >  m && b >= 272.5 && b <= BMAX + 0.5) return 'SO';
  return null;
}
function regionRect(x0, z0, x1, z1, m){
  const r = region(...AB(x0, z0), m);
  if (!r) return null;
  if (region(...AB(x1, z0), m) !== r || region(...AB(x0, z1), m) !== r || region(...AB(x1, z1), m) !== r) return null;
  return r;
}

/* =========================================================
   Renderer / escena
   ========================================================= */
const canvas = document.getElementById('game');
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, logarithmicDepthBuffer: true });
renderer.setPixelRatio(Math.min(devicePixelRatio, 1.5));   // tope 1,5 (antes 2): casi igual de nítido y bastante más liviano en pantallas grandes
renderer.setSize(innerWidth, innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
const scene = new THREE.Scene();
const SKY = 0xa9c9e8;
scene.background = new THREE.Color(SKY);
scene.fog = new THREE.Fog(SKY, 250, 1700);
const camera = new THREE.PerspectiveCamera(60, innerWidth / innerHeight, 0.25, 2200);   // la niebla tapa todo a 1700 m: más lejos no hace falta dibujar

const hemi = new THREE.HemisphereLight(0xdcecff, 0x5d6b3a, 1.3);
scene.add(hemi);
const sun = new THREE.DirectionalLight(0xfff1dc, 2.4);
sun.castShadow = true;
sun.shadow.mapSize.set(2048, 2048);
Object.assign(sun.shadow.camera, { left: -80, right: 80, top: 80, bottom: -80, near: 20, far: 260 });
sun.shadow.bias = -0.00025;
sun.shadow.normalBias = 0.035;
scene.add(sun, sun.target);
// Anclado de la cámara de sombras a la grilla de téxeles en espacio de luz (evita el parpadeo/temblor de sombras al moverse)
const SUN_OFF = new THREE.Vector3(70, 130, 45);
const SUN_L = SUN_OFF.clone().normalize();
const SUN_U = new THREE.Vector3(0, 1, 0).cross(SUN_L).normalize();
const SUN_V = SUN_L.clone().cross(SUN_U).normalize();
function setSunDir(x, y, z){
  SUN_OFF.set(x, y, z);
  SUN_L.copy(SUN_OFF).normalize();
  SUN_U.set(0, 1, 0).cross(SUN_L);
  if (SUN_U.lengthSq() < 1e-4) SUN_U.set(1, 0, 0);
  SUN_U.normalize();
  SUN_V.copy(SUN_L).cross(SUN_U).normalize();
}
const _sunC = new THREE.Vector3(), _sunT = new THREE.Vector3();
function updateSun(cx, cz){
  const sc = sun.shadow.camera;
  const texel = (sc.right - sc.left) / Math.max(1, sun.shadow.mapSize.x);
  _sunC.set(cx, 0, cz);
  const u = Math.round(_sunC.dot(SUN_U) / texel) * texel;
  const v = Math.round(_sunC.dot(SUN_V) / texel) * texel;
  const w = Math.round(_sunC.dot(SUN_L) / texel) * texel;
  _sunT.copy(SUN_U).multiplyScalar(u).addScaledVector(SUN_V, v).addScaledVector(SUN_L, w);
  sun.target.position.copy(_sunT);
  sun.position.copy(_sunT).add(SUN_OFF);
  sun.target.updateMatrixWorld();
}

/* =========================================================
   Helpers de geometría
   ========================================================= */
// Todo lo plano (pasto, calles, veredas, vías...) va en una sola malla con colores por vértice
class Flat {
  constructor(){ this.p = []; this.c = []; this.col = new THREE.Color(); this._placed = []; this._cells = new Map(); this._big = []; this._stamp = []; this._q = 0; }
  _triRaw(a, b, c, y, col){
    if ((b[0]-a[0])*(c[1]-a[1]) - (b[1]-a[1])*(c[0]-a[0]) > 0) [b, c] = [c, b]; // siempre mirando hacia arriba
    this.col.set(col); for (const v of [a,b,c]){ this.p.push(v[0], y, v[1]); this.c.push(this.col.r, this.col.g, this.col.b); }
  }
  _resolveY(x0, z0, x1, z1, y){
    if (x0 > x1) [x0, x1] = [x1, x0];
    if (z0 > z1) [z0, z1] = [z1, z0];
    // OPTIMIZACIÓN: antes cada pieza recorría TODAS las ya puestas (miles × miles al cargar).
    // Ahora solo mira las que caen en las mismas celdas de 32 m (las muy grandes van a una lista aparte).
    // Se revisan en el mismo orden que antes, así que la altura resultante es idéntica.
    const C = 32, cx0 = Math.floor(x0 / C), cx1 = Math.floor(x1 / C), cz0 = Math.floor(z0 / C), cz1 = Math.floor(z1 / C);
    const big = (cx1 - cx0 + 1) * (cz1 - cz0 + 1) > 64, P = this._placed;
    let cand;
    if (big) cand = null;   // pieza enorme (cinta larga): se compara con todo, como antes
    else {
      const q = ++this._q, st = this._stamp; cand = [];
      const take = l => { for (let k = 0; k < l.length; k++){ const i = l[k]; if (st[i] !== q){ st[i] = q; cand.push(i); } } };
      take(this._big);
      for (let cx = cx0; cx <= cx1; cx++) for (let cz = cz0; cz <= cz1; cz++){ const l = this._cells.get(cx * 65536 + cz); if (l) take(l); }
      cand.sort((a, b) => a - b);
    }
    let yr = y;
    const n = cand ? cand.length : P.length;
    for (let pass = 0; pass < 12; pass++){
      let hit = false;
      for (let k = 0; k < n; k++){
        const o = P[cand ? cand[k] : k];
        if (Math.abs(o.y - yr) < .0025 && x1 > o.x0 + 1e-3 && x0 < o.x1 - 1e-3 && z1 > o.z0 + 1e-3 && z0 < o.z1 - 1e-3){
          yr = o.y + .003; hit = true; break;
        }
      }
      if (!hit) break;
    }
    const id = P.length;
    P.push({ x0, z0, x1, z1, y: yr });
    if (big) this._big.push(id);
    else for (let cx = cx0; cx <= cx1; cx++) for (let cz = cz0; cz <= cz1; cz++){ const kk = cx * 65536 + cz; let l = this._cells.get(kk); if (!l) this._cells.set(kk, l = []); l.push(id); }
    return yr;
  }
  _remapY(y){
    // Baja veredas custom y canteros (0.195..0.25) en -0.105 para alinear con SW_Y = 0.095 y ROAD_Y = 0.015
    return (y >= .195 && y <= .255) ? (y - .105) : y;
  }
  tri(a, b, c, y, col){
    const yr = this._resolveY(Math.min(a[0], b[0], c[0]), Math.min(a[1], b[1], c[1]), Math.max(a[0], b[0], c[0]), Math.max(a[1], b[1], c[1]), this._remapY(y));
    this._triRaw(a, b, c, yr, col);
  }
  quad(a, b, c, d, y, col){
    const yr = this._resolveY(Math.min(a[0], b[0], c[0], d[0]), Math.min(a[1], b[1], c[1], d[1]), Math.max(a[0], b[0], c[0], d[0]), Math.max(a[1], b[1], c[1], d[1]), this._remapY(y));
    this._triRaw(a, b, c, yr, col); this._triRaw(a, c, d, yr, col);
  }
  rect(x0, z0, x1, z1, y, col){
    const yr = this._resolveY(x0, z0, x1, z1, this._remapY(y));
    this._triRaw([x0,z0],[x0,z1],[x1,z1], yr, col); this._triRaw([x0,z0],[x1,z1],[x1,z0], yr, col);
  }
  ribbon(pts, width, y, col, off = 0){
    const L = [], Rr = [];
    let bx0 = Infinity, bz0 = Infinity, bx1 = -Infinity, bz1 = -Infinity;
    for (let i = 0; i < pts.length; i++){
      const p = pts[Math.max(i-1,0)], n = pts[Math.min(i+1,pts.length-1)];
      let tx = n[0]-p[0], tz = n[1]-p[1]; const l = Math.hypot(tx,tz) || 1; tx/=l; tz/=l;
      const nx = -tz, nz = tx;
      const lp = [pts[i][0] + nx*(off+width/2), pts[i][1] + nz*(off+width/2)];
      const rp = [pts[i][0] + nx*(off-width/2), pts[i][1] + nz*(off-width/2)];
      L.push(lp); Rr.push(rp);
      for (const q of [lp, rp]){ if (q[0] < bx0) bx0 = q[0]; if (q[0] > bx1) bx1 = q[0]; if (q[1] < bz0) bz0 = q[1]; if (q[1] > bz1) bz1 = q[1]; }
    }
    const yr = this._resolveY(bx0, bz0, bx1, bz1, y);
    for (let i = 0; i < pts.length - 1; i++){
      const segLen = Math.hypot(pts[i+1][0] - pts[i][0], pts[i+1][1] - pts[i][1]);
      const steps = Math.max(1, Math.ceil(segLen / 40));
      for (let s = 0; s < steps; s++){
        const t0 = s / steps, t1 = (s + 1) / steps;
        const l0 = [L[i][0] + (L[i+1][0] - L[i][0]) * t0, L[i][1] + (L[i+1][1] - L[i][1]) * t0];
        const l1 = [L[i][0] + (L[i+1][0] - L[i][0]) * t1, L[i][1] + (L[i+1][1] - L[i][1]) * t1];
        const r0 = [Rr[i][0] + (Rr[i+1][0] - Rr[i][0]) * t0, Rr[i][1] + (Rr[i+1][1] - Rr[i][1]) * t0];
        const r1 = [Rr[i][0] + (Rr[i+1][0] - Rr[i][0]) * t1, Rr[i][1] + (Rr[i+1][1] - Rr[i][1]) * t1];
        this._triRaw(l0, r0, r1, yr, col); this._triRaw(l0, r1, l1, yr, col);
      }
    }
  }
  build(){
    this._placed = []; this._cells = new Map(); this._big = []; this._stamp = [];   // ya no se necesitan: liberar memoria
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.Float32BufferAttribute(this.p, 3));
    g.setAttribute('color', new THREE.Float32BufferAttribute(this.c, 3));
    const nrm = new Float32Array(this.p.length); for (let i = 1; i < nrm.length; i += 3) nrm[i] = 1;
    g.setAttribute('normal', new THREE.BufferAttribute(nrm, 3));
    const m = new THREE.Mesh(g, new THREE.MeshLambertMaterial({ vertexColors: true }));
    m.receiveShadow = true; return m;
  }
}
const flat = new Flat();

// Capa de calzadas sin superposiciones: recorta calles de menor prioridad contra las de mayor prioridad en 2D
const ROAD_Y = .015;
class RoadLayer {
  constructor(){ this.items = []; this.sidewalks = []; }
  _area2(pts){
    let a = 0;
    for (let i = 0, n = pts.length; i < n; i++){
      const p = pts[i], q = pts[(i + 1) % n];
      a += p[0] * q[1] - q[0] * p[1];
    }
    return a;
  }
  _norm(pts){
    const out = [];
    for (const p of pts){
      if (!out.length || Math.hypot(p[0] - out[out.length - 1][0], p[1] - out[out.length - 1][1]) > 1e-4) out.push([p[0], p[1]]);
    }
    if (out.length > 1 && Math.hypot(out[0][0] - out[out.length - 1][0], out[0][1] - out[out.length - 1][1]) <= 1e-4) out.pop();
    if (out.length < 3) return null;
    const a2 = this._area2(out);
    if (Math.abs(a2) < 1e-4) return null;
    if (a2 < 0) out.reverse();
    return out;
  }
  _bbox(pts){
    let x0 = Infinity, z0 = Infinity, x1 = -Infinity, z1 = -Infinity;
    for (const [x, z] of pts){ if (x < x0) x0 = x; if (x > x1) x1 = x; if (z < z0) z0 = z; if (z > z1) z1 = z; }
    return [x0, z0, x1, z1];
  }
  addPoly(pts, prio, col, clipRail = false){
    const p = this._norm(pts);
    if (!p) return;
    this.items.push({ poly: p, bb: this._bbox(p), prio, col, clipRail, ord: this.items.length });
  }
  addRect(x0, z0, x1, z1, prio, col, clipRail = false){
    if (x0 > x1) [x0, x1] = [x1, x0];
    if (z0 > z1) [z0, z1] = [z1, z0];
    if (x1 - x0 < 1e-3 || z1 - z0 < 1e-3) return;
    this.addPoly([[x0, z0], [x1, z0], [x1, z1], [x0, z1]], prio, col, clipRail);
  }
  addSidewalk(x0, z0, x1, z1, col, clipRail = false){
    if (x0 > x1) [x0, x1] = [x1, x0];
    if (z0 > z1) [z0, z1] = [z1, z0];
    if (x1 - x0 < 1e-3 || z1 - z0 < 1e-3) return;
    const p = this._norm([[x0, z0], [x1, z0], [x1, z1], [x0, z1]]);
    if (p) this.sidewalks.push({ poly: p, bb: this._bbox(p), col, clipRail });
  }
  addRibbon(pts, width, prio, col, off = 0, capStart = false, capEnd = false){
    const hw = width / 2;
    for (let i = 0; i < pts.length - 1; i++){
      const [x0, z0] = pts[i], [x1, z1] = pts[i + 1];
      const dx = x1 - x0, dz = z1 - z0, l = Math.hypot(dx, dz);
      if (l < 1e-3) continue;
      const nx = -dz / l, nz = dx / l;
      const lOff = off + hw, rOff = off - hw;
      const steps = Math.max(1, Math.ceil(l / 50));
      for (let s = 0; s < steps; s++){
        const t0 = s / steps, t1 = (s + 1) / steps;
        const ax = x0 + dx * t0, az = z0 + dz * t0;
        const bx = x0 + dx * t1, bz = z0 + dz * t1;
        this.addPoly([
          [ax + nx * lOff, az + nz * lOff],
          [ax + nx * rOff, az + nz * rOff],
          [bx + nx * rOff, bz + nz * rOff],
          [bx + nx * lOff, bz + nz * lOff],
        ], prio, col);
      }
    }
    if (off === 0){
      const i0 = capStart ? 0 : 1, i1 = capEnd ? pts.length - 1 : pts.length - 2;
      for (let i = i0; i <= i1; i++){
        const [cx, cz] = pts[i], cap = [];
        for (let k = 0; k < 8; k++){
          const ang = k * Math.PI / 4;
          cap.push([cx + Math.cos(ang) * hw, cz + Math.sin(ang) * hw]);
        }
        this.addPoly(cap, prio - 0.01, col);
      }
    }
  }
  _clipHalf(poly, ax, az, bx, bz, sign){
    const EPS = 1e-5, ex = bx - ax, ez = bz - az;
    const out = [];
    for (let i = 0, n = poly.length; i < n; i++){
      const s = poly[i], e = poly[(i + 1) % n];
      const ds = sign * (ex * (s[1] - az) - ez * (s[0] - ax));
      const de = sign * (ex * (e[1] - az) - ez * (e[0] - ax));
      const inS = ds >= -EPS, inE = de >= -EPS;
      if (inS && inE) out.push(e);
      else if (inS && !inE){ const t = ds / (ds - de); out.push([s[0] + (e[0] - s[0]) * t, s[1] + (e[1] - s[1]) * t]); }
      else if (!inS && inE){ const t = ds / (ds - de); out.push([s[0] + (e[0] - s[0]) * t, s[1] + (e[1] - s[1]) * t], e); }
    }
    return this._norm(out);
  }
  _subtract(polyA, polyB){
    let rem = polyA;
    const out = [];
    for (let i = 0, n = polyB.length; i < n; i++){
      const [ax, az] = polyB[i], [bx, bz] = polyB[(i + 1) % n];
      const outside = this._clipHalf(rem, ax, az, bx, bz, -1);
      if (outside) out.push(outside);
      rem = this._clipHalf(rem, ax, az, bx, bz, 1);
      if (!rem) return [polyA];
    }
    return out;
  }
  build(){
    const sorted = this.items.slice().sort((a, b) => (b.prio - a.prio) || (a.ord - b.ord));
    const cutters = [];
    for (const item of sorted){
      let pieces = [item.poly];
      const [ax0, az0, ax1, az1] = item.bb;
      for (const c of cutters){
        const [bx0, bz0, bx1, bz1] = c.bb;
        if (ax1 <= bx0 + 1e-4 || ax0 >= bx1 - 1e-4 || az1 <= bz0 + 1e-4 || az0 >= bz1 - 1e-4) continue;
        const next = [];
        for (const p of pieces){
          const sub = this._subtract(p, c.poly);
          for (const s of sub) next.push(s);
        }
        pieces = next;
        if (!pieces.length) break;
      }
      for (const p of pieces){
        if (item.clipRail){
          let cx = 0, cz = 0; for (const q of p){ cx += q[0]; cz += q[1]; } cx /= p.length; cz /= p.length;
          if (inPoly(cx, cz, RAIL_YARD_POLY)) continue;
          if (item.clipRail === 'SO'){ const [ca, cb] = AB(cx, cz); if (ca > 165 && cb < chacabucoB(ca)) continue; }
        }
        for (let i = 1; i < p.length - 1; i++) flat._triRaw(p[0], p[i], p[i + 1], ROAD_Y, item.col);
      }
      cutters.push(item);
    }
    // Veredas: recortadas limpiamente contra todas las calzadas (incluyendo Bv. Ferrocarril y Chacabuco) y entre sí
    const swCutters = [];
    for (const sw of this.sidewalks){
      let pieces = [sw.poly];
      const [ax0, az0, ax1, az1] = sw.bb;
      for (const list of [cutters, swCutters]){
        for (const c of list){
          const [bx0, bz0, bx1, bz1] = c.bb;
          if (ax1 <= bx0 + 1e-4 || ax0 >= bx1 - 1e-4 || az1 <= bz0 + 1e-4 || az0 >= bz1 - 1e-4) continue;
          const next = [];
          for (const p of pieces){
            const sub = this._subtract(p, c.poly);
            for (const s of sub) next.push(s);
          }
          pieces = next;
          if (!pieces.length) break;
        }
        if (!pieces.length) break;
      }
      for (const p of pieces){
        if (sw.clipRail){
          let cx = 0, cz = 0; for (const q of p){ cx += q[0]; cz += q[1]; } cx /= p.length; cz /= p.length;
          if (inPoly(cx, cz, RAIL_YARD_POLY)) continue;
          if (sw.clipRail === 'SO'){ const [ca, cb] = AB(cx, cz); if (ca > 165 && cb < chacabucoB(ca)) continue; }
        }
        for (let i = 1; i < p.length - 1; i++) flat._triRaw(p[0], p[i], p[i + 1], .095, sw.col);
      }
      swCutters.push(sw);
    }
  }
}
const roadLayer = new RoadLayer();

// Instancias (casas, árboles, etc.)
class Inst {
  constructor(geo, mat){ this.geo = geo; this.mat = mat; this.list = []; }
  add(x, y, z, sx, sy, sz, ry, color){ this.list.push([x,y,z,sx,sy,sz,ry,color]); }
  build(cast = true){
    const m = new THREE.InstancedMesh(this.geo, this.mat, Math.max(this.list.length, 1));
    m.count = this.list.length;
    const d = new THREE.Object3D(), c = new THREE.Color();
    this.list.forEach((e, i) => {
      d.position.set(e[0], e[1], e[2]); d.scale.set(e[3], e[4], e[5]); d.rotation.set(0, e[6], 0); d.updateMatrix();
      m.setMatrixAt(i, d.matrix); m.setColorAt(i, c.set(e[7]));
    });
    m.castShadow = cast; m.receiveShadow = true; scene.add(m); return m;
  }
}
const boxGeo = new THREE.BoxGeometry(1,1,1).translate(0,.5,0);
function gableGeo(){
  const v = [
    -.5,0,-.5,  .5,0,-.5,  .5,1,0,   -.5,0,-.5,  .5,1,0, -.5,1,0,
    -.5,0, .5, -.5,1,0,  .5,1,0,   -.5,0, .5,  .5,1,0,  .5,0,.5,
    -.5,0,-.5, -.5,1,0, -.5,0,.5,
     .5,0,-.5,  .5,0,.5,  .5,1,0 ];
  const g = new THREE.BufferGeometry(); g.setAttribute('position', new THREE.Float32BufferAttribute(v,3)); g.computeVertexNormals(); return g;
}
const lam = (o = {}) => new THREE.MeshLambertMaterial({ color: 0xffffff, ...o });
const walls  = new Inst(boxGeo, lam());
const roofs  = new Inst(gableGeo(), lam({ side: THREE.DoubleSide }));
const trims  = new Inst(boxGeo, lam());
const darks  = new Inst(boxGeo, lam());
const trunks = new Inst(new THREE.CylinderGeometry(.5,.6,1,6).translate(0,.5,0), lam());
const crowns = new Inst(new THREE.IcosahedronGeometry(1,0), lam({ flatShading: true }));
const poles  = new Inst(new THREE.CylinderGeometry(.5,.5,1,6).translate(0,.5,0), lam());
const sleepers = new Inst(boxGeo, lam());
const balls  = new Inst(new THREE.SphereGeometry(1, 16, 10), lam({ emissive: 0x3a3a30 }));
const palmTrunks = new Inst(new THREE.CylinderGeometry(.42, .55, 1, 9).translate(0, .5, 0), lam());
const palmCrowns = new Inst((() => {
  const parts = [];
  for (const [n, tilt, len, off] of [[9, .15, 4.2, 0], [11, .6, 4.6, .3], [8, 1.05, 3.8, .1]])
    for (let k = 0; k < n; k++){
      const f = new THREE.BoxGeometry(.85, .05, len).translate(0, 0, len/2);
      f.rotateX(tilt); f.rotateY(k / n * Math.PI * 2 + off);
      parts.push(f);
    }
  parts.push(new THREE.SphereGeometry(.7, 8, 6));
  return mergeGeometries(parts.map(p => p.index ? p.toNonIndexed() : p));
})(), lam({ side: THREE.DoubleSide }));
const bikeWheels = new Inst(new THREE.TorusGeometry(.33, .03, 6, 16), lam());
const anims = [];
function addPalm(x, z, s, y0 = 0){
  const h = R(5.5, 8) * s;
  palmTrunks.add(x, y0, z, s, h, s, 0, '#7d6a52');
  palmCrowns.add(x, y0 + h, z, s, s, s, R(0, 6), pick(['#4f7a2c','#5c8a33','#46702a']));
  addCol(x - .5*s, z - .5*s, x + .5*s, z + .5*s);
}
function addBush(x, z, s, y0 = 0){ crowns.add(x, y0 + .35*s, z, 1.1*s, .75*s, 1.1*s, R(0, 6), pick(['#2f5a24','#3b6a2a','#4c7a30','#55803a'])); }
const CROWN_COLS = ['#3f6b2a','#4b7a30','#557f35','#38602a','#5e8a3a','#466f2e','#6b8f3d'];
const FLOWERS = ['#d8344a','#f2c230','#e86fa8','#8b5cc7','#f08a2c','#ffffff'];
function addFlowers(x, z){ const c = pick(FLOWERS); for (let k = 0; k < 6; k++) crowns.add(x + R(-.9, .9), .18, z + R(-.9, .9), .28, .22, .28, R(0, 6), rnd() < .8 ? c : '#3b6a2a'); }
function addGrassTuft(x, z){ crowns.add(x, .35, z, .5, .7, .5, R(0, 6), pick(['#7f9a4a','#8fa85a','#6d8a3e'])); }

function mesh(geo, color, x, y, z, ry = 0){ const m = new THREE.Mesh(geo, lam({ color })); m.position.set(x,y,z); m.rotation.y = ry; m.castShadow = m.receiveShadow = true; scene.add(m); return m; }
const box = (x, y, z, sx, sy, sz, color, ry = 0) => { const m = mesh(boxGeo, color, x, y, z, ry); m.scale.set(sx, sy, sz); return m; };

/* =========================================================
   Colisiones: cajas en una grilla espacial
   ========================================================= */
const CELL = 16, hash = new Map();
const hk = (i, j) => i * 100003 + j;
function addCol(x0, z0, x1, z1, maxY = 7.5){
  if (x0 > x1){ const t = x0; x0 = x1; x1 = t; }
  if (z0 > z1){ const t = z0; z0 = z1; z1 = t; }
  if (x1 - x0 < 1e-4 || z1 - z0 < 1e-4) return;
  const b = { x0, z0, x1, z1, maxY };
  for (let i = Math.floor(x0/CELL); i <= Math.floor(x1/CELL); i++)
    for (let j = Math.floor(z0/CELL); j <= Math.floor(z1/CELL); j++){
      const k = hk(i,j); if (!hash.has(k)) hash.set(k, []); hash.get(k).push(b);
    }
}
// Colisión orientada (OBB 2D) para edificios, ochavas y escenarios rotados en diagonal (sin paredes invisibles)
function addColOBB(cx, cz, hx, hz, ry, maxY = 7.5){
  if (hx < 1e-4 || hz < 1e-4) return;
  const c = Math.cos(ry), s = Math.sin(ry);
  const ex = Math.abs(c) * hx + Math.abs(s) * hz;
  const ez = Math.abs(s) * hx + Math.abs(c) * hz;
  const b = { obb: true, cx, cz, hx, hz, c, s, maxY, x0: cx - ex, z0: cz - ez, x1: cx + ex, z1: cz + ez };
  for (let i = Math.floor(b.x0/CELL); i <= Math.floor(b.x1/CELL); i++)
    for (let j = Math.floor(b.z0/CELL); j <= Math.floor(b.z1/CELL); j++){
      const k = hk(i,j); if (!hash.has(k)) hash.set(k, []); hash.get(k).push(b);
    }
}
// Colisiones SOLO para el auto (veredas con cordón y canteros): el personaje camina por arriba sin problema
const carHash = new Map();
function addCarCol(x0, z0, x1, z1){
  if (x0 > x1){ const t = x0; x0 = x1; x1 = t; }
  if (z0 > z1){ const t = z0; z0 = z1; z1 = t; }
  if (x1 - x0 < 1e-4 || z1 - z0 < 1e-4) return;
  const b = { x0, z0, x1, z1 };
  for (let i = Math.floor(x0/CELL); i <= Math.floor(x1/CELL); i++)
    for (let j = Math.floor(z0/CELL); j <= Math.floor(z1/CELL); j++){
      const k = hk(i,j); if (!carHash.has(k)) carHash.set(k, []); carHash.get(k).push(b);
    }
}
// Superficies caminables (veredas, canteros centrales, escaleras, tarimas) para que los pies apoyen arriba y suban escalones automáticamente
const walkHash = new Map();
function addFloor(x0, z0, x1, z1, topY){
  if (x0 > x1){ const t = x0; x0 = x1; x1 = t; }
  if (z0 > z1){ const t = z0; z0 = z1; z1 = t; }
  if (x1 - x0 < 1e-4 || z1 - z0 < 1e-4) return;
  const b = { x0, z0, x1, z1, topY };
  for (let i = Math.floor(x0/CELL); i <= Math.floor(x1/CELL); i++)
    for (let j = Math.floor(z0/CELL); j <= Math.floor(z1/CELL); j++){
      const k = hk(i,j); if (!walkHash.has(k)) walkHash.set(k, []); walkHash.get(k).push(b);
    }
}
function addFloorOBB(cx, cz, hx, hz, ry, topY){
  if (hx < 1e-4 || hz < 1e-4) return;
  const c = Math.cos(ry), s = Math.sin(ry);
  const ex = Math.abs(c) * hx + Math.abs(s) * hz;
  const ez = Math.abs(s) * hx + Math.abs(c) * hz;
  const b = { obb: true, cx, cz, hx, hz, c, s, topY, x0: cx - ex, z0: cz - ez, x1: cx + ex, z1: cz + ez };
  for (let i = Math.floor(b.x0/CELL); i <= Math.floor(b.x1/CELL); i++)
    for (let j = Math.floor(b.z0/CELL); j <= Math.floor(b.z1/CELL); j++){
      const k = hk(i,j); if (!walkHash.has(k)) walkHash.set(k, []); walkHash.get(k).push(b);
    }
}
function overlap(x0, z0, x1, z1){
  if (x0 > x1){ const t = x0; x0 = x1; x1 = t; }
  if (z0 > z1){ const t = z0; z0 = z1; z1 = t; }
  for (let i = Math.floor(x0/CELL); i <= Math.floor(x1/CELL); i++)
    for (let j = Math.floor(z0/CELL); j <= Math.floor(z1/CELL); j++){
      const l = hash.get(hk(i,j)); if (!l) continue;
      for (const b of l) if (b.x0 < x1 && b.x1 > x0 && b.z0 < z1 && b.z1 > z0) return true;
    }
  return false;
}

// datos para el minimapa
const mapRoads = [], mapRects = [], mapFields = [];

/* =========================================================
   Suelo, campos alrededor
   ========================================================= */
const ground = new THREE.Mesh(new THREE.PlaneGeometry(12000, 12000, 48, 48), lam({ color: 0x6f8c48 }));
ground.rotation.x = -Math.PI/2; ground.position.y = -.10; ground.receiveShadow = true; scene.add(ground);

const [TX0, TZ0] = W(0, 0), [TX1, TZ1] = W(AMAX, BMAX);
flat.rect(TX0 - 6, TZ0 - 6, TX1 + 6, TZ1 + 6, .015, '#6b8744');   // pasto del pueblo

const FIELD_COLS = ['#7a9a4a','#8aa556','#6b8c3e','#a39a5a','#b8a86a','#5e7f3a','#9b8a5c','#7e9f5f','#c2b278','#6f9a50','#8c7a52','#4f7a35'];

// ---- Helpers de geometría, plazas y edificios (centralizados en core/engine.js) ----

function nearRuralRoad(x, z, m = 9){
  if (distToPolyline(x, z, RP20S_PTS) < m + 2 || distToPolyline(x, z, RP26S_PTS) < m + 2 || distToPolyline(x, z, RP10S_E) < m + 2 || distToPolyline(x, z, IRIONDO_TIERRA) < m - 2) return true;
  if (distToPolyline(x, z, ACC_PTS) < m + 4 || distToPolyline(x, z, R18_PTS) < m + 5 ||
      distToPolyline(x, z, ACC_RAMP_S) < m + 4 || distToPolyline(x, z, ACC_RAMP_N) < m + 4) return true;
  const [a, b] = AB(x, z), mm = m / S;
  return (Math.abs(b - 429) < mm && a < 0) || (Math.abs(a) < mm && b > BMAX);
}
function nearRail(x, z, m){ const [a, b] = AB(x, z); return Math.abs(railDist(a, b)) * S < m; }
const inTownBox = (x, z, m = 0) => x > TX0 - m && x < TX1 + m && z > TZ0 - m && z < TZ1 + m;

const ROADM = 11; // distancia (px) de las calles a las vías: ahí está la calle paralela
const ST = {
  dirt:   { w: 9,  y: .08, prio: 20, c: '#a98a5f', map: '#e8d23a' },
  gravel: { w: 9,  y: .09, prio: 30, c: '#76797d', map: '#b7bdc4' },             // calles de ripio / escoria (lado NE)
  dAve:   { w: 17, y: .10, prio: 35, c: '#b99a70', map: '#f0a8c0', blvd: 3 },    // avenidas de tierra con cantero de pasto y árboles
  gAve:   { w: 17, y: .10, prio: 40, c: '#7c7f84', map: '#c7ccd2', blvd: 3 },    // avenidas de ripio / escoria con cantero de pasto y árboles
  paved:  { w: 9,  y: .12, prio: 50, c: '#9d9b96', map: '#9a4fb0', sw: true },   // calles de hormigón, como en Street View
  pAve:   { w: 17, y: .14, prio: 60, c: '#a3a19b', map: '#ffffff', sw: true, blvd: 4 },  // bulevar (Lavalle / Independencia) con cantero de plantas
  main:   { w: 18, y: .16, prio: 70, c: '#55575c', map: '#3b4fd0', sw: true, median: true },
};

const PLAZAS = [[4, 2], [5, 2], [4, 3], [5, 3]], CHURCH = [4, 1];
const isPlaza = (i, j) => PLAZAS.some(p => p[0] === i && p[1] === j);
const AVE_A = { 78: 10.5, 195: 13.5, 312: 10.5 }, AVE_B = { 117: 10.5, 429: 10.5 };
const shA = a => AVE_A[a] || 8, shB = b => AVE_B[b] || 8;
function inner(i, j){
  const a0 = i*G, a1 = a0 + G, b0 = j*G, b1 = b0 + G;
  const [x0, z0] = W(a0, b0), [x1, z1] = W(a1, b1);
  return [x0 + shA(a0), z0 + shB(b0), x1 - shA(a1), z1 - shB(b1)];
}
const treeSpots = [];
/* ---------- Las cuatro plazas y el mástil ---------- */
const AUTUMN = ['#a0642c','#b5793a','#8a5a2b','#c08a4a','#9c6b35','#6d843a'];
const JACARANDA = ['#846fd4','#9a86e6','#715cc2','#ab99ef','#6854b5'];
const GRAVEL = '#d2bd8f';
const keepFns = [];
const keepRect = (x0, z0, x1, z1) => keepFns.push((x, z, r) => x + r > x0 && x - r < x1 && z + r > z0 && z - r < z1);
const keepSeg = (ax, az, bx, bz, w) => keepFns.push((x, z, r) => segDist(x, z, ax, az, bx, bz) < w/2 + r);
const freeSpot = (x, z, r) => !keepFns.some(f => f(x, z, r)) && !overlap(x - r, z - r, x + r, z + r);
function addPlazaTree(x, z, kind){
  const pl = kind === 'platanus', jac = kind === 'jacaranda';
  const th = pl ? R(6.4, 8.8) : jac ? R(4.8, 6.6) : R(4.4, 6.2);
  const tr = pl ? R(.68, .92) : R(.52, .68);
  trunks.add(x, 0, z, tr, th, tr, 0, pl ? '#b9ad94' : '#655240');
  const cols = pl ? AUTUMN : jac ? JACARANDA : CROWN_COLS;
  const cr = pl ? R(3.8, 5.2) : jac ? R(3.2, 4.3) : R(2.9, 4.0);
  crowns.add(x, th + cr * .62, z, cr * 1.15, cr * .95, cr * 1.15, R(0, 6), pick(cols));
  for (let k = 0; k < (pl ? 4 : 3); k++){
    const a = k / (pl ? 4 : 3) * Math.PI * 2 + R(0, 1), d = cr * R(.42, .68);
    crowns.add(x + Math.cos(a) * d, th + cr * R(.55, 1.05), z + Math.sin(a) * d, cr * R(.68, .88), cr * R(.62, .82), cr * R(.68, .88), R(0, 6), pick(cols));
  }
  addCol(x - tr * .55, z - tr * .55, x + tr * .55, z + tr * .55);
}
function fillPlants(x0, z0, x1, z1, n){
  for (let k = 0; k < n; k++){
    const x = R(x0, x1), z = R(z0, z1), t = rnd();
    if (t < .30){
      const r = rnd(), kind = r < .55 ? 'platanus' : r < .80 ? 'jacaranda' : 'green';
      if (freeSpot(x, z, kind === 'platanus' ? 4.6 : 3.8)) addPlazaTree(x, z, kind);
    }
    else if (t < .40){ if (freeSpot(x, z, 3)) addPalm(x, z, R(.85, 1.15)); }
    else if (t < .68){ if (freeSpot(x, z, 1)) addBush(x, z, R(.7, 1.3)); }
    else if (t < .84){ if (freeSpot(x, z, 1)) addFlowers(x, z); }
    else if (freeSpot(x, z, .6)) addGrassTuft(x, z);
  }
}
function group(x, z, ry = 0){ const g = new THREE.Group(); g.position.set(x, 0, z); g.rotation.y = ry; scene.add(g); return g; }
function boxIn(g, x, y, z, sx, sy, sz, col, rx = 0, rz = 0){ const m = new THREE.Mesh(new THREE.BoxGeometry(sx, sy, sz), lam({ color: col })); m.position.set(x, y, z); m.rotation.set(rx, 0, rz); m.castShadow = m.receiveShadow = true; g.add(m); return m; }
const bx = (g, x, y0, z, sx, sy, sz, col, rx = 0, rz = 0) => boxIn(g, x, y0 + sy/2, z, sx, sy, sz, col, rx, rz);
function cylIn(g, x, y, z, r, h, col, rz = 0){ const m = new THREE.Mesh(new THREE.CylinderGeometry(r, r, h, 18), lam({ color: col })); m.position.set(x, y, z); m.rotation.z = rz; m.castShadow = true; g.add(m); return m; }
const UP = new THREE.Vector3(0, 1, 0);
function poleIn(g, a, b, r, col){
  const A = new THREE.Vector3(...a), d = new THREE.Vector3(...b).sub(A);
  const m = new THREE.Mesh(new THREE.CylinderGeometry(r, r, d.length(), 8), lam({ color: col }));
  m.position.copy(A).addScaledVector(d, .5); m.quaternion.setFromUnitVectors(UP, d.normalize()); m.castShadow = true; g.add(m); return m;
}
function addBench(x, z, ry){
  const g = group(x, z, ry);
  boxIn(g, 0, .45, 0, 1.8, .07, .45, '#8a5a33'); boxIn(g, 0, .75, -.21, 1.8, .35, .06, '#8a5a33');
  boxIn(g, -.75, .22, 0, .08, .45, .45, '#333333'); boxIn(g, .75, .22, 0, .08, .45, .45, '#333333');
  addCol(x - .7, z - .7, x + .7, z + .7);
}
const faceTo = (x, z, tx, tz) => Math.atan2(tx - x, tz - z);
const PSZ = 50, plazaRects = [];
const inPlaza = (x0, z0, x1, z1) => plazaRects.some(r => x0 < r[2] + 1 && x1 > r[0] - 1 && z0 < r[3] + 1 && z1 > r[1] - 1);
// La plaza ocupa la esquina que da al mástil, rodeada en sus dos lados exteriores por una calle pavimentada
function plazaBase(i, j){
  const [bx0, bz0, bx1, bz1] = inner(i, j);
  const nx = Math.abs(bx0 - MX) < Math.abs(bx1 - MX), nz = Math.abs(bz0 - MZ) < Math.abs(bz1 - MZ);
  const rx0 = nx ? bx0 : bx1 - PSZ, rx1 = nx ? bx0 + PSZ : bx1, rz0 = nz ? bz0 : bz1 - PSZ, rz1 = nz ? bz0 + PSZ : bz1;
  plazaRects.push([rx0, rz0, rx1, rz1]);
  // Calle pavimentada en L rodeando los 2 bordes exteriores de la plaza (separándola del resto de la manzana)
  const RW = 7.5;
  const ex = nx ? rx1 - RW / 2 : rx0 + RW / 2, ez = nz ? rz1 - RW / 2 : rz0 + RW / 2;
  const pA = [ex, nz ? rz0 - shB(117) + 2 : rz1 + shB(117) - 2];
  const pB = [nx ? rx0 - shA(195) + 2 : rx1 + shA(195) - 2, ez];
  const road = [pA, [ex, ez], pB];
  const hw = RW / 2;
  roadLayer.addRect(ex - hw, Math.min(pA[1], ez - hw), ex + hw, Math.max(pA[1], ez + hw), 48, ST.paved.c);
  roadLayer.addRect(Math.min(pB[0], ex - hw), ez - hw, Math.max(pB[0], ex + hw), ez + hw, 48, ST.paved.c);
  mapRoads.push({ pts: road, w: RW, col: ST.paved.map, y: .12 });
  // Área verde de la plaza interior a esa calle perimetral
  const x0 = nx ? rx0 : rx0 + RW, x1 = nx ? rx1 - RW : rx1, z0 = nz ? rz0 : rz0 + RW, z1 = nz ? rz1 - RW : rz1;
  flat.rect(x0, z0, x1, z1, .05, '#5f9140');
  for (const r of [[x0, z0, x1, z0 + 2.6], [x0, z1 - 2.6, x1, z1], [x0, z0 + 2.6, x0 + 2.6, z1 - 2.6], [x1 - 2.6, z0 + 2.6, x1, z1 - 2.6]]){ flat.rect(...r, .07, '#cfc8b8'); keepRect(r[0] - .2, r[1] - .2, r[2] + .2, r[3] + .2); }
  // Árboles altos (plátanos frondosos y jacarandás) tupidos todo alrededor del perímetro de cada plaza
  const pad = 3.6, step = 6.2;
  const edgeTree = (tx, tz) => { if (!overlap(tx - 1.2, tz - 1.2, tx + 1.2, tz + 1.2)) addPlazaTree(tx, tz, rnd() < .68 ? 'platanus' : 'jacaranda'); };
  for (let tx = x0 + pad; tx <= x1 - pad + .5; tx += step){ edgeTree(tx, z0 + pad); edgeTree(tx, z1 - pad); }
  for (let tz = z0 + pad + step; tz <= z1 - pad - step + .5; tz += step){ edgeTree(x0 + pad, tz); edgeTree(x1 - pad, tz); }
  mapRects.push([x0, z0, x1, z1, '#3f9a3a']);
  return [x0, z0, x1, z1, (x0 + x1)/2, (z0 + z1)/2];
}

// Mástil en el centro de las cuatro plazas
const [MX, MZ] = W(195, 117);

const SCHOOL_GATE_Z = -287.5;

const SPAWN = [MX - 19, MZ + 16, 2.25, -.89];

/* ---------- Edificios del centro ---------- */
const gGeo = gableGeo();
function gableIn(g, x, y, z, sx, sy, sz, col, ry = 0){ const m = new THREE.Mesh(gGeo, lam({ color: col, side: THREE.DoubleSide })); m.position.set(x, y, z); m.scale.set(sx, sy, sz); m.rotation.y = ry; m.castShadow = m.receiveShadow = true; g.add(m); return m; }
function colLocal(g, x0, z0, x1, z1, mapCol = '#c9b7a0'){
  g.updateMatrixWorld(true); const v = new THREE.Vector3(); const a = [1e9, 1e9, -1e9, -1e9];
  for (const [x, z] of [[x0, z0], [x1, z0], [x0, z1], [x1, z1]]){ v.set(x, 0, z).applyMatrix4(g.matrixWorld); a[0] = Math.min(a[0], v.x); a[1] = Math.min(a[1], v.z); a[2] = Math.max(a[2], v.x); a[3] = Math.max(a[3], v.z); }
  const ry = g.rotation ? (g.rotation.y || 0) : 0;
  if (Math.abs(Math.sin(2 * ry)) >= .08){
    v.set((x0 + x1) / 2, 0, (z0 + z1) / 2).applyMatrix4(g.matrixWorld);
    addColOBB(v.x, v.z, Math.abs(x1 - x0) / 2, Math.abs(z1 - z0) / 2, ry);
  } else addCol(...a);
  if (mapCol) mapRects.push([...a, mapCol]);
}
function textTex(text, w, h, bg, fg){
  const c = document.createElement('canvas'); c.width = w; c.height = h; const x = c.getContext('2d');
  x.fillStyle = bg; x.fillRect(0, 0, w, h); x.fillStyle = fg; x.textAlign = 'center'; x.textBaseline = 'middle';
  let fs = Math.round(h * .62); x.font = `bold ${fs}px Arial, sans-serif`;
  while (x.measureText(text).width > w * .94 && fs > 6){ fs--; x.font = `bold ${fs}px Arial, sans-serif`; }
  x.fillText(text, w/2, h/2 + 1);
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 4; return t;
}
function signIn(g, text, x, y, z, w, h, bg, fg, ry = 0){
  const m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), new THREE.MeshLambertMaterial({ map: textTex(text, Math.round(w * 80), Math.round(h * 80), bg, fg) }));
  m.position.set(x, y, z); m.rotation.y = ry; m.userData.sign = { text, bg, fg }; g.add(m); return m;
}
const mapLabels = [];


// Techo a cuatro aguas (cumbrera sobre el lado largo)
function hipIn(g, cx, y, cz, sx, sz, h, col){
  const L = Math.max(sx, sz), Wd = Math.min(sx, sz), r = (L - Wd) / 2, hl = L/2, hw = Wd/2, v = [];
  const P = p => v.push(...p), quad = (a, b, c, d) => { P(a); P(b); P(c); P(a); P(c); P(d); };
  quad([-hl,0,hw], [hl,0,hw], [r,h,0], [-r,h,0]);
  quad([hl,0,-hw], [-hl,0,-hw], [-r,h,0], [r,h,0]);
  P([hl,0,hw]); P([hl,0,-hw]); P([r,h,0]);
  P([-hl,0,-hw]); P([-hl,0,hw]); P([-r,h,0]);
  const geo = new THREE.BufferGeometry(); geo.setAttribute('position', new THREE.Float32BufferAttribute(v, 3)); geo.computeVertexNormals();
  const m = new THREE.Mesh(geo, lam({ color: col, side: THREE.DoubleSide }));
  m.position.set(cx, y, cz); if (sz > sx) m.rotation.y = Math.PI/2; m.castShadow = m.receiveShadow = true; g.add(m); return m;
}
// Agranda (d > 0) o achica (d < 0) un polígono convexo [x, z]
function offsetPoly(poly, d){
  let area = 0; for (let i = 0; i < poly.length; i++){ const [x0, z0] = poly[i], [x1, z1] = poly[(i + 1) % poly.length]; area += x0 * z1 - x1 * z0; }
  const s = area > 0 ? 1 : -1, n = poly.length;
  const nrm = (a, b) => { const dx = b[0] - a[0], dz = b[1] - a[1], l = Math.hypot(dx, dz); return [s * dz / l, -s * dx / l]; };
  return poly.map((p, i) => {
    const n1 = nrm(poly[(i - 1 + n) % n], p), n2 = nrm(p, poly[(i + 1) % n]), k = d / (1 + n1[0] * n2[0] + n1[1] * n2[1]);
    return [p[0] + (n1[0] + n2[0]) * k, p[1] + (n1[1] + n2[1]) * k];
  });
}
// Tronco de pirámide entre dos polígonos (mansardas)
function frustumMesh(bot, top, y0, h, col){
  const v = [], n = bot.length, y1 = y0 + h;
  for (let i = 0; i < n; i++){
    const j = (i + 1) % n, a = [bot[i][0], y0, bot[i][1]], b = [bot[j][0], y0, bot[j][1]], c = [top[j][0], y1, top[j][1]], d = [top[i][0], y1, top[i][1]];
    v.push(...a, ...b, ...c, ...a, ...c, ...d);
  }
  for (const [i, j, k] of THREE.ShapeUtils.triangulateShape(top.map(p => new THREE.Vector2(p[0], p[1])), []))
    v.push(top[i][0], y1, top[i][1], top[j][0], y1, top[j][1], top[k][0], y1, top[k][1]);
  const geo = new THREE.BufferGeometry(); geo.setAttribute('position', new THREE.Float32BufferAttribute(v, 3)); geo.computeVertexNormals();
  const m = new THREE.Mesh(geo, lam({ color: col, side: THREE.DoubleSide })); m.castShadow = m.receiveShadow = true; return m;
}

const PUMPS = [];

const osmPts = p => { const r = []; for (let i = 0; i < p.length; i += 2) r.push([p[i], p[i + 1]]); if (r.length > 2 && r[0][0] === r[r.length - 1][0] && r[0][1] === r[r.length - 1][1]) r.pop(); return r; };
const polyArea = pts => { let s = 0; for (let i = 0; i < pts.length; i++){ const a = pts[i], b = pts[(i + 1) % pts.length]; s += a[0] * b[1] - b[0] * a[1]; } return s / 2; };
const polyCenter = pts => { let x = 0, z = 0; for (const p of pts){ x += p[0]; z += p[1]; } return [x / pts.length, z / pts.length]; };
function fillPoly(pts, y, col){ for (const [i, j, k] of THREE.ShapeUtils.triangulateShape(pts.map(p => new THREE.Vector2(p[0], p[1])), [])) flat.tri(pts[i], pts[j], pts[k], y, col); }
function bboxOf(pts){ const a = [1e9, 1e9, -1e9, -1e9]; for (const [x, z] of pts){ a[0] = Math.min(a[0], x); a[1] = Math.min(a[1], z); a[2] = Math.max(a[2], x); a[3] = Math.max(a[3], z); } return a; }
// rectángulo orientado de área mínima (para galpones y cementerio)
function obb(pts){
  let best = null;
  for (let i = 0; i < pts.length; i++){
    const a = pts[i], b = pts[(i + 1) % pts.length], ang = Math.atan2(b[1] - a[1], b[0] - a[0]), c = Math.cos(ang), s = Math.sin(ang);
    let u0 = 1e9, u1 = -1e9, v0 = 1e9, v1 = -1e9;
    for (const [x, z] of pts){ const u = x * c + z * s, v = -x * s + z * c; u0 = Math.min(u0, u); u1 = Math.max(u1, u); v0 = Math.min(v0, v); v1 = Math.max(v1, v); }
    const area = (u1 - u0) * (v1 - v0);
    if (!best || area < best.area){ const um = (u0 + u1) / 2, vm = (v0 + v1) / 2; best = { area, cx: um * c - vm * s, cz: um * s + vm * c, len: u1 - u0, wid: v1 - v0, ang }; }
  }
  return best;   // largo sobre el ángulo "ang" (medido en el plano x,z)
}
function extrudePoly(pts, y0, h, col){
  const sh = new THREE.Shape(pts.map(([x, z]) => new THREE.Vector2(x, -z)));
  const m = new THREE.Mesh(new THREE.ExtrudeGeometry(sh, { depth: h, bevelEnabled: false }).rotateX(-Math.PI/2), lam({ color: col }));
  m.position.y = y0; m.castShadow = m.receiveShadow = true; scene.add(m); return m;
}
const OSM_PARKS = [];

const inOsmPark = (x, z) => OSM_PARKS.some(p => inPoly(x, z, p));

/* =========================================================
   Datos reales (PEYRANO_DATOS_Y_RECURSOS_CLAUDE.md)
   Puente GPS (lat, lon) <-> grilla (a, b) <-> mundo (x, z), calibrado sobre intersecciones de OSM
   ========================================================= */
const LAT0 = -33.5315236, LON0 = -60.8021159;
const DLAT_DA = -0.000019558, DLAT_DB = -0.000020939;
const DLON_DA =  0.000025655, DLON_DB = -0.000022607;
const DET = DLAT_DA * DLON_DB - DLAT_DB * DLON_DA;
function latLonToAB(lat, lon){ const dlat = lat - LAT0, dlon = lon - LON0; return [(dlat * DLON_DB - dlon * DLAT_DB) / DET, (dlon * DLAT_DA - dlat * DLON_DA) / DET]; }
function latLonToXZ(lat, lon){ return W(...latLonToAB(lat, lon)); }
function abToLatLon(a, b){ return [LAT0 + a * DLAT_DA + b * DLAT_DB, LON0 + a * DLON_DA + b * DLON_DB]; }

/* ---------- Nomenclador real de calles (OSM) ---------- */
const NAMES_A = ['Av. 25 de Mayo', 'Buenos Aires', 'Bv. Independencia', 'Santa Fe', 'Córdoba', 'Av. Centenario', 'Entre Ríos', 'Mendoza', 'Bv. Constitución', 'San Juan', 'Av. 9 de Julio'];
const NAMES_B = ['Iriondo', 'Bolívar', 'Monguillot', 'Bv. Lavalle', 'San Luis', 'Jujuy', 'Dr. Brunet', 'La Rioja', 'Catamarca', 'Tucumán', 'Santiago del Estero', 'Bv. Gálvez', 'Corrientes', 'Av. 3 de Febrero'];
const nameA = (i, reg) => (i === 2 && reg === 'SO') ? 'Independencia' : NAMES_A[i];
const nameB = (j, reg) => j === 9 ? (reg === 'SO' ? 'Tucumán' : 'Maipú') : NAMES_B[j];
// Calle y altura donde está parado el jugador (numeración catastral real)
function streetAt(x, z){
  if (Math.hypot(x - 8000, z - 8000) < 45) return 'Comuna de Peyrano (Interior)';
  const [a, b] = AB(x, z);
  if (distToPolyline(x, z, R18_PTS) < 12) return 'Ruta Provincial 18';
  if (distToPolyline(x, z, RP10S_E) < 8 && x > 418) return 'Ruta Provincial 10-S';
  if (distToPolyline(x, z, ACC_PTS) < 12 || distToPolyline(x, z, ACC_RAMP_S) < 12 || distToPolyline(x, z, ACC_RAMP_N) < 12) {
    return `Acceso a Peyrano (km ${Math.max(0, -b * S / 1000).toFixed(1)})`;
  }
  if (distToPolyline(x, z, BV_FC_NE) < 8 || distToPolyline(x, z, BV_FC_SO) < 8 || distToPolyline(x, z, PASO_OESTE) < 8) return 'Bulevar Ferrocarril';
  if (distToPolyline(x, z, CHACABUCO_PTS) < 8) return 'Chacabuco';
  if (distToPolyline(x, z, CATAMARCA_CONN) < 8) return 'Catamarca';
  const rd = Math.abs(railDist(a, b)) * S;
  if (inRailZone(x, z)) return rd < 6 ? 'Vías del FC Mitre' : 'Predio Ferroviario';
  const reg = region(a, b, 0) || region(Math.max(0, Math.min(AMAX, a)), Math.max(0, Math.min(BMAX, b)), 0);
  if (!reg) return rd < 6 ? 'Vías del FC Mitre' : 'Zona rural';
  const i = Math.max(0, Math.min(NA, Math.round(a / G))), j = Math.max(0, Math.min(NB, Math.round(b / G)));
  const da = Math.abs(a - i * G), db = Math.abs(b - j * G);
  if (da <= db && !(reg === 'NE' && i === 5 && b > 312.5)){
    let n = Math.round(reg === 'NE' ? 1300 - b / G * 100 : 400 - (b - 390) / G * 100);
    n = Math.max(1, n); if ((n % 2 === 0) !== (a > i * G)) n += 1;   // pares del lado SE
    return `${nameA(i, reg)} ${n}`;
  }
  let n = Math.max(1, Math.round(a / G * 100)); if ((n % 2 === 0) !== (b > j * G)) n += 1;
  return `${nameB(j, reg)} ${n}`;
}
// Nombres de calles para el mapa grande
const mapStreetNames = [];
for (let i = 0; i <= NA; i++){ const b = region(i * G, 176, 12) ? 176 : 98; mapStreetNames.push([...W(i * G, b), 0, nameA(i, 'NE')]); }
for (let j = 0; j <= NB; j++){ const reg = j <= 8 ? 'NE' : 'SO', a = reg === 'NE' ? 292 : 58; if (region(a, j * G, 12)) mapStreetNames.push([...W(a, j * G), 1, nameB(j, reg)]); }
mapStreetNames.push([-235, 29, [30, 10], 'Bv. Ferrocarril'], [-285, 165, [30, 10], 'Bv. Ferrocarril'], [193, 285, [30, 10], 'Chacabuco'], [0, -850, [0, 20], 'Acceso a Peyrano']);

function civic(lat, lon, o){
  const [x, z] = latLonToXZ(lat, lon), [a, b] = AB(x, z);
  const ia = Math.round(a / G), jb = Math.round(b / G), da = Math.abs(a - ia * G), db = Math.abs(b - jb * G);
  let gx, gz, ry;
  if (da < db){ const lx = (ia * G - CA) * S, s = x > lx ? 1 : -1; gx = lx + s * (shA(ia * G) + .5); gz = z; ry = s > 0 ? -Math.PI/2 : Math.PI/2; }
  else { const lz = (jb * G - CB) * S, s = z > lz ? 1 : -1; gx = x; gz = lz + s * (shB(jb * G) + .5); ry = s > 0 ? Math.PI : 0; }
  const { w = 10, d = 14, h = 4.2, wall = '#efe9dc', trim = '#f8f5ee' } = o;
  const g = group(gx, gz, ry);
  bx(g, 0, 0, -d/2, w, h, d, wall);
  bx(g, 0, h, -d/2, w + .2, .6, d + .2, trim);
  bx(g, 0, 0, .02, w + .1, .45, .12, '#bfb7a8');
  bx(g, o.doorX || 0, 0, .05, 1.4, 2.4, .1, o.door || '#5b4636');
  for (const wx of (o.windows || [-w/2 + 1.8, w/2 - 1.8])) bx(g, wx, 1, .05, 1.6, 1.6, .1, '#2f3c46');
  if (o.sign) signIn(g, o.sign, 0, h - .55, .1, Math.min(w - .6, o.signW || w - .6), .65, o.signBg || '#ffffff', o.signFg || '#222222');
  if (o.extra) o.extra(g, w, d, h);
  colLocal(g, -w/2, -d, w/2, 0, o.map || wall);
  if (o.label) mapLabels.push([x, z, o.label]);
  return g;
}
const greenCross = (g, x, y) => { bx(g, x, y, .5, .25, .9, .25, '#21b24b'); bx(g, x, y + .32, .5, .9, .25, .25, '#21b24b'); poleIn(g, [x, y + .45, .1], [x, y + .45, .38], .04, '#888'); };

// Banco Macro: esquina Córdoba y Jujuy (según Street View). Vestíbulo vidriado del cajero en la esquina,

const GROUP_W = group, TREE_W = addTree, BUSH_W = addBush, FLAT_W = flat;

function railFrame(a){ const p = W(a, railB(a)), q = W(a + 1, railB(a + 1)); let tx = q[0]-p[0], tz = q[1]-p[1]; const l = Math.hypot(tx,tz); return { p, tx: tx/l, tz: tz/l, ang: Math.atan2(tx/l, tz/l) }; }
// Zona del predio ferroviario: ahí no van casas
function inYard(x, z){ const [a, b] = AB(x, z); return inPoly(x, z, RAIL_YARD_POLY) || (a > 70 && a < 166 && Math.abs(railDist(a, b)) * S < 35); }
const railAngAt = a => railFrame(a).ang;

const ruralExcl = [];

function addTree(x, z, s, check, cols, tcol){
  if (check){
    if (!regionRect(x - 1, z - 1, x + 1, z + 1, 13)) return;
    if (overlap(x - 1.6, z - 1.6, x + 1.6, z + 1.6) || inPlaza(x - 1, z - 1, x + 1, z + 1) || (inYard(x, z) && rnd() < .85)) return;
  }
  const th = 2.4 * s;
  trunks.add(x, 0, z, .45 * s, th, .45 * s, 0, tcol || '#5b4330');
  const cr = 2.4 * s * R(.85, 1.15);
  crowns.add(x, th + cr * .7, z, cr, cr * R(.85, 1.1), cr, R(0, 6), pick(cols || CROWN_COLS));
  if (rnd() < .5) crowns.add(x + R(-1, 1)*s, th + cr * 1.2, z + R(-1, 1)*s, cr * .7, cr * .7, cr * .7, R(0, 6), pick(cols || CROWN_COLS));
  addCol(x - .3*s, z - .3*s, x + .3*s, z + .3*s);
}

function makeCar(color){
  const g = new THREE.Group(), M = c => lam({ color: c });
  const b = (w, h, d, m, x, y, z) => { const me = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), m); me.position.set(x, y, z); me.castShadow = true; g.add(me); return me; };
  const body = M(color), dark = M(0x2a2a2a);
  b(1.8, .55, 4.3, body, 0, .64, 0);
  b(1.62, .5, 2.1, M(0x22303a), 0, 1.15, -.25);
  b(1.68, .08, 2.0, body, 0, 1.43, -.25);
  b(1.82, .14, .3, dark, 0, .45, 2.15); b(1.82, .14, .3, dark, 0, .45, -2.15);
  for (const sx of [-.6, .6]){ b(.38, .15, .05, M(0xfff6d0), sx, .75, 2.16); b(.38, .13, .05, M(0xc0201a), sx, .75, -2.16); }
  const wheels = [], fronts = [];
  for (const [x, z, front] of [[.86, 1.35, 1], [-.86, 1.35, 1], [.86, -1.35, 0], [-.86, -1.35, 0]]){
    const steer = new THREE.Group(); steer.position.set(x, .36, z); g.add(steer);
    const spin = new THREE.Group(); steer.add(spin);
    const w = new THREE.Mesh(new THREE.CylinderGeometry(.36, .36, .26, 16).rotateZ(Math.PI/2), dark); w.castShadow = true; spin.add(w);
    const hub = new THREE.Mesh(new THREE.BoxGeometry(.28, .12, .12), M(0xbbbbbb)); spin.add(hub);
    wheels.push(spin); if (front) fronts.push(steer);
  }
  // llamas del turbo
  const flames = [];
  for (const sx of [-.5, .5]){
    const fl = new THREE.Mesh(new THREE.ConeGeometry(.17, .9, 10).translate(0, .45, 0).rotateX(-Math.PI/2), new THREE.MeshBasicMaterial({ color: 0x6fd0ff, transparent: true, opacity: .85 }));
    fl.position.set(sx, .38, -2.25); fl.visible = false; g.add(fl); flames.push(fl);
  }
  scene.add(g);
  return { g, wheels, fronts, flames };
}

export const ctx = {
  THREE,
  OSM,
  REAL_BUILDINGS,
  ACC_PTS,
  ACC_RAMP_S,
  ACC_RAMP_N,
  R18_PTS,
  RP20S_PTS,
  RP26S_PTS,
  CINCO_ESQ,
  COOP_POLY,
  CASA1070_POLY,
  LAV25_POLY,
  LAV25_E_POLY,
  ACOPIO_POLY,
  BRUNET_IND_POLY,
  ESC_BRUNET_POLY,
  CASA_IRI_POLY,
  CENT_O_BOL_POLY,
  CENT_BOL_POLY,
  SHELL_POLY,
  HOGAR_POLY,
  RP10S_E,
  IRIONDO_TIERRA,
  NUEVE_JULIO_N,
  CASITAS_COOP_POLY,
  PLAZA_INM,
  COOP_FP,
  AGUA_POLY,
  ESQ_AGUA_POLY,
  PLAZA_SE_SUR_POLY,
  QUINTA_POLY,
  TERM_POLY,
  GALP26_POLY,
  SANLUIS_E_POLY,
  ENTRERIOS_O_POLY,
  JUJUY_S_POLY,
  DIABLITO_S_POLY,
  AVC_O_POLY,
  SAGARDUY_POLY,
  BOMB_N_POLY,
  MUSEO_POLY,
  CORD_BOMB_POLY,
  MONG_S_POLY,
  MONG_POLY,
  ESCEN_N_POLY,
  ESCEN_E_POLY,
  LAV_ER_MONG_POLY,
  CORDOBA_E_POLY,
  BRUNET_S_POLY,
  ARIGA_POLY,
  BRUNET_N_POLY,
  MANZANA_BRUNET_POLY,
  JUJUY_N_POLY,
  JUJUY_SO_POLY,
  COMISARIA_POLY,
  CORREO_N_POLY,
  MALV_POLY,
  CENT_EAST_POLY,
  AMFAC_INT_POLY,
  ESC186_POLY,
  CAR_OPEN,
  rnd,
  R,
  pick,
  S,
  CA,
  CB,
  G,
  NA,
  NB,
  AMAX,
  BMAX,
  toAB,
  W,
  AB,
  segDist,
  distToPolyline,
  inPoly,
  RAIL,
  railBlin,
  RT0,
  railB,
  railDist,
  BV_FC_NE,
  PASO_OESTE,
  BV_FC_SO,
  RAIL_YARD_POLY,
  CHACABUCO_PTS,
  CATAMARCA_CONN,
  chacabucoB,
  inRailZone,
  region,
  regionRect,
  canvas,
  renderer,
  scene,
  SKY,
  camera,
  sun,
  hemi,
  setSunDir,
  SUN_OFF,
  SUN_L,
  SUN_U,
  SUN_V,
  _sunC,
  updateSun,
  Flat,
  flat,
  ROAD_Y,
  RoadLayer,
  roadLayer,
  Inst,
  boxGeo,
  gableGeo,
  lam,
  walls,
  roofs,
  trims,
  darks,
  trunks,
  crowns,
  poles,
  sleepers,
  balls,
  palmTrunks,
  palmCrowns,
  bikeWheels,
  anims,
  addPalm,
  addBush,
  CROWN_COLS,
  FLOWERS,
  addFlowers,
  addGrassTuft,
  mesh,
  box,
  CELL,
  hk,
  addCol,
  addColOBB,
  carHash,
  addCarCol,
  walkHash,
  addFloor,
  addFloorOBB,
  overlap,
  mapRoads,
  mapRects,
  mapFields,
  ground,
  TX0,
  TZ0,
  FIELD_COLS,
  nearRuralRoad,
  nearRail,
  inTownBox,
  ROADM,
  ST,
  PLAZAS,
  CHURCH,
  isPlaza,
  AVE_A,
  AVE_B,
  shA,
  inner,
  treeSpots,
  AUTUMN,
  JACARANDA,
  GRAVEL,
  keepFns,
  keepRect,
  keepSeg,
  freeSpot,
  addPlazaTree,
  fillPlants,
  group,
  boxIn,
  bx,
  cylIn,
  UP,
  poleIn,
  addBench,
  faceTo,
  PSZ,
  plazaRects,
  inPlaza,
  plazaBase,
  MX,
  MZ,
  SCHOOL_GATE_Z,
  SPAWN,
  gGeo,
  gableIn,
  colLocal,
  textTex,
  signIn,
  mapLabels,
  hipIn,
  offsetPoly,
  frustumMesh,
  PUMPS,
  osmPts,
  polyArea,
  polyCenter,
  fillPoly,
  bboxOf,
  obb,
  extrudePoly,
  OSM_PARKS,
  inOsmPark,
  LAT0,
  LON0,
  DLAT_DA,
  DLAT_DB,
  DLON_DA,
  DLON_DB,
  DET,
  latLonToAB,
  latLonToXZ,
  abToLatLon,
  NAMES_A,
  NAMES_B,
  nameA,
  nameB,
  streetAt,
  mapStreetNames,
  civic,
  greenCross,
  GROUP_W,
  TREE_W,
  BUSH_W,
  FLAT_W,
  railFrame,
  inYard,
  railAngAt,
  ruralExcl,
  addTree,
  makeCar,
  TX1,
  TZ1,
  hash,
  RT1,
  rtab,
  _sunT,
  shB
};
