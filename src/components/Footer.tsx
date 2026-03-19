import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="bg-foreground text-background">
    <div className="max-w-7xl mx-auto section-padding">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
        <div className="md:col-span-2">
          <h3 className="font-display text-2xl font-semibold mb-4">Home Improvement Club</h3>
          <p className="text-background/60 max-w-md leading-relaxed">
            Helping homeowners upgrade their lifestyle through curated home improvement services. 
            Premium results, effortless experience.
          </p>
        </div>
        <div>
          <h4 className="font-sans text-sm font-semibold uppercase tracking-widest mb-4 text-background/40">Navigate</h4>
          <div className="flex flex-col gap-3">
            {[
              { label: "How It Works", path: "/how-it-works" },
              { label: "Services", path: "/services" },
              { label: "About", path: "/about" },
              { label: "Testimonials", path: "/testimonials" },
            ].map((link) => (
              <Link key={link.path} to={link.path} className="text-background/60 hover:text-background transition-colors text-sm">
                {link.label}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <h4 className="font-sans text-sm font-semibold uppercase tracking-widest mb-4 text-background/40">Connect</h4>
          <div className="flex flex-col gap-3">
            <Link to="/contact" className="text-background/60 hover:text-background transition-colors text-sm">Contact Us</Link>
            <Link to="/contractors" className="text-background/60 hover:text-background transition-colors text-sm">For Contractors</Link>
          </div>
        </div>
      </div>
      <div className="border-t border-background/10 pt-8 text-center">
        <p className="text-background/40 text-sm">© 2026 Home Improvement Club. All rights reserved.</p>
      </div>
    </div>
  </footer>
);

export default Footer;
