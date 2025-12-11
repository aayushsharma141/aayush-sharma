import { Home, Building2, Palette, Lightbulb, Sofa, PenTool, ArrowRight } from "lucide-react";
import FloatingParticles from "./FloatingParticles";

const services = [
  {
    icon: Home,
    title: "Residential Design",
    description:
      "Create your dream home with our full-service residential interior design, from concept to completion.",
  },
  {
    icon: Building2,
    title: "Commercial Spaces",
    description:
      "Transform your business environment into an inspiring workspace that boosts productivity and impresses clients.",
  },
  {
    icon: Palette,
    title: "Color Consultation",
    description:
      "Expert color analysis and palette creation to perfectly set the mood and style of your space.",
  },
  {
    icon: Lightbulb,
    title: "Lighting Design",
    description:
      "Custom lighting solutions that enhance ambiance, functionality, and architectural features.",
  },
  {
    icon: Sofa,
    title: "Furniture Selection",
    description:
      "Curated furniture sourcing from premium brands and custom pieces tailored to your space.",
  },
  {
    icon: PenTool,
    title: "Space Planning",
    description:
      "Optimize your floor plan for flow, functionality, and aesthetic balance throughout your space.",
  },
];

const Services = () => {
  return (
    <section id="services" className="py-32 bg-card relative overflow-hidden">
      {/* Interactive Floating Particles */}
      <FloatingParticles count={20} />
      
      {/* Background Decorations */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      <div className="absolute -top-40 -left-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="inline-block text-primary font-medium tracking-[0.2em] uppercase text-sm mb-4 border-b-2 border-primary pb-2">
            What We Offer
          </span>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-card-foreground mt-4 mb-6">
            Our Design <span className="text-primary">Services</span>
          </h2>
          <p className="text-muted-foreground text-lg md:text-xl leading-relaxed">
            From concept to completion, we offer comprehensive interior design
            services tailored to bring your vision to life.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="group relative bg-background border border-border rounded-2xl p-8 hover:border-primary/50 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/5 hover:-translate-y-2 cursor-pointer overflow-hidden"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Hover Gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* Number */}
              <span className="absolute top-6 right-6 text-6xl font-serif font-bold text-muted/20 group-hover:text-primary/10 transition-colors duration-500">
                0{index + 1}
              </span>
              
              <div className="relative z-10">
                <div className="w-16 h-16 bg-accent rounded-xl flex items-center justify-center mb-8 group-hover:bg-primary group-hover:scale-110 transition-all duration-500 shadow-lg">
                  <service.icon className="w-8 h-8 text-accent-foreground group-hover:text-primary-foreground transition-colors duration-500" />
                </div>
                <h3 className="font-serif text-2xl font-semibold text-foreground mb-4 group-hover:text-primary transition-colors duration-300">
                  {service.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  {service.description}
                </p>
                <div className="flex items-center text-primary font-medium opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                  Learn More 
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
