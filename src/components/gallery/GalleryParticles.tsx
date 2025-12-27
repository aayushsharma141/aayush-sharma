import { motion } from "framer-motion";
import { useMemo } from "react";

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  type: 'circle' | 'triangle' | 'line' | 'dot';
}

const GalleryParticles = () => {
  const particles = useMemo(() => {
    const items: Particle[] = [];
    const types: Particle['type'][] = ['circle', 'triangle', 'line', 'dot'];
    
    for (let i = 0; i < 25; i++) {
      items.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 20 + 10,
        duration: Math.random() * 20 + 15,
        delay: Math.random() * 5,
        type: types[Math.floor(Math.random() * types.length)]
      });
    }
    return items;
  }, []);

  const renderParticle = (particle: Particle) => {
    const baseStyle = {
      left: `${particle.x}%`,
      top: `${particle.y}%`,
      width: particle.size,
      height: particle.size
    };

    switch (particle.type) {
      case 'circle':
        return (
          <motion.div
            key={particle.id}
            className="absolute rounded-full border border-primary/20"
            style={baseStyle}
            animate={{
              y: [0, -50, 0],
              x: [0, 20, 0],
              opacity: [0.1, 0.3, 0.1],
              scale: [1, 1.2, 1]
            }}
            transition={{
              duration: particle.duration,
              delay: particle.delay,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        );
      case 'triangle':
        return (
          <motion.div
            key={particle.id}
            className="absolute border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-b-[15px] border-b-secondary/15"
            style={{ left: `${particle.x}%`, top: `${particle.y}%` }}
            animate={{
              y: [0, -40, 0],
              rotate: [0, 180, 360],
              opacity: [0.1, 0.25, 0.1]
            }}
            transition={{
              duration: particle.duration,
              delay: particle.delay,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        );
      case 'line':
        return (
          <motion.div
            key={particle.id}
            className="absolute h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: particle.size * 3
            }}
            animate={{
              opacity: [0, 0.4, 0],
              scaleX: [0.5, 1, 0.5]
            }}
            transition={{
              duration: particle.duration / 2,
              delay: particle.delay,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        );
      case 'dot':
        return (
          <motion.div
            key={particle.id}
            className="absolute rounded-full bg-primary/30"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: particle.size / 3,
              height: particle.size / 3
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.5, 0.2]
            }}
            transition={{
              duration: particle.duration,
              delay: particle.delay,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Gradient orbs */}
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full opacity-10 blur-[100px]"
        style={{
          background: 'radial-gradient(circle, hsl(var(--primary)) 0%, transparent 70%)',
          left: '20%',
          top: '30%'
        }}
        animate={{
          x: [0, 100, 0],
          y: [0, -50, 0]
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute w-[400px] h-[400px] rounded-full opacity-10 blur-[80px]"
        style={{
          background: 'radial-gradient(circle, hsl(var(--secondary)) 0%, transparent 70%)',
          right: '10%',
          bottom: '20%'
        }}
        animate={{
          x: [0, -80, 0],
          y: [0, 60, 0]
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Particles */}
      {particles.map(renderParticle)}

      {/* Noise grain overlay */}
      <div 
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat'
        }}
      />
    </div>
  );
};

export default GalleryParticles;
