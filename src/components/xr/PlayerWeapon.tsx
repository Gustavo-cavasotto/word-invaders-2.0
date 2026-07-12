import { useCallback, useEffect, useRef, useState } from 'react';
import { useThree } from '@react-three/fiber';
import { useXR } from '@react-three/xr';
import { Vector3 } from 'three';
import { Projectile } from './Projectile';
import type { ProjectileData } from '../../types/game';

/**
 * Arma do jogador: dispara um cubo da posição da câmera na direção
 * do olhar ao tocar na tela (pointerdown fora do AR, select dentro do AR).
 */
export function PlayerWeapon() {
  const { camera, gl } = useThree();
  const session = useXR((state) => state.session);
  const [projectiles, setProjectiles] = useState<ProjectileData[]>([]);
  const nextIdRef = useRef(0);

  const fire = useCallback(() => {
    const direction = new Vector3();
    camera.getWorldDirection(direction);

    const origin = camera.position.clone().addScaledVector(direction, 0.3);

    setProjectiles((prev) => [
      ...prev,
      {
        id: nextIdRef.current++,
        origin: [origin.x, origin.y, origin.z],
        direction: [direction.x, direction.y, direction.z],
      },
    ]);
  }, [camera]);

  useEffect(() => {
    // Fora do AR: toque/clique no canvas. Dentro do AR o toque vira
    // evento "select" da sessão, então ignoramos o pointerdown para
    // não disparar duas vezes.
    const handlePointerDown = () => {
      if (session) return;
      fire();
    };

    const canvas = gl.domElement;
    canvas.addEventListener('pointerdown', handlePointerDown);
    session?.addEventListener('select', fire);

    return () => {
      canvas.removeEventListener('pointerdown', handlePointerDown);
      session?.removeEventListener('select', fire);
    };
  }, [session, gl, fire]);

  const removeProjectile = useCallback((id: number) => {
    setProjectiles((prev) => prev.filter((p) => p.id !== id));
  }, []);

  return (
    <>
      {projectiles.map((projectile) => (
        <Projectile
          key={projectile.id}
          origin={projectile.origin}
          direction={projectile.direction}
          onExpire={() => removeProjectile(projectile.id)}
        />
      ))}
    </>
  );
}
