import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  FileText,
  ClipboardCheck,
  Wallet,
  Home as HomeIcon,
  Thermometer,
  Sun,
  Droplets,
  Wind,
  ExternalLink,
  MapPin,
} from "lucide-react";
import Layout from "@/components/Layout";
import CTASection from "@/components/CTASection";
import heroImg from "@/assets/hero-home.jpg";

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.7 },
};

type Rebate = {
  icon: typeof Thermometer;
  program: string;
  funder: string;
  amount: string;
  who: string;
  what: string;
  cities: string;
  url: string;
  status: "active" | "income-qualified" | "closed";
};

const rebates: Rebate[] = [
  {
    icon: Thermometer,
    program: "Home Renovation Rebate (HRR)",
    funder: "BC Hydro · FortisBC · CleanBC",
    amount: "Up to $12,500",
    who: "Any BC homeowner — no income test",
    what: "Heat pumps, insulation, windows, doors, smart thermostats, and more.",
    cities: "Available across Chilliwack, Abbotsford, Langley, Mission & Surrey",
    url: "https://www.betterhomesbc.ca/rebates/cleanbc-better-homes-and-home-renovation-rebate-programs/",
    status: "active",
  },
  {
    icon: Wind,
    program: "Heat Pump Rebate (Electric or Wood Home)",
    funder: "CleanBC Better Homes",
    amount: "Up to $6,000",
    who: "Homes currently heated with electric baseboards, furnace, or wood",
    what: "Air-source or ground-source heat pump replacing existing electric/wood heat.",
    cities: "Fraser Valley wide",
    url: "https://www.betterhomesbc.ca/rebates/heat-pump-rebates-for-homes-converting-from-electric/",
    status: "active",
  },
  {
    icon: Wallet,
    program: "Energy Savings Program (Income-Qualified)",
    funder: "CleanBC",
    amount: "Up to $19,000",
    who: "Households below provincial income thresholds",
    what: "Free or heavily subsidized heat pumps, insulation, and draft-proofing.",
    cities: "Available throughout BC",
    url: "https://www.betterhomesbc.ca/rebates/energy-savings-program/",
    status: "income-qualified",
  },
  {
    icon: HomeIcon,
    program: "Window & Door Rebate",
    funder: "FortisBC",
    amount: "Up to $2,000",
    who: "FortisBC residential gas or electric customers",
    what: "ENERGY STAR® certified windows and exterior doors.",
    cities: "Fraser Valley wide",
    url: "https://www.fortisbc.com/rebates-and-energy-savings/rebates-and-offers/rebates-details/door-window-rebates",
    status: "active",
  },
  {
    icon: Droplets,
    program: "Hot Water Heat Pump Rebate",
    funder: "BC Hydro · FortisBC",
    amount: "Up to $1,000",
    who: "Any BC homeowner replacing an existing tank",
    what: "Heat pump water heaters — 3–4× more efficient than standard electric tanks.",
    cities: "Fraser Valley wide",
    url: "https://www.betterhomesbc.ca/rebates/cleanbc-better-homes-and-home-renovation-rebate-programs/",
    status: "active",
  },
  {
    icon: Sun,
    program: "PST Exemption on Heat Pumps",
    funder: "Province of BC",
    amount: "7% saved at purchase",
    who: "All BC homeowners",
    what: "Provincial Sales Tax fully waived on qualifying heat pump systems.",
    cities: "Province-wide",
    url: "https://www2.gov.bc.ca/gov/content/taxes/sales-taxes/pst",
    status: "active",
  },
  {
    icon: FileText,
    program: "Municipal Top-Ups (City of Surrey, etc.)",
    funder: "Local Fraser Valley municipalities",
    amount: "Varies — $250 to $2,000",
    who: "Residents of participating cities",
    what: "Local rebates that stack on top of provincial programs for heat pumps and EV chargers.",
    cities: "Surrey, Langley, and Abbotsford have active programs",
    url: "https://www.surrey.ca/services-payments/sustainability/rebates-funding-residents",
    status: "active",
  },
];

