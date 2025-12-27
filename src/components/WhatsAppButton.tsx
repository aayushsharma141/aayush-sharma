import { MessageCircle } from "lucide-react";

const WhatsAppButton = () => {
  const phoneNumber = "917909041132";
  const message = encodeURIComponent("Hi! I'm interested in your interior design services.");
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 group"
      aria-label="Chat on WhatsApp"
    >
      <div className="relative">
        {/* Pulse animation ring */}
        <div className="absolute inset-0 bg-[hsl(142,70%,45%)] rounded-full animate-ping opacity-30" />
        
        {/* Main button */}
        <div className="relative w-14 h-14 bg-[hsl(142,70%,45%)] rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 group-hover:bg-[hsl(142,70%,40%)]">
          <MessageCircle className="w-7 h-7 text-primary-foreground fill-primary-foreground" />
        </div>
        
        {/* Tooltip */}
        <div className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-foreground text-background px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          Chat with us
          <div className="absolute left-full top-1/2 -translate-y-1/2 border-8 border-transparent border-l-foreground" />
        </div>
      </div>
    </a>
  );
};

export default WhatsAppButton;
