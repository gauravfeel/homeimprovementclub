import { motion } from "framer-motion";
import { Target, Award, Users } from "lucide-react";
import Layout from "@/components/Layout";
import CTASection from "@/components/CTASection";
import SEO from "@/components/SEO";

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.7 },
};

const About = () => (
  <Layout>
    <SEO
      title="About | Home Improvement Club — Premium BC Renovations"
      description="Home Improvement Club delivers high-end home renovations across British Columbia. Vetted craftsmen, transparent process, premium materials, and accountable delivery."
      canonical="/about"
    />
    <section className="section-padding-lg">
      <div className="max-w-4xl mx-auto text-center mb-20">
        <motion.div {...fadeUp}>
          <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-4">About Us</p>
          <h1 className="heading-xl mb-6">A Different Standard for BC Homeowners.</h1>
          <p className="body-lg max-w-2xl mx-auto">
            Home Improvement Club exists because premium renovations shouldn't feel like a gamble. We curate craftsmen, manage projects end-to-end, and stand behind every result.
          </p>
        </motion.div>
      </div>
    </section>

    <section className="section-padding-lg bg-card">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {[
            { icon: Target, title: "Our Mission", desc: "To deliver high-end home renovations that homeowners can trust on day one and still love a decade later." },
            { icon: Award, title: "Our Standard", desc: "Hotel-grade materials. Master-level craftsmanship. Transparent communication. No builder-grade shortcuts, ever." },
            { icon: Users, title: "Our Network", desc: "A curated bench of BC craftsmen — kitchen specialists, tile masters, lighting designers — vetted, insured, and accountable to us." },
          ].map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="text-center"
            >
              <div className="w-14 h-14 rounded-2xl bg-sage-light flex items-center justify-center mx-auto mb-5">
                <item.icon size={26} className="text-primary" />
              </div>
              <h3 className="font-display text-xl font-semibold mb-3">{item.title}</h3>
              <p className="body-md">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    <section className="section-padding-lg">
      <div className="max-w-3xl mx-auto">
        <motion.div {...fadeUp}>
          <h2 className="heading-lg text-center mb-10">Our Story</h2>
          <div className="space-y-6 body-lg">
            <p>
              Home Improvement Club was founded on a simple frustration: BC homeowners investing in premium renovations were too often handed builder-grade results, vague timelines, and crews that vanished after the first cheque.
            </p>
            <p>
              We saw what was missing — not more contractors, but a higher standard of curation, project management, and accountability. So we built it. We assembled a vetted bench of BC's best kitchen specialists, tile masters, lighting designers, and exterior craftsmen, and we project-manage every job ourselves.
            </p>
            <p>
              Today we deliver high-end kitchens, bathrooms, lighting, tile, HVAC, and exterior renovations across British Columbia. Every project is led by craftsmen whose careers are built on this exact work, finished with hotel-grade materials, and stood behind by us — long after the keys are handed back.
            </p>
            <p>
              That's the difference. And once you've seen it, you understand why our clients refuse to renovate any other way.
            </p>
          </div>
        </motion.div>
      </div>
    </section>

    <CTASection />
  </Layout>
);

export default About;
