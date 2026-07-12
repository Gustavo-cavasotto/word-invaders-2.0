import { Canvas } from '@react-three/fiber';
import { DeviceOrientationControls, Grid } from '@react-three/drei';
import { XR, createXRStore, type XRStore } from '@react-three/xr';
import { Suspense, useState, useEffect } from 'react';
import { Crosshair } from './xr/Crosshair';
import { Invader } from './xr/Invader';
import { PlayerWeapon } from './xr/PlayerWeapon';
import { XRControls } from './xr/XRControls';
import { NoXR } from './xr/NoXR';

// emulate: false em testes — o emulador (iwer) exige WebGL, que não existe no jsdom
const store = createXRStore(import.meta.env.MODE === 'test' ? { emulate: false } : undefined);

type GameProps = {
  /** Entra no AR automaticamente ao montar (precisa da user activation do clique que navegou até aqui) */
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
    if (!autoEnterAR || store.getState().session) return;

    // enterAR rejeita enquanto o <XR>/Canvas não conecta ao renderer; tenta em
    // intervalos curtos até conectar, dentro da janela de user activation do clique
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
          // AR indisponível (ex.: desktop) — ficam os overlays XRControls/NoXR
          console.warn('Entrada automática no AR falhou:', error);
        }
      }
    };
    tryEnter();

    return () => {
      cancelled = true;
    };
  }, [autoEnterAR]);

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
        // o r3f aponta a câmera default para a origem (reto pro chão a partir
        // de [0,1.6,0]); olhar para -z na altura dos olhos corrige a visão
        // fora do AR (no AR a pose XR assume, no celular o giroscópio)
        onCreated={({ camera }) => camera.lookAt(0, 1.6, -1)}
      >
        <XR store={store}>

          {!isARActive && <DeviceOrientationControls />}

          <ambientLight intensity={1} />
          <directionalLight position={[5, 5, 5]} intensity={2} />
          <directionalLight position={[-5, 3, -5]} intensity={1} />
          <pointLight position={[0, 2, 0]} intensity={1} />

          <Suspense fallback={null}>
            <Invader
              initialPosition={[0, 1.5, -3]}
              speed={0.5}
              onReachPlayer={() => console.log('Player hit!')}
              onDestroy={() => console.log('Invader destroyed!')}
            />
          </Suspense>

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

      <XRControls
        isXRSupported={isXRSupported}
        isARActive={isARActive}
        onEnterAR={handleEnterAR}
        onExitAR={handleExitAR}
      />

      {!isXRSupported && <NoXR />}

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
