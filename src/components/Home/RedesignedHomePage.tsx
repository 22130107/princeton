"use client";

import { useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import Link from "next/link";
import {
  ArrowRight,
  BookOpenCheck,
  CalendarDays,
  CheckCircle2,
  MapPin,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import HeaderSection from "@/components/Home/sections/HeaderSection";
import EnrollmentLeadForm from "@/components/Shared/EnrollmentLeadForm";
import { useLanguage } from "@/components/Shared/LanguageProvider";
import { classPrograms } from "@/data/classPrograms";
import { teachingMethods } from "@/data/teachingMethods";
import { campuses, campusMapLink } from "@/lib/campuses";
import heroImage from "@/assets/eb701c1db54fe5a3e821c062e1706ea59a24b8ab.png";
import heroDetailImage from "@/assets/eca0f00994a6add059898b0052a18055c5e2de11.jpg";
import momentImage from "@/assets/1785508275307_2464196110406402971_2464196110406402971_908152b1927fedcdd7fc0a83d44529f3.jpg";
import classroomImage from "@/assets/1785508529300_2464196110406402971_2464196110406402971_25128eb7cb84732ea220149bbf388309.jpg";
import logo from "@/assets/logo3.png";

type TeachingMethodItem = {
  id?: number;
  slug?: string;
  title: string;
  titleEn?: string;
  description: string;
  descriptionEn?: string;
  imageUrl: string;
  imageAlt?: string;
};

type ClassProgramItem = {
  slug: string;
  name: string;
  age?: string;
  label?: string;
  excerpt?: string;
  imageUrl?: string;
  color?: string;
};

type GalleryImage = {
  id?: number;
  title: string;
  imageUrl: string;
  imageAlt?: string;
};

const shell =
  "mx-auto w-full max-w-[1320px] px-5 sm:px-8 lg:px-10";

const fallbackMethods: TeachingMethodItem[] = teachingMethods.slice(0, 4).map((method) => ({
  slug: method.slug,
  title: method.title,
  description: method.excerpt || method.description,
  imageUrl: method.image.src,
  imageAlt: method.title,
}));

const fallbackPrograms: ClassProgramItem[] = classPrograms.slice(0, 4).map((program) => ({
  slug: program.slug,
  name: program.name,
  age: program.age,
  excerpt: program.excerpt,
  imageUrl: program.image.src,
  color: program.color,
}));

const fallbackGallery: GalleryImage[] = [
  {
    title: "Princeton learning moment",
    imageUrl: heroDetailImage.src,
    imageAlt: "Children learning at Princeton Academy",
  },
  {
    title: "Creative classroom",
    imageUrl: momentImage.src,
    imageAlt: "Children joining a classroom activity",
  },
  {
    title: "School day",
    imageUrl: classroomImage.src,
    imageAlt: "Daily experience at Princeton Academy",
  },
];

function useHomepageData() {
  const [methods, setMethods] = useState<TeachingMethodItem[]>(fallbackMethods);
  const [programs, setPrograms] = useState<ClassProgramItem[]>(fallbackPrograms);
  const [gallery, setGallery] = useState<GalleryImage[]>(fallbackGallery);

  useEffect(() => {
    let alive = true;

    fetch("/api/teaching-methods")
      .then((response) => response.json())
      .then((data) => {
        if (!alive || !Array.isArray(data.methods)) return;
        const nextMethods = data.methods
          .slice(0, 4)
          .map((item: any) => ({
            id: item.id,
            slug: item.slug,
            title: item.title,
            titleEn: item.titleEn,
            description: item.excerpt || item.description,
            descriptionEn: item.excerptEn || item.descriptionEn,
            imageUrl: item.imageUrl,
            imageAlt: item.imageAlt || item.title,
          }))
          .filter((item: TeachingMethodItem) => item.title && item.description && item.imageUrl);
        if (nextMethods.length) setMethods(nextMethods);
      })
      .catch(() => undefined);

    fetch("/api/class-programs")
      .then((response) => response.json())
      .then((data) => {
        if (!alive || !Array.isArray(data.programs)) return;
        const nextPrograms = data.programs
          .slice(0, 4)
          .map((item: any, index: number) => ({
            slug: item.slug,
            name: item.name,
            age: item.age,
            label: item.label,
            excerpt: item.excerpt,
            imageUrl: item.imageUrl || fallbackPrograms[index]?.imageUrl,
            color: item.color || fallbackPrograms[index]?.color,
          }))
          .filter((item: ClassProgramItem) => item.slug && item.name);
        if (nextPrograms.length) setPrograms(nextPrograms);
      })
      .catch(() => undefined);

    fetch("/api/gallery-images")
      .then((response) => response.json())
      .then((data) => {
        if (!alive || !Array.isArray(data.images)) return;
        const nextGallery = data.images
          .slice(0, 6)
          .map((item: any) => ({
            id: item.id,
            title: item.title || item.imageAlt || "Princeton moment",
            imageUrl: item.imageUrl,
            imageAlt: item.imageAlt || item.title,
          }))
          .filter((item: GalleryImage) => item.imageUrl);
        if (nextGallery.length) setGallery(nextGallery);
      })
      .catch(() => undefined);

    return () => {
      alive = false;
    };
  }, []);

  return { methods, programs, gallery };
}

function SectionHeader({
  kicker,
  title,
  text,
}: {
  kicker?: string;
  title: string;
  text?: string;
}) {
  return (
    <div className="max-w-[760px]">
      {kicker ? (
        <p className="mb-3 text-[14px] font-extrabold uppercase tracking-[0.12em] text-[#b80000]">
          {kicker}
        </p>
      ) : null}
      <h2 className="text-balance text-[clamp(36px,4.1vw,64px)] font-extrabold leading-[0.96] text-[#420808]">
        {title}
      </h2>
      {text ? (
        <p className="mt-5 max-w-[65ch] text-[18px] font-medium leading-8 text-[#6f3129]">
          {text}
        </p>
      ) : null}
    </div>
  );
}

function CtaLink({
  href,
  children,
  variant = "primary",
}: {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary";
}) {
  const base =
    "inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-6 text-[16px] font-extrabold no-underline transition duration-200 focus:outline-none focus:ring-4 focus:ring-[#ffc300]/40 active:translate-y-0.5";
  const styles =
    variant === "primary"
      ? "bg-[#b80000] text-white shadow-[0_12px_30px_rgba(121,0,0,0.18)] hover:bg-[#8f0000]"
      : "border border-[#b80000]/25 bg-white text-[#620000] hover:border-[#b80000] hover:bg-[#fff5e0]";

  return (
    <Link href={href} className={`${base} ${styles}`}>
      <span>{children}</span>
      <ArrowRight aria-hidden className="size-4" strokeWidth={2.2} />
    </Link>
  );
}

function HeroSection() {
  const { t, lang } = useLanguage();
  const heroText =
    lang === "en"
      ? "A bilingual preschool where children build language, confidence and independence through purposeful play."
      : "Môi trường mầm non song ngữ nơi trẻ xây dựng ngôn ngữ, sự tự tin và khả năng tự lập qua trải nghiệm có chủ đích.";

  return (
    <section className="relative overflow-hidden bg-[#fffefa] pt-[132px]">
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_12%_16%,rgba(255,195,0,0.18),transparent_28%),radial-gradient(circle_at_82%_4%,rgba(184,0,0,0.10),transparent_26%)]" />
      <div className={`${shell} relative grid min-h-[calc(100dvh-36px)] items-center gap-12 pb-16 lg:grid-cols-[0.9fr_1.1fr] lg:pt-4`}>
        <div className="max-w-[650px]">
          <p className="mb-5 inline-flex rounded-full border border-[#b80000]/20 bg-white px-4 py-2 text-[14px] font-extrabold uppercase tracking-[0.12em] text-[#b80000]">
            {t("footer.slogan")}
          </p>
          <h1 className="text-balance text-[clamp(54px,7vw,106px)] font-extrabold leading-[0.9] text-[#420808]">
            Princeton Academy
          </h1>
          <p className="mt-7 max-w-[60ch] text-[20px] font-semibold leading-8 text-[#6f3129]">
            {heroText}
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <CtaLink href="/lien-he">{t("nav.register")}</CtaLink>
            <CtaLink href="/chuong-trinh-hoc" variant="secondary">
              {t("nav.classes")}
            </CtaLink>
          </div>
        </div>

        <div className="relative min-h-[560px]">
          <div className="absolute left-4 top-6 z-[2] hidden rounded-[22px] bg-white px-5 py-4 shadow-[0_18px_45px_rgba(78,20,12,0.13)] sm:block">
            <p className="text-[14px] font-extrabold uppercase tracking-[0.12em] text-[#b80000]">
              80-100% English
            </p>
            <p className="mt-1 text-[15px] font-bold text-[#6f3129]">9 early education subjects</p>
          </div>
          <div className="absolute bottom-8 right-0 z-[2] hidden max-w-[260px] rounded-[22px] bg-[#ffc300] px-5 py-4 text-[#620000] shadow-[0_20px_50px_rgba(119,56,0,0.16)] md:block">
            <p className="text-[34px] font-extrabold leading-none">10+</p>
            <p className="mt-2 text-[15px] font-bold leading-5">{t("about.stats.club")}</p>
          </div>
          <div className="ml-auto h-[530px] max-w-[720px] overflow-hidden rounded-[34px] bg-[#f7d3a0] shadow-[0_28px_80px_rgba(98,0,0,0.14)]">
            <img
              src={heroImage.src}
              alt="Princeton Academy campus life"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="absolute -bottom-6 left-0 h-[220px] w-[42%] min-w-[240px] overflow-hidden rounded-[28px] border-[10px] border-[#fffefa] bg-white shadow-[0_22px_55px_rgba(98,0,0,0.16)]">
            <img
              src={heroDetailImage.src}
              alt="Children learning in a bright classroom"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function TrustStrip() {
  const { t } = useLanguage();
  const stats = [
    { value: "10", label: t("about.stats.campus") },
    { value: "02", label: t("about.stats.language") },
    { value: "02", label: t("home.about.stats.curriculum") },
    { value: "30+", label: t("about.stats.event") },
  ];

  return (
    <section className="bg-[#fffefa] pb-16">
      <div className={shell}>
        <div className="grid overflow-hidden rounded-[28px] border border-[#ead6bf] bg-white shadow-[0_20px_70px_rgba(74,23,12,0.08)] md:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="border-b border-[#ead6bf] px-7 py-7 md:border-b-0 md:border-r last:border-r-0">
              <p className="text-[clamp(38px,4vw,58px)] font-extrabold leading-none text-[#b80000]">
                {stat.value}
              </p>
              <p className="mt-2 text-[16px] font-bold text-[#6f3129]">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function AboutSection() {
  const { t } = useLanguage();

  return (
    <section className="bg-[#f7f1df] py-24">
      <div className={`${shell} grid items-center gap-12 lg:grid-cols-[0.95fr_1.05fr]`}>
        <div className="relative">
          <div className="overflow-hidden rounded-[30px] bg-white shadow-[0_24px_70px_rgba(78,20,12,0.12)]">
            <img src={momentImage.src} alt={t("home.about.imageAlt")} className="h-[520px] w-full object-cover" />
          </div>
          <div className="absolute -right-5 -top-5 hidden size-[118px] rounded-[24px] bg-white p-3 shadow-[0_18px_42px_rgba(78,20,12,0.13)] sm:block">
            <img src={logo.src} alt="Princeton Academy" className="h-full w-full object-contain" />
          </div>
        </div>
        <div>
          <SectionHeader
            kicker={t("about.badge")}
            title={t("home.about.title")}
          />
          <div className="mt-7 space-y-5 text-[18px] font-medium leading-8 text-[#6f3129]">
            <p>
              <strong className="font-extrabold text-[#420808]">Princeton Academy</strong>
              {t("home.about.text1.a")}
              <strong className="font-extrabold text-[#420808]">{t("home.about.text1.b")}</strong>
              {t("home.about.text1.c")}
              <strong className="font-extrabold text-[#420808]">{t("home.about.text1.d")}</strong>
              {t("home.about.text1.e")}
            </p>
            <p>
              {t("home.about.text2.a")}
              <strong className="font-extrabold text-[#420808]">{t("home.about.text2.b")}</strong>
              {t("home.about.text2.c")}
              <strong className="font-extrabold text-[#420808]">{t("home.about.text2.d")}</strong>
              {t("home.about.text2.e")}
              <strong className="font-extrabold text-[#420808]">{t("home.about.text2.f")}</strong>.
            </p>
          </div>
          <div className="mt-9">
            <CtaLink href="/ket-noi-gia-dinh" variant="secondary">
              {t("home.readMore")}
            </CtaLink>
          </div>
        </div>
      </div>
    </section>
  );
}

function ProgramSection({ programs }: { programs: ClassProgramItem[] }) {
  const { t } = useLanguage();

  return (
    <section className="bg-[#fffefa] py-24">
      <div className={shell}>
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeader title={t("classes.heroTitle")} text={t("classes.heroText")} />
          <div className="shrink-0">
            <CtaLink href="/chuong-trinh-hoc" variant="secondary">
              {t("nav.viewAll")}
            </CtaLink>
          </div>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {programs.map((program, index) => (
            <Link
              href={`/chuong-trinh-hoc/${program.slug}`}
              key={program.slug}
              className="group flex min-h-[430px] flex-col overflow-hidden rounded-[28px] bg-white text-[#420808] no-underline shadow-[0_18px_55px_rgba(74,23,12,0.08)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_26px_70px_rgba(74,23,12,0.13)]"
            >
              <div className="relative h-[230px] overflow-hidden" style={{ backgroundColor: program.color || "#fff1cf" }}>
                {program.imageUrl ? (
                  <img
                    src={program.imageUrl}
                    alt={program.name}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.04]"
                  />
                ) : null}
                <span className="absolute left-4 top-4 rounded-full bg-white px-3 py-1 text-[13px] font-extrabold text-[#b80000]">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>
              <div className="flex flex-1 flex-col p-6">
                <p className="text-[14px] font-extrabold uppercase tracking-[0.08em] text-[#b80000]">
                  {program.age}
                </p>
                <h3 className="mt-2 text-[30px] font-extrabold leading-none">{program.name}</h3>
                <p className="mt-4 line-clamp-4 text-[16px] font-medium leading-7 text-[#6f3129]">
                  {program.excerpt || program.label}
                </p>
                <span className="mt-auto inline-flex items-center gap-2 pt-6 text-[15px] font-extrabold text-[#b80000]">
                  {t("curriculum.viewDetail")}
                  <ArrowRight aria-hidden className="size-4 transition group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function MethodsSection({ methods }: { methods: TeachingMethodItem[] }) {
  const { t, lang } = useLanguage();
  const icons = [BookOpenCheck, ShieldCheck, Sparkles, CheckCircle2];

  return (
    <section className="bg-[#f4d06f] py-24">
      <div className={`${shell} grid gap-12 lg:grid-cols-[0.82fr_1.18fr]`}>
        <div>
          <SectionHeader title={t("home.program.title")} text={t("home.program.text")} />
          <div className="mt-8">
            <CtaLink href="/con-duong-princeton">{t("home.readMore")}</CtaLink>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {methods.map((method, index) => {
            const Icon = icons[index % icons.length];
            const title = lang === "en" && method.titleEn ? method.titleEn : method.title;
            const description =
              lang === "en" && method.descriptionEn ? method.descriptionEn : method.description;
            return (
              <article key={`${method.id ?? method.slug ?? title}-${index}`} className="rounded-[24px] bg-[#fffefa] p-5 shadow-[0_18px_50px_rgba(98,0,0,0.10)]">
                <div className="flex items-start gap-4">
                  <div className="grid size-12 shrink-0 place-items-center rounded-[16px] bg-[#b80000] text-white">
                    <Icon aria-hidden className="size-6" strokeWidth={2} />
                  </div>
                  <div>
                    <h3 className="text-[24px] font-extrabold leading-[1.05] text-[#420808]">{title}</h3>
                    <p className="mt-3 text-[16px] font-medium leading-7 text-[#6f3129]">{description}</p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function LifeSection({ gallery }: { gallery: GalleryImage[] }) {
  const { t } = useLanguage();
  const visibleGallery = useMemo(() => gallery.slice(0, 5), [gallery]);

  return (
    <section className="bg-[#fffefa] py-24">
      <div className={shell}>
        <SectionHeader title={t("home.curriculum.title")} text={t("curriculum.heroText")} />
        <div className="mt-12 grid auto-rows-[220px] gap-5 md:grid-cols-4">
          {visibleGallery.map((image, index) => (
            <div
              key={`${image.id ?? image.imageUrl}-${index}`}
              className={[
                "overflow-hidden rounded-[28px] bg-[#f7f1df] shadow-[0_18px_55px_rgba(74,23,12,0.08)]",
                index === 0 ? "md:col-span-2 md:row-span-2" : "",
                index === 3 ? "md:col-span-2" : "",
              ].join(" ")}
            >
              <img
                src={image.imageUrl}
                alt={image.imageAlt || image.title}
                className="h-full w-full object-cover transition duration-500 hover:scale-[1.03]"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CampusSection() {
  const { t, lang } = useLanguage();
  const [selected, setSelected] = useState(0);
  const campus = campuses[selected] ?? campuses[0];
  const isEn = lang === "en";
  const campusName = isEn ? campus.nameEn || campus.name : campus.name;
  const campusAddress = isEn ? campus.addressEn || campus.address : campus.address;

  return (
    <section className="bg-[#f7f1df] py-24">
      <div className={`${shell} grid gap-10 lg:grid-cols-[0.9fr_1.1fr]`}>
        <div>
          <SectionHeader title={t("home.campus.title")} text={t("home.campus.text")} />
          <div className="mt-8 space-y-3">
            {campuses.map((item, index) => {
              const active = index === selected;
              return (
                <button
                  key={item.slug}
                  type="button"
                  onClick={() => setSelected(index)}
                  className={[
                    "w-full rounded-[20px] border p-5 text-left transition duration-200 focus:outline-none focus:ring-4 focus:ring-[#ffc300]/40",
                    active
                      ? "border-[#b80000] bg-white shadow-[0_14px_35px_rgba(98,0,0,0.10)]"
                      : "border-[#ead6bf] bg-[#fffefa] hover:border-[#b80000]/45",
                  ].join(" ")}
                >
                  <span className="block text-[20px] font-extrabold leading-6 text-[#420808]">
                    {isEn ? item.nameEn || item.name : item.name}
                  </span>
                  <span className="mt-2 block text-[15px] font-medium leading-6 text-[#6f3129]">
                    {isEn ? item.addressEn || item.address : item.address}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
        <div className="rounded-[30px] bg-white p-6 shadow-[0_24px_70px_rgba(74,23,12,0.10)]">
          <div className="flex min-h-[520px] flex-col justify-between rounded-[24px] bg-[#fffefa] p-8">
            <div>
              <div className="grid size-14 place-items-center rounded-[18px] bg-[#b80000] text-white">
                <MapPin aria-hidden className="size-7" />
              </div>
              <h3 className="mt-8 text-[clamp(34px,4vw,58px)] font-extrabold leading-none text-[#420808]">
                {campusName}
              </h3>
              <p className="mt-5 max-w-[46ch] text-[20px] font-medium leading-8 text-[#6f3129]">
                {campusAddress}
              </p>
            </div>
            <div className="mt-10 flex flex-wrap items-center gap-3">
              <a
                href={campusMapLink(campusAddress)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#b80000] px-6 text-[16px] font-extrabold text-white no-underline transition hover:bg-[#8f0000] focus:outline-none focus:ring-4 focus:ring-[#ffc300]/40 active:translate-y-0.5"
              >
                <MapPin aria-hidden className="size-4" />
                {t("home.campus.map")}
              </a>
              <CtaLink href="/lien-he" variant="secondary">
                {t("campus.visit")}
              </CtaLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function RegistrationCta() {
  const { t } = useLanguage();

  return (
    <section className="bg-[#fffefa] py-24">
      <div className={`${shell} grid gap-8 lg:grid-cols-[0.95fr_1.05fr]`}>
        <div className="rounded-[30px] bg-[#b80000] p-8 text-white shadow-[0_26px_70px_rgba(98,0,0,0.18)] lg:p-12">
          <div className="grid size-14 place-items-center rounded-[18px] bg-[#ffc300] text-[#620000]">
            <CalendarDays aria-hidden className="size-7" />
          </div>
          <h2 className="mt-8 max-w-[760px] text-balance text-[clamp(38px,4.8vw,72px)] font-extrabold leading-[0.96]">
            {t("about.ctaTitle")}
          </h2>
          <p className="mt-6 max-w-[58ch] text-[19px] font-semibold leading-8 text-white/90">
            {t("about.ctaText")}
          </p>
        </div>
        <div className="rounded-[30px] border border-[#ead6bf] bg-white p-6 shadow-[0_20px_70px_rgba(74,23,12,0.08)] sm:p-8">
          <EnrollmentLeadForm variant="mobile" submitLabel={t("register.cta")} />
        </div>
      </div>
    </section>
  );
}

export default function RedesignedHomePage() {
  const { methods, programs, gallery } = useHomepageData();

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#fffefa] text-[#420808]">
      <div className="fixed inset-x-0 top-0 z-50 h-[99px]">
        <HeaderSection />
      </div>
      <main>
        <HeroSection />
        <TrustStrip />
        <AboutSection />
        <ProgramSection programs={programs} />
        <MethodsSection methods={methods} />
        <LifeSection gallery={gallery} />
        <CampusSection />
        <RegistrationCta />
      </main>
    </div>
  );
}