const closedNotice = {
  program: "Canada Greener Homes Grant",
  status: "Closed Dec 31, 2025",
  note: "The federal Greener Homes Grant and Loan are no longer accepting new applications. Existing participants can still submit documents. We track replacement federal programs and will alert members the moment a successor opens.",
};

const stackingExample = [
  { label: "BC Home Renovation Rebate (heat pump)", amount: "$3,000" },
  { label: "Electric/Wood-to-Heat-Pump bonus", amount: "$3,000" },
  { label: "FortisBC enhanced rebate", amount: "$1,000" },
  { label: "PST exemption (7% on $12k system)", amount: "$840" },
  { label: "Municipal top-up (City of Surrey example)", amount: "$350" },
];
const stackingTotal = "$8,190";

const steps = [
  {
    n: "01",
    title: "Free home assessment",
    desc: "We review your home, heating system, and which rebate stacks you actually qualify for — before you spend a dollar.",
  },
  {
    n: "02",
    title: "Pre-approval (critical step)",
    desc: "Most BC programs require pre-approval BEFORE work starts. Skip this step and you forfeit the rebate. We file it for you.",
  },
  {
    n: "03",
    title: "Vetted contractor installs",
    desc: "We match you with a Club-approved contractor who knows the program requirements (model lists, invoicing, photos).",
  },
  {
    n: "04",
    title: "We file the rebate paperwork",
    desc: "Invoices, photos, AHRI certificates, online applications — handled. You get the cheque; we get you across the finish line.",
  },
];

