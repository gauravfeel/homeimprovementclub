import { motion } from "framer-motion";
import { ClipboardList, Lightbulb, Hammer, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";
import CTASection from "@/components/CTASection";
import SEO from "@/components/SEO";

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.7 },
};

const steps = [
  {
    icon: ClipboardList,
    step: "01",
    title: "Complimentary Consultation",
    desc: "We meet at your home, walk the space, and listen. No sales pitch — just a conversation about what you want and what's possible.",
  },
  {
    icon: Lightbulb,
    step: "02",
    title: "Design & Transparent Plan",
    desc: "We deliver a clear renovation plan: scope of work, material selections, defined timeline, and a transparent investment range.",
  },
  {
    icon: Hammer,
    step: "03",
    title: "Vetted Craftsmen Build",
    desc: "Matched to specialists in your exact project. Licensed, insured, accountable to us, and managed by us — not left to figure it out themselves.",
  },
  {
    icon: Heart,
    step: "04",
    title: "Final Walkthrough & Care",
    desc: "Weekly updates throughout. A detailed final walkthrough. We stand behind the work — the project is ours until you love it.",
  },
];

const HowItWorks = () => (
  <Layout>
    <SEO
      title="How It Works | Premium Renovation Process — Home Improvement Club"
      description="Our four-step renovation process: consultation, design, vetted build, and final care. Transparent pricing, defined timelines, no surprises."
      canonical="/how-it-works"
    />
    <section className="section-padding-lg">
      <div className="max-w-4xl mx-auto text-center mb-20">
        <motion.div {...fadeUp}>
          <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-4">The Process</p>
          <h1 className="heading-xl mb-6">Premium, Without the Pain.</h1>
          <p className="body-lg max-w-2xl mx-auto">
            We've taken everything that makes renovations stressful — vague pricing, missed timelines, vanishing crews — and built a process that removes all of it.
          </p>
        </motion.div>
      </div>

      <div className="max-w-3xl mx-auto space-y-16">
        {steps.map((s, i) => (
          <motion.div
            key={s.step}
            initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex gap-6 md:gap-10 items-start"
          >
            <div className="flex-shrink-0 w-16 h-16 rounded-2xl bg-sage-light flex items-center justify-center">
              <s.icon size={28} className="text-primary" />
            </div>
            <div>
              <span className="text-primary font-semibold text-sm uppercase tracking-widest">Step {s.step}</span>
              <h3 className="font-display text-2xl font-semibold mt-2 mb-3">{s.title}</h3>
              <p className="body-md">{s.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>

    <section className="section-padding bg-card text-center">
      <motion.div {...fadeUp}>
        <h2 className="heading-md mb-4">Transparent. End to End.</h2>
        <p className="body-lg max-w-xl mx-auto mb-8">
          The on-site consultation is complimentary. The plan we deliver is yours to keep — no obligation.
        </p>
        <Button variant="hero" size="xl" asChild>
          <Link to="/contact">Book My Consultation</Link>
        </Button>
      </motion.div>
    </section>

    <CTASection />
  </Layout>
);

export default HowItWorks;
