// Mástil central, las 4 plazas (ejercicios, Festival, juegos, pérgola) y letras PEYRANO
export function buildPlazas(ctx) {
  const {
    GRAVEL, MX, MZ, OSM, R, SCHOOL_GATE_Z, THREE, addBench, addBush, addCol, anims, box, boxIn, bx, canvas, colLocal, cylIn, faceTo, fillPlants, flat, group, keepRect, keepSeg, lam, lampSpots, mapRects, mesh, plazaBase, poleIn, scene, signIn, trims
  } = ctx;

{
  mesh(new THREE.CylinderGeometry(4.4, 4.4, .25, 36).translate(0, .125, 0), '#dcd8cf', MX, 0, MZ);
  box(MX, .25, MZ, 3.8, .3, 3.8, '#f1eee8');
  box(MX, .55, MZ, 3.0, .3, 3.0, '#f1eee8');
  mesh(new THREE.CylinderGeometry(.95, 1.45, 3.2, 4).translate(0, 1.6, 0), '#f6f4ef', MX, .85, MZ, Math.PI/4);
  for (const [dx, dz, ry] of [[0, 1.2, 0], [0, -1.2, Math.PI], [1.2, 0, Math.PI/2], [-1.2, 0, -Math.PI/2]])
    box(MX + dx, 1.7, MZ + dz, 1.1, .8, .12, '#6b6f74', ry);
  mesh(new THREE.CylinderGeometry(.07, .13, 22, 10).translate(0, 11, 0), '#e8e8e8', MX, 4.05, MZ);
  mesh(new THREE.SphereGeometry(.22, 10, 8), '#d4af37', MX, 26.2, MZ);
  // bandera
  const cv = document.createElement('canvas'); cv.width = 180; cv.height = 120;
  const c = cv.getContext('2d');
  c.fillStyle = '#74acdf'; c.fillRect(0, 0, 180, 120); c.fillStyle = '#fff'; c.fillRect(0, 40, 180, 40);
  c.fillStyle = '#f6b40e'; c.beginPath(); c.arc(90, 60, 11, 0, Math.PI*2); c.fill();
  const flagGeo = new THREE.PlaneGeometry(3.6, 2.4, 18, 8).translate(1.8, 0, 0);
  const base = flagGeo.attributes.position.array.slice();
  const flag = new THREE.Mesh(flagGeo, new THREE.MeshLambertMaterial({ map: new THREE.CanvasTexture(cv), side: THREE.DoubleSide }));
  flag.map && (flag.map.colorSpace = THREE.SRGBColorSpace);
  flag.material.map.colorSpace = THREE.SRGBColorSpace;
  flag.position.set(MX + .08, 24.7, MZ); flag.rotation.y = .6; flag.castShadow = true; scene.add(flag);
  anims.push(t => {
    const a = flagGeo.attributes.position.array;
    for (let i = 0; i < a.length; i += 3){ const x = base[i]; a[i+2] = Math.sin(x * 1.7 - t * 5 + base[i+1] * .4) * .25 * (x / 3.6); }
    flagGeo.attributes.position.needsUpdate = true; flagGeo.computeVertexNormals();
  });
  addCol(MX - 2.0, MZ - 2.0, MX + 2.0, MZ + 2.0);
  mapRects.push([MX - 4.4, MZ - 4.4, MX + 4.4, MZ + 4.4, '#f1eee8']);
}

// Plaza noroeste (4,2): máquinas de ejercicio en el medio
{
  const [x0, z0, x1, z1, cx, cz] = plazaBase(4, 2);
  flat.rect(cx - 10, cz - 10, cx + 10, cz + 10, .065, '#6f8290'); keepRect(cx - 11, cz - 11, cx + 11, cz + 11);
  for (const [ax, az, bx, bz] of [[x0, cz, cx - 10, cz], [x1, cz, cx + 10, cz], [cx, z0, cx, cz - 10], [cx, z1, cx, cz + 10]]){ flat.ribbon([[ax, az], [bx, bz]], 3, .075, GRAVEL); keepSeg(ax, az, bx, bz, 3.5); }
  const Y = '#f2c230', Gn = '#2e9a4a', Bl = '#2d6fb8';
  const build = [
    g => { poleIn(g, [-1, 0, 0], [-1, 2.3, 0], .06, Bl); poleIn(g, [1, 0, 0], [1, 2.3, 0], .06, Bl); poleIn(g, [-1.05, 2.2, 0], [1.05, 2.2, 0], .04, Y); },
    g => { for (const sx of [-.3, .3]){ poleIn(g, [sx, 0, -1], [sx, 1.15, -1], .05, Gn); poleIn(g, [sx, 0, 1], [sx, 1.15, 1], .05, Gn); poleIn(g, [sx, 1.15, -1.1], [sx, 1.15, 1.1], .04, Y); } },
    g => { poleIn(g, [0, 0, 0], [0, 1.9, 0], .08, Gn); poleIn(g, [-.55, 1.8, 0], [.55, 1.8, 0], .06, Gn);
           for (const sx of [-.45, .45]){ poleIn(g, [sx, 1.8, 0], [sx, .3, 0], .04, Y); boxIn(g, sx, .28, .12, .25, .05, .42, Y); poleIn(g, [sx, 1.8, 0], [sx, 1.5, .5], .03, Y); } },
    g => { boxIn(g, 0, .55, 0, .5, .08, 1.9, Y, -.3); poleIn(g, [0, 0, .8], [0, .8, .8], .05, Bl); poleIn(g, [0, 0, -.8], [0, .3, -.8], .05, Bl); },
    g => { poleIn(g, [0, 0, 0], [0, 1.3, 0], .07, Bl); poleIn(g, [-.45, 1.3, 0], [.45, 1.3, 0], .04, Y); cylIn(g, 0, .2, .55, .35, .06, Y); poleIn(g, [0, 0, .55], [0, .2, .55], .04, Bl); },
    g => { poleIn(g, [0, 0, 0], [0, 1.7, 0], .08, Gn); for (const sx of [-.3, .3]){ cylIn(g, sx, 1.45, 0, .42, .05, Y, Math.PI/2); poleIn(g, [sx * 1.1, 1.45, .3], [sx * 1.6, 1.45, .3], .03, Bl); } },
  ];
  build.forEach((fn, k) => {
    const a = k / build.length * Math.PI * 2 + .5, x = cx + Math.cos(a) * 6, z = cz + Math.sin(a) * 6;
    fn(group(x, z, faceTo(x, z, cx, cz)));
    addCol(x - 1, z - 1, x + 1, z + 1);
  });
  for (const [x, z] of [[cx - 8.5, cz - 8.5], [cx + 8.5, cz + 8.5]]) addBench(x, z, faceTo(x, z, cx, cz));
  // frente libre para el museo y salida trasera de los bomberos
  flat.rect(x0, -365, x0 + 10, -357, .075, '#b9b1a3'); keepRect(x0, -370, x0 + 14, -352);
  flat.rect(x0, -394, x0 + 9, -376, .075, '#bdb6a8'); keepRect(x0, -398, x0 + 11, -372);
  fillPlants(x0 + 3, z0 + 3, x1 - 3, z1 - 3, 140);
}

// Plaza noreste (5,2): escenario del Festival en diagonal con el cartel arriba del escenario
{
  const [x0, z0, x1, z1, cx, cz] = plazaBase(5, 2);
  const sx0 = x0 + 4, sx1 = x1 - 4, sz0 = z0 + 4, sz1 = z1 - 4;
  flat.rect(sx0, sz0, sx1, sz1, .065, '#c9c6bf'); keepRect(sx0 - 1, sz0 - 1, sx1 + 1, sz1 + 1);
  for (let x = sx0 + 5; x < sx1; x += 5) flat.rect(x - .05, sz0, x + .05, sz1, .07, '#b3afa7');
  for (let z = sz0 + 5; z < sz1; z += 5) flat.rect(sx0, z - .05, sx1, z + .05, .07, '#b3afa7');
  // Escenario en diagonal en la esquina NE de la plaza, mirando al SO (hacia el mástil y la avenida)
  const stx = sx1 - 7.5, stz = sz0 + 7.5;
  const sg = group(stx, stz, -Math.PI / 4);
  bx(sg, 0, 0, 0, 12, 1.1, 7.2, '#9e8e7a');                       // tarima baja de piedra/ladrillo
  bx(sg, 0, 1.1, -3.1, 11.4, 4.95, .35, '#191c20');               // fondo negro hasta el tope del techo
  for (const s of [-1, 1]) for (let k = 0; k < 4; k++) bx(sg, s * (6.2 + k * .35), 0, 1.5, .35, 1.1 - k * .26, 2.2, '#8f8a81');
  for (const [px, pz] of [[-5.7, -3.3], [5.7, -3.3], [-5.7, 3.3], [5.7, 3.3], [-5.7, 0], [5.7, 0]]) bx(sg, px, 1.1, pz, .26, 4.9, .26, '#6f7780');
  for (const pz of [-3.3, 0, 3.1]) bx(sg, 0, 5.8, pz, 11.8, .28, .16, '#6f7780');
  for (const px of [-5.7, 5.7]) bx(sg, px, 5.8, 0, .16, .28, 6.8, '#6f7780');
  bx(sg, 0, 6.08, -.15, 12.2, .14, 7.0, '#b9bec4');               // techo metálico detrás del cartel (no lo atraviesa)
  // Cartel "Festival Folklórico de Peyrano" limpio al frente
  bx(sg, 0, 5.55, 3.65, 12.4, 1.18, .16, '#cfd8e0');
  signIn(sg, 'Festival Folklórico de Peyrano', 0, 6.14, 3.76, 12.0, 1.0, '#cfd8e0', '#1d3958');
  signIn(sg, 'Festival Folklórico de Peyrano', 0, 6.14, 3.54, 12.0, 1.0, '#cfd8e0', '#1d3958', Math.PI);
  colLocal(sg, -6.4, -3.8, 6.4, 3.8, '#a19c93');
  for (const [x, z] of [[sx0, sz0], [sx1, sz0], [sx0, sz1], [sx1, sz1]]) lampSpots.push([x, z]);
  mapRects.push([sx0, sz0, sx1, sz1, '#c9c6bf']);
  fillPlants(x0 + 3, z0 + 3, x1 - 3, z1 - 3, 95);
}

// Plaza suroeste (4,3): juegos para niños

{
  const [x0, z0, x1, z1, cx, cz] = plazaBase(4, 3);
  flat.rect(cx - 15, cz - 12, cx + 15, cz + 12, .065, '#b5553f'); keepRect(cx - 16, cz - 13, cx + 16, cz + 13);
  flat.ribbon([[x1 - 1.5, z0 + 1.5], [cx + 15, cz - 12]], 3, .08, GRAVEL); keepSeg(x1, z0, cx + 15, cz - 12, 3.5);
  flat.ribbon([[x0, Math.max(z0 + 4, Math.min(z1 - 4, SCHOOL_GATE_Z))], [cx - 15, cz + 6]], 3.5, .08, GRAVEL); keepSeg(x0, Math.max(z0 + 4, Math.min(z1 - 4, SCHOOL_GATE_Z)), cx - 15, cz + 6, 4);
  // torre con tobogán de tubo
  { const g = group(cx - 8, cz - 5), T = 2.2;
    for (const [px, pz] of [[-1,-1],[1,-1],[-1,1],[1,1]]) poleIn(g, [px, 0, pz], [px, 3.4, pz], .07, '#f2c230');
    boxIn(g, 0, T, 0, 2.2, .15, 2.2, '#3a8f4a');
    for (const pz of [-1, 1]) boxIn(g, 0, T + .45, pz, 2, .5, .06, '#d8392b');
    const roof = new THREE.Mesh(new THREE.ConeGeometry(1.8, 1.2, 4).translate(0, .6, 0), lam({ color: 0xd8392b })); roof.position.y = 3.4; roof.rotation.y = Math.PI/4; roof.castShadow = true; g.add(roof);
    poleIn(g, [-1.1, 0, -.35], [-1.6, T, -.35], .04, '#2d6fb8'); poleIn(g, [-1.1, 0, .35], [-1.6, T, .35], .04, '#2d6fb8');
    for (let k = 1; k < 6; k++){ const t = k / 6; poleIn(g, [-1.1 - .5*t, T*t, -.35], [-1.1 - .5*t, T*t, .35], .03, '#2d6fb8'); }
    const pts = []; for (let k = 0; k <= 30; k++){ const t = k / 30, a = Math.PI + t * Math.PI * 1.6; pts.push(new THREE.Vector3(2.7 + Math.cos(a) * 1.8, T + .4 - t * 2.1, Math.sin(a) * 1.8)); }
    const tube = new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts), 60, .48, 14, false), lam({ color: 0x2a7fd4, side: THREE.DoubleSide })); tube.castShadow = true; g.add(tube);
    addCol(cx - 9.8, cz - 6.2, cx - 6.8, cz - 3.8); addCol(cx - 6.6, cz - 7, cx - 3.3, cz - 3);
  }
  // hamacas
  { const g = group(cx + 8, cz - 6);
    for (const sx of [-3, 3]){ poleIn(g, [sx, 0, -1.2], [sx, 2.7, 0], .07, '#2d6fb8'); poleIn(g, [sx, 0, 1.2], [sx, 2.7, 0], .07, '#2d6fb8'); }
    poleIn(g, [-3.1, 2.7, 0], [3.1, 2.7, 0], .08, '#f2c230');
    for (const [k, sx] of [[0, -1.4], [1, 1.4]]){
      const p = new THREE.Group(); p.position.set(sx, 2.7, 0); g.add(p);
      poleIn(p, [-.25, 0, 0], [-.25, -2.15, 0], .015, '#888'); poleIn(p, [.25, 0, 0], [.25, -2.15, 0], .015, '#888');
      boxIn(p, 0, -2.18, 0, .65, .06, .3, '#d8392b');
      anims.push(t => { p.rotation.x = Math.sin(t * 2.2 + k * 1.7) * .35; });
    }
    addCol(cx + 4.8, cz - 7.4, cx + 11.2, cz - 4.6);
  }
  // sube y baja
  { const g = group(cx + 8, cz + 6);
    boxIn(g, 0, .25, 0, .35, .5, .35, '#2d6fb8');
    const p = new THREE.Group(); p.position.y = .55; g.add(p);
    boxIn(p, 0, 0, 0, 4.2, .1, .35, '#f2c230');
    for (const sx of [-1.7, 1.7]) poleIn(p, [sx, 0, -.15], [sx, .45, -.15], .03, '#d8392b');
    anims.push(t => { p.rotation.z = Math.sin(t * 1.6) * .22; });
    addCol(cx + 7.6, cz + 5.6, cx + 8.4, cz + 6.4);
  }
  // calesita
  { const g = group(cx - 8, cz + 6);
    const p = new THREE.Group(); g.add(p);
    cylIn(p, 0, .35, 0, 1.9, .15, '#e04b3a');
    poleIn(p, [0, 0, 0], [0, 1.2, 0], .06, '#f2c230');
    for (let k = 0; k < 4; k++){ const a = k * Math.PI / 2; poleIn(p, [0, 1.1, 0], [Math.cos(a) * 1.7, .9, Math.sin(a) * 1.7], .04, '#f2c230'); poleIn(p, [Math.cos(a) * 1.7, .42, Math.sin(a) * 1.7], [Math.cos(a) * 1.7, .9, Math.sin(a) * 1.7], .04, '#f2c230'); }
    anims.push((t, dt) => { p.rotation.y += dt * .9; });
    addCol(cx - 9.6, cz + 4.4, cx - 6.4, cz + 7.6);
  }
  // arenero
  flat.rect(cx - 2.5, cz - 2.5, cx + 2.5, cz + 2.5, .08, '#e3cf9a');
  for (const [x, z, sx, sz] of [[cx, cz - 2.5, 5.3, .3], [cx, cz + 2.5, 5.3, .3], [cx - 2.5, cz, .3, 5.3], [cx + 2.5, cz, .3, 5.3]]) trims.add(x, 0, z, sx, .3, sz, 0, '#c9c3b5');
  for (const dz of [-6, 0, 6]) addBench(cx + 17, cz + dz, faceTo(cx + 17, 0, cx, 0));
  for (const dz of [-8, -2]) addBench(cx - 17, cz + dz, faceTo(cx - 17, 0, cx, 0));
  fillPlants(x0 + 3, z0 + 3, x1 - 3, z1 - 3, 110);
}

