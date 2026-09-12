import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLocation } from "react-router-dom";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
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
import logo from "@/assets/hic-logo-small.png";
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

const STORAGE_KEY = "hic_lead_popup_dismissed";
const TIMER_KEY = "hic_lead_popup_timer_started";
const SHOWN_KEY = "hic_lead_popup_shown";
const AUTO_DELAY_MS = 8000;
const DISMISS_MS = 5 * 60 * 1000;

function clearLeadStorage() {
  localStorage.removeItem(STORAGE_KEY);
  sessionStorage.removeItem(SHOWN_KEY);
  sessionStorage.removeItem(TIMER_KEY);
}

function isLeadSuppressed() {
  const at = Number(localStorage.getItem(STORAGE_KEY));
  if (!at) return false;
  if (Date.now() - at >= DISMISS_MS) {
    clearLeadStorage();
    return false;
  }
  return true;
}

function markLeadDismissed() {
  localStorage.setItem(STORAGE_KEY, String(Date.now()));
}

function isRadixSelectLayer(target: EventTarget | null) {
  const el = target as HTMLElement | null;
  return Boolean(
    el?.closest?.(
      "[data-radix-select-content], [data-radix-select-viewport], [data-radix-popper-content-wrapper]",
    ),
  );
}

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
  const { pathname } = useLocation();
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const form = useForm<PopupLeadValues>({
    resolver: zodResolver(popupLeadSchema),
    defaultValues: popupDefaults,
  });
  const dismissArmed = useRef(false);

  useEffect(() => {
    document.body.classList.toggle("lead-dialog-open", open);
    if (!open) return;
    dismissArmed.current = false;
    const arm = window.setTimeout(() => {
      dismissArmed.current = true;
    }, 800);
    return () => {
      window.clearTimeout(arm);
      document.body.classList.remove("lead-dialog-open");
    };
  }, [open]);

  useEffect(() => {
    const showManual = () => setOpen(true);
    window.addEventListener("hic:open-enquiry", showManual);

    const tryShow = () => {
      if (isLeadSuppressed()) return;
      if (sessionStorage.getItem(SHOWN_KEY)) return;
      if (window.location.pathname === "/contact") return;
      if (document.documentElement.classList.contains("menu-open")) return;
      sessionStorage.setItem(SHOWN_KEY, "1");
      setOpen(true);
    };

    let timer = 0;
    let expiry = 0;
    const dismissedAt = Number(localStorage.getItem(STORAGE_KEY));
    if (dismissedAt && Date.now() - dismissedAt < DISMISS_MS) {
      expiry = window.setTimeout(() => {
        clearLeadStorage();
        tryShow();
      }, DISMISS_MS - (Date.now() - dismissedAt));
    } else if (!isLeadSuppressed() && !sessionStorage.getItem(SHOWN_KEY) && pathname !== "/contact") {
      if (!sessionStorage.getItem(TIMER_KEY)) {
        sessionStorage.setItem(TIMER_KEY, String(Date.now()));
      }
      const elapsed = Date.now() - Number(sessionStorage.getItem(TIMER_KEY));
      timer = window.setTimeout(tryShow, Math.max(0, AUTO_DELAY_MS - elapsed));
    }

    const onScroll = () => {
      if (window.scrollY > 840) tryShow();
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("hic:open-enquiry", showManual);
      window.removeEventListener("scroll", onScroll);
      if (timer) window.clearTimeout(timer);
      if (expiry) window.clearTimeout(expiry);
    };
  }, [pathname]);

  const handleDismiss = () => {
    markLeadDismissed();
    setOpen(false);
  };

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
      markLeadDismissed();
    } catch {
      toast({ title: "Something went wrong", description: "Please try again or email homeimprovementclub.co@gmail.com", variant: "destructive" });
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        if (next) {
          setOpen(true);
          return;
        }
        if (!dismissArmed.current && !submitted) {
          setOpen(true);
          return;
        }
        if (submitted) setOpen(false);
        else handleDismiss();
      }}
    >
      <DialogContent
        className="max-w-md w-full max-h-[90vh] overflow-y-auto"
        onPointerDownOutside={(event) => {
          if (!dismissArmed.current || isRadixSelectLayer(event.target)) {
            event.preventDefault();
          }
        }}
        onInteractOutside={(event) => {
          if (!dismissArmed.current || isRadixSelectLayer(event.target)) {
            event.preventDefault();
          }
        }}
      >
        {submitted ? (
          <div className="text-center py-6 space-y-4">
            <img src={logo} alt="Home Improvement Club" className="h-10 w-auto mx-auto" />
            <h2 className="text-xl font-display font-semibold">Your enquiry is on its way.</h2>
            <p className="text-muted-foreground text-sm" role="status">We’ll be in touch to discuss your project.</p>
            <Button variant="hero" onClick={() => setOpen(false)} className="w-full">Close</Button>
          </div>
        ) : (
          <>
            <DialogHeader className="text-center items-center">
              <img src={logo} alt="Home Improvement Club" className="h-9 w-auto mb-2" />
              <DialogTitle className="text-xl font-display">A quick introduction</DialogTitle>
              <DialogDescription className="text-sm">
                Tell us a little about yourself and the project you are considering.
              </DialogDescription>
            </DialogHeader>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-2 relative" noValidate>
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
                          <Input autoComplete="given-name" placeholder="John" maxLength={100} {...field} />
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
                          <Input autoComplete="family-name" placeholder="Smith" maxLength={100} {...field} />
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
                        <Input autoComplete="tel" type="tel" placeholder="(555) 123-4567" maxLength={20} {...field} />
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
                        <Input autoComplete="email" type="email" placeholder="john@example.com" maxLength={255} {...field} />
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
                      <FormLabel className="text-xs">What are you planning?</FormLabel>
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
                <Button variant="hero" size="lg" type="submit" className="w-full" disabled={form.formState.isSubmitting}>
                  {form.formState.isSubmitting ? "Sending…" : "Request my consultation"}
                </Button>
                <button
                  type="button"
                  onClick={handleDismiss}
                  className="w-full text-xs text-muted-foreground hover:text-foreground transition-colors text-center"
                >
                  No thanks
                </button>
              </form>
            </Form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default LeadCapturePopup;
