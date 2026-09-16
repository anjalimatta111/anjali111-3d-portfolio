import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Environment, Lightformer } from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";

function seeded(i: number) {
  const x = Math.sin(i * 127.1) * 43758.5453;
  return x - Math.floor(x);
}

function Constellation() {
  const group = useRef<THREE.Group>(null);

  const nodes = useMemo(() => {
    const list: THREE.Vector3[] = [];
    const count = 46;
    for (let i = 0; i < count; i++) {
      const y = 1 - (i / (count - 1)) * 2;
      const r = Math.sqrt(Math.max(0, 1 - y * y));
      const theta = i * 2.399963;
      const radius = 2.05 + seeded(i) * 0.35;
      list.push(
        new THREE.Vector3(
          Math.cos(theta) * r * radius,
          y * radius * 0.85,
          Math.sin(theta) * r * radius,
        ),
      );
    }
    return list;
  }, []);

  const lineGeometry = useMemo(() => {
    const pts: THREE.Vector3[] = [];
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const a = nodes[i];
        const b = nodes[j];
        if (a && b && a.distanceTo(b) < 1.5) {
          pts.push(a, b);
        }
      }
    }
    return new THREE.BufferGeometry().setFromPoints(pts);
  }, [nodes]);

  useFrame(({ pointer }, delta) => {
    const g = group.current;
    if (!g) return;
    const dt = Math.min(delta, 0.05);
    g.rotation.y += dt * 0.14;
    const targetX = pointer.y * 0.22;
    const targetZ = pointer.x * 0.14;
    const k = 1 - Math.exp(-3 * dt);
    g.rotation.x += (targetX - g.rotation.x) * k;
    g.rotation.z += (targetZ - g.rotation.z) * k;
  });

  return (
    <group ref={group}>
      <mesh>
        <icosahedronGeometry args={[1.15, 2]} />
        <meshPhysicalMaterial
          color="#c9d6ff"
          transmission={0.92}
          thickness={1.4}
          roughness={0.16}
          ior={1.35}
          metalness={0.05}
          clearcoat={1}
        />
      </mesh>

      <lineSegments geometry={lineGeometry}>
        <lineBasicMaterial color="#9aa9ee" transparent opacity={0.42} />
      </lineSegments>

      {nodes.map((p, i) => (
        <mesh key={i} position={p} scale={0.045 + seeded(i + 7) * 0.045}>
          <sphereGeometry args={[1, 12, 12]} />
          <meshStandardMaterial
            color={i % 3 === 0 ? "#7d8ff0" : "#a99cf0"}
            emissive={i % 3 === 0 ? "#6f86ee" : "#a08ff0"}
            emissiveIntensity={0.55}
            roughness={0.35}
          />
        </mesh>
      ))}

      {[0, 1, 2].map((i) => (
        <mesh
          key={`ring-${i}`}
          rotation={[Math.PI / 2 + i * 0.7, i * 0.5, i * 0.9]}
        >
          <torusGeometry args={[2.5 + i * 0.28, 0.008, 8, 128]} />
          <meshBasicMaterial color="#8f9df0" transparent opacity={0.5} />
        </mesh>
      ))}
    </group>
  );
}

export default function AIScene() {
  return (
    <Canvas
      camera={{ position: [0, 0.4, 7.4], fov: 42 }}
      dpr={[1, 1.8]}
      gl={{ antialias: true, alpha: true }}
      style={{ background: "transparent" }}
    >
      <ambientLight intensity={0.85} />
      <directionalLight position={[4, 6, 5]} intensity={1.5} />
      <pointLight position={[-5, -2, 3]} intensity={18} color="#b7a6ff" />
      <Environment>
        <Lightformer
          intensity={2.2}
          position={[0, 5, 2]}
          scale={[12, 12, 1]}
          color="#ffffff"
        />
        <Lightformer
          intensity={1.4}
          color="#9fb8ff"
          position={[-5, 1, -1]}
          rotation-y={Math.PI / 2}
          scale={[18, 3, 1]}
        />
      </Environment>
      <Float speed={1.1} rotationIntensity={0.16} floatIntensity={0.6}>
        <Constellation />
      </Float>
    </Canvas>
  );
}
