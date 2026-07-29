"use client";

import EnrollmentLeadForm from "@/components/Shared/EnrollmentLeadForm";
import { useCountdownValues } from "@/components/Shared/useCountdownValues";
import { useRegistrationSectionSettings } from "@/components/Shared/useRegistrationSectionSettings";
import imgPromo from "../../assets/c59ba9f7308cb819ecc8ed6f5ece801f19707aac.png";
import imgLogo from "../../assets/logo1.png";

export default function MobileRegistrationSection() {
  const settings = useRegistrationSectionSettings();
  const countdownValues = useCountdownValues(settings);
  const promoImageUrl = settings.promoMobileImageUrl || settings.promoDesktopImageUrl || imgPromo.src;

  if (!settings.isActive) return null;

  return (
    <section className="bg-[#fffefa] px-3 py-8">
      <div className="mx-auto max-w-[480px] rounded-[30px] bg-[#b80000] p-3">
        {settings.showPromoImage ? (
        <div className="relative mb-4 overflow-hidden rounded-[24px]">
          <img src={promoImageUrl} alt="Ưu đãi đăng ký" className="block w-full h-auto" />
          <img
            src={imgLogo.src}
            alt="Princeton Academy"
            className="absolute left-4 top-4 h-[136px] w-[136px] object-contain"
          />
        </div>
        ) : null}

        <div className="relative overflow-hidden rounded-[28px] bg-[#fffefa] px-4 pb-5 pt-4 shadow-[4px_4px_0_rgba(128,0,0,0.35)]">
          <div className="relative mx-auto mb-4 flex min-h-[70px] max-w-[390px] items-center justify-center rounded-[999px] bg-[#b80000] px-8 py-3 text-center">
            <div className="absolute left-4 top-1/2 size-2.5 -translate-y-1/2 rounded-full bg-[#ffc300]" />
            <h3 className="text-[19px] font-extrabold uppercase leading-[24px] text-white">
              {settings.title}
            </h3>
            <div className="absolute right-4 top-1/2 size-2.5 -translate-y-1/2 rounded-full bg-[#ffc300]" />
          </div>

          {settings.showCountdown ? (
          <div className="mb-5 rounded-[10px] border border-[#b80000] bg-[#fff1f1] px-4 py-4 shadow-[4px_4px_0_#b80000]">
            <div className="grid grid-cols-4 gap-2 text-center">
              {[
                [countdownValues.days, "Ngày"],
                [countdownValues.hours, "Giờ"],
                [countdownValues.minutes, "Phút"],
                [countdownValues.seconds, "Giây"],
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
          <EnrollmentLeadForm
            variant="mobile"
            submitLabel={settings.submitLabel}
            consentText={settings.consentText}
          />
          ) : null}
        </div>
      </div>
    </section>
  );
}
