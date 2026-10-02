import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { GALLERY_PROJECTS } from "@/data/projects";
import { ImageCard } from "@/components/sections/image-card";
import { Button } from "@/components/ui/button";
import { editorialFrame } from "@/lib/editorial-frame";

export default function ProjectGallery() {
  const featured = GALLERY_PROJECTS.filter((project) => !project.comingSoon).slice(0, 2);
  if (!featured.length) return null;

  return (
    <section className={editorialFrame}>
      <p className="eyebrow">Portfolio</p>
      <h2>Homes, reconsidered.</h2>
      <div className="mt-8 grid grid-cols-1 gap-12 min-[641px]:grid-cols-2 max-sm:gap-[35px]">
        {featured.map((project) => (
          <ImageCard
            key={project.slug}
            href={`/gallery/${project.slug}`}
            image={project.image}
            imageAlt={project.imageAlt}
            kicker={project.category}
            title={project.title}
            description={project.teaser}
          />
        ))}
      </div>
      <Button variant="link" className="mt-9" asChild>
        <Link to="/gallery">
          View full portfolio <ArrowUpRight size={18} />
        </Link>
      </Button>
    </section>
  );
}
