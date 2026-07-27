import svgPaths from "../svg-g45k1n1pz5";
import imgChuongTrinhTieuChuanPng from "../../../assets/b6916482933e67cc337ea1071a428e34d7abe5f3.png";

function Heading1() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0 w-full" data-name="Heading 2">
      <div className="[word-break:break-word] flex flex-col font-bold justify-center leading-[0] relative shrink-0 text-[#620000] text-[60px] text-center whitespace-nowrap">
        <p className="leading-[60px]">CHƯƠNG TRÌNH HỌC</p>
      </div>
    </div>
  );
}

function Item() {
  return (
    <div className="bg-[#b80000] flex-[1_0_0] min-w-px relative rounded-tl-[24px] rounded-tr-[24px] self-stretch" data-name="Item">
      <div aria-hidden className="absolute border-[#b80000] border-l-[0.8px] border-r-[0.8px] border-solid border-t-[0.8px] inset-0 pointer-events-none rounded-tl-[24px] rounded-tr-[24px]" />
      <div className="flex flex-col items-center size-full">
        <div className="content-stretch flex flex-col items-center pb-[16px] pt-[16.8px] px-[32.8px] relative size-full">
          <div className="[word-break:break-word] flex flex-col font-extrabold justify-center leading-[0] relative shrink-0 text-[30px] text-center text-white whitespace-nowrap">
            <p className="leading-[45px]">Chương trình Tiêu chuẩn</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Item1() {
  return (
    <div className="bg-white flex-[1_0_0] min-w-px relative rounded-tl-[24px] rounded-tr-[24px] self-stretch" data-name="Item">
      <div aria-hidden className="absolute border-[#b80000] border-l-[0.8px] border-r-[0.8px] border-solid border-t-[0.8px] inset-0 pointer-events-none rounded-tl-[24px] rounded-tr-[24px]" />
      <div className="flex flex-col items-center size-full">
        <div className="content-stretch flex flex-col items-center pb-[16px] pt-[16.8px] px-[32.8px] relative size-full">
          <div className="[word-break:break-word] flex flex-col font-extrabold justify-center leading-[0] relative shrink-0 text-[#b80000] text-[30px] text-center whitespace-nowrap">
            <p className="leading-[45px]">Chương trình Nâng cao</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function List() {
  return (
    <div className="content-stretch flex gap-[12px] h-[77.8px] items-start justify-center overflow-auto relative shrink-0 w-full z-[2]" data-name="List">
      <Item />
      <Item1 />
    </div>
  );
}

function Container91() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-medium justify-center leading-[0] relative shrink-0 text-[#620000] text-[22px] w-full">
        <p className="leading-[33px]">Được xây dựng trên nền tảng Chương trình Giáo dục Mầm {`non của Bộ GD&ĐT Việt Nam cùng Khung Giáo dục Mầm non`} Quốc gia Úc (EYLF), chương trình khuyến khích học sinh tự do khám phá và chủ động học hỏi. Qua mỗi hoạt động, trẻ từng bước hình thành phản xạ giao tiếp tự nhiên, kỹ năng xã hội - cảm xúc, từ đó xây dựng nền tảng vững chắc cho các giai đoạn học tập tiếp theo.</p>
      </div>
    </div>
  );
}

function Container90() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-w-px pb-[16px] relative" data-name="Container">
      <Container91 />
    </div>
  );
}

function ChuongTrinhTieuChuanPng() {
  return (
    <div className="aspect-[575.2000122070312/343.510009765625] relative shrink-0 w-full" data-name="chuong_trinh_tieu_chuan.png">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <img alt="" className="absolute left-0 max-w-none size-full top-0" src={imgChuongTrinhTieuChuanPng.src} />
      </div>
    </div>
  );
}

function Container92() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-w-px overflow-clip relative rounded-[14px]" data-name="Container">
      <ChuongTrinhTieuChuanPng />
    </div>
  );
}

function Container89() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[80px] items-center justify-center relative size-full">
        <Container90 />
        <Container92 />
      </div>
    </div>
  );
}

function BackgroundBorder() {
  return (
    <div className="bg-white relative rounded-bl-[28px] rounded-br-[28px] shrink-0 w-full z-[1]" data-name="Background+Border">
      <div aria-hidden className="absolute border border-[#b80000] border-solid inset-0 pointer-events-none rounded-bl-[28px] rounded-br-[28px]" />
      <div className="content-stretch flex flex-col items-start p-[32.8px] relative size-full">
        <Container89 />
      </div>
    </div>
  );
}

function Container88() {
  return (
    <div className="content-stretch flex flex-col isolate items-start relative shrink-0 w-full" data-name="Container">
      <List />
      <BackgroundBorder />
    </div>
  );
}

function Container87() {
  return (
    <div className="max-w-[1320px] relative shrink-0 w-full" data-name="Container">
      <div className="content-stretch flex flex-col gap-[80px] items-start max-w-[inherit] px-[12px] relative size-full">
        <Heading1 />
        <Container88 />
      </div>
    </div>
  );
}

export default function CurriculumSection() {
  return (
    <div className="absolute bg-[#fff1f1] content-stretch flex flex-col items-start left-0 pb-[80px] pt-[84px] px-[104px] right-0 top-[3642.04px]" data-name="Section">
      <Container87 />
    </div>
  );
}
