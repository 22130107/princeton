"use client";

import { useState } from "react";
import { campuses, campusMapUrl, campusMapLink, type Campus } from "@/lib/campuses";
import { useLanguage } from "@/components/Shared/LanguageProvider";
import imgFlowers from "../../assets/cfa61d914b57a907c8879eea3242e5037a5a2c78.png";
import imgCornerTop from "../../assets/45e9cd713cd022e324337d1e9a3d1f01c8086db4.png";
import imgCornerBottom from "../../assets/e2e0d53776626afcb6870acda5507843a053b4ae.png";

function MobileMapPreview({ campus, lang }: { campus: Campus; lang: "vi" | "en" }) {
  const { t } = useLanguage();
  const isEn = lang === "en";
  const address = isEn ? campus.addressEn || campus.address : campus.address;
  return (
    <div className="relative block h-[238px] overflow-hidden rounded-2xl bg-[#e5e3df]">
      <iframe
        src={campusMapUrl(address)}
        title={isEn ? campus.nameEn || campus.name : campus.name}
        className="absolute inset-0 h-full w-full border-0"
        loading="lazy"
        allowFullScreen
        referrerPolicy="no-referrer-when-downgrade"
      />
      <a
        href={campusMapLink(address)}
        target="_blank"
        rel="noopener noreferrer"
        className="absolute bottom-3 right-3 rounded-full bg-[#b80000] px-4 py-2 text-[13px] font-bold uppercase text-white no-underline shadow-[0_2px_8px_rgba(0,0,0,0.18)]"
      >
        {t("home.campus.map")}
      </a>
    </div>
  );
}

export default function MobileCampusSection() {
  const { t, lang } = useLanguage();
  const [selected, setSelected] = useState(0);
  const campus = campuses[selected];
  const isEn = lang === "en";

  return (
    <section className="relative overflow-hidden bg-[#fffefa] px-3 py-9">
      <style>{`
        .mobile-campus-stamp::before,
        .mobile-campus-stamp::after,
        .mobile-campus-stamp-holes {
          content: "";
          position: absolute;
          pointer-events: none;
          z-index: 2;
        }
        .mobile-campus-stamp-holes {
          left: 28px;
          right: 28px;
          top: -1px;
          height: 18px;
          background:
            radial-gradient(circle at center top, #fffefa 0 13px, transparent 14px)
            left top / 52px 18px repeat-x;
        }
        .mobile-campus-stamp::before {
          left: -1px;
          top: 34px;
          bottom: 24px;
          width: 18px;
          background:
            radial-gradient(circle at left center, #fffefa 0 13px, transparent 14px)
            left top / 18px 52px repeat-y;
        }
        .mobile-campus-stamp::after {
          right: -1px;
          top: 34px;
          bottom: 24px;
          width: 18px;
          background:
            radial-gradient(circle at right center, #fffefa 0 13px, transparent 14px)
            right top / 18px 52px repeat-y;
        }
        .campus-scroll::-webkit-scrollbar { width: 6px; }
        .campus-scroll::-webkit-scrollbar-track { background: transparent; }
        .campus-scroll::-webkit-scrollbar-thumb { background: #e6b3b3; border-radius: 9999px; }
        .campus-scroll { scrollbar-width: thin; scrollbar-color: #e6b3b3 transparent; }
      `}</style>

      <img
        src={imgCornerTop.src}
        alt=""
        className="pointer-events-none absolute left-0 top-0 h-16 w-16 object-contain"
      />
      <img
        src={imgCornerBottom.src}
        alt=""
        className="pointer-events-none absolute bottom-0 right-0 h-16 w-16 object-contain"
      />

      <div className="mobile-campus-stamp relative mx-auto max-w-[480px] bg-[#b80000] px-4 pb-4 pt-7 shadow-[3px_4px_0_rgba(112,86,86,0.22)]">
        <span aria-hidden className="mobile-campus-stamp-holes" />

        <div className="relative z-[1] bg-white p-3.5">
          <MobileMapPreview campus={campus} lang={lang} />

          <div className="px-1 pb-2 pt-4">
            <h2 className="text-[28px] font-extrabold uppercase leading-[1.18] text-[#620000]">
              {t("mobile.campus.title")}
            </h2>
            <p className="mt-2.5 text-[15px] font-medium leading-[22px] text-[#620000]">
              {t("home.campus.text")}
            </p>
          </div>

          <div className="campus-scroll mt-3 flex max-h-[340px] flex-col gap-3 overflow-y-auto pr-1">
            {campuses.map((c, index) => {
              const active = index === selected;
              return (
                <button
                  key={c.name}
                  type="button"
                  onClick={() => setSelected(index)}
                  className={`min-h-[64px] shrink-0 rounded-3xl border-2 p-3 text-left transition-colors ${
                    active
                      ? "border-[3px] border-dashed border-[#b80000] bg-[#fff1f1] shadow-[3px_3px_0_rgba(184,0,0,0.28)]"
                      : "border-transparent bg-[#fff1f1] hover:border-[#f0a0a0]"
                  }`}
                >
                  <span className="block text-[19px] font-extrabold leading-[24px] text-[#620000]">
                    {isEn ? c.nameEn || c.name : c.name}
                  </span>
                  <span className="mt-0.5 block text-[15px] font-medium leading-[20px] text-[#9a4a4a]">
                    {isEn ? c.addressEn || c.address : c.address}
                  </span>
                </button>
              );
            })}
          </div>

          <img
            src={imgFlowers.src}
            alt=""
            className="mx-auto mt-5 h-auto w-[82%] max-w-[360px]"
          />
        </div>
      </div>
    </section>
  );
}
