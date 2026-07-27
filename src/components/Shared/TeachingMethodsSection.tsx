import type { StaticImageData } from "next/image";
import imgItem1 from "@/assets/4067071ed218b109a3b3d760ab5b856a1c4d1556.png";
import imgItem2 from "@/assets/ba09fe820d0f9cb663b24826afea30ad6fc2c8a2.png";
import imgItem3 from "@/assets/6fcde84113072aa66cc43c4fc5efa3b2d4e6feb8.png";
import imgItem4 from "@/assets/aa47a37d3cb1c1b806218e09ba36b08f5e7c4d55.png";
import imgPlane from "@/assets/87b0baec94bf2f1f980990704ca31b5f776eae03.png";
import imgZigzagTop from "@/assets/38d9a61e041eae8aa98304a4098248683a3a95d6.png";
import imgZigzagBottom from "@/assets/d698542361c4bd444dda74cab23735d3d9459bf4.png";

type TeachingMethod = {
  image: StaticImageData;
  title: string;
  description: string;
  background: string;
};

const methods: TeachingMethod[] = [
  {
    image: imgItem1,
    title: "Kết hợp nhiều phương pháp",
    background: "#fffefa",
    description:
      "Trẻ được tiếp cận các phương pháp giáo dục hiện đại, nổi bật là Play-based Learning, giúp trẻ học tập thông qua các hoạt động vui chơi và tiếp thu kiến thức một cách tự nhiên.",
  },
  {
    image: imgItem3,
    title: "Lấy trẻ làm trung tâm",
    background: "#fff1f1",
    description:
      "Trẻ được tôn trọng sở thích, bản sắc cá nhân và nhịp độ phát triển. Thầy cô tạo cơ hội để trẻ chủ động khám phá, đặt câu hỏi và học hỏi theo cách riêng của mình.",
  },
  {
    image: imgItem2,
    title: "Khai phóng tư duy",
    background: "#e8f3e6",
    description:
      "Trẻ được tham gia các hoạt động đa dạng trong lớp và sau giờ học như Câu lạc bộ, Học tập thực tế, sự kiện, từ đó phát triển tư duy độc lập và tự do thể hiện bản thân.",
  },
  {
    image: imgItem4,
    title: "Học qua tương tác & hợp tác",
    background: "#e1f7fb",
    description:
      "Trẻ phát triển kỹ năng xã hội, khả năng lắng nghe thông qua các hoạt động giao tiếp, chia sẻ và hợp tác với bạn bè, thầy cô và môi trường xung quanh.",
  },
];

function TeachingMethodCard({
  method,
  filled,
}: {
  method: TeachingMethod;
  filled: boolean;
}) {
  return (
    <article
      className={[
        "relative rounded-[20px]",
        filled ? "shadow-[6px_6px_0_rgba(98,0,0,0.16)]" : "bg-[#ffc107]",
      ].join(" ")}
      style={filled ? { backgroundColor: method.background } : undefined}
    >
      <div
        aria-hidden
        className={[
          "pointer-events-none absolute inset-0 rounded-[20px] border-2 border-dashed",
          filled ? "border-[#b80000]/45" : "border-[#fffefa]",
        ].join(" ")}
      />
      <div className="relative flex flex-col gap-4 p-[18px] sm:flex-row sm:items-center md:p-[18.4px]">
        <div className="mx-auto h-[118px] w-[118px] shrink-0 sm:mx-0 md:h-[154px] md:w-[154px]">
          <img
            src={method.image.src}
            alt=""
            className="h-full w-full object-contain"
          />
        </div>
        <div className="min-w-0 flex-1 text-center sm:text-left">
          <h3 className="text-[22px] font-extrabold leading-[1.12] text-[#620000] md:text-[28px]">
            {method.title}
          </h3>
          <p className="mt-2 text-[16px] font-medium leading-[1.45] text-[#620000] md:text-[18px] md:leading-[26px]">
            {method.description}
          </p>
        </div>
      </div>
    </article>
  );
}

type TeachingMethodsSectionProps = {
  showHeading?: boolean;
  showZigzags?: boolean;
  filledCards?: boolean;
  topZigzagColor?: string;
  bottomZigzagColor?: string;
  className?: string;
};

export default function TeachingMethodsSection({
  showHeading = true,
  showZigzags = true,
  filledCards = false,
  topZigzagColor,
  bottomZigzagColor,
  className = "",
}: TeachingMethodsSectionProps) {
  const useOriginalPinkTop = topZigzagColor?.toLowerCase() === "#fff1f1";
  const topZigzagStyle = useOriginalPinkTop
    ? {
        backgroundImage: `url("${imgZigzagBottom.src}")`,
        backgroundSize: "176px 25px",
      }
    : topZigzagColor
    ? {
        backgroundColor: topZigzagColor,
        WebkitMaskImage: `url("${imgZigzagTop.src}")`,
        maskImage: `url("${imgZigzagTop.src}")`,
        WebkitMaskRepeat: "repeat-x",
        maskRepeat: "repeat-x",
        WebkitMaskSize: "176px 25px",
        maskSize: "176px 25px",
      }
    : {
        backgroundImage: `url("${imgZigzagTop.src}")`,
        backgroundSize: "176px 25px",
      };

  const bottomZigzagStyle = bottomZigzagColor
    ? {
        backgroundColor: bottomZigzagColor,
        WebkitMaskImage: `url("${imgZigzagBottom.src}")`,
        maskImage: `url("${imgZigzagBottom.src}")`,
        WebkitMaskRepeat: "repeat-x",
        maskRepeat: "repeat-x",
        WebkitMaskSize: "176px 25px",
        maskSize: "176px 25px",
      }
    : {
        backgroundImage: `url("${imgZigzagBottom.src}")`,
        backgroundSize: "176px 25px",
      };

  return (
    <section className={`relative overflow-hidden bg-[#ffc107] ${className}`}>
      {showZigzags ? (
        <div
          className="h-[25px] bg-repeat-x"
          style={topZigzagStyle}
        />
      ) : null}

      <div className="relative mx-auto max-w-[1320px] px-4 py-12 md:px-10 md:py-[100px] lg:px-[104px]">
        {showHeading ? (
          <div className="mx-auto mb-10 max-w-[976px] text-center md:mb-12">
            <h2 className="text-[34px] font-bold uppercase leading-none text-[#620000] md:text-[60px] md:leading-[60px]">
              Phương pháp giáo dục
            </h2>
            <p className="mt-5 text-[18px] font-medium leading-7 text-[#620000] md:text-[24px] md:leading-8">
              Trường Mầm non Princeton áp dụng những phương pháp giáo dục tiên tiến, mang đến cho trẻ các trải nghiệm học tập trọn vẹn và đầy hứng khởi.
            </p>
          </div>
        ) : null}

        <div className="grid gap-6 md:grid-cols-2 lg:gap-12">
          {methods.map((method) => (
            <TeachingMethodCard
              key={method.title}
              method={method}
              filled={filledCards}
            />
          ))}
        </div>

        <img
          src={imgPlane.src}
          alt=""
          className="pointer-events-none absolute -bottom-12 right-4 hidden h-[140px] w-[220px] object-contain opacity-95 lg:block"
        />
      </div>

      {showZigzags ? (
        <div
          className="h-[25px] rotate-180 bg-repeat-x"
          style={bottomZigzagStyle}
        />
      ) : null}
    </section>
  );
}
