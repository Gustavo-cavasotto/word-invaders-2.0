import { useFrame, useThree } from '@react-three/fiber';
import { Vector3 } from 'three';
import { useRef } from 'react';

export function usePlayerPosition(): Vector3 {
  const positionRef = useRef(new Vector3(0, 1.6, 0));
  const { camera } = useThree();

  useFrame(() => {
    positionRef.current.copy(camera.position);
  });

  return positionRef.current;
}
