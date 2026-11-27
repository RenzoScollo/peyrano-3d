// Zona Sur y Clubes: Club Rivadavia, Pilates Gym, Diablito Bar, Av. Centenario S, Escuela Dr. Brunet y Dr. Brunet/Independencia
export function buildSurClubesDiablito(ctx) {
  const {
    G, R, S, THREE, addCol, addTree, balls, box, boxIn, bx, canvas, civic, colLocal, crowns, cylIn, extrudePoly, flat, frustumMesh, gableIn, group, inner, lam, makeCar, mapLabels, mapRects, mapRoads, mesh, offsetPoly, palmTrunks, pick, plazaRects, poleIn, poles, rnd, roadLayer, scene, signIn, textTex, treeSpots, trims, trunks, walls, zs
  } = ctx;

{
  const [x0, z0, x1, z1] = inner(6, 7);   // x: 105.5..187.0, z: 58.0..139.5
  plazaRects.push([x0, z0, x1, z1]);
  flat.rect(x0, z0, x1, z1, .048, '#5a833b');
  // Vereda ancha de baldosas en la esquina Entre Ríos y La Rioja
  flat.rect(x0, z0, x0 + 20, z0 + 18, .058, '#dfd5be');
  // Cancha de fútbol 11 ocupando la mayor parte de la manzana (arcos hacia Entre Ríos y Mendoza)
  const fx0 = x0 + 4.5, fx1 = x1 - 4.5, fz0 = z0 + 25, fz1 = z1 - 5.5;
  const fcx = (fx0 + fx1) / 2, fcz = (fz0 + fz1) / 2;
  flat.rect(fx0, fz0, fx1, fz1, .056, '#488832');
  const FL = (ax, az, bx2, bz) => flat.rect(Math.min(ax, bx2) - .07, Math.min(az, bz) - .07, Math.max(ax, bx2) + .07, Math.max(az, bz) + .07, .064, '#f2f2f2');
  FL(fx0 + 1, fz0 + 1, fx1 - 1, fz0 + 1); FL(fx0 + 1, fz1 - 1, fx1 - 1, fz1 - 1);
  FL(fx0 + 1, fz0 + 1, fx0 + 1, fz1 - 1); FL(fx1 - 1, fz0 + 1, fx1 - 1, fz1 - 1);
  FL(fcx, fz0 + 1, fcx, fz1 - 1);
  const cr = []; for (let k = 0; k <= 32; k++){ const t = k / 32 * Math.PI * 2; cr.push([fcx + Math.cos(t) * 6.5, fcz + Math.sin(t) * 6.5]); }
  flat.ribbon(cr, .14, .064, '#f2f2f2');
  for (const s of [-1, 1]){
    const gx = s < 0 ? fx0 + 1 : fx1 - 1, dir = -s;
    FL(gx, fcz - 11, gx + dir * 11, fcz - 11); FL(gx, fcz + 11, gx + dir * 11, fcz + 11); FL(gx + dir * 11, fcz - 11, gx + dir * 11, fcz + 11);
    FL(gx, fcz - 5, gx + dir * 4, fcz - 5); FL(gx, fcz + 5, gx + dir * 4, fcz + 5); FL(gx + dir * 4, fcz - 5, gx + dir * 4, fcz + 5);
    const gg = group(gx - dir * .5, fcz);
    poleIn(gg, [0, 0, -3.6], [0, 2.45, -3.6], .07, '#ffffff'); poleIn(gg, [0, 0, 3.6], [0, 2.45, 3.6], .07, '#ffffff'); poleIn(gg, [0, 2.45, -3.6], [0, 2.45, 3.6], .07, '#ffffff');
    addCol(gx - dir * .5 - .15, fcz - 3.7, gx - dir * .5 + .15, fcz - 3.5); addCol(gx - dir * .5 - .15, fcz + 3.5, gx - dir * .5 + .15, fcz + 3.7);
  }
  // Torres de iluminación y bancos de suplentes del lado de Catamarca
  for (const [tx, tz] of [[fx0 + 10, fz0 - 1.2], [fx1 - 10, fz0 - 1.2], [fx0 + 10, fz1 + 1.2], [fx1 - 10, fz1 + 1.2]]){
    poles.add(tx, 0, tz, .28, 14, .28, 0, '#9aa2aa'); trims.add(tx, 14, tz, 2.2, .9, .5, 0, '#eef2f5'); addCol(tx - .2, tz - .2, tx + .2, tz + .2);
  }
  for (const sx of [fcx - 10, fcx + 10]){ const bg = group(sx, fz1 + 1.6); bx(bg, 0, 0, 0, 4.5, 2.0, 1.3, '#16448a'); bx(bg, 0, 2.0, 0, 4.6, .22, 1.4, '#f2c21b'); }

  // Frente sobre calle La Rioja (ry = Math.PI -> +z local mira al norte hacia La Rioja; x_world = (x0+8) - lx)
  const g = group(x0 + 8, z0 + .5, Math.PI);
  // Sede social blanca con azul y amarillo (colores del Club Rivadavia, esquina Entre Ríos y La Rioja)
  bx(g, -2, 0, -8, 16, 4.8, 15, '#f5f6f7');
  bx(g, -2, 0, .05, 16.1, .95, .12, '#16448a');
  bx(g, -2, 4.2, .05, 16.1, .65, .12, '#f2c21b');
  bx(g, 3.5, 0, .08, 2.4, 2.6, .12, '#22313f');   // puerta vidriada doble de ingreso
  bx(g, -4.5, 1.1, .06, 9.5, 1.7, .12, '#2a3c4a'); // ventanales corridos del salón/cantina
  bx(g, -4.5, 2.95, .6, 10.2, .18, 1.3, '#f2c21b'); // marquesina amarilla
  // Arco azul y amarillo de ingreso peatonal sobre Entre Ríos
  bx(g, 6.8, 0, -4, 1.6, 3.4, 3.6, '#f5f6f7'); bx(g, 6.8, 0, -4, 1.7, .95, 3.7, '#16448a'); bx(g, 6.8, 3.05, -4, 1.7, .35, 3.7, '#f2c21b');
  signIn(g, 'CLUB ATLÉTICO BERNARDINO RIVADAVIA', -2, 3.65, .14, 12.5, .68, '#16448a', '#f2c21b');

  // Tinglado / gimnasio cubierto con techo parabólico curvo de chapa (sobre La Rioja)
  const tx = -30, tw = 40, td = 20, th = 6.2;
  bx(g, tx, 0, -td/2, tw, th, td, '#dfd6c7');
  bx(g, tx, 0, .04, tw + .1, 1.0, .12, '#16448a');
  bx(g, tx, 1.0, .04, tw + .1, .32, .12, '#f2c21b');
  for (let wx = tx - tw/2 + 3.5; wx <= tx + tw/2 - 3.5; wx += 5.5) bx(g, wx, 4.2, .06, 2.2, 1.2, .12, '#2b3945');
  // Bóveda / techo parabólico de chapa galvanizada
  const arch = new THREE.Mesh(
    new THREE.CylinderGeometry(td / 2 + .2, td / 2 + .2, tw + .4, 20, 1, false, 0, Math.PI).rotateZ(Math.PI / 2),
    lam({ color: '#c4cbd1', side: THREE.DoubleSide })
  );
  arch.position.set(tx, th, -td / 2); arch.scale.set(1, .34, 1); arch.castShadow = arch.receiveShadow = true; g.add(arch);
  // Anexo contiguo hacia la esquina Mendoza
  bx(g, -59, 0, -9, 18, 4.6, 17, '#e6dfd3');
  bx(g, -59, 0, .04, 18.1, .95, .12, '#16448a');
  bx(g, -59, .95, .04, 18.1, .3, .12, '#f2c21b');
  gableIn(g, -59, 4.6, -9, 18.4, 1.4, 17.4, '#9aa3ab', 0);
  colLocal(g, -68.2, -20.5, 7.6, .3, '#cfd6dc');

  // Tapial perimetral cerrando toda la manzana (azul y amarillo sobre muro claro)
  const tapial = (ax, az, bx2, bz) => {
    const len = Math.hypot(bx2 - ax, bz - az), mx = (ax + bx2) / 2, mz = (az + bz) / 2, hz = Math.abs(bx2 - ax) > Math.abs(bz - az);
    walls.add(mx, 0, mz, hz ? len : .32, 2.4, hz ? .32 : len, 0, '#ece7dd');
    walls.add(mx, 0, mz, hz ? len : .36, .75, hz ? .36 : len, 0, '#16448a');
    walls.add(mx, .75, mz, hz ? len : .37, .24, hz ? .37 : len, 0, '#f2c21b');
    addCol(Math.min(ax, bx2) - .2, Math.min(az, bz) - .2, Math.max(ax, bx2) + .2, Math.max(az, bz) + .2);
  };
  tapial(x0 + .3, z0 + 18, x0 + .3, z1 - .3);      // lado Entre Ríos
  tapial(x0 + .3, z1 - .3, x1 - .3, z1 - .3);      // lado Catamarca
  tapial(x1 - .3, z0 + 19, x1 - .3, z1 - .3);      // lado Mendoza
  mapRects.push([fx0, fz0, fx1, fz1, '#488832']);
  mapLabels.push([fcx, fcz, 'Club Rivadavia']);
}

// Gimnasio "Pilates Gym" (esquina SO de La Rioja y Entre Ríos, manzana (5,7), justo enfrente del Club Rivadavia)
{
  const [, z0, x1] = inner(5, 7);   // x1 = 89.5 (sobre Entre Ríos, mirando al +x hacia el Club), z0 = 58.0 (sobre La Rioja, mirando al -z)
  const g = group(x1, z0);          // (0,0) = esquina NE del lote: +x = Entre Ríos (este), -x = La Rioja (oeste), +z = sur, -z = norte
  // Textura con el logo real "|≡Pilates|Gym≡|" (barra con discos de pesas a los lados y silueta central)
  const logoMat = (() => {
    const cv = document.createElement('canvas'); cv.width = 512; cv.height = 128;
    const c = cv.getContext('2d');
    c.fillStyle = '#f4f3ef'; c.fillRect(0, 0, 512, 128);
    c.fillStyle = '#1e2024'; c.strokeStyle = '#1e2024';
    // Discos de pesas a izquierda y derecha
    for (const [bx2, dir] of [[44, 1], [468, -1]]){
      c.lineWidth = 5; c.beginPath(); c.moveTo(bx2 - dir * 26, 64); c.lineTo(bx2 + dir * 18, 64); c.stroke();
      for (const [dx, h] of [[0, 44], [-dir * 9, 32], [-dir * 17, 22]]) c.fillRect(bx2 + dx - 3, 64 - h / 2, 6, h);
    }
    c.font = 'italic bold 54px Georgia, serif'; c.textBaseline = 'middle';
    c.textAlign = 'right'; c.fillText('Pilates', 248, 66);
    c.textAlign = 'left';  c.fillText('Gym', 274, 66);
    // Silueta estilizada al medio
    c.lineWidth = 4; c.beginPath(); c.moveTo(260, 22); c.quadraticCurveTo(252, 64, 262, 108); c.stroke();
    c.beginPath(); c.arc(263, 34, 6, 0, Math.PI * 2); c.fill();
    const t = new THREE.CanvasTexture(cv); t.colorSpace = THREE.SRGBColorSpace;
    return new THREE.MeshLambertMaterial({ map: t });
  })();
  // Textura del mural de la esquina (arcoíris + dibujo sobre tapial blanco)
  const muralMat = (() => {
    const cv = document.createElement('canvas'); cv.width = 256; cv.height = 160;
    const c = cv.getContext('2d');
    c.fillStyle = '#f0eee9'; c.fillRect(0, 0, 256, 160);
    for (const [r, col] of [[95, '#d98a8a'], [87, '#e2b878'], [79, '#7fb088'], [71, '#7a9ec2']]){
      c.strokeStyle = col; c.lineWidth = 5; c.beginPath(); c.arc(70, 145, r, Math.PI, Math.PI * 1.65); c.stroke();
    }
    c.strokeStyle = '#2a2a28'; c.fillStyle = '#2a2a28'; c.lineWidth = 3;
    c.beginPath(); c.arc(165, 58, 16, 0, Math.PI * 2); c.stroke();
    c.fillRect(150, 44, 30, 8);   // sombrero/pelo
    c.strokeRect(153, 76, 24, 38); // torso
    c.beginPath(); c.arc(140, 86, 24, -Math.PI * .4, Math.PI * .4); c.stroke(); // arco
    c.fillStyle = '#5a8a4a'; for (let x = 20; x < 240; x += 18) c.fillRect(x, 142, 8, 14);
    const t = new THREE.CanvasTexture(cv); t.colorSpace = THREE.SRGBColorSpace;
    return new THREE.MeshLambertMaterial({ map: t });
  })();
  const putLogo = (x, y, z, w, h, ry) => {
    const m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), logoMat);
    m.position.set(x, y, z); m.rotation.y = ry; g.add(m);
  };

  // ---- 1) Esquina y tapial blanco sobre Entre Ríos (z = 0..9.5) y La Rioja (x = 0..-4.8) ----
  bx(g, -.15, 0, 4.75, .3, 2.35, 9.5, '#f2f1ed');                 // tapial blanco sobre Entre Ríos
  bx(g, -.13, 0, 4.75, .32, .24, 9.5, '#6b6e72');                 // zócalo gris oscuro
  bx(g, -2.4, 0, .15, 4.8, 2.35, .3, '#f2f1ed');                  // tapial blanco doblando por La Rioja
  bx(g, -2.4, 0, .13, 4.8, .24, .32, '#6b6e72');
  // Mural en el paño de la esquina sobre Entre Ríos (z = 0.2..2.9)
  { const m = new THREE.Mesh(new THREE.PlaneGeometry(2.6, 1.95), muralMat); m.position.set(.02, 1.22, 1.55); m.rotation.y = Math.PI / 2; g.add(m); }
  // Cartel pintado "|≡Pilates Gym≡|" en el tapial sobre Entre Ríos
  putLogo(.02, 1.68, 6.1, 3.1, .75, Math.PI / 2);
  // Cuerpo gris oscuro retirado detrás del tapial con ventana blanca y techo de chapa oxidada
  bx(g, -4.6, 0, 5.2, 8.4, 3.35, 8.8, '#4a4e54');
  bx(g, -4.6, 3.15, 5.2, 8.5, .25, 8.9, '#f2f1ed');
  bx(g, -.35, 1.85, 7.3, .12, 1.15, 1.35, '#f4f4f2');             // ventana blanca que asoma sobre el tapial
  gableIn(g, -4.6, 3.4, 5.2, 8.8, 1.15, 9.2, '#8b624c', Math.PI / 2);

  // ---- 2) Portón blanco sobre La Rioja con logo "Pilates Gym" y techo de chapa abierto arriba (x = -4.8..-9.4) ----
  bx(g, -4.8, 0, .18, .38, 2.55, .38, '#f4f3ef');                 // pilar izquierdo del portón
  bx(g, -9.2, 0, .18, .38, 2.85, .38, '#f4f3ef');                 // pilar derecho
  bx(g, -7.0, 0, .16, 4.1, 2.25, .14, '#f6f6f4');                 // portón de chapa blanca
  for (let x = -8.8; x <= -5.2; x += .35) bx(g, x, .08, .08, .04, 2.1, .04, '#dcdad3');
  putLogo(-7.0, 1.35, .07, 2.7, .66, Math.PI);                    // logo Pilates Gym en el portón de La Rioja
  // Galponcito de chapa detrás del portón con hueco oscuro bajo el alero
  bx(g, -7.0, 2.25, 1.6, 4.3, .85, 3.0, '#1e1c1a');
  bx(g, -8.9, 2.25, .22, .65, 1.0, .2, '#9aa1a8');                // chapa lateral acanalada
  const shedRoof = new THREE.Mesh(new THREE.BoxGeometry(4.6, .1, 5.2), lam({ color: 0x8e5d45 }));
  shedRoof.position.set(-7.0, 3.28, 2.5); shedRoof.rotation.x = -.12; g.add(shedRoof);
  flat.rect(x1 - 9.2, z0 - 2.6, x1 - 4.8, z0 + .2, .085, '#c8c2b6');   // entrada de cemento desde La Rioja

  // ---- 3) Volumen blanco central sobre Entre Ríos con ventanal vidriado y logo arriba (z = 9.5..15.2) ----
  bx(g, -5.0, 0, 12.35, 10.0, 3.85, 5.7, '#f4f3ef');
  bx(g, -.1, 3.85, 12.35, .4, .18, 5.8, '#e6e4de');               // cornisa superior
  bx(g, .02, 0, 12.35, .1, .28, 5.7, '#6b6e72');                  // zócalo gris
  // Ventanal/puerta vidriada vertical con marco blanco
  bx(g, .04, .15, 12.4, .1, 2.45, 2.05, '#e8e8e6');
  bx(g, .08, .22, 12.4, .06, 2.3, 1.88, '#28343e');
  bx(g, .1, .22, 12.4, .05, 2.3, .07, '#e8e8e6');                 // parante central blanco
  bx(g, .1, .25, 11.9, .04, 2.2, .45, '#4b79a6');                 // vinilo vertical celeste/azul en el vidrio
  putLogo(.07, 3.12, 12.4, 2.5, .62, Math.PI / 2);                // logo "|≡Pilates Gym≡|" arriba del ventanal

  // ---- 4) Volumen sur color salmón/durazno con frente curvo (arco) y techo a dos aguas de chapa (z = 15.2..22.8) ----
  const SALMON = '#e2a38e', WH = '#f3f2ee';
  bx(g, -5.5, 0, 19.0, 11.0, 3.85, 7.6, SALMON);
  bx(g, .03, 0, 19.0, .12, 1.15, 7.6, WH);                        // zócalo alto blanco en el frente
  // Frontón curvo (arco rebajado) color salmón con borde blanco sobre Entre Ríos
  for (let k = -7; k <= 7; k++){
    const u = k / 7.5, dz = u * 3.7, ah = Math.sqrt(Math.max(0, 1 - u * u)) * 1.25;
    bx(g, -.18, 3.85, 19.0 + dz, .36, ah, .54, SALMON);
    bx(g, -.14, 3.85 + ah, 19.0 + dz, .42, .14, .56, WH);         // moldura blanca siguiendo el arco
  }
  bx(g, .03, 4.15, 19.0, .08, .72, .22, '#c4836e');               // ranura vertical decorativa en la cumbrera
  // Puerta/ventanal triple con cuadrícula blanca y afiches en la parte baja
  bx(g, .05, 0, 19.0, .1, 2.55, 2.75, WH);
  bx(g, .09, .85, 19.0, .06, 1.6, 2.55, '#2c3842');
  bx(g, .09, .1, 18.15, .06, .7, .75, '#c85a48'); bx(g, .09, .1, 19.0, .06, .7, .75, '#4878a8'); bx(g, .09, .1, 19.85, .06, .7, .75, '#5a9a68');
  for (const dz of [-.85, 0, .85]) bx(g, .11, 0, 19.0 + dz, .05, 2.5, .07, WH);
  for (const y of [.82, 1.65, 2.15]) bx(g, .11, y, 19.0, .05, .06, 2.6, WH);
  // Techo largo de chapa oxidada a dos aguas detrás del frontón
  gableIn(g, -5.6, 3.85, 16.2, 10.6, 1.45, 13.2, '#8f634d', 0);
  // Bicicletero negro en la vereda frente a la entrada
  for (let k = 0; k < 5; k++) poleIn(g, [.75, 0, 15.2 + k * .35], [.75, .42, 15.2 + k * .35], .025, '#22252a');
  poleIn(g, [.55, .05, 15.1], [.55, .05, 16.7], .03, '#22252a'); poleIn(g, [.95, .05, 15.1], [.95, .05, 16.7], .03, '#22252a');
  // Vereda de cemento frente al gimnasio sobre Entre Ríos
  flat.rect(x1 - .2, z0, x1 + 2.6, z0 + 23.0, .205, '#bdb6a8');

  // ---- 5) Edificio blanco con franjas celestes/azules contiguo sobre La Rioja (x = -9.4..-19.0, Foto 2 derecha) ----
  const BLUE = '#2878c4';
  bx(g, -14.2, 0, 5.5, 9.6, 5.1, 11.0, '#f5f6f8');
  bx(g, -14.2, 3.05, -.05, 9.7, .26, .16, BLUE);                  // cornisa azul horizontal a media altura
  bx(g, -14.2, 4.95, -.04, 9.7, .18, .14, BLUE);                  // borde superior azul
  for (const lx of [-9.55, -13.3, -15.8, -18.85]) bx(g, lx, 0, -.05, .36, 3.1, .14, BLUE);   // pilastras azules planta baja
  for (const lx of [-10.8, -14.8, -18.85]) bx(g, lx, 3.3, -.04, .18, 1.7, .1, BLUE);         // franjas finas azules planta alta
  // Puerta doble de madera verde oliva a la derecha (x = -14.55)
  bx(g, -14.55, 0, -.06, 1.75, 2.55, .12, '#586c4b');
  bx(g, -14.55, 1.15, -.1, 1.5, 1.15, .05, '#2b3830');
  bx(g, -14.55, 0, -.12, .06, 2.55, .04, '#3f5036');

  colLocal(g, -19.2, 0, .3, 23.0, '#e2a38e');
  mapLabels.push([x1 - 5, z0 + 12, 'Pilates Gym']);
}

