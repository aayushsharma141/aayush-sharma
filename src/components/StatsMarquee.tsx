import { useEffect, useRef } from "react";

const stats = [
  { number: "25+", label: "Years Experience" },
  { number: "500+", label: "Projects Completed" },
  { number: "100%", label: "Client Satisfaction" },
  { number: "50+", label: "Design Awards" },
  { number: "1000+", label: "Happy Clients" },
  { number: "30+", label: "Expert Designers" },
];

const StatsMarquee = () => {
  const marqueeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const marquee = marqueeRef.current;
    if (!marquee) return;

    let animationId: number;
    let position = 0;

    const animate = () => {
      position -= 1;
      if (position <= -50) {
        position = 0;
      }
      marquee.style.transform = `translateX(${position}%)`;
      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationId);
  }, []);

  return (
    <section className="py-6 bg-primary overflow-hidden">
      <div className="relative">
        <div
          ref={marqueeRef}
          className="flex whitespace-nowrap"
          style={{ width: "200%" }}
        >
          {[...stats, ...stats, ...stats, ...stats].map((stat, index) => (
            <div
              key={index}
              className="flex items-center gap-3 px-8 md:px-12"
            >
              <span className="text-2xl md:text-3xl font-bold text-primary-foreground">
                {stat.number}
              </span>
              <span className="text-sm md:text-base text-primary-foreground/80 uppercase tracking-wider">
                {stat.label}
              </span>
              <span className="text-primary-foreground/40 mx-4">•</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsMarquee;
