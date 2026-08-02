"use client";

import { useEffect, useState } from "react";
import { FlowerImageCarousel, type FlowerCarouselImage } from "@/components/Shared/FlowerImageCarousel";
import { useLanguage } from "@/components/Shared/LanguageProvider";
import imgSection from "../../../assets/43192633e64afca0e6ae2cc7ffd3e7a96f2cd1c7.png";

function Container93() {
  const { t } = useLanguage();
  return (
    <div className="content-stretch flex flex-col items-center pb-[36px] relative shrink-0 w-[1296px]" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-bold justify-center leading-[0] relative shrink-0 text-[#620000] text-[60px] text-center whitespace-nowrap">
        <p className="leading-[60px]">{t("home.gallery.title")}</p>
      </div>
    </div>
  );
}

export default function GallerySection() {
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
    <div className="absolute content-stretch flex flex-col items-center left-0 pb-[48px] pt-[72px] right-0 top-[5199.35px]" data-name="Section">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <img alt="" className="absolute h-[105.06%] left-0 max-w-none top-0 w-full" src={imgSection.src} />
      </div>
      <Container93 />
      <div className="relative z-[1] w-full overflow-hidden">
        <FlowerImageCarousel images={images} />
      </div>
    </div>
  );
}
