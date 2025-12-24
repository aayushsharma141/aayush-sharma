import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import logoIcon from "@/assets/logo-icon.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
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
    { name: "Services", href: "/services" },
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
                className="h-10 md:h-12 w-auto drop-shadow-md"
                style={{ imageRendering: 'crisp-edges' }}
              />
            </div>
            {/* Animated Brand Text with Shimmer */}
            <div className="font-serif text-xl md:text-2xl font-bold transition-all duration-500 group-hover:tracking-wider group-hover:scale-105">
              <span className="bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_auto] bg-clip-text text-transparent animate-text-shimmer">
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
              <Link
                key={link.name}
                to={link.href}
                className={`relative font-medium transition-colors duration-300 hover:text-primary group ${
                  showTransparent ? 'text-primary-foreground/80' : 'text-muted-foreground'
                } ${location.pathname === link.href ? 'text-primary' : ''}`}
              >
                {link.name}
                <span className={`absolute -bottom-1 left-0 h-0.5 bg-primary transition-all duration-300 ${location.pathname === link.href ? 'w-full' : 'w-0 group-hover:w-full'}`} />
              </Link>
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
            isOpen ? 'max-h-[500px] opacity-100 mt-6' : 'max-h-0 opacity-0'
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