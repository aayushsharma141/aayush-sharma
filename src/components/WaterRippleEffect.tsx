import { useEffect, useRef, useState } from "react";

interface Ripple {
  x: number;
  y: number;
  size: number;
  opacity: number;
  id: number;
  isClick?: boolean;
}

const WaterRippleEffect = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const rippleId = useRef(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      setMousePos({ x, y });

      // Create new ripple on hover
      rippleId.current += 1;
      const newRipple: Ripple = {
        x,
        y,
        size: 0,
        opacity: 0.6,
        id: rippleId.current,
      };

      setRipples((prev) => [...prev.slice(-15), newRipple]);
    };

    const handleClick = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Create larger click ripple
      rippleId.current += 1;
      const clickRipple: Ripple = {
        x,
        y,
        size: 0,
        opacity: 1,
        id: rippleId.current,
        isClick: true,
      };

      setRipples((prev) => [...prev, clickRipple]);
    };

    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => setIsHovering(false);

    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("click", handleClick);
    container.addEventListener("mouseenter", handleMouseEnter);
    container.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("click", handleClick);
      container.removeEventListener("mouseenter", handleMouseEnter);
      container.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  // Animate ripples
  useEffect(() => {
    const interval = setInterval(() => {
      setRipples((prev) =>
        prev
          .map((ripple) => ({
            ...ripple,
            size: ripple.size + (ripple.isClick ? 15 : 8),
            opacity: ripple.opacity - (ripple.isClick ? 0.015 : 0.02),
          }))
          .filter((ripple) => ripple.opacity > 0)
      );
    }, 30);

    return () => clearInterval(interval);
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 z-[5] overflow-hidden pointer-events-auto">
      {/* Ripples */}
      {ripples.map((ripple) => (
        <div
          key={ripple.id}
          className={`absolute rounded-full pointer-events-none ${
            ripple.isClick 
              ? "border-2 border-primary/60" 
              : "border border-primary/40"
          }`}
          style={{
            left: ripple.x - ripple.size / 2,
            top: ripple.y - ripple.size / 2,
            width: ripple.size,
            height: ripple.size,
            opacity: ripple.opacity,
            boxShadow: ripple.isClick
              ? `0 0 ${ripple.size / 3}px hsl(var(--primary) / 0.4), inset 0 0 ${ripple.size / 4}px hsl(var(--primary) / 0.2)`
              : `0 0 ${ripple.size / 4}px hsl(var(--primary) / 0.2), inset 0 0 ${ripple.size / 6}px hsl(var(--primary) / 0.1)`,
            transition: "none",
          }}
        />
      ))}

      {/* Mouse Glow */}
      {isHovering && (
        <div
          className="absolute pointer-events-none transition-opacity duration-300"
          style={{
            left: mousePos.x - 150,
            top: mousePos.y - 150,
            width: 300,
            height: 300,
            background: `radial-gradient(circle, hsl(var(--primary) / 0.15) 0%, transparent 70%)`,
            opacity: 1,
          }}
        />
      )}

      {/* Cursor Trail Particles */}
      {isHovering && (
        <div
          className="absolute w-4 h-4 rounded-full bg-primary/50 pointer-events-none blur-sm"
          style={{
            left: mousePos.x - 8,
            top: mousePos.y - 8,
            boxShadow: "0 0 20px hsl(var(--primary) / 0.5), 0 0 40px hsl(var(--primary) / 0.3)",
          }}
        />
      )}
    </div>
  );
};

export default WaterRippleEffect;
