import { MapPin, Phone, Mail, Clock, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import FloatingParticles from "./FloatingParticles";

const contactInfo = [
  {
    icon: MapPin,
    title: "Visit Us",
    details: ["123 Design District", "New York, NY 10001"],
  },
  {
    icon: Phone,
    title: "Call Us",
    details: ["+1 (555) 123-4567", "+1 (555) 987-6543"],
  },
  {
    icon: Mail,
    title: "Email Us",
    details: ["hello@crossangleinterior.com", "projects@crossangleinterior.com"],
  },
  {
    icon: Clock,
    title: "Working Hours",
    details: ["Mon - Fri: 9AM - 6PM", "Sat: 10AM - 4PM"],
  },
];

const Contact = () => {
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message sent!",
      description: "We'll get back to you within 24 hours.",
    });
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      {/* Dark overlay matching hero */}
      <div className="absolute inset-0 bg-gradient-to-t from-foreground/95 via-foreground/90 to-foreground/95 z-0" />
      
      {/* Interactive Floating Particles */}
      <FloatingParticles count={12} />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block text-primary font-medium tracking-[0.2em] uppercase text-sm mb-4 border-b-2 border-primary pb-2">
            Get In Touch
          </span>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-primary-foreground mt-2 mb-4">
            Start Your Design Journey
          </h2>
          <p className="text-primary-foreground/70 text-lg">
            Ready to transform your space? Contact us today for a free
            consultation and let's bring your vision to life.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Form */}
          <div className="bg-primary-foreground/5 backdrop-blur-sm border border-primary-foreground/10 p-8 rounded-xl shadow-lg">
            <h3 className="font-serif text-2xl font-semibold text-primary-foreground mb-6">
              Send Us a Message
            </h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-primary-foreground mb-2">
                    First Name
                  </label>
                  <Input 
                    id="firstName" 
                    placeholder="John" 
                    required 
                    className="bg-primary-foreground/5 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/40"
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-primary-foreground mb-2">
                    Last Name
                  </label>
                  <Input 
                    id="lastName" 
                    placeholder="Doe" 
                    required 
                    className="bg-primary-foreground/5 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/40"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-primary-foreground mb-2">
                  Email Address
                </label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="john@example.com" 
                  required 
                  className="bg-primary-foreground/5 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/40"
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-primary-foreground mb-2">
                  Phone Number
                </label>
                <Input 
                  id="phone" 
                  type="tel" 
                  placeholder="+1 (555) 000-0000" 
                  className="bg-primary-foreground/5 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/40"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-primary-foreground mb-2">
                  Tell Us About Your Project
                </label>
                <Textarea
                  id="message"
                  placeholder="Describe your project, timeline, and any specific requirements..."
                  rows={5}
                  required
                  className="bg-primary-foreground/5 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/40"
                />
              </div>
              <Button type="submit" size="lg" className="w-full">
                Send Message
              </Button>
            </form>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {contactInfo.map((info, index) => (
                <div 
                  key={index} 
                  className="flex gap-4 group p-4 rounded-xl hover:bg-primary-foreground/5 transition-all duration-300 cursor-pointer"
                >
                  <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                    <info.icon className="w-6 h-6 text-primary group-hover:text-primary-foreground transition-colors" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-primary-foreground mb-1 group-hover:text-primary transition-colors">
                      {info.title}
                    </h4>
                    {info.details.map((detail, i) => (
                      <p key={i} className="text-primary-foreground/60 text-sm">
                        {detail}
                      </p>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Consultation CTA */}
            <div className="relative bg-gradient-to-br from-primary/20 via-primary/10 to-primary/20 rounded-xl overflow-hidden border border-primary/20 p-8">
              <div className="absolute top-4 right-4">
                <Sparkles className="w-8 h-8 text-primary/40" />
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/30 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">🏠</span>
                </div>
                <h4 className="font-serif text-xl font-semibold text-primary-foreground mb-2">
                  Ready to Transform Your Space?
                </h4>
                <p className="text-primary-foreground/60 text-sm mb-6 max-w-sm mx-auto">
                  Schedule a free consultation with our design experts and bring your vision to life
                </p>
                <Button size="lg" className="w-full sm:w-auto px-8">
                  Book Free Consultation
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
