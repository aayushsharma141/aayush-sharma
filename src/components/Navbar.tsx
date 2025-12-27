import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Phone, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import logoIcon from "@/assets/logo-icon.png";
import { cn } from "@/lib/utils";

const servicesMenu = {
  residential: [
    { name: "Living Room Design", href: "/services#living-room" },
    { name: "Bedroom Interior", href: "/services#bedroom" },
    { name: "Kitchen & Dining", href: "/services#kitchen" },
    { name: "Bathroom Design", href: "/services#bathroom" },
  ],
  commercial: [
    { name: "Office Design", href: "/services#office" },
    { name: "Retail Spaces", href: "/services#retail" },
    { name: "Restaurant & Cafe", href: "/services#restaurant" },
  ],
  specialized: [
    { name: "Modular Kitchen", href: "/services#modular-kitchen" },
    { name: "False Ceiling", href: "/services#false-ceiling" },
    { name: "Lighting Design", href: "/services#lighting" },
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
    { name: "About Us", href: "/about-us" },
    { name: "Services", href: "/services", hasMegaMenu: true },
    { name: "Our Works", href: "/gallery" },
    { name: "Blog", href: "/blog" },
    { name: "Contact Us", href: "/contact-us" },
  ];

  const isHomePage = location.pathname === "/";
  const showTransparent = isHomePage && !isScrolled;

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        showTransparent 
          ? 'bg-transparent py-4' 
          : 'bg-background/95 backdrop-blur-lg shadow-lg py-2'
      }`}
    >
      <nav className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <Link 
            to="/" 
            className="flex items-center gap-3 group"
          >
            {/* Logo Icon - Static with transparent background */}
            <div className="relative">
              <img 
                src={logoIcon} 
                alt="Cross Angle Interior"
                className="h-12 md:h-14 w-auto"
                style={{ imageRendering: 'crisp-edges' }}
              />
            </div>
            {/* Animated Brand Text with Shimmer */}
            <div className="font-serif text-xl md:text-2xl font-bold transition-all duration-500 group-hover:tracking-wider group-hover:scale-105">
              <span className="bg-gradient-to-r from-primary via-secondary to-primary bg-[length:200%_auto] bg-clip-text text-transparent animate-text-shimmer">
                Crossangle
              </span>
              {" "}
              <span className={`transition-colors duration-300 ${showTransparent ? 'text-primary-foreground' : 'text-foreground'}`}>
                Interior
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
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
                    "relative font-medium transition-colors duration-300 hover:text-primary group flex items-center gap-1",
                    showTransparent ? 'text-primary-foreground/80' : 'text-muted-foreground',
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
                  <span className={`absolute -bottom-1 left-0 h-0.5 bg-primary transition-all duration-300 ${location.pathname === link.href ? 'w-full' : 'w-0 group-hover:w-full'}`} />
                </Link>

                {/* Mega Menu */}
                {link.hasMegaMenu && (
                  <div
                    className={cn(
                      "absolute top-full left-1/2 -translate-x-1/2 pt-4 transition-all duration-300",
                      isMegaMenuOpen ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-2"
                    )}
                  >
                    <div className="bg-background/95 backdrop-blur-lg rounded-2xl shadow-xl border border-border p-6 min-w-[600px]">
                      <div className="grid grid-cols-3 gap-6">
                        {/* Residential */}
                        <div>
                          <h4 className="font-semibold text-foreground mb-3 text-sm uppercase tracking-wider">
                            Residential
                          </h4>
                          <ul className="space-y-2">
                            {servicesMenu.residential.map((item) => (
                              <li key={item.name}>
                                <Link
                                  to={item.href}
                                  className="text-muted-foreground hover:text-primary transition-colors text-sm block py-1"
                                  onClick={() => setIsMegaMenuOpen(false)}
                                >
                                  {item.name}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Commercial */}
                        <div>
                          <h4 className="font-semibold text-foreground mb-3 text-sm uppercase tracking-wider">
                            Commercial
                          </h4>
                          <ul className="space-y-2">
                            {servicesMenu.commercial.map((item) => (
                              <li key={item.name}>
                                <Link
                                  to={item.href}
                                  className="text-muted-foreground hover:text-primary transition-colors text-sm block py-1"
                                  onClick={() => setIsMegaMenuOpen(false)}
                                >
                                  {item.name}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Specialized */}
                        <div>
                          <h4 className="font-semibold text-foreground mb-3 text-sm uppercase tracking-wider">
                            Specialized
                          </h4>
                          <ul className="space-y-2">
                            {servicesMenu.specialized.map((item) => (
                              <li key={item.name}>
                                <Link
                                  to={item.href}
                                  className="text-muted-foreground hover:text-primary transition-colors text-sm block py-1"
                                  onClick={() => setIsMegaMenuOpen(false)}
                                >
                                  {item.name}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      {/* CTA in Mega Menu */}
                      <div className="mt-6 pt-4 border-t border-border flex items-center justify-between">
                        <p className="text-sm text-muted-foreground">
                          Not sure what you need?
                        </p>
                        <Link to="/contact-us" onClick={() => setIsMegaMenuOpen(false)}>
                          <Button size="sm">Get Free Consultation</Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-4">
            <a 
              href="tel:+917909041132" 
              className={`flex items-center gap-2 font-medium transition-colors duration-300 hover:text-primary ${
                showTransparent ? 'text-primary-foreground' : 'text-foreground'
              }`}
            >
              <Phone className="w-4 h-4" />
              <span>+91 7909041132</span>
            </a>
            <Link to="/contact-us">
              <Button className="shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all duration-300">
                Get A Quote
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className={`lg:hidden p-2 rounded-lg transition-colors ${
              showTransparent 
                ? 'text-primary-foreground hover:bg-primary-foreground/10' 
                : 'text-foreground hover:bg-accent'
            }`}
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <div 
          className={`lg:hidden overflow-hidden transition-all duration-500 ${
            isOpen ? 'max-h-[600px] opacity-100 mt-6' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="bg-background/95 backdrop-blur-lg rounded-2xl p-6 border border-border shadow-xl">
            <div className="flex flex-col gap-4">
              {navLinks.map((link, index) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className={`transition-colors duration-300 font-medium text-lg py-2 border-b border-border/50 last:border-0 ${
                    location.pathname === link.href ? 'text-primary' : 'text-foreground hover:text-primary'
                  }`}
                  onClick={() => setIsOpen(false)}
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  {link.name}
                </Link>
              ))}
              <div className="pt-4 flex flex-col gap-3">
                <a 
                  href="tel:+917909041132" 
                  className="flex items-center gap-2 text-muted-foreground font-medium"
                >
                  <Phone className="w-4 h-4" />
                  <span>+91 7909041132</span>
                </a>
                <Link to="/contact-us" onClick={() => setIsOpen(false)}>
                  <Button className="w-full shadow-lg">Get A Quote</Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;