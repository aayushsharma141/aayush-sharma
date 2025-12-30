import { useState, useEffect, useRef } from "react";
import { Award, Users, ShieldCheck, Wrench, Package, HeadphonesIcon } from "lucide-react";
import { cn } from "@/lib/utils";

const trustItems = [
  {
    icon: Award,
    title: "Award-Winning Designs",
    description: "Recognized for excellence in interior design across Jharkhand",
  },
  {
    icon: Users,
    title: "Expert Team",
    description: "15+ certified designers and skilled craftsmen",
  },
  {
    icon: ShieldCheck,
    title: "Quality Guarantee",
    description: "100% client satisfaction with money-back guarantee",
  },
  {
    icon: Wrench,
    title: "Premium Tools & Materials",
    description: "Partnered with top brands for superior quality",
  },
  {
    icon: Package,
    title: "Authentic Materials",
    description: "Direct sourcing from verified manufacturers",
  },
  {
    icon: HeadphonesIcon,
    title: "Post-Project Support",
    description: "1 year free maintenance and support",
  },
];

const brandPartners = [
  { name: "Asian Paints", color: "hsl(var(--primary))" },
  { name: "Hafele", color: "hsl(var(--secondary))" },
  { name: "Godrej", color: "hsl(var(--primary))" },
  { name: "Philips", color: "hsl(var(--secondary))" },
  { name: "Kajaria", color: "hsl(var(--primary))" },
  { name: "Hindware", color: "hsl(var(--secondary))" },
  { name: "Kohler", color: "hsl(var(--primary))" },
  { name: "Somany", color: "hsl(var(--secondary))" },
];

const TrustSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="trust"
      ref={sectionRef}
      className="py-20 md:py-32 relative overflow-hidden"
    >
      {/* Blurred Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/30 to-background z-0" />
      <div className="absolute inset-0 backdrop-blur-3xl z-0" />
      
      {/* Decorative blurs */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-80 h-80 bg-secondary/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <span className="text-primary text-sm uppercase tracking-[0.3em] font-medium">
            Why Choose Us
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-foreground mt-4">
            Trust & Credibility
          </h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            We're committed to delivering excellence in every project
          </p>
        </div>

        {/* Trust Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-16">
          {trustItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className={cn(
                  "p-5 md:p-6 rounded-2xl backdrop-blur-xl bg-card/50 border border-border/50",
                  "hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5",
                  "transition-all duration-500 group",
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-4"
                )}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="w-11 h-11 md:w-12 md:h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <Icon className="w-5 h-5 md:w-6 md:h-6 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2 text-sm md:text-base">
                  {item.title}
                </h3>
                <p className="text-xs md:text-sm text-muted-foreground">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Brand Partners Marquee */}
        <div
          className={cn(
            "transition-all duration-700",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          )}
          style={{ transitionDelay: "600ms" }}
        >
          <p className="text-sm text-muted-foreground mb-6 uppercase tracking-wider text-center">
            Trusted Brand Partners
          </p>
          
          {/* Marquee Container */}
          <div className="relative overflow-hidden py-4">
            {/* Fade edges */}
            <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-background to-transparent z-10" />
            <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-background to-transparent z-10" />
            
            {/* Scrolling content */}
            <div className="flex animate-marquee hover:pause-animation gap-8">
              {[...brandPartners, ...brandPartners].map((partner, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 px-6 py-3 rounded-full bg-card/80 backdrop-blur-sm border border-border/50 hover:border-primary/30 transition-all duration-300"
                >
                  <span 
                    className="font-semibold text-sm md:text-base whitespace-nowrap"
                    style={{ color: partner.color }}
                  >
                    {partner.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustSection;
