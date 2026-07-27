import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tin Tức & Sự Kiện | Trường Mầm non Princeton",
  description:
    "Cập nhật tin tức và sự kiện mới nhất tại Trường Mầm non Princeton.",
  openGraph: {
    title: "Tin Tức & Sự Kiện | Trường Mầm non Princeton",
    description:
      "Cập nhật tin tức và sự kiện mới nhất tại Trường Mầm non Princeton.",
  },
};

export default function TinTucSuKienPage() {
  return (
    <main>
      <h1>Tin Tức & Sự Kiện</h1>
      <p>Nội dung đang cập nhật...</p>
    </main>
  );
}
