import { Float, Grid, Stars, useGLTF } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense, useRef } from "react";
import { Group } from "three";
import { INVADER_MODEL_URL } from "@/game/assets";

function InvaderModel() {
  const groupRef = useRef<Group>(null);
  const { scene } = useGLTF(INVADER_MODEL_URL);

  useFrame((_state, delta) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y += delta * 0.3;
  });

  return (
    <Float speed={2.2} rotationIntensity={0.35} floatIntensity={0.6}>
      {/* pivô do modelo fica na base (y=0), ~1 unidade de altura;
          rotação inicial deixa a cara voltada pra câmera */}
      <group ref={groupRef} position={[0, 1.15, 0]} scale={1.2} rotation={[0, -1.7, 0]}>
        <primitive object={scene} />
      </group>
    </Float>
  );
}

export function HomeScene() {
  return (
    <Canvas
      camera={{ position: [0, 1.3, 4.5], fov: 55 }}
      gl={{ alpha: true }}
      onCreated={({ camera }) => camera.lookAt(0, 1.1, 0)}
    >
      <ambientLight intensity={1.4} />
      <directionalLight position={[3, 5, 4]} intensity={3} />
      <pointLight position={[0, 2.2, 2.5]} intensity={8} distance={8} />
      <pointLight position={[-2, 1.5, -1]} intensity={4} distance={8} color="#A6E85C" />

      <Suspense fallback={null}>
        <InvaderModel />
      </Suspense>

      <Grid
        args={[30, 30]}
        position={[0, -0.4, 0]}
        cellSize={0.5}
        cellThickness={1}
        cellColor="#8FD95C"
        sectionSize={2.5}
        sectionThickness={1.4}
        sectionColor="#A6E85C"
        fadeDistance={16}
        fadeStrength={1.5}
        infiniteGrid
      />

      <Stars radius={40} depth={30} count={900} factor={3} saturation={0} fade speed={0.6} />
    </Canvas>
  );
}
