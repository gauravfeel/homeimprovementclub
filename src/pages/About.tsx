import { motion } from "framer-motion";
import { Target, Heart, Users } from "lucide-react";
import Layout from "@/components/Layout";
import CTASection from "@/components/CTASection";

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.7 },
};

const About = () => (
  <Layout>
    <section className="section-padding-lg">
      <div className="max-w-4xl mx-auto text-center mb-20">
        <motion.div {...fadeUp}>
          <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-4">About Us</p>
          <h1 className="heading-xl mb-6">We Believe Every Home Tells a Story</h1>
          <p className="body-lg max-w-2xl mx-auto">
            Home Improvement Club was founded on a simple idea: upgrading your home should feel as good as living in the result.
          </p>
        </motion.div>
      </div>
    </section>

    <section className="section-padding-lg bg-card">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {[
            { icon: Target, title: "Our Mission", desc: "To make home improvement accessible, transparent, and enjoyable for every homeowner — regardless of budget or experience." },
            { icon: Heart, title: "Our Values", desc: "Quality over quantity. We'd rather connect you with one exceptional contractor than ten average ones." },
            { icon: Users, title: "Our Network", desc: "Every professional in our network is personally vetted, background-checked, and reviewed by real homeowners." },
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
              It started with a frustrating bathroom remodel. Unreturned calls. Missed deadlines. Budget overruns. 
              We knew there had to be a better way.
            </p>
            <p>
              So we built Home Improvement Club — a curated network of trusted professionals, matched to your 
              specific needs, with full project guidance from start to finish.
            </p>
            <p>
              Today, we've helped thousands of homeowners transform their spaces without the stress. 
              Because your home is more than a building — it's where life happens.
            </p>
          </div>
        </motion.div>
      </div>
    </section>

    <CTASection />
  </Layout>
);

export default About;
