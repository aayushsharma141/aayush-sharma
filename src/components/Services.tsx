import { Home, Building2, Palette, Lightbulb, Sofa, PenTool, Clock, Star } from "lucide-react";
import FloatingParticles from "./FloatingParticles";
import { cn } from "@/lib/utils";

const services = [
  {
    icon: Home,
    title: "Residential Design",
    description: "Create your dream home with our full-service residential interior design, from concept to completion.",
    timeline: "8-12 weeks",
    rating: "4.9",
  },
  {
    icon: Building2,
    title: "Commercial Spaces",
    description: "Transform your business environment into an inspiring workspace that boosts productivity.",
    timeline: "10-16 weeks",
    rating: "4.8",
  },
  {
    icon: Palette,
    title: "Color Consultation",
    description: "Expert color analysis and palette creation to perfectly set the mood and style of your space.",
    timeline: "1-2 weeks",
    rating: "5.0",
  },
  {
    icon: Lightbulb,
    title: "Lighting Design",
    description: "Custom lighting solutions that enhance ambiance, functionality, and architectural features.",
    timeline: "3-4 weeks",
    rating: "4.9",
  },
  {
    icon: Sofa,
    title: "Furniture Selection",
    description: "Curated furniture sourcing from premium brands and custom pieces tailored to your space.",
    timeline: "4-8 weeks",
    rating: "4.8",
  },
  {
    icon: PenTool,
    title: "Space Planning",
    description: "Optimize your floor plan for flow, functionality, and aesthetic balance throughout your space.",
    timeline: "2-3 weeks",
    rating: "4.9",
  },
];

const Services = () => {
  return (
    <section id="services" className="py-20 md:py-32 relative overflow-hidden">
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-foreground/95 via-foreground/90 to-foreground/95 z-0" />
      
      <FloatingParticles count={15} />
      
      {/* Background Decorations */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent z-[1]" />
      <div className="absolute -top-40 -left-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-20">
          <span className="inline-block text-primary font-medium tracking-[0.2em] uppercase text-sm mb-4 border-b-2 border-primary pb-2">
            What We Offer
          </span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground mt-4 mb-4 md:mb-6">
            Our Design <span className="text-primary">Services</span>
          </h2>
          <p className="text-primary-foreground/70 text-base md:text-lg leading-relaxed">
            From concept to completion, we offer comprehensive interior design
            services tailored to bring your vision to life.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className={cn(
                "group relative bg-primary-foreground/5 backdrop-blur-sm border border-primary-foreground/10 rounded-2xl p-6 md:p-8",
                "hover:border-primary/40 transition-all duration-500 hover:shadow-xl hover:shadow-primary/10",
                "hover:-translate-y-2"
              )}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Hover Gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />
              
              {/* Number */}
              <span className="absolute top-4 right-4 text-5xl md:text-6xl font-serif font-bold text-primary-foreground/5 group-hover:text-primary/10 transition-colors duration-500">
                0{index + 1}
              </span>
              
              <div className="relative z-10">
                <div className="w-14 h-14 md:w-16 md:h-16 bg-primary/20 rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary group-hover:scale-110 transition-all duration-500 shadow-lg">
                  <service.icon className="w-7 h-7 md:w-8 md:h-8 text-primary group-hover:text-primary-foreground transition-colors duration-500" />
                </div>
                
                <h3 className="font-serif text-xl md:text-2xl font-semibold text-primary-foreground mb-3 group-hover:text-primary transition-colors duration-300">
                  {service.title}
                </h3>
                
                <p className="text-primary-foreground/60 leading-relaxed mb-6 text-sm md:text-base">
                  {service.description}
                </p>

                {/* Footer Info */}
                <div className="flex items-center gap-4 text-sm pt-4 border-t border-primary-foreground/10">
                  <div className="flex items-center gap-1.5 text-primary-foreground/60">
                    <Clock className="w-4 h-4" />
                    <span>{service.timeline}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-primary-foreground/60">
                    <Star className="w-4 h-4 text-primary fill-primary" />
                    <span>{service.rating}</span>
                  </div>
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
