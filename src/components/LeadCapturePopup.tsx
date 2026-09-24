import { useEffect, useId, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { trackEvent, trackGoogleAdsLead } from "@/lib/analytics";
import { submitLead } from "@/lib/submit-lead";
import { popupLeadSchema, type PopupLeadValues } from "@/lib/lead-schema";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const projectTypes = [
  "Custom Home",
  "Multiplex",
  "Whole-home Renovation",
  "Kitchen Renovation",
  "Bathroom Renovation",
  "Other",
];

const budgetRanges = [
  "$10,000 – $25,000",
  "$25,000 – $50,000",
  "$50,000 – $100,000",
  "$100,000+",
];

const popupDefaults: PopupLeadValues = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  projectType: "",
  budget: "",
  company: "",
};

const LeadCapturePopup = () => {
  const { toast } = useToast();
  const panelId = useId();
  const [open, setOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const form = useForm<PopupLeadValues>({
    resolver: zodResolver(popupLeadSchema),
    defaultValues: popupDefaults,
  });

  useEffect(() => {
    const showManual = () => {
      setSubmitted(false);
      setOpen(true);
    };
    window.addEventListener("hic:open-enquiry", showManual);
    return () => window.removeEventListener("hic:open-enquiry", showManual);
  }, []);

  useEffect(() => {
    if (!open) return;
    const y = window.scrollY;
    const html = document.documentElement;
    html.classList.add("enquiry-open");
    document.body.classList.add("enquiry-open");
    document.body.style.top = `-${y}px`;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      html.classList.remove("enquiry-open");
      document.body.classList.remove("enquiry-open");
      document.body.style.top = "";
      window.scrollTo(0, y);
    };
  }, [open]);

  const onSubmit = async (values: PopupLeadValues) => {
    try {
      await submitLead({
        source: "lead_popup",
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        phone: values.phone,
        projectType: values.projectType,
        budget: values.budget,
        company: values.company,
      });
      trackEvent({
        event: "generate_lead",
        lead_type: "consultation_form",
        form_location: "lead_popup",
      });
      trackGoogleAdsLead();
      setSubmitted(true);
      form.reset(popupDefaults);
    } catch {
      toast({
        title: "Something went wrong",
        description:
          "Please try again or email homeimprovementclub.co@gmail.com",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="enquiry-dock">
      {open ? (
        <section
          id={panelId}
          className="enquiry-panel"
          aria-label="Quick enquiry"
        >
          <header className="enquiry-panel-head">
            <p>Quick enquiry</p>
            <h2>Tell us the project.</h2>
            <button
              type="button"
              className="enquiry-panel-close"
              aria-label="Close enquiry"
              onClick={() => setOpen(false)}
            >
              <X size={18} aria-hidden />
            </button>
          </header>

          {submitted ? (
            <div className="enquiry-panel-success" role="status">
              <p>Your enquiry is on its way.</p>
              <p>We’ll be in touch to discuss your project.</p>
              <Button variant="hero" onClick={() => setOpen(false)}>
                Close
              </Button>
            </div>
          ) : (
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="enquiry-panel-form"
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
                <div className="grid grid-cols-2 gap-3">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs">First Name *</FormLabel>
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
                        <FormLabel className="text-xs">Last Name</FormLabel>
                        <FormControl>
                          <Input
                            autoComplete="family-name"
                            placeholder="Smith"
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
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs">Phone</FormLabel>
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
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs">Email *</FormLabel>
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
                  name="projectType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs">
                        What are you planning?
                      </FormLabel>
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
                          {projectTypes.map((s) => (
                            <SelectItem key={s} value={s}>
                              {s}
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
                      <FormLabel className="text-xs">Budget</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value || undefined}
                      >
                        <FormControl>
                          <SelectTrigger aria-label="Budget">
                            <SelectValue placeholder="Select a budget range" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {budgetRanges.map((b) => (
                            <SelectItem key={b} value={b}>
                              {b}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  variant="hero"
                  size="lg"
                  type="submit"
                  className="w-full"
                  disabled={form.formState.isSubmitting}
                >
                  {form.formState.isSubmitting
                    ? "Sending…"
                    : "Request my consultation"}
                </Button>
              </form>
            </Form>
          )}
        </section>
      ) : null}

      {!open ? (
      <button
        type="button"
        className="enquiry-fab"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => {
          setSubmitted(false);
          setOpen(true);
        }}
      >
        <span className="enquiry-fab-label">Start a project</span>
      </button>
      ) : null}
    </div>
  );
};

export default LeadCapturePopup;
