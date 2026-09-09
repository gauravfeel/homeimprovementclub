import { Link } from "react-router-dom";
import logo from "@/assets/hic-logo-small.png";
import { ContactInfo } from "@/components/ContactInfo";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { SERVICES } from "@/data/services";
export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-main">
        <div>
          <Link className="brand" to="/">
            <img
              src={logo}
              alt="Home Improvement Club"
              width="48"
              height="48"
            />
            <span>Home Improvement Club</span>
          </Link>
          <p>
            Thoughtful renovations.
            <br />
            Greater Vancouver, British Columbia.
          </p>
          <ContactInfo />
          <WhatsAppButton variant="footer" />
        </div>
        <nav aria-label="Footer services">
          <p className="eyebrow">Your home</p>
          {SERVICES.map((s) => (
            <Link key={s.slug} to={`/services/${s.slug}`}>
              {s.label}
            </Link>
          ))}
        </nav>
        <nav aria-label="Footer company">
          <p className="eyebrow">The club</p>
          <Link to="/about">About HIC</Link>
          <Link to="/how-it-works">Our process</Link>
          <Link to="/areas-we-serve">Service area</Link>
          <Link to="/rebates">BC rebate resources</Link>
          <Link to="/testimonials">Client stories</Link>
          <Link to="/contact">Contact</Link>
        </nav>
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} Home Improvement Club</span>
        <span>Spaces for the life you live.</span>
      </div>
    </footer>
  );
}
