import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { 
  Home, 
  UtensilsCrossed, 
  Bed, 
  Bath, 
  Briefcase,
  Sofa,
  ChevronRight,
  ChevronLeft,
  Calculator,
  Sparkles,
  IndianRupee,
  X
} from "lucide-react";

type RoomType = {
  id: string;
  name: string;
  icon: React.ElementType;
  basePrice: number;
  description: string;
};

type BudgetTier = "standard" | "premium" | "luxury";

const roomTypes: RoomType[] = [
  { id: "living", name: "Living Room", icon: Sofa, basePrice: 150000, description: "Comfortable & stylish living spaces" },
  { id: "kitchen", name: "Modular Kitchen", icon: UtensilsCrossed, basePrice: 200000, description: "Functional modern kitchens" },
  { id: "bedroom", name: "Bedroom", icon: Bed, basePrice: 120000, description: "Peaceful retreat spaces" },
  { id: "bathroom", name: "Bathroom", icon: Bath, basePrice: 80000, description: "Elegant bath spaces" },
  { id: "office", name: "Home Office", icon: Briefcase, basePrice: 100000, description: "Productive work environments" },
  { id: "full", name: "Full Home", icon: Home, basePrice: 500000, description: "Complete home transformation" },
];

const budgetTiers: Record<BudgetTier, { name: string; multiplier: number; features: string[] }> = {
  standard: {
    name: "Standard",
    multiplier: 1,
    features: ["Quality materials", "Functional design", "3-4 week timeline"],
  },
  premium: {
    name: "Premium",
    multiplier: 1.5,
    features: ["Premium materials", "Custom elements", "Designer consultation"],
  },
  luxury: {
    name: "Luxury",
    multiplier: 2.2,
    features: ["Imported materials", "Bespoke designs", "Priority execution"],
  },
};

const sizeMultipliers = [
  { label: "Small", sqft: "< 150 sq ft", multiplier: 0.8 },
  { label: "Medium", sqft: "150-300 sq ft", multiplier: 1 },
  { label: "Large", sqft: "300-500 sq ft", multiplier: 1.4 },
  { label: "Extra Large", sqft: "> 500 sq ft", multiplier: 1.8 },
];

interface CostCalculatorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CostCalculatorModal = ({ isOpen, onClose }: CostCalculatorModalProps) => {
  const [step, setStep] = useState(1);
  const [selectedRooms, setSelectedRooms] = useState<string[]>([]);
  const [budgetTier, setBudgetTier] = useState<BudgetTier>("premium");
  const [sizeIndex, setSizeIndex] = useState(1);

  const toggleRoom = (roomId: string) => {
    setSelectedRooms((prev) =>
      prev.includes(roomId)
        ? prev.filter((id) => id !== roomId)
        : [...prev, roomId]
    );
  };

  const calculateEstimate = () => {
    const baseTotal = selectedRooms.reduce((sum, roomId) => {
      const room = roomTypes.find((r) => r.id === roomId);
      return sum + (room?.basePrice || 0);
    }, 0);

    const tierMultiplier = budgetTiers[budgetTier].multiplier;
    const sizeMultiplier = sizeMultipliers[sizeIndex].multiplier;

    const minEstimate = Math.round(baseTotal * tierMultiplier * sizeMultiplier * 0.9);
    const maxEstimate = Math.round(baseTotal * tierMultiplier * sizeMultiplier * 1.1);

    return { min: minEstimate, max: maxEstimate };
  };

  const formatPrice = (price: number) => {
    if (price >= 100000) {
      return `${(price / 100000).toFixed(1)}L`;
    }
    return `${(price / 1000).toFixed(0)}K`;
  };

  const estimate = calculateEstimate();

