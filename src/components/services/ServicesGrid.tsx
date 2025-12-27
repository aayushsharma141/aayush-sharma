import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Home, Building2, Palette, Lightbulb, Sofa, PenTool } from "lucide-react";
import { useState, useRef } from "react";
import ServiceCard from "./ServiceCard";

const services = [
  {
    icon: Home,
    title: "Residential Design",
    description: "Create your dream home with our full-service residential interior design, from concept to completion.",
    tags: ["Popular", "Premium"],
    features: ["Space Planning", "Material Selection", "Custom Furniture", "Project Management"],
    timeline: "8-12 weeks",
  },
  {
    icon: Building2,
    title: "Commercial Spaces",
    description: "Transform your business environment into an inspiring workspace that boosts productivity.",
    tags: ["Premium"],
    features: ["Brand Integration", "Workflow Optimization", "Ergonomic Design", "Compliance Ready"],
    timeline: "10-16 weeks",
  },
  {
    icon: Palette,
    title: "Color Consultation",
    description: "Expert color analysis and palette creation to perfectly set the mood and style of your space.",
    tags: ["Quick"],
    features: ["Light Analysis", "Mood Boards", "Sample Testing", "Full Palette"],
    timeline: "1-2 weeks",
  },
  {
    icon: Lightbulb,
    title: "Lighting Design",
    description: "Custom lighting solutions that enhance ambiance, functionality, and architectural features.",
    tags: ["Popular"],
    features: ["Ambient Lighting", "Task Lighting", "Accent Lighting", "Smart Controls"],
    timeline: "3-4 weeks",
  },
  {
    icon: Sofa,
    title: "Furniture Selection",
    description: "Curated furniture sourcing from premium brands and custom pieces tailored to your space.",
    tags: ["Premium"],
    features: ["Premium Brands", "Custom Pieces", "Quality Guarantee", "Installation"],
    timeline: "4-8 weeks",
  },
  {
    icon: PenTool,
    title: "Space Planning",
    description: "Optimize your floor plan for flow, functionality, and aesthetic balance throughout your space.",
    tags: [],
    features: ["Flow Analysis", "3D Visualization", "Furniture Layout", "Traffic Patterns"],
    timeline: "2-3 weeks",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 80, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring" as const,
      stiffness: 100,
      damping: 15,
      mass: 0.8,
    },
  },
};

const ServicesGrid = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMousePosition({
      x: (e.clientX - rect.left - rect.width / 2) / 50,
      y: (e.clientY - rect.top - rect.height / 2) / 50,
    });
  };

  return (
    <section 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative py-24 md:py-32 bg-background overflow-hidden"
    >
      {/* Animated Background Gradient */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(800px circle at ${50 + mousePosition.x * 5}% ${50 + mousePosition.y * 5}%, hsl(var(--primary) / 0.03), transparent 50%)`,
        }}
      />
      
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />
        
        {/* Floating Shapes */}
        <motion.div
          className="absolute top-20 right-20 w-32 h-32 border border-primary/10 rounded-full"
          animate={{
            y: [0, -20, 0],
            rotate: [0, 180, 360],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute bottom-40 left-10 w-20 h-20 border border-primary/10 rounded-lg"
          animate={{
            y: [0, 20, 0],
            rotate: [0, -180, -360],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header with Split Text Animation */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center mb-16 md:mb-24"
        >
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-primary font-medium tracking-widest uppercase text-sm mb-4 block"
          >
            What We Offer
          </motion.span>
          
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 overflow-hidden">
            <motion.span
              className="inline-block"
              initial={{ y: 100, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Our Design{" "}
            </motion.span>
            <motion.span
              className="inline-block text-primary"
              initial={{ y: 100, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Services
            </motion.span>
          </h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-muted-foreground text-lg md:text-xl leading-relaxed"
          >
            Comprehensive interior design solutions tailored to bring your vision to life.
            Every project is unique, and so is our approach.
          </motion.p>
        </motion.div>

        {/* Services Grid with Staggered Animation */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {services.map((service, index) => (
            <motion.div key={index} variants={itemVariants}>
              <ServiceCard
                icon={service.icon}
                title={service.title}
                description={service.description}
                features={service.features}
                timeline={service.timeline}
                index={index}
                tags={service.tags}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesGrid;
