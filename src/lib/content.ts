import type { RowDataPacket } from "mysql2/promise";
import { ensureCategoryStorage } from "./categories";
import { getMysqlPool } from "./mysql";
import {
  defaultRegistrationSectionSettings,
  normalizeRegistrationSectionSettings,
  type RegistrationSectionSettings,
} from "./registration-section-config";
import { repairMojibakeText } from "./text-encoding";

export type DbImage = {
  id: number;
  imageId: number | null;
  imageUrl: string;
  imageAlt: string;
  url: string;
  alt: string;
  title: string;
  description: string;
};

export type DbClassProgram = {
  id: number;
  slug: string;
  name: string;
  age: string;
  category: string;
  excerpt: string;
  description: string;
  imageId: number | null;
  imageUrl: string;
  imageAlt: string;
  coverPosition: string;
  coverZoom: number;
  color: string;
  schedule: string[];
};

export type DbTeachingMethod = {
  id: number;
  slug: string;
  imageId: number | null;
  imageUrl: string;
  imageAlt: string;
  coverPosition: string;
  coverZoom: number;
  category: string;
  title: string;
  description: string;
  excerpt: string;
  background: string;
  content: string[];
};

export type DbNewsPost = {
  id: number;
  slug: string;
  postType: "news" | "event" | "activity";
  coverImageId: number | null;
  imageUrl: string;
  imageAlt: string;
  coverPosition: string;
  coverZoom: number;
  categorySlug: string;
  category: string;
  title: string;
  excerpt: string;
  content: string[];
  publishedAt: string | null;
};

export type DbCurriculumTrack = {
  id: number;
  slug: string;
  title: string;
  category: string;
  description: string;
  imageId: number | null;
  imageUrl: string;
  imageAlt: string;
  coverPosition: string;
  coverZoom: number;
  logoMediaId: number | null;
  logoUrl: string;
  logoAlt: string;
  content: string[];
};

export type DbHeroSlide = {
  id: number;
  title: string;
  subtitle: string;
  desktopImageId: number | null;
  desktopImageUrl: string;
  desktopImageAlt: string;
  desktopObjectPosition: string;
  desktopZoom: number;
  mobileImageId: number | null;
  mobileImageUrl: string;
  mobileImageAlt: string;
  ctaLabel: string;
  ctaHref: string;
};

export type DbCampus = {
  id: number;
  slug: string;
  name: string;
  address: string;
  ward: string;
  district: string;
  city: string;
  imageUrl: string;
  imageAlt: string;
  mapEmbedUrl: string;
  contacts: Array<{
    type: string;
    label: string;
    value: string;
  }>;
};

export type DbFacilityImage = {
  id: number;
  title: string;
  description: string;
  imageId: number | null;
  imageUrl: string;
  imageAlt: string;
};

export type DbTeacherTeamItem = {
  id: number;
  title: string;
  description: string;
  imageId: number | null;
  imageUrl: string;
  imageAlt: string;
  coverPosition: string;
  coverZoom: number;
  color: string;
  shape: string;
  rotate: string;
};

export type DbTestimonial = {
  id: number;
  parentName: string;
  studentName: string;
  avatarId: number | null;
  avatarUrl: string;
  avatarAlt: string;
  quote: string;
  rating: number | null;
  reactionImageId: number | null;
  reactionImageUrl: string;
  reactionImageAlt: string;
};

type ProgramRow = RowDataPacket & {
  id: number;
  slug: string;
  name: string;
  age_label: string;
  category: string | null;
  excerpt: string | null;
  description: string | null;
  image_id: number | null;
  image_url: string | null;
  image_alt: string | null;
  cover_position: string | null;
  cover_zoom: number | null;
  color_hex: string | null;
};

type HeroSlideRow = RowDataPacket & {
  id: number;
  title: string | null;
  subtitle: string | null;
  desktop_image_id: number | null;
  desktop_image_url: string | null;
  desktop_image_alt: string | null;
  desktop_object_position: string | null;
  desktop_zoom: string | number | null;
  mobile_object_position: string | null;
  mobile_zoom: string | number | null;
  mobile_image_id: number | null;
  mobile_image_url: string | null;
  mobile_image_alt: string | null;
  cta_label: string | null;
  cta_href: string | null;
};

