import type { Lang } from "@/lib/i18n";

type ClassProgramItemInput = {
  name?: string | null;
  nameEn?: string | null;
  age?: string | null;
  ageEn?: string | null;
  label?: string | null;
  labelEn?: string | null;
};

export function localizeClassProgramName(
  item: Pick<ClassProgramItemInput, "name" | "nameEn">,
  lang: Lang,
): string {
  if (lang === "en" && item.nameEn && item.nameEn.trim()) {
    return item.nameEn.trim();
  }
  return item.name || "";
}

export function localizeClassProgramAge(
  item: Pick<ClassProgramItemInput, "age" | "ageEn">,
  lang: Lang,
): string {
  if (lang === "en" && item.ageEn && item.ageEn.trim()) {
    return item.ageEn.trim();
  }
  return item.age || "";
}

export function getProgramOptionLabel(
  program: ClassProgramItemInput,
  lang: Lang,
): string {
  if (lang === "en") {
    if (program.labelEn && program.labelEn.trim()) {
      return program.labelEn.trim();
    }
    const name = program.nameEn?.trim() || program.name?.trim() || "";
    const age = program.ageEn?.trim() || program.age?.trim() || "";
    if (name && age) return `${name} (${age})`;
    return name || program.label || "";
  }

  if (program.label && program.label.trim()) {
    return program.label.trim();
  }
  const name = program.name?.trim() || "";
  const age = program.age?.trim() || "";
  if (name && age) return `${name} (${age})`;
  return name || "";
}

export function localizeClassProgram<T extends ClassProgramItemInput>(
  item: T,
  lang: Lang,
): T & { displayName: string; displayAge: string; displayLabel: string } {
  const displayName = localizeClassProgramName(item, lang);
  const displayAge = localizeClassProgramAge(item, lang);
  const displayLabel = getProgramOptionLabel(item, lang);

  return {
    ...item,
    displayName,
    displayAge,
    displayLabel,
  };
}
