import type { Metadata } from "next";
import { campuses } from "./campuses.ts";

export const SITE_URL = "https://princetonacademy.vn";
export const SITE_NAME = "Princeton Academy";
export const DEFAULT_TITLE = "Princeton Academy | Trường Mầm non chất lượng cao";
export const DEFAULT_DESCRIPTION =
  "Princeton Academy xây dựng môi trường giáo dục mầm non hiện đại, yêu thương, giúp trẻ phát triển toàn diện qua trải nghiệm và khám phá.";
export const DEFAULT_SHARE_IMAGE = "/thumanil.webp";

function normalizePath(path: string) {
  const normalized = `/${path}`.replace(/\/{2,}/g, "/");
  return normalized.length > 1 ? normalized.replace(/\/+$/, "") : normalized;
}

export function absoluteUrl(path = "/") {
  if (/^https?:\/\//i.test(path)) return path;
  return `${SITE_URL}${normalizePath(path) === "/" ? "" : normalizePath(path)}`;
}

function compactText(value: string, maxLength: number) {
  const compact = value.trim().replace(/\s+/g, " ");
  if (compact.length <= maxLength) return compact;

  const shortened = compact.slice(0, maxLength + 1);
  const lastSpace = shortened.lastIndexOf(" ");
  return shortened.slice(0, lastSpace > 100 ? lastSpace : maxLength).trimEnd();
}

type MetadataInput = {
  title: string;
  description: string;
  path: string;
  image?: string | null;
  imageAlt?: string;
  type?: "website" | "article";
  noIndex?: boolean;
};

export function buildMetadata({
  title,
  description,
  path,
  image,
  imageAlt = SITE_NAME,
  type = "website",
  noIndex = false,
}: MetadataInput): Metadata {
  const cleanTitle = compactText(title, 65);
  const cleanDescription = compactText(description, 160);
  const canonical = absoluteUrl(path);
  const shareImage = absoluteUrl(image || DEFAULT_SHARE_IMAGE);

  return {
    title: cleanTitle,
    description: cleanDescription,
    alternates: { canonical },
    robots: noIndex
      ? { index: false, follow: false, nocache: true }
      : { index: true, follow: true },
    openGraph: {
      type,
      locale: "vi_VN",
      url: canonical,
      siteName: SITE_NAME,
      title: cleanTitle,
      description: cleanDescription,
      images: [{ url: shareImage, alt: imageAlt }],
    },
    twitter: {
      card: "summary_large_image",
      title: cleanTitle,
      description: cleanDescription,
      images: [shareImage],
    },
  };
}

export function createOrganizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "@id": `${SITE_URL}/#organization`,
    name: SITE_NAME,
    alternateName: "Hệ thống giáo dục Princeton",
    url: SITE_URL,
    logo: absoluteUrl("/favicon.png"),
    sameAs: ["https://www.facebook.com/princetonacademy.vietnam"],
    location: campuses.map((campus) => ({
      "@type": "Place",
      name: campus.name,
      address: {
        "@type": "PostalAddress",
        streetAddress: campus.address,
        addressCountry: "VN",
      },
    })),
  };
}

export function createWebsiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: SITE_URL,
    name: SITE_NAME,
    inLanguage: ["vi", "en"],
    publisher: { "@id": `${SITE_URL}/#organization` },
  };
}

type BreadcrumbItem = { name: string; path: string };

export function createBreadcrumbJsonLd(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

type ArticleInput = {
  title: string;
  description: string;
  path: string;
  image?: string | null;
  datePublished?: string | null;
  dateModified?: string | null;
};

export function createArticleJsonLd({
  title,
  description,
  path,
  image,
  datePublished,
  dateModified,
}: ArticleInput) {
  const canonical = absoluteUrl(path);
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: compactText(title, 110),
    description: compactText(description, 160),
    mainEntityOfPage: canonical,
    url: canonical,
    image: [absoluteUrl(image || DEFAULT_SHARE_IMAGE)],
    ...(datePublished ? { datePublished } : {}),
    ...(dateModified ? { dateModified } : {}),
    author: { "@id": `${SITE_URL}/#organization` },
    publisher: {
      "@type": "EducationalOrganization",
      "@id": `${SITE_URL}/#organization`,
      name: SITE_NAME,
      logo: {
        "@type": "ImageObject",
        url: absoluteUrl("/favicon.png"),
      },
    },
  };
}

export function serializeJsonLd(value: unknown) {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}

export function buildSitemapEntries(paths: string[]) {
  return Array.from(new Set(paths.map((path) => absoluteUrl(path)))).map((url) => ({
    url,
    changeFrequency: "weekly" as const,
    priority: url === SITE_URL ? 1 : 0.7,
  }));
}
