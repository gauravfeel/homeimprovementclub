import { useEffect, useRef } from "react";
import type { FieldValues } from "@formspree/core";
import { useForm, ValidationError } from "@formspree/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import Layout from "@/components/Layout";
import SEO from "@/components/SEO";
import { cn } from "@/lib/utils";
import {
  SERVICE_AREA,
  SERVICE_AREA_BC,
  SERVICE_CITIES,
} from "@/lib/service-area";
import { trackEvent } from "@/lib/analytics";
import { useSearchParams } from "react-router-dom";
import { SERVICES } from "@/data/services";
import { ContactInfo } from "@/components/ContactInfo";

/** Formspree form id (dashboard → Integration → form endpoint). Override with VITE_FORMSPREE_ID in .env */
const FORM_ID = import.meta.env.VITE_FORMSPREE_ID || "xlgaonqb";

const projectTypes = [
  ...SERVICES.map((service) => service.title),
  "More than one room",
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
  const [searchParams] = useSearchParams();
  const selectedService = SERVICES.find(
    (service) => service.slug === searchParams.get("service"),
  );
  const selectedCity =
    SERVICE_CITIES.find((city) => city === searchParams.get("city")) || "";
  const { toast } = useToast();
  const [state, handleSubmit, reset] = useForm<FieldValues>(FORM_ID);
  const wasSubmitting = useRef(false);
  const conversionTracked = useRef(false);

  useEffect(() => {
    if (state.succeeded && !conversionTracked.current) {
      conversionTracked.current = true;
      trackEvent({
        event: "generate_lead",
        lead_type: "consultation_form",
        form_location: "contact_page",
      });
    }
    if (
      wasSubmitting.current &&
      !state.submitting &&
      !state.succeeded &&
      state.errors
    ) {
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
        title={`Book a Free Consultation | Home Improvement Club — ${SERVICE_AREA_BC}`}
        description={`Book your free home renovation consultation in ${SERVICE_AREA}. Discuss kitchens, bathrooms, lighting, flooring, HVAC, electrical and exteriors.`}
        canonical="/contact"
      />
      <section className="section-padding-lg contact-section">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          <div className="contact-aside">
            <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-4">
              Get Started
            </p>
            <h1 className="heading-xl mb-3">
              Let’s talk about
              <br />
              <em>
                {selectedService?.slug === "bathrooms"
                  ? "your bathroom."
                  : selectedService?.slug === "kitchen-cabinets"
                    ? "your kitchen."
                    : "your home."}
              </em>
            </h1>
            <p className="text-muted-foreground text-sm mb-6">
              Free renovation consultation · {SERVICE_AREA}
            </p>
            <p className="body-lg mb-8">
              Tell us which rooms are involved and what you want to change.
              We’ll use your enquiry to start a conversation about the scope and
              next steps.
            </p>
            <div className="space-y-4 text-muted-foreground">
              <p className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-primary" /> No
                commitment required
              </p>
              <p className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-primary" /> Your
                scope, budget and timing
              </p>
              <p className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-primary" /> 100%
                free consultation
              </p>
            </div>
            <div className="contact-methods">
              <ContactInfo />
              <button
                type="button"
                className="quick-enquiry"
                onClick={() =>
                  window.dispatchEvent(new Event("hic:open-enquiry"))
                }
              >
                Prefer a short enquiry?
              </button>
            </div>
          </div>

          <div>
            <div className="bg-card rounded-2xl p-8 border border-border space-y-5">
              {state.succeeded ? (
                <div role="status" className="text-center py-6 space-y-4">
                  <p className="text-xl font-semibold text-foreground">
                    Your enquiry is on its way.
                  </p>
                  <p className="text-muted-foreground">
                    Thank you for telling us about your home. We’ll be in touch
                    to discuss your project.
                  </p>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      conversionTracked.current = false;
                      reset();
                    }}
                  >
                    Send another message
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <input
                    type="hidden"
                    name="_subject"
                    value="New Consultation Request — Home Improvement Club"
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="contact-firstName"
                        className="text-sm font-medium mb-1.5 block"
                      >
                        First Name *
                      </label>
                      <Input
                        id="contact-firstName"
                        name="firstName"
                        autoComplete="given-name"
                        required
                        placeholder="John"
                        maxLength={100}
                      />
                      <ValidationError
                        prefix="First name"
                        field="firstName"
                        errors={state.errors}
                        className={cn(errorClass)}
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="contact-lastName"
                        className="text-sm font-medium mb-1.5 block"
                      >
                        Last Name
                      </label>
                      <Input
                        id="contact-lastName"
                        name="lastName"
                        autoComplete="family-name"
                        placeholder="Last name"
                        maxLength={100}
                      />
                      <ValidationError
                        prefix="Last name"
                        field="lastName"
                        errors={state.errors}
                        className={cn(errorClass)}
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="contact-email"
                      className="text-sm font-medium mb-1.5 block"
                    >
                      Email *
                    </label>
                    <Input
                      id="contact-email"
                      name="email"
                      autoComplete="email"
                      type="email"
                      required
                      placeholder="john@example.com"
                      maxLength={255}
                    />
                    <ValidationError
                      prefix="Email"
                      field="email"
                      errors={state.errors}
                      className={cn(errorClass)}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="contact-phone"
                      className="text-sm font-medium mb-1.5 block"
                    >
                      Phone
                    </label>
                    <Input
                      id="contact-phone"
                      name="phone"
                      autoComplete="tel"
                      type="tel"
                      placeholder="(555) 123-4567"
                      maxLength={20}
                    />
                    <ValidationError
                      prefix="Phone"
                      field="phone"
                      errors={state.errors}
                      className={cn(errorClass)}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="contact-city"
                      className="text-sm font-medium mb-1.5 block"
                    >
                      City or neighbourhood
                    </label>
                    <Input
                      id="contact-city"
                      defaultValue={selectedCity}
                      name="city"
                      autoComplete="address-level2"
                      placeholder="Where is your home?"
                      maxLength={100}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="contact-project"
                      className="text-sm font-medium mb-1.5 block"
                    >
                      What are you planning?
                    </label>
                    <select
                      id="contact-project"
                      name="project type"
                      defaultValue={selectedService?.title || ""}
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
                    <label
                      htmlFor="contact-budget"
                      className="text-sm font-medium mb-1.5 block"
                    >
                      Budget
                    </label>
                    <select
                      id="contact-budget"
                      name="budget"
                      defaultValue=""
                      className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                    >
                      <option value="">Select a budget range</option>
                      <option value="Not sure yet">Not sure yet</option>
                      {budgetRanges.map((b) => (
                        <option key={b} value={b}>
                          {b}
                        </option>
                      ))}
                    </select>
                    <ValidationError
                      prefix="Budget"
                      field="budget"
                      errors={state.errors}
                      className={cn(errorClass)}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="contact-message"
                      className="text-sm font-medium mb-1.5 block"
                    >
                      Tell Us More
                    </label>
                    <Textarea
                      id="contact-message"
                      name="message"
                      placeholder="Describe your project vision..."
                      rows={4}
                      maxLength={1000}
                    />
                    <ValidationError
                      prefix="Message"
                      field="message"
                      errors={state.errors}
                      className={cn(errorClass)}
                    />
                  </div>
                  <Button
                    variant="hero"
                    size="xl"
                    type="submit"
                    className="w-full"
                    disabled={state.submitting}
                  >
                    {state.submitting
                      ? "Sending…"
                      : "Request my free consultation"}
                  </Button>
                  <p className="text-xs text-muted-foreground text-center">
                    Your details are sent to HIC through Formspree so we can
                    respond to your enquiry.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
