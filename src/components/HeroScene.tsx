'use client';

import React, { useRef, useState, useEffect, Component, ReactNode } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sphere, Torus, Stars } from '@react-three/drei';
import * as THREE from 'three';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class ThreeErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: any, errorInfo: any) {
    console.warn('ThreeJS Canvas rendering encountered an issue:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <div className="absolute inset-0 bg-gradient-to-tr from-blue-900/10 via-transparent to-purple-900/10 pointer-events-none" />;
    }
    return this.props.children;
  }
}

const QuantumParticle = ({
  position,
  color,
  scale = 1,
  metalness = 0.8,
  roughness = 0.2,
  isPaused = false,
}: {
  position: [number, number, number];
  color: string;
  scale?: number;
  metalness?: number;
  roughness?: number;
  isPaused?: boolean;
}) => {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (ref.current && !isPaused) {
      const t = state.clock.getElapsedTime();
      ref.current.position.y = position[1] + Math.sin(t * 1.8 + position[0]) * 0.25;
      ref.current.rotation.x = t * 0.4;
      ref.current.rotation.z = t * 0.3;
    }
  });

  return (
    <Sphere ref={ref} args={[1, 24, 24]} position={position} scale={scale}>
      <MeshDistortMaterial
        color={color}
        roughness={roughness}
        metalness={metalness}
        distort={0.35}
        speed={1.8}
      />
    </Sphere>
  );
};

const MacroscopicWave = ({ isPaused = false }: { isPaused?: boolean }) => {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (ref.current && !isPaused) {
      const t = state.clock.getElapsedTime();
      ref.current.rotation.x = Math.sin(t * 0.2) * 0.25;
      ref.current.rotation.y = t * 0.15;
    }
  });

  return (
    <Torus ref={ref} args={[3.2, 0.08, 12, 60]} rotation={[Math.PI / 2, 0, 0]}>
      <meshStandardMaterial color="#A1A1AA" emissive="#5B8DEF" emissiveIntensity={0.35} transparent opacity={0.4} wireframe />
    </Torus>
  );
};

export const HeroScene: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(true);

  // Pause rendering when scrolled out of view or tab is hidden
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    const handleVisibilityChange = () => {
      if (document.hidden) setIsVisible(false);
      else if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setIsVisible(rect.bottom > 0 && rect.top < window.innerHeight);
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      observer.disconnect();
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 z-0 opacity-75 pointer-events-none">
      <ThreeErrorBoundary>
        <Canvas
          style={{ pointerEvents: 'none' }}
          camera={{ position: [0, 0, 6], fov: 45 }}
          dpr={[1, 1.5]}
          gl={{ powerPreference: 'high-performance', antialias: true, alpha: true }}
        >
          <ambientLight intensity={1.2} />
          <directionalLight position={[5, 10, 7]} intensity={2.0} color="#FFFFFF" />
          <pointLight position={[10, 10, 10]} intensity={1.8} color="#FFFFFF" />
          <pointLight position={[-10, -10, -10]} intensity={1.2} color="#5B8DEF" />
          
          <Float speed={isVisible ? 1.5 : 0} rotationIntensity={isVisible ? 0.3 : 0} floatIntensity={isVisible ? 0.6 : 0}>
            <QuantumParticle position={[0, 0, 0]} color="#3F424E" scale={1.1} metalness={0.85} isPaused={!isVisible} />
            <MacroscopicWave isPaused={!isVisible} />
          </Float>

          <Float speed={isVisible ? 2 : 0} rotationIntensity={isVisible ? 0.5 : 0} floatIntensity={isVisible ? 1 : 0}>
            <QuantumParticle position={[-3.2, 1.2, -2]} color="#5B8DEF" scale={0.55} metalness={0.6} isPaused={!isVisible} />
            <QuantumParticle position={[3.2, -1.2, -2.5]} color="#27272A" scale={0.65} metalness={0.9} isPaused={!isVisible} />
            <QuantumParticle position={[0.5, 2.5, -4]} color="#E4E4E7" scale={0.4} metalness={0.7} isPaused={!isVisible} />
          </Float>

          <Stars radius={100} depth={50} count={500} factor={3} saturation={0} fade speed={1} />
        </Canvas>
      </ThreeErrorBoundary>
    </div>
  );
};

export default HeroScene;


