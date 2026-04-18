import { Link } from "react-router-dom";
import { ArrowRight, type LucideIcon } from "lucide-react";
import { motion } from "framer-motion";

interface ServiceCardProps {
  icon: LucideIcon;
  title: string;
  desc: string;
  href: string;
  image: string;
  delay?: number;
}

const ServiceCard = ({ icon: Icon, title, desc, href, image, delay = 0 }: ServiceCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay }}
  >
    <Link
      to={href}
      className="group block bg-card border border-border rounded-2xl overflow-hidden hover:shadow-xl hover:border-primary/30 transition-all duration-500"
    >
      <div className="aspect-[4/3] overflow-hidden">
        <img
          src={image}
          alt={title}
          loading="lazy"
          width={1600}
          height={1200}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </div>
      <div className="p-7">
        <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
          <Icon size={20} className="text-primary" />
        </div>
        <h3 className="font-display text-xl font-semibold mb-2.5">{title}</h3>
        <p className="text-muted-foreground text-sm leading-relaxed mb-5">{desc}</p>
        <span className="inline-flex items-center gap-1.5 text-sm font-medium text-primary group-hover:gap-2.5 transition-all">
          Explore service <ArrowRight size={14} />
        </span>
      </div>
    </Link>
  </motion.div>
);

export default ServiceCard;
