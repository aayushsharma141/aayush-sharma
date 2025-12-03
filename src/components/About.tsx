import { Award, Users, Clock, Sparkles } from "lucide-react";

const stats = [
  { icon: Award, value: "15+", label: "Years Experience" },
  { icon: Users, value: "500+", label: "Happy Clients" },
  { icon: Clock, value: "750+", label: "Projects Completed" },
  { icon: Sparkles, value: "25+", label: "Design Awards" },
];

const About = () => {
  return (
    <section id="about" className="py-24 bg-card">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div>
            <span className="text-primary font-medium tracking-wider uppercase text-sm">
              About Us
            </span>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-card-foreground mt-2 mb-6">
              Creating Spaces That Inspire
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
              feel. Every project we undertake is a collaboration, ensuring
              your space truly reflects who you are.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center mx-auto mb-3">
                    <stat.icon className="w-6 h-6 text-accent-foreground" />
                  </div>
                  <div className="font-serif text-2xl font-bold text-foreground">
                    {stat.value}
                  </div>
                  <div className="text-muted-foreground text-sm">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Image Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <div className="bg-primary/10 rounded-lg aspect-[4/5] flex items-center justify-center">
                <div className="text-center p-6">
                  <div className="font-serif text-5xl font-bold text-primary mb-2">15</div>
                  <div className="text-muted-foreground">Years of Excellence</div>
                </div>
              </div>
              <div className="bg-secondary rounded-lg aspect-square flex items-center justify-center">
                <div className="text-center p-6">
                  <Sparkles className="w-12 h-12 text-secondary-foreground mx-auto mb-2" />
                  <div className="text-secondary-foreground font-medium">Award Winning</div>
                </div>
              </div>
            </div>
            <div className="space-y-4 pt-8">
              <div className="bg-accent rounded-lg aspect-square flex items-center justify-center">
                <div className="text-center p-6">
                  <Users className="w-12 h-12 text-accent-foreground mx-auto mb-2" />
                  <div className="text-foreground font-medium">Expert Team</div>
                </div>
              </div>
              <div className="bg-primary rounded-lg aspect-[4/5] flex items-center justify-center">
                <div className="text-center p-6">
                  <div className="font-serif text-5xl font-bold text-primary-foreground mb-2">100%</div>
                  <div className="text-primary-foreground/80">Client Satisfaction</div>
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
