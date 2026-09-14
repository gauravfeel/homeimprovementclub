import { Link } from "react-router-dom";
import logo from "@/assets/hic-logo-small.png";
import { ContactInfo } from "@/components/ContactInfo";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { SERVICES } from "@/data/services";
import bcHousingLogo from "@/assets/partners/bc-housing.png";
import warrantyLogo from "@/assets/partners/2-5-10-warranty.png";
import wbiLogo from "@/assets/partners/wbi-home-warranty.png";
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
            Custom homes. Multiplex expertise. Renovations.
            <br />
            Greater Vancouver and the Fraser Valley, British Columbia.
          </p>
          <ContactInfo />
          <WhatsAppButton variant="footer" />
        </div>
        <nav aria-label="Footer services">
          <p className="eyebrow">Build & renovate</p>
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
          <Link to="/investment-partnerships">Investment & partnerships</Link>
          <Link to="/rebates">BC rebate resources</Link>
          <Link to="/testimonials">Client stories</Link>
          <Link to="/contact">Contact</Link>
        </nav>
      </div>
      <div className="footer-credentials" aria-label="Builder credentials and warranty">
        <p className="eyebrow">Builder credentials & warranty</p>
        <div className="footer-credential-logos">
          <img src={wbiLogo} alt="WBI Home Warranty" />
          <img src={bcHousingLogo} alt="BC Housing" />
          <img src={warrantyLogo} alt="2-5-10 Year Warranty" />
        </div>
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} Home Improvement Club</span>
        <div className="footer-legal">
          <Link to="/privacy">Privacy policy</Link>
          <span>Spaces for the life you live.</span>
        </div>
      </div>
    </footer>
  );
}