  const handleClose = () => {
    setStep(1);
    setSelectedRooms([]);
    setBudgetTier("premium");
    setSizeIndex(1);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto p-0">
        <VisuallyHidden>
          <DialogTitle>Cost Estimator</DialogTitle>
        </VisuallyHidden>
        
        {/* Header */}
        <div className="sticky top-0 bg-background border-b border-border p-4 flex items-center justify-between z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Calculator className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Cost Estimator</h3>
              <p className="text-xs text-muted-foreground">Get instant budget estimate</p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="p-2 rounded-lg hover:bg-muted transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress Steps */}
        <div className="flex border-b border-border">
          {[1, 2, 3].map((s) => (
            <button
              key={s}
              onClick={() => s < step && setStep(s)}
              className={cn(
                "flex-1 py-3 text-xs font-medium transition-all",
                step === s
                  ? "bg-primary/10 text-primary border-b-2 border-primary"
                  : step > s
                  ? "text-muted-foreground hover:bg-muted/50 cursor-pointer"
                  : "text-muted-foreground/50 cursor-not-allowed"
              )}
            >
              {s === 1 ? "Rooms" : s === 2 ? "Size & Budget" : "Estimate"}
            </button>
          ))}
        </div>

        <div className="p-4 md:p-6">
          {/* Step 1: Room Selection */}
          {step === 1 && (
            <div className="space-y-4">
              <h4 className="text-sm font-semibold text-foreground">
                Which spaces would you like to transform?
              </h4>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {roomTypes.map((room) => {
                  const Icon = room.icon;
                  const isSelected = selectedRooms.includes(room.id);
                  return (
                    <button
                      key={room.id}
                      onClick={() => toggleRoom(room.id)}
                      className={cn(
                        "p-3 rounded-lg border-2 transition-all duration-300 text-left group",
                        isSelected
                          ? "border-primary bg-primary/10"
                          : "border-border hover:border-primary/50 hover:bg-muted/50"
                      )}
                    >
                      <div className={cn(
                        "w-8 h-8 rounded-lg flex items-center justify-center mb-2 transition-colors",
                        isSelected ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                      )}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <h5 className="font-medium text-foreground text-sm">{room.name}</h5>
                      <p className="text-xs text-muted-foreground mt-0.5">{room.description}</p>
                    </button>
                  );
                })}
              </div>
              <div className="flex justify-end pt-4">
                <Button
                  onClick={() => setStep(2)}
                  disabled={selectedRooms.length === 0}
                  size="sm"
                  className="gap-2"
                >
                  Continue <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          )}

          {/* Step 2: Size & Budget */}
          {step === 2 && (
            <div className="space-y-6">
              {/* Size Selection */}
              <div className="space-y-3">
                <h4 className="text-sm font-semibold text-foreground">
                  Approximate size?
                </h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {sizeMultipliers.map((size, index) => (
                    <button
                      key={size.label}
                      onClick={() => setSizeIndex(index)}
                      className={cn(
                        "p-3 rounded-lg border-2 transition-all duration-300 text-center",
                        sizeIndex === index
                          ? "border-primary bg-primary/10"
                          : "border-border hover:border-primary/50"
                      )}
                    >
                      <div className="font-medium text-foreground text-sm">{size.label}</div>
                      <div className="text-xs text-muted-foreground">{size.sqft}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Budget Tier */}
              <div className="space-y-3">
                <h4 className="text-sm font-semibold text-foreground">
                  Preferred tier
                </h4>
                <div className="grid md:grid-cols-3 gap-3">
                  {(Object.entries(budgetTiers) as [BudgetTier, typeof budgetTiers.standard][]).map(
                    ([tier, data]) => (
                      <button
                        key={tier}
                        onClick={() => setBudgetTier(tier)}
                        className={cn(
                          "p-4 rounded-lg border-2 transition-all duration-300 text-left",
                          budgetTier === tier
                            ? "border-primary bg-primary/10"
                            : "border-border hover:border-primary/50"
                        )}
                      >
                        <div className="flex items-center gap-2 mb-2">
                          {tier === "luxury" && <Sparkles className="w-4 h-4 text-primary" />}
                          <h5 className="font-semibold text-foreground text-sm">{data.name}</h5>
                        </div>
                        <ul className="space-y-1">
                          {data.features.map((feature) => (
                            <li key={feature} className="text-xs text-muted-foreground flex items-center gap-2">
                              <span className="w-1 h-1 rounded-full bg-primary" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </button>
                    )
                  )}
                </div>
              </div>

              <div className="flex justify-between pt-4">
                <Button variant="outline" onClick={() => setStep(1)} size="sm" className="gap-2">
                  <ChevronLeft className="w-4 h-4" /> Back
                </Button>
                <Button onClick={() => setStep(3)} size="sm" className="gap-2">
                  See Estimate <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          )}

          {/* Step 3: Estimate */}
          {step === 3 && (
            <div className="space-y-6">
              <div className="text-center py-6">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 mb-4">
                  <IndianRupee className="w-7 h-7 text-primary" />
                </div>
                <h4 className="text-sm text-muted-foreground mb-2">Estimated Investment</h4>
                <div className="text-3xl md:text-4xl font-bold text-foreground">
                  ₹{formatPrice(estimate.min)} - ₹{formatPrice(estimate.max)}
                </div>
                <p className="text-xs text-muted-foreground mt-3 max-w-sm mx-auto">
                  This is an indicative estimate. Final pricing may vary based on specific requirements.
                </p>
              </div>

              {/* Summary */}
              <div className="bg-muted/30 rounded-lg p-4 space-y-3">
                <h5 className="font-semibold text-foreground text-sm">Summary</h5>
                <div className="grid grid-cols-3 gap-3 text-xs">
                  <div>
                    <span className="text-muted-foreground">Spaces:</span>
                    <p className="font-medium text-foreground">
                      {selectedRooms.map((id) => roomTypes.find((r) => r.id === id)?.name).join(", ")}
                    </p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Size:</span>
                    <p className="font-medium text-foreground">{sizeMultipliers[sizeIndex].label}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Tier:</span>
                    <p className="font-medium text-foreground">{budgetTiers[budgetTier].name}</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row justify-center gap-3 pt-4">
                <Button variant="outline" onClick={() => setStep(1)} size="sm" className="gap-2">
                  <ChevronLeft className="w-4 h-4" /> Start Over
                </Button>
                <Button asChild size="sm" className="gap-2">
                  <a href="#contact" onClick={handleClose}>
                    Get Detailed Quote <ChevronRight className="w-4 h-4" />
                  </a>
                </Button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CostCalculatorModal;
