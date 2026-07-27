"use client";

import { useEffect, useRef, useState } from "react";
import HomePage from "@/components/Home/index";
import FloatingActions from "@/components/Home/sections/FloatingActions";
import bannerMask from "@/assets/d082e0a60a126345af429a7e01c4ba8161c21e0e.png";

const DESIGN_WIDTH = 1536;
const PAGE_HEIGHT = 9938;

export default function Home() {
  const [scale, setScale] = useState(1);
  const [containerHeight, setContainerHeight] = useState(PAGE_HEIGHT);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const update = () => {
      const s = window.innerWidth / DESIGN_WIDTH;
      setScale(s);
      setContainerHeight(Math.ceil(PAGE_HEIGHT * s));
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return (
    <>
      <style>{`
        [data-name="banner1-vi-2.png"],
        [data-name="banner2-vi-1.png"] {
          mask-image: url("${bannerMask.src}") !important;
          -webkit-mask-image: url("${bannerMask.src}") !important;
          mask-size: 1014px 546px !important;
          -webkit-mask-size: 1014px 546px !important;
          mask-position: 0 0 !important;
          -webkit-mask-position: 0 0 !important;
        }
        [data-name="Group - 3 / 3"] { left: 2082.5px !important; right: auto !important; }
        [data-name="Group - 2 / 3"] { left: 4077.5px !important; right: auto !important; }
        [data-name="Group - 2 / 3"] > [data-name="Container"] { left: -54.5px !important; right: -33.11px !important; }
      `}</style>
      <div ref={containerRef} style={{ overflow: "hidden", height: containerHeight, width: "100%" }}>
        <div style={{ width: DESIGN_WIDTH, transformOrigin: "top left", transform: `scale(${scale})` }}>
          <HomePage />
        </div>
      </div>
      <FloatingActions />
    </>
  );
}
