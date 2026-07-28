"use client";

import { useState } from "react";
import Link from "next/link";
import imgLogo from "../../assets/logo1.png";

const navItems = [
  { href: "/", label: "Trang Chủ" },
  { href: "/phuong-phap-giang-day", label: "Phương Pháp Giảng Dạy" },
  { href: "/chuong-trinh-hoc", label: "Chương Trình Học" },
  { href: "/gioi-thieu", label: "Giới Thiệu" },
  { href: "/tin-tuc-su-kien", label: "Tin Tức & Sự Kiện" },
  { href: "/dang-ky", label: "Đăng Ký Ngay" },
];

export default function MobileHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 w-full bg-[#e8f3e6] shadow-sm">
      <div className="flex items-center justify-between px-4 py-2">
        {/* Logo */}
        <Link href="/" className="shrink-0">
          <img src={imgLogo.src} alt="Princeton Logo" className="h-16 w-auto" />
        </Link>

        {/* Đăng ký + Hamburger */}
        <div className="flex items-center gap-2">
          <Link
            href="/dang-ky"
            className="bg-[#b80000] text-white text-[13px] font-bold uppercase rounded-full px-4 py-2 whitespace-nowrap no-underline"
          >
            Đăng Ký
          </Link>
          <button
            onClick={() => setOpen(!open)}
            className="size-9 flex items-center justify-center bg-[#b80000] rounded-full text-white shrink-0"
            aria-label="Menu"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              {open ? (
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

      {/* Dropdown menu */}
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${open ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0"}`}
      >
        <nav className="border-t border-[#620000]/10 px-4 pb-4 pt-2 flex flex-col gap-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="text-[#620000] text-[15px] font-semibold no-underline py-2.5 px-3 rounded-xl hover:bg-[#d4e6d1] transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
