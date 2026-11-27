// Jugador, auto, físicas/bunnyhop, interior de la Comuna, opciones, minimapa, mapa grande, modo admin y loop principal
export function startGame(ctx) {
  const {
    AB, AGUA_POLY, CELL, COMISARIA_POLY, G, MX, MZ, PLAZA_INM, PUMPS, REAL_BUILDINGS, S, SPAWN, THREE, TX0, TX1, TZ0, TZ1, W, abToLatLon, addCol, anims, balls, bikeWheels, boxIn, bx, camera, canvas, carHash, crowns, cylIn, darks, flat, group, hash, hk, lam, makeCar, mapFields, mapLabels, mapRects, mapRoads, mapStreetNames, palmCrowns, palmTrunks, pointOnRoad, poleIn, poles, renderer, roadLayer, roofs, scene, segs, signIn, sleepers, streetAt, sun, trims, trunks, updateSun, walls
  } = ctx;


roadLayer.build();
scene.add(flat.build());
[walls, roofs, trims, darks, trunks, crowns, poles, balls, palmTrunks, palmCrowns, bikeWheels].forEach(m => m.build(true));
sleepers.build(false);

/* =========================================================
   Personaje
   ========================================================= */
function makePlayer(){
  const g = new THREE.Group();
  const M = c => lam({ color: c });
  const skin = M(0xe0b08a), shirt = M(0x2f6fb5), pants = M(0x2b2f3a), shoe = M(0x1f1f1f), hair = M(0x3a2616);
  const part = (w, h, d, m, x, y, z, parent = g) => { const me = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), m); me.position.set(x, y, z); me.castShadow = true; parent.add(me); return me; };
  part(.5, .62, .28, shirt, 0, 1.12, 0);
  part(.48, .12, .27, pants, 0, .82, 0);
  part(.3, .32, .3, skin, 0, 1.63, 0);
  part(.32, .1, .32, hair, 0, 1.82, -.01);
  part(.32, .2, .06, hair, 0, 1.7, -.16);
  part(.06, .05, .02, M(0x111111), -.07, 1.66, .155);
  part(.06, .05, .02, M(0x111111),  .07, 1.66, .155);
  const limb = (x, y) => { const p = new THREE.Group(); p.position.set(x, y, 0); g.add(p); return p; };
  const legL = limb(-.13, .8), legR = limb(.13, .8);
  for (const L of [legL, legR]){ part(.21, .7, .23, pants, 0, -.35, 0, L); part(.22, .1, .32, shoe, 0, -.75, .04, L); }
  const armL = limb(-.33, 1.4), armR = limb(.33, 1.4);
  for (const A of [armL, armR]){ part(.14, .55, .17, shirt, 0, -.27, 0, A); part(.13, .14, .14, skin, 0, -.62, 0, A); }
  scene.add(g);
  return { g, legL, legR, armL, armR };
}
const P = makePlayer();
const pos = new THREE.Vector3(SPAWN[0], 0, SPAWN[1]);
const vel = new THREE.Vector2();
let vy = 0, onGround = true, facing = SPAWN[2], phase = 0;
let landT = -9; const BHOP_MAX = 150 / 3.6;   // bunnyhop: momento del último aterrizaje y tope de 150 km/h
const bhopHud = document.createElement('div');
bhopHud.style.cssText = 'position:fixed;left:50%;bottom:70px;transform:translateX(-50%);font:bold 22px Arial,sans-serif;text-shadow:0 2px 4px #000;pointer-events:none;display:none;z-index:20';
document.body.appendChild(bhopHud);
let yaw = SPAWN[3], pitch = .32, dist = 8, lastMouse = -10;

/* =========================================================
   Auto
   ========================================================= */

const CAR = makeCar(0xc0392b);
// Faros delanteros del auto (se encienden automáticamente al atardecer y de noche)
const carHeadlight = new THREE.SpotLight(0xfff1cc, 0, 48, Math.PI / 4.2, 0.45, 1.4);
carHeadlight.position.set(0, 0.85, 2.15);
carHeadlight.target.position.set(0, 0.2, 16);
CAR.g.add(carHeadlight, carHeadlight.target);
const car = { x: MX - 24, z: MZ + 3.5, h: -Math.PI/2, vx: 0, vz: 0, speed: 0, slip: 0, steer: 0, fuel: .35, nitro: 1, turbo: false };
let driving = false;
const carCircles = () => [-1.4, 0, 1.4].map(o => ({ x: car.x + Math.sin(car.h) * o, z: car.z + Math.cos(car.h) * o }));
const nearCar = () => Math.hypot(pos.x - car.x, pos.z - car.z) < 6;
function toggleCar(){
  if (!driving){ if (nearCar()){ driving = true; P.g.visible = false; dist = Math.max(dist, 10); } }
  else if (Math.abs(car.speed) < 4){
    driving = false; P.g.visible = true; car.speed = car.vx = car.vz = 0; car.turbo = false;
    for (const f of CAR.flames) f.visible = false;
    pos.set(car.x + Math.cos(car.h) * 2.3, 0, car.z - Math.sin(car.h) * 2.3);
    vel.set(0, 0); facing = car.h; collide();
  }
}
// marcas de derrape en el piso
const SKID_N = 900;
const skid = new THREE.InstancedMesh(new THREE.PlaneGeometry(.24, 1).rotateX(-Math.PI/2), new THREE.MeshBasicMaterial({ color: 0x161616, transparent: true, opacity: .5, depthWrite: false }), SKID_N);
{ const d = new THREE.Object3D(); d.scale.set(0, 0, 0); d.updateMatrix(); for (let i = 0; i < SKID_N; i++) skid.setMatrixAt(i, d.matrix); }
skid.frustumCulled = false; scene.add(skid);
let skidI = 0; const skidD = new THREE.Object3D();
function addSkid(x, z, ang, len){
  skidD.position.set(x, .27, z); skidD.rotation.set(0, ang, 0); skidD.scale.set(1, 1, len); skidD.updateMatrix();
  skid.setMatrixAt(skidI, skidD.matrix); skidI = (skidI + 1) % SKID_N; skid.instanceMatrix.needsUpdate = true;
}
const nearPump = () => PUMPS.some(p => Math.hypot(car.x - p[0], car.z - p[1]) < 6.5);
function updateCar(dt){
  const thr = (keys.KeyW || keys.ArrowUp ? 1 : 0) - (keys.KeyS || keys.ArrowDown ? 1 : 0);
  const st = (keys.KeyA || keys.ArrowLeft ? 1 : 0) - (keys.KeyD || keys.ArrowRight ? 1 : 0);
  const hand = !!keys.Space;
  const fx = Math.sin(car.h), fz = Math.cos(car.h), lx = Math.cos(car.h), lz = -Math.sin(car.h);
  let vF = car.vx * fx + car.vz * fz, vL = car.vx * lx + car.vz * lz;
  const noFuel = car.fuel <= 0;
  // turbo (Shift): se gasta en ~4 s y se recarga solo
  const turbo = (keys.ShiftLeft || keys.ShiftRight) && thr > 0 && car.nitro > 0 && !noFuel;
  car.turbo = turbo;
  car.nitro = turbo ? Math.max(0, car.nitro - dt / 4) : Math.min(1, car.nitro + dt / 12);
  if (thr > 0) vF += (vF < 0 ? 16 : noFuel ? 1.5 : turbo ? 17 : 10) * dt;
  else if (thr < 0) vF -= (vF > 0 ? 18 : 7) * dt;
  else vF -= Math.sign(vF) * Math.min(Math.abs(vF), 2.5 * dt);
  if (hand) vF -= Math.sign(vF) * Math.min(Math.abs(vF), 6 * dt);
  const vmax = noFuel ? 5 : turbo ? 55 : 33;
  if (vF > vmax) vF += (vmax - vF) * Math.min(1, 1.5 * dt);
  vF = Math.min(55, Math.max(-9, vF - vF * .04 * dt));
  // dirección y derrape
  const maxSteer = .6 / (1 + Math.abs(vF) * .045);
  car.steer += (st * maxSteer - car.steer) * (1 - Math.exp(-9 * dt));
  let yaw = vF / 2.7 * Math.tan(car.steer);
  const drifting = hand && Math.abs(vF) > 7;
  if (drifting) yaw *= 1.8;
  const grip = drifting ? 1.1 : (Math.abs(yaw * vF) > 15 ? 3.5 : 11);
  const k = 1 - Math.exp(-grip * dt), dl = vL * k;
  vL -= dl; vF += Math.sign(vF || 1) * Math.abs(dl) * .7;
  car.vx = fx * vF + lx * vL; car.vz = fz * vF + lz * vL;
  car.h += yaw * dt;
  car.x += car.vx * dt; car.z += car.vz * dt;
  car.speed = vF; car.slip = vL;
  // nafta: tanque lleno ≈ 9 km, el turbo gasta más
  car.fuel = Math.max(0, car.fuel - Math.abs(vF) * dt / 9000 * (turbo ? 2.5 : 1));
  if (nearPump() && Math.abs(vF) < 1.5 && keys.KeyF) car.fuel = Math.min(1, car.fuel + dt * .2);
  // choques
  let hit = false;
  if (ADMIN.on && ADMIN.inf){ car.fuel = 1; car.nitro = 1; }
  if (!(ADMIN.on && ADMIN.noclip)) for (const p of carCircles()){ const ox = p.x, oz = p.z; const h1 = pushOut(p, .95), h2 = pushOut(p, .95, carHash); if (h1 || h2){ hit = true; car.x += p.x - ox; car.z += p.z - oz; } }   // edificios + cordones de veredas y canteros
  if (hit){ const f = Math.hypot(car.vx, car.vz) > 3 ? -.25 : .5; car.vx *= f; car.vz *= f; }
  // marcas de las ruedas traseras
  if ((Math.abs(vL) > 2.2 || drifting) && Math.abs(vF) > 3){
    const sp = Math.hypot(car.vx, car.vz), ang = Math.atan2(car.vx, car.vz);
    for (const s of [-.86, .86]) addSkid(car.x - fx * 1.35 + lx * s, car.z - fz * 1.35 + lz * s, ang, sp * dt + .15);
  }
  CAR.g.position.set(car.x, 0, car.z); CAR.g.rotation.y = car.h;
  for (const w of CAR.wheels) w.rotation.x += vF * dt / .36;
  for (const f of CAR.fronts) f.rotation.y = car.steer;
  for (const f of CAR.flames){ f.visible = turbo; if (turbo){ const s = .8 + Math.random() * .6; f.scale.set(1, 1, s); } }
  facing = car.h; pos.set(car.x, 0, car.z);
}
CAR.g.position.set(car.x, 0, car.z); CAR.g.rotation.y = car.h;

