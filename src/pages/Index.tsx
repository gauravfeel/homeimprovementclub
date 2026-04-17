import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, Shield, Clock, Star, CheckCircle2, XCircle, MapPin, Wallet, Users, AlertTriangle } from "lucide-react";
import Layout from "@/components/Layout";
import CTASection from "@/components/CTASection";
import heroImg from "@/assets/hero-home.jpg";
import kitchenImg from "@/assets/kitchen-upgrade.jpg";
import outdoorImg from "@/assets/outdoor-living.jpg";

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.7 },
};

const Index = () => (
  <Layout>
    {/* HERO — Above the fold value prop in <5 seconds */}
    <section className="relative min-h-[92vh] flex items-center" aria-label="Hero">
      <div className="absolute inset-0">
        <img src={heroImg} alt="Modern Fraser Valley home interior with premium finishes" className="w-full h-full object-cover" loading="eager" />
        <div className="absolute inset-0 bg-foreground/55" />
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
            <span className="text-background text-xs font-medium tracking-wide uppercase">Serving Chilliwack · Abbotsford · Langley</span>
          </div>
          <h1 className="heading-xl text-background mb-6">
            The Trusted Way to Hire Contractors in the Fraser Valley.
          </h1>
          <p className="text-background/85 text-lg md:text-xl max-w-2xl mb-10 leading-relaxed font-light">
            Skip the guesswork. Members get access to pre-vetted local tradespeople, exclusive pricing, and seasonal maintenance plans — without the risk of hiring the wrong contractor.
          </p>
          <div className="flex flex-wrap gap-4 mb-8">
            <Button variant="hero" size="xl" asChild>
              <Link to="/contact" aria-label="Get free Fraser Valley home upgrade plan">Get My Free Plan <ArrowRight size={18} /></Link>
            </Button>
            <Button variant="hero-outline" size="xl" asChild className="border-background text-background hover:bg-background hover:text-foreground">
              <Link to="/how-it-works">See How It Works</Link>
            </Button>
          </div>
          <div className="flex flex-wrap items-center gap-6 text-background/80 text-sm">
            <div className="flex items-center gap-2"><Star size={16} className="fill-background text-background" /><span>4.9/5 from 127+ homeowners</span></div>
            <div className="flex items-center gap-2"><Shield size={16} /><span>Background-checked pros</span></div>
            <div className="flex items-center gap-2"><CheckCircle2 size={16} /><span>No-cost membership intro</span></div>
          </div>
        </motion.div>
      </div>
    </section>

    {/* SOCIAL PROOF STRIP */}
    <section className="border-y border-border bg-card" aria-label="Trust stats">
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
        {[
          { stat: "127+", label: "Fraser Valley homeowners" },
          { stat: "40+", label: "Vetted local contractors" },
          { stat: "$3,200", label: "Avg. member savings" },
          { stat: "4.9/5", label: "Member satisfaction" },
        ].map((s) => (
          <div key={s.label}>
            <p className="font-display text-3xl md:text-4xl font-bold text-primary mb-1">{s.stat}</p>
            <p className="text-muted-foreground text-sm">{s.label}</p>
          </div>
        ))}
      </div>
    </section>

    {/* PROBLEM — Why homeowners lose thousands */}
    <section className="section-padding-lg" aria-label="The contractor problem">
      <div className="max-w-5xl mx-auto">
        <motion.div {...fadeUp} className="text-center mb-12">
          <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-4">The Hidden Cost</p>
          <h2 className="heading-lg mb-6">Why Homeowners Lose Thousands Choosing the Wrong Contractor</h2>
          <p className="body-lg max-w-2xl mx-auto">
            In the Fraser Valley, one bad hire can cost more than the project itself. Here's what we've seen happen — and why we built the Club.
          </p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { icon: Wallet, title: "Inflated mid-project quotes", desc: "Contractors who lowball the bid, then add 30–50% in 'unforeseen' costs once walls are open." },
            { icon: AlertTriangle, title: "Disappearing crews", desc: "Deposits taken, work half-finished, phones unanswered. Re-doing the job costs you twice." },
            { icon: Clock, title: "Months of lost time", desc: "Scheduling chaos, missed deadlines, and projects that drag through the next BC rainy season." },
          ].map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-card border border-border rounded-xl p-8"
            >
              <p.icon size={28} className="text-primary mb-4" />
              <h3 className="font-display text-xl font-semibold mb-3">{p.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{p.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* COMPARISON — Random contractor vs Member */}
    <section className="section-padding-lg bg-card" aria-label="Comparison">
      <div className="max-w-6xl mx-auto">
        <motion.div {...fadeUp} className="text-center mb-14">
          <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-4">The Difference</p>
          <h2 className="heading-lg mb-4">Random Contractor vs. Club Member</h2>
          <p className="body-lg max-w-2xl mx-auto">The same project. Two very different experiences.</p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-background border border-border rounded-2xl p-8 md:p-10">
            <div className="flex items-center gap-3 mb-6">
              <XCircle className="text-muted-foreground" size={24} />
              <h3 className="font-display text-2xl font-semibold text-muted-foreground">Hiring on your own</h3>
            </div>
            <ul className="space-y-4">
              {[
                "Hours scrolling reviews and chasing quotes",
                "No way to verify license, insurance, or past work",
                "Quotes that change halfway through the job",
                "Pay full retail — no leverage on pricing",
                "On your own if something goes wrong",
              ].map((item) => (
                <li key={item} className="flex gap-3 text-muted-foreground">
                  <XCircle size={18} className="text-muted-foreground/60 mt-1 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-primary text-primary-foreground rounded-2xl p-8 md:p-10 shadow-elegant">
            <div className="flex items-center gap-3 mb-6">
              <CheckCircle2 size={24} />
              <h3 className="font-display text-2xl font-semibold">As a Club member</h3>
            </div>
            <ul className="space-y-4">
              {[
                "One call — we match you with the right pro",
                "Every contractor background-checked, licensed & insured",
                "Locked-in pricing with member discounts (avg. $3,200 saved)",
                "Seasonal maintenance plans handled automatically",
                "We stand behind the work — your project, our reputation",
              ].map((item) => (
                <li key={item} className="flex gap-3">
                  <CheckCircle2 size={18} className="mt-1 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>

    {/* HOW IT WORKS — 3 simple steps */}
    <section className="section-padding-lg" aria-label="How it works">
      <div className="max-w-6xl mx-auto">
        <motion.div {...fadeUp} className="text-center mb-16">
          <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-4">How It Works</p>
          <h2 className="heading-lg">Membership in 3 Simple Steps</h2>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {[
            { step: "01", title: "Tell us your project", desc: "Share what you need — HVAC, roofing, kitchen, solar, or seasonal maintenance. Takes 2 minutes." },
            { step: "02", title: "Get matched with a vetted pro", desc: "We hand-pick a Fraser Valley contractor from our vetted network and lock in member pricing." },
            { step: "03", title: "Sit back. We've got you.", desc: "Project managed, work guaranteed, savings applied. You enjoy the upgrade." },
          ].map((s, i) => (
            <motion.div
              key={s.step}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="text-center"
            >
              <span className="text-6xl font-display font-bold text-primary/20 block mb-4">{s.step}</span>
              <h3 className="font-display text-xl font-semibold mb-3">{s.title}</h3>
              <p className="body-md">{s.desc}</p>
            </motion.div>
          ))}
        </div>
        <div className="text-center mt-14">
          <Button variant="hero" size="xl" asChild>
            <Link to="/contact">Start My Free Plan <ArrowRight size={18} /></Link>
          </Button>
        </div>
      </div>
    </section>

    {/* MEMBERSHIP BENEFITS */}
    <section className="section-padding-lg bg-card" aria-label="Membership perks">
      <div className="max-w-6xl mx-auto">
        <motion.div {...fadeUp} className="text-center mb-16">
          <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-4">What's Included</p>
          <h2 className="heading-lg mb-4">Everything a Fraser Valley Homeowner Needs</h2>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { title: "Exclusive contractor discounts", desc: "Member-only pricing on HVAC, roofing, electrical, plumbing, and renovations across the Fraser Valley.", img: heroImg },
            { title: "Vetted service providers", desc: "Every contractor is licensed, insured, background-checked, and accountable to the Club.", img: kitchenImg },
            { title: "Seasonal maintenance plans", desc: "Furnace tune-ups, gutter cleans, roof inspections — scheduled and handled before BC weather hits.", img: outdoorImg },
            { title: "Member-only deals & perks", desc: "Group buys on solar, smart home tech, and outdoor living upgrades you won't find publicly.", img: outdoorImg },
          ].map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
            >
              <Link to="/services" className="group block relative rounded-xl overflow-hidden aspect-[16/9]">
                <img src={s.img} alt={s.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
                <div className="absolute inset-0 bg-foreground/55 group-hover:bg-foreground/65 transition-colors" />
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                  <h3 className="font-display text-xl md:text-2xl font-semibold text-background mb-2">{s.title}</h3>
                  <p className="text-background/80 text-sm md:text-base">{s.desc}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* TESTIMONIALS — Localized */}
    <section className="section-padding-lg" aria-label="Member testimonials">
      <div className="max-w-7xl mx-auto">
        <motion.div {...fadeUp} className="text-center mb-16">
          <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-4">Member Stories</p>
          <h2 className="heading-lg">Trusted by Homeowners Across the Fraser Valley</h2>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { name: "Sarah M.", location: "Chilliwack, BC", text: "Got three quotes in two days for our furnace replacement — all vetted, all fair. Saved nearly $2,000 on what we were originally quoted." },
            { name: "David & Lisa K.", location: "Abbotsford, BC", text: "After being burned by a roofer last year, joining the Club was a relief. The contractor showed up on time, finished early, and the price held." },
            { name: "Michael T.", location: "Langley, BC", text: "I was overwhelmed planning a solar install. The Club walked me through every step and matched me with a Fraser Valley installer who actually knew our climate." },
          ].map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-card rounded-xl p-8 border border-border"
            >
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, j) => <Star key={j} size={16} className="fill-primary text-primary" />)}
              </div>
              <p className="text-foreground/80 leading-relaxed mb-6 italic">"{t.text}"</p>
              <div>
                <p className="font-semibold text-sm">{t.name}</p>
                <p className="text-muted-foreground text-sm">{t.location}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* OBJECTION HANDLING */}
    <section className="section-padding-lg bg-card" aria-label="Common questions">
      <div className="max-w-4xl mx-auto">
        <motion.div {...fadeUp} className="text-center mb-14">
          <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-4">Honest Answers</p>
          <h2 className="heading-lg">Wondering if the Club Is Worth It?</h2>
        </motion.div>
        <div className="space-y-6">
          {[
            { q: "How much does membership cost?", a: "Getting your personalized Home Upgrade Plan is completely free. Membership pays for itself on the first project — average member savings are $3,200." },
            { q: "How do I know your contractors are actually vetted?", a: "Every contractor in our network is licensed, insured, background-checked, and reviewed by past Club members. We remove anyone who doesn't meet our standards — no exceptions." },
            { q: "What if I'm unhappy with the work?", a: "Unlike hiring a stranger off Google, you have us in your corner. We stand behind every project and work with the contractor until it's right." },
            { q: "Do you actually serve my city?", a: "We focus exclusively on the Fraser Valley — Chilliwack, Abbotsford, Langley, Mission, Surrey, and White Rock. Local contractors who know local homes and local weather." },
          ].map((item, i) => (
            <motion.div
              key={item.q}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="bg-background border border-border rounded-xl p-6 md:p-8"
            >
              <h3 className="font-display text-lg md:text-xl font-semibold mb-3">{item.q}</h3>
              <p className="text-muted-foreground leading-relaxed">{item.a}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* TRUST BADGES */}
    <section className="section-padding" aria-label="Member guarantees">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          {[
            { icon: Shield, label: "Vetted Local Pros", desc: "Licensed, insured, and reviewed Fraser Valley contractors." },
            { icon: Users, label: "Member-Only Pricing", desc: "Locked-in rates and group buys you can't get on your own." },
            { icon: CheckCircle2, label: "Satisfaction Promise", desc: "We stand behind every project until you're happy." },
          ].map((b, i) => (
            <motion.div
              key={b.label}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="flex flex-col items-center"
            >
              <b.icon size={32} className="text-primary mb-4" />
              <h4 className="font-sans font-semibold mb-2">{b.label}</h4>
              <p className="text-muted-foreground text-sm">{b.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    <CTASection />
  </Layout>
);

export default Index;
