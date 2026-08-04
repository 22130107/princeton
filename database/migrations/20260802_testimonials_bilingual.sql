-- 2026-08-02: Add English testimonial text support.

ALTER TABLE testimonials
  ADD COLUMN quote_en TEXT NULL AFTER quote;