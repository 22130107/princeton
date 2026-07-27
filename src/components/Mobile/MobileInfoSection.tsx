import imgPenguin from "../../assets/7418d3b6d509d03b45710cdbc11e6c298f5a9959.png";
import imgWombat from "../../assets/3dc1ce007304dd7c637e9e4c763ad7fda6021a35.png";
import imgKoala from "../../assets/d088645c54f44b84375f6cb56aeabe8e06bc006b.png";
import imgKangaroo from "../../assets/d0268a1bfec279b63f5d3717d847ff89893ec9a7.png";
import imgPreschool from "../../assets/58895c008a094b06474cacb153601040cef3cf48.png";
import imgPaper from "../../assets/b8936ceb2afcdcf3ec9bf2508692d1c0866ccf6e.png";
import imgSpiral from "../../assets/19f3ec75d04d4778613b623fd67426de89defdb9.png";
import imgPenguinCard from "../../assets/451163d5761eb2fd4f4fc21e0662c4d50571045a.png";
import imgWombatCard from "../../assets/f27370ae642f585465776911bba325c723a71553.png";
import imgKoalaCard from "../../assets/76ae85eb95c1037d24fc4b213196313a7543a830.png";
import imgKangarooCard from "../../assets/15745d29eddade36047a580e4620dc891bb7902d.png";
import imgPreschoolCard from "../../assets/2733e2352734e4c64d23bbca5e0cf9b52124bf84.png";

const classes = [
  {
    img: imgPenguin,
    card: imgPenguinCard,
    name: "Penguin",
    age: "2 - 3 tuổi",
    color: "#92d0db",
    rotate: "-rotate-[2deg]",
  },
  {
    img: imgWombat,
    card: imgWombatCard,
    name: "Wombat",
    age: "3 - 4 tuổi",
    color: "#ffcf82",
    rotate: "rotate-[2deg]",
  },
  {
    img: imgKoala,
    card: imgKoalaCard,
    name: "Koala",
    age: "4 - 5 tuổi",
    color: "#abe099",
    rotate: "rotate-[1deg]",
  },
  {
    img: imgKangaroo,
    card: imgKangarooCard,
    name: "Kangaroo",
    age: "5 - 6 tuổi",
    color: "#f9ba93",
    rotate: "-rotate-[1deg]",
  },
  {
    img: imgPreschool,
    card: imgPreschoolCard,
    name: "Preschool",
    age: "5 - 6 tuổi",
    color: "#ffacb9",
    rotate: "-rotate-[3deg]",
  },
];

export default function MobileInfoSection() {
  return (
    <section className="bg-[#fffefa] px-2 py-8">
      <div className="relative mx-auto max-w-[480px]">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-4 left-10 right-10 z-[2] h-[42px] bg-repeat-x bg-contain"
          style={{ backgroundImage: `url("${imgSpiral.src}")`, backgroundSize: "96px 42px" }}
        />

        <div className="relative rounded-[20px] border-2 border-[#3c0000] bg-[#fffefa] p-2 shadow-[4px_6px_0_rgba(98,0,0,0.12)]">
          <div
            className="relative overflow-hidden rounded-[16px] bg-[#fffefa] px-3 pb-8 pt-14"
            style={{
              backgroundImage: `url("${imgPaper.src}")`,
              backgroundPosition: "center top",
              backgroundSize: "920px auto",
            }}
          >
            <div
              aria-hidden
              className="absolute inset-2 rounded-[12px] border border-dashed border-[#d80000]"
            />

            <h2 className="relative z-[1] mb-8 text-center text-[28px] font-extrabold uppercase leading-tight text-[#620000]">
              Hệ thống khối lớp
            </h2>

            <div className="relative z-[1] grid grid-cols-2 gap-x-3 gap-y-7">
              {classes.map((c, index) => (
                <article
                  key={c.name}
                  className={[
                    "relative min-h-[178px] px-3 pb-5 pt-6 text-center",
                    c.rotate,
                    index === 4 ? "col-span-2 mx-auto w-[52%] min-w-[150px]" : "",
                  ].join(" ")}
                  style={{
                    backgroundImage: `url("${c.card.src}")`,
                    backgroundSize: "100% 100%",
                    backgroundRepeat: "no-repeat",
                  }}
                >
                  <div className="mx-auto mb-2 flex h-[68px] items-center justify-center">
                    <img src={c.img.src} alt={c.name} className="max-h-full max-w-[86px] object-contain" />
                  </div>
                  <h3 className="mb-2 text-[20px] font-extrabold leading-none text-[#620000]">
                    {c.name}
                  </h3>
                  <span
                    className="inline-flex min-h-9 items-center justify-center rounded-full border bg-white px-3 text-[16px] font-semibold leading-none text-[#620000]"
                    style={{ borderColor: c.color }}
                  >
                    {c.age}
                  </span>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
