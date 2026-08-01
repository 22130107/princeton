-- 2026-08-01: Thêm căn chỉnh ảnh (cover position + zoom) cho tin tức/sự kiện (posts).
ALTER TABLE posts
  ADD COLUMN cover_position VARCHAR(32) NOT NULL DEFAULT '50% 50%' AFTER cover_image_id,
  ADD COLUMN cover_zoom DECIMAL(4,2) NOT NULL DEFAULT 1.00 AFTER cover_position;
