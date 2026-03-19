import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, Shield, Clock, Star, Sparkles } from "lucide-react";
import Layout from "@/components/Layout";
import CTASection from "@/components/CTASection";
import heroImg from "@/assets/hero-home.jpg";
import kitchenImg from "@/assets/kitchen-upgrade.jpg";
import outdoorImg from "@/assets/outdoor-living.jpg";

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.7 },
};

const Index = () => (
  <Layout>
    {/* Hero */}
    <section className="relative min-h-[90vh] flex items-center">
      <div className="absolute inset-0">
        <img src={heroImg} alt="Beautiful modern living room" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-foreground/40" />
      </div>
      <div className="relative z-10 section-padding w-full">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="max-w-3xl"
        >
          <h1 className="heading-xl text-background mb-6">
            Upgrade Your Home.<br />Upgrade Your Life.
          </h1>
          <p className="text-background/80 text-lg md:text-xl max-w-xl mb-10 leading-relaxed font-light">
            From comfort to curb appeal, we connect you with trusted professionals who make your dream home a reality.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button variant="hero" size="xl" asChild>
              <Link to="/contact">Get My Home Upgrade Plan <ArrowRight size={18} /></Link>
            </Button>
            <Button variant="hero-outline" size="xl" asChild className="border-background text-background hover:bg-background hover:text-foreground">
              <Link to="/how-it-works">See How It Works</Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>

    {/* Problem → Solution */}
    <section className="section-padding-lg">
      <div className="max-w-7xl mx-auto">
        <motion.div {...fadeUp} className="max-w-2xl mx-auto text-center mb-20">
          <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-4">The Problem</p>
          <h2 className="heading-lg mb-6">Home Upgrades Shouldn't Be This Hard</h2>
          <p className="body-lg">
            Finding reliable contractors, comparing quotes, managing timelines — it's exhausting. 
            You deserve a simpler way to transform your home.
          </p>
        </motion.div>
        <motion.div {...fadeUp} className="max-w-2xl mx-auto text-center">
          <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-4">The Solution</p>
          <h2 className="heading-lg mb-6">One Club. Every Upgrade.</h2>
          <p className="body-lg">
            We curate vetted professionals, handle the details, and guide you through every step — 
            so you can focus on enjoying the transformation.
          </p>
        </motion.div>
      </div>
    </section>

    {/* Services Preview */}
    <section className="section-padding-lg bg-card">
      <div className="max-w-7xl mx-auto">
        <motion.div {...fadeUp} className="text-center mb-16">
          <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-4">Our Services</p>
          <h2 className="heading-lg">Everything Your Home Needs</h2>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { title: "Comfort & Efficiency", desc: "HVAC, insulation, and energy upgrades that pay for themselves.", img: heroImg },
            { title: "Aesthetic Upgrades", desc: "Lighting, interiors, and finishes that transform how your home feels.", img: kitchenImg },
            { title: "Outdoor Living", desc: "Decks, patios, and landscaping that extend your living space.", img: outdoorImg },
            { title: "Future-Proofing", desc: "Solar, smart home tech, and sustainable upgrades for tomorrow.", img: outdoorImg },
          ].map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
            >
              <Link to="/services" className="group block relative rounded-xl overflow-hidden aspect-[16/9]">
                <img src={s.img} alt={s.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-foreground/50 group-hover:bg-foreground/60 transition-colors" />
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                  <h3 className="font-display text-xl md:text-2xl font-semibold text-background mb-2">{s.title}</h3>
                  <p className="text-background/70 text-sm md:text-base">{s.desc}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* How It Works Preview */}
    <section className="section-padding-lg">
      <div className="max-w-7xl mx-auto">
        <motion.div {...fadeUp} className="text-center mb-16">
          <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-4">How It Works</p>
          <h2 className="heading-lg">Four Simple Steps</h2>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {[
            { step: "01", title: "Tell Us Your Vision", desc: "Share what you'd love to upgrade about your home." },
            { step: "02", title: "Get Your Plan", desc: "We create a personalized upgrade plan tailored to you." },
            { step: "03", title: "Meet Your Pros", desc: "We connect you with vetted, top-rated professionals." },
            { step: "04", title: "Love Your Home", desc: "Sit back and enjoy your beautifully upgraded space." },
          ].map((s, i) => (
            <motion.div
              key={s.step}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="text-center"
            >
              <span className="text-5xl font-display font-bold text-primary/20 block mb-4">{s.step}</span>
              <h3 className="font-display text-xl font-semibold mb-3">{s.title}</h3>
              <p className="body-md">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* Testimonials Preview */}
    <section className="section-padding-lg bg-card">
      <div className="max-w-7xl mx-auto">
        <motion.div {...fadeUp} className="text-center mb-16">
          <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-4">Testimonials</p>
          <h2 className="heading-lg">What Homeowners Say</h2>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { name: "Sarah M.", location: "Austin, TX", text: "They made our kitchen remodel completely stress-free. The results exceeded every expectation." },
            { name: "David & Lisa K.", location: "Denver, CO", text: "From the first call to the final walkthrough, everything was seamless. Our outdoor space is now our favorite room." },
            { name: "Michael T.", location: "Portland, OR", text: "Going solar felt overwhelming until Home Improvement Club walked us through every step. Couldn't be happier." },
          ].map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-background rounded-xl p-8 border border-border"
            >
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, j) => <Star key={j} size={16} className="fill-primary text-primary" />)}
              </div>
              <p className="text-foreground/80 leading-relaxed mb-6 italic">"{t.text}"</p>
              <div>
                <p className="font-semibold text-sm">{t.name}</p>
                <p className="text-muted-foreground text-sm">{t.location}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* Trust Badges */}
    <section className="section-padding">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          {[
            { icon: Shield, label: "Vetted Professionals", desc: "Every contractor is background-checked and reviewed." },
            { icon: Clock, label: "On-Time Guarantee", desc: "Projects completed on schedule, or we make it right." },
            { icon: Sparkles, label: "Satisfaction Promise", desc: "Love your results, or we'll work until you do." },
          ].map((b, i) => (
            <motion.div
              key={b.label}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="flex flex-col items-center"
            >
              <b.icon size={32} className="text-primary mb-4" />
              <h4 className="font-sans font-semibold mb-2">{b.label}</h4>
              <p className="text-muted-foreground text-sm">{b.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    <CTASection />
  </Layout>
);

export default Index;
