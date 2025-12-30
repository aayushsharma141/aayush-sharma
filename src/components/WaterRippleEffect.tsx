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
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
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

  // Simple single ripple for mobile touch
  const createRipple = useCallback((x: number, y: number) => {
    rippleId.current += 1;
    const newRipple: Ripple = {
      x,
      y,
      size: 20,
      opacity: 0.6,
      id: rippleId.current,
      timestamp: Date.now(),
    };
    setRipples(prev => [...prev.slice(-6), newRipple]);
  }, []);

  useEffect(() => {
    // Skip complex effects on mobile
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

    const handleMouseMove = (e: MouseEvent) => {
      const { x, y, isInBounds } = getPositionInHero(e.clientX, e.clientY);
      if (isInBounds) {
        setMousePos({ x, y });
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    const handleMouseLeave = () => setIsHovering(false);

    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('button, a, input, [role="button"]')) return;
      
      const { x, y, isInBounds } = getPositionInHero(e.clientX, e.clientY);
      if (isInBounds) {
        createRipple(x, y);
      }
    };

    document.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("click", handleClick);
    heroSection.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("click", handleClick);
      heroSection.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [isMobile, createRipple]);

  // Mobile touch handler - simple single ripple
  useEffect(() => {
    if (!isMobile) return;

    const heroSection = document.getElementById("home");
    if (!heroSection) return;

    const handleTouch = (e: TouchEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('button, a, input, [role="button"]')) return;

      const touch = e.touches[0];
      const rect = heroSection.getBoundingClientRect();
      const x = touch.clientX - rect.left;
      const y = touch.clientY - rect.top;
      
      if (touch.clientX >= rect.left && touch.clientX <= rect.right && 
          touch.clientY >= rect.top && touch.clientY <= rect.bottom) {
        createRipple(x, y);
      }
    };

    heroSection.addEventListener("touchstart", handleTouch, { passive: true });
    return () => heroSection.removeEventListener("touchstart", handleTouch);
  }, [isMobile, createRipple]);

  // Animate ripples - simpler animation loop
  useEffect(() => {
    const animate = () => {
      setRipples(prev =>
        prev
          .map(ripple => ({
            ...ripple,
            size: ripple.size + 8,
            opacity: ripple.opacity - 0.02,
          }))
          .filter(ripple => ripple.opacity > 0)
      );
      animationFrame.current = requestAnimationFrame(animate);
    };

    animationFrame.current = requestAnimationFrame(animate);
    return () => {
      if (animationFrame.current) cancelAnimationFrame(animationFrame.current);
    };
  }, []);

  // Mobile: minimal CSS-only glow, no JS animations
  if (isMobile) {
    return (
      <div 
        ref={containerRef} 
        className={`absolute inset-0 z-[2] overflow-hidden pointer-events-none ${className}`}
      >
        {ripples.map(ripple => (
          <div
            key={ripple.id}
            className="absolute rounded-full pointer-events-none"
            style={{
              left: ripple.x - ripple.size / 2,
              top: ripple.y - ripple.size / 2,
              width: ripple.size,
              height: ripple.size,
              opacity: ripple.opacity,
              border: "2px solid hsl(var(--primary) / 0.5)",
              background: "radial-gradient(circle, hsl(var(--primary) / 0.15) 0%, transparent 70%)",
            }}
          />
        ))}
      </div>
    );
  }

  // Desktop: full experience with glow
  return (
    <div 
      ref={containerRef} 
      className={`absolute inset-0 z-[2] overflow-hidden pointer-events-none ${className}`}
    >
      {/* Ripples */}
      {ripples.map(ripple => (
        <div
          key={ripple.id}
          className="absolute rounded-full pointer-events-none"
          style={{
            left: ripple.x - ripple.size / 2,
            top: ripple.y - ripple.size / 2,
            width: ripple.size,
            height: ripple.size,
            opacity: ripple.opacity,
            border: "2px solid hsl(var(--primary) / 0.6)",
            boxShadow: `0 0 ${ripple.size / 2}px hsl(var(--primary) / 0.4)`,
            background: "radial-gradient(circle, hsl(var(--primary) / 0.1) 0%, transparent 60%)",
          }}
        />
      ))}

      {/* Mouse Glow */}
      <div
        className="absolute pointer-events-none rounded-full transition-opacity duration-200"
        style={{
          left: mousePos.x - 100,
          top: mousePos.y - 100,
          width: 200,
          height: 200,
          background: `radial-gradient(circle, hsl(var(--primary) / 0.1) 0%, transparent 70%)`,
          opacity: isHovering ? 1 : 0,
        }}
      />
      <div
        className="absolute pointer-events-none rounded-full transition-opacity duration-150"
        style={{
          left: mousePos.x - 15,
          top: mousePos.y - 15,
          width: 30,
          height: 30,
          background: `radial-gradient(circle, hsl(var(--primary) / 0.3) 0%, transparent 70%)`,
          boxShadow: "0 0 20px hsl(var(--primary) / 0.3)",
          opacity: isHovering ? 1 : 0,
        }}
      />
    </div>
  );
};

export default WaterRippleEffect;
