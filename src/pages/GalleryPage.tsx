import { Helmet } from "react-helmet-async";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FixedSocialBar from "@/components/FixedSocialBar";
import FloatingParticles from "@/components/FloatingParticles";
import { cn } from "@/lib/utils";

const categories = [
  "All",
  "Modular-Kitchen",
  "Bedroom-Interior",
  "Living-Room-Interior",
  "Commercial-Interior",
  "Exterior-Interior"
];

const galleryItems = [
  { category: "Modular-Kitchen", image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?q=80&w=600" },
  { category: "Modular-Kitchen", image: "https://images.unsplash.com/photo-1556909172-54557c7e4fb7?q=80&w=600" },
  { category: "Modular-Kitchen", image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=600" },
  { category: "Bedroom-Interior", image: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?q=80&w=600" },
  { category: "Bedroom-Interior", image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?q=80&w=600" },
  { category: "Bedroom-Interior", image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=600" },
  { category: "Living-Room-Interior", image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=600" },
  { category: "Living-Room-Interior", image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=600" },
  { category: "Living-Room-Interior", image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=600" },
  { category: "Commercial-Interior", image: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=600" },
  { category: "Commercial-Interior", image: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?q=80&w=600" },
  { category: "Commercial-Interior", image: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=600" },
  { category: "Exterior-Interior", image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=600" },
  { category: "Exterior-Interior", image: "https://images.unsplash.com/photo-1600607687644-aac4c3eac7f4?q=80&w=600" },
  { category: "Exterior-Interior", image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=600" }
];

const GalleryPage = () => {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredItems = activeCategory === "All"
    ? galleryItems
    : galleryItems.filter(item => item.category === activeCategory);

  return (
    <>
      <Helmet>
        <title>Our Works | Cross Angle Interior - Portfolio Gallery</title>
        <meta
          name="description"
          content="Browse our portfolio of stunning interior design projects including modular kitchens, bedrooms, living rooms, commercial spaces, and exteriors."
        />
      </Helmet>
      <FloatingParticles count={30} />
      <main className="min-h-screen relative z-10">
        <FixedSocialBar />
        <Navbar />

        {/* Hero Section */}
        <section className="pt-32 pb-12 bg-gradient-to-b from-background to-accent/5">
          <div className="container mx-auto px-4 text-center">
            <span className="text-primary font-medium tracking-wider uppercase text-sm">Our Portfolio</span>
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mt-2 mb-4">
              Our Works
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Explore our collection of beautifully designed spaces
            </p>
          </div>
        </section>

        {/* Filter Buttons */}
        <section className="py-8 bg-background">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap justify-center gap-4">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={cn(
                    "px-6 py-3 rounded-full border transition-all duration-300",
                    activeCategory === category
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-background text-foreground border-border hover:border-primary/50"
                  )}
                >
                  {category.replace(/-/g, " ")}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Gallery Grid */}
        <section className="py-12 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredItems.map((item, index) => (
                <div
                  key={index}
                  className="group relative aspect-[4/3] rounded-xl overflow-hidden cursor-pointer"
                >
                  <img
                    src={item.image}
                    alt={item.category}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <span className="text-white font-medium">{item.category.replace(/-/g, " ")}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
};

export default GalleryPage;
