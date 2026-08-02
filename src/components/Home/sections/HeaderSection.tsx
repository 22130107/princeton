"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useLanguage } from "@/components/Shared/LanguageProvider";
import type { Lang } from "@/lib/i18n";
import imgLogo from "../../../assets/logo1.png";

type SubmenuKey = "classes" | "curriculum";
type NavItem = {
  href: string;
  labelKey: string;
  submenu?: SubmenuKey;
};
type SubmenuLink = {
  href: string;
  label: string;
  description?: string;
};

type HeaderSubmenus = Record<SubmenuKey, SubmenuLink[]>;

const navItems: NavItem[] = [
  { href: "/", labelKey: "nav.home" },
  { href: "/phuong-phap-giang-day", labelKey: "nav.methods" },
  { href: "/khoi-lop", labelKey: "nav.classes", submenu: "classes" },
  { href: "/chuong-trinh-hoc", labelKey: "nav.curriculum", submenu: "curriculum" },
  { href: "/gioi-thieu", labelKey: "nav.about" },
  { href: "/tin-tuc-su-kien", labelKey: "nav.news" },
];

function Logo() {
  return (
    <Link href="/" className="shrink-0 no-underline" data-name="Link">
      <div className="relative aspect-[100/75] w-[120px]">
        <img alt="Princeton Kindergarten" className="absolute inset-0 size-full object-contain" src={imgLogo.src} />
      </div>
    </Link>
  );
}

function RegisterButton() {
  const { t } = useLanguage();
  return (
    <Link
      href="/dang-ky"
      className="relative flex shrink-0 items-center justify-center rounded-[64px] border-2 border-[#8d0000] bg-[#b80000] px-[22px] py-[10px] no-underline shadow-[0_3px_0_#700000]"
      data-name="Link"
    >
      <span className="pointer-events-none absolute inset-[5px] rounded-[64px] border border-dashed border-white/95" />
      <span className="relative z-10 whitespace-nowrap text-[18px] font-extrabold uppercase text-white">
        {t("nav.register")}
      </span>
    </Link>
  );
}

function LangToggle({ lang, onToggle }: { lang: Lang; onToggle: () => void }) {
  return (
    <button
      onClick={onToggle}
      className="shrink-0 rounded-full border-2 border-[#8d0000] bg-white px-3 py-[6px] text-[15px] font-extrabold text-[#620000] no-underline shadow-[0_2px_0_#700000] transition-colors hover:bg-[#fff1f1]"
      aria-label="Switch language"
    >
      {lang === "vi" ? "EN" : "VI"}
    </button>
  );
}

function DesktopNav({ submenus, pathname }: { submenus: HeaderSubmenus; pathname: string }) {
  const { t } = useLanguage();
  return (
    <div className="hidden items-center gap-3 md:flex" data-name="List">
      {navItems.map((item) => {
        const menuLinks = item.submenu ? submenus[item.submenu] : [];
        const isActive = item.submenu
          ? pathname === item.href || pathname.startsWith(`${item.href}/`)
          : pathname === item.href;

        return (
          <div key={item.href} className="group relative">
            <Link
              href={item.href}
              className={`block whitespace-nowrap rounded-full border border-dashed px-[16px] py-[7px] text-[19px] font-semibold no-underline transition-colors duration-150 hover:border-[#b80000] hover:bg-[#fff1f1] hover:text-[#b80000] group-focus-within:border-[#b80000] group-focus-within:bg-[#fff1f1] group-focus-within:text-[#b80000] ${
                isActive
                  ? "border-[#b80000] bg-[#fff1f1] text-[#b80000]"
                  : "border-transparent text-[#620000]"
              }`}
            >
              {t(item.labelKey)}
            </Link>

            {menuLinks.length ? (
              <ul className="invisible absolute left-0 top-full z-[80] mt-3 w-[280px] rounded-[14px] border border-[#e4b4b4] bg-white p-2 opacity-0 shadow-[0_14px_30px_rgba(98,0,0,0.16)] transition-all duration-150 group-hover:visible group-hover:translate-y-1 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-1 group-focus-within:opacity-100">
                {menuLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="block rounded-[10px] px-3 py-2 text-[#620000] no-underline hover:bg-[#fff1f1]"
                    >
                      <span className="block text-[15px] font-extrabold leading-tight">{link.label}</span>
                      {link.description ? (
                        <span className="mt-1 block text-[12px] font-semibold text-[#9a4a4a]">
                          {link.description}
                        </span>
                      ) : null}
                    </Link>
                  </li>
                ))}
                <li className="mt-1 border-t border-[#f0d9d9] pt-1">
                  <Link
                    href={item.href}
                    className="block rounded-[10px] px-3 py-2 text-[14px] font-extrabold text-[#b80000] no-underline hover:bg-[#fff1f1]"
                  >
                    {t("nav.viewAll")}
                  </Link>
                </li>
              </ul>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}

function MobileMenu({ open, pathname }: { open: boolean; pathname: string }) {
  const { t } = useLanguage();
  return (
    <div className={`overflow-hidden transition-all duration-300 ease-in-out md:hidden ${open ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"}`}>
      <nav className="flex flex-col gap-1 border-t border-[#620000]/10 px-4 pb-4 pt-3">
        {[...navItems, { href: "/dang-ky", labelKey: "nav.register" }].map((item) => {
          const isActive =
            item.href === "/dang-ky"
              ? pathname === item.href
              : pathname === item.href || pathname.startsWith(`${item.href}/`);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`rounded-xl border px-4 py-2.5 text-[16px] font-semibold no-underline transition-colors hover:bg-[#d4e6d1] ${
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
  );
}

export default function HeaderSection() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const { lang, setLang } = useLanguage();
  const [submenus, setSubmenus] = useState<HeaderSubmenus>({
    classes: [],
    curriculum: [],
  });

  useEffect(() => {
    let alive = true;

    async function loadSubmenus() {
      try {
        const [classResponse, curriculumResponse] = await Promise.all([
          fetch("/api/class-programs"),
          fetch("/api/curriculum-tracks"),
        ]);
        const [classData, curriculumData] = await Promise.all([
          classResponse.json(),
          curriculumResponse.json(),
        ]);

        if (!alive) return;

        setSubmenus({
          classes: Array.isArray(classData.programs)
            ? classData.programs.map((item: { slug: string; name: string; age?: string }) => ({
                href: `/khoi-lop/${item.slug}`,
                label: item.name,
                description: item.age,
              }))
            : [],
          curriculum: Array.isArray(curriculumData.tracks)
            ? curriculumData.tracks.map((item: { slug: string; title: string; category?: string }) => ({
                href: `/chuong-trinh-hoc/${item.slug}`,
                label: item.title,
                description: item.category,
              }))
            : [],
        });
      } catch {
        if (alive) {
          setSubmenus({ classes: [], curriculum: [] });
        }
      }
    }

    loadSubmenus();

    return () => {
      alive = false;
    };
  }, []);

  return (
    <div className="h-full pointer-events-none" data-name="HeaderSection">
      <div className="sticky top-0 z-50 flex items-center justify-between bg-[#e8f3e6] px-[116px] py-[4px] pointer-events-auto max-md:px-4">
        <Logo />
        <DesktopNav submenus={submenus} pathname={pathname} />
        <div className="flex items-center gap-3">
          <LangToggle lang={lang} onToggle={() => setLang(lang === "vi" ? "en" : "vi")} />
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
      <MobileMenu open={menuOpen} pathname={pathname} />
    </div>
  );
}
