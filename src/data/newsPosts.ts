import type { StaticImageData } from "next/image";
import imgClassroom from "@/assets/2f18e7a31d31b9b85df3a6588823571bdaf40d53.png";
import imgEventKids from "@/assets/eca0f00994a6add059898b0052a18055c5e2de11.jpg";
import imgTeacher from "@/assets/7152d23b5ad0228ac40827979cdce9d4dfc3a8fb.png";
import imgWorkshop from "@/assets/d442605c9e1be0223245da5e9e29abf7ea1bef64.png";
import imgFacility from "@/assets/d7d7345887319e335a13681880e24de534f764ac.png";
import imgPlayground from "@/assets/7efd1e9d3acc8ad92010b05849be05d4e2943353.png";

export type NewsPost = {
  slug: string;
  image: StaticImageData;
  category: string;
  title: string;
  excerpt: string;
  content: string[];
};

export const newsPosts: NewsPost[] = [
  {
    slug: "mot-ngay-hoc-tap-day-nang-luong-tai-princeton",
    image: imgClassroom,
    category: "Lớp học · Hằng ngày",
    title: "Một ngày học tập đầy năng lượng tại Princeton",
    excerpt:
      "Từ giờ đón trẻ buổi sáng, hoạt động vòng tròn, học theo nhóm nhỏ đến giờ vui chơi cuối ngày, mỗi khoảnh khắc tại Princeton đều được sắp xếp để trẻ rèn sự độc lập, chủ động giao tiếp và tự tin khám phá.",
    content: [
      "Một ngày tại Princeton bắt đầu bằng những khoảnh khắc chào hỏi ấm áp, giúp trẻ cảm thấy an toàn và sẵn sàng bước vào nhịp sinh hoạt cùng bạn bè.",
      "Các hoạt động học tập được tổ chức linh hoạt giữa cá nhân, nhóm nhỏ và cả lớp. Trẻ được khuyến khích quan sát, đặt câu hỏi, tự thử nghiệm và chia sẻ suy nghĩ của mình.",
      "Bên cạnh giờ học, trẻ còn tham gia vận động, nghệ thuật, kể chuyện và các hoạt động tự phục vụ. Mỗi trải nghiệm đều góp phần xây dựng sự tự tin, tính độc lập và khả năng kết nối xã hội.",
    ],
  },
  {
    slug: "ngay-hoi-trai-nghiem-cung-cac-ban-nho-princeton",
    image: imgEventKids,
    category: "Sự kiện · Nổi bật",
    title: "Ngày hội trải nghiệm cùng các bạn nhỏ Princeton",
    excerpt:
      "Ngày hội là dịp để phụ huynh bước vào không gian học tập của con, cùng quan sát các trò chơi tương tác, hoạt động sáng tạo và những phần thể hiện nhỏ giúp trẻ mạnh dạn hơn trước tập thể.",
    content: [
      "Ngày hội trải nghiệm là dịp để phụ huynh quan sát trực tiếp cách trẻ tham gia lớp học, tương tác cùng giáo viên và phối hợp với bạn bè.",
      "Thông qua các trò chơi vận động, hoạt động sáng tạo và phần trình diễn nhỏ, trẻ được thể hiện bản thân trong một không gian quen thuộc, vui vẻ và không áp lực.",
      "Sự đồng hành của gia đình giúp trẻ thêm mạnh dạn, đồng thời tạo nên cầu nối gần gũi giữa nhà trường và phụ huynh trong hành trình phát triển của con.",
    ],
  },
  {
    slug: "sac-mau-van-hoa-trong-cac-hoat-dong-theo-mua",
    image: imgTeacher,
    category: "Lễ hội · Hoạt động",
    title: "Sắc màu văn hóa trong các hoạt động theo mùa",
    excerpt:
      "Các chủ đề theo mùa được chuyển hóa thành hoạt động thực hành gần gũi: trẻ được quan sát trang phục, kể chuyện lễ hội, thử làm sản phẩm thủ công và chia sẻ điều mình yêu thích.",
    content: [
      "Các hoạt động theo mùa giúp trẻ tiếp cận văn hóa bằng trải nghiệm gần gũi thay vì chỉ nghe kể. Trẻ được quan sát, chạm, thử làm và cùng trò chuyện về những điều mình khám phá.",
      "Từ trang phục, món ăn đến câu chuyện lễ hội, mỗi chi tiết đều được giáo viên chuyển hóa thành hoạt động phù hợp với lứa tuổi mầm non.",
      "Qua đó, trẻ hình thành sự tò mò, khả năng ghi nhớ và thái độ tôn trọng với những nét đẹp văn hóa xung quanh mình.",
    ],
  },
  {
    slug: "goc-sang-tao-giup-tre-manh-dan-the-hien-y-tuong",
    image: imgWorkshop,
    category: "Workshop · Khám phá",
    title: "Góc sáng tạo giúp trẻ mạnh dạn thể hiện ý tưởng",
    excerpt:
      "Các workshop nhỏ mở ra không gian để trẻ tự chọn màu sắc, vật liệu và cách thể hiện. Giáo viên đồng hành bằng câu hỏi gợi mở, giúp trẻ tự tin kể câu chuyện của riêng mình.",
    content: [
      "Workshop sáng tạo tại Princeton được thiết kế như một không gian mở để trẻ tự do lựa chọn màu sắc, vật liệu và cách thể hiện.",
      "Giáo viên đóng vai trò gợi mở, đặt câu hỏi và hỗ trợ khi cần, để trẻ giữ được cảm giác làm chủ trong quá trình sáng tạo.",
      "Những sản phẩm nhỏ không chỉ là kết quả của hoạt động nghệ thuật, mà còn là cách trẻ kể câu chuyện, bộc lộ cảm xúc và phát triển tư duy riêng.",
    ],
  },
  {
    slug: "nhung-hinh-anh-dang-nho-tai-princeton",
    image: imgPlayground,
    category: "Khoảnh khắc · Trải nghiệm",
    title: "Những hình ảnh đáng nhớ tại Princeton",
    excerpt:
      "Mỗi nụ cười, mỗi lần trẻ thử điều mới và mỗi khoảnh khắc cùng bạn bè đều là một phần của hành trình lớn lên. Những hình ảnh ấy giúp ba mẹ nhìn thấy con trưởng thành từng ngày.",
    content: [
      "Mỗi ngày đến trường đều có những khoảnh khắc nhỏ đáng nhớ: một nụ cười khi hoàn thành thử thách, một cái nắm tay khi cùng bạn chơi, hay niềm vui khi khám phá điều mới.",
      "Nhà trường lưu giữ các khoảnh khắc này như một phần của hành trình trưởng thành, để phụ huynh có thể nhìn thấy con lớn lên trong môi trường đầy yêu thương.",
      "Những hình ảnh ấy cũng là nguồn động lực để đội ngũ giáo viên tiếp tục tạo nên các trải nghiệm học tập ấm áp và ý nghĩa.",
    ],
  },
  {
    slug: "khong-gian-hoc-tap-an-toan-va-gan-gui",
    image: imgFacility,
    category: "Cơ sở · Không gian",
    title: "Không gian học tập an toàn và gần gũi",
    excerpt:
      "Lớp học, phòng vận động và khu sinh hoạt được bố trí sáng sủa, sạch sẽ, phù hợp với trẻ mầm non. Không gian mở giúp trẻ dễ di chuyển, tương tác và tham gia hoạt động theo nhóm.",
    content: [
      "Không gian tại Princeton được thiết kế sáng sủa, sạch sẽ và phù hợp với nhu cầu sinh hoạt của trẻ mầm non.",
      "Các khu vực học tập, vận động và vui chơi được bố trí để trẻ dễ dàng di chuyển, tương tác và tham gia hoạt động theo nhóm.",
      "Yếu tố an toàn luôn được đặt lên hàng đầu, đồng thời vẫn giữ sự gần gũi để trẻ cảm thấy thoải mái như đang ở một ngôi nhà thứ hai.",
    ],
  },
];

export function getNewsPost(slug: string) {
  return newsPosts.find((post) => post.slug === slug);
}
