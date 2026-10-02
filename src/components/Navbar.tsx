import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ArrowUpRight, ChevronDown, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NavLink } from "@/components/NavLink";
import logo from "@/assets/hic-logo-small.png";
import { ContactInfo } from "@/components/ContactInfo";
import { SERVICES } from "@/data/services";
import { cn } from "@/lib/utils";

const afterLine = cn(
  "relative flex min-h-11 items-center gap-1 whitespace-nowrap border-0 bg-transparent p-0",
  "font-[family-name:var(--font-body)] text-[length:var(--type-small)] font-medium leading-[1.35] text-foreground",
  "after:absolute after:inset-x-0 after:bottom-3 after:h-px after:origin-left after:scale-x-0 after:bg-[var(--sage)]",
  "after:transition-transform after:[transition-duration:var(--dur)] after:[transition-timing-function:var(--ease-out)]",
  "hover:after:scale-x-100 motion-reduce:after:transition-none",
);

const iconSpin =
  "shrink-0 transition-transform [transition-duration:var(--dur)] [transition-timing-function:var(--ease-out)] motion-reduce:transition-none";

const dropdownLinkClass = cn(
  "flex min-h-11 items-center px-5 text-[length:var(--type-body)] font-medium text-foreground",
  "hover:bg-sage-light hover:text-primary",
);

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
    <header className="fixed inset-x-0 top-0 z-[80] isolate border-b border-border bg-[var(--ivory-bright)]">
      <a
        href="#main-content"
        className="absolute left-[15px] -top-20 z-[60] bg-primary p-3 text-primary-foreground focus:top-2.5"
      >
        Skip to content
      </a>
      <div
        className={cn(
          "mx-auto flex h-[90px] w-[min(100%-80px,1360px)] items-center justify-between gap-[25px]",
          "max-[1190px]:w-[calc(100%-56px)]",
          "max-[900px]:h-[76px]",
          "max-sm:w-[calc(100%-36px)] max-sm:gap-3",
        )}
      >
        <Link
          className={cn(
            "flex shrink-0 items-center gap-3 text-[length:var(--type-body)] leading-[1.15] tracking-[-0.02em]",
            "max-[760px]:text-[0.75rem] max-sm:gap-2 max-sm:text-[length:var(--type-meta)]",
          )}
          to="/"
          aria-label="Home Improvement Club home"
        >
          <img
            src={logo}
            alt=""
            width="48"
            height="48"
            className="h-12 w-[43px] object-contain mix-blend-multiply max-sm:h-10 max-sm:w-[34px]"
          />
          <span className="max-[900px]:hidden">Home Improvement Club</span>
        </Link>
        <nav
          className="hidden min-w-0 flex-nowrap items-center gap-[22px] min-[901px]:flex max-[1190px]:gap-[18px]"
          aria-label="Main navigation"
        >
          <div
            className={cn("relative", desktopServicesOpen && "z-[2]")}
            ref={desktopServices}
            data-open={desktopServicesOpen ? "true" : "false"}
            onMouseEnter={() => setDesktopServicesOpen(true)}
            onMouseLeave={() => setDesktopServicesOpen(false)}
          >
            <button
              type="button"
              className={cn(
              afterLine,
              "cursor-pointer font-[inherit]",
              (servicesActive || desktopServicesOpen) && "after:scale-x-100",
            )}
              aria-expanded={desktopServicesOpen}
              aria-haspopup="true"
              aria-controls="desktop-services-menu"
              onClick={() => setDesktopServicesOpen(true)}
            >
              Services
              <ChevronDown
                size={14}
                aria-hidden="true"
                className={cn(iconSpin, desktopServicesOpen && "rotate-180")}
              />
            </button>
            <div
              id="desktop-services-menu"
              data-open={desktopServicesOpen ? "true" : undefined}
              className={cn(
                "hic-nav-dropdown-panel absolute left-[-16px] top-[calc(100%-8px)] z-[60] min-w-[18rem] border border-border bg-[var(--ivory-bright)] py-2.5",
                desktopServicesOpen
                  ? "visible translate-y-0 pointer-events-auto opacity-100"
                  : "invisible translate-y-2 pointer-events-none opacity-0",
              )}
            >
              <NavLink
                to="/services"
                className={dropdownLinkClass}
                activeClassName="bg-sage-light text-primary"
              >
                All services
              </NavLink>
              {SERVICES.map((service) => (
                <NavLink
                  key={service.slug}
                  to={`/services/${service.slug}`}
                  className={dropdownLinkClass}
                  activeClassName="bg-sage-light text-primary"
                >
                  {service.label}
                </NavLink>
              ))}
            </div>
          </div>
          <NavLink
            to="/how-it-works"
            className={afterLine}
            activeClassName="after:scale-x-100"
          >
            Process
          </NavLink>
          <NavLink to="/about" className={afterLine} activeClassName="after:scale-x-100">
            About
          </NavLink>
          <NavLink
            to="/investment-partnerships"
            className={afterLine}
            activeClassName="after:scale-x-100"
          >
            Investment
          </NavLink>
          <NavLink
            to="/areas-we-serve"
            className={afterLine}
            activeClassName="after:scale-x-100"
          >
            Service areas
          </NavLink>
          <NavLink
            to="/gallery"
            className={afterLine}
            activeClassName="after:scale-x-100"
          >
            Portfolio
          </NavLink>
          <NavLink to="/blog" className={afterLine} activeClassName="after:scale-x-100">
            Blog
          </NavLink>
        </nav>
        <div className="flex items-center gap-[25px] max-[900px]:ml-auto">
          <ContactInfo
            className="min-[901px]:max-[1190px]:hidden max-sm:gap-[5px]"
            linkClassName={cn(
              "inline-flex min-h-11 items-center text-[length:var(--type-meta)]",
              "max-[760px]:text-[0.6875rem]",
              "max-[360px]:text-[0px] max-[360px]:after:content-['Call'] max-[360px]:after:text-[length:var(--type-small)]",
            )}
            iconClassName="max-sm:h-3 max-sm:w-3"
          />
          <div className="max-[900px]:hidden">
            <Button asChild className="min-h-11 px-5 py-[11px]">
              <Link to="/contact">
                Let’s talk <ArrowUpRight size={16} />
              </Link>
            </Button>
          </div>
        </div>
        <button
          type="button"
          className="hidden h-11 w-11 items-center justify-center max-[900px]:flex max-sm:w-10"
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
        data-open={open ? "true" : undefined}
        className="hic-mobile-nav"
        aria-label="Mobile navigation"
        aria-hidden={!open}
      >
        <div className="flex min-h-0 flex-col overflow-hidden">
          <Link
            ref={firstLink}
            className="flex min-h-11 items-center"
            to="/"
            tabIndex={open ? 0 : -1}
          >
            Home
          </Link>
          <div>
            <div className="flex min-h-11 items-center">
              <Link
                className="flex min-h-11 flex-1 items-center"
                to="/services"
                tabIndex={open ? 0 : -1}
              >
                All services
              </Link>
              <button
                type="button"
                className="flex h-11 w-11 shrink-0 cursor-pointer items-center justify-center border-0 bg-transparent p-0 text-inherit"
                aria-label={
                  mobileServicesOpen ? "Hide services" : "Show services"
                }
                aria-expanded={mobileServicesOpen}
                aria-controls="mobile-services-list"
                tabIndex={open ? 0 : -1}
                onClick={() => setMobileServicesOpen((value) => !value)}
              >
                <ChevronDown
                  size={18}
                  aria-hidden="true"
                  className={cn(iconSpin, mobileServicesOpen && "rotate-180")}
                />
              </button>
            </div>
            <div
              id="mobile-services-list"
              data-open={mobileServicesOpen ? "true" : undefined}
              className="hic-mobile-services"
            >
              <div className="flex flex-col overflow-hidden">
                {SERVICES.map((service) => (
                  <Link
                    key={service.slug}
                    className="flex min-h-11 items-center pl-5 text-[length:var(--type-body)] text-[var(--sage)]"
                    to={`/services/${service.slug}`}
                    tabIndex={open && mobileServicesOpen ? 0 : -1}
                  >
                    {service.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
          <Link className="flex min-h-11 items-center" to="/how-it-works" tabIndex={open ? 0 : -1}>
            Process
          </Link>
          <Link className="flex min-h-11 items-center" to="/about" tabIndex={open ? 0 : -1}>
            About
          </Link>
          <Link
            className="flex min-h-11 items-center"
            to="/investment-partnerships"
            tabIndex={open ? 0 : -1}
          >
            Investment
          </Link>
          <Link className="flex min-h-11 items-center" to="/areas-we-serve" tabIndex={open ? 0 : -1}>
            Service areas
          </Link>
          <Link className="flex min-h-11 items-center" to="/gallery" tabIndex={open ? 0 : -1}>
            Portfolio
          </Link>
          <Link className="flex min-h-11 items-center" to="/blog" tabIndex={open ? 0 : -1}>
            Blog
          </Link>
          <Button asChild className="mt-4">
            <Link to="/contact" tabIndex={open ? 0 : -1}>
              Book a free consultation <ArrowUpRight size={18} />
            </Link>
          </Button>
        </div>
      </nav>
    </header>
  );
}
