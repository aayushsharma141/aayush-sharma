import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { LucideIcon, ArrowUpRight, Check, Clock } from "lucide-react";
import { useState, useRef } from "react";
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

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), {
    stiffness: 300,
    damping: 30,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), {
    stiffness: 300,
    damping: 30,
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setIsHovered(false);
  };

  const formattedIndex = String(index + 1).padStart(2, "0");

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      style={{
        rotateX: isHovered ? rotateX : 0,
        rotateY: isHovered ? rotateY : 0,
        transformStyle: "preserve-3d",
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onClick={() => setIsExpanded(!isExpanded)}
      className={cn(
        "relative group cursor-pointer perspective-1000",
        isExpanded && "md:col-span-2 lg:col-span-2"
      )}
    >
      {/* Card Container */}
      <div
        className={cn(
          "relative h-full p-8 md:p-10 rounded-3xl overflow-hidden transition-all duration-500",
          "bg-card/50 backdrop-blur-md border border-border/50",
          "hover:border-primary/30 hover:shadow-2xl hover:shadow-primary/5",
          isExpanded && "bg-card/80"
        )}
      >
        {/* Spotlight gradient following cursor */}
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background: isHovered
              ? `radial-gradient(600px circle at ${
                  (mouseX.get() + 0.5) * 100
                }% ${
                  (mouseY.get() + 0.5) * 100
                }%, hsl(var(--primary) / 0.08), transparent 40%)`
              : "none",
          }}
        />

        {/* Index number background */}
        <span className="absolute top-6 right-8 text-[120px] font-serif font-bold text-foreground/[0.02] group-hover:text-primary/[0.05] transition-colors duration-500 select-none">
          {formattedIndex}
        </span>

        {/* Tags */}
        {tags.length > 0 && (
          <div className="absolute top-6 left-8 flex gap-2">
            {tags.map((tag, i) => (
              <span
                key={i}
                className={cn(
                  "text-xs font-medium px-3 py-1 rounded-full",
                  tag === "Popular" && "bg-primary/10 text-primary border border-primary/20",
                  tag === "Premium" && "bg-accent/30 text-accent-foreground border border-accent/20",
                  tag === "Quick" && "bg-secondary/30 text-secondary-foreground border border-secondary/20"
                )}
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        <div className="relative z-10 flex flex-col h-full pt-8">
          {/* Icon */}
          <motion.div
            className={cn(
              "w-16 h-16 rounded-2xl flex items-center justify-center mb-8",
              "bg-muted/50 group-hover:bg-primary transition-all duration-500",
              "shadow-lg"
            )}
            whileHover={{ scale: 1.1, rotate: 5 }}
          >
            <Icon
              className={cn(
                "w-7 h-7 transition-colors duration-500",
                "text-muted-foreground group-hover:text-primary-foreground"
              )}
            />
          </motion.div>

          {/* Title */}
          <h3 className="font-serif text-2xl md:text-3xl font-semibold text-foreground mb-4 group-hover:text-primary transition-colors duration-300">
            {title}
          </h3>

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
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="pt-6 border-t border-border/50 space-y-6">
              {/* Features Grid */}
              <div className="grid grid-cols-2 gap-3">
                {features.map((feature, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-center gap-2"
                  >
                    <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center">
                      <Check className="w-3 h-3 text-primary" />
                    </div>
                    <span className="text-sm text-foreground/80">{feature}</span>
                  </motion.div>
                ))}
              </div>

              {/* Timeline */}
              <div className="flex items-center gap-2 text-muted-foreground">
                <Clock className="w-4 h-4" />
                <span className="text-sm">Timeline: {timeline}</span>
              </div>
            </div>
          </motion.div>

          {/* Action Row */}
          <div className="flex items-center justify-between mt-6 pt-6 border-t border-border/30">
            <span className="text-sm text-muted-foreground">
              {isExpanded ? "Click to collapse" : "Click to explore"}
            </span>
            <motion.div
              className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center",
                "bg-muted/50 group-hover:bg-primary transition-all duration-300"
              )}
              whileHover={{ scale: 1.1 }}
            >
              <ArrowUpRight
                className={cn(
                  "w-4 h-4 transition-all duration-300",
                  "text-muted-foreground group-hover:text-primary-foreground",
                  isExpanded && "rotate-180"
                )}
              />
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ServiceCard;
