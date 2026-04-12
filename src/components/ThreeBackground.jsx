import React, { useRef, useMemo, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars, Float, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';

function LightningParticles({ count = 500 }) {
  const points = useRef();
  
  // Create particle positions
  const particles = useMemo(() => {
    const temp = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
        temp[i * 3] = (Math.random() - 0.5) * 50;
        temp[i * 3 + 1] = (Math.random() - 0.5) * 50;
        temp[i * 3 + 2] = (Math.random() - 0.5) * 50;
    }
    return temp;
  }, [count]);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    // Flicker intensity for lightning effect
    points.current.rotation.y = time * 0.05;
    points.current.material.opacity = Math.random() > 0.98 ? 0.8 : 0.05;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particles.length / 3}
          array={particles}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.1}
        color="#00d4ff"
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

const ThreeBackground = () => {
  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1 }}>
      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 0, 10]} />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#e50914" />
        
        <Suspense fallback={null}>
          <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
          <LightningParticles />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default ThreeBackground;
