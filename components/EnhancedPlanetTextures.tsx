'use client';

import React, { useRef, useEffect } from 'react';
import { useTexture } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Enhanced planet materials with realistic textures
export const useEnhancedPlanetMaterial = (planetType: string, baseColor: string) => {
  const getMaterial = () => {
    switch (planetType) {
      case 'mobileapps':
        return new THREE.MeshStandardMaterial({
          color: baseColor,
          roughness: 0.8,
          metalness: 0.1,
          transparent: true,
          opacity: 0.95,
          envMapIntensity: 0.3
        });
      
      case 'webapps':
        return new THREE.MeshStandardMaterial({
          color: baseColor,
          roughness: 0.3,
          metalness: 0.7,
          transparent: true,
          opacity: 0.98,
          envMapIntensity: 0.8
        });
      
      case 'uxresearch':
        return new THREE.MeshStandardMaterial({
          color: baseColor,
          roughness: 0.9,
          metalness: 0.05,
          transparent: true,
          opacity: 0.9,
          envMapIntensity: 0.2
        });
      
      case 'uidesigns':
        return new THREE.MeshStandardMaterial({
          color: baseColor,
          roughness: 0.4,
          metalness: 0.3,
          transparent: true,
          opacity: 0.92,
          envMapIntensity: 0.6
        });
      
      case 'integrations':
        return new THREE.MeshStandardMaterial({
          color: baseColor,
          roughness: 0.1,
          metalness: 0.9,
          transparent: true,
          opacity: 0.99,
          envMapIntensity: 1.0
        });
      
      case 'writeups':
        return new THREE.MeshStandardMaterial({
          color: baseColor,
          roughness: 0.7,
          metalness: 0.2,
          transparent: true,
          opacity: 0.88,
          envMapIntensity: 0.4
        });
      
      default:
        return new THREE.MeshStandardMaterial({
          color: baseColor,
          roughness: 0.6,
          metalness: 0.4,
          transparent: true,
          opacity: 0.93,
          envMapIntensity: 0.5
        });
    }
  };

  return getMaterial();
};

// Generate procedural textures for planets
const generatePlanetTexture = (planetType: string, size: number = 512) => {
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d')!;

  // Base color
  const baseColors = {
    'mobileapps': '#3b82f6',
    'webapps': '#8b5cf6',
    'uxresearch': '#10b981',
    'uidesigns': '#f97316',
    'integrations': '#6366f1',
    'writeups': '#f59e0b'
  };

  const baseColor = baseColors[planetType as keyof typeof baseColors] || '#6b7280';
  
  // Fill base
  ctx.fillStyle = baseColor;
  ctx.fillRect(0, 0, size, size);

  // Add surface patterns based on planet type
  switch (planetType) {
    case 'mobileapps':
      // Circuit board pattern
      for (let i = 0; i < 50; i++) {
        ctx.strokeStyle = '#1e40af';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(Math.random() * size, Math.random() * size);
        ctx.lineTo(Math.random() * size, Math.random() * size);
        ctx.stroke();
        
        // Circuit nodes
        ctx.fillStyle = '#1e40af';
        ctx.beginPath();
        ctx.arc(Math.random() * size, Math.random() * size, 3, 0, Math.PI * 2);
        ctx.fill();
      }
      break;

    case 'webapps':
      // Digital network pattern
      for (let i = 0; i < 30; i++) {
        ctx.strokeStyle = '#7c3aed';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.arc(size/2, size/2, Math.random() * size/2, 0, Math.PI * 2);
        ctx.stroke();
        
        // Connection points
        ctx.fillStyle = '#7c3aed';
        ctx.beginPath();
        ctx.arc(Math.random() * size, Math.random() * size, 4, 0, Math.PI * 2);
        ctx.fill();
      }
      break;

    case 'uxresearch':
      // Organic, natural pattern
      for (let i = 0; i < 100; i++) {
        ctx.fillStyle = '#059669';
        ctx.beginPath();
        ctx.arc(Math.random() * size, Math.random() * size, Math.random() * 8 + 2, 0, Math.PI * 2);
        ctx.fill();
      }
      break;

    case 'uidesigns':
      // Geometric design pattern
      for (let i = 0; i < 20; i++) {
        ctx.fillStyle = '#ea580c';
        ctx.beginPath();
        ctx.rect(Math.random() * size, Math.random() * size, Math.random() * 20 + 10, Math.random() * 20 + 10);
        ctx.fill();
      }
      break;

    case 'integrations':
      // High-tech, futuristic pattern
      for (let i = 0; i < 40; i++) {
        ctx.strokeStyle = '#4f46e5';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(0, Math.random() * size);
        ctx.lineTo(size, Math.random() * size);
        ctx.stroke();
        
        ctx.beginPath();
        ctx.moveTo(Math.random() * size, 0);
        ctx.lineTo(Math.random() * size, size);
        ctx.stroke();
      }
      break;

    case 'writeups':
      // Text/document pattern
      for (let i = 0; i < 15; i++) {
        ctx.fillStyle = '#d97706';
        ctx.fillRect(Math.random() * size, Math.random() * size, Math.random() * 30 + 20, Math.random() * 4 + 2);
      }
      break;
  }

  // Add noise for realism
  for (let i = 0; i < 1000; i++) {
    const x = Math.random() * size;
    const y = Math.random() * size;
    const alpha = Math.random() * 0.1;
    
    ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
    ctx.fillRect(x, y, 1, 1);
  }

  return new THREE.CanvasTexture(canvas);
};

