import { useEffect, useRef, useState } from "react";
import useCountUp from "@/hooks/useCountUp";

const stats = [
  { number: 25, suffix: "+", label: "Years Experience" },
  { number: 500, suffix: "+", label: "Projects Completed" },
  { number: 100, suffix: "%", label: "Client Satisfaction" },
  { number: 50, suffix: "+", label: "Design Awards" },
];

const StatCard = ({ 
  number, 
  suffix, 
  label, 
  index 
}: { 
  number: number; 
  suffix: string; 
  label: string; 
  index: number;
}) => {
  const { count, ref } = useCountUp(number, { duration: 2000, delay: index * 150 });

  return (
    <div 
      ref={ref}
      className={`
        relative backdrop-blur-lg bg-primary-foreground/10 
        px-6 py-8 md:px-10 md:py-12 
        border border-primary-foreground/20 
        rounded-3xl
        transform transition-all duration-500 hover:scale-105 hover:bg-primary-foreground/15
        ${index > 0 ? 'md:-ml-6' : ''}
      `}
      style={{ 
        zIndex: stats.length - index,
      }}
    >
      {/* Glow effect */}
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary/20 via-transparent to-primary/10 opacity-0 hover:opacity-100 transition-opacity duration-500" />
      
      <div className="relative z-10">
        <div className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-2">
          {count}{suffix}
        </div>
        <div className="text-primary-foreground/70 uppercase tracking-wider text-xs md:text-sm font-medium">
          {label}
        </div>
      </div>
    </div>
  );
};

const StatsMarquee = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const element = sectionRef.current;
      if (!element) return;
      
      const rect = element.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const progress = 1 - (rect.top / windowHeight);
      setScrollProgress(Math.max(0, Math.min(1, progress)));
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial check
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="py-16 md:py-24 bg-gradient-to-b from-foreground via-foreground/95 to-foreground relative overflow-hidden"
    >
      {/* Background decorations */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,hsl(var(--primary)/0.15),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,hsl(var(--primary)/0.1),transparent_50%)]" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <span className="inline-block text-primary font-medium tracking-[0.2em] uppercase text-sm mb-4 border-b-2 border-primary pb-2">
            Our Achievements
          </span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground">
            Numbers That <span className="text-primary">Speak</span>
          </h2>
        </div>

        {/* Stats Grid with slide-in effect */}
        <div 
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-0 max-w-5xl mx-auto"
          style={{
            transform: `translateX(${(1 - scrollProgress) * 50}px)`,
            opacity: scrollProgress,
            transition: 'transform 0.1s ease-out, opacity 0.3s ease-out',
          }}
        >
          {stats.map((stat, index) => (
            <StatCard
              key={index}
              number={stat.number}
              suffix={stat.suffix}
              label={stat.label}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsMarquee;
