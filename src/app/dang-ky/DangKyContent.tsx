"use client";

import { useEffect, useState } from "react";
import HeaderSection from "@/components/Home/sections/HeaderSection";
import RegistrationSection from "@/components/Home/sections/RegistrationSection";
import MobileHeader from "@/components/Mobile/MobileHeader";
import MobileRegistrationSection from "@/components/Mobile/MobileRegistrationSection";
import SiteFooter from "@/components/Shared/SiteFooter";

const MOBILE_BREAKPOINT = 768;

export default function DangKyContent() {
  const [isMobile, setIsMobile] = useState<boolean | null>(null);

  useEffect(() => {
    const update = () => setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  if (isMobile === null) return null;

  if (isMobile) {
    return (
      <main className="min-h-screen bg-[#fffefa] pt-[64px]">
        <MobileHeader />
        <MobileRegistrationSection />
        <SiteFooter />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#fffefa]">
      <div className="h-[99px]">
        <HeaderSection />
      </div>
      <div className="relative mx-auto h-[1014px] max-w-[1536px] overflow-hidden">
        <div className="absolute left-0 top-[-7964.35px] h-[9470px] w-full">
          <RegistrationSection />
        </div>
      </div>
      <SiteFooter />
    </main>
  );
}
