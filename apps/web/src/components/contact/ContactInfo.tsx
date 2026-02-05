import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Phone, Mail, MapPin, Clock, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const contactInfo = [
  {
    icon: Phone,
    title: "Call Us",
    details: ["+91 7909041132", "+91 9304853659"],
    action: "tel:+917909041132",
    actionLabel: "Call Now"
  },
  {
    icon: Mail,
    title: "Email Us",
    details: ["info@crossangleinterior.com"],
    action: "mailto:info@crossangleinterior.com",
    actionLabel: "Send Email"
  },
  {
    icon: MapPin,
    title: "Visit Us",
    details: ["2-G, 2nd floor, Aditya Signature", "Dimna Rd, Mango, Jamshedpur"],
    action: "https://maps.google.com",
    actionLabel: "Get Directions"
  },
  {
    icon: Clock,
    title: "Working Hours",
    details: ["Mon - Sat: 10:00 AM - 7:00 PM", "Sunday: By Appointment"],
    action: null,
    actionLabel: null
  },
];

const ContactInfo = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-50px" });

  return (
    <div ref={containerRef} className="space-y-6">
      {/* Info Cards */}
      <div className="space-y-4">
        {contactInfo.map((info, index) => (
          <ContactInfoCard key={info.title} info={info} index={index} isInView={isInView} />
        ))}
      </div>

      {/* WhatsApp CTA */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        <a
          href="https://wa.me/917909041132"
          target="_blank"
          rel="noopener noreferrer"
          className="block"
        >
          <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-2xl p-6 text-primary-foreground hover:shadow-xl hover:shadow-green-500/20 transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-xl bg-primary-foreground/20 flex items-center justify-center">
                <MessageCircle className="w-7 h-7" />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-lg mb-1">Chat on WhatsApp</h4>
                <p className="text-primary-foreground/80 text-sm">Quick response guaranteed</p>
              </div>
              <Button
                variant="secondary"
                className="bg-primary-foreground text-green-600 hover:bg-primary-foreground/90"
              >
                Chat Now
              </Button>
            </div>
          </div>
        </a>
      </motion.div>

      {/* Map */}
      <motion.div
        className="rounded-2xl overflow-hidden shadow-lg border border-border/50 h-64 relative group"
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.6, duration: 0.5 }}
      >
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3678.5!2d86.23!3d22.83!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjLCsDQ5JzQ4LjAiTiA4NsKwMTMnNDguMCJF!5e0!3m2!1sen!2sin!4v1234567890"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Cross Angle Interior Location"
          className="grayscale group-hover:grayscale-0 transition-all duration-500"
        />
        
        {/* Map Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/20 to-transparent pointer-events-none" />
        
        {/* Pulse marker */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
          <div className="relative">
            <div className="w-4 h-4 bg-primary rounded-full" />
            <div className="absolute inset-0 w-4 h-4 bg-primary rounded-full animate-ping" />
          </div>
        </div>
      </motion.div>
    </div>
  );
};

interface ContactInfoCardProps {
  info: typeof contactInfo[0];
  index: number;
  isInView: boolean;
}

const ContactInfoCard = ({ info, index, isInView }: ContactInfoCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / 15;
    const y = (e.clientY - rect.top - rect.height / 2) / 15;
    setMousePosition({ x, y });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setMousePosition({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={cardRef}
      className="relative group"
      initial={{ opacity: 0, x: 30 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ delay: 0.1 + index * 0.1, duration: 0.5 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: isHovered 
          ? `perspective(1000px) rotateX(${-mousePosition.y}deg) rotateY(${mousePosition.x}deg)` 
          : 'perspective(1000px) rotateX(0deg) rotateY(0deg)',
        transition: 'transform 0.3s ease-out',
      }}
    >
      <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-5 hover:border-primary/30 transition-all duration-300 hover:shadow-lg">
        <div className="flex gap-4">
          <motion.div
            className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0"
            animate={isHovered ? { scale: 1.1, rotate: 5 } : { scale: 1, rotate: 0 }}
            transition={{ duration: 0.3 }}
          >
            <info.icon className="w-6 h-6 text-primary" />
          </motion.div>
          <div className="flex-1">
            <h4 className="font-semibold text-foreground mb-2">{info.title}</h4>
            {info.details.map((detail, i) => (
              <p key={i} className="text-muted-foreground text-sm">{detail}</p>
            ))}
            {info.action && (
              <a
                href={info.action}
                target={info.action.startsWith('http') ? '_blank' : undefined}
                rel={info.action.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="inline-block mt-2 text-primary text-sm font-medium hover:underline"
              >
                {info.actionLabel} →
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Glow effect */}
      <motion.div
        className="absolute inset-0 rounded-2xl pointer-events-none"
        style={{
          boxShadow: isHovered 
            ? '0 0 30px hsl(var(--primary) / 0.1)' 
            : 'none',
        }}
      />
    </motion.div>
  );
};

export default ContactInfo;
