import { ArrowRight, Play, Sparkles, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-interior.jpg";
import WaterRippleEffect from "./WaterRippleEffect";
import FloatingParticles from "./FloatingParticles";
import VideoModal from "./VideoModal";
import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const parallaxBg = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const parallaxContent = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  const smoothMouseX = useSpring(0, { stiffness: 50, damping: 20 });
  const smoothMouseY = useSpring(0, { stiffness: 50, damping: 20 });

  useEffect(() => {
    setTimeout(() => setIsVisible(true), 100);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 30;
      const y = (e.clientY / window.innerHeight - 0.5) * 30;
      setMousePosition({ x, y });
      smoothMouseX.set(x);
      smoothMouseY.set(y);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [smoothMouseX, smoothMouseY]);

  const handleScrollToServices = () => {
    document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
  };

  // Split text for character animation
  const headline = "Elevate Your Space";
  const subheadline = "Into Luxury";

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.03,
        delayChildren: 0.3,
      },
    },
  };

  const letterVariants = {
    hidden: { opacity: 0, y: 50, rotateX: -90 },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        type: "spring" as const,
        damping: 12,
        stiffness: 100,
      },
    },
  };

  const fadeUpVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (delay: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        delay,
        ease: [0.25, 0.1, 0.25, 1] as const,
      },
    }),
  };

  return (
    <section ref={containerRef} id="home" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Enhanced Water Ripple Mouse Effect */}
      <WaterRippleEffect />

      {/* Background Image with Parallax Effect + Mouse Tracking */}
      <motion.div 
        className="absolute inset-0 z-0"
        style={{ 
          y: parallaxBg,
          scale,
        }}
      >
        <motion.div
          className="w-full h-full"
          style={{
            x: smoothMouseX,
            y: smoothMouseY,
          }}
        >
          <img
            src={heroImage}
            alt="Luxurious modern living room interior design"
            className="w-full h-full object-cover scale-110"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/95 via-foreground/70 to-foreground/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-foreground/20" />
      </motion.div>

      {/* Animated Gradient Orbs */}
      <motion.div
        className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full opacity-30 blur-3xl pointer-events-none"
        style={{
          background: "radial-gradient(circle, hsl(var(--primary) / 0.4) 0%, transparent 70%)",
          x: useTransform(() => -smoothMouseX.get() * 2),
          y: useTransform(() => -smoothMouseY.get() * 2),
        }}
        animate={{
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-1/4 left-1/4 w-72 h-72 rounded-full opacity-20 blur-3xl pointer-events-none"
        style={{
          background: "radial-gradient(circle, hsl(var(--primary) / 0.3) 0%, transparent 70%)",
          x: useTransform(() => smoothMouseX.get() * 1.5),
          y: useTransform(() => smoothMouseY.get() * 1.5),
        }}
        animate={{
          scale: [1.2, 1, 1.2],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Floating Geometric Shapes */}
      <motion.div
        className="absolute top-20 right-20 w-32 h-32 border border-primary/20 rounded-full pointer-events-none"
        animate={{
          y: [0, -20, 0],
          rotate: [0, 360],
        }}
        transition={{
          y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
          rotate: { duration: 20, repeat: Infinity, ease: "linear" },
        }}
      />
      <motion.div
        className="absolute bottom-32 right-32 w-20 h-20 border border-primary/10 pointer-events-none"
        animate={{
          y: [0, 15, 0],
          rotate: [0, -180, -360],
        }}
        transition={{
          y: { duration: 3, repeat: Infinity, ease: "easeInOut" },
          rotate: { duration: 15, repeat: Infinity, ease: "linear" },
        }}
      />
      <motion.div
        className="absolute top-1/3 left-20 w-16 h-16 border border-primary/15 rotate-45 pointer-events-none"
        animate={{
          y: [0, 20, 0],
          x: [0, 10, 0],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Floating Particles */}
      <FloatingParticles count={20} className="z-[1]" />

      {/* Content with Parallax */}
      <motion.div 
        className="container mx-auto px-4 relative z-10 pt-20"
        style={{ 
          y: parallaxContent,
          opacity,
        }}
      >
        <div className="max-w-4xl">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={isVisible ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <span className="inline-flex items-center gap-2 text-primary font-medium mb-6 tracking-[0.2em] uppercase text-sm border border-primary/30 px-4 py-2 rounded-full backdrop-blur-sm bg-primary/5">
              <Sparkles className="w-4 h-4 animate-pulse" />
              Premier Interior Design Studio
              <Sparkles className="w-4 h-4 animate-pulse" />
            </span>
          </motion.div>
          
          {/* Animated Headline */}
          <div className="overflow-hidden mb-2">
            <motion.h1
              className="font-serif text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-primary-foreground leading-[1.05]"
              variants={containerVariants}
              initial="hidden"
              animate={isVisible ? "visible" : "hidden"}
            >
              {headline.split("").map((char, index) => (
                <motion.span
                  key={index}
                  variants={letterVariants}
                  className="inline-block"
                  style={{ whiteSpace: char === " " ? "pre" : "normal" }}
                >
                  {char}
                </motion.span>
              ))}
            </motion.h1>
          </div>
          
          {/* Animated Subheadline */}
          <div className="overflow-hidden mb-8">
            <motion.span
              className="block text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-serif font-bold bg-gradient-to-r from-primary via-primary/80 to-primary bg-clip-text text-transparent drop-shadow-[0_0_25px_hsl(var(--primary)/0.5)]"
              variants={containerVariants}
              initial="hidden"
              animate={isVisible ? "visible" : "hidden"}
              transition={{ delayChildren: 0.6 }}
            >
              {subheadline.split("").map((char, index) => (
                <motion.span
                  key={index}
                  variants={letterVariants}
                  className="inline-block"
                  style={{ whiteSpace: char === " " ? "pre" : "normal" }}
                >
                  {char}
                </motion.span>
              ))}
            </motion.span>
          </div>
          
          {/* Description */}
          <motion.p
            className="text-primary-foreground/85 text-xl md:text-2xl mb-10 leading-relaxed font-light max-w-2xl"
            variants={fadeUpVariants}
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
            custom={0.8}
          >
            Transforming your vision into exquisite living spaces with innovative
            and personalized interior design solutions.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 mb-12"
            variants={fadeUpVariants}
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
            custom={1}
          >
            <Link to="/contact-us">
              <motion.div
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button size="lg" className="group text-lg px-8 py-6 shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 transition-all duration-500">
                  Start Your Project
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-2" />
                </Button>
              </motion.div>
            </Link>
            <motion.div
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button 
                size="lg" 
                variant="outline" 
                onClick={() => setIsVideoOpen(true)}
                className="bg-primary-foreground/5 backdrop-blur-md border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground hover:text-foreground text-lg px-8 py-6 group transition-all duration-500"
              >
                <Play className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                Watch Showreel
              </Button>
            </motion.div>
            <Link to="/contact-us">
              <motion.div
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="bg-primary/10 backdrop-blur-md border-primary/40 text-primary hover:bg-primary hover:text-primary-foreground text-lg px-8 py-6 group transition-all duration-500"
                >
                  Free Consultation
                </Button>
              </motion.div>
            </Link>
          </motion.div>

          {/* Trust Badges */}
          <motion.div
            className="flex flex-wrap items-center gap-8"
            variants={fadeUpVariants}
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
            custom={1.2}
          >
            <div className="flex -space-x-3">
              {[1, 2, 3, 4].map((i, idx) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={isVisible ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 1.3 + idx * 0.1, type: "spring" }}
                  whileHover={{ scale: 1.2, zIndex: 10 }}
                  className="w-12 h-12 rounded-full bg-primary/20 border-2 border-primary-foreground/20 backdrop-blur-sm flex items-center justify-center text-primary-foreground/70 text-sm font-medium cursor-pointer"
                >
                  {i === 4 ? "99+" : "★"}
                </motion.div>
              ))}
            </div>
            <div className="text-primary-foreground/80">
              <div className="font-semibold text-lg">500+ Happy Clients</div>
              <div className="text-sm text-primary-foreground/60">Trusted by luxury homeowners worldwide</div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Interactive Scroll Indicator */}
      <motion.button 
        onClick={handleScrollToServices}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 group cursor-pointer"
        style={{ opacity }}
        initial={{ opacity: 0, y: 20 }}
        animate={isVisible ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 1.5, duration: 0.6 }}
      >
        <div className="flex flex-col items-center gap-2 text-primary-foreground/50">
          <span className="text-xs tracking-widest uppercase font-medium group-hover:text-primary transition-colors">Discover More</span>
          <motion.div
            className="w-10 h-14 border-2 border-primary-foreground/30 rounded-full flex flex-col items-center justify-start pt-2 backdrop-blur-sm group-hover:border-primary group-hover:bg-primary/10 transition-all duration-300"
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <motion.div
              className="w-1.5 h-3 bg-primary rounded-full"
              animate={{ y: [0, 8, 0], opacity: [1, 0.3, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <ChevronDown className="w-4 h-4 text-primary mt-1 animate-pulse" />
          </motion.div>
        </div>
      </motion.button>

      {/* Video Modal */}
      <VideoModal 
        isOpen={isVideoOpen} 
        onClose={() => setIsVideoOpen(false)} 
      />
    </section>
  );
};

export default Hero;