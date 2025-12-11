import { ArrowRight, Play, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-interior.jpg";
import WaterRippleEffect from "./WaterRippleEffect";
import FloatingParticles from "./FloatingParticles";
import { useEffect, useState } from "react";

const Hero = () => {
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    setTimeout(() => setIsVisible(true), 100);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const parallaxBg = scrollY * 0.5;
  const parallaxContent = scrollY * 0.2;
  const opacity = Math.max(0, 1 - scrollY / 600);

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Water Ripple Mouse Effect */}
      <WaterRippleEffect />

      {/* Background Image with Parallax Effect */}
      <div 
        className="absolute inset-0 z-0"
        style={{ transform: `translateY(${parallaxBg}px)` }}
      >
        <img
          src={heroImage}
          alt="Luxurious modern living room interior design"
          className="w-full h-full object-cover scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/95 via-foreground/70 to-foreground/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-foreground/20" />
      </div>

      {/* Floating Particles behind hero */}
      <FloatingParticles count={12} className="z-[1]" />

      {/* Content with Parallax */}
      <div 
        className="container mx-auto px-4 relative z-10 pt-20"
        style={{ 
          transform: `translateY(${-parallaxContent}px)`,
          opacity,
        }}
      >
        <div className="max-w-4xl">
          <div className={`transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
            <span className="inline-flex items-center gap-2 text-primary font-medium mb-6 tracking-[0.2em] uppercase text-sm border border-primary/30 px-4 py-2 rounded-full backdrop-blur-sm bg-primary/5">
              <Sparkles className="w-4 h-4" />
              Premier Interior Design Studio
              <Sparkles className="w-4 h-4" />
            </span>
          </div>
          
          <h1 className={`font-serif text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-primary-foreground leading-[1.05] mb-8 transition-all duration-1000 delay-200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
            Elevate Your Space
            <span className="block text-primary mt-2 relative">
              Into Luxury
              <svg className="absolute -bottom-2 left-0 w-64 h-3 text-primary/40" viewBox="0 0 200 12" fill="none">
                <path d="M0 6C50 6 50 2 100 2C150 2 150 10 200 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeDasharray="200" strokeDashoffset="200" className="animate-[draw_1.5s_ease-out_forwards_0.8s]" />
              </svg>
            </span>
          </h1>
          
          <p className={`text-primary-foreground/85 text-xl md:text-2xl mb-10 leading-relaxed font-light max-w-2xl transition-all duration-1000 delay-400 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
            Transforming your vision into exquisite living spaces with innovative
            and personalized interior design solutions.
          </p>

          {/* CTA Buttons */}
          <div className={`flex flex-col sm:flex-row gap-4 mb-12 transition-all duration-1000 delay-600 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
            <Button size="lg" className="group text-lg px-8 py-6 shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 transition-all duration-500 hover:-translate-y-1">
              Start Your Project
              <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-2" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="bg-primary-foreground/5 backdrop-blur-md border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground hover:text-foreground text-lg px-8 py-6 group transition-all duration-500 hover:-translate-y-1"
            >
              <Play className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
              Watch Showreel
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="bg-primary/10 backdrop-blur-md border-primary/40 text-primary hover:bg-primary hover:text-primary-foreground text-lg px-8 py-6 group transition-all duration-500 hover:-translate-y-1"
            >
              Free Consultation
            </Button>
          </div>

          {/* Trust Badges */}
          <div className={`flex flex-wrap items-center gap-8 transition-all duration-1000 delay-800 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
            <div className="flex -space-x-3">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="w-12 h-12 rounded-full bg-primary/20 border-2 border-primary-foreground/20 backdrop-blur-sm flex items-center justify-center text-primary-foreground/70 text-sm font-medium hover:scale-110 hover:z-10 transition-transform cursor-pointer">
                  {i === 4 ? "99+" : "★"}
                </div>
              ))}
            </div>
            <div className="text-primary-foreground/80">
              <div className="font-semibold text-lg">500+ Happy Clients</div>
              <div className="text-sm text-primary-foreground/60">Trusted by luxury homeowners worldwide</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div 
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        style={{ opacity }}
      >
        <div className={`flex flex-col items-center gap-2 text-primary-foreground/50 transition-all duration-1000 delay-1200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          <span className="text-xs tracking-widest uppercase font-medium">Discover More</span>
          <div className="w-7 h-12 border-2 border-primary-foreground/30 rounded-full flex justify-center pt-2 backdrop-blur-sm">
            <div className="w-1.5 h-3 bg-primary rounded-full animate-bounce" />
          </div>
        </div>
      </div>

      {/* Side Navigation Dots */}
      <div className="absolute right-6 top-1/2 -translate-y-1/2 hidden xl:flex flex-col gap-4 z-10">
        {["Home", "Services", "Portfolio"].map((label, i) => (
          <div key={label} className="group relative">
            <div 
              className={`w-3 h-3 rounded-full border-2 transition-all duration-300 cursor-pointer hover:scale-150 ${i === 0 ? 'border-primary bg-primary' : 'border-primary-foreground/30 hover:border-primary'}`}
            />
            <span className="absolute right-full mr-4 top-1/2 -translate-y-1/2 text-sm text-primary-foreground/60 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              {label}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Hero;
