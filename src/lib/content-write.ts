import type { ResultSetHeader, RowDataPacket } from "mysql2/promise";
import { ensureCategoryStorage } from "./categories";
import {
  clampHeroSlideZoom,
  ensureAboutStorage,
  ensureGalleryStorage,
  ensureHeroSlideStorage,
  ensureHomeSectionStorage,
  ensureTestimonialStorage,
  normalizeHeroSlidePosition,
} from "./content";
import { getMysqlPool } from "./mysql";
import {
  normalizeRegistrationSectionSettings,
  type RegistrationSectionSettings,
} from "./registration-section-config";

export type CreateClassProgramInput = {
  slug: string;
  name: string;
  nameEn?: string | null;
  ageLabel: string;
  ageLabelEn?: string | null;
  ageMin?: number | null;
  ageMax?: number | null;
  category?: string | null;
  excerpt?: string | null;
  excerptEn?: string | null;
  description?: string | null;
  descriptionEn?: string | null;
  colorHex?: string | null;
  imageId?: number | null;
  coverPosition?: string | null;
  coverZoom?: number | null;
  schedule?: string[];
  scheduleEn?: string[];
};

export type CreateCurriculumTrackInput = {
  slug: string;
  title: string;
  titleEn?: string | null;
  category?: string | null;
  description?: string | null;
  descriptionEn?: string | null;
  imageId?: number | null;
  coverPosition?: string | null;
  coverZoom?: number | null;
  logoMediaId?: number | null;
  content?: string[];
  contentEn?: string[];
};

export type CreateHeroSlideInput = {
  title?: string | null;
  subtitle?: string | null;
  desktopImageId?: number | null;
  mobileImageId?: number | null;
  desktopObjectPosition?: string | null;
  desktopZoom?: number | null;
  mobileObjectPosition?: string | null;
  mobileZoom?: number | null;
  ctaLabel?: string | null;
  ctaHref?: string | null;
};

export type CreateTeachingMethodInput = {
  slug: string;
  title: string;
  titleEn?: string | null;
  category?: string | null;
  description?: string | null;
  descriptionEn?: string | null;
  excerpt?: string | null;
  excerptEn?: string | null;
  imageId?: number | null;
  coverPosition?: string | null;
  coverZoom?: number | null;
  backgroundHex?: string | null;
  content?: string[];
  contentEn?: string[];
};

export type CreatePostInput = {
  slug: string;
  title: string;
  excerpt?: string | null;
  titleEn?: string | null;
  excerptEn?: string | null;
  categorySlug?: string | null;
  categoryName?: string | null;
  coverImageId?: number | null;
  coverPosition?: string | null;
  coverZoom?: number | null;
  postType?: "news" | "event" | "activity";
  status?: "draft" | "published";
  eventStartsAt?: string | null;
  eventEndsAt?: string | null;
  eventLocation?: string | null;
  content?: string[];
  contentEn?: string[];
};

export type CreateFacilityImageInput = {
  title: string;
  description?: string | null;
  imageId?: number | null;
};

export type CreateGalleryImageInput = {
  title: string;
  description?: string | null;
  imageId?: number | null;
};

export type CreateTeacherTeamInput = {
  title: string;
  description?: string | null;
  imageId?: number | null;
  coverPosition?: string | null;
  coverZoom?: number | null;
  colorHex?: string | null;
  shapeClass?: string | null;
  rotateClass?: string | null;
};

export type CreateTestimonialInput = {
  parentName: string;
  studentName?: string | null;
  avatarId?: number | null;
  quote: string;
  rating?: number | null;
  reactionImageId?: number | null;
};

export type UpdateClassProgramInput = CreateClassProgramInput;
export type UpdateCurriculumTrackInput = CreateCurriculumTrackInput;
export type UpdateHeroSlideInput = CreateHeroSlideInput;
export type UpdateTeachingMethodInput = CreateTeachingMethodInput;
export type UpdatePostInput = CreatePostInput;
export type UpdateFacilityImageInput = CreateFacilityImageInput;
export type UpdateGalleryImageInput = CreateGalleryImageInput;
export type UpdateTeacherTeamInput = CreateTeacherTeamInput;
export type UpdateTestimonialInput = CreateTestimonialInput;
export type UpdateRegistrationSectionInput = Partial<RegistrationSectionSettings>;

type SortRow = RowDataPacket & {
  next_sort_order: number;
};

type IdRow = RowDataPacket & {
  id: number;
};

const DEFAULT_TESTIMONIAL_REACTION_FILE = "11882fd836a9831ca1a002c791767b76e88422e7.png";

function requiredText(value: unknown, field: string) {
  if (typeof value !== "string" || !value.trim()) {
    throw new Error(`Trường ${field} là bắt buộc.`);
  }

  return value.trim();
}

function optionalText(value: unknown) {
  return typeof value === "string" && value.trim() ? value.trim() : null;
}

