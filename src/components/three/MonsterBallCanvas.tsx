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

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.x += delta * 0.3;
    groupRef.current.rotation.y += delta * 0.8;
  });

  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[2, 3, 4]} intensity={0.8} />
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
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[1.02, 1.02, 0.12, 32]} />
          <meshStandardMaterial color="#111111" />
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
      <Canvas camera={{ position: [0, 0, 3], fov: 50 }}>
        <MonsterBallScene />
      </Canvas>
    </div>
  );
}
