import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, ContactShadows, Float, OrbitControls, Html, Line } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import * as THREE from "three";

// ============================================
// HIGH-FIDELITY HALF-EYE CROSS-SECTION
// ============================================
function EyeCrossSection({
  position,
  signalColor,
  lightColor,
  setHoveredPart,
}: {
  position: [number, number, number];
  signalColor: string;
  lightColor: string;
  setHoveredPart: (part: any) => void;
}) {
  const eyeRef = useRef<THREE.Group>(null);
  const vitreousRef = useRef<THREE.Mesh>(null);

  const vesselMeshes = useMemo(() => [Math.PI*0.6, Math.PI*0.8, Math.PI*1.0, Math.PI*1.2, Math.PI*1.4].map((angle, i) => {
    const curve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-0.1, 0, -0.94),
      new THREE.Vector3(Math.cos(angle) * 0.5, Math.sin(angle) * 0.5, -0.7),
      new THREE.Vector3(Math.cos(angle) * 0.8, Math.sin(angle) * 0.8, -0.4),
      new THREE.Vector3(Math.cos(angle) * 0.93, Math.sin(angle) * 0.93, -0.1),
    ]);
    return (
      <mesh key={`vessel-${i}`}>
        <tubeGeometry args={[curve, 20, 0.008 + Math.random()*0.005, 8, false]} />
        <meshStandardMaterial color="#c0392b" roughness={0.4} />
      </mesh>
    );
  }), []);

  useFrame((state) => {
    if (eyeRef.current) {
      // Look LEFT (-X), with subtle breathing
      eyeRef.current.rotation.y = -Math.PI / 2 + Math.sin(state.clock.elapsedTime * 0.2) * 0.05;
      eyeRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.02;
      eyeRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.5) * 0.02;
    }
    if (vitreousRef.current) {
      const s = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.01;
      vitreousRef.current.scale.set(s, s, s);
    }
  });

  const zonuleMeshes = useMemo(() => Array.from({ length: 15 }).map((_, i) => {
    const angle = Math.PI / 2 + (i / 14) * Math.PI; 
    const curve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(Math.cos(angle) * 0.43, Math.sin(angle) * 0.43, 0.78),
      new THREE.Vector3(Math.cos(angle) * 0.25, Math.sin(angle) * 0.25, 0.65),
    ]);
    return (
      <mesh key={`zonule-${i}`}>
         <tubeGeometry args={[curve, 4, 0.003, 4, false]} />
         <meshBasicMaterial color="#ffffff" transparent opacity={0.6} />
      </mesh>
    );
  }), []);

  return (
    <group 
      ref={eyeRef} 
      position={position} 
      rotation={[0, -Math.PI / 2, 0]}
      onPointerOver={(e) => { e.stopPropagation(); setHoveredPart('eye'); }}
      onPointerOut={() => setHoveredPart(null)}
    >
      
      {/* Sclera (outer white layer) */}
      <mesh>
        <sphereGeometry args={[1.0, 64, 64, Math.PI, Math.PI]} />
        <meshStandardMaterial color="#f0ebe6" roughness={0.65} side={THREE.DoubleSide} />
      </mesh>

      {/* Choroid (vascular middle layer - rich red) */}
      <mesh>
        <sphereGeometry args={[0.97, 64, 64, Math.PI, Math.PI]} />
        <meshStandardMaterial color="#c0392b" roughness={0.85} side={THREE.DoubleSide} />
      </mesh>

      {/* Retina (inner neural layer - salmon pink) */}
      <mesh>
        <sphereGeometry args={[0.94, 64, 64, Math.PI, Math.PI]} />
        <meshStandardMaterial color="#e8967a" roughness={0.5} side={THREE.DoubleSide} />
      </mesh>

      <mesh ref={vitreousRef}>
        <sphereGeometry args={[0.93, 64, 64, Math.PI, Math.PI]} />
        <meshPhysicalMaterial 
          color="#e0f2fe" 
          transparent 
          opacity={0.15} 
          roughness={0.1} 
          transmission={0.9} 
          thickness={0.5} 
          side={THREE.DoubleSide} 
        />
      </mesh>

      <group>
        {vesselMeshes}
      </group>

      {/* Optic Disc */}
      <mesh position={[-0.15, 0, -0.92]} rotation={[0, -0.15, 0]}>
        <circleGeometry args={[0.15, 32]} />
        <meshStandardMaterial color="#ffeaa7" roughness={0.5} side={THREE.DoubleSide} />
      </mesh>
      
      {/* Macula */}
      <mesh position={[-0.4, 0, -0.85]} rotation={[0, -0.45, 0]}>
        <circleGeometry args={[0.08, 32]} />
        <meshStandardMaterial color="#d35400" roughness={0.6} side={THREE.DoubleSide} />
      </mesh>

      {/* --- ANTERIOR STRUCTURES --- */}
      <mesh position={[0, 0, 0.9]}>
        <sphereGeometry args={[0.45, 64, 64, Math.PI, Math.PI, 0, Math.PI * 0.45]} />
        <meshPhysicalMaterial 
          color="#ffffff" 
          transparent 
          opacity={0.3} 
          roughness={0.05} 
          transmission={0.95} 
          ior={1.376}
          thickness={0.05}
          side={THREE.DoubleSide} 
        />
      </mesh>

      {/* Iris Cross-Sections (Top and Bottom wedges) */}
      <mesh position={[0, 0.285, 0.85]} rotation={[-0.1, 0, 0]}>
        <boxGeometry args={[0.01, 0.27, 0.02]} />
        <meshStandardMaterial color="#6d4c41" roughness={0.75} />
      </mesh>
      <mesh position={[0, -0.285, 0.85]} rotation={[0.1, 0, 0]}>
        <boxGeometry args={[0.01, 0.27, 0.02]} />
        <meshStandardMaterial color="#6d4c41" roughness={0.75} />
      </mesh>
      
      {/* Ciliary Body Cross-Sections (Sphincter) */}
      <mesh position={[0, 0.43, 0.78]}>
         <sphereGeometry args={[0.04, 16, 16]} />
         <meshStandardMaterial color="#873600" roughness={0.8} />
      </mesh>
      <mesh position={[0, -0.43, 0.78]}>
         <sphereGeometry args={[0.04, 16, 16]} />
         <meshStandardMaterial color="#873600" roughness={0.8} />
      </mesh>

      <group position={[0, 0, 0.65]}>
        <mesh>
          <sphereGeometry args={[0.25, 32, 32, Math.PI, Math.PI, Math.PI * 0.25, Math.PI * 0.5]} />
          <meshPhysicalMaterial color="#fff9c4" transparent opacity={0.6} roughness={0.1} transmission={0.8} ior={1.4} thickness={0.2} side={THREE.DoubleSide} />
        </mesh>
        <mesh rotation={[Math.PI, 0, 0]}>
          <sphereGeometry args={[0.28, 32, 32, Math.PI, Math.PI, Math.PI * 0.25, Math.PI * 0.5]} />
          <meshPhysicalMaterial color="#fff9c4" transparent opacity={0.6} roughness={0.1} transmission={0.8} ior={1.4} thickness={0.2} side={THREE.DoubleSide} />
        </mesh>
        <mesh rotation={[0, Math.PI/2, 0]}>
           <circleGeometry args={[0.18, 32]} />
           <meshPhysicalMaterial color="#fff9c4" transparent opacity={0.7} roughness={0.2} side={THREE.DoubleSide} />
        </mesh>
      </group>

      <group>
        {zonuleMeshes}
      </group>

      {/* Optic Nerve Head / Disc (golden yellow, larger to match reference) */}
      <mesh position={[-0.05, 0, -1.0]} rotation={[Math.PI/2, 0, 0]}>
         <cylinderGeometry args={[0.18, 0.15, 0.35, 32, 1, false, Math.PI, Math.PI]} />
         <meshStandardMaterial color="#e6a817" roughness={0.5} emissive="#c78c00" emissiveIntensity={0.2} side={THREE.DoubleSide} />
      </mesh>
      {/* Nerve fibers fanning out from disc */}
      <mesh position={[-0.05, 0, -1.18]} rotation={[Math.PI/2, 0, 0]}>
         <cylinderGeometry args={[0.12, 0.2, 0.2, 32, 1, false, Math.PI, Math.PI]} />
         <meshStandardMaterial color="#d4a017" roughness={0.6} side={THREE.DoubleSide} />
      </mesh>

      <pointLight position={[0, 0, 1.5]} color={lightColor} intensity={0.5} distance={4} />
      <mesh position={[0, 0, 0.7]}>
         <sphereGeometry args={[0.1, 16, 16]} />
         <meshBasicMaterial color={lightColor} transparent opacity={0.2} blending={THREE.AdditiveBlending} />
      </mesh>

      {/* Detailed Anatomy Labels with Annotation Lines */}
      <group>
        {/* Front of Eye (Left side of screen -> +Z in local rotated space) */}
        <AnnotationLabel target={[0, 0.4, 0.95]} endPoint={[0, 1.2, 1.4]}>Cornea</AnnotationLabel>
        <AnnotationLabel target={[0, 0.2, 0.85]} endPoint={[0, 0.9, 1.4]}>Anterior Chamber</AnnotationLabel>
        <AnnotationLabel target={[0, 0.05, 0.9]} endPoint={[0, 0.6, 1.4]}>Pupil</AnnotationLabel>
        <AnnotationLabel target={[0, -0.15, 0.85]} endPoint={[0, 0.3, 1.4]}>Iris</AnnotationLabel>
        <AnnotationLabel target={[0, 0.0, 0.65]} endPoint={[0, -0.4, 1.4]}>Lens</AnnotationLabel>
        <AnnotationLabel target={[0, -0.35, 0.75]} endPoint={[0, -0.7, 1.4]}>Ciliary Body</AnnotationLabel>
        <AnnotationLabel target={[0, -0.2, 0.75]} endPoint={[0, -1.0, 1.4]}>Zonular Fibers</AnnotationLabel>

        {/* Back of Eye (Right side of screen -> -Z in local rotated space) */}
        <AnnotationLabel target={[0, 0.8, -0.6]} endPoint={[0, 1.2, -1.4]}>Sclera</AnnotationLabel>
        <AnnotationLabel target={[0, 0.6, -0.75]} endPoint={[0, 0.9, -1.4]}>Choroid</AnnotationLabel>
        <AnnotationLabel target={[0, 0.4, -0.85]} endPoint={[0, 0.6, -1.4]}>Retina</AnnotationLabel>
        <AnnotationLabel target={[0, 0.1, -0.4]} endPoint={[0, -0.4, -1.4]}>Vitreous Body</AnnotationLabel>
        <AnnotationLabel target={[0, -0.3, -0.85]} endPoint={[0, -0.7, -1.4]}>Macula</AnnotationLabel>
        <AnnotationLabel target={[0, -0.1, -1.0]} endPoint={[0, -1.0, -1.4]}>Optic Disc</AnnotationLabel>
      </group>

    </group>
  );
}

