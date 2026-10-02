import { Helmet } from "react-helmet-async";

interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
  ogImage?: string;
  schema?: object | object[];
  robots?: string;
}

const SITE = "https://homeimprovementclub.co";

const SEO = ({ title, description, canonical, ogImage, schema, robots }: SEOProps) => {
  const url = canonical ? `${SITE}${canonical}` : SITE;
  const image = ogImage ?? `${SITE}/hic-social.jpg`;
  return (
    <Helmet>
      <title>{title}</title>
      {robots ? <meta name="robots" content={robots} /> : null}
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      {(Array.isArray(schema) ? schema : schema ? [schema] : []).map(
        (block, index) => (
          <script key={index} type="application/ld+json">
            {JSON.stringify(block)}
          </script>
        ),
      )}
    </Helmet>
  );
};

export default SEO;
