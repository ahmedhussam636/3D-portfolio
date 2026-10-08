import React, { useState, useEffect, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Preload } from "@react-three/drei";

import BallCanvas, { BallMesh } from "./canvas/Ball";
import { SectionWrapper } from "../hoc";
import { technologies } from "../constants";

/**
 * Mobile: renders ALL balls inside ONE Canvas = 1 WebGL context only.
 * Android Chrome limits concurrent WebGL contexts to ~8.
 * 14 individual Ball canvases would blow past that limit and silently fail.
 */
const MobileTechGrid = ({ techs }) => {
  const cols = 4;
  const spacing = 4.5;
  const rows = Math.ceil(techs.length / cols);

  // Center the grid vertically
  const gridCenterY = -((rows - 1) * spacing) / 2;

  // Camera Z distance to fit all cols in view (fov=50)
  const halfFovRad = (50 / 2) * (Math.PI / 180);
  const halfGridWidth = ((cols - 1) * spacing) / 2 + 2.5;
  const camZ = halfGridWidth / Math.tan(halfFovRad) + 2;

  // Canvas pixel height: each row gets 110px
  const canvasHeight = rows * 110;

  return (
    <div style={{ width: "100%", height: `${canvasHeight}px` }}>
      <Canvas
        frameloop='always'
        dpr={[1, 1.5]}
        camera={{ position: [0, gridCenterY, camZ], fov: 50 }}
        gl={{
          antialias: false,
          failIfMajorPerformanceCaveat: false,
          preserveDrawingBuffer: true,
          powerPreference: "high-performance",
        }}
      >
        <Suspense fallback={null}>
          {techs.map((tech, i) => {
            const col = i % cols;
            const row = Math.floor(i / cols);
            const x = (col - (cols - 1) / 2) * spacing;
            const y = gridCenterY + ((rows - 1) / 2 - row) * spacing;
            return (
              <group key={tech.name} position={[x, y, 0]}>
                <BallMesh imgUrl={tech.icon} />
              </group>
            );
          })}
        </Suspense>
        <Preload all />
      </Canvas>
    </div>
  );
};

const Tech = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    setIsMobile(mq.matches);
    const handler = (e) => setIsMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  if (isMobile) {
    // Single canvas for ALL balls → 1 WebGL context instead of 14
    return <MobileTechGrid techs={technologies} />;
  }

  // Desktop: individual canvases are fine (browsers allow many more contexts)
  return (
    <div className='flex flex-row flex-wrap justify-center gap-10'>
      {technologies.map((technology) => (
        <div className='w-28 h-28' key={technology.name}>
          <BallCanvas icon={technology.icon} />
        </div>
      ))}
    </div>
  );
};

export default SectionWrapper(Tech, "");
