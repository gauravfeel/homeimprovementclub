import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Menu, X, ArrowUpRight } from "lucide-react";

const links = [
  ["Work", "/v2/gallery"], ["Services", "/v2/services"], ["Process", "/v2/how-it-works"],
  ["Journal", "/v2/blog"], ["About", "/v2/about"],
];

export default function V2Layout({ children, title = "Home Improvement Club" }: { children: React.ReactNode; title?: string }) {
  const [open, setOpen] = useState(false);
  return <div className="min-h-screen bg-[#f4f0e8] font-sans text-[#19342d] selection:bg-[#b9a06a] selection:text-white">
    <Helmet><title>{title} | HIC V2</title><meta name="robots" content="noindex, nofollow" /></Helmet>
    <header className="sticky top-0 z-50 border-b border-[#19342d]/15 bg-[#f4f0e8]/95 backdrop-blur">
      <div className="mx-auto flex h-20 max-w-[1440px] items-center justify-between px-5 md:px-10">
        <Link to="/v2" className="font-display text-xl font-semibold tracking-tight">HIC<span className="ml-2 font-sans text-[10px] font-bold tracking-[.22em]">BUILD</span></Link>
        <nav className="hidden items-center gap-7 lg:flex">{links.map(([label, to]) => <NavLink key={to} to={to} className="text-xs font-bold uppercase tracking-[.14em] hover:text-[#a78548]">{label}</NavLink>)}<Link to="/v2/contact" className="bg-[#19342d] px-5 py-3 text-xs font-bold uppercase tracking-[.14em] text-white hover:bg-[#a78548]">Start project</Link></nav>
        <button aria-label="Open menu" onClick={() => setOpen(!open)} className="p-2 lg:hidden">{open ? <X /> : <Menu />}</button>
      </div>
      {open && <nav className="border-t border-[#19342d]/15 bg-[#f4f0e8] px-5 py-5 lg:hidden">{links.map(([label, to]) => <NavLink onClick={() => setOpen(false)} key={to} to={to} className="block border-b border-[#19342d]/10 py-4 font-display text-2xl">{label}</NavLink>)}<Link onClick={() => setOpen(false)} to="/v2/contact" className="mt-5 inline-block bg-[#19342d] px-5 py-3 text-xs font-bold uppercase tracking-[.14em] text-white">Start project</Link></nav>}
    </header>
    <main>{children}</main>
    <footer className="bg-[#19342d] px-5 py-14 text-[#f4f0e8] md:px-10"><div className="mx-auto grid max-w-[1440px] gap-10 md:grid-cols-[2fr_1fr_1fr]"><div><p className="font-display text-3xl">Built for what comes next.</p><Link to="/v2/contact" className="mt-6 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[.14em] text-[#d4b572]">Talk to HIC <ArrowUpRight size={16}/></Link></div><div className="text-sm leading-8"><Link className="block" to="/v2/services/custom-homes-multiplex">Custom homes</Link><Link className="block" to="/v2/services/custom-homes-multiplex">Multiplex development</Link><Link className="block" to="/v2/services">Renovations</Link></div><div className="text-sm leading-8"><Link className="block" to="/v2/privacy">Privacy</Link><a className="block" href="mailto:homeimprovementclub.co@gmail.com">Email HIC</a><p className="mt-5 text-xs text-white/55">British Columbia, Canada</p></div></div></footer>
  </div>;
}
