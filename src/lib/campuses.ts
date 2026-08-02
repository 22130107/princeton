export type Campus = {
  name: string;
  nameEn?: string;
  address: string;
  addressEn?: string;
};

export const campuses: Campus[] = [
  {
    name: "Princeton Academy Hải Phòng",
    nameEn: "Princeton Academy Hai Phong",
    address: "Số 6, Triệu Việt Vương, KĐT Ecopark, P. Tân Hưng, TP Hải Phòng",
    addressEn: "No. 6, Trieu Viet Vuong, Ecopark, Tan Hung Ward, Hai Phong",
  },
  {
    name: "Princeton Academy Đà Nẵng",
    nameEn: "Princeton Academy Da Nang",
    address: "88 Bắc Sơn, Hoà An, Cẩm Lệ, Đà Nẵng",
    addressEn: "88 Bac Son, Hoa An, Cam Le, Da Nang",
  },
  {
    name: "Princeton Academy GeniusCamp Linh Đàm",
    nameEn: "Princeton Academy GeniusCamp Linh Dam",
    address: "BT5-TT4A, KĐT Tây Nam Linh Đàm, Hà Nội",
    addressEn: "BT5-TT4A, Southwest Linh Dam Urban Area, Hanoi",
  },
  {
    name: "Princeton Academy Hưng Yên",
    nameEn: "Princeton Academy Hung Yen",
    address: "Đường Nguyễn Bình, KĐT Lạc Hồng Phúc, Hưng Yên",
    addressEn: "Nguyen Binh Street, Lac Hong Phuc Urban Area, Hung Yen",
  },
  {
    name: "Princeton Academy Premier – Phú Mỹ Hưng",
    nameEn: "Princeton Academy Premier – Phu My Hung",
    address: "33 Đường 16, Khu phố Nam Viên, P. Tân Phú, Quận 7, TP.HCM",
    addressEn: "33 Street 16, Nam Vien Quarter, Tan Phu Ward, District 7, Ho Chi Minh City",
  },
  {
    name: "Học viện Hoàng tử – Princeton Academy",
    nameEn: "Prince Academy – Princeton Academy",
    address: "45-47 Lê Quý Đôn, Hải Châu, Đà Nẵng",
    addressEn: "45-47 Le Quy Don, Hai Chau, Da Nang",
  },
  {
    name: "Princeton Little House Lai Vu",
    nameEn: "Princeton Little House Lai Vu",
    address: "Kiot 19-20, khu chợ và dịch vụ Lại Vu, Lai Khê, Hải Phòng",
    addressEn: "Stall 19-20, Lai Vu market & service area, Lai Khe, Hai Phong",
  },
];

export function campusMapUrl(address: string) {
  return `https://www.google.com/maps?q=${encodeURIComponent(address)}&output=embed`;
}

export function campusMapLink(address: string) {
  return `https://www.bing.com/maps/search?q=${encodeURIComponent(address)}`;
}
