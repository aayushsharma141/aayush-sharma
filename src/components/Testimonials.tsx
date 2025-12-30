import { useState, useEffect, useRef } from "react";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface Testimonial {
  id: number;
  name: string;
  role: string;
  project?: string;
  review: string;
  rating: number;
  image?: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Priya Sharma",
    role: "Homeowner",
    project: "3BHK Apartment, Jamshedpur",
    review: "Crossangle Interior transformed our home beyond our expectations. Their attention to detail and creative vision made our space truly luxurious.",
    rating: 5,
  },
  {
    id: 2,
    name: "Rajesh Kumar",
    role: "Business Owner",
    project: "Corporate Office, Kolkata",
    review: "The team delivered an exceptional office design that perfectly reflects our brand identity. Professional, timely, and incredibly talented.",
    rating: 5,
  },
  {
    id: 3,
    name: "Anita Desai",
    role: "Apartment Owner",
    project: "2BHK Renovation, Jamshedpur",
    review: "From concept to completion, the entire experience was seamless. They understood our vision and executed it flawlessly.",
    rating: 5,
  },
  {
    id: 4,
    name: "Vikram Singh",
    role: "Restaurant Owner",
    project: "Cafe Interior, Kolkata",
    review: "Our restaurant's new interior has received countless compliments. Crossangle truly understands commercial spaces.",
    rating: 4,
  },
];

const AnimatedStars = ({ rating, isVisible }: { rating: number; isVisible: boolean }) => {
  const [animatedRating, setAnimatedRating] = useState(0);

  useEffect(() => {
    if (isVisible) {
      let current = 0;
      const interval = setInterval(() => {
        current += 0.5;
        setAnimatedRating(Math.min(current, rating));
        if (current >= rating) clearInterval(interval);
      }, 100);
      return () => clearInterval(interval);
    }
  }, [isVisible, rating]);

  return (
    <div className="flex gap-1" role="img" aria-label={`${rating} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={cn(
            "w-4 h-4 md:w-5 md:h-5 transition-all duration-300",
            animatedRating >= star
              ? "text-primary fill-primary scale-110"
              : "text-muted-foreground/30"
          )}
          style={{ transitionDelay: `${star * 100}ms` }}
        />
      ))}
    </div>
  );
};

const Testimonials = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isPaused]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    setIsPaused(true);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (diff > 50) {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    } else if (diff < -50) {
      setActiveIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
    }
    setTimeout(() => setIsPaused(false), 3000);
  };

  const goNext = () => setActiveIndex((prev) => (prev + 1) % testimonials.length);
  const goPrev = () => setActiveIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));

  return (
    <section
      id="testimonials"
      ref={sectionRef}
      className="py-20 md:py-32 relative overflow-hidden"
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-foreground/90 via-foreground/85 to-foreground/95 z-0" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <span className="text-primary text-sm uppercase tracking-[0.3em] font-medium">
            Client Reviews
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-background mt-4">
            What Our Clients Say
          </h2>
          <p className="text-background/60 mt-4 max-w-2xl mx-auto text-sm md:text-base">
            Real experiences from homeowners and businesses who trusted us
          </p>
        </div>

        {/* Featured Testimonial with Swipe */}
        <div
          className="max-w-4xl mx-auto mb-8 md:mb-12"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <div
            className={cn(
              "relative p-6 md:p-10 rounded-2xl md:rounded-3xl backdrop-blur-lg",
              "bg-background/5 border border-background/10",
              "transition-all duration-700",
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            )}
          >
            <Quote className="absolute top-4 left-4 md:top-6 md:left-6 w-8 h-8 md:w-12 md:h-12 text-primary/20" />

            {/* Navigation Arrows - Desktop */}
            <button
              onClick={goPrev}
              className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background/10 hover:bg-primary/20 items-center justify-center transition-colors"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-5 h-5 text-background" />
            </button>
            <button
              onClick={goNext}
              className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background/10 hover:bg-primary/20 items-center justify-center transition-colors"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-5 h-5 text-background" />
            </button>

            <div className="relative z-10 md:px-12">
              <AnimatedStars rating={testimonials[activeIndex].rating} isVisible={isVisible} />

              <p className="text-lg md:text-xl lg:text-2xl text-background/90 mt-4 md:mt-6 leading-relaxed italic">
                "{testimonials[activeIndex].review}"
              </p>

              <div className="mt-6 md:mt-8 flex items-center gap-4">
                {/* Avatar with gradient initial */}
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                  <span className="text-primary-foreground font-bold text-lg md:text-xl">
                    {testimonials[activeIndex].name.charAt(0)}
                  </span>
                </div>
                <div>
                  <h4 className="text-background font-semibold text-sm md:text-base">
                    {testimonials[activeIndex].name}
                  </h4>
                  <p className="text-background/60 text-xs md:text-sm">
                    {testimonials[activeIndex].role}
                  </p>
                  {testimonials[activeIndex].project && (
                    <p className="text-primary text-xs mt-0.5">
                      {testimonials[activeIndex].project}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Swipe hint for mobile */}
            <p className="md:hidden text-center text-background/40 text-xs mt-4">
              Swipe to see more reviews
            </p>
          </div>
        </div>

        {/* Navigation Dots */}
        <div className="flex justify-center gap-2 md:gap-3 mb-8">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={cn(
                "w-2.5 h-2.5 md:w-3 md:h-3 rounded-full transition-all duration-300",
                activeIndex === index
                  ? "bg-primary w-6 md:w-8"
                  : "bg-background/30 hover:bg-background/50"
              )}
              aria-label={`View testimonial ${index + 1}`}
            />
          ))}
        </div>

        {/* Google Reviews Badge */}
        <div
          className={cn(
            "flex justify-center transition-all duration-700",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          )}
          style={{ transitionDelay: "300ms" }}
        >
          <a
            href="https://g.page/crossangle-interior/review"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-4 md:px-6 py-2.5 md:py-3 rounded-full bg-background/10 border border-background/20 hover:bg-background/15 transition-colors"
          >
            <span className="text-xl md:text-2xl font-bold text-background">G</span>
            <div className="text-left">
              <div className="flex items-center gap-1">
                <span className="text-primary font-bold text-sm md:text-base">4.8</span>
                <span className="text-background/60 text-sm">/5.0</span>
                <div className="flex gap-0.5 ml-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="w-2.5 h-2.5 md:w-3 md:h-3 text-primary fill-primary" />
                  ))}
                </div>
              </div>
              <p className="text-[10px] md:text-xs text-background/50">Based on 50+ Google reviews</p>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
