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

/** SVG scallop đều — mỗi hình bán nguyệt r=14, 20px wide */
function ScallopTop({ fill = "#fffefa" }: { fill?: string }) {
  const r = 14;
  const w = 28;
  const count = 14; // số răng cưa
  const totalW = count * w;
  const h = r + 1;

  // Mỗi scallop: nửa tròn nhô xuống
  let d = `M0,0 `;
  for (let i = 0; i < count; i++) {
    const cx = i * w + r;
    d += `A ${r} ${r} 0 0 0 ${cx - r},${r} `;
    d += `A ${r} ${r} 0 0 0 ${cx + r},${r} `;
  }
  d += `L${totalW},0 Z`;

  return (
    <svg
      viewBox={`0 0 ${totalW} ${h}`}
      width="100%"
      height={h}
      preserveAspectRatio="none"
      xmlns="http://www.w3.org/2000/svg"
      className="block"
    >
      <path d={d} fill={fill} />
    </svg>
  );
}

function ScallopBottom({ fill = "#fffefa" }: { fill?: string }) {
  const r = 14;
  const w = 28;
  const count = 14;
  const totalW = count * w;
  const h = r + 1;

  // Scallop nhô lên (lật ngược)
  let d = `M0,${h} `;
  for (let i = 0; i < count; i++) {
    const cx = i * w + r;
    d += `A ${r} ${r} 0 0 1 ${cx - r},0 `;
    d += `A ${r} ${r} 0 0 1 ${cx + r},0 `;
  }
  d += `L${totalW},${h} Z`;

  return (
    <svg
      viewBox={`0 0 ${totalW} ${h}`}
      width="100%"
      height={h}
      preserveAspectRatio="none"
      xmlns="http://www.w3.org/2000/svg"
      className="block"
    >
      <path d={d} fill={fill} />
    </svg>
  );
}

export default function MobileWhySection() {
  return (
    <section className="relative">
      {/* Scallop top — màu trắng/nền trước che lên section */}
      <ScallopTop fill="#fffefa" />

      {/* Body với ảnh nền */}
      <div className="relative overflow-hidden bg-[#f5ede8]">
        {/* Ảnh phòng học nền */}
        <img
          alt=""
          className="absolute inset-0 size-full object-cover opacity-40"
          src={imgBackground1.src}
        />

        {/* Content */}
        <div className="relative px-4 pt-6 pb-8">
          {/* Heading */}
          <h2 className="font-bold text-[#620000] text-[24px] uppercase leading-snug text-center mb-3">
            TẠI SAO CHỌN TRƯỜNG MẦM NON TÂY ÚC?
          </h2>
          <p className="font-medium text-[#333333] text-[14px] leading-relaxed text-center mb-6">
            Trở thành học sinh của Trường Mầm non Tây Úc, các em sẽ được sinh hoạt và học tập trong môi trường tràn đầy tình yêu thương và sự thấu hiểu. Đó là nền tảng để mỗi bạn nhỏ phát triển{" "}
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

      {/* Scallop bottom */}
      <ScallopBottom fill="#fffefa" />
    </section>
  );
}
