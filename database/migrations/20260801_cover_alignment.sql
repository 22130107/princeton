-- 2026-08-01: Thêm căn chỉnh ảnh (cover position + zoom) cho khối lớp, chương trình học, chương trình giảng dạy.
ALTER TABLE class_programs
  ADD COLUMN cover_position VARCHAR(32) NOT NULL DEFAULT '50% 50%' AFTER image_id,
  ADD COLUMN cover_zoom DECIMAL(4,2) NOT NULL DEFAULT 1.00 AFTER cover_position;

ALTER TABLE curriculum_tracks
  ADD COLUMN cover_position VARCHAR(32) NOT NULL DEFAULT '50% 50%' AFTER image_id,
  ADD COLUMN cover_zoom DECIMAL(4,2) NOT NULL DEFAULT 1.00 AFTER cover_position;

ALTER TABLE teaching_methods
  ADD COLUMN cover_position VARCHAR(32) NOT NULL DEFAULT '50% 50%' AFTER image_id,
  ADD COLUMN cover_zoom DECIMAL(4,2) NOT NULL DEFAULT 1.00 AFTER cover_position;
