import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import Layout from "@/components/Layout";

const projectTypes = [
  "HVAC & Comfort",
  "Kitchen & Bath",
  "Outdoor Living",
  "Solar & Energy",
  "Smart Home",
  "General Renovation",
  "Other",
];

const Contact = () => {
  const { toast } = useToast();
  const [form, setForm] = useState({ name: "", email: "", phone: "", project: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim()) {
      toast({ title: "Please fill in required fields", variant: "destructive" });
      return;
    }
    toast({ title: "Thank you!", description: "We'll be in touch within 24 hours with your personalized plan." });
    setForm({ name: "", email: "", phone: "", project: "", message: "" });
  };

  return (
    <Layout>
      <section className="section-padding-lg">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-4">Get Started</p>
            <h1 className="heading-xl mb-6">Get Your Free Home Upgrade Plan</h1>
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
            <form onSubmit={handleSubmit} className="bg-card rounded-2xl p-8 border border-border space-y-5">
              <div>
                <label className="text-sm font-medium mb-1.5 block">Full Name *</label>
                <Input
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="John Smith"
                  maxLength={100}
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-1.5 block">Email *</label>
                <Input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="john@example.com"
                  maxLength={255}
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-1.5 block">Phone</label>
                <Input
                  type="tel"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  placeholder="(555) 123-4567"
                  maxLength={20}
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-1.5 block">Project Type</label>
                <select
                  value={form.project}
                  onChange={(e) => setForm({ ...form, project: e.target.value })}
                  className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  <option value="">Select a project type</option>
                  {projectTypes.map((p) => (
                    <option key={p} value={p}>{p}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-sm font-medium mb-1.5 block">Tell Us More</label>
                <Textarea
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="Describe your project vision..."
                  rows={4}
                  maxLength={1000}
                />
              </div>
              <Button variant="hero" size="xl" type="submit" className="w-full">
                Get My Free Plan
              </Button>
              <p className="text-xs text-muted-foreground text-center">We respect your privacy. No spam, ever.</p>
            </form>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
