import { motion } from "framer-motion";
import Layout from "@/components/Layout";
import CTASection from "@/components/CTASection";
import ServiceCard from "@/components/ServiceCard";
import SEO from "@/components/SEO";
import { SERVICES } from "@/data/services";

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.7 },
};

const Services = () => (
  <Layout>
    <SEO
      title="Premium Home Renovation Services in BC | Home Improvement Club"
      description="Luxury kitchen, bathroom, lighting, tile, HVAC, and exterior renovations across British Columbia. Vetted craftsmen, transparent process, premium materials."
      canonical="/services"
    />
    <section className="section-padding-lg">
      <div className="max-w-4xl mx-auto text-center mb-16">
        <motion.div {...fadeUp}>
          <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-4">Our Services</p>
          <h1 className="heading-xl mb-6">Premium Renovations, Curated.</h1>
          <p className="body-lg max-w-2xl mx-auto">
            Six specialties. One standard. Each service led by craftsmen who do nothing else — so the result feels effortless and looks effortless to live in.
          </p>
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
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
    </section>

    <CTASection />
  </Layout>
);

export default Services;
