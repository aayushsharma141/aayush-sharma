import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FixedSocialBar from "@/components/FixedSocialBar";
import FloatingParticles from "@/components/FloatingParticles";
import ScrollToTop from "@/components/ScrollToTop";
import ServicesHero from "@/components/services/ServicesHero";
import ServicesGrid from "@/components/services/ServicesGrid";
import ServicesProcess from "@/components/services/ServicesProcess";
import ServicesWhyUs from "@/components/services/ServicesWhyUs";
import ServicesCTA from "@/components/services/ServicesCTA";

const ServicesPage = () => {
  return (
    <>
      <Helmet>
        <title>Our Services | Cross Angle Interior - Interior Design Services</title>
        <meta
          name="description"
          content="Explore our comprehensive interior design services including planning, interior design, exterior design, consultation, turnkey projects, and 3D miniature models."
        />
        <meta property="og:title" content="Interior Design Services | Cross Angle Interior" />
        <meta property="og:description" content="Comprehensive interior design services including planning, consultation, and turnkey projects." />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://crossangleinterior.com/services" />
      </Helmet>
      
      <FloatingParticles count={25} />
      
      <main className="min-h-screen relative z-10">
        <FixedSocialBar />
        <Navbar />
        
        {/* Immersive Hero */}
        <ServicesHero />
        
        {/* Services Grid with 3D Cards */}
        <ServicesGrid />
        
        {/* Why Choose Us */}
        <ServicesWhyUs />
        
        {/* Process Steps */}
        <ServicesProcess />
        
        {/* CTA Section */}
        <ServicesCTA />
        
        <Footer />
        <ScrollToTop />
      </main>
    </>
  );
};

export default ServicesPage;