function optionalNumber(value: unknown) {
  return typeof value === "number" && Number.isFinite(value) ? value : null;
}

function contentBlocks(value: unknown) {
  return Array.isArray(value)
    ? value.filter((item): item is string => typeof item === "string" && Boolean(item.trim())).map((item) => item.trim())
    : [];
}

export function normalizeClassProgramInput(input: Partial<CreateClassProgramInput>) {
  return {
    slug: requiredText(input.slug, "slug"),
    name: requiredText(input.name, "name"),
    nameEn: optionalText(input.nameEn),
    ageLabel: requiredText(input.ageLabel, "ageLabel"),
    ageLabelEn: optionalText(input.ageLabelEn),
    ageMin: optionalNumber(input.ageMin),
    ageMax: optionalNumber(input.ageMax),
    category: optionalText(input.category),
    excerpt: optionalText(input.excerpt),
    excerptEn: optionalText(input.excerptEn),
    description: optionalText(input.description),
    descriptionEn: optionalText(input.descriptionEn),
    colorHex: optionalText(input.colorHex),
    imageId: optionalNumber(input.imageId),
    coverPosition: normalizeCoverPosition(input.coverPosition),
    coverZoom: normalizeCoverZoom(input.coverZoom),
    schedule: contentBlocks(input.schedule),
    scheduleEn: contentBlocks(input.scheduleEn),
  };
}

export function normalizeCurriculumTrackInput(input: Partial<CreateCurriculumTrackInput>) {
  return {
    slug: requiredText(input.slug, "slug"),
    title: requiredText(input.title, "title"),
    titleEn: optionalText(input.titleEn),
    category: optionalText(input.category),
    description: optionalText(input.description),
    descriptionEn: optionalText(input.descriptionEn),
    imageId: optionalNumber(input.imageId),
    coverPosition: normalizeCoverPosition(input.coverPosition),
    coverZoom: normalizeCoverZoom(input.coverZoom),
    logoMediaId: optionalNumber(input.logoMediaId),
    content: contentBlocks(input.content),
    contentEn: contentBlocks(input.contentEn),
  };
}

export function normalizeHeroSlideInput(input: Partial<CreateHeroSlideInput>, requireImage = false) {
  const desktopImageId = optionalNumber(input.desktopImageId);
  const mobileImageId = optionalNumber(input.mobileImageId);

  if (requireImage && !desktopImageId && !mobileImageId) {
    throw new Error("Banner cần có ít nhất một ảnh desktop hoặc mobile.");
  }

  return {
    title: optionalText(input.title) ?? "Banner Princeton Academy",
    subtitle: optionalText(input.subtitle),
    desktopImageId,
    mobileImageId,
    desktopObjectPosition: normalizeHeroSlidePosition(input.desktopObjectPosition),
    desktopZoom: clampHeroSlideZoom(input.desktopZoom),
    mobileObjectPosition: normalizeHeroSlidePosition(input.mobileObjectPosition),
    mobileZoom: clampHeroSlideZoom(input.mobileZoom),
    ctaLabel: optionalText(input.ctaLabel),
    ctaHref: optionalText(input.ctaHref),
  };
}

export function normalizeTeachingMethodInput(input: Partial<CreateTeachingMethodInput>) {
  return {
    slug: requiredText(input.slug, "slug"),
    title: requiredText(input.title, "title"),
    titleEn: optionalText(input.titleEn),
    category: optionalText(input.category),
    description: optionalText(input.description),
    descriptionEn: optionalText(input.descriptionEn),
    excerpt: optionalText(input.excerpt),
    excerptEn: optionalText(input.excerptEn),
    imageId: optionalNumber(input.imageId),
    coverPosition: normalizeCoverPosition(input.coverPosition),
    coverZoom: normalizeCoverZoom(input.coverZoom),
    backgroundHex: optionalText(input.backgroundHex),
    content: contentBlocks(input.content),
    contentEn: contentBlocks(input.contentEn),
  };
}

export function normalizePostInput(input: Partial<CreatePostInput>) {
  const status = input.status === "published" ? "published" : "draft";
  const postType =
    input.postType === "event" || input.postType === "activity" ? input.postType : "news";

  return {
    slug: requiredText(input.slug, "slug"),
    title: requiredText(input.title, "title"),
    excerpt: optionalText(input.excerpt),
    titleEn: optionalText(input.titleEn),
    excerptEn: optionalText(input.excerptEn),
    categorySlug: optionalText(input.categorySlug),
    categoryName: optionalText(input.categoryName),
    coverImageId: optionalNumber(input.coverImageId),
    coverPosition: normalizeCoverPosition(input.coverPosition),
    coverZoom: normalizeCoverZoom(input.coverZoom),
    postType,
    status,
    eventStartsAt: optionalText(input.eventStartsAt),
    eventEndsAt: optionalText(input.eventEndsAt),
    eventLocation: optionalText(input.eventLocation),
    content: contentBlocks(input.content),
    contentEn: contentBlocks(input.contentEn),
  };
}

