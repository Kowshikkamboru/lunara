import React, { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, ContactShadows, Float, OrbitControls, Html, Line, useGLTF } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import * as THREE from "three";

// ============================================
// RESPONSIVE 3D LAYOUT SCALER
// ============================================
function ResponsiveLayout({ children }: { children: React.ReactNode }) {
  const { viewport } = useThree();
  const isMobile = viewport.width < 8;
  const scale = isMobile ? Math.max(0.4, viewport.width / 10) : 1;
  const yOffset = isMobile ? 1.0 : 0;
  
  return (
    <group scale={scale} position={[0, yOffset, 0]}>
      {children}
    </group>
  );
}

// ============================================
// CLIPPING PLANE SETUP (enables renderer-level clipping)
// ============================================
function ClippingPlaneSetup() {
  const { gl } = useThree();
  useEffect(() => {
    gl.localClippingEnabled = true;
    return () => { gl.localClippingEnabled = false; };
  }, [gl]);
  return null;
}

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

  const vesselMeshes = useMemo(() => {
    const meshes = [];
    const getPoint = (alpha: number, beta: number, r: number) => {
       const z = -r * Math.cos(beta);
       const rxy = r * Math.sin(beta);
       const x = rxy * Math.cos(alpha);
       const y = rxy * Math.sin(alpha);
       return new THREE.Vector3(x, y, z);
    };

    const createBranch = (startAlpha: number, endAlpha: number, maxBeta: number, color: string) => {
      const pts = [];
      const numPts = 12;
      for (let i = 0; i <= numPts; i++) {
        const t = i / numPts;
        const alpha = startAlpha + (endAlpha - startAlpha) * t;
        const beta = t * maxBeta;
        pts.push(getPoint(alpha, beta, 0.94));
      }
      return (
        <mesh key={`${startAlpha}-${color}`}>
          <tubeGeometry args={[new THREE.CatmullRomCurve3(pts), 20, 0.005, 8, false]} />
          <meshStandardMaterial color={color} roughness={0.4} />
        </mesh>
      );
    };

    // Red (Arteries)
    meshes.push(createBranch(Math.PI, Math.PI * 0.8, Math.PI * 0.6, "#ef4444")); 
    meshes.push(createBranch(Math.PI, Math.PI * 1.25, Math.PI * 0.6, "#ef4444")); 
    meshes.push(createBranch(Math.PI * 1.1, Math.PI * 1.4, Math.PI * 0.35, "#ef4444")); 

    // Blue (Veins)
    meshes.push(createBranch(Math.PI * 0.95, Math.PI * 0.65, Math.PI * 0.55, "#3b82f6"));
    meshes.push(createBranch(Math.PI * 1.05, Math.PI * 1.35, Math.PI * 0.5, "#3b82f6"));

    return meshes;
  }, []);

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
      new THREE.Vector3(Math.cos(angle) * 0.35, Math.sin(angle) * 0.35, 0.72),
      new THREE.Vector3(Math.cos(angle) * 0.3, Math.sin(angle) * 0.3, 0.6),
    ]);
    return (
      <mesh key={`zonule-${i}`}>
         <tubeGeometry args={[curve, 4, 0.002, 4, false]} />
         <meshBasicMaterial color="#ffffff" transparent opacity={0.4} />
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
      
      {/* Sclera (Outer White) */}
      <mesh>
        <sphereGeometry args={[1.0, 64, 64, Math.PI, Math.PI]} />
        <meshStandardMaterial color="#f8f9fa" roughness={0.5} side={THREE.DoubleSide} />
      </mesh>

      {/* Choroid (Dark vascular layer) */}
      <mesh>
        <sphereGeometry args={[0.97, 64, 64, Math.PI, Math.PI]} />
        <meshStandardMaterial color="#2d0a0a" roughness={0.9} side={THREE.DoubleSide} />
      </mesh>

      {/* Retina (Inner Orange/Pink layer) */}
      <mesh>
        <sphereGeometry args={[0.94, 64, 64, Math.PI, Math.PI]} />
        <meshStandardMaterial color="#ff7a59" roughness={0.6} side={THREE.DoubleSide} emissive="#4a1500" />
      </mesh>

      {/* Vitreous Body (very subtle fill) */}
      <mesh ref={vitreousRef}>
        <sphereGeometry args={[0.93, 64, 64, Math.PI, Math.PI]} />
        <meshPhysicalMaterial 
          color="#e0f2fe" 
          transparent 
          opacity={0.05} 
          roughness={0.1} 
          transmission={0.9} 
          thickness={0.5} 
          side={THREE.DoubleSide} 
        />
      </mesh>

      <group>
        {vesselMeshes}
      </group>

      {/* Optic Disc (left half only to match sagittal cut) */}
      <mesh position={[0, 0, -0.94]}>
        <circleGeometry args={[0.12, 32, Math.PI/2, Math.PI]} />
        <meshStandardMaterial color="#ffeaa7" roughness={0.5} side={THREE.DoubleSide} emissive="#554400" />
      </mesh>
      
      {/* Macula */}
      <mesh position={[-0.2, 0, -0.92]} rotation={[0, -0.2, 0]}>
        <circleGeometry args={[0.06, 32]} />
        <meshStandardMaterial color="#d35400" roughness={0.6} side={THREE.DoubleSide} />
      </mesh>

      {/* --- ANTERIOR STRUCTURES --- */}
      
      {/* Cornea */}
      <mesh position={[0, 0, 0.9]}>
        <sphereGeometry args={[0.45, 64, 64, Math.PI, Math.PI, 0, Math.PI * 0.45]} />
        <meshPhysicalMaterial 
          color="#ffffff" 
          transparent 
          opacity={0.2} 
          roughness={0.02} 
          transmission={0.99} 
          ior={1.376}
          thickness={0.05}
          side={THREE.DoubleSide} 
        />
      </mesh>

      {/* Ciliary Body (thick, dark textured ring inside the eye) */}
      {/* rotation Math.PI/2 to get the left half (x < 0) */}
      <mesh position={[0, 0, 0.72]} rotation={[0, 0, Math.PI/2]}>
         <torusGeometry args={[0.38, 0.06, 32, 64, Math.PI]} />
         <meshStandardMaterial color="#873600" roughness={0.9} side={THREE.DoubleSide} />
      </mesh>

      {/* Iris (brown textured ring extending inwards from ciliary body) */}
      <mesh position={[0, 0, 0.78]}>
        <ringGeometry args={[0.12, 0.36, 64, 1, Math.PI / 2, Math.PI]} />
        <meshStandardMaterial color="#5c3a21" roughness={0.8} side={THREE.DoubleSide} />
      </mesh>

      {/* Lens (Ellipsoid) */}
      <mesh position={[0, 0, 0.6]} scale={[1, 1, 0.45]}>
        <sphereGeometry args={[0.32, 64, 32, Math.PI, Math.PI]} />
        <meshPhysicalMaterial 
           color="#fdfbf7" 
           transparent 
           opacity={0.85} 
           roughness={0.15} 
           transmission={0.6} 
           ior={1.42} 
           thickness={0.3} 
           side={THREE.DoubleSide} 
        />
      </mesh>

      <group>
        {zonuleMeshes}
      </group>

      {/* Optic Nerve Head / Disc Tube (golden yellow) */}
      <mesh position={[-0.05, 0, -1.0]} rotation={[Math.PI/2, 0, 0]}>
         <cylinderGeometry args={[0.14, 0.12, 0.35, 32, 1, false, Math.PI, Math.PI]} />
         <meshStandardMaterial color="#e6a817" roughness={0.5} emissive="#c78c00" emissiveIntensity={0.2} side={THREE.DoubleSide} />
      </mesh>
      {/* Nerve fibers fanning out from disc */}
      <mesh position={[-0.05, 0, -1.18]} rotation={[Math.PI/2, 0, 0]}>
         <cylinderGeometry args={[0.10, 0.16, 0.2, 32, 1, false, Math.PI, Math.PI]} />
         <meshStandardMaterial color="#d4a017" roughness={0.6} side={THREE.DoubleSide} />
      </mesh>

      <pointLight position={[0, 0, 1.5]} color={lightColor} intensity={0.5} distance={4} />
      <mesh position={[0, 0, 0.7]}>
         <sphereGeometry args={[0.1, 16, 16]} />
         <meshBasicMaterial color={lightColor} transparent opacity={0.2} blending={THREE.AdditiveBlending} />
      </mesh>

      {/* Detailed Anatomy Labels with Annotation Lines (Matching Reference Image) */}
      <group>
        {/* Front of Eye (Left side of screen -> +Z in local rotated space) */}
        <AnnotationLabel target={[0, 0.4, 0.95]} endPoint={[0, 1.2, 1.4]}>Cornea</AnnotationLabel>
        <AnnotationLabel target={[0, 0.25, 0.85]} endPoint={[0, 1.0, 1.4]}>Anterior chamber</AnnotationLabel>
        <AnnotationLabel target={[0, 0.0, 0.92]} endPoint={[0, 0.8, 1.4]}>Pupil</AnnotationLabel>
        <AnnotationLabel target={[0, -0.2, 0.85]} endPoint={[0, 0.5, 1.4]}>Iris</AnnotationLabel>
        <AnnotationLabel target={[0, -0.38, 0.8]} endPoint={[0, 0.1, 1.4]}>Angle of anterior chamber</AnnotationLabel>
        <AnnotationLabel target={[0, -0.45, 0.75]} endPoint={[0, -0.3, 1.4]}>Schlemm canal</AnnotationLabel>
        <AnnotationLabel target={[0, 0.35, 0.78]} endPoint={[0, 1.3, -0.2]}>Posterior chamber</AnnotationLabel>

        {/* Mid & Back of Eye (Right side of screen) */}
        <AnnotationLabel target={[0, 0.4, 0.72]} endPoint={[0, 0.7, -0.5]}>Ciliary muscle</AnnotationLabel>
        <AnnotationLabel target={[0, 0.3, 0.72]} endPoint={[0, 0.4, -0.5]}>Ciliary body</AnnotationLabel>
        <AnnotationLabel target={[0, 0.25, 0.65]} endPoint={[0, 0.1, -0.5]}>Zonular fibers</AnnotationLabel>
        <AnnotationLabel target={[0, 0.0, 0.6]} endPoint={[0, -0.15, -0.5]}>Lens</AnnotationLabel>
        
        <AnnotationLabel target={[0, -0.3, 0.0]} endPoint={[0, -0.5, -0.5]}>Vitreous body</AnnotationLabel>
        <AnnotationLabel target={[0, -0.6, -0.6]} endPoint={[0, -0.85, -0.5]}>Retina</AnnotationLabel>

        <AnnotationLabel target={[0, -0.3, -0.85]} endPoint={[0, -0.7, -1.4]}>Macula</AnnotationLabel>
        <AnnotationLabel target={[0, -0.1, -1.0]} endPoint={[0, -1.0, -1.4]}>Optic Disc</AnnotationLabel>
      </group>

    </group>
  );
}

