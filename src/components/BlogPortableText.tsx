import { PortableText, type PortableTextComponents } from "@portabletext/react";
import { urlFor } from "@/lib/sanity";

type Block = {
  _type?: string;
  style?: string;
  children?: { text?: string }[];
};

const blockText = (block: Block) =>
  (block.children ?? []).map((c) => c.text ?? "").join("");

export const slugifyHeading = (text: string) =>
  text
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

export type ArticleHeading = { id: string; text: string };

/** H2 headings of a Portable Text body, used for the table of contents. */
export function extractHeadings(body: unknown): ArticleHeading[] {
  if (!Array.isArray(body)) return [];
  return (body as Block[])
    .filter((b) => b._type === "block" && b.style === "h2")
    .map((b) => ({ text: blockText(b).trim() }))
    .filter((h) => h.text)
    .map((h) => ({ ...h, id: slugifyHeading(h.text) }));
}

const components: PortableTextComponents = {
  block: {
    h2: ({ children, value }) => (
      <h2 id={slugifyHeading(blockText(value as Block))}>{children}</h2>
    ),
    h3: ({ children, value }) => (
      <h3 id={slugifyHeading(blockText(value as Block))}>{children}</h3>
    ),
    blockquote: ({ children }) => (
      <blockquote>
        <p>{children}</p>
      </blockquote>
    ),
  },
  types: {
    tableBlock: ({ value }) => {
      const rows: { _key?: string; cells?: string[] }[] = value?.rows ?? [];
      if (!rows.length) return null;
      const hasHeader = value?.hasHeader !== false;
      const [head, ...body] = hasHeader ? rows : [undefined, ...rows];
      return (
        <figure className="blog-body-table">
          <div className="blog-body-table-scroll" tabIndex={0}>
            <table>
              {value?.caption ? <caption>{value.caption}</caption> : null}
              {head ? (
                <thead>
                  <tr>
                    {(head.cells ?? []).map((c, i) => (
                      <th key={i} scope="col">
                        {c}
                      </th>
                    ))}
                  </tr>
                </thead>
              ) : null}
              <tbody>
                {body.map((r, ri) => (
                  <tr key={r?._key ?? ri}>
                    {(r?.cells ?? []).map((c, i) =>
                      i === 0 ? (
                        <th key={i} scope="row">
                          {c}
                        </th>
                      ) : (
                        <td key={i}>{c}</td>
                      ),
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </figure>
      );
    },
    image: ({ value }) => {
      if (!value?.asset) return null;
      const src = urlFor(value);
      if (!src) return null;
      return (
        <figure className="blog-body-figure">
          <img src={src} alt={value.alt || ""} loading="lazy" />
          {value.alt ? <figcaption>{value.alt}</figcaption> : null}
        </figure>
      );
    },
  },
  marks: {
    link: ({ children, value }) => {
      const href: string = value?.href ?? "";
      const external = /^https?:\/\//i.test(href) && !href.includes("homeimprovementclub.co");
      return (
        <a href={href} {...(external ? { rel: "noreferrer noopener", target: "_blank" } : {})}>
          {children}
        </a>
      );
    },
  },
};

export function BlogPortableText({ value }: { value: unknown }) {
  if (!value) return null;
  return <PortableText value={value as never} components={components} />;
}

export default BlogPortableText;
