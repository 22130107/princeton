"use client";

import MobileHeader from "./MobileHeader";
import HeroBanner from "../Home/sections/HeroBanner";
import MobileAboutSection from "./MobileAboutSection";
import MobileWhySection from "./MobileWhySection";
import MobileTeachingProgram from "./MobileTeachingProgram";
import MobileCurriculumSection from "./MobileCurriculumSection";
import MobileGallerySection from "./MobileGallerySection";
import MobileTestimonialsSection from "./MobileTestimonialsSection";
import MobileCampusSection from "./MobileCampusSection";
import MobileInfoSection from "./MobileInfoSection";
import MobileRegistrationSection from "./MobileRegistrationSection";
import MobileFooter from "./MobileFooter";

export default function MobileHomePage() {
  return (
    <div className="flex flex-col w-full bg-[#fffefa] overflow-x-hidden">
      <MobileHeader />
      <HeroBanner />
      <MobileAboutSection />
      <MobileWhySection />
      <MobileTeachingProgram />
      <MobileCurriculumSection />
      <MobileGallerySection />
      <MobileTestimonialsSection />
      <MobileCampusSection />
      <MobileInfoSection />
      <MobileRegistrationSection />
      <MobileFooter />
    </div>
  );
}