type HomeSectionRow = RowDataPacket & {
  title: string | null;
  subtitle: string | null;
  config: unknown;
  is_active: number | boolean;
};

type ScheduleRow = RowDataPacket & {
  class_program_id: number;
  description: string;
};

type TeachingMethodRow = RowDataPacket & {
  id: number;
  slug: string;
  title: string;
  category: string | null;
  description: string | null;
  excerpt: string | null;
  image_id: number | null;
  image_url: string | null;
  image_alt: string | null;
  cover_position: string | null;
  cover_zoom: number | null;
  background_hex: string | null;
};

type BlockRow = RowDataPacket & {
  owner_id: number;
  block_type: string;
  content: unknown;
};

type PostRow = RowDataPacket & {
  id: number;
  slug: string;
  title: string;
  excerpt: string | null;
  post_type: "news" | "event" | "activity";
  cover_image_id: number | null;
  cover_position: string | null;
  cover_zoom: number | null;
  category_slug: string | null;
  category: string | null;
  image_url: string | null;
  image_alt: string | null;
  published_at: Date | string | null;
};

type CurriculumRow = RowDataPacket & {
  id: number;
  slug: string;
  title: string;
  category: string | null;
  description: string | null;
  image_id: number | null;
  image_url: string | null;
  image_alt: string | null;
  cover_position: string | null;
  cover_zoom: number | null;
  logo_media_id: number | null;
  logo_url: string | null;
  logo_alt: string | null;
};

type CampusRow = RowDataPacket & {
  id: number;
  slug: string;
  name: string;
  address_line: string;
  ward: string | null;
  district: string | null;
  city: string | null;
  image_url: string | null;
  image_alt: string | null;
  map_embed_url: string | null;
};

type CampusContactRow = RowDataPacket & {
  campus_id: number;
  contact_type: string;
  label: string | null;
  value: string;
};

type FacilityImageRow = RowDataPacket & {
  id: number;
  title: string | null;
  description: string | null;
  image_id: number | null;
  image_url: string | null;
  image_alt: string | null;
};

type GalleryImageRow = RowDataPacket & {
  id: number;
  title: string | null;
  description: string | null;
  image_id: number | null;
  image_url: string | null;
  image_alt: string | null;
};

type TeacherTeamRow = RowDataPacket & {
  id: number;
  title: string;
  description: string | null;
  image_id: number | null;
  cover_position: string | null;
  cover_zoom: number | null;
  image_url: string | null;
  image_alt: string | null;
  color_hex: string | null;
  shape_class: string | null;
  rotate_class: string | null;
};

type TestimonialRow = RowDataPacket & {
  id: number;
  parent_name: string;
  student_name: string | null;
  avatar_id: number | null;
  avatar_url: string | null;
  avatar_alt: string | null;
  quote: string;
  rating: string | number | null;
  reaction_image_id: number | null;
  reaction_image_url: string | null;
  reaction_image_alt: string | null;
};

function text(value: string | null | undefined) {
  return value ? repairMojibakeText(value) : "";
}

export const HERO_SLIDE_MIN_ZOOM = 0.5;
export const HERO_SLIDE_MAX_ZOOM = 3;

export function clampHeroSlideZoom(value: unknown) {
  const zoom = Number(value);
  if (!Number.isFinite(zoom)) return 1;
  return Math.round(Math.max(HERO_SLIDE_MIN_ZOOM, Math.min(HERO_SLIDE_MAX_ZOOM, zoom)) * 100) / 100;
}

export const COVER_MIN_ZOOM = 0.5;
export const COVER_MAX_ZOOM = 3;

export function clampCoverZoom(value: unknown) {
  const zoom = Number(value);
  if (!Number.isFinite(zoom)) return 1;
  return Math.round(Math.max(COVER_MIN_ZOOM, Math.min(COVER_MAX_ZOOM, zoom)) * 100) / 100;
}

export function normalizeHeroSlidePosition(value: unknown) {
  const raw = typeof value === "string" ? value.trim() : "";
  const match = raw.match(/^(\d{1,3})%\s+(\d{1,3})%$/);
  if (!match) return "50% 50%";

  const x = Math.max(0, Math.min(100, Number(match[1])));
  const y = Math.max(0, Math.min(100, Number(match[2])));
  return `${x}% ${y}%`;
}

