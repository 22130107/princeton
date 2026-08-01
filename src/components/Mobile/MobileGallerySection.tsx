"use client";

import { useEffect, useState } from "react";
import { MobileFlowerImageCarousel } from "@/components/Shared/MobileFlowerImageCarousel";
import type { FlowerCarouselImage } from "@/components/Shared/FlowerImageCarousel";
import imgSection from "../../assets/43192633e64afca0e6ae2cc7ffd3e7a96f2cd1c7.png";

export default function MobileGallerySection() {
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
    <section className="relative overflow-hidden bg-[#fff1f1] py-12">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <img
          src={imgSection.src}
          alt=""
          className="absolute left-0 top-0 h-full w-full object-cover"
        />
      </div>

      <h2 className="relative z-[1] mx-auto mb-8 max-w-[360px] px-4 text-center text-[28px] font-extrabold uppercase leading-tight text-[#620000]">
        Khoảnh khắc trẻ trải nghiệm
      </h2>

      <div className="relative z-[1] w-full overflow-hidden">
        <MobileFlowerImageCarousel images={images} />
      </div>
    </section>
  );
}
