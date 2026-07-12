import { Canvas } from '@react-three/fiber';
import { DeviceOrientationControls, Grid } from '@react-three/drei';
import { XR, createXRStore, type XRStore } from '@react-three/xr';
import { Suspense, useState, useEffect } from 'react';
import { Crosshair } from '../xr/Crosshair';
import { Invader } from '../xr/Invader';
import { PlayerWeapon } from '../xr/PlayerWeapon';
import { NoXR } from '../xr/NoXR';

const store = createXRStore(import.meta.env.MODE === 'test' ? { emulate: false } : undefined);


export function exitAR() {
  store.getState().session?.end();
}

type GameProps = {
  autoEnterAR?: boolean;
};

const Game: React.FC<GameProps> = ({ autoEnterAR = false }) => {
  const [isXRSupported, setIsXRSupported] = useState(false);
  const [isARActive, setIsARActive] = useState(false);

  useEffect(() => {
    if ('xr' in navigator) {
      const xr = (navigator as { xr?: { isSessionSupported: (mode: string) => Promise<boolean> } }).xr;
      xr?.isSessionSupported('immersive-ar').then((supported: boolean) => {
        setIsXRSupported(supported);
      }).catch((err) => {
        console.error('Erro ao verificar suporte AR:', err);
        setIsXRSupported(false);
      });
    }
    const unsubscribe = store.subscribe((state: ReturnType<XRStore['getState']>) => {
      setIsARActive(state.session !== null && state.session !== undefined);
    });

    const currentState = store.getState();
    setIsARActive(currentState.session !== null && currentState.session !== undefined);

    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    /* TODO - Esse useEffect criminoso aqui, vou refatorar dps */
    if (!autoEnterAR || store.getState().session) return;

    let cancelled = false;
    let attempts = 0;
    const tryEnter = async () => {
      if (cancelled) return;
      try {
        await store.enterAR();
      } catch (error) {
        if (cancelled) return;
        if (attempts++ < 20 && String(error).includes('not connected')) {
          setTimeout(tryEnter, 100);
        } else {
          console.warn('Entrada automática no AR falhou:', error);
        }
      }
    };
    tryEnter();

    return () => {
      cancelled = true;
    };
  }, [autoEnterAR]);


  return (
    <div style={{ width: '100%', height: '100%', position: 'relative' }}>
      <Canvas
        camera={{ position: [0, 1.6, 0], fov: 75 }}
        gl={{ alpha: true }}
        onCreated={({ camera }) => camera.lookAt(0, 1.6, -1)}
      >
        <XR store={store}>

          {!isARActive && <DeviceOrientationControls />}

          <ambientLight intensity={1} />
          <directionalLight position={[5, 5, 5]} intensity={2} />
          <directionalLight position={[-5, 3, -5]} intensity={1} />
          <pointLight position={[0, 2, 0]} intensity={1} />

          {/* <Suspense fallback={null}>
            <Invader
              initialPosition={[0, 1.5, -3]}
              speed={0.5}
              onReachPlayer={() => console.log('Player hit!')}
              onDestroy={() => console.log('Invader destroyed!')}
            />
          </Suspense> */}

          <PlayerWeapon />

          <Crosshair />


        </XR>
      </Canvas>


      {!isXRSupported && <NoXR />}
    </div>
  );
};

export default Game;