// Generate bump map for surface elevation
const generateBumpMap = (planetType: string, size: number = 512) => {
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d')!;

  // Create gradient for basic elevation
  const gradient = ctx.createRadialGradient(size/2, size/2, 0, size/2, size/2, size/2);
  gradient.addColorStop(0, 'rgba(255, 255, 255, 0.8)');
  gradient.addColorStop(0.7, 'rgba(255, 255, 255, 0.3)');
  gradient.addColorStop(1, 'rgba(0, 0, 0, 0.1)');
  
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, size, size);

  // Add terrain features based on planet type
  switch (planetType) {
    case 'mobileapps':
      // Smooth, polished surface
      for (let i = 0; i < 200; i++) {
        ctx.fillStyle = `rgba(255, 255, 255, ${Math.random() * 0.3})`;
        ctx.beginPath();
        ctx.arc(Math.random() * size, Math.random() * size, Math.random() * 15 + 5, 0, Math.PI * 2);
        ctx.fill();
      }
      break;

    case 'webapps':
      // Complex, detailed surface
      for (let i = 0; i < 300; i++) {
        ctx.fillStyle = `rgba(255, 255, 255, ${Math.random() * 0.5})`;
        ctx.beginPath();
        ctx.arc(Math.random() * size, Math.random() * size, Math.random() * 8 + 2, 0, Math.PI * 2);
        ctx.fill();
      }
      break;

    case 'uxresearch':
      // Natural, organic surface
      for (let i = 0; i < 150; i++) {
        ctx.fillStyle = `rgba(255, 255, 255, ${Math.random() * 0.4})`;
        ctx.beginPath();
        ctx.arc(Math.random() * size, Math.random() * size, Math.random() * 20 + 10, 0, Math.PI * 2);
        ctx.fill();
      }
      break;

    case 'uidesigns':
      // Structured, geometric surface
      for (let i = 0; i < 100; i++) {
        ctx.fillStyle = `rgba(255, 255, 255, ${Math.random() * 0.6})`;
        ctx.beginPath();
        ctx.rect(Math.random() * size, Math.random() * size, Math.random() * 25 + 15, Math.random() * 25 + 15);
        ctx.fill();
      }
      break;

    case 'integrations':
      // High-tech, precise surface
      for (let i = 0; i < 400; i++) {
        ctx.fillStyle = `rgba(255, 255, 255, ${Math.random() * 0.7})`;
        ctx.beginPath();
        ctx.arc(Math.random() * size, Math.random() * size, Math.random() * 5 + 1, 0, Math.PI * 2);
        ctx.fill();
      }
      break;

    case 'writeups':
      // Textured, document-like surface
      for (let i = 0; i < 80; i++) {
        ctx.fillStyle = `rgba(255, 255, 255, ${Math.random() * 0.5})`;
        ctx.fillRect(Math.random() * size, Math.random() * size, Math.random() * 40 + 20, Math.random() * 6 + 3);
      }
      break;
  }

  return new THREE.CanvasTexture(canvas);
};

