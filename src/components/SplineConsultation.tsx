import React, { Suspense, useState } from 'react';
import { Button } from './ui/button';

// Lazy load Spline to prevent blocking page render
const Spline = React.lazy(() => import('@splinetool/react-spline'));

interface SplineConsultationProps {
  onBookConsultation?: () => void;
}

const SplineConsultation: React.FC<SplineConsultationProps> = ({ onBookConsultation }) => {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  if (hasError) {
    return (
      <div className="relative h-64 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 flex flex-col items-center justify-center p-6 border border-primary/20">
        <div className="text-center">
          <h4 className="text-xl font-semibold text-foreground mb-2">3D Experience</h4>
          <p className="text-muted-foreground mb-4">Interactive 3D unavailable</p>
          <Button 
            onClick={onBookConsultation}
            className="bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            Book Free Consultation
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-64 rounded-2xl overflow-hidden bg-gradient-to-br from-primary/10 to-background">
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-background/80">
          <div className="flex flex-col items-center gap-3">
            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
            <span className="text-sm text-muted-foreground">Loading 3D experience...</span>
          </div>
        </div>
      )}
      
      <Suspense fallback={null}>
        <ErrorBoundary onError={() => setHasError(true)}>
          <Spline 
            scene="https://prod.spline.design/Un3OZTryOO4IJIQ7/scene.splinecode"
            onLoad={() => setIsLoaded(true)}
          />
        </ErrorBoundary>
      </Suspense>
      
      <div className="absolute bottom-4 left-0 right-0 flex justify-center">
        <Button 
          onClick={onBookConsultation}
          className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg"
        >
          Book Free Consultation
        </Button>
      </div>
    </div>
  );
};

// Simple error boundary component
class ErrorBoundary extends React.Component<
  { children: React.ReactNode; onError: () => void },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode; onError: () => void }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch() {
    this.props.onError();
  }

  render() {
    if (this.state.hasError) {
      return null;
    }
    return this.props.children;
  }
}

export default SplineConsultation;
