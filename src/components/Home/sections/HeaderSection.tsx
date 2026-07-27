"use client";

import Link from "next/link";
import { useState } from "react";
import imgLogo from "../../../assets/logo.png";

const navItems = [
  { href: "/", label: "TRANG CHỦ" },
  { href: "/phuong-phap-giang-day", label: "Phương Pháp Giảng Dạy" },
  { href: "/chuong-trinh-hoc", label: "Chương Trình Học" },
  { href: "/gioi-thieu", label: "Giới Thiệu" },
  { href: "/tin-tuc-su-kien", label: "Tin Tức & Sự Kiện" },
];

function Logo() {
  return (
    <Link href="/" className="shrink-0 no-underline" data-name="Link">
      <div className="aspect-[100/75] w-[100px] relative">
        <img alt="" className="absolute inset-0 size-full" src={imgLogo.src} />
      </div>
    </Link>
  );
}

function RegisterButton() {
  return (
    <Link href="/dang-ky" className="bg-white flex items-center justify-center relative rounded-[64px] shrink-0 no-underline px-[20px] py-[10px]" data-name="Link">
      <div className="absolute bg-[#620000] inset-[2px_0.01px_-2px_0] rounded-[64px]" />
      <div className="absolute bg-[#b80000] inset-[0_0.01px_0_0] rounded-[64px]" />
      <span className="relative text-white text-[18px] font-bold uppercase whitespace-nowrap z-10">Đăng Ký Ngay</span>
    </Link>
  );
}

function DesktopNav() {
  return (
    <div className="hidden md:flex items-center gap-4" data-name="List">
      {navItems.map((item) => (
        <Link key={item.href} href={item.href} className="text-[#620000] text-[18px] font-semibold whitespace-nowrap no-underline px-[18px] py-[6px]">
          {item.label}
        </Link>
      ))}
    </div>
  );
}

function MobileMenu({ open }: { open: boolean }) {
  return (
    <div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${open ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"}`}>
      <nav className="border-t border-[#620000]/10 px-4 pb-4 pt-3 flex flex-col gap-1">
        {[...navItems, { href: "/dang-ky", label: "Đăng Ký Ngay" }].map((item) => (
          <Link key={item.href} href={item.href} className="text-[#620000] text-[16px] font-semibold no-underline py-2.5 px-4 rounded-xl hover:bg-[#d4e6d1] transition-colors">
            {item.label}
          </Link>
        ))}
      </nav>
    </div>
  );
}

export default function HeaderSection() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="h-full pointer-events-none" data-name="HeaderSection">
      <div className="bg-[#e8f3e6] flex items-center justify-between pointer-events-auto px-[116px] max-md:px-4 py-[12px] sticky top-0 z-50">
        <Logo />
        <DesktopNav />
        <div className="flex items-center gap-3">
          <RegisterButton />
          <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden size-10 flex items-center justify-center bg-[#b80000] rounded-full text-white shrink-0" aria-label="Menu">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              {menuOpen ? (
                <>
                  <line x1="6" y1="6" x2="18" y2="18" />
                  <line x1="6" y1="18" x2="18" y2="6" />
                </>
              ) : (
                <>
                  <line x1="4" y1="7" x2="20" y2="7" />
                  <line x1="4" y1="12" x2="20" y2="12" />
                  <line x1="4" y1="17" x2="20" y2="17" />
                </>
              )}
            </svg>
          </button>
        </div>
      </div>
      <MobileMenu open={menuOpen} />
    </div>
  );
}
