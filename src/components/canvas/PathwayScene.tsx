import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere, Line, Float } from '@react-three/drei';
import * as THREE from 'three';

export function PathwayScene() {
  const group = useRef<THREE.Group>(null);
  const pulseRef1 = useRef<THREE.Mesh>(null);
  const pulseRef2 = useRef<THREE.Mesh>(null);
  const pulseRef3 = useRef<THREE.Mesh>(null);

  // Curve representing the neural signal path (Eye to Visual Cortex)
  const curve = useMemo(() => {
    return new THREE.CatmullRomCurve3([
      new THREE.Vector3(-4, 0, 0),       // Retina / Eye
      new THREE.Vector3(-1.5, 1, 1),     // Optic Chiasm
      new THREE.Vector3(1.5, -0.5, -1),  // LGN
      new THREE.Vector3(4, 1, 0),        // Visual Cortex
    ]);
  }, []);

  const linePoints = useMemo(() => curve.getPoints(60), [curve]);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    
    // Rotate the entire scene slowly
    if (group.current) {
      group.current.rotation.y = Math.sin(t * 0.1) * 0.2;
      group.current.rotation.x = Math.cos(t * 0.1) * 0.1;
    }

    // Animate the signal pulses along the curve
    if (pulseRef1.current) {
      const pos = curve.getPoint((t * 0.3) % 1);
      pulseRef1.current.position.copy(pos);
    }
    if (pulseRef2.current) {
      const pos = curve.getPoint(((t * 0.3) + 0.33) % 1);
      pulseRef2.current.position.copy(pos);
    }
    if (pulseRef3.current) {
      const pos = curve.getPoint(((t * 0.3) + 0.66) % 1);
      pulseRef3.current.position.copy(pos);
    }
  });

  return (
    <group ref={group} position={[0, -0.5, 0]}>
      {/* Static Neural Path / Optic Nerve */}
      <Line
        points={linePoints}
        color="#22d3ee" // brand-cyan
        lineWidth={3}
        transparent
        opacity={0.3}
      />
      <Line
        points={linePoints}
        color="#a78bfa" // brand-violet
        lineWidth={1}
        transparent
        opacity={0.6}
      />

      {/* Eye / Retina Node */}
      <Float speed={2} rotationIntensity={0.2} floatIntensity={0.2}>
        <group position={[-4, 0, 0]}>
          <Sphere args={[0.5, 32, 32]}>
            <meshBasicMaterial color="#22d3ee" wireframe transparent opacity={0.3} />
          </Sphere>
          <Sphere args={[0.2, 16, 16]}>
            <meshBasicMaterial color="#ffffff" transparent opacity={0.9} />
          </Sphere>
          {/* Label placeholder or aura */}
          <Sphere args={[0.8, 32, 32]}>
            <meshBasicMaterial color="#22d3ee" transparent opacity={0.05} blending={THREE.AdditiveBlending} depthWrite={false} />
          </Sphere>
        </group>
      </Float>

      {/* Intermediate Node: Optic Chiasm */}
      <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.3}>
        <group position={[-1.5, 1, 1]}>
          <Sphere args={[0.15, 16, 16]}>
            <meshBasicMaterial color="#a78bfa" transparent opacity={0.8} />
          </Sphere>
        </group>
      </Float>

      {/* Intermediate Node: LGN */}
      <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.3}>
        <group position={[1.5, -0.5, -1]}>
          <Sphere args={[0.15, 16, 16]}>
            <meshBasicMaterial color="#a78bfa" transparent opacity={0.8} />
          </Sphere>
        </group>
      </Float>

      {/* Visual Cortex Node */}
      <Float speed={2} rotationIntensity={0.4} floatIntensity={0.4}>
        <group position={[4, 1, 0]}>
          <Sphere args={[0.7, 32, 32]}>
            <meshBasicMaterial color="#a78bfa" wireframe transparent opacity={0.2} />
          </Sphere>
          <Sphere args={[0.3, 16, 16]}>
            <meshBasicMaterial color="#ffffff" transparent opacity={0.8} />
          </Sphere>
          {/* Cortex aura */}
          <Sphere args={[1.2, 32, 32]}>
            <meshBasicMaterial color="#a78bfa" transparent opacity={0.05} blending={THREE.AdditiveBlending} depthWrite={false} />
          </Sphere>
        </group>
      </Float>

      {/* Signal Pulses traveling along the nerve */}
      <mesh ref={pulseRef1}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>
      <mesh ref={pulseRef2}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>
      <mesh ref={pulseRef3}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>
    </group>
  );
}
