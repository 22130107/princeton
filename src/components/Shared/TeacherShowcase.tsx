"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { CoverImage } from "@/components/Shared/CoverImage";

type TeacherShowcaseItem = {
  id: number;
  icon: string;
  imageAlt: string;
  title: string;
  text: string;
  coverPosition: string;
  coverZoom: number;
};

type TeacherShowcaseProps = {
  teachers: TeacherShowcaseItem[];
  title: string;
  text: string;
  isEn?: boolean;
};

export default function TeacherShowcase({
  teachers,
  title,
  text,
  isEn = false,
}: TeacherShowcaseProps) {
  const [active, setActive] = useState(0);
  const safeTeachers = teachers.length ? teachers : [];
  const activeTeacher = safeTeachers[active];

  const goTo = (index: number) => {
    if (!safeTeachers.length) return;
    setActive((index + safeTeachers.length) % safeTeachers.length);
  };

  if (!activeTeacher) return null;

  return (
    <div className="mx-auto grid max-w-[1180px] items-stretch gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12">
      <figure className="about-luxury-rise relative">
        <div
          aria-hidden
          className="absolute inset-0 translate-x-1 translate-y-1 bg-[#991B1B]/10"
        />
        <div className="relative border border-[#991B1B] bg-white p-3 h-full">
          <div className="relative h-full aspect-[0.92/1] overflow-hidden bg-[#e2dbd9] md:aspect-[0.94/1]">
            {activeTeacher.icon ? (
              <CoverImage
                src={activeTeacher.icon}
                alt={activeTeacher.imageAlt || activeTeacher.title}
                zoom={activeTeacher.coverZoom}
                position={activeTeacher.coverPosition}
                frameAspect={0.94}
              />
            ) : null}
          </div>
        </div>
      </figure>

      <div className="about-luxury-rise flex h-full max-w-[560px] flex-col [animation-delay:120ms]">
        <div>
          <h2 className="text-balance text-[34px] font-extrabold uppercase leading-[1.08] text-[#991B1B] md:text-[46px]">
            {title}
          </h2>
          <p className="mt-7 text-[15px] font-medium leading-7 text-[#3f1f1b] md:text-[17px] md:leading-8">
            {text}
          </p>
          <div className="mt-8 border-l-2 border-[#D4AF37] pl-5">
            <h3 className="text-[24px] font-extrabold leading-tight text-[#991B1B]">
              {activeTeacher.title}
            </h3>
            {activeTeacher.text ? (
              <p className="mt-3 text-[15px] font-medium leading-7 text-[#5d332b]">
                {activeTeacher.text}
              </p>
            ) : null}
          </div>
          <span className="mt-10 block h-px w-24 bg-[#D4AF37]" />
        </div>

        {safeTeachers.length > 1 ? (
          <div className="mt-10 flex items-center justify-center gap-4 lg:mt-auto">
            <button
              type="button"
              aria-label={isEn ? "Previous teacher" : "Giáo viên trước"}
              onClick={() => goTo(active - 1)}
              className="flex size-11 items-center justify-center rounded-full border border-[#991B1B] text-[#991B1B] transition-all duration-300 hover:bg-[#991B1B] hover:text-white active:scale-[0.98]"
            >
              <ChevronLeft size={21} strokeWidth={2.3} />
            </button>
            <div className="flex items-center gap-2">
              {safeTeachers.map((teacher, index) => (
                <button
                  key={`teacher-dot-${teacher.id}-${index}`}
                  type="button"
                  aria-label={`${isEn ? "Show" : "Xem"} ${teacher.title}`}
                  onClick={() => goTo(index)}
                  className={`h-2.5 rounded-full transition-all duration-300 ${
                    index === active ? "w-8 bg-[#991B1B]" : "w-2.5 bg-[#D4AF37]"
                  }`}
                />
              ))}
            </div>
            <button
              type="button"
              aria-label={isEn ? "Next teacher" : "Giáo viên tiếp theo"}
              onClick={() => goTo(active + 1)}
              className="flex size-11 items-center justify-center rounded-full border border-[#991B1B] text-[#991B1B] transition-all duration-300 hover:bg-[#991B1B] hover:text-white active:scale-[0.98]"
            >
              <ChevronRight size={21} strokeWidth={2.3} />
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
}
