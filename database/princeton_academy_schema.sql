CREATE DATABASE IF NOT EXISTS princeton_academy
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE princeton_academy;

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

DROP TABLE IF EXISTS audit_logs;
DROP TABLE IF EXISTS lead_status_history;
DROP TABLE IF EXISTS lead_notes;
DROP TABLE IF EXISTS lead_assignments;
DROP TABLE IF EXISTS lead_consents;
DROP TABLE IF EXISTS registration_schedules;
DROP TABLE IF EXISTS enrollment_leads;
DROP TABLE IF EXISTS campaign_countdowns;
DROP TABLE IF EXISTS campaigns;
DROP TABLE IF EXISTS post_tag_relations;
DROP TABLE IF EXISTS post_content_blocks;
DROP TABLE IF EXISTS post_tags;
DROP TABLE IF EXISTS posts;
DROP TABLE IF EXISTS post_categories;
DROP TABLE IF EXISTS content_categories;
DROP TABLE IF EXISTS teaching_method_content_blocks;
DROP TABLE IF EXISTS teaching_methods;
DROP TABLE IF EXISTS curriculum_blocks;
DROP TABLE IF EXISTS curriculum_tracks;
DROP TABLE IF EXISTS class_program_schedule_items;
DROP TABLE IF EXISTS class_programs;
DROP TABLE IF EXISTS campus_contacts;
DROP TABLE IF EXISTS campus_images;
DROP TABLE IF EXISTS campuses;
DROP TABLE IF EXISTS teacher_team_items;
DROP TABLE IF EXISTS facility_images;
DROP TABLE IF EXISTS testimonials;
DROP TABLE IF EXISTS gallery_items;
DROP TABLE IF EXISTS stats;
DROP TABLE IF EXISTS home_sections;
DROP TABLE IF EXISTS hero_slides;
DROP TABLE IF EXISTS seo_meta;
DROP TABLE IF EXISTS cms_pages;
DROP TABLE IF EXISTS navigation_items;
DROP TABLE IF EXISTS site_settings;
DROP TABLE IF EXISTS social_links;
DROP TABLE IF EXISTS media_assets;
DROP TABLE IF EXISTS user_roles;
DROP TABLE IF EXISTS roles;
DROP TABLE IF EXISTS users;

SET FOREIGN_KEY_CHECKS = 1;

