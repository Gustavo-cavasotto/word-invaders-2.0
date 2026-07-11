import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Mesh, Vector3 } from 'three';
import type { ProjectileProps } from '../../types/game';

export function Projectile({
  origin,
  direction,
  speed = 8,
  maxDistance = 20,
  onExpire,
}: ProjectileProps) {
  const meshRef = useRef<Mesh>(null);
  const [isAlive, setIsAlive] = useState(true);
  const originVec = useRef(new Vector3(...origin));
  const directionVec = useRef(new Vector3(...direction).normalize());

  useFrame((_state, delta) => {
    if (!meshRef.current || !isAlive) return;

    meshRef.current.position.addScaledVector(directionVec.current, speed * delta);

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
