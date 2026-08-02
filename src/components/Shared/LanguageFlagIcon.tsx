type LanguageFlagIconProps = {
  lang: "vi" | "en";
};

export default function LanguageFlagIcon({ lang }: LanguageFlagIconProps) {
  if (lang === "vi") {
    return (
      <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true" className="shrink-0">
        <rect width="16" height="16" rx="8" fill="#da251d" />
        <path
          d="M8 3.1l1.1 2.8h3l-2.4 1.8.9 2.9L8 8.9 5.4 10.6l.9-2.9L3.9 5.9h3L8 3.1z"
          fill="#ffdd00"
        />
      </svg>
    );
  }

  return (
    <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true" className="shrink-0">
      <rect width="16" height="16" rx="8" fill="#012169" />
      <path d="M0 2.1l6 3.9V0h4v6l6-3.9v2.5L10 8l6 3.4v2.5L10 10v6H6v-6l-6 3.9v-2.5L6 8 0 4.6z" fill="#fff" />
      <path d="M6.6 0h2.8v6.6H16v2.8H9.4V16H6.6V9.4H0V6.6h6.6z" fill="#c8102e" />
    </svg>
  );
}