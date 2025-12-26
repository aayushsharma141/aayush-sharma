import { useState, useEffect, useRef } from "react";
import { Star, Quote } from "lucide-react";
import { cn } from "@/lib/utils";

interface Testimonial {
  id: number;
  name: string;
  role: string;
  review: string;
  rating: number;
  image?: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Priya Sharma",
    role: "Homeowner",
    review: "Crossangle Interior transformed our home beyond our expectations. Their attention to detail and creative vision made our space truly luxurious.",
    rating: 5,
  },
  {
    id: 2,
    name: "Rajesh Kumar",
    role: "Business Owner",
    review: "The team delivered an exceptional office design that perfectly reflects our brand identity. Professional, timely, and incredibly talented.",
    rating: 5,
  },
  {
    id: 3,
    name: "Anita Desai",
    role: "Apartment Owner",
    review: "From concept to completion, the entire experience was seamless. They understood our vision and executed it flawlessly.",
    rating: 5,
  },
  {
    id: 4,
    name: "Vikram Singh",
    role: "Restaurant Owner",
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
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={cn(
            "w-5 h-5 transition-all duration-300",
            animatedRating >= star
              ? "text-primary fill-primary scale-110"
              : "text-muted-foreground/30"
          )}
          style={{
            transitionDelay: `${star * 100}ms`,
            transform: animatedRating >= star ? "scale(1.1)" : "scale(1)",
          }}
        />
      ))}
    </div>
  );
};

const Testimonials = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="testimonials"
      ref={sectionRef}
      className="py-24 md:py-32 relative overflow-hidden"
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-foreground/90 via-foreground/85 to-foreground/95 z-0" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-primary text-sm uppercase tracking-[0.3em] font-medium">
            Client Reviews
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-background mt-4">
            What Our Clients Say
          </h2>
          <p className="text-background/60 mt-4 max-w-2xl mx-auto">
            Real experiences from homeowners and businesses who trusted us with their spaces
          </p>
        </div>

        {/* Featured Testimonial */}
        <div className="max-w-4xl mx-auto mb-12">
          <div
            className={cn(
              "relative p-8 md:p-12 rounded-3xl backdrop-blur-lg",
              "bg-background/5 border border-background/10",
              "transition-all duration-700",
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            )}
          >
            <Quote className="absolute top-6 left-6 w-12 h-12 text-primary/30" />

            <div className="relative z-10">
              <AnimatedStars
                rating={testimonials[activeIndex].rating}
                isVisible={isVisible}
              />

              <p className="text-xl md:text-2xl text-background/90 mt-6 leading-relaxed italic">
                "{testimonials[activeIndex].review}"
              </p>

              <div className="mt-8 flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-primary/20 flex items-center justify-center">
                  <span className="text-primary font-bold text-lg">
                    {testimonials[activeIndex].name.charAt(0)}
                  </span>
                </div>
                <div>
                  <h4 className="text-background font-semibold">
                    {testimonials[activeIndex].name}
                  </h4>
                  <p className="text-background/60 text-sm">
                    {testimonials[activeIndex].role}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Dots */}
        <div className="flex justify-center gap-3">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={cn(
                "w-3 h-3 rounded-full transition-all duration-300",
                activeIndex === index
                  ? "bg-primary w-8"
                  : "bg-background/30 hover:bg-background/50"
              )}
              aria-label={`View testimonial ${index + 1}`}
            />
          ))}
        </div>

        {/* All Reviews Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              className={cn(
                "p-6 rounded-2xl backdrop-blur-lg",
                "bg-background/5 border border-background/10",
                "hover:bg-background/10 hover:border-primary/30",
                "transition-all duration-500 cursor-pointer group",
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              )}
              style={{ transitionDelay: `${index * 150}ms` }}
              onClick={() => setActiveIndex(index)}
            >
              <AnimatedStars rating={testimonial.rating} isVisible={isVisible} />

              <p className="text-background/70 mt-4 text-sm line-clamp-3 group-hover:text-background/90 transition-colors">
                "{testimonial.review}"
              </p>

              <div className="mt-4 pt-4 border-t border-background/10">
                <h4 className="text-background font-medium text-sm">
                  {testimonial.name}
                </h4>
                <p className="text-background/50 text-xs">{testimonial.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
