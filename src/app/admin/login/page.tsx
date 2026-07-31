"use client";

import { FormEvent, useEffect, useState } from "react";
import { LockKeyhole, LogIn } from "lucide-react";

function getSafeNextPath() {
  if (typeof window === "undefined") return "/admin";

  const params = new URLSearchParams(window.location.search);
  const nextPath = params.get("next");

  if (!nextPath || !nextPath.startsWith("/admin") || nextPath.startsWith("/admin/login")) {
    return "/admin";
  }

  return nextPath;
}

export default function AdminLoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [nextPath, setNextPath] = useState("/admin");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    setNextPath(getSafeNextPath());
  }, []);

  async function submitLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setMessage("");

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = (await response.json().catch(() => null)) as { message?: string } | null;

      if (!response.ok) {
        throw new Error(data?.message ?? "Không thể đăng nhập.");
      }

      window.location.href = nextPath;
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Không thể đăng nhập.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="grid min-h-screen place-items-center bg-[#f4fbf2] px-5 py-10 text-[#620000]">
      <section className="w-full max-w-[420px] rounded-md border border-[#dbe7d8] bg-white p-6 shadow-[0_18px_50px_rgba(98,0,0,0.08)]">
        <div className="mb-6">
          <div className="mb-4 inline-flex size-12 items-center justify-center rounded-md bg-[#b80000] text-white">
            <LockKeyhole size={24} />
          </div>
          <p className="text-[13px] font-extrabold uppercase text-[#b80000]">Princeton Academy</p>
          <h1 className="mt-1 text-[32px] font-extrabold leading-tight">Đăng nhập admin</h1>
        </div>

        <form className="grid gap-4" onSubmit={submitLogin}>
          <label className="grid gap-1.5">
            <span className="text-[13px] font-bold uppercase text-[#620000]">Tên đăng nhập</span>
            <input
              type="text"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              autoComplete="username"
              className="h-12 rounded-md border border-[#e1b0b0] bg-white px-3 text-[16px] text-[#620000] outline-none focus:border-[#b80000]"
              required
            />
          </label>

          <label className="grid gap-1.5">
            <span className="text-[13px] font-bold uppercase text-[#620000]">Mật khẩu</span>
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              autoComplete="current-password"
              className="h-12 rounded-md border border-[#e1b0b0] bg-white px-3 text-[16px] text-[#620000] outline-none focus:border-[#b80000]"
              required
            />
          </label>

          <button
            type="submit"
            disabled={submitting}
            className="mt-2 inline-flex h-12 items-center justify-center gap-2 rounded-md border border-[#b80000] bg-[#b80000] px-4 text-[16px] font-extrabold text-white transition-colors hover:bg-[#960000] disabled:cursor-wait disabled:opacity-60"
          >
            <LogIn size={18} />
            {submitting ? "Đang đăng nhập" : "Đăng nhập"}
          </button>
        </form>

        {message ? (
          <p className="mt-4 rounded-md border border-[#e1b0b0] bg-[#fffafa] px-4 py-3 text-[14px] font-semibold text-[#b80000]">
            {message}
          </p>
        ) : null}
      </section>
    </main>
  );
}
