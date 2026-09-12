import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import Layout from "@/components/Layout";
import SEO from "@/components/SEO";
import {
  SERVICE_AREA,
  SERVICE_AREA_BC,
  SERVICE_CITIES,
} from "@/lib/service-area";
import { trackEvent, trackGoogleAdsLead } from "@/lib/analytics";
import { submitLead } from "@/lib/submit-lead";
import {
  BEST_CONTACT_TIMES,
  contactLeadSchema,
  type ContactLeadValues,
} from "@/lib/lead-schema";
import { useSearchParams } from "react-router-dom";
import { SERVICES } from "@/data/services";
import { ContactInfo } from "@/components/ContactInfo";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const projectTypes = [
  ...SERVICES.map((service) => service.title),
  "More than one room",
  "Other",
];

const Contact = () => {
  const [searchParams] = useSearchParams();
  const selectedService = SERVICES.find(
    (service) => service.slug === searchParams.get("service"),
  );
  const selectedCity =
    SERVICE_CITIES.find((city) => city === searchParams.get("city")) || "";
  const { toast } = useToast();
  const [succeeded, setSucceeded] = useState(false);
  const form = useForm<ContactLeadValues>({
    resolver: zodResolver(contactLeadSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      propertyAddress: "",
      city: selectedCity,
      bestContactTime: "" as ContactLeadValues["bestContactTime"] | "",
      projectType: selectedService?.title || "",
      budget: undefined,
      message: "",
      company: "",
    },
  });

  const onSubmit = async (values: ContactLeadValues) => {
    try {
      await submitLead({
        source: "contact_page",
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        phone: values.phone,
        propertyAddress: values.propertyAddress,
        city: values.city,
        bestContactTime: values.bestContactTime,
        projectType: values.projectType,
        budget: String(values.budget),
        message: values.message,
        company: values.company,
      });
      trackEvent({
        event: "generate_lead",
        lead_type: "consultation_form",
        form_location: "contact_page",
      });
      trackGoogleAdsLead();
      setSucceeded(true);
      form.reset();
    } catch {
      toast({
        title: "Something went wrong",
        description: "Please email us at homeimprovementclub.co@gmail.com",
        variant: "destructive",
      });
    }
  };

  return (
    <Layout>
      <SEO
        title={`Book a Free Consultation | Home Improvement Club — ${SERVICE_AREA_BC}`}
        description={`Discuss a custom home, multiplex or renovation project with Home Improvement Club in ${SERVICE_AREA}.`}
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
                    : selectedService?.slug === "custom-homes-multiplex"
                      ? "your build."
                      : "your home."}
              </em>
            </h1>
            <p className="text-muted-foreground text-sm mb-6">
              Project consultation · {SERVICE_AREA}
            </p>
            <p className="body-lg mb-8">
              Tell us about the property and whether you are planning a custom
              home, multiplex or renovation. We’ll start with scope and next steps.
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
              {succeeded ? (
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
                    onClick={() => setSucceeded(false)}
                  >
                    Send another message
                  </Button>
                </div>
              ) : (
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-5 relative"
                    noValidate
                  >
                    <div className="absolute -left-[9999px]" aria-hidden="true">
                      <FormField
                        control={form.control}
                        name="company"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Company</FormLabel>
                            <FormControl>
                              <input {...field} tabIndex={-1} autoComplete="off" />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="firstName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>First Name *</FormLabel>
                            <FormControl>
                              <Input
                                autoComplete="given-name"
                                placeholder="John"
                                maxLength={100}
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="lastName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Last Name</FormLabel>
                            <FormControl>
                              <Input
                                autoComplete="family-name"
                                placeholder="Last name"
                                maxLength={100}
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email *</FormLabel>
                          <FormControl>
                            <Input
                              autoComplete="email"
                              type="email"
                              placeholder="john@example.com"
                              maxLength={255}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone *</FormLabel>
                          <FormControl>
                            <Input
                              autoComplete="tel"
                              type="tel"
                              placeholder="(555) 123-4567"
                              maxLength={20}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="propertyAddress"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Property Address *</FormLabel>
                          <FormControl>
                            <Input
                              autoComplete="street-address"
                              placeholder="123 Main Street"
                              maxLength={200}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="city"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>City or neighbourhood</FormLabel>
                          <FormControl>
                            <Input
                              autoComplete="address-level2"
                              placeholder="Where is your home?"
                              maxLength={100}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="bestContactTime"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Best time to contact you *</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            value={field.value || undefined}
                          >
                            <FormControl>
                              <SelectTrigger aria-label="Best time to contact you">
                                <SelectValue placeholder="Select a time" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {BEST_CONTACT_TIMES.map((time) => (
                                <SelectItem key={time} value={time}>
                                  {time}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="projectType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>What are you planning?</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            value={field.value || undefined}
                          >
                            <FormControl>
                              <SelectTrigger aria-label="What are you planning?">
                                <SelectValue placeholder="Select a project type" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {projectTypes.map((p) => (
                                <SelectItem key={p} value={p}>
                                  {p}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="budget"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Estimated project budget *</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              inputMode="numeric"
                              min={10001}
                              step={1}
                              placeholder="Enter amount in CAD (greater than $10,000)"
                              name={field.name}
                              onBlur={field.onBlur}
                              ref={field.ref}
                              value={field.value ?? ""}
                              onChange={(event) =>
                                field.onChange(
                                  event.target.value === ""
                                    ? undefined
                                    : event.target.valueAsNumber,
                                )
                              }
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Tell Us More</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Describe your project vision..."
                              rows={4}
                              maxLength={1000}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button
                      variant="hero"
                      size="xl"
                      type="submit"
                      className="w-full"
                      disabled={form.formState.isSubmitting}
                    >
                      {form.formState.isSubmitting
                        ? "Sending…"
                        : "Request my free consultation"}
                    </Button>
                  </form>
                </Form>
              )}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
