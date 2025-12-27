import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Phone, ChevronDown, Home, Building2, Sofa, UtensilsCrossed, Lamp, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import logoIcon from "@/assets/logo-icon.png";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

const servicesMenu = {
  residential: [
    { name: "Living Room Design", href: "/services#living-room", description: "Elegant spaces for daily living", icon: Sofa },
    { name: "Bedroom Interior", href: "/services#bedroom", description: "Peaceful sanctuaries for rest", icon: Home },
    { name: "Kitchen & Dining", href: "/services#kitchen", description: "Heart of your home", icon: UtensilsCrossed },
  ],
  commercial: [
    { name: "Office Design", href: "/services#office", description: "Productive work environments", icon: Building2 },
    { name: "Retail Spaces", href: "/services#retail", description: "Engaging customer experiences", icon: Building2 },
    { name: "Restaurant & Cafe", href: "/services#restaurant", description: "Memorable dining atmospheres", icon: UtensilsCrossed },
  ],
  specialized: [
    { name: "Modular Kitchen", href: "/services#modular-kitchen", description: "Factory-finished, quick install", icon: UtensilsCrossed, badge: "Popular" },
    { name: "False Ceiling", href: "/services#false-ceiling", description: "Architectural elegance", icon: Lamp },
    { name: "Lighting Design", href: "/services#lighting", description: "Ambiance that transforms", icon: Lamp },
  ],
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Services", href: "/services", hasMegaMenu: true },
    { name: "Projects", href: "/gallery" },
    { name: "About", href: "/about-us" },
    { name: "Blog", href: "/blog" },
  ];

  const isHomePage = location.pathname === "/";
  const showTransparent = isHomePage && !isScrolled;

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        showTransparent 
          ? 'bg-transparent py-5' 
          : 'bg-background/95 backdrop-blur-lg shadow-lg py-3 border-b border-border/50'
      )}
    >
      <nav className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <Link 
            to="/" 
            className="flex items-center gap-4 group"
          >
            {/* Logo Icon - Larger with more breathing room */}
            <div className="relative">
              <motion.img 
                src={logoIcon} 
                alt="Cross Angle Interior"
                className={cn(
                  "w-auto transition-all duration-500",
                  isScrolled ? "h-12 md:h-14" : "h-14 md:h-16"
                )}
                style={{ imageRendering: 'crisp-edges' }}
                whileHover={{ scale: 1.05 }}
              />
            </div>
            {/* Animated Brand Text with Shimmer - Bolder */}
            <div className="font-serif text-xl md:text-2xl lg:text-[1.7rem] font-bold transition-all duration-500 group-hover:tracking-wider">
              <span className="bg-gradient-to-r from-primary via-secondary to-primary bg-[length:200%_auto] bg-clip-text text-transparent animate-text-shimmer font-extrabold">
                Crossangle
              </span>
              {" "}
              <span className={cn(
                "transition-colors duration-300 font-semibold",
                showTransparent ? 'text-primary-foreground' : 'text-foreground'
              )}>
                Interior
              </span>
            </div>
          </Link>

          {/* Desktop Navigation - Increased gaps */}
          <div className="hidden lg:flex items-center gap-10">
            {navLinks.map((link) => (
              <div
                key={link.name}
                className="relative"
                onMouseEnter={() => link.hasMegaMenu && setIsMegaMenuOpen(true)}
                onMouseLeave={() => link.hasMegaMenu && setIsMegaMenuOpen(false)}
              >
                <Link
                  to={link.href}
                  className={cn(
                    "relative font-medium transition-all duration-300 hover:text-primary group flex items-center gap-1 py-2",
                    showTransparent ? 'text-primary-foreground/90' : 'text-muted-foreground',
                    location.pathname === link.href && 'text-primary'
                  )}
                >
                  {link.name}
                  {link.hasMegaMenu && (
                    <ChevronDown className={cn(
                      "w-4 h-4 transition-transform duration-300",
                      isMegaMenuOpen && "rotate-180"
                    )} />
                  )}
                  <span className={cn(
                    "absolute -bottom-0 left-0 h-0.5 bg-primary transition-all duration-300 rounded-full",
                    location.pathname === link.href ? 'w-full' : 'w-0 group-hover:w-full'
                  )} />
                </Link>

                {/* Enhanced Mega Menu - Centered with Solid Blurred Background */}
                {link.hasMegaMenu && (
                  <AnimatePresence>
                    {isMegaMenuOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 15, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 15, scale: 0.95 }}
                        transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
                        className="fixed left-1/2 -translate-x-1/2 pt-6 z-50"
                        style={{ top: isScrolled ? "70px" : "85px" }}
                      >
                        <div className="bg-background/98 backdrop-blur-2xl rounded-2xl shadow-2xl border border-border p-8 min-w-[720px] relative">
                          {/* Subtle gradient overlay for depth */}
                          <div className="absolute inset-0 bg-gradient-to-b from-primary/[0.02] to-transparent rounded-2xl pointer-events-none" />
                          
                          <div className="grid grid-cols-3 gap-8 relative">
                            {/* Residential */}
                            <div>
                              <h4 className="font-semibold mb-4 text-xs uppercase tracking-widest text-primary flex items-center gap-2">
                                <span className="w-6 h-px bg-primary/50" />
                                Residential
                              </h4>
                              <ul className="space-y-1">
                                {servicesMenu.residential.map((item) => (
                                  <li key={item.name}>
                                    <Link
                                      to={item.href}
                                      className="group/item flex items-start gap-3 p-3 rounded-xl hover:bg-accent/60 transition-all duration-300"
                                      onClick={() => setIsMegaMenuOpen(false)}
                                    >
                                      <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center group-hover/item:bg-primary group-hover/item:scale-110 transition-all duration-300">
                                        <item.icon className="w-4 h-4 text-primary group-hover/item:text-primary-foreground transition-colors" />
                                      </div>
                                      <div>
                                        <span className="text-foreground font-medium text-sm block group-hover/item:text-primary transition-colors">
                                          {item.name}
                                        </span>
                                        <span className="text-muted-foreground text-xs">
                                          {item.description}
                                        </span>
                                      </div>
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </div>

                            {/* Commercial */}
                            <div>
                              <h4 className="font-semibold mb-4 text-xs uppercase tracking-widest text-primary flex items-center gap-2">
                                <span className="w-6 h-px bg-primary/50" />
                                Commercial
                              </h4>
                              <ul className="space-y-1">
                                {servicesMenu.commercial.map((item) => (
                                  <li key={item.name}>
                                    <Link
                                      to={item.href}
                                      className="group/item flex items-start gap-3 p-3 rounded-xl hover:bg-accent/60 transition-all duration-300"
                                      onClick={() => setIsMegaMenuOpen(false)}
                                    >
                                      <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center group-hover/item:bg-primary group-hover/item:scale-110 transition-all duration-300">
                                        <item.icon className="w-4 h-4 text-primary group-hover/item:text-primary-foreground transition-colors" />
                                      </div>
                                      <div>
                                        <span className="text-foreground font-medium text-sm block group-hover/item:text-primary transition-colors">
                                          {item.name}
                                        </span>
                                        <span className="text-muted-foreground text-xs">
                                          {item.description}
                                        </span>
                                      </div>
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </div>

                            {/* Specialized */}
                            <div>
                              <h4 className="font-semibold mb-4 text-xs uppercase tracking-widest text-primary flex items-center gap-2">
                                <span className="w-6 h-px bg-primary/50" />
                                Specialized
                              </h4>
                              <ul className="space-y-1">
                                {servicesMenu.specialized.map((item) => (
                                  <li key={item.name}>
                                    <Link
                                      to={item.href}
                                      className="group/item flex items-start gap-3 p-3 rounded-xl hover:bg-accent/60 transition-all duration-300"
                                      onClick={() => setIsMegaMenuOpen(false)}
                                    >
                                      <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center group-hover/item:bg-primary group-hover/item:scale-110 transition-all duration-300">
                                        <item.icon className="w-4 h-4 text-primary group-hover/item:text-primary-foreground transition-colors" />
                                      </div>
                                      <div className="flex-1">
                                        <div className="flex items-center gap-2">
                                          <span className="text-foreground font-medium text-sm group-hover/item:text-primary transition-colors">
                                            {item.name}
                                          </span>
                                          {item.badge && (
                                            <span className="text-[10px] bg-primary/15 text-primary px-2 py-0.5 rounded-full font-medium border border-primary/20">
                                              {item.badge}
                                            </span>
                                          )}
                                        </div>
                                        <span className="text-muted-foreground text-xs">
                                          {item.description}
                                        </span>
                                      </div>
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>

                          {/* CTA in Mega Menu */}
                          <div className="mt-8 pt-6 border-t border-border flex items-center justify-between">
                            <p className="text-sm text-muted-foreground">
                              Not sure what you need? Let's discuss your vision.
                            </p>
                            <Link to="/contact-us" onClick={() => setIsMegaMenuOpen(false)}>
                              <Button size="sm" className="shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all">
                                Book Free Consultation
                              </Button>
                            </Link>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </div>
            ))}
          </div>

          {/* Phone + CTA - Enhanced */}
          <div className="hidden lg:flex items-center gap-6">
            <a 
              href="https://wa.me/917909041132" 
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "flex flex-col items-end transition-colors duration-300 hover:text-primary group",
                showTransparent ? 'text-primary-foreground' : 'text-foreground'
              )}
            >
              <span className="text-[10px] uppercase tracking-wider font-medium text-primary mb-0.5">
                Free Site Visit
              </span>
              <span className="flex items-center gap-2 font-medium">
                <MessageCircle className="w-4 h-4 group-hover:scale-110 transition-transform" />
                +91 7909041132
              </span>
            </a>
            <Link to="/contact-us">
              <Button 
                className="px-6 py-5 rounded-xl shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/35 transition-all duration-500 hover:-translate-y-0.5 font-medium"
              >
                Book Consultation
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className={cn(
              "lg:hidden p-2 rounded-xl transition-colors",
              showTransparent 
                ? 'text-primary-foreground hover:bg-primary-foreground/10' 
                : 'text-foreground hover:bg-accent'
            )}
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden overflow-hidden mt-6"
            >
              <div className="bg-background/98 backdrop-blur-xl rounded-2xl p-6 border border-border/50 shadow-2xl">
                <div className="flex flex-col gap-2">
                  {navLinks.map((link, index) => (
                    <motion.div
                      key={link.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <Link
                        to={link.href}
                        className={cn(
                          "transition-colors duration-300 font-medium text-lg py-3 px-4 rounded-xl block",
                          location.pathname === link.href 
                            ? 'text-primary bg-primary/10' 
                            : 'text-foreground hover:text-primary hover:bg-accent/50'
                        )}
                        onClick={() => setIsOpen(false)}
                      >
                        {link.name}
                      </Link>
                    </motion.div>
                  ))}
                  <div className="pt-4 mt-2 border-t border-border/50 flex flex-col gap-4">
                    <a 
                      href="https://wa.me/917909041132" 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 text-muted-foreground font-medium px-4"
                    >
                      <MessageCircle className="w-5 h-5 text-primary" />
                      <div>
                        <span className="text-[10px] uppercase tracking-wider text-primary block">Free Site Visit</span>
                        <span>+91 7909041132</span>
                      </div>
                    </a>
                    <Link to="/contact-us" onClick={() => setIsOpen(false)}>
                      <Button className="w-full shadow-lg py-6 rounded-xl text-base">
                        Book Consultation
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
};

export default Navbar;
