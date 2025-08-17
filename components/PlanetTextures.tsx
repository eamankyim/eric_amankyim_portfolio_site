'use client';

import React from 'react';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';

// Planet texture materials with realistic surfaces
export const usePlanetMaterial = (planetType, baseColor) => {
  const getMaterial = () => {
    switch (planetType) {
      case 'mobileapps':
        return new THREE.MeshPhongMaterial({
          color: baseColor,
          shininess: 30,
          specular: 0x444444,
          bumpScale: 0.05,
          transparent: true,
          opacity: 0.9
        });
      
      case 'webapps':
        return new THREE.MeshPhongMaterial({
          color: baseColor,
          shininess: 100,
          specular: 0x666666,
          bumpScale: 0.1,
          transparent: true,
          opacity: 0.95
        });
      
      case 'uxresearch':
        return new THREE.MeshPhongMaterial({
          color: baseColor,
          shininess: 20,
          specular: 0x222222,
          bumpScale: 0.03,
          transparent: true,
          opacity: 0.85
        });
      
      case 'uidesigns':
        return new THREE.MeshPhongMaterial({
          color: baseColor,
          shininess: 80,
          specular: 0x555555,
          bumpScale: 0.08,
          transparent: true,
          opacity: 0.9
        });
      
      case 'integrations':
        return new THREE.MeshPhongMaterial({
          color: baseColor,
          shininess: 150,
          specular: 0x888888,
          bumpScale: 0.12,
          transparent: true,
          opacity: 0.98
        });
      
      case 'writeups':
        return new THREE.MeshPhongMaterial({
          color: baseColor,
          shininess: 40,
          specular: 0x333333,
          bumpScale: 0.04,
          transparent: true,
          opacity: 0.87
        });
      
      default:
        return new THREE.MeshPhongMaterial({
          color: baseColor,
          shininess: 50,
          specular: 0x444444,
          bumpScale: 0.06,
          transparent: true,
          opacity: 0.9
        });
    }
  };

  return getMaterial();
};

// Enhanced planet with surface details
export const EnhancedPlanet = ({ 
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
  const material = usePlanetMaterial(planetType, baseColor);
  
  return (
    <mesh
      position={position}
      onClick={onClick}
      onPointerOver={onPointerOver}
      onPointerOut={onPointerOut}
      scale={hovered ? 1.2 : 1}
    >
      <sphereGeometry args={[size, 64, 64]} />
      <primitive object={material} />
      
      {/* Surface details based on planet type */}
      {planetType === 'webapps' && (
        <mesh position={[0, 0, 0]}>
          <sphereGeometry args={[size + 0.1, 32, 32]} />
          <meshBasicMaterial 
            color={baseColor} 
            transparent 
            opacity={0.1}
            side={THREE.BackSide}
          />
        </mesh>
      )}
      
      {planetType === 'integrations' && (
        <mesh position={[0, 0, 0]}>
          <sphereGeometry args={[size + 0.15, 32, 32]} />
          <meshBasicMaterial 
            color={baseColor} 
            transparent 
            opacity={0.15}
            side={THREE.BackSide}
          />
        </mesh>
      )}
    </mesh>
  );
};

// Atmospheric effects for planets
export const PlanetAtmosphere = ({ planetType, baseColor, size, position }: {
  planetType: string;
  baseColor: string;
  size: number;
  position: [number, number, number];
}) => {
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
    <mesh position={position}>
      <sphereGeometry args={[size + 0.5, 16, 16]} />
      <meshBasicMaterial 
        color={getAtmosphereColor()} 
        transparent 
        opacity={0.1}
        side={THREE.BackSide}
      />
    </mesh>
  );
};

// Enhanced sun with corona effect
export const EnhancedSun = () => {
  return (
    <group>
      {/* Main sun core */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[15, 64, 64]} />
        <meshBasicMaterial color="#fbbf24" />
      </mesh>
      
      {/* Sun corona */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[20, 32, 32]} />
        <meshBasicMaterial 
          color="#f59e0b" 
          transparent 
          opacity={0.3}
          side={THREE.BackSide}
        />
      </mesh>
      
      {/* Outer corona */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[30, 16, 16]} />
        <meshBasicMaterial 
          color="#d97706" 
          transparent 
          opacity={0.1}
          side={THREE.BackSide}
        />
      </mesh>
    </group>
  );
};
