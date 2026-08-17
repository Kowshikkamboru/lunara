import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface HeroSceneProps {
  color?: string;
  speed?: number;
  density?: number;
}

export function HeroScene({ 
  color = "#22d3ee", 
  speed = 1,
  density = 4000 
}: HeroSceneProps) {
  const points = useRef<THREE.Points>(null);
  const targetMouse = useRef(new THREE.Vector2(0, 0));
  
  const [basePositions, phases] = useMemo(() => {
    const basePositions = new Float32Array(density * 3);
    const phases = new Float32Array(density);
    for (let i = 0; i < density; i++) {
      basePositions[i * 3] = (Math.random() - 0.5) * 30; // x
      basePositions[i * 3 + 1] = 0; // y
      basePositions[i * 3 + 2] = (Math.random() - 0.5) * 20; // z
      phases[i] = Math.random() * Math.PI * 2;
    }
    return [basePositions, phases];
  }, [density]);

  const initialPositions = useMemo(() => new Float32Array(basePositions), [basePositions]);

  useFrame((state) => {
    const t = state.clock.getElapsedTime() * 0.2 * speed;
    
    // Smoothly track mouse pointer
    targetMouse.current.lerp(state.pointer, 0.08);

    if (points.current) {
      points.current.rotation.y = t * 0.1;
      points.current.rotation.z = t * 0.05;
      
      const positionsAttribute = points.current.geometry.attributes.position;
      
      // Scale mouse NDC to rough world coordinates
      const mouseX = targetMouse.current.x * 15;
      const mouseY = targetMouse.current.y * 15;
      
      for (let i = 0; i < density; i++) {
        const i3 = i * 3;
        const baseX = basePositions[i3];
        const baseZ = basePositions[i3 + 2];
        
        // Base neural wave calculation
        const waveY = Math.sin(t * 2 + baseX * 0.3 + phases[i]) * 1.2 + Math.cos(t * 1.5 + baseZ * 0.4) * 0.8;
        
        // Gentle pulling towards center
        const distanceToCenter = Math.sqrt(baseX * baseX + baseZ * baseZ);
        const centerPull = Math.max(0, 1 - distanceToCenter / 15) * Math.sin(t * 3) * 0.5;
        
        let targetX = baseX;
        let targetY = waveY + centerPull;
        let targetZ = baseZ;

        // Mouse Displacement Effect
        const dx = targetX - mouseX;
        const dy = targetY - mouseY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        // Repel particles that are close to the mouse cursor
        if (dist < 5) {
          const force = (5 - dist) / 5; // 0 to 1 intensity
          targetX += dx * force * 0.8;
          targetY += dy * force * 0.8;
          targetZ += force * 2.5;
        }

        positionsAttribute.setXYZ(i, targetX, targetY, targetZ);
      }
      positionsAttribute.needsUpdate = true;
    }
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute 
          attach="attributes-position" 
          count={density} 
          array={initialPositions} 
          itemSize={3} 
        />
      </bufferGeometry>
      <pointsMaterial 
        size={0.06} 
        color={color} 
        transparent 
        opacity={0.6} 
        blending={THREE.AdditiveBlending} 
        depthWrite={false} 
      />
    </points>
  );
}
