import { Award, Users, Clock, Sparkles, ArrowRight, CheckCircle } from "lucide-react";
import FloatingParticles from "./FloatingParticles";
import useCountUp from "@/hooks/useCountUp";

const stats = [
  { icon: Award, value: 150, suffix: "+", label: "Clients" },
  { icon: Users, value: 210, suffix: "+", label: "Projects" },
  { icon: Sparkles, value: 9, suffix: "+", label: "Awards" },
  { icon: Clock, value: 18, suffix: "+", label: "Years" },
];

const features = [
  "Personalized Design Approach",
  "Premium Material Selection",
  "On-Time Project Delivery",
  "Post-Completion Support",
];

const StatCard = ({ stat, index }: { stat: typeof stats[0]; index: number }) => {
  const { count, ref } = useCountUp(stat.value, { duration: 2000, delay: index * 150 });

  return (
    <div
      ref={ref}
      className="flex-shrink-0 w-[140px] md:w-auto snap-center md:snap-none group backdrop-blur-xl bg-primary-foreground/5 border border-primary-foreground/20 rounded-2xl p-4 md:p-6 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/10 transition-all duration-500"
    >
      <div className="w-10 h-10 md:w-12 md:h-12 bg-primary/20 rounded-xl flex items-center justify-center mb-3 md:mb-4 group-hover:bg-primary group-hover:scale-110 transition-all duration-500">
        <stat.icon className="w-5 h-5 md:w-6 md:h-6 text-primary group-hover:text-primary-foreground transition-colors" />
      </div>
      <div className="font-serif text-3xl md:text-4xl font-bold text-primary mb-1">
        {count}{stat.suffix}
      </div>
      <div className="text-primary-foreground/60 font-medium text-sm md:text-base">
        {stat.label}
      </div>
    </div>
  );
};

const About = () => {
  return (
    <section id="about" className="py-20 md:py-32 relative overflow-hidden">
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-foreground/95 via-foreground/90 to-foreground/95 z-0" />
      
      <FloatingParticles count={18} />
      
      {/* Decorative Background */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/10 to-transparent z-[1]" />
      <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl z-[1]" />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Horizontal Stats - Glassmorphism cards */}
        <div className="mb-16 md:mb-20">
          {/* Mobile: Horizontal scroll */}
          <div className="flex md:hidden gap-4 overflow-x-auto snap-x snap-mandatory pb-4 -mx-4 px-4 scrollbar-hide">
            {stats.map((stat, index) => (
              <StatCard key={index} stat={stat} index={index} />
            ))}
          </div>
          
          {/* Desktop: Grid */}
          <div className="hidden md:grid grid-cols-4 gap-6 max-w-4xl mx-auto">
            {stats.map((stat, index) => (
              <StatCard key={index} stat={stat} index={index} />
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Content */}
          <div>
            <span className="inline-block text-primary font-medium tracking-[0.2em] uppercase text-sm mb-4 border-b-2 border-primary pb-2">
              About Us
            </span>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground mt-4 mb-6 md:mb-8 leading-tight">
              Creating Spaces <br />
              <span className="text-primary">That Inspire</span>
            </h2>
            <p className="text-primary-foreground/70 text-base md:text-lg leading-relaxed mb-4 md:mb-6">
              Welcome to Crossangle Interior, a premier interior design studio
              where creativity meets craftsmanship. Our team of passionate designers 
              brings together diverse expertise in residential, commercial, and 
              hospitality design.
            </p>
            <p className="text-primary-foreground/70 text-base md:text-lg leading-relaxed mb-6 md:mb-8">
              We believe that great design is about more than aesthetics—it's
              about creating environments that enhance how you live, work, and
              feel.
            </p>

            {/* Feature List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4 mb-8 md:mb-10">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center gap-3 group cursor-pointer">
                  <div className="w-5 h-5 md:w-6 md:h-6 rounded-full bg-primary/20 flex items-center justify-center group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                    <CheckCircle className="w-3 h-3 md:w-4 md:h-4 text-primary group-hover:text-primary-foreground transition-colors" />
                  </div>
                  <span className="text-primary-foreground font-medium text-sm md:text-base group-hover:text-primary transition-colors">
                    {feature}
                  </span>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <button className="group inline-flex items-center gap-3 bg-primary text-primary-foreground px-6 md:px-8 py-3 md:py-4 rounded-full font-medium hover:shadow-lg hover:shadow-primary/25 transition-all duration-300 hover:-translate-y-1 text-sm md:text-base">
              Learn More About Us
              <ArrowRight className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Visual Element */}
          <div className="relative hidden lg:block">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/15 via-transparent to-primary/10 rounded-3xl transform rotate-3 z-0" />
            
            {/* Floating Badge */}
            <div className="absolute -bottom-6 -right-6 bg-primary text-primary-foreground px-6 py-4 rounded-2xl shadow-xl animate-[float_3s_ease-in-out_infinite] z-20">
              <div className="flex items-center gap-3">
                <Sparkles className="w-6 h-6" />
                <div>
                  <div className="font-bold text-lg">Award</div>
                  <div className="text-primary-foreground/80 text-sm">Winning Studio</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