// "Diablito Bar" (esquina de Jujuy 781 y Av. Centenario 768 — esquina NO de la manzana (5,5), con mesas, banquetas y lucecitas afuera)
{
  const [x0, z0] = inner(5, 5);   // x0 = 13.5 (sobre Av. Centenario, mira al -x), z0 = -137.0 (sobre Jujuy, mira al -z)
  // Vereda amplia de baldosas rojizas/terracota en toda la esquina y ochava (sin superposición en la esquina ni hueco en la puerta)
  flat.rect(x0 - 3.8, z0 - 2.6, x0 + 21.5, z0 + 2.2, .204, '#b8826e');
  flat.rect(x0 - 3.8, z0 + 2.2, x0 + 2.2, z0 + 15.5, .204, '#b8826e');
  flat.tri([x0 + 2.2, z0 + 2.2], [x0 + 5.3, z0 + 2.2], [x0 + 2.2, z0 + 5.3], .204, '#b8826e');
  const g = group(x0 + 1.4, z0 + 1.4);   // (0,0) = esquina NO del edificio; +x = este por Jujuy, +z = sur por Av. Centenario
  const CH = 3.8, BRICK = '#b86b52', BRICK_D = '#944e38', WH = '#f0ede5', ROOF_R = '#b9483e';
  const foot = [[CH, 0], [12.2, 0], [12.2, 12.6], [0, 12.6], [0, CH]];
  const extrudeIn = (poly, y0, h, col) => {
    const sh = new THREE.Shape(poly.map(([x, z]) => new THREE.Vector2(x, -z)));
    const geo = new THREE.ExtrudeGeometry(sh, { depth: h, bevelEnabled: false }).rotateX(-Math.PI / 2);
    const m = new THREE.Mesh(geo, lam({ color: col })); m.position.y = y0; m.castShadow = m.receiveShadow = true; g.add(m); return m;
  };
  // Planta baja de ladrillo visto, faja superior blanca y cornisa antigua escalonada de ladrillo
  extrudeIn(offsetPoly(foot, .06), 0, .35, BRICK_D);
  extrudeIn(foot, .35, 2.45, BRICK);
  extrudeIn(foot, 2.8, 1.55, WH);
  extrudeIn(offsetPoly(foot, .14), 4.35, .22, BRICK);
  extrudeIn(offsetPoly(foot, .24), 4.57, .24, BRICK_D);
  extrudeIn(offsetPoly(foot, .12), 4.81, .22, BRICK);
  extrudeIn(offsetPoly(foot, -.2), 5.03, .1, '#7a756c');
  // Alero perimetral continuo de chapa roja inclinada envolviendo Jujuy, la ochava y Av. Centenario
  g.add(frustumMesh(offsetPoly(foot, 1.45), offsetPoly(foot, .04), 2.15, .72, ROOF_R));
  // Pilares blancos en los extremos de la ochava
  for (const [px, pz] of [[CH, -.06], [-.06, CH]]) bx(g, px, 0, pz, .32, 4.35, .32, WH);

  // Puerta en la ochava con reja, aire acondicionado arriba y cartel de "DIABLITO BAR"
  const och = group(0, 0); g.add(och); och.position.set(CH / 2, 0, CH / 2); och.rotation.y = -Math.PI * 3 / 4;
  bx(och, 0, 0, .05, 1.5, 2.18, .12, '#3b261c');
  for (let k = -2; k <= 2; k++) bx(och, k * .28, .05, .13, .04, 2.1, .04, '#d8d2c8');
  for (const y of [.55, 1.1, 1.65]) bx(och, 0, y, .13, 1.35, .04, .04, '#d8d2c8');
  // Aire acondicionado split blanco sobre el alero de la ochava
  bx(och, 0, 3.1, .18, .85, .52, .34, '#f4f4f2');
  cylIn(och, -.15, 3.36, .36, .18, .04, '#2a2e33', Math.PI / 2).rotation.set(Math.PI / 2, 0, 0);
  // Un solo cartel de Diablito Bar en la ochava
  signIn(och, 'DIABLITO BAR', 0, 3.92, .16, 3.4, .58, '#1b1212', '#ffcf38');

  // Ventanas con rejas y maceteros sobre Jujuy (z = 0) y sobre Av. Centenario (x = 0)
  const barWin = (wx, wz, alongX) => {
    const sx = alongX ? 1.55 : .12, sz = alongX ? .12 : 1.55;
    bx(g, wx, .85, wz, sx, 1.25, sz, '#241e1c');
    bx(g, wx, .72, wz + (alongX ? -.12 : 0), alongX ? 1.7 : .24, .14, alongX ? .24 : 1.7, BRICK_D);
    for (let k = -2; k <= 2; k++){
      const ox = alongX ? k * .3 : -.08, oz = alongX ? -.08 : k * .3;
      bx(g, wx + ox, .85, wz + oz, .04, 1.25, .04, '#cfc9be');
    }
  };
  barWin(5.8, -.04, true);  barWin(9.3, -.04, true);     // 2 ventanas sobre Jujuy
  barWin(-.04, 5.8, false); barWin(-.04, 9.4, false);    // 2 ventanas sobre Av. Centenario

  // Extensión blanca hacia el este sobre Jujuy con alero verde menta y columnas finas (Foto 1 izquierda)
  bx(g, 16.4, 0, 5.5, 8.4, 4.4, 11.0, WH);
  bx(g, 16.4, 4.4, 5.5, 8.6, .45, 11.2, BRICK);
  bx(g, 14.8, 0, -.05, 2.2, 2.3, .12, '#d8ceb8');        // puerta doble beige
  bx(g, 12.9, 0, -.05, .95, 2.2, .12, '#3a4a3e');
  // Alero verde menta sobre la vereda de Jujuy con 2 caños de soporte
  bx(g, 14.5, 2.42, -1.55, 4.4, .22, 3.1, '#8fb49c');
  for (const px of [12.5, 16.5]) poleIn(g, [px, 0, -2.95], [px, 2.42, -2.95], .045, '#5e7e68');

  // Rejitas bajas negras (corralitos) en el borde de la vereda junto al cordón (Fotos 1 y 2)
  const lowRail = (ax, az, bx2, bz) => {
    poleIn(g, [ax, 0, az], [ax, .75, az], .03, '#22252a'); poleIn(g, [bx2, 0, bz], [bx2, .75, bz], .03, '#22252a');
    poleIn(g, [ax, .75, az], [bx2, .75, bz], .025, '#22252a'); poleIn(g, [ax, .18, az], [bx2, .18, bz], .02, '#22252a');
  };
  lowRail(3.2, -3.1, 7.6, -3.1); lowRail(-3.2, 4.5, -3.2, 8.6);

  // ---- Mesas y banquetas de bar afuera (sobre la vereda de la ochava, Jujuy y Av. Centenario) ----
  const addBarTable = (tx, tz) => {
    // Mesa de bar con pata central negra, tapa de madera y vasitos/botella encima
    poleIn(g, [tx, .2, tz], [tx, .92, tz], .05, '#22252a');
    bx(g, tx, .2, tz, .48, .04, .48, '#22252a');
    cylIn(g, tx, .94, tz, .48, .05, '#7c4c2b');
    cylIn(g, tx - .12, 1.06, tz + .08, .045, .18, '#2e6b34');        // botella
    cylIn(g, tx + .14, 1.02, tz - .06, .04, .1, '#f5d46b');          // vaso de cerveza
    cylIn(g, tx + .04, 1.02, tz + .16, .04, .1, '#f5d46b');
    // 4 banquetas altas (taburetes) alrededor de cada mesa
    for (const [dx, dz] of [[-.68, 0], [.68, 0], [0, -.68], [0, .68]]){
      const sx = tx + dx, sz = tz + dz;
      for (const [lx, lz] of [[-.11, -.11], [.11, -.11], [-.11, .11], [.11, .11]])
        poleIn(g, [sx + lx, .2, sz + lz], [sx + lx * .8, .66, sz + lz * .8], .02, '#22252a');
      cylIn(g, sx, .68, sz, .18, .045, '#8c5834');
    }
    addCol(x0 + 1.4 + tx - .85, z0 + 1.4 + tz - .85, x0 + 1.4 + tx + .85, z0 + 1.4 + tz + .85);
  };
  // Mesas distribuidas sobre las veredas laterales (dejando libre la esquina de la ochava)
  for (const [tx, tz] of [
    [5.2, -1.8], [8.8, -1.8],                                          // vereda sobre Jujuy
    [-2.1, 5.2], [-2.1, 8.6], [-2.1, 11.6]                             // vereda ancha sobre Av. Centenario
  ]) addBarTable(tx, tz);

  // ---- Guirnaldas de lucecitas cálidas colgando sobre las mesas de afuera ----
  const posts = [[3.8, -3.1], [7.2, -3.1], [10.6, -3.1], [-3.4, 3.8], [-3.4, 7.6], [-3.4, 11.8]];
  for (const [px, pz] of posts) poleIn(g, [px, .2, pz], [px, 3.05, pz], .035, '#22252a');
  const stringLights = (ax, ay, az, bx2, by, bz, n = 9) => {
    const pts = [];
    for (let k = 0; k <= n; k++){
      const t = k / n, sag = Math.sin(t * Math.PI) * .32;
      const lx = ax + (bx2 - ax) * t, ly = ay + (by - ay) * t - sag, lz = az + (bz - az) * t;
      pts.push([lx, ly, lz]);
      if (k > 0 && k < n){
        // Foquito cálido colgante
        balls.add(x0 + 1.4 + lx, ly - .06, z0 + 1.4 + lz, .09, .09, .09, 0, k % 2 === 0 ? '#ffe380' : '#ffb84d');
      }
    }
    for (let k = 0; k < pts.length - 1; k++) poleIn(g, pts[k], pts[k + 1], .012, '#22252a');
  };
  // Tiras de lucecitas sobre las mesas de Jujuy y Av. Centenario
  stringLights(3.8, 2.85, -.3, 3.8, 3.0, -3.1, 7);
  stringLights(7.2, 2.85, -.3, 7.2, 3.0, -3.1, 7);
  stringLights(10.6, 2.85, -.3, 10.6, 3.0, -3.1, 7);
  stringLights(3.8, 3.0, -3.1, 7.2, 3.0, -3.1, 8);
  stringLights(7.2, 3.0, -3.1, 10.6, 3.0, -3.1, 8);
  stringLights(-.3, 2.85, 3.8, -3.4, 3.0, 3.8, 7);
  stringLights(-.3, 2.85, 7.6, -3.4, 3.0, 7.6, 7);
  stringLights(-.3, 2.85, 11.6, -3.4, 3.0, 11.8, 7);
  stringLights(-3.4, 3.0, 3.8, -3.4, 3.0, 7.6, 8);
  stringLights(-3.4, 3.0, 7.6, -3.4, 3.0, 11.8, 8);
  // Luz cálida puntual iluminando las mesas del bar
  const barLight = new THREE.PointLight(0xffb84d, .85, 18);
  barLight.position.set(x0 - .5, 3.2, z0 - .5); scene.add(barLight);

  colLocal(g, 0, 0, 20.6, 12.6, '#b86b52');
  mapLabels.push([x0 + 7, z0 + 6, 'Diablito Bar']);
}