function collide(){
  pushOut(pos, .35);
  if (!driving) for (const c of carCircles()){
    const dx = pos.x - c.x, dz = pos.z - c.z, d = Math.hypot(dx, dz);
    if (d < 1.3 && d > 1e-6){ pos.x += dx / d * (1.3 - d); pos.z += dz / d * (1.3 - d); }
  }
}
let camDist = dist;
function insideCol(x, z){
  const l = hash.get(hk(Math.floor(x / CELL), Math.floor(z / CELL))); if (!l) return false;
  for (const b of l) if (b.x1 - b.x0 > 1.5 && b.z1 - b.z0 > 1.5 && x > b.x0 && x < b.x1 && z > b.z0 && z < b.z1) return true;
  return false;
}
function pushOut(pos, r, H = hash){
  let hit = false;
  for (let iter = 0; iter < 2; iter++){
    const ci = Math.floor(pos.x / CELL), cj = Math.floor(pos.z / CELL);
    for (let i = ci - 1; i <= ci + 1; i++) for (let j = cj - 1; j <= cj + 1; j++){
      const l = H.get(hk(i, j)); if (!l) continue;
      for (const b of l){
        const qx = Math.max(b.x0, Math.min(pos.x, b.x1)), qz = Math.max(b.z0, Math.min(pos.z, b.z1));
        const dx = pos.x - qx, dz = pos.z - qz, d2 = dx*dx + dz*dz;
        if (d2 >= r*r) continue;
        hit = true;
        if (d2 > 1e-8){ const d = Math.sqrt(d2); pos.x += dx / d * (r - d); pos.z += dz / d * (r - d); }
        else { // adentro de la caja: salir por el lado más cercano
          const o = [pos.x - b.x0, b.x1 - pos.x, pos.z - b.z0, b.z1 - pos.z], m = Math.min(...o), k = o.indexOf(m);
          if (k === 0) pos.x = b.x0 - r; else if (k === 1) pos.x = b.x1 + r; else if (k === 2) pos.z = b.z0 - r; else pos.z = b.z1 + r;
        }
      }
    }
  }
  return hit;
}

/* =========================================================
   Controles
   ========================================================= */
const keys = {};
// estado del juego: 'menu' (pantalla de inicio con cinemática) · 'play' · 'pause' (ESC: mismo cartel con REANUDAR y fondo borroso)
let GS = 'menu', pauseDirty = true, skipPause = false;
// OPCIONES (se guardan en el navegador)
const OPT_DEF = { sens: 1, invY: false, fov: 60, view: 1700, res: 1.5, shadows: 2048, mini: true, help: true, street: true };
const OPT = Object.assign({}, OPT_DEF, (() => { try { return JSON.parse(localStorage.getItem('peyrano-opciones') || '{}'); } catch (e) { return {}; } })());
function applyOpts(save = true){
  renderer.setPixelRatio(Math.min(devicePixelRatio, OPT.res)); renderer.setSize(innerWidth, innerHeight);
  scene.fog.far = OPT.view; scene.fog.near = Math.min(250, OPT.view * .15); camera.far = OPT.view + 500; camera.fov = OPT.fov; camera.updateProjectionMatrix();
  sun.castShadow = OPT.shadows > 0;
  if (OPT.shadows > 0 && sun.shadow.mapSize.x !== OPT.shadows){ sun.shadow.mapSize.set(OPT.shadows, OPT.shadows); if (sun.shadow.map){ sun.shadow.map.dispose(); sun.shadow.map = null; } }
  document.body.classList.toggle('nomini', !OPT.mini); document.body.classList.toggle('nohelp', !OPT.help); document.body.classList.toggle('nostreet', !OPT.street);
  if (save) try { localStorage.setItem('peyrano-opciones', JSON.stringify(OPT)); } catch (e) {}
  pauseDirty = true;
}
applyOpts(false);
document.addEventListener('pointerlockchange', () => {
  if (document.pointerLockElement !== canvas && GS === 'play'){ if (skipPause) skipPause = false; else openPause(); }
});
addEventListener('keydown', e => {
  if (GS !== 'play'){ if (e.code === 'Escape') menuEsc(); if (e.code === 'Space') e.preventDefault(); return; }
  if (e.code === 'Escape' && document.pointerLockElement !== canvas){ openPause(); return; }
  keys[e.code] = true; if (e.code === 'KeyM') toggleBig(); if (e.code === 'KeyE' && !e.repeat){ if (!toggleComuna()) toggleCar(); } if (e.code === 'Space') e.preventDefault(); });
addEventListener('keyup', e => { keys[e.code] = false; });
addEventListener('blur', () => { for (const k in keys) keys[k] = false; });
let dragging = false;
canvas.addEventListener('mousedown', () => { dragging = true; });
addEventListener('mouseup', () => { dragging = false; });
const lockMouse = () => { try { const p = canvas.requestPointerLock?.(); p?.catch?.(() => {}); } catch (e) {} };
canvas.addEventListener('click', () => { if (GS === 'play' && document.pointerLockElement !== canvas) lockMouse(); });
addEventListener('mousemove', e => {
  if (GS === 'play' && (document.pointerLockElement === canvas || dragging)){
    const k = .0025 * OPT.sens;
    yaw -= e.movementX * k; lastMouse = performance.now() / 1000;
    pitch = Math.min(1.35, Math.max(-.25, pitch + e.movementY * k * (OPT.invY ? -1 : 1)));
  }
});
addEventListener('wheel', e => { if (GS === 'play') dist = Math.min(30, Math.max(3, dist * (e.deltaY > 0 ? 1.1 : .9))); }, { passive: true });
addEventListener('resize', () => { camera.aspect = innerWidth / innerHeight; camera.updateProjectionMatrix(); renderer.setSize(innerWidth, innerHeight); pauseDirty = true; });

const lerpAngle = (a, b, t) => { let d = ((b - a + Math.PI) % (Math.PI*2) + Math.PI*2) % (Math.PI*2) - Math.PI; return a + d * t; };

function updateFoot(dt){
  const fx = -Math.sin(yaw), fz = -Math.cos(yaw), rx = Math.cos(yaw), rz = -Math.sin(yaw);
  const mz = (keys.KeyW || keys.ArrowUp ? 1 : 0) - (keys.KeyS || keys.ArrowDown ? 1 : 0);
  const mx = (keys.KeyD || keys.ArrowRight ? 1 : 0) - (keys.KeyA || keys.ArrowLeft ? 1 : 0);
  let dx = fx * mz + rx * mx, dz = fz * mz + rz * mx; const l = Math.hypot(dx, dz);
  const run = keys.ShiftLeft || keys.ShiftRight, fly = ADMIN.on && ADMIN.fly;
  const sp = ADMIN.on ? ADMIN.speed * (run ? 3 : 1) : (run ? 11 : 4.5);
  let tx = 0, tz = 0;
  if (l > 0){ dx /= l; dz /= l; tx = dx * sp; tz = dz * sp; facing = lerpAngle(facing, Math.atan2(dx, dz), 1 - Math.exp(-12 * dt)); }
  // BUNNYHOP: en el aire se conserva la velocidad (las teclas solo doblan la dirección); si saltás apenas tocás el piso
  // (o dejás apretado Espacio) no frena y cada salto suma un 10 %, hasta 150 km/h. Si no saltás enseguida, frena normal.
  const now = performance.now() / 1000, hs = Math.hypot(vel.x, vel.y);
  const air = !onGround && !fly, grace = onGround && !fly && now - landT < .15 && hs > sp;
  if (air && hs > .5){
    if (l > 0){
      const a = lerpAngle(Math.atan2(vel.x, vel.y), Math.atan2(dx, dz), 1 - Math.exp(-4 * dt));
      const ns = hs < sp ? hs + (sp - hs) * (1 - Math.exp(-2 * dt)) : hs;
      vel.x = Math.sin(a) * ns; vel.y = Math.cos(a) * ns;
    }
  } else if (!grace){
    const k = 1 - Math.exp(-(onGround || fly ? 10 : 2) * dt);
    vel.x += (tx - vel.x) * k; vel.y += (tz - vel.y) * k;
  }
  // a mucha velocidad se mueve en pasitos para no atravesar paredes
  const steps = Math.max(1, Math.ceil(Math.hypot(vel.x, vel.y) * dt / .3));
  for (let i = 0; i < steps; i++){ pos.x += vel.x * dt / steps; pos.z += vel.y * dt / steps; if (!(ADMIN.on && ADMIN.noclip)) collide(); }
  if (fly){   // ADMIN: volar (Espacio sube, C / Ctrl baja)
    vy = ((keys.Space ? 1 : 0) - (keys.KeyC || keys.ControlLeft ? 1 : 0)) * sp * .6;
    pos.y = Math.max(0, pos.y + vy * dt); onGround = pos.y <= 0;
  } else {
    if (keys.Space && onGround){
      vy = 6.5; onGround = false;
      const hv = Math.hypot(vel.x, vel.y);
      if (now - landT < .2 && hv > 3){   // salto encadenado: bunnyhop
        const ns = Math.min(BHOP_MAX, Math.max(hv, sp) * 1.1 + .3);
        const ux = l > 0 ? dx : vel.x / hv, uz = l > 0 ? dz : vel.y / hv;
        vel.x = ux * ns; vel.y = uz * ns;
      }
    }
    vy -= 20 * dt; pos.y += vy * dt;
    if (pos.y <= 0){ if (!onGround) landT = now; pos.y = 0; vy = 0; onGround = true; }
  }
  { const v = Math.hypot(vel.x, vel.y) * 3.6;   // velocímetro del bunnyhop
    if (v > 45 && !fly){ bhopHud.style.display = 'block'; bhopHud.textContent = `🐇 ${Math.round(v)} km/h`; bhopHud.style.color = `hsl(${Math.max(0, 120 - v * .8)}, 90%, 60%)`; }
    else bhopHud.style.display = 'none'; }

  // animación
  const speed = vel.length();
  phase += dt * speed * 2.1;
  const amp = Math.min(speed / 5, 1) * (run ? .9 : .6);
  const sw = onGround ? Math.sin(phase) * amp : .5;
  P.legL.rotation.x = sw; P.legR.rotation.x = onGround ? -sw : -.3;
  P.armL.rotation.x = onGround ? -sw * .8 : -2.4; P.armR.rotation.x = onGround ? sw * .8 : -2.4;
  P.g.position.set(pos.x, pos.y + (onGround ? Math.abs(Math.cos(phase)) * amp * .08 : 0), pos.z);
  P.g.rotation.y = facing;

}
const promptEl = document.getElementById('prompt');
const streetEl = document.getElementById('street'); let streetT = 0;
const carHud = document.getElementById('carhud'), spdEl = document.getElementById('spd'), fuelEl = document.getElementById('fuel'), nitroEl = document.getElementById('nitro');
function update(dt){
  if (driving){ updateCar(dt); bhopHud.style.display = 'none'; } else updateFoot(dt);
  promptEl.textContent = driving
    ? (nearPump() && Math.abs(car.speed) < 1.5 ? (car.fuel < .999 ? (keys.KeyF ? 'Cargando nafta...' : 'Mantené F para cargar nafta') : 'Tanque lleno')
       : car.fuel <= 0 ? '¡Sin nafta! Andá despacio hasta la Shell' : car.fuel < .12 ? 'Queda poca nafta: cargá en la Shell' : '')
    : (nearComunaOut() ? 'E: entrar a la Comuna de Peyrano' : nearComunaIn() ? 'E: salir de la Comuna (volver a la plaza)' : nearCar() ? 'E: subir al auto' : '');
  carHud.style.display = driving ? 'block' : 'none';
  if ((streetT -= dt) <= 0){ streetT = .25; streetEl.textContent = '📍 ' + streetAt(pos.x, pos.z); }
  if (driving){
    spdEl.textContent = Math.round(Math.abs(car.speed) * 3.6);
    fuelEl.style.width = (car.fuel * 100).toFixed(1) + '%'; fuelEl.style.background = car.fuel < .15 ? '#e0453a' : '#f2c21b';
    nitroEl.style.width = (car.nitro * 100).toFixed(1) + '%';
  }
  const fov = driving && car.turbo ? OPT.fov + 14 : OPT.fov;
  if (Math.abs(camera.fov - fov) > .05){ camera.fov += (fov - camera.fov) * (1 - Math.exp(-5 * dt)); camera.updateProjectionMatrix(); }
  promptEl.style.display = promptEl.textContent ? 'block' : 'none';
  // cámara
  if (driving && performance.now() / 1000 - lastMouse > 1.2 && car.speed > 1) yaw = lerpAngle(yaw, car.h + Math.PI, 1 - Math.exp(-2.5 * dt));
  const tgt = new THREE.Vector3(pos.x, pos.y + (driving ? 1.3 : 1.6), pos.z);
  const dir = new THREE.Vector3(Math.sin(yaw) * Math.cos(pitch), Math.sin(pitch), Math.cos(yaw) * Math.cos(pitch));
  let cd = isInsideComuna() ? Math.min(dist, 5.2) : dist;   // la cámara no se mete adentro de las paredes ni atraviesa el techo de la Comuna
  for (let d = 1.5; d <= cd; d += .5){
    const x = tgt.x + dir.x * d, y = tgt.y + dir.y * d, z = tgt.z + dir.z * d;
    if (!(ADMIN.on && ADMIN.noclip) && y < 7 && insideCol(x, z)){ cd = Math.max(1.2, d - .7); break; }
  }
  camDist += (cd - camDist) * (cd < camDist ? 1 : 1 - Math.exp(-4 * dt));
  camera.position.copy(tgt).addScaledVector(dir, camDist);
  if (camera.position.y < .4) camera.position.y = .4;
  if (isInsideComuna() && camera.position.y > 4.25) camera.position.y = 4.25;
  camera.lookAt(tgt);

  updateSun(pos.x, pos.z);
}

