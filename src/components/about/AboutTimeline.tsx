import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const milestones = [
  { 
    year: "2010", 
    title: "The Beginning",
    event: "Founded Cross Angle Interior in Jamshedpur with a vision to transform spaces." 
  },
  { 
    year: "2015", 
    title: "Expansion",
    event: "Expanded into commercial interior design, partnering with leading businesses." 
  },
  { 
    year: "2018", 
    title: "Milestone",
    event: "Celebrated completion of 100+ residential projects across Jharkhand." 
  },
  { 
    year: "2020", 
    title: "Innovation",
    event: "Launched comprehensive turnkey project solutions for seamless delivery." 
  },
  { 
    year: "2024", 
    title: "Recognition",
    event: "Recognized as the leading interior design studio in Jharkhand." 
  },
];

const AboutTimeline = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const lineHeight = useTransform(scrollYProgress, [0.1, 0.9], ["0%", "100%"]);

  return (
    <section
      ref={containerRef}
      className="relative py-24 md:py-32 bg-card overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card to-background" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center mb-16 md:mb-20"
        >
          <span className="text-primary font-medium tracking-widest uppercase text-sm mb-4 block">
            Our Journey
          </span>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-6">
            Key <span className="text-primary">Milestones</span>
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            A decade of dedication, innovation, and excellence in interior design.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="max-w-4xl mx-auto relative">
          {/* Animated vertical line - centered on desktop */}
          <div className="absolute left-8 md:left-1/2 md:-translate-x-px top-0 bottom-0 w-px bg-border/30">
            <motion.div
              className="w-full bg-gradient-to-b from-primary via-primary to-transparent"
              style={{ height: lineHeight }}
            />
          </div>

          {/* Milestones */}
          <div className="space-y-12 md:space-y-0">
            {milestones.map((milestone, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.1,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
                className={`relative flex items-start gap-8 md:gap-0 ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* Content */}
                <div className={`flex-1 md:w-1/2 ${index % 2 === 0 ? "md:pr-16 md:text-right" : "md:pl-16"}`}>
                  <motion.div
                    className="group bg-card/50 backdrop-blur-md border border-border/50 hover:border-primary/30 rounded-2xl p-6 md:p-8 transition-all duration-500 hover:shadow-xl"
                    whileHover={{ y: -5 }}
                  >
                    <span className="inline-block text-primary font-serif text-3xl font-bold mb-2">
                      {milestone.year}
                    </span>
                    <h3 className="font-serif text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                      {milestone.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {milestone.event}
                    </p>
                  </motion.div>
                </div>

                {/* Center dot */}
                <div className="absolute left-8 md:left-1/2 -translate-x-1/2 flex items-center justify-center">
                  <motion.div
                    className="w-4 h-4 rounded-full bg-background border-4 border-primary z-10"
                    whileInView={{ scale: [0, 1.2, 1] }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.15 }}
                  />
                  {/* Glow effect */}
                  <div className="absolute w-8 h-8 rounded-full bg-primary/20 blur-sm -z-10" />
                </div>

                {/* Spacer for alternating layout */}
                <div className="hidden md:block flex-1 md:w-1/2" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutTimeline;
