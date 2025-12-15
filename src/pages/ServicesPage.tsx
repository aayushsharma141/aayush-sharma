import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FixedSocialBar from "@/components/FixedSocialBar";
import FloatingParticles from "@/components/FloatingParticles";
import { Button } from "@/components/ui/button";
import { Building2, Home, Trees, MessageSquare, Key, Box, Check } from "lucide-react";

const services = [
  {
    icon: Building2,
    title: "Planning",
    description: "We are a team of passionate people. We plan creative and inspirational design, catering the need of the client."
  },
  {
    icon: Home,
    title: "Interior",
    description: "We create creative interior design using the available space in the best possible way."
  },
  {
    icon: Trees,
    title: "Exterior",
    description: "We transform the exterior that reflects the personality of the residents and workspace."
  },
  {
    icon: MessageSquare,
    title: "Consultation",
    description: "Our team of experts provide the best possible consultation as per your requirements."
  },
  {
    icon: Key,
    title: "Turnkey Project",
    description: "We are a team of passionate people. We provide end-to-end services to our clients!"
  },
  {
    icon: Box,
    title: "Miniature Model",
    description: "We are competent in providing 3-Dimensions miniature model services to our clients."
  }
];

const whyChooseUs = [
  "Best Design",
  "Professional Team",
  "Modern Design",
  "Fast Delivery",
  "Affordable Pricing",
  "After Sales Support",
  "High Quality Materials"
];

const ServicesPage = () => {
  return (
    <>
      <Helmet>
        <title>Our Services | Cross Angle Interior - Interior Design Services</title>
        <meta
          name="description"
          content="Explore our comprehensive interior design services including planning, interior design, exterior design, consultation, turnkey projects, and 3D miniature models."
        />
      </Helmet>
      <FloatingParticles count={30} />
      <main className="min-h-screen relative z-10">
        <FixedSocialBar />
        <Navbar />

        {/* Hero Section */}
        <section className="pt-32 pb-12 bg-gradient-to-b from-background to-accent/5">
          <div className="container mx-auto px-4 text-center">
            <span className="text-primary font-medium tracking-wider uppercase text-sm">Our Services</span>
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mt-2 mb-4">
              What We Do
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Comprehensive interior design solutions tailored to your unique style and requirements
            </p>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <div
                  key={index}
                  className="bg-card p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 group border border-border hover:border-primary/30"
                >
                  <div className="w-16 h-16 bg-muted rounded-lg flex items-center justify-center mb-6 group-hover:bg-primary/10 transition-colors">
                    <service.icon className="w-8 h-8 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                  <h3 className="font-serif text-xl font-semibold text-foreground mb-3">{service.title}</h3>
                  <p className="text-muted-foreground">{service.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-20 bg-card">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <span className="text-primary font-medium tracking-wider uppercase text-sm">Why Choose Us?</span>
                <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mt-2 mb-8">
                  We Deliver Excellence
                </h2>
                <div className="space-y-4">
                  {whyChooseUs.map((item, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                        <Check className="w-4 h-4 text-primary-foreground" />
                      </div>
                      <span className="text-foreground">{item}</span>
                    </div>
                  ))}
                </div>
                <Button size="lg" className="mt-8">Get A Quote</Button>
              </div>
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=800"
                  alt="Modern interior design"
                  className="rounded-2xl shadow-2xl w-full"
                />
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-primary">
          <div className="container mx-auto px-4 text-center">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
              Ready to Transform Your Space?
            </h2>
            <p className="text-primary-foreground/80 text-lg mb-8 max-w-2xl mx-auto">
              Contact us today for a free consultation and let's bring your vision to life.
            </p>
            <Button size="lg" variant="secondary">
              Start Your Project
            </Button>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
};

export default ServicesPage;
