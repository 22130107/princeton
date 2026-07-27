import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Giới Thiệu | Trường Mầm non Princeton",
  description:
    "Trường Mầm non Princeton (WASS) - Chương trình giáo dục mầm non chất lượng cao theo chuẩn quốc tế.",
  openGraph: {
    title: "Giới Thiệu | Trường Mầm non Princeton",
    description:
      "Trường Mầm non Princeton - Chương trình giáo dục mầm non chất lượng cao.",
  },
};

export default function GioiThieuPage() {
  return (
    <main>
      <h1>Giới Thiệu</h1>
      <p>Nội dung đang cập nhật...</p>
    </main>
  );
}
