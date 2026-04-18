import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Info,
  FileText,
  Wallet,
  Home as HomeIcon,
  Thermometer,
  Sun,
  Droplets,
  Wind,
  ExternalLink,
  AlertTriangle,
} from "lucide-react";
import Layout from "@/components/Layout";
import CTASection from "@/components/CTASection";
import SEO from "@/components/SEO";
import heroImg from "@/assets/lux-hero.jpg";

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.7 },
};

const programs = [
  {
    icon: Thermometer,
    program: "CleanBC Better Homes — Home Renovation Rebate",
    funder: "Province of BC · BC Hydro · FortisBC",
    focus: "Heat pumps, insulation, windows, doors, smart thermostats",
    info: "A provincial program that may offer rebates for certain energy-efficient upgrades. Eligibility, amounts, and product lists change frequently.",
    url: "https://betterhomesbc.ca/",
  },
  {
    icon: Wind,
    program: "Heat Pump Programs",
    funder: "CleanBC Better Homes",
    focus: "Air-source and ground-source heat pumps replacing existing heat",
    info: "Several provincial and utility programs may apply to qualifying heat pump installations. Some streams are income-qualified; others are open to all homeowners.",
    url: "https://betterhomesbc.ca/rebates/",
  },
  {
    icon: Wallet,
    program: "CleanBC Energy Savings Program (Income-Qualified)",
    funder: "Province of BC",
    focus: "Heat pumps, insulation, draft-proofing for income-eligible households",
    info: "An income-qualified program that may cover a substantial portion of project cost for eligible homeowners. Qualification is based on household income.",
    url: "https://betterhomesbc.ca/rebates/energy-savings-program/",
  },
  {
    icon: HomeIcon,
    program: "FortisBC Window, Door & Insulation Rebates",
    funder: "FortisBC",
    focus: "ENERGY STAR® windows, exterior doors, attic and wall insulation",
    info: "FortisBC residential customers may be eligible for rebates on qualifying envelope upgrades. Requires participating contractors and pre-approval in many cases.",
    url: "https://www.fortisbc.com/rebates-and-energy-savings",
  },
  {
    icon: Droplets,
    program: "Heat Pump Water Heater Rebates",
    funder: "BC Hydro · FortisBC",
    focus: "High-efficiency heat pump water heaters",
    info: "Replacing a standard tank water heater with a heat pump model may qualify for utility rebates. Product must be on the eligible model list at time of purchase.",
    url: "https://betterhomesbc.ca/rebates/",
  },
  {
    icon: Sun,
    program: "PST Exemption on Heat Pumps",
    funder: "Province of BC",
    focus: "Provincial Sales Tax relief on qualifying heat pump systems",
    info: "BC has historically exempted qualifying heat pump systems from PST. Always confirm current exemption status at time of purchase with your contractor and accountant.",
    url: "https://www2.gov.bc.ca/gov/content/taxes/sales-taxes/pst",
  },
  {
    icon: FileText,
    program: "Municipal Top-Up Programs",
    funder: "Local BC municipalities (varies)",
    focus: "Top-up rebates that stack on provincial / utility programs",
    info: "Some BC municipalities offer additional rebates that can stack with provincial and utility programs. Programs and funding pools change year to year — confirm with your city.",
    url: "https://www.bchydro.com/powersmart/residential/rebates-programs.html",
  },
];

