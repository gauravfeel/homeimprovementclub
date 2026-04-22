import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, Shield, Star, CheckCircle2, MapPin, Sparkles, Award } from "lucide-react";
import Layout from "@/components/Layout";
import CTASection from "@/components/CTASection";
import ServiceCard from "@/components/ServiceCard";
import SEO from "@/components/SEO";
import { SERVICES } from "@/data/services";
import { TESTIMONIALS } from "@/data/testimonials";
import heroImg from "@/assets/lux-hero.jpg";
import kitchenImg from "@/assets/lux-kitchen.jpg";
import bathImg from "@/assets/lux-bathroom.jpg";

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.7 },
};

const homepageSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "LocalBusiness",
      name: "Home Improvement Club",
      url: "https://homeimprovementclub.co",
      areaServed: [
        { "@type": "City", name: "Abbotsford" },
        { "@type": "City", name: "Chilliwack" },
        { "@type": "City", name: "Hope" },
        { "@type": "City", name: "Langley" },
      ],
      address: {
        "@type": "PostalAddress",
        addressRegion: "BC",
        addressCountry: "CA",
      },
    },
    ...TESTIMONIALS.map((t) => ({
      "@type": "Review",
      author: { "@type": "Person", name: t.name },
      reviewBody: t.quote,
      reviewRating: {
        "@type": "Rating",
        ratingValue: "5",
        bestRating: "5",
      },
      itemReviewed: {
        "@type": "LocalBusiness",
        name: "Home Improvement Club",
      },
    })),
  ],
};

const CITIES = ["All", "Abbotsford", "Chilliwack", "Langley", "Hope"] as const;

