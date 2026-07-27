import imgGallery from "../../assets/150512c407c3bbd680797b719959c58b6e71354f.png";
import imgSection from "../../assets/43192633e64afca0e6ae2cc7ffd3e7a96f2cd1c7.png";

export default function MobileGallerySection() {
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

      <style>{`
        @keyframes mobile-gallery-marquee {
          from { transform: translateX(0); }
          to { transform: translateX(calc(var(--gallery-tile-w) * -1)); }
        }
      `}</style>

      <div
        className="relative z-[1] w-full overflow-hidden"
        style={
          {
            "--gallery-h": "clamp(228px, 56vw, 300px)",
            "--gallery-tile-w": "calc(var(--gallery-h) * 5.62)",
          } as React.CSSProperties
        }
      >
        <div
          className="relative shrink-0"
          style={{
            width: "calc(var(--gallery-tile-w) * 4)",
            height: "var(--gallery-h)",
            backgroundImage: `url("${imgGallery.src}")`,
            backgroundSize: "var(--gallery-tile-w) var(--gallery-h)",
            backgroundRepeat: "repeat-x",
            animation: "mobile-gallery-marquee 34s linear infinite",
            willChange: "transform",
          }}
        />
      </div>
    </section>
  );
}
