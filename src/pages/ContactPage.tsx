import { Helmet } from "react-helmet-async";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FixedSocialBar from "@/components/FixedSocialBar";
import FloatingParticles from "@/components/FloatingParticles";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { MapPin, Phone, Mail } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const projectTypes = [
  "Residential Interior",
  "Commercial Interior",
  "Office Space",
  "Retail / Showroom",
  "Café / Restaurant"
];

const areaOptions = [
  "Up to 1000 Sq. Ft.",
  "1000 - 3000 Sq. Ft.",
  "Above 3000 Sq. Ft."
];

const budgetOptions = [
  "Up to ₹5 Lakh",
  "₹5 Lakh - ₹10 Lakh",
  "Above ₹10 Lakh"
];

const projectStages = [
  "Just Planning",
  "Under Construction",
  "Ready for Interior Work",
  "Renovation Project"
];

const ContactPage = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    projectType: "",
    area: "",
    budget: "",
    city: "",
    projectStage: "",
    message: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message sent!",
      description: "We'll get back to you within 24 hours.",
    });
  };

  return (
    <>
      <Helmet>
        <title>Contact Us | Cross Angle Interior - Get A Quote</title>
        <meta
          name="description"
          content="Contact Cross Angle Interior for your interior design needs. Get a free quote and consultation for residential and commercial projects in Jamshedpur."
        />
      </Helmet>
      <FloatingParticles count={30} />
      <main className="min-h-screen relative z-10">
        <FixedSocialBar />
        <Navbar />

        {/* Contact Form Section */}
        <section className="pt-32 pb-20 bg-gradient-to-b from-background to-accent/5">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Form */}
              <div className="bg-card p-8 rounded-xl shadow-lg">
                <h1 className="font-serif text-3xl font-bold text-foreground mb-2">
                  Let's work together!
                </h1>
                <p className="text-primary text-lg mb-8">Fill out the form.</p>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Full Name
                      </label>
                      <Input
                        placeholder="Your name"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Phone Number
                      </label>
                      <Input
                        type="tel"
                        placeholder="+91 XXXXX XXXXX"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Email Address
                    </label>
                    <Input
                      type="email"
                      placeholder="your@email.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Type of Project
                      </label>
                      <Select onValueChange={(value) => setFormData({ ...formData, projectType: value })}>
                        <SelectTrigger>
                          <SelectValue placeholder="Choose an option" />
                        </SelectTrigger>
                        <SelectContent>
                          {projectTypes.map((type) => (
                            <SelectItem key={type} value={type}>{type}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Approx. Area
                      </label>
                      <Select onValueChange={(value) => setFormData({ ...formData, area: value })}>
                        <SelectTrigger>
                          <SelectValue placeholder="Choose an option" />
                        </SelectTrigger>
                        <SelectContent>
                          {areaOptions.map((area) => (
                            <SelectItem key={area} value={area}>{area}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Estimated Budget
                      </label>
                      <Select onValueChange={(value) => setFormData({ ...formData, budget: value })}>
                        <SelectTrigger>
                          <SelectValue placeholder="Choose an option" />
                        </SelectTrigger>
                        <SelectContent>
                          {budgetOptions.map((budget) => (
                            <SelectItem key={budget} value={budget}>{budget}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        City / Location
                      </label>
                      <Input
                        placeholder="Your city"
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Project Stage
                    </label>
                    <Select onValueChange={(value) => setFormData({ ...formData, projectStage: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Choose an option" />
                      </SelectTrigger>
                      <SelectContent>
                        {projectStages.map((stage) => (
                          <SelectItem key={stage} value={stage}>{stage}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Message
                    </label>
                    <Textarea
                      placeholder="Tell us about your project..."
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    />
                  </div>

                  <Button type="submit" size="lg" className="w-full">
                    Send Message
                  </Button>
                </form>
              </div>

              {/* Contact Info */}
              <div className="space-y-8">
                <div>
                  <h2 className="font-serif text-2xl font-bold text-foreground mb-6">
                    Get In Touch
                  </h2>
                  <div className="space-y-6">
                    <div className="flex gap-4 items-start">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Phone className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground mb-1">Call Now:</h4>
                        <p className="text-muted-foreground">+91 7909041132</p>
                        <p className="text-muted-foreground">+91 9304853659</p>
                      </div>
                    </div>

                    <div className="flex gap-4 items-start">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Mail className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground mb-1">Email:</h4>
                        <p className="text-muted-foreground">info@crossangleinterior.com</p>
                      </div>
                    </div>

                    <div className="flex gap-4 items-start">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <MapPin className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground mb-1">Location:</h4>
                        <p className="text-muted-foreground">
                          2-G, 2nd floor, Aditya Signature building,<br />
                          Dimna Rd, Mango, Jamshedpur,<br />
                          Jharkhand 831012
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Map */}
                <div className="rounded-xl overflow-hidden shadow-lg h-80">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3678.5!2d86.23!3d22.83!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjLCsDQ5JzQ4LjAiTiA4NsKwMTMnNDguMCJF!5e0!3m2!1sen!2sin!4v1234567890"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Cross Angle Interior Location"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
};

export default ContactPage;
