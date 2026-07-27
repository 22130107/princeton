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
      <div className="relative aspect-[100/75] w-[100px]">
        <img alt="Princeton Kindergarten" className="absolute inset-0 size-full object-contain" src={imgLogo.src} />
      </div>
    </Link>
  );
}

function RegisterButton() {
  return (
    <Link
      href="/dang-ky"
      className="relative flex shrink-0 items-center justify-center rounded-[64px] bg-white px-[20px] py-[10px] no-underline"
      data-name="Link"
    >
      <div className="absolute inset-[2px_0.01px_-2px_0] rounded-[64px] bg-[#620000]" />
      <div className="absolute inset-[0_0.01px_0_0] rounded-[64px] bg-[#b80000]" />
      <span className="relative z-10 whitespace-nowrap text-[18px] font-bold uppercase text-white">
        Đăng Ký Ngay
      </span>
    </Link>
  );
}

function DesktopNav() {
  return (
    <div className="hidden items-center gap-4 md:flex" data-name="List">
      {navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className="whitespace-nowrap px-[18px] py-[6px] text-[18px] font-semibold text-[#620000] no-underline"
        >
          {item.label}
        </Link>
      ))}
    </div>
  );
}

function MobileMenu({ open }: { open: boolean }) {
  return (
    <div className={`overflow-hidden transition-all duration-300 ease-in-out md:hidden ${open ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"}`}>
      <nav className="flex flex-col gap-1 border-t border-[#620000]/10 px-4 pb-4 pt-3">
        {[...navItems, { href: "/dang-ky", label: "Đăng Ký Ngay" }].map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="rounded-xl px-4 py-2.5 text-[16px] font-semibold text-[#620000] no-underline transition-colors hover:bg-[#d4e6d1]"
          >
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
      <div className="sticky top-0 z-50 flex items-center justify-between bg-[#e8f3e6] px-[116px] py-[12px] pointer-events-auto max-md:px-4">
        <Logo />
        <DesktopNav />
        <div className="flex items-center gap-3">
          <RegisterButton />
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#b80000] text-white md:hidden"
            aria-label="Menu"
          >
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
