import { motion } from "framer-motion";
import { Check, Award, Users, Zap, Shield, Heart, Sparkles } from "lucide-react";

const reasons = [
  { icon: Award, text: "Award-Winning Design" },
  { icon: Users, text: "Professional Team" },
  { icon: Sparkles, text: "Modern Aesthetics" },
  { icon: Zap, text: "Fast Delivery" },
  { icon: Shield, text: "Quality Guaranteed" },
  { icon: Heart, text: "After Sales Support" },
];

const ServicesWhyUs = () => {
  return (
    <section className="relative py-24 md:py-32 bg-background overflow-hidden">
      {/* Background accents */}
      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-bl from-primary/5 to-transparent" />
      <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-tr from-secondary/5 to-transparent" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-primary font-medium tracking-widest uppercase text-sm mb-4 block">
              Why Choose Us?
            </span>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-6">
              We Deliver{" "}
              <span className="text-primary">Excellence</span>
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-10">
              With years of experience and a passion for design, we bring your vision to life
              with precision and creativity.
            </p>

            {/* Reasons Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {reasons.map((reason, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="group flex items-center gap-4 p-4 rounded-xl bg-card/50 border border-border/50 hover:border-primary/30 hover:bg-card transition-all duration-300"
                >
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary transition-colors duration-300">
                    <reason.icon className="w-5 h-5 text-primary group-hover:text-primary-foreground transition-colors duration-300" />
                  </div>
                  <span className="text-foreground font-medium">{reason.text}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="relative rounded-3xl overflow-hidden aspect-[4/3]">
              <img
                src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=800"
                alt="Modern interior design showcase"
                className="w-full h-full object-cover"
              />
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
              
              {/* Floating stat card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="absolute bottom-6 left-6 right-6 p-6 rounded-2xl bg-card/90 backdrop-blur-md border border-border/50"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-3xl font-serif font-bold text-primary">500+</p>
                    <p className="text-muted-foreground text-sm">Projects Completed</p>
                  </div>
                  <div className="w-px h-12 bg-border" />
                  <div>
                    <p className="text-3xl font-serif font-bold text-primary">98%</p>
                    <p className="text-muted-foreground text-sm">Client Satisfaction</p>
                  </div>
                  <div className="w-px h-12 bg-border" />
                  <div>
                    <p className="text-3xl font-serif font-bold text-primary">15+</p>
                    <p className="text-muted-foreground text-sm">Years Experience</p>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 border-2 border-primary/20 rounded-3xl -z-10" />
            <div className="absolute -bottom-4 -left-4 w-32 h-32 border-2 border-secondary/20 rounded-3xl -z-10" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ServicesWhyUs;
