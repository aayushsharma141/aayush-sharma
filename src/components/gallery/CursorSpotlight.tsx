import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

interface CursorSpotlightProps {
  children: React.ReactNode;
}

const CursorSpotlight = ({ children }: CursorSpotlightProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 200 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    window.addEventListener('mousemove', handleMouseMove);
    document.body.addEventListener('mouseenter', handleMouseEnter);
    document.body.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.body.removeEventListener('mouseenter', handleMouseEnter);
      document.body.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [cursorX, cursorY]);

  return (
    <div className="relative">
      {/* Spotlight effect */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-30 hidden md:block"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: '-50%',
          translateY: '-50%'
        }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ 
            opacity: isVisible ? 0.15 : 0, 
            scale: isVisible ? 1 : 0.5 
          }}
          transition={{ duration: 0.3 }}
          className="w-[300px] h-[300px] rounded-full"
          style={{
            background: 'radial-gradient(circle, hsl(var(--primary)) 0%, transparent 70%)',
            filter: 'blur(40px)'
          }}
        />
      </motion.div>

      {/* Inner glow cursor */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-50 hidden md:block"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: '-50%',
          translateY: '-50%'
        }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ 
            opacity: isVisible ? 0.5 : 0, 
            scale: isVisible ? 1 : 0.5 
          }}
          transition={{ duration: 0.2 }}
          className="w-4 h-4 rounded-full bg-primary/50 mix-blend-difference"
        />
      </motion.div>

      {children}
    </div>
  );
};

export default CursorSpotlight;
