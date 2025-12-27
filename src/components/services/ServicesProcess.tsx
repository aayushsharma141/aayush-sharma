import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const steps = [
  {
    number: "01",
    title: "Discovery & Consultation",
    description: "We begin with an in-depth consultation to understand your vision, lifestyle, and requirements. This foundation shapes everything that follows.",
  },
  {
    number: "02",
    title: "Concept Development",
    description: "Our designers create mood boards, color palettes, and initial concepts that capture the essence of your ideal space.",
  },
  {
    number: "03",
    title: "Design & Planning",
    description: "Detailed floor plans, 3D visualizations, and material selections bring your vision to life before construction begins.",
  },
  {
    number: "04",
    title: "Execution & Handoff",
    description: "We manage every detail of the execution phase, ensuring flawless implementation and a seamless handoff of your completed space.",
  },
];

const ServicesProcess = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

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
          className="max-w-3xl mx-auto text-center mb-16 md:mb-24"
        >
          <span className="text-primary font-medium tracking-widest uppercase text-sm mb-4 block">
            Our Process
          </span>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
            How We{" "}
            <span className="text-primary">Work</span>
          </h2>
          <p className="text-muted-foreground text-lg md:text-xl leading-relaxed">
            A streamlined approach that transforms your ideas into stunning reality.
          </p>
        </motion.div>

        {/* Process Steps */}
        <div className="max-w-4xl mx-auto relative">
          {/* Animated vertical line */}
          <div className="absolute left-8 md:left-12 top-0 bottom-0 w-px bg-border/50">
            <motion.div
              className="w-full bg-gradient-to-b from-primary via-primary to-transparent"
              style={{ height: lineHeight }}
            />
          </div>

          {/* Steps */}
          <div className="space-y-12 md:space-y-16">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.15,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
                className="relative flex gap-8 md:gap-12 group"
              >
                {/* Number Circle */}
                <motion.div
                  className="relative z-10 flex-shrink-0 w-16 h-16 md:w-24 md:h-24 rounded-full bg-background border-2 border-border group-hover:border-primary transition-colors duration-500 flex items-center justify-center"
                  whileHover={{ scale: 1.1 }}
                >
                  <span className="font-serif text-2xl md:text-4xl font-bold text-muted-foreground group-hover:text-primary transition-colors duration-500">
                    {step.number}
                  </span>
                  
                  {/* Glow effect on hover */}
                  <div className="absolute inset-0 rounded-full bg-primary/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </motion.div>

                {/* Content */}
                <div className="flex-1 pt-2 md:pt-4">
                  <h3 className="font-serif text-xl md:text-2xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesProcess;
