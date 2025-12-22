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
    <section id="contact" className="py-24 bg-background relative overflow-hidden">
      {/* Interactive Floating Particles */}
      <FloatingParticles count={12} />
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-primary font-medium tracking-wider uppercase text-sm">
            Get In Touch
          </span>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mt-2 mb-4">
            Start Your Design Journey
          </h2>
          <p className="text-muted-foreground text-lg">
            Ready to transform your space? Contact us today for a free
            consultation and let's bring your vision to life.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Form */}
          <div className="bg-card p-8 rounded-xl shadow-lg">
            <h3 className="font-serif text-2xl font-semibold text-card-foreground mb-6">
              Send Us a Message
            </h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-foreground mb-2">
                    First Name
                  </label>
                  <Input id="firstName" placeholder="John" required />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-foreground mb-2">
                    Last Name
                  </label>
                  <Input id="lastName" placeholder="Doe" required />
                </div>
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                  Email Address
                </label>
                <Input id="email" type="email" placeholder="john@example.com" required />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-2">
                  Phone Number
                </label>
                <Input id="phone" type="tel" placeholder="+1 (555) 000-0000" />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                  Tell Us About Your Project
                </label>
                <Textarea
                  id="message"
                  placeholder="Describe your project, timeline, and any specific requirements..."
                  rows={5}
                  required
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
                <div key={index} className="flex gap-4">
                  <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center flex-shrink-0">
                    <info.icon className="w-6 h-6 text-accent-foreground" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">
                      {info.title}
                    </h4>
                    {info.details.map((detail, i) => (
                      <p key={i} className="text-muted-foreground text-sm">
                        {detail}
                      </p>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Consultation CTA */}
            <div className="relative bg-gradient-to-br from-primary/10 via-accent/5 to-primary/10 rounded-xl overflow-hidden border border-border p-8">
              <div className="absolute top-4 right-4">
                <Sparkles className="w-8 h-8 text-primary/40" />
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">🏠</span>
                </div>
                <h4 className="font-serif text-xl font-semibold text-foreground mb-2">
                  Ready to Transform Your Space?
                </h4>
                <p className="text-muted-foreground text-sm mb-6 max-w-sm mx-auto">
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
