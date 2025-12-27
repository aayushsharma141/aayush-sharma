import { useState, useEffect, useRef } from "react";
import { Home, Ruler, Palette, Hammer, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

const steps = [
  {
    icon: Home,
    title: "Consult",
    subtitle: "Free Meeting",
    duration: "1-2 days",
    description: "Share your vision and requirements with our expert designers",
  },
  {
    icon: Ruler,
    title: "Measure & Plan",
    subtitle: "Blueprint",
    duration: "3-5 days",
    description: "Precise measurements and detailed planning for your space",
  },
  {
    icon: Palette,
    title: "Design Approval",
    subtitle: "3D Views",
    duration: "7-10 days",
    description: "Review realistic 3D visualizations before execution",
  },
  {
    icon: Hammer,
    title: "Execute",
    subtitle: "Quality Craftsmanship",
    duration: "30-45 days",
    description: "Expert craftsmen bring your design to life",
  },
  {
    icon: CheckCircle2,
    title: "Handover",
    subtitle: "Final Reveal",
    duration: "1 day",
    description: "Walk through your transformed space",
  },
];

const Process = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
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
      id="process"
      ref={sectionRef}
      className="py-24 md:py-32 relative overflow-hidden bg-muted/30"
    >
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-primary text-sm uppercase tracking-[0.3em] font-medium">
            How We Work
          </span>
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-foreground mt-4">
            Our Design Process
          </h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            From concept to completion, we guide you through every step of your interior transformation
          </p>
        </div>

        {/* Timeline - Desktop */}
        <div className="hidden lg:block">
          {/* Connection Line */}
          <div className="relative flex justify-between items-center mb-8">
            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-border -translate-y-1/2" />
            <div
              className="absolute top-1/2 left-0 h-0.5 bg-primary -translate-y-1/2 transition-all duration-1000"
              style={{ width: isVisible ? `${(activeStep / (steps.length - 1)) * 100}%` : "0%" }}
            />

            {/* Step Icons */}
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <button
                  key={index}
                  onClick={() => setActiveStep(index)}
                  className={cn(
                    "relative z-10 w-16 h-16 rounded-full flex items-center justify-center transition-all duration-500",
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
                    index <= activeStep
                      ? "bg-primary text-primary-foreground shadow-lg shadow-primary/30"
                      : "bg-background border-2 border-border text-muted-foreground hover:border-primary hover:text-primary"
                  )}
                  style={{ transitionDelay: `${index * 100}ms` }}
                  aria-label={`Step ${index + 1}: ${step.title}`}
                >
                  <Icon className="w-7 h-7" />
                </button>
              );
            })}
          </div>

          {/* Step Labels */}
          <div className="flex justify-between mb-12">
            {steps.map((step, index) => (
              <div
                key={index}
                className={cn(
                  "text-center w-32 transition-all duration-500",
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
                  index <= activeStep ? "text-foreground" : "text-muted-foreground"
                )}
                style={{ transitionDelay: `${index * 100 + 200}ms` }}
              >
                <h4 className="font-semibold">{step.title}</h4>
                <p className="text-sm mt-1">{step.subtitle}</p>
                <span className="inline-block mt-2 px-3 py-1 rounded-full text-xs bg-primary/10 text-primary font-medium">
                  {step.duration}
                </span>
              </div>
            ))}
          </div>

          {/* Active Step Details */}
          <div
            className={cn(
              "max-w-2xl mx-auto p-8 rounded-2xl bg-background border border-border shadow-lg text-center transition-all duration-500",
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            )}
          >
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              {(() => {
                const Icon = steps[activeStep].icon;
                return <Icon className="w-6 h-6 text-primary" />;
              })()}
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">
              Step {activeStep + 1}: {steps[activeStep].title}
            </h3>
            <p className="text-muted-foreground">{steps[activeStep].description}</p>
          </div>
        </div>

        {/* Timeline - Mobile */}
        <div className="lg:hidden space-y-6">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div
                key={index}
                className={cn(
                  "flex gap-4 transition-all duration-500",
                  isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"
                )}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                {/* Icon & Line */}
                <div className="flex flex-col items-center">
                  <div
                    className={cn(
                      "w-12 h-12 rounded-full flex items-center justify-center shrink-0",
                      "bg-primary text-primary-foreground shadow-lg shadow-primary/30"
                    )}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  {index < steps.length - 1 && (
                    <div className="w-0.5 h-full bg-border my-2" />
                  )}
                </div>

                {/* Content */}
                <div className="pb-6">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-semibold text-foreground">{step.title}</h4>
                    <span className="px-2 py-0.5 rounded-full text-xs bg-primary/10 text-primary font-medium">
                      {step.duration}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">{step.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Process;
