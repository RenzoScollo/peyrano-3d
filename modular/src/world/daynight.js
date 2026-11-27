// Ciclo Día / Tarde / Noche dinámico: cielo, niebla, sol/luna, estrellas, faroles callejeros y faros del auto
export function initDayNight(ctx) {
  const { THREE, scene, sun, hemi, setSunDir, balls, lampSpots } = ctx;

  // Estado del ciclo (arranca al mediodía y pausado hasta que se destilde en Modo Admin)
  const state = {
    hour: 13.0,
    paused: true,
    speed: 0.16,
    nightFactor: 0,
  };

  // Bóveda celeste (sol, luna y estrellas que acompañan al jugador)
  const skyGroup = new THREE.Group();
  scene.add(skyGroup);

  const sunDisc = new THREE.Mesh(
    new THREE.SphereGeometry(42, 16, 12),
    new THREE.MeshBasicMaterial({ color: 0xfff5d6, fog: false })
  );
  const moonDisc = new THREE.Mesh(
    new THREE.SphereGeometry(28, 16, 12),
    new THREE.MeshBasicMaterial({ color: 0xdce8ff, fog: false })
  );
  skyGroup.add(sunDisc, moonDisc);

  // Estrellas en hemisferio superior
  const starCount = 420;
  const starPos = new Float32Array(starCount * 3);
  for (let i = 0; i < starCount; i++) {
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(0.12 + Math.random() * 0.88);
    const r = 1550;
    starPos[i * 3]     = r * Math.sin(phi) * Math.cos(theta);
    starPos[i * 3 + 1] = r * Math.cos(phi);
    starPos[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta);
  }
  const starGeo = new THREE.BufferGeometry();
  starGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3));
  const starMat = new THREE.PointsMaterial({ color: 0xeaf2ff, size: 7, sizeAttenuation: true, transparent: true, opacity: 0, fog: false, depthWrite: false });
  const stars = new THREE.Points(starGeo, starMat);
  skyGroup.add(stars);

  // Pool de 20 luces cálidas dinámicas que siguen a los faroles callejeros más cercanos de noche
  const LAMP_N = 20;
  const lampLights = [];
  for (let i = 0; i < LAMP_N; i++) {
    const pl = new THREE.PointLight(0xffc270, 0, 38, 1.5);
    pl.position.set(0, 6.2, 0);
    scene.add(pl);
    lampLights.push(pl);
  }

  // Paleta clave por hora del día [hora, cielo, sol, hemiSky, hemiGround, sunInt, hemiInt]
  const KEYS = [
    [0.0,  0x0b1224, 0x6f8ec9, 0x1a2848, 0x101820, 0.42, 0.36], // medianoche
    [5.0,  0x121c36, 0x7c9ad4, 0x223254, 0x161f28, 0.40, 0.40], // madrugada
    [6.3,  0xe08d63, 0xff9a52, 0xffb88c, 0x4c4a38, 1.35, 0.78], // amanecer
    [8.0,  0x9cc4e8, 0xfff0d4, 0xd8ecff, 0x5d6b3a, 2.25, 1.22], // mañana
    [13.0, 0xa9c9e8, 0xfff4e0, 0xdcecff, 0x5d6b3a, 2.45, 1.32], // mediodía / día
    [16.8, 0x9fc0de, 0xffe2b5, 0xd8d8e6, 0x5c6438, 2.15, 1.15], // tarde
    [18.3, 0xe87a48, 0xff7b38, 0xf29c72, 0x483c34, 1.45, 0.78], // atardecer dorado
    [19.5, 0x352e52, 0xb86d8a, 0x463d68, 0x20222a, 0.55, 0.48], // crepúsculo
    [20.8, 0x0e172e, 0x6f8ec9, 0x1c2b4c, 0x111922, 0.42, 0.38], // noche
    [24.0, 0x0b1224, 0x6f8ec9, 0x1a2848, 0x101820, 0.42, 0.36], // medianoche
  ];

  const cSky = new THREE.Color(), cSky2 = new THREE.Color();
  const cSun = new THREE.Color(), cSun2 = new THREE.Color();
  const cH1 = new THREE.Color(), cH1b = new THREE.Color();
  const cH2 = new THREE.Color(), cH2b = new THREE.Color();
  const lampDayEmissive = new THREE.Color(0x3a3a30);
  const lampNightEmissive = new THREE.Color(0xffcc66);
  let lastLampUpdate = 0;

  function applyHour(h) {
    h = ((h % 24) + 24) % 24;
    state.hour = h;

    // Buscar intervalo en KEYS
    let a = KEYS[0], b = KEYS[KEYS.length - 1];
    for (let i = 0; i < KEYS.length - 1; i++) {
      if (h >= KEYS[i][0] && h <= KEYS[i + 1][0]) { a = KEYS[i]; b = KEYS[i + 1]; break; }
    }
    const span = Math.max(0.0001, b[0] - a[0]);
    const t = (h - a[0]) / span;
    const s = t * t * (3 - 2 * t); // smoothstep

    cSky.setHex(a[1]).lerp(cSky2.setHex(b[1]), s);
    cSun.setHex(a[2]).lerp(cSun2.setHex(b[2]), s);
    cH1.setHex(a[3]).lerp(cH1b.setHex(b[3]), s);
    cH2.setHex(a[4]).lerp(cH2b.setHex(b[4]), s);

    scene.background.copy(cSky);
    if (scene.fog) scene.fog.color.copy(cSky);
    sun.color.copy(cSun);
    sun.intensity = a[5] + (b[5] - a[5]) * s;
    hemi.color.copy(cH1);
    hemi.groundColor.copy(cH2);
    hemi.intensity = a[6] + (b[6] - a[6]) * s;

    // Arco del sol (sale ~6:00, cenit ~12:30, se pone ~19:00)
    const sunAngle = ((h - 6.0) / 13.0) * Math.PI; // 0..PI de día
    const sunElev = Math.sin(sunAngle);
    const sunHoriz = Math.cos(sunAngle);
    const dist = 155;

    // Posición visual del sol y la luna en la bóveda
    const sx = -sunHoriz * 1350, sy = sunElev * 1250, sz = 420;
    sunDisc.position.set(sx, sy, sz);
    sunDisc.visible = sy > -120;
    sunDisc.material.color.copy(cSun);

    const mx = sunHoriz * 1350, my = -sunElev * 1100, mz = -380;
    moonDisc.position.set(mx, my, mz);
    moonDisc.visible = my > -80;

    // Dirección de la luz principal (sol de día, luna de noche para mantener sombras suaves)
    if (sunElev > 0.08) {
      setSunDir(-sunHoriz * dist, Math.max(24, sunElev * dist), 48);
    } else {
      const mElev = Math.max(0.32, -sunElev);
      setSunDir(sunHoriz * dist * 0.7, mElev * dist, -42);
    }

    // Factor de noche (0 = día pleno, 1 = noche cerrada)
    let night = 0;
    if (h >= 18.0 && h < 20.2) night = (h - 18.0) / 2.2;
    else if (h >= 20.2 || h < 5.2) night = 1;
    else if (h >= 5.2 && h < 7.2) night = 1 - (h - 5.2) / 2.0;
    state.nightFactor = night;

    starMat.opacity = Math.max(0, (night - 0.35) / 0.65) * 0.92;
    stars.visible = starMat.opacity > 0.02;

    // Encender las bochas de los faroles callejeros al anochecer
    if (balls && balls.mat && balls.mat.emissive) {
      balls.mat.emissive.copy(lampDayEmissive).lerp(lampNightEmissive, night);
      balls.mat.emissiveIntensity = 0.6 + night * 2.2;
    }
  }

  function updateLamps(cx, cz) {
    const nf = state.nightFactor;
    if (nf < 0.05 || !lampSpots || !lampSpots.length) {
      for (const pl of lampLights) pl.intensity = 0;
      return;
    }
    // Elegir los LAMP_N faroles más cercanos al jugador/auto
    const best = [];
    for (let i = 0; i < lampSpots.length; i++) {
      const sp = lampSpots[i];
      const dx = sp[0] - cx, dz = sp[1] - cz;
      const d2 = dx * dx + dz * dz;
      if (d2 > 130 * 130) continue;
      if (best.length < LAMP_N) {
        best.push([d2, sp[0], sp[1]]);
        best.sort((u, v) => u[0] - v[0]);
      } else if (d2 < best[LAMP_N - 1][0]) {
        best[LAMP_N - 1] = [d2, sp[0], sp[1]];
        best.sort((u, v) => u[0] - v[0]);
      }
    }
    const baseInt = nf * 18;
    for (let i = 0; i < LAMP_N; i++) {
      if (i < best.length) {
        lampLights[i].position.set(best[i][1], 6.0, best[i][2]);
        lampLights[i].intensity = baseInt;
      } else {
        lampLights[i].intensity = 0;
      }
    }
  }

  function formatHour(h = state.hour) {
    const hh = Math.floor(((h % 24) + 24) % 24);
    const mm = Math.floor(((((h % 24) + 24) % 24) - hh) * 60);
    const tag = (h >= 5.5 && h < 8) ? '🌄 Amanecer'
      : (h >= 8 && h < 17) ? '☀️ Día'
      : (h >= 17 && h < 20) ? '🌅 Tarde'
      : '🌙 Noche';
    return `${String(hh).padStart(2, '0')}:${String(mm).padStart(2, '0')} ${tag}`;
  }

  function update(dt, cx, cz) {
    if (!state.paused && dt > 0) {
      applyHour(state.hour + dt * state.speed);
    }
    skyGroup.position.set(cx, 0, cz);
    lastLampUpdate += dt;
    if (lastLampUpdate > 0.25) {
      lastLampUpdate = 0;
      updateLamps(cx, cz);
    }
  }

  applyHour(state.hour);
  ctx.dayNight = { state, applyHour, update, updateLamps, formatHour };
}
