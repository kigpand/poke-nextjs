"use client";

import dynamic from "next/dynamic";
import type { Group } from "three";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";

const Canvas = dynamic(
  () => import("@react-three/fiber").then((mod) => mod.Canvas),
  { ssr: false }
);

function MonsterBallScene() {
  const groupRef = useRef<Group>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.x = 0;
    groupRef.current.rotation.y = 0;
    const t = state.clock.getElapsedTime();
    const cycle = 2.2;
    const phase = t % cycle;
    const shakeDuration = 0.7;
    if (phase < shakeDuration) {
      const progress = phase / shakeDuration;
      const ease = 1 - Math.pow(1 - progress, 3);
      const wobble = Math.sin(progress * Math.PI * 6) * 0.25;
      groupRef.current.rotation.z = wobble * (1 - ease);
    } else {
      groupRef.current.rotation.z = 0;
    }
  });

  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[2, 3, 4]} intensity={0.7} />
      <group ref={groupRef}>
        <mesh>
          <sphereGeometry args={[1, 32, 32, 0, Math.PI * 2, 0, Math.PI / 2]} />
          <meshStandardMaterial color="#e53935" />
        </mesh>
        <mesh>
          <sphereGeometry
            args={[1, 32, 32, 0, Math.PI * 2, Math.PI / 2, Math.PI / 2]}
          />
          <meshStandardMaterial color="#f5f5f5" />
        </mesh>
        <mesh position={[0, 0, 1.03]}>
          <circleGeometry args={[0.22, 32]} />
          <meshStandardMaterial color="#f5f5f5" />
        </mesh>
        <mesh position={[0, 0, 1.04]}>
          <circleGeometry args={[0.12, 32]} />
          <meshStandardMaterial color="#111111" />
        </mesh>
      </group>
    </>
  );
}

type Props = {
  className?: string;
};

export function MonsterBallCanvas({ className }: Props) {
  return (
    <div className={className}>
      <Canvas
        camera={{ position: [0, 0, 3], fov: 50 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, powerPreference: "low-power" }}
      >
        <MonsterBallScene />
      </Canvas>
    </div>
  );
}
