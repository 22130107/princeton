import imgBackground1 from "../../assets/fe5c6e4aaf890b75876fc2a857981f5398258e61.png";

import iconHocPhi from "../../assets/eaba4ca5f83295bbec5f110bba97300acac3c3fa.png";
import iconSongNgu from "../../assets/00e028cd001c8c54794e0ef5c141f7972333f540.png";
import iconMoiTruong from "../../assets/70f568b2a99aecb158a1240b6747cea60190d528.png";
import iconCanBang from "../../assets/8b87f86a144ded0861c87061c9e2906b35334cea.png";
import iconBuaAn from "../../assets/aeb896a42e03cd2fa052159c11cba5a42892fdca.png";
import iconChungNhan from "../../assets/52ac58af3b511906b500df5fdebc3493147b6014.png";

const CARDS = [
  {
    icon: iconHocPhi,
    title: "Học phí hợp lý",
    description:
      "Với học phí chỉ từ 10 triệu đồng/tháng, trẻ được tiếp cận chương trình giáo dục Bang Tây Úc giúp phát triển toàn diện.",
  },
  {
    icon: iconSongNgu,
    title: "Chương trình song ngữ",
    description:
      "Số lượng tiết tiếng Anh lên đến 18-20 tiết/tuần, giúp trẻ hình thành nền tảng ngôn ngữ vững chắc và tự tin giao tiếp.",
  },
  {
    icon: iconMoiTruong,
    title: "Môi trường tích cực",
    description:
      "Môi trường học tập an toàn, thân thiện - nơi trẻ được lắng nghe, thấu hiểu và tự tin thể hiện bản thân.",
  },
  {
    icon: iconCanBang,
    title: "Sự cân bằng trải nghiệm",
    description:
      "Chương trình kết hợp giữa học thuật và hoạt động trải nghiệm đa dạng, giúp trẻ phát triển trí tuệ, kỹ năng và cảm xúc.",
  },
  {
    icon: iconBuaAn,
    title: "Bữa ăn dinh dưỡng",
    description:
      "Mỗi bữa ăn đều đảm bảo an toàn vệ sinh, bổ sung đủ dinh dưỡng, thực đơn đa dạng được thay đổi mỗi ngày.",
  },
  {
    icon: iconChungNhan,
    title: "Chứng nhận tốt nghiệp",
    description:
      "Trẻ được nhận chứng nhận của Bộ GD&ĐT Việt Nam và chứng nhận do WASS cấp sau khi hoàn thành chương trình Mầm non.",
  },
];

export default function MobileWhySection() {
  return (
    <section className="relative bg-[#fffefa] py-4">
      <div className="relative overflow-hidden bg-[#f5ede8]">
        <div
          aria-hidden
          className="absolute left-0 right-0 top-0 z-[1] h-9"
          style={{
            background:
              "radial-gradient(circle at 50% 100%, transparent 0 24px, #fffefa 25px) left top / 48px 36px repeat-x",
          }}
        />
        <div
          aria-hidden
          className="absolute bottom-0 left-0 right-0 z-[1] h-9"
          style={{
            background:
              "radial-gradient(circle at 50% 0, transparent 0 24px, #fffefa 25px) left bottom / 48px 36px repeat-x",
          }}
        />
        {/* Ảnh phòng học nền */}
        <img
          alt=""
          className="absolute inset-0 size-full object-cover opacity-40"
          src={imgBackground1.src}
        />

        {/* Content */}
        <div className="relative px-4 pb-12 pt-14">
          {/* Heading */}
          <h2 className="font-bold text-[#620000] text-[24px] uppercase leading-snug text-center mb-3">
            TẠI SAO CHỌN TRƯỜNG MẦM NON TÂY ÚC?
          </h2>
          <p className="font-medium text-[#333333] text-[14px] leading-relaxed text-center mb-6">
            Trở thành học sinh của Trường Mầm non Princeton, các em sẽ được sinh hoạt và học tập trong môi trường tràn đầy tình yêu thương và sự thấu hiểu. Đó là nền tảng để mỗi bạn nhỏ phát triển{" "}
            <strong className="text-[#620000]">mạnh mẽ</strong> trong suốt hành trình học tập.
          </p>

          {/* Wrapper viền đỏ dashed */}
          <div className="relative rounded-3xl bg-[#fff2f2]">
            <div
              aria-hidden
              className="absolute inset-0 rounded-3xl border-2 border-dashed border-[#b80000] pointer-events-none"
            />
            <div className="relative divide-y divide-[#e8c8c8]">
              {CARDS.map((card, idx) => (
                <div key={idx} className="flex items-center gap-4 px-5 py-5">
                  <div className="shrink-0 w-[60px] h-[60px] flex items-center justify-center">
                    <img
                      alt={card.title}
                      src={card.icon.src}
                      className="max-w-full max-h-full object-contain"
                    />
                  </div>
                  <div className="flex flex-col gap-1 flex-1 min-w-0">
                    <h3 className="font-bold text-[#620000] text-[15px] leading-snug">
                      {card.title}
                    </h3>
                    <p className="font-medium text-[#444444] text-[13px] leading-relaxed">
                      {card.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

    </section>
  );
}
