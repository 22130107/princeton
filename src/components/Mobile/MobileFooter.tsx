import imgLogo from "../../assets/logo.png";
import imgScsa from "../../assets/4268f4b28dbf19f88ab93b3a1e683121b0001bf9.png";
import imgWa from "../../assets/354fdda27892ccf1ea631fc32c53cf22185aba96.png";
import imgCognia from "../../assets/d9d67faba7fac050ac5aaec8e022971be16752f9.png";
import imgCis from "../../assets/f18438a3a99e84575dde46c627e1beb3916f44e2.png";
import Link from "next/link";

function FacebookIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 28 28" fill="none">
      <path d="M14 2C7.37 2 2 7.37 2 14c0 6.0 4.35 10.98 10.07 11.85V17.5H9.4V14h2.67v-2.32c0-2.63 1.57-4.09 3.98-4.09 1.15 0 2.36.21 2.36.21v2.6h-1.33c-1.31 0-1.72.81-1.72 1.65V14h2.93l-.47 3.5h-2.46v8.35C21.65 24.98 26 20 26 14c0-6.63-5.37-12-12-12z" fill="#620000" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 29 28" fill="none">
      <path d="M14.5 2.5c-3.25 0-3.66.01-4.93.07-1.27.06-2.14.26-2.9.56a5.86 5.86 0 0 0-2.12 1.38A5.86 5.86 0 0 0 3.17 6.63c-.3.76-.5 1.63-.56 2.9C2.55 10.8 2.54 11.21 2.54 14.46c0 3.25.01 3.66.07 4.93.06 1.27.26 2.14.56 2.9a5.86 5.86 0 0 0 1.38 2.12 5.86 5.86 0 0 0 2.12 1.38c.76.3 1.63.5 2.9.56 1.27.06 1.68.07 4.93.07 3.25 0 3.66-.01 4.93-.07 1.27-.06 2.14-.26 2.9-.56a5.86 5.86 0 0 0 2.12-1.38 5.86 5.86 0 0 0 1.38-2.12c.3-.76.5-1.63.56-2.9.06-1.27.07-1.68.07-4.93 0-3.25-.01-3.66-.07-4.93-.06-1.27-.26-2.14-.56-2.9a5.86 5.86 0 0 0-1.38-2.12 5.86 5.86 0 0 0-2.12-1.38c-.76-.3-1.63-.5-2.9-.56C18.16 2.51 17.75 2.5 14.5 2.5zm0 2.16c3.2 0 3.58.01 4.84.07 1.17.05 1.8.24 2.22.4.56.22.96.48 1.37.9.42.42.68.81.9 1.37.16.42.35 1.05.4 2.22.06 1.26.07 1.64.07 4.84s-.01 3.58-.07 4.84c-.05 1.17-.24 1.8-.4 2.22a3.72 3.72 0 0 1-.9 1.37 3.72 3.72 0 0 1-1.37.9c-.42.16-1.05.35-2.22.4-1.26.06-1.64.07-4.84.07s-3.58-.01-4.84-.07c-1.17-.05-1.8-.24-2.22-.4a3.72 3.72 0 0 1-1.37-.9 3.72 3.72 0 0 1-.9-1.37c-.16-.42-.35-1.05-.4-2.22-.06-1.26-.07-1.64-.07-4.84s.01-3.58.07-4.84c.05-1.17.24-1.8.4-2.22.22-.56.48-.95.9-1.37a3.72 3.72 0 0 1 1.37-.9c.42-.16 1.05-.35 2.22-.4 1.26-.06 1.64-.07 4.84-.07zm0 3.68a6.12 6.12 0 1 0 0 12.24 6.12 6.12 0 0 0 0-12.24zm0 10.08a3.96 3.96 0 1 1 0-7.92 3.96 3.96 0 0 1 0 7.92zm7.77-10.32a1.43 1.43 0 1 1-2.86 0 1.43 1.43 0 0 1 2.86 0z" fill="#620000" />
    </svg>
  );
}

function YoutubeIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 29 28" fill="none">
      <path d="M27.1 8.2s-.26-1.85-1.07-2.66c-1.02-1.07-2.17-1.08-2.7-1.14C19.97 4.1 14.5 4.1 14.5 4.1s-5.47 0-8.83.3c-.53.06-1.68.07-2.7 1.14C2.16 6.35 1.9 8.2 1.9 8.2S1.63 10.35 1.63 12.5v2.01c0 2.15.27 4.3.27 4.3s.26 1.85 1.07 2.66c1.02 1.07 2.37 1.04 2.97 1.15C7.77 22.8 14.5 22.87 14.5 22.87s5.47-.01 8.83-.31c.53-.06 1.68-.07 2.7-1.14.81-.81 1.07-2.66 1.07-2.66s.27-2.15.27-4.3v-2.01c0-2.15-.27-4.3-.27-4.3zM11.9 17.5V10.5l7.3 3.52-7.3 3.48z" fill="#620000" />
    </svg>
  );
}

const navLinks = [
  { href: "/", label: "Trang Chủ" },
  { href: "/gioi-thieu", label: "Giới Thiệu" },
  { href: "/chuong-trinh-hoc", label: "Chương Trình Học" },
  { href: "/phuong-phap-giang-day", label: "Phương Pháp Giảng Dạy" },
  { href: "/tin-tuc-su-kien", label: "Tin Tức & Sự Kiện" },
];

export default function MobileFooter() {
  return (
    <footer className="bg-[#e8f3e6]">
      {/* Top divider */}
      <div className="border-t border-dashed border-[#620000]/25" />

      <div className="px-5 py-8 flex flex-col gap-6">
        {/* Logo + school name */}
        <div className="flex items-center gap-3">
          <img src={imgLogo.src} alt="Logo" className="h-14 w-auto" />
          <div>
            <p className="text-[#620000] font-bold text-[15px] leading-snug">TRƯỜNG MẦM NON</p>
            <p className="text-[#620000] font-bold text-[15px] leading-snug">PRINCETON</p>
            <p className="text-[#620000] text-[12px] mt-0.5">info@wass.edu.vn</p>
          </div>
        </div>

        {/* Nav links */}
        <nav className="flex flex-col gap-1.5">
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-[#620000] text-[14px] font-medium no-underline py-1"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        {/* Social */}
        <div>
          <p className="text-[#620000] font-medium text-[13px] mb-3">Mạng xã hội</p>
          <div className="flex gap-4">
            <a href="#" aria-label="Facebook" className="size-9 rounded-full bg-white border border-[#620000]/20 flex items-center justify-center shadow-sm">
              <FacebookIcon />
            </a>
            <a href="#" aria-label="Instagram" className="size-9 rounded-full bg-white border border-[#620000]/20 flex items-center justify-center shadow-sm">
              <InstagramIcon />
            </a>
            <a href="#" aria-label="YouTube" className="size-9 rounded-full bg-white border border-[#620000]/20 flex items-center justify-center shadow-sm">
              <YoutubeIcon />
            </a>
          </div>
        </div>

        {/* Accreditation logos */}
        <div>
          <p className="text-[#620000] text-[12px] mb-2 font-medium">Accreditation</p>
          <div className="flex items-center gap-3 flex-wrap">
            <img src={imgWa.src} alt="WA" className="h-7 w-auto" />
            <img src={imgScsa.src} alt="SCSA" className="h-7 w-auto" />
            <img src={imgCognia.src} alt="Cognia" className="h-7 w-auto" />
            <img src={imgCis.src} alt="CIS" className="h-7 w-auto" />
          </div>
        </div>

        {/* Copyright */}
        <p className="text-[#620000]/60 text-[11px] text-center">
          © 2024 Trường Mầm non Princeton. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
