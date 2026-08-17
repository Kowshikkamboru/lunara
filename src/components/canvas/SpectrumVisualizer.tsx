import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Line } from '@react-three/drei';
import * as THREE from 'three';

export function SpectrumVisualizer() {
  const lineRef = useRef<any>(null);
  const glowRef = useRef<any>(null);
  const pointsCount = 100;
  
  const [points, glowPoints] = useMemo(() => {
    const pts = [];
    const gPts = [];
    for (let i = 0; i <= pointsCount; i++) {
      const x = (i / pointsCount - 0.5) * 10;
      // create a bell curve (melanopic sensitivity approximation)
      const y = Math.exp(-(x * x) / 4) * 4 - 2; 
      pts.push(new THREE.Vector3(x, y, 0));
      gPts.push(new THREE.Vector3(x, y, -0.1));
    }
    return [pts, gPts];
  }, []);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (lineRef.current) {
      // Subtle breathing effect on the curve
      const scale = 1 + Math.sin(t * 2) * 0.02;
      lineRef.current.scale.set(1, scale, 1);
      if (glowRef.current) glowRef.current.scale.set(1, scale, 1);
    }
  });

  return (
    <group position={[0, 0, 0]}>
      <Line
        ref={lineRef}
        points={points}
        color="#00F0FF"
        lineWidth={3}
      />
      <Line
        ref={glowRef}
        points={glowPoints}
        color="#00F0FF"
        lineWidth={10}
        transparent
        opacity={0.15}
      />
    </group>
  );
}
