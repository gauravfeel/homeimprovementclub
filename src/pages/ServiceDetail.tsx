import { useParams, Navigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Shield, Clock, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";
import CTASection from "@/components/CTASection";
import SEO from "@/components/SEO";
import { SERVICES } from "@/data/services";

const ServiceDetail = () => {
  const { slug } = useParams();
  const service = SERVICES.find((s) => s.slug === slug);
  if (!service) return <Navigate to="/services" replace />;

  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.short,
    provider: {
      "@type": "HomeAndConstructionBusiness",
      name: "Home Improvement Club",
    },
    areaServed: [
      { "@type": "City", name: "Abbotsford" },
      { "@type": "City", name: "Chilliwack" },
      { "@type": "City", name: "Hope" },
      { "@type": "City", name: "Langley" },
    ],
  };

  return (
    <Layout>
      <SEO
        title={`${service.title} in Abbotsford, Chilliwack & Fraser Valley | Home Improvement Club`}
        description={service.short}
        canonical={`/services/${service.slug}`}
        schema={schema}
      />

      {/* HERO */}
      <section className="relative min-h-[78vh] flex items-center" aria-label={`${service.title} hero`}>
        <div className="absolute inset-0">
          <img src={service.image} alt={service.title} className="w-full h-full object-cover" loading="eager" width={1920} height={1080} />
          <div className="absolute inset-0 bg-foreground/60" />
        </div>
        <div className="relative z-10 section-padding w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <p className="text-background/70 font-semibold text-xs uppercase tracking-widest mb-4">Premium Renovation Service</p>
            <h1 className="heading-xl text-background mb-6">{service.hero}</h1>
            <p className="text-background/85 text-lg md:text-xl max-w-2xl mb-10 leading-relaxed font-light">
              {service.intro}
            </p>
            <div className="flex flex-wrap gap-4">
              <Button variant="hero" size="xl" asChild>
                <Link to="/contact">Book Consultation <ArrowRight size={18} /></Link>
              </Button>
              <Button variant="hero-outline" size="xl" asChild className="border-background text-background hover:bg-background hover:text-foreground">
                <Link to="/services">All Services</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* BENEFITS */}
      <section className="section-padding-lg" aria-label="Benefits">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-4">Why Homeowners Choose Us</p>
            <h2 className="heading-lg mb-4">{service.title} — Done Right</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {service.benefits.map((b, i) => (
              <motion.div
                key={b.t}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="bg-card border border-border rounded-xl p-6"
              >
                <CheckCircle2 className="text-primary mb-4" size={22} />
                <h3 className="font-display text-lg font-semibold mb-2">{b.t}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{b.d}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SUB-SERVICES */}
      <section className="section-padding-lg bg-card" aria-label="What's included">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 items-start">
          <div>
            <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-4">What's Included</p>
            <h2 className="heading-lg mb-6">Every detail handled by specialists.</h2>
            <p className="body-lg mb-8">
              We don't sub out to whoever's available. Every {service.title.toLowerCase()} project is matched to a craftsman whose entire career is built on this exact work.
            </p>
            <Button variant="hero" size="xl" asChild>
              <Link to="/contact">Discuss My Project <ArrowRight size={18} /></Link>
            </Button>
          </div>
          <ul className="grid sm:grid-cols-2 gap-3">
            {service.sub.map((item) => (
              <li key={item} className="flex items-start gap-3 bg-background border border-border rounded-lg p-4">
                <CheckCircle2 className="text-primary shrink-0 mt-0.5" size={18} />
                <span className="text-sm text-foreground">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* TRUST */}
      <section className="section-padding" aria-label="Trust signals">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          {[
            { icon: Shield, t: "Vetted Craftsmen", d: "Licensed, insured, and project-managed by us end-to-end." },
            { icon: Star, t: "Premium Standard", d: "Hotel-grade materials and finishes — no builder-grade shortcuts." },
            { icon: Clock, t: "On-Time Delivery", d: "Defined timelines, weekly updates, no disappearing crews." },
          ].map((b) => (
            <div key={b.t}>
              <b.icon className="text-primary mx-auto mb-4" size={26} />
              <h3 className="font-display text-lg font-semibold mb-2">{b.t}</h3>
              <p className="text-muted-foreground text-sm">{b.d}</p>
            </div>
          ))}
        </div>
      </section>

      <CTASection
        title={`Ready to start your ${service.title.toLowerCase()}?`}
        description="Book a complimentary on-site consultation. We'll review the space, talk through options, and provide a transparent project plan."
      />
    </Layout>
  );
};

export default ServiceDetail;
