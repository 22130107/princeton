import type { Metadata } from "next";
import DangKyContent from "@/app/dang-ky/DangKyContent";

export const metadata: Metadata = {
  title: "Liên hệ | Trường Mầm non Princeton",
  description:
    "Liên hệ Princeton để được tư vấn tuyển sinh hoặc đăng ký hợp tác cùng nhà trường.",
  openGraph: {
    title: "Liên hệ | Trường Mầm non Princeton",
    description:
      "Liên hệ Princeton để được tư vấn tuyển sinh hoặc đăng ký hợp tác cùng nhà trường.",
  },
};

export default function LienHePage() {
  return <DangKyContent />;
}
