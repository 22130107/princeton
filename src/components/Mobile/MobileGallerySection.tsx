"use client";

import { useEffect, useState } from "react";
import { MobileFlowerImageCarousel } from "@/components/Shared/MobileFlowerImageCarousel";
import type { FlowerCarouselImage } from "@/components/Shared/FlowerImageCarousel";
import { useLanguage } from "@/components/Shared/LanguageProvider";
import imgSection from "../../assets/43192633e64afca0e6ae2cc7ffd3e7a96f2cd1c7.png";

export default function MobileGallerySection() {
  const { t } = useLanguage();
  const [images, setImages] = useState<FlowerCarouselImage[]>([]);

  useEffect(() => {
    let alive = true;

    fetch("/api/gallery-images")
      .then((response) => response.json())
      .then((data) => {
        if (!alive || !Array.isArray(data.images)) return;
        const nextImages = data.images
          .map((item: any) => ({
            id: item.id,
            title: item.title || item.imageAlt || "Khoảnh khắc Princeton",
            imageUrl: item.imageUrl,
            imageAlt: item.imageAlt || item.title || "Khoảnh khắc Princeton",
          }))
          .filter((image: FlowerCarouselImage) => image.imageUrl);
        if (nextImages.length) setImages(nextImages);
      })
      .catch(() => {});

    return () => {
      alive = false;
    };
  }, []);

  return (
    <section className="relative overflow-hidden bg-[#fffefa] py-12">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          aria-hidden
          className="absolute inset-0 bg-[#F0EFD2]"
          style={{
            WebkitMaskImage: `url("${imgSection.src}")`,
            maskImage: `url("${imgSection.src}")`,
            WebkitMaskPosition: "center",
            maskPosition: "center",
            WebkitMaskRepeat: "no-repeat",
            maskRepeat: "no-repeat",
            WebkitMaskSize: "cover",
            maskSize: "cover",
          }}
        />
      </div>

      <h2 className="relative z-[1] mx-auto mb-8 max-w-[360px] px-4 text-center text-[28px] font-extrabold uppercase leading-tight text-[#620000]">
        {t("mobile.gallery.title")}
      </h2>

      <div className="relative z-[1] w-full overflow-hidden">
        <MobileFlowerImageCarousel images={images} />
      </div>
    </section>
  );
}
