import type { Metadata } from "next";
import Link from "next/link";
import HeaderSection from "@/components/Home/sections/HeaderSection";
import MobileHeader from "@/components/Mobile/MobileHeader";
import FacilityCarousel from "@/components/Shared/FacilityCarousel";
import SiteFooter from "@/components/Shared/SiteFooter";
import { CoverImage } from "@/components/Shared/CoverImage";
import { getAboutContent } from "@/lib/content";
import { mediaImage } from "@/lib/media-url";
import imgHero from "@/assets/1785508275307_2464196110406402971_2464196110406402971_908152b1927fedcdd7fc0a83d44529f3.jpg";
import imgMascotPenguin from "@/assets/7418d3b6d509d03b45710cdbc11e6c298f5a9959.png";
import imgMascotWombat from "@/assets/3dc1ce007304dd7c637e9e4c763ad7fda6021a35.png";
import imgFloatStar from "@/assets/ca5376ce92d1f2dc22b4ce037286566eecbabbfd.png";
import imgFloatPencil from "@/assets/8be1034309901c74e010831c2ccb706a7d4de7c5.png";
import imgFloatCornerA from "@/assets/e2e0d53776626afcb6870acda5507843a053b4ae.png";
import imgFloatCornerB from "@/assets/45e9cd713cd022e324337d1e9a3d1f01c8086db4.png";

const imgMascotKoala = mediaImage("d088645c54f44b84375f6cb56aeabe8e06bc006b.png");
const imgMascotKangaroo = mediaImage("d0268a1bfec279b63f5d3717d847ff89893ec9a7.png");

const sectionColors = {
  surface: "#fffefa",
  facility: "#ffe27a",
  moments: "#bdeffc",
  teachers: "#fff1f1",
};

export const metadata: Metadata = {
  title: "Giới Thiệu | Trường Mầm non Princeton",
  description:
    "Trường Mầm non Princeton mang đến môi trường giáo dục mầm non hiện đại, yêu thương và giàu trải nghiệm cho trẻ.",
  openGraph: {
    title: "Giới Thiệu | Trường Mầm non Princeton",
    description:
      "Khám phá môi trường học tập, chương trình giáo dục và hành trình phát triển tại Trường Mầm non Princeton.",
  },
};

export const dynamic = "force-dynamic";

const stats = [
  { number: "02", label: "Cơ sở", icon: imgMascotPenguin, shape: "circle", color: "#fff2f2" },
  { number: "02", label: "Ngôn ngữ", icon: imgMascotWombat, shape: "sun", color: "#fff4c4" },
  { number: "10+", label: "Câu lạc bộ", icon: imgMascotKoala, shape: "square", color: "#dcf6d6" },
  { number: "30+", label: "Sự kiện", icon: imgMascotKangaroo, shape: "triangle", color: "#d8f7ff" },
];

const shapeClass: Record<string, string> = {
  circle: "rounded-full aspect-square",
  square: "rounded-[18px]",
  sun: "rounded-[32px]",
  triangle: "[clip-path:polygon(50%_0%,100%_100%,0%_100%)]",
  flower: "[clip-path:polygon(50%_0%,61%_16%,80%_9%,78%_30%,98%_39%,82%_52%,91%_72%,70%_73%,61%_93%,50%_77%,39%_93%,30%_73%,9%_72%,18%_52%,2%_39%,22%_30%,20%_9%,39%_16%)]",
  moon: "rounded-full",
};

const floatingDecorations = [
  {
    img: imgFloatStar,
    className: "left-[5%] top-[18%] h-14 w-14 md:h-20 md:w-20",
    duration: "5.8s",
    delay: "0s",
    rotate: "rotate-[-12deg]",
  },
  {
    img: imgFloatPencil,
    className: "right-[7%] top-[32%] h-16 w-16 md:h-24 md:w-24",
    duration: "6.6s",
    delay: "-1.4s",
    rotate: "rotate-[10deg]",
  },
  {
    img: imgFloatCornerA,
    className: "left-[3%] top-[58%] h-16 w-16 md:h-24 md:w-24",
    duration: "7.2s",
    delay: "-2.2s",
    rotate: "rotate-[8deg]",
  },
  {
    img: imgFloatCornerB,
    className: "right-[4%] top-[76%] h-14 w-14 md:h-20 md:w-20",
    duration: "6.1s",
    delay: "-3s",
    rotate: "rotate-[-8deg]",
  },
  {
    img: imgFloatStar,
    className: "right-[18%] top-[12%] hidden h-12 w-12 md:block",
    duration: "5.4s",
    delay: "-2.8s",
    rotate: "rotate-[18deg]",
  },
  {
    img: imgFloatPencil,
    className: "left-[14%] top-[84%] hidden h-16 w-16 md:block",
    duration: "7.8s",
    delay: "-1.8s",
    rotate: "rotate-[-18deg]",
  },
];