// =========================================================================
// Av. Centenario lado este, de Diablito Bar hacia la esquina de Dr. Brunet (fotos de Street View del usuario, en orden):
// 1 local viejo con parapeto de hormigón con relieves, alerito de tejas, persiana blanca y cortina metálica oxidada ·
// 2 casa con galería de techo de tejas, pilares de ladrillo y pared naranja · 3 casa blanca con ladrillo, puerta de vidrio y terraza
// con paneles blancos · 4 casa beige baja con cornisa, galería con persianas y portón de chapa oxidada con enredadera ·
// 5 casona verde y blanca con local vidriado, toldo gris, ojo de buey y zócalo de laja · 6 casa vieja blanca con molduras,
// tramo gris con reja de rombos, puerta roja y cochera · 7 casita blanca con porche hundido ·
// 8 esquina con ochava: toldo verde sobre postes, ventanas con reja de rombos y frente largo sobre Dr. Brunet; cartel de la esquina.
// =========================================================================
{
  const XE = 13.5;
  // local: frente en z = 0 sobre la línea municipal, +z = hacia la avenida (-x), +x = hacia Dr. Brunet (+z) = la derecha en las fotos
  const casaE = (z0, z1) => { const zc = (z0 + z1) / 2; return { g: group(XE, zc, -Math.PI / 2), w: z1 - z0, zc, Wd: (lx, lz) => [XE - lz, zc + lx] }; };
  const body = (g, x0, x1, d0, d1, h, col) => { bx(g, (x0 + x1) / 2, 0, -(d0 + d1) / 2, x1 - x0, h, d1 - d0, col); colLocal(g, x0, -d1, x1, -d0, col); };
  const rejaV = (g, x, y0, z, w, h, col, step = .13) => { for (let k = 1; k < Math.round(w / step); k++) bx(g, x - w / 2 + k * step, y0, z, .03, h, .03, col); for (const y of [y0, y0 + h - .04]) bx(g, x, y, z, w + .04, .04, .04, col); };
  const romboTex = (() => { const c = document.createElement('canvas'); c.width = c.height = 64; const x = c.getContext('2d'); x.strokeStyle = '#ffffff'; x.lineWidth = 6; x.beginPath(); x.moveTo(0, 0); x.lineTo(64, 64); x.moveTo(64, 0); x.lineTo(0, 64); x.stroke(); const t = new THREE.CanvasTexture(c); t.wrapS = t.wrapT = THREE.RepeatWrapping; return t; })();
  const rombos = (g, x, y0, z, w, h, col) => {   // ventana con reja de rombos (textura recortada al marco)
    bx(g, x, y0, z, w, h, .03, '#3b4a55');
    const t = romboTex.clone(); t.needsUpdate = true; t.repeat.set(w / .35, h / .35);
    const m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), new THREE.MeshLambertMaterial({ map: t, color: col, transparent: true, alphaTest: .5 })); m.position.set(x, y0 + h / 2, z + .04); g.add(m);
    bx(g, x, y0 - .06, z + .02, w + .14, .08, .08, col); bx(g, x, y0 + h - .02, z + .02, w + .14, .08, .08, col); for (const s of [-1, 1]) bx(g, x + s * (w / 2 + .03), y0, z + .02, .08, h, .08, col);
  };
  const ventana = (g, x, y0, z, w, h, marco = '#e6e3dc', rej = null) => { bx(g, x, y0 - .07, z + .02, w + .18, h + .14, .06, marco); bx(g, x, y0, z + .04, w, h, .04, '#3b4a55'); if (rej) rejaV(g, x, y0, z + .1, w, h, rej); };
  const persiana = (g, x, y0, z, w, h, col = '#dcd4c2', lin = '#c2b9a4') => { bx(g, x, y0 - .07, z + .02, w + .16, h + .14, .06, '#e6e3dc'); bx(g, x, y0, z + .05, w, h, .04, col); for (let y = y0 + .1; y < y0 + h - .05; y += .11) bx(g, x, y, z + .075, w, .02, .01, lin); };
  const puerta = (g, x, z, w, h, col) => { bx(g, x, 0, z + .02, w + .14, h + .07, .06, '#e6e3dc'); bx(g, x, 0, z + .05, w, h, .06, col); bx(g, x + w * .33, h * .45, z + .1, .06, .06, .06, '#c9a227'); };
  const pasto = (za, zb, col = '#7d8a4a') => flat.rect(9, za, 10.6, zb, .205, col);   // franja de tierra/pasto junto al cordón
  const arbol = (z, s = 1) => addTree(9.8, z, s, false, ['#a0642c', '#8a5a2b', '#9c6b35', '#6d843a']);
  const LADR = '#b5603a', MANCHA = '#cfc9bb';

  // 1) local viejo: parapeto de hormigón con relieves geométricos, alerito de tejas, persiana blanca, cortina metálica oxidada, puerta con vidrio
  { const { g, w, zc } = casaE(-123, -114.4);   // w = 8.6 · local -4.3..4.3
    body(g, -w / 2, w / 2, 0, 12, 3.1, '#e9e6de');
    bx(g, 0, 0, .03, w, .5, .06, LADR); bx(g, -4.1, 0, .04, .4, 3.0, .08, '#9a5a40'); bx(g, 4.0, 0, .04, .6, 3.0, .08, LADR);
    boxIn(g, 0, 3.05, .25, w + .2, .1, .6, '#b5483a', -.3);                                          // alerito de tejas
    bx(g, -.3, 3.1, -.1, 7.8, 1.9, .3, '#b9b5aa');                                                   // parapeto de hormigón
    for (const x of [-3.6, -2.0, -.3, 1.4, 3.0]) bx(g, x, 3.1, .07, .25, 1.9, .06, '#a7a397');
    for (const x of [-1.15, 2.2]) boxIn(g, x, 4.05, .07, .7, .7, .05, '#a7a397', 0, Math.PI / 4);   // rombos en relieve
    bx(g, -.3, 2.3, .02, 7.4, .6, .04, '#f2f1ec');
    persiana(g, -2.6, .7, 0, 1.6, 1.4, '#f2f1ec', '#d9d6cf');
    bx(g, .3, .05, .04, 2.9, 2.6, .06, '#8a6a52'); for (let y = .15; y < 2.6; y += .13) bx(g, .3, y, .08, 2.9, .03, .02, '#6f5340');   // cortina metálica oxidada
    puerta(g, 2.75, 0, .8, 2.2, '#f2f2ee'); bx(g, 2.75, .9, .1, .5, 1.1, .02, '#3b4a55');
    for (const [x, y, ww, hh] of [[-3.2, 1.9, .8, .6], [1.9, .6, .5, 1.2], [-1.2, .5, .6, .4]]) bx(g, x, y, .06, ww, hh, .02, MANCHA);
    pasto(-123, -114.4, '#8f7a5a'); arbol(zc + 2.8, 1.0);
  }
  // 2) casa con galería: techo de tejas a un agua sobre la galería, pilares y murito de ladrillo, pared naranja, puerta de madera
  { const { g, w, zc } = casaE(-114.4, -106.4);   // w = 8
    body(g, -w / 2, w / 2, 2.6, 12, 3.3, '#e89a3c');
    boxIn(g, 0, 3.0, -1.3, w + .3, .14, 3.0, '#b5483a', -.32);                                       // techo de tejas de la galería
    for (let k = 0; k < 18; k++) boxIn(g, -w / 2 + .2 + k * w / 18, 3.08, -1.3, .07, .1, 3.0, '#9a3a2e', -.32);
    for (const x of [-3.85, -1.2, 1.5, 3.85]) bx(g, x, 0, -.2, .45, 2.75, .45, LADR);
    bx(g, 2.7, 0, -.2, 2.3, .55, .3, LADR); bx(g, -2.5, 0, -.2, 2.2, .55, .3, LADR);
    puerta(g, -2.5, -2.6, .9, 2.2, '#7a4a30');
    bx(g, 1.3, .9, -2.56, 1.8, 1.3, .05, '#e9dcc8'); bx(g, 1.3, .85, -2.53, 2.0, .06, .06, '#7a4a30');   // ventana con cortinas
    bx(g, .6, 0, -1.6, 1.6, .45, .45, '#7a5a3a');                                                    // banco
    for (const x of [2.4, -.4]) { cylIn(g, x, .2, -1.0, .2, .4, '#b5603a'); }
    rectAt(g, -w / 2, 0, w / 2, -2.6, '#b8826e');
    colLocal(g, -4.1, -.45, -3.6, 0, null); colLocal(g, 3.6, -.45, 4.1, 0, null);
    pasto(-114.4, -106.4, '#8f7a5a');
  }
  // 3) casa blanca con base y fajas de ladrillo, ventana, puerta de vidrio de aluminio y terraza arriba con paneles blancos
  { const { g, w, zc } = casaE(-106.4, -99.4);   // w = 7
    body(g, -w / 2, w / 2, 0, 12, 3.2, '#f0eee8');
    bx(g, 0, 0, .03, w, .9, .06, LADR); bx(g, 0, 2.75, .03, w, .45, .06, LADR);
    ventana(g, -1.7, 1.0, 0, 1.4, 1.4); bx(g, -.1, 2.2, .2, .8, .5, .3, '#efefec');
    bx(g, 1.7, 0, .03, 1.9, 2.4, .05, '#d9dcdf'); for (const x of [1.0, 1.7, 2.4]) bx(g, x, 0, .07, .05, 2.4, .03, '#b9bec2'); bx(g, 1.7, 1.9, .07, 1.9, .04, .03, '#b9bec2');
    bx(g, 1.7, 0, .3, 2.1, .18, .5, '#c9c6bd');                                                      // escalón
    for (const x of [-2.4, -.8, .8, 2.4]) bx(g, x, 3.2, -.05, 1.5, 1.05, .05, '#f4f4f2');            // paneles blancos de la terraza
    bx(g, 0, 3.2, -.05, w, .1, .1, '#e2dfd8');
    bx(g, .5, 3.2, -6.5, 6, 3.0, 7, '#c9764a'); bx(g, .5, 6.2, -6.5, 6.2, .14, 7.2, '#e2dfd8');      // planta alta de ladrillo naranja, retirada
    bx(g, -1.6, 4.2, -2.98, 1.2, 1.1, .05, '#3b4a55');
    pasto(-106.4, -99.4, '#8f7a5a'); arbol(zc + .6, 1.05);
  }
  // 4) casa beige baja con cornisa de hormigón, ventana con persiana de madera, galería hundida, puerta de vidrio y portón de chapa oxidada
  { const { g, w, zc } = casaE(-99.4, -89.4);   // w = 10 · local -5..5
    const BE = '#e6dcc6';
    body(g, -w / 2, -2.3, 0, 12, 3.1, BE); body(g, -2.3, .4, 1.6, 12, 3.1, '#e9dfc9'); body(g, .4, 2.2, 0, 12, 3.1, BE);
    bx(g, -1.4, 2.85, -.3, 7.4, .28, .9, '#cdbf9e');                                                 // cornisa de hormigón
    persiana(g, -3.7, .85, 0, 1.8, 1.3, '#9a6a45', '#7a4f30');
    persiana(g, -.95, .85, -1.6, 1.5, 1.2, '#9a6a45', '#7a4f30'); bx(g, -.95, 2.25, -1.52, .7, .4, .25, '#efefec');
    rectAt(g, -2.3, 0, .4, -1.6, '#cfc6b4');
    puerta(g, 1.25, 0, .85, 2.2, '#e9e9e6'); bx(g, 1.25, .2, .1, .55, 1.8, .02, '#3b4a55'); bx(g, .7, 2.0, .06, .2, .2, .05, '#e9e9e6');
    bx(g, 3.6, 0, -.1, 2.8, 2.2, .08, '#a06a48'); for (let x = 2.4; x < 5; x += .3) bx(g, x, 0, -.04, .04, 2.2, .03, '#8a5638');   // portón de chapa oxidada
    bx(g, 3.6, 1.1, -.04, 2.8, .05, .04, '#7a4a30'); colLocal(g, 2.2, -.2, w / 2, 0, null);
    bx(g, 4.85, 0, -6, .3, 3.6, 12, '#e8e8e0');                                                      // pared lateral de la casona (con enredadera)
    for (let k = 0; k < 14; k++) crowns.add(XE + .2 + (k % 4) * .9, R(2.4, 3.6), zc + 4.65, .7, .6, .35, R(0, 6), pick(['#3f6b2a', '#4c7a30', '#55803a']));   // enredadera asomando sobre el portón
    pasto(-99.4, -89.4, '#6f8f45'); arbol(zc - .5, 1.05);
  }
  // 5) casona verde y blanca: local vidriado con toldo gris y ojo de buey, puertas de madera verdosa, molduras verdes y zócalo de laja
  { const { g, w, zc } = casaE(-89.4, -76.4);   // w = 13 · local -6.5..6.5
    const VE = '#7ccf6a', BL = '#eef0e8', LAJA = '#a89880';
    body(g, -w / 2, w / 2, 0, 12, 4.2, BL);
    bx(g, 0, 3.85, .04, w, .35, .1, VE); bx(g, 0, 4.2, -.05, w + .1, .12, .3, '#5fb04f');
    for (const x of [-6.35, -3.0, 1.0, 6.35]) bx(g, x, .6, .04, .3, 3.25, .1, VE);
    bx(g, 0, 0, .05, w, .6, .08, LAJA); for (let x = -6.2; x < 6.4; x += .55) bx(g, x, R(.05, .4), .1, R(.3, .5), .18, .02, pick(['#8f8070', '#b9aa92', '#9c8d78']));
    bx(g, -4.65, 2.6, .04, 3.0, .7, .06, VE);                                                       // paño verde sobre el local
    bx(g, -4.65, .6, .04, 2.6, 2.0, .06, '#2e3a44'); for (const x of [-5.5, -4.65, -3.8]) bx(g, x, .6, .08, .04, 2.0, .03, '#9aa3aa');   // vidriera
    boxIn(g, -4.65, 2.55, .45, 3.0, .06, .9, '#b9bec2', -.35);                                       // toldo gris
    cylIn(g, -4.65, 3.4, .08, .32, .08, VE, Math.PI / 2).rotation.set(Math.PI / 2, 0, 0); cylIn(g, -4.65, 3.4, .12, .22, .04, '#2e3a44', Math.PI / 2).rotation.set(Math.PI / 2, 0, 0);   // ojo de buey
    bx(g, -6.0, .8, .12, .55, .45, .25, '#efefec');                                                  // aire acondicionado
    puerta(g, -1.6, 0, 1.0, 2.6, '#7f8f7a');
    puerta(g, 2.3, 0, 1.0, 2.6, '#4f8f6a'); bx(g, 2.3, 2.75, .06, 1.4, .3, .08, VE);
    persiana(g, 4.2, 1.0, 0, 1.0, 1.6, '#f2f2ee', '#d9d6cf'); bx(g, 4.2, 2.75, .06, 1.4, .3, .08, VE);
    puerta(g, 5.6, 0, .85, 2.6, '#4f8f6a');
    for (const x of [1.6, 4.95]) { bx(g, x, 2.1, .1, .14, .25, .14, '#3a3a3a'); }                   // faroles
    pasto(-89.4, -76.4, '#8f7a5a'); arbol(zc - 2.5, 1.1); arbol(zc + 4.2, 1.05);
    { const [x, z] = [10.2, zc + .8]; const cg = group(x, z); poleIn(cg, [0, 0, 0], [0, .7, 0], .03, '#3a3a3a'); bx(cg, 0, .7, 0, .9, .5, .5, '#4a5a4a'); addCol(x - .1, z - .1, x + .1, z + .1); }   // cesto
  }
  // 6) casa vieja blanca con molduras y relieves arriba, ventana con persiana y reja, tramo gris con reja de rombos, puerta roja y cochera
  { const { g, w, zc } = casaE(-76.4, -65.4);   // w = 11 · local -5.5..5.5
    body(g, -w / 2, w / 2, 0, 12, 4.0, '#f0efea');
    bx(g, -.5, .05, .04, 3.0, 3.6, .05, '#c9c7c4');                                                  // tramo gris
    bx(g, 0, 3.55, .06, w, .12, .12, '#dcd9d2'); bx(g, 0, 3.95, .03, w + .1, .15, .2, '#dcd9d2');
    for (const x of [-4, -1.5, 1.5, 4]) bx(g, x, 3.0, .06, 1.6, .18, .08, '#d6d3cc');                // relieves alargados
    bx(g, 0, 0, .05, w, .5, .07, '#b5a38a');
    persiana(g, -4.3, .9, 0, 1.3, 1.4, '#f2f2ee', '#d9d6cf'); rejaV(g, -4.3, .9, .12, 1.3, 1.4, '#6a6a6a');
    puerta(g, -3.0, 0, .8, 2.3, '#e9e6de');
    rombos(g, -.5, .8, .03, 1.6, 1.5, '#5a5a5a');
    ventana(g, 1.8, 1.0, 0, 1.0, 1.3, '#e6e3dc', '#5a5a5a');
    puerta(g, 3.0, 0, .8, 2.2, '#b03a2a');
    bx(g, 4.55, 0, .04, 1.8, 2.3, .06, '#c8cccf'); bx(g, 4.55, 0, .08, .04, 2.3, .02, '#a9adb0'); for (const x of [4.1, 5.0]) bx(g, x, 1.6, .08, .5, .25, .02, '#3b4a55');
    for (const [x, y, ww, hh] of [[-2.2, .6, .7, .9], [.9, 2.4, 1.1, .4], [3.8, .5, .5, .7]]) bx(g, x, y, .06, ww, hh, .02, MANCHA);
    pasto(-76.4, -65.4, '#6f8f45'); arbol(zc - 3.4, 1.0); arbol(zc + 3.0, 1.05);
  }
  // 7) casita blanca baja con cornisa, ventana con reja y porche hundido con puerta de madera y ventana con persiana
  { const { g, w, zc } = casaE(-65.4, -60.4);   // w = 5 · local -2.5..2.5
    body(g, -w / 2, -.1, 0, 6, 3.4, '#f0eee8'); body(g, -.1, w / 2, 1.8, 6, 3.4, '#e9d9b8');
    bx(g, 0, 3.15, -.2, w + .1, .2, .7, '#dcd9d2');
    ventana(g, -1.3, 1.0, 0, 1.3, 1.25, '#e6e3dc', '#3a3a3a');
    puerta(g, .55, -1.8, .85, 2.2, '#7a4a30'); persiana(g, 1.8, 1.0, -1.8, 1.0, 1.1);
    bx(g, 1.2, 0, -.1, 2.6, .7, .2, '#f0eee8'); rectAt(g, -.1, 0, w / 2, -1.8, '#cfc6b4');
    colLocal(g, -.1, -.3, w / 2, 0, null);
  }
  // 8) esquina con ochava: casa crema manchada, toldo verde sobre postes, ventanas con reja de rombos y frente largo sobre Dr. Brunet
  {
    const ZB = -55.5, CR = '#e6dcc4', H = 3.6;
    const foot = [[13.5, -60.4], [13.5, -58], [16, ZB], [32, ZB], [32, -64.5], [19.5, -64.5], [19.5, -60.4]];
    extrudePoly(foot, 0, H, CR); extrudePoly(foot, H, .16, '#d9cfb6');
    addCol(13.5, -60.4, 19.5, -58); addCol(14.7, -58.6, 32, ZB); addCol(19.5, -64.5, 32, -58); mapRects.push([13.5, -64.5, 32, ZB, CR]);
    bx(group(0, 0), 15.2, H + .16, -59.5, 1.2, .9, 1.0, CR);                                          // remate sobre el frente
    // frente a la avenida (2,4 m): puerta con reja blanca y ventana con reja de rombos
    { const g = group(XE, -59.2, -Math.PI / 2);
      puerta(g, -.6, 0, .85, 2.2, '#efefea'); rejaV(g, -.6, 0, .1, .85, 2.2, '#f4f4f2', .1);
      rombos(g, .55, .9, .02, .8, 1.2, '#7a4a30');
      for (const [x, y, ww, hh] of [[.2, .1, .9, .7], [-1, 1.8, .5, .5]]) bx(g, x, y, .03, ww, hh, .02, '#cfc3a6'); }
    // ochava con ventana grande con reja de rombos
    { const g = group(14.75, -56.75, -Math.PI / 4); rombos(g, 0, .7, .03, 1.7, 1.6, '#7a4a30'); bx(g, .7, 0, .03, .6, .6, .02, '#cfc3a6'); }
    // frente sobre Dr. Brunet (mira al +z)
    { const g = group(0, ZB, 0);
      ventana(g, 18.2, 1.0, 0, 1.2, 1.2, '#e6e3dc', '#3a3a3a'); puerta(g, 20.3, 0, .85, 2.2, '#e9e9e6');
      bx(g, 22.4, 0, .03, 1.6, 2.3, .05, '#d9dcdf'); for (const x of [21.8, 22.4, 23.0]) bx(g, x, 0, .07, .04, 2.3, .03, '#b9bec2');
      ventana(g, 24.8, 1.0, 0, 1.2, 1.2, '#e6e3dc', '#3a3a3a'); puerta(g, 27.0, 0, .9, 2.2, '#e0a23a'); puerta(g, 29.4, 0, .85, 2.2, '#efefea'); ventana(g, 31, 1.0, 0, .9, 1.2, '#e6e3dc', '#3a3a3a');
      for (const [x, y, ww, hh] of [[17, .2, 1.2, .6], [26, .3, .8, .8], [30.2, 1.5, .6, .4]]) bx(g, x, y, .03, ww, hh, .02, '#cfc3a6'); }
    // toldo verde de chapa sobre postes en la vereda de la avenida (delante del porche de la casita y de la esquina)
    { const g = group(0, 0);
      bx(g, 12.2, 2.75, -60.5, 2.7, .08, 5.6, '#3f8a5a'); for (const z of [-63.2, -60.5, -57.8]) { poleIn(g, [10.95, 0, z], [10.95, 2.75, z], .05, '#2f6b45'); addCol(10.85, z - .1, 11.05, z + .1); }
      poleIn(g, [10.95, 2.75, -63.3], [10.95, 2.75, -57.7], .04, '#2f6b45'); for (const z of [-63.2, -57.8]) poleIn(g, [10.95, 2.4, z], [13.5, 2.4, z], .035, '#2f6b45'); }
    // poste de luz de hormigón en la ochava y cartel de la esquina
    poles.add(12.6, 0, -56.4, .16, 8.5, .16, 0, '#bdb8ac'); addCol(12.45, -56.55, 12.75, -56.25);
    { const sg = group(10.6, -54.3); poleIn(sg, [0, 0, 0], [0, 3.0, 0], .05, '#2a3b6b');
      for (const s of [-1, 1]) signIn(sg, 'Av. Centenario  800 · 700', s * .03, 2.75, 0, 1.4, .3, '#1f3a8a', '#ffffff', s * Math.PI / 2);   // paralelo a la avenida
      for (const s of [-1, 1]) signIn(sg, 'Dr. Brunet', 0, 2.4, s * .03, 1.1, .28, '#1f3a8a', '#ffffff', s > 0 ? 0 : Math.PI);           // paralelo a Dr. Brunet
      addCol(10.5, -54.4, 10.7, -54.2); }
    pasto(-60.4, -55.5, '#6f8f45'); flat.rect(9, -55.5, 12.5, -53.5, .205, '#6f8f45');
  }
  pasto(-65.4, -60.4, '#6f8f45');
  plazaRects.push([13.5, -123, 36, -55.5]);   // sin árboles ni casas al azar en estos lotes
  function rectAt(g, lx0, lz0, lx1, lz1, col){   // piso dentro de un lote (en coordenadas locales del grupo)
    g.updateMatrixWorld(true); const a = new THREE.Vector3(lx0, 0, lz0).applyMatrix4(g.matrixWorld), b = new THREE.Vector3(lx1, 0, lz1).applyMatrix4(g.matrixWorld);
    flat.rect(Math.min(a.x, b.x), Math.min(a.z, b.z), Math.max(a.x, b.x), Math.max(a.z, b.z), .06, col);
  }
}

