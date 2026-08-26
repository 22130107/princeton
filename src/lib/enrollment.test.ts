import assert from "node:assert/strict";
import test from "node:test";
import { isPartnerGradeSlug, normalizeGradeToSlug } from "./enrollment-grade.ts";

test("accepts a valid class-program slug supplied by the database", () => {
  assert.equal(normalizeGradeToSlug("sydney"), "sydney");
});

test("rejects a malformed class-program slug", () => {
  assert.equal(normalizeGradeToSlug("<script>"), null);
});

test("does not treat an unsupported partner slug as an allowed partner option", () => {
  assert.equal(isPartnerGradeSlug("partner-unknown"), false);
});
