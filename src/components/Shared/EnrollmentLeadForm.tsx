"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";

type ProgramOption = {
  slug: string;
  name: string;
  age: string;
  label: string;
};

type EnrollmentLeadFormProps = {
  variant?: "desktop" | "mobile";
  submitLabel?: string;
  consentText?: string;
};

type SubmitState =
  | { status: "idle"; message: string }
  | { status: "loading"; message: string }
  | { status: "success"; message: string }
  | { status: "error"; message: string };

function getDevice() {
  if (typeof window === "undefined") return "unknown";
  if (window.innerWidth < 768) return "mobile";
  if (window.innerWidth < 1024) return "tablet";
  return "desktop";
}

export default function EnrollmentLeadForm({
  variant = "desktop",
  submitLabel = "Đăng ký ngay",
  consentText = "Tôi xác nhận rằng các thông tin cá nhân được cung cấp là chính xác và đồng ý để Nhà trường thu thập, lưu trữ, xử lý và sử dụng theo quy định của pháp luật về bảo vệ dữ liệu cá nhân.",
}: EnrollmentLeadFormProps) {
  const [programs, setPrograms] = useState<ProgramOption[]>([]);
  const [parentName, setParentName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [grade, setGrade] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [submitState, setSubmitState] = useState<SubmitState>({
    status: "idle",
    message: "",
  });

  useEffect(() => {
    let mounted = true;

    fetch("/api/class-programs")
      .then((response) => response.json())
      .then((data) => {
        if (!mounted || !Array.isArray(data.programs)) return;
        setPrograms(data.programs);
        setGrade((current) => current || data.programs[0]?.slug || "");
      })
      .catch(() => {
        if (!mounted) return;
        setSubmitState({
          status: "error",
          message: "Không thể tải danh sách khối lớp.",
        });
      });

    return () => {
      mounted = false;
    };
  }, []);

  const fieldClass = useMemo(
    () =>
      [
        "w-full border border-dashed border-[#b80000] bg-white text-[#620000] placeholder-[#620000]/40 focus:border-[#620000] focus:outline-none",
        variant === "desktop"
          ? "h-[50px] rounded-[4px] px-4 text-[18px]"
          : "rounded-[10px] px-4 py-3.5 text-[15px]",
      ].join(" "),
    [variant],
  );

  const labelClass =
    variant === "desktop"
      ? "mb-1 block text-[15px] font-semibold text-[#620000]"
      : "mb-1 block text-[13px] font-medium text-[#620000]";

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFieldErrors({});
    setSubmitState({ status: "loading", message: "Đang gửi đăng ký..." });

    try {
      const response = await fetch("/api/enrollment-leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          parentName,
          phone,
          email,
          grade,
          agreed,
          sourcePage: window.location.pathname,
          sourceDevice: getDevice(),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setFieldErrors(data.errors ?? {});
        setSubmitState({
          status: "error",
          message: data.message ?? "Thông tin chưa hợp lệ. Vui lòng kiểm tra lại.",
        });
        return;
      }

      setParentName("");
      setPhone("");
      setEmail("");
      setAgreed(false);
      setSubmitState({
        status: "success",
        message: "Đăng ký thành công. Nhà trường đã nhận lịch và sẽ liên hệ xác nhận sớm.",
      });
    } catch {
      setSubmitState({
        status: "error",
        message: "Không thể gửi đăng ký. Vui lòng thử lại sau.",
      });
    }
  }

  return (
    <form
      className={[
        "flex w-full flex-col",
        variant === "desktop" ? "gap-[12.6px]" : "gap-3",
      ].join(" ")}
      onSubmit={onSubmit}
    >
      {submitState.message ? (
        <div
          role="status"
          className={[
            "rounded-md border px-4 py-3 text-center text-[14px] font-bold leading-6",
            submitState.status === "success"
              ? "border-green-300 bg-green-50 text-green-800"
              : submitState.status === "loading"
                ? "border-[#e1b0b0] bg-white text-[#620000]"
                : "border-red-300 bg-red-50 text-red-700",
          ].join(" ")}
        >
          {submitState.message}
        </div>
      ) : null}

      <div>
        <label className={labelClass}>
          Họ và tên <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          value={parentName}
          onChange={(event) => setParentName(event.target.value)}
          placeholder="Nguyễn Văn A"
          className={fieldClass}
        />
        {fieldErrors.parentName ? (
          <p className="mt-1 text-[12px] font-semibold text-red-600">{fieldErrors.parentName}</p>
        ) : null}
      </div>

      <div>
        <label className={labelClass}>
          Số điện thoại <span className="text-red-500">*</span>
        </label>
        <input
          type="tel"
          value={phone}
          onChange={(event) => setPhone(event.target.value)}
          placeholder="0912 345 678"
          className={fieldClass}
        />
        {fieldErrors.phone ? (
          <p className="mt-1 text-[12px] font-semibold text-red-600">{fieldErrors.phone}</p>
        ) : null}
      </div>

      <div>
        <label className={labelClass}>
          Email <span className="text-red-500">*</span>
        </label>
        <input
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="example@email.com"
          className={fieldClass}
        />
        {fieldErrors.email ? (
          <p className="mt-1 text-[12px] font-semibold text-red-600">{fieldErrors.email}</p>
        ) : null}
      </div>

      <div>
        <label className={labelClass}>Khối lớp</label>
        <div className="relative">
          <select
            value={grade}
            onChange={(event) => setGrade(event.target.value)}
            className={`${fieldClass} appearance-none pr-9`}
          >
            {programs.map((program) => (
              <option key={program.slug} value={program.slug}>
                {program.label}
              </option>
            ))}
          </select>
          <svg
            aria-hidden
            className="pointer-events-none absolute right-3 top-1/2 h-2 w-3 -translate-y-1/2"
            viewBox="0 0 16 11"
            fill="none"
          >
            <path d="M1 1L8 9L15 1" stroke="#620000" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </div>
        {fieldErrors.grade ? (
          <p className="mt-1 text-[12px] font-semibold text-red-600">{fieldErrors.grade}</p>
        ) : null}
      </div>

      <label className="mt-1 flex cursor-pointer items-start gap-3">
        <input
          type="checkbox"
          checked={agreed}
          onChange={(event) => setAgreed(event.target.checked)}
          className="mt-1 size-5 shrink-0 accent-[#b80000]"
        />
        <span className="text-[12px] leading-relaxed text-[#620000]">
          {consentText}
        </span>
      </label>
      {fieldErrors.agreed ? (
        <p className="text-[12px] font-semibold text-red-600">{fieldErrors.agreed}</p>
      ) : null}

      <button
        type="submit"
        disabled={submitState.status === "loading"}
        className={[
          "mx-auto mt-2 block rounded-[18px] border border-[#a30000] bg-[#ffc300] px-8 py-3.5 text-[18px] font-bold uppercase text-[#b80000] shadow-[0_5px_0px_#800000] transition-all active:translate-y-1 active:shadow-none",
          submitState.status === "loading" ? "cursor-wait opacity-70" : "cursor-pointer",
        ].join(" ")}
      >
        {submitState.status === "loading" ? "Đang gửi..." : submitLabel}
      </button>

    </form>
  );
}