const Rebates = () => (
  <Layout>
    {/* HERO */}
    <section className="relative min-h-[70vh] flex items-center" aria-label="BC Rebates Hero">
      <div className="absolute inset-0">
        <img src={heroImg} alt="Energy efficient Fraser Valley home" className="w-full h-full object-cover" loading="eager" />
        <div className="absolute inset-0 bg-foreground/65" />
      </div>
      <div className="relative z-10 section-padding w-full">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="max-w-3xl"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-background/15 backdrop-blur-md border border-background/20 mb-6">
            <MapPin size={14} className="text-background" />
            <span className="text-background text-xs font-medium tracking-wide uppercase">BC Rebates · Updated 2026</span>
          </div>
          <h1 className="heading-xl text-background mb-6">
            Up to $19,000 in BC Rebates. We Help You Claim Every Dollar.
          </h1>
          <p className="text-background/85 text-lg md:text-xl max-w-2xl mb-10 leading-relaxed font-light">
            Most Fraser Valley homeowners leave thousands of rebate dollars on the table — usually because they missed the pre-approval step or hired a contractor who didn't know the rules. The Club handles every form, every photo, every deadline.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button variant="hero" size="xl" asChild>
              <Link to="/contact">Get My Rebate Plan <ArrowRight size={18} /></Link>
            </Button>
            <Button variant="hero-outline" size="xl" asChild className="border-background text-background hover:bg-background hover:text-foreground">
              <a href="#programs">See All Programs</a>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>

    {/* WARNING / CLOSED PROGRAMS */}
    <section className="border-y border-border bg-card" aria-label="Program updates">
      <div className="max-w-5xl mx-auto px-6 py-8 flex flex-col md:flex-row items-start gap-4">
        <AlertTriangle className="text-primary shrink-0 mt-1" size={24} />
        <div>
          <p className="font-semibold mb-1">{closedNotice.program} — {closedNotice.status}</p>
          <p className="text-muted-foreground text-sm leading-relaxed">{closedNotice.note}</p>
        </div>
      </div>
    </section>

    {/* PROGRAM LIST */}
    <section id="programs" className="section-padding-lg" aria-label="Available BC rebate programs">
      <div className="max-w-7xl mx-auto">
        <motion.div {...fadeUp} className="text-center mb-14">
          <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-4">Active Programs</p>
          <h2 className="heading-lg mb-4">Every Rebate Available to BC Homeowners</h2>
          <p className="body-lg max-w-2xl mx-auto">
            Programs change often. We keep this list current and tell you exactly which ones you qualify for.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {rebates.map((r, i) => (
            <motion.article
              key={r.program}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="bg-card border border-border rounded-2xl p-7 flex flex-col"
            >
              <div className="flex items-start justify-between gap-4 mb-5">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <r.icon size={20} className="text-primary" />
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-semibold leading-tight">{r.program}</h3>
                    <p className="text-muted-foreground text-xs mt-0.5">{r.funder}</p>
                  </div>
                </div>
                {r.status === "income-qualified" && (
                  <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-primary/10 text-primary whitespace-nowrap">Income-qualified</span>
                )}
              </div>

              <p className="font-display text-3xl font-bold text-primary mb-4">{r.amount}</p>

              <dl className="space-y-2.5 text-sm mb-5 flex-1">
                <div>
                  <dt className="font-semibold text-foreground/80 inline">Who qualifies: </dt>
                  <dd className="inline text-muted-foreground">{r.who}</dd>
                </div>
                <div>
                  <dt className="font-semibold text-foreground/80 inline">What's covered: </dt>
                  <dd className="inline text-muted-foreground">{r.what}</dd>
                </div>
                <div>
                  <dt className="font-semibold text-foreground/80 inline">Coverage: </dt>
                  <dd className="inline text-muted-foreground">{r.cities}</dd>
                </div>
              </dl>

              <a
                href={r.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
              >
                Official program page <ExternalLink size={14} />
              </a>
            </motion.article>
          ))}
        </div>
      </div>
    </section>

    {/* STACKING EXAMPLE */}
    <section className="section-padding-lg bg-card" aria-label="Rebate stacking example">
      <div className="max-w-4xl mx-auto">
        <motion.div {...fadeUp} className="text-center mb-12">
          <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-4">Real Example</p>
          <h2 className="heading-lg mb-4">How Members Stack Rebates on a Single Project</h2>
          <p className="body-lg max-w-2xl mx-auto">
            Sample: a Surrey homeowner replacing electric baseboards with a cold-climate heat pump.
          </p>
        </motion.div>

        <div className="bg-background border border-border rounded-2xl overflow-hidden">
          <ul className="divide-y divide-border">
            {stackingExample.map((row) => (
              <li key={row.label} className="flex items-center justify-between p-5 md:p-6">
                <span className="text-foreground/85 pr-4">{row.label}</span>
                <span className="font-semibold text-foreground whitespace-nowrap">{row.amount}</span>
              </li>
            ))}
          </ul>
          <div className="bg-primary text-primary-foreground p-6 md:p-7 flex items-center justify-between">
            <span className="font-display text-lg md:text-xl font-semibold">Total stacked savings</span>
            <span className="font-display text-2xl md:text-3xl font-bold">{stackingTotal}</span>
          </div>
        </div>

        <p className="text-muted-foreground text-sm text-center mt-6 max-w-2xl mx-auto">
          Actual amounts vary based on equipment, home, income, and municipality. We confirm your eligible stack before any work begins.
        </p>
      </div>
    </section>

    {/* APPLICATION PROCESS */}
    <section className="section-padding-lg" aria-label="How to apply for BC rebates">
      <div className="max-w-6xl mx-auto">
        <motion.div {...fadeUp} className="text-center mb-16">
          <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-4">The Process</p>
          <h2 className="heading-lg mb-4">How We Get You Every Rebate Dollar</h2>
          <p className="body-lg max-w-2xl mx-auto">
            BC rebate paperwork is unforgiving. Miss pre-approval, use the wrong heat pump model, or submit a non-itemized invoice — rejected. Here's our 4-step process.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {steps.map((s, i) => (
            <motion.div
              key={s.n}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="text-center"
            >
              <span className="text-5xl font-display font-bold text-primary/20 block mb-4">{s.n}</span>
              <h3 className="font-display text-lg font-semibold mb-3">{s.title}</h3>
              <p className="body-md">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* COMMON MISTAKES */}
    <section className="section-padding-lg bg-card" aria-label="Common rebate mistakes">
      <div className="max-w-5xl mx-auto">
        <motion.div {...fadeUp} className="text-center mb-14">
          <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-4">Avoid These</p>
          <h2 className="heading-lg mb-4">5 Mistakes That Cost Homeowners Their Rebates</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {[
            { t: "Starting work before pre-approval", d: "BC Hydro and FortisBC require enrollment before installation. Skip it = $0 rebate." },
            { t: "Buying a non-listed heat pump", d: "Only models on the official AHRI/eligible product list qualify. Most contractors don't check." },
            { t: "Vague invoices", d: "Invoices must itemize equipment model, serial, and labour separately or they're rejected." },
            { t: "Missing the 6-month claim window", d: "You typically have 6 months from invoice date to submit. Members get reminders." },
            { t: "Not stacking municipal & utility rebates", d: "Most homeowners only claim one — leaving thousands behind." },
          ].map((m, i) => (
            <motion.div
              key={m.t}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="bg-background border border-border rounded-xl p-6 flex gap-4"
            >
              <AlertTriangle size={22} className="text-primary shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold mb-1.5">{m.t}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{m.d}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* FAQ */}
    <section className="section-padding-lg" aria-label="Rebate FAQ">
      <div className="max-w-3xl mx-auto">
        <motion.div {...fadeUp} className="text-center mb-12">
          <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-4">FAQ</p>
          <h2 className="heading-lg">Common Questions About BC Rebates</h2>
        </motion.div>
        <div className="space-y-5">
          {[
            { q: "Does the Club charge to handle my rebate paperwork?", a: "No — rebate guidance and filing are included for members. We make our money by negotiating member pricing with vetted contractors, not by clipping your rebates." },
            { q: "How long until the rebate cheque arrives?", a: "Typically 6–12 weeks after BC Hydro / FortisBC approves the submitted documents. We track each file and follow up if delayed." },
            { q: "Is the federal Greener Homes Grant really gone?", a: "Yes — Canada Greener Homes Grant closed Dec 31, 2025 and the Loan closed Oct 1, 2025. We're monitoring the federal budget for replacement programs and will notify members immediately." },
            { q: "Can renters or landlords apply?", a: "Most BC programs require the homeowner to apply. Some programs have separate streams for rental/multi-unit buildings — ask us and we'll confirm what fits your situation." },
            { q: "What if my income is below the threshold?", a: "You may qualify for the CleanBC Energy Savings Program — up to $19,000 covered, often 100% of project cost. We'll help you confirm eligibility privately." },
          ].map((item, i) => (
            <motion.div
              key={item.q}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="bg-card border border-border rounded-xl p-6 md:p-7"
            >
              <h3 className="font-display text-lg font-semibold mb-2.5">{item.q}</h3>
              <p className="text-muted-foreground leading-relaxed">{item.a}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* MID-PAGE CTA STRIP */}
    <section className="section-padding bg-card" aria-label="Rebate eligibility CTA">
      <div className="max-w-4xl mx-auto text-center">
        <ClipboardCheck size={36} className="text-primary mx-auto mb-5" />
        <h2 className="heading-md mb-4">Find Out What You Qualify For — Free</h2>
        <p className="body-lg mb-8 max-w-2xl mx-auto">
          Tell us about your home and project. We'll send back a personalized rebate stack showing every dollar you can claim, the order to apply, and the deadlines.
        </p>
        <Button variant="hero" size="xl" asChild>
          <Link to="/contact">Get My Free Rebate Plan <ArrowRight size={18} /></Link>
        </Button>
        <p className="text-muted-foreground text-xs mt-4 flex items-center justify-center gap-2">
          <CheckCircle2 size={14} /> No cost · No obligation · Reply within 1 business day
        </p>
      </div>
    </section>

    <CTASection />
  </Layout>
);

export default Rebates;
