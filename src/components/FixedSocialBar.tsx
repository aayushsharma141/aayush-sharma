import { Instagram, Youtube, Phone, Facebook, MapPin } from "lucide-react";
import { useState } from "react";

const socialLinks = [
  {
    icon: Instagram,
    label: "Instagram",
    href: "https://instagram.com",
    color: "hover:bg-gradient-to-br hover:from-purple-500 hover:via-pink-500 hover:to-orange-400",
  },
  {
    icon: Youtube,
    label: "YouTube",
    href: "https://youtube.com",
    color: "hover:bg-red-600",
  },
  {
    icon: Phone,
    label: "WhatsApp",
    href: "https://wa.me/1234567890",
    color: "hover:bg-green-500",
  },
  {
    icon: Facebook,
    label: "Facebook",
    href: "https://facebook.com",
    color: "hover:bg-blue-600",
  },
  {
    icon: MapPin,
    label: "Pinterest",
    href: "https://pinterest.com",
    color: "hover:bg-red-500",
  },
];

const FixedSocialBar = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className="fixed left-0 top-1/2 -translate-y-1/2 z-50 hidden md:flex flex-col">
      {socialLinks.map((social, index) => (
        <a
          key={social.label}
          href={social.href}
          target="_blank"
          rel="noopener noreferrer"
          className={`group relative flex items-center justify-center w-12 h-12 bg-foreground/90 text-background transition-all duration-300 ${social.color} hover:w-36 hover:text-white`}
          onMouseEnter={() => setHoveredIndex(index)}
          onMouseLeave={() => setHoveredIndex(null)}
          style={{
            transitionDelay: hoveredIndex === index ? "0ms" : "50ms",
          }}
        >
          <social.icon className="w-5 h-5 min-w-5 transition-transform duration-300 group-hover:scale-110" />
          <span
            className={`ml-3 text-sm font-medium whitespace-nowrap overflow-hidden transition-all duration-300 ${
              hoveredIndex === index ? "opacity-100 max-w-24" : "opacity-0 max-w-0"
            }`}
          >
            {social.label}
          </span>
        </a>
      ))}
    </div>
  );
};

export default FixedSocialBar;
