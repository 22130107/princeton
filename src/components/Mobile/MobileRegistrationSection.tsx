"use client";

import { useState } from "react";
import imgPromo from "../../assets/c59ba9f7308cb819ecc8ed6f5ece801f19707aac.png";

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
    "w-full border border-dashed border-[#b80000] rounded-xl px-4 py-3 bg-white text-[#620000] text-[14px] placeholder-[#620000]/40 focus:outline-none focus:border-[#620000]";

  return (
    <section className="bg-[#b80000] px-4 py-10">
      {/* Promo image */}
      <div className="rounded-2xl overflow-hidden mb-6 shadow-lg">
        <img src={imgPromo.src} alt="Ưu đãi đăng ký" className="w-full h-auto" />
      </div>

      {/* Form card */}
      <div className="bg-[#fffefa] rounded-3xl overflow-hidden shadow-xl">
        {/* Header */}
        <div className="bg-[#b80000] px-5 py-4 text-center relative">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-[#ffc300]" />
          <h3 className="text-white font-bold text-[16px] uppercase tracking-wide">
            ĐĂNG KÝ NHẬN ƯU ĐÃI NGAY
          </h3>
          <div className="absolute right-4 top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-[#ffc300]" />
        </div>

        {/* Form */}
        <div className="p-5 flex flex-col gap-3">
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
            className={`w-full py-3.5 rounded-2xl font-bold text-[16px] uppercase tracking-wide mt-2 transition-all shadow-[0_4px_0px_#800000] active:shadow-none active:translate-y-1 ${
              agreed
                ? "bg-[#ffc300] text-[#b80000] cursor-pointer"
                : "bg-[#ffc300]/40 text-[#b80000]/40 cursor-not-allowed"
            }`}
          >
            Đăng ký ngay
          </button>
        </div>
      </div>
    </section>
  );
}
