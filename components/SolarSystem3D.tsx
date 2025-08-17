'use client';

import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { 
  OrbitControls, 
  Stars, 
  Text, 
  Html, 
  useTexture,
  Sphere,
  MeshDistortMaterial,
  Float,
  Sparkles
} from '@react-three/drei';
import * as THREE from 'three';
import { EnhancedPlanet3D, EnhancedPlanetAtmosphere, EnhancedSun3D } from './EnhancedPlanetTextures';

// Circular Text Component
const CircularText = ({ 
  text, 
  radius, 
  position = [0, 0, 0], 
  color = '#ffffff',
  fontSize = 16.5,
  visible = true 
}: {
  text: string;
  radius: number;
  position?: [number, number, number];
  color?: string;
  fontSize?: number;
  visible?: boolean;
}) => {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (groupRef.current && visible) {
      groupRef.current.rotation.y += 0.01; // Slow rotation
    }
  });

  if (!visible) return null;

  const characters = text.split('');
  const angleStep = 0.15; // Fixed spacing between letters for normal text spacing

  return (
    <group ref={groupRef} position={position}>
      {characters.map((char, index) => {
        const angle = angleStep * index;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;
        const y = 0;

        return (
          <Text
            key={index}
            position={[x, y, z]}
            rotation={[0, angle + Math.PI / 2, 0]}
            fontSize={fontSize}
            color={color}
            anchorX="center"
            anchorY="middle"
            font="Inter"
          >
            {char === ' ' ? '\u00A0' : char}
          </Text>
        );
      })}
    </group>
  );
};

// Planet Component with improved collision avoidance and circular text
const Planet = ({ 
  position, 
  size, 
  color, 
  name, 
  projects, 
  onClick, 
  orbitRadius, 
  orbitSpeed,
  textureUrl,
  hasRings = false,
  ringColor = '#ffffff',
  initialAngle = 0
}: {
  position: [number, number, number];
  size: number;
  color: string;
  name: string;
  projects: any[];
  onClick: () => void;
  orbitRadius: number;
  orbitSpeed: number;
  textureUrl?: string;
  hasRings?: boolean;
  ringColor?: string;
  initialAngle?: number;
}) => {
  const meshRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);
  
  // Planet self-rotation
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01;
    }
  });

  // Circular orbital movement around the sun
  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.getElapsedTime();
      const angle = (time * orbitSpeed) + initialAngle;
      const x = Math.cos(angle) * orbitRadius;
      const z = Math.sin(angle) * orbitRadius;
      meshRef.current.position.set(x, 0, z);
    }
  });

  return (
    <group ref={meshRef}>
      {/* Enhanced 3D Planet */}
      <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.2}>
        <group>
          <EnhancedPlanet3D
            planetType={name.toLowerCase().replace(/\s+/g, '')}
            baseColor={color}
            size={size}
            position={[0, 0, 0]}
            onClick={onClick}
            hovered={hovered}
            onPointerOver={() => setHovered(true)}
            onPointerOut={() => setHovered(false)}
          />
        </group>
      </Float>

      {/* Enhanced Planet Atmosphere */}
      <EnhancedPlanetAtmosphere
        planetType={name.toLowerCase().replace(/\s+/g, '')}
        baseColor={color}
        size={size}
        position={[0, 0, 0]}
      />

      {/* Planet Rings (for specific planets) */}
      {hasRings && (
        <mesh position={[0, 0, 0]} rotation={[Math.PI / 2.2, 0, 0]}>
          <ringGeometry args={[size + 1.5, size + 4, 32]} />
          <meshBasicMaterial 
            color={ringColor} 
            transparent 
            opacity={0.4}
            side={THREE.DoubleSide}
          />
        </mesh>
      )}

      {/* Circular Text Label - Always Visible */}
      <CircularText
        text={name.toUpperCase()}
        radius={size + 2.5}
        position={[0, 0, 0]}
        color={color}
        fontSize={16.5}
        visible={true}
      />

      {/* Glow Effect */}
      {hovered && (
        <mesh position={[0, 0, 0]}>
          <sphereGeometry args={[size + 0.8, 16, 16]} />
          <meshBasicMaterial 
            color={color} 
            transparent 
            opacity={0.2}
            side={THREE.BackSide}
          />
        </mesh>
      )}
    </group>
  );
};

// Enhanced Central Sun
const Sun = () => {
  const sunRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (sunRef.current) {
      sunRef.current.rotation.y += 0.005;
      sunRef.current.rotation.x += 0.002;
    }
    if (glowRef.current) {
      glowRef.current.rotation.y -= 0.003;
    }
  });

  return (
    <group position={[0, 0, 0]}>
      {/* Enhanced 3D Sun */}
      <EnhancedSun3D />
      
      {/* Additional Sun Glow Layers */}
      <mesh ref={glowRef} position={[0, 0, 0]}>
        <sphereGeometry args={[18, 16, 16]} />
        <meshBasicMaterial 
          color="#f59e0b" 
          transparent 
          opacity={0.15}
          side={THREE.BackSide}
        />
      </mesh>
      
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[22, 16, 16]} />
        <meshBasicMaterial 
          color="#fbbf24" 
          transparent 
          opacity={0.08}
          side={THREE.BackSide}
        />
      </mesh>

      {/* Sun Corona Effect */}
      <Sparkles 
        count={150} 
        scale={35} 
        size={3} 
        speed={0.8} 
        color="#fbbf24"
        opacity={0.6}
      />
    </group>
  );
};

