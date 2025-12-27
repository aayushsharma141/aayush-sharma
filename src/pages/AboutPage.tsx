import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FixedSocialBar from "@/components/FixedSocialBar";
import FloatingParticles from "@/components/FloatingParticles";
import { Button } from "@/components/ui/button";
import { Check, Award, Users, Target, Lightbulb } from "lucide-react";
import ScrollToTop from "@/components/ScrollToTop";

const values = [
  {
    icon: Target,
    title: "Client-Centric Approach",
    description: "Your vision drives everything we do. We listen, understand, and deliver spaces that exceed expectations."
  },
  {
    icon: Lightbulb,
    title: "Innovation & Creativity",
    description: "We blend cutting-edge design trends with timeless aesthetics to create unique, inspiring spaces."
  },
  {
    icon: Award,
    title: "Excellence in Execution",
    description: "Meticulous attention to detail and premium craftsmanship define every project we undertake."
  },
  {
    icon: Users,
    title: "Collaborative Partnership",
    description: "We work closely with you throughout the journey, ensuring transparency and seamless communication."
  }
];

const milestones = [
  { year: "2010", event: "Founded Cross Angle Interior in Jamshedpur" },
  { year: "2015", event: "Expanded to commercial interior design services" },
  { year: "2018", event: "Completed 100+ residential projects" },
  { year: "2020", event: "Launched turnkey project solutions" },
  { year: "2024", event: "Recognized as leading interior designer in Jharkhand" }
];

const AboutPage = () => {
  return (
    <>
      <Helmet>
        <title>About Us | Cross Angle Interior - Premier Interior Design Studio</title>
        <meta
          name="description"
          content="Learn about Cross Angle Interior - Jamshedpur's premier interior design studio. Over a decade of expertise transforming spaces into stunning, functional environments."
        />
      </Helmet>
      <FloatingParticles count={30} />
      <main className="min-h-screen relative z-10">
        <FixedSocialBar />
        <Navbar />
        
        {/* Hero Section */}
        <section className="pt-32 pb-20 bg-gradient-to-b from-background to-accent/5">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <span className="text-primary font-medium tracking-wider uppercase text-sm">About Us</span>
                <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mt-2 mb-6">
                  Cross Angle Interior
                </h1>
                <div className="w-20 h-1 bg-primary mb-6" />
                <p className="text-muted-foreground text-lg mb-6">
                  At Cross Angle Interior, we bring over a decade of expertise to every project, transforming spaces into stunning, functional environments. Based in Jamshedpur, our passion for design and attention to detail have earned us a reputation for excellence.
                </p>
                <p className="text-muted-foreground text-lg mb-8">
                  Whether residential or commercial, we tailor our designs to reflect your unique style and needs, ensuring a seamless blend of aesthetics and functionality.
                </p>
                <Button size="lg">Get A Quote</Button>
              </div>
              <div className="relative">
                <div className="aspect-video rounded-2xl overflow-hidden shadow-2xl">
                  <iframe
                    src="https://www.youtube.com/embed/gJMCIaI7nKg"
                    title="Best Interior designer Jamshedpur"
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Who We Are Section */}
        <section className="py-20 bg-card">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-primary font-medium tracking-wider uppercase text-sm">Our Story</span>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mt-2 mb-4">
                Who We Are
              </h2>
              <p className="text-muted-foreground text-lg">
                Founded with a passion for design and a commitment to excellence, our team of skilled designers combines innovative concepts with meticulous attention to detail.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <div
                  key={index}
                  className="bg-background p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 group"
                >
                  <div className="w-14 h-14 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                    <value.icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="font-semibold text-lg text-foreground mb-2">{value.title}</h3>
                  <p className="text-muted-foreground text-sm">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <span className="text-primary font-medium tracking-wider uppercase text-sm">Why Choose Us</span>
                <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mt-2 mb-6">
                  25 Years of Undefeated Success
                </h2>
                <p className="text-muted-foreground text-lg mb-8">
                  At Cross Angle Interior, we bring expertise to every project, transforming spaces into stunning, functional environments. Our passion for design and attention to detail have earned us a reputation for excellence.
                </p>
                <div className="space-y-4">
                  {[
                    "Best Design",
                    "Professional Team",
                    "Modern Design",
                    "Fast Delivery",
                    "Affordable Pricing",
                    "After Sales Support",
                    "High Quality Materials"
                  ].map((item, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                        <Check className="w-4 h-4 text-primary-foreground" />
                      </div>
                      <span className="text-foreground">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=800"
                  alt="Luxury interior design"
                  className="rounded-2xl shadow-2xl w-full"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="py-20 bg-card">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-primary font-medium tracking-wider uppercase text-sm">Our Journey</span>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mt-2 mb-4">
                Milestones
              </h2>
            </div>

            <div className="max-w-3xl mx-auto">
              {milestones.map((milestone, index) => (
                <div key={index} className="flex gap-6 mb-8 last:mb-0">
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold">
                      {milestone.year.slice(2)}
                    </div>
                    {index < milestones.length - 1 && <div className="w-0.5 h-full bg-primary/30 mt-2" />}
                  </div>
                  <div className="pb-8">
                    <span className="text-primary font-semibold">{milestone.year}</span>
                    <p className="text-foreground mt-1">{milestone.event}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <Footer />
        <ScrollToTop />
      </main>
    </>
  );
};

export default AboutPage;
