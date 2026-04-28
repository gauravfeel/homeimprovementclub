import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import PageLoader from "@/components/PageLoader";
import { WhatsAppButton } from "@/components/WhatsAppButton";

const Index = lazy(() => import("./pages/Index"));
const HowItWorks = lazy(() => import("./pages/HowItWorks"));
const Services = lazy(() => import("./pages/Services"));
const About = lazy(() => import("./pages/About"));
const Contractors = lazy(() => import("./pages/Contractors"));
const Contact = lazy(() => import("./pages/Contact"));
const Testimonials = lazy(() => import("./pages/Testimonials"));
const Rebates = lazy(() => import("./pages/Rebates"));
const ServiceDetail = lazy(() => import("./pages/ServiceDetail"));
const NotFound = lazy(() => import("./pages/NotFound"));

const App = () => (
  <TooltipProvider>
    <Toaster />
    <Sonner />
    <BrowserRouter>
      <WhatsAppButton variant="floating" />
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/services" element={<Services />} />
          <Route path="/services/:slug" element={<ServiceDetail />} />
          <Route path="/about" element={<About />} />
          <Route path="/contractors" element={<Contractors />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/testimonials" element={<Testimonials />} />
          <Route path="/rebates" element={<Rebates />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  </TooltipProvider>
);

export default App;
