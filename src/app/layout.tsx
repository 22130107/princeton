import type { Metadata } from "next";
import { cookies } from "next/headers";
import "@/styles/index.css";
import FloatingActions from "@/components/Home/sections/FloatingActions";
import { LanguageProvider } from "@/components/Shared/LanguageProvider";
import { LANG_COOKIE, parseLang } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "Hệ thống giáo dục Princeton",
  description:
    "Hệ thống giáo dục Princeton - Chương trình giáo dục mầm non chất lượng cao theo chuẩn quốc tế.",
  openGraph: {
    title: "Hệ thống giáo dục Princeton",
    description:
      "Hệ thống giáo dục Princeton - Chương trình giáo dục mầm non chất lượng cao theo chuẩn quốc tế.",
    siteName: "Hệ thống giáo dục Princeton",
  },
  twitter: {
    card: "summary",
    title: "Hệ thống giáo dục Princeton",
    description:
      "Hệ thống giáo dục Princeton - Chương trình giáo dục mầm non chất lượng cao theo chuẩn quốc tế.",
  },
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
        <LanguageProvider initialLang={initialLang}>
          {children}
          <FloatingActions />
        </LanguageProvider>
      </body>
    </html>
  );
}
