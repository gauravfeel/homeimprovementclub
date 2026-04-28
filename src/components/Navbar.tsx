import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import logo from "@/assets/hic-logo.png";
import { ContactInfo } from "@/components/ContactInfo";

const navLinks = [
  { label: "How It Works", path: "/how-it-works" },
  { label: "Services", path: "/services" },
  { label: "BC Rebates", path: "/rebates" },
  { label: "About", path: "/about" },
];

const serviceLinks = [
  { label: "Kitchen & Cabinets", path: "/services/kitchen-cabinets" },
  { label: "Bathrooms", path: "/services/bathrooms" },
  { label: "Lighting", path: "/services/lighting" },
  { label: "Tile & Flooring", path: "/services/flooring" },
  { label: "HVAC & Electrical", path: "/services/hvac-electrical" },
  { label: "Exterior Renovations", path: "/services/exterior" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const location = useLocation();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border/50">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3 px-6 py-3">
        <Link to="/" className="flex items-center gap-3 min-w-0 shrink" aria-label="Home Improvement Club">
          <img src={logo} alt="Home Improvement Club" className="h-10 w-auto shrink-0" />
          <span className="hidden sm:inline font-display text-base font-semibold tracking-tight text-foreground truncate">
            Home Improvement Club
          </span>
        </Link>

        {/* Desktop */}
        <div className="hidden lg:flex items-center gap-6 xl:gap-8">
          <div
            className="relative"
            onMouseEnter={() => setServicesOpen(true)}
            onMouseLeave={() => setServicesOpen(false)}
          >
            <Link
              to="/services"
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary inline-flex items-center gap-1",
                location.pathname.startsWith("/services") ? "text-primary" : "text-muted-foreground"
              )}
            >
              Services <ChevronDown size={14} />
            </Link>
            {servicesOpen && (
              <div className="absolute top-full left-0 pt-3 w-64">
                <div className="bg-background border border-border rounded-xl shadow-lg p-2">
                  {serviceLinks.map((s) => (
                    <Link
                      key={s.path}
                      to={s.path}
                      className="block px-4 py-2.5 text-sm text-foreground/80 hover:text-primary hover:bg-card rounded-lg transition-colors"
                    >
                      {s.label}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
          {navLinks
            .filter((l) => l.path !== "/services")
            .map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary",
                  location.pathname === link.path ? "text-primary" : "text-muted-foreground"
                )}
              >
                {link.label}
              </Link>
            ))}
          <ContactInfo
            linkClassName="text-muted-foreground hover:text-primary"
            iconClassName="text-primary"
          />
          <Button variant="hero" size="lg" asChild>
            <Link to="/contact">Book Consultation</Link>
          </Button>
        </div>

        {/* Mobile: phone + menu */}
        <div className="flex lg:hidden items-center gap-2 shrink-0">
          <ContactInfo
            compact
            linkClassName="text-foreground/90 hover:text-primary"
            iconClassName="text-primary"
          />
          <button type="button" className="text-foreground p-1 -mr-1" onClick={() => setOpen(!open)} aria-label="Menu">
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="lg:hidden bg-background border-b border-border px-6 pb-6 animate-fade-in max-h-[80vh] overflow-y-auto">
          <div className="flex flex-col gap-1 pt-2">
            <Link to="/" onClick={() => setOpen(false)} className="text-base font-medium py-2.5 text-foreground hover:text-primary">Home</Link>
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setOpen(false)}
                className={cn(
                  "text-base font-medium py-2.5 transition-colors hover:text-primary",
                  location.pathname === link.path ? "text-primary" : "text-foreground"
                )}
              >
                {link.label}
              </Link>
            ))}
            <p className="text-xs uppercase tracking-widest text-muted-foreground mt-4 mb-1">Service Pages</p>
            {serviceLinks.map((s) => (
              <Link
                key={s.path}
                to={s.path}
                onClick={() => setOpen(false)}
                className="text-sm py-2 text-foreground/80 hover:text-primary"
              >
                {s.label}
              </Link>
            ))}
            <Button variant="hero" size="lg" asChild className="mt-4">
              <Link to="/contact" onClick={() => setOpen(false)}>Book Consultation</Link>
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