/* =========================================================
   Minimapa (con los colores de tu leyenda, girado como la foto)
   ========================================================= */
const OFF = 6400, OSC = 2;          // cubre ±1600 m, 2 m por px
const off = document.createElement('canvas'); off.width = off.height = OFF / OSC;
{
  const c = off.getContext('2d'), T = (x, z) => [(x + OFF/2) / OSC, (z + OFF/2) / OSC];
  c.fillStyle = '#5a7a3a'; c.fillRect(0, 0, off.width, off.height);
  for (const [x0, z0, x1, z1, col] of mapFields){ const [a, b] = T(x0, z0), [e, f] = T(x1, z1); c.fillStyle = col; c.fillRect(a, b, e - a, f - b); }
  { const [a, b] = T(TX0, TZ0), [e, f] = T(TX1, TZ1); c.fillStyle = '#4e6b33'; c.fillRect(a, b, e - a, f - b); }
  for (const [x0, z0, x1, z1, col] of mapRects){ const [a, b] = T(x0, z0), [e, f] = T(x1, z1); c.fillStyle = col || '#3a3f36'; c.fillRect(a, b, e - a, f - b); }
  c.lineCap = 'round'; c.lineJoin = 'round';
  const roads = mapRoads.filter(r => !r.top).sort((a, b) => (a.y || 0) - (b.y || 0)).concat(mapRoads.filter(r => r.top));
  for (const r of roads){
    c.strokeStyle = r.col; c.lineWidth = Math.max(2, r.w / OSC * 0.9);
    c.beginPath(); r.pts.forEach((p, i) => { const [a, b] = T(...p); i ? c.lineTo(a, b) : c.moveTo(a, b); }); c.stroke();
  }
}

/* =========================================================
   Interior de la Comuna de Peyrano (espacio interior interactivo con tecla E)
   ========================================================= */
