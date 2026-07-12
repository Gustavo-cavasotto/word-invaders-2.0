import { useEffect, useRef, useState } from 'react';
import { Clone, useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { Group, Vector3 } from 'three';
import { usePlayerPosition } from '../../hooks/usePlayerPosition';
import { INVADER_MODEL_URL } from '../../game/assets';
import { registerInvader, unregisterInvader } from '../../game/invaderRegistry';
import type { InvaderProps } from '../../types/game';

export function Invader({
  initialPosition,
  speed = 0.5,
  onReachPlayer,
  onDestroy,
}: InvaderProps) {
  const groupRef = useRef<Group>(null);
  const [isAlive, setIsAlive] = useState(true);
  const playerPosition = usePlayerPosition();
  const { scene } = useGLTF(INVADER_MODEL_URL);

  useEffect(() => {
    if (!groupRef.current || !isAlive) return;
    const id = registerInvader(groupRef.current, () => {
      setIsAlive(false);
      onDestroy?.();
    });
    return () => unregisterInvader(id);
  }, [isAlive, onDestroy]);

  useFrame((_state, delta) => {
    if (!groupRef.current || !isAlive) return;

    const direction = new Vector3()
      .subVectors(playerPosition, groupRef.current.position)
      .normalize();

    groupRef.current.position.addScaledVector(direction, speed * delta);
    groupRef.current.lookAt(playerPosition);

    const distance = groupRef.current.position.distanceTo(playerPosition);
    if (distance < 0.5) {
      setIsAlive(false);
      onReachPlayer?.();
      onDestroy?.();
    }
  });

  if (!isAlive) return null;

  return (
    <group ref={groupRef} position={initialPosition}>
      {/* a "cara" do modelo aponta ~+X e o pivô fica na base: a rotação
          alinha a cara ao +Z do grupo (direção do lookAt) e o offset em Y
          centraliza o corpo no ponto usado pelo hit test (~0.4 de altura) */}
      <Clone
        object={scene}
        rotation={[0, -1.7, 0]}
        position={[0, -0.2, 0]}
        scale={0.4}
      />
    </group>
  );
}

if (import.meta.env.MODE !== 'test') {
  useGLTF.preload(INVADER_MODEL_URL);
}
