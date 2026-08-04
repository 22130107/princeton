-- 2026-08-02: Thêm tên danh mục riêng cho tiếng Anh (name_en / category_en).
-- Cho phép danh mục "Tổng hợp" hiển thị "General" ở bản tiếng Anh.

ALTER TABLE content_categories
  ADD COLUMN name_en VARCHAR(255) NULL AFTER name;

ALTER TABLE post_categories
  ADD COLUMN name_en VARCHAR(255) NULL AFTER name;

ALTER TABLE teaching_methods
  ADD COLUMN category_en VARCHAR(255) NULL AFTER category;

ALTER TABLE class_programs
  ADD COLUMN category_en VARCHAR(255) NULL AFTER category;

ALTER TABLE curriculum_tracks
  ADD COLUMN category_en VARCHAR(255) NULL AFTER category;