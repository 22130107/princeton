-- 2026-08-02: Add English title/description for teacher team cards.

ALTER TABLE teacher_team_items
  ADD COLUMN title_en VARCHAR(255) NULL AFTER title,
  ADD COLUMN description_en TEXT NULL AFTER description;