export function normalizeFacilityImageInput(input: Partial<CreateFacilityImageInput>) {
  return {
    title: requiredText(input.title, "title"),
    description: optionalText(input.description),
    imageId: optionalNumber(input.imageId),
  };
}

export function normalizeGalleryImageInput(input: Partial<CreateGalleryImageInput>) {
  return {
    title: requiredText(input.title, "title"),
    description: optionalText(input.description),
    imageId: optionalNumber(input.imageId),
  };
}

export function normalizeTeacherTeamInput(input: Partial<CreateTeacherTeamInput>) {
  return {
    title: requiredText(input.title, "title"),
    description: optionalText(input.description),
    imageId: optionalNumber(input.imageId),
    coverPosition: normalizeCoverPosition(input.coverPosition),
    coverZoom: normalizeCoverZoom(input.coverZoom),
    colorHex: optionalText(input.colorHex) ?? "#fffefa",
    shapeClass: optionalText(input.shapeClass) ?? "rounded-[42px]",
    rotateClass: optionalText(input.rotateClass),
  };
}

function normalizeCoverPosition(value: unknown) {
  if (typeof value !== "string") return "50% 50%";
  const match = value.trim().match(/^(\d{1,3})%\s+(\d{1,3})%$/);
  if (!match) return "50% 50%";
  const x = Math.max(0, Math.min(100, Number(match[1])));
  const y = Math.max(0, Math.min(100, Number(match[2])));
  return `${x}% ${y}%`;
}

function normalizeCoverZoom(value: unknown) {
  if (typeof value !== "number" || !Number.isFinite(value)) return 1;
  return Math.max(0.5, Math.min(3, value));
}

export function normalizeTestimonialInput(input: Partial<CreateTestimonialInput>) {
  return {
    parentName: requiredText(input.parentName, "parentName"),
    studentName: optionalText(input.studentName),
    avatarId: optionalNumber(input.avatarId),
    quote: requiredText(input.quote, "quote"),
    rating: optionalNumber(input.rating),
    reactionImageId: optionalNumber(input.reactionImageId),
  };
}

async function nextSortOrder(tableName: string) {
  const pool = getMysqlPool();
  const [rows] = await pool.execute<SortRow[]>(
    `SELECT COALESCE(MAX(sort_order), 0) + 10 AS next_sort_order FROM ${tableName}`,
  );

  return rows[0]?.next_sort_order ?? 10;
}

async function getDefaultTestimonialReactionId() {
  const pool = getMysqlPool();
  const [rows] = await pool.execute<IdRow[]>(
    "SELECT id FROM media_assets WHERE file_name = :fileName LIMIT 1",
    { fileName: DEFAULT_TESTIMONIAL_REACTION_FILE },
  );

  return rows[0]?.id ?? null;
}

