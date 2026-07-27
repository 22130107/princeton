import DecorationSection from "./DecorationSection";
import HeroBanner from "./HeroBanner";
import AboutSection from "./AboutSection";
import TeachingProgram from "./TeachingProgram";
import CurriculumSection from "./CurriculumSection";
import GallerySection from "./GallerySection";
import TestimonialsSection from "./TestimonialsSection";
import CampusSection from "./CampusSection";
import StatsSection from "./StatsSection";
import RegistrationSection from "./RegistrationSection";
import InfoSection from "./InfoSection";

export default function HomeSections() {
  return (
    <div className="absolute h-[9470.04px] left-0 right-0 top-[99px]" data-name="Main - CONTENT">
      <DecorationSection />
      <HeroBanner />
      <AboutSection />
      <TeachingProgram />
      <CurriculumSection />
      <GallerySection />
      <TestimonialsSection />
      <CampusSection />
      <StatsSection />
      <RegistrationSection />
      <InfoSection />
    </div>
  );
}
