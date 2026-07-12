import { Suspense, useCallback, useEffect, useRef, useState } from 'react';
import { Invader } from './Invader';
import { usePlayerPosition } from '../../hooks/usePlayerPosition';
import type { InvaderData } from '../../types/game';

const SPAWN_INTERVAL_MS = 3000;
const SPAWN_DISTANCE = 4;

export function InvaderSpawner() {
  const playerPosition = usePlayerPosition();
  const [invaders, setInvaders] = useState<InvaderData[]>([]);
  const nextIdRef = useRef(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const angle = Math.random() * Math.PI * 2;
      setInvaders((prev) => [
        ...prev,
        {
          id: nextIdRef.current++,
          position: [
            playerPosition.x + Math.sin(angle) * SPAWN_DISTANCE,
            1.5,
            playerPosition.z + Math.cos(angle) * SPAWN_DISTANCE,
          ],
        },
      ]);
    }, SPAWN_INTERVAL_MS);

    return () => clearInterval(interval);
  }, [playerPosition]);

  const removeInvader = useCallback((id: number) => {
    setInvaders((prev) => prev.filter((invader) => invader.id !== id));
  }, []);

  return (
    <Suspense fallback={null}>
      {invaders.map((invader) => (
        <Invader
          key={invader.id}
          initialPosition={invader.position}
          speed={0.5}
          onReachPlayer={() => console.log('Player hit!')}
          onDestroy={() => removeInvader(invader.id)}
        />
      ))}
    </Suspense>
  );
}