export async function createClassProgram(input: Partial<CreateClassProgramInput>) {
  const data = normalizeClassProgramInput(input);
  const pool = getMysqlPool();
  const connection = await pool.getConnection();

  try {
    await connection.beginTransaction();
    const sortOrder = await nextSortOrder("class_programs");

    const [result] = await connection.execute<ResultSetHeader>(
      `INSERT INTO class_programs (
        slug, name, name_en, age_min, age_max, age_label, age_label_en, category, excerpt, excerpt_en, description, description_en,
        image_id, cover_position, cover_zoom, color_hex, sort_order, is_active
      ) VALUES (
        :slug, :name, :nameEn, :ageMin, :ageMax, :ageLabel, :ageLabelEn, :category, :excerpt, :excerptEn, :description, :descriptionEn,
        :imageId, :coverPosition, :coverZoom, :colorHex, :sortOrder, TRUE
      )`,
      { ...data, sortOrder },
    );

    for (const [index, item] of data.schedule.entries()) {
      await connection.execute(
        `INSERT INTO class_program_schedule_items (class_program_id, title, description, sort_order, lang)
         VALUES (:programId, :title, :description, :sortOrder, 'vi')`,
        {
          programId: result.insertId,
          title: `Hoạt động ${index + 1}`,
          description: item,
          sortOrder: (index + 1) * 10,
        },
      );
    }

    for (const [index, item] of data.scheduleEn.entries()) {
      await connection.execute(
        `INSERT INTO class_program_schedule_items (class_program_id, title, description, sort_order, lang)
         VALUES (:programId, :title, :description, :sortOrder, 'en')`,
        {
          programId: result.insertId,
          title: `Activity ${index + 1}`,
          description: item,
          sortOrder: (index + 1) * 10,
        },
      );
    }

    await connection.commit();
    return result.insertId;
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
}

export async function createCurriculumTrack(input: Partial<CreateCurriculumTrackInput>) {
  await ensureCategoryStorage();
  const data = normalizeCurriculumTrackInput(input);
  const pool = getMysqlPool();
  const connection = await pool.getConnection();

  try {
    await connection.beginTransaction();
    const sortOrder = await nextSortOrder("curriculum_tracks");

    const [result] = await connection.execute<ResultSetHeader>(
      `INSERT INTO curriculum_tracks (
        slug, title, title_en, category, description, description_en, image_id, cover_position, cover_zoom, logo_media_id, sort_order, is_active
      ) VALUES (
        :slug, :title, :titleEn, :category, :description, :descriptionEn, :imageId, :coverPosition, :coverZoom, :logoMediaId, :sortOrder, TRUE
      )`,
      { ...data, sortOrder },
    );

    for (const [index, item] of data.content.entries()) {
      await connection.execute(
        `INSERT INTO curriculum_blocks (curriculum_track_id, block_type, content, sort_order, lang)
         VALUES (:trackId, 'paragraph', :content, :sortOrder, 'vi')`,
        {
          trackId: result.insertId,
          content: JSON.stringify({ text: item }),
          sortOrder: (index + 1) * 10,
        },
      );
    }

    for (const [index, item] of data.contentEn.entries()) {
      await connection.execute(
        `INSERT INTO curriculum_blocks (curriculum_track_id, block_type, content, sort_order, lang)
         VALUES (:trackId, 'paragraph', :content, :sortOrder, 'en')`,
        {
          trackId: result.insertId,
          content: JSON.stringify({ text: item }),
          sortOrder: (index + 1) * 10,
        },
      );
    }

    await connection.commit();
    return result.insertId;
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
}

export async function createTeachingMethod(input: Partial<CreateTeachingMethodInput>) {
  const data = normalizeTeachingMethodInput(input);
  const pool = getMysqlPool();
  const connection = await pool.getConnection();

  try {
    await connection.beginTransaction();
    const sortOrder = await nextSortOrder("teaching_methods");

    const [result] = await connection.execute<ResultSetHeader>(
      `INSERT INTO teaching_methods (
        slug, title, title_en, category, description, description_en, excerpt, excerpt_en, image_id, cover_position, cover_zoom, background_hex, sort_order, status
      ) VALUES (
        :slug, :title, :titleEn, :category, :description, :descriptionEn, :excerpt, :excerptEn, :imageId, :coverPosition, :coverZoom, :backgroundHex, :sortOrder, 'published'
      )`,
      { ...data, sortOrder },
    );

    for (const [index, item] of data.content.entries()) {
      await connection.execute(
        `INSERT INTO teaching_method_content_blocks (teaching_method_id, block_type, content, sort_order, lang)
         VALUES (:methodId, 'paragraph', :content, :sortOrder, 'vi')`,
        {
          methodId: result.insertId,
          content: JSON.stringify({ text: item }),
          sortOrder: (index + 1) * 10,
        },
      );
    }

    for (const [index, item] of data.contentEn.entries()) {
      await connection.execute(
        `INSERT INTO teaching_method_content_blocks (teaching_method_id, block_type, content, sort_order, lang)
         VALUES (:methodId, 'paragraph', :content, :sortOrder, 'en')`,
        {
          methodId: result.insertId,
          content: JSON.stringify({ text: item }),
          sortOrder: (index + 1) * 10,
        },
      );
    }

    await connection.commit();
    return result.insertId;
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
}

export async function createPost(input: Partial<CreatePostInput>) {
  const data = normalizePostInput(input);
  const pool = getMysqlPool();
  const connection = await pool.getConnection();

  try {
    await connection.beginTransaction();

    let categoryId: number | null = null;
    if (data.categorySlug) {
      const [categoryRows] = await connection.execute<IdRow[]>(
        "SELECT id FROM post_categories WHERE slug = :slug LIMIT 1",
        { slug: data.categorySlug },
      );
      categoryId = categoryRows[0]?.id ?? null;
    }

    if (!categoryId && data.categorySlug && data.categoryName) {
      const sortOrder = await nextSortOrder("post_categories");
      const [categoryResult] = await connection.execute<ResultSetHeader>(
        `INSERT INTO post_categories (slug, name, sort_order, is_active)
         VALUES (:slug, :name, :sortOrder, TRUE)`,
        { slug: data.categorySlug, name: data.categoryName, sortOrder },
      );
      categoryId = categoryResult.insertId;
    }

    const [result] = await connection.execute<ResultSetHeader>(
      `INSERT INTO posts (
        slug, title, excerpt, title_en, excerpt_en, category_id, cover_image_id, cover_position, cover_zoom, post_type, status,
        published_at, event_starts_at, event_ends_at, event_location
      ) VALUES (
        :slug, :title, :excerpt, :titleEn, :excerptEn, :categoryId, :coverImageId, :coverPosition, :coverZoom, :postType, :status,
        IF(:status = 'published', NOW(), NULL), :eventStartsAt, :eventEndsAt, :eventLocation
      )`,
      { ...data, categoryId },
    );

    for (const [index, item] of data.content.entries()) {
      await connection.execute(
        `INSERT INTO post_content_blocks (post_id, block_type, content, sort_order, lang)
         VALUES (:postId, 'paragraph', :content, :sortOrder, 'vi')`,
        {
          postId: result.insertId,
          content: JSON.stringify({ text: item }),
          sortOrder: (index + 1) * 10,
        },
      );
    }

    for (const [index, item] of data.contentEn.entries()) {
      await connection.execute(
        `INSERT INTO post_content_blocks (post_id, block_type, content, sort_order, lang)
         VALUES (:postId, 'paragraph', :content, :sortOrder, 'en')`,
        {
          postId: result.insertId,
          content: JSON.stringify({ text: item }),
          sortOrder: (index + 1) * 10,
        },
      );
    }

    await connection.commit();
    return result.insertId;
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
}

export async function createFacilityImage(input: Partial<CreateFacilityImageInput>) {
  await ensureAboutStorage();
  const data = normalizeFacilityImageInput(input);
  if (!data.imageId) {
    throw new Error("Vui lòng upload ảnh cơ sở vật chất.");
  }

  const pool = getMysqlPool();
  const sortOrder = await nextSortOrder("facility_images");
  const [result] = await pool.execute<ResultSetHeader>(
    `INSERT INTO facility_images (title, description, image_id, sort_order, is_active)
     VALUES (:title, :description, :imageId, :sortOrder, TRUE)`,
    { ...data, sortOrder },
  );

  return result.insertId;
}

export async function createGalleryImage(input: Partial<CreateGalleryImageInput>) {
  await ensureGalleryStorage();
  const data = normalizeGalleryImageInput(input);
  if (!data.imageId) {
    throw new Error("Vui lòng upload ảnh khoảnh khắc.");
  }

  const pool = getMysqlPool();
  const sortOrder = await nextSortOrder("gallery_items");
  const [result] = await pool.execute<ResultSetHeader>(
    `INSERT INTO gallery_items (title, description, image_id, sort_order, is_featured, is_active)
     VALUES (:title, :description, :imageId, :sortOrder, FALSE, TRUE)`,
    { ...data, sortOrder },
  );

  return result.insertId;
}

export async function createHeroSlide(input: Partial<CreateHeroSlideInput>) {
  await ensureHeroSlideStorage();
  const data = normalizeHeroSlideInput(input, true);
  const pool = getMysqlPool();
  const sortOrder = await nextSortOrder("hero_slides");
  const [result] = await pool.execute<ResultSetHeader>(
    `INSERT INTO hero_slides (
      title, subtitle, desktop_image_id, mobile_image_id, desktop_object_position, desktop_zoom, mobile_object_position, mobile_zoom, cta_label, cta_href, sort_order, is_active
    ) VALUES (
      :title, :subtitle, :desktopImageId, :mobileImageId, :desktopObjectPosition, :desktopZoom, :mobileObjectPosition, :mobileZoom, :ctaLabel, :ctaHref, :sortOrder, TRUE
    )`,
    { ...data, sortOrder },
  );

  return result.insertId;
}

export async function createTeacherTeamItem(input: Partial<CreateTeacherTeamInput>) {
  await ensureAboutStorage();
  const data = normalizeTeacherTeamInput(input);
  const pool = getMysqlPool();
  const sortOrder = await nextSortOrder("teacher_team_items");
  const [result] = await pool.execute<ResultSetHeader>(
    `INSERT INTO teacher_team_items (
      title, description, image_id, cover_position, cover_zoom, color_hex, shape_class, rotate_class, sort_order, is_active
    ) VALUES (
      :title, :description, :imageId, :coverPosition, :coverZoom, :colorHex, :shapeClass, :rotateClass, :sortOrder, TRUE
    )`,
    { ...data, sortOrder },
  );

  return result.insertId;
}

export async function createTestimonial(input: Partial<CreateTestimonialInput>) {
  await ensureTestimonialStorage();
  const data = normalizeTestimonialInput(input);
  const pool = getMysqlPool();
  const sortOrder = await nextSortOrder("testimonials");
  const reactionImageId = data.reactionImageId ?? (await getDefaultTestimonialReactionId());
  const [result] = await pool.execute<ResultSetHeader>(
    `INSERT INTO testimonials (
      parent_name, student_name, avatar_id, quote, rating, reaction_image_id, sort_order, is_active
    ) VALUES (
      :parentName, :studentName, :avatarId, :quote, :rating, :reactionImageId, :sortOrder, TRUE
    )`,
    { ...data, reactionImageId, sortOrder },
  );

  return result.insertId;
}

function positiveId(value: unknown) {
  const id = Number(value);
  if (!Number.isInteger(id) || id <= 0) {
    throw new Error("ID không hợp lệ.");
  }

  return id;
}

export async function updateClassProgram(idValue: unknown, input: Partial<UpdateClassProgramInput>) {
  const id = positiveId(idValue);
  const data = normalizeClassProgramInput(input);
  const pool = getMysqlPool();
  const connection = await pool.getConnection();

  try {
    await connection.beginTransaction();

    await connection.execute(
      `UPDATE class_programs
       SET slug = :slug,
           name = :name,
           name_en = :nameEn,
           age_min = :ageMin,
           age_max = :ageMax,
           age_label = :ageLabel,
           age_label_en = :ageLabelEn,
           category = :category,
           excerpt = :excerpt,
           excerpt_en = :excerptEn,
           description = :description,
           description_en = :descriptionEn,
           image_id = COALESCE(:imageId, image_id),
           cover_position = :coverPosition,
           cover_zoom = :coverZoom,
           color_hex = :colorHex,
           is_active = TRUE
       WHERE id = :id`,
      { ...data, id },
    );

    await connection.execute(
      "DELETE FROM class_program_schedule_items WHERE class_program_id = :id",
      { id },
    );

    for (const [index, item] of data.schedule.entries()) {
      await connection.execute(
        `INSERT INTO class_program_schedule_items (class_program_id, title, description, sort_order, lang)
         VALUES (:programId, :title, :description, :sortOrder, 'vi')`,
        {
          programId: id,
          title: `Hoạt động ${index + 1}`,
          description: item,
          sortOrder: (index + 1) * 10,
        },
      );
    }

    for (const [index, item] of data.scheduleEn.entries()) {
      await connection.execute(
        `INSERT INTO class_program_schedule_items (class_program_id, title, description, sort_order, lang)
         VALUES (:programId, :title, :description, :sortOrder, 'en')`,
        {
          programId: id,
          title: `Activity ${index + 1}`,
          description: item,
          sortOrder: (index + 1) * 10,
        },
      );
    }

    await connection.commit();
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
}

export async function archiveClassProgram(idValue: unknown) {
  const id = positiveId(idValue);
  const pool = getMysqlPool();
  await pool.execute("UPDATE class_programs SET is_active = FALSE WHERE id = :id", { id });
}

export async function updateCurriculumTrack(idValue: unknown, input: Partial<UpdateCurriculumTrackInput>) {
  await ensureCategoryStorage();
  const id = positiveId(idValue);
  const data = normalizeCurriculumTrackInput(input);
  const pool = getMysqlPool();
  const connection = await pool.getConnection();

  try {
    await connection.beginTransaction();

    await connection.execute(
      `UPDATE curriculum_tracks
       SET slug = :slug,
           title = :title,
           title_en = :titleEn,
           category = :category,
           description = :description,
           description_en = :descriptionEn,
           image_id = COALESCE(:imageId, image_id),
           cover_position = :coverPosition,
           cover_zoom = :coverZoom,
           logo_media_id = COALESCE(:logoMediaId, logo_media_id),
           is_active = TRUE
       WHERE id = :id`,
      { ...data, id },
    );

    await connection.execute("DELETE FROM curriculum_blocks WHERE curriculum_track_id = :id", { id });

    for (const [index, item] of data.content.entries()) {
      await connection.execute(
        `INSERT INTO curriculum_blocks (curriculum_track_id, block_type, content, sort_order, lang)
         VALUES (:trackId, 'paragraph', :content, :sortOrder, 'vi')`,
        {
          trackId: id,
          content: JSON.stringify({ text: item }),
          sortOrder: (index + 1) * 10,
        },
      );
    }

    for (const [index, item] of data.contentEn.entries()) {
      await connection.execute(
        `INSERT INTO curriculum_blocks (curriculum_track_id, block_type, content, sort_order, lang)
         VALUES (:trackId, 'paragraph', :content, :sortOrder, 'en')`,
        {
          trackId: id,
          content: JSON.stringify({ text: item }),
          sortOrder: (index + 1) * 10,
        },
      );
    }

    await connection.commit();
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
}

export async function archiveCurriculumTrack(idValue: unknown) {
  const id = positiveId(idValue);
  const pool = getMysqlPool();
  await pool.execute("UPDATE curriculum_tracks SET is_active = FALSE WHERE id = :id", { id });
}

export async function updateHeroSlide(idValue: unknown, input: Partial<UpdateHeroSlideInput>) {
  await ensureHeroSlideStorage();
  const id = positiveId(idValue);
  const data = normalizeHeroSlideInput(input);
  const pool = getMysqlPool();

  await pool.execute(
    `UPDATE hero_slides
     SET title = :title,
         subtitle = :subtitle,
         desktop_image_id = COALESCE(:desktopImageId, desktop_image_id),
         mobile_image_id = COALESCE(:mobileImageId, mobile_image_id),
         desktop_object_position = :desktopObjectPosition,
         desktop_zoom = :desktopZoom,
         mobile_object_position = :mobileObjectPosition,
         mobile_zoom = :mobileZoom,
         cta_label = :ctaLabel,
         cta_href = :ctaHref,
         is_active = TRUE
     WHERE id = :id`,
    { ...data, id },
  );
}

export async function updateRegistrationSectionSettings(input: UpdateRegistrationSectionInput) {
  await ensureHomeSectionStorage();
  const data = normalizeRegistrationSectionSettings(input);
  const { isActive, ...config } = data;
  const pool = getMysqlPool();

  await pool.execute(
    `INSERT INTO home_sections (section_key, title, subtitle, config, sort_order, is_active)
     VALUES ('registration', :title, NULL, :config, 90, :isActive)
     ON DUPLICATE KEY UPDATE
       title = VALUES(title),
       subtitle = VALUES(subtitle),
       config = VALUES(config),
       is_active = VALUES(is_active)`,
    {
      title: data.title,
      config: JSON.stringify(config),
      isActive,
    },
  );

  return data;
}

export async function archiveHeroSlide(idValue: unknown) {
  await ensureHeroSlideStorage();
  const id = positiveId(idValue);
  const pool = getMysqlPool();
  await pool.execute("UPDATE hero_slides SET is_active = FALSE WHERE id = :id", { id });
}

export async function updateTeachingMethod(idValue: unknown, input: Partial<UpdateTeachingMethodInput>) {
  const id = positiveId(idValue);
  const data = normalizeTeachingMethodInput(input);
  const pool = getMysqlPool();
  const connection = await pool.getConnection();

  try {
    await connection.beginTransaction();

    await connection.execute(
      `UPDATE teaching_methods
       SET slug = :slug,
           title = :title,
           title_en = :titleEn,
           category = :category,
           description = :description,
           description_en = :descriptionEn,
           excerpt = :excerpt,
           excerpt_en = :excerptEn,
           image_id = COALESCE(:imageId, image_id),
           cover_position = :coverPosition,
           cover_zoom = :coverZoom,
           background_hex = :backgroundHex,
           status = 'published'
       WHERE id = :id`,
      { ...data, id },
    );

    await connection.execute("DELETE FROM teaching_method_content_blocks WHERE teaching_method_id = :id", { id });

    for (const [index, item] of data.content.entries()) {
      await connection.execute(
        `INSERT INTO teaching_method_content_blocks (teaching_method_id, block_type, content, sort_order, lang)
         VALUES (:methodId, 'paragraph', :content, :sortOrder, 'vi')`,
        {
          methodId: id,
          content: JSON.stringify({ text: item }),
          sortOrder: (index + 1) * 10,
        },
      );
    }

    for (const [index, item] of data.contentEn.entries()) {
      await connection.execute(
        `INSERT INTO teaching_method_content_blocks (teaching_method_id, block_type, content, sort_order, lang)
         VALUES (:methodId, 'paragraph', :content, :sortOrder, 'en')`,
        {
          methodId: id,
          content: JSON.stringify({ text: item }),
          sortOrder: (index + 1) * 10,
        },
      );
    }

    await connection.commit();
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
}

export async function archiveTeachingMethod(idValue: unknown) {
  const id = positiveId(idValue);
  const pool = getMysqlPool();
  await pool.execute("UPDATE teaching_methods SET status = 'archived' WHERE id = :id", { id });
}

export async function updatePost(idValue: unknown, input: Partial<UpdatePostInput>) {
  const id = positiveId(idValue);
  const data = normalizePostInput(input);
  const pool = getMysqlPool();
  const connection = await pool.getConnection();

  try {
    await connection.beginTransaction();

    let categoryId: number | null = null;
    if (data.categorySlug) {
      const [categoryRows] = await connection.execute<IdRow[]>(
        "SELECT id FROM post_categories WHERE slug = :slug LIMIT 1",
        { slug: data.categorySlug },
      );
      categoryId = categoryRows[0]?.id ?? null;
    }

    if (!categoryId && data.categorySlug && data.categoryName) {
      const sortOrder = await nextSortOrder("post_categories");
      const [categoryResult] = await connection.execute<ResultSetHeader>(
        `INSERT INTO post_categories (slug, name, sort_order, is_active)
         VALUES (:slug, :name, :sortOrder, TRUE)`,
        { slug: data.categorySlug, name: data.categoryName, sortOrder },
      );
      categoryId = categoryResult.insertId;
    }

    await connection.execute(
      `UPDATE posts
       SET slug = :slug,
           title = :title,
           excerpt = :excerpt,
           title_en = :titleEn,
           excerpt_en = :excerptEn,
           category_id = :categoryId,
       cover_image_id = COALESCE(:coverImageId, cover_image_id),
       cover_position = :coverPosition,
       cover_zoom = :coverZoom,
       post_type = :postType,
           status = :status,
           published_at = IF(:status = 'published', COALESCE(published_at, NOW()), NULL),
           event_starts_at = :eventStartsAt,
           event_ends_at = :eventEndsAt,
           event_location = :eventLocation
       WHERE id = :id`,
      { ...data, categoryId, id },
    );

    await connection.execute("DELETE FROM post_content_blocks WHERE post_id = :id", { id });

    for (const [index, item] of data.content.entries()) {
      await connection.execute(
        `INSERT INTO post_content_blocks (post_id, block_type, content, sort_order, lang)
         VALUES (:postId, 'paragraph', :content, :sortOrder, 'vi')`,
        {
          postId: id,
          content: JSON.stringify({ text: item }),
          sortOrder: (index + 1) * 10,
        },
      );
    }

    for (const [index, item] of data.contentEn.entries()) {
      await connection.execute(
        `INSERT INTO post_content_blocks (post_id, block_type, content, sort_order, lang)
         VALUES (:postId, 'paragraph', :content, :sortOrder, 'en')`,
        {
          postId: id,
          content: JSON.stringify({ text: item }),
          sortOrder: (index + 1) * 10,
        },
      );
    }

    await connection.commit();
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
}

export async function archivePost(idValue: unknown) {
  const id = positiveId(idValue);
  const pool = getMysqlPool();
  await pool.execute("UPDATE posts SET status = 'archived' WHERE id = :id", { id });
}

export async function updateFacilityImage(idValue: unknown, input: Partial<UpdateFacilityImageInput>) {
  await ensureAboutStorage();
  const id = positiveId(idValue);
  const data = normalizeFacilityImageInput(input);
  const pool = getMysqlPool();

  await pool.execute(
    `UPDATE facility_images
     SET title = :title,
         description = :description,
         image_id = COALESCE(:imageId, image_id),
         is_active = TRUE
     WHERE id = :id`,
    { ...data, id },
  );
}

export async function archiveFacilityImage(idValue: unknown) {
  await ensureAboutStorage();
  const id = positiveId(idValue);
  const pool = getMysqlPool();
  await pool.execute("UPDATE facility_images SET is_active = FALSE WHERE id = :id", { id });
}

export async function updateGalleryImage(idValue: unknown, input: Partial<UpdateGalleryImageInput>) {
  await ensureGalleryStorage();
  const id = positiveId(idValue);
  const data = normalizeGalleryImageInput(input);
  const pool = getMysqlPool();

  await pool.execute(
    `UPDATE gallery_items
     SET title = :title,
         description = :description,
         image_id = COALESCE(:imageId, image_id),
         is_active = TRUE
     WHERE id = :id`,
    { ...data, id },
  );
}

export async function archiveGalleryImage(idValue: unknown) {
  await ensureGalleryStorage();
  const id = positiveId(idValue);
  const pool = getMysqlPool();
  await pool.execute("UPDATE gallery_items SET is_active = FALSE WHERE id = :id", { id });
}

export async function updateTeacherTeamItem(idValue: unknown, input: Partial<UpdateTeacherTeamInput>) {
  await ensureAboutStorage();
  const id = positiveId(idValue);
  const data = normalizeTeacherTeamInput(input);
  const pool = getMysqlPool();

  await pool.execute(
    `UPDATE teacher_team_items
     SET title = :title,
         description = :description,
         image_id = COALESCE(:imageId, image_id),
         cover_position = :coverPosition,
         cover_zoom = :coverZoom,
         color_hex = :colorHex,
         shape_class = :shapeClass,
         rotate_class = :rotateClass,
         is_active = TRUE
     WHERE id = :id`,
    { ...data, id },
  );
}

export async function archiveTeacherTeamItem(idValue: unknown) {
  await ensureAboutStorage();
  const id = positiveId(idValue);
  const pool = getMysqlPool();
  await pool.execute("UPDATE teacher_team_items SET is_active = FALSE WHERE id = :id", { id });
}

export async function updateTestimonial(idValue: unknown, input: Partial<UpdateTestimonialInput>) {
  await ensureTestimonialStorage();
  const id = positiveId(idValue);
  const data = normalizeTestimonialInput(input);
  const pool = getMysqlPool();
  const reactionImageId = data.reactionImageId ?? (await getDefaultTestimonialReactionId());

  await pool.execute(
    `UPDATE testimonials
     SET parent_name = :parentName,
         student_name = :studentName,
         avatar_id = COALESCE(:avatarId, avatar_id),
         quote = :quote,
         rating = :rating,
         reaction_image_id = COALESCE(:reactionImageId, reaction_image_id),
         is_active = TRUE
     WHERE id = :id`,
    { ...data, reactionImageId, id },
  );
}

export async function archiveTestimonial(idValue: unknown) {
  await ensureTestimonialStorage();
  const id = positiveId(idValue);
  const pool = getMysqlPool();
  await pool.execute("UPDATE testimonials SET is_active = FALSE WHERE id = :id", { id });
}