// SAMCo Peyrano (Tucumán 162, al oeste de Esc. Especial 2086)
{
  const g = group(-356, 253.5, Math.PI);
  bx(g, 0, 0, -7, 20, 4.6, 14, '#f5f6f7');
  bx(g, 0, 4.6, -7, 20.2, .55, 14.2, '#2573b8');
  bx(g, 0, 0, .03, 20.1, .5, .1, '#2573b8');
  bx(g, 1.5, 0, .05, 2.4, 2.5, .12, '#2b475c');
  bx(g, 7.2, 2.2, .08, .42, 1.35, .1, '#d62828');
  bx(g, 7.2, 2.66, .08, 1.35, .42, .1, '#d62828');
  for (const wx of [-2, 4]) bx(g, wx, 1.1, .05, 2.0, 1.5, .12, '#2b3c4a');
  signIn(g, 'SAMCo PEYRANO · CENTRO DE SALUD', 0, 4.05, .12, 14, .68, '#ffffff', '#2573b8');
  // Alero y ambulancia estacionada
  bx(g, -6, 3.2, 1.1, 6.4, .22, 3.0, '#dce6f0');
  bx(g, -6, 3.25, 2.62, 6.4, .28, .08, '#2573b8');
  for (const px of [-9, -3]) poleIn(g, [px, 0, 2.4], [px, 3.2, 2.4], .08, '#9aa4ad');
  const amb = makeCar(0xf8f9fa); g.add(amb.g); amb.g.position.set(-6, 0, 1.2); amb.g.rotation.y = Math.PI/2;
  bx(amb.g, 0, .62, 0, 1.96, .16, 2.8, '#d62828');
  bx(amb.g, -.3, 1.38, .3, .4, .14, .24, '#d62828'); bx(amb.g, .3, 1.38, .3, .4, .14, .24, '#1b64d8');
  colLocal(g, -10.2, -14.2, 10.2, .3, '#f5f6f7');
  colLocal(g, -8.5, .2, -3.5, 2.2);
  mapLabels.push([-356, 260, 'SAMCo']);
}

