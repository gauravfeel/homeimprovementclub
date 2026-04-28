import { useEffect, useRef } from "react";
import type { FieldValues } from "@formspree/core";
import { useForm, ValidationError } from "@formspree/react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import Layout from "@/components/Layout";
import SEO from "@/components/SEO";
import { cn } from "@/lib/utils";

/** Formspree form id (dashboard → Integration → form endpoint). Override with VITE_FORMSPREE_ID in .env */
const FORM_ID = import.meta.env.VITE_FORMSPREE_ID || "xlgaonqb";

const projectTypes = [
  "HVAC & Comfort",
  "Kitchen & Bath",
  "Outdoor Living",
  "Solar & Energy",
  "Smart Home",
  "General Renovation",
  "Other",
];

const budgetRanges = [
  "Under $10,000",
  "$10,000 – $25,000",
  "$25,000 – $50,000",
  "$50,000 – $100,000",
  "$100,000+",
];

const errorClass = "text-sm text-destructive mt-1.5";

const Contact = () => {
  const { toast } = useToast();
  const [state, handleSubmit, reset] = useForm<FieldValues>(FORM_ID);
  const wasSubmitting = useRef(false);

  useEffect(() => {
    if (wasSubmitting.current && !state.submitting && !state.succeeded && state.errors) {
      toast({
        title: "Something went wrong",
        description: "Please email us at homeimprovementclub.co@gmail.com",
        variant: "destructive",
      });
    }
    wasSubmitting.current = state.submitting;
  }, [state.submitting, state.succeeded, state.errors, toast]);

  return (
    <Layout>
      <SEO
        title="Book a Free Consultation | Home Improvement Club — Fraser Valley BC"
        description="Book your free home renovation consultation in Abbotsford, Chilliwack, Hope, or Langley. Kitchens, bathrooms, HVAC, flooring, and more — vetted craftsmen, project-managed start to finish."
        canonical="/contact"
      />
      <section className="section-padding-lg">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-4">Get Started</p>
            <h1 className="heading-xl mb-3">Get Your Free Home Upgrade Plan</h1>
            <p className="text-muted-foreground text-sm mb-6">Proudly serving Abbotsford, Chilliwack, Hope, and Langley.</p>
            <p className="body-lg mb-8">
              Tell us about your home and your goals. We'll create a personalized upgrade plan — with options,
              pricing, and a timeline — completely free.
            </p>
            <div className="space-y-4 text-muted-foreground">
              <p className="flex items-center gap-3"><span className="w-1.5 h-1.5 rounded-full bg-primary" /> No commitment required</p>
              <p className="flex items-center gap-3"><span className="w-1.5 h-1.5 rounded-full bg-primary" /> Response within 24 hours</p>
              <p className="flex items-center gap-3"><span className="w-1.5 h-1.5 rounded-full bg-primary" /> 100% free consultation</p>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }}>
            <div className="bg-card rounded-2xl p-8 border border-border space-y-5">
              {state.succeeded ? (
                <div className="text-center py-6 space-y-4">
                  <p className="text-xl font-semibold text-foreground">Thank you!</p>
                  <p className="text-muted-foreground">
                    We'll be in touch within 24 hours with your personalized plan.
                  </p>
                  <Button type="button" variant="outline" onClick={() => reset()}>
                    Send another message
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                  <input
                    type="hidden"
                    name="_subject"
                    value="New Consultation Request — Home Improvement Club"
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="contact-firstName" className="text-sm font-medium mb-1.5 block">
                        First Name *
                      </label>
                      <Input
                        id="contact-firstName"
                        name="firstName"
                        required
                        placeholder="John"
                        maxLength={100}
                      />
                      <ValidationError prefix="First name" field="firstName" errors={state.errors} className={cn(errorClass)} />
                    </div>
                    <div>
                      <label htmlFor="contact-lastName" className="text-sm font-medium mb-1.5 block">
                        Last Name
                      </label>
                      <Input id="contact-lastName" name="lastName" placeholder="Smith" maxLength={100} />
                      <ValidationError prefix="Last name" field="lastName" errors={state.errors} className={cn(errorClass)} />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="contact-email" className="text-sm font-medium mb-1.5 block">
                      Email *
                    </label>
                    <Input
                      id="contact-email"
                      name="email"
                      type="email"
                      required
                      placeholder="john@example.com"
                      maxLength={255}
                    />
                    <ValidationError prefix="Email" field="email" errors={state.errors} className={cn(errorClass)} />
                  </div>
                  <div>
                    <label htmlFor="contact-phone" className="text-sm font-medium mb-1.5 block">
                      Phone
                    </label>
                    <Input
                      id="contact-phone"
                      name="phone"
                      type="tel"
                      placeholder="(555) 123-4567"
                      maxLength={20}
                    />
                    <ValidationError prefix="Phone" field="phone" errors={state.errors} className={cn(errorClass)} />
                  </div>
                  <div>
                    <label htmlFor="contact-project" className="text-sm font-medium mb-1.5 block">
                      Ideal Style of Renovation
                    </label>
                    <select
                      id="contact-project"
                      name="project type"
                      defaultValue=""
                      className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                    >
                      <option value="">Select a project type</option>
                      {projectTypes.map((p) => (
                        <option key={p} value={p}>
                          {p}
                        </option>
                      ))}
                    </select>
                    <ValidationError
                      prefix="Project"
                      field="project type"
                      errors={state.errors}
                      className={cn(errorClass)}
                    />
                  </div>
                  <div>
                    <label htmlFor="contact-budget" className="text-sm font-medium mb-1.5 block">
                      Budget
                    </label>
                    <select
                      id="contact-budget"
                      name="budget"
                      defaultValue=""
                      className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                    >
                      <option value="">Select a budget range</option>
                      {budgetRanges.map((b) => (
                        <option key={b} value={b}>
                          {b}
                        </option>
                      ))}
                    </select>
                    <ValidationError prefix="Budget" field="budget" errors={state.errors} className={cn(errorClass)} />
                  </div>
                  <div>
                    <label htmlFor="contact-message" className="text-sm font-medium mb-1.5 block">
                      Tell Us More
                    </label>
                    <Textarea
                      id="contact-message"
                      name="message"
                      placeholder="Describe your project vision..."
                      rows={4}
                      maxLength={1000}
                    />
                    <ValidationError prefix="Message" field="message" errors={state.errors} className={cn(errorClass)} />
                  </div>
                  <Button variant="hero" size="xl" type="submit" className="w-full" disabled={state.submitting}>
                    {state.submitting ? "Sending…" : "Get My Free Plan"}
                  </Button>
                  <p className="text-xs text-muted-foreground text-center">We respect your privacy. No spam, ever.</p>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
