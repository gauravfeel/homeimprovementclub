import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

interface CTASectionProps {
  title?: string;
  description?: string;
  cta?: string;
}

const CTASection = ({
  title = "Begin Your Transformation",
  description = "Book a complimentary on-site consultation. We'll walk your home, understand your vision, and design a renovation plan worth investing in.",
  cta = "Book Free Consultation",
}: CTASectionProps) => (
  <section className="section-padding-lg bg-primary text-primary-foreground text-center">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="max-w-2xl mx-auto"
    >
      <p className="text-primary-foreground/70 font-semibold text-xs uppercase tracking-widest mb-4">Limited Calendar</p>
      <h2 className="heading-lg mb-6">{title}</h2>
      <p className="text-primary-foreground/85 text-lg md:text-xl mb-10 leading-relaxed">
        {description}
      </p>
      <Button variant="hero-outline" size="xl" asChild className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
        <Link to="/contact">{cta} <ArrowRight size={18} /></Link>
      </Button>
    </motion.div>
  </section>
);

export default CTASection;
