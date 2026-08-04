"use client";

import { useEffect, useState } from "react";
import PrincetonHomeBody from "@/components/Home/PrincetonHomeBody";
import HeaderSection from "@/components/Home/sections/HeaderSection";
import MobileHomePage from "@/components/Mobile/MobileHomePage";
import SiteFooter from "@/components/Shared/SiteFooter";

const MOBILE_BREAKPOINT = 768;

export default function Home() {
  const [isMobile, setIsMobile] = useState<boolean | null>(null);

  useEffect(() => {
    const update = () => setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);

    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  if (isMobile === null) return null;

  if (isMobile) return <MobileHomePage />;

  return (
    <div className="font-montserrat overflow-x-hidden bg-[#f7f4f2] pt-[99px]">
      <div className="fixed inset-x-0 top-0 z-50 h-[99px]">
        <HeaderSection />
      </div>
      <PrincetonHomeBody />
      <SiteFooter />
    </div>
  );
}