const COMUNA_IX = 8000, COMUNA_IZ = 8000;
const COMUNA_DOOR_OUT = [32.0, -402.1];
const COMUNA_DOOR_IN  = [COMUNA_IX, COMUNA_IZ + 6.7];
function isInsideComuna(){ return Math.hypot(pos.x - COMUNA_IX, pos.z - COMUNA_IZ) < 40; }
function nearComunaOut(){ return !driving && Math.hypot(pos.x - COMUNA_DOOR_OUT[0], pos.z - COMUNA_DOOR_OUT[1]) < 3.6; }
function nearComunaIn(){ return !driving && Math.hypot(pos.x - COMUNA_DOOR_IN[0], pos.z - COMUNA_DOOR_IN[1]) < 2.8; }
function toggleComuna(){
  if (nearComunaOut()){
    if (ADMIN.on && ADMIN.fly){ ADMIN.fly = false; vy = 0; }
    pos.set(COMUNA_IX, 0, COMUNA_IZ + 5.4); vel.set(0, 0);
    facing = Math.PI; yaw = 0; pitch = .26; dist = 5.2; camDist = 5.2;
    streetT = 0;
    return true;
  }
  if (nearComunaIn()){
    pos.set(COMUNA_DOOR_OUT[0], 0, COMUNA_DOOR_OUT[1] + 1.5); vel.set(0, 0);
    facing = 0; yaw = Math.PI; pitch = .32; dist = 8; camDist = 8;
    streetT = 0;
    return true;
  }
  return false;
}
{
  const IX = COMUNA_IX, IZ = COMUNA_IZ, Wd = 24, Dp = 16, H = 4.6;
  const x0 = IX - Wd / 2, x1 = IX + Wd / 2, z0 = IZ - Dp / 2, z1 = IZ + Dp / 2;
  const g = group(IX, IZ);
  // Luz cálida propia del interior
  const ilight = new THREE.PointLight(0xfff6e5, 1.1, 35); ilight.position.set(IX, 4.1, IZ); scene.add(ilight);

  // Piso de granito pulido con cuadrícula de baldosas y guarda perimetral
  bx(g, 0, -.12, 0, Wd + .8, .12, Dp + .8, '#dcd6ca');
  for (let ix = -11; ix <= 11; ix += 2) for (let iz = -7; iz <= 7; iz += 2){
    bx(g, ix, 0, iz, 1.94, .02, 1.94, (Math.round(ix / 2 + iz / 2) % 2 === 0) ? '#eae5da' : '#e0dbd0');
  }
  // Alfombra azul de entrada junto a la puerta
  bx(g, 0, .025, 6.4, 2.8, .02, 1.8, '#1d4f8c');
  // Cielorraso blanco con plafones LED luminosos
  bx(g, 0, H, 0, Wd + .6, .2, Dp + .6, '#f6f6f4');
  const ledMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
  for (const lx of [-8, -2.5, 2.5, 8]) for (const lz of [-4.5, 0, 4.5]){
    const led = new THREE.Mesh(new THREE.BoxGeometry(2.4, .06, .9), ledMat);
    led.position.set(lx, H - .03, lz); g.add(led);
  }

  // Paredes perimetrales (crema institucional con franja verde lima Comuna #c8d94a y zócalo gris piedra)
  const WALL = '#f2efe6', LIME = '#c8d94a', BASE = '#9a9488', WOOD = '#6e492d', WOOD2 = '#8c5e3c';
  // Pared Norte (fondo, z = -Dp/2)
  bx(g, 0, 0, -Dp / 2, Wd, H, .35, WALL);
  bx(g, 0, 0, -Dp / 2 + .19, Wd, .25, .04, BASE);
  bx(g, 0, 1.05, -Dp / 2 + .19, Wd, .32, .04, LIME);
  // Pared Sur (frente con puerta vidriada de salida y ventanas, z = +Dp/2)
  bx(g, -6.8, 0, Dp / 2, 10.4, H, .35, WALL);
  bx(g,  6.8, 0, Dp / 2, 10.4, H, .35, WALL);
  bx(g, 0, 2.8, Dp / 2, 3.2, H - 2.8, .35, WALL);
  bx(g, 0, 0, Dp / 2 - .18, Wd, .25, .04, BASE);
  // Puerta doble vidriada de salida (z = +Dp/2)
  bx(g, 0, 0, Dp / 2 - .05, 2.5, 2.8, .16, '#eceef0');
  bx(g, -.6, .15, Dp / 2 - .08, 1.05, 2.45, .08, '#7fb2d8');
  bx(g,  .6, .15, Dp / 2 - .08, 1.05, 2.45, .08, '#7fb2d8');
  signIn(g, 'SALIDA · PLAZA COLÓN', 0, 3.25, Dp / 2 - .22, 2.8, .48, '#217a3c', '#ffffff', Math.PI);
  // Ventanales luminosos en la pared Sur y Oeste (con vista celeste claro y rejas interiores)
  for (const wx of [-8.2, -4.4, 4.4, 8.2]){
    bx(g, wx, 1.1, Dp / 2 - .18, 2.4, 1.9, .08, '#bfe0f5');
    for (let k = -2; k <= 2; k++) bx(g, wx + k * .45, 1.1, Dp / 2 - .22, .05, 1.9, .04, '#5a626a');
  }
  // Pared Oeste y Este
  bx(g, -Wd / 2, 0, 0, .35, H, Dp, WALL); bx(g, -Wd / 2 + .19, 0, 0, .04, .25, Dp, BASE); bx(g, -Wd / 2 + .19, 1.05, 0, .04, .32, Dp, LIME);
  bx(g,  Wd / 2, 0, 0, .35, H, Dp, WALL); bx(g,  Wd / 2 - .19, 0, 0, .04, .25, Dp, BASE); bx(g,  Wd / 2 - .19, 1.05, 0, .04, .32, Dp, LIME);
  for (const wz of [-4.5, 0, 4.5]){
    bx(g, -Wd / 2 + .18, 1.1, wz, .08, 1.9, 2.4, '#bfe0f5');
    for (let k = -2; k <= 2; k++) bx(g, -Wd / 2 + .22, 1.1, wz + k * .45, .04, 1.9, .05, '#5a626a');
  }
  // Colisiones de las 4 paredes exteriores del salón
  addCol(x0 - .4, z0 - .4, x1 + .4, z0 + .25);
  addCol(x0 - .4, z1 - .25, x1 + .4, z1 + .4);
  addCol(x0 - .4, z0 - .4, x0 + .25, z1 + .4);
  addCol(x1 - .25, z0 - .4, x1 + .4, z1 + .4);

  // Helper para armar NPCs (empleados comunales y vecinos)
  const addNpc = (nx, nz, ry, shirtCol, seated = false) => {
    const p = group(IX + nx, IZ + nz, ry);
    const yOff = seated ? -.28 : 0;
    bx(p, -.12, 0, 0, .18, seated ? .45 : .75, .2, '#2b2f3a');
    bx(p,  .12, 0, 0, .18, seated ? .45 : .75, .2, '#2b2f3a');
    bx(p, 0, .75 + yOff, 0, .48, .62, .26, shirtCol);
    bx(p, -.31, .82 + yOff, .08, .13, .5, .15, shirtCol);
    bx(p,  .31, .82 + yOff, .08, .13, .5, .15, shirtCol);
    bx(p, 0, 1.38 + yOff, 0, .28, .3, .28, '#e0b08a');
    bx(p, 0, 1.62 + yOff, -.01, .3, .1, .3, '#3a2616');
    bx(p, -.07, 1.5 + yOff, .145, .05, .05, .02, '#111111');
    bx(p,  .07, 1.5 + yOff, .145, .05, .05, .02, '#111111');
  };

  // ---- 1) MOSTRADOR CENTRAL DE ATENCIÓN AL VECINO / MESA DE ENTRADAS / CAJA ----
  bx(g, .5, 0, -1.2, 10.6, 1.1, .9, WOOD);                          // mostrador frontal largo
  bx(g, .5, 1.1, -1.2, 10.8, .08, 1.05, '#d8d2c5');                 // tapa de granito
  bx(g, .5, .15, -.73, 10.2, .75, .04, '#c8d94a');                  // frente decorativo verde lima
  bx(g, 5.4, 0, -3.8, .9, 1.1, 4.4, WOOD);                          // retorno lateral del mostrador
  bx(g, 5.4, 1.1, -3.8, 1.05, .08, 4.5, '#d8d2c5');
  // Mampara de vidrio de atención con ventanillas
  for (const mx of [-3.2, .5, 4.0]){
    bx(g, mx, 1.18, -.85, 2.6, .85, .04, '#a8cce0');
    bx(g, mx - 1.3, 1.18, -.85, .06, .9, .08, '#d0d5da');
    bx(g, mx + 1.3, 1.18, -.85, .06, .9, .08, '#d0d5da');
  }
  // Carteles colgantes sobre cada puesto de atención
  signIn(g, 'MESA DE ENTRADAS', -3.2, 2.75, -1.2, 2.9, .45, '#1f4e8c', '#ffffff');
  signIn(g, 'CAJA · IMPUESTOS COMUNALES', .5, 2.75, -1.2, 3.6, .45, '#1f4e8c', '#ffffff');
  signIn(g, 'PATENTES · LICENCIAS', 4.1, 2.75, -1.2, 2.9, .45, '#1f4e8c', '#ffffff');
  // Cartel principal institucional en la pared del fondo detrás del mostrador
  signIn(g, 'COMUNA DE PEYRANO · ATENCIÓN AL VECINO', .5, 3.55, -Dp / 2 + .24, 9.5, .78, '#2d3a2e', '#c8d94a');

  // Escritorios, computadoras, sillas y empleados detrás del mostrador
  for (const [wx, col] of [[-3.2, '#2f6fb5'], [.5, '#3b8a5a'], [3.9, '#7a4b94']]){
    bx(g, wx, 0, -3.2, 2.1, .76, 1.0, WOOD2);                       // escritorio
    bx(g, wx, .76, -3.0, .65, .45, .06, '#1e2226');                 // monitor PC
    bx(g, wx, .82, -2.96, .58, .35, .02, '#6fb6e8');                // pantalla encendida
    bx(g, wx, 0, -4.1, .55, .48, .55, '#2b2f36');                   // silla
    bx(g, wx, .48, -4.34, .55, .55, .08, '#2b2f36');
    addNpc(wx, -4.05, 0, col, true);
  }
  // Muebles archivadores contra la pared norte
  for (const ax of [-3.8, -2.2, -.6, 1.0, 2.6, 4.2]){
    bx(g, ax, 0, -7.2, 1.3, 2.1, .7, '#8d949c');
    for (const y of [.35, .85, 1.35, 1.75]) bx(g, ax, y, -6.83, 1.15, .36, .04, '#cfd5dc');
  }
  addCol(IX - 4.9, IZ - 1.75, IX + 5.95, IZ - .65);
  addCol(IX + 4.9, IZ - 6.1, IX + 5.95, IZ - 1.5);
  addCol(IX - 4.6, IZ - 7.6, IX + 5.0, IZ - 6.7);

  // ---- 2) SALA DE ESPERA (bancos tándem, dispenser de agua, plantas, cartelera) ----
  for (const [bx2, bz2] of [[-3.2, 2.4], [2.8, 2.4], [-3.2, 4.8], [2.8, 4.8]]){
    bx(g, bx2, .42, bz2, 3.2, .08, .55, '#2b5b9e');                 // asiento tándem
    bx(g, bx2, .5, bz2 + .24, 3.2, .48, .08, '#2b5b9e');            // respaldo
    for (const sx of [-1.3, 0, 1.3]) bx(g, bx2 + sx, 0, bz2, .1, .42, .45, '#4a4f55');
    addCol(IX + bx2 - 1.65, IZ + bz2 - .35, IX + bx2 + 1.65, IZ + bz2 + .35);
  }
  addNpc(-2.4, 2.3, Math.PI, '#c96a3b', true);                      // vecino esperando
  // Dispenser de agua frío/calor junto a la entrada
  bx(g, 5.2, 0, 6.9, .5, 1.05, .5, '#f0f2f5');
  cylIn(g, 5.2, 1.32, 6.9, .2, .52, '#4db8e8');
  addCol(IX + 4.85, IZ + 6.55, IX + 5.55, IZ + 7.25);
  // Plantas de interior en macetas en las esquinas del hall
  for (const [px, pz] of [[-4.8, 6.9], [4.2, 6.9], [-4.8, -.4]]){
    bx(g, px, 0, pz, .65, .6, .65, '#b5654a');
    bx(g, px, .6, pz, .55, .95, .55, '#3b7a38');
    bx(g, px, 1.3, pz, .8, .6, .8, '#4c8f42');
    addCol(IX + px - .4, IZ + pz - .4, IX + px + .4, IZ + pz + .4);
  }
  // Cartelera institucional de corcho sobre la pared sur (a la izquierda de la salida)
  bx(g, -4.4, 1.25, Dp / 2 - .22, 3.2, 1.6, .08, '#b5834c');
  signIn(g, 'CARTELERA COMUNAL · AVISOS Y ORDENANZAS', -4.4, 2.6, Dp / 2 - .27, 3.0, .28, '#2d3a2e', '#f2c21b', Math.PI);
  for (const [dx, dy, col] of [[-.95, 1.85, '#fff8dc'], [0, 1.9, '#e3f4ff'], [.95, 1.8, '#ffe8e0'], [-.5, 1.45, '#e8f8e8'], [.55, 1.45, '#fff3d6']]){
    bx(g, -4.4 + dx, dy, Dp / 2 - .27, .7, .45, .02, col);
  }

  // ---- 3) DESPACHO DE PRESIDENCIA COMUNAL (sector oeste, x = -12..-5.4) ----
  // Tabique divisorio con ventanal y puerta abierta
  bx(g, -5.4, 0, -4.8, .25, H, 6.4, WALL);
  bx(g, -5.4, 0,  4.4, .25, H, 7.2, WALL);
  bx(g, -5.4, 2.6, -.4, .25, H - 2.6, 2.4, WALL);
  bx(g, -5.4, 1.1, 3.5, .08, 1.6, 3.6, '#a8cce0');                  // vidrio interior del despacho
  signIn(g, 'PRESIDENCIA COMUNAL', -5.24, 2.85, -.4, 2.3, .42, '#1f4e8c', '#ffffff', Math.PI / 2);
  addCol(IX - 5.6, IZ - 8, IX - 5.2, IZ - 1.5);
  addCol(IX - 5.6, IZ + .8, IX - 5.2, IZ + 8);

  // Escritorio presidencial, sillón, banderas de ceremonia (Argentina y Santa Fe) y Presidente Comunal
  bx(g, -8.8, 0, -3.2, 3.2, .78, 1.5, '#54341d');
  bx(g, -8.8, .78, -3.2, 3.35, .07, 1.65, '#3b2312');
  bx(g, -8.8, .85, -3.1, .75, .48, .06, '#1e2226');
  bx(g, -8.8, .9, -3.06, .68, .38, .02, '#7fc2f0');
  bx(g, -8.8, 0, -4.6, .75, .52, .75, '#1f2328');                   // sillón ejecutivo
  bx(g, -8.8, .52, -4.92, .75, .85, .12, '#1f2328');
  addNpc(-8.8, -4.55, 0, '#1e3a5f', true);                          // Presidente Comunal
  // Sillas de visita frente al escritorio presidencial
  for (const sx of [-9.7, -7.9]){
    bx(g, sx, 0, -1.6, .6, .46, .6, '#2b5b9e');
    bx(g, sx, .46, -1.33, .6, .5, .08, '#2b5b9e');
  }
  addCol(IX - 10.5, IZ - 5.1, IX - 7.1, IZ - 1.2);
  // Banderas de ceremonia: Argentina (izquierda) y Provincia de Santa Fe (derecha)
  poleIn(g, [-10.9, 0, -6.6], [-10.9, 2.8, -6.6], .04, '#d4af37');
  bx(g, -10.9, 1.9, -6.35, .06, .75, .5, '#74acdf'); bx(g, -10.9, 1.65, -6.35, .06, .26, .5, '#ffffff');
  poleIn(g, [-6.7, 0, -6.6], [-6.7, 2.8, -6.6], .04, '#d4af37');
  bx(g, -6.7, 1.9, -6.48, .06, .75, .18, '#c82020'); bx(g, -6.7, 1.9, -6.32, .06, .75, .18, '#ffffff'); bx(g, -6.7, 1.9, -6.16, .06, .75, .18, '#74acdf');
  // Cuadro institucional en la pared norte del despacho y Mapa Mural de Peyrano en la pared oeste
  signIn(g, 'COMUNA DE PEYRANO · DPTO. CONSTITUCIÓN · SANTA FE', -8.8, 2.85, -Dp / 2 + .24, 5.4, .85, '#1d3958', '#f2c21b');
  {
    const mapTex = new THREE.CanvasTexture(off); mapTex.colorSpace = THREE.SRGBColorSpace;
    bx(g, -Wd / 2 + .2, 1.15, -2.5, .08, 2.5, 2.5, '#54341d');
    const mp = new THREE.Mesh(new THREE.PlaneGeometry(2.3, 2.3), new THREE.MeshBasicMaterial({ map: mapTex }));
    mp.position.set(-Wd / 2 + .26, 2.4, -2.5); mp.rotation.y = Math.PI / 2; g.add(mp);
    signIn(g, 'PLANO CATASTRAL DE PEYRANO', -Wd / 2 + .26, 3.82, -2.5, 2.4, .32, '#2d3a2e', '#ffffff', Math.PI / 2);
  }

  // ---- 4) SALA DE REUNIONES, CULTURA Y RINCÓN MATERO (sector este, x = +6.2..+12) ----
  // Mesa larga de reuniones de la Comisión Comunal
  bx(g, 8.8, 0, -.5, 2.2, .76, 5.4, WOOD2);
  bx(g, 8.8, .76, -.5, 2.35, .06, 5.55, WOOD);
  for (const sz of [-2.4, -.5, 1.4]) for (const sx of [7.3, 10.3]){
    bx(g, sx, 0, sz, .55, .45, .55, '#343a40');
  }
  addCol(IX + 7.1, IZ - 3.3, IX + 10.5, IZ + 2.3);
  // Termo y mate sobre la mesa de reuniones
  cylIn(g, 8.5, .98, -.4, .09, .34, '#c02820');
  cylIn(g, 8.75, .89, -.25, .06, .14, '#5a3a20');
  // Vitrina y mural del Festival Folklórico de Peyrano en la pared este
  signIn(g, 'FESTIVAL FOLKLÓRICO DE PEYRANO · CAPITAL CULTURAL', Wd / 2 - .24, 2.9, -.5, 5.2, .85, '#cfd8e0', '#1d3958', -Math.PI / 2);
  // Mesada / kitchenette con cafetera al fondo este (z = -6.8)
  bx(g, 9.2, 0, -6.9, 4.4, .9, 1.1, '#d8d4ca');
  bx(g, 9.2, .9, -6.9, 4.5, .06, 1.2, '#4a4e52');
  bx(g, 8.2, .96, -6.9, .45, .5, .4, '#1e2024');                    // cafetera
  addCol(IX + 6.9, IZ - 7.55, IX + 11.5, IZ - 6.25);

  // Indicador visual de puerta interactiva en el exterior de la Comuna
  const extG = group(COMUNA_DOOR_OUT[0], COMUNA_DOOR_OUT[1]);
  bx(extG, 0, .06, .35, 1.8, .03, 1.0, '#1d4f8c');                  // felpudo azul exterior
}
const MAPROT = Math.atan2(0.667, 0.745);   // giro de la foto
const mini = document.getElementById('mini'), mc = mini.getContext('2d');
function drawArrow(ctx, x, y, s){
  ctx.save(); ctx.translate(x, y); ctx.rotate(-facing + Math.PI);
  ctx.fillStyle = '#fff'; ctx.strokeStyle = '#000'; ctx.lineWidth = 1.5;
  ctx.beginPath(); ctx.moveTo(0, -s); ctx.lineTo(s * .7, s * .7); ctx.lineTo(0, s * .3); ctx.lineTo(-s * .7, s * .7); ctx.closePath(); ctx.fill(); ctx.stroke();
  ctx.restore();
}
function drawMini(){
  mc.save(); mc.clearRect(0, 0, 200, 200);
  mc.beginPath(); mc.arc(100, 100, 100, 0, Math.PI*2); mc.clip();
  mc.fillStyle = '#5a7a3a'; mc.fillRect(0, 0, 200, 200);
  mc.translate(100, 100); mc.rotate(MAPROT);
  const px = (pos.x + OFF/2) / OSC, pz = (pos.z + OFF/2) / OSC, Rm = 150;
  mc.drawImage(off, px - Rm, pz - Rm, 2 * Rm, 2 * Rm, -Rm, -Rm, 2 * Rm, 2 * Rm);
  if (!driving){   // el auto en el minimapa (si está lejos, queda en el borde)
    let cx = (car.x - pos.x) / OSC, cz = (car.z - pos.z) / OSC; const l = Math.hypot(cx, cz);
    if (l > 88){ cx *= 88 / l; cz *= 88 / l; }
    mc.fillStyle = '#e0302a'; mc.strokeStyle = '#fff'; mc.lineWidth = 2; mc.fillRect(cx - 5, cz - 5, 10, 10); mc.strokeRect(cx - 5, cz - 5, 10, 10);
  }
  drawArrow(mc, 0, 0, 9);
  mc.restore();
}
const bigwrap = document.getElementById('bigwrap'), big = document.getElementById('big'), bc = big.getContext('2d');
let bigOpen = false, bigZoom = 1, bigPanX = 0, bigPanY = 0, bigDrag = false, bigDragged = false, bigLX = 0, bigLY = 0;
function toggleBig(){ bigOpen = !bigOpen; bigwrap.style.display = bigOpen ? 'flex' : 'none'; }
big.style.cursor = 'grab';
big.addEventListener('wheel', e => {
  if (!bigOpen) return;
  e.preventDefault(); e.stopPropagation();
  const r = big.getBoundingClientRect(), mx = (e.clientX - r.left) * big.width / r.width - big.width / 2, my = (e.clientY - r.top) * big.height / r.height - big.height / 2;
  const f = e.deltaY < 0 ? 1.2 : 1 / 1.2, nz = Math.max(.75, Math.min(6, bigZoom * f)), rf = nz / bigZoom;
  bigPanX = mx - (mx - bigPanX) * rf; bigPanY = my - (my - bigPanY) * rf; bigZoom = nz;
}, { passive: false });
big.addEventListener('mousedown', e => { if (e.button !== 0) return; bigDrag = true; bigDragged = false; bigLX = e.clientX; bigLY = e.clientY; big.style.cursor = 'grabbing'; });
addEventListener('mousemove', e => {
  if (!bigDrag) return;
  const dx = e.clientX - bigLX, dy = e.clientY - bigLY;
  if (Math.hypot(dx, dy) > 3) bigDragged = true;
  const r = big.getBoundingClientRect(), sc = r.width ? big.width / r.width : 1;
  bigPanX += dx * sc; bigPanY += dy * sc; bigLX = e.clientX; bigLY = e.clientY;
});
addEventListener('mouseup', () => { if (bigDrag){ bigDrag = false; big.style.cursor = 'grab'; } });
big.addEventListener('dblclick', () => { bigZoom = 1; bigPanX = 0; bigPanY = 0; });
const BIG_MAIN_STREETS = new Set(['Av. Centenario', 'Bv. Lavalle', 'Bv. Independencia', 'Bv. Gálvez', 'Bv. Ferrocarril', 'Chacabuco', 'Acceso a Peyrano']);
const BIG_MAIN_PLACES = new Set(['Plaza Colón', 'Estación', 'Polideportivo', 'Club Rivadavia', 'Cementerio', 'Shell']);
function drawBig(){
  const s = Math.floor(Math.min(innerWidth, innerHeight) * .9);
  if (big.width !== s){ big.width = big.height = s; }
  const k = s / 1150 * bigZoom;
  bc.save(); bc.fillStyle = '#5a7a3a'; bc.fillRect(0, 0, s, s);
  bc.translate(s/2 + bigPanX, s/2 + bigPanY); bc.rotate(MAPROT); bc.scale(k, k);
  bc.drawImage(off, -OFF/2/OSC, -OFF/2/OSC);
  if (!driving){ bc.fillStyle = '#e0302a'; bc.fillRect(car.x / OSC - 6 / k, car.z / OSC - 6 / k, 12 / k, 12 / k); }
  drawArrow(bc, pos.x / OSC, pos.z / OSC, 10 / k);
  const M = bc.getTransform(); bigM = M;
  bc.restore();
  bc.font = 'bold 10px system-ui, sans-serif'; bc.textAlign = 'center'; bc.textBaseline = 'middle';
  // Nombres de calles: con zoom bajo solo avenidas principales; al acercar aparecen todas
  for (const [x, z, horiz, name] of mapStreetNames){
    if (bigZoom < 1.35 && !BIG_MAIN_STREETS.has(name)) continue;
    const [dx, dz] = Array.isArray(horiz) ? horiz : horiz ? [10, 0] : [0, 10];
    const p = M.transformPoint(new DOMPoint(x / OSC, z / OSC)), q = M.transformPoint(new DOMPoint((x + dx) / OSC, (z + dz) / OSC));
    if (p.x < -60 || p.x > s + 60 || p.y < -30 || p.y > s + 30) continue;
    let ang = Math.atan2(q.y - p.y, q.x - p.x); if (ang > Math.PI/2) ang -= Math.PI; if (ang < -Math.PI/2) ang += Math.PI;
    bc.save(); bc.translate(p.x, p.y); bc.rotate(ang);
    bc.lineWidth = 3; bc.strokeStyle = 'rgba(0,0,0,.75)'; bc.strokeText(name, 0, 0); bc.fillStyle = '#ffffff'; bc.fillText(name, 0, 0);
    bc.restore();
  }
  // Carteles de lugares: aparecen progresivamente al hacer zoom y sin solaparse
  const placed = [];
  for (const [x, z, t] of mapLabels){
    if (bigZoom < 1.35 && !BIG_MAIN_PLACES.has(t)) continue;
    const p = M.transformPoint(new DOMPoint(x / OSC, z / OSC));
    if (p.x < -60 || p.x > s + 60 || p.y < -20 || p.y > s + 20) continue;
    const w = bc.measureText(t).width + 10, h = 18;
    const bx0 = p.x - w/2, by0 = p.y - h/2, bx1 = p.x + w/2, by1 = p.y + h/2;
    if (bigZoom < 2.6 && placed.some(r => bx0 < r[2] + 3 && bx1 > r[0] - 3 && by0 < r[3] + 3 && by1 > r[1] - 3)) continue;
    placed.push([bx0, by0, bx1, by1]);
    bc.fillStyle = 'rgba(255,255,255,.9)'; bc.fillRect(bx0, by0, w, h);
    bc.fillStyle = '#222'; bc.fillText(t, p.x, p.y);
  }
  // Barra de ayuda del zoom
  const hint = `Rueda: zoom (${bigZoom.toFixed(1)}x) · Arrastrar: mover · Doble click: reiniciar`;
  bc.font = '600 11px system-ui, sans-serif';
  const hw = bc.measureText(hint).width + 18;
  bc.fillStyle = 'rgba(0,0,0,.62)'; bc.fillRect(s/2 - hw/2, 10, hw, 24);
  bc.fillStyle = '#fff'; bc.fillText(hint, s/2, 22);
}