// ============================================
// HIGH-FIDELITY BRAIN SAGITTAL CROSS-SECTION
// ============================================
// ============================================
// HIGH-FIDELITY BRAIN SAGITTAL CROSS-SECTION (OBJ MODEL)
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
  
  // Track which specific brain region is hovered for detail interaction
  const [activeRegion, setActiveRegion] = useState<string | null>(null);

  // Load the highly-compressed binary GLTF model
  const { scene: obj } = useGLTF('/models/brain.glb');

  // Clone the object to safely modify materials
  const brainModel = useMemo(() => {
    const clone = obj.clone();

    // Sagittal clipping plane — clips everything with z < 0 (shows only the right half / inner face)
    const sagittalPlane = new THREE.Plane(new THREE.Vector3(0, 0, -1), 0);

    // Define solid medical diagram materials for anatomical parts matching the reference
    const makeMat = (color: string, emissive = '#000') => new THREE.MeshStandardMaterial({
      color,
      emissive,
      emissiveIntensity: 0,
      roughness: 0.75,
      metalness: 0.05,
      side: THREE.FrontSide,
      clippingPlanes: [sagittalPlane],
      clipShadows: true,
    });

    const cerebrumMat = makeMat('#a278b5');     // Purple
    const cerebellumMat = makeMat('#a8c49e');   // Green
    const brainstemMat = makeMat('#e3c5b8');    // Tan/Pink
    const corpusMat = makeMat('#b0c4de');       // Pale blue (corpus callosum)
    const defaultMat = makeMat('#a3a3a3');      // Grey default

    clone.traverse((child: any) => {
      if (child.isMesh) {
        const name = child.name ? child.name.toLowerCase() : '';
        let mat = defaultMat;
        if (name.includes('cereb1')) {
          mat = cerebellumMat;
        } else if (name.includes('stem1')) {
          mat = brainstemMat;
        } else if (name.includes('corpus1')) {
          mat = corpusMat;
        } else if (name.includes('temp1') || name.includes('pariet1') || name.includes('occipit1') || name.includes('frontal1')) {
          mat = cerebrumMat;
        }
        child.material = mat.clone();
      }
    });

    return clone;
  }, [obj]);

  const targetEmissive = new THREE.Color();

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

    // Animate emissive colors based on active region
    brainModel.traverse((child: any) => {
      if (child.isMesh && child.material) {
        const name = child.name ? child.name.toLowerCase() : '';
        const isActive = activeRegion && name && activeRegion === name;
        
        // If active, glow red for stress warning. Otherwise, no emissive.
        if (isActive) {
          targetEmissive.set('#ff1744');
          child.material.emissiveIntensity = 0.4;
        } else {
          targetEmissive.set('#000000');
          child.material.emissiveIntensity = 0;
        }
        
        if (child.material.emissive) {
          child.material.emissive.lerp(targetEmissive, 0.1);
        }
      }
    });
  });

  return (
    <group 
      ref={brainRef} 
      position={position}
      // Scale to fit the scene. The OBJ units are large, so scale down significantly.
      // Rotate so we see the side (sagittal) view — like in the reference image.
      scale={[0.025, 0.025, 0.025]}
      rotation={[0, Math.PI * 0.5, 0]}  // face us from the side
      onPointerOver={(e) => { e.stopPropagation(); setHoveredPart('brain'); }}
      onPointerOut={() => setHoveredPart(null)}
    >
      <Float speed={0.4} rotationIntensity={0.01} floatIntensity={0.04}>
        
        {/* The sliced brain model */}
        <primitive 
          object={brainModel} 
          onPointerOver={(e: any) => {
            e.stopPropagation();
            if (e.object.name) {
              setActiveRegion(e.object.name.toLowerCase());
              setHoveredPart('brain');
            }
          }}
          onPointerOut={() => {
            setActiveRegion(null);
            setHoveredPart(null);
          }}
        />

        {/* Cross-section cap — a flat disc on the cut face (z=0 plane in model space) */}
        {/* This simulates the flat interior surface you see in the reference image */}
        <mesh rotation={[0, 0, 0]} position={[0, 0, 0]}>
          <circleGeometry args={[70, 64]} />
          <meshStandardMaterial 
            color="#8a6fa0" 
            roughness={0.9} 
            metalness={0.0} 
            side={THREE.FrontSide}
          />
        </mesh>

        {/* SCN Node (Master Clock) — internal brain position */}
        <group 
          position={[-10, -40, 30]}
          onPointerOver={(e) => { e.stopPropagation(); setHoveredPart('scn'); }}
          onPointerOut={() => setHoveredPart(null)}
        >
          <mesh ref={scnRef}>
            <sphereGeometry args={[6, 16, 16]} />
            <meshBasicMaterial color={scnColor} />
          </mesh>
          <pointLight color={scnColor} intensity={0.8} distance={80} />
          <mesh>
            <sphereGeometry args={[12, 16, 16]} />
            <meshBasicMaterial color={scnColor} transparent opacity={0.25} blending={THREE.AdditiveBlending} />
          </mesh>
        </group>

        {/* Pineal Gland Node */}
        <group 
          position={[20, -20, 40]}
          onPointerOver={(e) => { e.stopPropagation(); setHoveredPart('pineal'); }}
          onPointerOut={() => setHoveredPart(null)}
        >
          <mesh ref={pinealRef}>
            <sphereGeometry args={[4, 16, 16]} />
            <meshBasicMaterial color={pinealColor} transparent opacity={pinealOpacity} />
          </mesh>
          <pointLight color={pinealColor} intensity={0.5 * pinealOpacity} distance={60} />
        </group>

        {/* Region Labels (positioned in model-space units) */}
        <Html position={[0, 80, 10]} center zIndexRange={[10, 0]}>
          <div className="text-white font-bold text-xs uppercase tracking-widest whitespace-nowrap drop-shadow-md">Cerebrum</div>
        </Html>
        <Html position={[-60, 30, 10]} center zIndexRange={[10, 0]}>
          <div className="text-white font-bold text-[10px] uppercase tracking-widest whitespace-nowrap drop-shadow-md">Diencephalon</div>
        </Html>
        <Html position={[-20, -80, 10]} center zIndexRange={[10, 0]}>
          <div className="text-white font-bold text-[10px] uppercase tracking-widest whitespace-nowrap drop-shadow-md">Brainstem</div>
        </Html>
        <Html position={[90, 50, 10]} center zIndexRange={[10, 0]}>
          <div className="text-white font-bold text-[10px] uppercase tracking-widest whitespace-nowrap drop-shadow-md">Cerebellum</div>
        </Html>

      </Float>

      <pointLight position={[0, 0, 100]} color={brainGlow} intensity={0.5} distance={400} />
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

  // Straight line connection from eye to brain
  const nerveCurve = useMemo(() => {
    return new THREE.LineCurve3(
      new THREE.Vector3(-4.0, -0.3, -1.0), // Eye exit
      new THREE.Vector3(3.8, -0.1, 0.5)    // Brain entry
    );
  }, []);

  const tubeGeo = useMemo(() => new THREE.TubeGeometry(nerveCurve, 64, 0.08, 16, false), [nerveCurve]);
  const sheathGeo = useMemo(() => new THREE.TubeGeometry(nerveCurve, 64, 0.14, 16, false), [nerveCurve]);
  
  // Custom glowing dashed material for the inner nerve
  const nerveMaterial = useMemo(() => {
    const mat = new THREE.MeshStandardMaterial({
      color: "#e3c5b8", // Tan nerve color
      emissive: signalColor,
      emissiveIntensity: 0.8,
      roughness: 0.6,
    });
    return mat;
  }, [signalColor]);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    
    // Animate individual signal pulses along the straight line
    signalRefs.current.forEach((ref, index) => {
      if (ref) {
        // Offset each signal pulse in time
        const offset = index * 0.25; 
        // Calculate progress from 0 to 1
        const progress = ((t * speed * 0.4) + offset) % 1;
        
        // Get position on the curve
        const pos = nerveCurve.getPointAt(progress);
        ref.position.copy(pos);
        
        // Scale pulse based on position (larger in the middle)
        const scale = Math.sin(progress * Math.PI) * 1.5 + 0.5;
        ref.scale.setScalar(scale);
      }
    });
  });

  return (
    <group 
      onPointerOver={(e) => { e.stopPropagation(); setHoveredPart('opticNerve'); }}
      onPointerOut={() => setHoveredPart(null)}
    >
      {/* The solid inner nerve bundle */}
      <mesh geometry={tubeGeo} material={nerveMaterial} />
      
      {/* Outer translucent sheath (Myelin/dura) */}
      <mesh geometry={sheathGeo}>
        <meshPhysicalMaterial 
          color="#38bdf8" 
          transparent 
          opacity={0.15} 
          roughness={0.1}
          transmission={0.8}
          thickness={0.1}
        />
      </mesh>

      {/* Moving signal pulses (Cyan glowing dashes/blobs) */}
      {[0, 1, 2, 3].map((i) => (
        <mesh
          key={i}
          ref={(el) => {
            if (el) signalRefs.current[i] = el;
          }}
        >
          <boxGeometry args={[0.3, 0.04, 0.04]} />
          <meshBasicMaterial color={signalColor} />
          {/* Signal Glow */}
          <pointLight color={signalColor} intensity={0.5} distance={1.0} />
        </mesh>
      ))}
      
      {/* Ambient glow around the nerve */}
      <pointLight position={[0, -0.2, 0]} color={nerveGlowColor} intensity={0.8} distance={5} />
    </group>
  );
}