const Rebates = () => (
  <Layout>
    <SEO
      title="BC Home Renovation Rebates & Funding Information | Home Improvement Club"
      description="Educational guide to potential British Columbia home renovation rebates and grants. CleanBC, BC Hydro, FortisBC programs explained. Eligibility varies — confirm with the official source."
      canonical="/rebates"
    />

    {/* HERO */}
    <section className="relative min-h-[60vh] flex items-center" aria-label="BC funding info hero">
      <div className="absolute inset-0">
        <img src={heroImg} alt="Energy-efficient British Columbia home" className="w-full h-full object-cover" loading="eager" width={1920} height={1280} />
        <div className="absolute inset-0 bg-foreground/65" />
      </div>
      <div className="relative z-10 section-padding w-full">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="max-w-3xl">
          <p className="text-background/70 font-semibold text-xs uppercase tracking-widest mb-4">Funding & Rebates · Educational</p>
          <h1 className="heading-xl text-background mb-6">
            BC Renovation Funding, Explained.
          </h1>
          <p className="text-background/85 text-lg md:text-xl max-w-2xl mb-10 leading-relaxed font-light">
            We help BC homeowners understand potential savings opportunities through provincial, utility, and municipal programs. This page is informational — eligibility, amounts, and program availability vary and change over time.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button variant="hero" size="xl" asChild>
              <Link to="/contact">Discuss My Project <ArrowRight size={18} /></Link>
            </Button>
            <Button variant="hero-outline" size="xl" asChild className="border-background text-background hover:bg-background hover:text-foreground">
              <a href="#programs">See Programs</a>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>

    {/* DISCLAIMER BANNER */}
    <section className="border-y border-border bg-card" aria-label="Important disclaimer">
      <div className="max-w-5xl mx-auto px-6 py-7 flex flex-col md:flex-row items-start gap-4">
        <Info className="text-primary shrink-0 mt-1" size={22} />
        <div>
          <p className="font-semibold mb-1.5">This information is educational only.</p>
          <p className="text-muted-foreground text-sm leading-relaxed">
            We do not administer, approve, or guarantee any rebate, grant, tax credit, or funding program. Eligibility, amounts, application windows, and product lists are determined entirely by each program's administrator and change frequently. Always confirm current details directly with the official program before making purchase decisions, and consult a qualified professional or accountant for guidance specific to your situation.
          </p>
        </div>
      </div>
    </section>

    {/* PROGRAMS LIST */}
    <section id="programs" className="section-padding-lg" aria-label="BC funding programs">
      <div className="max-w-7xl mx-auto">
        <motion.div {...fadeUp} className="text-center mb-14">
          <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-4">Common BC Programs</p>
          <h2 className="heading-lg mb-4">Potential Funding Opportunities to Be Aware Of</h2>
          <p className="body-lg max-w-2xl mx-auto">
            A non-exhaustive overview of provincial, utility, and municipal programs that BC homeowners commonly explore for energy-efficient renovations.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {programs.map((p, i) => (
            <motion.article
              key={p.program}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="bg-card border border-border rounded-2xl p-7 flex flex-col"
            >
              <div className="flex items-start gap-3 mb-4">
                <div className="w-11 h-11 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <p.icon size={20} className="text-primary" />
                </div>
                <div>
                  <h3 className="font-display text-lg font-semibold leading-tight">{p.program}</h3>
                  <p className="text-muted-foreground text-xs mt-1">{p.funder}</p>
                </div>
              </div>

              <dl className="space-y-2.5 text-sm mb-5 flex-1">
                <div>
                  <dt className="font-semibold text-foreground/80 inline">Focus area: </dt>
                  <dd className="inline text-muted-foreground">{p.focus}</dd>
                </div>
                <div>
                  <dt className="font-semibold text-foreground/80 inline">What to know: </dt>
                  <dd className="inline text-muted-foreground">{p.info}</dd>
                </div>
              </dl>

              <a
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
              >
                Visit official program page <ExternalLink size={14} />
              </a>
            </motion.article>
          ))}
        </div>
      </div>
    </section>

    {/* HOW WE HELP */}
    <section className="section-padding-lg bg-card" aria-label="How we help">
      <div className="max-w-5xl mx-auto">
        <motion.div {...fadeUp} className="text-center mb-14">
          <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-4">How We Help</p>
          <h2 className="heading-lg mb-4">We Point You in the Right Direction.</h2>
          <p className="body-lg max-w-2xl mx-auto">
            We help homeowners understand potential savings opportunities — but we never promise eligibility or funding. Confirmation always rests with the official program.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            { t: "Awareness", d: "We flag programs that may apply to upgrades you're already considering — so you don't miss something obvious." },
            { t: "Direction", d: "We point you to the official program pages and recommend speaking with a qualified energy advisor or your contractor about pre-approval." },
            { t: "Vetted Contractors", d: "Many programs require participating contractors. Our network includes craftsmen experienced with BC program requirements." },
          ].map((b) => (
            <div key={b.t} className="bg-background border border-border rounded-xl p-7">
              <h3 className="font-display text-lg font-semibold mb-2">{b.t}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{b.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* IMPORTANT NOTES */}
    <section className="section-padding-lg" aria-label="Important things to know">
      <div className="max-w-4xl mx-auto">
        <motion.div {...fadeUp} className="text-center mb-12">
          <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-4">Things Every BC Homeowner Should Know</p>
          <h2 className="heading-lg mb-4">Before You Start Any Project</h2>
        </motion.div>

        <div className="space-y-4">
          {[
            { t: "Pre-approval is often required", d: "Many BC programs require enrollment or pre-approval before work begins. Starting work too early can disqualify a project. Always check current requirements with the official program." },
            { t: "Product lists are strict", d: "Most rebates require equipment from an official eligible-product list (e.g. CSA, ENERGY STAR®, AHRI). Confirm the specific model is listed before purchase." },
            { t: "Programs change frequently", d: "Funding pools, deadlines, and rebate amounts can change with little notice. Always verify current program details before relying on any specific figure." },
            { t: "Eligibility varies", d: "Income, fuel source, building age, ownership status, and municipality can all affect eligibility. We do not assess eligibility — only the program administrator can." },
            { t: "Consult professionals", d: "Speak with a registered energy advisor, your contractor, and where appropriate an accountant or tax professional about how programs apply to your specific situation." },
          ].map((m, i) => (
            <motion.div
              key={m.t}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="bg-card border border-border rounded-xl p-6 flex gap-4"
            >
              <AlertTriangle size={22} className="text-primary shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold mb-1.5">{m.t}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{m.d}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <p className="text-xs text-muted-foreground text-center mt-10 max-w-2xl mx-auto leading-relaxed">
          The information on this page is provided in good faith for general informational purposes only. Home Improvement Club makes no representation or warranty regarding the accuracy, completeness, or current applicability of any program described. We are not a government agency, utility, energy advisor, accountant, or legal advisor. Always consult the official program and qualified professionals before making renovation or financial decisions based on potential rebates.
        </p>
      </div>
    </section>

    <CTASection
      title="Planning a project? Let's talk."
      description="We'll discuss your renovation goals and flag any current BC programs that may be worth a closer look — informationally, never as a guarantee."
      cta="Book Free Consultation"
    />
  </Layout>
);

export default Rebates;
