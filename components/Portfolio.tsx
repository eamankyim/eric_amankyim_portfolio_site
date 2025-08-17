'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Camera, Menu, X, Sun, Moon, ExternalLink, Github, Linkedin, Mail } from 'lucide-react';

const Portfolio = () => {
  const [phase, setPhase] = useState('welcome');
  const [journeyProgress, setJourneyProgress] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const canvasRef = useRef(null);
  const journeyCanvasRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  // Journey Animation
  useEffect(() => {
    if (phase !== 'journey') return;

    const canvas = journeyCanvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationId;
    let startTime = Date.now();
    const duration = 20000; // 20 seconds

    const stars = [];
    const particles = [];
    const nebulaClouds = [];
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Create stars
    for (let i = 0; i < 800; i++) {
      stars.push({
        x: (Math.random() - 0.5) * 4000,
        y: (Math.random() - 0.5) * 4000,
        z: Math.random() * 2000,
        size: Math.random() * 3 + 1
      });
    }

    // Create particles
    for (let i = 0; i < 200; i++) {
      particles.push({
        x: (Math.random() - 0.5) * 2000,
        y: (Math.random() - 0.5) * 2000,
        z: Math.random() * 1000,
        speed: Math.random() * 2 + 1,
        size: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.5 + 0.3
      });
    }

    // Create nebula clouds
    for (let i = 0; i < 20; i++) {
      nebulaClouds.push({
        x: (Math.random() - 0.5) * 6000,
        y: (Math.random() - 0.5) * 6000,
        z: Math.random() * 3000 + 1000,
        size: Math.random() * 300 + 100,
        opacity: Math.random() * 0.3 + 0.1,
        color: Math.random() > 0.5 ? '#4c1d95' : '#1e40af'
      });
    }

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      setJourneyProgress(progress);

      ctx.fillStyle = '#000011';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      
      // Speed calculation based on journey phases
      let speed;
      if (progress < 0.25) {
        // Slow start (0-5 seconds)
        speed = progress * 8;
      } else if (progress < 0.75) {
        // Fast travel (5-15 seconds)
        speed = 2 + (progress - 0.25) * 20;
      } else {
        // Slow down for landing (15-20 seconds)
        speed = 12 - (progress - 0.75) * 10;
      }

      // Draw nebula clouds first (background)
      nebulaClouds.forEach(cloud => {
        cloud.z -= speed * 0.3;
        if (cloud.z <= 0) {
          cloud.z = 3000;
          cloud.x = (Math.random() - 0.5) * 6000;
          cloud.y = (Math.random() - 0.5) * 6000;
        }

        const x = (cloud.x / cloud.z) * 1000 + centerX;
        const y = (cloud.y / cloud.z) * 1000 + centerY;
        const size = (300 - cloud.z * 0.1) / cloud.z * 1000;

        if (x > -size && x < canvas.width + size && y > -size && y < canvas.height + size && size > 0) {
          const gradient = ctx.createRadialGradient(x, y, 0, x, y, Math.max(size, 1));
          gradient.addColorStop(0, cloud.color + Math.floor(cloud.opacity * 255).toString(16).padStart(2, '0'));
          gradient.addColorStop(1, cloud.color + '00');
          
          ctx.fillStyle = gradient;
          ctx.beginPath();
          ctx.arc(x, y, Math.max(size, 1), 0, Math.PI * 2);
          ctx.fill();
        }
      });

      // Draw stars
      stars.forEach(star => {
        star.z -= speed;
        if (star.z <= 0) {
          star.z = 2000;
          star.x = (Math.random() - 0.5) * 4000;
          star.y = (Math.random() - 0.5) * 4000;
        }

        const x = (star.x / star.z) * 1000 + centerX;
        const y = (star.y / star.z) * 1000 + centerY;
        const size = (1 - star.z / 2000) * star.size;
        const opacity = 1 - star.z / 2000;

        if (x > 0 && x < canvas.width && y > 0 && y < canvas.height) {
          // Draw star
          ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
          ctx.beginPath();
          ctx.arc(x, y, Math.max(size, 0.5), 0, Math.PI * 2);
          ctx.fill();

          // Draw speed trail
          if (speed > 5) {
            const trailLength = speed * 3;
            const prevX = ((star.x + speed * 2) / (star.z + speed)) * 1000 + centerX;
            const prevY = ((star.y + speed * 2) / (star.z + speed)) * 1000 + centerY;
            
            ctx.strokeStyle = `rgba(255, 255, 255, ${opacity * 0.5})`;
            ctx.lineWidth = size * 0.5;
            ctx.beginPath();
            ctx.moveTo(prevX, prevY);
            ctx.lineTo(x, y);
            ctx.stroke();
          }
        }
      });

      // Draw particles
      particles.forEach(particle => {
        particle.z -= speed * particle.speed;
        if (particle.z <= 0) {
          particle.z = 1000;
          particle.x = (Math.random() - 0.5) * 2000;
          particle.y = (Math.random() - 0.5) * 2000;
        }

        const x = (particle.x / particle.z) * 1000 + centerX;
        const y = (particle.y / particle.z) * 1000 + centerY;
        const size = (1 - particle.z / 1000) * particle.size;
        const opacity = (1 - particle.z / 1000) * particle.opacity;

        if (x > 0 && x < canvas.width && y > 0 && y < canvas.height && size > 0) {
          ctx.fillStyle = `rgba(100, 200, 255, ${opacity})`;
          ctx.beginPath();
          ctx.arc(x, y, Math.max(size, 0.5), 0, Math.PI * 2);
          ctx.fill();
        }
      });

      // Destination planet effect (last 5 seconds)
      if (progress > 0.75) {
        const planetProgress = (progress - 0.75) * 4;
        const planetSize = planetProgress * 300;
        const planetOpacity = planetProgress * 0.8;
        
        // Planet glow
        const planetGradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, Math.max(planetSize + 100, 1));
        planetGradient.addColorStop(0, `rgba(147, 51, 234, ${planetOpacity})`);
        planetGradient.addColorStop(0.7, `rgba(59, 130, 246, ${planetOpacity * 0.5})`);
        planetGradient.addColorStop(1, 'rgba(59, 130, 246, 0)');
        
        ctx.fillStyle = planetGradient;
        ctx.beginPath();
        ctx.arc(centerX, centerY, Math.max(planetSize + 100, 1), 0, Math.PI * 2);
        ctx.fill();
      }

      // Screen shake effect during intense travel
      if (progress > 0.3 && progress < 0.7) {
        const shakeIntensity = Math.sin(elapsed * 0.01) * 3;
        canvas.style.transform = `translate(${shakeIntensity}px, ${shakeIntensity}px)`;
      } else {
        canvas.style.transform = 'translate(0, 0)';
      }

      if (progress < 1) {
        animationId = requestAnimationFrame(animate);
      } else {
        // Journey complete, transition to portfolio
        setTimeout(() => setPhase('portfolio'), 1000);
      }
    };

    animate();

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [phase]);

  // Regular portfolio canvas animation
  useEffect(() => {
    if (phase !== 'portfolio') return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const particles = [];
    const particleCount = 50;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 3 + 1,
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: (Math.random() - 0.5) * 0.5,
        opacity: Math.random() * 0.5 + 0.2
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(particle => {
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        
        if (particle.x < 0 || particle.x > canvas.width) particle.speedX *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.speedY *= -1;
        
        const dx = mouseRef.current.x - particle.x;
        const dy = mouseRef.current.y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 100) {
          particle.x -= dx * 0.01;
          particle.y -= dy * 0.01;
        }
        
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = isDarkMode ? `rgba(255, 255, 255, ${particle.opacity})` : `rgba(0, 0, 0, ${particle.opacity})`;
        ctx.fill();
        
        particles.forEach(otherParticle => {
          const dx = particle.x - otherParticle.x;
          const dy = particle.y - otherParticle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 100) {
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            ctx.strokeStyle = isDarkMode ? `rgba(255, 255, 255, ${0.1 * (100 - distance) / 100})` : `rgba(0, 0, 0, ${0.1 * (100 - distance) / 100})`;
            ctx.stroke();
          }
        });
      });
      
      requestAnimationFrame(animate);
    };
    
    animate();

    const handleMouseMove = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [phase, isDarkMode]);

  const [selectedPlanet, setSelectedPlanet] = useState(null);

  const planets = [
    {
      id: 'mobile',
      name: 'Mobile Apps',
      size: 120,
      color: 'from-blue-400 to-cyan-400',
      position: { x: 30, y: 40, orbit: 200 },
      projects: [
        {
          title: "Fitness Tracker App",
          year: "2024",
          description: "A comprehensive fitness tracking mobile application with workout plans and progress monitoring",
          image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=600&fit=crop",
          link: "#"
        },
        {
          title: "Food Delivery App",
          year: "2023",
          description: "User-friendly food ordering app with real-time tracking and custom recommendations",
          image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=800&h=600&fit=crop",
          link: "#"
        }
      ]
    },
    {
      id: 'web',
      name: 'Web Apps',
      size: 140,
      color: 'from-purple-400 to-pink-400',
      position: { x: 70, y: 20, orbit: 280 },
      projects: [
        {
          title: "E-Commerce Platform",
          year: "2024",
          description: "Modern e-commerce platform built with React and Node.js with advanced filtering and payment integration",
          image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop",
          link: "#"
        },
        {
          title: "Project Management Dashboard",
          year: "2024",
          description: "Comprehensive dashboard for team collaboration and project tracking with real-time updates",
          image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
          link: "#"
        },
        {
          title: "Analytics Platform",
          year: "2023",
          description: "Data visualization platform with interactive charts and customizable reporting features",
          image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
          link: "#"
        }
      ]
    },
    {
      id: 'ux',
      name: 'UX Research',
      size: 100,
      color: 'from-green-400 to-teal-400',
      position: { x: 80, y: 70, orbit: 320 },
      projects: [
        {
          title: "Banking App UX Study",
          year: "2024",
          description: "Comprehensive user research for mobile banking app redesign with usability testing and persona development",
          image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=600&fit=crop",
          link: "#"
        },
        {
          title: "E-learning Platform Research",
          year: "2023",
          description: "User behavior analysis and journey mapping for online education platform optimization",
          image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=600&fit=crop",
          link: "#"
        }
      ]
    },
    {
      id: 'ui',
      name: 'UI Designs',
      size: 110,
      color: 'from-orange-400 to-red-400',
      position: { x: 20, y: 80, orbit: 240 },
      projects: [
        {
          title: "Travel App Interface",
          year: "2024",
          description: "Beautiful and intuitive UI design for travel booking app with seamless user experience",
          image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&h=600&fit=crop",
          link: "#"
        },
        {
          title: "Cryptocurrency Dashboard",
          year: "2024",
          description: "Modern dashboard design for crypto trading platform with real-time data visualization",
          image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&h=600&fit=crop",
          link: "#"
        },
        {
          title: "Social Media App UI",
          year: "2023",
          description: "Clean and engaging user interface design for social networking mobile application",
          image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=600&fit=crop",
          link: "#"
        }
      ]
    },
    {
      id: 'integrations',
      name: 'Integrations',
      size: 90,
      color: 'from-indigo-400 to-purple-400',
      position: { x: 15, y: 25, orbit: 180 },
      projects: [
        {
          title: "Payment Gateway Integration",
          year: "2024",
          description: "Seamless integration of multiple payment providers with unified API and fraud detection",
          image: "https://images.unsplash.com/photo-1556742111-a301076d9d18?w=800&h=600&fit=crop",
          link: "#"
        },
        {
          title: "CRM System Integration",
          year: "2023",
          description: "Custom integration solution connecting multiple business systems for improved workflow",
          image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop",
          link: "#"
        }
      ]
    },
    {
      id: 'writeups',
      name: 'Writeups',
      size: 80,
      color: 'from-yellow-400 to-orange-400',
      position: { x: 60, y: 85, orbit: 160 },
      projects: [
        {
          title: "Design System Documentation",
          year: "2024",
          description: "Comprehensive guide and documentation for scalable design system implementation",
          image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&h=600&fit=crop",
          link: "#"
        },
        {
          title: "UX Research Case Study",
          year: "2024",
          description: "Detailed case study documenting user research process and insights for product optimization",
          image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=600&fit=crop",
          link: "#"
        },
        {
          title: "Technical Blog Series",
          year: "2023",
          description: "Educational blog posts covering modern web development practices and emerging technologies",
          image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&h=600&fit=crop",
          link: "#"
        }
      ]
    }
  ];

  const startJourney = () => {
    setPhase('journey');
  };

  // Welcome Screen
  if (phase === 'welcome') {
    return (
      <div className="fixed inset-0 bg-gradient-to-b from-indigo-950 via-purple-950 to-black overflow-hidden">
        <div className="relative z-10 h-full flex items-center justify-center px-6">
          <div className="text-center max-w-4xl mx-auto">
            <div className="mb-16 animate-fadeInUp">
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-light text-white mb-8 leading-tight">
                Enter a realm of
                <br />
                <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent font-bold animate-pulse">
                  Creativity...
                </span>
              </h1>
              
              <p className="text-xl md:text-2xl text-purple-200 opacity-80 mb-16 animate-fadeInUp" style={{ animationDelay: '1s' }}>
                Journey through the cosmos to discover a universe of design and code
              </p>
            </div>
            
            <div className="animate-fadeInUp" style={{ animationDelay: '2s' }}>
              <button
                onClick={startJourney}
                className="group relative px-12 py-6 bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 rounded-full text-white text-xl font-medium hover:shadow-2xl hover:scale-110 transition-all duration-500 overflow-hidden"
              >
                <span className="relative z-10 flex items-center">
                  Begin Journey
                  <div className="ml-3 w-6 h-6 border-2 border-white rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Journey Animation Screen
  if (phase === 'journey') {
    const getJourneyText = () => {
      if (journeyProgress < 0.2) return "Initiating launch sequence...";
      if (journeyProgress < 0.4) return "Entering deep space...";
      if (journeyProgress < 0.6) return "Traveling at warp speed...";
      if (journeyProgress < 0.8) return "Approaching destination...";
      return "Preparing for landing...";
    };

    return (
      <div className="fixed inset-0 bg-black overflow-hidden">
        <canvas
          ref={journeyCanvasRef}
          className="absolute inset-0 w-full h-full"
        />
        
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="text-center text-white">
            <div className="mb-8">
              <div className="w-32 h-32 mx-auto border-4 border-purple-500 rounded-full flex items-center justify-center relative">
                <div 
                  className="absolute inset-2 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full transition-all duration-300"
                  style={{ 
                    clipPath: `polygon(0 0, ${journeyProgress * 100}% 0, ${journeyProgress * 100}% 100%, 0 100%)` 
                  }}
                />
                <span className="relative z-10 text-2xl font-bold">
                  {Math.round(journeyProgress * 100)}%
                </span>
              </div>
            </div>
            
            <h2 className="text-2xl md:text-3xl font-light animate-pulse">
              {getJourneyText()}
            </h2>
          </div>
        </div>
      </div>
    );
  }

  // Main Portfolio (after journey)
  return (
    <div className={`min-h-screen transition-all duration-1000 ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
      {/* Canvas Background */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 z-0 pointer-events-none animate-fadeIn"
        style={{ filter: 'blur(0.5px)' }}
      />

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-40 p-6 animate-fadeInDown">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
              <Camera className="w-6 h-6 text-white" />
            </div>
            <div className="hidden md:block">
              <h5 className="font-light">
                <span className="opacity-60">yourname</span>
                <span className="mx-2 opacity-40">/</span>
                <span>your full name</span>
              </h5>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-2 rounded-full hover:bg-opacity-20 hover:bg-white transition-all"
            >
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-full hover:bg-opacity-20 hover:bg-white transition-all"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Menu Overlay */}
      <div className={`fixed inset-0 z-30 transition-all duration-500 ${isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
        <div className={`absolute inset-0 ${isDarkMode ? 'bg-gray-900' : 'bg-white'} bg-opacity-95 backdrop-blur-lg`}>
          <div className="h-full flex items-center justify-center">
            <nav className="text-center">
              <ul className="space-y-8">
                {['Home', 'Work', 'About', 'Contact'].map((item, index) => (
                  <li key={item} style={{ animationDelay: `${index * 0.1}s` }} 
                      className={`text-6xl md:text-8xl font-light hover:text-blue-500 transition-colors cursor-pointer ${isMenuOpen ? 'animate-fadeInUp' : ''}`}>
                    {item}
                  </li>
                ))}
              </ul>
              
              <div className="mt-16 flex justify-center space-x-8">
                <a href="#" className="flex items-center space-x-2 hover:text-blue-500 transition-colors">
                  <ExternalLink className="w-4 h-4" />
                  <span>Instagram</span>
                </a>
                <a href="#" className="flex items-center space-x-2 hover:text-blue-500 transition-colors">
                  <Github className="w-4 h-4" />
                  <span>GitHub</span>
                </a>
                <a href="#" className="flex items-center space-x-2 hover:text-blue-500 transition-colors">
                  <Linkedin className="w-4 h-4" />
                  <span>LinkedIn</span>
                </a>
              </div>
            </nav>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="relative z-10">
        {/* Hero Section */}
        <section className="min-h-screen flex items-center justify-center px-6">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-light leading-tight mb-8 animate-fadeInUp">
              Welcome to my <span className="font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">Universe</span>
              <br />
              <span className="opacity-80">I'm your creative</span> <span className="font-bold">Navigator</span>
            </h1>
            
            <p className="text-xl md:text-2xl font-light opacity-80 mb-12 animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
              You've successfully traveled through the cosmos
              <br />
              Now explore the worlds I've created
            </p>
            
            <div className="animate-fadeInUp" style={{ animationDelay: '0.4s' }}>
              <button className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full text-white font-medium hover:shadow-lg hover:scale-105 transition-all">
                Explore My Worlds
              </button>
            </div>
          </div>
        </section>

        {/* Solar System Projects Section */}
        <section className="py-20 px-6 min-h-screen flex items-center">
          <div className="max-w-7xl mx-auto w-full">
            <h2 className="text-4xl md:text-5xl font-light mb-16 text-center">
              Explore My <span className="font-bold">Universe</span>
            </h2>
            
            <div className="relative w-full h-screen max-h-[800px]">
              {/* Central Sun */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 rounded-full shadow-2xl flex items-center justify-center">
                <div className="w-24 h-24 bg-gradient-to-r from-yellow-300 to-orange-300 rounded-full animate-pulse">
                  <div className="w-full h-full rounded-full bg-gradient-to-r from-transparent via-white to-transparent opacity-30 animate-spin" style={{ animationDuration: '8s' }}></div>
                </div>
              </div>

              {/* Planets */}
              {planets.map((planet, index) => (
                <div
                  key={planet.id}
                  className="absolute animate-orbit cursor-pointer group"
                  style={{
                    left: `${planet.position.x}%`,
                    top: `${planet.position.y}%`,
                    animationDuration: `${20 + index * 10}s`,
                    animationDelay: `${index * -3}s`,
                    transformOrigin: `${50 - planet.position.x}vw ${50 - planet.position.y}vh`
                  }}
                  onClick={() => setSelectedPlanet(planet)}
                >
                  {/* Planet with 3D effect */}
                  <div
                    className={`relative bg-gradient-to-br ${planet.color} rounded-full shadow-2xl group-hover:scale-110 transition-all duration-300 group-hover:shadow-3xl`}
                    style={{ 
                      width: `${planet.size}px`, 
                      height: `${planet.size}px`,
                      boxShadow: 'inset -20px -20px 50px rgba(0,0,0,0.3), 0 0 50px rgba(255,255,255,0.1)'
                    }}
                  >
                    {/* Planet surface details */}
                    <div className="absolute inset-0 rounded-full opacity-30">
                      <div className="absolute top-2 left-4 w-8 h-8 bg-white bg-opacity-20 rounded-full"></div>
                      <div className="absolute bottom-6 right-2 w-4 h-4 bg-black bg-opacity-20 rounded-full"></div>
                      <div className="absolute top-1/2 left-1/4 w-6 h-6 bg-white bg-opacity-10 rounded-full"></div>
                    </div>
                    
                    {/* Glow effect */}
                    <div 
                      className={`absolute inset-0 rounded-full bg-gradient-to-br ${planet.color} opacity-0 group-hover:opacity-50 transition-opacity duration-300 blur-sm scale-150`}
                    ></div>

                    {/* Planet rings (for some planets) */}
                    {(planet.id === 'web' || planet.id === 'integrations') && (
                      <div className="absolute inset-0 rounded-full border-2 border-white border-opacity-30 scale-150 animate-spin" style={{ animationDuration: '15s' }}></div>
                    )}
                  </div>

                  {/* Planet label */}
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-4 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <p className="text-sm font-medium whitespace-nowrap bg-black bg-opacity-50 px-3 py-1 rounded-full backdrop-blur-sm">
                      {planet.name}
                    </p>
                    <p className="text-xs opacity-60 mt-1">
                      {planet.projects.length} project{planet.projects.length !== 1 ? 's' : ''}
                    </p>
                  </div>

                  {/* Orbit path hint */}
                  <div 
                    className="absolute border border-white border-opacity-10 rounded-full pointer-events-none opacity-0 group-hover:opacity-30 transition-opacity duration-300"
                    style={{
                      width: `${planet.orbit * 2}px`,
                      height: `${planet.orbit * 2}px`,
                      left: `${-planet.orbit + planet.size/2}px`,
                      top: `${-planet.orbit + planet.size/2}px`,
                    }}
                  ></div>
                </div>
              ))}

              {/* Instructions */}
              <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center opacity-60">
                <p className="text-lg">Click on any planet to explore its projects</p>
                <div className="flex items-center justify-center mt-2 space-x-2">
                  <div className="w-2 h-2 bg-white rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-20 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-light mb-8">
              Ready for another <span className="font-bold">Journey?</span>
            </h2>
            
            <p className="text-xl opacity-80 mb-12">
              Let's travel together through the universe of possibilities
            </p>
            
            <div className="flex flex-wrap justify-center gap-6">
              <a 
                href="mailto:your@email.com"
                className="flex items-center space-x-3 px-6 py-3 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors"
              >
                <Mail className="w-5 h-5" />
                <span>Start Mission</span>
              </a>
              
              <a 
                href="#"
                className="flex items-center space-x-3 px-6 py-3 border border-current rounded-full hover:bg-current hover:text-white transition-colors"
              >
                <Github className="w-5 h-5" />
                <span>Code Galaxy</span>
              </a>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-8 px-6 text-center opacity-60">
          <p>Designed and coded in a distant galaxy © 2024</p>
        </footer>
      </main>

      {/* Planet Project Gallery Modal */}
      {selectedPlanet && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-90 backdrop-blur-lg flex items-center justify-center p-6">
          <div className="w-full max-w-7xl h-full max-h-screen overflow-y-auto">
            {/* Header */}
            <div className="flex items-center justify-between mb-8 sticky top-0 bg-black bg-opacity-50 backdrop-blur-sm p-4 rounded-lg">
              <div className="flex items-center space-x-4">
                <div 
                  className={`w-16 h-16 bg-gradient-to-br ${selectedPlanet.color} rounded-full shadow-lg`}
                  style={{ 
                    boxShadow: 'inset -8px -8px 20px rgba(0,0,0,0.3), 0 0 20px rgba(255,255,255,0.1)'
                  }}
                ></div>
                <div>
                  <h2 className="text-4xl font-light text-white">{selectedPlanet.name}</h2>
                  <p className="text-lg text-gray-300">{selectedPlanet.projects.length} Projects in this Universe</p>
                </div>
              </div>
              
              <button
                onClick={() => setSelectedPlanet(null)}
                className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center hover:bg-opacity-30 transition-all"
              >
                <X className="w-6 h-6 text-white" />
              </button>
            </div>

            {/* Projects Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {selectedPlanet.projects.map((project, index) => (
                <div key={index} className="group bg-white bg-opacity-5 backdrop-blur-sm rounded-2xl overflow-hidden hover:bg-opacity-10 transition-all duration-300">
                  <div className="relative overflow-hidden">
                    <img 
                      src={project.image} 
                      alt={project.title}
                      className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60"></div>
                    
                    {/* Project year badge */}
                    <div className="absolute top-4 right-4 bg-black bg-opacity-50 backdrop-blur-sm px-3 py-1 rounded-full text-sm text-white">
                      {project.year}
                    </div>
                  </div>
                  
                  <div className="p-6 space-y-4">
                    <h3 className="text-2xl font-light text-white group-hover:text-blue-300 transition-colors">
                      {project.title}
                    </h3>
                    
                    <p className="text-gray-300 leading-relaxed">
                      {project.description}
                    </p>
                    
                    <div className="flex items-center justify-between pt-4">
                      <a 
                        href={project.link}
                        className="inline-flex items-center space-x-2 text-blue-400 hover:text-blue-300 transition-colors group"
                      >
                        <span>View Project</span>
                        <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </a>
                      
                      <div className={`w-8 h-8 bg-gradient-to-br ${selectedPlanet.color} rounded-full opacity-60`}></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Back to Solar System */}
            <div className="text-center mt-12">
              <button
                onClick={() => setSelectedPlanet(null)}
                className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full text-white font-medium hover:shadow-lg hover:scale-105 transition-all"
              >
                ← Back to Solar System
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Portfolio;
