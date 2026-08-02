"use client";

import { useLanguage } from "@/components/Shared/LanguageProvider";
import imgBackground1 from "../../assets/fe5c6e4aaf890b75876fc2a857981f5398258e61.png";

import iconHocPhi from "../../assets/eaba4ca5f83295bbec5f110bba97300acac3c3fa.png";
import iconSongNgu from "../../assets/00e028cd001c8c54794e0ef5c141f7972333f540.png";
import iconMoiTruong from "../../assets/70f568b2a99aecb158a1240b6747cea60190d528.png";
import iconCanBang from "../../assets/8b87f86a144ded0861c87061c9e2906b35334cea.png";
import iconBuaAn from "../../assets/aeb896a42e03cd2fa052159c11cba5a42892fdca.png";
import iconChungNhan from "../../assets/52ac58af3b511906b500df5fdebc3493147b6014.png";

const CARDS = [
  {
    icon: iconHocPhi,
    titleKey: "home.why.card1.title",
    descKey: "home.why.card1.desc",
  },
  {
    icon: iconSongNgu,
    titleKey: "home.why.card2.title",
    descKey: "home.why.card2.desc",
  },
  {
    icon: iconMoiTruong,
    titleKey: "home.why.card3.title",
    descKey: "home.why.card3.desc",
  },
  {
    icon: iconCanBang,
    titleKey: "home.why.card4.title",
    descKey: "home.why.card4.desc",
  },
  {
    icon: iconBuaAn,
    titleKey: "home.why.card5.title",
    descKey: "home.why.card5.desc",
  },
  {
    icon: iconChungNhan,
    titleKey: "home.why.card6.title",
    descKey: "home.why.card6.desc",
  },
];

export default function MobileWhySection() {
  const { t } = useLanguage();
  return (
    <section className="relative bg-[#fffefa] py-4">
      <div className="relative overflow-hidden bg-[#f5ede8]">
        <div
          aria-hidden
          className="absolute left-0 right-0 top-0 z-[1] h-9"
          style={{
            background:
              "radial-gradient(circle at 50% 100%, transparent 0 24px, #fffefa 25px) left top / 48px 36px repeat-x",
          }}
        />
        <div
          aria-hidden
          className="absolute bottom-0 left-0 right-0 z-[1] h-9"
          style={{
            background:
              "radial-gradient(circle at 50% 0, transparent 0 24px, #fffefa 25px) left bottom / 48px 36px repeat-x",
          }}
        />
        {/* Ảnh phòng học nền */}
        <img
          alt=""
          className="absolute inset-0 size-full object-cover opacity-40"
          src={imgBackground1.src}
        />

        {/* Content */}
        <div className="relative px-4 pb-12 pt-14">
          {/* Heading */}
          <h2 className="font-bold text-[#620000] text-[24px] uppercase leading-snug text-center mb-3">
            {t("home.why.title")}
          </h2>
          <p className="font-medium text-[#333333] text-[14px] leading-relaxed text-center mb-6">
            {t("home.why.text")}
          </p>

          {/* Wrapper viền đỏ dashed */}
          <div className="relative rounded-3xl bg-[#fff2f2]">
            <div
              aria-hidden
              className="absolute inset-0 rounded-3xl border-2 border-dashed border-[#b80000] pointer-events-none"
            />
            <div className="relative divide-y divide-[#e8c8c8]">
              {CARDS.map((card, idx) => (
                <div key={idx} className="flex items-center gap-4 px-5 py-5">
                  <div className="shrink-0 w-[60px] h-[60px] flex items-center justify-center">
                    <img
                      alt={t(card.titleKey)}
                      src={card.icon.src}
                      className="max-w-full max-h-full object-contain"
                    />
                  </div>
                  <div className="flex flex-col gap-1 flex-1 min-w-0">
                    <h3 className="font-bold text-[#620000] text-[15px] leading-snug">
                      {t(card.titleKey)}
                    </h3>
                    <p className="font-medium text-[#444444] text-[13px] leading-relaxed">
                      {t(card.descKey)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

    </section>
  );
}

