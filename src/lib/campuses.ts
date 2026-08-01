export type Campus = {
  name: string;
  address: string;
};

export const campuses: Campus[] = [
  {
    name: "Princeton Academy Hải Phòng",
    address: "Số 6, Triệu Việt Vương, KĐT Ecopark, P. Tân Hưng, TP Hải Phòng",
  },
  {
    name: "Princeton Academy Đà Nẵng",
    address: "88 Bắc Sơn, Hoà An, Cẩm Lệ, Đà Nẵng",
  },
  {
    name: "Princeton Academy GeniusCamp Linh Đàm",
    address: "BT5-TT4A, KĐT Tây Nam Linh Đàm, Hà Nội",
  },
  {
    name: "Princeton Academy Hưng Yên",
    address: "Đường Nguyễn Bình, KĐT Lạc Hồng Phúc, Hưng Yên",
  },
  {
    name: "Princeton Academy Premier – Phú Mỹ Hưng",
    address: "33 Đường 16, Khu phố Nam Viên, P. Tân Phú, Quận 7, TP.HCM",
  },
  {
    name: "Học viện Hoàng tử – Princeton Academy",
    address: "45-47 Lê Quý Đôn, Hải Châu, Đà Nẵng",
  },
  {
    name: "Princeton Little House Lai Vu",
    address: "Kiot 19-20, khu chợ và dịch vụ Lại Vu, Lai Khê, Hải Phòng",
  },
];

export function campusMapUrl(address: string) {
  return `https://www.google.com/maps?q=${encodeURIComponent(address)}&output=embed`;
}

export function campusMapLink(address: string) {
  return `https://www.bing.com/maps/search?q=${encodeURIComponent(address)}`;
}
