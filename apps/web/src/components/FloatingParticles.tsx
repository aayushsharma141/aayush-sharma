import React, { useEffect, useMemo, useState, useRef } from "react";

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  speed: number;
  type: "circle" | "diamond" | "ring";
}

export const FloatingParticles: React.FC<{ count?: number; className?: string }> = React.memo(({ count = 25, className = "" }) => {
  const [scrollY, setScrollY] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const particles = useMemo<Particle[]>(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.round(Math.random() * 24 + 6),
      speed: Number((Math.random() * 0.5 + 0.1).toFixed(3)),
      type: ["circle", "diamond", "ring"][Math.floor(Math.random() * 3)] as Particle["type"],
    }));
  }, [count]);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div 
      ref={containerRef}
      className={`fixed inset-0 overflow-hidden pointer-events-none z-0 ${className}`} 
      aria-hidden
    >
      {particles.map((p) => {
        const parallaxOffset = scrollY * p.speed;
        const yPos = ((p.y * 10 + parallaxOffset) % 1200) - 100;
        
        return (
          <div
            key={p.id}
            className={`absolute transform-gpu will-change-transform ${
              p.type === "circle" 
                ? "rounded-full bg-primary/20" 
                : p.type === "diamond" 
                  ? "bg-primary/15 rotate-45" 
                  : "rounded-full border-2 border-primary/20"
            }`}
            style={{
              left: `${p.x}%`,
              top: `${yPos}px`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              opacity: 0.15 + (p.speed * 0.2),
              transition: "top 0.1s linear",
            }}
          />
        );
      })}
    </div>
  );
});

FloatingParticles.displayName = "FloatingParticles";

export default FloatingParticles;
