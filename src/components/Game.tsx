import { Canvas } from '@react-three/fiber';
import { Grid } from '@react-three/drei';
import { XR, createXRStore, type XRStore } from '@react-three/xr';
import { useState, useEffect } from 'react';
import { Crosshair } from './xr/Crosshair';
import { Invader } from './xr/Invader';
import { PlayerWeapon } from './xr/PlayerWeapon';
import { XRControls } from './xr/XRControls';
import { NoXR } from './xr/NoXR';

const store = createXRStore();

const Game: React.FC = () => {
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

  const handleEnterAR = async () => {
    try {

      const currentState = store.getState();

      if (currentState.session) {
        await currentState.session.end();
        await new Promise(resolve => setTimeout(resolve, 500));
      }

      await store.enterAR();
    } catch (error) {
      console.error('XR Error:', error);
    }
  };

  const handleExitAR = () => {
    const session = store.getState().session;
    if (session) {
      session.end();
    }
  };

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative' }}>
      <Canvas
        camera={{ position: [0, 1.6, 0], fov: 75 }}
        gl={{ alpha: true }}
      >
        <XR store={store}>

          <ambientLight intensity={1} />
          <directionalLight position={[5, 5, 5]} intensity={2} />
          <directionalLight position={[-5, 3, -5]} intensity={1} />
          <pointLight position={[0, 2, 0]} intensity={1} />

          <Invader
            initialPosition={[0, 1.5, -3]}
            speed={0.5}
            onReachPlayer={() => console.log('Player hit!')}
            onDestroy={() => console.log('Invader destroyed!')}
          />

          <PlayerWeapon />

          <Crosshair />

          <Grid
            args={[10, 10]}
            position={[0, -0.5, 0]}
            cellSize={0.5}
            cellThickness={1}
            cellColor="#ff0000"
            sectionSize={1}
            sectionThickness={1.5}
            sectionColor="#00ff00"
            fadeDistance={25}
            fadeStrength={1}
          />
        </XR>
      </Canvas>

      {/* Controles AR */}
      <XRControls
        isXRSupported={isXRSupported}
        isARActive={isARActive}
        onEnterAR={handleEnterAR}
        onExitAR={handleExitAR}
      />

      {/* Mensagem quando WebXR não está disponível */}
      {!isXRSupported && <NoXR />}

      {/* Status info */}
      <div
        style={{
          position: 'absolute',
          top: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          background: 'rgba(0, 0, 0, 0.7)',
          color: 'white',
          padding: '10px 20px',
          borderRadius: '8px',
          fontSize: '12px',
          zIndex: 1000,
          maxWidth: '90%',
        }}
      >
        <div>Word Invaders AR {isARActive ? '🟢' : '⚪'}</div>
        <div style={{ fontSize: '10px', marginTop: '5px' }}>
          {isARActive ? '✅ Mova a câmera no emulador WebXR' : '⏸️ Clique em "Enter AR" para começar'}
        </div>
      </div>
    </div>
  );
};

export default Game;
