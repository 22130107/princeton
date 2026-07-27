import imgCampus1 from "../../assets/62871bbc160db404d7a748757114301f94ce2edc.png";
import imgCampus2 from "../../assets/876d64d36b6f5a9e6e8957bf3289df528594ef31.png";

const campuses = [
  {
    img: imgCampus1,
    name: "Cơ sở 4 Nguyễn Thông",
    address: "P. Xuân Hòa, TP.HCM",
  },
  {
    img: imgCampus2,
    name: "Cơ sở 35 Nguyễn Hữu Cảnh",
    address: "P. Thạnh Mỹ Tây, TP.HCM",
  },
];

export default function MobileCampusSection() {
  return (
    <section className="bg-[#fffbf3] px-4 py-10">
      <h2 className="text-[#620000] font-bold text-[22px] uppercase leading-snug mb-2">
        TRƯỜNG MẦM NON PRINCETON NGAY GẦN BẠN
      </h2>
      <p className="text-[#620000] font-medium text-[13px] leading-relaxed mb-6">
        Tọa lạc tại các vị trí trung tâm, dễ dàng kết nối với các tuyến đường chính, thuận tiện cho ba mẹ đưa đón trẻ.
      </p>

      <div className="flex flex-col gap-4">
        {campuses.map((c) => (
          <div
            key={c.name}
            className="bg-[#fff1f1] rounded-2xl border border-[#b80000]/20 flex items-center gap-3 p-3 shadow-sm"
          >
            <img
              src={c.img.src}
              alt={c.name}
              className="w-20 h-16 object-cover rounded-xl shrink-0"
            />
            <div>
              <h3 className="text-[#620000] font-bold text-[14px] leading-snug">{c.name}</h3>
              <p className="text-[#620000] font-medium text-[13px] mt-0.5">{c.address}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Map embed placeholder */}
      <div className="mt-5 rounded-2xl overflow-hidden border border-[#b80000]/20 shadow-sm bg-[#e5e3df] h-48 flex items-center justify-center">
        <a
          href="https://maps.google.com/?q=Trường+Mầm+non+Princeton+WASS+HCM"
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center gap-2 no-underline"
        >
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#b80000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
          <span className="text-[#620000] font-semibold text-[13px]">Xem bản đồ</span>
        </a>
      </div>
    </section>
  );
}
