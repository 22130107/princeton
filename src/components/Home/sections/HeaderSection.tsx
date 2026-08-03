"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useLanguage } from "@/components/Shared/LanguageProvider";
import LanguageFlagIcon from "@/components/Shared/LanguageFlagIcon";
import type { Lang } from "@/lib/i18n";
import imgLogo from "../../../assets/logo3.png";

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
  { href: "/ve-chung-toi", labelKey: "nav.home" },
  { href: "/con-duong-princeton", labelKey: "nav.methods" },
  { href: "/chuong-trinh-hoc", labelKey: "nav.classes", submenu: "classes" },
  { href: "/cuoc-song-tai-princeton", labelKey: "nav.curriculum", submenu: "curriculum" },
  { href: "/ket-noi-gia-dinh", labelKey: "nav.about" },
  { href: "/hop-tac-cung-princeton", labelKey: "nav.news" },
];

function Logo() {
  return (
    <Link href="/ve-chung-toi" className="shrink-0 no-underline" data-name="Link">
      <div className="relative size-[clamp(72px,4.7vw,90px)]">
        <img alt="Princeton Kindergarten" className="absolute inset-0 size-full rounded-[8px] object-contain" src={imgLogo.src} />
      </div>
    </Link>
  );
}

function RegisterButton() {
  const { t } = useLanguage();
  return (
    <Link
      href="/lien-he"
      className="relative flex shrink-0 items-center justify-center rounded-[64px] border-2 border-[#fffefa] bg-[#ffc300] px-[clamp(18px,1.15vw,22px)] py-[clamp(8px,0.52vw,10px)] no-underline shadow-[0_3px_0_#5d0f0f] transition-colors hover:bg-[#ffe27a]"
      data-name="Link"
    >
      <span className="pointer-events-none absolute inset-[5px] rounded-[64px] border border-dashed border-[#991B1B]/75" />
      <span className="relative z-10 whitespace-nowrap text-[clamp(16px,1vw,19px)] font-extrabold uppercase text-[#991B1B]">
        {t("nav.register")}
      </span>
    </Link>
  );
}

function LangToggle({ lang, onToggle }: { lang: Lang; onToggle: () => void }) {
  return (
    <button
      onClick={onToggle}
      className="shrink-0 rounded-full border-2 border-white/90 bg-white px-3 py-[6px] text-[16px] font-extrabold text-[#991B1B] no-underline shadow-[0_2px_0_#5d0f0f] transition-colors hover:bg-[#fff4c4]"
      aria-label="Switch language"
    >
      <span className="flex items-center gap-2">
        <LanguageFlagIcon lang={lang} />
        <span>{lang === "vi" ? "VN" : "EN"}</span>
      </span>
    </button>
  );
}

function DesktopNav({ submenus, pathname }: { submenus: HeaderSubmenus; pathname: string }) {
  const { t } = useLanguage();
  return (
    <div className="hidden min-w-0 items-center gap-[clamp(2px,0.45vw,12px)] xl:flex" data-name="List">
      {navItems.map((item) => {
        const menuLinks = item.submenu ? submenus[item.submenu] : [];
        const isActive = item.submenu
          ? pathname === item.href || pathname.startsWith(`${item.href}/`)
          : pathname === item.href;

        return (
          <div key={item.href} className="group relative">
            <Link
              href={item.href}
              className={`block whitespace-nowrap rounded-full border border-dashed px-[clamp(9px,0.72vw,16px)] py-[clamp(5px,0.36vw,7px)] text-[clamp(16px,0.98vw,19px)] font-semibold no-underline transition-colors duration-150 hover:border-white hover:bg-white hover:text-[#991B1B] group-focus-within:border-white group-focus-within:bg-white group-focus-within:text-[#991B1B] ${
                isActive
                  ? "border-white bg-white text-[#991B1B]"
                  : "border-transparent text-white"
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
                      className="block rounded-[10px] px-3 py-2 text-[#620000] no-underline hover:bg-[#fff1f1] hover:text-[#991B1B]"
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
                    className="block rounded-[10px] px-3 py-2 text-[14px] font-extrabold text-[#991B1B] no-underline hover:bg-[#fff1f1]"
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

function MobileMenu({ open, pathname, onClose }: { open: boolean; pathname: string; onClose: () => void }) {
  const { t } = useLanguage();
  return (
    <div className={`pointer-events-auto overflow-hidden bg-[#991B1B] transition-all duration-300 ease-in-out xl:hidden ${open ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"}`}>
      <nav className="flex flex-col gap-1 border-t border-white/15 px-4 pb-4 pt-3">
        {[...navItems, { href: "/lien-he", labelKey: "nav.register" }].map((item) => {
          const isActive =
            item.href === "/lien-he"
              ? pathname === item.href
              : pathname === item.href || pathname.startsWith(`${item.href}/`);

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className={`rounded-xl border px-4 py-2.5 text-[16px] font-semibold no-underline transition-colors hover:bg-white hover:text-[#991B1B] ${
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
                href: `/chuong-trinh-hoc/${item.slug}`,
                label: item.name,
                description: item.age,
              }))
            : [],
          curriculum: Array.isArray(curriculumData.tracks)
            ? curriculumData.tracks.map((item: { slug: string; title: string; category?: string }) => ({
                href: `/cuoc-song-tai-princeton/${item.slug}`,
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
      <div className="sticky top-0 z-50 flex items-center justify-between gap-4 bg-[#991B1B] px-[clamp(16px,3.35vw,64px)] py-[4px] shadow-[0_4px_18px_rgba(65,0,0,0.22)] pointer-events-auto">
        <Logo />
        <DesktopNav submenus={submenus} pathname={pathname} />
        <div className="flex shrink-0 items-center gap-[clamp(8px,0.65vw,12px)]">
          <LangToggle lang={lang} onToggle={() => setLang(lang === "vi" ? "en" : "vi")} />
          <RegisterButton />
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex size-10 shrink-0 items-center justify-center rounded-full border border-white/90 bg-white text-[#991B1B] xl:hidden"
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
      <MobileMenu open={menuOpen} pathname={pathname} onClose={() => setMenuOpen(false)} />
    </div>
  );
}
