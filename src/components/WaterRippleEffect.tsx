import { useEffect, useRef, useState, useCallback } from "react";

interface Ripple {
  x: number;
  y: number;
  size: number;
  opacity: number;
  id: number;
  timestamp: number;
}

interface WaterRippleEffectProps {
  className?: string;
}

const WaterRippleEffect = ({ className = "" }: WaterRippleEffectProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const [isMobile, setIsMobile] = useState(false);
  const rippleId = useRef(0);
  const animationFrame = useRef<number>();

  // Detect mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || 'ontouchstart' in window);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const createRipple = useCallback((x: number, y: number) => {
    rippleId.current += 1;
    
    const newRipple: Ripple = {
      x,
      y,
      size: 10,
      opacity: 0.6,
      id: rippleId.current,
      timestamp: Date.now(),
    };

    setRipples((prev) => [...prev.slice(-8), newRipple]);
  }, []);

  useEffect(() => {
    // On mobile, use simplified CSS-only effects
    if (isMobile) return;

    const heroSection = document.getElementById("home");
    if (!heroSection) return;

    const getPositionInHero = (clientX: number, clientY: number) => {
      const rect = heroSection.getBoundingClientRect();
      return {
        x: clientX - rect.left,
        y: clientY - rect.top,
        isInBounds: clientX >= rect.left && clientX <= rect.right && 
                    clientY >= rect.top && clientY <= rect.bottom,
      };
    };

    let lastRippleTime = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const now = Date.now();
      if (now - lastRippleTime < 100) return; // Throttle to 10fps
      lastRippleTime = now;

      const { x, y, isInBounds } = getPositionInHero(e.clientX, e.clientY);
      if (isInBounds) {
        createRipple(x, y);
      }
    };

    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('button, a, input, [role="button"]')) return;
      
      const { x, y, isInBounds } = getPositionInHero(e.clientX, e.clientY);
      if (isInBounds) {
        // Create single click ripple
        createRipple(x, y);
      }
    };

    document.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("click", handleClick);
    };
  }, [createRipple, isMobile]);

  // Animate ripples with CSS instead of JS for performance
  useEffect(() => {
    if (isMobile) return;

    const animate = () => {
      setRipples((prev) =>
        prev
          .map((ripple) => ({
            ...ripple,
            size: ripple.size + 8,
            opacity: ripple.opacity - 0.015,
          }))
          .filter((ripple) => ripple.opacity > 0)
      );

      animationFrame.current = requestAnimationFrame(animate);
    };

    animationFrame.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrame.current) {
        cancelAnimationFrame(animationFrame.current);
      }
    };
  }, [isMobile]);

  // Mobile: Return simple CSS-based touch glow only
  if (isMobile) {
    return (
      <div 
        ref={containerRef} 
        className={`absolute inset-0 z-[2] overflow-hidden pointer-events-none ${className}`}
      >
        <div className="absolute inset-0 bg-gradient-radial from-primary/5 via-transparent to-transparent opacity-50" />
      </div>
    );
  }

  return (
    <div 
      ref={containerRef} 
      className={`absolute inset-0 z-[2] overflow-hidden pointer-events-none ${className}`}
    >
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
            border: "1px solid hsl(var(--primary) / 0.4)",
            boxShadow: `0 0 ${ripple.size / 4}px hsl(var(--primary) / 0.2)`,
            transform: 'translateZ(0)',
          }}
        />
      ))}
    </div>
  );
};

export default WaterRippleEffect;
