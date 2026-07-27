import svgPaths from "../svg-g45k1n1pz5";
import imgImage2 from "../../../assets/150512c407c3bbd680797b719959c58b6e71354f.png";
import imgSection from "../../../assets/43192633e64afca0e6ae2cc7ffd3e7a96f2cd1c7.png";

function Container93() {
  return (
    <div className="content-stretch flex flex-col items-center pb-[90px] relative shrink-0 w-[1296px]" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-bold justify-center leading-[0] relative shrink-0 text-[#620000] text-[60px] text-center whitespace-nowrap">
        <p className="leading-[60px]">KHOẢNH KHẮC TRẺ TRẢI NGHIỆM</p>
      </div>
    </div>
  );
}

function Container94() {
  const TILE_W = 3631.378662109375;
  const TILE_H = 646.307383954525;
  return (
    <div className="content-stretch flex flex-col items-start overflow-clip relative shrink-0 w-full" data-name="Container">
      <style>{`
        @keyframes marquee94 {
          from { transform: translateX(0); }
          to { transform: translateX(-${TILE_W}px); }
        }
      `}</style>
      <div
        className="h-[646px] relative shrink-0"
        style={{
          backgroundImage: `url("${imgImage2.src}")`,
          backgroundSize: `${TILE_W}px ${TILE_H}px`,
          backgroundRepeat: "repeat-x",
          width: `${TILE_W * 5}px`,
          animation: "marquee94 45s linear infinite",
          willChange: "transform",
        }}
        data-name="Image"
      />
    </div>
  );
}

export default function GallerySection() {
  return (
    <div className="absolute content-stretch flex flex-col items-center left-0 pb-[100px] pt-[112px] right-0 top-[5199.35px]" data-name="Section">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <img alt="" className="absolute h-[105.06%] left-0 max-w-none top-0 w-full" src={imgSection.src} />
      </div>
      <Container93 />
      <Container94 />
    </div>
  );
}
