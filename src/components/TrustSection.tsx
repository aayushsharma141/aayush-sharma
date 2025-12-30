import { useState, useEffect, useRef } from "react";
import { Award, Users, ShieldCheck, Wrench, Package, HeadphonesIcon } from "lucide-react";
import { cn } from "@/lib/utils";
const trustItems = [{
  icon: Award,
  title: "Award-Winning Designs",
  description: "Recognized for excellence in interior design across Jharkhand"
}, {
  icon: Users,
  title: "Expert Team",
  description: "15+ certified designers and skilled craftsmen"
}, {
  icon: ShieldCheck,
  title: "Quality Guarantee",
  description: "100% client satisfaction with money-back guarantee"
}, {
  icon: Wrench,
  title: "Premium Tools & Materials",
  description: "Partnered with top brands for superior quality"
}, {
  icon: Package,
  title: "Authentic Materials",
  description: "Direct sourcing from verified manufacturers"
}, {
  icon: HeadphonesIcon,
  title: "Post-Project Support",
  description: "1 year free maintenance and support"
}];
const brandPartners = [{
  name: "Asian Paints",
  logo: "🎨"
}, {
  name: "Hafele",
  logo: "🔧"
}, {
  name: "Godrej",
  logo: "🏠"
}, {
  name: "Philips",
  logo: "💡"
}];
const TrustSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
      }
    }, {
      threshold: 0.2
    });
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    return () => observer.disconnect();
  }, []);
  return <section id="trust" ref={sectionRef} className="py-24 md:py-32 relative overflow-hidden">
      {/* Background with brand gradient */}
      <div className="absolute inset-0 z-0 opacity-30" style={{
      background: 'var(--gradient-brand-subtle)'
    }} />
      <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background z-0" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-primary text-sm uppercase tracking-[0.3em] font-medium">
            Why Choose Us
          </span>
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-foreground mt-4">
            Trust & Credibility
          </h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            We're committed to delivering excellence in every project
          </p>
        </div>

        {/* Trust Items Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {trustItems.map((item, index) => {
          const Icon = item.icon;
          return <div key={index} className={cn("p-6 rounded-2xl bg-background border border-border", "hover:border-primary/40 hover:shadow-lg hover:shadow-primary/10", "transition-all duration-500 group", isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4")} style={{
            transitionDelay: `${index * 100}ms`
          }}>
                <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </div>;
        })}
        </div>

        {/* Brand Partners */}
        <div className={cn("text-center transition-all duration-700", isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4")} style={{
        transitionDelay: "600ms"
      }}>
          <p className="text-sm text-muted-foreground mb-6 uppercase tracking-wider text-center">
            Trusted Brand Partners
          </p>
          <div className="flex flex-wrap justify-center gap-8">
            {brandPartners.map((partner, index) => <div key={index} className="flex items-center gap-2 px-6 py-3 rounded-full bg-background border border-primary/20 hover:border-primary/40 hover:shadow-md hover:shadow-primary/10 transition-all">
                <span className="text-2xl">{partner.logo}</span>
                <span className="font-medium text-foreground">{partner.name}</span>
              </div>)}
          </div>
        </div>
      </div>
    </section>;
};
export default TrustSection;