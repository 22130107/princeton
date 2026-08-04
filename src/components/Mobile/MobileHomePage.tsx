"use client";

import PrincetonHomeBody from "../Home/PrincetonHomeBody";
import MobileFooter from "./MobileFooter";
import MobileHeader from "./MobileHeader";

export default function MobileHomePage() {
  return (
    <div className="font-montserrat flex w-full flex-col overflow-x-hidden bg-[#f7f4f2] pt-[80px]">
      <MobileHeader />
      <PrincetonHomeBody />
      <MobileFooter />
    </div>
  );
}
