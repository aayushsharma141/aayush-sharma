import { motion, useScroll, useSpring } from "framer-motion";

const GalleryScrollIndicator = () => {
  const { scrollYProgress } = useScroll();
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <>
      {/* Vertical progress bar */}
      <motion.div
        className="fixed right-4 top-1/2 -translate-y-1/2 z-40 hidden lg:block"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1 }}
      >
        <div className="relative h-40 w-1 rounded-full bg-muted overflow-hidden">
          <motion.div
            className="absolute bottom-0 left-0 right-0 bg-primary rounded-full origin-bottom"
            style={{ scaleY, height: '100%' }}
          />
        </div>
        <motion.div
          className="mt-4 text-xs text-muted-foreground text-center"
          style={{ opacity: scrollYProgress }}
        >
          <motion.span>{Math.round(scrollYProgress.get() * 100)}%</motion.span>
        </motion.div>
      </motion.div>

      {/* Top progress bar (mobile & desktop) */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-primary z-50 origin-left"
        style={{ scaleX: scrollYProgress }}
      />
    </>
  );
};

export default GalleryScrollIndicator;
