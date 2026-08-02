"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/components/Shared/LanguageProvider";
import LanguageFlagIcon from "@/components/Shared/LanguageFlagIcon";
import type { Lang } from "@/lib/i18n";
import imgLogo from "../../assets/logo1.png";

const navItems = [
  { href: "/", labelKey: "nav.home" },
  { href: "/phuong-phap-giang-day", labelKey: "nav.methods" },
  { href: "/khoi-lop", labelKey: "nav.classes" },
  { href: "/chuong-trinh-hoc", labelKey: "nav.curriculum" },
  { href: "/gioi-thieu", labelKey: "nav.about" },
  { href: "/tin-tuc-su-kien", labelKey: "nav.news" },
  { href: "/dang-ky", labelKey: "nav.register" },
];

export default function MobileHeader() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const { lang, setLang, t } = useLanguage();

  return (
    <header className="fixed inset-x-0 top-0 z-50 w-full bg-[#e8f3e6] shadow-sm">
      <div className="flex items-center justify-between px-4 py-2">
        {/* Logo */}
        <Link href="/" className="shrink-0">
          <img src={imgLogo.src} alt="Princeton Logo" className="h-16 w-auto" />
        </Link>

        {/* Đăng ký + Hamburger */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setLang(lang === "vi" ? "en" : "vi")}
            className="rounded-full border-2 border-[#8d0000] bg-white px-3 py-1 text-[13px] font-extrabold text-[#620000] no-underline shadow-[0_2px_0_#700000]"
            aria-label="Switch language"
          >
            <span className="flex items-center gap-1.5">
              <LanguageFlagIcon lang={lang} />
              <span>{lang === "vi" ? "VN" : "EN"}</span>
            </span>
          </button>
          <Link
            href="/dang-ky"
            className="relative rounded-full border-2 border-[#8d0000] bg-[#b80000] px-4 py-2 text-[13px] font-extrabold uppercase text-white no-underline shadow-[0_2px_0_#700000] whitespace-nowrap"
          >
            <span className="pointer-events-none absolute inset-[4px] rounded-full border border-dashed border-white/95" />
            <span className="relative z-10">{t("nav.register.short")}</span>
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
          {navItems.map((item) => {
            const isActive =
              item.href === "/dang-ky"
                ? pathname === item.href
                : pathname === item.href || pathname.startsWith(`${item.href}/`);

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`text-[15px] font-semibold no-underline py-2.5 px-3 rounded-xl border transition-colors hover:bg-[#d4e6d1] ${
                  isActive
                    ? "border-dashed border-[#b80000] bg-[#fff1f1] font-extrabold text-[#b80000]"
                    : "border-transparent text-[#620000]"
                }`}
              >
                {t(item.labelKey)}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
