import { Helmet } from 'react-helmet-async';

interface SeoProps {
  title: string;
  description: string;
  path: string;
}

function normalizeSiteUrl(): string | null {
  const configured = import.meta.env.SITE_URL?.trim();

  if (!configured) {
    return null;
  }

  return configured.endsWith('/') ? configured : `${configured}/`;
}

function buildCanonical(path: string): string | null {
  const siteUrl = normalizeSiteUrl();

  if (!siteUrl) {
    return null;
  }

  try {
    return new URL(path, siteUrl).toString();
  } catch {
    return null;
  }
}

export function Seo({ title, description, path }: SeoProps) {
  const canonical = buildCanonical(path);

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      {canonical ? <link rel="canonical" href={canonical} /> : null}
    </Helmet>
  );
}
