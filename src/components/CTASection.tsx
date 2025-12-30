import { Phone, MessageCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const CTASection = () => {
  return (
    <section className="py-24 md:py-32 relative overflow-hidden">
      {/* Background with gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-foreground via-foreground/95 to-foreground z-0" />
      
      {/* Decorative elements */}
      <div className="absolute top-10 left-10 w-64 h-64 border border-primary/10 rounded-full z-[1]" />
      <div className="absolute bottom-10 right-10 w-48 h-48 border border-primary/10 rounded-full z-[1]" />
      <div className="absolute top-1/2 left-1/4 w-32 h-32 bg-primary/5 rounded-full blur-3xl z-[1]" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-serif font-bold text-background mb-6">
            Ready to Transform Your Space?
          </h2>
          <p className="text-background/70 text-lg md:text-xl mb-8 max-w-2xl mx-auto">
            Get a free consultation and 3D design visualization.
            <span className="block mt-2 text-primary font-medium">
              No obligation. No hidden costs.
            </span>
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-10">
            <Link to="/contact-us">
              <Button
                size="lg"
                className="text-lg px-8 py-6 shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 transition-all duration-300 group"
              >
                Schedule Free Consultation
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <a
              href="https://wa.me/917909041132?text=Hi!%20I'm%20interested%20in%20your%20interior%20design%20services."
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                size="lg"
                variant="outline"
                className="bg-transparent border-background/30 text-background hover:bg-background hover:text-foreground text-lg px-8 py-6 group transition-all duration-300"
              >
                <MessageCircle className="mr-2 h-5 w-5" />
                WhatsApp Us
              </Button>
            </a>
          </div>

          {/* Contact Info */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-background/60">
            <a
              href="tel:+917909041132"
              className="flex items-center gap-2 hover:text-primary transition-colors"
            >
              <Phone className="w-5 h-5" />
              <span>+91 7909041132</span>
            </a>
            <span className="hidden sm:block w-1.5 h-1.5 rounded-full bg-primary" />
            <span>WhatsApp Available 24/7</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