// E.E.S.O.P.I. N° 8135 (escuela secundaria, Dr. Brunet lado sur, enfrente de la Biblioteca) y las casas hasta la esquina de Santa Fe
// (fotos de Street View del usuario, en orden hacia la esquina; anchos de las huellas de edificios):
//  · escuela de dos plantas, blanca con textura de piedra, ventanas de marco verde con cortinas, entrada metida con puertas verdes y
//    alerito; en la vereda pasto, caminito de baldosas y barandas verdes con bicicletas
//  · local lila (librería / juguetería) con vidrieras, puerta y vidriera con carteles azules
//  · casa blanca con la planta alta de ladrillo, balcón con baranda, persianas de madera y techo de chapa
//  · portón de chapa blanco y tapial blanco
//  · casa de la esquina: dos plantas, esquina redondeada, zócalo de granito rosado, porch con reja y ventana roja sobre Brunet,
//    tres aberturas angostas sobre Santa Fe
{
  const g = group(0, 0), ZF = -39.5;   // línea municipal de Dr. Brunet (lado sur); el frente mira al -z
  const hsh = k => { const s = Math.sin(k * 57.3 + 9.1) * 43758.5453; return s - Math.floor(s); };
  const reja = (x0, x1, z, y0, h, col = '#2a2626') => { for (let x = x0 + .1; x < x1; x += .14) bx(g, x, y0, z, .03, h, .03, col); bx(g, (x0 + x1) / 2, y0 + h - .04, z, x1 - x0, .05, .05, col); };
  // bicicleta (ruedas en el plano local x-y; largo a lo largo del +x local)
  const ruedaBici = new THREE.TorusGeometry(.33, .025, 6, 18), ruedaBiciMat = lam({ color: 0x1d1d1d });
  const bici = (x, z, ry, col) => {
    const b = group(x, z, ry);
    for (const dx of [-.52, .52]){ const m = new THREE.Mesh(ruedaBici, ruedaBiciMat); m.position.set(dx, .35, 0); b.add(m); }
    poleIn(b, [-.52, .35, 0], [-.05, .78, 0], .02, col); poleIn(b, [-.05, .78, 0], [.42, .82, 0], .02, col); poleIn(b, [.42, .82, 0], [.52, .35, 0], .02, col);
    poleIn(b, [-.52, .35, 0], [.1, .35, 0], .02, col); poleIn(b, [.1, .35, 0], [-.05, .78, 0], .02, col); poleIn(b, [.1, .35, 0], [.42, .82, 0], .02, col);
    bx(b, -.08, .82, 0, .22, .05, .1, '#222222'); poleIn(b, [.42, .82, 0], [.4, .98, 0], .015, '#555555'); bx(b, .4, .98, 0, .05, .03, .5, '#333333');
  };
  const BICI_COLS = ['#2c5aa8', '#c0392b', '#1d1d1d', '#e67e22', '#7f8c8d', '#8e44ad', '#d9d9d9', '#27ae60', '#f1c40f'];

  // ---- vereda de la escuela: pasto, caminito de baldosas y barandas verdes con bicicletas ----
  const X0 = -250, X1 = -231.3, XE = -240.6;   // frente de la escuela y eje de la entrada
  flat.rect(-256, -42.9, X1, ZF, .2062, '#6f9a47');
  flat.rect(XE - 1.5, -43, XE + 1.5, ZF, .2072, '#d7d3c8');
  for (const [a, b] of [[-256, XE - 1.7], [XE + 1.7, X1 - .2]]){
    for (let x = a; x <= b + .01; x += 2.1) bx(g, Math.min(x, b), .2, -42.55, .06, 1.0, .06, '#5f9a4c');
    for (const y of [1.15, .65]) bx(g, (a + b) / 2, y, -42.55, b - a, .05, .05, '#5f9a4c');
    addCol(a, -42.65, b, -42.45);
  }
  [[-254.6, -40.9, .3], [-253.6, -41.2, -.2], [-252.4, -40.7, .1], [-249.6, -41.6, 0], [-248.5, -41.3, .2], [-246.1, -41.4, 0], [-244.9, -41.4, 0],
   [-237.8, -40.6, .5], [-236.4, -41.6, -.1], [-235.1, -40.8, .2], [-233.4, -41.5, .1], [-232.2, -41.0, -.2]].forEach(([x, z, r], k) => bici(x, z, r, BICI_COLS[k % BICI_COLS.length]));

  // ---- escuela: dos plantas, textura de piedra blanca, ventanas verdes, entrada metida ----
  { const H = 7.4, Z1 = -9;
    bx(g, (X0 + X1) / 2, 0, (ZF + Z1) / 2, X1 - X0, H, Z1 - ZF, '#eeebe4');
    bx(g, (X0 + X1) / 2, H, (ZF + Z1) / 2, X1 - X0 + .2, .35, Z1 - ZF + .2, '#e2ded5');
    for (let k = 0; k < 46; k++){ const x = X0 + .4 + hsh(k) * (X1 - X0 - .8), y = .3 + hsh(k + 99) * (H - .8); bx(g, x, y, ZF - .03, .5 + hsh(k + 7) * .7, .32, .02, hsh(k + 3) > .5 ? '#dcd7cc' : '#e6e2da'); }   // piedras
    bx(g, (X0 + X1) / 2, 3.55, ZF - .05, X1 - X0, .12, .06, '#d9d4ca');   // línea de losa
    const ventana = (x, y) => {
      bx(g, x, y, ZF - .05, 2.3, 1.55, .06, '#3f8a4a');
      for (const dx of [-.56, .56]) bx(g, x + dx, y + .08, ZF - .08, 1.0, 1.39, .02, '#e8ece6');
      bx(g, x, y, ZF - .1, .08, 1.55, .03, '#3f8a4a'); bx(g, x, y + .5, ZF - .1, 2.3, .06, .03, '#3f8a4a');
    };
    for (const x of [-248.2, -245.3, -242.6, -238.5, -235.7, -232.8]) ventana(x, 1.0);
    for (const x of [-248.2, -245.3, -242.6, -240.6, -238.5, -235.7, -232.8]) ventana(x, 4.6);
    // entrada metida con puertas verdes de reja y alerito
    bx(g, XE, 0, ZF - .06, 2.6, 2.6, .05, '#2e3532');
    bx(g, XE - .85, 0, ZF - .09, .85, 2.4, .05, '#3f8a4a'); bx(g, XE + .85, 0, ZF - .09, .85, 2.4, .05, '#3f8a4a');
    for (const s of [-1, 1]) for (let k = 0; k < 9; k++) bx(g, XE + s * .85, .6 + k * .14, ZF - .12, .6, .05, .02, '#9fb0a6');
    bx(g, XE, 2.75, ZF - .7, 3.4, .14, 1.4, '#d8d8d4');
    bx(g, XE, 0, ZF - .9, 3.2, .06, 1.8, '#c9c4b8');   // escalón
    // equipos de aire, placa con el nombre y mástil
    for (const [x, y] of [[-249.2, 3.0], [-233.6, 6.3]]) bx(g, x, y, ZF - .25, .85, .55, .4, '#f2f2f0');
    signIn(g, 'E.E.S.O.P.I. N° 8135', XE, 3.3, ZF - .08, 2.6, .32, '#ffffff', '#2f6b3a', Math.PI);
    addCol(X0, ZF, X1, Z1);
    mapRects.push([X0, ZF, X1, Z1, '#e8e4dc']);
    mapLabels.push([XE, -26, 'Escuela Secundaria']);
  }

  // ---- local lila (librería / juguetería) ----
  { const a = X1, b = -223.8, h = 4.6, c = (a + b) / 2, LI = '#9b5fb5';
    bx(g, c, 0, ZF + 6, b - a, h, 12, '#f4f1f6');
    bx(g, c, 0, ZF - .05, b - a, .55, .06, LI);                               // zócalo lila
    for (const x of [a + .2, b - .2, -227.6]) bx(g, x, 0, ZF - .06, .35, h - .3, .07, LI);   // pilastras
    bx(g, a + 2.1, 3.1, ZF - .06, 3.9, .3, .07, LI); bx(g, b - 1.9, 4.0, ZF - .06, 3.1, .25, .07, LI); bx(g, b - .55, 2.6, ZF - .06, .3, 1.6, .07, LI);
    const vidriera = (x, w) => { bx(g, x, .75, ZF - .05, w, 1.45, .06, '#ffffff'); bx(g, x, .85, ZF - .08, w - .25, 1.25, .02, '#5a6a7a');
      for (let k = 0; k < 6; k++) bx(g, x - w / 2 + .3 + k * (w - .5) / 5, .9 + hsh(k + x) * .5, ZF - .1, .3, .4, .02, ['#e74c3c', '#f1c40f', '#3498db', '#2ecc71', '#e67e22', '#9b59b6'][k]); };
    vidriera(-229.9, 1.9); vidriera(-226.4, 1.9);
    bx(g, -228.3, 0, ZF - .05, .9, 2.2, .06, '#ffffff'); bx(g, -228.3, .1, ZF - .08, .7, 2.0, .02, '#6c7c8a');
    bx(g, -224.8, 0, ZF - .05, 1.7, 2.3, .06, '#ffffff'); bx(g, -225.25, .1, ZF - .08, .7, 2.1, .02, '#2f6fb5'); bx(g, -224.4, .1, ZF - .08, .7, 2.1, .02, '#5d8fd0');
    bici(-227.4, -40.1, 0, '#7fc6a8');
    flat.rect(a, -43, b, ZF, .2072, '#d9d5cb');
    addCol(a, ZF, b, ZF + 12);
    mapRects.push([a, ZF, b, ZF + 12, '#c9a6dc']);
  }

  // ---- casa blanca con la planta alta de ladrillo y balcón ----
  { const a = -223.8, b = -214.7, c = (a + b) / 2;
    bx(g, c, 0, ZF + 4.5, b - a, 3.0, 9, '#f2f0ea');
    bx(g, a + .35, 0, ZF - .05, .7, 3.0, .08, '#b0704f');                     // pilastra de ladrillo
    for (let y = .15; y < 3; y += .22) bx(g, a + .35, y, ZF - .1, .7, .02, .02, '#d9c8b8');
    bx(g, -222.1, .9, ZF - .05, 1.4, 1.5, .06, '#e8e4da'); bx(g, -222.1, 1.6, ZF - .08, 1.2, .75, .02, '#f0ece4'); bx(g, -222.1, .95, ZF - .08, 1.2, .6, .02, '#6a4a32');   // ventana con persiana
    bx(g, -219.4, .9, ZF - .05, 2.2, .6, .06, '#2f3a40');                       // ventana baja
    bx(g, -217.3, .9, ZF - .05, .25, 1.6, .06, '#2b2b2b');
    bx(g, -215.7, 0, ZF - .05, 1.0, 2.15, .06, '#b57a45');                      // puerta de madera
    bx(g, c, 3.0, ZF + .1, b - a + .2, .22, 1.0, '#f2f0ea');                    // losa del balcón
    bx(g, c, 3.22, ZF + 4.8, b - a - .2, 2.6, 8.6, '#a8654a');                  // planta alta de ladrillo
    for (let y = 3.4; y < 5.8; y += .24) bx(g, c, y, ZF + .48, b - a - .2, .02, .02, '#c99a80');
    for (const x of [-221.6, -218.9, -216.4]) bx(g, x, 3.5, ZF + .47, 1.5, 1.9, .05, '#9a6a40');   // persianas de madera
    reja(a + .2, b - .2, ZF + .15, 3.22, .95, '#2a2a2a');
    bx(g, c, 5.82, ZF + 4.5, b - a + .4, .12, 9.6, '#8e959b', .06);             // techo de chapa
    bx(g, -218.8, .2, ZF - .45, 1.2, .25, .4, '#9c7a52');                       // banco
    bici(-219.7, -40.3, 0, '#7fc6a8');
    flat.rect(a, -42.4, b, ZF, .2072, '#b97a62');   // vereda de baldosas coloradas
    addCol(a, ZF, b, ZF + 9);
  }

  // ---- portón de chapa blanco y tapial blanco ----
  { bx(g, -213.2, 0, ZF - .02, 2.9, 2.3, .08, '#f2f2ef'); bx(g, -213.2, 0, ZF - .07, .04, 2.3, .03, '#cfcfcb');
    bx(g, -210.6, 0, ZF + .1, 2.3, 2.9, .25, '#f2f0ea');
    for (const x of [-214.7, -211.75]) bx(g, x, 0, ZF + .1, .3, 2.5, .3, '#f2f0ea');
    addCol(-214.7, ZF - .1, -209.5, ZF + .3);
    flat.rect(-214.7, -43, -211.7, ZF, .2072, '#cfcac0'); }

  // ---- casa de la esquina: dos plantas con la esquina redondeada ----
  { const XS = -203, R1 = 3, cx = XS - R1, cz = ZF + R1, ZB = -26.4;
    const arco = (r, y0, h, col) => { const m = new THREE.Mesh(new THREE.CylinderGeometry(r, r, h, 18, 1, false, Math.PI / 2, Math.PI / 2), lam({ color: col })); m.position.set(cx, y0 + h / 2, cz); m.castShadow = m.receiveShadow = true; scene.add(m); };
    const volumen = (ins, y0, h, col, zb) => {   // planta con la esquina redondeada, metida "ins" de las líneas municipales
      bx(g, (-209.5 + ins + cx) / 2, y0, (ZF + ins + zb) / 2, cx - (-209.5 + ins), h, zb - (ZF + ins), col);
      bx(g, (cx + XS - ins) / 2, y0, (cz + zb) / 2, XS - ins - cx, h, zb - cz, col);
      arco(R1 - ins, y0, h, col);
    };
    volumen(-.03, 0, .9, '#d8a99a', ZB);   // zócalo de granito rosado
    volumen(0, 0, 3.2, '#f1efe9', ZB);
    volumen(-.15, 3.2, .22, '#8f8f88', ZB + .2);   // borde de la losa
    volumen(.5, 3.42, 2.6, '#ece9e2', ZB - 2);
    volumen(.4, 6.0, .3, '#8f8f88', ZB - 1.8);     // parapeto curvo
    // sobre Brunet: porch con reja y ventana roja; balcón arriba
    bx(g, -208.3, 0, ZF - .02, 1.9, 2.6, .04, '#4a4038'); reja(-209.25, -207.35, ZF - .06, 0, 2.5, '#3a3434');
    bx(g, -206.7, .9, ZF - .04, 1.1, 1.5, .05, '#c44a2a'); reja(-207.25, -206.15, ZF - .08, .9, 1.5, '#3a3434');
    reja(-209.4, -207, ZF + .45, 3.42, 1.0, '#e8e8e4');
    // sobre Santa Fe: tres aberturas angostas de madera
    for (const z of [-34.6, -32.8, -31]) bx(g, XS + .03, .3, z, .05, 2.2, .75, '#8a5a3a');
    bx(g, XS + .03, 1.0, -28.6, .05, 1.2, 1.3, '#3a3f44');
    addCol(-209.5, ZF, XS, ZB);
    mapRects.push([-209.5, ZF, XS, ZB, '#e8e8e8']);
    // vereda de baldosas en la esquina y franja de pasto contra el cordón sobre Brunet y Santa Fe
    flat.rect(-209.5, -42.6, -200, ZF, .2072, '#cfb79c'); flat.rect(XS, ZF, -200, ZB, .2072, '#cfb79c');
    flat.rect(-209.5, -43, -201, -42.6, .2062, '#6f9a47'); flat.rect(-199.6, -38, -199, ZB, .2062, '#6f9a47');
    // cartel de la esquina
    const sg = group(-199.6, -42.6); poleIn(sg, [0, 0, 0], [0, 2.9, 0], .04, '#1f3a8a');
    signIn(sg, 'Dr. Brunet', 0, 2.75, .03, 1.0, .24, '#1f3a8a', '#ffffff'); signIn(sg, 'Santa Fe', 0, 2.45, 0, 1.0, .24, '#1f3a8a', '#ffffff', Math.PI / 2);
    addCol(-199.7, -42.7, -199.5, -42.5);
  }
}

