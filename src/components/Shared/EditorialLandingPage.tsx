"use client";

import type { StaticImageData } from "next/image";
import Link from "next/link";
import HeaderSection from "@/components/Home/sections/HeaderSection";
import MobileHeader from "@/components/Mobile/MobileHeader";
import SiteFooter from "@/components/Shared/SiteFooter";
import { useLanguage } from "@/components/Shared/LanguageProvider";
import { mediaImage } from "@/lib/media-url";
import imgMascotPenguin from "@/assets/7418d3b6d509d03b45710cdbc11e6c298f5a9959.png";
import imgMascotWombat from "@/assets/3dc1ce007304dd7c637e9e4c763ad7fda6021a35.png";

const imgMascotKoala = mediaImage("d088645c54f44b84375f6cb56aeabe8e06bc006b.png");
const imgMascotKangaroo = mediaImage("d0268a1bfec279b63f5d3717d847ff89893ec9a7.png");

type Post = {
  title: string;
  excerpt: string;
  image: StaticImageData;
  category: string;
  date: string;
};

type EditorialLandingPageProps = {
  eyebrow: string;
  title: string;
  description: string;
  heroImage: StaticImageData;
  featured: Post;
  posts: Post[];
  introTitle: string;
  introText: string;
};

const mascots = [imgMascotPenguin, imgMascotKoala, imgMascotWombat, imgMascotKangaroo];

export default function EditorialLandingPage({
  eyebrow,
  title,
  description,
  heroImage,
  featured,
  posts,
  introTitle,
  introText,
}: EditorialLandingPageProps) {
  const { t } = useLanguage();
  return (
    <main className="min-h-screen overflow-hidden bg-[#fffefa] pt-[64px] text-[#620000] md:pt-[99px]">
      <div className="md:hidden">
        <MobileHeader />
      </div>
      <div className="fixed inset-x-0 top-0 z-50 hidden h-[99px] md:block">
        <HeaderSection />
      </div>

      <section className="relative bg-[#e8f3e6] px-4 pb-12 pt-8 md:px-10 md:pb-18 md:pt-14">
        <div className="mx-auto grid max-w-[1240px] items-center gap-8 md:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="mb-3 inline-flex rounded-full border border-[#b80000] bg-white px-4 py-2 text-[14px] font-bold uppercase text-[#b80000]">
              {eyebrow}
            </p>
            <h1 className="max-w-[760px] text-[38px] font-extrabold uppercase leading-[1.06] text-[#991B1B] md:text-[60px]">
              {title}
            </h1>
            <p className="mt-5 max-w-[660px] text-[16px] font-medium leading-7 md:text-[20px] md:leading-8">
              {description}
            </p>
          </div>

          <div className="rounded-[30px] border-2 border-[#620000] bg-[#fffefa] p-2 shadow-[8px_8px_0_rgba(98,0,0,0.18)]">
            <img
              src={heroImage.src}
              alt={title}
              className="h-[300px] w-full rounded-[24px] object-cover md:h-[500px]"
            />
          </div>
        </div>
      </section>

      <section className="bg-[#fffefa] px-4 py-12 md:px-10 md:py-18">
        <div className="mx-auto grid max-w-[1180px] gap-6 md:grid-cols-[0.92fr_1.08fr]">
          <article className="relative overflow-hidden rounded-[32px] bg-[#b80000] p-3 text-white shadow-[6px_6px_0_rgba(98,0,0,0.18)]">
            <img src={featured.image.src} alt={featured.title} className="h-[260px] w-full rounded-[24px] object-cover md:h-[430px]" />
            <div className="p-5">
              <p className="text-[14px] font-bold uppercase text-[#ffc300]">
                {featured.category} · {featured.date}
              </p>
              <h2 className="mt-3 text-[28px] font-extrabold leading-tight md:text-[40px]">
                {featured.title}
              </h2>
              <p className="mt-4 text-[16px] font-medium leading-7 text-white/92">
                {featured.excerpt}
              </p>
            </div>
          </article>

          <div className="rounded-[32px] bg-[#fff1f1] p-6 md:p-8">
            <h2 className="text-[30px] font-extrabold uppercase leading-tight text-[#991B1B] md:text-[46px]">
              {introTitle}
            </h2>
            <p className="mt-5 text-[16px] font-medium leading-7 md:text-[19px] md:leading-8">
              {introText}
            </p>
            <div className="mt-7 grid grid-cols-2 gap-4">
              {mascots.map((mascot, index) => (
                <div key={index} className="rounded-[28px] border border-dashed border-[#b80000]/45 bg-[#fffefa] p-4 text-center">
                  <img src={mascot.src} alt="" className="mx-auto h-16 w-16 object-contain" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="relative bg-[#F7F4F2]">
        <div className="mx-auto max-w-[1180px] px-4 py-12 md:px-10 md:py-16">
          <h2 className="text-center text-[30px] font-extrabold uppercase leading-tight text-[#991B1B] md:text-[52px]">
            {t("editorial.newPosts")}
          </h2>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {posts.map((post, index) => (
              <article
                key={post.title}
                className={[
                  "relative overflow-hidden border border-[#b80000] bg-[#fffefa] shadow-[4px_4px_0_rgba(98,0,0,0.18)]",
                  index === 0 ? "rounded-[28px_72px_28px_72px]" : "",
                  index === 1 ? "rounded-[72px_28px_72px_28px]" : "",
                  index === 2 ? "rounded-[34px]" : "",
                ].join(" ")}
              >
                <img src={post.image.src} alt={post.title} className="h-[190px] w-full object-cover" />
                <div className="p-5">
                  <p className="text-[13px] font-bold uppercase text-[#b80000]">
                    {post.category} · {post.date}
                  </p>
                  <h3 className="mt-3 text-[22px] font-extrabold leading-tight text-[#991B1B]">
                    {post.title}
                  </h3>
                  <p className="mt-3 text-[15px] font-medium leading-6">
                    {post.excerpt}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#fffefa] px-4 py-12 md:px-10 md:py-16">
        <div className="mx-auto flex max-w-[1080px] flex-col items-center rounded-[32px] bg-[#b80000] p-8 text-center text-white md:p-12">
          <h2 className="max-w-[760px] text-[30px] font-extrabold uppercase leading-tight md:text-[48px]">
            {t("editorial.ctaTitle")}
          </h2>
          <p className="mt-4 max-w-[760px] text-[16px] font-medium leading-7 text-white/92 md:text-[19px]">
            {t("editorial.ctaText")}
          </p>
          <Link
            href="/dang-ky"
            className="mt-7 rounded-full bg-[#ffc300] px-7 py-4 text-[17px] font-extrabold uppercase text-[#b80000] no-underline shadow-[0_4px_0_#800000]"
          >
            {t("editorial.ctaButton")}
          </Link>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
