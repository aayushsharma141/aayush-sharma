import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Portfolio from "@/components/Portfolio";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import FixedSocialBar from "@/components/FixedSocialBar";

const Index = () => {
  return (
    <>
      <Helmet>
        <title>Luxe Interiors | Award-Winning Interior Design Studio</title>
        <meta
          name="description"
          content="Transform your space with Luxe Interiors - an award-winning interior design studio specializing in residential and commercial spaces. Book your free consultation today."
        />
        <meta
          name="keywords"
          content="interior design, residential design, commercial design, luxury interiors, home design, space planning"
        />
      </Helmet>
      <FixedSocialBar />
      <main className="min-h-screen">
        <Navbar />
        <Hero />
        <Services />
        <Portfolio />
        <About />
        <Contact />
        <Footer />
      </main>
    </>
  );
};

export default Index;