// ============================================
// HIGH-FIDELITY BRAIN SAGITTAL CROSS-SECTION
// ============================================
function BrainCrossSection({
  position,
  brainGlow,
  scnColor,
  pinealColor,
  pinealOpacity,
  speed,
  setHoveredPart,
}: {
  position: [number, number, number];
  brainGlow: string;
  scnColor: string;
  pinealColor: string;
  pinealOpacity: number;
  speed: number;
  setHoveredPart: (part: any) => void;
}) {
  const brainRef = useRef<THREE.Group>(null);
  const scnRef = useRef<THREE.Mesh>(null);
  const pinealRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (brainRef.current) {
      // Gentle floating
      brainRef.current.rotation.y = Math.PI * -0.05 + Math.sin(state.clock.elapsedTime * 0.15) * 0.02;
      brainRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.4 + Math.PI) * 0.02;
    }
    if (scnRef.current) {
      const s = 1 + Math.sin(state.clock.elapsedTime * speed) * 0.15;
      scnRef.current.scale.set(s, s, s);
    }
    if (pinealRef.current) {
      const s = 1 + Math.sin(state.clock.elapsedTime * 0.8) * 0.1;
      pinealRef.current.scale.set(s, s, s);
    }
  });

  // Shapes for Extrusion
  const cerebrumShape = useMemo(() => {
    const s = new THREE.Shape();
    s.moveTo(0, -0.6);
    s.bezierCurveTo(-0.8, -0.6, -1.2, -0.3, -1.3, 0.1);
    s.bezierCurveTo(-1.4, 0.4, -1.3, 0.8, -0.9, 1.1);
    s.bezierCurveTo(-0.5, 1.4, 0.5, 1.4, 0.9, 1.1);
    s.bezierCurveTo(1.2, 0.9, 1.3, 0.4, 1.1, 0.0);
    s.bezierCurveTo(1.0, -0.2, 0.8, -0.3, 0.6, -0.3);
    s.bezierCurveTo(0.4, -0.4, 0.2, -0.5, 0, -0.6);
    return s;
  }, []);

  const cerebellumShape = useMemo(() => {
    const s = new THREE.Shape();
    s.moveTo(0.5, -0.3);
    s.bezierCurveTo(0.9, -0.2, 1.2, -0.3, 1.2, -0.6);
    s.bezierCurveTo(1.2, -0.9, 0.9, -1.1, 0.5, -1.0);
    s.bezierCurveTo(0.3, -0.9, 0.2, -0.6, 0.3, -0.4);
    s.bezierCurveTo(0.35, -0.35, 0.4, -0.32, 0.5, -0.3);
    return s;
  }, []);

  const brainstemShape = useMemo(() => {
    const s = new THREE.Shape();
    s.moveTo(0, -0.3);
    s.bezierCurveTo(-0.2, -0.4, -0.25, -0.8, -0.1, -1.3);
    s.lineTo(0.2, -1.3);
    s.bezierCurveTo(0.25, -0.8, 0.2, -0.4, 0.1, -0.3);
    s.lineTo(0, -0.3);
    return s;
  }, []);
  
  const corpusCallosumShape = useMemo(() => {
    const s = new THREE.Shape();
    s.moveTo(-0.6, 0.2);
    s.bezierCurveTo(-0.5, 0.6, 0.3, 0.7, 0.6, 0.4);
    s.bezierCurveTo(0.7, 0.3, 0.6, 0.2, 0.5, 0.3);
    s.bezierCurveTo(0.3, 0.5, -0.3, 0.4, -0.5, 0.2);
    s.lineTo(-0.6, 0.2);
    return s;
  }, []);

  // Settings for a highly rounded, organic extrusion
  const extrudeSettings = useMemo(() => ({
    depth: 0.6,
    bevelEnabled: true,
    bevelSegments: 8,
    bevelSize: 0.1,
    bevelThickness: 0.1,
    curveSegments: 24,
  }), []);

  const thinExtrudeSettings = useMemo(() => ({
    depth: 0.62,
    bevelEnabled: true,
    bevelSegments: 4,
    bevelSize: 0.05,
    bevelThickness: 0.05,
    curveSegments: 24,
  }), []);

  // Generate random "worm-like" tubes for Cerebrum Sulci/Gyri texture
  const cerebrumTextureTubes = useMemo(() => {
    const tubes = [];
    // Just a few stylized lines on the flat cross-section face to simulate internal structure
    const lines = [
      [[-0.8, 0.4], [-0.5, 0.6], [-0.2, 0.8], [0.3, 0.9], [0.7, 0.6]],
      [[-0.4, 0.2], [0, 0.4], [0.4, 0.5]],
      [[-0.9, 0.8], [-0.6, 1.0], [-0.2, 1.1], [0.4, 1.1], [0.8, 0.8]],
    ];
    for (const pts of lines) {
      const curve = new THREE.CatmullRomCurve3(pts.map(p => new THREE.Vector3(p[0], p[1], 0.71)));
      tubes.push(new THREE.TubeGeometry(curve, 32, 0.03, 8, false));
    }
    return tubes;
  }, []);

  // Cerebellum horizontal striations (Folia)
  const foliaTubes = useMemo(() => {
    const tubes = [];
    for(let y = -0.9; y <= -0.4; y+=0.1) {
       const curve = new THREE.CatmullRomCurve3([
         new THREE.Vector3(0.35, y, 0.71),
         new THREE.Vector3(0.7, y + 0.05, 0.71),
         new THREE.Vector3(1.1, y + 0.1, 0.71),
       ]);
       tubes.push(new THREE.TubeGeometry(curve, 16, 0.015, 8, false));
    }
    return tubes;
  }, []);

  return (
    <group 
      ref={brainRef} 
      position={position}
      onPointerOver={(e) => { e.stopPropagation(); setHoveredPart('brain'); }}
      onPointerOut={() => setHoveredPart(null)}
    >
      <Float speed={0.5} rotationIntensity={0.02} floatIntensity={0.05}>
        
        {/* Cerebrum (Light Purple - anatomy.app style) */}
        <mesh position={[0, 0, 0]}>
          <extrudeGeometry args={[cerebrumShape, extrudeSettings]} />
          <meshStandardMaterial color="#bcaaa4" roughness={0.6} metalness={0.05} />
          <meshStandardMaterial attach="material-0" color="#c3b1e1" roughness={0.6} /> {/* Faces */}
          <meshStandardMaterial attach="material-1" color="#a084ca" roughness={0.7} /> {/* Sides/Bevels - darker purple */}
        </mesh>

        {/* Cerebrum Internal Texture Lines */}
        {cerebrumTextureTubes.map((geo, i) => (
          <mesh key={`gyri-${i}`} geometry={geo}>
            <meshStandardMaterial color="#8e73b9" roughness={0.8} />
          </mesh>
        ))}

        {/* Cerebellum (Light Green - anatomy.app style) */}
        <mesh position={[0, 0, 0]}>
          <extrudeGeometry args={[cerebellumShape, extrudeSettings]} />
          <meshStandardMaterial attach="material-0" color="#a5d6a7" roughness={0.7} />
          <meshStandardMaterial attach="material-1" color="#81c784" roughness={0.8} />
        </mesh>
        
        {/* Cerebellum Folia Lines */}
        {foliaTubes.map((geo, i) => (
          <mesh key={`folia-${i}`} geometry={geo}>
            <meshStandardMaterial color="#66bb6a" roughness={0.9} />
          </mesh>
        ))}

        {/* Brainstem (Peach/Tan - anatomy.app style) */}
        <mesh position={[0, 0, 0]}>
          <extrudeGeometry args={[brainstemShape, thinExtrudeSettings]} />
          <meshStandardMaterial color="#ffccbc" roughness={0.5} metalness={0.1} />
        </mesh>

        {/* Corpus Callosum (White Band) */}
        <mesh position={[0, 0, 0.02]}>
          <extrudeGeometry args={[corpusCallosumShape, thinExtrudeSettings]} />
          <meshStandardMaterial color="#f5f5f5" roughness={0.4} />
        </mesh>

        {/* Diencephalon / Thalamus (Grey-Blue core) */}
        <mesh position={[0.1, 0.1, 0.65]}>
           <shapeGeometry args={[new THREE.Shape().absarc(0,0, 0.25, 0, Math.PI*2, false)]} />
           <meshStandardMaterial color="#90a4ae" roughness={0.5} />
        </mesh>

        {/* Fornix / Ventricle dark space */}
        <mesh position={[0.1, 0.35, 0.66]}>
           <shapeGeometry args={[new THREE.Shape().absarc(0,0, 0.1, 0, Math.PI*2, false)]} />
           <meshStandardMaterial color="#263238" roughness={0.9} />
        </mesh>

        {/* SCN Node (Master Clock) */}
        <group 
          position={[-0.1, -0.2, 0.68]}
          onPointerOver={(e) => { e.stopPropagation(); setHoveredPart('scn'); }}
          onPointerOut={() => setHoveredPart(null)}
        >
          <mesh ref={scnRef}>
            <circleGeometry args={[0.08, 32]} />
            <meshBasicMaterial color={scnColor} />
          </mesh>
          <pointLight color={scnColor} intensity={0.8} distance={1.5} />
          {/* Glow halo */}
          <mesh position={[0,0,-0.01]}>
             <circleGeometry args={[0.15, 32]} />
             <meshBasicMaterial color={scnColor} transparent opacity={0.3} blending={THREE.AdditiveBlending} />
          </mesh>
        </group>

        {/* Pineal Gland Node */}
        <group 
          position={[0.35, 0.15, 0.68]}
          onPointerOver={(e) => { e.stopPropagation(); setHoveredPart('pineal'); }}
          onPointerOut={() => setHoveredPart(null)}
        >
          <mesh ref={pinealRef}>
            <circleGeometry args={[0.06, 32]} />
            <meshBasicMaterial color={pinealColor} transparent opacity={pinealOpacity} />
          </mesh>
          <pointLight color={pinealColor} intensity={0.5 * pinealOpacity} distance={1} />
        </group>

      </Float>

      <pointLight position={[0, 0, 1]} color={brainGlow} intensity={0.5} distance={4} />
    </group>
  );
}

