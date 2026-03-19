import { motion } from "framer-motion";
import { Star } from "lucide-react";
import Layout from "@/components/Layout";
import CTASection from "@/components/CTASection";

const testimonials = [
  { name: "Sarah M.", location: "Chilliwack, BC", project: "Kitchen Remodel", text: "They made our kitchen remodel completely stress-free. The contractor they matched us with was incredible — on time, on budget, and the results exceeded every expectation. Our kitchen is now the heart of our home." },
  { name: "David & Lisa K.", location: "Abbotsford, BC", project: "Outdoor Living", text: "From the first call to the final walkthrough, everything was seamless. Our new deck and outdoor kitchen have literally changed how we live. We spend every evening outside now." },
  { name: "Michael T.", location: "White Rock, BC", project: "Solar Installation", text: "Going solar felt overwhelming until Home Improvement Club walked us through every step. The installation was quick, professional, and our energy bills have dropped by 70%. Best investment we've made." },
  { name: "Jennifer R.", location: "Mission, BC", project: "HVAC Upgrade", text: "Our old system was costing us a fortune. The team recommended a high-efficiency system that cut our bills in half. The installation crew was polite, clean, and finished in one day." },
  { name: "Robert & Amy W.", location: "Surrey, BC", project: "Full Renovation", text: "We renovated our entire first floor — kitchen, living room, and bathrooms. Having one point of contact who managed everything was a game-changer. It felt like having a personal concierge for our home." },
  { name: "Patricia L.", location: "Chilliwack, BC", project: "Smart Home", text: "I wanted to make my home smarter but didn't know where to start. They designed a complete smart home package — lighting, security, climate — and the installer was fantastic. My home feels like the future." },
];

const Testimonials = () => (
  <Layout>
    <section className="section-padding-lg">
      <div className="max-w-4xl mx-auto text-center mb-20">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-4">Testimonials</p>
          <h1 className="heading-xl mb-6">Real Stories. Real Transformations.</h1>
          <p className="body-lg max-w-2xl mx-auto">
            Don't just take our word for it. Here's what homeowners across the country have to say about their experience.
          </p>
        </motion.div>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        {testimonials.map((t, i) => (
          <motion.div
            key={t.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            className="bg-card rounded-xl p-8 border border-border"
          >
            <div className="flex gap-1 mb-4">
              {[...Array(5)].map((_, j) => <Star key={j} size={16} className="fill-primary text-primary" />)}
            </div>
            <p className="text-foreground/80 leading-relaxed mb-6 italic">"{t.text}"</p>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold text-sm">{t.name}</p>
                <p className="text-muted-foreground text-sm">{t.location}</p>
              </div>
              <span className="text-xs font-medium text-primary bg-sage-light px-3 py-1 rounded-full">{t.project}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>

    <CTASection />
  </Layout>
);

export default Testimonials;