CREATE TABLE users (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  email VARCHAR(255) NOT NULL,
  password_hash VARCHAR(255) NULL,
  full_name VARCHAR(255) NOT NULL,
  phone VARCHAR(32) NULL,
  status ENUM('active', 'inactive', 'invited') NOT NULL DEFAULT 'active',
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY users_email_unique (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE roles (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  code VARCHAR(64) NOT NULL,
  name VARCHAR(128) NOT NULL,
  description TEXT NULL,
  PRIMARY KEY (id),
  UNIQUE KEY roles_code_unique (code)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE user_roles (
  user_id BIGINT UNSIGNED NOT NULL,
  role_id BIGINT UNSIGNED NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (user_id, role_id),
  CONSTRAINT user_roles_user_fk FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  CONSTRAINT user_roles_role_fk FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE media_assets (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  disk VARCHAR(64) NOT NULL DEFAULT 'local',
  file_name VARCHAR(255) NOT NULL,
  original_name VARCHAR(255) NULL,
  mime_type VARCHAR(128) NULL,
  url TEXT NOT NULL,
  alt_text VARCHAR(255) NULL,
  width INT UNSIGNED NULL,
  height INT UNSIGNED NULL,
  size_bytes BIGINT UNSIGNED NULL,
  folder VARCHAR(255) NULL,
  created_by BIGINT UNSIGNED NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  KEY media_assets_created_by_idx (created_by),
  CONSTRAINT media_assets_created_by_fk FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE site_settings (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  setting_key VARCHAR(128) NOT NULL,
  setting_value JSON NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY site_settings_key_unique (setting_key)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE social_links (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  platform VARCHAR(64) NOT NULL,
  label VARCHAR(128) NOT NULL,
  url TEXT NOT NULL,
  icon_media_id BIGINT UNSIGNED NULL,
  sort_order INT NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  KEY social_links_icon_media_idx (icon_media_id),
  CONSTRAINT social_links_icon_media_fk FOREIGN KEY (icon_media_id) REFERENCES media_assets(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE navigation_items (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  location ENUM('header', 'mobile_header', 'footer') NOT NULL,
  parent_id BIGINT UNSIGNED NULL,
  label VARCHAR(255) NOT NULL,
  href VARCHAR(255) NOT NULL,
  sort_order INT NOT NULL DEFAULT 0,
  is_cta BOOLEAN NOT NULL DEFAULT FALSE,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  KEY navigation_items_parent_idx (parent_id),
  CONSTRAINT navigation_items_parent_fk FOREIGN KEY (parent_id) REFERENCES navigation_items(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE cms_pages (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  slug VARCHAR(255) NOT NULL,
  title VARCHAR(255) NOT NULL,
  excerpt TEXT NULL,
  content JSON NULL,
  status ENUM('draft', 'published', 'archived') NOT NULL DEFAULT 'draft',
  published_at DATETIME NULL,
  created_by BIGINT UNSIGNED NULL,
  updated_by BIGINT UNSIGNED NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY cms_pages_slug_unique (slug),
  KEY cms_pages_status_idx (status),
  CONSTRAINT cms_pages_created_by_fk FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET NULL,
  CONSTRAINT cms_pages_updated_by_fk FOREIGN KEY (updated_by) REFERENCES users(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE seo_meta (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  entity_type VARCHAR(64) NOT NULL,
  entity_id BIGINT UNSIGNED NOT NULL,
  meta_title VARCHAR(255) NULL,
  meta_description TEXT NULL,
  canonical_url TEXT NULL,
  og_title VARCHAR(255) NULL,
  og_description TEXT NULL,
  og_image_id BIGINT UNSIGNED NULL,
  robots VARCHAR(128) NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY seo_meta_entity_unique (entity_type, entity_id),
  KEY seo_meta_og_image_idx (og_image_id),
  CONSTRAINT seo_meta_og_image_fk FOREIGN KEY (og_image_id) REFERENCES media_assets(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE hero_slides (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  title VARCHAR(255) NULL,
  subtitle TEXT NULL,
  desktop_image_id BIGINT UNSIGNED NULL,
  mobile_image_id BIGINT UNSIGNED NULL,
  desktop_object_position VARCHAR(32) NOT NULL DEFAULT '50% 50%',
  desktop_zoom DECIMAL(4,2) NOT NULL DEFAULT 1.00,
  mobile_object_position VARCHAR(32) NOT NULL DEFAULT '50% 50%',
  mobile_zoom DECIMAL(4,2) NOT NULL DEFAULT 1.00,
  cta_label VARCHAR(128) NULL,
  cta_href VARCHAR(255) NULL,
  sort_order INT NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  starts_at DATETIME NULL,
  ends_at DATETIME NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  KEY hero_slides_desktop_image_idx (desktop_image_id),
  KEY hero_slides_mobile_image_idx (mobile_image_id),
  CONSTRAINT hero_slides_desktop_image_fk FOREIGN KEY (desktop_image_id) REFERENCES media_assets(id) ON DELETE SET NULL,
  CONSTRAINT hero_slides_mobile_image_fk FOREIGN KEY (mobile_image_id) REFERENCES media_assets(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE home_sections (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  section_key VARCHAR(128) NOT NULL,
  title VARCHAR(255) NULL,
  subtitle TEXT NULL,
  config JSON NULL,
  sort_order INT NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY home_sections_key_unique (section_key)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE stats (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  stat_key VARCHAR(128) NOT NULL,
  value_text VARCHAR(64) NOT NULL,
  label VARCHAR(255) NOT NULL,
  description TEXT NULL,
  icon_media_id BIGINT UNSIGNED NULL,
  sort_order INT NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY stats_key_unique (stat_key),
  CONSTRAINT stats_icon_media_fk FOREIGN KEY (icon_media_id) REFERENCES media_assets(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE gallery_items (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  title VARCHAR(255) NULL,
  description TEXT NULL,
  image_id BIGINT UNSIGNED NOT NULL,
  sort_order INT NOT NULL DEFAULT 0,
  is_featured BOOLEAN NOT NULL DEFAULT FALSE,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  KEY gallery_items_image_idx (image_id),
  CONSTRAINT gallery_items_image_fk FOREIGN KEY (image_id) REFERENCES media_assets(id) ON DELETE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE testimonials (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  parent_name VARCHAR(255) NOT NULL,
  parent_name_en VARCHAR(255) NULL,
  student_name VARCHAR(255) NULL,
  avatar_id BIGINT UNSIGNED NULL,
  quote TEXT NOT NULL,
  quote_en TEXT NULL,
  rating DECIMAL(2,1) NULL,
  reaction_image_id BIGINT UNSIGNED NULL,
  sort_order INT NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  CONSTRAINT testimonials_avatar_fk FOREIGN KEY (avatar_id) REFERENCES media_assets(id) ON DELETE SET NULL,
  CONSTRAINT testimonials_reaction_image_fk FOREIGN KEY (reaction_image_id) REFERENCES media_assets(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE facility_images (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  title VARCHAR(255) NULL,
  description TEXT NULL,
  image_id BIGINT UNSIGNED NOT NULL,
  campus_id BIGINT UNSIGNED NULL,
  sort_order INT NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  KEY facility_images_image_idx (image_id),
  KEY facility_images_campus_idx (campus_id),
  CONSTRAINT facility_images_image_fk FOREIGN KEY (image_id) REFERENCES media_assets(id) ON DELETE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE teacher_team_items (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  title VARCHAR(255) NOT NULL,
  title_en VARCHAR(255) NULL,
  description TEXT NULL,
  description_en TEXT NULL,
  image_id BIGINT UNSIGNED NULL,
  cover_position VARCHAR(32) NOT NULL DEFAULT '50% 50%',
  cover_zoom DECIMAL(4,2) NOT NULL DEFAULT 1.00,
  color_hex VARCHAR(32) NULL,
  shape_class VARCHAR(255) NULL,
  rotate_class VARCHAR(255) NULL,
  sort_order INT NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  KEY teacher_team_items_image_idx (image_id),
  CONSTRAINT teacher_team_items_image_fk FOREIGN KEY (image_id) REFERENCES media_assets(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE campuses (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  slug VARCHAR(255) NOT NULL,
  name VARCHAR(255) NOT NULL,
  address_line TEXT NOT NULL,
  ward VARCHAR(255) NULL,
  district VARCHAR(255) NULL,
  city VARCHAR(255) NULL,
  latitude DECIMAL(10,7) NULL,
  longitude DECIMAL(10,7) NULL,
  map_embed_url TEXT NULL,
  map_place_id VARCHAR(255) NULL,
  cover_image_id BIGINT UNSIGNED NULL,
  sort_order INT NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY campuses_slug_unique (slug),
  CONSTRAINT campuses_cover_image_fk FOREIGN KEY (cover_image_id) REFERENCES media_assets(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

ALTER TABLE facility_images
  ADD CONSTRAINT facility_images_campus_fk FOREIGN KEY (campus_id) REFERENCES campuses(id) ON DELETE SET NULL;

CREATE TABLE campus_images (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  campus_id BIGINT UNSIGNED NOT NULL,
  image_id BIGINT UNSIGNED NOT NULL,
  title VARCHAR(255) NULL,
  sort_order INT NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  KEY campus_images_campus_idx (campus_id),
  KEY campus_images_image_idx (image_id),
  CONSTRAINT campus_images_campus_fk FOREIGN KEY (campus_id) REFERENCES campuses(id) ON DELETE CASCADE,
  CONSTRAINT campus_images_image_fk FOREIGN KEY (image_id) REFERENCES media_assets(id) ON DELETE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE campus_contacts (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  campus_id BIGINT UNSIGNED NOT NULL,
  contact_type ENUM('phone', 'email', 'zalo', 'messenger', 'other') NOT NULL,
  label VARCHAR(128) NULL,
  value VARCHAR(255) NOT NULL,
  sort_order INT NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  KEY campus_contacts_campus_idx (campus_id),
  CONSTRAINT campus_contacts_campus_fk FOREIGN KEY (campus_id) REFERENCES campuses(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE class_programs (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  slug VARCHAR(255) NOT NULL,
  name VARCHAR(255) NOT NULL,
  age_min INT UNSIGNED NULL,
  age_max INT UNSIGNED NULL,
  age_label VARCHAR(64) NOT NULL,
  category VARCHAR(255) NULL,
  excerpt TEXT NULL,
  description TEXT NULL,
  image_id BIGINT UNSIGNED NULL,
  cover_position VARCHAR(32) NOT NULL DEFAULT '50% 50%',
  cover_zoom DECIMAL(4,2) NOT NULL DEFAULT 1.00,
  color_hex VARCHAR(16) NULL,
  sort_order INT NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY class_programs_slug_unique (slug),
  CONSTRAINT class_programs_image_fk FOREIGN KEY (image_id) REFERENCES media_assets(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE class_program_schedule_items (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  class_program_id BIGINT UNSIGNED NOT NULL,
  title VARCHAR(255) NULL,
  description TEXT NOT NULL,
  start_time TIME NULL,
  end_time TIME NULL,
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  KEY class_program_schedule_program_idx (class_program_id),
  CONSTRAINT class_program_schedule_program_fk FOREIGN KEY (class_program_id) REFERENCES class_programs(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE curriculum_tracks (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  slug VARCHAR(255) NOT NULL,
  title VARCHAR(255) NOT NULL,
  category VARCHAR(255) NULL,
  description TEXT NULL,
  image_id BIGINT UNSIGNED NULL,
  cover_position VARCHAR(32) NOT NULL DEFAULT '50% 50%',
  cover_zoom DECIMAL(4,2) NOT NULL DEFAULT 1.00,
  logo_media_id BIGINT UNSIGNED NULL,
  sort_order INT NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY curriculum_tracks_slug_unique (slug),
  CONSTRAINT curriculum_tracks_image_fk FOREIGN KEY (image_id) REFERENCES media_assets(id) ON DELETE SET NULL,
  CONSTRAINT curriculum_tracks_logo_fk FOREIGN KEY (logo_media_id) REFERENCES media_assets(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE curriculum_blocks (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  curriculum_track_id BIGINT UNSIGNED NOT NULL,
  block_type ENUM('paragraph', 'heading', 'image', 'list', 'quote') NOT NULL DEFAULT 'paragraph',
  content JSON NOT NULL,
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  KEY curriculum_blocks_track_idx (curriculum_track_id),
  CONSTRAINT curriculum_blocks_track_fk FOREIGN KEY (curriculum_track_id) REFERENCES curriculum_tracks(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE teaching_methods (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  slug VARCHAR(255) NOT NULL,
  title VARCHAR(255) NOT NULL,
  category VARCHAR(255) NULL,
  description TEXT NULL,
  excerpt TEXT NULL,
  image_id BIGINT UNSIGNED NULL,
  cover_position VARCHAR(32) NOT NULL DEFAULT '50% 50%',
  cover_zoom DECIMAL(4,2) NOT NULL DEFAULT 1.00,
  background_hex VARCHAR(16) NULL,
  sort_order INT NOT NULL DEFAULT 0,
  status ENUM('draft', 'published', 'archived') NOT NULL DEFAULT 'published',
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY teaching_methods_slug_unique (slug),
  KEY teaching_methods_status_idx (status),
  CONSTRAINT teaching_methods_image_fk FOREIGN KEY (image_id) REFERENCES media_assets(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE teaching_method_content_blocks (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  teaching_method_id BIGINT UNSIGNED NOT NULL,
  block_type ENUM('paragraph', 'heading', 'image', 'list', 'quote') NOT NULL DEFAULT 'paragraph',
  content JSON NOT NULL,
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  KEY teaching_method_blocks_method_idx (teaching_method_id),
  CONSTRAINT teaching_method_blocks_method_fk FOREIGN KEY (teaching_method_id) REFERENCES teaching_methods(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE content_categories (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  scope VARCHAR(64) NOT NULL,
  slug VARCHAR(255) NOT NULL,
  name VARCHAR(255) NOT NULL,
  sort_order INT NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY content_categories_scope_slug_unique (scope, slug)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE post_categories (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  slug VARCHAR(255) NOT NULL,
  name VARCHAR(255) NOT NULL,
  description TEXT NULL,
  sort_order INT NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY post_categories_slug_unique (slug)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE posts (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  slug VARCHAR(255) NOT NULL,
  title VARCHAR(255) NOT NULL,
  excerpt TEXT NULL,
  category_id BIGINT UNSIGNED NULL,
  cover_image_id BIGINT UNSIGNED NULL,
  cover_position VARCHAR(32) NOT NULL DEFAULT '50% 50%',
  cover_zoom DECIMAL(4,2) NOT NULL DEFAULT 1.00,
  post_type ENUM('news', 'event', 'activity') NOT NULL DEFAULT 'news',
  status ENUM('draft', 'published', 'archived') NOT NULL DEFAULT 'draft',
  published_at DATETIME NULL,
  event_starts_at DATETIME NULL,
  event_ends_at DATETIME NULL,
  event_location VARCHAR(255) NULL,
  created_by BIGINT UNSIGNED NULL,
  updated_by BIGINT UNSIGNED NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY posts_slug_unique (slug),
  KEY posts_category_idx (category_id),
  KEY posts_status_published_idx (status, published_at),
  FULLTEXT KEY posts_search_fulltext (title, excerpt),
  CONSTRAINT posts_category_fk FOREIGN KEY (category_id) REFERENCES post_categories(id) ON DELETE SET NULL,
  CONSTRAINT posts_cover_image_fk FOREIGN KEY (cover_image_id) REFERENCES media_assets(id) ON DELETE SET NULL,
  CONSTRAINT posts_created_by_fk FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET NULL,
  CONSTRAINT posts_updated_by_fk FOREIGN KEY (updated_by) REFERENCES users(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE post_content_blocks (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  post_id BIGINT UNSIGNED NOT NULL,
  block_type ENUM('paragraph', 'heading', 'image', 'gallery', 'quote', 'html') NOT NULL DEFAULT 'paragraph',
  content JSON NOT NULL,
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  KEY post_content_blocks_post_idx (post_id),
  CONSTRAINT post_content_blocks_post_fk FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE post_tags (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  slug VARCHAR(255) NOT NULL,
  name VARCHAR(255) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY post_tags_slug_unique (slug)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE post_tag_relations (
  post_id BIGINT UNSIGNED NOT NULL,
  tag_id BIGINT UNSIGNED NOT NULL,
  PRIMARY KEY (post_id, tag_id),
  CONSTRAINT post_tag_relations_post_fk FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE,
  CONSTRAINT post_tag_relations_tag_fk FOREIGN KEY (tag_id) REFERENCES post_tags(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE campaigns (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  slug VARCHAR(255) NOT NULL,
  name VARCHAR(255) NOT NULL,
  description TEXT NULL,
  offer_text TEXT NULL,
  starts_at DATETIME NULL,
  ends_at DATETIME NULL,
  status ENUM('draft', 'active', 'paused', 'ended') NOT NULL DEFAULT 'draft',
  landing_page VARCHAR(255) NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY campaigns_slug_unique (slug),
  KEY campaigns_status_idx (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE campaign_countdowns (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  campaign_id BIGINT UNSIGNED NOT NULL,
  label VARCHAR(255) NULL,
  target_at DATETIME NOT NULL,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  KEY campaign_countdowns_campaign_idx (campaign_id),
  CONSTRAINT campaign_countdowns_campaign_fk FOREIGN KEY (campaign_id) REFERENCES campaigns(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE enrollment_leads (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  parent_name VARCHAR(255) NOT NULL,
  phone VARCHAR(32) NOT NULL,
  email VARCHAR(255) NULL,
  student_name VARCHAR(255) NULL,
  student_birthdate DATE NULL,
  class_program_id BIGINT UNSIGNED NULL,
  interested_grade_label VARCHAR(255) NULL,
  campus_id BIGINT UNSIGNED NULL,
  campaign_id BIGINT UNSIGNED NULL,
  source_page VARCHAR(255) NULL,
  source_device ENUM('desktop', 'mobile', 'tablet', 'unknown') NOT NULL DEFAULT 'unknown',
  utm_source VARCHAR(255) NULL,
  utm_medium VARCHAR(255) NULL,
  utm_campaign VARCHAR(255) NULL,
  utm_content VARCHAR(255) NULL,
  utm_term VARCHAR(255) NULL,
  status ENUM('new', 'contacted', 'appointment_booked', 'enrolled', 'lost', 'spam') NOT NULL DEFAULT 'new',
  assigned_to BIGINT UNSIGNED NULL,
  message TEXT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  KEY enrollment_leads_phone_idx (phone),
  KEY enrollment_leads_email_idx (email),
  KEY enrollment_leads_status_idx (status),
  KEY enrollment_leads_class_program_idx (class_program_id),
  KEY enrollment_leads_campaign_idx (campaign_id),
  CONSTRAINT enrollment_leads_class_program_fk FOREIGN KEY (class_program_id) REFERENCES class_programs(id) ON DELETE SET NULL,
  CONSTRAINT enrollment_leads_campus_fk FOREIGN KEY (campus_id) REFERENCES campuses(id) ON DELETE SET NULL,
  CONSTRAINT enrollment_leads_campaign_fk FOREIGN KEY (campaign_id) REFERENCES campaigns(id) ON DELETE SET NULL,
  CONSTRAINT enrollment_leads_assigned_to_fk FOREIGN KEY (assigned_to) REFERENCES users(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE registration_schedules (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  lead_id BIGINT UNSIGNED NOT NULL,
  requested_at DATETIME NULL,
  status ENUM('new', 'confirmed', 'completed', 'cancelled', 'no_show') NOT NULL DEFAULT 'new',
  email_status ENUM('pending', 'sent', 'failed', 'skipped') NOT NULL DEFAULT 'pending',
  email_sent_at DATETIME NULL,
  email_error TEXT NULL,
  internal_note TEXT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY registration_schedules_lead_unique (lead_id),
  KEY registration_schedules_requested_idx (requested_at),
  KEY registration_schedules_status_idx (status),
  CONSTRAINT registration_schedules_lead_fk FOREIGN KEY (lead_id) REFERENCES enrollment_leads(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE lead_consents (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  lead_id BIGINT UNSIGNED NOT NULL,
  consent_type VARCHAR(128) NOT NULL DEFAULT 'personal_data_processing',
  consent_text TEXT NOT NULL,
  consent_version VARCHAR(64) NOT NULL DEFAULT 'v1',
  accepted BOOLEAN NOT NULL DEFAULT TRUE,
  accepted_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  ip_address VARCHAR(64) NULL,
  user_agent TEXT NULL,
  PRIMARY KEY (id),
  KEY lead_consents_lead_idx (lead_id),
  CONSTRAINT lead_consents_lead_fk FOREIGN KEY (lead_id) REFERENCES enrollment_leads(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE lead_assignments (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  lead_id BIGINT UNSIGNED NOT NULL,
  assigned_to BIGINT UNSIGNED NOT NULL,
  assigned_by BIGINT UNSIGNED NULL,
  assigned_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  note TEXT NULL,
  PRIMARY KEY (id),
  KEY lead_assignments_lead_idx (lead_id),
  KEY lead_assignments_assigned_to_idx (assigned_to),
  CONSTRAINT lead_assignments_lead_fk FOREIGN KEY (lead_id) REFERENCES enrollment_leads(id) ON DELETE CASCADE,
  CONSTRAINT lead_assignments_assigned_to_fk FOREIGN KEY (assigned_to) REFERENCES users(id) ON DELETE CASCADE,
  CONSTRAINT lead_assignments_assigned_by_fk FOREIGN KEY (assigned_by) REFERENCES users(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE lead_notes (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  lead_id BIGINT UNSIGNED NOT NULL,
  user_id BIGINT UNSIGNED NULL,
  note TEXT NOT NULL,
  next_follow_up_at DATETIME NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  KEY lead_notes_lead_idx (lead_id),
  CONSTRAINT lead_notes_lead_fk FOREIGN KEY (lead_id) REFERENCES enrollment_leads(id) ON DELETE CASCADE,
  CONSTRAINT lead_notes_user_fk FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE lead_status_history (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  lead_id BIGINT UNSIGNED NOT NULL,
  old_status VARCHAR(64) NULL,
  new_status VARCHAR(64) NOT NULL,
  changed_by BIGINT UNSIGNED NULL,
  note TEXT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  KEY lead_status_history_lead_idx (lead_id),
  CONSTRAINT lead_status_history_lead_fk FOREIGN KEY (lead_id) REFERENCES enrollment_leads(id) ON DELETE CASCADE,
  CONSTRAINT lead_status_history_changed_by_fk FOREIGN KEY (changed_by) REFERENCES users(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE audit_logs (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  user_id BIGINT UNSIGNED NULL,
  action VARCHAR(128) NOT NULL,
  entity_type VARCHAR(64) NOT NULL,
  entity_id BIGINT UNSIGNED NULL,
  old_values JSON NULL,
  new_values JSON NULL,
  ip_address VARCHAR(64) NULL,
  user_agent TEXT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  KEY audit_logs_user_idx (user_id),
  KEY audit_logs_entity_idx (entity_type, entity_id),
  CONSTRAINT audit_logs_user_fk FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO roles (code, name, description) VALUES
  ('admin', 'Administrator', 'Full access'),
  ('editor', 'Content Editor', 'Manage CMS content'),
  ('sales', 'Enrollment Sales', 'Manage enrollment leads');

INSERT INTO navigation_items (location, label, href, sort_order, is_cta) VALUES
  ('header', 'Trang chu', '/', 10, FALSE),
  ('header', 'Phuong phap giang day', '/phuong-phap-giang-day', 20, FALSE),
  ('header', 'Chuong trinh hoc', '/chuong-trinh-hoc', 30, FALSE),
  ('header', 'Gioi thieu', '/gioi-thieu', 40, FALSE),
  ('header', 'Tin tuc & Su kien', '/tin-tuc-su-kien', 50, FALSE),
  ('header', 'Dang ky ngay', '/dang-ky', 60, TRUE);

INSERT INTO site_settings (setting_key, setting_value) VALUES
  ('brand', JSON_OBJECT('name', 'Princeton Academy', 'slogan', 'Growing Hearts. Growing Minds. Growing Together!')),
  ('contact', JSON_OBJECT('phone', '0912 345 678', 'address', 'So 686 Thuan Phat, Phuong A, Quan B, Ha Noi')),
  ('forms', JSON_OBJECT('consent_version', 'v1'));

INSERT INTO home_sections (section_key, title, sort_order, is_active) VALUES
  ('hero', 'Hero banner', 10, TRUE),
  ('about', 'Ve chung toi', 20, TRUE),
  ('teaching_methods', 'Phuong phap giao duc', 30, TRUE),
  ('curriculum', 'Chuong trinh hoc', 40, TRUE),
  ('class_programs', 'He thong khoi lop', 50, TRUE),
  ('gallery', 'Khoanh khac tre trai nghiem', 60, TRUE),
  ('testimonials', 'Phu huynh noi gi ve nha truong', 70, TRUE),
  ('campuses', 'Co so gan ban', 80, TRUE),
  ('facilities', 'Co so vat chat', 90, TRUE),
  ('registration', 'Dang ky nhan uu dai', 100, TRUE);

INSERT INTO stats (stat_key, value_text, label, sort_order) VALUES
  ('campuses', '02', 'Co so', 10),
  ('languages', '02', 'Ngon ngu', 20),
  ('programs', '02', 'Chuong trinh hoc', 30),
  ('clubs', '10+', 'Cau lac bo', 40),
  ('events', '30+', 'Su kien', 50);

INSERT INTO class_programs (slug, name, age_min, age_max, age_label, category, color_hex, sort_order) VALUES
  ('penguin', 'Penguin', 2, 3, '2 - 3 tuoi', 'Mam non', '#d8f7ff', 10),
  ('wombat', 'Wombat', 3, 4, '3 - 4 tuoi', 'Mam non', '#fff1cf', 20),
  ('koala', 'Koala', 4, 5, '4 - 5 tuoi', 'Mam non', '#dcf6d6', 30),
  ('kangaroo', 'Kangaroo', 5, 6, '5 - 6 tuoi', 'Tien tieu hoc', '#ffe0cf', 40),
  ('preschool', 'Preschool', 5, 6, '5 - 6 tuoi', 'Tien tieu hoc', '#ffd7e0', 50);

INSERT INTO curriculum_tracks (slug, title, category, sort_order, is_active) VALUES
  ('chuong-trinh-tieu-chuan', 'Chuong trinh Tieu chuan', 'Tieu chuan', 10, TRUE),
  ('chuong-trinh-nang-cao', 'Chuong trinh Nang cao', 'Nang cao', 20, TRUE);

INSERT INTO teaching_methods (slug, title, category, background_hex, sort_order, status) VALUES
  ('ket-hop-nhieu-phuong-phap', 'Ket hop nhieu phuong phap', 'Tong hop', '#fffefa', 10, 'published'),
  ('lay-tre-lam-trung-tam', 'Lay tre lam trung tam', 'Ca nhan hoa', '#fff1f1', 20, 'published'),
  ('khai-phong-tu-duy', 'Khai phong tu duy', 'Sang tao', '#e8f3e6', 30, 'published'),
  ('hoc-qua-tuong-tac-hop-tac', 'Hoc qua tuong tac & hop tac', 'Xa hoi', '#e1f7fb', 40, 'published');

INSERT INTO post_categories (slug, name, sort_order) VALUES
  ('lop-hoc', 'Lop hoc', 10),
  ('su-kien', 'Su kien', 20),
  ('le-hoi', 'Le hoi', 30),
  ('workshop', 'Workshop', 40),
  ('co-so', 'Co so', 50);

INSERT INTO content_categories (scope, slug, name, sort_order) VALUES
  ('class_programs', 'mam-non', 'Mam non', 10),
  ('class_programs', 'tien-tieu-hoc', 'Tien tieu hoc', 20),
  ('teaching_methods', 'tong-hop', 'Tong hop', 10),
  ('teaching_methods', 'ca-nhan-hoa', 'Ca nhan hoa', 20),
  ('teaching_methods', 'sang-tao', 'Sang tao', 30),
  ('teaching_methods', 'xa-hoi', 'Xa hoi', 40),
  ('curriculum_tracks', 'tieu-chuan', 'Tieu chuan', 10),
  ('curriculum_tracks', 'nang-cao', 'Nang cao', 20);

INSERT INTO campuses (slug, name, address_line, ward, city, sort_order, is_active) VALUES
  ('4-nguyen-thong', 'Co so 4 Nguyen Thong', '4 Nguyen Thong', 'P. Xuan Hoa', 'TP.HCM', 10, TRUE),
  ('35-nguyen-huu-canh', 'Co so 35 Nguyen Huu Canh', '35 Nguyen Huu Canh', 'P. Thanh My Tay', 'TP.HCM', 20, TRUE);

INSERT INTO campuses (slug, name, address_line, sort_order, is_active) VALUES
  ('hai-phong', 'Princeton Academy Hai Phong', 'No. 6, Trieu Viet Vuong, Ecopark, Tan Hung Ward, Hai Phong', 10, TRUE),
  ('da-nang', 'Princeton Academy Da Nang', '88 Bac Son, Hoa An, Cam Le, Da Nang', 20, TRUE),
  ('geniuscamp-linh-dam', 'Princeton Academy GeniusCamp Linh Dam', 'BT5-TT4A, Southwest Linh Dam Urban Area, Hanoi', 30, TRUE),
  ('hung-yen', 'Princeton Academy Hung Yen', 'Nguyen Binh Street, Lac Hong Phuc Urban Area, Hung Yen', 40, TRUE),
  ('premier-phu-my-hung', 'Princeton Academy Premier - Phu My Hung', '33 Street 16, Nam Vien Quarter, Tan Phu Ward, District 7, Ho Chi Minh City', 50, TRUE),
  ('prince-academy-da-nang', 'Prince Academy - Princeton Academy', '45-47 Le Quy Don, Hai Chau, Da Nang', 60, TRUE),
  ('little-house-lai-vu', 'Princeton Little House Lai Vu', 'Stall 19-20, Lai Vu market & service area, Lai Khe, Hai Phong', 70, TRUE);

INSERT INTO campaigns (slug, name, offer_text, status, landing_page) VALUES
  ('uu-dai-ghi-danh', 'Uu dai ghi danh', 'Dang ky nhan uu dai tuyen sinh', 'active', '/dang-ky');

INSERT INTO media_assets (file_name, original_name, mime_type, url, alt_text, folder) VALUES
  ('7418d3b6d509d03b45710cdbc11e6c298f5a9959.png', 'penguin.png', 'image/png', '/api/media/7418d3b6d509d03b45710cdbc11e6c298f5a9959.png', 'Penguin class mascot', 'programs'),
  ('3dc1ce007304dd7c637e9e4c763ad7fda6021a35.png', 'wombat.png', 'image/png', '/api/media/3dc1ce007304dd7c637e9e4c763ad7fda6021a35.png', 'Wombat class mascot', 'programs'),
  ('d088645c54f44b84375f6cb56aeabe8e06bc006b.png', 'koala.png', 'image/png', '/api/media/d088645c54f44b84375f6cb56aeabe8e06bc006b.png', 'Koala class mascot', 'programs'),
  ('d0268a1bfec279b63f5d3717d847ff89893ec9a7.png', 'kangaroo.png', 'image/png', '/api/media/d0268a1bfec279b63f5d3717d847ff89893ec9a7.png', 'Kangaroo class mascot', 'programs'),
  ('58895c008a094b06474cacb153601040cef3cf48.png', 'preschool.png', 'image/png', '/api/media/58895c008a094b06474cacb153601040cef3cf48.png', 'Preschool class mascot', 'programs'),
  ('4067071ed218b109a3b3d760ab5b856a1c4d1556.png', 'teaching-method-1.png', 'image/png', '/api/media/4067071ed218b109a3b3d760ab5b856a1c4d1556.png', 'Ket hop nhieu phuong phap', 'teaching-methods'),
  ('6fcde84113072aa66cc43c4fc5efa3b2d4e6feb8.png', 'teaching-method-2.png', 'image/png', '/api/media/6fcde84113072aa66cc43c4fc5efa3b2d4e6feb8.png', 'Lay tre lam trung tam', 'teaching-methods'),
  ('ba09fe820d0f9cb663b24826afea30ad6fc2c8a2.png', 'teaching-method-3.png', 'image/png', '/api/media/ba09fe820d0f9cb663b24826afea30ad6fc2c8a2.png', 'Khai phong tu duy', 'teaching-methods'),
  ('aa47a37d3cb1c1b806218e09ba36b08f5e7c4d55.png', 'teaching-method-4.png', 'image/png', '/api/media/aa47a37d3cb1c1b806218e09ba36b08f5e7c4d55.png', 'Hoc qua tuong tac va hop tac', 'teaching-methods'),
  ('b6916482933e67cc337ea1071a428e34d7abe5f3.png', 'curriculum-standard.png', 'image/png', '/api/media/b6916482933e67cc337ea1071a428e34d7abe5f3.png', 'Chuong trinh hoc', 'curriculum'),
  ('logo.png', 'logo.png', 'image/png', '/api/media/logo.png', 'Princeton Academy logo', 'brand'),
  ('2f18e7a31d31b9b85df3a6588823571bdaf40d53.png', 'news-classroom.png', 'image/png', '/api/media/2f18e7a31d31b9b85df3a6588823571bdaf40d53.png', 'Lop hoc Princeton', 'posts'),
  ('eca0f00994a6add059898b0052a18055c5e2de11.png', 'news-event.png', 'image/png', '/api/media/eca0f00994a6add059898b0052a18055c5e2de11.png', 'Su kien Princeton', 'posts'),
  ('7152d23b5ad0228ac40827979cdce9d4dfc3a8fb.png', 'news-teacher.png', 'image/png', '/api/media/7152d23b5ad0228ac40827979cdce9d4dfc3a8fb.png', 'Giao vien Princeton', 'posts'),
  ('d442605c9e1be0223245da5e9e29abf7ea1bef64.png', 'news-workshop.png', 'image/png', '/api/media/d442605c9e1be0223245da5e9e29abf7ea1bef64.png', 'Workshop Princeton', 'posts'),
  ('d7d7345887319e335a13681880e24de534f764ac.png', 'news-facility.png', 'image/png', '/api/media/d7d7345887319e335a13681880e24de534f764ac.png', 'Co so vat chat Princeton', 'posts'),
  ('7efd1e9d3acc8ad92010b05849be05d4e2943353.png', 'news-playground.png', 'image/png', '/api/media/7efd1e9d3acc8ad92010b05849be05d4e2943353.png', 'Khu vui choi Princeton', 'posts'),
  ('62871bbc160db404d7a748757114301f94ce2edc.png', 'campus-1.png', 'image/png', '/api/media/62871bbc160db404d7a748757114301f94ce2edc.png', 'Co so 4 Nguyen Thong', 'campuses'),
  ('876d64d36b6f5a9e6e8957bf3289df528594ef31.png', 'campus-2.png', 'image/png', '/api/media/876d64d36b6f5a9e6e8957bf3289df528594ef31.png', 'Co so 35 Nguyen Huu Canh', 'campuses'),
  ('af1810e30a67ddab6abf8f10c81c4f0e08f00fa9.png', 'testimonial-parent-1.png', 'image/png', '/api/media/af1810e30a67ddab6abf8f10c81c4f0e08f00fa9.png', 'Phu huynh T.H.G', 'testimonials'),
  ('adf14e0ddf4967e0839219ef15e17e003edcbf6a.png', 'testimonial-parent-2.png', 'image/png', '/api/media/adf14e0ddf4967e0839219ef15e17e003edcbf6a.png', 'Phu huynh N.T.B', 'testimonials'),
  ('c2bb022ab8d9e25ab685c563473297cc72c94650.png', 'testimonial-parent-3.png', 'image/png', '/api/media/c2bb022ab8d9e25ab685c563473297cc72c94650.png', 'Phu huynh H.Q.L', 'testimonials'),
  ('7e1eee8e4dbdb6a1d39740a5062614540f69469e.png', 'testimonial-parent-4.png', 'image/png', '/api/media/7e1eee8e4dbdb6a1d39740a5062614540f69469e.png', 'Phu huynh Thanh Ngoc', 'testimonials'),
  ('11882fd836a9831ca1a002c791767b76e88422e7.png', 'testimonial-reactions-3.png', 'image/png', '/api/media/11882fd836a9831ca1a002c791767b76e88422e7.png', 'Cam xuc phu huynh', 'testimonials'),
  ('0973b52c986c74787e430b84d357ee63011f5072.png', 'testimonial-reactions-1.png', 'image/png', '/api/media/0973b52c986c74787e430b84d357ee63011f5072.png', 'Cam xuc phu huynh', 'testimonials'),
  ('728ca966f43afa8a7d7c3457a0186992cdce7f2a.png', 'testimonial-reactions-2.png', 'image/png', '/api/media/728ca966f43afa8a7d7c3457a0186992cdce7f2a.png', 'Cam xuc phu huynh', 'testimonials');

UPDATE class_programs
SET image_id = (SELECT id FROM media_assets WHERE file_name = '7418d3b6d509d03b45710cdbc11e6c298f5a9959.png' LIMIT 1),
    category = 'Khoi lop - Mam non',
    excerpt = 'Giai doan dau giup tre lam quen ne nep lop hoc, phat trien kha nang tu phuc vu, ngon ngu giao tiep co ban va cam giac an toan khi den truong moi ngay.',
    description = 'Penguin la lop dau tien trong hanh trinh mam non, uu tien cham soc cam xuc, thoi quen sinh hoat va kha nang ket noi voi thay co, ban be.'
WHERE slug = 'penguin';

UPDATE class_programs
SET image_id = (SELECT id FROM media_assets WHERE file_name = '3dc1ce007304dd7c637e9e4c763ad7fda6021a35.png' LIMIT 1),
    category = 'Khoi lop - Mam non',
    excerpt = 'Tre duoc khuyen khich kham pha qua tro choi, van dong, am nhac va hoat dong nhom nho de hinh thanh su chu dong va kha nang ket noi.',
    description = 'Wombat mo rong trai nghiem hoc qua choi va cac hoat dong thuc hanh gan gui voi doi song hang ngay.'
WHERE slug = 'wombat';

UPDATE class_programs
SET image_id = (SELECT id FROM media_assets WHERE file_name = 'd088645c54f44b84375f6cb56aeabe8e06bc006b.png' LIMIT 1),
    category = 'Khoi lop - Mam non',
    excerpt = 'Chuong trinh tap trung mo rong ngon ngu, tu duy logic, ky nang hop tac va kha nang the hien y tuong qua cac du an nho.',
    description = 'Koala giup tre tu tin dat cau hoi, chia se suy nghi va tham gia cac hoat dong nhom co muc tieu ro rang.'
WHERE slug = 'koala';

UPDATE class_programs
SET image_id = (SELECT id FROM media_assets WHERE file_name = 'd0268a1bfec279b63f5d3717d847ff89893ec9a7.png' LIMIT 1),
    category = 'Khoi lop - Tien tieu hoc',
    excerpt = 'Tre duoc chuan bi nen tang san sang vao tieu hoc thong qua doc viet tien hoc duong, toan tu duy, ky nang tu lap va thoi quen hoc tap.',
    description = 'Kangaroo tap trung vao su san sang hoc duong, kha nang tap trung va tinh chu dong trong cac nhiem vu hoc tap.'
WHERE slug = 'kangaroo';

UPDATE class_programs
SET image_id = (SELECT id FROM media_assets WHERE file_name = '58895c008a094b06474cacb153601040cef3cf48.png' LIMIT 1),
    category = 'Khoi lop - Tien tieu hoc',
    excerpt = 'Lop Preschool cung co su tu tin, giao tiep song ngu, tu duy doc lap va ky nang thich nghi de tre buoc vao giai doan hoc tap tiep theo.',
    description = 'Preschool la lop chuan bi cuoi cap mam non, giup tre lam quen thoi quen hoc tap co cau truc va biet tu quan hon.'
WHERE slug = 'preschool';

INSERT INTO class_program_schedule_items (class_program_id, title, description, sort_order) VALUES
  ((SELECT id FROM class_programs WHERE slug = 'penguin'), 'Hoat dong 1', 'Don tre, tro chuyen dau ngay va lam quen ne nep lop hoc.', 10),
  ((SELECT id FROM class_programs WHERE slug = 'penguin'), 'Hoat dong 2', 'Van dong nhe, am nhac, ke chuyen va tro choi cam giac phu hop do tuoi.', 20),
  ((SELECT id FROM class_programs WHERE slug = 'penguin'), 'Hoat dong 3', 'Ren thoi quen tu phuc vu: rua tay, cat do dung, an uong va nghi ngoi theo ne nep.', 30),
  ((SELECT id FROM class_programs WHERE slug = 'wombat'), 'Hoat dong 1', 'Hoat dong vong tron: chao ngay moi, nhan biet cam xuc va luyen giao tiep.', 10),
  ((SELECT id FROM class_programs WHERE slug = 'wombat'), 'Hoat dong 2', 'Kham pha chu de qua hinh anh, do vat, van dong va hoat dong thuc hanh.', 20),
  ((SELECT id FROM class_programs WHERE slug = 'wombat'), 'Hoat dong 3', 'Lam quen tieng Anh qua bai hat, tro choi ngon ngu va tinh huong lop hoc.', 30),
  ((SELECT id FROM class_programs WHERE slug = 'koala'), 'Hoat dong 1', 'Hoat dong ngon ngu, ke chuyen, lam quen chu cai va dien dat y tuong.', 10),
  ((SELECT id FROM class_programs WHERE slug = 'koala'), 'Hoat dong 2', 'Toan tu duy co ban: phan loai, so sanh, dem, nhan biet hinh dang va quy luat.', 20),
  ((SELECT id FROM class_programs WHERE slug = 'koala'), 'Hoat dong 3', 'Du an nho theo chu de giup tre quan sat, dat cau hoi va lam viec nhom.', 30),
  ((SELECT id FROM class_programs WHERE slug = 'kangaroo'), 'Hoat dong 1', 'Doc viet tien hoc duong: nhan dien am, chu cai, ke chuyen va luyen dien dat.', 10),
  ((SELECT id FROM class_programs WHERE slug = 'kangaroo'), 'Hoat dong 2', 'Toan tu duy: so luong, phep tinh don gian, do luong va giai quyet van de.', 20),
  ((SELECT id FROM class_programs WHERE slug = 'kangaroo'), 'Hoat dong 3', 'Hoat dong du an, thuyet trinh nho va ren ky nang lam viec theo nhom.', 30),
  ((SELECT id FROM class_programs WHERE slug = 'preschool'), 'Hoat dong 1', 'Hoat dong song ngu theo chu de, tang cuong giao tiep va phan xa tu nhien.', 10),
  ((SELECT id FROM class_programs WHERE slug = 'preschool'), 'Hoat dong 2', 'Chuan bi ky nang vao lop Mot: ne nep hoc tap, tu duy logic va kha nang tu quan.', 20),
  ((SELECT id FROM class_programs WHERE slug = 'preschool'), 'Hoat dong 3', 'Du an trai nghiem giup tre trinh bay y tuong, hop tac va giai quyet van de.', 30);

UPDATE curriculum_tracks
SET description = 'Duoc xay dung tren nen tang Chuong trinh Giao duc Mam non cua Bo GD&DT Viet Nam cung khung giao duc mam non quoc te, chuong trinh khuyen khich tre tu do kham pha va chu dong hoc hoi.',
    image_id = (SELECT id FROM media_assets WHERE file_name = 'b6916482933e67cc337ea1071a428e34d7abe5f3.png' LIMIT 1),
    logo_media_id = (SELECT id FROM media_assets WHERE file_name = 'logo.png' LIMIT 1)
WHERE slug = 'chuong-trinh-tieu-chuan';

UPDATE curriculum_tracks
SET description = 'Chuong trinh nang cao mo rong thoi luong ngon ngu, du an trai nghiem va cac hoat dong phat trien nang luc ca nhan cho tre san sang hon o giai doan tiep theo.',
    image_id = (SELECT id FROM media_assets WHERE file_name = 'b6916482933e67cc337ea1071a428e34d7abe5f3.png' LIMIT 1),
    logo_media_id = (SELECT id FROM media_assets WHERE file_name = 'logo.png' LIMIT 1)
WHERE slug = 'chuong-trinh-nang-cao';

INSERT INTO curriculum_blocks (curriculum_track_id, block_type, content, sort_order) VALUES
  ((SELECT id FROM curriculum_tracks WHERE slug = 'chuong-trinh-tieu-chuan'), 'paragraph', JSON_OBJECT('text', 'Qua moi hoat dong, tre tung buoc hinh thanh phan xa giao tiep tu nhien, ky nang xa hoi - cam xuc va nen tang hoc tap vung chac.'), 10),
  ((SELECT id FROM curriculum_tracks WHERE slug = 'chuong-trinh-nang-cao'), 'paragraph', JSON_OBJECT('text', 'Tre duoc tham gia nhieu hoat dong song ngu, du an sang tao, van dong va hop tac nhom de phat trien toan dien.'), 10);

UPDATE teaching_methods
SET image_id = (SELECT id FROM media_assets WHERE file_name = '4067071ed218b109a3b3d760ab5b856a1c4d1556.png' LIMIT 1),
    description = 'Tre duoc tiep can cac phuong phap giao duc hien dai, noi bat la hoc qua choi, giup tre tiep thu kien thuc mot cach tu nhien.',
    excerpt = 'Princeton ket hop nhieu cach tiep can trong cung mot ngay hoc de tre duoc quan sat, van dong, choi, tro chuyen va tu minh xay dung hieu biet.'
WHERE slug = 'ket-hop-nhieu-phuong-phap';

UPDATE teaching_methods
SET image_id = (SELECT id FROM media_assets WHERE file_name = '6fcde84113072aa66cc43c4fc5efa3b2d4e6feb8.png' LIMIT 1),
    description = 'Tre duoc ton trong so thich, ban sac ca nhan va nhip do phat trien rieng.',
    excerpt = 'Moi hoat dong duoc thiet ke de tre co quyen lua chon, duoc lang nghe va duoc phat trien theo nhip rieng trong moi truong an toan.'
WHERE slug = 'lay-tre-lam-trung-tam';

UPDATE teaching_methods
SET image_id = (SELECT id FROM media_assets WHERE file_name = 'ba09fe820d0f9cb663b24826afea30ad6fc2c8a2.png' LIMIT 1),
    description = 'Tre duoc tham gia cac hoat dong da dang trong lop va sau gio hoc de phat trien tu duy doc lap.',
    excerpt = 'Cac trai nghiem da dang giup tre manh dan dat cau hoi, thu cach lam moi va tu do the hien y tuong.'
WHERE slug = 'khai-phong-tu-duy';

UPDATE teaching_methods
SET image_id = (SELECT id FROM media_assets WHERE file_name = 'aa47a37d3cb1c1b806218e09ba36b08f5e7c4d55.png' LIMIT 1),
    description = 'Tre phat trien ky nang xa hoi va kha nang lang nghe thong qua cac hoat dong giao tiep, chia se va hop tac.',
    excerpt = 'Thong qua hoat dong nhom, tre hoc cach lang nghe, cho den luot, chia se y tuong va cung ban hoan thanh nhiem vu nho.'
WHERE slug = 'hoc-qua-tuong-tac-hop-tac';

INSERT INTO teaching_method_content_blocks (teaching_method_id, block_type, content, sort_order) VALUES
  ((SELECT id FROM teaching_methods WHERE slug = 'ket-hop-nhieu-phuong-phap'), 'paragraph', JSON_OBJECT('text', 'O lua tuoi mam non, tre hoc tot nhat khi duoc trai nghiem bang nhieu giac quan. Cac hoat dong tai Princeton khong tach roi hoc thuat khoi vui choi, van dong, am nhac va giao tiep hang ngay.'), 10),
  ((SELECT id FROM teaching_methods WHERE slug = 'ket-hop-nhieu-phuong-phap'), 'paragraph', JSON_OBJECT('text', 'Su ket hop linh hoat giup moi ban nho co nhieu co hoi the hien diem manh, dong thoi phat trien can bang ve ngon ngu, nhan thuc, cam xuc va ky nang xa hoi.'), 20),
  ((SELECT id FROM teaching_methods WHERE slug = 'lay-tre-lam-trung-tam'), 'paragraph', JSON_OBJECT('text', 'Giao vien bat dau tu nhu cau, so thich va kha nang hien tai cua tung ban nho de dieu chinh cach goi mo va muc do ho tro.'), 10),
  ((SELECT id FROM teaching_methods WHERE slug = 'lay-tre-lam-trung-tam'), 'paragraph', JSON_OBJECT('text', 'Cach tiep can nay giup tre hinh thanh su tu tin, kha nang tu lua chon va tinh than chu dong trong hoc tap.'), 20),
  ((SELECT id FROM teaching_methods WHERE slug = 'khai-phong-tu-duy'), 'paragraph', JSON_OBJECT('text', 'Tre co khong gian de thu, sai, sua va thu lai thong qua vat lieu, am thanh, chuyen dong, cau chuyen va tinh huong gan gui.'), 10),
  ((SELECT id FROM teaching_methods WHERE slug = 'khai-phong-tu-duy'), 'paragraph', JSON_OBJECT('text', 'Khi y tuong duoc lang nghe, tre dan hinh thanh tu duy doc lap va biet dien dat cam xuc, suy nghi cua ban than.'), 20),
  ((SELECT id FROM teaching_methods WHERE slug = 'hoc-qua-tuong-tac-hop-tac'), 'paragraph', JSON_OBJECT('text', 'Ky nang xa hoi cua tre duoc hinh thanh qua nhung tuong tac nho moi ngay: cung ban xep hinh, chia se do choi va tham gia tro choi nhom.'), 10),
  ((SELECT id FROM teaching_methods WHERE slug = 'hoc-qua-tuong-tac-hop-tac'), 'paragraph', JSON_OBJECT('text', 'Giao vien huong dan tre giao tiep tich cuc, biet lang nghe va bay to nhu cau bang loi noi phu hop.'), 20);

INSERT INTO posts (slug, title, excerpt, category_id, cover_image_id, post_type, status, published_at) VALUES
  ('mot-ngay-hoc-tap-day-nang-luong-tai-princeton', 'Mot ngay hoc tap day nang luong tai Princeton', 'Tu gio don tre buoi sang den cac hoat dong hoc tap, vui choi va tu phuc vu, moi khoanh khac tai Princeton deu giup tre tu tin hon.', (SELECT id FROM post_categories WHERE slug = 'lop-hoc'), (SELECT id FROM media_assets WHERE file_name = '2f18e7a31d31b9b85df3a6588823571bdaf40d53.png'), 'news', 'published', NOW()),
  ('ngay-hoi-trai-nghiem-cung-cac-ban-nho-princeton', 'Ngay hoi trai nghiem cung cac ban nho Princeton', 'Ngay hoi la dip de phu huynh buoc vao khong gian hoc tap cua con va quan sat cac hoat dong tuong tac, sang tao.', (SELECT id FROM post_categories WHERE slug = 'su-kien'), (SELECT id FROM media_assets WHERE file_name = 'eca0f00994a6add059898b0052a18055c5e2de11.png'), 'event', 'published', NOW()),
  ('sac-mau-van-hoa-trong-cac-hoat-dong-theo-mua', 'Sac mau van hoa trong cac hoat dong theo mua', 'Cac chu de theo mua duoc chuyen hoa thanh hoat dong thuc hanh gan gui de tre kham pha van hoa mot cach tu nhien.', (SELECT id FROM post_categories WHERE slug = 'le-hoi'), (SELECT id FROM media_assets WHERE file_name = '7152d23b5ad0228ac40827979cdce9d4dfc3a8fb.png'), 'activity', 'published', NOW()),
  ('goc-sang-tao-giup-tre-manh-dan-the-hien-y-tuong', 'Goc sang tao giup tre manh dan the hien y tuong', 'Cac workshop nho mo ra khong gian de tre tu chon mau sac, vat lieu va cach the hien cau chuyen rieng.', (SELECT id FROM post_categories WHERE slug = 'workshop'), (SELECT id FROM media_assets WHERE file_name = 'd442605c9e1be0223245da5e9e29abf7ea1bef64.png'), 'activity', 'published', NOW()),
  ('nhung-hinh-anh-dang-nho-tai-princeton', 'Nhung hinh anh dang nho tai Princeton', 'Moi nu cuoi va moi lan tre thu dieu moi deu la mot phan trong hanh trinh lon len cua con tai Princeton.', (SELECT id FROM post_categories WHERE slug = 'lop-hoc'), (SELECT id FROM media_assets WHERE file_name = '7efd1e9d3acc8ad92010b05849be05d4e2943353.png'), 'news', 'published', NOW()),
  ('khong-gian-hoc-tap-an-toan-va-gan-gui', 'Khong gian hoc tap an toan va gan gui', 'Lop hoc, phong van dong va khu sinh hoat duoc bo tri sach se, sang sua va phu hop voi tre mam non.', (SELECT id FROM post_categories WHERE slug = 'co-so'), (SELECT id FROM media_assets WHERE file_name = 'd7d7345887319e335a13681880e24de534f764ac.png'), 'news', 'published', NOW());

INSERT INTO post_content_blocks (post_id, block_type, content, sort_order) VALUES
  ((SELECT id FROM posts WHERE slug = 'mot-ngay-hoc-tap-day-nang-luong-tai-princeton'), 'paragraph', JSON_OBJECT('text', 'Mot ngay tai Princeton bat dau bang nhung khoanh khac chao hoi am ap, giup tre cam thay an toan va san sang vao nhip sinh hoat cung ban be.'), 10),
  ((SELECT id FROM posts WHERE slug = 'mot-ngay-hoc-tap-day-nang-luong-tai-princeton'), 'paragraph', JSON_OBJECT('text', 'Cac hoat dong hoc tap duoc to chuc linh hoat giua ca nhan, nhom nho va ca lop de tre quan sat, dat cau hoi va chia se suy nghi.'), 20),
  ((SELECT id FROM posts WHERE slug = 'ngay-hoi-trai-nghiem-cung-cac-ban-nho-princeton'), 'paragraph', JSON_OBJECT('text', 'Ngay hoi trai nghiem giup phu huynh quan sat truc tiep cach tre tham gia lop hoc, tuong tac voi giao vien va phoi hop voi ban be.'), 10),
  ((SELECT id FROM posts WHERE slug = 'sac-mau-van-hoa-trong-cac-hoat-dong-theo-mua'), 'paragraph', JSON_OBJECT('text', 'Cac hoat dong theo mua giup tre tiep can van hoa bang trai nghiem gan gui thay vi chi nghe ke.'), 10),
  ((SELECT id FROM posts WHERE slug = 'goc-sang-tao-giup-tre-manh-dan-the-hien-y-tuong'), 'paragraph', JSON_OBJECT('text', 'Workshop sang tao duoc thiet ke nhu mot khong gian mo de tre tu do lua chon mau sac, vat lieu va cach the hien.'), 10),
  ((SELECT id FROM posts WHERE slug = 'nhung-hinh-anh-dang-nho-tai-princeton'), 'paragraph', JSON_OBJECT('text', 'Nha truong luu giu cac khoanh khac hang ngay nhu mot phan cua hanh trinh truong thanh cua tre.'), 10),
  ((SELECT id FROM posts WHERE slug = 'khong-gian-hoc-tap-an-toan-va-gan-gui'), 'paragraph', JSON_OBJECT('text', 'Khong gian tai Princeton duoc thiet ke sang sua, sach se va phu hop voi nhu cau sinh hoat cua tre mam non.'), 10);

UPDATE campuses
SET cover_image_id = (SELECT id FROM media_assets WHERE file_name = '62871bbc160db404d7a748757114301f94ce2edc.png' LIMIT 1),
    map_embed_url = 'https://www.google.com/maps'
WHERE slug = '4-nguyen-thong';

UPDATE campuses
SET cover_image_id = (SELECT id FROM media_assets WHERE file_name = '876d64d36b6f5a9e6e8957bf3289df528594ef31.png' LIMIT 1),
    map_embed_url = 'https://www.google.com/maps'
WHERE slug = '35-nguyen-huu-canh';

INSERT INTO campus_contacts (campus_id, contact_type, label, value, sort_order) VALUES
  ((SELECT id FROM campuses WHERE slug = '4-nguyen-thong'), 'phone', 'Hotline', '0912 345 678', 10),
  ((SELECT id FROM campuses WHERE slug = '35-nguyen-huu-canh'), 'phone', 'Hotline', '0912 345 678', 10);

INSERT INTO gallery_items (title, image_id, sort_order, is_featured, is_active) VALUES
  ('Lop hoc Princeton', (SELECT id FROM media_assets WHERE file_name = '2f18e7a31d31b9b85df3a6588823571bdaf40d53.png'), 10, TRUE, TRUE),
  ('Ngay hoi trai nghiem', (SELECT id FROM media_assets WHERE file_name = 'eca0f00994a6add059898b0052a18055c5e2de11.png'), 20, TRUE, TRUE),
  ('Goc sang tao', (SELECT id FROM media_assets WHERE file_name = 'd442605c9e1be0223245da5e9e29abf7ea1bef64.png'), 30, FALSE, TRUE),
  ('Khu vui choi', (SELECT id FROM media_assets WHERE file_name = '7efd1e9d3acc8ad92010b05849be05d4e2943353.png'), 40, FALSE, TRUE),
  ('Co so vat chat', (SELECT id FROM media_assets WHERE file_name = 'd7d7345887319e335a13681880e24de534f764ac.png'), 50, FALSE, TRUE);

INSERT INTO testimonials (parent_name, student_name, avatar_id, quote, rating, reaction_image_id, sort_order, is_active) VALUES
  (
    'Phụ huynh T.H.G',
    NULL,
    (SELECT id FROM media_assets WHERE file_name = 'af1810e30a67ddab6abf8f10c81c4f0e08f00fa9.png' LIMIT 1),
    'Mẹ thấy con dạn dĩ hơn rất nhiều, tiếp xúc với các bạn chủ động hơn và có sự tiến bộ. Mỗi lần được trải nghiệm trực tiếp tiết học của con thì mẹ thấy con tiến bộ hơn, mỗi khía cạnh phát triển một chút, nhưng cũng khiến mẹ yên tâm và tin tưởng Nhà trường hơn.',
    5.0,
    (SELECT id FROM media_assets WHERE file_name = '11882fd836a9831ca1a002c791767b76e88422e7.png' LIMIT 1),
    10,
    TRUE
  ),
  (
    'Phụ huynh Thanh Ngọc',
    NULL,
    (SELECT id FROM media_assets WHERE file_name = '7e1eee8e4dbdb6a1d39740a5062614540f69469e.png' LIMIT 1),
    'Mẹ thấy con dạn dĩ hơn rất nhiều, tiếp xúc với các bạn chủ động hơn và có sự tiến bộ. Mỗi lần được trải nghiệm trực tiếp tiết học của con thì mẹ thấy con tiến bộ hơn, mỗi khía cạnh phát triển một chút, nhưng cũng khiến mẹ yên tâm và tin tưởng Nhà trường hơn.',
    5.0,
    (SELECT id FROM media_assets WHERE file_name = '11882fd836a9831ca1a002c791767b76e88422e7.png' LIMIT 1),
    20,
    TRUE
  ),
  (
    'Phụ huynh H.Q.L',
    NULL,
    (SELECT id FROM media_assets WHERE file_name = 'c2bb022ab8d9e25ab685c563473297cc72c94650.png' LIMIT 1),
    'Bé đã học 5 năm tại Trường Mầm non Princeton. Trong quá trình con học tại trường, mình thấy con phát triển rất tốt. Con tự tin hơn, mạnh dạn hơn và mình cảm thấy rất vui khi con được phát triển trong môi trường tốt. Mình đánh giá Trường Mầm non Princeton rất cao.',
    5.0,
    (SELECT id FROM media_assets WHERE file_name = '728ca966f43afa8a7d7c3457a0186992cdce7f2a.png' LIMIT 1),
    30,
    TRUE
  ),
  (
    'Phụ huynh N.T.B',
    NULL,
    (SELECT id FROM media_assets WHERE file_name = 'adf14e0ddf4967e0839219ef15e17e003edcbf6a.png' LIMIT 1),
    'Điều làm mẹ xúc động nhất đó là con cảm thấy hạnh phúc khi trải qua từng hoạt động với trường. Con lớn lên trong vòng tay yêu thương của các thầy cô và đặc biệt là sự giao tiếp tiếng Anh của con tiến bộ hơn rất nhiều.',
    5.0,
    (SELECT id FROM media_assets WHERE file_name = '0973b52c986c74787e430b84d357ee63011f5072.png' LIMIT 1),
    40,
    TRUE
  );