// Plaza sureste (5,3) ("Plaza 2"): camino en diagonal con pérgola de arcos blancos, mesas de cemento y árboles altos
{
  const [x0, z0, x1, z1] = plazaBase(5, 3);
  for (const r of [[x0+5, z0+5, x1-5, z0+8], [x0+5, z1-8, x1-5, z1-5], [x0+5, z0+5, x0+8, z1-5], [x1-8, z0+5, x1-5, z1-5]]){ flat.rect(...r, .075, GRAVEL); keepRect(r[0] - .8, r[1] - .8, r[2] + .8, r[3] + .8); }
  flat.ribbon([[x0 + 1.5, z0 + 1.5], [x1 - 1.5, z1 - 1.5]], 4, .08, GRAVEL); keepSeg(x0, z0, x1, z1, 5.5);
  const dx = x1 - x0, dz = z1 - z0, l = Math.hypot(dx, dz), nx = -dz / l, nz = dx / l;
  // Pérgola de arcos metálicos blancos sobre el camino diagonal
  const pg = group((x0 + x1) / 2, (z0 + z1) / 2, Math.atan2(dx, dz));
  for (let u = -9; u <= 9; u += 3){
    for (const sx of [-2.2, 2.2]) poleIn(pg, [sx, 0, u], [sx, 2.3, u], .05, '#e8ecee');
    for (let k = 0; k < 8; k++){
      const a0 = k / 8 * Math.PI, a1 = (k + 1) / 8 * Math.PI;
      poleIn(pg, [Math.cos(a0) * 2.2, 2.3 + Math.sin(a0) * 1.45, u], [Math.cos(a1) * 2.2, 2.3 + Math.sin(a1) * 1.45, u], .04, '#e8ecee');
    }
  }
  for (const sx of [-2.2, 2.2]) poleIn(pg, [sx, 2.3, -9], [sx, 2.3, 9], .035, '#e8ecee');
  poleIn(pg, [0, 3.75, -9], [0, 3.75, 9], .035, '#e8ecee');
  // Mesas de cemento con banquitos + bancos de plaza
  for (const t of [.32, .68]) for (const s of [-1, 1]){
    const x = x0 + dx * t + nx * 4.4 * s, z = z0 + dz * t + nz * 4.4 * s;
    if (s > 0){
      const tg = group(x, z);
      bx(tg, 0, 0, 0, .55, .75, .55, '#d5d1c8'); bx(tg, 0, .75, 0, 1.35, .1, 1.35, '#e2dfd7');
      for (const [bx2, bz2] of [[-1.05, 0], [1.05, 0], [0, -1.05], [0, 1.05]]) bx(tg, bx2, 0, bz2, .42, .45, .42, '#d5d1c8');
      addCol(x - 1.2, z - 1.2, x + 1.2, z + 1.2);
    } else addBench(x, z, Math.atan2(-nx * s, -nz * s));
  }
  fillPlants(x0 + 3, z0 + 3, x1 - 3, z1 - 3, 160);
}


