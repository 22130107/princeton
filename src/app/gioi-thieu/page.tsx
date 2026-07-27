import type { Metadata } from "next";
import Link from "next/link";
import HeaderSection from "@/components/Home/sections/HeaderSection";
import MobileHeader from "@/components/Mobile/MobileHeader";
import FacilityCarousel from "@/components/Shared/FacilityCarousel";
import SiteFooter from "@/components/Shared/SiteFooter";
import imgHero from "@/assets/7152d23b5ad0228ac40827979cdce9d4dfc3a8fb.png";
import imgFacilityActivity from "@/assets/d7d7345887319e335a13681880e24de534f764ac.png";
import imgFacilityClassroom from "@/assets/2f18e7a31d31b9b85df3a6588823571bdaf40d53.png";
import imgFacilityWashroom from "@/assets/d39c1aff5a677c90942c7d65b7625cfdffcc35a1.png";
import imgFacilityGallery from "@/assets/d442605c9e1be0223245da5e9e29abf7ea1bef64.png";
import imgFacilityPlayground from "@/assets/7efd1e9d3acc8ad92010b05849be05d4e2943353.png";
import imgMascotPenguin from "@/assets/7418d3b6d509d03b45710cdbc11e6c298f5a9959.png";
import imgMascotKoala from "@/assets/d088645c54f44b84375f6cb56aeabe8e06bc006b.png";
import imgMascotWombat from "@/assets/3dc1ce007304dd7c637e9e4c763ad7fda6021a35.png";
import imgMascotKangaroo from "@/assets/d0268a1bfec279b63f5d3717d847ff89893ec9a7.png";
import imgZigzagTop from "@/assets/38d9a61e041eae8aa98304a4098248683a3a95d6.png";
import imgZigzagBottom from "@/assets/d698542361c4bd444dda74cab23735d3d9459bf4.png";
import imgFloatStar from "@/assets/ca5376ce92d1f2dc22b4ce037286566eecbabbfd.png";
import imgFloatPencil from "@/assets/8be1034309901c74e010831c2ccb706a7d4de7c5.png";
import imgFloatCornerA from "@/assets/e2e0d53776626afcb6870acda5507843a053b4ae.png";
import imgFloatCornerB from "@/assets/45e9cd713cd022e324337d1e9a3d1f01c8086db4.png";

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

const stats = [
  { number: "02", label: "Cơ sở", icon: imgMascotPenguin, shape: "circle", color: "#fff2f2" },
  { number: "02", label: "Ngôn ngữ", icon: imgMascotWombat, shape: "sun", color: "#fff4c4" },
  { number: "10+", label: "Câu lạc bộ", icon: imgMascotKoala, shape: "square", color: "#dcf6d6" },
  { number: "30+", label: "Sự kiện", icon: imgMascotKangaroo, shape: "triangle", color: "#d8f7ff" },
];

const teachers = [
  {
    icon: imgMascotKoala,
    title: "Giáo viên chủ nhiệm",
    text: "Theo sát nhịp sinh hoạt, cảm xúc và tiến bộ hằng ngày của từng bạn nhỏ.",
    shape: "rounded-[32px_72px_32px_72px]",
    color: "#fffefa",
    rotate: "-rotate-[1deg]",
  },
  {
    icon: imgMascotPenguin,
    title: "Giáo viên tiếng Anh",
    text: "Tạo môi trường giao tiếp gần gũi, giúp trẻ làm quen ngôn ngữ tự nhiên.",
    shape: "rounded-[72px_32px_72px_32px]",
    color: "#e1f7fb",
    rotate: "rotate-[1deg]",
  },
  {
    icon: imgMascotWombat,
    title: "Giáo viên vận động",
    text: "Thiết kế hoạt động thể chất phù hợp để trẻ khỏe mạnh, linh hoạt và tự tin.",
    shape: "rounded-[42px]",
    color: "#fff1cf",
    rotate: "-rotate-[0.5deg]",
  },
  {
    icon: imgMascotKangaroo,
    title: "Giáo viên nghệ thuật",
    text: "Khuyến khích trẻ thể hiện cảm xúc qua màu sắc, âm nhạc và hoạt động sáng tạo.",
    shape: "rounded-[64px_28px_64px_28px]",
    color: "#ffe0cf",
    rotate: "rotate-[0.8deg]",
  },
  {
    icon: imgMascotPenguin,
    title: "Cố vấn chương trình",
    text: "Đồng hành cùng giáo viên để xây dựng lộ trình học tập cân bằng và hiệu quả.",
    shape: "rounded-[28px_64px_28px_64px]",
    color: "#dcf6d6",
    rotate: "-rotate-[0.8deg]",
  },
  {
    icon: imgMascotKoala,
    title: "Đội ngũ chăm sóc",
    text: "Giữ nề nếp sinh hoạt an toàn, ấm áp và chu đáo trong từng khoảnh khắc ở trường.",
    shape: "rounded-[46px]",
    color: "#fff2f2",
    rotate: "rotate-[1.2deg]",
  },
];

