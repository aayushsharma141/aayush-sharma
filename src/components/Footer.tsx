import { Link } from "react-router-dom";
import { Instagram, Facebook, Linkedin, Twitter, Phone, Mail, MapPin } from "lucide-react";
import logoIcon from "@/assets/logo-icon.png";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about-us" },
    { name: "Services", href: "/services" },
    { name: "Our Works", href: "/gallery" },
    { name: "Blog", href: "/blog" },
    { name: "Contact Us", href: "/contact-us" },
  ];

  const services = [
    { name: "Planning", href: "/services" },
    { name: "Interior Design", href: "/services" },
    { name: "Exterior Design", href: "/services" },
    { name: "Consultation", href: "/services" },
    { name: "Turnkey Project", href: "/services" },
    { name: "Miniature Model", href: "/services" },
  ];

  const socialLinks = [
    { icon: Instagram, href: "https://www.instagram.com/crossangleinterior/", label: "Instagram" },
    { icon: Facebook, href: "https://www.facebook.com/crossangleinterior", label: "Facebook" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: Twitter, href: "#", label: "Twitter" },
  ];

  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand & Contact */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-3">
              <img 
                src={logoIcon} 
                alt="Cross Angle Interior"
                className="h-12 w-auto drop-shadow-md"
                style={{ imageRendering: 'crisp-edges' }}
              />
              <span className="font-serif text-2xl font-bold">
                <span className="text-primary">Crossangle</span>{" "}
                <span className="text-secondary-foreground">Interior</span>
              </span>
            </Link>
            <p className="text-secondary-foreground/80 mt-4 mb-6">
              Transforming your vision into exquisite living spaces with innovative and personalized interior design solutions.
            </p>
            
            <div className="space-y-3 text-sm">
              <a href="tel:+917909041132" className="flex items-center gap-2 text-secondary-foreground/80 hover:text-primary transition-colors">
                <Phone className="w-4 h-4" />
                <span>+91 7909041132</span>
              </a>
              <a href="tel:+919304853659" className="flex items-center gap-2 text-secondary-foreground/80 hover:text-primary transition-colors">
                <Phone className="w-4 h-4" />
                <span>+91 9304853659</span>
              </a>
              <a href="mailto:info@crossangleinterior.com" className="flex items-center gap-2 text-secondary-foreground/80 hover:text-primary transition-colors">
                <Mail className="w-4 h-4" />
                <span>info@crossangleinterior.com</span>
              </a>
              <div className="flex items-start gap-2 text-secondary-foreground/80">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>2-G, 2nd floor, Aditya Signature building, Dimna Rd, Mango, Jamshedpur, Jharkhand 831012</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.href}
                    className="text-secondary-foreground/80 hover:text-primary transition-colors duration-300"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold mb-4">Our Services</h4>
            <ul className="space-y-3">
              {services.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.href}
                    className="text-secondary-foreground/80 hover:text-primary transition-colors duration-300"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social & Newsletter */}
          <div>
            <h4 className="font-semibold mb-4">Follow Us</h4>
            <div className="flex gap-3 mb-6">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="w-10 h-10 bg-secondary-foreground/10 rounded-full flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors duration-300"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
            <div className="bg-secondary-foreground/5 p-4 rounded-lg">
              <p className="text-sm text-secondary-foreground/80 mb-2">
                Ready to transform your space?
              </p>
              <Link 
                to="/contact-us"
                className="text-primary font-medium text-sm hover:underline"
              >
                Get A Free Quote →
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-secondary-foreground/20 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-secondary-foreground/60 text-sm">
            © {currentYear} Crossangle Interior. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm">
            <a href="#" className="text-secondary-foreground/60 hover:text-primary transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-secondary-foreground/60 hover:text-primary transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