// Letras "PEYRANO" en la cabecera del cantero del bulevar, frente al mástil (lado del Festival)
{
  const g = group(0, 0);
  const hx = 14.5, hz = MZ;
  const curb = new THREE.Mesh(new THREE.CylinderGeometry(3, 3, .32, 28).translate(0, .16, 0), lam({ color: 0xd8b13a })); curb.position.set(hx, 0, hz); curb.scale.set(1, 1, .75); g.add(curb);
  const soil = new THREE.Mesh(new THREE.CylinderGeometry(2.8, 2.8, .34, 28).translate(0, .17, 0), lam({ color: 0x4a3a2a })); soil.position.set(hx, 0, hz); soil.scale.set(1, 1, .75); g.add(soil);
  [...'PEYRANO'].forEach((ch, i) => {
    const z = hz - 1.8 + i * .6;
    bx(g, hx - .6, .3, z, .35, 1.25, .56, '#f2f0ea');
    signIn(g, ch, hx - .79, .95, z, .5, .7, '#f2f0ea', '#7a7f86', -Math.PI/2);
  });
  bx(g, hx - .6, 0, hz, .5, .3, 4.3, '#e6e2d8');
  for (let k = 0; k < 9; k++) addBush(hx + R(.2, 2.2), hz + R(-1.8, 1.8), R(.45, .7), .3);
  addCol(hx - 1, hz - 2.3, hx + 1, hz + 2.3);
}

// Acceso a Peyrano (traza real curva de OSM hasta el empalme con la Ruta 18)
}
