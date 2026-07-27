import type { Metadata } from "next";
import DangKyContent from "./DangKyContent";

export const metadata: Metadata = {
  title: "Đăng Ký | Trường Mầm non Princeton",
  description:
    "Đăng ký nhận ưu đãi và tư vấn tuyển sinh tại Trường Mầm non Princeton.",
  openGraph: {
    title: "Đăng Ký | Trường Mầm non Princeton",
    description:
      "Đăng ký nhận ưu đãi và tư vấn tuyển sinh tại Trường Mầm non Princeton.",
  },
};

export default function DangKyPage() {
  return <DangKyContent />;
}
