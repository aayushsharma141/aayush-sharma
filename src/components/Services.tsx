import { Home, Building2, Palette, Lightbulb, Sofa, PenTool } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

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
    <section id="services" className="py-24 bg-card">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-primary font-medium tracking-wider uppercase text-sm">
            What We Offer
          </span>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-card-foreground mt-2 mb-4">
            Our Design Services
          </h2>
          <p className="text-muted-foreground text-lg">
            From concept to completion, we offer comprehensive interior design
            services tailored to bring your vision to life.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <Card
              key={index}
              className="group bg-background border-border hover:border-primary transition-all duration-300 hover:shadow-lg"
            >
              <CardContent className="p-8">
                <div className="w-14 h-14 bg-accent rounded-lg flex items-center justify-center mb-6 group-hover:bg-primary transition-colors duration-300">
                  <service.icon className="w-7 h-7 text-accent-foreground group-hover:text-primary-foreground transition-colors duration-300" />
                </div>
                <h3 className="font-serif text-xl font-semibold text-foreground mb-3">
                  {service.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {service.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
