import imgCampus1 from "../../assets/62871bbc160db404d7a748757114301f94ce2edc.png";
import imgCampus2 from "../../assets/876d64d36b6f5a9e6e8957bf3289df528594ef31.png";
import imgFlowers from "../../assets/cfa61d914b57a907c8879eea3242e5037a5a2c78.png";
import imgButton from "../../assets/bdf91aabaa7f4b609bd3d709babf948eb42525bd.png";
import imgCornerTop from "../../assets/45e9cd713cd022e324337d1e9a3d1f01c8086db4.png";
import imgCornerBottom from "../../assets/e2e0d53776626afcb6870acda5507843a053b4ae.png";
import imgMap1 from "../../assets/f1b2a42ef666cbd3fb48c07c35bdce05c87502b3.png";
import imgMap2 from "../../assets/5dbff1ee224f0567f179fd3448503a9e11ae57c2.png";
import imgMap3 from "../../assets/e02ad5b4c3d99997749cd0760949598c658c71fe.png";
import imgMap4 from "../../assets/c230ff021569045e95806d51dbe5b2f14f5e83b5.png";

const campuses = [
  {
    img: imgCampus1,
    name: "Cơ sở 4 Nguyễn Thông",
    address: "P. Xuân Hòa, TP.HCM",
    softBg: "#fff1f1",
  },
  {
    img: imgCampus2,
    name: "Cơ sở 35 Nguyễn Hữu Cảnh",
    address: "P. Thạnh Mỹ Tây, TP.HCM",
    softBg: "#fff1f1",
    bgImage: imgButton,
  },
];

function MobileMapPreview() {
  return (
    <a
      href="https://maps.google.com/?q=Trường+Mầm+non+Princeton+WASS+HCM"
      target="_blank"
      rel="noopener noreferrer"
      className="relative block h-[238px] overflow-hidden rounded-2xl bg-[#e5e3df]"
      aria-label="Xem bản đồ Trường Mầm non Princeton"
    >
      <div className="grid h-full w-full grid-cols-2 grid-rows-2 opacity-95">
        {[imgMap1, imgMap2, imgMap3, imgMap4].map((tile, index) => (
          <img
            key={index}
            src={tile.src}
            alt=""
            className="h-full w-full object-cover"
          />
        ))}
      </div>

      <div className="absolute left-3 top-3 max-w-[230px] rounded-sm bg-white p-3 shadow-[0_1px_4px_rgba(0,0,0,0.28)]">
        <p className="text-[13px] font-medium leading-5 text-[#1f1f1f]">
          WASS - Trường Mầm Non Princeton
        </p>
        <div className="mt-1 flex items-center gap-1 text-[12px] text-[#5e5e5e]">
          <span>4,3</span>
          <span className="text-[#d77d25]">★</span>
          <span>(23)</span>
        </div>
      </div>

      <span className="absolute bottom-3 right-3 rounded-full bg-white px-4 py-2 text-[13px] font-bold text-[#620000] shadow-[0_2px_8px_rgba(0,0,0,0.18)]">
        Xem bản đồ
      </span>
    </a>
  );
}

export default function MobileCampusSection() {
  return (
    <section className="relative overflow-hidden bg-[#fffefa] px-3 py-9">
      <style>{`
        .mobile-campus-stamp::before,
        .mobile-campus-stamp::after,
        .mobile-campus-stamp-holes {
          content: "";
          position: absolute;
          pointer-events: none;
          z-index: 2;
        }
        .mobile-campus-stamp-holes {
          left: 28px;
          right: 28px;
          top: -1px;
          height: 18px;
          background:
            radial-gradient(circle at center top, #fffefa 0 13px, transparent 14px)
            left top / 52px 18px repeat-x;
        }
        .mobile-campus-stamp::before {
          left: -1px;
          top: 34px;
          bottom: 24px;
          width: 18px;
          background:
            radial-gradient(circle at left center, #fffefa 0 13px, transparent 14px)
            left top / 18px 52px repeat-y;
        }
        .mobile-campus-stamp::after {
          right: -1px;
          top: 34px;
          bottom: 24px;
          width: 18px;
          background:
            radial-gradient(circle at right center, #fffefa 0 13px, transparent 14px)
            right top / 18px 52px repeat-y;
        }
      `}</style>

      <img
        src={imgCornerTop.src}
        alt=""
        className="pointer-events-none absolute left-0 top-0 h-16 w-16 object-contain"
      />
      <img
        src={imgCornerBottom.src}
        alt=""
        className="pointer-events-none absolute bottom-0 right-0 h-16 w-16 object-contain"
      />

      <div className="mobile-campus-stamp relative mx-auto max-w-[480px] bg-[#b80000] px-4 pb-4 pt-7 shadow-[3px_4px_0_rgba(112,86,86,0.22)]">
        <span aria-hidden className="mobile-campus-stamp-holes" />

        <div className="relative z-[1] bg-white p-3.5">
          <MobileMapPreview />

          <div className="px-1 pb-2 pt-6">
            <h2 className="text-[28px] font-extrabold uppercase leading-[1.18] text-[#620000]">
              Trường Mầm Non Princeton ngay gần bạn
            </h2>
            <p className="mt-4 text-[15px] font-medium leading-[22px] text-[#620000]">
              Tọa lạc tại các vị trí trung tâm, dễ dàng kết nối với các tuyến đường chính, thuận tiện cho ba mẹ đưa đón trẻ.
            </p>
          </div>

          <div className="mt-3 flex flex-col gap-3">
            {campuses.map((c) => (
              <article
                key={c.name}
                className="relative min-h-[104px] overflow-hidden rounded-3xl"
                style={{
                  backgroundColor: c.softBg,
                  backgroundImage: c.bgImage ? `url("${c.bgImage.src}")` : undefined,
                  backgroundSize: "100% 100%",
                }}
              >
                <div className="relative flex h-full min-h-[104px] items-center gap-4 p-2.5">
                  <img
                    src={c.img.src}
                    alt={c.name}
                    className="h-[86px] w-[96px] shrink-0 rounded-md object-cover"
                  />
                  <div className="min-w-0 flex-1">
                    <h3 className="text-[18px] font-extrabold leading-[22px] text-[#620000]">
                      {c.name}
                    </h3>
                    <p className="mt-2 text-[15px] font-medium leading-5 text-[#620000]">
                      {c.address}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <img
            src={imgFlowers.src}
            alt=""
            className="mx-auto mt-5 h-auto w-[82%] max-w-[360px]"
          />
        </div>
      </div>
    </section>
  );
}