// ============================================
// LIGHT RAYS — Horizontal beam traveling into the eye
// ============================================
function LightRays({ lightColor, speed }: { lightColor: string; speed: number; }) {
  const raysRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (raysRef.current) {
      const t = state.clock.elapsedTime;
      raysRef.current.children.forEach((child, i) => {
        const mesh = child as THREE.Mesh;
        const mat = mesh.material as THREE.MeshBasicMaterial;
        mat.opacity = 0.25 + Math.sin(t * speed * 2.5 + i * 0.8) * 0.25;
      });
    }
  });

  // Rays are horizontal lines along the X axis, entering the eye from the left
  return (
    <group ref={raysRef} position={[-5.5, -0.3, 0]}>
      {[-0.15, -0.07, 0, 0.07, 0.15].map((yOffset, i) => (
        <mesh key={`ray-${i}`} position={[0, yOffset, 0]} rotation={[0, 0, 0]}>
          <planeGeometry args={[2.0, 0.015]} />
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
// EDUCATIONAL DIAGRAM COMPONENTS
// ============================================
function DiagramCard({
  position,
  title,
  description,
}: {
  position: [number, number, number];
  title: string;
  description?: string;
}) {
  return (
    <Html position={position} center style={{ pointerEvents: "none" }} zIndexRange={[100, 0]}>
      <div className="bg-black/80 border border-white/20 p-3 sm:p-4 rounded-sm shadow-2xl min-w-[200px] max-w-[280px]">
        <h4 className="text-white font-bold text-[10px] sm:text-xs uppercase tracking-wider mb-1 leading-snug">
          {title}
        </h4>
        {description && (
          <p className="text-neutral-300 text-[9px] sm:text-[10px] leading-relaxed">
            {description}
          </p>
        )}
      </div>
    </Html>
  );
}

function DiagramTitle() {
  return (
    <Html position={[0, 4.5, 0]} center style={{ pointerEvents: "none" }} zIndexRange={[100, 0]}>
      <div className="text-white font-bold text-lg sm:text-xl md:text-2xl uppercase tracking-wider whitespace-nowrap drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
        The Visual and Circadian Pathway: Eye to Brain
      </div>
    </Html>
  );
}

// ============================================
// HUD BOX COMPONENT
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
        className="relative border border-dashed border-white/20 rounded-sm"
      >
        <div className="absolute -top-[1px] -left-[1px] w-4 h-4 border-t-2 border-l-2 border-brand-cyan/80" />
        <div className="absolute -top-[1px] -right-[1px] w-4 h-4 border-t-2 border-r-2 border-brand-cyan/80" />
        <div className="absolute -bottom-[1px] -left-[1px] w-4 h-4 border-b-2 border-l-2 border-brand-cyan/80" />
        <div className="absolute -bottom-[1px] -right-[1px] w-4 h-4 border-b-2 border-r-2 border-brand-cyan/80" />
        <div className="absolute -top-7 left-0 text-[10px] font-bold font-mono text-brand-cyan tracking-[0.15em] whitespace-nowrap uppercase drop-shadow-md bg-black/40 px-2 py-0.5 rounded backdrop-blur-sm border border-brand-cyan/20">
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
      camera={{ position: [0, 0.3, 16], fov: 52 }}
      style={{ width: "100%", height: "100%" }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
    >
      <color attach="background" args={["#050a11"]} />
      
      {/* Enable renderer clipping for the brain cross-section */}
      <ClippingPlaneSetup />
      
      {/* Studio Lighting Setup for Premium Medical Look */}
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 5, 5]} intensity={1.2} color="#ffffff" />
      <directionalLight position={[-5, 5, 2]} intensity={0.5} color="#e0f2fe" />
      <directionalLight position={[0, -5, 2]} intensity={0.4} color="#fce4ec" />
      <spotLight position={[0, 0, 8]} intensity={0.5} penumbra={1} angle={0.5} />

      <Environment preset="studio" environmentIntensity={0.3} />

      <ContactShadows position={[0, -2.2, 0]} opacity={0.4} scale={15} blur={2.5} far={4} />

      {/* Anatomy Components - Wrapped in Suspense because Brain uses useLoader */}
      <React.Suspense fallback={
        <Html center>
          <div className="text-cyan-400 font-mono text-sm uppercase tracking-widest animate-pulse">Loading Anatomy Models...</div>
        </Html>
      }>
        <ResponsiveLayout>
          <DiagramTitle />
          
          <EyeCrossSection 
            position={[-4.0, -0.3, 0]} 
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
            position={[4.0, 0.0, 0]} 
            brainGlow={brainGlow} 
            scnColor={scnColor} 
            pinealColor={pinealColor} 
            pinealOpacity={pinealOpacity} 
            speed={speed}
            setHoveredPart={setHoveredPart}
          />

          {/* Module HUD Boxes */}
          <HudBox 
            position={[-4.0, -0.3, 0]} 
            label="MODULE 01: OCULAR RECEPTOR" 
            width="280px" 
            height="280px" 
          />
          <HudBox 
            position={[0.0, -0.2, 0.2]} 
            label="MODULE 02: NEURAL PATHWAY" 
            width="380px" 
            height="140px" 
          />
          <HudBox 
            position={[4.0, 0.0, 0]} 
            label="MODULE 03: CORTICAL PROCESSING" 
            width="280px" 
            height="280px" 
          />

          {/* Educational Diagram Cards */}
          <DiagramCard 
            position={[-6.0, -2.5, 0]} 
            title="External Light Input: Natural Solar Spectrum" 
          />
          {/* Pointer line for External Light */}
          <Line points={[[-6.0, -2.0, 0], [-5.5, -0.6, 0], [-4.8, -0.3, 0]]} color="white" lineWidth={1.5} transparent opacity={0.6} />

          <DiagramCard 
            position={[-1.0, -3.2, 0]} 
            title="Photoreceptor Signal To Optic Nerve" 
          />
          {/* Pointer line for Optic Nerve */}
          <Line points={[[-1.0, -2.6, 0], [-1.0, -1.2, 0], [-0.5, -0.2, 0]]} color="white" lineWidth={1.5} transparent opacity={0.6} />

          <DiagramCard 
            position={[4.0, -3.8, 0]} 
            title="Signal Relay" 
            description="Photoreceptor signals are converted and transmitted via the optic nerve to processing centers in the diencephalon and cerebrum for visual and circadian regulation."
          />
          {/* Pointer line for Signal Relay */}
          <Line points={[[4.0, -3.2, 0], [4.0, -2.0, 0], [3.8, -1.2, 0]]} color="white" lineWidth={1.5} transparent opacity={0.6} />
          
        </ResponsiveLayout>
      </React.Suspense>

      {/* Major Landmark Labels */}
      <ProminentLabel position={[0.0, 1.3, 0]} color="#22d3ee">OPTIC NERVE</ProminentLabel>
      <ProminentLabel position={[5.4, 1.8, 0]} color="#a78bfa">VISUAL CORTEX</ProminentLabel>

      <OrbitControls 
        target={[0, 0, 0]}
        enablePan={false} 
        enableDamping 
        dampingFactor={0.08} 
        minDistance={8} 
        maxDistance={25} 
        minPolarAngle={Math.PI / 3} 
        maxPolarAngle={Math.PI / 1.8} 
        autoRotate={autoRotate}
        autoRotateSpeed={0.4}
      />

      <EffectComposer>
        <Bloom intensity={1.3} luminanceThreshold={0.3} luminanceSmoothing={0.7} mipmapBlur />
      </EffectComposer>
    </Canvas>
  );
}
