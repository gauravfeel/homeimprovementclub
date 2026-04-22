import { ChefHat, Bath, Lightbulb, Layers, Wind, Home } from "lucide-react";
import kitchenImg from "@/assets/lux-kitchen.jpg";
import bathImg from "@/assets/lux-bathroom.jpg";
import lightImg from "@/assets/lux-lighting.jpg";
import floorImg from "@/assets/lux-flooring.jpg";
import hvacImg from "@/assets/lux-hvac.jpg";
import extImg from "@/assets/lux-exterior.jpg";

export const SERVICES = [
  {
    slug: "kitchen-cabinets",
    icon: ChefHat,
    image: kitchenImg,
    title: "Kitchen & Cabinet Renovations",
    short: "Heirloom-quality kitchens designed around how you actually live, cook, and entertain.",
    hero: "The Kitchen, Reimagined.",
    intro:
      "Your kitchen is the most-used room in your home — and the single biggest driver of resale value. We design and build kitchens that feel timeless on day one and earn back the investment when it matters.",
    benefits: [
      { t: "Daily comfort", d: "Workflow, light, and storage tuned to how you actually move through the space." },
      { t: "Long-term value", d: "Premium kitchen renovations consistently return 70–80% at resale in Fraser Valley markets." },
      { t: "Effortless entertaining", d: "Open layouts, integrated appliances, and durable surfaces designed for real life." },
      { t: "Forever materials", d: "Quartz, natural stone, solid hardwood, soft-close hardware — built to outlast trends." },
    ],
    sub: [
      "Custom & semi-custom cabinetry",
      "Quartz, marble & natural stone counters",
      "Full layout reconfiguration",
      "Integrated premium appliance fit-out",
      "Statement islands & waterfall edges",
      "Designer backsplash & feature walls",
      "Under-cabinet & accent lighting",
      "Hardwood & large-format tile floors",
    ],
  },
  {
    slug: "bathrooms",
    icon: Bath,
    image: bathImg,
    title: "Full Bathroom Renovations",
    short: "Spa-grade bathrooms with hotel finishes — tile, stone, glass, and brass done properly.",
    hero: "Your Private Spa, Redefined.",
    intro:
      "A premium bathroom is the most personal renovation you'll ever do. We deliver hotel-quality results — large-format tile, frameless glass, freestanding tubs, heated floors — finished with the kind of detail you only see in custom homes.",
    benefits: [
      { t: "Daily luxury", d: "Heated floors, rain showers, and ambient lighting from the first morning." },
      { t: "Bulletproof waterproofing", d: "Schluter® systems and proper membranes — no leaks, no callbacks, ever." },
      { t: "Resale lift", d: "Primary bathrooms are second only to kitchens for BC home value." },
      { t: "Wellness", d: "Better ventilation, brighter natural light, and finishes that age beautifully." },
    ],
    sub: [
      "Full primary ensuite renovations",
      "Walk-in glass showers & wet rooms",
      "Freestanding stone & cast tubs",
      "Heated tile floors",
      "Floating vanities & custom millwork",
      "Designer porcelain & natural stone tile",
      "Brass, matte black & chrome fixture packages",
      "Smart mirrors, niches & ventilation upgrades",
    ],
  },
  {
    slug: "lighting",
    icon: Lightbulb,
    image: lightImg,
    title: "Interior & Exterior Lighting Upgrades",
    short: "Layered, architectural lighting — recessed, accent, statement, and landscape.",
    hero: "Light Is Architecture.",
    intro:
      "The single biggest difference between a builder-grade home and a high-end home is the lighting plan. We design and install layered lighting — ambient, task, accent, and feature — that completely transforms how your home feels day and night.",
    benefits: [
      { t: "Mood & atmosphere", d: "Dim, warm, scene-based lighting that turns evenings into something cinematic." },
      { t: "Curb appeal", d: "Exterior facade and landscape lighting that makes your home unmistakable at dusk." },
      { t: "Energy savings", d: "Modern LED systems use up to 80% less power than legacy fixtures." },
      { t: "Smart control", d: "App, voice, and scene control across the entire home." },
    ],
    sub: [
      "Recessed ceiling & cove lighting",
      "Statement pendants & chandeliers",
      "Linear LED & feature wall accents",
      "Under-cabinet & toe-kick lighting",
      "Landscape & pathway lighting",
      "Facade & soffit exterior lighting",
      "Smart-home dimmer & scene systems",
      "Outdoor entertaining & deck lighting",
    ],
  },
  {
    slug: "flooring",
    icon: Layers,
    image: floorImg,
    title: "Tile & Flooring Replacement",
    short: "Large-format porcelain, natural stone, and European hardwood — installed to gallery standard.",
    hero: "Floors That Anchor the Whole Home.",
    intro:
      "Flooring is the largest single visible surface in your home. Get it wrong and nothing else looks right. We specialize in premium tile and flooring — large-format porcelain, herringbone hardwood, natural stone — installed by craftsmen who treat grout lines like a finish detail.",
    benefits: [
      { t: "Visual impact", d: "Large-format tile and wide-plank hardwood instantly elevate any room." },
      { t: "Durability", d: "Premium tile and engineered hardwood outlast laminate by decades." },
      { t: "Comfort", d: "Optional in-floor heating turns tile into the most comfortable surface in the home." },
      { t: "Easy maintenance", d: "Sealed stone and porcelain — wipe clean, never refinish." },
    ],
    sub: [
      "Large-format porcelain & marble-look tile",
      "Natural stone (marble, travertine, slate)",
      "Herringbone & chevron hardwood",
      "European white oak wide plank",
      "In-floor radiant heating",
      "Heated bathroom & entryway tile",
      "Mosaic feature inlays",
      "Stair tread refinishing & re-tiling",
    ],
  },
  {
    slug: "hvac-electrical",
    icon: Wind,
    image: hvacImg,
    title: "HVAC & Electrical Upgrades",
    short: "Heat pumps, panel upgrades, and smart-home wiring done quietly and properly.",
    hero: "The Systems Behind a Premium Home.",
    intro:
      "The mechanical and electrical systems are what separate a comfortable home from a beautiful-but-frustrating one. We install modern heat pumps, upgraded electrical panels, EV charging, and the smart-home wiring that makes everything else work seamlessly.",
    benefits: [
      { t: "Year-round comfort", d: "Inverter heat pumps deliver consistent temperatures with whisper-quiet operation." },
      { t: "Lower energy bills", d: "Modern heat pumps are 3–4× more efficient than gas or baseboard heat." },
      { t: "Future-ready", d: "200A panels, EV chargers, and smart-home backbone for the next 25 years." },
      { t: "BC rebate eligible", d: "Many upgrades qualify for CleanBC, BC Hydro, and FortisBC incentives." },
    ],
    sub: [
      "Cold-climate heat pump installation",
      "Heat pump water heaters",
      "200A electrical panel upgrades",
      "EV charger installation (Level 2)",
      "Smart-home wiring & control systems",
      "Whole-home surge protection",
      "Premium fixture & switch upgrades",
      "Energy efficiency audits",
    ],
  },
  {
    slug: "exterior",
    icon: Home,
    image: extImg,
    title: "Exterior Renovations",
    short: "Paint, siding, stone cladding, and structural upgrades that transform curb appeal.",
    hero: "First Impression. Lasting Value.",
    intro:
      "The exterior is the first thing every guest, neighbour, and prospective buyer sees. We refresh and rebuild exteriors with premium paint, modern siding, stone cladding, and structural upgrades that increase property value and protect the home for decades.",
    benefits: [
      { t: "Instant curb appeal", d: "A premium exterior repaint or re-clad transforms the entire feel of the home." },
      { t: "Protection", d: "Modern siding and trim systems shed Pacific Northwest rain for 30+ years." },
      { t: "Energy efficiency", d: "Re-side projects often pair with insulation upgrades for major heating savings." },
      { t: "Property value", d: "Curb appeal directly drives appraisal and resale price in Fraser Valley markets." },
    ],
    sub: [
      "Premium exterior repaints",
      "Hardie® board & engineered wood siding",
      "Cedar accent panels",
      "Natural stone cladding & veneer",
      "Soffit, fascia & gutter replacement",
      "Window & exterior door replacement",
      "Deck, patio & railing upgrades",
      "Front entrance & facade redesign",
    ],
  },
] as const;

export type Service = (typeof SERVICES)[number];
