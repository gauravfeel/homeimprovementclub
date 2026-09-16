import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { ArrowUpRight, ChevronDown, Menu, X } from "lucide-react";
import logo from "@/assets/hic-logo-small.png";
import { ContactInfo } from "@/components/ContactInfo";
import { SERVICES } from "@/data/services";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [desktopServicesOpen, setDesktopServicesOpen] = useState(false);
  const location = useLocation();
  const toggle = useRef<HTMLButtonElement>(null);
  const firstLink = useRef<HTMLAnchorElement>(null);
  const desktopServices = useRef<HTMLDivElement>(null);
  const servicesActive = location.pathname.startsWith("/services");

  useEffect(() => {
    setOpen(false);
    setMobileServicesOpen(false);
    setDesktopServicesOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.documentElement.classList.toggle("menu-open", open);
    if (open) firstLink.current?.focus();
    if (!open) setMobileServicesOpen(false);
    return () => document.documentElement.classList.remove("menu-open");
  }, [open]);

  useEffect(() => {
    const close = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      if (desktopServicesOpen) {
        setDesktopServicesOpen(false);
        return;
      }
      setOpen(false);
      toggle.current?.focus();
    };
    document.addEventListener("keydown", close);
    return () => document.removeEventListener("keydown", close);
  }, [desktopServicesOpen]);

  useEffect(() => {
    if (!desktopServicesOpen) return;
    const close = (event: PointerEvent) => {
      if (desktopServices.current?.contains(event.target as Node)) return;
      setDesktopServicesOpen(false);
    };
    document.addEventListener("pointerdown", close);
    return () => document.removeEventListener("pointerdown", close);
  }, [desktopServicesOpen]);

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
          <div
            className={`nav-dropdown${desktopServicesOpen ? " is-open" : ""}`}
            ref={desktopServices}
            onMouseEnter={() => setDesktopServicesOpen(true)}
            onMouseLeave={() => setDesktopServicesOpen(false)}
          >
            <button
              type="button"
              className={`nav-dropdown-trigger${servicesActive ? " is-active" : ""}`}
              aria-expanded={desktopServicesOpen}
              aria-haspopup="true"
              aria-controls="desktop-services-menu"
              onClick={() => setDesktopServicesOpen(true)}
            >
              Build & renovate
              <ChevronDown size={14} aria-hidden="true" />
            </button>
            <div id="desktop-services-menu" className="nav-dropdown-panel">
              <NavLink to="/services">All services</NavLink>
              {SERVICES.map((service) => (
                <NavLink key={service.slug} to={`/services/${service.slug}`}>
                  {service.label}
                </NavLink>
              ))}
            </div>
          </div>
          <NavLink to="/how-it-works">Our process</NavLink>
          <NavLink to="/about">About HIC</NavLink>
          <NavLink to="/investment-partnerships">Investment</NavLink>
          <NavLink to="/areas-we-serve">Service area</NavLink>
          <NavLink to="/gallery">Portfolio</NavLink>
          <NavLink to="/blog">Blog</NavLink>
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
          <div className={`mobile-services${mobileServicesOpen ? " is-open" : ""}`}>
            <div className="mobile-services-row">
              <Link to="/services" tabIndex={open ? 0 : -1}>
                All services
              </Link>
              <button
                type="button"
                className="mobile-services-toggle"
                aria-label={mobileServicesOpen ? "Hide services" : "Show services"}
                aria-expanded={mobileServicesOpen}
                aria-controls="mobile-services-list"
                tabIndex={open ? 0 : -1}
                onClick={() => setMobileServicesOpen((value) => !value)}
              >
                <ChevronDown size={18} aria-hidden="true" />
              </button>
            </div>
            <div className="mobile-service-list" id="mobile-services-list">
              <div>
                {SERVICES.map((service) => (
                  <Link
                    key={service.slug}
                    className="mobile-service-link"
                    to={`/services/${service.slug}`}
                    tabIndex={open && mobileServicesOpen ? 0 : -1}
                  >
                    {service.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
          <Link to="/how-it-works" tabIndex={open ? 0 : -1}>
            Our process
          </Link>
          <Link to="/about" tabIndex={open ? 0 : -1}>
            About HIC
          </Link>
          <Link to="/investment-partnerships" tabIndex={open ? 0 : -1}>
            Investment
          </Link>
          <Link to="/areas-we-serve" tabIndex={open ? 0 : -1}>
            Service area
          </Link>
          <Link to="/gallery" tabIndex={open ? 0 : -1}>
            Portfolio
          </Link>
          <Link to="/blog" tabIndex={open ? 0 : -1}>
            Blog
          </Link>
          <Link className="solid-link" to="/contact" tabIndex={open ? 0 : -1}>
            Book a free consultation <ArrowUpRight size={18} />
          </Link>
        </div>
      </nav>
    </header>
  );
}
