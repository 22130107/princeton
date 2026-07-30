import { repairMojibakeText } from "./text-encoding";

export type RegistrationSectionSettings = {
  isActive: boolean;
  title: string;
  submitLabel: string;
  consentText: string;
  countdownDays: string;
  countdownHours: string;
  countdownMinutes: string;
  countdownSeconds: string;
  countdownTargetAt: string;
  showCountdown: boolean;
  showPromoImage: boolean;
  showForm: boolean;
  backgroundColor: string;
  promoDesktopImageId: number | null;
  promoDesktopImageUrl: string;
  promoMobileImageId: number | null;
  promoMobileImageUrl: string;
};

export const defaultRegistrationSectionSettings: RegistrationSectionSettings = {
  isActive: true,
  title: "ĐĂNG KÝ NHẬN ƯU ĐÃI NGAY",
  submitLabel: "Đăng ký ngay",
  consentText:
    "Tôi xác nhận rằng các thông tin cá nhân được cung cấp là chính xác và đồng ý để Nhà trường thu thập, lưu trữ, xử lý và sử dụng theo quy định của pháp luật về bảo vệ dữ liệu cá nhân.",
  countdownDays: "04",
  countdownHours: "12",
  countdownMinutes: "05",
  countdownSeconds: "09",
  countdownTargetAt: "",
  showCountdown: true,
  showPromoImage: true,
  showForm: true,
  backgroundColor: "#b80000",
  promoDesktopImageId: null,
  promoDesktopImageUrl: "",
  promoMobileImageId: null,
  promoMobileImageUrl: "",
};

function optionalBoolean(value: unknown, fallback: boolean) {
  return typeof value === "boolean" ? value : fallback;
}

function repairKnownMojibake(value: string) {
  const replacements: Record<string, string> = {
    "ÄÄ‚NG KÃ NHáº¬N Æ¯U ÄÃƒI NGAY": defaultRegistrationSectionSettings.title,
    "ÄÄƒng kÃ½ ngay": defaultRegistrationSectionSettings.submitLabel,
    "Đăng Ký Nhận Ưu Đãi": defaultRegistrationSectionSettings.title,
    "ĐĂNG KÝ NHẬN ƯU ĐÃI": defaultRegistrationSectionSettings.title,
    "TÃ´i xÃ¡c nháº­n ráº±ng cÃ¡c thÃ´ng tin cÃ¡ nhÃ¢n Ä‘Æ°á»£c cung cáº¥p lÃ  chÃ­nh xÃ¡c vÃ  Ä‘á»“ng Ã½ Ä‘á»ƒ NhÃ  trÆ°á»ng thu tháº­p, lÆ°u trá»¯, xá»­ lÃ½ vÃ  sá»­ dá»¥ng theo quy Ä‘á»‹nh cá»§a phÃ¡p luáº­t vá» báº£o vá»‡ dá»¯ liá»‡u cÃ¡ nhÃ¢n.":
      defaultRegistrationSectionSettings.consentText,
  };

  return replacements[value] ?? value;
}

function optionalText(value: unknown, fallback: string) {
  return typeof value === "string" && value.trim()
    ? repairKnownMojibake(repairMojibakeText(value))
    : fallback;
}

function optionalNumber(value: unknown) {
  return typeof value === "number" && Number.isFinite(value) ? value : null;
}

function twoDigitText(value: unknown, fallback: string) {
  const raw = typeof value === "string" || typeof value === "number" ? String(value) : fallback;
  const numeric = Number.parseInt(raw, 10);

  if (!Number.isFinite(numeric) || numeric < 0) return fallback;

  return String(Math.min(numeric, 99)).padStart(2, "0");
}

function optionalDateTime(value: unknown) {
  if (typeof value !== "string") return "";
  const raw = value.trim();
  if (!raw) return "";

  const timestamp = Date.parse(raw);
  return Number.isFinite(timestamp) ? raw : "";
}

function optionalColor(value: unknown, fallback: string) {
  if (typeof value !== "string") return fallback;
  const raw = value.trim();

  return /^#[0-9a-fA-F]{6}$/.test(raw) ? raw.toLowerCase() : fallback;
}

export function normalizeRegistrationSectionSettings(
  input: Partial<RegistrationSectionSettings> | Record<string, unknown> | null | undefined,
): RegistrationSectionSettings {
  const source = input ?? {};

  return {
    isActive: optionalBoolean(source.isActive, defaultRegistrationSectionSettings.isActive),
    title: optionalText(source.title, defaultRegistrationSectionSettings.title),
    submitLabel: optionalText(source.submitLabel, defaultRegistrationSectionSettings.submitLabel),
    consentText: optionalText(source.consentText, defaultRegistrationSectionSettings.consentText),
    countdownDays: twoDigitText(source.countdownDays, defaultRegistrationSectionSettings.countdownDays),
    countdownHours: twoDigitText(source.countdownHours, defaultRegistrationSectionSettings.countdownHours),
    countdownMinutes: twoDigitText(source.countdownMinutes, defaultRegistrationSectionSettings.countdownMinutes),
    countdownSeconds: twoDigitText(source.countdownSeconds, defaultRegistrationSectionSettings.countdownSeconds),
    countdownTargetAt: optionalDateTime(source.countdownTargetAt),
    showCountdown: optionalBoolean(source.showCountdown, defaultRegistrationSectionSettings.showCountdown),
    showPromoImage: optionalBoolean(source.showPromoImage, defaultRegistrationSectionSettings.showPromoImage),
    showForm: optionalBoolean(source.showForm, defaultRegistrationSectionSettings.showForm),
    backgroundColor: optionalColor(source.backgroundColor, defaultRegistrationSectionSettings.backgroundColor),
    promoDesktopImageId: optionalNumber(source.promoDesktopImageId),
    promoDesktopImageUrl: optionalText(source.promoDesktopImageUrl, ""),
    promoMobileImageId: optionalNumber(source.promoMobileImageId),
    promoMobileImageUrl: optionalText(source.promoMobileImageUrl, ""),
  };
}