// ============================================
// OPTIC NERVE (Connecting Pathway)
// ============================================
function OpticNerve3D({
  signalColor,
  speed,
  nerveGlowColor,
  setHoveredPart,
}: {
  signalColor: string;
  speed: number;
  nerveGlowColor: string;
  setHoveredPart: (part: any) => void;
}) {
  const signalRefs = useRef<THREE.Mesh[]>([]);

  // A sweeping S-curve connecting the back of the eye to the brain diencephalon
  const nerveCurve = useMemo(() => {
    return new THREE.CatmullRomCurve3([
      new THREE.Vector3(-3.2, -0.3, -1.05), // Eye exit
      new THREE.Vector3(-2.2, -0.4, -0.5),
      new THREE.Vector3(-1.0, -0.3, 0.0),
      new THREE.Vector3(0.0, -0.2, 0.3),
      new THREE.Vector3(1.0, -0.1, 0.5),
      new THREE.Vector3(2.2, -0.15, 0.65), // Brain entry (SCN/Thalamus area)
    ]);
  }, []);

  const tubeGeo = useMemo(() => new THREE.TubeGeometry(nerveCurve, 100, 0.09, 16, false), [nerveCurve]);
  const sheathGeo = useMemo(() => new THREE.TubeGeometry(nerveCurve, 100, 0.12, 16, false), [nerveCurve]);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    signalRefs.current.forEach((mesh, i) => {
      if (mesh) {
        const phase = (t * speed * 0.18 + i * 0.04) % 1;
        const pos = nerveCurve.getPointAt(Math.min(phase, 0.999));
        mesh.position.copy(pos);
        // Cinematic pulse
        const pulse = 0.5 + Math.pow(Math.sin(phase * Math.PI), 4) * 2.0;
        mesh.scale.setScalar(pulse);
      }
    });
  });

  return (
    <group
      onPointerOver={(e) => { e.stopPropagation(); setHoveredPart('opticNerve'); }}
      onPointerOut={() => setHoveredPart(null)}
    >
      {/* Core Nerve bundle (golden yellow like reference) */}
      <mesh geometry={tubeGeo}>
        <meshStandardMaterial color="#d4a017" emissive="#c78c00" emissiveIntensity={0.8} roughness={0.45} />
      </mesh>

      {/* Transparent Myelin Sheath */}
      <mesh geometry={sheathGeo}>
        <meshPhysicalMaterial 
          color="#ffffff" 
          transparent 
          opacity={0.3} 
          roughness={0.2}
          transmission={0.5}
        />
      </mesh>
      
      {/* Outer Glow representing activity level */}
      <mesh geometry={sheathGeo} scale={1.2}>
        <meshBasicMaterial 
          color={nerveGlowColor} 
          transparent 
          opacity={0.15} 
          blending={THREE.AdditiveBlending} 
          depthWrite={false}
        />
      </mesh>

      {/* Traveling Action Potentials (Signals) */}
      {Array.from({ length: 24 }).map((_, i) => (
        <mesh
          key={`signal-${i}`}
          ref={(el) => { if (el) signalRefs.current[i] = el; }}
        >
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshBasicMaterial color={signalColor} transparent opacity={0.9} />
        </mesh>
      ))}
      
      {/* Optic Chiasm (Crossing point node) */}
      <mesh position={[-0.5, -0.25, 0.15]}>
         <sphereGeometry args={[0.12, 32, 32]} />
         <meshStandardMaterial color="#f5b041" roughness={0.4} />
      </mesh>
    </group>
  );
}