// Orbital Paths
const OrbitPath = ({ radius, color = '#ffffff', opacity = 0.1, segments = 64 }) => {
  const points = [];
  
  for (let i = 0; i <= segments; i++) {
    const angle = (i / segments) * Math.PI * 2;
    points.push(new THREE.Vector3(
      Math.cos(angle) * radius,
      0,
      Math.sin(angle) * radius
    ));
  }

  const geometry = new THREE.BufferGeometry().setFromPoints(points);

  return (
    <primitive object={new THREE.Line(geometry, new THREE.LineBasicMaterial({ 
      color, 
      transparent: true, 
      opacity,
      linewidth: 2
    }))} />
  );
};

// Main 3D Scene
const SolarSystemScene = ({ onPlanetClick, planets }: {
  onPlanetClick: (planet: any) => void;
  planets: any[];
}) => {
  const { camera } = useThree();
  
  // Set up camera position for better view
  useEffect(() => {
    camera.position.set(0, 50, 120);
    camera.lookAt(0, 0, 0);
  }, [camera]);

  // Improved orbital parameters to prevent collisions
  const getOrbitRadius = (index: number) => {
    const baseRadius = 40; // Increased base radius
    const radiusIncrement = 20; // Increased spacing between orbits
    return baseRadius + (index * radiusIncrement);
  };

  const getOrbitSpeed = (index: number) => {
    // Closer planets orbit faster (like real solar system)
    const baseSpeed = 0.3; // Slightly slower for better viewing
    return baseSpeed / (1 + index * 0.2);
  };

  const getPlanetSize = (planet: any, index: number) => {
    // Ensure consistent sizing that prevents collisions
    const baseSize = 3; // Minimum size
    const maxSize = 6; // Maximum size
    const calculatedSize = Math.max(baseSize, Math.min(maxSize, planet.size / 6));
    return calculatedSize;
  };

  return (
    <>
      {/* Enhanced Lighting System */}
      <ambientLight intensity={0.15} color="#1e293b" />
      <pointLight position={[0, 0, 0]} intensity={4} color="#fbbf24" castShadow />
      <pointLight position={[80, 60, 80]} intensity={0.8} color="#3b82f6" />
      <pointLight position={[-80, -60, -80]} intensity={0.6} color="#8b5cf6" />
      <directionalLight position={[100, 100, 50]} intensity={0.3} color="#ffffff" />
      
      {/* Central Sun */}
      <Sun />
      
      {/* Orbital Paths - drawn for each planet */}
      {planets.map((planet, index) => {
        const orbitRadius = getOrbitRadius(index);
        const pathColor = planet.color.split(' ')[1] || '#ffffff';
        
        return (
          <OrbitPath 
            key={`orbit-${planet.id}`} 
            radius={orbitRadius}
            color={pathColor}
            opacity={0.12}
            segments={128}
          />
        );
      })}
      
      {/* Planets in Circular Orbits */}
      {planets.map((planet, index) => {
        const orbitRadius = getOrbitRadius(index);
        const orbitSpeed = getOrbitSpeed(index);
        const planetSize = getPlanetSize(planet, index);
        const initialAngle = (index / planets.length) * Math.PI * 2; // Even distribution
        
        return (
          <Planet
            key={planet.id}
            position={[orbitRadius, 0, 0]} // Starting position
            size={planetSize}
            color={planet.color.split(' ')[1] || '#ffffff'}
            name={planet.name}
            projects={planet.projects}
            onClick={() => onPlanetClick(planet)}
            orbitRadius={orbitRadius}
            orbitSpeed={orbitSpeed}
            hasRings={planet.id === 'web' || planet.id === 'integrations' || planet.name.toLowerCase().includes('saturn')}
            ringColor={planet.color.split(' ')[1] || '#ffffff'}
            initialAngle={initialAngle}
          />
        );
      })}
      
      {/* Enhanced Background */}
      <Stars 
        radius={400} 
        depth={80} 
        count={3000} 
        factor={8} 
        saturation={0.2} 
        fade 
        speed={0.8}
      />
      
      {/* Space Nebula Effect */}
      <Sparkles 
        count={800} 
        scale={500} 
        size={0.8} 
        speed={0.2} 
        color="#4338ca"
        opacity={0.2}
      />
      
      <Sparkles 
        count={600} 
        scale={450} 
        size={1.2} 
        speed={0.15} 
        color="#7c3aed"
        opacity={0.15}
      />
    </>
  );
};

// Main Component
const SolarSystem3D = ({ planets, onPlanetClick, children }: {
  planets: any[];
  onPlanetClick: (planet: any) => void;
  children?: React.ReactNode;
}) => {
  return (
    <div className="w-full h-full relative">
      <Canvas
        camera={{ position: [0, 50, 120], fov: 65 }}
        style={{ 
          background: 'radial-gradient(ellipse at center, #1e293b 0%, #0f172a 70%, #000000 100%)' 
        }}
        shadows
      >
        <SolarSystemScene 
          planets={planets} 
          onPlanetClick={onPlanetClick} 
        />
        <OrbitControls 
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          maxDistance={300}
          minDistance={40}
          autoRotate={false}
          autoRotateSpeed={0.3}
          dampingFactor={0.05}
          enableDamping={true}
        />
      </Canvas>
      
      {/* UI Overlay */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        {children}
      </div>
      
      {/* Optional: Solar System Info Panel */}
      <div className="absolute top-4 left-4 z-20 bg-black/50 backdrop-blur-sm rounded-lg p-4 text-white text-sm pointer-events-auto">
        <h3 className="font-semibold mb-2">Solar System</h3>
        <div className="space-y-1 text-xs opacity-80">
          <div>🌟 Central Sun</div>
          <div>🌍 {planets.length} Planets in Orbit</div>
          <div>💫 Interactive 3D Experience</div>
        </div>
      </div>
    </div>
  );
};

export default SolarSystem3D;