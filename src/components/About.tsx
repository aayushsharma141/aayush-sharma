import { Award, Users, Clock, Sparkles, ArrowRight, CheckCircle } from "lucide-react";
import FloatingParticles from "./FloatingParticles";
import useCountUp from "@/hooks/useCountUp";

const stats = [
  { icon: Award, value: 15, suffix: "+", label: "Years Experience" },
  { icon: Users, value: 500, suffix: "+", label: "Happy Clients" },
  { icon: Clock, value: 750, suffix: "+", label: "Projects Completed" },
  { icon: Sparkles, value: 25, suffix: "+", label: "Design Awards" },
];

const features = [
  "Personalized Design Approach",
  "Premium Material Selection",
  "On-Time Project Delivery",
  "Post-Completion Support",
];

const StatCard = ({ 
  stat, 
  index 
}: { 
  stat: typeof stats[0]; 
  index: number;
}) => {
  const { count, ref } = useCountUp(stat.value, { duration: 2000, delay: index * 200 });

  return (
    <div 
      ref={ref}
      className={`group bg-primary-foreground/5 backdrop-blur-sm border border-primary-foreground/10 rounded-2xl p-8 hover:shadow-2xl hover:shadow-primary/20 transition-all duration-500 hover:-translate-y-2 hover:border-primary/30 cursor-pointer ${index % 2 === 1 ? 'mt-8' : ''}`}
    >
      <div className="w-14 h-14 bg-primary/20 rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary group-hover:scale-110 transition-all duration-500">
        <stat.icon className="w-7 h-7 text-primary group-hover:text-primary-foreground transition-colors" />
      </div>
      <div className="font-serif text-4xl md:text-5xl font-bold text-primary mb-2">
        {count}{stat.suffix}
      </div>
      <div className="text-primary-foreground/60 font-medium">
        {stat.label}
      </div>
    </div>
  );
};

const About = () => {
  return (
    <section id="about" className="py-32 relative overflow-hidden">
      {/* Dark overlay matching hero */}
      <div className="absolute inset-0 bg-gradient-to-br from-foreground/95 via-foreground/90 to-foreground/95 z-0" />
      
      {/* Interactive Floating Particles */}
      <FloatingParticles count={18} />
      
      {/* Decorative Background */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/10 to-transparent z-[1]" />
      <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl z-[1]" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          {/* Content */}
          <div>
            <span className="inline-block text-primary font-medium tracking-[0.2em] uppercase text-sm mb-4 border-b-2 border-primary pb-2">
              About Us
            </span>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mt-4 mb-8 leading-tight">
              Creating Spaces <br />
              <span className="text-primary">That Inspire</span>
            </h2>
            <p className="text-primary-foreground/70 text-lg leading-relaxed mb-6">
              Welcome to Crossangle Interior, a premier interior design studio
              where creativity meets craftsmanship. Our team of passionate designers 
              brings together diverse expertise in residential, commercial, and 
              hospitality design.
            </p>
            <p className="text-primary-foreground/70 text-lg leading-relaxed mb-8">
              We believe that great design is about more than aesthetics—it's
              about creating environments that enhance how you live, work, and
              feel.
            </p>

            {/* Feature List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center gap-3 group cursor-pointer">
                  <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                    <CheckCircle className="w-4 h-4 text-primary group-hover:text-primary-foreground transition-colors" />
                  </div>
                  <span className="text-primary-foreground font-medium group-hover:text-primary transition-colors">{feature}</span>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <button className="group inline-flex items-center gap-3 bg-primary text-primary-foreground px-8 py-4 rounded-full font-medium hover:shadow-lg hover:shadow-primary/25 transition-all duration-300 hover:-translate-y-1">
              Learn More About Us
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Stats Grid */}
          <div className="relative">
            {/* Background Shape */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/15 via-transparent to-primary/10 rounded-3xl transform rotate-3 z-0" />
            
            <div className="relative grid grid-cols-2 gap-6 p-8 z-10">
              {stats.map((stat, index) => (
                <StatCard key={index} stat={stat} index={index} />
              ))}
            </div>

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
