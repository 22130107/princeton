import imgItem1 from "../../assets/4067071ed218b109a3b3d760ab5b856a1c4d1556.png";
import imgItem2 from "../../assets/ba09fe820d0f9cb663b24826afea30ad6fc2c8a2.png";
import imgItem3 from "../../assets/6fcde84113072aa66cc43c4fc5efa3b2d4e6feb8.png";
import imgItem4 from "../../assets/aa47a37d3cb1c1b806218e09ba36b08f5e7c4d55.png";
import imgZigzagTop from "../../assets/38d9a61e041eae8aa98304a4098248683a3a95d6.png";
import imgZigzagBottom from "../../assets/d698542361c4bd444dda74cab23735d3d9459bf4.png";

const methods = [
  {
    img: imgItem1,
    title: "Kết hợp nhiều phương pháp",
    desc: "Trẻ được tiếp cận các phương pháp giáo dục hiện đại, nổi bật là Play-based Learning, giúp trẻ học tập thông qua các hoạt động vui chơi và tiếp thu kiến thức một cách tự nhiên.",
  },
  {
    img: imgItem3,
    title: "Lấy trẻ làm trung tâm",
    desc: "Trẻ được tôn trọng sở thích, bản sắc cá nhân và nhịp độ phát triển. Thầy cô tạo cơ hội để trẻ chủ động khám phá, đặt câu hỏi và học hỏi theo cách riêng của mình.",
  },
  {
    img: imgItem2,
    title: "Khai phóng tư duy",
    desc: "Trẻ được tham gia các hoạt động đa dạng trong lớp và sau giờ học như Câu lạc bộ, Học tập thực tế, sự kiện, từ đó phát triển tư duy độc lập và tự do thể hiện bản thân.",
  },
  {
    img: imgItem4,
    title: "Học qua tương tác & hợp tác",
    desc: "Trẻ phát triển kỹ năng xã hội, khả năng lắng nghe thông qua các hoạt động giao tiếp, chia sẻ và hợp tác với bạn bè, thầy cô và môi trường xung quanh.",
  },
];

export default function MobileTeachingProgram() {
  return (
    <section className="bg-[#FFC107] relative">
      {/* Zigzag top — giống PC */}
      <div
        className="w-full h-[25px] bg-repeat-x"
        style={{
          backgroundImage: `url("${imgZigzagTop.src}")`,
          backgroundSize: "176px 25px",
          backgroundPosition: "top left",
        }}
      />

      <div className="px-4 pt-8 pb-10">
        {/* Heading */}
        <h2 className="text-[#620000] font-bold text-[22px] uppercase text-center mb-2">
          PHƯƠNG PHÁP GIÁO DỤC
        </h2>
        <p className="text-[#620000] font-medium text-[14px] text-center leading-relaxed mb-7">
          Trường Mầm non Princeton áp dụng những phương pháp giáo dục tiên tiến, mang đến cho trẻ các trải nghiệm học tập trọn vẹn và đầy hứng khởi.
        </p>

        {/* Cards — bg vàng #FFC107, border dashed trắng, text đỏ — giống PC */}
        <div className="flex flex-col gap-4">
          {methods.map((m) => (
            <div
              key={m.title}
              className="relative rounded-[20px] bg-[#FFC107]"
            >
              {/* Border dashed trắng giống PC */}
              <div
                aria-hidden
                className="absolute inset-0 rounded-[20px] border-2 border-dashed border-white pointer-events-none"
              />
              {/* Content */}
              <div className="relative flex gap-4 items-center p-[18px]">
                {/* Icon */}
                <div className="shrink-0 w-[88px] h-[88px]">
                  <img
                    src={m.img.src}
                    alt={m.title}
                    className="w-full h-full object-contain"
                  />
                </div>
                {/* Text — màu đỏ giống PC */}
                <div className="flex flex-col gap-2 flex-1 min-w-0">
                  <p className="text-[#620000] font-extrabold text-[16px] leading-snug">
                    {m.title}
                  </p>
                  <p className="text-[#620000] font-medium text-[13px] leading-relaxed">
                    {m.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Zigzag bottom — rotate 180 giống PC */}
      <div
        className="w-full h-[25px] bg-repeat-x rotate-180"
        style={{
          backgroundImage: `url("${imgZigzagBottom.src}")`,
          backgroundSize: "176px 25px",
          backgroundPosition: "top left",
        }}
      />
    </section>
  );
}
