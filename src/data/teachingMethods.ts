import { mediaImage, type MediaImage } from "@/lib/media-url";

export type TeachingMethod = {
  slug: string;
  image: MediaImage;
  category: string;
  title: string;
  description: string;
  excerpt: string;
  background: string;
  content: string[];
};

export const teachingMethods: TeachingMethod[] = [
  {
    slug: "ket-hop-nhieu-phuong-phap",
    image: mediaImage("4067071ed218b109a3b3d760ab5b856a1c4d1556.png"),
    category: "Phương pháp · Tổng hợp",
    title: "Kết hợp nhiều phương pháp",
    background: "#fffefa",
    description:
      "Trẻ được tiếp cận các phương pháp giáo dục hiện đại, nổi bật là Play-based Learning, giúp trẻ học tập thông qua các hoạt động vui chơi và tiếp thu kiến thức một cách tự nhiên.",
    excerpt:
      "Princeton kết hợp nhiều cách tiếp cận trong cùng một ngày học để trẻ được quan sát, vận động, chơi, trò chuyện và tự mình xây dựng hiểu biết.",
    content: [
      "Ở lứa tuổi mầm non, trẻ học tốt nhất khi được trải nghiệm bằng nhiều giác quan. Vì vậy, các hoạt động tại Princeton không tách rời học thuật khỏi vui chơi, vận động, âm nhạc, nghệ thuật và giao tiếp hằng ngày.",
      "Play-based Learning được lồng ghép trong các giờ học để trẻ tiếp nhận kiến thức một cách tự nhiên. Khi chơi, trẻ được thử nghiệm, đặt câu hỏi, nhận ra quy luật và rèn khả năng giải quyết vấn đề trong bối cảnh gần gũi.",
      "Sự kết hợp linh hoạt giữa các phương pháp giúp mỗi bạn nhỏ có nhiều cơ hội thể hiện điểm mạnh của mình, đồng thời phát triển cân bằng về ngôn ngữ, nhận thức, cảm xúc và kỹ năng xã hội.",
    ],
  },
  {
    slug: "lay-tre-lam-trung-tam",
    image: mediaImage("6fcde84113072aa66cc43c4fc5efa3b2d4e6feb8.png"),
    category: "Phương pháp · Cá nhân hóa",
    title: "Lấy trẻ làm trung tâm",
    background: "#fff1f1",
    description:
      "Trẻ được tôn trọng sở thích, bản sắc cá nhân và nhịp độ phát triển. Thầy cô tạo cơ hội để trẻ chủ động khám phá, đặt câu hỏi và học hỏi theo cách riêng của mình.",
    excerpt:
      "Mỗi hoạt động được thiết kế để trẻ có quyền lựa chọn, được lắng nghe và được phát triển theo nhịp riêng trong một môi trường an toàn.",
    content: [
      "Lấy trẻ làm trung tâm nghĩa là giáo viên bắt đầu từ nhu cầu, sở thích và khả năng hiện tại của từng bạn nhỏ. Trẻ không chỉ làm theo hướng dẫn mà được tham gia vào quá trình khám phá và xây dựng trải nghiệm học tập.",
      "Trong lớp học, thầy cô quan sát cách trẻ tương tác, đặt câu hỏi và phản hồi với từng hoạt động. Từ đó, giáo viên điều chỉnh nhịp độ, mức độ hỗ trợ và cách gợi mở để trẻ cảm thấy mình được tin tưởng.",
      "Cách tiếp cận này giúp trẻ hình thành sự tự tin, khả năng tự lựa chọn và tinh thần chủ động. Đây là nền tảng quan trọng để trẻ sẵn sàng học hỏi trong những giai đoạn tiếp theo.",
    ],
  },
  {
    slug: "khai-phong-tu-duy",
    image: mediaImage("ba09fe820d0f9cb663b24826afea30ad6fc2c8a2.png"),
    category: "Phương pháp · Sáng tạo",
    title: "Khai phóng tư duy",
    background: "#e8f3e6",
    description:
      "Trẻ được tham gia các hoạt động đa dạng trong lớp và sau giờ học như Câu lạc bộ, Học tập thực tế, sự kiện, từ đó phát triển tư duy độc lập và tự do thể hiện bản thân.",
    excerpt:
      "Các trải nghiệm đa dạng giúp trẻ mạnh dạn đặt câu hỏi, thử cách làm mới và tự do thể hiện ý tưởng theo ngôn ngữ của riêng mình.",
    content: [
      "Tư duy của trẻ được khai mở khi trẻ có đủ không gian để thử, sai, sửa và thử lại. Princeton tạo ra những hoạt động cho phép trẻ khám phá vật liệu, âm thanh, chuyển động, câu chuyện và các tình huống đời sống gần gũi.",
      "Các câu lạc bộ, hoạt động sự kiện và học tập thực tế giúp trẻ bước ra khỏi khuôn mẫu của một tiết học thông thường. Trẻ được quan sát thế giới, kết nối điều mình biết với trải nghiệm mới và tự tin chia sẻ phát hiện của mình.",
      "Khi ý tưởng của trẻ được lắng nghe, trẻ dần hình thành tư duy độc lập. Điều này không chỉ giúp trẻ sáng tạo hơn mà còn biết diễn đạt suy nghĩ, cảm xúc và lựa chọn của bản thân.",
    ],
  },
  {
    slug: "hoc-qua-tuong-tac-hop-tac",
    image: mediaImage("aa47a37d3cb1c1b806218e09ba36b08f5e7c4d55.png"),
    category: "Phương pháp · Xã hội",
    title: "Học qua tương tác & hợp tác",
    background: "#e1f7fb",
    description:
      "Trẻ phát triển kỹ năng xã hội, khả năng lắng nghe thông qua các hoạt động giao tiếp, chia sẻ và hợp tác với bạn bè, thầy cô và môi trường xung quanh.",
    excerpt:
      "Thông qua hoạt động nhóm, trẻ học cách lắng nghe, chờ đến lượt, chia sẻ ý tưởng và cùng bạn hoàn thành nhiệm vụ nhỏ.",
    content: [
      "Kỹ năng xã hội của trẻ được hình thành qua những tương tác nhỏ mỗi ngày: cùng bạn xếp hình, chia sẻ đồ chơi, tham gia trò chơi nhóm hoặc cùng thầy cô giải quyết một tình huống trong lớp.",
      "Giáo viên đóng vai trò hướng dẫn cách trẻ giao tiếp tích cực, biết lắng nghe và bày tỏ nhu cầu của mình bằng lời nói phù hợp. Những kỹ năng này được rèn luyện tự nhiên trong sinh hoạt hằng ngày.",
      "Khi được hợp tác trong môi trường an toàn, trẻ học cách tôn trọng sự khác biệt, biết hỗ trợ bạn bè và cảm nhận niềm vui khi cùng nhau hoàn thành một điều có ý nghĩa.",
    ],
  },
];

export function getTeachingMethod(slug: string) {
  return teachingMethods.find((method) => method.slug === slug);
}
