import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { LucideIcon, ArrowUpRight, Check, Clock } from "lucide-react";
import { useState, useRef, useCallback } from "react";
import { cn } from "@/lib/utils";

interface ServiceCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  features: string[];
  timeline: string;
  index: number;
  tags?: string[];
}

const ServiceCard = ({
  icon: Icon,
  title,
  description,
  features,
  timeline,
  index,
  tags = [],
}: ServiceCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // Mouse tracking for 3D tilt
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Magnetic hover effect
  const magneticX = useMotionValue(0);
  const magneticY = useMotionValue(0);
  const springConfig = { stiffness: 150, damping: 15, mass: 0.1 };
  const magneticSpringX = useSpring(magneticX, springConfig);
  const magneticSpringY = useSpring(magneticY, springConfig);

  // Smooth 3D rotation
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [12, -12]), {
    stiffness: 300,
    damping: 30,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-12, 12]), {
    stiffness: 300,
    damping: 30,
  });

  // Spotlight gradient position
  const spotlightX = useMotionValue(50);
  const spotlightY = useMotionValue(50);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    
    mouseX.set(x);
    mouseY.set(y);
    spotlightX.set((x + 0.5) * 100);
    spotlightY.set((y + 0.5) * 100);

    // Magnetic pull effect
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    magneticX.set((e.clientX - centerX) * 0.1);
    magneticY.set((e.clientY - centerY) * 0.1);
  }, [mouseX, mouseY, spotlightX, spotlightY, magneticX, magneticY]);

  const handleMouseLeave = useCallback(() => {
    mouseX.set(0);
    mouseY.set(0);
    magneticX.set(0);
    magneticY.set(0);
    setIsHovered(false);
  }, [mouseX, mouseY, magneticX, magneticY]);

  const formattedIndex = String(index + 1).padStart(2, "0");

  return (
    <motion.div
      ref={cardRef}
      style={{
        rotateX: isHovered ? rotateX : 0,
        rotateY: isHovered ? rotateY : 0,
        x: magneticSpringX,
        y: magneticSpringY,
        transformStyle: "preserve-3d",
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onClick={() => setIsExpanded(!isExpanded)}
      className={cn(
        "relative group cursor-pointer",
        isExpanded && "md:col-span-2 lg:col-span-2"
      )}
    >
      {/* Card Container */}
      <motion.div
        className={cn(
          "relative h-full p-8 md:p-10 rounded-3xl overflow-hidden transition-all duration-500",
          "bg-card/60 backdrop-blur-xl border border-border/50",
          "hover:border-primary/40 hover:shadow-2xl hover:shadow-primary/10",
          isExpanded && "bg-card/80"
        )}
        whileHover={{ 
          scale: 1.02,
          transition: { duration: 0.3 }
        }}
      >
        {/* Animated spotlight gradient */}
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background: `radial-gradient(600px circle at ${spotlightX.get()}% ${spotlightY.get()}%, hsl(var(--primary) / 0.12), transparent 40%)`,
          }}
        />

        {/* Glowing border effect */}
        <motion.div
          className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background: `conic-gradient(from 180deg at 50% 50%, transparent, hsl(var(--primary) / 0.1), transparent)`,
          }}
        />

        {/* Index number background */}
        <motion.span 
          className="absolute top-6 right-8 text-[120px] font-serif font-bold text-foreground/[0.02] group-hover:text-primary/[0.08] transition-all duration-700 select-none"
          animate={isHovered ? { scale: 1.1, rotate: 5 } : { scale: 1, rotate: 0 }}
        >
          {formattedIndex}
        </motion.span>

        {/* Tags with animation */}
        {tags.length > 0 && (
          <motion.div 
            className="absolute top-6 left-8 flex gap-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            {tags.map((tag, i) => (
              <motion.span
                key={i}
                className={cn(
                  "text-xs font-medium px-3 py-1 rounded-full backdrop-blur-sm",
                  tag === "Popular" && "bg-primary/15 text-primary border border-primary/30",
                  tag === "Premium" && "bg-accent/30 text-accent-foreground border border-accent/30",
                  tag === "Quick" && "bg-secondary/30 text-secondary-foreground border border-secondary/30"
                )}
                whileHover={{ scale: 1.05 }}
              >
                {tag}
              </motion.span>
            ))}
          </motion.div>
        )}

        <div className="relative z-10 flex flex-col h-full pt-8" style={{ transform: "translateZ(50px)" }}>
          {/* Animated Icon */}
          <motion.div
            className={cn(
              "w-16 h-16 rounded-2xl flex items-center justify-center mb-8",
              "bg-muted/50 group-hover:bg-primary transition-all duration-500",
              "shadow-lg group-hover:shadow-primary/30"
            )}
            whileHover={{ scale: 1.15, rotate: 8 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <Icon
              className={cn(
                "w-7 h-7 transition-all duration-500",
                "text-muted-foreground group-hover:text-primary-foreground"
              )}
            />
          </motion.div>

          {/* Title with underline animation */}
          <motion.h3 
            className="font-serif text-2xl md:text-3xl font-semibold text-foreground mb-4 group-hover:text-primary transition-colors duration-300 relative inline-block"
          >
            {title}
            <motion.span
              className="absolute -bottom-1 left-0 h-0.5 bg-primary rounded-full"
              initial={{ width: 0 }}
              animate={isHovered ? { width: "100%" } : { width: 0 }}
              transition={{ duration: 0.3 }}
            />
          </motion.h3>

          {/* Description */}
          <p className="text-muted-foreground leading-relaxed mb-6 flex-grow">
            {description}
          </p>

          {/* Expanded Content */}
          <motion.div
            initial={false}
            animate={{
              height: isExpanded ? "auto" : 0,
              opacity: isExpanded ? 1 : 0,
            }}
            transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
            className="overflow-hidden"
          >
            <div className="pt-6 border-t border-border/50 space-y-6">
              {/* Features Grid with staggered animation */}
              <div className="grid grid-cols-2 gap-3">
                {features.map((feature, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={isExpanded ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                    transition={{ delay: i * 0.1 + 0.1 }}
                    className="flex items-center gap-2 group/feature"
                  >
                    <motion.div 
                      className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center"
                      whileHover={{ scale: 1.2, backgroundColor: "hsl(var(--primary) / 0.2)" }}
                    >
                      <Check className="w-3 h-3 text-primary" />
                    </motion.div>
                    <span className="text-sm text-foreground/80 group-hover/feature:text-primary transition-colors">
                      {feature}
                    </span>
                  </motion.div>
                ))}
              </div>

              {/* Timeline */}
              <motion.div 
                className="flex items-center gap-2 text-muted-foreground"
                initial={{ opacity: 0 }}
                animate={isExpanded ? { opacity: 1 } : { opacity: 0 }}
                transition={{ delay: 0.4 }}
              >
                <Clock className="w-4 h-4 text-primary" />
                <span className="text-sm">Timeline: {timeline}</span>
              </motion.div>
            </div>
          </motion.div>

          {/* Action Row */}
          <div className="flex items-center justify-between mt-6 pt-6 border-t border-border/30">
            <motion.span 
              className="text-sm text-muted-foreground"
              animate={isHovered ? { x: 5 } : { x: 0 }}
            >
              {isExpanded ? "Click to collapse" : "Click to explore"}
            </motion.span>
            <motion.div
              className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center",
                "bg-muted/50 group-hover:bg-primary transition-all duration-300"
              )}
              whileHover={{ scale: 1.15 }}
              animate={isHovered ? { rotate: isExpanded ? 225 : 45 } : { rotate: isExpanded ? 180 : 0 }}
            >
              <ArrowUpRight
                className={cn(
                  "w-4 h-4 transition-colors duration-300",
                  "text-muted-foreground group-hover:text-primary-foreground"
                )}
              />
            </motion.div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ServiceCard;
