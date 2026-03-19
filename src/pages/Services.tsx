import { motion } from "framer-motion";
import Layout from "@/components/Layout";
import CTASection from "@/components/CTASection";
import heroImg from "@/assets/hero-home.jpg";
import kitchenImg from "@/assets/kitchen-upgrade.jpg";
import outdoorImg from "@/assets/outdoor-living.jpg";
import solarImg from "@/assets/solar-home.jpg";

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.7 },
};

const services = [
  {
    category: "Comfort & Efficiency",
    img: heroImg,
    items: ["HVAC Installation & Repair", "Insulation Upgrades", "Window Replacement", "Energy Audits"],
    desc: "Create a home that's perfectly comfortable year-round — while cutting your energy bills.",
  },
  {
    category: "Aesthetic Upgrades",
    img: kitchenImg,
    items: ["Interior Lighting Design", "Kitchen & Bath Remodeling", "Flooring & Finishes", "Custom Cabinetry"],
    desc: "Transform how your home looks and feels with design-forward upgrades that elevate daily living.",
  },
  {
    category: "Outdoor Living",
    img: outdoorImg,
    items: ["Deck & Patio Construction", "Landscaping Design", "Outdoor Kitchens", "Fencing & Privacy"],
    desc: "Extend your living space outdoors. Create the perfect setting for relaxation and entertaining.",
  },
  {
    category: "Future-Proofing",
    img: solarImg,
    items: ["Solar Panel Installation", "Smart Home Integration", "EV Charger Setup", "Battery Storage"],
    desc: "Invest in your home's future with sustainable technology that adds value and saves money.",
  },
];

const Services = () => (
  <Layout>
    <section className="section-padding-lg">
      <div className="max-w-4xl mx-auto text-center mb-20">
        <motion.div {...fadeUp}>
          <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-4">Our Services</p>
          <h1 className="heading-xl mb-6">Every Upgrade, One Club</h1>
          <p className="body-lg max-w-2xl mx-auto">
            Whether you're improving comfort, style, or sustainability — we have the right professionals for every project.
          </p>
        </motion.div>
      </div>
    </section>

    {services.map((s, i) => (
      <section key={s.category} className={`section-padding-lg ${i % 2 === 0 ? "bg-card" : ""}`}>
        <div className="max-w-7xl mx-auto">
          <motion.div {...fadeUp} className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center ${i % 2 !== 0 ? "lg:flex-row-reverse" : ""}`}>
            <div className={i % 2 !== 0 ? "lg:order-2" : ""}>
              <div className="rounded-xl overflow-hidden aspect-[4/3]">
                <img src={s.img} alt={s.category} className="w-full h-full object-cover" />
              </div>
            </div>
            <div className={i % 2 !== 0 ? "lg:order-1" : ""}>
              <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-3">Services</p>
              <h2 className="heading-lg mb-4">{s.category}</h2>
              <p className="body-lg mb-8">{s.desc}</p>
              <ul className="space-y-3">
                {s.items.map((item) => (
                  <li key={item} className="flex items-center gap-3 text-foreground">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </section>
    ))}

    <CTASection />
  </Layout>
);

export default Services;
