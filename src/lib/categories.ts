import type { ResultSetHeader, RowDataPacket } from "mysql2/promise";
import { getMysqlPool } from "./mysql";

export type CategoryScope = "teaching_methods" | "class_programs" | "curriculum_tracks" | "posts";

export type CategoryOption = {
  id: number;
  slug: string;
  name: string;
  nameEn: string;
  scope: CategoryScope;
};

type CategoryRow = RowDataPacket & CategoryOption;
type ColumnRow = RowDataPacket & { column_exists: number };
type ExistingCategoryRow = RowDataPacket & {
  scope: Exclude<CategoryScope, "posts">;
  name: string;
  name_en: string | null;
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
  name_en: string | null;
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
      name_en VARCHAR(255) NULL,
      sort_order INT NOT NULL DEFAULT 0,
      is_active BOOLEAN NOT NULL DEFAULT TRUE,
      created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      PRIMARY KEY (id),
      UNIQUE KEY content_categories_scope_slug_unique (scope, slug)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  `);

  await pool.execute(`
    CREATE TABLE IF NOT EXISTS post_categories (
      id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
      slug VARCHAR(255) NOT NULL,
      name VARCHAR(255) NOT NULL,
      name_en VARCHAR(255) NULL,
      description TEXT NULL,
      sort_order INT NOT NULL DEFAULT 0,
      is_active BOOLEAN NOT NULL DEFAULT TRUE,
      created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      PRIMARY KEY (id),
      UNIQUE KEY post_categories_slug_unique (slug)
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

  const entityTables: Array<{ table: string; column: string; after: string }> = [
    { table: "curriculum_tracks", column: "category_en", after: "category" },
    { table: "teaching_methods", column: "category_en", after: "category" },
    { table: "class_programs", column: "category_en", after: "category" },
  ];

  for (const { table, column, after } of entityTables) {
    const [columnRows] = await pool.execute<ColumnRow[]>(
      `SELECT COUNT(*) AS column_exists
       FROM information_schema.COLUMNS
       WHERE TABLE_SCHEMA = DATABASE()
         AND TABLE_NAME = :table
         AND COLUMN_NAME = :column`,
      { table, column },
    );
    if (!columnRows[0]?.column_exists) {
      await pool.execute(`ALTER TABLE ${table} ADD COLUMN ${column} VARCHAR(255) NULL AFTER ${after}`);
    }
  }
}

function ensureCategoryLanguageColumns(table: "content_categories" | "post_categories") {
  const pool = getMysqlPool();

  return Promise.all(
    ["name", "name_en"].map((column) =>
      pool
        .execute<ColumnRow[]>(
          `SELECT COUNT(*) AS column_exists
           FROM information_schema.COLUMNS
           WHERE TABLE_SCHEMA = DATABASE()
             AND TABLE_NAME = :table
             AND COLUMN_NAME = :column`,
          { table, column },
        )
        .then(([rows]) => {
          if (!rows[0]?.column_exists) {
            return pool.execute(`ALTER TABLE ${table} ADD COLUMN ${column} VARCHAR(255) NULL`);
          }
        }),
    ),
  );
}

async function seedContentCategories() {
  const pool = getMysqlPool();
  const [existingRows] = await pool.execute<ExistingCategoryRow[]>(`
    SELECT 'class_programs' AS scope, TRIM(category) AS name, TRIM(category_en) AS name_en
    FROM class_programs
    WHERE category IS NOT NULL AND TRIM(category) <> ''
    UNION
    SELECT 'teaching_methods' AS scope, TRIM(category) AS name, TRIM(category_en) AS name_en
    FROM teaching_methods
    WHERE category IS NOT NULL AND TRIM(category) <> ''
    UNION
    SELECT 'curriculum_tracks' AS scope, TRIM(category) AS name, TRIM(category_en) AS name_en
    FROM curriculum_tracks
    WHERE category IS NOT NULL AND TRIM(category) <> ''
  `);

  for (const row of existingRows) {
    const slug = slugify(row.name);
    if (!slug) continue;

    await pool.execute(
      `INSERT INTO content_categories (scope, slug, name, name_en, sort_order)
       VALUES (:scope, :slug, :name, :nameEn, 10)
       ON DUPLICATE KEY UPDATE name = VALUES(name), name_en = COALESCE(VALUES(name_en), name_en), is_active = TRUE`,
      { scope: row.scope, slug, name: row.name, nameEn: row.name_en || null },
    );
  }

  await pool.execute(`
    INSERT IGNORE INTO content_categories (scope, slug, name, name_en, sort_order) VALUES
      ('curriculum_tracks', 'tieu-chuan', 'Tiêu chuẩn', 'Standard', 10),
      ('curriculum_tracks', 'nang-cao', 'Nâng cao', 'Advanced', 20)
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
    `SELECT id, scope, slug, name, name_en
     FROM content_categories
     WHERE is_active = TRUE
     ORDER BY scope ASC, sort_order ASC, name ASC`,
  );

  const [postRows] = await pool.execute<CategoryRow[]>(
    `SELECT id, 'posts' AS scope, slug, name, name_en
     FROM post_categories
     WHERE is_active = TRUE
     ORDER BY sort_order ASC, name ASC`,
  );

  const mapRow = (row: CategoryRow): CategoryOption => ({
    id: row.id,
    slug: row.slug,
    name: row.name,
    nameEn: text(row.name_en) || row.name,
    scope: row.scope,
  });

  return {
    teachingMethods: contentRows.filter((row) => row.scope === "teaching_methods").map(mapRow),
    classPrograms: contentRows.filter((row) => row.scope === "class_programs").map(mapRow),
    curriculumTracks: contentRows.filter((row) => row.scope === "curriculum_tracks").map(mapRow),
    posts: postRows.map(mapRow),
  };
}

function text(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

export async function createCategory(input: { scope?: unknown; name?: unknown; nameEn?: unknown }) {
  const scope = assertScope(input.scope);
  const name = requiredCategoryName(input.name);
  const nameEn = typeof input.nameEn === "string" ? input.nameEn.trim() : "";
  const slug = slugify(name);

  if (!slug) {
    throw new Error("Tên danh mục không hợp lệ.");
  }

  await ensureCategoryStorage();
  await ensureCategoryLanguageColumns(contentTableForScope(scope));
  const pool = getMysqlPool();

  if (scope === "posts") {
    const [result] = await pool.execute<ResultSetHeader>(
      `INSERT INTO post_categories (slug, name, name_en, sort_order, is_active)
       VALUES (:slug, :name, :nameEn, 0, TRUE)
       ON DUPLICATE KEY UPDATE name = VALUES(name), name_en = VALUES(name_en), is_active = TRUE`,
      { slug, name, nameEn: nameEn || null },
    );

    return { id: result.insertId, slug, name, nameEn: nameEn || name, scope };
  }

  const [result] = await pool.execute<ResultSetHeader>(
    `INSERT INTO content_categories (scope, slug, name, name_en, sort_order, is_active)
     VALUES (:scope, :slug, :name, :nameEn, 0, TRUE)
     ON DUPLICATE KEY UPDATE name = VALUES(name), name_en = VALUES(name_en), is_active = TRUE`,
    { scope, slug, name, nameEn: nameEn || null },
  );

  return { id: result.insertId, slug, name, nameEn: nameEn || name, scope };
}

function contentTableForScope(scope: CategoryScope): "content_categories" | "post_categories" {
  return scope === "posts" ? "post_categories" : "content_categories";
}

export async function updateCategory(
  idValue: unknown,
  input: { scope?: unknown; name?: unknown; nameEn?: unknown },
) {
  const id = positiveId(idValue);
  const scope = assertScope(input.scope);
  const name = requiredCategoryName(input.name);
  const nameEn = typeof input.nameEn === "string" ? input.nameEn.trim() : "";
  const slug = slugify(name);

  if (!slug) {
    throw new Error("Tên danh mục không hợp lệ.");
  }

  await ensureCategoryStorage();
  await ensureCategoryLanguageColumns(contentTableForScope(scope));
  const pool = getMysqlPool();
  const connection = await pool.getConnection();

  try {
    await connection.beginTransaction();

    const [rows] = await connection.execute<ExistingOptionRow[]>(
      `SELECT id, slug, name, name_en
       FROM ${contentTableForScope(scope)}
       WHERE id = :id ${scope === "posts" ? "" : "AND scope = :scope"} LIMIT 1`,
      { id, scope },
    );
    const current = rows[0];
    if (!current) throw new Error("Không tìm thấy danh mục.");

    await connection.execute(
      `UPDATE ${contentTableForScope(scope)}
       SET slug = :slug, name = :name, name_en = :nameEn, is_active = TRUE
       WHERE id = :id ${scope === "posts" ? "" : "AND scope = :scope"}`,
      { id, scope, slug, name, nameEn: nameEn || null },
    );

    if (scope !== "posts") {
      await connection.execute(
        `UPDATE ${tableForScope(scope)}
         SET category = :name, category_en = :nameEn
         WHERE category = :oldName`,
        { name, nameEn: nameEn || name, oldName: current.name },
      );
    }

    await connection.commit();
    return { id, slug, name, nameEn: nameEn || name, scope };
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
         SET category = NULL, category_en = NULL
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
