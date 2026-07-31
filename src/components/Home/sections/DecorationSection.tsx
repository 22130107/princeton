import imgBackground from "../../../assets/bee5417dbe070063f0c2d3142eede9ce83466684.png";
import imgBackground1 from "../../../assets/fe5c6e4aaf890b75876fc2a857981f5398258e61.png";

import iconHocPhi from "../../../assets/eaba4ca5f83295bbec5f110bba97300acac3c3fa.png";
import iconSongNgu from "../../../assets/00e028cd001c8c54794e0ef5c141f7972333f540.png";
import iconMoiTruong from "../../../assets/70f568b2a99aecb158a1240b6747cea60190d528.png";
import iconCanBang from "../../../assets/8b87f86a144ded0861c87061c9e2906b35334cea.png";
import iconBuaAn from "../../../assets/aeb896a42e03cd2fa052159c11cba5a42892fdca.png";
import iconChungNhan from "../../../assets/52ac58af3b511906b500df5fdebc3493147b6014.png";

const CARDS = [
  {
    icon: iconHocPhi,
    title: "Học phí hợp lý & Tối ưu",
    description:
      "Với mức học phí hợp lý, trẻ được tiếp cận môi trường giáo dục chuẩn quốc tế, giúp gia đình tối ưu chi phí mà vẫn đảm bảo con được phát triển toàn diện Thể – Trí – Tâm.",
  },
  {
    icon: iconSongNgu,
    title: "Chương trình Song ngữ Chuẩn Mỹ",
    description:
      "Thời lượng tiếng Anh vượt trội cùng giáo viên bản ngữ giúp trẻ thẩm thấu ngôn ngữ tự nhiên, hình thành Tư duy phản biện sớm (ECT) và tự tin kết nối với thế giới.",
  },
  {
    icon: iconMoiTruong,
    title: "Môi trường An toàn & Tích cực",
    description:
      "Môi trường học tập ấm áp, nơi trẻ luôn cảm thấy an toàn, được lắng nghe, tôn trọng bản sắc riêng và tự do thể hiện suy nghĩ của chính mình.",
  },
  {
    icon: iconCanBang,
    title: "Phương pháp PEAK Độc quyền",
    description:
      'Kết hợp hài hòa giữa kiến thức học thuật và trải nghiệm thực tế ("Học qua trải nghiệm - Chơi có chủ đích"), khơi gợi lòng tò mò và trao cho con niềm tin: "Con tự làm được!".',
  },
  {
    icon: iconBuaAn,
    title: "Dinh dưỡng & Thể chất Toàn diện",
    description:
      "Bữa ăn chuẩn khoa học, phong phú và an toàn tuyệt đối, kết hợp với các hoạt động vận động giúp trẻ phát triển tầm vóc khỏe mạnh và tinh thần minh mẫn.",
  },
  {
    icon: iconChungNhan,
    title: "Hành trang Vững chắc vào Lớp 1",
    description:
      "Trẻ được trang bị trọn vẹn về tư duy, ngôn ngữ, kỹ năng tự lập và nhận Chứng nhận hoàn thành chương trình Mầm non từ Hệ thống Princeton Academy.",
  },
];

function Background() {
  return (
    <div
      className="absolute content-stretch flex flex-col gap-[32px] items-center left-0 pb-[64px] pt-[80px] px-[48px] right-0 top-0 min-h-[1228px]"
      style={{
        maskImage: `url("${imgBackground.src}")`,
        WebkitMaskImage: `url("${imgBackground.src}")`,
        maskSize: "100% 100%",
        WebkitMaskSize: "100% 100%",
        maskRepeat: "no-repeat",
        WebkitMaskRepeat: "no-repeat",
        maskPosition: "center",
        WebkitMaskPosition: "center",
      }}
      data-name="Background"
    >
      {/* Background Image */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
        <img alt="" className="absolute inset-0 size-full object-cover" src={imgBackground1.src} />
      </div>

      {/* Header */}
      <div className="content-stretch flex flex-col items-center text-center gap-4 max-w-[900px] z-10 mt-8">
        <h2 className="font-bold text-[#620000] text-[42px] leading-[1.2] uppercase tracking-wide">
          TẠI SAO CHỌN TRƯỜNG MẦM NON PRINCETON ACADEMY?
        </h2>
        <p className="font-medium text-[#333333] text-[18px] leading-[26px]">
          Trở thành học sinh của Princeton Academy, các em sẽ được sinh hoạt và học tập trong một môi trường an toàn, tràn ngập tình yêu thương và sự thấu hiểu. Đó là nền tảng vững chắc để mỗi bạn nhỏ phát triển nội lực, nuôi dưỡng sự tự tin và hạnh phúc trong suốt hành trình trưởng thành.
        </p>
      </div>

      {/* 6 Cards Grid */}
      <div className="grid grid-cols-3 gap-6 w-full max-w-[1060px] z-10 mt-2">
        {CARDS.map((card, idx) => (
          <div
            key={idx}
            className="bg-[#fff2f2] rounded-[140px] px-7 py-8 min-h-[370px] flex flex-col items-center justify-center text-center shadow-[0_8px_24px_rgba(0,0,0,0.06)] hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
          >
            <div className="w-[96px] h-[96px] flex items-center justify-center mb-3 shrink-0">
              <img alt={card.title} className="max-w-full max-h-full object-contain" src={card.icon.src} />
            </div>
            <h3 className="font-bold text-[#620000] text-[22px] leading-[30px] mb-3">
              {card.title}
            </h3>
            <p className="font-semibold text-[#444444] text-[16px] leading-[26px] max-w-[250px]">
              {card.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function DecorationSection() {
  return (
    <div className="absolute min-h-[1228px] left-[116px] right-[116px] top-[1468px]" data-name="Section">
      <Background />
    </div>
  );
}
