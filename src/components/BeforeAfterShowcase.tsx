import { useState } from "react";
import { BeforeAfterSlider } from "./BeforeAfterSlider";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import portfolioBedroom from "@/assets/portfolio-bedroom.jpg";
import portfolioKitchen from "@/assets/portfolio-kitchen.jpg";
import portfolioOffice from "@/assets/portfolio-office.jpg";

const transformations = [
  {
    id: 1,
    title: "Master Bedroom Makeover",
    location: "Jamshedpur",
    beforeImage: portfolioOffice,
    afterImage: portfolioBedroom,
    description: "Complete transformation from dated to contemporary luxury",
  },
  {
    id: 2,
    title: "Kitchen Renovation",
    location: "Kolkata",
    beforeImage: portfolioBedroom,
    afterImage: portfolioKitchen,
    description: "Modern minimalist kitchen with smart storage solutions",
  },
  {
    id: 3,
    title: "Office Space Upgrade",
    location: "Jamshedpur",
    beforeImage: portfolioKitchen,
    afterImage: portfolioOffice,
    description: "Professional workspace designed for productivity",
  },
];

export const BeforeAfterShowcase = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? transformations.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === transformations.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className="py-16 md:py-24 lg:py-32 bg-muted/30 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-64 md:w-96 h-64 md:h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-64 md:w-96 h-64 md:h-96 bg-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-10 md:mb-16">
          <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary text-sm font-medium rounded-full mb-4">
            Transformations
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            See the <span className="text-primary">Difference</span>
          </h2>
          <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto">
            Drag the slider to witness the remarkable transformations we've achieved for our clients
          </p>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-6 lg:gap-12 items-start">
          {/* Slider */}
          <div className="lg:col-span-2 relative">
            <BeforeAfterSlider
              beforeImage={transformations[activeIndex].beforeImage}
              afterImage={transformations[activeIndex].afterImage}
              className="shadow-2xl"
            />
            
            {/* Navigation Arrows - Mobile */}
            <button
              onClick={handlePrev}
              className="lg:hidden absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-background/80 backdrop-blur-sm shadow-lg z-10"
              aria-label="Previous transformation"
            >
              <ChevronLeft className="w-5 h-5 text-foreground" />
            </button>
            <button
              onClick={handleNext}
              className="lg:hidden absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-background/80 backdrop-blur-sm shadow-lg z-10"
              aria-label="Next transformation"
            >
              <ChevronRight className="w-5 h-5 text-foreground" />
            </button>
            
            {/* Project Info */}
            <div className="mt-4 md:mt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 md:gap-4">
              <div>
                <h3 className="text-lg md:text-xl font-semibold text-foreground">
                  {transformations[activeIndex].title}
                </h3>
                <p className="text-muted-foreground text-sm md:text-base">
                  {transformations[activeIndex].location}
                </p>
              </div>
              <p className="text-sm text-muted-foreground max-w-xs">
                {transformations[activeIndex].description}
              </p>
            </div>

            {/* Mobile Dots */}
            <div className="flex justify-center gap-2 mt-4 lg:hidden">
              {transformations.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={cn(
                    "w-2.5 h-2.5 rounded-full transition-all duration-300",
                    activeIndex === index
                      ? "bg-primary w-6"
                      : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                  )}
                  aria-label={`View transformation ${index + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Thumbnails - Desktop */}
          <div className="hidden lg:flex lg:flex-col gap-4">
            <h4 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-2">
              More Projects
            </h4>
            {transformations.map((item, index) => (
              <button
                key={item.id}
                onClick={() => setActiveIndex(index)}
                className={cn(
                  "relative overflow-hidden rounded-lg transition-all duration-300",
                  "aspect-video",
                  "group focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background",
                  activeIndex === index
                    ? "ring-2 ring-primary shadow-lg"
                    : "opacity-60 hover:opacity-100"
                )}
              >
                <img
                  src={item.afterImage}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
                {/* Overlay */}
                <div
                  className={cn(
                    "absolute inset-0 bg-gradient-to-t from-background/80 to-transparent",
                    "flex items-end p-3 transition-opacity",
                    activeIndex === index ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                  )}
                >
                  <span className="text-xs font-medium text-foreground truncate">
                    {item.title}
                  </span>
                </div>
                {/* Active Indicator */}
                {activeIndex === index && (
                  <div className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full animate-pulse" />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
