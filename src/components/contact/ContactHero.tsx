import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Sparkles } from "lucide-react";

const ContactHero = () => {
  const containerRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(textRef, { once: true });
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 30;
      const y = (e.clientY / window.innerHeight - 0.5) * 30;
      setMousePosition({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const headline = "Let's Create Something";
  const headline2 = "Beautiful Together";

  return (
    <section
      ref={containerRef}
      className="relative min-h-[60vh] flex items-center justify-center overflow-hidden pt-28 pb-16"
    >
      {/* Animated Gradient Mesh Background */}
      <div className="absolute inset-0 z-0">
        <motion.div
          className="absolute w-[600px] h-[600px] rounded-full opacity-30 blur-[100px]"
          style={{
            background: 'radial-gradient(circle, hsl(var(--primary)) 0%, transparent 70%)',
            top: '20%',
            left: '30%',
          }}
          animate={{
            x: mousePosition.x * 2,
            y: mousePosition.y * 2,
            scale: [1, 1.1, 1],
          }}
          transition={{
            x: { duration: 0.3 },
            y: { duration: 0.3 },
            scale: { duration: 8, repeat: Infinity, ease: "easeInOut" }
          }}
        />
        <motion.div
          className="absolute w-[400px] h-[400px] rounded-full opacity-20 blur-[80px]"
          style={{
            background: 'radial-gradient(circle, hsl(var(--secondary)) 0%, transparent 70%)',
            bottom: '10%',
            right: '20%',
          }}
          animate={{
            x: mousePosition.x * -1,
            y: mousePosition.y * -1,
            scale: [1.1, 1, 1.1],
          }}
          transition={{
            x: { duration: 0.3 },
            y: { duration: 0.3 },
            scale: { duration: 10, repeat: Infinity, ease: "easeInOut" }
          }}
        />
      </div>

      {/* Grid pattern */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(hsl(var(--foreground)) 1px, transparent 1px),
                           linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }}
      />

      {/* Floating shapes */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute top-20 right-[20%] w-16 h-16 border border-primary/20 rounded-lg"
          animate={{ rotate: 360, y: [0, -15, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute bottom-20 left-[15%] w-12 h-12 border border-secondary/20 rounded-full"
          animate={{ rotate: -360, scale: [1, 1.2, 1] }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
        />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10" ref={textRef}>
        <div className="text-center max-w-4xl mx-auto">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 text-primary font-medium tracking-[0.2em] uppercase text-sm mb-6 border border-primary/30 px-5 py-2.5 rounded-full backdrop-blur-sm bg-primary/5">
              <Sparkles className="w-4 h-4" />
              Get In Touch
              <Sparkles className="w-4 h-4" />
            </span>
          </motion.div>

          {/* Split-text headline */}
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-foreground leading-tight mb-6">
            <span className="block overflow-hidden">
              {headline.split("").map((char, index) => (
                <motion.span
                  key={index}
                  className="inline-block"
                  initial={{ y: 80, opacity: 0 }}
                  animate={isInView ? { y: 0, opacity: 1 } : {}}
                  transition={{
                    duration: 0.4,
                    delay: index * 0.02,
                    ease: [0.215, 0.61, 0.355, 1]
                  }}
                >
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              ))}
            </span>
            <span className="block overflow-hidden mt-2">
              {headline2.split("").map((char, index) => (
                <motion.span
                  key={index}
                  className="inline-block bg-gradient-to-r from-primary via-primary/80 to-primary bg-clip-text text-transparent"
                  initial={{ y: 80, opacity: 0 }}
                  animate={isInView ? { y: 0, opacity: 1 } : {}}
                  transition={{
                    duration: 0.4,
                    delay: 0.4 + index * 0.025,
                    ease: [0.215, 0.61, 0.355, 1]
                  }}
                >
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              ))}
            </span>
          </h1>

          <motion.p
            className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            Ready to transform your space? Fill out the form below and our design experts will get back to you within 24 hours.
          </motion.p>
        </div>
      </div>
    </section>
  );
};

export default ContactHero;
