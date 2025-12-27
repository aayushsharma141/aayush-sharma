import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Ripple {
  x: number;
  y: number;
  size: number;
  opacity: number;
  id: number;
}

interface ClickRipple {
  x: number;
  y: number;
  id: number;
}

const WaterRippleEffect = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const [clickRipples, setClickRipples] = useState<ClickRipple[]>([]);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [trail, setTrail] = useState<{ x: number; y: number; id: number }[]>([]);
  const rippleId = useRef(0);
  const trailId = useRef(0);
  const lastRippleTime = useRef(0);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    const container = containerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePos({ x, y });

    // Throttle ripple creation
    const now = Date.now();
    if (now - lastRippleTime.current > 50) {
      lastRippleTime.current = now;
      
      rippleId.current += 1;
      const newRipple: Ripple = {
        x,
        y,
        size: 0,
        opacity: 0.5,
        id: rippleId.current,
      };
      setRipples((prev) => [...prev.slice(-20), newRipple]);

      // Add trail particle
      trailId.current += 1;
      setTrail((prev) => [...prev.slice(-8), { x, y, id: trailId.current }]);
    }
  }, []);

  const handleClick = useCallback((e: MouseEvent) => {
    const container = containerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    rippleId.current += 1;
    setClickRipples((prev) => [...prev.slice(-5), { x, y, id: rippleId.current }]);

    // Create burst of ripples on click
    for (let i = 0; i < 3; i++) {
      setTimeout(() => {
        rippleId.current += 1;
        const newRipple: Ripple = {
          x: x + (Math.random() - 0.5) * 50,
          y: y + (Math.random() - 0.5) * 50,
          size: 0,
          opacity: 0.7 - i * 0.15,
          id: rippleId.current,
        };
        setRipples((prev) => [...prev.slice(-25), newRipple]);
      }, i * 100);
    }
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => {
      setIsHovering(false);
      setTrail([]);
    };

    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseenter", handleMouseEnter);
    container.addEventListener("mouseleave", handleMouseLeave);
    container.addEventListener("click", handleClick);

    return () => {
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseenter", handleMouseEnter);
      container.removeEventListener("mouseleave", handleMouseLeave);
      container.removeEventListener("click", handleClick);
    };
  }, [handleMouseMove, handleClick]);

  // Animate ripples
  useEffect(() => {
    const interval = setInterval(() => {
      setRipples((prev) =>
        prev
          .map((ripple) => ({
            ...ripple,
            size: ripple.size + 10,
            opacity: ripple.opacity - 0.015,
          }))
          .filter((ripple) => ripple.opacity > 0)
      );
    }, 25);

    return () => clearInterval(interval);
  }, []);

  // Cleanup trail particles
  useEffect(() => {
    const interval = setInterval(() => {
      setTrail((prev) => prev.slice(-6));
    }, 100);
    return () => clearInterval(interval);
  }, []);

  // Remove click ripples after animation
  useEffect(() => {
    if (clickRipples.length > 0) {
      const timeout = setTimeout(() => {
        setClickRipples((prev) => prev.slice(1));
      }, 1000);
      return () => clearTimeout(timeout);
    }
  }, [clickRipples]);

  return (
    <div ref={containerRef} className="absolute inset-0 z-[5] overflow-hidden pointer-events-auto">
      {/* Movement Ripples */}
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
            boxShadow: `
              0 0 ${ripple.size / 3}px hsl(var(--primary) / 0.15),
              inset 0 0 ${ripple.size / 4}px hsl(var(--primary) / 0.08)
            `,
          }}
        />
      ))}

      {/* Click Ripples with Explosion Effect */}
      <AnimatePresence>
        {clickRipples.map((ripple) => (
          <motion.div
            key={ripple.id}
            className="absolute rounded-full pointer-events-none"
            initial={{ width: 0, height: 0, opacity: 0.8 }}
            animate={{ width: 400, height: 400, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            style={{
              left: ripple.x,
              top: ripple.y,
              x: "-50%",
              y: "-50%",
              border: "2px solid hsl(var(--primary) / 0.6)",
              boxShadow: "0 0 30px hsl(var(--primary) / 0.3)",
            }}
          />
        ))}
      </AnimatePresence>

      {/* Secondary Click Ripple */}
      <AnimatePresence>
        {clickRipples.map((ripple) => (
          <motion.div
            key={`${ripple.id}-inner`}
            className="absolute rounded-full pointer-events-none bg-primary/10"
            initial={{ width: 0, height: 0, opacity: 0.6 }}
            animate={{ width: 200, height: 200, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            style={{
              left: ripple.x,
              top: ripple.y,
              x: "-50%",
              y: "-50%",
            }}
          />
        ))}
      </AnimatePresence>

      {/* Mouse Trail */}
      {trail.map((point, index) => (
        <motion.div
          key={point.id}
          className="absolute rounded-full pointer-events-none bg-primary/40"
          initial={{ scale: 1, opacity: 0.6 }}
          animate={{ scale: 0.3, opacity: 0 }}
          transition={{ duration: 0.5 }}
          style={{
            left: point.x - 4,
            top: point.y - 4,
            width: 8 - index * 0.5,
            height: 8 - index * 0.5,
          }}
        />
      ))}

      {/* Main Mouse Glow */}
      {isHovering && (
        <motion.div
          className="absolute pointer-events-none"
          animate={{
            left: mousePos.x - 200,
            top: mousePos.y - 200,
          }}
          transition={{ type: "spring", stiffness: 150, damping: 15 }}
          style={{
            width: 400,
            height: 400,
            background: `radial-gradient(circle, hsl(var(--primary) / 0.2) 0%, hsl(var(--primary) / 0.05) 40%, transparent 70%)`,
          }}
        />
      )}

      {/* Inner Glow */}
      {isHovering && (
        <motion.div
          className="absolute pointer-events-none"
          animate={{
            left: mousePos.x - 75,
            top: mousePos.y - 75,
          }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          style={{
            width: 150,
            height: 150,
            background: `radial-gradient(circle, hsl(var(--primary) / 0.25) 0%, transparent 70%)`,
          }}
        />
      )}

      {/* Cursor Core */}
      {isHovering && (
        <motion.div
          className="absolute rounded-full pointer-events-none"
          animate={{
            left: mousePos.x - 10,
            top: mousePos.y - 10,
            scale: [1, 1.2, 1],
          }}
          transition={{
            left: { type: "spring", stiffness: 300, damping: 25 },
            top: { type: "spring", stiffness: 300, damping: 25 },
            scale: { duration: 2, repeat: Infinity },
          }}
          style={{
            width: 20,
            height: 20,
            background: "hsl(var(--primary) / 0.6)",
            boxShadow: `
              0 0 20px hsl(var(--primary) / 0.5),
              0 0 40px hsl(var(--primary) / 0.3),
              0 0 60px hsl(var(--primary) / 0.2)
            `,
            filter: "blur(2px)",
          }}
        />
      )}

      {/* Outer Ring */}
      {isHovering && (
        <motion.div
          className="absolute rounded-full pointer-events-none border-2 border-primary/30"
          animate={{
            left: mousePos.x - 30,
            top: mousePos.y - 30,
            rotate: 360,
          }}
          transition={{
            left: { type: "spring", stiffness: 100, damping: 20 },
            top: { type: "spring", stiffness: 100, damping: 20 },
            rotate: { duration: 8, repeat: Infinity, ease: "linear" },
          }}
          style={{
            width: 60,
            height: 60,
          }}
        />
      )}
    </div>
  );
};

export default WaterRippleEffect;