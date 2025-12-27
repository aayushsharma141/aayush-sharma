import { useState } from "react";
import { Home, Building2, Palette, Lightbulb, Sofa, PenTool, ArrowRight, X, Star, Clock, CheckCircle } from "lucide-react";
import FloatingParticles from "./FloatingParticles";
import HeroGraphics from "./HeroGraphics";
import { cn } from "@/lib/utils";

const services = [
  {
    icon: Home,
    title: "Residential Design",
    description: "Create your dream home with our full-service residential interior design, from concept to completion.",
    tags: ["Popular", "Premium"],
    preview: "Full-service home design from concept to completion",
    details: "Our residential design service includes space planning, material selection, custom furniture design, and project management. We work closely with you to understand your lifestyle and create spaces that are both beautiful and functional.",
    features: ["Space Planning", "Material Selection", "Custom Furniture", "Project Management"],
    timeline: "8-12 weeks",
  },
  {
    icon: Building2,
    title: "Commercial Spaces",
    description: "Transform your business environment into an inspiring workspace that boosts productivity and impresses clients.",
    tags: ["Premium"],
    preview: "Inspiring workspaces that boost productivity",
    details: "We specialize in creating commercial spaces that reflect your brand identity while optimizing workflow and employee well-being. From offices to retail spaces, we deliver environments that work.",
    features: ["Brand Integration", "Workflow Optimization", "Ergonomic Design", "Compliance Ready"],
    timeline: "10-16 weeks",
  },
  {
    icon: Palette,
    title: "Color Consultation",
    description: "Expert color analysis and palette creation to perfectly set the mood and style of your space.",
    tags: ["Quick"],
    preview: "Expert color analysis and palette creation",
    details: "Our color consultants analyze light, architecture, and your personal preferences to create harmonious color schemes that enhance your space and evoke the desired emotional response.",
    features: ["Light Analysis", "Mood Boards", "Sample Testing", "Full Palette"],
    timeline: "1-2 weeks",
  },
  {
    icon: Lightbulb,
    title: "Lighting Design",
    description: "Custom lighting solutions that enhance ambiance, functionality, and architectural features.",
    tags: ["Popular"],
    preview: "Custom lighting solutions for any space",
    details: "Lighting transforms spaces. We design layered lighting plans that combine ambient, task, and accent lighting to create atmosphere and highlight your space's best features.",
    features: ["Ambient Lighting", "Task Lighting", "Accent Lighting", "Smart Controls"],
    timeline: "3-4 weeks",
  },
  {
    icon: Sofa,
    title: "Furniture Selection",
    description: "Curated furniture sourcing from premium brands and custom pieces tailored to your space.",
    tags: ["Premium"],
    preview: "Curated furniture from premium brands",
    details: "We source furniture from the world's leading manufacturers and artisans, or design custom pieces that perfectly fit your space. Every selection is made with quality, comfort, and style in mind.",
    features: ["Premium Brands", "Custom Pieces", "Quality Guarantee", "Installation"],
    timeline: "4-8 weeks",
  },
  {
    icon: PenTool,
    title: "Space Planning",
    description: "Optimize your floor plan for flow, functionality, and aesthetic balance throughout your space.",
    tags: ["Essential"],
    preview: "Optimize flow and functionality",
    details: "Good design starts with good planning. We analyze your space and lifestyle to create floor plans that maximize functionality while maintaining aesthetic appeal and comfortable circulation.",
    features: ["Flow Analysis", "3D Visualization", "Furniture Layout", "Traffic Patterns"],
    timeline: "2-3 weeks",
  },
];

