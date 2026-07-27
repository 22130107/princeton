import type { StaticImageData } from "next/image";
import imgPenguin from "@/assets/7418d3b6d509d03b45710cdbc11e6c298f5a9959.png";
import imgWombat from "@/assets/3dc1ce007304dd7c637e9e4c763ad7fda6021a35.png";
import imgKoala from "@/assets/d088645c54f44b84375f6cb56aeabe8e06bc006b.png";
import imgKangaroo from "@/assets/d0268a1bfec279b63f5d3717d847ff89893ec9a7.png";
import imgPreschool from "@/assets/58895c008a094b06474cacb153601040cef3cf48.png";

export type ClassProgram = {
  slug: string;
  name: string;
  age: string;
  image: StaticImageData;
  color: string;
  category: string;
  excerpt: string;
  schedule: string[];
};

export const classPrograms: ClassProgram[] = [
  {
    slug: "penguin",
    name: "Penguin",
    age: "2 - 3 tuổi",
    image: imgPenguin,
    color: "#d8f7ff",
    category: "Khối lớp · Mầm non",
    excerpt:
      "Giai đoạn đầu giúp trẻ làm quen nề nếp lớp học, phát triển khả năng tự phục vụ, ngôn ngữ giao tiếp cơ bản và cảm giác an toàn khi đến trường mỗi ngày.",
    schedule: [
      "Đón trẻ, trò chuyện đầu ngày và hoạt động làm quen lớp học.",
      "Vận động nhẹ, âm nhạc, kể chuyện và trò chơi cảm giác phù hợp độ tuổi.",
      "Hoạt động tự phục vụ: rửa tay, cất đồ dùng, ăn uống và nghỉ ngơi theo nề nếp.",
      "Chơi góc, khám phá đồ vật, tương tác cùng cô và bạn trong nhóm nhỏ.",
    ],
  },
  {
    slug: "wombat",
    name: "Wombat",
    age: "3 - 4 tuổi",
    image: imgWombat,
    color: "#fff1cf",
    category: "Khối lớp · Mầm non",
    excerpt:
      "Trẻ được khuyến khích khám phá qua trò chơi, vận động, âm nhạc và hoạt động nhóm nhỏ, từ đó hình thành sự chủ động, tò mò và khả năng kết nối với bạn bè.",
    schedule: [
      "Hoạt động vòng tròn: chào ngày mới, nhận biết cảm xúc và luyện giao tiếp.",
      "Khám phá chủ đề qua hình ảnh, đồ vật, vận động và hoạt động thực hành.",
      "Làm quen tiếng Anh qua bài hát, trò chơi ngôn ngữ và tình huống lớp học.",
      "Hoạt động nghệ thuật, chơi ngoài trời, ăn trưa, ngủ trưa và tổng kết cuối ngày.",
    ],
  },
  {
    slug: "koala",
    name: "Koala",
    age: "4 - 5 tuổi",
    image: imgKoala,
    color: "#dcf6d6",
    category: "Khối lớp · Mầm non",
    excerpt:
      "Chương trình tập trung mở rộng ngôn ngữ, tư duy logic, kỹ năng hợp tác và khả năng thể hiện ý tưởng qua các dự án nhỏ, nghệ thuật và trải nghiệm thực hành.",
    schedule: [
      "Hoạt động ngôn ngữ, kể chuyện, làm quen chữ cái và diễn đạt ý tưởng.",
      "Toán tư duy cơ bản: phân loại, so sánh, đếm, nhận biết hình dạng và quy luật.",
      "Dự án nhỏ theo chủ đề giúp trẻ quan sát, đặt câu hỏi và làm việc nhóm.",
      "Âm nhạc, mỹ thuật, vận động, vui chơi sáng tạo và hoạt động tự lập hằng ngày.",
    ],
  },
  {
    slug: "kangaroo",
    name: "Kangaroo",
    age: "5 - 6 tuổi",
    image: imgKangaroo,
    color: "#ffe0cf",
    category: "Khối lớp · Tiền tiểu học",
    excerpt:
      "Trẻ được chuẩn bị nền tảng sẵn sàng vào tiểu học thông qua hoạt động đọc viết tiền học đường, toán tư duy, kỹ năng tự lập và thói quen học tập tích cực.",
    schedule: [
      "Đọc viết tiền học đường: nhận diện âm, chữ cái, kể chuyện và luyện diễn đạt.",
      "Toán tư duy: số lượng, phép tính đơn giản, đo lường, sắp xếp và giải quyết vấn đề.",
      "Hoạt động dự án, thuyết trình nhỏ và rèn kỹ năng làm việc theo nhóm.",
      "Rèn thói quen học tập: tập trung, hoàn thành nhiệm vụ, tự chuẩn bị đồ dùng cá nhân.",
    ],
  },
  {
    slug: "preschool",
    name: "Preschool",
    age: "5 - 6 tuổi",
    image: imgPreschool,
    color: "#ffd7e0",
    category: "Khối lớp · Tiền tiểu học",
    excerpt:
      "Lớp Preschool củng cố sự tự tin, khả năng giao tiếp song ngữ, tư duy độc lập và kỹ năng thích nghi, giúp trẻ bước vào hành trình học tập tiếp theo thật vững vàng.",
    schedule: [
      "Hoạt động song ngữ theo chủ đề, tăng cường giao tiếp và phản xạ tự nhiên.",
      "Chuẩn bị kỹ năng vào lớp Một: nề nếp học tập, tư duy logic và khả năng tự quản.",
      "Dự án trải nghiệm giúp trẻ trình bày ý tưởng, hợp tác và giải quyết vấn đề.",
      "Tổng kết cuối ngày, chia sẻ cảm xúc, đọc sách và hoạt động thư giãn.",
    ],
  },
];

export function getClassProgram(slug: string) {
  return classPrograms.find((program) => program.slug === slug);
}
