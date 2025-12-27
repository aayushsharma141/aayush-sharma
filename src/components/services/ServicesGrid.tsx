import { motion } from "framer-motion";
import { Home, Building2, Palette, Lightbulb, Sofa, PenTool } from "lucide-react";
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

const ServicesGrid = () => {
  return (
    <section className="relative py-24 md:py-32 bg-background overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      </div>

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
            What We Offer
          </span>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
            Our Design{" "}
            <span className="text-primary">Services</span>
          </h2>
          <p className="text-muted-foreground text-lg md:text-xl leading-relaxed">
            Comprehensive interior design solutions tailored to bring your vision to life.
            Every project is unique, and so is our approach.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              icon={service.icon}
              title={service.title}
              description={service.description}
              features={service.features}
              timeline={service.timeline}
              index={index}
              tags={service.tags}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesGrid;
