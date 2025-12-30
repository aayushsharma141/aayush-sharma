import { Home, Building2, Palette, Lightbulb, Sofa, PenTool, ArrowRight, Clock } from "lucide-react";
import FloatingParticles from "./FloatingParticles";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

const services = [
  {
    icon: Home,
    title: "Residential Design",
    description: "Create your dream home with our full-service residential interior design.",
    tag: "Popular",
    timeline: "8-12 weeks",
  },
  {
    icon: Building2,
    title: "Commercial Spaces",
    description: "Transform your business environment into an inspiring workspace.",
    tag: "Premium",
    timeline: "10-16 weeks",
  },
  {
    icon: Palette,
    title: "Color Consultation",
    description: "Expert color analysis and palette creation for your space.",
    tag: "Quick",
    timeline: "1-2 weeks",
  },
  {
    icon: Lightbulb,
    title: "Lighting Design",
    description: "Custom lighting solutions that enhance ambiance and functionality.",
    tag: "Popular",
    timeline: "3-4 weeks",
  },
  {
    icon: Sofa,
    title: "Furniture Selection",
    description: "Curated furniture sourcing from premium brands and custom pieces.",
    tag: "Premium",
    timeline: "4-8 weeks",
  },
  {
    icon: PenTool,
    title: "Space Planning",
    description: "Optimize your floor plan for flow, functionality, and aesthetic balance.",
    tag: "Essential",
    timeline: "2-3 weeks",
  },
];

const ServiceCard = ({ 
  service, 
  index 
}: { 
  service: typeof services[0]; 
  index: number;
}) => {
  const tagColors: Record<string, string> = {
    Popular: "bg-primary/15 text-primary border-primary/20",
    Premium: "bg-secondary/15 text-secondary border-secondary/20",
    Quick: "bg-green-500/15 text-green-400 border-green-500/20",
    Essential: "bg-blue-500/15 text-blue-400 border-blue-500/20",
  };

  return (
    <div
      className={cn(
        "group relative bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-6 md:p-8",
        "hover:border-primary/40 transition-all duration-500 hover:shadow-xl hover:shadow-primary/10",
        "hover:-translate-y-1"
      )}
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {/* Tag */}
      <div className="absolute top-4 right-4">
        <span className={cn(
          "text-xs font-medium px-2.5 py-1 rounded-full border",
          tagColors[service.tag]
        )}>
          {service.tag}
        </span>
      </div>
      
      {/* Number */}
      <span className="absolute top-4 left-6 text-5xl md:text-6xl font-serif font-bold text-muted/10 group-hover:text-primary/10 transition-colors duration-500">
        0{index + 1}
      </span>
      
      <div className="relative z-10 mt-8">
        <div className="w-14 h-14 md:w-16 md:h-16 bg-primary/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary group-hover:scale-110 transition-all duration-500 border border-primary/20">
          <service.icon className="w-7 h-7 md:w-8 md:h-8 text-primary group-hover:text-primary-foreground transition-colors duration-500" />
        </div>
        
        <h3 className="font-serif text-xl md:text-2xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
          {service.title}
        </h3>
        
        <p className="text-muted-foreground leading-relaxed mb-4 text-sm md:text-base">
          {service.description}
        </p>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-muted-foreground text-sm">
            <Clock className="w-4 h-4" />
            <span>{service.timeline}</span>
          </div>
          
          <Link 
            to="/services"
            className="flex items-center text-primary font-medium text-sm opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0"
          >
            Learn More
            <ArrowRight className="ml-1 w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};

const Services = () => {
  return (
    <section id="services" className="py-20 md:py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/30 to-background z-0" />
      
      {/* Interactive Floating Particles */}
      <FloatingParticles count={15} />
      
      {/* Background Decorations */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent z-[1]" />
      <div className="absolute -top-40 -left-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-20">
          <span className="inline-block text-primary font-medium tracking-[0.2em] uppercase text-sm mb-4 border-b-2 border-primary pb-2">
            What We Offer
          </span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-foreground mt-4 mb-4 md:mb-6">
            Our Design <span className="text-primary">Services</span>
          </h2>
          <p className="text-muted-foreground text-base md:text-lg lg:text-xl leading-relaxed">
            From concept to completion, we offer comprehensive interior design
            services tailored to bring your vision to life.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {services.map((service, index) => (
            <ServiceCard key={index} service={service} index={index} />
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12 md:mt-16">
          <Link 
            to="/services"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 md:px-8 py-3 md:py-4 rounded-full font-medium hover:shadow-lg hover:shadow-primary/25 transition-all duration-300 hover:-translate-y-1 text-sm md:text-base"
          >
            View All Services
            <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Services;
