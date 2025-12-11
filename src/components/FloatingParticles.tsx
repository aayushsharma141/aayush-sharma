import React, { useEffect, useMemo, useState } from "react";

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  type: "circle" | "diamond" | "ring";
}

export const FloatingParticles: React.FC<{ count?: number; className?: string }> = React.memo(({ count = 15, className = "" }) => {
  const [mounted, setMounted] = useState(false);

  const particles = useMemo<Particle[]>(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.round(Math.random() * 20 + 8),
      duration: Number((Math.random() * 10 + 12).toFixed(2)),
      delay: Number((Math.random() * 4).toFixed(2)),
      type: ["circle", "diamond", "ring"][Math.floor(Math.random() * 3)] as Particle["type"],
    }));
  }, [count]);

  useEffect(() => {
    setMounted(true);
  }, []);

  const prefersReducedMotion = typeof window !== "undefined" && window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (!mounted) return null;

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none z-0 ${className}`} aria-hidden>
      {!prefersReducedMotion &&
        particles.map((p) => (
          <div
            key={p.id}
            className={`absolute transform-gpu will-change-transform opacity-20 ${
              p.type === "circle" ? "rounded-full bg-primary/30" : p.type === "diamond" ? "bg-primary/20 rotate-45" : "rounded-full border-2 border-primary/30"
            }`}
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              animation: `float-${p.id % 6} ${p.duration}s ease-in-out ${p.delay}s infinite`,
            }}
          />
        ))}

      {prefersReducedMotion && (
        <div className="absolute inset-0 pointer-events-none">
          {particles.slice(0, Math.max(3, Math.round(count / 4))).map((p) => (
            <div
              key={p.id}
              className={`absolute ${p.type === "circle" ? "rounded-full bg-primary/30" : p.type === "diamond" ? "bg-primary/20 rotate-45" : "rounded-full border-2 border-primary/30"}`}
              style={{ left: `${p.x}%`, top: `${p.y}%`, width: `${p.size}px`, height: `${p.size}px`, opacity: 0.12 }}
            />
          ))}
        </div>
      )}

      <style>{`
        ${Array.from({ length: 6 })
          .map(
            (_, i) => `@keyframes float-${i} { 0% { transform: translateY(0) translateX(0); } 50% { transform: translateY(${
              (i % 2 === 0 ? 1 : -1) * (10 + i * 2)
            }px) translateX(${(i % 3) * 4 - 6}px); } 100% { transform: translateY(0) translateX(0); } }`
          )
          .join("\n")}

        @media (prefers-reduced-motion: reduce) {
          ${Array.from({ length: 6 })
            .map((_, i) => `@keyframes float-${i} { from { transform: none; } to { transform: none; } }`)
            .join("\n")}
        }
      `}</style>
    </div>
  );
});

FloatingParticles.displayName = "FloatingParticles";

export default FloatingParticles;