// Dr. Brunet lado sur, de la Escuela Secundaria hacia el oeste hasta la esquina de Bv. Independencia, y doblando por Independencia
// (fotos de Street View + dibujo del usuario sobre el satelital):
//  · casa blanca pegada a la escuela: portón de garaje blanco, ventanita con reja, entrada metida con reja y farol, planta alta retirada
//  · terreno de la casa de techo azul, en L alrededor del terreno de la esquina: sale a Brunet (cerco de pilares y zócalo de piedra con
//    tablas de madera y el portón grande con faroles) y a Bv. Independencia (tejido con portón de hierro); chalet de madera con techo azul
//  · terreno de la esquina, ajeno a la casa y medio abandonado: tapial blanco y tejido con murito de ladrillo, portón de hierro trabajado,
//    tuyas crecidas, yuyos y un tinglado de chapa en la esquinita contra la casa; cartel amarillo de "Lomo de burro 50 mts"
{
  const g = group(0, 0), ZF = -39.5, XI = -282;   // líneas municipales de Dr. Brunet (sur) y de Bv. Independencia (este)
  const XR = -269.5, ZR = -27.5;                 // límites del terreno de la esquina (hacia el este y hacia el sur)
  const XB = -259.5, ZBk = -16.8;                // fondo del terreno de la casa azul (casa blanca de al lado / fondo sobre Independencia)
  const hsh = k => { const s = Math.sin(k * 33.7 + 4.9) * 43758.5453; return s - Math.floor(s); };
  const arbol = (x, z, s, cols, k) => {
    const th = 2.4 * s, cr = 2.4 * s * (.88 + hsh(k) * .25);
    trunks.add(x, 0, z, .45 * s, th, .45 * s, 0, '#5b4330');
    crowns.add(x, th + cr * .7, z, cr, cr * (.88 + hsh(k + 7) * .2), cr, hsh(k + 3) * 6, cols[k % cols.length]);
    crowns.add(x + (hsh(k + 5) - .5) * 1.6 * s, th + cr * 1.2, z + (hsh(k + 9) - .5) * 1.6 * s, cr * .7, cr * .7, cr * .7, hsh(k + 11) * 6, cols[(k + 1) % cols.length]);
    addCol(x - .3 * s, z - .3 * s, x + .3 * s, z + .3 * s);
  };
  const tuya = (x, z, h, k) => { trunks.add(x, 0, z, .25, .8, .25, 0, '#5b4632'); crowns.add(x, h * .42 + .3, z, 1.25 + hsh(k + 20) * .4, h * .45, 1.25 + hsh(k + 21) * .4, hsh(k) * 6, '#4f7a35'); crowns.add(x + .2, h * .75, z - .1, .85, h * .25, .85, 1, '#5a8540'); addCol(x - .4, z - .4, x + .4, z + .4); };
  const reja = (x0, x1, z, y0, h, col = '#2a2626') => { for (let x = x0 + .1; x < x1; x += .14) bx(g, x, y0, z, .03, h, .03, col); bx(g, (x0 + x1) / 2, y0 + h - .04, z, x1 - x0, .05, .05, col); };
  const farol = (p, x, y, z) => { bx(p, x, y, z, .28, .38, .28, '#2b2b2b'); bx(p, x, y + .05, z, .22, .28, .22, '#f3ead0'); bx(p, x, y + .38, z, .34, .06, .34, '#2b2b2b'); };
  const PIEDRA = ['#b7a58c', '#c8b9a2', '#9c8a72', '#d4c6ae', '#a8957b', '#8c7a63'];
  const piedras = (x0, x1, z, y0, y1, k0, zs = -1) => {
    const n = Math.round((x1 - x0) * (y1 - y0) * 5);
    for (let k = 0; k < n; k++){ const x = x0 + .12 + hsh(k0 + k) * (x1 - x0 - .24), y = y0 + .08 + hsh(k0 + k + 500) * (y1 - y0 - .16);
      bx(g, x, y - .08, z + zs * .02, .2 + hsh(k0 + k + 900) * .2, .14 + hsh(k0 + k + 1300) * .1, .05, PIEDRA[(k0 + k) % PIEDRA.length]); }
  };

  // vereda de pasto con caminitos de cemento (como en las fotos)
  flat.rect(XI, -43, -250, ZF, .2062, '#6f9a47');
  for (const [a, b] of [[-265.8, -263.2], [-258.6, -257.2], [-256.4, -252.2]]) flat.rect(a, -43, b, ZF, .2072, '#c8c3b8');
  flat.rect(-270.5, -42.4, -250, -41.6, .2072, '#c8c3b8');
  flat.rect(-284, ZF, XI, ZBk, .2062, '#6f9a47');
  for (const [a, b] of [[-33.4, -30.2], [-22.8, -19.6]]) flat.rect(-284, a, XI, b, .2072, '#bdb3a2');

  // ---- casa blanca pegada a la escuela ----
  { const a = XB, b = -250, c = (a + b) / 2, h = 3.4;
    bx(g, c, 0, ZF + 7.5, b - a, h, 15, '#f3f2ee');
    bx(g, c, h, ZF + 7.5, b - a + .2, .25, 15.2, '#e7e5df');
    bx(g, -251.6, 0, ZF - .04, 2.8, 2.35, .05, '#f7f7f5'); bx(g, -251.6, 2.35, ZF - .06, 3.0, .08, .08, '#dcdcd8');   // portón de garaje
    bx(g, -253.9, 1.2, ZF - .05, .6, .8, .05, '#2f3a44'); reja(-254.2, -253.6, ZF - .08, 1.2, .8, '#3a3a3a');
    bx(g, -255.4, 1.3, ZF - .05, .7, .7, .05, '#e8e4da'); bx(g, -255.4, 1.4, ZF - .08, .5, .45, .02, '#c0392b');   // cartelito
    bx(g, -256.9, 0, ZF + .5, 1.9, 2.4, .05, '#3a3430'); reja(-257.85, -255.95, ZF - .02, 0, 2.4, '#2e2a28');        // entrada metida con reja
    bx(g, -257.9, 0, ZF - .02, .12, 2.5, .12, '#f3f2ee'); bx(g, -255.9, 0, ZF - .02, .12, 2.5, .12, '#f3f2ee');
    crowns.add(-256.9, .6, ZF + .2, .35, .45, .3, 0, '#4f8a3a');
    farol(g, -255.5, 2.65, ZF - .25);
    bx(g, -258.8, 1.05, ZF - .05, 1.0, .9, .05, '#2f3a44'); bx(g, -258.8, .45, ZF - .07, .7, .2, .03, '#9a9a9a');   // ventana y buzón
    bx(g, -255.2, h + .25, ZF + 5, 6.4, 2.7, 7, '#f3f2ee'); bx(g, -255.2, h + 2.95, ZF + 5, 6.6, .2, 7.2, '#e7e5df');   // planta alta retirada
    bx(g, -256.3, h + 1.2, ZF + 1.48, 1.4, 1.1, .05, '#3a4148');
    for (const y of [h + .6, h + 1.0]) bx(g, c, y, ZF + .15, b - a - .4, .04, .04, '#9a9a96');
    for (let x = a + .3; x < b; x += 2) bx(g, x, h + .25, ZF + .15, .05, .85, .05, '#9a9a96');
    addCol(a, ZF, b, ZF + 15);
    mapRects.push([a, ZF, b, ZF + 15, '#e8e8e8']);
  }

  // ---- terreno de la casa azul: frente sobre Brunet con el cerco de piedra y madera y el portón grande ----
  { const PIL = [-269.05, -266.6, -262.85, -259.95], zf = ZF + .15;
    const pilar = (x, k) => { bx(g, x, 0, zf, .9, 2.55, .9, '#a8957b'); piedras(x - .45, x + .45, zf - .45, 0, 2.55, k); bx(g, x, 2.55, zf, 1.0, .1, 1.0, '#9c8a72'); addCol(x - .45, zf - .45, x + .45, zf + .45); };
    const tablas = (x0, x1, base, hMid, hEnd, col) => {   // paño de tablas verticales con remate curvo
      for (let x = x0 + .07; x < x1; x += .15){ const t = (x - x0) / (x1 - x0), hh = hEnd + (hMid - hEnd) * Math.sin(t * Math.PI);
        bx(g, x, base, zf, .13, hh - base, .05, (Math.round(x * 7) % 3) ? col : '#7a5534'); }
      bx(g, (x0 + x1) / 2, base + .5, zf + .06, x1 - x0, .1, .06, '#6a4a2c');
    };
    PIL.forEach((x, k) => pilar(x, k * 97));
    for (let i = 0; i < PIL.length - 1; i++){
      const x0 = PIL[i] + .45, x1 = PIL[i + 1] - .45;
      if (i === 1){   // portón grande con placa y faroles en arco sobre los pilares
        tablas(x0, x1, 0, 2.55, 2.3, '#8a6440'); bx(g, (x0 + x1) / 2, 1.9, zf - .06, .9, .25, .03, '#c9a46a'); bx(g, (x0 + x1) / 2, 1.96, zf - .08, .7, .12, .02, '#5a4026');   // placa
        for (const x of [PIL[i], PIL[i + 1]]){ const d = x === PIL[i] ? .4 : -.4; poleIn(g, [x, 2.65, zf], [x + d, 3.15, zf], .02, '#e0e0dc'); farol(g, x + d, 2.75, zf); }
        addCol(x0, zf - .1, x1, zf + .1);
      } else {
        bx(g, (x0 + x1) / 2, 0, zf, x1 - x0, .95, .35, '#a8957b'); piedras(x0, x1, zf - .18, 0, .95, 300 + i * 61);
        tablas(x0, x1, .95, 2.35, 2.1, '#8f6942');
        addCol(x0, zf - .18, x1, zf + .18);
      }
    }
    // casita de madera de techo azul sobre la vereda y el bolsón
    { const c = group(-261.4, -41.9); bx(c, 0, 0, 0, .1, .5, .1, '#6a4a2c'); bx(c, 0, .5, 0, .75, .75, .55, '#8a5a36');
      for (let y = .58; y < 1.2; y += .12) bx(c, 0, y, -.28, .75, .02, .02, '#6e4428');
      for (const s of [-1, 1]) bx(c, s * .22, 1.25, 0, .55, .05, .7, '#2f5aa8', 0, -s * .6); addCol(-261.8, -42.2, -261, -41.6); }
    { bx(g, -267.9, .2, -41.7, .95, .95, .95, '#f2f2ee'); for (const s of [-1, 1]) bx(g, -267.9 + s * .4, 1.15, -41.7, .06, .25, .06, '#e0e0dc'); bx(g, -267.9, .65, -42.18, .6, .25, .02, '#1f5aa8');
      addCol(-268.4, -42.2, -267.4, -41.2); }
  }

  // ---- cercos con murito de ladrillo y tejido, pilares de ladrillo y portones de hierro trabajado ----
  const tejidoMat = new THREE.MeshLambertMaterial({ color: 0xbfc5c2, transparent: true, opacity: .35, side: THREE.DoubleSide, depthWrite: false });
  const pilarL = (x, z) => { bx(g, x, 0, z, .45, 1.9, .45, '#b0704f'); for (let y = .12; y < 1.9; y += .2) bx(g, x, y, z, .47, .02, .47, '#d6c3b2'); addCol(x - .23, z - .23, x + .23, z + .23); };
  const tejidoZ = (x, z0, z1) => {   // murito de ladrillo con tejido a lo largo de z
    bx(g, x, 0, (z0 + z1) / 2, .22, .5, z1 - z0, '#c9c3b8');
    for (let z = z0; z <= z1 + .01; z += 2.5) bx(g, x, .5, Math.min(z, z1), .05, 1.4, .05, '#9a9a96');
    const m = new THREE.Mesh(new THREE.PlaneGeometry(z1 - z0, 1.35), tejidoMat); m.position.set(x, 1.18, (z0 + z1) / 2); m.rotation.y = Math.PI / 2; scene.add(m);
    addCol(x - .12, z0, x + .12, z1);
  };
  const portonHierro = (x, z0, z1) => {
    for (let z = z0 + .12; z < z1; z += .2) bx(g, x, .1, z, .03, 1.55, .03, '#3a3a36');
    for (const y of [.1, .9, 1.62]) bx(g, x, y, (z0 + z1) / 2, .04, .05, z1 - z0, '#3a3a36');
    for (const [zz, y] of [[z0 + .45, 1.25], [z1 - .45, 1.25], [(z0 + z1) / 2, 1.3]]){ const t = new THREE.Mesh(new THREE.TorusGeometry(.18, .02, 5, 14), lam({ color: 0x3a3a36 })); t.position.set(x, y, zz); t.rotation.y = Math.PI / 2; scene.add(t); }
    addCol(x - .05, z0, x + .05, z1);
  };

  // ---- terreno de la esquina (ajeno a la casa, medio abandonado) ----
  // sobre Brunet: tejido desde la esquina y después el tapial blanco hasta el cerco de piedra
  bx(g, (XI + -278.3) / 2, 0, ZF + .15, -278.3 - XI, .5, .22, '#c9c3b8');
  { const m = new THREE.Mesh(new THREE.PlaneGeometry(-278.3 - XI, 1.35), tejidoMat); m.position.set((XI + -278.3) / 2, 1.18, ZF + .15); scene.add(m); addCol(XI, ZF, -278.3, ZF + .3); }
  pilarL(XI + .1, ZF + .15); pilarL(-278.1, ZF + .15);
  bx(g, (-277.9 + -269.5) / 2, 0, ZF + .15, 8.4, 2.2, .25, '#f2f0ea'); bx(g, (-277.9 + -269.5) / 2, 0, ZF + .02, 8.4, .25, .02, '#d8d2c4'); addCol(-277.9, ZF, -269.5, ZF + .3);
  // sobre Independencia: tejido, portón de hierro con la tablita turquesa, tejido hasta el terreno de la casa
  tejidoZ(XI + .1, ZF + .3, -33.6); pilarL(XI + .1, -33.4); portonHierro(XI + .1, -33.2, -30.4); pilarL(XI + .1, -30.2);
  bx(g, XI + .28, 0, -31.8, .05, 1.8, .45, '#2f8a8a');
  tejidoZ(XI + .1, -30, ZR - .2); pilarL(XI + .1, ZR);
  // medianeras con el terreno de la casa (en L)
  bx(g, (XI + XR) / 2, 0, ZR, XR - XI, 1.8, .2, '#a9a59c'); bx(g, XR, 0, (ZF + ZR) / 2, .2, 1.8, ZR - ZF, '#a9a59c');
  addCol(XI, ZR - .1, XR, ZR + .1); addCol(XR - .1, ZF, XR + .1, ZR);
  // yuyos, tuyas crecidas, ladrillos y un tambor viejo
  flat.rect(XI, ZF, XR, ZR, .07, '#7a8f48');
  for (let k = 0; k < 16; k++){ const x = XI + 1 + hsh(k + 60) * (XR - XI - 2), z = ZF + 1 + hsh(k + 80) * (ZR - ZF - 2); flat.rect(x, z, x + 1 + hsh(k) * 2, z + .8 + hsh(k + 3) * 1.6, .072, k % 3 ? '#8c9a50' : '#a39a62'); }
  for (let k = 0; k < 22; k++){ const x = XI + .8 + hsh(k + 140) * (XR - XI - 1.6), z = ZF + .8 + hsh(k + 170) * (ZR - ZF - 1.6); crowns.add(x, .3, z, .45 + hsh(k + 7) * .4, .35 + hsh(k + 9) * .4, .45, hsh(k) * 6, k % 2 ? '#7f8f45' : '#96a058'); }
  [[-280.3, -37.6, 4.8], [-279.6, -35.2, 5.4], [-280.2, -29.4, 5.6], [-277.6, -37.4, 4.2], [-274.6, -36.6, 5.0]].forEach(([x, z, h], k) => tuya(x, z, h, k));
  bx(g, -276.2, 0, -33.2, 1.4, .5, .9, '#a65a3e'); cylIn(g, -272.8, .45, -34.8, .3, .9, '#7a4a32');
  // tinglado de chapa en la esquinita contra la casa
  { const t0 = -274.2, t1 = XR - .15, u0 = -31.6, u1 = ZR - .15;
    for (const [x, z] of [[t0, u0], [t1, u0], [t0, u1], [t1, u1]]) bx(g, x, 0, z, .14, 2.4, .14, '#6a4a2c');
    bx(g, (t0 + t1) / 2, 0, u1 - .05, t1 - t0, 2.3, .06, '#7a5236'); bx(g, t1 - .05, 0, (u0 + u1) / 2, .06, 2.3, u1 - u0, '#7a5236');
    bx(g, (t0 + t1) / 2, 2.45, (u0 + u1) / 2, t1 - t0 + .6, .08, u1 - u0 + .6, '#2f5aa8', -.12);
    addCol(t0 - .1, u0 - .1, t1 + .1, u1 + .1);
    mapRects.push([t0, u0, t1, u1, '#2f5aa8']); }

  // ---- terreno de la casa azul sobre Independencia: tejido y portón de hierro ----
  tejidoZ(XI + .1, ZR + .2, -23); pilarL(XI + .1, -22.8); portonHierro(XI + .1, -22.6, -19.8); pilarL(XI + .1, -19.6); tejidoZ(XI + .1, -19.4, ZBk); pilarL(XI + .1, ZBk);
  bx(g, (XI + XB) / 2, 0, ZBk, XB - XI, 1.9, .2, '#b9b2a4'); addCol(XI, ZBk - .1, XB, ZBk + .1);   // medianera del fondo
  flat.rect(XR, ZF, XB, ZR, .07, '#6e9a45'); flat.rect(XI, ZR, XB, ZBk, .07, '#6e9a45');
  flat.rect(-265.5, ZF, -263.9, -29.4, .072, '#b9b3a6'); flat.rect(XI, -22.4, -278.6, -20, .072, '#b9b3a6');   // caminitos a los portones

  // ---- chalet de madera con techo azul: cuerpo principal con el frente triangular mirando a Brunet y ala hacia Independencia ----
  const chaletVol = (a, b, z0, z1, H, rise, alongZ) => {   // alongZ: cumbrera a lo largo de z (hastiales al norte y al sur)
    const cx = (a + b) / 2, cz = (z0 + z1) / 2, w = b - a, d = z1 - z0;
    bx(g, cx, 0, cz, w, H, d, '#7a5236');
    const span = alongZ ? w : d, ang = Math.atan2(rise, span / 2), L = Math.hypot(rise, span / 2);
    for (let k = 0; k < 7; k++){ const ww = span * (1 - (k + .5) / 7), y = H + k * rise / 7;
      if (alongZ) for (const z of [z0 - .02, z1 + .02]) bx(g, cx, y, z, ww, rise / 7, .08, k % 2 ? '#6e4a2e' : '#7a5236');
      else for (const x of [a - .02, b + .02]) bx(g, x, y, cz, .08, rise / 7, ww, k % 2 ? '#6e4a2e' : '#7a5236'); }
    for (const s of [-1, 1]){
      if (alongZ) bx(g, cx + s * w / 4, H + rise / 2 - .06, cz, L + .5, .12, d + 1.0, '#2f56b8', 0, -s * ang);
      else bx(g, cx, H + rise / 2 - .06, cz + s * d / 4, w + 1.0, .12, L + .5, '#2f56b8', s * ang, 0);
    }
    addCol(a, z0, b, z1); mapRects.push([a, z0, b, z1, '#2f56b8']);
  };
  chaletVol(-271.5, -260.5, -27, -18, 2.7, 2.4, true);
  chaletVol(-279.5, -271.5, -25.5, -18.5, 2.5, 1.7, false);
  for (let x = -271.3; x < -260.5; x += .35) bx(g, x, 0, -27.03, .04, 2.7, .02, '#5e3e28');
  bx(g, -264.7, .1, -27.06, 1.1, 2.1, .04, '#3e2a1c'); for (const x of [-268.9, -262.2]) bx(g, x, 1.0, -27.06, 1.3, 1.0, .04, '#2b3138');
  bx(g, -279.53, 1.0, -22, .04, 1.0, 1.3, '#2b3138');
  bx(g, -265.2, 2.65, -28.4, 8.2, .12, 2.8, '#6e4a2e'); for (const x of [-268.9, -261.5]) bx(g, x, 0, -29.6, .18, 2.65, .18, '#5e3e28');   // galería hacia el portón
  addCol(-269, -29.7, -268.8, -29.5); addCol(-261.6, -29.7, -261.4, -29.5);
  // jardín: palmera, árboles y arbustos
  palmTrunks.add(-267.3, 0, -35.8, .35, 4.2, .35, 0, '#7a6a4a'); addCol(-267.5, -36, -267.1, -35.6);
  for (let k = 0; k < 7; k++){ const a = k / 7 * Math.PI * 2; crowns.add(-267.3 + Math.cos(a) * 1.0, 4.4, -35.8 + Math.sin(a) * 1.0, 1.3, .18, .35, -a, '#4f7a35'); }
  arbol(-262, -34, 1.1, ['#4b7a30', '#5e8a3a'], 4); arbol(-260.6, -31.6, .8, ['#9c7a45', '#8a6a3a', '#6d843a'], 3); arbol(-275.5, -17.6, .9, ['#3f6b2a', '#4b7a30', '#38602a'], 1);
  tuya(-280.4, -25.6, 4.6, 9); tuya(-280.3, -18, 5, 10);
  crowns.add(-264, .6, -31.2, .8, .6, .7, 0, '#4b7a33'); crowns.add(-268.6, .55, -31.4, .7, .55, .6, 1, '#3e6a2e');

  // ---- cartel "Lomo de burro 50 mts" sobre Independencia ----
  { const sg = group(-283.4, -25.5); poleIn(sg, [0, 0, 0], [0, 2.2, 0], .035, '#7a7a76');
    const d = new THREE.Mesh(new THREE.PlaneGeometry(.62, .62), new THREE.MeshLambertMaterial({ map: textTex('LOMO DE BURRO', 80, 80, '#f2d21b', '#111111'), side: THREE.DoubleSide }));
    d.position.set(0, 2.15, 0); d.rotation.set(0, Math.PI / 2, Math.PI / 4); sg.add(d);
    signIn(sg, '50 mts', 0, 1.55, 0, .6, .22, '#f2d21b', '#111111', Math.PI / 2); signIn(sg, '50 mts', -.01, 1.55, 0, .6, .22, '#f2d21b', '#111111', -Math.PI / 2);
    addCol(-283.5, -25.6, -283.3, -25.4); }
}

