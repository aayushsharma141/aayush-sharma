import { useState, useRef, useCallback, useEffect } from "react";
import { cn } from "@/lib/utils";

interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
  beforeLabel?: string;
  afterLabel?: string;
  className?: string;
}

export const BeforeAfterSlider = ({
  beforeImage,
  afterImage,
  beforeLabel = "Before",
  afterLabel = "After",
  className,
}: BeforeAfterSliderProps) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback(
    (clientX: number) => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const x = clientX - rect.left;
      const percentage = Math.min(Math.max((x / rect.width) * 100, 0), 100);
      setSliderPosition(percentage);
    },
    []
  );

  const handleMouseDown = () => setIsDragging(true);
  const handleMouseUp = () => setIsDragging(false);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isDragging) return;
      handleMove(e.clientX);
    },
    [isDragging, handleMove]
  );

  const handleTouchMove = useCallback(
    (e: TouchEvent) => {
      if (!isDragging) return;
      handleMove(e.touches[0].clientX);
    },
    [isDragging, handleMove]
  );

  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
      window.addEventListener("touchmove", handleTouchMove);
      window.addEventListener("touchend", handleMouseUp);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleMouseUp);
    };
  }, [isDragging, handleMouseMove, handleTouchMove]);

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative w-full aspect-[4/3] overflow-hidden rounded-xl cursor-ew-resize select-none group",
        className
      )}
      onMouseDown={handleMouseDown}
      onTouchStart={handleMouseDown}
    >
      {/* After Image (Background) */}
      <div className="absolute inset-0">
        <img
          src={afterImage}
          alt={afterLabel}
          className="w-full h-full object-cover"
          draggable={false}
        />
        {/* After Label */}
        <span className="absolute bottom-4 right-4 px-3 py-1.5 bg-primary text-primary-foreground text-sm font-medium rounded-full shadow-lg">
          {afterLabel}
        </span>
      </div>

      {/* Before Image (Clipped) */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
      >
        <img
          src={beforeImage}
          alt={beforeLabel}
          className="w-full h-full object-cover"
          draggable={false}
        />
        {/* Before Label */}
        <span className="absolute bottom-4 left-4 px-3 py-1.5 bg-muted text-muted-foreground text-sm font-medium rounded-full shadow-lg border border-border">
          {beforeLabel}
        </span>
      </div>

      {/* Slider Handle */}
      <div
        className="absolute top-0 bottom-0 w-1 bg-primary shadow-lg z-10 transition-transform duration-75"
        style={{ left: `${sliderPosition}%`, transform: "translateX(-50%)" }}
      >
        {/* Handle Circle */}
        <div
          className={cn(
            "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
            "w-12 h-12 rounded-full bg-primary shadow-xl",
            "flex items-center justify-center",
            "transition-all duration-200",
            isDragging ? "scale-110" : "group-hover:scale-105"
          )}
        >
          {/* Arrows */}
          <div className="flex items-center gap-1 text-primary-foreground">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </div>
        </div>

        {/* Vertical Line Glow */}
        <div className="absolute inset-0 w-1 bg-primary blur-sm opacity-50" />
      </div>

      {/* Instructions Overlay */}
      <div
        className={cn(
          "absolute inset-0 flex items-center justify-center bg-background/30 backdrop-blur-sm transition-opacity duration-300 pointer-events-none",
          isDragging ? "opacity-0" : "opacity-0 group-hover:opacity-100"
        )}
      >
        <div className="px-4 py-2 bg-card/90 backdrop-blur-md rounded-full text-sm font-medium text-card-foreground shadow-lg border border-border">
          Drag to compare
        </div>
      </div>
    </div>
  );
};
