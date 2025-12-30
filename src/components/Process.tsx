import { useState, useEffect, useRef, useLayoutEffect } from "react";
import { Home, Ruler, Palette, Hammer, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    icon: Home,
    title: "Consult",
    subtitle: "Free Meeting",
    duration: "1-2 days",
    description: "Share your vision with our expert designers",
    details: [
      "Understanding your lifestyle & space usage",
      "Budget & timeline alignment discussion",
      "On-site or virtual meeting options",
      "Initial concept sketches shared"
    ]
  },
  {
    icon: Ruler,
    title: "Measure & Plan",
    subtitle: "Blueprint",
    duration: "3-5 days",
    description: "Precise measurements and detailed planning",
    details: [
      "Professional site survey & measurements",
      "Structural assessment & feasibility",
      "Space optimization strategies",
      "Material selection guidance"
    ]
  },
  {
    icon: Palette,
    title: "Design Approval",
    subtitle: "3D Views",
    duration: "7-10 days",
    description: "Review realistic 3D visualizations before execution",
    details: [
      "Photorealistic 3D renders of your space",
      "Multiple design options to choose from",
      "Material & finish samples provided",
      "Revisions until you're satisfied"
    ]
  },
  {
    icon: Hammer,
    title: "Execute",
    subtitle: "Quality Craftsmanship",
    duration: "30-45 days",
    description: "Expert craftsmen bring your design to life",
    details: [
      "Skilled craftsmen & quality materials",
      "Regular progress updates & site visits",
      "Strict quality control checkpoints",
      "Timeline adherence & milestone reviews"
    ]
  },
  {
    icon: CheckCircle2,
    title: "Handover",
    subtitle: "Final Reveal",
    duration: "1 day",
    description: "Walk through your transformed space",
    details: [
      "Complete walkthrough of finished space",
      "Quality assurance inspection",
      "Warranty documentation provided",
      "Post-project support available"
    ]
  },
];

