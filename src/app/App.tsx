import { useEffect, useRef, useState } from "react";
import HomePage from "@/pages/Home/index";
import bannerMask from "@/assets/d082e0a60a126345af429a7e01c4ba8161c21e0e.png";

const DESIGN_WIDTH = 1536;

export default function App() {
  const [scale, setScale] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const update = () => setScale(window.innerWidth / DESIGN_WIDTH);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return (
    <>
      <style>{`
        [data-name="banner1-vi-2.png"],
        [data-name="banner2-vi-1.png"] {
          mask-image: url("${bannerMask}") !important;
          -webkit-mask-image: url("${bannerMask}") !important;
          mask-size: 1014px 546px !important;
          -webkit-mask-size: 1014px 546px !important;
          mask-position: 0 0 !important;
          -webkit-mask-position: 0 0 !important;
        }
        [data-name="Group - 3 / 3"] { left: 2082.5px !important; right: auto !important; }
        [data-name="Group - 2 / 3"] { left: 4077.5px !important; right: auto !important; }
        [data-name="Group - 2 / 3"] > [data-name="Container"] { left: -54.5px !important; right: -33.11px !important; }
      `}</style>
      <div ref={containerRef} style={{ overflow: "hidden" }}>
        <div style={{ width: DESIGN_WIDTH, transformOrigin: "top left", transform: `scale(${scale})` }}>
          <HomePage />
        </div>
      </div>
    </>
  );
}
