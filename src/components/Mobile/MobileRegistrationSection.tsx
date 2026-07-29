"use client";

import { useEffect, useState } from "react";
import { useCountdownValues } from "@/components/Shared/useCountdownValues";
import { useRegistrationSectionSettings } from "@/components/Shared/useRegistrationSectionSettings";
import imgPromo from "../../assets/c59ba9f7308cb819ecc8ed6f5ece801f19707aac.png";
import imgLogo from "../../assets/logo1.png";

type ProgramOption = {
  slug: string;
  label: string;
};

const fallbackPrograms: ProgramOption[] = [
  { slug: "penguin", label: "Penguin (2-3 tuổi)" },
];

export default function MobileRegistrationSection() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [programs, setPrograms] = useState<ProgramOption[]>(fallbackPrograms);
  const [grade, setGrade] = useState(fallbackPrograms[0].slug);
  const [agreed, setAgreed] = useState(false);
  const settings = useRegistrationSectionSettings();
  const countdownValues = useCountdownValues(settings);
  const promoImageUrl = settings.promoMobileImageUrl || settings.promoDesktopImageUrl || imgPromo.src;

  const fieldClass =
    "w-full border border-dashed border-[#b80000] rounded-[10px] px-4 py-3.5 bg-white text-[#620000] text-[15px] placeholder-[#620000]/40 focus:outline-none focus:border-[#620000]";

  useEffect(() => {
    let mounted = true;

    fetch("/api/class-programs")
      .then((response) => response.json())
      .then((data) => {
        if (!mounted || !Array.isArray(data.programs)) return;

        const nextPrograms = data.programs
          .map((program: any) => ({
            slug: String(program.slug || ""),
            label: String(program.label || `${program.name || ""} ${program.age ? `(${program.age})` : ""}`),
          }))
          .filter((program: ProgramOption) => program.slug && program.label.trim());

        if (!nextPrograms.length) return;
        setPrograms(nextPrograms);
        setGrade((current) =>
          nextPrograms.some((program: ProgramOption) => program.slug === current)
            ? current
            : nextPrograms[0].slug,
        );
      })
      .catch(() => undefined);

    return () => {
      mounted = false;
    };
  }, []);

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
          <div className="flex flex-col gap-3">
          <div>
            <label className="text-[#620000] text-[13px] font-medium mb-1 block">
              Họ và tên <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Nguyễn Văn A"
              className={fieldClass}
            />
          </div>

          <div>
            <label className="text-[#620000] text-[13px] font-medium mb-1 block">
              Số điện thoại <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="0912 345 678"
              className={fieldClass}
            />
          </div>

          <div>
            <label className="text-[#620000] text-[13px] font-medium mb-1 block">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@email.com"
              className={fieldClass}
            />
          </div>

          <div>
            <label className="text-[#620000] text-[13px] font-medium mb-1 block">
              Khối lớp
            </label>
            <div className="relative">
              <select
                value={grade}
                onChange={(e) => setGrade(e.target.value)}
                className={`${fieldClass} appearance-none pr-8`}
              >
                {programs.map((program) => (
                  <option key={program.slug} value={program.slug}>{program.label}</option>
                ))}
              </select>
              <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2">
                <svg width="12" height="8" viewBox="0 0 16 11" fill="none">
                  <path d="M1 1L8 9L15 1" stroke="#620000" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </div>
            </div>
          </div>

          {/* Checkbox */}
          <label
            className="flex items-start gap-3 cursor-pointer mt-1"
            onClick={() => setAgreed((value) => !value)}
          >
            <div
              onClick={(event) => {
                event.preventDefault();
                event.stopPropagation();
                setAgreed((value) => !value);
              }}
              className={`mt-0.5 shrink-0 size-5 rounded border-2 flex items-center justify-center transition-colors ${
                agreed ? "bg-[#b80000] border-[#b80000]" : "border-[#b80000]/50 bg-white"
              }`}
            >
              {agreed && (
                <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                  <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </div>
            <span className="text-[#620000] text-[12px] leading-relaxed">
              {settings.consentText}
            </span>
          </label>

          {/* Submit */}
          <button
            disabled={!agreed}
            className={`mx-auto mt-2 block min-w-[210px] px-8 py-3.5 rounded-[18px] border border-[#a30000] font-bold text-[18px] uppercase transition-all shadow-[0_5px_0px_#800000] active:shadow-none active:translate-y-1 ${
              agreed
                ? "bg-[#ffc300] text-[#b80000] cursor-pointer"
                : "bg-[#ffc300]/40 text-[#b80000]/40 cursor-not-allowed"
            }`}
          >
            {settings.submitLabel}
          </button>
          </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