const Index = () => {
  const [filter, setFilter] = useState<string>("All");
  const filtered = filter === "All" ? TESTIMONIALS : TESTIMONIALS.filter((t) => t.city === filter);

  return (
    <Layout>
      <SEO
        title="Home Improvement Club | Luxury Home Renovations in Abbotsford, Chilliwack, Hope & Langley BC"
        description="High-end home renovations across Abbotsford, Chilliwack, Hope, and Langley. Kitchens, bathrooms, HVAC, flooring, and more — vetted craftsmen, project-managed start to finish."
        canonical="/"
        schema={homepageSchema}
      />

      {/* HERO */}
      <section className="relative min-h-[94vh] flex items-center" aria-label="Hero">
        <div className="absolute inset-0">
          <img
            src={heroImg}
            alt="Luxury Fraser Valley home renovation by Home Improvement Club"
            className="w-full h-full object-cover"
            loading="eager"
            width={1920}
            height={1280}
          />
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
              <span className="text-background text-xs font-medium tracking-wide uppercase">Premium Renovations · Fraser Valley, BC</span>
            </div>
            <h1 className="heading-xl text-background mb-6">
              High-End Home Renovations.
            </h1>
            <p className="text-background/85 text-lg md:text-xl max-w-2xl mb-10 leading-relaxed font-light">
              Serving Abbotsford, Chilliwack, Hope, and Langley — designed and built by vetted craftsmen, project-managed start to finish, and finished to a standard you can feel.
            </p>
            <div className="flex flex-wrap gap-4 mb-10">
              <Button variant="hero" size="xl" asChild>
                <Link to="/contact">Book Free Consultation <ArrowRight size={18} /></Link>
              </Button>
              <Button variant="hero-outline" size="xl" asChild className="border-background text-background hover:bg-background hover:text-foreground">
                <Link to="/services">View Services</Link>
              </Button>
            </div>
            <div className="flex flex-wrap items-center gap-6 text-background/80 text-sm">
              <div className="flex items-center gap-2"><Star size={16} className="fill-background text-background" /><span>4.9/5 from Fraser Valley homeowners</span></div>
              <div className="flex items-center gap-2"><Shield size={16} /><span>Licensed · Insured · Vetted</span></div>
              <div className="flex items-center gap-2"><CheckCircle2 size={16} /><span>Free in-home consultation</span></div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* TRUST STRIP */}
      <section className="border-y border-border bg-card" aria-label="Trust">
        <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { stat: "200+", label: "Fraser Valley homes transformed" },
            { stat: "40+", label: "Vetted master craftsmen" },
            { stat: "4.9★", label: "Average member rating" },
            { stat: "100%", label: "Licensed & insured" },
          ].map((s) => (
            <div key={s.label}>
              <p className="font-display text-3xl md:text-4xl font-bold text-primary mb-1">{s.stat}</p>
              <p className="text-muted-foreground text-sm">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* SERVICES GRID */}
      <section className="section-padding-lg" aria-label="Services">
        <div className="max-w-7xl mx-auto">
          <motion.div {...fadeUp} className="text-center mb-14">
            <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-4">Our Specialties</p>
            <h2 className="heading-lg mb-4">Six Disciplines. One Standard.</h2>
            <p className="body-lg max-w-2xl mx-auto">
              From heirloom kitchens to architectural lighting, every renovation is executed by craftsmen whose entire career is this exact work.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            {SERVICES.map((s, i) => (
              <ServiceCard
                key={s.slug}
                icon={s.icon}
                title={s.title}
                desc={s.short}
                href={`/services/${s.slug}`}
                image={s.image}
                delay={i * 0.05}
              />
            ))}
          </div>
        </div>
      </section>

      {/* BEFORE / AFTER FEATURE */}
      <section className="section-padding-lg bg-card" aria-label="Featured transformations">
        <div className="max-w-7xl mx-auto">
          <motion.div {...fadeUp} className="text-center mb-14">
            <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-4">Recent Work</p>
            <h2 className="heading-lg mb-4">Transformations Worth Investing In</h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
            {[
              { img: kitchenImg, tag: "Kitchen", title: "White-oak custom kitchen with waterfall marble island", loc: "Abbotsford, BC", alt: "Custom kitchen renovation in Abbotsford BC Fraser Valley" },
              { img: bathImg, tag: "Bathroom", title: "Spa ensuite — stone tub, brass fixtures, large-format tile", loc: "Langley, BC", alt: "Spa bathroom renovation in Langley BC Fraser Valley" },
            ].map((p, i) => (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group rounded-2xl overflow-hidden relative aspect-[16/11]"
              >
                <img src={p.img} alt={p.alt} loading="lazy" width={1600} height={1100} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/85 via-foreground/30 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-7 md:p-8">
                  <span className="inline-block text-xs uppercase tracking-widest text-background/80 font-semibold mb-2">{p.tag} · {p.loc}</span>
                  <h3 className="font-display text-xl md:text-2xl font-semibold text-background">{p.title}</h3>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="section-padding-lg" aria-label="Process">
        <div className="max-w-6xl mx-auto">
          <motion.div {...fadeUp} className="text-center mb-16">
            <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-4">The Process</p>
            <h2 className="heading-lg">Premium Doesn't Have to Be Painful.</h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
            {[
              { step: "01", title: "Consultation", desc: "We visit your home, listen to your vision, and review the space — no fee, no pressure." },
              { step: "02", title: "Design & Plan", desc: "A clear renovation plan: scope, materials, timeline, transparent investment." },
              { step: "03", title: "Vetted Craftsmen", desc: "Matched to specialists in your exact project — licensed, insured, accountable." },
              { step: "04", title: "Project Delivery", desc: "Weekly updates, on-time milestones, finished to a standard you can feel." },
            ].map((s, i) => (
              <motion.div
                key={s.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <span className="text-5xl font-display font-bold text-primary/20 block mb-4">{s.step}</span>
                <h3 className="font-display text-lg font-semibold mb-3">{s.title}</h3>
                <p className="body-md text-base">{s.desc}</p>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-14">
            <Button variant="hero" size="xl" asChild>
              <Link to="/how-it-works">See Our Full Process <ArrowRight size={18} /></Link>
            </Button>
          </div>
        </div>
      </section>

      {/* BC REBATES BAND */}
      <section className="section-padding bg-primary text-primary-foreground" aria-label="BC rebates">
        <div className="max-w-6xl mx-auto grid md:grid-cols-[1fr_auto] gap-8 items-center">
          <div>
            <p className="text-primary-foreground/80 font-semibold text-xs uppercase tracking-widest mb-3">Funding & Rebates</p>
            <h2 className="font-display text-2xl md:text-3xl font-semibold mb-3 leading-tight">
              BC Rebates & Government Funding — Explained.
            </h2>
            <p className="text-primary-foreground/85 max-w-2xl leading-relaxed">
              We help homeowners understand potential CleanBC, BC Hydro, and FortisBC incentive programs that may apply to qualifying upgrades. Eligibility varies — we point you in the right direction.
            </p>
          </div>
          <Button variant="hero-outline" size="xl" asChild className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary whitespace-nowrap">
            <Link to="/rebates">Explore Funding Info <ArrowRight size={18} /></Link>
          </Button>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section id="testimonials" className="section-padding-lg" aria-label="Testimonials">
        <div className="max-w-7xl mx-auto">
          <motion.div {...fadeUp} className="text-center mb-6">
            <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-4">Client Stories</p>
            <h2 className="heading-lg mb-3">Trusted by Homeowners Across the Fraser Valley</h2>
            <p className="text-muted-foreground">Real projects. Real results. From Abbotsford to Hope.</p>
          </motion.div>

          <div className="flex flex-wrap justify-center gap-2 mb-12 mt-8">
            {CITIES.map((city) => (
              <button
                key={city}
                onClick={() => setFilter(city)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-colors ${
                  filter === city
                    ? "bg-primary text-primary-foreground border-primary"
                    : "border-border text-muted-foreground hover:border-primary hover:text-primary"
                }`}
              >
                {city}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((t, i) => (
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
                <p className="text-foreground/85 leading-relaxed mb-6 italic">"{t.quote}"</p>
                <div className="flex items-end justify-between gap-3">
                  <div>
                    <p className="font-semibold text-sm">{t.name}</p>
                    {/* TODO: Update with real client city attribution */}
                    <p className="text-muted-foreground text-sm">{t.city}, BC</p>
                  </div>
                  <span className="text-xs font-medium text-primary bg-primary/10 px-3 py-1 rounded-full shrink-0">{t.service}</span>
                </div>
              </motion.div>
            ))}
          </div>

          <p className="text-xs text-muted-foreground text-center mt-10 max-w-2xl mx-auto leading-relaxed">
            Testimonials reflect individual customer experiences. Results may vary based on project scope and eligibility for rebate programs.
          </p>
          <div className="text-center mt-4">
            <a
              href="https://g.page/r/[GOOGLE-PLACE-ID]"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-primary text-primary text-sm font-medium hover:bg-primary hover:text-primary-foreground transition-colors"
            >
              See Our Google Reviews →
            </a>
          </div>
        </div>
      </section>

      {/* TRUST GRID */}
      <section className="section-padding bg-card" aria-label="Why us">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
            {[
              { icon: Shield, label: "Vetted Craftsmen", desc: "Every contractor is licensed, insured, and project-managed by us." },
              { icon: Sparkles, label: "Premium Materials", desc: "Hotel-grade tile, stone, hardwood, and fixtures — never builder-grade." },
              { icon: Award, label: "Standing Behind the Work", desc: "We don't disappear at handover. The project is ours until you love it." },
            ].map((b) => (
              <div key={b.label}>
                <b.icon className="text-primary mx-auto mb-4" size={28} />
                <h3 className="font-display text-lg font-semibold mb-2">{b.label}</h3>
                <p className="text-muted-foreground text-sm">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </Layout>
  );
};

export default Index;
