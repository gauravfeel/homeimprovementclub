import { useState } from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import Layout from "@/components/Layout";
import CTASection from "@/components/CTASection";
import SEO from "@/components/SEO";
import { TESTIMONIALS } from "@/data/testimonials";

const CITIES = ["All", "Abbotsford", "Chilliwack", "Langley", "Hope"] as const;

const reviewsSchema = {
  "@context": "https://schema.org",
  "@graph": TESTIMONIALS.map((t) => ({
    "@type": "Review",
    author: { "@type": "Person", name: t.name },
    reviewBody: t.quote,
    reviewRating: {
      "@type": "Rating",
      ratingValue: "5",
      bestRating: "5",
    },
    itemReviewed: {
      "@type": "LocalBusiness",
      name: "Home Improvement Club",
    },
  })),
};

const Testimonials = () => {
  const [filter, setFilter] = useState<string>("All");
  const filtered = filter === "All" ? TESTIMONIALS : TESTIMONIALS.filter((t) => t.city === filter);

  return (
    <Layout>
      <SEO
        title="Client Stories | Home Improvement Club — Fraser Valley BC"
        description="Real testimonials from homeowners in Abbotsford, Chilliwack, Hope, and Langley. Kitchen, bathroom, HVAC, flooring, and exterior renovations by Home Improvement Club."
        canonical="/testimonials"
        schema={reviewsSchema}
      />

      <section id="testimonials" className="section-padding-lg">
        <div className="max-w-4xl mx-auto text-center mb-10">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-4">Client Stories</p>
            <h1 className="heading-xl mb-6">Trusted by Homeowners Across the Fraser Valley</h1>
            <p className="body-lg max-w-2xl mx-auto">
              Real projects. Real results. From Abbotsford to Hope.
            </p>
          </motion.div>
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {CITIES.map((city) => (
            <button
              key={city}
              onClick={() => setFilter(city)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-colors ${
                filter === city
                  ? "bg-primary text-primary-foreground border-primary"
                  : "border-border text-muted-foreground hover:border-primary hover:text-primary"
              }`}
            >
              {city}
            </button>
          ))}
        </div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((t, i) => (
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
              <p className="text-foreground/80 leading-relaxed mb-6 italic">"{t.quote}"</p>
              <div className="flex items-end justify-between gap-3">
                <div>
                  <p className="font-semibold text-sm">{t.name}</p>
                  {/* TODO: Update with real client city attribution */}
                  <p className="text-muted-foreground text-sm">{t.city}, BC</p>
                </div>
                <span className="text-xs font-medium text-primary bg-primary/10 px-3 py-1 rounded-full shrink-0">{t.service}</span>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="max-w-6xl mx-auto mt-12">
          <p className="text-xs text-muted-foreground text-center max-w-2xl mx-auto leading-relaxed">
            Testimonials reflect individual customer experiences. Results may vary based on project scope and eligibility for rebate programs.
          </p>
          <div className="text-center mt-4">
            <a
              href="https://g.page/r/[GOOGLE-PLACE-ID]"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-primary text-primary text-sm font-medium hover:bg-primary hover:text-primary-foreground transition-colors"
            >
              See Our Google Reviews →
            </a>
          </div>
        </div>
      </section>

      <CTASection />
    </Layout>
  );
};

export default Testimonials;