function FloatingDecorations() {
  return (
    <div className="pointer-events-none absolute inset-0 z-[1] overflow-hidden">
      {floatingDecorations.map((item, index) => (
        <img
          key={index}
          src={item.img.src}
          alt=""
          className={`absolute object-contain opacity-80 ${item.className} ${item.rotate}`}
          style={{
            animation: `about-floating-sway ${item.duration} ease-in-out infinite`,
            animationDelay: item.delay,
          }}
        />
      ))}
    </div>
  );
}

function assetSrc(image: { src: string } | string) {
  return typeof image === "string" ? image : image.src;
}

function WaveDivider({ from, to }: { from: string; to: string }) {
  return (
    <div aria-hidden className="relative h-[46px] overflow-hidden" style={{ backgroundColor: to }}>
      <svg className="block h-full w-full" viewBox="0 0 1440 80" preserveAspectRatio="none">
        <path
          fill={from}
          d="M0 0H1440V37C1400 58 1360 58 1320 37C1280 16 1240 16 1200 37C1160 58 1120 58 1080 37C1040 16 1000 16 960 37C920 58 880 58 840 37C800 16 760 16 720 37C680 58 640 58 600 37C560 16 520 16 480 37C440 58 400 58 360 37C320 16 280 16 240 37C200 58 160 58 120 37C80 16 40 16 0 37V0Z"
        />
      </svg>
    </div>
  );
}

