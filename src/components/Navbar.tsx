import { useState, useEffect } from "react";
import { Menu, X, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "Services", href: "#services" },
    { name: "Portfolio", href: "#portfolio" },
    { name: "About", href: "#about" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? 'bg-background/95 backdrop-blur-lg shadow-lg py-2' 
          : 'bg-transparent py-4'
      }`}
    >
      <nav className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <a 
            href="#home" 
            className="font-serif text-2xl md:text-3xl font-bold group"
          >
            <span className={`transition-colors duration-300 ${isScrolled ? 'text-primary' : 'text-primary'}`}>
              Crossangle
            </span>
            {" "}
            <span className={`transition-colors duration-300 ${isScrolled ? 'text-foreground' : 'text-primary-foreground'}`}>
              Interior
            </span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-10">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={`relative font-medium transition-colors duration-300 hover:text-primary group ${
                  isScrolled ? 'text-muted-foreground' : 'text-primary-foreground/80'
                }`}
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-4">
            <a 
              href="tel:+1234567890" 
              className={`flex items-center gap-2 font-medium transition-colors duration-300 hover:text-primary ${
                isScrolled ? 'text-foreground' : 'text-primary-foreground'
              }`}
            >
              <Phone className="w-4 h-4" />
              <span>+1 234 567 890</span>
            </a>
            <Button className="shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all duration-300">
              Book Consultation
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className={`lg:hidden p-2 rounded-lg transition-colors ${
              isScrolled 
                ? 'text-foreground hover:bg-accent' 
                : 'text-primary-foreground hover:bg-primary-foreground/10'
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
            isOpen ? 'max-h-96 opacity-100 mt-6' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="bg-background/95 backdrop-blur-lg rounded-2xl p-6 border border-border shadow-xl">
            <div className="flex flex-col gap-4">
              {navLinks.map((link, index) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-foreground hover:text-primary transition-colors duration-300 font-medium text-lg py-2 border-b border-border/50 last:border-0"
                  onClick={() => setIsOpen(false)}
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  {link.name}
                </a>
              ))}
              <div className="pt-4 flex flex-col gap-3">
                <a 
                  href="tel:+1234567890" 
                  className="flex items-center gap-2 text-muted-foreground font-medium"
                >
                  <Phone className="w-4 h-4" />
                  <span>+1 234 567 890</span>
                </a>
                <Button className="w-full shadow-lg">Book Consultation</Button>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
