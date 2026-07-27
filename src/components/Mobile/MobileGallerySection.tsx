import imgGallery from "../../assets/150512c407c3bbd680797b719959c58b6e71354f.png";

export default function MobileGallerySection() {
  const TILE_W = 3631;
  const TILE_H = 646;

  return (
    <section className="py-8 overflow-hidden bg-[#fffefa]">
      <h2 className="text-[#620000] font-bold text-[22px] uppercase text-center px-4 mb-5">
        KHOẢNH KHẮC TRẺ TRẢI NGHIỆM
      </h2>
      <style>{`
        @keyframes gallery-marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-${TILE_W}px); }
        }
      `}</style>
      <div className="overflow-hidden w-full">
        <div
          style={{
            backgroundImage: `url("${imgGallery.src}")`,
            backgroundSize: `${TILE_W}px ${TILE_H}px`,
            backgroundRepeat: "repeat-x",
            width: `${TILE_W * 3}px`,
            height: "180px",
            animation: "gallery-marquee 30s linear infinite",
            willChange: "transform",
            backgroundPositionY: "center",
          }}
        />
      </div>
    </section>
  );
}
