"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import HeaderSection from "@/components/Home/sections/HeaderSection";
import MobileHeader from "@/components/Mobile/MobileHeader";
import SiteFooter from "@/components/Shared/SiteFooter";
import EnrollmentLeadForm from "@/components/Shared/EnrollmentLeadForm";
import { useLanguage } from "@/components/Shared/LanguageProvider";
import { campuses, campusMapLink } from "@/lib/campuses";
import imgCardLogo from "@/assets/logo1.png";
import imgFormLogo from "@/assets/logo.png";
import imgParentAvatar from "@/assets/762553422_1915290766432556_5827904010307015329_n.jpg";
import { MapPin, Star } from "lucide-react";
import type { DbTestimonial } from "@/lib/content";

const MOBILE_BREAKPOINT = 768;

type Audience = "parent" | "partner";

interface DangKyContentProps {
  testimonial?: DbTestimonial | null;
  testimonials?: DbTestimonial[];
}

const fallbackTestimonials: DbTestimonial[] = [
  {
    id: 1,
    parentName: "Phụ huynh T.H.G",
    parentNameEn: "Parent T.H.G",
    studentName: "",
    avatarId: null,
    avatarUrl: "",
    avatarAlt: "Phụ huynh T.H.G",
    quote: "Bé đã học 5 năm tại Trường Mầm non Princeton. Trong quá trình con học tại trường, mình thấy con phát triển rất tốt. Con tự tin hơn, mạnh dạn hơn và mình cảm thấy rất vui khi con được phát triển trong môi trường tốt. Mình đánh giá Trường Mầm non Princeton rất cao.",
    quoteEn: "My child has studied for 5 years at Princeton Academy. During my child's time at the school, I've seen them develop remarkably well. They are more confident, more courageous, and I feel very happy that my child is growing in such a nurturing environment. I highly rate Princeton Academy.",
    rating: 5,
    reactionImageId: null,
    reactionImageUrl: "",
    reactionImageAlt: "",
  },
  {
    id: 2,
    parentName: "Phụ huynh N.T.B",
    parentNameEn: "Parent N.T.B",
    studentName: "",
    avatarId: null,
    avatarUrl: "",
    avatarAlt: "Phụ huynh N.T.B",
    quote: "Chương trình song ngữ tại Princeton rất bài bản và toàn diện. Các cô giáo luôn tận tâm chăm sóc, theo sát từng bước tiến bộ của con, giúp con hình thành thói quen tự lập và tư duy sáng tạo từ sớm.",
    quoteEn: "The bilingual curriculum at Princeton is very thorough and comprehensive. The teachers are dedicated, attentive, and foster independence and creativity in our children every day.",
    rating: 5,
    reactionImageId: null,
    reactionImageUrl: "",
    reactionImageAlt: "",
  },
  {
    id: 3,
    parentName: "Phụ huynh H.Q.L",
    parentNameEn: "Parent H.Q.L",
    studentName: "",
    avatarId: null,
    avatarUrl: "",
    avatarAlt: "Phụ huynh H.Q.L",
    quote: "Cơ sở vật chất hiện đại, không gian học tập và vui chơi xanh mát, an toàn. Con tôi mỗi ngày đến trường đều rất vui vẻ và hào hứng kể lại những điều mới mẻ con học được.",
    quoteEn: "Modern facilities, green and safe learning & playing environments. My child is excited to go to school every day and eagerly shares everything learned.",
    rating: 5,
    reactionImageId: null,
    reactionImageUrl: "",
    reactionImageAlt: "",
  },
];

