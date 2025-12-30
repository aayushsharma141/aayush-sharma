import { ArrowRight, Play, Sparkles, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-interior.jpg";
import WaterRippleEffect from "./WaterRippleEffect";
import FloatingParticles from "./FloatingParticles";
import VideoModal from "./VideoModal";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Hero = () => {
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });
    setTimeout(() => setIsVisible(true), 100);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Disable parallax on mobile for performance
  const parallaxBg = isMobile ? 0 : scrollY * 0.3;
  const parallaxContent = isMobile ? 0 : scrollY * 0.15;
  const opacity = Math.max(0, 1 - scrollY / 600);

  const handleScrollToServices = () => {
    document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Water Ripple Effect */}
      <WaterRippleEffect />

      {/* Background Image with optimized parallax */}
      <div 
        className="absolute inset-0 z-0"
        style={{ transform: `translateY(${parallaxBg}px)` }}
      >
        <img 
          src={heroImage} 
          alt="Luxurious modern living room interior design" 
          className="w-full h-full object-cover scale-105"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/95 via-foreground/70 to-foreground/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-foreground/20" />
      </div>

      {/* Reduced particles on mobile */}
      <FloatingParticles count={isMobile ? 8 : 12} className="z-[1]" />

      {/* Content */}
      <div 
        className="container mx-auto px-4 relative z-10 pt-20"
        style={{ 
          transform: `translateY(${-parallaxContent}px)`,
          opacity 
        }}
      >
        <div className="max-w-4xl mx-4 md:mx-[20px] px-2 md:px-[30px]">
          <div className={`transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
            <span className="inline-flex items-center gap-2 text-primary font-medium mb-6 tracking-[0.15em] md:tracking-[0.2em] uppercase text-xs md:text-sm border border-primary/30 px-3 md:px-4 py-2 rounded-full backdrop-blur-sm bg-primary/5">
              <Sparkles className="w-3 h-3 md:w-4 md:h-4" />
              Premier Interior Design Studio
              <Sparkles className="w-3 h-3 md:w-4 md:h-4" />
            </span>
          </div>
          
          <h1 className={`font-serif text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-primary-foreground leading-[1.1] mb-6 md:mb-8 transition-all duration-1000 delay-200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
            Elevate Your Space
            <span className="block mt-2 bg-gradient-to-r from-primary via-primary/80 to-primary bg-clip-text text-transparent">
              Into Luxury
            </span>
          </h1>
          
          <p className={`text-primary-foreground/85 text-lg md:text-xl lg:text-2xl mb-8 md:mb-10 leading-relaxed font-light max-w-2xl transition-all duration-1000 delay-400 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
            Transforming your vision into exquisite living spaces with innovative
            and personalized interior design solutions.
          </p>

          {/* CTA Buttons */}
          <div className={`flex flex-col sm:flex-row gap-3 md:gap-4 mb-10 md:mb-12 transition-all duration-1000 delay-600 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
            <Link to="/contact-us">
              <Button size="lg" className="w-full sm:w-auto group text-base md:text-lg px-6 md:px-8 py-5 md:py-6 shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 transition-all duration-500">
                Start Your Project
                <ArrowRight className="ml-2 h-4 w-4 md:h-5 md:w-5 transition-transform duration-300 group-hover:translate-x-2" />
              </Button>
            </Link>
            <Button 
              size="lg" 
              variant="outline" 
              onClick={() => setIsVideoOpen(true)} 
              className="w-full sm:w-auto bg-primary-foreground/5 backdrop-blur-md border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground hover:text-foreground text-base md:text-lg px-6 md:px-8 py-5 md:py-6 group transition-all duration-500"
            >
              <Play className="mr-2 h-4 w-4 md:h-5 md:w-5 group-hover:scale-110 transition-transform" />
              Watch Showreel
            </Button>
          </div>

          {/* Trust Badges */}
          <div className={`flex flex-wrap items-center gap-4 md:gap-8 transition-all duration-1000 delay-800 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
            <div className="flex -space-x-2 md:-space-x-3">
              {[1, 2, 3, 4].map(i => (
                <div 
                  key={i} 
                  className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-primary/20 border-2 border-primary-foreground/20 backdrop-blur-sm flex items-center justify-center text-primary-foreground/70 text-xs md:text-sm font-medium"
                >
                  {i === 4 ? "99+" : "★"}
                </div>
              ))}
            </div>
            <div className="text-primary-foreground/80">
              <div className="font-semibold text-base md:text-lg">500+ Happy Clients</div>
              <div className="text-xs md:text-sm text-primary-foreground/60">Trusted by homeowners</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <button 
        onClick={handleScrollToServices} 
        className="absolute bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 z-10 group cursor-pointer"
        style={{ opacity }}
      >
        <div className={`flex flex-col items-center gap-2 text-primary-foreground/50 transition-all duration-1000 delay-1200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          <span className="text-xs tracking-widest uppercase font-medium group-hover:text-primary transition-colors">
            Discover More
          </span>
          <div className="w-8 h-12 md:w-10 md:h-14 border-2 border-primary-foreground/30 rounded-full flex flex-col items-center justify-start pt-2 backdrop-blur-sm group-hover:border-primary group-hover:bg-primary/10 transition-all duration-300">
            <div className="w-1 h-2 md:w-1.5 md:h-3 bg-primary rounded-full animate-bounce" />
            <ChevronDown className="w-3 h-3 md:w-4 md:h-4 text-primary mt-1 animate-pulse" />
          </div>
        </div>
      </button>

      <VideoModal isOpen={isVideoOpen} onClose={() => setIsVideoOpen(false)} />
    </section>
  );
};

export default Hero;
