"use client";

import { useState } from "react";
import imgPromo from "../../assets/c59ba9f7308cb819ecc8ed6f5ece801f19707aac.png";
import imgLogo from "../../assets/logo1.png";

const grades = [
  "Penguin (2-3 tuổi)",
  "Wombat (3-4 tuổi)",
  "Koala (4-5 tuổi)",
  "Kangaroo (5-6 tuổi)",
  "Preschool (5-6 tuổi)",
];

export default function MobileRegistrationSection() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [grade, setGrade] = useState(grades[0]);
  const [agreed, setAgreed] = useState(false);

  const fieldClass =
    "w-full border border-dashed border-[#b80000] rounded-[10px] px-4 py-3.5 bg-white text-[#620000] text-[15px] placeholder-[#620000]/40 focus:outline-none focus:border-[#620000]";

  return (
    <section className="bg-[#fffefa] px-3 py-8">
      <div className="mx-auto max-w-[480px] rounded-[30px] bg-[#b80000] p-3">
        <div className="relative mb-4 overflow-hidden rounded-[24px]">
          <img src={imgPromo.src} alt="Ưu đãi đăng ký" className="block w-full h-auto" />
          <img
            src={imgLogo.src}
            alt="Princeton Academy"
            className="absolute left-4 top-4 h-[136px] w-[136px] object-contain"
          />
        </div>

        <div className="relative overflow-hidden rounded-[28px] bg-[#fffefa] px-4 pb-5 pt-4 shadow-[4px_4px_0_rgba(128,0,0,0.35)]">
          <div className="relative mx-auto mb-4 flex min-h-[70px] max-w-[390px] items-center justify-center rounded-[999px] bg-[#b80000] px-8 py-3 text-center">
            <div className="absolute left-4 top-1/2 size-2.5 -translate-y-1/2 rounded-full bg-[#ffc300]" />
            <h3 className="text-[19px] font-extrabold uppercase leading-[24px] text-white">
              Đăng ký nhận ưu đãi ngay
            </h3>
            <div className="absolute right-4 top-1/2 size-2.5 -translate-y-1/2 rounded-full bg-[#ffc300]" />
          </div>

          <div className="mb-5 rounded-[10px] border border-[#b80000] bg-[#fff1f1] px-4 py-4 shadow-[4px_4px_0_#b80000]">
            <div className="grid grid-cols-4 gap-2 text-center">
              {[
                ["04", "Ngày"],
                ["12", "Giờ"],
                ["05", "Phút"],
                ["09", "Giây"],
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
                {grades.map((g) => (
                  <option key={g} value={g}>{g}</option>
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
          <label className="flex items-start gap-3 cursor-pointer mt-1">
            <div
              onClick={() => setAgreed(!agreed)}
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
              Tôi xác nhận rằng các thông tin cá nhân được cung cấp là chính xác và đồng ý để Nhà trường thu thập, lưu trữ, xử lý và sử dụng theo quy định của pháp luật về bảo vệ dữ liệu cá nhân.
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
            Đăng ký ngay
          </button>
          </div>
        </div>
      </div>
    </section>
  );
}
