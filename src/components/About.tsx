import { Award, Users, Clock, Sparkles, ArrowRight, CheckCircle } from "lucide-react";
import FloatingParticles from "./FloatingParticles";

const stats = [
  { icon: Award, value: "15+", label: "Years Experience" },
  { icon: Users, value: "500+", label: "Happy Clients" },
  { icon: Clock, value: "750+", label: "Projects Completed" },
  { icon: Sparkles, value: "25+", label: "Design Awards" },
];

const features = [
  "Personalized Design Approach",
  "Premium Material Selection",
  "On-Time Project Delivery",
  "Post-Completion Support",
];

const About = () => {
  return (
    <section id="about" className="py-32 bg-card relative overflow-hidden">
      {/* Interactive Floating Particles */}
      <FloatingParticles count={18} />
      
      {/* Decorative Background */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/5 to-transparent" />
      <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          {/* Content */}
          <div>
            <span className="inline-block text-primary font-medium tracking-[0.2em] uppercase text-sm mb-4 border-b-2 border-primary pb-2">
              About Us
            </span>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-card-foreground mt-4 mb-8 leading-tight">
              Creating Spaces <br />
              <span className="text-primary">That Inspire</span>
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-6">
              Welcome to Crossangle Interior, a premier interior design studio
              where creativity meets craftsmanship. Our team of passionate designers 
              brings together diverse expertise in residential, commercial, and 
              hospitality design.
            </p>
            <p className="text-muted-foreground text-lg leading-relaxed mb-8">
              We believe that great design is about more than aesthetics—it's
              about creating environments that enhance how you live, work, and
              feel.
            </p>

            {/* Feature List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center gap-3 group">
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary transition-colors duration-300">
                    <CheckCircle className="w-4 h-4 text-primary group-hover:text-primary-foreground transition-colors" />
                  </div>
                  <span className="text-foreground font-medium">{feature}</span>
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
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-primary/5 rounded-3xl transform rotate-3" />
            
            <div className="relative grid grid-cols-2 gap-6 p-8">
              {stats.map((stat, index) => (
                <div 
                  key={index} 
                  className={`group bg-background rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 cursor-pointer ${index % 2 === 1 ? 'mt-8' : ''}`}
                >
                  <div className="w-14 h-14 bg-accent rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary group-hover:scale-110 transition-all duration-500">
                    <stat.icon className="w-7 h-7 text-accent-foreground group-hover:text-primary-foreground transition-colors" />
                  </div>
                  <div className="font-serif text-4xl md:text-5xl font-bold text-primary mb-2">
                    {stat.value}
                  </div>
                  <div className="text-muted-foreground font-medium">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Floating Badge */}
            <div className="absolute -bottom-6 -right-6 bg-primary text-primary-foreground px-6 py-4 rounded-2xl shadow-xl animate-[float_3s_ease-in-out_infinite]">
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
