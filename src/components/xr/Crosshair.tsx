import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { DoubleSide, Group, Vector3 } from 'three';
import type { CrosshairProps } from '../../types/game';

const TICK_LENGTH = 0.07;
const TICK_THICKNESS = 0.014;
const GAP = 0.04;
const TICK_OFFSET = GAP + TICK_LENGTH / 2;
const COLOR = '#00ff88';

/**
 * Mira estilo FPS: cruz de quatro traços com abertura central e ponto
 * no meio, fixa no centro da visão e marcando de onde o tiro sai.
 * Feita em 3D (e não como overlay DOM) para também aparecer na sessão AR.
 */
export function Crosshair({ distance = 2 }: CrosshairProps) {
  const groupRef = useRef<Group>(null);
  const directionRef = useRef(new Vector3());

  useFrame(({ camera }) => {
    if (!groupRef.current) return;

    camera.getWorldDirection(directionRef.current);
    groupRef.current.position
      .copy(camera.position)
      .addScaledVector(directionRef.current, distance);
    groupRef.current.quaternion.copy(camera.quaternion);
  });

  const ticks: { position: [number, number, number]; size: [number, number] }[] = [
    { position: [0, TICK_OFFSET, 0], size: [TICK_THICKNESS, TICK_LENGTH] },
    { position: [0, -TICK_OFFSET, 0], size: [TICK_THICKNESS, TICK_LENGTH] },
    { position: [-TICK_OFFSET, 0, 0], size: [TICK_LENGTH, TICK_THICKNESS] },
    { position: [TICK_OFFSET, 0, 0], size: [TICK_LENGTH, TICK_THICKNESS] },
  ];

  return (
    <group ref={groupRef}>
      {ticks.map((tick, index) => (
        <mesh key={index} position={tick.position} renderOrder={999}>
          <planeGeometry args={tick.size} />
          <meshBasicMaterial color={COLOR} side={DoubleSide} depthTest={false} />
        </mesh>
      ))}

      {/* Ponto central */}
      <mesh renderOrder={999}>
        <circleGeometry args={[0.008, 16]} />
        <meshBasicMaterial color={COLOR} side={DoubleSide} depthTest={false} />
      </mesh>

      {/* Anel externo sutil para fechar a mira */}
      <mesh renderOrder={999}>
        <ringGeometry args={[0.115, 0.122, 48]} />
        <meshBasicMaterial
          color={COLOR}
          transparent
          opacity={0.35}
          side={DoubleSide}
          depthTest={false}
        />
      </mesh>
    </group>
  );
}
