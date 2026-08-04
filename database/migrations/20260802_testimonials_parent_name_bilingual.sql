-- 2026-08-02: Add English parent-name support for testimonials.

ALTER TABLE testimonials
  ADD COLUMN parent_name_en VARCHAR(255) NULL AFTER parent_name;