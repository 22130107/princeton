import type { ResultSetHeader, RowDataPacket } from "mysql2/promise";
import { getMysqlPool } from "./mysql";

export type CategoryScope = "teaching_methods" | "class_programs" | "curriculum_tracks" | "posts";

export type CategoryOption = {
  id: number;
  slug: string;
  name: string;
  scope: CategoryScope;
};

type CategoryRow = RowDataPacket & CategoryOption;
type ColumnRow = RowDataPacket & { column_exists: number };
type ExistingCategoryRow = RowDataPacket & {
  scope: Exclude<CategoryScope, "posts">;
  name: string;
};
type StoredCategoryRow = RowDataPacket & {
  id: number;
  name: string;
};
type ExistingOptionRow = RowDataPacket & {
  id: number;
  scope?: CategoryScope;
  slug: string;
  name: string;
};

const categoryScopes: CategoryScope[] = [
  "teaching_methods",
  "class_programs",
  "curriculum_tracks",
  "posts",
];

function slugify(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function requiredCategoryName(value: unknown) {
  if (typeof value !== "string" || !value.trim()) {
    throw new Error("Tên danh mục là bắt buộc.");
  }

  return value.trim();
}

function assertScope(value: unknown): CategoryScope {
  if (typeof value === "string" && categoryScopes.includes(value as CategoryScope)) {
    return value as CategoryScope;
  }

  throw new Error("Nhóm danh mục không hợp lệ.");
}

function positiveId(value: unknown) {
  const id = Number(value);
  if (!Number.isInteger(id) || id <= 0) {
    throw new Error("ID danh mục không hợp lệ.");
  }

  return id;
}

function tableForScope(scope: Exclude<CategoryScope, "posts">) {
  return {
    teaching_methods: "teaching_methods",
    class_programs: "class_programs",
    curriculum_tracks: "curriculum_tracks",
  }[scope];
}

export async function ensureCategoryStorage() {
  const pool = getMysqlPool();

  await pool.execute(`
    CREATE TABLE IF NOT EXISTS content_categories (
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
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  `);

  const [rows] = await pool.execute<ColumnRow[]>(
    `SELECT COUNT(*) AS column_exists
     FROM information_schema.COLUMNS
     WHERE TABLE_SCHEMA = DATABASE()
       AND TABLE_NAME = 'curriculum_tracks'
       AND COLUMN_NAME = 'category'`,
  );

  if (!rows[0]?.column_exists) {
    await pool.execute("ALTER TABLE curriculum_tracks ADD COLUMN category VARCHAR(255) NULL AFTER title");
  }
}

async function seedContentCategories() {
  const pool = getMysqlPool();
  const [existingRows] = await pool.execute<ExistingCategoryRow[]>(`
    SELECT 'class_programs' AS scope, TRIM(category) AS name
    FROM class_programs
    WHERE category IS NOT NULL AND TRIM(category) <> ''
    UNION
    SELECT 'teaching_methods' AS scope, TRIM(category) AS name
    FROM teaching_methods
    WHERE category IS NOT NULL AND TRIM(category) <> ''
    UNION
    SELECT 'curriculum_tracks' AS scope, TRIM(category) AS name
    FROM curriculum_tracks
    WHERE category IS NOT NULL AND TRIM(category) <> ''
  `);

  for (const row of existingRows) {
    const slug = slugify(row.name);
    if (!slug) continue;

    await pool.execute(
      `INSERT INTO content_categories (scope, slug, name, sort_order)
       VALUES (:scope, :slug, :name, 10)
       ON DUPLICATE KEY UPDATE name = VALUES(name), is_active = TRUE`,
      { scope: row.scope, slug, name: row.name },
    );
  }

  await pool.execute(`
    INSERT IGNORE INTO content_categories (scope, slug, name, sort_order) VALUES
      ('curriculum_tracks', 'tieu-chuan', 'Tiêu chuẩn', 10),
      ('curriculum_tracks', 'nang-cao', 'Nâng cao', 20)
  `);

  const [storedRows] = await pool.execute<StoredCategoryRow[]>(
    "SELECT id, name FROM content_categories WHERE is_active = TRUE",
  );

  for (const row of storedRows) {
    const normalizedSlug = slugify(row.name);
    if (!normalizedSlug) continue;

    try {
      await pool.execute(
        "UPDATE content_categories SET slug = :slug WHERE id = :id",
        { slug: normalizedSlug, id: row.id },
      );
    } catch {
      await pool.execute("UPDATE content_categories SET is_active = FALSE WHERE id = :id", {
        id: row.id,
      });
    }
  }
}

export async function getCategoryOptions() {
  await ensureCategoryStorage();
  await seedContentCategories();

  const pool = getMysqlPool();
  const [contentRows] = await pool.execute<CategoryRow[]>(
    `SELECT id, scope, slug, name
     FROM content_categories
     WHERE is_active = TRUE
     ORDER BY scope ASC, sort_order ASC, name ASC`,
  );

  const [postRows] = await pool.execute<CategoryRow[]>(
    `SELECT id, 'posts' AS scope, slug, name
     FROM post_categories
     WHERE is_active = TRUE
     ORDER BY sort_order ASC, name ASC`,
  );

  return {
    teachingMethods: contentRows.filter((row) => row.scope === "teaching_methods"),
    classPrograms: contentRows.filter((row) => row.scope === "class_programs"),
    curriculumTracks: contentRows.filter((row) => row.scope === "curriculum_tracks"),
    posts: postRows,
  };
}

export async function createCategory(input: { scope?: unknown; name?: unknown }) {
  const scope = assertScope(input.scope);
  const name = requiredCategoryName(input.name);
  const slug = slugify(name);

  if (!slug) {
    throw new Error("Tên danh mục không hợp lệ.");
  }

  await ensureCategoryStorage();
  const pool = getMysqlPool();

  if (scope === "posts") {
    const [result] = await pool.execute<ResultSetHeader>(
      `INSERT INTO post_categories (slug, name, sort_order, is_active)
       VALUES (:slug, :name, 0, TRUE)
       ON DUPLICATE KEY UPDATE name = VALUES(name), is_active = TRUE`,
      { slug, name },
    );

    return { id: result.insertId, slug, name, scope };
  }

  const [result] = await pool.execute<ResultSetHeader>(
    `INSERT INTO content_categories (scope, slug, name, sort_order, is_active)
     VALUES (:scope, :slug, :name, 0, TRUE)
     ON DUPLICATE KEY UPDATE name = VALUES(name), is_active = TRUE`,
    { scope, slug, name },
  );

  return { id: result.insertId, slug, name, scope };
}

export async function updateCategory(
  idValue: unknown,
  input: { scope?: unknown; name?: unknown },
) {
  const id = positiveId(idValue);
  const scope = assertScope(input.scope);
  const name = requiredCategoryName(input.name);
  const slug = slugify(name);

  if (!slug) {
    throw new Error("Tên danh mục không hợp lệ.");
  }

  await ensureCategoryStorage();
  const pool = getMysqlPool();
  const connection = await pool.getConnection();

  try {
    await connection.beginTransaction();

    if (scope === "posts") {
      const [rows] = await connection.execute<ExistingOptionRow[]>(
        "SELECT id, slug, name FROM post_categories WHERE id = :id LIMIT 1",
        { id },
      );
      if (!rows[0]) throw new Error("Không tìm thấy danh mục.");

      await connection.execute(
        `UPDATE post_categories
         SET slug = :slug, name = :name, is_active = TRUE
         WHERE id = :id`,
        { id, slug, name },
      );

      await connection.commit();
      return { id, slug, name, scope };
    }

    const [rows] = await connection.execute<ExistingOptionRow[]>(
      "SELECT id, scope, slug, name FROM content_categories WHERE id = :id AND scope = :scope LIMIT 1",
      { id, scope },
    );
    const current = rows[0];
    if (!current) throw new Error("Không tìm thấy danh mục.");

    await connection.execute(
      `UPDATE content_categories
       SET slug = :slug, name = :name, is_active = TRUE
       WHERE id = :id AND scope = :scope`,
      { id, scope, slug, name },
    );

    await connection.execute(
      `UPDATE ${tableForScope(scope)}
       SET category = :name
       WHERE category = :oldName`,
      { name, oldName: current.name },
    );

    await connection.commit();
    return { id, slug, name, scope };
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
}

export async function archiveCategory(idValue: unknown, input: { scope?: unknown }) {
  const id = positiveId(idValue);
  const scope = assertScope(input.scope);

  await ensureCategoryStorage();
  const pool = getMysqlPool();
  const connection = await pool.getConnection();

  try {
    await connection.beginTransaction();

    if (scope === "posts") {
      await connection.execute("UPDATE posts SET category_id = NULL WHERE category_id = :id", {
        id,
      });
      await connection.execute("UPDATE post_categories SET is_active = FALSE WHERE id = :id", {
        id,
      });
      await connection.commit();
      return;
    }

    const [rows] = await connection.execute<ExistingOptionRow[]>(
      "SELECT name FROM content_categories WHERE id = :id AND scope = :scope LIMIT 1",
      { id, scope },
    );
    const current = rows[0];

    if (current) {
      await connection.execute(
        `UPDATE ${tableForScope(scope)}
         SET category = NULL
         WHERE category = :name`,
        { name: current.name },
      );
    }

    await connection.execute(
      "UPDATE content_categories SET is_active = FALSE WHERE id = :id AND scope = :scope",
      { id, scope },
    );

    await connection.commit();
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
}
