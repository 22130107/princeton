import PrincetonHomeBody from "@/components/Home/PrincetonHomeBody";
import HeaderSection from "@/components/Home/sections/HeaderSection";
import MobileHeader from "@/components/Mobile/MobileHeader";
import MobileFooter from "@/components/Mobile/MobileFooter";
import SiteFooter from "@/components/Shared/SiteFooter";

export default function Home() {
  return (
    <div className="font-montserrat overflow-x-hidden bg-[#f7f4f2] pt-[80px] md:pt-[99px]">
      <div className="md:hidden">
        <MobileHeader />
      </div>
      
      <div className="hidden md:block fixed inset-x-0 top-0 z-50 h-[99px]">
        <HeaderSection />
      </div>

      <PrincetonHomeBody />

      <div className="md:hidden">
        <MobileFooter />
      </div>
      
      <div className="hidden md:block">
        <SiteFooter />
      </div>
    </div>
  );
}
