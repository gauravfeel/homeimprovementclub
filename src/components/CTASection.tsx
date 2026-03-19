import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const CTASection = () => (
  <section className="section-padding-lg bg-primary text-primary-foreground text-center">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="max-w-2xl mx-auto"
    >
      <h2 className="heading-lg mb-6">Ready to Transform Your Home?</h2>
      <p className="text-primary-foreground/80 text-lg md:text-xl mb-10 leading-relaxed">
        Get your personalized Home Upgrade Plan — completely free. No pressure, no commitments.
      </p>
      <Button variant="hero-outline" size="xl" asChild className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
        <Link to="/contact">Get My Free Plan</Link>
      </Button>
    </motion.div>
  </section>
);

export default CTASection;
