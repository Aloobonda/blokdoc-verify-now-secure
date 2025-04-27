
import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

// Generate random points for stars
function randomPointSphere(radius: number) {
  const u = Math.random();
  const v = Math.random();
  const theta = 2 * Math.PI * u;
  const phi = Math.acos(2 * v - 1);
  const x = radius * Math.sin(phi) * Math.cos(theta);
  const y = radius * Math.sin(phi) * Math.sin(theta);
  const z = radius * Math.cos(phi);
  return [x, y, z];
}

interface PointsProps {
  count: number;
}

function Points({ count }: PointsProps) {
  const pointsRef = useRef<THREE.Points>(null);
  
  // Generate initial positions
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  
  for (let i = 0; i < count; i++) {
    const [x, y, z] = randomPointSphere(Math.random() * 4 + 2);
    positions[i * 3] = x;
    positions[i * 3 + 1] = y;
    positions[i * 3 + 2] = z;
    
    // Random colors between blue and purple
    colors[i * 3] = 0.1 + Math.random() * 0.1;     // R - low for blue/purple
    colors[i * 3 + 1] = 0.2 + Math.random() * 0.4; // G - medium for blue/cyan
    colors[i * 3 + 2] = 0.5 + Math.random() * 0.5; // B - high for blue tones
  }
  
  useFrame((state) => {
    if (!pointsRef.current) return;
    
    // Rotate slowly
    pointsRef.current.rotation.x = state.clock.getElapsedTime() * 0.05;
    pointsRef.current.rotation.y = state.clock.getElapsedTime() * 0.04;
    
    // Pulse size
    const scale = 1 + Math.sin(state.clock.getElapsedTime() * 0.3) * 0.1;
    pointsRef.current.scale.set(scale, scale, scale);
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={count}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <PointMaterial
        transparent
        vertexColors
        size={0.15}
        sizeAttenuation={true}
        depthWrite={false}
        toneMapped={false}
      />
    </points>
  );
}

function FloatingCube() {
  const meshRef = useRef<THREE.Mesh>(null);
  const edgesRef = useRef<THREE.LineSegments>(null);
  
  useFrame((state) => {
    if (!meshRef.current || !edgesRef.current) return;
    
    // Floating motion
    meshRef.current.position.y = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.3;
    edgesRef.current.position.y = meshRef.current.position.y;
    
    // Rotation
    meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.2;
    meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.3;
    edgesRef.current.rotation.x = meshRef.current.rotation.x;
    edgesRef.current.rotation.y = meshRef.current.rotation.y;
  });
  
  return (
    <group>
      <mesh ref={meshRef} position={[2, 0, -2]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshBasicMaterial color="#06b6d4" transparent opacity={0.1} />
      </mesh>
      <lineSegments ref={edgesRef} position={[2, 0, -2]}>
        <edgesGeometry args={[new THREE.BoxGeometry(1, 1, 1)]} />
        <lineBasicMaterial color="#06b6d4" />
      </lineSegments>
    </group>
  );
}

function BackgroundScene() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <Points count={2000} />
      <FloatingCube />
    </>
  );
}

export default function Background() {
  return (
    <div className="fixed inset-0 -z-10">
      <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
        <BackgroundScene />
      </Canvas>
    </div>
  );
}
