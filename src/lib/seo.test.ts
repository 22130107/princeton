import assert from "node:assert/strict";
import test from "node:test";
import {
  SITE_NAME,
  SITE_URL,
  buildMetadata,
  buildSitemapEntries,
  createArticleJsonLd,
  createBreadcrumbJsonLd,
  createOrganizationJsonLd,
} from "./seo.ts";

test("buildMetadata emits an absolute canonical and share image", () => {
  const metadata = buildMetadata({
    title: "Chương trình học",
    description: "Khám phá chương trình mầm non tại Princeton Academy.",
    path: "/chuong-trinh-hoc",
    image: "/favicon.png",
  });

  assert.equal(metadata.alternates?.canonical, `${SITE_URL}/chuong-trinh-hoc`);
  assert.equal(metadata.openGraph?.url, `${SITE_URL}/chuong-trinh-hoc`);
  assert.deepEqual(metadata.openGraph?.images, [
    {
      url: `${SITE_URL}/favicon.png`,
      alt: SITE_NAME,
    },
  ]);
  assert.equal((metadata.twitter as { card?: string })?.card, "summary_large_image");
});

test("buildMetadata normalizes duplicate slashes and trims search snippets", () => {
  const metadata = buildMetadata({
    title: "  Tin tức Princeton  ",
    description: `  ${"Nội dung ".repeat(30)}  `,
    path: "//tin-tuc-su-kien//",
  });

  assert.equal(metadata.title, "Tin tức Princeton");
  assert.equal(metadata.alternates?.canonical, `${SITE_URL}/tin-tuc-su-kien`);
  assert.ok(String(metadata.description).length <= 160);
  assert.doesNotMatch(String(metadata.description), /\s$/);
});

test("organization schema identifies Princeton and every campus", () => {
  const schema = createOrganizationJsonLd();

  assert.equal(schema["@type"], "EducationalOrganization");
  assert.equal(schema.url, SITE_URL);
  assert.equal(schema.name, SITE_NAME);
  assert.equal(schema.location.length, 7);
  assert.match(schema.location[0].address.streetAddress, /Triệu Việt Vương/);
});

test("breadcrumb schema uses canonical absolute URLs", () => {
  const schema = createBreadcrumbJsonLd([
    { name: "Trang chủ", path: "/" },
    { name: "Tin tức & Sự kiện", path: "/tin-tuc-su-kien" },
    { name: "Ngày hội đọc sách", path: "/tin-tuc-su-kien/ngay-hoi-doc-sach" },
  ]);

  assert.equal(schema.itemListElement[0].position, 1);
  assert.equal(
    schema.itemListElement[2].item,
    `${SITE_URL}/tin-tuc-su-kien/ngay-hoi-doc-sach`,
  );
});

test("article schema includes publisher, canonical URL, and image", () => {
  const schema = createArticleJsonLd({
    title: "Ngày hội đọc sách",
    description: "Hoạt động đọc sách dành cho trẻ tại Princeton Academy.",
    path: "/tin-tuc-su-kien/ngay-hoi-doc-sach",
    image: "/uploads/ngay-hoi-doc-sach.jpg",
  });

  assert.equal(schema.mainEntityOfPage, `${SITE_URL}/tin-tuc-su-kien/ngay-hoi-doc-sach`);
  assert.deepEqual(schema.image, [`${SITE_URL}/uploads/ngay-hoi-doc-sach.jpg`]);
  assert.equal(schema.publisher.name, SITE_NAME);
});

test("sitemap builder deduplicates canonical public URLs", () => {
  const entries = buildSitemapEntries([
    "/",
    "/chuong-trinh-hoc",
    "//chuong-trinh-hoc/",
    "/chuong-trinh-hoc/penguin",
  ]);

  assert.deepEqual(
    entries.map((entry) => entry.url),
    [
      SITE_URL,
      `${SITE_URL}/chuong-trinh-hoc`,
      `${SITE_URL}/chuong-trinh-hoc/penguin`,
    ],
  );
  assert.ok(entries.every((entry) => entry.changeFrequency === "weekly"));
});
