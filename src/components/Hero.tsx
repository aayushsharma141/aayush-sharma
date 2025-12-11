import { ArrowRight, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-interior.jpg";
import WaterRippleEffect from "./WaterRippleEffect";
import SocialButtons from "./SocialButtons";

const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Water Ripple Mouse Effect */}
      <WaterRippleEffect />

      {/* Social Media Buttons */}
      <div className="fixed left-6 top-1/2 -translate-y-1/2 z-50 hidden lg:block">
        <SocialButtons />
      </div>
      
      {/* Background Image with Parallax Effect */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="Luxurious modern living room interior design"
          className="w-full h-full object-cover scale-110 animate-[scale-down_20s_ease-out_forwards]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/90 via-foreground/60 to-foreground/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/40 via-transparent to-transparent" />
      </div>

      {/* Floating Decorative Elements */}
      <div className="absolute top-20 right-20 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-40 right-40 w-48 h-48 bg-primary/5 rounded-full blur-2xl animate-[pulse_3s_ease-in-out_infinite]" />

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10 pt-20">
        <div className="max-w-3xl">
          <span className="inline-block text-primary font-medium mb-6 tracking-[0.3em] uppercase text-sm animate-fade-in border border-primary/30 px-4 py-2 rounded-full backdrop-blur-sm">
            ✦ Premier Interior Design Studio ✦
          </span>
          <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold text-primary-foreground leading-[1.1] mb-8 animate-fade-in [animation-delay:200ms]">
            Elevate Your Space
            <span className="block text-primary mt-2 relative">
              Into Luxury
              <svg className="absolute -bottom-2 left-0 w-full h-3 text-primary/30" viewBox="0 0 200 12" fill="none">
                <path d="M0 6C50 6 50 2 100 2C150 2 150 10 200 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" className="animate-[draw_1s_ease-out_forwards_1s]" />
              </svg>
            </span>
          </h1>
          <p className="text-primary-foreground/90 text-xl md:text-2xl mb-10 leading-relaxed font-light animate-fade-in [animation-delay:400ms]">
            Transforming your vision into exquisite living spaces with innovative
            and personalized interior design solutions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 animate-fade-in [animation-delay:600ms]">
            <Button size="lg" className="group text-lg px-8 py-6 shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all duration-500">
              Start Your Project
              <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-2" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="bg-primary-foreground/10 backdrop-blur-sm border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground hover:text-foreground text-lg px-8 py-6 group transition-all duration-500"
            >
              <Play className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
              Watch Showreel
            </Button>
          </div>

          {/* Trust Badges */}
          <div className="mt-16 flex items-center gap-8 animate-fade-in [animation-delay:800ms]">
            <div className="flex -space-x-3">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="w-12 h-12 rounded-full bg-primary/20 border-2 border-primary-foreground/20 backdrop-blur-sm flex items-center justify-center text-primary-foreground/70 text-sm font-medium">
                  {i === 4 ? "99+" : "★"}
                </div>
              ))}
            </div>
            <div className="text-primary-foreground/80">
              <div className="font-semibold">500+ Happy Clients</div>
              <div className="text-sm text-primary-foreground/60">Trusted by luxury homeowners</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-fade-in [animation-delay:1000ms]">
        <div className="flex flex-col items-center gap-2 text-primary-foreground/50">
          <span className="text-xs tracking-widest uppercase">Scroll</span>
          <div className="w-6 h-10 border-2 border-primary-foreground/30 rounded-full flex justify-center pt-2">
            <div className="w-1.5 h-3 bg-primary rounded-full animate-bounce" />
          </div>
        </div>
      </div>

      {/* Side Accent */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 hidden lg:flex flex-col gap-4 pr-6 z-10">
        {["01", "02", "03"].map((num, i) => (
          <div 
            key={num} 
            className={`w-12 h-12 rounded-full border flex items-center justify-center text-sm font-medium transition-all duration-300 cursor-pointer hover:scale-110 ${i === 0 ? 'border-primary bg-primary text-primary-foreground' : 'border-primary-foreground/20 text-primary-foreground/50 hover:border-primary hover:text-primary'}`}
          >
            {num}
          </div>
        ))}
      </div>
    </section>
  );
};

export default Hero;