// ============================================
// LIGHT RAYS
// ============================================
function LightRays({ lightColor, speed }: { lightColor: string; speed: number; }) {
  const raysRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (raysRef.current) {
      const t = state.clock.elapsedTime;
      raysRef.current.children.forEach((child, i) => {
        const mesh = child as THREE.Mesh;
        const mat = mesh.material as THREE.MeshBasicMaterial;
        mat.opacity = 0.2 + Math.sin(t * speed * 3 + i) * 0.3;
      });
    }
  });

  return (
    <group ref={raysRef} position={[-5.5, -0.3, 0.9]}>
      {[-0.2, -0.1, 0, 0.1, 0.2].map((yOffset, i) => (
        <mesh key={`ray-${i}`} position={[0, yOffset, 0]}>
          <planeGeometry args={[1.5, 0.02]} />
          <meshBasicMaterial 
            color={lightColor} 
            transparent 
            opacity={0.5} 
            blending={THREE.AdditiveBlending}
            side={THREE.DoubleSide}
          />
        </mesh>
      ))}
    </group>
  );
}

// ============================================
// ANNOTATION LABEL (with connecting lines and aligned text)
// ============================================
function AnnotationLabel({ target, endPoint, children }: { target: [number, number, number], endPoint: [number, number, number], children: React.ReactNode }) {
  // In the rotated Eye group, +Z is Left and -Z is Right on the screen.
  const isLeft = endPoint[2] > 0;
  
  // Create a dog-leg line: horizontal from the text, then angled to the target
  const elbowZ = isLeft ? endPoint[2] - 0.25 : endPoint[2] + 0.25;
  const elbow: [number, number, number] = [0, endPoint[1], elbowZ];
  
  return (
    <group>
      <Line 
        points={[target, elbow, endPoint]} 
        color="rgba(34, 211, 238, 0.5)" // cyan tint
        lineWidth={1.5}
      />
      <Html position={endPoint}>
        <div
          style={{
            whiteSpace: "nowrap",
            color: "#e0f2fe",
            fontSize: 10,
            fontWeight: 600,
            fontFamily: "'Inter', 'system-ui', sans-serif",
            letterSpacing: "0.08em",
            padding: "2px 8px",
            borderLeft: !isLeft ? "1px solid rgba(34, 211, 238, 0.6)" : "none",
            borderRight: isLeft ? "1px solid rgba(34, 211, 238, 0.6)" : "none",
            textAlign: isLeft ? "right" : "left",
            textShadow: "0 1px 4px rgba(0,0,0,0.9)",
            transform: isLeft ? "translate(-100%, -50%)" : "translate(0%, -50%)",
            textTransform: "uppercase"
          }}
        >
          {children}
        </div>
      </Html>
    </group>
  );
}

