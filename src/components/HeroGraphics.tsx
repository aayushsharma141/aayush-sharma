import { useEffect, useState, useRef } from "react";

const HeroGraphics = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setMousePos({
          x: (e.clientX - rect.left) / rect.width,
          y: (e.clientY - rect.top) / rect.height,
        });
      }
    };

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const parallaxOffset = scrollY * 0.3;

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden pointer-events-none z-[2]">
      {/* Animated Grid Lines */}
      <svg className="absolute inset-0 w-full h-full opacity-10" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
            <path d="M 60 0 L 0 0 0 60" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" style={{ transform: `translateY(${parallaxOffset * 0.2}px)` }} />
      </svg>

      {/* Floating Geometric Shapes */}
      <div
        className="absolute w-96 h-96 border border-primary/20 rounded-full"
        style={{
          top: "10%",
          right: "5%",
          transform: `translate(${mousePos.x * 30}px, ${mousePos.y * 30 - parallaxOffset * 0.5}px) rotate(${scrollY * 0.02}deg)`,
          transition: "transform 0.3s ease-out",
        }}
      />
      
      <div
        className="absolute w-64 h-64 border-2 border-primary/30"
        style={{
          top: "20%",
          right: "15%",
          transform: `translate(${mousePos.x * -20}px, ${mousePos.y * -20 - parallaxOffset * 0.3}px) rotate(${45 + scrollY * 0.05}deg)`,
          transition: "transform 0.4s ease-out",
        }}
      />

      <div
        className="absolute w-32 h-32 bg-gradient-to-br from-primary/20 to-transparent rounded-full blur-sm"
        style={{
          top: "60%",
          right: "25%",
          transform: `translate(${mousePos.x * 40}px, ${mousePos.y * 40 - parallaxOffset * 0.4}px)`,
          transition: "transform 0.2s ease-out",
        }}
      />

      {/* Animated Lines */}
      <svg className="absolute top-0 right-0 w-1/2 h-full" viewBox="0 0 400 800" fill="none">
        <path
          d="M400 0 L200 400 L400 800"
          stroke="hsl(var(--primary))"
          strokeWidth="1"
          strokeOpacity="0.2"
          strokeDasharray="10 10"
          className="animate-[dash_20s_linear_infinite]"
          style={{ transform: `translateY(${-parallaxOffset * 0.2}px)` }}
        />
        <path
          d="M350 0 L150 400 L350 800"
          stroke="hsl(var(--primary))"
          strokeWidth="1"
          strokeOpacity="0.15"
          strokeDasharray="5 15"
          className="animate-[dash_15s_linear_infinite_reverse]"
        />
      </svg>

      {/* Glowing Orbs */}
      <div
        className="absolute w-4 h-4 bg-primary rounded-full animate-pulse"
        style={{
          top: "30%",
          right: "30%",
          boxShadow: "0 0 30px hsl(var(--primary) / 0.6), 0 0 60px hsl(var(--primary) / 0.3)",
          transform: `translate(${mousePos.x * 50}px, ${mousePos.y * 50}px)`,
          transition: "transform 0.1s ease-out",
        }}
      />
      
      <div
        className="absolute w-3 h-3 bg-primary/80 rounded-full"
        style={{
          top: "50%",
          right: "40%",
          boxShadow: "0 0 20px hsl(var(--primary) / 0.5)",
          transform: `translate(${mousePos.x * -30}px, ${mousePos.y * -30}px)`,
          transition: "transform 0.15s ease-out",
          animation: "pulse 2s ease-in-out infinite",
        }}
      />

      <div
        className="absolute w-2 h-2 bg-primary/60 rounded-full"
        style={{
          top: "70%",
          right: "20%",
          boxShadow: "0 0 15px hsl(var(--primary) / 0.4)",
          transform: `translate(${mousePos.x * 60}px, ${mousePos.y * 60}px)`,
          transition: "transform 0.05s ease-out",
          animation: "pulse 3s ease-in-out infinite 0.5s",
        }}
      />

      {/* Corner Accent */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 overflow-hidden">
        <div
          className="absolute -top-1/2 -right-1/2 w-full h-full border border-primary/10 rounded-full"
          style={{ transform: `scale(${1 + scrollY * 0.001})` }}
        />
        <div
          className="absolute -top-1/3 -right-1/3 w-2/3 h-2/3 border border-primary/20 rounded-full"
          style={{ transform: `scale(${1 + scrollY * 0.002})` }}
        />
      </div>

      {/* Bottom Wave */}
      <svg
        className="absolute bottom-0 left-0 w-full"
        viewBox="0 0 1440 120"
        fill="none"
        style={{ transform: `translateY(${parallaxOffset * 0.1}px)` }}
      >
        <path
          d="M0 120L48 108C96 96 192 72 288 66C384 60 480 72 576 78C672 84 768 84 864 78C960 72 1056 60 1152 60C1248 60 1344 72 1392 78L1440 84V120H1392C1344 120 1248 120 1152 120C1056 120 960 120 864 120C768 120 672 120 576 120C480 120 384 120 288 120C192 120 96 120 48 120H0Z"
          fill="hsl(var(--background))"
          fillOpacity="0.05"
        />
      </svg>
    </div>
  );
};

export default HeroGraphics;