const Services = () => {
  const [expandedCard, setExpandedCard] = useState<number | null>(null);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  return (
    <section id="services" className="py-32 relative overflow-hidden">
      {/* Dark overlay matching hero */}
      <div className="absolute inset-0 bg-gradient-to-b from-foreground/95 via-foreground/90 to-foreground/95 z-0" />
      
      {/* Interactive Floating Particles */}
      <FloatingParticles count={20} />
      
      {/* Interactive HeroGraphics moved here */}
      <div className="absolute inset-0 z-[1] opacity-30 scale-75 pointer-events-none">
        <HeroGraphics />
      </div>
      
      {/* Background Decorations */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent z-[1]" />
      <div className="absolute -top-40 -left-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="inline-block text-primary font-medium tracking-[0.2em] uppercase text-sm mb-4 border-b-2 border-primary pb-2">
            What We Offer
          </span>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mt-4 mb-6">
            Our Design <span className="text-primary">Services</span>
          </h2>
          <p className="text-primary-foreground/70 text-lg md:text-xl leading-relaxed">
            From concept to completion, we offer comprehensive interior design
            services tailored to bring your vision to life.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className={cn(
                "group relative bg-primary-foreground/5 backdrop-blur-sm border border-primary-foreground/10 rounded-2xl p-8",
                "hover:border-primary/50 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10",
                "cursor-pointer overflow-hidden",
                expandedCard === index && "lg:col-span-2 lg:row-span-2"
              )}
              style={{ animationDelay: `${index * 100}ms` }}
              onClick={() => setExpandedCard(expandedCard === index ? null : index)}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Hover Gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* Tags */}
              <div className="absolute top-4 right-4 flex gap-2">
                {service.tags.map((tag, tagIndex) => (
                  <span
                    key={tagIndex}
                    className={cn(
                      "text-xs font-medium px-2 py-1 rounded-full",
                      tag === "Popular" && "bg-primary/20 text-primary",
                      tag === "Premium" && "bg-yellow-500/20 text-yellow-400",
                      tag === "Quick" && "bg-green-500/20 text-green-400",
                      tag === "Essential" && "bg-blue-500/20 text-blue-400"
                    )}
                  >
                    {tag}
                  </span>
                ))}
              </div>
              
              {/* Number */}
              <span className="absolute top-6 left-6 text-6xl font-serif font-bold text-primary-foreground/5 group-hover:text-primary/10 transition-colors duration-500">
                0{index + 1}
              </span>
              
              <div className="relative z-10 mt-8">
                <div className="w-16 h-16 bg-primary/20 rounded-xl flex items-center justify-center mb-8 group-hover:bg-primary group-hover:scale-110 transition-all duration-500 shadow-lg">
                  <service.icon className="w-8 h-8 text-primary group-hover:text-primary-foreground transition-colors duration-500" />
                </div>
                <h3 className="font-serif text-2xl font-semibold text-primary-foreground mb-4 group-hover:text-primary transition-colors duration-300">
                  {service.title}
                </h3>
                <p className="text-primary-foreground/60 leading-relaxed mb-6">
                  {service.description}
                </p>

                {/* Expanded Content */}
                {expandedCard === index && (
                  <div className="animate-fade-in space-y-6 pt-4 border-t border-primary-foreground/10">
                    <p className="text-primary-foreground/70">{service.details}</p>
                    
                    <div className="grid grid-cols-2 gap-3">
                      {service.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center gap-2 text-primary-foreground/80">
                          <CheckCircle className="w-4 h-4 text-primary" />
                          <span className="text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>
                    
                    <div className="flex items-center gap-4 text-sm">
                      <div className="flex items-center gap-2 text-primary-foreground/60">
                        <Clock className="w-4 h-4" />
                        <span>{service.timeline}</span>
                      </div>
                      <div className="flex items-center gap-2 text-primary-foreground/60">
                        <Star className="w-4 h-4 text-primary" />
                        <span>4.9/5 Rating</span>
                      </div>
                    </div>

                    <button 
                      onClick={(e) => { e.stopPropagation(); setExpandedCard(null); }}
                      className="absolute top-4 right-4 p-2 rounded-full bg-primary-foreground/10 hover:bg-primary-foreground/20 transition-colors"
                    >
                      <X className="w-4 h-4 text-primary-foreground" />
                    </button>
                  </div>
                )}


                <div className="flex items-center text-primary font-medium opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                  {expandedCard === index ? "Click to collapse" : "Click to expand"}
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
