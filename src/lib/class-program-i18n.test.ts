import assert from "node:assert/strict";
import test from "node:test";
import {
  localizeClassProgramName,
  localizeClassProgramAge,
  getProgramOptionLabel,
  localizeClassProgram,
} from "./class-program-i18n.ts";

test("uses English name and age from DB when lang is 'en'", () => {
  assert.equal(
    localizeClassProgramName(
      { name: "LỚP TOKYO", nameEn: "TOKYO CLASS" },
      "en",
    ),
    "TOKYO CLASS",
  );
  assert.equal(
    localizeClassProgramAge(
      { age: "1 - 2 tuổi", ageEn: "1 - 2 years old" },
      "en",
    ),
    "1 - 2 years old",
  );
});

test("getProgramOptionLabel formats class option label in English when lang is 'en'", () => {
  assert.equal(
    getProgramOptionLabel(
      {
        label: "Trường mầm non (2 – 3 tuổi)",
        labelEn: "Preschool (2 - 3 years old)",
      },
      "en",
    ),
    "Preschool (2 - 3 years old)",
  );

  assert.equal(
    getProgramOptionLabel(
      {
        name: "Trường mầm non",
        nameEn: "Preschool",
        age: "2 – 3 tuổi",
        ageEn: "2 - 3 years old",
      },
      "en",
    ),
    "Preschool (2 - 3 years old)",
  );
});

test("getProgramOptionLabel retains Vietnamese option label when lang is 'vi'", () => {
  assert.equal(
    getProgramOptionLabel(
      {
        label: "Trường mầm non (2 – 3 tuổi)",
        labelEn: "Preschool (2 - 3 years old)",
      },
      "vi",
    ),
    "Trường mầm non (2 – 3 tuổi)",
  );
});

test("falls back to Vietnamese name and age when English fields from DB are empty", () => {
  assert.equal(
    localizeClassProgramName(
      { name: "LỚP TOKYO", nameEn: "" },
      "en",
    ),
    "LỚP TOKYO",
  );
  assert.equal(
    localizeClassProgramAge(
      { age: "1 - 2 tuổi", ageEn: null },
      "en",
    ),
    "1 - 2 tuổi",
  );
  assert.equal(
    getProgramOptionLabel(
      {
        label: "Lớp Tokyo (1 - 2 tuổi)",
        labelEn: null,
      },
      "en",
    ),
    "Lớp Tokyo (1 - 2 tuổi)",
  );
});

test("retains Vietnamese strings when lang is 'vi'", () => {
  assert.equal(
    localizeClassProgramName(
      { name: "LỚP TOKYO", nameEn: "TOKYO CLASS" },
      "vi",
    ),
    "LỚP TOKYO",
  );
  assert.equal(
    localizeClassProgramAge(
      { age: "1 - 2 tuổi", ageEn: "1 - 2 years old" },
      "vi",
    ),
    "1 - 2 tuổi",
  );
});

test("localizeClassProgram helper returns all localized fields from DB", () => {
  const result = localizeClassProgram(
    {
      name: "LỚP TOKYO",
      nameEn: "TOKYO CLASS",
      age: "1 - 2 tuổi",
      ageEn: "1 - 2 years old",
    },
    "en",
  );

  assert.equal(result.displayName, "TOKYO CLASS");
  assert.equal(result.displayAge, "1 - 2 years old");
  assert.equal(result.displayLabel, "TOKYO CLASS (1 - 2 years old)");
});
