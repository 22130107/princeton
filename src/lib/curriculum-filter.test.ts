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
