import imgLogo from "@/assets/logo1.png";

export default function SiteFooter() {
  return (
    <footer className="bg-[#e8f3e6] text-[#620000]">
      <div className="mx-auto max-w-[1320px] px-5 pb-8 pt-7 md:px-10 md:pb-10 md:pt-8">
        <div className="border-t border-dashed border-[#620000]/25 pt-7">
          <div className="flex flex-col gap-6 pb-7 md:flex-row md:items-start md:justify-between">
            <img
              src={imgLogo.src}
              alt="Princeton Academy"
              className="h-[120px] w-[120px] object-contain"
            />
            <div className="md:text-right">
              <h2 className="text-[28px] font-extrabold uppercase leading-none md:text-[38px]">
                Princeton Academy
              </h2>
              <p className="mt-3 text-[20px] font-semibold leading-7">
                Growing Hearts. Growing Minds. Growing Together!
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-5 border-t border-dashed border-[#620000]/25 pt-7 text-[16px] font-semibold leading-7 md:flex-row md:items-center md:justify-between">
            <p>Số 686 Thuận Phát, Phường A, Quận B, Hà Nội</p>
            <p>0912 345 678</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
