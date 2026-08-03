"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/components/Shared/LanguageProvider";
import LanguageFlagIcon from "@/components/Shared/LanguageFlagIcon";
import type { Lang } from "@/lib/i18n";
import imgLogo from "../../assets/logo3.png";

const navItems = [
  { href: "/ve-chung-toi", labelKey: "nav.home" },
  { href: "/con-duong-princeton", labelKey: "nav.methods" },
  { href: "/chuong-trinh-hoc", labelKey: "nav.classes" },
  { href: "/cuoc-song-tai-princeton", labelKey: "nav.curriculum" },
  { href: "/ket-noi-gia-dinh", labelKey: "nav.about" },
  { href: "/hop-tac-cung-princeton", labelKey: "nav.news" },
  { href: "/lien-he", labelKey: "nav.register" },
];

export default function MobileHeader() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const { lang, setLang, t } = useLanguage();

  return (
    <header className="fixed inset-x-0 top-0 z-50 w-full bg-[#991B1B] shadow-[0_4px_18px_rgba(65,0,0,0.22)]">
      <div className="flex items-center justify-between px-4 py-2">
        {/* Logo */}
        <Link href="/ve-chung-toi" className="shrink-0">
          <img src={imgLogo.src} alt="Princeton Logo" className="h-16 w-auto rounded-[8px]" />
        </Link>

        {/* Đăng ký + Hamburger */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setLang(lang === "vi" ? "en" : "vi")}
            className="rounded-full border-2 border-white/90 bg-white px-3 py-1 text-[13px] font-extrabold text-[#991B1B] no-underline shadow-[0_2px_0_#5d0f0f]"
            aria-label="Switch language"
          >
            <span className="flex items-center gap-1.5">
              <LanguageFlagIcon lang={lang} />
              <span>{lang === "vi" ? "VN" : "EN"}</span>
            </span>
          </button>
          <Link
            href="/lien-he"
            className="relative rounded-full border-2 border-[#fffefa] bg-[#ffc300] px-4 py-2 text-[13px] font-extrabold uppercase text-[#991B1B] no-underline shadow-[0_2px_0_#5d0f0f] whitespace-nowrap"
          >
            <span className="pointer-events-none absolute inset-[4px] rounded-full border border-dashed border-[#991B1B]/75" />
            <span className="relative z-10">{t("nav.register.short")}</span>
          </Link>
          <button
            onClick={() => setOpen(!open)}
            className="size-9 flex items-center justify-center rounded-full border border-white/90 bg-white text-[#991B1B] shrink-0"
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
        <nav className="border-t border-white/15 px-4 pb-4 pt-2 flex flex-col gap-1">
          {navItems.map((item) => {
            const isActive =
              item.href === "/lien-he"
                ? pathname === item.href
                : pathname === item.href || pathname.startsWith(`${item.href}/`);

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`text-[15px] font-semibold no-underline py-2.5 px-3 rounded-xl border transition-colors hover:bg-white hover:text-[#991B1B] ${
                  isActive
                    ? "border-dashed border-white bg-white font-extrabold text-[#991B1B]"
                    : "border-transparent text-white"
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