// Jardín de Infantes N° 1186 "Niño Jesús" (Santa Fe 461, lado oeste)
civic(-33.540797, -60.806948, { w: 18, d: 12, h: 3.8, wall: '#fff3d6', trim: '#f28b30', sign: 'JARDÍN DE INFANTES N° 1186 "NIÑO JESÚS"', signBg: '#f28b30', signFg: '#ffffff', signW: 12, label: 'Jardín 1186', door: '#2c82c9',
  windows: [-6, -3.5, 3.5, 6],
  extra: (g, w, d, h) => {
    gableIn(g, 0, h + .25, -d/2, w + .6, 1.8, d + .6, '#c85a3a', 0);
    bx(g, 0, 2.6, .65, 3.2, .22, 1.3, '#f28b30');
    const cols = ['#e63946','#f4a261','#2a9d8f','#457b9d','#e9c46a'];
    for (let k = -8; k <= 8; k++){ if (Math.abs(k) < 1.5) continue; bx(g, k, 0, .65, .35, .95, .1, cols[Math.abs(k) % cols.length]); }
    bx(g, -5.2, .45, .65, 7.2, .12, .12, '#ffffff'); bx(g, 5.2, .45, .65, 7.2, .12, .12, '#ffffff');
  } });

// Polideportivo Gral. San Martín (predio centrado en Bv. Independencia y Bv. Gálvez, lado SO)
// Distribución según el plano dibujado por el usuario: entrada sobre Bv. Independencia del lado de las vías (norte).
{
  const x0 = -346, z0 = 386, x1 = -238, z1 = 497, cx = (x0 + x1) / 2, cz = (z0 + z1) / 2;
  plazaRects.push([x0 - 8, z0 - 8, x1 + 8, z1 + 8], [-322, 348, -262, 386]);
  flat.rect(x0, z0, x1, z1, .048, '#5d8a3a');
  mapRects.push([x0, z0, x1, z1, '#5d8a3a']);
  // calles chiquitas pavimentadas (gris claro) rodeando el rejado del predio
  const RING = '#bdbab3', ro = 3.6;
  roadLayer.addRect(x0 - ro - 2.5, z0 - ro - 2.5, x1 + ro + 2.5, z0 - ro + 2.5, 45, RING);
  roadLayer.addRect(x0 - ro - 2.5, z1 + ro - 2.5, x1 + ro + 2.5, z1 + ro + 2.5, 45, RING);
  roadLayer.addRect(x0 - ro - 2.5, z0 - ro + 2.5, x0 - ro + 2.5, z1 + ro - 2.5, 45, RING);
  roadLayer.addRect(x1 + ro - 2.5, z0 - ro + 2.5, x1 + ro + 2.5, z1 + ro - 2.5, 45, RING);
  for (const pts of [[[x0 - ro, z0 - ro], [x1 + ro, z0 - ro]], [[x1 + ro, z0 - ro], [x1 + ro, z1 + ro]], [[x1 + ro, z1 + ro], [x0 - ro, z1 + ro]], [[x0 - ro, z1 + ro], [x0 - ro, z0 - ro]]]){
    mapRoads.push({ pts, w: 5, col: '#9a4fb0', y: .11 });
  }
  // helper: rectángulo en un marco rotado (para la cancha, que está algo girada respecto al predio)
  const rotRect = (gx, gz, ry, lx0, lz0, lx1, lz1, y, col) => {
    const c = Math.cos(ry), s = Math.sin(ry), P = (lx, lz) => [gx + lx * c + lz * s, gz - lx * s + lz * c];
    flat.quad(P(lx0, lz0), P(lx0, lz1), P(lx1, lz1), P(lx1, lz0), y, col);
  };
  // ---- Cancha de fútbol de pasto con líneas blancas y partes peladas ----
  {
    const gx = cx + 2, gz = 455, ry = .26, HL = 32, HW = 21;
    rotRect(gx, gz, ry, -HL - 3, -HW - 3, HL + 3, HW + 3, .052, '#4f8f34');
    for (let k = 0; k < 22; k++){ const lx = R(-HL, HL), lz = R(-HW, HW), r = R(1.2, 3.5); rotRect(gx, gz, ry, lx - r, lz - r * .6, lx + r, lz + r * .6, .054, rnd() < .6 ? '#8a6a48' : '#6f8a40'); }
    for (const lx of [-8, 8]) rotRect(gx, gz, ry, lx - 2.5, -3, lx + 2.5, 3, .054, '#8a6a48');
    const LN = (a0, b0, a1, b1) => rotRect(gx, gz, ry, Math.min(a0, a1) - .07, Math.min(b0, b1) - .07, Math.max(a0, a1) + .07, Math.max(b0, b1) + .07, .058, '#f2f2f2');
    LN(-HL, -HW, HL, -HW); LN(-HL, HW, HL, HW); LN(-HL, -HW, -HL, HW); LN(HL, -HW, HL, HW); LN(0, -HW, 0, HW);
    for (const s of [-1, 1]){ const e = s * HL, i = s * (HL - 13); LN(e, -10, i, -10); LN(e, 10, i, 10); LN(i, -10, i, 10); LN(e, -4.5, s * (HL - 5), -4.5); LN(e, 4.5, s * (HL - 5), 4.5); LN(s * (HL - 5), -4.5, s * (HL - 5), 4.5); }
    { const ring = [], c = Math.cos(ry), sn = Math.sin(ry); for (let k = 0; k <= 36; k++){ const t = k / 36 * Math.PI * 2, lx = Math.cos(t) * 7, lz = Math.sin(t) * 7; ring.push([gx + lx * c + lz * sn, gz - lx * sn + lz * c]); } flat.ribbon(ring, .14, .058, '#f2f2f2'); }
    for (const s of [-1, 1]){
      const g = group(gx + s * HL * Math.cos(ry), gz - s * HL * Math.sin(ry), ry + Math.PI / 2);
      poleIn(g, [-3.6, 0, 0], [-3.6, 2.44, 0], .07, '#ffffff'); poleIn(g, [3.6, 0, 0], [3.6, 2.44, 0], .07, '#ffffff'); poleIn(g, [-3.6, 2.44, 0], [3.6, 2.44, 0], .07, '#ffffff');
      poleIn(g, [-3.6, 2.44, 0], [-3.6, 0, -1.8 * s * 0 - 1.6], .03, '#dddddd'); poleIn(g, [3.6, 2.44, 0], [3.6, 0, -1.6], .03, '#dddddd');
      const gp = [gx + s * HL * Math.cos(ry), gz - s * HL * Math.sin(ry)]; addCol(gp[0] - .4, gp[1] - .4, gp[0] + .4, gp[1] + .4);
    }
    for (const [lx, lz] of [[-HL - 4, -HW - 4], [HL + 4, -HW - 4], [-HL - 4, HW + 4], [HL + 4, HW + 4]]){
      const c = Math.cos(ry), s = Math.sin(ry), x = gx + lx * c + lz * s, z = gz - lx * s + lz * c;
      poles.add(x, 0, z, .28, 14, .28, 0, '#9aa0a6'); trims.add(x, 14, z, 2.2, .9, .5, 0, '#e8e8e8'); addCol(x - .2, z - .2, x + .2, z + .2);
    }
    mapRects.push([gx - 33, gz - 26, gx + 33, gz + 26, '#4f8f34']);
  }
  // ---- Predio de la pileta (esquina NO): pared de cemento hacia afuera, cerco hacia adentro del Poli ----
  {
    const ex0 = x0 + 1, ez0 = z0 + 1, ex1 = -306, ez1 = 421;
    flat.rect(ex0, ez0, ex1, ez1, .052, '#6f9a4a');
    flat.rect(-336, 397, -304.5, 412, .058, '#e3ddd0');   // solarium alrededor de las piletas
    // pileta principal
    flat.rect(-332.6, 399.1, -314.6, 408.1, .064, '#2a8fc4'); flat.rect(-332, 399.7, -315.2, 407.5, .066, '#3fb2e8');
    for (let k = 1; k < 5; k++) flat.rect(-332, 399.7 + k * 1.56 - .05, -315.2, 399.7 + k * 1.56 + .05, .067, '#2a8fc4');
    addCol(-332.6, 399.1, -314.6, 408.1);
    // pileta cuadrada para niños, pegada a la principal
    flat.rect(-312.2, 400, -307.8, 404.4, .064, '#2a8fc4'); flat.rect(-311.8, 400.4, -308.2, 404, .066, '#7fd0f2');
    addCol(-312.2, 400, -307.8, 404.4);
    // vestuarios y baños del lado de la pileta para niños
    const vg = group(-310.5, 389.5);
    bx(vg, 0, 0, 0, 8, 3.2, 5, '#eae6dc'); bx(vg, 0, 3.2, 0, 8.4, .3, 5.4, '#9aa3a8');
    bx(vg, -2, 0, 2.53, 1, 2.1, .06, '#4a6a8a'); bx(vg, 2, 0, 2.53, 1, 2.1, .06, '#4a6a8a');
    signIn(vg, 'VESTUARIOS', -2, 2.6, 2.58, 1.8, .35, '#ffffff', '#2a5aa8'); signIn(vg, 'BAÑOS', 2, 2.6, 2.58, 1.4, .35, '#ffffff', '#2a5aa8');
    addCol(-314.5, 387, -306.5, 392); mapRects.push([-314.5, 387, -306.5, 392, '#eae6dc']);
    // pared de cemento hacia afuera (norte y oeste)
    box((ex0 + ex1) / 2, 0, ez0, ex1 - ex0, 2.3, .25, '#cfcac0'); addCol(ex0, ez0 - .2, ex1, ez0 + .2);
    box(ex0, 0, (ez0 + ez1) / 2, .25, 2.3, ez1 - ez0, '#cfcac0'); addCol(ex0 - .2, ez0, ex0 + .2, ez1);
    // cerco hacia adentro del Poli (este y sur), con portón al lado del techito
    const chain = (ax, az, bx2, bz) => { const l = Math.hypot(bx2 - ax, bz - az), n = Math.max(1, Math.round(l / 2.5)); for (let k = 0; k <= n; k++){ const t = k / n; poles.add(ax + (bx2 - ax) * t, 0, az + (bz - az) * t, .06, 1.9, .06, 0, '#6e767e'); } const g = group(0, 0); poleIn(g, [ax, 1.85, az], [bx2, 1.85, bz], .025, '#6e767e'); const m = new THREE.Mesh(new THREE.PlaneGeometry(l, 1.8), new THREE.MeshLambertMaterial({ color: 0x8a9299, transparent: true, opacity: .35, side: THREE.DoubleSide, depthWrite: false })); m.position.set((ax + bx2) / 2, .95, (az + bz) / 2); m.rotation.y = Math.atan2(-(bz - az), bx2 - ax); scene.add(m); addCol(Math.min(ax, bx2) - .1, Math.min(az, bz) - .1, Math.max(ax, bx2) + .1, Math.max(az, bz) + .1); };
    chain(ex1, ez0, ex1, 400); chain(ex1, 404, ex1, ez1); chain(ex0, ez1, ex1, ez1);
    // árboles dentro del predio de la pileta
    for (const [x, z, s] of [[-340, 392, 1.1], [-340.5, 405, 1.2], [-338, 416, 1.1], [-326, 417, 1], [-313, 416.5, .9]]) treeSpots.push([x, z, s, false]);
    mapRects.push([-332.6, 399.1, -314.6, 408.1, '#2da6e0']);
  }
  // techito (sombra) del lado de la entrada, afuera del predio de la pileta
  { const g = group(-301, 405); for (const [sx, sz] of [[-1, -1], [1, -1], [-1, 1], [1, 1]]) bx(g, sx * 2.3, 0, sz * 1.8, .14, 2.6, .14, '#4a4f55'); bx(g, 0, 2.6, 0, 5.2, .14, 4.2, '#8f969c'); addCol(-303.5, 402.8, -298.5, 407.2); mapRects.push([-303.6, 402.9, -298.4, 407.1, '#8f969c']); }
  // ---- Playón de básquet: piso gris oscuro sin marcar, aros que también son arcos de fútbol ----
  {
    const bxc = -284, bzc = 395.9, HL = 9, HW = 5;
    flat.rect(bxc - HL, bzc - HW, bxc + HL, bzc + HW, .058, '#5f6368');
    for (const s of [-1, 1]){
      const g = group(bxc + s * HL, bzc, s > 0 ? -Math.PI / 2 : Math.PI / 2);
      poleIn(g, [-1.5, 0, 0], [-1.5, 2, 0], .06, '#e8e8e8'); poleIn(g, [1.5, 0, 0], [1.5, 2, 0], .06, '#e8e8e8'); poleIn(g, [-1.5, 2, 0], [1.5, 2, 0], .06, '#e8e8e8');
      poleIn(g, [0, 2, 0], [0, 3.05, 0], .06, '#e8e8e8'); boxIn(g, 0, 3.4, 0, 1.6, 1, .06, '#f4f4f4');
      const hoop = new THREE.Mesh(new THREE.TorusGeometry(.24, .025, 6, 16).rotateX(Math.PI / 2), lam({ color: 0xe06a1e })); hoop.position.set(0, 3.05, .3); g.add(hoop);
      addCol(bxc + s * HL - .3, bzc - 1.6, bxc + s * HL + .3, bzc + 1.6);
    }
    mapRects.push([bxc - HL, bzc - HW, bxc + HL, bzc + HW, '#5f6368']);
  }
  // ---- Cancha de tenis de polvo de ladrillo, rejada, con casita y rodillo ----
  {
    const tcx = -258.8, tcz = 399.7, fx0 = tcx - 15, fx1 = tcx + 15, fz0 = tcz - 8, fz1 = tcz + 8;
    flat.rect(fx0, fz0, fx1, fz1, .058, '#c8683a');
    const TL = (ax, az, bx2, bz) => flat.rect(Math.min(ax, bx2) - .05, Math.min(az, bz) - .05, Math.max(ax, bx2) + .05, Math.max(az, bz) + .05, .062, '#ffffff');
    TL(tcx - 11.9, tcz - 5.5, tcx + 11.9, tcz - 5.5); TL(tcx - 11.9, tcz + 5.5, tcx + 11.9, tcz + 5.5); TL(tcx - 11.9, tcz - 5.5, tcx - 11.9, tcz + 5.5); TL(tcx + 11.9, tcz - 5.5, tcx + 11.9, tcz + 5.5);
    TL(tcx - 11.9, tcz - 4.1, tcx + 11.9, tcz - 4.1); TL(tcx - 11.9, tcz + 4.1, tcx + 11.9, tcz + 4.1); TL(tcx - 6.4, tcz - 4.1, tcx - 6.4, tcz + 4.1); TL(tcx + 6.4, tcz - 4.1, tcx + 6.4, tcz + 4.1); TL(tcx - 6.4, tcz, tcx + 6.4, tcz);
    { const ng = group(tcx, tcz, Math.PI / 2); poleIn(ng, [-6.2, 0, 0], [-6.2, 1.07, 0], .05, '#2b3440'); poleIn(ng, [6.2, 0, 0], [6.2, 1.07, 0], .05, '#2b3440'); bx(ng, 0, .1, 0, 12.4, .85, .05, '#333333'); bx(ng, 0, .95, 0, 12.4, .08, .07, '#ffffff'); addCol(tcx - .2, tcz - 6.3, tcx + .2, tcz + 6.3); }
    // rejado alto alrededor (con puerta del lado del camino)
    const mesh = (ax, az, bx2, bz) => { const l = Math.hypot(bx2 - ax, bz - az), n = Math.max(1, Math.round(l / 3)); for (let k = 0; k <= n; k++){ const t = k / n; poles.add(ax + (bx2 - ax) * t, 0, az + (bz - az) * t, .07, 3.4, .07, 0, '#3f6b4c'); } const m = new THREE.Mesh(new THREE.PlaneGeometry(l, 3.3), new THREE.MeshLambertMaterial({ color: 0x2f5a3e, transparent: true, opacity: .3, side: THREE.DoubleSide, depthWrite: false })); m.position.set((ax + bx2) / 2, 1.7, (az + bz) / 2); m.rotation.y = Math.atan2(-(bz - az), bx2 - ax); scene.add(m); addCol(Math.min(ax, bx2) - .1, Math.min(az, bz) - .1, Math.max(ax, bx2) + .1, Math.max(az, bz) + .1); };
    mesh(fx0, fz0, fx1, fz0); mesh(fx1, fz0, fx1, fz1); mesh(fx0, fz1, fx1, fz1); mesh(fx0, fz0, fx0, tcz - 1); mesh(fx0, tcz + 1.2, fx0, fz1);
    // casita para guardar las cosas + rodillo para aplanar el polvo de ladrillo
    const hg = group(fx1 - 2.2, fz1 - 2.2); bx(hg, 0, 0, 0, 3, 2.4, 3, '#d9d2c3'); bx(hg, 0, 2.4, 0, 3.4, .2, 3.4, '#8b949b'); bx(hg, 0, 0, 1.52, .9, 1.9, .05, '#6b4a33');
    addCol(fx1 - 3.8, fz1 - 3.8, fx1 - .6, fz1 - .6);
    const roller = group(fx1 - 6, fz1 - 1.6); cylIn(roller, 0, .35, 0, .35, 1.2, '#5d636a', Math.PI / 2); poleIn(roller, [-.6, .35, 0], [-.3, .9, -1.2], .03, '#5d636a'); poleIn(roller, [.6, .35, 0], [.3, .9, -1.2], .03, '#5d636a');
    mapRects.push([fx0, fz0, fx1, fz1, '#c8683a']);
  }
  // ---- Cancha de beach vóley: arena con una red vieja ----
  {
    const vx = -259, vz = 413, HL = 8, HW = 3.6;
    flat.rect(vx - HL, vz - HW, vx + HL, vz + HW, .058, '#e2cf9c');
    for (let k = 0; k < 14; k++){ const x = R(vx - HL, vx + HL), z = R(vz - HW, vz + HW); flat.rect(x - .5, z - .3, x + .5, z + .3, .06, '#d2bd86'); }
    const ng = group(vx, vz, Math.PI / 2); poleIn(ng, [-3.4, 0, 0], [-3.4, 2.5, 0], .05, '#7a6a55'); poleIn(ng, [3.4, 0, 0], [3.4, 2.5, 0], .05, '#7a6a55');
    const net = new THREE.Mesh(new THREE.PlaneGeometry(6.8, .9), new THREE.MeshLambertMaterial({ color: 0x3a3a3a, transparent: true, opacity: .55, side: THREE.DoubleSide })); net.position.set(0, 1.95, 0); net.rotation.z = .04; ng.add(net);
    addCol(vx - .15, vz - 3.5, vx + .15, vz - 3.3); addCol(vx - .15, vz + 3.3, vx + .15, vz + 3.5);
    mapRects.push([vx - HL, vz - HW, vx + HL, vz + HW, '#e2cf9c']);
  }
  // ---- Caminito de tierra: de la entrada a un portón del otro lado (este) ----
  const PATH = [[cx, z0 - 1], [-297.3, 392.8], [-296.5, 402], [-295.3, 411.3], [-290, 418.5], [-285.3, 422.1], [-272, 422.5], [-260, 421.2], [-249, 419.3], [x1 + 1, 418]];
  flat.ribbon(PATH, 2.2, .057, '#a8825a');
  mapRoads.push({ pts: PATH, w: 2.2, col: '#a8825a', y: .057 });
  // ---- Árboles ----
  for (const [x, z, s] of [[-337.4, 484.4, 1.4], [-323.3, 490.5, 1.45], [-303.9, 489.1, 1.3], [-242.9, 451.5, 1.6], [-287.1, 408.2, .9], [-276, 414, .8], [-297, 429, 1], [-341, 455, 1.2], [-340, 440, 1.1]]) treeSpots.push([x, z, s, false]);
  // ---- Rejado perimetral del predio: entrada al norte (Bv. Independencia, lado de las vías) y portón al este ----
  const fence = (ax, az, bx2, bz) => { const l = Math.hypot(bx2 - ax, bz - az), n = Math.max(1, Math.round(l / 3)); for (let k = 0; k <= n; k++){ const t = k / n; poles.add(ax + (bx2 - ax) * t, 0, az + (bz - az) * t, .07, 2.1, .07, 0, '#7d858e'); } const fg = group(0, 0); poleIn(fg, [ax, 2.0, az], [bx2, 2.0, bz], .03, '#7d858e'); poleIn(fg, [ax, .1, az], [bx2, .1, bz], .03, '#7d858e'); const m = new THREE.Mesh(new THREE.PlaneGeometry(l, 1.95), new THREE.MeshLambertMaterial({ color: 0x8a9299, transparent: true, opacity: .25, side: THREE.DoubleSide, depthWrite: false })); m.position.set((ax + bx2) / 2, 1.05, (az + bz) / 2); m.rotation.y = Math.atan2(-(bz - az), bx2 - ax); scene.add(m); addCol(Math.min(ax, bx2) - .1, Math.min(az, bz) - .1, Math.max(ax, bx2) + .1, Math.max(az, bz) + .1); };
  fence(x0 - .5, z0 - .5, cx - 5, z0 - .5); fence(cx + 5, z0 - .5, x1 + .5, z0 - .5);
  fence(x0 - .5, z1 + .5, x1 + .5, z1 + .5); fence(x0 - .5, z0 - .5, x0 - .5, z1 + .5);
  fence(x1 + .5, z0 - .5, x1 + .5, 416); fence(x1 + .5, 420, x1 + .5, z1 + .5);
  // entrada con cartel
  { const g = group(cx, z0 - .5); for (const s of [-1, 1]) bx(g, s * 5.2, 0, 0, .5, 3.6, .5, '#e8e4da'); bx(g, 0, 3.6, 0, 11, .5, .4, '#2a5aa8'); signIn(g, 'POLIDEPORTIVO GRAL. SAN MARTÍN', 0, 3.85, -.22, 9.5, .42, '#2a5aa8', '#ffffff', Math.PI); addCol(cx - 5.5, z0 - .8, cx - 4.9, z0 - .2); addCol(cx + 4.9, z0 - .8, cx + 5.5, z0 - .2); }
  // portón del lado este (abierto)
  { const g = group(x1 + .5, 416, 0); poleIn(g, [0, 0, 0], [0, 2.1, 0], .06, '#5d646b'); for (let k = 0; k <= 6; k++) poleIn(g, [-k * .45 - .2, .1, -.2], [-k * .45 - .2, 1.9, -.2], .02, '#5d646b'); poleIn(g, [-.2, 1.9, -.2], [-3, 1.9, -.2], .03, '#5d646b'); }
  mapLabels.push([cx, cz, 'Polideportivo']);
}


/* ---------- Complejo ferroviario real (FC Mitre) ---------- */
}
