import type { Metadata } from "next";
import EditorialLandingPage from "@/components/Shared/EditorialLandingPage";
import imgHero from "@/assets/87b0baec94bf2f1f980990704ca31b5f776eae03.png";
import imgPlay from "@/assets/d39c1aff5a677c90942c7d65b7625cfdffcc35a1.png";
import imgClass from "@/assets/2f18e7a31d31b9b85df3a6588823571bdaf40d53.png";
import imgActivity from "@/assets/d7d7345887319e335a13681880e24de534f764ac.png";
import imgTeacher from "@/assets/c2bb022ab8d9e25ab685c563473297cc72c94650.png";

export const metadata: Metadata = {
  title: "Phương Pháp Giảng Dạy | Trường Mầm non Princeton",
  description:
    "Khám phá phương pháp giáo dục mầm non tại Trường Mầm non Princeton: học qua chơi, lấy trẻ làm trung tâm và trải nghiệm thực tế.",
  openGraph: {
    title: "Phương Pháp Giảng Dạy | Trường Mầm non Princeton",
    description:
      "Khám phá phương pháp giáo dục mầm non tiên tiến tại Trường Mầm non Princeton.",
  },
};

export default function PhuongPhapGiangDayPage() {
  return (
    <EditorialLandingPage
      eyebrow="Phương pháp giáo dục"
      title="Học qua trải nghiệm, lớn lên bằng sự tò mò"
      description="Princeton kết hợp Play-based Learning, hoạt động dự án và môi trường song ngữ để trẻ học bằng quan sát, vận động, tương tác và cảm xúc tích cực."
      heroImage={imgHero}
      introTitle="Một phương pháp đặt trẻ ở trung tâm"
      introText="Mỗi hoạt động được thiết kế để trẻ được thử, được sai, được hỏi và được tự tin thể hiện. Giáo viên đóng vai trò đồng hành, gợi mở và quan sát nhịp phát triển riêng của từng bạn nhỏ."
      featured={{
        image: imgPlay,
        category: "Giới thiệu",
        date: "Princeton",
        title: "Play-based Learning giúp trẻ tiếp nhận kiến thức tự nhiên hơn",
        excerpt:
          "Thông qua trò chơi, trẻ phát triển khả năng ngôn ngữ, vận động, giao tiếp xã hội và tư duy giải quyết vấn đề trong một môi trường an toàn.",
      }}
      posts={[
        {
          image: imgClass,
          category: "Phương pháp",
          date: "Học tập",
          title: "Lấy trẻ làm trung tâm trong từng hoạt động",
          excerpt:
            "Trẻ được lựa chọn, đặt câu hỏi và khám phá theo cách phù hợp với sở thích cũng như tốc độ phát triển của mình.",
        },
        {
          image: imgActivity,
          category: "Trải nghiệm",
          date: "Hằng ngày",
          title: "Vận động và nghệ thuật song hành cùng học thuật",
          excerpt:
            "Các tiết học kết hợp vận động, âm nhạc, mỹ thuật và hoạt động nhóm để trẻ phát triển cân bằng.",
        },
        {
          image: imgTeacher,
          category: "Giáo viên",
          date: "Đồng hành",
          title: "Quan sát, gợi mở và nuôi dưỡng sự tự tin",
          excerpt:
            "Giáo viên ghi nhận tiến bộ nhỏ mỗi ngày, giúp trẻ cảm thấy mình được tin tưởng và được khích lệ.",
        },
      ]}
    />
  );
}
