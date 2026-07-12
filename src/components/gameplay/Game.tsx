import { Canvas } from '@react-three/fiber';
import { DeviceOrientationControls } from '@react-three/drei';
import { XR, XRDomOverlay, createXRStore, type XRStore } from '@react-three/xr';
import { useState, useEffect } from 'react';
import { AutoEnterAR } from '../xr/AutoEnterAR';
import { Crosshair } from '../xr/Crosshair';
import { InvaderSpawner } from '../xr/InvaderSpawner';
import { PlayerWeapon } from '../xr/PlayerWeapon';
import { RadarTracker } from '../xr/RadarTracker';
import { NoXR } from '../xr/NoXR';
import { Radar } from './Radar';

const store = createXRStore(
  import.meta.env.MODE === 'test'
    ? { emulate: false }
    : 
      { emulate: { syntheticEnvironment: false } },
);


export function exitAR() {
  store.getState().session?.end();
}

type GameProps = {
  autoEnterAR?: boolean;
  onPlayerHit?: () => void;
};

const Game: React.FC<GameProps> = ({ autoEnterAR = false, onPlayerHit }) => {
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

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative' }}>
      <Canvas
        camera={{ position: [0, 1.6, 0], fov: 75 }}
        gl={{ alpha: true }}
        onCreated={({ camera }) => camera.lookAt(0, 1.6, -1)}
      >
        <XR store={store}>

          {autoEnterAR && <AutoEnterAR />}

          {!isARActive && <DeviceOrientationControls />}

          <ambientLight intensity={1} />
          <directionalLight position={[5, 5, 5]} intensity={2} />
          <directionalLight position={[-5, 3, -5]} intensity={1} />
          <pointLight position={[0, 2, 0]} intensity={1} />

          <InvaderSpawner onPlayerHit={onPlayerHit} />

          <PlayerWeapon />

          <Crosshair />

          <RadarTracker />

          {/* durante a sessão AR só o dom-overlay é visível, então o HUD
              precisa ser portalado pra lá */}
          <XRDomOverlay>
            <Radar />
          </XRDomOverlay>

        </XR>
      </Canvas>

      {!isARActive && <Radar />}

      {!isXRSupported && <NoXR />}
    </div>
  );
};

export default Game;
