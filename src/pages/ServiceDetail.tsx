import { useParams, Navigate } from "react-router-dom";
import Layout from "@/components/Layout";
import SEO from "@/components/SEO";
import { SERVICES } from "@/data/services";
import { SERVICE_CITIES } from "@/lib/service-area";
import KitchenPage from "./service-pages/KitchenPage";
import BathroomPage from "./service-pages/BathroomPage";
import LightingPage from "./service-pages/LightingPage";
import FlooringPage from "./service-pages/FlooringPage";
import SystemsPage from "./service-pages/SystemsPage";
import ExteriorPage from "./service-pages/ExteriorPage";
const pages = {
  "kitchen-cabinets": KitchenPage,
  bathrooms: BathroomPage,
  lighting: LightingPage,
  flooring: FlooringPage,
  "hvac-electrical": SystemsPage,
  exterior: ExteriorPage,
};
export default function ServiceDetail() {
  const { slug } = useParams();
  const service = SERVICES.find((s) => s.slug === slug);
  if (!service) return <Navigate to="/services" replace />;
  const Page = pages[service.slug];
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.short,
    url: `https://homeimprovementclub.co/services/${service.slug}`,
    provider: {
      "@type": "HomeAndConstructionBusiness",
      name: "Home Improvement Club",
      url: "https://homeimprovementclub.co/",
    },
    areaServed: SERVICE_CITIES.map((name) => ({ "@type": "City", name })),
  };
  return (
    <Layout>
      <SEO
        title={`${service.searchTitle} in Vancouver | Home Improvement Club`}
        description={`${service.title} across Greater Vancouver. ${service.short} Book a free consultation with HIC.`}
        canonical={`/services/${service.slug}`}
        schema={schema}
      />
      <Page service={service} />
    </Layout>
  );
}
