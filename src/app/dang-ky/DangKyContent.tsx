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

const MOBILE_BREAKPOINT = 768;

type Audience = "parent" | "partner";

export default function DangKyContent() {
  const { lang, t } = useLanguage();
  const searchParams = useSearchParams();
  const [isMobile, setIsMobile] = useState<boolean | null>(null);
  const [audience, setAudience] = useState<Audience>(
    searchParams.get("tab") === "partner" ? "partner" : "parent"
  );

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
          <h1 className="text-balance text-[clamp(26px,3.8vw,44px)] font-extrabold uppercase leading-tight text-[#991B1B]">
            {lang === "en" ? "Admissions & Registration" : "Đăng Ký Tư Vấn & Tham Quan Cơ Sở"}
          </h1>
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
            <div className="bg-white border-2 border-[#800000] p-6 md:p-8 shadow-[6px_6px_0_#ead6bf] relative flex flex-col justify-between rounded-none">
              <div>
                {/* Header of Testimonial Card */}
                <div className="flex items-center justify-between mb-5">
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
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
                <p className="text-[15px] font-medium leading-relaxed text-[#420808] italic mb-6">
                  "Bé đã học 5 năm tại Trường Mầm non Princeton. Trong quá trình con học tại trường, mình thấy con phát triển rất tốt. Con tự tin hơn, mạnh dạn hơn và mình cảm thấy rất vui khi con được phát triển trong môi trường tốt. Mình đánh giá Trường Mầm non Princeton rất cao."
                </p>
              </div>

              {/* Parent Info block */}
              <div className="flex items-center gap-4 border-t border-[#ead6bf]/60 pt-4">
                <div className="size-[52px] rounded-full overflow-hidden border border-[#800000]/20 shrink-0">
                  <img
                    src={imgParentAvatar.src}
                    alt="Phụ huynh H.Q.L"
                    className="size-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="text-[15px] font-extrabold text-[#420808]">
                    Phụ huynh H.Q.L
                  </h4>
                  <p className="text-[12px] font-semibold text-[#6f3129]/85">
                    Phụ huynh học sinh
                  </p>
                </div>
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
                  <a href="tel:19001234" className="text-[14px] font-extrabold text-[#b80000] hover:underline">
                    1900 1234
                  </a>
                </div>
                <div>
                  <span className="block text-[10px] font-extrabold uppercase tracking-wider text-[#6f3129]/75">
                    Email
                  </span>
                  <a href="mailto:info@princeton.edu.vn" className="text-[14px] font-extrabold text-[#b80000] hover:underline">
                    info@princeton.edu.vn
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

