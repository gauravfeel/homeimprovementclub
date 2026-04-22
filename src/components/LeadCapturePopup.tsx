import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import logo from "@/assets/hic-logo.png";

// Sign up at formspree.io, create a form, and replace YOUR_FORM_ID below
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
    if (localStorage.getItem(STORAGE_KEY)) return;
    const timer = setTimeout(() => setOpen(true), 30000);
    return () => clearTimeout(timer);
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
      const res = await fetch(`https://formspree.io/f/mgorpzpy`, {
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
            <h2 className="text-xl font-display font-semibold">Thank you!</h2>
            <p className="text-muted-foreground text-sm">We'll be in touch within 24 hours with your personalized renovation plan.</p>
            <Button variant="hero" onClick={() => setOpen(false)} className="w-full">Close</Button>
          </div>
        ) : (
          <>
            <DialogHeader className="text-center items-center">
              <img src={logo} alt="Home Improvement Club" className="h-9 w-auto mb-2" />
              <DialogTitle className="text-xl font-display">Get Your Free Renovation Plan</DialogTitle>
              <DialogDescription className="text-sm">
                Tell us your vision — we'll design a personalized upgrade plan at no cost.
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-4 mt-2">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-medium mb-1 block">First Name *</label>
                  <Input
                    value={form.firstName}
                    onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                    placeholder="John"
                    maxLength={100}
                  />
                </div>
                <div>
                  <label className="text-xs font-medium mb-1 block">Last Name</label>
                  <Input
                    value={form.lastName}
                    onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                    placeholder="Smith"
                    maxLength={100}
                  />
                </div>
              </div>
              <div>
                <label className="text-xs font-medium mb-1 block">Phone</label>
                <Input
                  type="tel"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  placeholder="(555) 123-4567"
                  maxLength={20}
                />
              </div>
              <div>
                <label className="text-xs font-medium mb-1 block">Email *</label>
                <Input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="john@example.com"
                  maxLength={255}
                />
              </div>
              <div>
                <label className="text-xs font-medium mb-1 block">Ideal Style of Renovation</label>
                <select
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
                <label className="text-xs font-medium mb-1 block">Budget</label>
                <select
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
                {submitting ? "Sending…" : "Get My Free Plan"}
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