const facilitySlides = [
  { image: imgFacilityClassroom, title: "Phòng học sáng tạo" },
  { image: imgFacilityActivity, title: "Phòng vận động" },
  { image: imgFacilityWashroom, title: "Khu vệ sinh thân thiện" },
  { image: imgFacilityGallery, title: "Góc trưng bày" },
  { image: imgFacilityPlayground, title: "Khu vui chơi trong nhà" },
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

export default function GioiThieuPage() {
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
            <h1 className="text-[38px] font-extrabold uppercase leading-[1.05] md:text-[64px]">
              Nơi mỗi ngày đến trường là một hành trình lớn lên hạnh phúc
            </h1>
            <p className="mt-5 max-w-[660px] text-[16px] font-medium leading-7 text-[#620000] md:text-[20px] md:leading-8">
              Trường Mầm non Princeton xây dựng môi trường giáo dục hiện đại, an toàn và giàu tình yêu thương, giúp trẻ tự tin khám phá, chủ động học hỏi và phát triển toàn diện.
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

      <section className="relative bg-[#ffc107]">
        <div
          className="h-[25px] bg-repeat-x"
          style={{ backgroundImage: `url("${imgZigzagTop.src}")`, backgroundSize: "176px 25px" }}
        />
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
        <div
          className="h-[25px] rotate-180 bg-repeat-x"
          style={{ backgroundImage: `url("${imgZigzagBottom.src}")`, backgroundSize: "176px 25px" }}
        />
      </section>

      <section className="bg-[#fff1f1] px-4 py-12 md:px-10 md:py-20">
        <div className="mx-auto max-w-[1180px]">
          <h2 className="max-w-[760px] text-[30px] font-extrabold uppercase leading-tight md:text-[52px]">
            Đội ngũ giảng viên tận tâm
          </h2>
          <p className="mt-4 max-w-[760px] text-[16px] font-medium leading-7 md:text-[19px] md:leading-8">
            Mỗi thầy cô tại Princeton cùng phối hợp để trẻ được chăm sóc, học tập và phát triển trong môi trường yêu thương, an toàn và giàu trải nghiệm.
          </p>
          <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {teachers.map((value) => (
              <article
                key={value.title}
                className={`relative min-h-[280px] border border-[#b80000] p-6 shadow-[4px_4px_0_rgba(184,0,0,0.18)] ${value.shape} ${value.rotate}`}
                style={{ backgroundColor: value.color }}
              >
                <div className="pointer-events-none absolute inset-2 rounded-[inherit] border border-dashed border-[#b80000]/30" />
                <div className="relative z-[1]">
                  <img src={value.icon.src} alt="" className="mb-4 h-16 w-16 object-contain" />
                  <h3 className="text-[22px] font-extrabold leading-tight">{value.title}</h3>
                  <p className="mt-4 text-[16px] font-medium leading-7 text-[#620000]">{value.text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#fffefa] px-4 py-12 md:px-10 md:py-20">
        <div className="mx-auto grid max-w-[1240px] gap-6 md:grid-cols-[1fr_0.85fr]">
          <div className="overflow-hidden rounded-[32px] bg-[#fffefa]">
            <iframe
              src="https://www.youtube.com/embed/A5OgwcjA2v8"
              title="Video giới thiệu Trường Mầm non Princeton"
              className="h-[260px] w-full md:h-[420px]"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
          <div className="relative rounded-[32px] bg-[#b80000] p-8 text-white">
            <img src={imgMascotKoala.src} alt="" className="absolute -right-2 -top-8 h-24 w-24 object-contain" />
            <h2 className="max-w-[460px] text-[30px] font-extrabold uppercase leading-tight md:text-[44px]">
              Cùng con bắt đầu một hành trình mới
            </h2>
            <p className="mt-5 text-[16px] font-medium leading-7 md:text-[19px]">
              Ba mẹ có thể đăng ký tham quan trường để cảm nhận trực tiếp không gian học tập, đội ngũ giáo viên và nhịp sinh hoạt hằng ngày của trẻ.
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