// ============================================
// PROMINENT LABEL (for major landmarks: OPTIC NERVE, VISUAL CORTEX)
// ============================================
function ProminentLabel({ position, children, color = "#22d3ee" }: { position: [number, number, number], children: React.ReactNode, color?: string }) {
  return (
    <Html position={position} transform distanceFactor={7}>
      <div
        style={{
          whiteSpace: "nowrap",
          color: "#ffffff",
          fontSize: 11,
          fontWeight: 700,
          fontFamily: "'Inter', 'system-ui', sans-serif",
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          padding: "6px 12px",
          background: "rgba(10, 15, 25, 0.85)",
          border: `1px solid ${color}40`,
          borderRadius: "4px",
          backdropFilter: "blur(12px)",
          boxShadow: `0 0 15px ${color}15, 0 4px 8px rgba(0,0,0,0.5)`,
          textShadow: `0 0 8px ${color}60`,
        }}
      >
        {children}
      </div>
    </Html>
  );
}

// ============================================
// HUD BOX OVERLAY
// ============================================
function HudBox({
  position,
  label,
  width,
  height,
}: {
  position: [number, number, number];
  label: string;
  width: string;
  height: string;
}) {
  return (
    <Html position={position} center style={{ pointerEvents: "none" }} zIndexRange={[10, 0]}>
      <div
        style={{ width, height }}
        className="relative border border-dashed border-white/15"
      >
        <div className="absolute -top-[1px] -left-[1px] w-3 h-3 border-t-2 border-l-2 border-cyan-400/60" />
        <div className="absolute -top-[1px] -right-[1px] w-3 h-3 border-t-2 border-r-2 border-cyan-400/60" />
        <div className="absolute -bottom-[1px] -left-[1px] w-3 h-3 border-b-2 border-l-2 border-cyan-400/60" />
        <div className="absolute -bottom-[1px] -right-[1px] w-3 h-3 border-b-2 border-r-2 border-cyan-400/60" />
        <div className="absolute -top-6 left-0 text-[10px] font-mono text-cyan-300/70 tracking-[0.15em] whitespace-nowrap uppercase">
          {label}
        </div>
      </div>
    </Html>
  );
}

