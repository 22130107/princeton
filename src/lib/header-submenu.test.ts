import assert from "node:assert/strict";
import test from "node:test";

test("uses English submenu text when the active language is English", async () => {
  const module = await import("./header-submenu.ts").catch(() => null);

  assert.ok(module, "Header submenu localization is not implemented");
  assert.deepEqual(
    module.localizeSubmenuLink(
      {
        href: "/chuong-trinh-hoc/tokyo",
        label: "LỚP TOKYO",
        labelEn: "TOKYO CLASS",
        description: "1 - 2 tuổi",
        descriptionEn: "1 - 2 years old",
      },
      "en",
    ),
    {
      href: "/chuong-trinh-hoc/tokyo",
      label: "TOKYO CLASS",
      description: "1 - 2 years old",
    },
  );
});
