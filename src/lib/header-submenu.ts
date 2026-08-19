import type { Lang } from "@/lib/i18n";

export type HeaderSubmenuLink = {
  href: string;
  label: string;
  labelEn?: string;
  description?: string;
  descriptionEn?: string;
};

export function localizeSubmenuLink(link: HeaderSubmenuLink, lang: Lang) {
  return {
    href: link.href,
    label: lang === "en" ? link.labelEn || link.label : link.label,
    description:
      lang === "en"
        ? link.descriptionEn || link.description
        : link.description,
  };
}
