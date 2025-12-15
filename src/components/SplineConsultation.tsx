import { Suspense, lazy, useState } from "react";
import { Button } from "@/components/ui/button";

const Spline = lazy(() => import("@splinetool/react-spline"));

const SplineConsultation = () => {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  if (hasError) {
    return (
      <div className="relative bg-gradient-to-br from-primary/10 to-accent/10 rounded-xl overflow-hidden h-80 border border-border flex items-center justify-center">
        <div className="text-center p-8">
          <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">🏠</span>
          </div>
          <h4 className="font-semibold text-foreground mb-2">Ready to Transform Your Space?</h4>
          <p className="text-muted-foreground text-sm mb-4">
            Schedule a free consultation with our design experts
          </p>
          <Button size="lg">Book Free Consultation</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative bg-card rounded-xl overflow-hidden h-80 border border-border">
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-card z-10">
          <div className="text-center">
            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-muted-foreground text-sm">Loading 3D Experience...</p>
          </div>
        </div>
      )}
      <Suspense
        fallback={
          <div className="absolute inset-0 flex items-center justify-center bg-card">
            <div className="text-center">
              <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
              <p className="text-muted-foreground text-sm">Loading 3D Experience...</p>
            </div>
          </div>
        }
      >
        <Spline
          scene="https://prod.spline.design/Un3OZTryOO4IJIQ7/scene.splinecode"
          onLoad={() => setIsLoaded(true)}
          onError={() => setHasError(true)}
        />
      </Suspense>
      <div className="absolute bottom-4 left-4 right-4 z-20">
        <Button size="lg" className="w-full">
          Book Free Consultation
        </Button>
      </div>
    </div>
  );
};

export default SplineConsultation;