// ============================================
// MAIN SCENE CANVAS
// ============================================
export function AnatomyScene3D({
  signalColor,
  lightColor,
  brainGlow,
  scnColor,
  pinealColor,
  pinealOpacity,
  speed,
  nerveGlowColor,
  setHoveredPart,
  autoRotate,
}: {
  signalColor: string;
  lightColor: string;
  brainGlow: string;
  scnColor: string;
  pinealColor: string;
  pinealOpacity: number;
  speed: number;
  nerveGlowColor: string;
  setHoveredPart: (part: any) => void;
  autoRotate: boolean;
}) {
  return (
    <Canvas
      camera={{ position: [-1.5, 0.4, 15], fov: 42 }}
      style={{ width: "100%", height: "100%" }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
    >
      <color attach="background" args={["#050a11"]} />
      
      {/* Studio Lighting Setup for Premium Medical Look */}
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 5, 5]} intensity={1.2} color="#ffffff" />
      <directionalLight position={[-5, 5, 2]} intensity={0.5} color="#e0f2fe" />
      <directionalLight position={[0, -5, 2]} intensity={0.4} color="#fce4ec" />
      <spotLight position={[0, 0, 8]} intensity={0.5} penumbra={1} angle={0.5} />

      <Environment preset="studio" environmentIntensity={0.3} />

      <ContactShadows position={[0, -2.2, 0]} opacity={0.4} scale={15} blur={2.5} far={4} />

      {/* Anatomy Components */}
      <EyeCrossSection 
        position={[-3.2, -0.3, 0]} 
        signalColor={signalColor} 
        lightColor={lightColor} 
        setHoveredPart={setHoveredPart}
      />
      
      <LightRays lightColor={lightColor} speed={speed} />
      
      <OpticNerve3D 
        signalColor={signalColor} 
        speed={speed} 
        nerveGlowColor={nerveGlowColor} 
        setHoveredPart={setHoveredPart}
      />
      
      <BrainCrossSection 
        position={[2.0, -0.1, 0]} 
        brainGlow={brainGlow} 
        scnColor={scnColor} 
        pinealColor={pinealColor} 
        pinealOpacity={pinealOpacity} 
        speed={speed}
        setHoveredPart={setHoveredPart}
      />

      {/* Major Landmark Labels (prominent dark boxes like reference) */}
      <ProminentLabel position={[-1.2, 1.0, 0]} color="#22d3ee">OPTIC NERVE</ProminentLabel>
      <ProminentLabel position={[3.2, 1.7, 0]} color="#a78bfa">VISUAL CORTEX</ProminentLabel>

      {/* Module HUD Boxes */}
      <HudBox 
        position={[-3.2, -0.3, 0]} 
        label="MODULE 01: OCULAR RECEPTOR" 
        width="180px" 
        height="180px" 
      />
      <HudBox 
        position={[-0.5, -0.2, 0.2]} 
        label="MODULE 02: NEURAL PATHWAY" 
        width="300px" 
        height="100px" 
      />
      <HudBox 
        position={[2.0, 0.2, 0]} 
        label="MODULE 03: CORTICAL PROCESSING" 
        width="300px" 
        height="320px" 
      />

      <OrbitControls 
        target={[-1.5, 0, 0]}
        enablePan={false} 
        enableDamping 
        dampingFactor={0.08} 
        minDistance={8} 
        maxDistance={25} 
        minPolarAngle={Math.PI / 3} 
        maxPolarAngle={Math.PI / 1.8} 
        autoRotate={autoRotate}
        autoRotateSpeed={0.5}
      />

      <EffectComposer>
        <Bloom intensity={1.3} luminanceThreshold={0.3} luminanceSmoothing={0.7} mipmapBlur />
      </EffectComposer>
    </Canvas>
  );
}
