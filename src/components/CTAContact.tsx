import { Phone, MessageCircle, ArrowRight, MapPin, Mail, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";
import FloatingParticles from "./FloatingParticles";

const contactInfo = [
  {
    icon: MapPin,
    title: "Visit Us",
    details: ["Sakchi, Jamshedpur", "Jharkhand 831001"],
  },
  {
    icon: Phone,
    title: "Call Us",
    details: ["+91 7909041132"],
  },
  {
    icon: Mail,
    title: "Email Us",
    details: ["hello@crossangleinterior.com"],
  },
  {
    icon: Clock,
    title: "Working Hours",
    details: ["Mon - Sat: 10AM - 7PM"],
  },
];

const CTAContact = () => {
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message sent!",
      description: "We'll get back to you within 24 hours.",
    });
  };

  return (
    <section id="contact" className="py-20 md:py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-foreground via-foreground/95 to-foreground z-0" />
      
      {/* Decorative elements */}
      <div className="absolute top-10 left-10 w-48 md:w-64 h-48 md:h-64 border border-primary/10 rounded-full z-[1]" />
      <div className="absolute bottom-10 right-10 w-32 md:w-48 h-32 md:h-48 border border-primary/10 rounded-full z-[1]" />
      <div className="absolute top-1/2 left-1/4 w-24 md:w-32 h-24 md:h-32 bg-primary/5 rounded-full blur-3xl z-[1]" />
      
      <FloatingParticles count={10} />

      <div className="container mx-auto px-4 relative z-10">
        {/* CTA Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <span className="inline-block text-primary font-medium tracking-[0.2em] uppercase text-sm mb-4 border-b-2 border-primary pb-2">
            Get Started
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-serif font-bold text-background mb-4 md:mb-6">
            Ready to Transform Your Space?
          </h2>
          <p className="text-background/70 text-base md:text-lg lg:text-xl mb-6 max-w-2xl mx-auto">
            Get a free consultation and 3D design visualization.
            <span className="block mt-2 text-primary font-medium">
              No obligation. No hidden costs.
            </span>
          </p>

          {/* Quick Action Buttons */}
          <div className="flex flex-col sm:flex-row justify-center gap-3 md:gap-4 mb-8 md:mb-12">
            <Link to="/contact-us">
              <Button
                size="lg"
                className="text-base md:text-lg px-6 md:px-8 py-5 md:py-6 shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 transition-all duration-300 group w-full sm:w-auto"
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
                className="bg-transparent border-background/30 text-background hover:bg-background hover:text-foreground text-base md:text-lg px-6 md:px-8 py-5 md:py-6 group transition-all duration-300 w-full sm:w-auto"
              >
                <MessageCircle className="mr-2 h-5 w-5" />
                WhatsApp Us
              </Button>
            </a>
          </div>
        </div>

        {/* Contact Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          {/* Contact Form */}
          <div className="bg-background/5 backdrop-blur-sm border border-background/10 p-6 md:p-8 rounded-2xl">
            <h3 className="font-serif text-xl md:text-2xl font-semibold text-background mb-6">
              Send Us a Message
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-background mb-2">
                    First Name
                  </label>
                  <Input 
                    id="firstName" 
                    placeholder="John" 
                    required 
                    className="bg-background/5 border-background/20 text-background placeholder:text-background/40"
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-background mb-2">
                    Last Name
                  </label>
                  <Input 
                    id="lastName" 
                    placeholder="Doe" 
                    required 
                    className="bg-background/5 border-background/20 text-background placeholder:text-background/40"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-background mb-2">
                  Email Address
                </label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="john@example.com" 
                  required 
                  className="bg-background/5 border-background/20 text-background placeholder:text-background/40"
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-background mb-2">
                  Phone Number
                </label>
                <Input 
                  id="phone" 
                  type="tel" 
                  placeholder="+91 98765 43210" 
                  className="bg-background/5 border-background/20 text-background placeholder:text-background/40"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-background mb-2">
                  Tell Us About Your Project
                </label>
                <Textarea
                  id="message"
                  placeholder="Describe your project, timeline, and any specific requirements..."
                  rows={4}
                  required
                  className="bg-background/5 border-background/20 text-background placeholder:text-background/40"
                />
              </div>
              <Button type="submit" size="lg" className="w-full">
                Send Message
              </Button>
            </form>
          </div>

          {/* Contact Information */}
          <div className="space-y-6 md:space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
              {contactInfo.map((info, index) => (
                <div 
                  key={index} 
                  className="flex gap-4 group p-4 rounded-xl bg-background/5 border border-background/10 hover:border-primary/30 transition-all duration-300"
                >
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-primary/20 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                    <info.icon className="w-5 h-5 md:w-6 md:h-6 text-primary group-hover:text-primary-foreground transition-colors" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-background mb-1 group-hover:text-primary transition-colors text-sm md:text-base">
                      {info.title}
                    </h4>
                    {info.details.map((detail, i) => (
                      <p key={i} className="text-background/60 text-xs md:text-sm">
                        {detail}
                      </p>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Phone Quick Dial */}
            <div className="p-6 md:p-8 rounded-2xl bg-gradient-to-br from-primary/20 via-primary/10 to-primary/20 border border-primary/20">
              <div className="text-center">
                <h4 className="font-serif text-lg md:text-xl font-semibold text-background mb-2">
                  Prefer to Talk?
                </h4>
                <p className="text-background/60 text-sm mb-4">
                  Call us directly or send a WhatsApp message
                </p>
                <a
                  href="tel:+917909041132"
                  className="flex items-center justify-center gap-2 text-xl md:text-2xl font-bold text-primary hover:text-primary/80 transition-colors mb-4"
                >
                  <Phone className="w-5 h-5 md:w-6 md:h-6" />
                  +91 7909041132
                </a>
                <p className="text-background/50 text-xs md:text-sm">
                  WhatsApp Available 24/7
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTAContact;
