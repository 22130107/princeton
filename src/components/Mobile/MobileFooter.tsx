"use client";

import imgLogo from "../../assets/logo3.png";
import { useLanguage } from "@/components/Shared/LanguageProvider";

export default function MobileFooter() {
  const { t } = useLanguage();
  return (
    <footer className="bg-[#991B1B]">
      <div className="border-t border-dashed border-white/25" />

      <div className="px-5 py-8 text-white">
        <div className="flex items-center gap-4">
          <img src={imgLogo.src} alt="Princeton Academy" className="h-48 w-48 rounded-[10px] object-contain" />
          <div>
            <h2 className="text-[22px] font-extrabold uppercase leading-tight">
              Princeton Academy
            </h2>
            <p className="mt-1 text-[15px] font-semibold leading-5 text-white/90">
              {t("footer.slogan")}
            </p>
          </div>
        </div>

        <div className="mt-6 space-y-2 border-t border-dashed border-white/25 pt-5 text-[14px] font-semibold leading-6 text-white/90">
          <p>{t("footer.address")}</p>
          <p>{t("footer.phone")}</p>
        </div>
      </div>
    </footer>
  );
}
