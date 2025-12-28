import { useEffect, useRef, useState, useCallback } from "react";

interface Ripple {
  x: number;
  y: number;
  size: number;
  opacity: number;
  id: number;
  isClick?: boolean;
  timestamp: number;
}

interface WaterRippleEffectProps {
  className?: string;
}

const WaterRippleEffect = ({ className = "" }: WaterRippleEffectProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const rippleId = useRef(0);
  const lastRippleTime = useRef(0);
  const animationFrame = useRef<number>();

  const createRipple = useCallback((x: number, y: number, isClick: boolean = false) => {
    const now = Date.now();
    // Throttle hover ripples to every 50ms for consistency
    if (!isClick && now - lastRippleTime.current < 50) return;
    lastRippleTime.current = now;

    rippleId.current += 1;
    const newRipple: Ripple = {
      x,
      y,
      size: isClick ? 20 : 0,
      opacity: isClick ? 0.8 : 0.5,
      id: rippleId.current,
      isClick,
      timestamp: now,
    };

    setRipples((prev) => [...prev.slice(isClick ? -20 : -12), newRipple]);
  }, []);

  useEffect(() => {
    const heroSection = document.getElementById("home");
    if (!heroSection) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = heroSection.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      // Only create ripples if within bounds
      if (x >= 0 && x <= rect.width && y >= 0 && y <= rect.height) {
        setMousePos({ x, y });
        setIsHovering(true);
        createRipple(x, y, false);
      }
    };

    const handleClick = (e: MouseEvent) => {
      const rect = heroSection.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Only create click ripples if within bounds
      if (x >= 0 && x <= rect.width && y >= 0 && y <= rect.height) {
        // Create multiple ripples for a more dramatic click effect
        createRipple(x, y, true);
        setTimeout(() => createRipple(x, y, true), 100);
        setTimeout(() => createRipple(x, y, true), 200);
      }
    };

    const handleMouseLeave = () => {
      setIsHovering(false);
    };

    // Listen on document for consistent tracking
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("click", handleClick);
    heroSection.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("click", handleClick);
      heroSection.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [createRipple]);

  // Smooth animation using requestAnimationFrame
  useEffect(() => {
    let lastTime = performance.now();

    const animate = (currentTime: number) => {
      const deltaTime = currentTime - lastTime;
      
      if (deltaTime >= 16) { // ~60fps
        lastTime = currentTime;
        
        setRipples((prev) =>
          prev
            .map((ripple) => {
              const growthRate = ripple.isClick ? 12 : 6;
              const fadeRate = ripple.isClick ? 0.012 : 0.018;
              return {
                ...ripple,
                size: ripple.size + growthRate,
                opacity: ripple.opacity - fadeRate,
              };
            })
            .filter((ripple) => ripple.opacity > 0)
        );
      }

      animationFrame.current = requestAnimationFrame(animate);
    };

    animationFrame.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrame.current) {
        cancelAnimationFrame(animationFrame.current);
      }
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className={`absolute inset-0 z-[2] overflow-hidden pointer-events-none ${className}`}
    >
      {/* Ripples */}
      {ripples.map((ripple) => (
        <div
          key={ripple.id}
          className="absolute rounded-full pointer-events-none"
          style={{
            left: ripple.x - ripple.size / 2,
            top: ripple.y - ripple.size / 2,
            width: ripple.size,
            height: ripple.size,
            opacity: ripple.opacity,
            border: ripple.isClick 
              ? "2px solid hsl(var(--primary) / 0.7)" 
              : "1px solid hsl(var(--primary) / 0.4)",
            boxShadow: ripple.isClick
              ? `0 0 ${ripple.size / 2}px hsl(var(--primary) / 0.5), 
                 inset 0 0 ${ripple.size / 3}px hsl(var(--primary) / 0.2),
                 0 0 ${ripple.size}px hsl(var(--primary) / 0.15)`
              : `0 0 ${ripple.size / 3}px hsl(var(--primary) / 0.25), 
                 inset 0 0 ${ripple.size / 5}px hsl(var(--primary) / 0.1)`,
            background: ripple.isClick 
              ? `radial-gradient(circle, hsl(var(--primary) / 0.1) 0%, transparent 60%)`
              : 'transparent',
            willChange: 'transform, opacity',
          }}
        />
      ))}

      {/* Mouse Glow - Smooth follow */}
      <div
        className="absolute pointer-events-none transition-all duration-150 ease-out"
        style={{
          left: mousePos.x - 120,
          top: mousePos.y - 120,
          width: 240,
          height: 240,
          background: `radial-gradient(circle, hsl(var(--primary) / 0.12) 0%, hsl(var(--primary) / 0.05) 40%, transparent 70%)`,
          opacity: isHovering ? 1 : 0,
          willChange: 'transform, opacity',
        }}
      />

      {/* Cursor Core Glow */}
      <div
        className="absolute pointer-events-none transition-all duration-100 ease-out"
        style={{
          left: mousePos.x - 20,
          top: mousePos.y - 20,
          width: 40,
          height: 40,
          borderRadius: '50%',
          background: `radial-gradient(circle, hsl(var(--primary) / 0.4) 0%, hsl(var(--primary) / 0.15) 50%, transparent 70%)`,
          boxShadow: "0 0 30px hsl(var(--primary) / 0.4), 0 0 60px hsl(var(--primary) / 0.2)",
          opacity: isHovering ? 1 : 0,
          willChange: 'transform, opacity',
        }}
      />
    </div>
  );
};

export default WaterRippleEffect;