function dateToIso(value: Date | string | null) {
  if (!value) return null;
  return value instanceof Date ? value.toISOString() : value;
}

function parseJson(value: unknown): unknown {
  if (typeof value !== "string") return value;

  try {
    return JSON.parse(value);
  } catch {
    return value;
  }
}

function blockToText(value: unknown): string {
  const parsed = parseJson(value);

  if (typeof parsed === "string") return parsed.trim();
  if (!parsed || typeof parsed !== "object") return "";

  const record = parsed as Record<string, unknown>;
  const direct = record.text ?? record.body ?? record.paragraph ?? record.html;
  if (typeof direct === "string") return direct.trim();

  if (Array.isArray(record.items)) {
    return record.items.filter((item) => typeof item === "string").join("\n");
  }

  return "";
}

function groupBlocks(rows: BlockRow[]) {
  const grouped = new Map<number, string[]>();

  rows.forEach((row) => {
    const value = blockToText(row.content);
    if (!value) return;

    const current = grouped.get(row.owner_id) ?? [];
    current.push(value);
    grouped.set(row.owner_id, current);
  });

  return grouped;
}

function uniqueBy<T>(items: T[], getKey: (item: T) => string) {
  const seen = new Set<string>();
  return items.filter((item) => {
    const key = getKey(item);
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

let aboutStorageReady: Promise<void> | null = null;
let galleryStorageReady: Promise<void> | null = null;
let heroSlideStorageReady: Promise<void> | null = null;
let homeSectionStorageReady: Promise<void> | null = null;
let testimonialStorageReady: Promise<void> | null = null;

async function ensureHeroSlideStorageInternal() {
  const pool = getMysqlPool();

  await pool.execute(`
    CREATE TABLE IF NOT EXISTS hero_slides (
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
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  `);

  await pool
    .execute(
      "ALTER TABLE hero_slides ADD COLUMN desktop_object_position VARCHAR(32) NOT NULL DEFAULT '50% 50%'",
    )
    .catch(() => {});
  await pool
    .execute("ALTER TABLE hero_slides ADD COLUMN desktop_zoom DECIMAL(4,2) NOT NULL DEFAULT 1.00")
    .catch(() => {});
  await pool
    .execute("ALTER TABLE hero_slides ADD COLUMN mobile_object_position VARCHAR(32) NOT NULL DEFAULT '50% 50%'")
    .catch(() => {});
  await pool
    .execute("ALTER TABLE hero_slides ADD COLUMN mobile_zoom DECIMAL(4,2) NOT NULL DEFAULT 1.00")
    .catch(() => {});
}

export async function ensureHeroSlideStorage() {
  if (!heroSlideStorageReady) {
    heroSlideStorageReady = ensureHeroSlideStorageInternal().catch((error) => {
      heroSlideStorageReady = null;
      throw error;
    });
  }

  return heroSlideStorageReady;
}

async function ensureHomeSectionStorageInternal() {
  const pool = getMysqlPool();

  await pool.execute(`
    CREATE TABLE IF NOT EXISTS home_sections (
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
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  `);
}

export async function ensureHomeSectionStorage() {
  if (!homeSectionStorageReady) {
    homeSectionStorageReady = ensureHomeSectionStorageInternal().catch((error) => {
      homeSectionStorageReady = null;
      throw error;
    });
  }

  return homeSectionStorageReady;
}

async function ensureTestimonialStorageInternal() {
  const pool = getMysqlPool();

  await pool.execute(`
    CREATE TABLE IF NOT EXISTS testimonials (
      id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
      parent_name VARCHAR(255) NOT NULL,
      student_name VARCHAR(255) NULL,
      avatar_id BIGINT UNSIGNED NULL,
      quote TEXT NOT NULL,
      rating DECIMAL(2,1) NULL,
      reaction_image_id BIGINT UNSIGNED NULL,
      sort_order INT NOT NULL DEFAULT 0,
      is_active BOOLEAN NOT NULL DEFAULT TRUE,
      created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      PRIMARY KEY (id),
      KEY testimonials_avatar_idx (avatar_id),
      KEY testimonials_reaction_image_idx (reaction_image_id),
      CONSTRAINT testimonials_avatar_fk FOREIGN KEY (avatar_id) REFERENCES media_assets(id) ON DELETE SET NULL,
      CONSTRAINT testimonials_reaction_image_fk FOREIGN KEY (reaction_image_id) REFERENCES media_assets(id) ON DELETE SET NULL
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  `);
}

export async function ensureTestimonialStorage() {
  if (!testimonialStorageReady) {
    testimonialStorageReady = ensureTestimonialStorageInternal().catch((error) => {
      testimonialStorageReady = null;
      throw error;
    });
  }

  return testimonialStorageReady;
}

async function ensureAboutStorageInternal() {
  const pool = getMysqlPool();

  await pool.execute(`
    CREATE TABLE IF NOT EXISTS facility_images (
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
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  `);

  await pool.execute(`
    CREATE TABLE IF NOT EXISTS teacher_team_items (
      id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
      title VARCHAR(255) NOT NULL,
      description TEXT NULL,
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
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  `);
}

export async function ensureAboutStorage() {
  if (!aboutStorageReady) {
    aboutStorageReady = ensureAboutStorageInternal().catch((error) => {
      aboutStorageReady = null;
      throw error;
    });
  }

  return aboutStorageReady;
}

async function ensureGalleryStorageInternal() {
  const pool = getMysqlPool();

  await pool.execute(`
    CREATE TABLE IF NOT EXISTS gallery_items (
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
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  `);
}

export async function ensureGalleryStorage() {
  if (!galleryStorageReady) {
    galleryStorageReady = ensureGalleryStorageInternal().catch((error) => {
      galleryStorageReady = null;
      throw error;
    });
  }

  return galleryStorageReady;
}

export async function getHeroSlides(): Promise<DbHeroSlide[]> {
  await ensureHeroSlideStorage();
  const pool = getMysqlPool();
  const [rows] = await pool.execute<HeroSlideRow[]>(
    `SELECT
      hs.id,
      hs.title,
      hs.subtitle,
      hs.desktop_image_id,
      desktop_media.url AS desktop_image_url,
      desktop_media.alt_text AS desktop_image_alt,
      hs.desktop_object_position,
      hs.desktop_zoom,
      hs.mobile_image_id,
      mobile_media.url AS mobile_image_url,
      mobile_media.alt_text AS mobile_image_alt,
      hs.mobile_object_position,
      hs.mobile_zoom,
      hs.cta_label,
      hs.cta_href
    FROM hero_slides hs
    LEFT JOIN media_assets desktop_media ON desktop_media.id = hs.desktop_image_id
    LEFT JOIN media_assets mobile_media ON mobile_media.id = hs.mobile_image_id
    WHERE hs.is_active = TRUE
      AND (hs.starts_at IS NULL OR hs.starts_at <= NOW())
      AND (hs.ends_at IS NULL OR hs.ends_at >= NOW())
    ORDER BY hs.sort_order ASC, hs.id ASC`,
  );

  return rows
    .map((row) => {
      const title = text(row.title) || "Banner Princeton Academy";
      const desktopImageUrl = text(row.desktop_image_url);
      const mobileImageUrl = text(row.mobile_image_url);

      return {
        id: row.id,
        title,
        subtitle: text(row.subtitle),
        desktopImageId: row.desktop_image_id,
        desktopImageUrl,
        desktopImageAlt: text(row.desktop_image_alt) || title,
        desktopObjectPosition: text(row.desktop_object_position) || "50% 50%",
        desktopZoom: clampHeroSlideZoom(row.desktop_zoom),
        mobileImageId: row.mobile_image_id,
        mobileImageUrl,
        mobileImageAlt: text(row.mobile_image_alt) || title,
        mobileObjectPosition: text(row.mobile_object_position) || "50% 50%",
        mobileZoom: clampHeroSlideZoom(row.mobile_zoom),
        ctaLabel: text(row.cta_label),
        ctaHref: text(row.cta_href),
      };
    })
    .filter((slide) => slide.desktopImageUrl || slide.mobileImageUrl);
}

export async function getRegistrationSectionSettings(): Promise<RegistrationSectionSettings> {
  await ensureHomeSectionStorage();
  const pool = getMysqlPool();
  const [rows] = await pool.execute<HomeSectionRow[]>(
    `SELECT title, subtitle, config, is_active
     FROM home_sections
     WHERE section_key = 'registration'
     LIMIT 1`,
  );

  const row = rows[0];
  if (!row) return defaultRegistrationSectionSettings;

  const config = parseJson(row.config);
  const savedConfig = config && typeof config === "object" ? config : {};

  return normalizeRegistrationSectionSettings({
    ...(savedConfig as Record<string, unknown>),
    title: text(row.title) || (savedConfig as Record<string, unknown>).title,
    isActive: Boolean(row.is_active),
  });
}

export async function getClassPrograms(): Promise<DbClassProgram[]> {
  const pool = getMysqlPool();
  const [rows] = await pool.execute<ProgramRow[]>(
    `SELECT
      cp.id,
      cp.slug,
      cp.name,
      cp.age_label,
      cp.category,
      cp.excerpt,
      cp.description,
      cp.color_hex,
      cp.image_id,
      cp.cover_position,
      cp.cover_zoom,
      ma.url AS image_url,
      ma.alt_text AS image_alt
    FROM class_programs cp
    LEFT JOIN media_assets ma ON ma.id = cp.image_id
    WHERE cp.is_active = TRUE
    ORDER BY cp.sort_order ASC, cp.id ASC`,
  );

  if (!rows.length) return [];

  const ids = rows.map((row) => row.id);
  const placeholders = ids.map(() => "?").join(",");
  const [scheduleRows] = await pool.execute<ScheduleRow[]>(
    `SELECT class_program_id, description
     FROM class_program_schedule_items
     WHERE class_program_id IN (${placeholders})
     ORDER BY class_program_id ASC, sort_order ASC, id ASC`,
    ids,
  );

  const scheduleByProgram = new Map<number, string[]>();
  scheduleRows.forEach((row) => {
    const current = scheduleByProgram.get(row.class_program_id) ?? [];
    current.push(row.description);
    scheduleByProgram.set(row.class_program_id, current);
  });

  return rows.map((row) => ({
    id: row.id,
    slug: row.slug,
    name: row.name,
    age: row.age_label,
    category: text(row.category),
    excerpt: text(row.excerpt),
    description: text(row.description),
    imageId: row.image_id,
    imageUrl: text(row.image_url),
    imageAlt: text(row.image_alt) || row.name,
    coverPosition: text(row.cover_position) || "50% 50%",
    coverZoom: clampCoverZoom(row.cover_zoom),
    color: text(row.color_hex) || "#fffefa",
    schedule: scheduleByProgram.get(row.id) ?? [],
  }));
}

export async function getClassProgram(slug: string) {
  const programs = await getClassPrograms();
  return programs.find((program) => program.slug === slug) ?? null;
}

export async function getTeachingMethods(): Promise<DbTeachingMethod[]> {
  const pool = getMysqlPool();
  const [rows] = await pool.execute<TeachingMethodRow[]>(
    `SELECT
      tm.id,
      tm.slug,
      tm.title,
      tm.category,
      tm.description,
      tm.excerpt,
      tm.background_hex,
      tm.image_id,
      tm.cover_position,
      tm.cover_zoom,
      ma.url AS image_url,
      ma.alt_text AS image_alt
    FROM teaching_methods tm
    LEFT JOIN media_assets ma ON ma.id = tm.image_id
    WHERE tm.status = 'published'
    ORDER BY tm.sort_order ASC, tm.id ASC`,
  );

  if (!rows.length) return [];

  const ids = rows.map((row) => row.id);
  const placeholders = ids.map(() => "?").join(",");
  const [blockRows] = await pool.execute<BlockRow[]>(
    `SELECT teaching_method_id AS owner_id, block_type, content
     FROM teaching_method_content_blocks
     WHERE teaching_method_id IN (${placeholders})
     ORDER BY teaching_method_id ASC, sort_order ASC, id ASC`,
    ids,
  );
  const blocks = groupBlocks(blockRows);

  return rows.map((row) => ({
    id: row.id,
    slug: row.slug,
    imageId: row.image_id,
    imageUrl: text(row.image_url),
    imageAlt: text(row.image_alt) || row.title,
    coverPosition: text(row.cover_position) || "50% 50%",
    coverZoom: clampCoverZoom(row.cover_zoom),
    category: text(row.category),
    title: row.title,
    description: text(row.description),
    excerpt: text(row.excerpt) || text(row.description),
    background: text(row.background_hex) || "#fffefa",
    content: blocks.get(row.id) ?? [],
  }));
}

export async function getTeachingMethod(slug: string) {
  const methods = await getTeachingMethods();
  return methods.find((method) => method.slug === slug) ?? null;
}

export async function getNewsPosts(): Promise<DbNewsPost[]> {
  const pool = getMysqlPool();
  const [rows] = await pool.execute<PostRow[]>(
    `SELECT
      p.id,
      p.slug,
      p.title,
      p.excerpt,
      p.post_type,
      p.cover_image_id,
      p.cover_position,
      p.cover_zoom,
      pc.slug AS category_slug,
      pc.name AS category,
      ma.url AS image_url,
      ma.alt_text AS image_alt,
      p.published_at
    FROM posts p
    LEFT JOIN post_categories pc ON pc.id = p.category_id
    LEFT JOIN media_assets ma ON ma.id = p.cover_image_id
    WHERE p.status = 'published'
    ORDER BY p.published_at DESC, p.id DESC`,
  );

  if (!rows.length) return [];

  const ids = rows.map((row) => row.id);
  const placeholders = ids.map(() => "?").join(",");
  const [blockRows] = await pool.execute<BlockRow[]>(
    `SELECT post_id AS owner_id, block_type, content
     FROM post_content_blocks
     WHERE post_id IN (${placeholders})
     ORDER BY post_id ASC, sort_order ASC, id ASC`,
    ids,
  );
  const blocks = groupBlocks(blockRows);

  return rows.map((row) => ({
    id: row.id,
    slug: row.slug,
    postType: row.post_type,
    coverImageId: row.cover_image_id,
    imageUrl: text(row.image_url),
    imageAlt: text(row.image_alt) || row.title,
    coverPosition: text(row.cover_position) || "50% 50%",
    coverZoom: clampCoverZoom(row.cover_zoom),
    categorySlug: text(row.category_slug),
    category: text(row.category),
    title: row.title,
    excerpt: text(row.excerpt),
    content: blocks.get(row.id) ?? [],
    publishedAt: dateToIso(row.published_at),
  }));
}

export async function getNewsPost(slug: string) {
  const posts = await getNewsPosts();
  return posts.find((post) => post.slug === slug) ?? null;
}

export async function getCurriculumTracks(): Promise<DbCurriculumTrack[]> {
  await ensureCategoryStorage();
  const pool = getMysqlPool();
  const [rows] = await pool.execute<CurriculumRow[]>(
    `SELECT
      ct.id,
      ct.slug,
      ct.title,
      ct.category,
      ct.description,
      ct.image_id,
      ct.cover_position,
      ct.cover_zoom,
      image_media.url AS image_url,
      image_media.alt_text AS image_alt,
      ct.logo_media_id,
      logo_media.url AS logo_url,
      logo_media.alt_text AS logo_alt
    FROM curriculum_tracks ct
    LEFT JOIN media_assets image_media ON image_media.id = ct.image_id
    LEFT JOIN media_assets logo_media ON logo_media.id = ct.logo_media_id
    WHERE ct.is_active = TRUE
    ORDER BY ct.sort_order ASC, ct.id ASC`,
  );

  if (!rows.length) return [];

  const ids = rows.map((row) => row.id);
  const placeholders = ids.map(() => "?").join(",");
  const [blockRows] = await pool.execute<BlockRow[]>(
    `SELECT curriculum_track_id AS owner_id, block_type, content
     FROM curriculum_blocks
     WHERE curriculum_track_id IN (${placeholders})
     ORDER BY curriculum_track_id ASC, sort_order ASC, id ASC`,
    ids,
  );
  const blocks = groupBlocks(blockRows);

  return rows.map((row) => ({
    id: row.id,
    slug: row.slug,
    title: row.title,
    category: text(row.category),
    description: text(row.description),
    imageId: row.image_id,
    imageUrl: text(row.image_url),
    imageAlt: text(row.image_alt) || row.title,
    coverPosition: text(row.cover_position) || "50% 50%",
    coverZoom: clampCoverZoom(row.cover_zoom),
    logoMediaId: row.logo_media_id,
    logoUrl: text(row.logo_url),
    logoAlt: text(row.logo_alt) || "Princeton Academy",
    content: blocks.get(row.id) ?? [],
  }));
}

export async function getCampuses(): Promise<DbCampus[]> {
  const pool = getMysqlPool();
  const [rows] = await pool.execute<CampusRow[]>(
    `SELECT
      c.id,
      c.slug,
      c.name,
      c.address_line,
      c.ward,
      c.district,
      c.city,
      c.map_embed_url,
      ma.url AS image_url,
      ma.alt_text AS image_alt
    FROM campuses c
    LEFT JOIN media_assets ma ON ma.id = c.cover_image_id
    WHERE c.is_active = TRUE
    ORDER BY c.sort_order ASC, c.id ASC`,
  );

  if (!rows.length) return [];

  const ids = rows.map((row) => row.id);
  const placeholders = ids.map(() => "?").join(",");
  const [contactRows] = await pool.execute<CampusContactRow[]>(
    `SELECT campus_id, contact_type, label, value
     FROM campus_contacts
     WHERE campus_id IN (${placeholders}) AND is_active = TRUE
     ORDER BY campus_id ASC, sort_order ASC, id ASC`,
    ids,
  );

  const contacts = new Map<number, DbCampus["contacts"]>();
  contactRows.forEach((row) => {
    const current = contacts.get(row.campus_id) ?? [];
    current.push({
      type: row.contact_type,
      label: text(row.label),
      value: row.value,
    });
    contacts.set(row.campus_id, current);
  });

  return rows.map((row) => ({
    id: row.id,
    slug: row.slug,
    name: row.name,
    address: row.address_line,
    ward: text(row.ward),
    district: text(row.district),
    city: text(row.city),
    imageUrl: text(row.image_url),
    imageAlt: text(row.image_alt) || row.name,
    mapEmbedUrl: text(row.map_embed_url),
    contacts: contacts.get(row.id) ?? [],
  }));
}

export async function getGalleryImages(): Promise<DbImage[]> {
  await ensureGalleryStorage();
  const pool = getMysqlPool();
  const [rows] = await pool.execute<GalleryImageRow[]>(
    `SELECT
       gi.id,
       gi.title,
       gi.description,
       gi.image_id,
       ma.url AS image_url,
       ma.alt_text AS image_alt
     FROM gallery_items gi
     INNER JOIN media_assets ma ON ma.id = gi.image_id
     WHERE gi.is_active = TRUE
     ORDER BY gi.sort_order ASC, gi.id ASC`,
  );

  return rows.map((row) => {
    const title = text(row.title);
    const imageUrl = text(row.image_url);
    const imageAlt = text(row.image_alt) || title || "Khoảnh khắc Princeton";

    return {
      id: row.id,
      title,
      description: text(row.description),
      imageId: row.image_id,
      imageUrl,
      imageAlt,
      url: imageUrl,
      alt: imageAlt,
    };
  }).filter((image) => image.url);
}

export async function getFacilityImages(): Promise<DbFacilityImage[]> {
  await ensureAboutStorage();
  const pool = getMysqlPool();
  const [rows] = await pool.execute<FacilityImageRow[]>(
    `SELECT
      fi.id,
      fi.title,
      fi.description,
      fi.image_id,
      ma.url AS image_url,
      ma.alt_text AS image_alt
    FROM facility_images fi
    INNER JOIN media_assets ma ON ma.id = fi.image_id
    WHERE fi.is_active = TRUE
    ORDER BY fi.sort_order ASC, fi.id ASC`,
  );

  const images = rows
    .map((row) => ({
      id: row.id,
      title: text(row.title) || text(row.image_alt) || "Cơ sở vật chất",
      description: text(row.description),
      imageId: row.image_id,
      imageUrl: text(row.image_url),
      imageAlt: text(row.image_alt) || text(row.title) || "Cơ sở vật chất Princeton",
    }))
    .filter((item) => item.imageUrl);

  return uniqueBy(
    images,
    (item) => `${item.title}|${item.description}|${item.imageId}|${item.imageUrl}`,
  );
}

export async function getTeacherTeamItems(): Promise<DbTeacherTeamItem[]> {
  await ensureAboutStorage();
  const pool = getMysqlPool();
  const [rows] = await pool.execute<TeacherTeamRow[]>(
    `SELECT
      tti.id,
      tti.title,
      tti.description,
      tti.image_id,
      tti.cover_position,
      tti.cover_zoom,
      tti.color_hex,
      tti.shape_class,
      tti.rotate_class,
      ma.url AS image_url,
      ma.alt_text AS image_alt
    FROM teacher_team_items tti
    LEFT JOIN media_assets ma ON ma.id = tti.image_id
    WHERE tti.is_active = TRUE
    ORDER BY tti.sort_order ASC, tti.id ASC`,
  );

  const items = rows.map((row) => ({
    id: row.id,
    title: row.title,
    description: text(row.description),
    imageId: row.image_id,
    imageUrl: text(row.image_url),
    imageAlt: text(row.image_alt) || row.title,
    coverPosition: text(row.cover_position) || "50% 50%",
    coverZoom: clampCoverZoom(row.cover_zoom),
    color: text(row.color_hex) || "#fffefa",
    shape: text(row.shape_class) || "rounded-[42px]",
    rotate: text(row.rotate_class),
  }));

  return uniqueBy(
    items,
    (item) => `${item.title}|${item.description}|${item.imageId}|${item.color}|${item.shape}|${item.rotate}`,
  );
}

export async function getTestimonials(): Promise<DbTestimonial[]> {
  await ensureTestimonialStorage();
  const pool = getMysqlPool();
  const [rows] = await pool.execute<TestimonialRow[]>(
    `SELECT
      t.id,
      t.parent_name,
      t.student_name,
      t.avatar_id,
      avatar_media.url AS avatar_url,
      avatar_media.alt_text AS avatar_alt,
      t.quote,
      t.rating,
      t.reaction_image_id,
      reaction_media.url AS reaction_image_url,
      reaction_media.alt_text AS reaction_image_alt
    FROM testimonials t
    LEFT JOIN media_assets avatar_media ON avatar_media.id = t.avatar_id
    LEFT JOIN media_assets reaction_media ON reaction_media.id = t.reaction_image_id
    WHERE t.is_active = TRUE
    ORDER BY t.sort_order ASC, t.id ASC`,
  );

  return rows
    .map((row) => ({
      id: row.id,
      parentName: text(row.parent_name),
      studentName: text(row.student_name),
      avatarId: row.avatar_id,
      avatarUrl: text(row.avatar_url),
      avatarAlt: text(row.avatar_alt) || text(row.parent_name),
      quote: text(row.quote),
      rating: row.rating === null ? null : Number(row.rating),
      reactionImageId: row.reaction_image_id,
      reactionImageUrl: text(row.reaction_image_url),
      reactionImageAlt: text(row.reaction_image_alt) || "Cảm xúc phụ huynh",
    }))
    .filter((item) => item.parentName && item.quote);
}

export async function getAboutContent() {
  const [facilityImages, teacherTeamItems, galleryImages] = await Promise.all([
    getFacilityImages(),
    getTeacherTeamItems(),
    getGalleryImages(),
  ]);

  return {
    facilityImages,
    teacherTeamItems,
    galleryImages,
  };
}

export async function getHomeContent() {
  const [classPrograms, teachingMethods, curriculumTracks, campuses, galleryImages] =
    await Promise.all([
      getClassPrograms(),
      getTeachingMethods(),
      getCurriculumTracks(),
      getCampuses(),
      getGalleryImages(),
    ]);

  return {
    classPrograms,
    teachingMethods,
    curriculumTracks,
    campuses,
    galleryImages,
  };
}

export type HomeContent = Awaited<ReturnType<typeof getHomeContent>>;
