import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { ArrowUpRight, Menu, X } from "lucide-react";
import logo from "@/assets/hic-logo-small.png";
import { ContactInfo } from "@/components/ContactInfo";
import { SERVICES } from "@/data/services";
export default function Navbar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const toggle = useRef<HTMLButtonElement>(null);
  const firstLink = useRef<HTMLAnchorElement>(null);
  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);
  useEffect(() => {
    document.documentElement.classList.toggle("menu-open", open);
    if (open) firstLink.current?.focus();
    return () => document.documentElement.classList.remove("menu-open");
  }, [open]);
  useEffect(() => {
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        toggle.current?.focus();
      }
    };
    document.addEventListener("keydown", close);
    return () => document.removeEventListener("keydown", close);
  }, []);
  return (
    <header className="site-header">
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>
      <div className="header-inner">
        <Link className="brand" to="/" aria-label="Home Improvement Club home">
          <img src={logo} alt="" width="48" height="48" />
          <span>Home Improvement Club</span>
        </Link>
        <nav className="desktop-nav" aria-label="Main navigation">
          <NavLink to="/services">Our services</NavLink>
          <NavLink to="/how-it-works">Our process</NavLink>
          <NavLink to="/about">About HIC</NavLink>
          <NavLink to="/areas-we-serve">Service area</NavLink>
        </nav>
        <div className="header-contact">
          <ContactInfo />
          <Link className="solid-link" to="/contact">
            Let’s talk <ArrowUpRight size={16} />
          </Link>
        </div>
        <button
          className="menu-toggle"
          ref={toggle}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-navigation"
          onClick={() => setOpen(!open)}
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>
      <nav
        id="mobile-navigation"
        className={`mobile-navigation${open ? " is-open" : ""}`}
        aria-label="Mobile navigation"
        aria-hidden={!open}
      >
        <div className="mobile-nav-inner">
          <Link ref={firstLink} to="/" tabIndex={open ? 0 : -1}>
            Home
          </Link>
          <Link to="/services" tabIndex={open ? 0 : -1}>
            All services
          </Link>
          {SERVICES.map((s) => (
            <Link
              key={s.slug}
              className="mobile-service-link"
              to={`/services/${s.slug}`}
              tabIndex={open ? 0 : -1}
            >
              {s.label}
            </Link>
          ))}
          <Link to="/how-it-works" tabIndex={open ? 0 : -1}>
            Our process
          </Link>
          <Link to="/about" tabIndex={open ? 0 : -1}>
            About HIC
          </Link>
          <Link to="/areas-we-serve" tabIndex={open ? 0 : -1}>
            Service area
          </Link>
          <Link className="solid-link" to="/contact" tabIndex={open ? 0 : -1}>
            Book a free consultation <ArrowUpRight size={18} />
          </Link>
        </div>
      </nav>
    </header>
  );
}
