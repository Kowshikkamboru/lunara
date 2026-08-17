import { Suspense, ReactNode } from "react";
import { Canvas } from "@react-three/fiber";
import { Preload } from "@react-three/drei";

interface SceneWrapperProps {
  children: ReactNode;
  className?: string;
}

export function SceneWrapper({ children, className = "" }: SceneWrapperProps) {
  return (
    <div className={`w-full h-full ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 15], fov: 45 }}
        dpr={[1, 2]}
        gl={{ alpha: true, antialias: true }}
      >
        <Suspense fallback={null}>
          {children}
          <Preload all />
        </Suspense>
      </Canvas>
    </div>
  );
}
