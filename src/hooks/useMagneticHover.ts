import { useState, useCallback, useRef } from 'react';

interface MagneticPosition {
  x: number;
  y: number;
}

interface UseMagneticHoverOptions {
  strength?: number;
  ease?: number;
}

export const useMagneticHover = (options: UseMagneticHoverOptions = {}) => {
  const { strength = 0.3, ease = 0.1 } = options;
  const [position, setPosition] = useState<MagneticPosition>({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const elementRef = useRef<HTMLElement | null>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    if (!elementRef.current) return;

    const rect = elementRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const distanceX = e.clientX - centerX;
    const distanceY = e.clientY - centerY;

    setPosition({
      x: distanceX * strength,
      y: distanceY * strength
    });
  }, [strength]);

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    setPosition({ x: 0, y: 0 });
  }, []);

  const magneticProps = {
    ref: elementRef,
    onMouseMove: handleMouseMove,
    onMouseEnter: handleMouseEnter,
    onMouseLeave: handleMouseLeave,
    style: {
      transform: `translate(${position.x}px, ${position.y}px)`,
      transition: isHovered ? `transform ${ease}s ease-out` : 'transform 0.3s ease-out'
    }
  };

  return {
    position,
    isHovered,
    magneticProps,
    elementRef
  };
};

export default useMagneticHover;
