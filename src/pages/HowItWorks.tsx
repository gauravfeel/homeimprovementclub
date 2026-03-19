import { motion } from "framer-motion";
import { ClipboardList, Lightbulb, Users, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";
import CTASection from "@/components/CTASection";

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
    title: "Tell Us Your Vision",
    desc: "Fill out a quick form or hop on a call. Tell us what you'd love to change about your home — no detail is too small.",
  },
  {
    icon: Lightbulb,
    step: "02",
    title: "Get Your Personalized Plan",
    desc: "We analyze your needs and create a curated Home Upgrade Plan — with options, timelines, and transparent pricing.",
  },
  {
    icon: Users,
    step: "03",
    title: "Meet Your Professionals",
    desc: "We match you with vetted, top-rated contractors who specialize in exactly what you need. No cold-calling, no guesswork.",
  },
  {
    icon: Heart,
    step: "04",
    title: "Love Your Upgraded Home",
    desc: "We oversee the process from start to finish. You sit back, relax, and enjoy the transformation.",
  },
];

const HowItWorks = () => (
  <Layout>
    <section className="section-padding-lg">
      <div className="max-w-4xl mx-auto text-center mb-20">
        <motion.div {...fadeUp}>
          <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-4">How It Works</p>
          <h1 className="heading-xl mb-6">Simple. Seamless. Stress-Free.</h1>
          <p className="body-lg max-w-2xl mx-auto">
            We've removed every obstacle between you and your dream home. Here's exactly how we do it.
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
            transition={{ duration: 0.6, delay: 0.1 }}
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
        <h2 className="heading-md mb-4">No Hidden Fees. No Surprises.</h2>
        <p className="body-lg max-w-xl mx-auto mb-8">
          Our service is completely free for homeowners. We earn our keep by partnering with the best contractors in your area.
        </p>
        <Button variant="hero" size="xl" asChild>
          <Link to="/contact">Start My Plan — It's Free</Link>
        </Button>
      </motion.div>
    </section>

    <CTASection />
  </Layout>
);

export default HowItWorks;
