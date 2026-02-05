import { Helmet } from "react-helmet-async";
import { useState, useCallback } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FixedSocialBar from "@/components/FixedSocialBar";
import ScrollToTop from "@/components/ScrollToTop";

// Gallery-specific components
import GalleryHero from "@/components/gallery/GalleryHero";
import MagneticFilterTabs from "@/components/gallery/MagneticFilterTabs";
import GalleryMasonryGrid from "@/components/gallery/GalleryMasonryGrid";
import GalleryLightbox from "@/components/gallery/GalleryLightbox";
import CursorSpotlight from "@/components/gallery/CursorSpotlight";
import GalleryScrollIndicator from "@/components/gallery/GalleryScrollIndicator";
import GalleryCTA from "@/components/gallery/GalleryCTA";
import GalleryParticles from "@/components/gallery/GalleryParticles";

const categories = [
  "All",
  "Modular-Kitchen",
  "Bedroom-Interior",
  "Living-Room-Interior",
  "Commercial-Interior",
  "Exterior-Interior"
];

const galleryItems = [
  { 
    category: "Modular-Kitchen", 
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?q=80&w=1200",
    title: "Modern Minimalist Kitchen"
  },
  { 
    category: "Modular-Kitchen", 
    image: "https://images.unsplash.com/photo-1556909172-54557c7e4fb7?q=80&w=1200",
    title: "Luxury White Kitchen"
  },
  { 
    category: "Modular-Kitchen", 
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200",
    title: "Contemporary Kitchen Design"
  },
  { 
    category: "Modular-Kitchen", 
    image: "https://images.unsplash.com/photo-1565538810643-b5bdb714032a?q=80&w=1200",
    title: "Scandinavian Kitchen"
  },
  { 
    category: "Bedroom-Interior", 
    image: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?q=80&w=1200",
    title: "Master Bedroom Suite"
  },
  { 
    category: "Bedroom-Interior", 
    image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?q=80&w=1200",
    title: "Cozy Modern Bedroom"
  },
  { 
    category: "Bedroom-Interior", 
    image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1200",
    title: "Minimalist Sleep Space"
  },
  { 
    category: "Bedroom-Interior", 
    image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=1200",
    title: "Luxury Master Suite"
  },
  { 
    category: "Living-Room-Interior", 
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=1200",
    title: "Contemporary Living Space"
  },
  { 
    category: "Living-Room-Interior", 
    image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1200",
    title: "Open Plan Living"
  },
  { 
    category: "Living-Room-Interior", 
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1200",
    title: "Modern Family Room"
  },
  { 
    category: "Living-Room-Interior", 
    image: "https://images.unsplash.com/photo-1560448204-603b3fc33ddc?q=80&w=1200",
    title: "Elegant Lounge Area"
  },
  { 
    category: "Commercial-Interior", 
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1200",
    title: "Modern Office Space"
  },
  { 
    category: "Commercial-Interior", 
    image: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?q=80&w=1200",
    title: "Creative Workspace"
  },
  { 
    category: "Commercial-Interior", 
    image: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=1200",
    title: "Executive Meeting Room"
  },
  { 
    category: "Commercial-Interior", 
    image: "https://images.unsplash.com/photo-1604328698692-f76ea9498e76?q=80&w=1200",
    title: "Retail Store Design"
  },
  { 
    category: "Exterior-Interior", 
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1200",
    title: "Modern Villa Exterior"
  },
  { 
    category: "Exterior-Interior", 
    image: "https://images.unsplash.com/photo-1600607687644-aac4c3eac7f4?q=80&w=1200",
    title: "Contemporary Home Facade"
  },
  { 
    category: "Exterior-Interior", 
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1200",
    title: "Luxury House Exterior"
  },
  { 
    category: "Exterior-Interior", 
    image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=1200",
    title: "Modern Architecture"
  }
];

const GalleryPage = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const filteredItems = activeCategory === "All"
    ? galleryItems
    : galleryItems.filter(item => item.category === activeCategory);

  // Calculate counts for each category
  const categoryCounts = categories.reduce((acc, category) => {
    acc[category] = category === "All" 
      ? galleryItems.length 
      : galleryItems.filter(item => item.category === category).length;
    return acc;
  }, {} as Record<string, number>);

  const handleItemClick = useCallback((index: number) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
  }, []);

  const handleNavigate = useCallback((direction: 'prev' | 'next') => {
    setCurrentImageIndex(prev => {
      if (direction === 'prev') {
        return prev > 0 ? prev - 1 : prev;
      } else {
        return prev < filteredItems.length - 1 ? prev + 1 : prev;
      }
    });
  }, [filteredItems.length]);

  const handleIndexChange = useCallback((index: number) => {
    setCurrentImageIndex(index);
  }, []);

  return (
    <>
      <Helmet>
        <title>Our Works | Cross Angle Interior - Portfolio Gallery</title>
        <meta
          name="description"
          content="Browse our portfolio of stunning interior design projects including modular kitchens, bedrooms, living rooms, commercial spaces, and exteriors."
        />
        <meta property="og:title" content="Portfolio Gallery | Cross Angle Interior" />
        <meta property="og:description" content="Browse our portfolio of stunning interior design projects." />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://crossangleinterior.com/gallery" />
      </Helmet>

      <CursorSpotlight>
        <GalleryParticles />
        <GalleryScrollIndicator />
        
        <main className="min-h-screen relative z-10">
          <FixedSocialBar />
          <Navbar />

          {/* Immersive Hero */}
          <GalleryHero />

          {/* Magnetic Filter Tabs */}
          <MagneticFilterTabs
            categories={categories}
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
            counts={categoryCounts}
          />

          {/* Masonry Gallery Grid */}
          <GalleryMasonryGrid
            items={filteredItems}
            onItemClick={handleItemClick}
          />

          {/* CTA Section */}
          <GalleryCTA />

          {/* Lightbox */}
          <GalleryLightbox
            isOpen={lightboxOpen}
            currentIndex={currentImageIndex}
            items={filteredItems}
            onClose={() => setLightboxOpen(false)}
            onNavigate={handleNavigate}
            onIndexChange={handleIndexChange}
          />

          <Footer />
          <ScrollToTop />
        </main>
      </CursorSpotlight>
    </>
  );
};

export default GalleryPage;
