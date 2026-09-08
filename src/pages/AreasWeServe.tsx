import { Link } from "react-router-dom";
import { ArrowRight, MapPin } from "lucide-react";
import { motion } from "framer-motion";
import Layout from "@/components/Layout";
import CTASection from "@/components/CTASection";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { SERVICES } from "@/data/services";
import { SERVICE_AREA } from "@/lib/service-area";

const greaterVancouver = ["Vancouver", "Burnaby", "Richmond", "Surrey", "Coquitlam", "Maple Ridge"];
const fraserValley = ["Langley", "Abbotsford", "Chilliwack"];

const AreasWeServe = () => (
  <Layout>
    <SEO
      title="Home Renovations in Greater Vancouver & Fraser Valley | Areas We Serve"
      description="Home Improvement Club serves homeowners across Greater Vancouver and the Fraser Valley, including Vancouver, Burnaby, Richmond, Surrey, Coquitlam, Langley, Abbotsford, Chilliwack, and Maple Ridge."
      canonical="/areas-we-serve"
    />

    <section className="section-padding-lg">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65 }}
        className="max-w-4xl mx-auto text-center"
      >
        <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-4">Areas We Serve</p>
        <h1 className="heading-xl mb-6">Home Renovations Across {SERVICE_AREA}</h1>
        <p className="body-lg max-w-3xl mx-auto">
          Home Improvement Club serves homeowners throughout Greater Vancouver and Fraser Valley. Share your project scope and location with us to confirm availability and plan next steps.
        </p>
      </motion.div>
    </section>

    <section className="pb-20 md:pb-28">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-7">
        {[
          { region: "Greater Vancouver", cities: greaterVancouver },
          { region: "Fraser Valley", cities: fraserValley },
        ].map(({ region, cities }) => (
          <article key={region} className="rounded-2xl border border-border bg-card p-8 md:p-10">
            <div className="flex items-center gap-3 mb-6">
              <MapPin className="text-primary" size={22} aria-hidden="true" />
              <h2 className="font-display text-2xl font-semibold">{region}</h2>
            </div>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-3 text-foreground/80">
              {cities.map((city) => <li key={city}>{city}</li>)}
            </ul>
          </article>
        ))}
      </div>
    </section>

    <section className="section-padding bg-muted/40">
      <div className="max-w-6xl mx-auto px-6">
        <div className="max-w-3xl mb-12">
          <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-4">Six Specialties</p>
          <h2 className="heading-lg mb-5">Services Available Across Our Service Area</h2>
          <p className="body-lg">Explore renovation services, then book a consultation to discuss your home, timing, and project requirements.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {SERVICES.map((service) => (
            <Link
              key={service.slug}
              to={`/services/${service.slug}`}
              className="group rounded-xl border border-border bg-background p-6 transition-colors hover:border-primary/50"
            >
              <service.icon className="text-primary mb-5" size={28} aria-hidden="true" />
              <h3 className="font-display text-xl font-semibold mb-3">{service.title}</h3>
              <span className="inline-flex items-center gap-2 text-sm font-semibold text-primary">
                Explore service <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          ))}
        </div>
        <div className="mt-10">
          <Button variant="outline" asChild>
            <Link to="/services">View all services <ArrowRight size={16} /></Link>
          </Button>
        </div>
      </div>
    </section>

    <CTASection
      title="Planning a Renovation in Greater Vancouver or Fraser Valley?"
      description="Tell us about your home, service needs, and preferred timing. We’ll help you determine next steps for your project."
    />
  </Layout>
);

export default AreasWeServe;
