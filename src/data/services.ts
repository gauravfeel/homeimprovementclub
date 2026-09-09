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
    label: "Kitchens & cabinetry",
    searchTitle: "Kitchen renovations",
    hero: "Made for gathering.",
    short:
      "A better flow. A place for everything. A kitchen that brings people together.",
    intro:
      "From the first coffee to a full house, your kitchen should work around you. Explore cabinetry, surfaces, lighting and layouts with Home Improvement Club.",
    scopeTitle: "Good kitchens start with how you live.",
    sub: [
      "Kitchen layout & circulation",
      "Cabinetry & practical storage",
      "Countertops & island surfaces",
      "Backsplash & floor finishes",
      "Task & under-cabinet lighting",
      "Appliance placement & connections",
    ],
    benefits: [
      {
        t: "Room to move",
        d: "Think about the route between the sink, cooking area and fridge, and where people gather.",
      },
      {
        t: "Storage with purpose",
        d: "Plan space for the things you use every day, from small appliances to recycling.",
      },
      {
        t: "Materials in balance",
        d: "Consider maintenance, texture and durability alongside colour and finish.",
      },
    ],
    question: "Can I renovate without changing my kitchen layout?",
    answer:
      "Yes, a renovation can focus on cabinetry, surfaces and finishes. Share what works in your current kitchen and what does not, so the consultation can explore the right scope.",
  },
  {
    slug: "bathrooms",
    icon: Bath,
    image: bathImg,
    title: "Full Bathroom Renovations",
    label: "Bathrooms",
    searchTitle: "Bathroom renovations",
    hero: "A calmer start. A better finish.",
    short:
      "Thoughtful bathrooms, from the surfaces you see to the details behind them.",
    intro:
      "Make room for a better daily routine. Talk to Home Improvement Club about a full bathroom renovation, from shower and vanity layout to tile, lighting and ventilation.",
    scopeTitle: "There is more to a bathroom than its finishes.",
    sub: [
      "Shower, bath & vanity layout",
      "Tile & surface selections",
      "Waterproofing requirements",
      "Plumbing & fixture placement",
      "Bathroom lighting & mirrors",
      "Ventilation & storage",
    ],
    benefits: [
      {
        t: "A useful layout",
        d: "Consider door swings, shower access and the space you need around the vanity.",
      },
      {
        t: "Behind the tile",
        d: "Discuss waterproofing, drainage and ventilation as part of the scope, before choosing finishes.",
      },
      {
        t: "Everyday comfort",
        d: "Balance practical storage, easy-to-clean surfaces and light where you need it.",
      },
    ],
    question: "Can we replace a bathtub with a walk-in shower?",
    answer:
      "A tub-to-shower conversion is a scope to discuss during your consultation. The available space, drainage, waterproofing and household needs should inform the plan.",
  },
  {
    slug: "lighting",
    icon: Lightbulb,
    image: lightImg,
    title: "Interior & Exterior Lighting Upgrades",
    label: "Lighting",
    searchTitle: "Lighting upgrades",
    hero: "See your home in a new light.",
    short: "Layered light for working, unwinding and welcoming people home.",
    intro:
      "Bring ambient, task and accent lighting into one considered plan, inside your home and out.",
    scopeTitle: "The right light, in the right place.",
    sub: [
      "Ambient & recessed lighting",
      "Kitchen task lighting",
      "Pendants & feature fixtures",
      "Architectural accent lighting",
      "Exterior & pathway lighting",
      "Dimmers & lighting controls",
    ],
    benefits: [
      {
        t: "Layers of light",
        d: "Combine general light with focused task lighting and softer accents.",
      },
      {
        t: "Evening atmosphere",
        d: "Consider colour temperature and dimming alongside fixture placement.",
      },
      {
        t: "Outdoor arrivals",
        d: "Review entrances, pathways and outdoor living areas together.",
      },
    ],
    question: "Can lighting be part of a kitchen or bathroom renovation?",
    answer:
      "Yes. Include your lighting goals in the same enquiry so fixture locations and electrical requirements can be discussed alongside the room layout.",
  },
  {
    slug: "flooring",
    icon: Layers,
    image: floorImg,
    title: "Tile & Flooring Replacement",
    label: "Tile & flooring",
    searchTitle: "Tile & flooring replacement",
    hero: "A considered foundation.",
    short: "Texture, proportion and materials that connect your rooms.",
    intro:
      "Explore flooring and tile replacement with a focus on how your home feels, how its rooms connect and how each surface will be used.",
    scopeTitle: "Start with the surface. Consider what is underneath.",
    sub: [
      "Flooring & tile selections",
      "Existing floor removal",
      "Subfloor condition review",
      "Room-to-room transitions",
      "Tile patterns & grout selection",
      "Stair & entryway finishes",
    ],
    benefits: [
      {
        t: "A connected home",
        d: "Plan transitions and floor heights across adjoining spaces.",
      },
      {
        t: "Suit your routine",
        d: "Consider moisture, foot traffic and cleaning needs before selecting materials.",
      },
      {
        t: "A sound starting point",
        d: "Discuss the existing subfloor and preparation needed for the chosen finish.",
      },
    ],
    question: "Should flooring be planned before cabinetry?",
    answer:
      "Discuss both together. Material choice, floor height and installation sequence can affect cabinet and appliance placement.",
  },
  {
    slug: "hvac-electrical",
    icon: Wind,
    image: hvacImg,
    title: "HVAC & Electrical Upgrades",
    label: "HVAC & electrical",
    searchTitle: "HVAC & electrical upgrades",
    hero: "Comfort, behind the scenes.",
    short: "Plan heating, cooling and electrical needs around your renovation.",
    intro:
      "A renovation is an opportunity to look beyond finishes. Discuss your heating, cooling and electrical needs as part of the wider plan for your home.",
    scopeTitle: "Make space for the systems your home needs.",
    sub: [
      "Heating & cooling requirements",
      "Heat pump options",
      "Electrical capacity review",
      "Panel upgrade considerations",
      "Fixture & outlet placement",
      "Controls & equipment locations",
    ],
    benefits: [
      {
        t: "Whole-room thinking",
        d: "Consider comfort and equipment placement alongside the new layout.",
      },
      {
        t: "Electrical demand",
        d: "Discuss the needs of new appliances and fixtures before finalising selections.",
      },
      {
        t: "Plan the sequence",
        d: "Identify work that needs to happen before walls and finishes are completed.",
      },
    ],
    question: "Where can I check available rebates?",
    answer:
      "Our BC rebates page links to official program sources. Confirm current requirements and any pre-approval directly with the program before committing to equipment.",
  },
  {
    slug: "exterior",
    icon: Home,
    image: extImg,
    title: "Exterior Renovations",
    label: "Exteriors",
    searchTitle: "Exterior renovations",
    hero: "A welcome that starts outside.",
    short: "Bring entrances, exterior finishes and outdoor spaces together.",
    intro:
      "Refresh the way your home meets the street and the outdoors. Explore exterior renovation options that fit the building, its setting and the way you use it.",
    scopeTitle: "Consider the whole exterior.",
    sub: [
      "Exterior paint & finishes",
      "Siding & cladding options",
      "Entrance & facade details",
      "Soffit, fascia & gutters",
      "Window & door considerations",
      "Deck, patio & railing upgrades",
    ],
    benefits: [
      {
        t: "A coherent exterior",
        d: "Look at colour, cladding and entrance details as one composition.",
      },
      {
        t: "Local conditions",
        d: "Discuss exposure, drainage and the condition of existing surfaces.",
      },
      {
        t: "Outdoor living",
        d: "Consider how doors, steps and outdoor spaces connect to daily life.",
      },
    ],
    question: "Can exterior work be completed in stages?",
    answer:
      "Discuss your priorities and budget during consultation. The condition of the building and the relationship between different elements will help determine a sensible sequence.",
  },
] as const;
export type Service = (typeof SERVICES)[number];
