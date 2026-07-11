import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Mesh, Vector3 } from 'three';
import { usePlayerPosition } from '../../hooks/usePlayerPosition';
import type { InvaderProps } from '../../types/game';

export function Invader({
  initialPosition,
  speed = 0.5,
  onReachPlayer,
  onDestroy,
}: InvaderProps) {
  const meshRef = useRef<Mesh>(null);
  const [isAlive, setIsAlive] = useState(true);
  const playerPosition = usePlayerPosition();

  useFrame((_state, delta) => {
    if (!meshRef.current || !isAlive) return;

    const direction = new Vector3()
      .subVectors(playerPosition, meshRef.current.position)
      .normalize();

    meshRef.current.position.addScaledVector(direction, speed * delta);

    meshRef.current.rotation.x += delta;
    meshRef.current.rotation.y += delta * 0.5;

    const distance = meshRef.current.position.distanceTo(playerPosition);
    if (distance < 0.5) {
      setIsAlive(false);
      onReachPlayer?.();
      onDestroy?.();
    }
  });

  if (!isAlive) return null;

  return (
    <mesh ref={meshRef} position={initialPosition}>
      <boxGeometry args={[0.3, 0.3, 0.3]} />
      <meshStandardMaterial
        color="red"
        emissive="darkred"
        emissiveIntensity={0.5}
      />
    </mesh>
  );
}