export default function DangKyContent({ testimonial, testimonials = [] }: DangKyContentProps) {
  const { lang, t } = useLanguage();
  const searchParams = useSearchParams();
  const tabParam = searchParams.get("tab");
  const [isMobile, setIsMobile] = useState<boolean | null>(null);
  const [audience, setAudience] = useState<Audience>(
    tabParam === "partner" ? "partner" : "parent"
  );

  const [items, setItems] = useState<DbTestimonial[]>(() => {
    if (testimonials && testimonials.length > 0) return testimonials;
    if (testimonial) return [testimonial];
    return fallbackTestimonials;
  });
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    if (testimonials && testimonials.length > 0) {
      setItems(testimonials);
    } else if (testimonial) {
      setItems([testimonial]);
    } else {
      fetch("/api/testimonials")
        .then((res) => res.json())
        .then((data) => {
          if (Array.isArray(data.testimonials) && data.testimonials.length > 0) {
            setItems(data.testimonials);
          }
        })
        .catch(() => {});
    }
  }, [testimonials, testimonial]);

  useEffect(() => {
    if (items.length <= 1) return;
    const interval = setInterval(() => {
      setIsFading(true);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % items.length);
        setIsFading(false);
      }, 250);
    }, 3000);

    return () => clearInterval(interval);
  }, [items.length]);

  useEffect(() => {
    if (tabParam === "partner" || tabParam === "parent") {
      setAudience(tabParam);
    }
  }, [tabParam]);

  useEffect(() => {
    const update = () => setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  if (isMobile === null) return null;

  const tabs: { key: Audience; labelVi: string; labelEn: string }[] = [
    { key: "parent", labelVi: "Phụ huynh", labelEn: "Parents" },
    { key: "partner", labelVi: "Đối tác", labelEn: "Partners" },
  ];

  const descVi =
    audience === "parent"
      ? "Quý phụ huynh vui lòng điền thông tin vào phiếu dưới đây. Bộ phận tuyển sinh sẽ liên hệ hỗ trợ trong thời gian sớm nhất."
      : "Quý đối tác vui lòng điền thông tin để chúng tôi liên hệ tư vấn về các cơ hội hợp tác cùng Princeton Academy.";
  const descEn =
    audience === "parent"
      ? "Please complete the details below. Our admissions representatives will contact you shortly."
      : "Please fill in your details and our partnership team will get in touch with you soon.";

  const activeTestimonial = items[currentIndex % items.length] || items[0];
  const activeRating = activeTestimonial?.rating ? Math.round(Number(activeTestimonial.rating)) : 5;
  const activeQuote =
    (lang === "en" && activeTestimonial?.quoteEn ? activeTestimonial.quoteEn : activeTestimonial?.quote) ||
    (lang === "en"
      ? "My child has studied for 5 years at Princeton Academy. During my child's time at the school, I've seen them develop remarkably well."
      : "Bé đã học 5 năm tại Trường Mầm non Princeton. Trong quá trình con học tại trường, mình thấy con phát triển rất tốt.");
  const activeParentName =
    (lang === "en" && activeTestimonial?.parentNameEn ? activeTestimonial.parentNameEn : activeTestimonial?.parentName) ||
    (lang === "en" ? "Parent" : "Phụ huynh học sinh");
  const activeAvatar = activeTestimonial?.avatarUrl || imgParentAvatar.src;

  return (
    <main className="min-h-screen bg-[#fffefa] flex flex-col justify-between">
      {/* Header */}
      {isMobile ? (
        <div className="fixed inset-x-0 top-0 z-50 h-[64px]">
          <MobileHeader />
        </div>
      ) : (
        <div className="relative z-[100] h-[99px]">
          <HeaderSection />
        </div>
      )}

      {/* Main Content Page Container */}
      <div className={`mx-auto max-w-[1240px] px-4 w-full flex-grow ${isMobile ? "pt-[84px] pb-12" : "py-16 md:py-24"}`}>

        {/* Top Header Section */}
        <div className="mx-auto mb-10 text-center max-w-[800px]">
          <div className="mb-4 flex justify-center">
            <span className="inline-block rounded-none border border-[#d8b15f] bg-[#fffefa] px-4 py-1.5 text-[12px] font-bold uppercase tracking-[0.15em] text-[#d8b15f] md:text-[14px]">
              {lang === "en" ? "Princeton Education System" : "Hệ Thống Giáo Dục Princeton"}
            </span>
          </div>
          <h2 className="text-balance text-[clamp(26px,3.8vw,44px)] font-extrabold uppercase leading-tight text-[#991B1B]">
            {lang === "en" ? "Admissions & Registration" : "Đăng Ký Tư Vấn & Tham Quan Cơ Sở"}
          </h2>
          <span className="mx-auto mt-4 block h-[3px] w-16 rounded-full bg-[#d8b15f]" />
        </div>

        {/* 2-Column Grid Layout */}
        <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] items-stretch">

          {/* Left Column: Form Card */}
          <div className="bg-white border-2 border-[#800000] shadow-[6px_6px_0_#ead6bf] flex flex-col rounded-none overflow-hidden">

            {/* Audience Tabs */}
            <div className="grid grid-cols-2 border-b-2 border-[#800000]">
              {tabs.map((tab) => {
                const isActive = audience === tab.key;
                return (
                  <button
                    key={tab.key}
                    type="button"
                    onClick={() => setAudience(tab.key)}
                    className={[
                      "py-4 text-[15px] font-extrabold uppercase tracking-wide transition-colors duration-200",
                      isActive
                        ? "bg-[#b80000] text-white"
                        : "bg-white text-[#b80000] hover:bg-[#fff1f1]",
                    ].join(" ")}
                  >
                    {lang === "en" ? tab.labelEn : tab.labelVi}
                  </button>
                );
              })}
            </div>

            {/* Form Content */}
            <div className="p-6 md:p-8 lg:p-10">
              <div className="mb-6 flex justify-center">
                <img
                  src={imgFormLogo.src}
                  alt="Princeton Academy Logo"
                  className="h-28 md:h-32 object-contain"
                />
              </div>
              <h2 className="text-[22px] font-extrabold uppercase text-[#991B1B] mb-2 tracking-wide">
                {lang === "en" ? "Online Registration" : "Thông Tin Đăng Ký"}
              </h2>
              <p className="text-[14px] font-semibold text-[#6f3129] mb-8 leading-relaxed">
                {lang === "en" ? descEn : descVi}
              </p>
              <EnrollmentLeadForm variant="mobile" audience={audience} />
            </div>
          </div>

          {/* Right Column: Testimonial & Campus Card */}
          <div className="flex flex-col gap-8 min-h-0">

            {/* Card 1: Testimonial */}
            <div className="bg-white border-2 border-[#800000] p-6 md:p-8 shadow-[6px_6px_0_#ead6bf] relative flex flex-col justify-between rounded-none min-h-[260px]">
              <div
                className={`transition-opacity duration-300 ${
                  isFading ? "opacity-0" : "opacity-100"
                }`}
              >
                {/* Header of Testimonial Card */}
                <div className="flex items-center justify-between mb-5">
                  <div className="flex gap-0.5">
                    {[...Array(activeRating)].map((_, i) => (
                      <Star key={i} className="size-5 fill-[#ffc300] text-[#ffc300]" />
                    ))}
                  </div>
                  <img
                    src={imgCardLogo.src}
                    alt="Princeton Academy Logo"
                    className="h-9 object-contain"
                  />
                </div>

                {/* Content Quote */}
                <p className="text-[15px] font-medium leading-relaxed text-[#420808] italic mb-6 min-h-[72px]">
                  &ldquo;{activeQuote}&rdquo;
                </p>
              </div>

              {/* Parent Info block & Indicators */}
              <div className="flex items-center justify-between border-t border-[#ead6bf]/60 pt-4">
                <div
                  className={`flex items-center gap-4 transition-opacity duration-300 ${
                    isFading ? "opacity-0" : "opacity-100"
                  }`}
                >
                  <div className="size-[52px] rounded-full overflow-hidden border border-[#800000]/20 shrink-0">
                    <img
                      src={activeAvatar}
                      alt={activeParentName}
                      className="size-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="text-[15px] font-extrabold text-[#420808]">
                      {activeParentName}
                    </h4>
                    <p className="text-[12px] font-semibold text-[#6f3129]/85">
                      {lang === "en" ? "Parent" : "Phụ huynh học sinh"}
                    </p>
                  </div>
                </div>

                {/* Dots indicators */}
                {items.length > 1 && (
                  <div className="flex items-center gap-1.5 self-center">
                    {items.map((_, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => {
                          setIsFading(true);
                          setTimeout(() => {
                            setCurrentIndex(idx);
                            setIsFading(false);
                          }, 150);
                        }}
                        className={`h-2 rounded-full transition-all duration-300 ${
                          idx === currentIndex % items.length
                            ? "w-6 bg-[#b80000]"
                            : "w-2 bg-[#ead6bf] hover:bg-[#b80000]/50"
                        }`}
                        aria-label={`Testimonial ${idx + 1}`}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Card 2: Campuses Info */}
            <div className="bg-white border-2 border-[#800000] p-6 md:p-8 shadow-[6px_6px_0_#ead6bf] flex flex-col rounded-none flex-1">
              <div>
                <h3 className="text-[18px] font-extrabold uppercase text-[#991B1B] mb-5 flex items-center gap-2 tracking-wide">
                  <MapPin className="size-5 text-[#b80000]" strokeWidth={2.5} />
                  {lang === "en" ? "Our Campuses" : "Hệ thống Cơ sở"}
                </h3>
                {/* Show ~4 campuses, slim custom scrollbar on the right */}
                <style>{`
                  .contact-campus-list::-webkit-scrollbar { width: 6px; }
                  .contact-campus-list::-webkit-scrollbar-track { background: transparent; }
                  .contact-campus-list::-webkit-scrollbar-thumb { background: #d66b6b; border-radius: 999px; }
                  .contact-campus-list::-webkit-scrollbar-button { display: none; width: 0; height: 0; }
                  .contact-campus-list { scrollbar-width: thin; scrollbar-color: #d66b6b transparent; }
                `}</style>
                <div className="contact-campus-list space-y-4 max-h-[380px] overflow-y-auto pr-1">
                  {campuses.map((campus) => (
                    <div key={campus.slug} className="border-b border-[#ead6bf]/40 pb-3 last:border-0 last:pb-0">
                      <h4 className="text-[14px] font-extrabold text-[#420808]">
                        {lang === "en" ? campus.nameEn || campus.name : campus.name}
                      </h4>
                      <p className="text-[12.5px] text-[#6f3129] mt-1 leading-relaxed">
                        {lang === "en" ? campus.addressEn || campus.address : campus.address}
                      </p>
                      <a
                        href={campusMapLink(campus.address)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-[11.5px] font-bold text-[#b80000] hover:underline mt-1.5 transition-colors"
                      >
                        <MapPin className="size-3" />
                        {lang === "en" ? "View on map" : "Xem bản đồ"}
                      </a>
                    </div>
                  ))}
                </div>
              </div>

              {/* Contact Footer detail inside card */}
              <div className="border-t border-[#ead6bf]/60 pt-4 mt-6 grid grid-cols-2 gap-4">
                <div>
                  <span className="block text-[10px] font-extrabold uppercase tracking-wider text-[#6f3129]/75">
                    Hotline
                  </span>
                  <a href="tel:0906268468" className="text-[14px] font-extrabold text-[#b80000] hover:underline">
                    0906 268 468
                  </a>
                </div>
                <div>
                  <span className="block text-[10px] font-extrabold uppercase tracking-wider text-[#6f3129]/75">
                    Email
                  </span>
                  <a href="mailto:princetonvietnam@gmail.com" className="text-[14px] font-extrabold text-[#b80000] hover:underline">
                    princetonvietnam@gmail.com
                  </a>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>

      {/* Footer */}
      <SiteFooter />
    </main>
  );
}

