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
          <h1 className="heading-xl mb-6">Built to Protect Homeowners</h1>
          <p className="body-lg max-w-2xl mx-auto">
            Home Improvement Club exists because too many families are taken advantage of during the most important investment of their lives. We're here to change that.
          </p>
        </motion.div>
      </div>
    </section>

    <section className="section-padding-lg bg-card">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {[
            { icon: Target, title: "Our Mission", desc: "To stand between homeowners and the contractors who would take advantage of them — ensuring every project is honest, fair, and finished right." },
            { icon: Heart, title: "Our Values", desc: "Integrity over profit. We built this company because we saw what happens when no one holds contractors accountable, and we refuse to look the other way." },
            { icon: Users, title: "Our Network", desc: "Every tradesperson in our network is vetted for skill, honesty, and accountability. We back contractors who build careers on reputation, not shortcuts." },
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
              Home Improvement Club was born from a moment we will never forget.
            </p>
            <p>
              We met a single mother who had spent 28 years saving every dollar she could while raising her children as an immigrant in this country. She finally had enough to build her first home. It was supposed to be her moment. Instead, contractors kept inflating their quotes mid-project, draining her construction loan faster than the walls were going up. She was running out of money, running out of options, and on the verge of losing everything she had worked her entire life to build.
            </p>
            <p>
              We stepped in. We took on the project, stabilized the budget, and made sure her home got finished the right way. Watching her walk through the front door of a home that was truly hers was the moment this became more than just a job for us.
            </p>
            <p>
              That story is not unique. Homeowners, especially those who can least afford it, are too often taken advantage of by contractors who see vulnerability as an opportunity. We built Home Improvement Club to change that.
            </p>
            <p>
              We connect families with tradespeople who are honest, skilled, and accountable. We support contractors who want to build real careers on reputation and quality. And we show up for the communities we serve because we have seen firsthand what is at stake when no one does.
            </p>
          </div>
        </motion.div>
      </div>
    </section>

    <CTASection />
  </Layout>
);

export default About;
