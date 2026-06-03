import { Helmet } from "react-helmet-async";

interface PageSEOProps {
  title: string;
  description: string;
  path?: string;
}

export default function PageSEO({ title, description, path }: PageSEOProps) {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      {path && <link rel="canonical" href={path} />}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      {path && <meta property="og:url" content={path} />}
    </Helmet>
  );
}
