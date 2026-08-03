"use client";

import { useState } from "react";
import EnrollmentLeadForm from "@/components/Shared/EnrollmentLeadForm";
import { CoverImage } from "@/components/Shared/CoverImage";
import { useCountdownValues } from "@/components/Shared/useCountdownValues";
import { useRegistrationSectionSettings } from "@/components/Shared/useRegistrationSectionSettings";
import { useLanguage } from "@/components/Shared/LanguageProvider";
import { PROMO_FRAME_ASPECT } from "@/lib/registration-section-config";
import imgPromo from "../../assets/c59ba9f7308cb819ecc8ed6f5ece801f19707aac.png";

type RegistrationAudience = "parent" | "partner";

function AudienceTabs({
  activeTab,
  onChange,
}: {
  activeTab: RegistrationAudience;
  onChange: (value: RegistrationAudience) => void;
}) {
  const { t } = useLanguage();
  const tabs = [
    ["parent", t("register.audience.parent")],
    ["partner", t("register.audience.partner")],
  ] as const;

  return (
    <div className="grid w-full grid-cols-2 overflow-hidden rounded-t-[22px] rounded-b-none border border-[#b80000] bg-white">
      {tabs.map(([key, label]) => {
        const isActive = activeTab === key;
        return (
          <button
            key={key}
            type="button"
            onClick={() => onChange(key)}
            className={[
              "flex min-h-[54px] items-center justify-center text-[20px] font-extrabold text-[#b80000] transition-colors",
              isActive ? "bg-[#b80000] text-white" : "bg-white hover:bg-[#fff1f1]",
            ].join(" ")}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}

export default function MobileRegistrationSection() {
  const { lang, t } = useLanguage();
  const [audience, setAudience] = useState<RegistrationAudience>("parent");
  const settings = useRegistrationSectionSettings();
  const countdownValues = useCountdownValues(settings);
  const promoImageUrl = settings.promoMobileImageUrl || settings.promoDesktopImageUrl || imgPromo.src;
  const promoZoom = Math.min(3, Math.max(0.5, Number(settings.promoMobileZoom) || 1));
  const promoPosition = settings.promoMobileObjectPosition || "50% 50%";

  if (!settings.isActive) return null;

  return (
    <section className="bg-[#fffefa] px-3 py-8">
      <div
        className="mx-auto max-w-[480px] rounded-[30px] p-3"
        style={{ backgroundColor: settings.backgroundColor }}
      >
        {settings.showPromoImage ? (
          <div className="relative mb-4 overflow-hidden rounded-[24px]">
            <div className="relative w-full" style={{ aspectRatio: `${PROMO_FRAME_ASPECT}` }}>
              <CoverImage
                src={promoImageUrl}
                alt={t("register.promoAlt")}
                zoom={promoZoom}
                position={promoPosition}
                frameAspect={PROMO_FRAME_ASPECT}
              />
            </div>
          </div>
        ) : null}

        <div className={settings.showForm ? "relative pt-[54px]" : "relative"}>
          {settings.showForm ? (
            <div className="absolute left-0 right-0 top-0 z-[3]">
              <AudienceTabs activeTab={audience} onChange={setAudience} />
            </div>
          ) : null}

          <div
            className={[
              "relative overflow-hidden bg-[#fffefa] pb-5 shadow-[4px_4px_0_rgba(128,0,0,0.35)]",
              settings.showForm ? "rounded-b-[28px] rounded-t-none" : "rounded-[28px]",
            ].join(" ")}
          >
            <div className="relative mx-4 mb-4 mt-4 flex min-h-[70px] max-w-[390px] items-center justify-center rounded-[999px] bg-[#b80000] px-8 py-3 text-center">
              <div className="absolute left-4 top-1/2 size-2.5 -translate-y-1/2 rounded-full bg-[#ffc300]" />
              <h3 className="text-[19px] font-extrabold uppercase leading-[24px] text-white">
                {audience === "partner" ? t("register.partnerTitle") : lang === "en" ? t("register.promoTitle") : settings.title}
              </h3>
              <div className="absolute right-4 top-1/2 size-2.5 -translate-y-1/2 rounded-full bg-[#ffc300]" />
            </div>

            {settings.showCountdown && audience === "parent" ? (
              <div className="mx-4 mb-5 rounded-[10px] border border-[#b80000] bg-[#fff1f1] px-4 py-4 shadow-[4px_4px_0_#b80000]">
                <div className="grid grid-cols-4 gap-2 text-center">
                  {[
                    [countdownValues.days, t("countdown.days")],
                    [countdownValues.hours, t("countdown.hours")],
                    [countdownValues.minutes, t("countdown.minutes")],
                    [countdownValues.seconds, t("countdown.seconds")],
                  ].map(([value, label]) => (
                    <div key={label} className="flex flex-col items-center gap-2">
                      <span className="flex size-[54px] items-center justify-center rounded-[14px] border border-[#b80000] bg-white text-[32px] font-bold leading-none text-[#b80000] shadow-[inset_2px_2px_2px_rgba(98,0,0,0.16)]">
                        {value}
                      </span>
                      <span className="text-[13px] font-semibold text-[#b80000]">{label}</span>
                    </div>
                  ))}
                </div>
              </div>
            ) : null}

            {settings.showForm ? (
              <div className="px-4">
                <EnrollmentLeadForm
                  variant="mobile"
                  audience={audience}
                  submitLabel={lang === "en" ? t("register.cta") : settings.submitLabel}
                  consentText={lang === "en" ? t("form.consentLong") : settings.consentText}
                />
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
