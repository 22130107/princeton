-- 2026-08-02: Gộp song ngữ cho đội ngũ giáo viên và phụ huynh chia sẻ.
-- Import file này một lần thay cho 3 migration rời.

-- 1) Đội ngũ giáo viên
ALTER TABLE teacher_team_items
  ADD COLUMN title_en VARCHAR(255) NULL AFTER title,
  ADD COLUMN description_en TEXT NULL AFTER description;

-- 2) Phụ huynh chia sẻ
ALTER TABLE testimonials
  ADD COLUMN parent_name_en VARCHAR(255) NULL AFTER parent_name,
  ADD COLUMN quote_en TEXT NULL AFTER quote;
