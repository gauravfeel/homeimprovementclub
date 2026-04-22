import { Link } from "react-router-dom";
import logo from "@/assets/hic-logo.png";

const Footer = () => (
  <footer className="bg-foreground text-background">
    <div className="max-w-7xl mx-auto section-padding">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
        <div className="md:col-span-2">
          <div className="flex items-center gap-3 mb-5">
            <img src={logo} alt="Home Improvement Club" className="h-12 w-auto brightness-0 invert" />
            <h3 className="font-display text-xl font-semibold">Home Improvement Club</h3>
          </div>
          <p className="text-background/60 max-w-md leading-relaxed">
            Premium home renovations serving Abbotsford, Chilliwack, Hope, and Langley. Vetted craftsmanship in kitchens, bathrooms, lighting, tile, HVAC, and exterior transformations.
          </p>
        </div>
        <div>
          <h4 className="font-sans text-sm font-semibold uppercase tracking-widest mb-4 text-background/40">Services</h4>
          <div className="flex flex-col gap-3">
            {[
              { label: "Kitchen & Cabinets", path: "/services/kitchen-cabinets" },
              { label: "Bathrooms", path: "/services/bathrooms" },
              { label: "Lighting", path: "/services/lighting" },
              { label: "Tile & Flooring", path: "/services/flooring" },
              { label: "HVAC & Electrical", path: "/services/hvac-electrical" },
              { label: "Exterior", path: "/services/exterior" },
            ].map((link) => (
              <Link key={link.path} to={link.path} className="text-background/60 hover:text-background transition-colors text-sm">
                {link.label}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <h4 className="font-sans text-sm font-semibold uppercase tracking-widest mb-4 text-background/40">Company</h4>
          <div className="flex flex-col gap-3">
            <Link to="/how-it-works" className="text-background/60 hover:text-background transition-colors text-sm">How It Works</Link>
            <Link to="/about" className="text-background/60 hover:text-background transition-colors text-sm">About</Link>
            <Link to="/rebates" className="text-background/60 hover:text-background transition-colors text-sm">BC Rebates</Link>
            <Link to="/testimonials" className="text-background/60 hover:text-background transition-colors text-sm">Testimonials</Link>
            <Link to="/contact" className="text-background/60 hover:text-background transition-colors text-sm">Book Consultation</Link>
            <Link to="/contractors" className="text-background/60 hover:text-background transition-colors text-sm">For Contractors</Link>
          </div>
        </div>
      </div>
      <div className="border-t border-background/10 pt-8 flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="flex items-center gap-3">
          <img src={logo} alt="Home Improvement Club" className="h-8 w-auto brightness-0 invert" />
          <p className="text-background/40 text-sm">© 2026 Home Improvement Club. Serving the Fraser Valley.</p>
        </div>
        <p className="text-background/40 text-xs">Premium renovations · Vetted professionals · Transparent process</p>
      </div>
    </div>
  </footer>
);

export default Footer;
