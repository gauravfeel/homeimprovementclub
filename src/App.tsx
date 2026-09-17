import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import PageLoader from "@/components/PageLoader";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { ENABLE_CONTRACTOR_MEMBERSHIP } from "@/lib/features";
import RouteScroll from "@/components/RouteScroll";
import Index from "./pages/Index";
import Blog from "./pages/Blog";
import { Home as V2Home, Services as V2Services, Gallery as V2Gallery, StaticPage as V2StaticPage, Estimator as V2Estimator, Blog as V2Blog, Contact as V2Contact, NotFound as V2NotFound, V2Noindex } from "./v2/V2Pages";

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

function SiteChrome() {
  const { pathname } = useLocation();
  if (pathname.startsWith("/admin") || pathname.startsWith("/v2")) return null;
  return <WhatsAppButton variant="floating" />;
}

const App = () => (
  <TooltipProvider>
    <Toaster />
    <Sonner />
    <BrowserRouter>
      <RouteScroll />
      <SiteChrome />
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
          <Route path="/v2" element={<V2Home />} />
          <Route path="/v2/how-it-works" element={<V2StaticPage type="how-it-works" />} />
          <Route path="/v2/services" element={<V2Services />} />
          <Route path="/v2/services/:slug" element={<V2Services detail />} />
          <Route path="/v2/areas-we-serve" element={<V2StaticPage type="areas-we-serve" />} />
          <Route path="/v2/about" element={<V2StaticPage type="about" />} />
          <Route path="/v2/contact" element={<V2Contact />} />
          <Route path="/v2/testimonials" element={<V2StaticPage type="testimonials" />} />
          <Route path="/v2/rebates" element={<V2StaticPage type="rebates" />} />
          <Route path="/v2/investment-partnerships" element={<V2StaticPage type="investment-partnerships" />} />
          <Route path="/v2/privacy" element={<V2StaticPage type="privacy" />} />
          <Route path="/v2/estimator" element={<V2Estimator />} />
          <Route path="/v2/blog" element={<V2Blog />} />
          <Route path="/v2/blog/:slug" element={<V2Blog detail />} />
          <Route path="/v2/gallery" element={<V2Gallery />} />
          <Route path="/v2/gallery/:slug" element={<V2Gallery detail />} />
          <Route path="/v2/admin/blog/*" element={<V2Noindex><BlogAdmin /></V2Noindex>} />
          <Route path="/v2/*" element={<V2NotFound />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  </TooltipProvider>
);

export default App;
