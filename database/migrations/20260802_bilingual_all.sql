-- 2026-08-02: Hỗ trợ song ngữ (tiếng Việt / tiếng Anh) cho tất cả nhóm nội dung:
-- tin tức & sự kiện (posts), phương pháp giảng dạy, chương trình học, khối lớp.
-- File gộp dùng để import nhanh; các câu lệnh có cấu trúc an toàn npm prisma theo đúng thứ tự dưới đây.

-- 1) Tin tức & sự kiện
ALTER TABLE posts
  ADD COLUMN title_en VARCHAR(255) NULL AFTER title,
  ADD COLUMN excerpt_en TEXT NULL AFTER excerpt;

ALTER TABLE post_content_blocks
  ADD COLUMN lang ENUM('vi', 'en') NOT NULL DEFAULT 'vi' AFTER post_id;

-- 2) Phương pháp giảng dạy
ALTER TABLE teaching_methods
  ADD COLUMN title_en VARCHAR(255) NULL AFTER title,
  ADD COLUMN description_en TEXT NULL AFTER description,
  ADD COLUMN excerpt_en TEXT NULL AFTER excerpt;

ALTER TABLE teaching_method_content_blocks
  ADD COLUMN lang ENUM('vi', 'en') NOT NULL DEFAULT 'vi' AFTER teaching_method_id;

-- 3) Chương trình học
ALTER TABLE curriculum_tracks
  ADD COLUMN title_en VARCHAR(255) NULL AFTER title,
  ADD COLUMN description_en TEXT NULL AFTER description;

ALTER TABLE curriculum_blocks
  ADD COLUMN lang ENUM('vi', 'en') NOT NULL DEFAULT 'vi' AFTER curriculum_track_id;

-- 4) Khối lớp (class programs) + lịch học
ALTER TABLE class_programs
  ADD COLUMN name_en VARCHAR(255) NULL AFTER name,
  ADD COLUMN age_label_en VARCHAR(255) NULL AFTER age_label,
  ADD COLUMN excerpt_en TEXT NULL AFTER excerpt,
  ADD COLUMN description_en TEXT NULL AFTER description;

ALTER TABLE class_program_schedule_items
  ADD COLUMN lang VARCHAR(8) NOT NULL DEFAULT 'vi' AFTER class_program_id;