/* =========================================================
   Loop
   ========================================================= */
/* =========================================================
   ===== MODO ADMIN (solo para pruebas) — para sacarlo: borrar este bloque
   y las líneas marcadas con "ADMIN" (updateFoot, updateCar y la cámara) =====
   Tecla º (a la izquierda del 1) o F2: abrir / cerrar el panel
   V: volar · N: noclip · Espacio / C: subir / bajar volando · Shift: x3
   ========================================================= */
const ADMIN = { on: false, fly: true, noclip: true, inf: true, speed: 25 };
let bigM = null;
{
  const el = document.createElement('div');
  el.style.cssText = 'position:fixed;right:12px;top:12px;width:250px;background:rgba(20,24,30,.92);color:#fff;font:13px system-ui,sans-serif;border:2px solid #f2c21b;border-radius:10px;padding:10px 12px;display:none;z-index:20;line-height:1.7';
  const places = () => [['Mástil (Plaza Colón)', MX, MZ + 12], ['Auto', car.x + 3, car.z + 3], ...mapLabels.map(([x, z, t]) => [t, x, z])];
  el.innerHTML = `<b style="color:#f2c21b">🛠 MODO ADMIN</b> <small style="opacity:.7">(º / F2)</small><br>
    <label><input type="checkbox" id="adFly"> Volar <small>[V]</small></label><br>
    <label><input type="checkbox" id="adClip"> Noclip (atravesar todo) <small>[N]</small></label><br>
    <label><input type="checkbox" id="adInf"> Nafta y turbo infinitos</label><br>
    Velocidad: <input type="range" id="adSpd" min="5" max="150" style="width:120px;vertical-align:middle"> <span id="adSpdV"></span><br>
    <hr style="border:0;border-top:1px solid rgba(255,255,255,.18);margin:6px 0">
    Hora: <input type="range" id="adTime" min="0" max="24" step="0.1" style="width:105px;vertical-align:middle"> <span id="adTimeV" style="font-size:11px"></span><br>
    <label><input type="checkbox" id="adPauseT"> Pausar tiempo</label>
    <span style="float:right">
      <button id="adDay" style="padding:1px 5px;font-size:11px">Día</button>
      <button id="adDusk" style="padding:1px 5px;font-size:11px">Tarde</button>
      <button id="adNight" style="padding:1px 5px;font-size:11px">Noche</button>
    </span><br>
    <select id="adTp" style="width:100%;margin:4px 0"></select>
    <button id="adGo" style="width:49%">Ir</button> <button id="adCar" style="width:49%">Traer auto</button>
    <div id="adPos" style="font:11px monospace;opacity:.85;margin-top:6px;white-space:pre"></div>
    <small style="opacity:.75">Volando: Espacio sube, C baja, Shift x3.<br>Con el mapa grande (M) abierto, hacé click para teletransportarte.</small>`;
  document.body.appendChild(el);
  const $ = id => el.querySelector('#' + id);
  const dn = ctx.dayNight;
  const syncTime = () => {
    if (!dn) return;
    $('adTime').value = dn.state.hour.toFixed(1);
    $('adTimeV').textContent = dn.formatHour();
    $('adPauseT').checked = dn.state.paused;
  };
  const sync = () => { $('adFly').checked = ADMIN.fly; $('adClip').checked = ADMIN.noclip; $('adInf').checked = ADMIN.inf; $('adSpd').value = ADMIN.speed; $('adSpdV').textContent = ADMIN.speed + ' m/s'; syncTime(); };
  const fillTp = () => { $('adTp').innerHTML = places().map((p, i) => `<option value="${i}">${p[0]}</option>`).join(''); };
  const teleport = (x, z) => {
    if (driving){ car.x = x; car.z = z; car.vx = car.vz = 0; }
    else { pos.set(x, ADMIN.fly ? Math.max(pos.y, 0) : 0, z); vel.set(0, 0); }
  };
  const toggle = () => {
    ADMIN.on = !ADMIN.on; el.style.display = ADMIN.on ? 'block' : 'none';
    if (ADMIN.on){ fillTp(); sync(); if (document.pointerLockElement) skipPause = true; document.exitPointerLock?.(); }   // soltar el mouse para el panel sin abrir la pausa
    else { pos.y = 0; vy = 0; }
  };
  $('adFly').onchange = e => { ADMIN.fly = e.target.checked; if (!ADMIN.fly) vy = 0; };
  $('adClip').onchange = e => { ADMIN.noclip = e.target.checked; };
  $('adInf').onchange = e => { ADMIN.inf = e.target.checked; };
  $('adSpd').oninput = e => { ADMIN.speed = +e.target.value; sync(); };
  $('adTime').oninput = e => { if (!dn) return; dn.applyHour(+e.target.value); updateSun(pos.x, pos.z); syncTime(); pauseDirty = true; };
  $('adPauseT').onchange = e => { if (!dn) return; dn.state.paused = e.target.checked; syncTime(); };
  const setPreset = h => { if (!dn) return; dn.applyHour(h); updateSun(pos.x, pos.z); syncTime(); pauseDirty = true; };
  $('adDay').onclick = () => setPreset(13.0);
  $('adDusk').onclick = () => setPreset(18.25);
  $('adNight').onclick = () => setPreset(22.5);
  $('adGo').onclick = () => { const p = places()[+$('adTp').value]; if (p) teleport(p[1], p[2]); };
  $('adCar').onclick = () => { if (!driving){ car.x = pos.x + 4; car.z = pos.z; car.vx = car.vz = 0; car.h = facing; CAR.g.position.set(car.x, 0, car.z); CAR.g.rotation.y = car.h; } };
  addEventListener('keydown', e => {
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'SELECT') return;
    if (e.code === 'Backquote' || e.code === 'F2'){ e.preventDefault(); toggle(); }
    if (!ADMIN.on) return;
    if (e.code === 'KeyV'){ ADMIN.fly = !ADMIN.fly; if (!ADMIN.fly) vy = 0; sync(); }
    if (e.code === 'KeyN'){ ADMIN.noclip = !ADMIN.noclip; sync(); }
  });
  // click en el mapa grande = teletransporte
  big.addEventListener('click', e => {
    if (bigDragged){ bigDragged = false; return; }
    if (!ADMIN.on || !bigM) return;
    const r = big.getBoundingClientRect(), px = (e.clientX - r.left) * big.width / r.width, py = (e.clientY - r.top) * big.height / r.height;
    const p = bigM.inverse().transformPoint(new DOMPoint(px, py));
    teleport(p.x * OSC, p.y * OSC); toggleBig();
  });
  // coordenadas y hora en vivo
  setInterval(() => {
    if (!ADMIN.on) return;
    const [a, b] = AB(pos.x, pos.z), [lat, lon] = abToLatLon(a, b);
    $('adPos').textContent = `x ${pos.x.toFixed(1)}  y ${pos.y.toFixed(1)}  z ${pos.z.toFixed(1)}\na ${a.toFixed(1)}  b ${b.toFixed(1)}\n${lat.toFixed(6)}, ${lon.toFixed(6)}`;
    if (dn && document.activeElement !== $('adTime')) syncTime();
  }, 200);
}
/* ===== fin MODO ADMIN ===== */

