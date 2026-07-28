import imgLogo from "../../assets/logo1.png";

export default function MobileFooter() {
  return (
    <footer className="bg-[#e8f3e6]">
      <div className="border-t border-dashed border-[#620000]/25" />

      <div className="px-5 py-8 text-[#620000]">
        <div className="flex items-center gap-4">
          <img src={imgLogo.src} alt="Princeton Academy" className="h-24 w-24 object-contain" />
          <div>
            <h2 className="text-[22px] font-extrabold uppercase leading-tight">
              Princeton Academy
            </h2>
            <p className="mt-1 text-[15px] font-semibold leading-5">
              Growing Hearts. Growing Minds. Growing Together!
            </p>
          </div>
        </div>

        <div className="mt-6 space-y-2 border-t border-dashed border-[#620000]/25 pt-5 text-[14px] font-semibold leading-6">
          <p>Số 686 Thuận Phát, Phường A, Quận B, Hà Nội</p>
          <p>0912 345 678</p>
        </div>
      </div>
    </footer>
  );
}
