import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

interface ProjectHeroProps {
  heroImage: string;
  title: string;
  category: string;
  style: string;
  location: string;
}

const ProjectHero = ({ heroImage, title, category, style, location }: ProjectHeroProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  return (
    <div ref={containerRef} className="relative h-[80vh] md:h-[90vh] overflow-hidden">
      {/* Parallax Background Image */}
      <motion.div className="absolute inset-0" style={{ y, scale }}>
        <img
          src={heroImage}
          alt={title}
          className="w-full h-full object-cover"
        />
      </motion.div>
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-background/80 to-transparent" />

      {/* Animated Floating Elements */}
      <motion.div
        className="absolute top-1/4 right-10 w-32 h-32 border border-primary/20 rounded-full"
        animate={{ y: [0, -20, 0], rotate: [0, 360] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute bottom-1/3 right-1/4 w-20 h-20 border border-primary/10"
        animate={{ y: [0, 20, 0], rotate: [0, -180, -360] }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
      />

      {/* Content Overlay */}
      <motion.div 
        className="absolute bottom-0 left-0 right-0 p-8 md:p-16"
        style={{ opacity }}
      >
        <div className="container mx-auto">
          {/* Category Badge */}
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-block px-5 py-2 rounded-full bg-primary text-primary-foreground text-sm font-medium mb-6 backdrop-blur-sm"
          >
            {category}
          </motion.span>

          {/* Title with Split Text Animation */}
          <div className="overflow-hidden mb-4">
            <motion.h1
              initial={{ y: 100 }}
              animate={{ y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
              className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold text-foreground"
            >
              {title}
            </motion.h1>
          </div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="text-muted-foreground text-lg md:text-xl max-w-2xl flex items-center gap-3"
          >
            <span className="w-12 h-px bg-primary" />
            {style} • {location}
          </motion.p>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 rounded-full border-2 border-foreground/30 flex items-start justify-center p-1"
        >
          <motion.div
            animate={{ y: [0, 16, 0], opacity: [1, 0.3, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1.5 h-3 bg-primary rounded-full"
          />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ProjectHero;