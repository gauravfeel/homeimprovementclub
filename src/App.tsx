import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import PageLoader from "@/components/PageLoader";
import { ENABLE_CONTRACTOR_MEMBERSHIP } from "@/lib/features";
import RouteScroll from "@/components/RouteScroll";
import Index from "./pages/Index";
import Blog from "./pages/Blog";

const HowItWorks = lazy(() => import("./pages/HowItWorks"));
const Services = lazy(() => import("./pages/Services"));
const AreasWeServe = lazy(() => import("./pages/AreasWeServe"));
const About = lazy(() => import("./pages/About"));
const Contractors = lazy(() => import("./pages/Contractors"));
const Contact = lazy(() => import("./pages/Contact"));
const Testimonials = lazy(() => import("./pages/Testimonials"));
const Rebates = lazy(() => import("./pages/Rebates"));
const InvestmentPartnerships = lazy(() => import("./pages/InvestmentPartnerships"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const BuildEstimator = lazy(() => import("./pages/BuildEstimator"));
const BlogPost = lazy(() => import("./pages/BlogPost"));
const BlogAdmin = lazy(() => import("./pages/admin/BlogAdmin"));
const Gallery = lazy(() => import("./pages/Gallery"));
const GalleryProject = lazy(() => import("./pages/GalleryProject"));
const ServiceDetail = lazy(() => import("./pages/ServiceDetail"));
const NotFound = lazy(() => import("./pages/NotFound"));

const App = () => (
  <TooltipProvider>
    <Toaster />
    <Sonner />
    <BrowserRouter>
      <RouteScroll />
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/services" element={<Services />} />
          <Route path="/areas-we-serve" element={<AreasWeServe />} />
          <Route path="/services/:slug" element={<ServiceDetail />} />
          <Route path="/about" element={<About />} />
          <Route
            path="/contractors"
            element={ENABLE_CONTRACTOR_MEMBERSHIP ? <Contractors /> : <NotFound />}
          />
          <Route path="/contact" element={<Contact />} />
          <Route path="/testimonials" element={<Testimonials />} />
          <Route path="/rebates" element={<Rebates />} />
          <Route path="/investment-partnerships" element={<InvestmentPartnerships />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/estimator" element={<BuildEstimator />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/gallery/:slug" element={<GalleryProject />} />
          <Route path="/admin/blog/*" element={<BlogAdmin />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  </TooltipProvider>
);

export default App;
