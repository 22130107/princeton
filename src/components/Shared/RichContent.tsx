function looksLikeHtml(value: string) {
  return /<\/?[a-z][\s\S]*>/i.test(value);
}

function cleanRichHtml(value: string) {
  return value
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
    .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, "")
    .replace(/<\/?(object|embed|form|input|button|textarea|select|option)\b[^>]*>/gi, "")
    .replace(/\s+on[a-z]+\s*=\s*(".*?"|'.*?'|[^\s>]+)/gi, "")
    .replace(/javascript:/gi, "");
}

export default function RichContent({ blocks }: { blocks: string[] }) {
  const content = blocks.filter((block) => block.trim());

  if (!content.length) return null;

  return (
    <div className="rich-content">
      {content.map((block, index) =>
        looksLikeHtml(block) ? (
          <div key={`${index}-${block.slice(0, 24)}`} dangerouslySetInnerHTML={{ __html: cleanRichHtml(block) }} />
        ) : (
          <p key={`${index}-${block}`}>{block}</p>
        ),
      )}
      <style>{`
        .rich-content {
          color: #620000;
        }
        .rich-content h2 {
          margin: 2rem 0 0.9rem;
          color: #b80000;
          font-size: clamp(1.65rem, 3vw, 2.5rem);
          font-weight: 900;
          line-height: 1.2;
        }
        .rich-content h3 {
          margin: 1.7rem 0 0.75rem;
          color: #b80000;
          font-size: clamp(1.35rem, 2.4vw, 1.9rem);
          font-weight: 900;
          line-height: 1.25;
        }
        .rich-content p {
          margin: 0 0 1.25rem;
        }
        .rich-content > div > div {
          margin: 0 0 1.25rem;
        }
        .rich-content p:last-child,
        .rich-content > div > div:last-child {
          margin-bottom: 0;
        }
        .rich-content p:empty,
        .rich-content > div > div:empty,
        .rich-content p:has(> br:only-child),
        .rich-content > div > div:has(> br:only-child) {
          min-height: 0.8rem;
          margin-bottom: 0.6rem;
        }
        .rich-content [data-rich-line-height] {
          margin: 0;
        }
        .rich-content ul,
        .rich-content ol {
          margin: 0 0 1.35rem 1.5rem;
          padding-left: 1rem;
        }
        .rich-content ul {
          list-style: disc;
        }
        .rich-content ol {
          list-style: decimal;
        }
        .rich-content li {
          display: list-item;
          margin-bottom: 0.55rem;
        }
        .rich-content img {
          max-width: 100%;
          height: auto;
          border-radius: 18px;
        }
        .rich-content iframe {
          max-width: 100%;
          border: 0;
          border-radius: 18px;
          aspect-ratio: 16 / 9;
        }
        @media (max-width: 767px) {
          .rich-content img,
          .rich-content iframe {
            width: 100% !important;
            height: auto;
            left: 0 !important;
            top: 0 !important;
            min-height: 220px;
          }
        }
      `}</style>
    </div>
  );
}
