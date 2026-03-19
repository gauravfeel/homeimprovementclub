import { motion } from "framer-motion";
import { TrendingUp, Clock, Shield, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.7 },
};

const Contractors = () => (
  <Layout>
    <section className="section-padding-lg">
      <div className="max-w-4xl mx-auto text-center mb-20">
        <motion.div {...fadeUp}>
          <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-4">For Contractors</p>
          <h1 className="heading-xl mb-6">Get More Jobs Without Chasing Leads</h1>
          <p className="body-lg max-w-2xl mx-auto">
            Join our network of trusted professionals and receive pre-qualified, ready-to-start homeowner leads — delivered right to you.
          </p>
          <div className="mt-10">
            <Button variant="hero" size="xl" asChild>
              <Link to="/contact">Apply to Join <ArrowRight size={18} /></Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>

    <section className="section-padding-lg bg-card">
      <div className="max-w-5xl mx-auto">
        <motion.div {...fadeUp} className="text-center mb-16">
          <h2 className="heading-lg">Why Contractors Choose Us</h2>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {[
            { icon: TrendingUp, title: "Qualified Leads", desc: "Every lead is pre-screened. Homeowners come to you ready to start — no tire-kickers." },
            { icon: Clock, title: "Save Time", desc: "Stop spending hours on marketing and cold outreach. We bring the customers to you." },
            { icon: Shield, title: "Build Your Reputation", desc: "Earn reviews, get featured, and grow your brand through our trusted platform." },
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
      <div className="max-w-3xl mx-auto text-center">
        <motion.div {...fadeUp}>
          <h2 className="heading-lg mb-6">How It Works for You</h2>
          <div className="space-y-8 text-left max-w-xl mx-auto">
            {[
              { step: "1", title: "Apply", desc: "Fill out a short application. We review your credentials, licensing, and reviews." },
              { step: "2", title: "Get Approved", desc: "Once approved, you join our curated network and start appearing in homeowner matches." },
              { step: "3", title: "Receive Leads", desc: "We send you pre-qualified leads in your service area and specialty. Accept the ones you want." },
              { step: "4", title: "Grow", desc: "Complete projects, earn reviews, and watch your business grow — without the marketing headache." },
            ].map((s, i) => (
              <motion.div
                key={s.step}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="flex gap-5 items-start"
              >
                <span className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold flex-shrink-0">
                  {s.step}
                </span>
                <div>
                  <h4 className="font-semibold text-lg mb-1">{s.title}</h4>
                  <p className="body-md">{s.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="mt-12">
            <Button variant="hero" size="xl" asChild>
              <Link to="/contact">Apply Now</Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  </Layout>
);

export default Contractors;
