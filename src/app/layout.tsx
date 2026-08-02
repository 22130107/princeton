import type { Metadata } from "next";
import "@/styles/index.css";
import FloatingActions from "@/components/Home/sections/FloatingActions";

export const metadata: Metadata = {
  title: "Trường Mầm non Princeton",
  description:
    "Trường Mầm non Princeton - Chương trình giáo dục mầm non chất lượng cao theo chuẩn quốc tế.",
  icons: {
    icon: [{ url: "/favicon.png", type: "image/png" }],
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Baloo+Paaji+2:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
        <style>{`html { font-family: "Baloo Paaji 2", Arial, Helvetica, sans-serif; } body { margin: 0; } #root { height: 100%; }`}</style>
      </head>
      <body>
        {children}
        <FloatingActions />
      </body>
    </html>
  );
}
