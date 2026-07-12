import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Mesh, Vector3 } from 'three';
import { checkProjectileHit } from '../../game/invaderRegistry';
import type { ProjectileProps } from '../../types/game';

export function Projectile({
  origin,
  direction,
  speed = 8,
  maxDistance = 20,
  hitRadius = 0.2,
  onExpire,
}: ProjectileProps) {
  const meshRef = useRef<Mesh>(null);
  const [isAlive, setIsAlive] = useState(true);
  const originVec = useRef(new Vector3(...origin));
  const directionVec = useRef(new Vector3(...direction).normalize());
  const prevPosition = useRef(new Vector3(...origin));

  useFrame((_state, delta) => {
    if (!meshRef.current || !isAlive) return;

    prevPosition.current.copy(meshRef.current.position);
    meshRef.current.position.addScaledVector(directionVec.current, speed * delta);

    if (checkProjectileHit(prevPosition.current, meshRef.current.position, hitRadius)) {
      setIsAlive(false);
      onExpire();
      return;
    }

    if (meshRef.current.position.distanceTo(originVec.current) > maxDistance) {
      setIsAlive(false);
      onExpire();
    }
  });

  if (!isAlive) return null;

  return (
    <mesh ref={meshRef} position={origin}>
      <boxGeometry args={[0.1, 0.1, 0.1]} />
      <meshStandardMaterial
        color="yellow"
        emissive="orange"
        emissiveIntensity={0.8}
      />
    </mesh>
  );
}