/* =========================================================
   OPTIMIZACIÓN: fusionar los objetos fijos
   Cada pieza armada a mano (bx, boxIn, poleIn, rejas, etc.) es un objeto suelto con su propio material:
   mirando todo el pueblo eran miles de pedidos de dibujo por cuadro. Acá se juntan en una sola malla
   por color y por zona de 120 m (se ven igual, pero se dibujan de a cientos y no de a miles).
   Quedan sueltos: el personaje, el auto, lo animado (se detecta solo corriendo las animaciones),
   los carteles con textura, lo transparente y las calles/pasto/instancias, que ya estaban agrupados.
   Poner MERGE_STATIC = false para volver al comportamiento anterior.
   ========================================================= */
const MERGE_STATIC = true;
let MERGE_INFO = null;   // resultado de la fusión (lo muestra el panel F3)
function mergeStaticMeshes(){
  const t0 = performance.now();
  scene.updateMatrixWorld(true);
  const skip = new Set();
  for (const root of [P.g, CAR.g]) root.traverse(o => skip.add(o));
  const cands = [];
  scene.traverse(o => {
    if (!o.isMesh || o.isInstancedMesh || o.isSkinnedMesh || skip.has(o) || o.children.length) return;
    const m = o.material;
    if (!m || Array.isArray(m) || !m.isMeshLambertMaterial || m.map || m.transparent || m.vertexColors || m.alphaTest > 0 || m.opacity < 1) return;
    const g = o.geometry;
    if (!g || !g.attributes.position || g.attributes.position.isInterleavedBufferAttribute || (g.morphAttributes && g.morphAttributes.position)) return;
    cands.push(o);
  });
  // detectar lo animado: correr las animaciones dos veces y ver qué se movió, cambió de forma o se prendió/apagó
  const effVis = o => { for (let p = o; p; p = p.parent) if (!p.visible) return false; return true; };
  const snap = () => cands.map(o => [o.matrixWorld.elements.slice(), effVis(o), o.geometry.attributes.position.version]);
  const base = snap(), moving = new Set();
  for (const t of [1.234, 2.871]){
    for (const a of anims) a(t, .4);
    scene.updateMatrixWorld(true);
    snap().forEach((s, i) => { const b = base[i]; if (s[1] !== b[1] || s[2] !== b[2] || s[0].some((v, k) => Math.abs(v - b[0][k]) > 1e-6)) moving.add(cands[i]); });
  }
  // agrupar por material (color, brillo, caras, sombras) y por zona
  const CH = 120, buckets = new Map(), v = new THREE.Vector3();
  for (const o of cands){
    if (moving.has(o) || !effVis(o) || o.matrixWorld.determinant() <= 0) continue;
    const m = o.material;
    v.setFromMatrixPosition(o.matrixWorld);
    const key = [m.color.getHex(), m.emissive.getHex(), m.emissiveIntensity, m.side, m.flatShading ? 1 : 0, m.depthWrite ? 1 : 0,
      m.polygonOffset ? m.polygonOffsetFactor + ',' + m.polygonOffsetUnits : 0, o.castShadow ? 1 : 0, o.receiveShadow ? 1 : 0,
      Math.floor(v.x / CH), Math.floor(v.z / CH)].join('|');
    let b = buckets.get(key); if (!b) buckets.set(key, b = { mat: m, cast: o.castShadow, recv: o.receiveShadow, list: [] });
    b.list.push(o);
  }
  let before = 0, after = 0;
  for (const b of buckets.values()){
    if (b.list.length < 2) continue;
    const geos = []; let n = 0;
    for (const o of b.list){
      const g = o.geometry.index ? o.geometry.toNonIndexed() : o.geometry.clone();
      if (!g.attributes.normal) g.computeVertexNormals();
      g.applyMatrix4(o.matrixWorld);
      geos.push(g); n += g.attributes.position.count;
    }
    const pos = new Float32Array(n * 3), nor = new Float32Array(n * 3); let off = 0;
    for (const g of geos){ pos.set(g.attributes.position.array, off); nor.set(g.attributes.normal.array, off); off += g.attributes.position.count * 3; g.dispose(); }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    geo.setAttribute('normal', new THREE.BufferAttribute(nor, 3));
    geo.computeBoundingBox(); geo.computeBoundingSphere();
    const mm = new THREE.Mesh(geo, b.mat);
    mm.castShadow = b.cast; mm.receiveShadow = b.recv; mm.matrixAutoUpdate = false;
    scene.add(mm);
    for (const o of b.list) o.parent.remove(o);
    before += b.list.length; after++;
  }
  MERGE_INFO = { before, after, moving: moving.size, ms: performance.now() - t0 };
  console.log(`[optimización] ${before} objetos fijos fusionados en ${after} mallas (${moving.size} animados quedaron sueltos) en ${(performance.now() - t0).toFixed(0)} ms`);
}
if (MERGE_STATIC) mergeStaticMeshes();

/* =========================================================
   PANEL F3 — información de rendimiento y del juego (estilo Minecraft)
   Izquierda: FPS, posición, calle, dirección, estado del jugador/auto.
   Derecha: GPU, resolución, llamadas de dibujo, triángulos, memoria, objetos, fusión, colisiones.
   Abajo: gráfico del tiempo de cada cuadro (línea verde = 60 fps, amarilla = 30 fps).
   ========================================================= */
