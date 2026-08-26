const partnerGradeSlugs = new Set([
  "partner-franchise",
  "partner-admissions",
  "partner-media",
  "partner-vendor",
]);

export function normalizeGradeToSlug(grade: string) {
  const normalized = grade.trim().toLowerCase();
  return /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(normalized) ? normalized : null;
}

export function isPartnerGradeSlug(gradeSlug: string) {
  return partnerGradeSlugs.has(gradeSlug);
}
