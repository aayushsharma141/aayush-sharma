import { useState, useEffect, useCallback } from 'react';

interface ParallaxOptions {
  speed?: number;
  direction?: 'up' | 'down';
  offset?: number;
}

export const useParallax = (options: ParallaxOptions = {}) => {
  const { speed = 0.5, direction = 'up', offset = 0 } = options;
  const [scrollY, setScrollY] = useState(0);
  const [elementTop, setElementTop] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      requestAnimationFrame(() => {
        setScrollY(window.scrollY);
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const calculateParallax = useCallback((elementRef: HTMLElement | null) => {
    if (!elementRef) return 0;

    const rect = elementRef.getBoundingClientRect();
    const elementCenter = rect.top + rect.height / 2;
    const viewportCenter = window.innerHeight / 2;
    const distance = elementCenter - viewportCenter;

    const multiplier = direction === 'up' ? -1 : 1;
    return (distance * speed * multiplier) + offset;
  }, [speed, direction, offset]);

  const getParallaxStyle = useCallback((elementRef: HTMLElement | null) => {
    const translateY = calculateParallax(elementRef);
    return {
      transform: `translateY(${translateY}px)`,
      willChange: 'transform'
    };
  }, [calculateParallax]);

  return {
    scrollY,
    calculateParallax,
    getParallaxStyle
  };
};

export default useParallax;
