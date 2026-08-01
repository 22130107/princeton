-- Thêm khả năng căn chỉnh ảnh (vị trí + zoom) cho card Đội ngũ giảng viên.
-- Chạy trên MySQL: mysql -u root -p princeton_academy < 20260801_teacher_cover.sql
ALTER TABLE teacher_team_items
  ADD COLUMN cover_position VARCHAR(32) NOT NULL DEFAULT '50% 50%' AFTER image_id,
  ADD COLUMN cover_zoom DECIMAL(4,2) NOT NULL DEFAULT 1.00 AFTER cover_position;