const DBG = (() => {
  const el = document.createElement('div');
  el.style.cssText = 'position:fixed;inset:0;pointer-events:none;z-index:60;display:none;font:12px/1.4 Consolas,"Courier New",monospace;color:#fff;text-shadow:1px 1px 0 #000';
  el.innerHTML = '<div id="dbgL" style="position:absolute;left:6px;top:6px"></div><div id="dbgR" style="position:absolute;right:6px;top:6px;text-align:right"></div>' +
    '<canvas id="dbgG" width="320" height="90" style="position:absolute;left:6px;bottom:6px;background:rgba(0,0,0,.5)"></canvas>';
  document.body.appendChild(el);
  const L = el.querySelector('#dbgL'), Rr = el.querySelector('#dbgR'), gc = el.querySelector('#dbgG'), gx = gc.getContext('2d');
  const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;');
  const lines = arr => arr.map(l => l === '' ? '<div style="height:8px"></div>' : `<div><span style="background:rgba(20,20,20,.6);padding:0 4px">${esc(l)}</span></div>`).join('');
  // GPU
  let gpu = '?';
  try { const gl = renderer.getContext(), ext = gl.getExtension('WEBGL_debug_renderer_info'); gpu = ext ? gl.getParameter(ext.UNMASKED_RENDERER_WEBGL) : gl.getParameter(gl.RENDERER); } catch (e){}
  gpu = gpu.replace(/^ANGLE \(|\)$/g, '');
  // tiempos de cuadro
  const N = 320, ft = new Float32Array(N); let fi = 0, fn = 0, prev = 0, loadMs = null, on = false, lastTxt = 0, lastScene = -1e9, sc = null, col = null;
  const NORTE = [-.667, -.745], ESTE = [.745, -.667], RUMBOS = ['N', 'NE', 'E', 'SE', 'S', 'SO', 'O', 'NO'], dir = new THREE.Vector3();
  const countScene = () => {
    const s = { objs: 0, meshes: 0, merged: 0, inst: 0, instN: 0, lights: 0 };
    scene.traverse(o => { s.objs++; if (o.isInstancedMesh){ s.inst++; s.instN += o.count; } else if (o.isMesh){ s.meshes++; if (o.userData.merged) s.merged++; } else if (o.isLight) s.lights++; });
    return s;
  };
  const countCols = () => { const uniq = H => { const st = new Set(); for (const l of H.values()) for (const b of l) st.add(b); return st.size; }; return { col: uniq(hash), car: uniq(carHash) }; };
  const toggle = () => { on = !on; el.style.display = on ? 'block' : 'none'; if (on){ lastScene = -1e9; lastTxt = 0; } };
  addEventListener('keydown', e => { if (e.code === 'F3'){ e.preventDefault(); if (!e.repeat) toggle(); } });

  const text = now => {
    // FPS: último segundo, mín/máx y 1% bajo de los últimos cuadros
    const n = Math.min(fn, N); if (!n) return;
    let sum = 0, cnt = 0; for (let k = 1; k <= n && sum < 1000; k++){ sum += ft[(fi - k + N) % N]; cnt++; }
    const avg = sum / cnt, all = []; for (let k = 0; k < n; k++) all.push(ft[k]); all.sort((a, b) => a - b);
    const fps = 1000 / avg, worst = all[Math.min(all.length - 1, Math.floor(all.length * .99))], best = all[0];
    const info = renderer.info;
    if (now - lastScene > 1000){ sc = countScene(); if (!col) col = countCols(); lastScene = now; }
    const [a, b] = AB(pos.x, pos.z), [lat, lon] = abToLatLon(a, b);
    camera.getWorldDirection(dir);
    const ang = (Math.atan2(dir.x * ESTE[0] + dir.z * ESTE[1], dir.x * NORTE[0] + dir.z * NORTE[1]) * 180 / Math.PI + 360) % 360;
    const rumbo = RUMBOS[Math.round(ang / 45) % 8];
    const kmh = (driving ? Math.abs(car.speed) : Math.hypot(vel.x, vel.y)) * 3.6;
    const mem = performance.memory;
    const left = [
      `Peyrano 3D  (Three.js r${THREE.REVISION})`,
      `${fps.toFixed(0)} fps  (${avg.toFixed(1)} ms por cuadro)`,
      `mín ${(1000 / worst).toFixed(0)} · máx ${(1000 / best).toFixed(0)} · 1% más lento: ${worst.toFixed(1)} ms`,
      `Mundo cargado en ${(loadMs / 1000).toFixed(1)} s`,
      '',
      `XYZ: ${pos.x.toFixed(2)} / ${pos.y.toFixed(2)} / ${pos.z.toFixed(2)}`,
      `Grilla: a ${a.toFixed(1)}  b ${b.toFixed(1)}   Zona: ${Math.floor(pos.x / 120)}, ${Math.floor(pos.z / 120)}`,
      `GPS: ${lat.toFixed(6)}, ${lon.toFixed(6)}`,
      `Calle: ${streetAt(pos.x, pos.z)}`,
      `Mirando: ${rumbo} (${ang.toFixed(0)}°)  ·  cámara ${dist.toFixed(1)} m, ${(pitch * 180 / Math.PI).toFixed(0)}°`,
      '',
      `Modo: ${driving ? 'manejando' : 'a pie'}${ADMIN.on ? `  ·  ADMIN${ADMIN.fly ? ' volar' : ''}${ADMIN.noclip ? ' noclip' : ''}` : ''}`,
      `Velocidad: ${kmh.toFixed(0)} km/h`,
      `Auto: ${car.x.toFixed(1)} / ${car.z.toFixed(1)}  ·  nafta ${(car.fuel * 100).toFixed(0)}%  ·  turbo ${(car.nitro * 100).toFixed(0)}%${driving && Math.abs(car.slip) > 2 ? '  ·  derrapando' : ''}`,
    ];
    const right = [
      `GPU: ${gpu}`,
      `Pantalla: ${renderer.domElement.width}×${renderer.domElement.height}  (escala ${renderer.getPixelRatio()}, monitor ${devicePixelRatio})`,
      '',
      `Llamadas de dibujo: ${info.render.calls}`,
      `Triángulos: ${info.render.triangles.toLocaleString('es-AR')}`,
      `Geometrías: ${info.memory.geometries}  ·  Texturas: ${info.memory.textures}  ·  Shaders: ${info.programs ? info.programs.length : '?'}`,
      mem ? `Memoria JS: ${(mem.usedJSHeapSize / 1048576).toFixed(0)} / ${(mem.totalJSHeapSize / 1048576).toFixed(0)} MB  (límite ${(mem.jsHeapSizeLimit / 1048576).toFixed(0)} MB)` : 'Memoria JS: (solo en Chrome/Edge)',
      '',
      `Objetos en escena: ${sc.objs.toLocaleString('es-AR')}  ·  luces ${sc.lights}`,
      `Mallas: ${sc.meshes.toLocaleString('es-AR')}  (${sc.merged} fusionadas)`,
      `Instanciadas: ${sc.inst} grupos · ${sc.instN.toLocaleString('es-AR')} copias`,
      MERGE_INFO ? `Fusión: ${MERGE_INFO.before.toLocaleString('es-AR')} piezas → ${MERGE_INFO.after} mallas  (${MERGE_INFO.moving} animadas sueltas, ${MERGE_INFO.ms.toFixed(0)} ms)` : 'Fusión: desactivada',
      `Colisiones: ${col.col.toLocaleString('es-AR')} cajas  ·  veredas/canteros (auto): ${col.car.toLocaleString('es-AR')}`,
      '',
      `Edificios reales (Overture): ${REAL_BUILDINGS.length.toLocaleString('es-AR')}`,
      `Casas: ${walls.list.length.toLocaleString('es-AR')}  ·  Árboles: ${trunks.list.length.toLocaleString('es-AR')}  ·  Palmeras: ${palmTrunks.list.length}`,
      `Tramos de calle: ${segs.length}  ·  Lugares en el mapa: ${mapLabels.length}  ·  Animaciones: ${anims.length}`,
      '',
      `Sombras: ${sun.shadow.mapSize.x}×${sun.shadow.mapSize.y}  ·  Niebla: ${scene.fog.near}–${scene.fog.far} m  ·  Vista: ${camera.far} m`,
      'F3: cerrar',
    ];
    L.innerHTML = lines(left); Rr.innerHTML = lines(right);
  };

  const graph = () => {
    const W = gc.width, H = gc.height, sy = H / 50;   // escala: 50 ms = alto completo
    gx.clearRect(0, 0, W, H);
    const n = Math.min(fn, N);
    for (let k = 0; k < n; k++){
      const ms = ft[(fi - n + k + N) % N], h = Math.min(H, ms * sy);
      gx.fillStyle = ms <= 17.5 ? '#3fd16a' : ms <= 34 ? '#f2c21b' : '#e0453a';
      gx.fillRect(W - n + k, H - h, 1, h);
    }
    gx.fillStyle = 'rgba(255,255,255,.75)'; gx.fillRect(0, H - 16.7 * sy, W, 1); gx.fillRect(0, H - 33.3 * sy, W, 1);
    gx.font = '10px Consolas, monospace'; gx.fillText('60 fps', 3, H - 16.7 * sy - 2); gx.fillText('30 fps', 3, H - 33.3 * sy - 2);
  };

  return {
    frame(){   // llamar una vez por cuadro, después de renderer.render
      const now = performance.now();
      if (loadMs === null) loadMs = now;
      if (prev){ ft[fi] = now - prev; fi = (fi + 1) % N; fn++; }
      prev = now;
      if (!on) return;
      graph();
      if (now - lastTxt > 250){ lastTxt = now; text(now); }
    }
  };
})();

/* =========================================================
   MENÚ: pantalla de inicio con cinemática de fondo (JUGAR / OPCIONES / SALIR)
   y pausa con ESC (REANUDAR, fondo borroso de donde quedaste)
   ========================================================= */
