// Auditoría y generación automática de colisiones y pisos caminables (escaleras, veredas, canteros, columnas de luz)
export function buildMissingCollisions(ctx) {
  const { THREE, scene, ground, hash, carHash, CELL, addCol, addColOBB, addFloor, addFloorOBB, pointOnRoad, poles } = ctx;

  scene.updateMatrixWorld(true);

  const hk = (i, j) => i * 100003 + j;
  const hasColAt = (x, z, pad = 0.08) => {
    const l = hash.get(hk(Math.floor(x / CELL), Math.floor(z / CELL)));
    if (!l) return false;
    for (let k = 0; k < l.length; k++) {
      const b = l[k];
      if (b.obb) {
        const dx = x - b.cx, dz = z - b.cz;
        const lx = dx * b.c - dz * b.s;
        const lz = dx * b.s + dz * b.c;
        if (Math.abs(lx) <= b.hx + pad && Math.abs(lz) <= b.hz + pad) return true;
      } else if (x >= b.x0 - pad && x <= b.x1 + pad && z >= b.z0 - pad && z <= b.z1 + pad) {
        return true;
      }
    }
    return false;
  };

  // 1) Registrar TODAS las veredas, cordones y canteros centrales de los bulevares (carHash) como pisos caminables a y = 0.095
  let addedFloors = 0;
  {
    const seenCar = new Set();
    for (const arr of carHash.values()) {
      for (const b of arr) {
        if (seenCar.has(b)) continue;
        seenCar.add(b);
        addFloor(b.x0, b.z0, b.x1, b.z1, 0.095);
        addedFloors++;
      }
    }
  }

  // 2) Colisiones para TODAS las columnas de luz, faroles y postes verticales instanciados en poles.list
  let addedPoles = 0;
  if (poles && poles.list) {
    for (let i = 0; i < poles.list.length; i++) {
      const p = poles.list[i]; // [x, y, z, sx, sy, sz, ry, col]
      const x = p[0], y = p[1], z = p[2], sx = p[3], sy = p[4];
      if (sy < 1.5 || y > 1.2) continue;
      if (hasColAt(x, z, 0.05)) continue;
      const r = Math.max(0.15, sx * 0.55);
      addCol(x - r, z - r, x + r, z + r, y + sy);
      addedPoles++;
    }
  }

  // Zonas de puertas transitables donde nunca debe bloquearse el acceso (ej. Comuna)
  const nearDoor = (x, z) =>
    Math.hypot(x - 32.0, z - (-402.1)) < 1.8 ||
    Math.hypot(x - 8000, z - 8006.7) < 1.8;

  const wPos = new THREE.Vector3();
  const wQuat = new THREE.Quaternion ? new THREE.Quaternion() : null;
  const wScale = new THREE.Vector3();
  const wEuler = new THREE.Euler ? new THREE.Euler(0, 0, 0, 'YXZ') : null;
  const box3 = new THREE.Box3();
  let addedAABB = 0, addedOBB = 0;

  scene.traverse(obj => {
    if (!obj.isMesh || obj.isInstancedMesh || obj === ground || !obj.visible) return;
    const geo = obj.geometry;
    if (!geo) return;
    const gtype = geo.type || '';
    if (gtype === 'PlaneGeometry' || gtype === 'CircleGeometry' || gtype === 'RingGeometry' ||
        gtype === 'SphereGeometry' || gtype === 'IcosahedronGeometry' || gtype === 'ConeGeometry' || gtype === 'TorusGeometry') return;

    let wx = 0, wy = 0, wz = 0, ry = 0, sx = 1, sy = 1, sz = 1;
    if (obj.matrixWorld && obj.matrixWorld.decompose && wQuat && wEuler) {
      obj.matrixWorld.decompose(wPos, wQuat, wScale);
      wEuler.setFromQuaternion(wQuat, 'YXZ');
      if (Math.abs(wEuler.x) > 0.25 || Math.abs(wEuler.z) > 0.25) return;
      wx = wPos.x; wy = wPos.y; wz = wPos.z; ry = wEuler.y;
      sx = Math.abs(wScale.x); sy = Math.abs(wScale.y); sz = Math.abs(wScale.z);
    } else {
      wx = obj._wx || obj.position.x; wy = obj._wy || obj.position.y; wz = obj._wz || obj.position.z;
      ry = obj._wry || obj.rotation.y || 0;
      sx = Math.abs(obj.scale.x || 1); sy = Math.abs(obj.scale.y || 1); sz = Math.abs(obj.scale.z || 1);
    }

    if (gtype === 'BoxGeometry' && geo.parameters) {
      const bw = geo.parameters.width * sx;
      const bh = geo.parameters.height * sy;
      const bd = geo.parameters.depth * sz;
      const yMin = wy - bh / 2;
      const yMax = wy + bh / 2;
      const hx = bw / 2, hz = bd / 2;
      const axisAligned = Math.abs(Math.sin(2 * ry)) < 0.08;

      // 3a) Escalones, escaleras (ej. Parroquia, Escenario Festival), andenes y plataformas caminables bajas
      if (yMax > 0.14 && yMin < 1.8 && bh >= 0.08 && bh <= 0.45 && Math.min(bw, bd) >= 0.28 && Math.max(bw, bd) >= 0.45) {
        if (axisAligned) {
          const rot90 = Math.abs(Math.sin(ry)) > 0.7;
          const ax = rot90 ? hz : hx, az = rot90 ? hx : hz;
          addFloor(wx - ax, wz - az, wx + ax, wz + az, yMax);
        } else {
          addFloorOBB(wx, wz, hx, hz, ry, yMax);
        }
        addedFloors++;
        // Si es un escalón bajo (<= 0.42 m), no lo bloqueamos como pared: se sube caminando!
        if (bh <= 0.42) return;
      }

      // 3b) Obstáculos sólidos a altura caminable/manejable (excluye techos, aleros, pisos, baldosas, molduras finas)
      if (yMin >= 1.65 || yMax <= 0.35) return;
      if (bh < 0.38) return;
      if (Math.max(bw, bd) < 0.24 || Math.min(bw, bd) < 0.08) return;
      if (nearDoor(wx, wz)) return;
      if (Math.max(bw, bd) > 2.5 && pointOnRoad && pointOnRoad(wx, wz)) return;

      // Comprobar si ya está cubierto por una colisión existente
      const c = Math.cos(ry), s = Math.sin(ry);
      const checkPts = [[wx, wz]];
      if (bw >= bd && bw > 1.2) {
        const off = hx * 0.72;
        checkPts.push([wx + c * off, wz - s * off], [wx - c * off, wz + s * off]);
      } else if (bd > 1.2) {
        const off = hz * 0.72;
        checkPts.push([wx + s * off, wz + c * off], [wx - s * off, wz - c * off]);
      }
      if (checkPts.every(([px, pz]) => hasColAt(px, pz))) return;

      if (axisAligned) {
        const rot90 = Math.abs(Math.sin(ry)) > 0.7;
        const ax = rot90 ? hz : hx, az = rot90 ? hx : hz;
        addCol(wx - ax, wz - az, wx + ax, wz + az, yMax);
        addedAABB++;
      } else {
        addColOBB(wx, wz, hx, hz, ry, yMax);
        addedOBB++;
      }
      return;
    }

    if (gtype === 'CylinderGeometry' && geo.parameters) {
      const r = Math.max(geo.parameters.radiusTop || 0, geo.parameters.radiusBottom || 0) * Math.max(sx, sz);
      const h = (geo.parameters.height || 0) * sy;
      const yMin = wy - h / 2, yMax = wy + h / 2;
      if (yMin >= 1.65 || yMax <= 0.35 || h < 0.45 || r < 0.14) return;
      if (nearDoor(wx, wz) || hasColAt(wx, wz)) return;
      addCol(wx - r, wz - r, wx + r, wz + r, yMax);
      addedAABB++;
      return;
    }

    if (gtype === 'ExtrudeGeometry' && box3.setFromObject) {
      box3.setFromObject(obj);
      const yMin = box3.min.y, yMax = box3.max.y;
      const bw = box3.max.x - box3.min.x, bd = box3.max.z - box3.min.z, bh = yMax - yMin;
      if (yMin >= 1.65 || yMax <= 0.35 || bh < 0.45 || bw < 0.3 || bd < 0.3 || bw > 45 || bd > 45) return;
      const cx = (box3.min.x + box3.max.x) / 2, cz = (box3.min.z + box3.max.z) / 2;
      if (nearDoor(cx, cz) || hasColAt(cx, cz)) return;
      if (pointOnRoad && pointOnRoad(cx, cz)) return;
      addCol(box3.min.x, box3.min.z, box3.max.x, box3.max.z, yMax);
      addedAABB++;
    }
  });

  console.log(`[colisiones] pisos/escalones: ${addedFloors} | columnas luz: ${addedPoles} | paredes: ${addedAABB} AABB + ${addedOBB} OBB`);
}
