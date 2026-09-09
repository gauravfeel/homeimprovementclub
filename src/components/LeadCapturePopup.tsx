import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import logo from "@/assets/hic-logo-small.png";
import { trackEvent } from "@/lib/analytics";

const FORMSPREE_ID = "mgorpzpy";

const STORAGE_KEY = "hic_lead_popup_dismissed";

const renovationStyles = [
  "Modern / Minimalist",
  "Traditional / Classic",
  "Farmhouse / Rustic",
  "Contemporary",
  "Industrial",
  "Transitional",
  "Other",
];

const budgetRanges = [
  "Under $10,000",
  "$10,000 – $25,000",
  "$25,000 – $50,000",
  "$50,000 – $100,000",
  "$100,000+",
];

const LeadCapturePopup = () => {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    renovationStyle: "",
    budget: "",
  });

  useEffect(() => {
    const show = () => setOpen(true);
    window.addEventListener("hic:open-enquiry", show);
    return () => window.removeEventListener("hic:open-enquiry", show);
  }, []);

  const handleDismiss = () => {
    localStorage.setItem(STORAGE_KEY, "1");
    setOpen(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.firstName.trim() || !form.email.trim()) {
      toast({ title: "Please enter your first name and email", variant: "destructive" });
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          _subject: "New Lead — Home Improvement Club Pop-up",
          "first name": form.firstName,
          "last name": form.lastName,
          phone: form.phone,
          email: form.email,
          "renovation style": form.renovationStyle,
          budget: form.budget,
        }),
      });
      if (res.ok) {
        trackEvent({
          event: "generate_lead",
          lead_type: "consultation_form",
          form_location: "lead_popup",
        });
        setSubmitted(true);
        localStorage.setItem(STORAGE_KEY, "1");
      } else {
        throw new Error();
      }
    } catch {
      toast({ title: "Something went wrong", description: "Please try again or email homeimprovementclub.co@gmail.com", variant: "destructive" });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={(v) => { if (!v) handleDismiss(); }}>
      <DialogContent className="max-w-md w-full max-h-[90vh] overflow-y-auto">
        {submitted ? (
          <div className="text-center py-6 space-y-4">
            <img src={logo} alt="Home Improvement Club" className="h-10 w-auto mx-auto" />
            <h2 className="text-xl font-display font-semibold">Your enquiry is on its way.</h2>
            <p className="text-muted-foreground text-sm" role="status">We’ll be in touch to discuss your renovation.</p>
            <Button variant="hero" onClick={() => setOpen(false)} className="w-full">Close</Button>
          </div>
        ) : (
          <>
            <DialogHeader className="text-center items-center">
              <img src={logo} alt="Home Improvement Club" className="h-9 w-auto mb-2" />
              <DialogTitle className="text-xl font-display">A quick introduction</DialogTitle>
              <DialogDescription className="text-sm">
                Tell us a little about yourself to start a free renovation consultation.
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-4 mt-2">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label htmlFor="popup-first-name" className="text-xs font-medium mb-1 block">First Name *</label>
                  <Input
                    id="popup-first-name" required autoComplete="given-name"
                    value={form.firstName}
                    onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                    placeholder="John"
                    maxLength={100}
                  />
                </div>
                <div>
                  <label htmlFor="popup-last-name" className="text-xs font-medium mb-1 block">Last Name</label>
                  <Input
                    id="popup-last-name" autoComplete="family-name"
                    value={form.lastName}
                    onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                    placeholder="Smith"
                    maxLength={100}
                  />
                </div>
              </div>
              <div>
                <label htmlFor="popup-phone" className="text-xs font-medium mb-1 block">Phone</label>
                <Input
                  id="popup-phone" autoComplete="tel"
                  type="tel"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  placeholder="(555) 123-4567"
                  maxLength={20}
                />
              </div>
              <div>
                <label htmlFor="popup-email" className="text-xs font-medium mb-1 block">Email *</label>
                <Input
                  id="popup-email" required autoComplete="email"
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="john@example.com"
                  maxLength={255}
                />
              </div>
              <div>
                <label htmlFor="popup-style" className="text-xs font-medium mb-1 block">Ideal Style of Renovation</label>
                <select
                  id="popup-style"
                  value={form.renovationStyle}
                  onChange={(e) => setForm({ ...form, renovationStyle: e.target.value })}
                  className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  <option value="">Select a style</option>
                  {renovationStyles.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="popup-budget" className="text-xs font-medium mb-1 block">Budget</label>
                <select
                  id="popup-budget"
                  value={form.budget}
                  onChange={(e) => setForm({ ...form, budget: e.target.value })}
                  className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  <option value="">Select a budget range</option>
                  {budgetRanges.map((b) => (
                    <option key={b} value={b}>{b}</option>
                  ))}
                </select>
              </div>
              <Button variant="hero" size="lg" type="submit" className="w-full" disabled={submitting}>
                {submitting ? "Sending…" : "Request my consultation"}
              </Button>
              <button
                type="button"
                onClick={handleDismiss}
                className="w-full text-xs text-muted-foreground hover:text-foreground transition-colors text-center"
              >
                No thanks
              </button>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default LeadCapturePopup;
