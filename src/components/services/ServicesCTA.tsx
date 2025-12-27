import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";

const ServicesCTA = () => {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/90 to-primary/80" />
      
      {/* Animated shapes */}
      <motion.div
        className="absolute top-1/4 -left-20 w-80 h-80 rounded-full bg-background/5 blur-3xl"
        animate={{
          x: [0, 30, 0],
          y: [0, -20, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-1/4 -right-20 w-80 h-80 rounded-full bg-background/5 blur-3xl"
        animate={{
          x: [0, -30, 0],
          y: [0, 20, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Grid pattern */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="h-full w-full" style={{
          backgroundImage: `linear-gradient(hsl(var(--primary-foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--primary-foreground)) 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center"
        >
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-6"
          >
            Ready to Transform
            <br />
            <span className="opacity-80">Your Space?</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-primary-foreground/80 text-lg md:text-xl mb-10 max-w-2xl mx-auto leading-relaxed"
          >
            Let's discuss your project and create something extraordinary together.
            Schedule a free consultation with our design experts.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button
              asChild
              size="lg"
              variant="secondary"
              className="group h-14 px-8 text-base rounded-full"
            >
              <Link to="/contact" className="flex items-center gap-2">
                Start Your Project
                <motion.span
                  className="inline-block"
                  whileHover={{ x: 4 }}
                >
                  <ArrowRight className="w-5 h-5" />
                </motion.span>
              </Link>
            </Button>

            <Button
              asChild
              size="lg"
              variant="outline"
              className="group h-14 px-8 text-base rounded-full border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
            >
              <a
                href="https://wa.me/919304aborrar?text=Hi%20Cross%20Angle%20Interior,%20I%20would%20like%20to%20discuss%20a%20project."
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                <MessageSquare className="w-5 h-5" />
                WhatsApp Us
              </a>
            </Button>
          </motion.div>

          {/* Trust indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-12 pt-8 border-t border-primary-foreground/10"
          >
            <p className="text-primary-foreground/60 text-sm">
              Free consultation • No obligations • Response within 24 hours
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesCTA;
