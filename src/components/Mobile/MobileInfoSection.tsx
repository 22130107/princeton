import imgPenguin from "../../assets/7418d3b6d509d03b45710cdbc11e6c298f5a9959.png";
import imgWombat from "../../assets/3dc1ce007304dd7c637e9e4c763ad7fda6021a35.png";
import imgKoala from "../../assets/d088645c54f44b84375f6cb56aeabe8e06bc006b.png";
import imgKangaroo from "../../assets/d0268a1bfec279b63f5d3717d847ff89893ec9a7.png";
import imgPreschool from "../../assets/58895c008a094b06474cacb153601040cef3cf48.png";

const classes = [
  { img: imgPenguin, name: "Penguin", age: "2 - 3 tuổi", color: "#92d0db" },
  { img: imgWombat, name: "Wombat", age: "3 - 4 tuổi", color: "#ffcf82" },
  { img: imgKoala, name: "Koala", age: "4 - 5 tuổi", color: "#abe099" },
  { img: imgKangaroo, name: "Kangaroo", age: "5 - 6 tuổi", color: "#f9ba93" },
  { img: imgPreschool, name: "Preschool", age: "5 - 6 tuổi", color: "#ffacb9" },
];

export default function MobileInfoSection() {
  return (
    <section className="bg-[#b80000] px-4 py-10">
      <div className="bg-white/10 rounded-3xl border border-dashed border-white p-1">
        <div className="bg-[#fffefa] rounded-3xl border border-[#b80000] p-5">
          <h2 className="text-[#620000] font-bold text-[22px] uppercase text-center mb-6">
            HỆ THỐNG KHỐI LỚP
          </h2>

          {/* Horizontal scroll */}
          <div className="overflow-x-auto -mx-1 px-1 pb-2">
            <div className="flex gap-3 w-max">
              {classes.map((c) => (
                <div
                  key={c.name}
                  className="flex flex-col items-center rounded-2xl py-5 px-4 w-[130px] shrink-0 border border-[#b80000]/10"
                  style={{ backgroundColor: `${c.color}22` }}
                >
                  <img
                    src={c.img.src}
                    alt={c.name}
                    className="w-16 h-16 object-contain mb-3"
                  />
                  <span className="text-[#620000] font-bold text-[16px] mb-2">{c.name}</span>
                  <span
                    className="text-[#620000] font-medium text-[12px] px-3 py-1 rounded-full border bg-white"
                    style={{ borderColor: c.color }}
                  >
                    {c.age}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Scroll hint */}
          <p className="text-center text-[#620000]/50 text-[11px] mt-3 flex items-center justify-center gap-1">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
            Vuốt để xem thêm
          </p>
        </div>
      </div>
    </section>
  );
}
