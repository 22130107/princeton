"use client";

import imgLogo from "@/assets/logo.png";
import { useLanguage } from "@/components/Shared/LanguageProvider";

export default function SiteFooter() {
  const { t } = useLanguage();
  return (
    <footer className="bg-[#e8f3e6] text-[#620000]">
      <div className="mx-auto max-w-[1240px] px-5 pb-6 pt-4 md:px-8 md:pb-6 md:pt-5">
        <div className="border-t border-dashed border-[#620000]/25 pt-3">
          <div className="flex flex-col gap-4 pb-4 md:flex-row md:items-center md:justify-between">
            <img
              src={imgLogo.src}
              alt="Princeton Academy"
              className="h-[180px] w-[180px] object-contain"
            />
            <div className="md:text-right">
              <h2 className="text-[28px] font-extrabold uppercase leading-none md:text-[38px]">
                Princeton Academy
              </h2>
              <p className="mt-3 text-[20px] font-semibold leading-7">
                {t("footer.slogan")}
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-5 border-t border-dashed border-[#620000]/25 pt-7 text-[16px] font-semibold leading-7 md:flex-row md:items-center md:justify-between">
            <p>{t("footer.address")}</p>
            <p>{t("footer.phone")}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
