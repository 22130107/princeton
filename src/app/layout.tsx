import type { Metadata } from "next";
import { cookies } from "next/headers";
import "@/styles/index.css";
import FloatingActions from "@/components/Home/sections/FloatingActions";
import { LanguageProvider } from "@/components/Shared/LanguageProvider";
import { LANG_COOKIE, parseLang } from "@/lib/i18n";
import {
  DEFAULT_DESCRIPTION,
  DEFAULT_TITLE,
  SITE_NAME,
  SITE_URL,
  buildMetadata,
  createOrganizationJsonLd,
  createWebsiteJsonLd,
  serializeJsonLd,
} from "@/lib/seo";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  ...buildMetadata({
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    path: "/",
  }),
  title: {
    default: DEFAULT_TITLE,
    template: `%s | ${SITE_NAME}`,
  },
  applicationName: SITE_NAME,
  category: "education",
  keywords: [
    "Princeton Academy",
    "trường mầm non",
    "giáo dục mầm non",
    "chương trình mầm non",
    "mầm non chất lượng cao",
  ],
  icons: {
    icon: [{ url: "/favicon.png", type: "image/png" }],
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const initialLang = parseLang(cookieStore.get(LANG_COOKIE)?.value);

  return (
    <html lang={initialLang}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
        <style>{`html { font-family: "Montserrat", Arial, Helvetica, sans-serif; } body { margin: 0; } #root { height: 100%; }`}</style>
      </head>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: serializeJsonLd([
              createOrganizationJsonLd(),
              createWebsiteJsonLd(),
            ]),
          }}
        />
        <LanguageProvider initialLang={initialLang}>
          {children}
          <FloatingActions />
        </LanguageProvider>
      </body>
    </html>
  );
}