// Desktop scroll-driven component
const DesktopProcess = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: "+=2500",
        pin: true,
        scrub: 0.5,
        onUpdate: (self) => {
          const progress = self.progress;
          const stepIndex = Math.min(
            Math.floor(progress * steps.length),
            steps.length - 1
          );
          setActiveStep(stepIndex);
          setScrollProgress(progress);
        }
      });
    }, section);

    return () => ctx.revert();
  }, []);

  const currentStep = steps[activeStep];
  const Icon = currentStep.icon;

  return (
    <section
      id="process"
      ref={sectionRef}
      className="min-h-screen relative overflow-hidden bg-muted/30"
    >
      {/* Progress Bar */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-border z-20">
        <div 
          className="h-full bg-primary transition-none"
          style={{ width: `${scrollProgress * 100}%` }}
        />
      </div>

      <div className="container mx-auto px-4 py-24 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-primary text-sm uppercase tracking-[0.3em] font-medium">
            How We Work
          </span>
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-foreground mt-4">
            Our Design Process
          </h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            Scroll to explore each step of your interior transformation journey
          </p>
        </div>

        {/* Timeline */}
        <div className="relative flex justify-between items-center mb-16 px-8">
          {/* Background Line */}
          <div className="absolute top-1/2 left-8 right-8 h-1 bg-border -translate-y-1/2 rounded-full" />
          
          {/* Progress Line */}
          <div
            className="absolute top-1/2 left-8 h-1 bg-primary -translate-y-1/2 rounded-full transition-none"
            style={{ width: `${Math.min(scrollProgress * 100, 100) * 0.85}%` }}
          />

          {/* Step Icons */}
          {steps.map((step, index) => {
            const StepIcon = step.icon;
            const isActive = index <= activeStep;
            const isCurrent = index === activeStep;

            return (
              <div key={index} className="relative z-10 flex flex-col items-center">
                <div
                  className={cn(
                    "w-16 h-16 rounded-full flex items-center justify-center transition-all duration-500",
                    isActive
                      ? "bg-primary text-primary-foreground shadow-lg"
                      : "bg-background border-2 border-border text-muted-foreground",
                    isCurrent && "scale-125 ring-4 ring-primary/30"
                  )}
                  style={{
                    boxShadow: isActive ? '0 0 30px hsl(var(--primary) / 0.4)' : undefined
                  }}
                >
                  <StepIcon className="w-7 h-7" />
                </div>
                
                {/* Step Label */}
                <div className={cn(
                  "mt-4 text-center transition-all duration-300",
                  isCurrent ? "opacity-100" : "opacity-60"
                )}>
                  <h4 className={cn(
                    "font-semibold text-sm",
                    isActive ? "text-foreground" : "text-muted-foreground"
                  )}>
                    {step.title}
                  </h4>
                  <span className={cn(
                    "inline-block mt-1 px-2 py-0.5 rounded-full text-xs font-medium border",
                    isActive 
                      ? "bg-primary/10 text-primary border-primary/20" 
                      : "bg-muted text-muted-foreground border-border"
                  )}>
                    {step.duration}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Rich Detail Card */}
        <div 
          key={activeStep}
          className="max-w-3xl mx-auto p-8 rounded-2xl bg-background border border-primary/20 shadow-xl animate-fade-in"
        >
          {/* Step Header */}
          <div className="flex items-center gap-4 mb-6">
            <div className="w-14 h-14 rounded-full bg-primary flex items-center justify-center shadow-lg">
              <Icon className="w-7 h-7 text-primary-foreground" />
            </div>
            <div>
              <span className="text-sm text-primary font-medium uppercase tracking-wider">
                Step {activeStep + 1} of {steps.length}
              </span>
              <h3 className="text-2xl font-serif font-bold text-foreground">{currentStep.title}</h3>
            </div>
            <span className="ml-auto px-4 py-2 rounded-full bg-primary/10 text-primary font-medium border border-primary/20">
              {currentStep.duration}
            </span>
          </div>

          {/* Description */}
          <p className="text-muted-foreground mb-6 text-lg">{currentStep.description}</p>

          {/* Rich Details List */}
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {currentStep.details.map((detail, i) => (
              <li 
                key={i}
                className="flex items-start gap-3 p-3 rounded-lg bg-muted/50"
              >
                <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <span className="text-foreground">{detail}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Scroll Hint */}
        <div className="text-center mt-8 text-muted-foreground text-sm animate-pulse">
          {activeStep < steps.length - 1 ? (
            <span>↓ Scroll to continue</span>
          ) : (
            <span>✓ Process complete — continue scrolling</span>
          )}
        </div>
      </div>
    </section>
  );
};

// Mobile component with natural scroll and improved animations
const MobileProcess = () => {
  const [visibleSteps, setVisibleSteps] = useState<Set<number>>(new Set());
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    stepRefs.current.forEach((ref, index) => {
      if (!ref) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisibleSteps(prev => new Set([...prev, index]));
          }
        },
        { threshold: 0.2, rootMargin: "0px 0px -50px 0px" }
      );

      observer.observe(ref);
      observers.push(observer);
    });

    return () => observers.forEach(obs => obs.disconnect());
  }, []);

  return (
    <section
      id="process"
      className="py-16 md:py-20 relative overflow-hidden bg-muted/30"
    >
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-10 md:mb-12">
          <span className="text-primary text-sm uppercase tracking-[0.3em] font-medium">
            How We Work
          </span>
          <h2 className="text-2xl md:text-4xl font-serif font-bold text-foreground mt-4">
            Our Design Process
          </h2>
          <p className="text-muted-foreground mt-4 max-w-xl mx-auto text-sm md:text-base">
            From concept to completion, we guide you through every step
          </p>
        </div>

        {/* Mobile Timeline */}
        <div className="space-y-4 md:space-y-6">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isVisible = visibleSteps.has(index);

            return (
              <div
                key={index}
                ref={el => stepRefs.current[index] = el}
                className={cn(
                  "flex gap-4 transition-all duration-700 ease-out",
                  isVisible 
                    ? "opacity-100 translate-y-0" 
                    : "opacity-0 translate-y-8"
                )}
                style={{ transitionDelay: `${index * 50}ms` }}
              >
                {/* Icon & Line */}
                <div className="flex flex-col items-center">
                  <div className={cn(
                    "w-11 h-11 md:w-12 md:h-12 rounded-full flex items-center justify-center shadow-lg shrink-0 transition-all duration-500",
                    isVisible ? "bg-primary text-primary-foreground scale-100" : "bg-muted text-muted-foreground scale-90"
                  )}>
                    <Icon className="w-5 h-5" />
                  </div>
                  {index < steps.length - 1 && (
                    <div className={cn(
                      "w-0.5 flex-1 my-2 min-h-[40px] transition-all duration-700",
                      isVisible ? "bg-primary/40" : "bg-border"
                    )} />
                  )}
                </div>

                {/* Content Card */}
                <div className="flex-1 pb-2">
                  <div className={cn(
                    "p-4 md:p-5 rounded-xl bg-background border shadow-md transition-all duration-500",
                    isVisible ? "border-primary/30 shadow-primary/5" : "border-border"
                  )}>
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="font-semibold text-foreground text-base md:text-lg">{step.title}</h4>
                      <span className="px-2 py-0.5 rounded-full text-xs bg-primary/10 text-primary font-medium border border-primary/20">
                        {step.duration}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">{step.description}</p>
                    
                    {/* Details */}
                    <ul className="space-y-2">
                      {step.details.map((detail, i) => (
                        <li 
                          key={i} 
                          className={cn(
                            "flex items-start gap-2 text-sm transition-all duration-500",
                            isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"
                          )}
                          style={{ transitionDelay: `${(index * 100) + (i * 75)}ms` }}
                        >
                          <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                          <span className="text-foreground">{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

// Main Process component - switches between desktop and mobile
const Process = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return isMobile ? <MobileProcess /> : <DesktopProcess />;
};

export default Process;
