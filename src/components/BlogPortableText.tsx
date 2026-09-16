import { PortableText, type PortableTextComponents } from "@portabletext/react";
import { urlFor } from "@/lib/sanity";

const components: PortableTextComponents = {
  types: {
    image: ({ value }) => {
      if (!value?.asset) return null;
      const src = urlFor(value);
      if (!src) return null;
      return (
        <figure className="blog-body-figure">
          <img src={src} alt={value.alt || ""} />
          {value.alt ? <figcaption>{value.alt}</figcaption> : null}
        </figure>
      );
    },
  },
  marks: {
    link: ({ children, value }) => (
      <a href={value?.href} rel="noreferrer" target="_blank">
        {children}
      </a>
    ),
  },
};

export function BlogPortableText({ value }: { value: unknown }) {
  if (!value) return null;
  return <PortableText value={value as never} components={components} />;
}

export default BlogPortableText;