// Enhanced planet with realistic textures
export const EnhancedPlanet3D = ({ 
  planetType, 
  baseColor, 
  size, 
  position, 
  onClick, 
  hovered,
  onPointerOver,
  onPointerOut
}: {
  planetType: string;
  baseColor: string;
  size: number;
  position: [number, number, number];
  onClick: () => void;
  hovered: boolean;
  onPointerOver: () => void;
  onPointerOut: () => void;
}) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  // Generate textures
  const colorMap = generatePlanetTexture(planetType);
  const bumpMap = generateBumpMap(planetType);
  
  // Create enhanced material
  const material = new THREE.MeshStandardMaterial({
    map: colorMap,
    bumpMap: bumpMap,
    bumpScale: 0.1,
    roughness: 0.6,
    metalness: 0.4,
    transparent: true,
    opacity: 0.95,
    envMapIntensity: 0.5
  });

  // Planet rotation animation
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.005;
      meshRef.current.rotation.x += 0.002;
    }
  });

  return (
    <mesh
      ref={meshRef}
      position={position}
      onClick={onClick}
      onPointerOver={onPointerOver}
      onPointerOut={onPointerOut}
      scale={hovered ? 1.2 : 1}
    >
      <sphereGeometry args={[size, 128, 128]} />
      <primitive object={material} />
    </mesh>
  );
};

// Enhanced atmospheric effects with scattering
export const EnhancedPlanetAtmosphere = ({ 
  planetType, 
  baseColor, 
  size, 
  position 
}: {
  planetType: string;
  baseColor: string;
  size: number;
  position: [number, number, number];
}) => {
  const atmosphereRef = useRef<THREE.Mesh>(null);
  
  // Atmospheric animation
  useFrame((state) => {
    if (atmosphereRef.current) {
      atmosphereRef.current.rotation.y += 0.003;
    }
  });

  const getAtmosphereColor = () => {
    switch (planetType) {
      case 'mobileapps': return '#3b82f6';
      case 'webapps': return '#8b5cf6';
      case 'uxresearch': return '#10b981';
      case 'uidesigns': return '#f97316';
      case 'integrations': return '#6366f1';
      case 'writeups': return '#f59e0b';
      default: return baseColor;
    }
  };

  return (
    <group>
      {/* Inner atmosphere */}
      <mesh position={position} ref={atmosphereRef}>
        <sphereGeometry args={[size + 0.3, 32, 32]} />
        <meshBasicMaterial 
          color={getAtmosphereColor()} 
          transparent 
          opacity={0.15}
          side={THREE.BackSide}
        />
      </mesh>
      
      {/* Outer atmosphere glow */}
      <mesh position={position}>
        <sphereGeometry args={[size + 0.8, 16, 16]} />
        <meshBasicMaterial 
          color={getAtmosphereColor()} 
          transparent 
          opacity={0.05}
          side={THREE.BackSide}
        />
      </mesh>
      
      {/* Atmospheric particles */}
      <mesh position={position}>
        <sphereGeometry args={[size + 0.5, 64, 64]} />
        <meshBasicMaterial 
          color={getAtmosphereColor()} 
          transparent 
          opacity={0.02}
          side={THREE.BackSide}
        />
      </mesh>
    </group>
  );
};

// Enhanced sun with realistic corona and flares
export const EnhancedSun3D = () => {
  const sunRef = useRef<THREE.Mesh>(null);
  const coronaRef = useRef<THREE.Mesh>(null);
  
  // Sun rotation and animation
  useFrame((state) => {
    if (sunRef.current) {
      sunRef.current.rotation.y += 0.003;
    }
    if (coronaRef.current) {
      coronaRef.current.rotation.y += 0.001;
      coronaRef.current.rotation.z += 0.002;
    }
  });

  return (
    <group>
      {/* Main sun core */}
      <mesh ref={sunRef} position={[0, 0, 0]}>
        <sphereGeometry args={[15, 128, 128]} />
        <meshBasicMaterial color="#fbbf24" />
      </mesh>
      
      {/* Sun corona layers */}
      <mesh ref={coronaRef} position={[0, 0, 0]}>
        <sphereGeometry args={[20, 64, 64]} />
        <meshBasicMaterial 
          color="#f59e0b" 
          transparent 
          opacity={0.4}
          side={THREE.BackSide}
        />
      </mesh>
      
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[30, 32, 32]} />
        <meshBasicMaterial 
          color="#d97706" 
          transparent 
          opacity={0.2}
          side={THREE.BackSide}
        />
      </mesh>
      
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[40, 16, 16]} />
        <meshBasicMaterial 
          color="#b45309" 
          transparent 
          opacity={0.1}
          side={THREE.BackSide}
        />
      </mesh>
      
      {/* Solar flares */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[25, 16, 16]} />
        <meshBasicMaterial 
          color="#fbbf24" 
          transparent 
          opacity={0.3}
          side={THREE.BackSide}
        />
      </mesh>
    </group>
  );
};
