import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
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
  IndianRupee
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
    features: ["Premium materials", "Custom elements", "Designer consultation", "2-3 week timeline"],
  },
  luxury: {
    name: "Luxury",
    multiplier: 2.2,
    features: ["Imported materials", "Bespoke designs", "Dedicated designer", "Priority execution"],
  },
};

const sizeMultipliers = [
  { label: "Small", sqft: "< 150 sq ft", multiplier: 0.8 },
  { label: "Medium", sqft: "150-300 sq ft", multiplier: 1 },
  { label: "Large", sqft: "300-500 sq ft", multiplier: 1.4 },
  { label: "Extra Large", sqft: "> 500 sq ft", multiplier: 1.8 },
];

const CostCalculator = () => {
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

  return (
    <section id="calculator" className="py-20 md:py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/20 to-background" />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-4">
            <Calculator className="w-4 h-4" />
            <span className="text-sm font-medium">Cost Estimator</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-foreground mb-4">
            Get Your Project Estimate
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Answer a few questions to receive an instant budget estimate for your interior design project
          </p>
        </div>

        {/* Calculator Card */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-card border border-border rounded-2xl shadow-xl overflow-hidden">
            {/* Progress Steps */}
            <div className="flex border-b border-border">
              {[1, 2, 3].map((s) => (
                <button
                  key={s}
                  onClick={() => s < step && setStep(s)}
                  className={cn(
                    "flex-1 py-4 text-sm font-medium transition-all",
                    step === s
                      ? "bg-primary/10 text-primary border-b-2 border-primary"
                      : step > s
                      ? "text-muted-foreground hover:bg-muted/50 cursor-pointer"
                      : "text-muted-foreground/50 cursor-not-allowed"
                  )}
                >
                  <span className="hidden sm:inline">Step {s}: </span>
                  {s === 1 ? "Room Selection" : s === 2 ? "Size & Budget" : "Your Estimate"}
                </button>
              ))}
            </div>

            <div className="p-6 md:p-8">
              {/* Step 1: Room Selection */}
              {step === 1 && (
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-foreground">
                    Which spaces would you like to transform?
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {roomTypes.map((room) => {
                      const Icon = room.icon;
                      const isSelected = selectedRooms.includes(room.id);
                      return (
                        <button
                          key={room.id}
                          onClick={() => toggleRoom(room.id)}
                          className={cn(
                            "p-4 rounded-xl border-2 transition-all duration-300 text-left group",
                            isSelected
                              ? "border-primary bg-primary/10 shadow-lg"
                              : "border-border hover:border-primary/50 hover:bg-muted/50"
                          )}
                        >
                          <div className={cn(
                            "w-10 h-10 rounded-lg flex items-center justify-center mb-3 transition-colors",
                            isSelected ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground group-hover:text-primary"
                          )}>
                            <Icon className="w-5 h-5" />
                          </div>
                          <h4 className="font-medium text-foreground">{room.name}</h4>
                          <p className="text-xs text-muted-foreground mt-1">{room.description}</p>
                        </button>
                      );
                    })}
                  </div>
                  <div className="flex justify-end pt-4">
                    <Button
                      onClick={() => setStep(2)}
                      disabled={selectedRooms.length === 0}
                      className="gap-2"
                    >
                      Continue <ChevronRight className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              )}

              {/* Step 2: Size & Budget */}
              {step === 2 && (
                <div className="space-y-8">
                  {/* Size Selection */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-foreground">
                      What's the approximate size?
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {sizeMultipliers.map((size, index) => (
                        <button
                          key={size.label}
                          onClick={() => setSizeIndex(index)}
                          className={cn(
                            "p-4 rounded-xl border-2 transition-all duration-300 text-center",
                            sizeIndex === index
                              ? "border-primary bg-primary/10"
                              : "border-border hover:border-primary/50"
                          )}
                        >
                          <div className="font-medium text-foreground">{size.label}</div>
                          <div className="text-xs text-muted-foreground mt-1">{size.sqft}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Budget Tier Selection */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-foreground">
                      Select your preferred tier
                    </h3>
                    <div className="grid md:grid-cols-3 gap-4">
                      {(Object.entries(budgetTiers) as [BudgetTier, typeof budgetTiers.standard][]).map(
                        ([tier, data]) => (
                          <button
                            key={tier}
                            onClick={() => setBudgetTier(tier)}
                            className={cn(
                              "p-5 rounded-xl border-2 transition-all duration-300 text-left",
                              budgetTier === tier
                                ? "border-primary bg-primary/10 shadow-lg"
                                : "border-border hover:border-primary/50"
                            )}
                          >
                            <div className="flex items-center gap-2 mb-3">
                              {tier === "luxury" && <Sparkles className="w-4 h-4 text-primary" />}
                              <h4 className="font-semibold text-foreground">{data.name}</h4>
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
                    <Button variant="outline" onClick={() => setStep(1)} className="gap-2">
                      <ChevronLeft className="w-4 h-4" /> Back
                    </Button>
                    <Button onClick={() => setStep(3)} className="gap-2">
                      See Estimate <ChevronRight className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              )}

              {/* Step 3: Estimate */}
              {step === 3 && (
                <div className="space-y-8">
                  <div className="text-center py-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6">
                      <IndianRupee className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="text-lg text-muted-foreground mb-2">Estimated Investment</h3>
                    <div className="text-4xl md:text-5xl font-bold text-foreground">
                      ₹{formatPrice(estimate.min)} - ₹{formatPrice(estimate.max)}
                    </div>
                    <p className="text-sm text-muted-foreground mt-4 max-w-md mx-auto">
                      This is an indicative estimate. Final pricing may vary based on specific requirements and site conditions.
                    </p>
                  </div>

                  {/* Summary */}
                  <div className="bg-muted/30 rounded-xl p-6 space-y-4">
                    <h4 className="font-semibold text-foreground">Project Summary</h4>
                    <div className="grid md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Spaces:</span>
                        <p className="font-medium text-foreground">
                          {selectedRooms.map((id) => roomTypes.find((r) => r.id === id)?.name).join(", ")}
                        </p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Size:</span>
                        <p className="font-medium text-foreground">{sizeMultipliers[sizeIndex].label} ({sizeMultipliers[sizeIndex].sqft})</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Tier:</span>
                        <p className="font-medium text-foreground">{budgetTiers[budgetTier].name}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
                    <Button variant="outline" onClick={() => setStep(1)} className="gap-2">
                      <ChevronLeft className="w-4 h-4" /> Start Over
                    </Button>
                    <Button asChild className="gap-2">
                      <a href="#contact">
                        Get Detailed Quote <ChevronRight className="w-4 h-4" />
                      </a>
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CostCalculator;