const menuEl = document.getElementById('menu'), mainCard = document.getElementById('mainCard'), optsEl = document.getElementById('opts');
const capEl = document.getElementById('cineCap'), fadeEl = document.getElementById('fade'), byeEl = document.getElementById('bye');
const mPlay = document.getElementById('mPlay');
// Recorrido de la cinemática. Para cada lugar la cámara elige sola el ángulo: prueba 36 direcciones y 2 alturas y se queda con la
// que no tiene árboles ni edificios entre la cámara y el lugar en todo el recorrido, y que tampoco atraviesa nada.
const CINE = (() => {
  const lab = n => { const l = mapLabels.find(m => m[2] === n); return l ? [l[0], l[1]] : null; };
  const cen = P => [P.reduce((s, p) => s + p[0], 0) / P.length, P.reduce((s, p) => s + p[1], 0) / P.length];
  const defs = [
    { p: lab('Polideportivo'), txt: 'Polideportivo Gral. San Martín', r: 60, h: 24, ty: 3, tR: 30 },
    { p: [MX, MZ - 25], txt: 'Plazas de la Avenida Centenario', r: 70, h: 30, ty: 2, tR: 45, noTrees: true },
    { acc: true, txt: 'Cartel de acceso a Peyrano' },
    { p: [-500, -32.5], txt: 'Semillero "Don Enrique"', r: 40, h: 13, ty: 4, tR: 9, pref: Math.PI / 2 + .15 },
    { p: cen(PLAZA_INM), txt: 'Plazoleta del Inmigrante', r: 30, h: 14, ty: 1, tR: 18, noTrees: true },
    { p: lab('Terminal / Lo del Tío'), txt: 'Terminal · "Lo del Tío"', r: 34, h: 10, ty: 3, tR: 14 },
    { p: lab('Diablito Bar'), txt: 'Diablito Bar', r: 26, h: 8, ty: 2.5, tR: 7 },
    { p: cen(COMISARIA_POLY), txt: 'Comisaría de Peyrano', r: 30, h: 9, ty: 3, tR: 9, pref: Math.PI },
    { p: [30.5, -415.5], txt: 'Comuna de Peyrano', r: 38, h: 13, ty: 3, tR: 13 },
    { p: lab('Iglesia'), txt: 'Iglesia', r: 46, h: 17, ty: 6, tR: 16 },
    { p: cen(AGUA_POLY), txt: 'Tanque de agua potable', r: 50, h: 22, ty: 14, tR: 9 },
  ];
  const boxes = [...new Set([].concat(...hash.values()))];
  const trees = [...crowns.list, ...palmCrowns.list].map(e => [e[0], e[1], e[2], Math.max(e[3], e[5]) * .9]);
  const segBox = (A, B, b, H) => {
    let t0 = 0, t1 = 1; const lo = [b.x0, 0, b.z0], hi = [b.x1, H, b.z1];
    for (let k = 0; k < 3; k++){
      const d = B[k] - A[k];
      if (Math.abs(d) < 1e-9){ if (A[k] < lo[k] || A[k] > hi[k]) return false; continue; }
      let ta = (lo[k] - A[k]) / d, tb = (hi[k] - A[k]) / d; if (ta > tb) [ta, tb] = [tb, ta];
      t0 = Math.max(t0, ta); t1 = Math.min(t1, tb); if (t0 > t1) return false;
    }
    return true;
  };
  const segSph = (A, B, c, r) => {
    const d = [B[0] - A[0], B[1] - A[1], B[2] - A[2]], dd = d[0] * d[0] + d[1] * d[1] + d[2] * d[2];
    const t = Math.max(0, Math.min(1, ((c[0] - A[0]) * d[0] + (c[1] - A[1]) * d[1] + (c[2] - A[2]) * d[2]) / dd));
    return Math.hypot(A[0] + d[0] * t - c[0], A[1] + d[1] * t - c[1], A[2] + d[2] * t - c[2]) < r;
  };
  // puntaje de un recorrido (más bajo = mejor):
  //  · la cámara tiene que estar sobre la calle o la vereda (desde ahí se ve el FRENTE; nunca desde el medio de la manzana)
  //  · edificios en el medio tapan mucho; los árboles tapan "un poco" (se aceptan algunas ramas mientras se entienda el lugar)
  const score = (pts, T, bxs, trs, tR, needPub) => {
    let s = 0;
    for (const C of pts){
      for (const b of bxs) if (C[0] > b.x0 - .6 && C[0] < b.x1 + .6 && C[2] > b.z0 - .6 && C[2] < b.z1 + .6 && C[1] < 14){ s += 3; break; }
      for (const t of trs) if (Math.hypot(C[0] - t[0], C[1] - t[1], C[2] - t[2]) < t[3] + 1.2){ s += 3; break; }
      if (needPub && !pointOnRoad(C[0], C[2])) s += 2.5;
      const dx = T[0] - C[0], dz = T[2] - C[2], l = Math.hypot(dx, dz) || 1, o = Math.min(tR * .45, 6), px = -dz / l * o, pz = dx / l * o;
      for (const Tp of [T, [T[0], T[1] + 4, T[2]], [T[0] + px, T[1] + 1, T[2] + pz], [T[0] - px, T[1] + 1, T[2] - pz]]){
        if (bxs.some(b => segBox(C, Tp, b, 7))) s += 1;
        else if (trs.some(t => segSph(C, Tp, t, t[3] * .8))) s += .45;
      }
    }
    return s;
  };
  const angD = (a, b) => Math.abs(((a - b) % (Math.PI * 2) + Math.PI * 3) % (Math.PI * 2) - Math.PI);
  const shots = [], SPAN = .5;
  for (const d of defs){
    if (d.acc){   // cartel del acceso: de frente, por el medio del camino (de los dos lados elige el más despejado)
      if (typeof ACC_PORTAL === 'undefined') continue;
      const [px, pz, pa] = ACC_PORTAL, T = [px, 6.4, pz];
      const bxs = boxes.filter(b => Math.hypot((b.x0 + b.x1) / 2 - px, (b.z0 + b.z1) / 2 - pz) < 60 && Math.hypot((b.x0 + b.x1) / 2 - px, (b.z0 + b.z1) / 2 - pz) > 10);
      const trs = trees.filter(t => Math.hypot(t[0] - px, t[2] - pz) < 60);
      let best = null;
      for (const s of [1, -1]){
        const dx = Math.sin(pa) * s, dz = Math.cos(pa) * s;
        const P = u => [px + dx * (26 - 10 * u), 5.6 + .8 * u, pz + dz * (26 - 10 * u)];
        const sc = score([P(0), P(.5), P(1)], T, bxs, trs, 6, false);
        if (!best || sc < best.sc) best = { sc, P };
      }
      shots.push({ T, txt: d.txt, path: best.P });
      continue;
    }
    if (!d.p) continue;
    const [Tx, Tz] = d.p, T = [Tx, d.ty, Tz], R0 = d.r + 40;
    const bxs = boxes.filter(b => {
      const cx = (b.x0 + b.x1) / 2, cz = (b.z0 + b.z1) / 2;
      if (Math.hypot(cx - Tx, cz - Tz) > R0) return false;
      if (Tx > b.x0 && Tx < b.x1 && Tz > b.z0 && Tz < b.z1) return false;   // el propio lugar
      return Math.hypot(cx - Tx, cz - Tz) > d.tR;
    });
    const trs = d.noTrees ? [] : trees.filter(t => Math.hypot(t[0] - Tx, t[2] - Tz) < R0);
    let best = null;
    for (let i = 0; i < 24; i++) for (const hm of [1, 1.35]) for (const rm of [.7, 1, 1.3]){
      const a = i / 24 * Math.PI * 2, r0 = d.r * rm;
      const P = u => { const aa = a + u * SPAN, rr = r0 * (1 - .14 * u); return [Tx + Math.sin(aa) * rr, d.h * hm * (1 - .1 * u), Tz + Math.cos(aa) * rr]; };
      const sc = score([P(0), P(.5), P(1)], T, bxs, trs, d.tR, !d.noTrees) + (hm > 1 ? .4 : 0) + Math.abs(rm - 1) * .5
        + (d.pref !== undefined ? angD(a + SPAN / 2, d.pref) * .9 : 0);
      if (!best || sc < best.sc) best = { sc, P };
    }
    shots.push({ T, txt: d.txt, path: best.P });
  }
  return shots;
})();
const CINE_D = 7;
let cineI = 0, cineT = 0, cineFading = false;
function cineCaption(){ const s = CINE[cineI]; capEl.innerHTML = `<small>PEYRANO</small>${s.txt}`; }
function cineFrame(dt){
  if (!CINE.length) return;
  cineT += dt;
  if (!cineFading && cineT > CINE_D - .75){ cineFading = true; fadeEl.style.opacity = 1; }
  if (cineT > CINE_D){ cineT = 0; cineFading = false; cineI = (cineI + 1) % CINE.length; cineCaption(); fadeEl.style.opacity = 0; }
  const s = CINE[cineI], u = cineT / CINE_D, e = u * u * (3 - 2 * u) * .6 + u * .4, C = s.path(e);
  camera.position.set(C[0], C[1], C[2]);
  camera.lookAt(s.T[0], s.T[1], s.T[2]);
  updateSun(s.T[0], s.T[2]);
}
function showMenu(mode){
  GS = mode;
  menuEl.className = mode === 'pause' ? 'pause' : 'title'; menuEl.style.display = 'flex';
  mainCard.style.display = 'block'; optsEl.style.display = 'none';
  mPlay.textContent = mode === 'pause' ? 'REANUDAR' : 'JUGAR';
  document.body.classList.add('nohud'); bhopHud.style.display = 'none';
  for (const k in keys) keys[k] = false;
  if (mode === 'menu'){ cineI = 0; cineT = 0; cineFading = false; fadeEl.style.opacity = 0; if (CINE.length){ cineCaption(); capEl.style.opacity = 1; } }
  else { capEl.style.opacity = 0; fadeEl.style.opacity = 0; }
  pauseDirty = true;
  mPlay.focus?.();
}
let pausedAt = 0;
function openPause(){ if (GS === 'play'){ pausedAt = performance.now(); showMenu('pause'); } }
function startPlay(){
  menuEl.style.display = 'none'; capEl.style.opacity = 0; fadeEl.style.opacity = 0;
  document.body.classList.remove('nohud');
  camera.fov = OPT.fov; camera.updateProjectionMatrix();
  GS = 'play'; clock.getDelta(); lockMouse();
}
function menuEsc(){
  if (optsEl.style.display !== 'none'){ optsEl.style.display = 'none'; mainCard.style.display = 'block'; return; }
  if (GS === 'pause' && performance.now() - pausedAt > 400) startPlay();   // (el mismo ESC que abrió la pausa no la cierra)
}
mPlay.onclick = startPlay;
document.getElementById('mExit').onclick = () => {
  if (GS === 'pause'){ showMenu('menu'); return; }   // desde la pausa: volver a la pantalla de inicio
  byeEl.style.display = 'flex'; try { window.close(); } catch (e) {}
};
document.getElementById('byeBack').onclick = () => { byeEl.style.display = 'none'; };
// panel de OPCIONES
{
  const $ = id => document.getElementById(id);
  const fill = () => {
    $('oSens').value = OPT.sens; $('oSensV').textContent = (+OPT.sens).toFixed(1) + '×';
    $('oInv').checked = OPT.invY;
    $('oFov').value = OPT.fov; $('oFovV').textContent = OPT.fov + '°';
    $('oView').value = OPT.view; $('oViewV').textContent = OPT.view + ' m';
    $('oRes').value = String(OPT.res); $('oSh').value = String(OPT.shadows);
    $('oMini').checked = OPT.mini; $('oHelp').checked = OPT.help; $('oStreet').checked = OPT.street;
  };
  const bind = (id, key, conv, ev = 'input') => $(id).addEventListener(ev, e => { OPT[key] = conv(e.target); applyOpts(); fill(); });
  bind('oSens', 'sens', t => +t.value); bind('oFov', 'fov', t => +t.value); bind('oView', 'view', t => +t.value);
  bind('oInv', 'invY', t => t.checked, 'change'); bind('oRes', 'res', t => +t.value, 'change'); bind('oSh', 'shadows', t => +t.value, 'change');
  bind('oMini', 'mini', t => t.checked, 'change'); bind('oHelp', 'help', t => t.checked, 'change'); bind('oStreet', 'street', t => t.checked, 'change');
  $('mOpts').onclick = () => { fill(); mainCard.style.display = 'none'; optsEl.style.display = 'block'; };
  $('oBack').onclick = () => { optsEl.style.display = 'none'; mainCard.style.display = 'block'; };
  $('oReset').onclick = () => { Object.assign(OPT, OPT_DEF); applyOpts(); fill(); };
}

const clock = new THREE.Clock();
function loop(){
  const dt = Math.min(clock.getDelta(), .05);
  const t = clock.elapsedTime;
  if (GS === 'play'){
    update(dt);
    if (ctx.dayNight) {
      ctx.dayNight.update(dt, pos.x, pos.z);
      carHeadlight.intensity = ctx.dayNight.state.nightFactor * 42;
    }
    for (const a of anims) a(t, dt);
    renderer.render(scene, camera);
    drawMini();
    if (bigOpen) drawBig();
  } else if (GS === 'menu'){
    cineFrame(dt);
    if (ctx.dayNight) {
      ctx.dayNight.update(dt, camera.position.x, camera.position.z);
      carHeadlight.intensity = ctx.dayNight.state.nightFactor * 42;
    }
    for (const a of anims) a(t, dt);
    renderer.render(scene, camera);
  } else if (pauseDirty){   // pausa: el mundo queda quieto; se redibuja solo si cambia algo (opciones, tamaño de ventana)
    renderer.render(scene, camera); pauseDirty = false;
  }
  DBG.frame();
  requestAnimationFrame(loop);
}
showMenu('menu');
loop();
window.__game = { pos, car, segs, houses: walls.list.length, trees: trunks.list.length, view: (p, d, y) => { pitch = p; dist = d; yaw = y; } };
}
