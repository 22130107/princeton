import assert from "node:assert/strict";
import test from "node:test";
import { filterCurriculumTracksByCategory } from "./curriculum-filter.ts";

test("filters curriculum tracks by the selected category", () => {
  const tracks = [
    { category: "Tại lớp", title: "Góc khám phá" },
    { category: "Ngoại khoá", title: "Ngày hội thể thao" },
  ];

  assert.deepEqual(filterCurriculumTracksByCategory(tracks, "Tại lớp"), [tracks[0]]);
});

test("keeps every curriculum track when no category is selected", () => {
  const tracks = [
    { category: "Tại lớp", title: "Góc khám phá" },
    { category: "Ngoại khoá", title: "Ngày hội thể thao" },
  ];

  assert.deepEqual(filterCurriculumTracksByCategory(tracks, undefined), tracks);
});

test("preserves order of tracks (e.g. newest first) when filtering", () => {
  const tracks = [
    { id: 3, category: "Tại lớp", title: "Bài viết mới nhất" },
    { id: 2, category: "Tại lớp", title: "Bài viết trước đó" },
    { id: 1, category: "Ngoại khoá", title: "Bài viết cũ hơn" },
  ];

  const filtered = filterCurriculumTracksByCategory(tracks, "Tại lớp");
  assert.deepEqual(filtered.map((t) => t.id), [3, 2]);
});