export default async function GioiThieuPage() {
  const aboutContent = await getAboutContent();
  const facilitySlides = aboutContent.facilityImages.map((item) => ({
    image: item.imageUrl,
    title: item.title,
  }));
  const momentSlides = aboutContent.galleryImages.map((item, index) => ({
    image: item.url,
    title: item.title || item.alt || `Khoảnh khắc ${index + 1}`,
  }));
  const teachers = aboutContent.teacherTeamItems.map((item) => ({
    id: item.id,
    icon: item.imageUrl,
    title: item.title,
    text: item.description,
    coverPosition: item.coverPosition,
    coverZoom: item.coverZoom,
    shape: item.shape,
    color: item.color,
    rotate: item.rotate,
  }));

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#fffefa] pt-[64px] text-[#620000] md:pt-[99px]">
      <style>{`
        @keyframes about-floating-sway {
          0%, 100% { translate: 0 0; }
          50% { translate: 0 -14px; }
        }
      `}</style>
      <FloatingDecorations />
      <div className="md:hidden">
        <MobileHeader />
      </div>
      <div className="fixed inset-x-0 top-0 z-50 hidden h-[99px] md:block">
        <HeaderSection />
      </div>

      <section className="relative bg-[#e8f3e6] px-4 pb-12 pt-8 md:px-10 md:pb-20 md:pt-14">
        <div className="mx-auto grid max-w-[1240px] items-center gap-8 md:grid-cols-[0.95fr_1.05fr]">
          <div>
            <p className="mb-3 inline-flex rounded-full border border-[#b80000] bg-white px-4 py-2 text-[14px] font-bold uppercase text-[#b80000]">
              Về Princeton
            </p>
            <h1 className="text-[34px] font-extrabold uppercase leading-[1.05] md:text-[56px]">
              Giáo dục không chỉ cho lớp một, giáo dục là cho cả cuộc đời
            </h1>
            <p className="mt-5 max-w-[680px] text-[16px] font-medium leading-7 text-[#620000] md:text-[20px] md:leading-8">
              Chúng tôi không đúc khuôn hay lấp đầy kiến thức, mà nuôi dưỡng sự tò mò và nội lực tự thân để mỗi đứa trẻ được lớn lên theo đúng nhịp độ phát triển rực rỡ nhất của chính mình.
            </p>
          </div>

          <div className="relative">
            <img
              src={imgMascotPenguin.src}
              alt=""
              className="absolute -left-3 -top-6 z-[2] h-20 w-20 object-contain md:-left-8 md:h-28 md:w-28"
            />
            <div className="rounded-[28px] border-2 border-[#620000] bg-[#fffefa] p-2 shadow-[8px_8px_0_rgba(98,0,0,0.2)] md:rounded-[40px]">
              <img
                src={imgHero.src}
                alt="Không gian học tập tại Trường Mầm non Princeton"
                className="h-[300px] w-full rounded-[22px] object-cover md:h-[520px] md:rounded-[32px]"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#fffefa] px-4 py-10 md:px-10 md:py-16">
        <div className="mx-auto grid max-w-[1160px] gap-6 md:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className={`relative flex min-h-[190px] flex-col items-center justify-center px-6 py-8 text-center shadow-[0_8px_20px_rgba(98,0,0,0.08)] ${shapeClass[stat.shape]}`}
              style={{ backgroundColor: stat.color }}
            >
              {stat.shape === "sun" ? (
                <div
                  aria-hidden
                  className="absolute inset-[-10px] -z-10 bg-[#ffc107]"
                  style={{
                    clipPath:
                      "polygon(50% 0%,57% 15%,72% 7%,73% 24%,90% 20%,82% 36%,100% 50%,82% 64%,90% 80%,73% 76%,72% 93%,57% 85%,50% 100%,43% 85%,28% 93%,27% 76%,10% 80%,18% 64%,0% 50%,18% 36%,10% 20%,27% 24%,28% 7%,43% 15%)",
                  }}
                />
              ) : null}
              {stat.shape === "triangle" ? (
                <svg
                  aria-hidden
                  className="absolute inset-2 size-[calc(100%-16px)]"
                  viewBox="0 0 100 100"
                  preserveAspectRatio="none"
                >
                  <polygon
                    points="50,2 98,98 2,98"
                    fill="none"
                    stroke="#b80000"
                    strokeOpacity="0.4"
                    strokeWidth="1"
                    strokeDasharray="2 3"
                    vectorEffect="non-scaling-stroke"
                  />
                </svg>
              ) : (
                <div className="absolute inset-2 rounded-[inherit] border border-dashed border-[#b80000]/35" />
              )}
              <img
                src={stat.icon.src}
                alt=""
                className="relative mx-auto mb-3 h-16 w-16 object-contain"
              />
              <p className="relative text-[44px] font-extrabold leading-none text-[#b32025] md:text-[56px]">{stat.number}</p>
              <p className="relative mt-3 text-[18px] font-bold">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {facilitySlides.length ? (
        <>
        <WaveDivider from={sectionColors.surface} to={sectionColors.facility} />
        <section className="relative bg-[#ffe27a]">
          <div className="mx-auto grid max-w-[1240px] gap-8 px-4 py-12 md:grid-cols-2 md:px-10 md:py-20">
            <FacilityCarousel slides={facilitySlides} />
            <div className="flex flex-col justify-center">
              <img
                src={imgMascotKangaroo.src}
                alt=""
                className="mb-4 h-20 w-20 object-contain"
              />
              <h2 className="text-[30px] font-extrabold uppercase leading-tight md:text-[48px]">
                Cơ sở vật chất an toàn và giàu trải nghiệm
              </h2>
              <p className="mt-5 text-[16px] font-medium leading-7 md:text-[20px] md:leading-8">
                Không gian học tập, vận động và vui chơi được thiết kế sáng sủa, gần gũi và phù hợp với lứa tuổi mầm non, giúp trẻ thoải mái khám phá mỗi ngày.
              </p>
            </div>
          </div>
        </section>
        <WaveDivider
          from={sectionColors.facility}
          to={momentSlides.length ? sectionColors.moments : teachers.length ? sectionColors.teachers : sectionColors.surface}
        />
        </>
      ) : null}

      {momentSlides.length ? (
        <>
        {!facilitySlides.length ? <WaveDivider from={sectionColors.surface} to={sectionColors.moments} /> : null}
        <section className="relative bg-[#bdeffc]">
          <div className="mx-auto grid max-w-[1240px] gap-8 px-4 py-12 md:grid-cols-2 md:px-10 md:py-20">
            <div className="order-2 flex flex-col justify-center md:order-1">
              <img
                src={imgMascotWombat.src}
                alt=""
                className="mb-4 h-20 w-20 object-contain"
              />
              <h2 className="text-[30px] font-extrabold uppercase leading-tight md:text-[48px]">
                Khoảnh khắc đáng nhớ tại Princeton
              </h2>
              <p className="mt-5 text-[16px] font-medium leading-7 md:text-[20px] md:leading-8">
                Những hình ảnh học tập, vui chơi và trải nghiệm mỗi ngày giúp ba mẹ nhìn thấy con tự tin hơn, mạnh dạn hơn và lớn lên trong môi trường đầy yêu thương.
              </p>
            </div>
            <div className="order-1 md:order-2">
              <FacilityCarousel slides={momentSlides} imageContext="khoảnh khắc Princeton" />
            </div>
          </div>
        </section>
        <WaveDivider from={sectionColors.moments} to={teachers.length ? sectionColors.teachers : sectionColors.surface} />
        </>
      ) : null}

      {teachers.length ? (
        <>
        {!facilitySlides.length && !momentSlides.length ? (
          <WaveDivider from={sectionColors.surface} to={sectionColors.teachers} />
        ) : null}
        <section className="bg-[#fff1f1] px-4 py-12 md:px-10 md:py-20">
          <div className="mx-auto max-w-[1180px]">
            <h2 className="max-w-[760px] text-[30px] font-extrabold uppercase leading-tight md:text-[52px]">
              Đội ngũ giảng viên tận tâm
            </h2>
            <p className="mt-4 max-w-[760px] text-[16px] font-medium leading-7 md:text-[19px] md:leading-8">
              Mỗi thầy cô tại Princeton cùng phối hợp để trẻ được chăm sóc, học tập và phát triển trong môi trường yêu thương, an toàn và giàu trải nghiệm.
            </p>
            <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {teachers.map((value, index) => (
                <article
                  key={`teacher-${value.id}-${index}`}
                  className={`relative flex min-h-[280px] flex-col overflow-hidden border border-[#b80000] bg-[#fffefa] shadow-[4px_4px_0_rgba(184,0,0,0.18)] ${value.shape} ${value.rotate}`}
                  style={{ backgroundColor: value.color }}
                >
                  {value.icon ? (
                    <div className="relative h-[190px] shrink-0 overflow-hidden md:h-[220px]">
                      <CoverImage
                        src={assetSrc(value.icon)}
                        alt=""
                        zoom={value.coverZoom}
                        position={value.coverPosition}
                        frameAspect={1.75}
                      />
                    </div>
                  ) : null}
                  <div className="relative flex flex-1 flex-col p-6">
                    <div className="pointer-events-none absolute inset-2 rounded-[inherit] border border-dashed border-[#b80000]/30" />
                    <h3 className="text-[22px] font-extrabold leading-tight">{value.title}</h3>
                    <p className="mt-4 text-[16px] font-medium leading-7 text-[#620000]">{value.text}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
        <WaveDivider from={sectionColors.teachers} to={sectionColors.surface} />
        </>
      ) : null}

      <section className="bg-[#fffefa] px-4 py-12 md:px-10 md:py-20">
        <div className="mx-auto grid max-w-[1240px] gap-6 md:grid-cols-[1fr_0.85fr]">
          <div className="overflow-hidden rounded-[32px] bg-[#fffefa]">
            <iframe
              src="https://www.youtube.com/embed/T5pfrxobVtE?vq=hd720&rel=0"
              title="Video giới thiệu Trường Mầm non Princeton"
              className="h-[260px] w-full md:h-[420px]"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
          <div className="relative rounded-[32px] bg-[#b80000] p-8 text-white">
            <img src={imgMascotKoala.src} alt="" className="absolute -right-2 -top-8 h-24 w-24 object-contain" />
            <h2 className="max-w-[460px] text-[30px] font-extrabold uppercase leading-tight md:text-[44px]">
              Bắt đầu hành trình bằng sự thấu hiểu
            </h2>
            <p className="mt-5 text-[16px] font-medium leading-7 md:text-[19px]">
              Mời ba mẹ ghé thăm Princeton Academy để trực tiếp cảm nhận không gian học tập an toàn, gặp gỡ đội ngũ thầy cô tận tâm và cùng lắng nghe nhịp lớn lên hạnh phúc của con mỗi ngày.
            </p>
            <Link
              href="/dang-ky"
              className="mt-7 inline-flex rounded-full bg-[#ffc300] px-7 py-4 text-[17px] font-extrabold uppercase text-[#b80000] no-underline shadow-[0_4px_0_#800000]"
            >
              Đăng ký ngay
            </Link>
          </div>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
