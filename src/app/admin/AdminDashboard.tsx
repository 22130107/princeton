"use client";

import { FormEvent, type ClipboardEvent, type KeyboardEvent, type MouseEvent, type PointerEvent, type ReactNode, useEffect, useMemo, useRef, useState } from "react";
import { CalendarClock, CheckCircle2, Edit3, Eye, EyeOff, ImagePlus, List, ListOrdered, Maximize2, Minimize2, Plus, RefreshCw, Save, Trash2, Video, X } from "lucide-react";
import { Extension, Node, mergeAttributes } from "@tiptap/core";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Color from "@tiptap/extension-color";
import FontFamily from "@tiptap/extension-font-family";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import TextAlign from "@tiptap/extension-text-align";
import { TextStyle } from "@tiptap/extension-text-style";
import Underline from "@tiptap/extension-underline";
import {
  defaultRegistrationSectionSettings,
  type RegistrationSectionSettings,
} from "@/lib/registration-section-config";

type TabKey = "banners" | "registration" | "schedules" | "teaching" | "programs" | "posts" | "about";
type ProgramMode = "classes" | "curriculum";
type AboutMode = "facilities" | "teachers" | "testimonials";
type CategoryScope = "teaching_methods" | "class_programs" | "curriculum_tracks" | "posts";

type CategoryOption = {
  id: number;
  slug: string;
  name: string;
  scope: CategoryScope;
};

type MediaAsset = {
  id: number;
  fileName: string;
  originalName: string;
  mimeType: string;
  url: string;
  alt: string;
  sizeBytes: number | null;
  folder: string;
  isUploaded: boolean;
  createdAt: string;
};

type HeroSlide = {
  id: number;
  title: string;
  subtitle: string;
  desktopImageId: number | null;
  desktopImageUrl: string;
  desktopImageAlt: string;
  mobileImageId: number | null;
  mobileImageUrl: string;
  mobileImageAlt: string;
  ctaLabel: string;
  ctaHref: string;
};

type ClassProgram = {
  id: number;
  slug: string;
  name: string;
  age: string;
  category: string;
  excerpt: string;
  description: string;
  imageId: number | null;
  imageUrl: string;
  color: string;
  schedule: string[];
};

type CurriculumTrack = {
  id: number;
  slug: string;
  title: string;
  category: string;
  description: string;
  imageId: number | null;
  imageUrl: string;
  logoMediaId: number | null;
  logoUrl: string;
  content: string[];
};

type TeachingMethod = {
  id: number;
  slug: string;
  title: string;
  category: string;
  description: string;
  excerpt: string;
  imageId: number | null;
  imageUrl: string;
  background: string;
  content: string[];
};

type Post = {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  categorySlug: string;
  category: string;
  postType?: "news" | "event" | "activity";
  coverImageId: number | null;
  imageUrl: string;
  content: string[];
};

type FacilityImage = {
  id: number;
  title: string;
  description: string;
  imageId: number | null;
  imageUrl: string;
  imageAlt: string;
};

type TeacherTeamItem = {
  id: number;
  title: string;
  description: string;
  imageId: number | null;
  imageUrl: string;
  imageAlt: string;
  color: string;
  shape: string;
  rotate: string;
};

type Testimonial = {
  id: number;
  parentName: string;
  studentName: string;
  avatarId: number | null;
  avatarUrl: string;
  avatarAlt: string;
  quote: string;
  rating: number | null;
  reactionImageId: number | null;
  reactionImageUrl: string;
  reactionImageAlt: string;
};

type RegistrationScheduleStatus = "new" | "confirmed" | "completed" | "cancelled" | "no_show";

type RegistrationSchedule = {
  id: number;
  leadId: number;
  parentName: string;
  phone: string;
  email: string;
  grade: string;
  classProgramName: string;
  requestedAt: string | null;
  status: RegistrationScheduleStatus;
  sourcePage: string;
  sourceDevice: string;
  emailStatus: string;
  emailSentAt: string | null;
  emailError: string;
  internalNote: string;
  createdAt: string;
  updatedAt: string;
};

type LoadState = {
  banners: HeroSlide[];
  classes: ClassProgram[];
  curriculum: CurriculumTrack[];
  teaching: TeachingMethod[];
  posts: Post[];
  facilities: FacilityImage[];
  teachers: TeacherTeamItem[];
  testimonials: Testimonial[];
  schedules: RegistrationSchedule[];
};

type CategoryState = {
  teachingMethods: CategoryOption[];
  classPrograms: CategoryOption[];
  curriculumTracks: CategoryOption[];
  posts: CategoryOption[];
};

type ClassForm = {
  slug: string;
  name: string;
  ageLabel: string;
  category: string;
  excerpt: string;
  description: string;
  imageId: number | null;
  imageUrl: string;
  colorHex: string;
  scheduleText: string;
};

type BannerForm = {
  title: string;
  subtitle: string;
  desktopImageId: number | null;
  desktopImageUrl: string;
  mobileImageId: number | null;
  mobileImageUrl: string;
  ctaLabel: string;
  ctaHref: string;
};

type CurriculumForm = {
  slug: string;
  title: string;
  category: string;
  description: string;
  imageId: number | null;
  imageUrl: string;
  contentText: string;
};

type TeachingForm = {
  slug: string;
  title: string;
  category: string;
  description: string;
  excerpt: string;
  imageId: number | null;
  imageUrl: string;
  backgroundHex: string;
  contentText: string;
};

type PostType = "news" | "event" | "activity";

type PostForm = {
  slug: string;
  title: string;
  excerpt: string;
  categorySlug: string;
  categoryName: string;
  coverImageId: number | null;
  imageUrl: string;
  postType: PostType;
  status: "published";
  contentText: string;
};

type FacilityForm = {
  title: string;
  description: string;
  imageId: number | null;
  imageUrl: string;
};

type TeacherForm = {
  title: string;
  description: string;
  imageId: number | null;
  imageUrl: string;
  colorHex: string;
  shapeClass: string;
  rotateClass: string;
};

type TestimonialForm = {
  parentName: string;
  studentName: string;
  avatarId: number | null;
  avatarUrl: string;
  quote: string;
  rating: string;
  reactionImageId: number | null;
  reactionImageUrl: string;
};

type RegistrationScheduleForm = {
  requestedAt: string;
  status: RegistrationScheduleStatus;
  internalNote: string;
};

type RegistrationSectionForm = RegistrationSectionSettings;

const emptyClass: ClassForm = {
  slug: "",
  name: "",
  ageLabel: "",
  category: "",
  excerpt: "",
  description: "",
  imageId: null,
  imageUrl: "",
  colorHex: "#fffefa",
  scheduleText: "",
};

const emptyBanner: BannerForm = {
  title: "",
  subtitle: "",
  desktopImageId: null,
  desktopImageUrl: "",
  mobileImageId: null,
  mobileImageUrl: "",
  ctaLabel: "",
  ctaHref: "",
};

const emptyCurriculum: CurriculumForm = {
  slug: "",
  title: "",
  category: "",
  description: "",
  imageId: null,
  imageUrl: "",
  contentText: "",
};

const emptyCategories: CategoryState = {
  teachingMethods: [],
  classPrograms: [],
  curriculumTracks: [],
  posts: [],
};

const emptyTeaching: TeachingForm = {
  slug: "",
  title: "",
  category: "",
  description: "",
  excerpt: "",
  imageId: null,
  imageUrl: "",
  backgroundHex: "#fffefa",
  contentText: "",
};

const emptyPost: PostForm = {
  slug: "",
  title: "",
  excerpt: "",
  categorySlug: "",
  categoryName: "",
  coverImageId: null,
  imageUrl: "",
  postType: "news",
  status: "published",
  contentText: "",
};

const emptyFacility: FacilityForm = {
  title: "",
  description: "",
  imageId: null,
  imageUrl: "",
};

const emptyTeacher: TeacherForm = {
  title: "",
  description: "",
  imageId: null,
  imageUrl: "",
  colorHex: "#fffefa",
  shapeClass: "rounded-[42px]",
  rotateClass: "",
};

const emptyTestimonial: TestimonialForm = {
  parentName: "",
  studentName: "",
  avatarId: null,
  avatarUrl: "",
  quote: "",
  rating: "5",
  reactionImageId: null,
  reactionImageUrl: "",
};

const emptySchedule: RegistrationScheduleForm = {
  requestedAt: "",
  status: "new",
  internalNote: "",
};

const emptyRegistrationSection: RegistrationSectionForm = {
  ...defaultRegistrationSectionSettings,
};

function lines(value: string) {
  return value
    .split("\n")
    .map((item) => item.trim())
    .filter(Boolean);
}

function richBlocks(value: string) {
  const next = value.trim();
  if (!next) return [];

  const hasMedia = /<(img|iframe)\b/i.test(next);
  const text = next
    .replace(/<br\s*\/?>/gi, " ")
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  return text || hasMedia ? [next] : [];
}

const scheduleActivitySeparator = "\n<!-- schedule-activity -->\n";

function scheduleItemsToText(items: string[]) {
  return items.map((item) => item.trim()).filter(Boolean).join(scheduleActivitySeparator);
}

function scheduleTextToItems(value: string) {
  if (value.includes(scheduleActivitySeparator.trim())) {
    return value
      .split(scheduleActivitySeparator)
      .map((item) => item.trim())
      .filter(Boolean);
  }

  return lines(value);
}

function slugify(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function syncAutoSlug(currentSlug: string, previousValue: string, nextValue: string) {
  const previousAutoSlug = slugify(previousValue);

  if (!currentSlug || currentSlug === previousAutoSlug) {
    return slugify(nextValue);
  }

  return currentSlug;
}

function formatDateTime(value: string | null | undefined) {
  if (!value) return "Chờ xếp lịch";

  try {
    return new Intl.DateTimeFormat("vi-VN", {
      dateStyle: "medium",
      timeStyle: "short",
      timeZone: "Asia/Ho_Chi_Minh",
    }).format(new Date(value));
  } catch {
    return value;
  }
}

function toDateTimeLocal(value: string | null | undefined) {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";

  const offsetMs = date.getTimezoneOffset() * 60 * 1000;
  return new Date(date.getTime() - offsetMs).toISOString().slice(0, 16);
}

function scheduleStatusLabel(status: RegistrationScheduleStatus) {
  const labels: Record<RegistrationScheduleStatus, string> = {
    new: "Mới",
    confirmed: "Đã xác nhận",
    completed: "Đã hoàn tất",
    cancelled: "Đã huỷ",
    no_show: "Không đến",
  };

  return labels[status] ?? status;
}

async function requestJson<T>(url: string, init?: RequestInit): Promise<T> {
  const response = await fetch(url, init);
  const data = await response.json();

  if (!response.ok || data.ok === false) {
    throw new Error(data.message ?? "Yêu cầu không thành công.");
  }

  return data as T;
}

async function uploadMedia(file: File, alt: string) {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("alt", alt);

  return requestJson<{ asset: { id: number; url: string; alt: string } }>("/api/media", {
    method: "POST",
    body: formData,
  });
}

async function fetchMediaLibrary() {
  return requestJson<{ assets: MediaAsset[] }>("/api/media");
}

async function deleteUploadedMedia(target: { id?: number | null; url?: string }) {
  return requestJson<{ ok: true }>("/api/media", {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(target),
  });
}

function getUploadedMediaUrl(value: string | null | undefined) {
  if (!value) return "";

  try {
    const pathname = value.startsWith("http://") || value.startsWith("https://") ? new URL(value).pathname : value;
    return /^\/uploads\/[a-zA-Z0-9._-]+$/.test(pathname) ? pathname : "";
  } catch {
    return "";
  }
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
}) {
  return (
    <label className="grid gap-1.5">
      <span className="text-[13px] font-bold uppercase text-[#620000]">{label}</span>
      <input
        type={type}
        value={value ?? ""}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="h-11 rounded-md border border-[#e1b0b0] bg-white px-3 text-[15px] text-[#620000] outline-none focus:border-[#b80000]"
      />
    </label>
  );
}

function ToggleField({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (value: boolean) => void;
}) {
  return (
    <label className="flex h-11 items-center justify-between gap-3 rounded-md border border-[#e1b0b0] bg-white px-3 text-[15px] font-bold text-[#620000]">
      <span>{label}</span>
      <input
        type="checkbox"
        checked={Boolean(checked)}
        onChange={(event) => onChange(event.target.checked)}
        className="size-5 accent-[#b80000]"
      />
    </label>
  );
}

function CategoryPicker({
  label,
  value,
  options,
  addValue,
  onChange,
  onAddValue,
  onAdd,
  onUpdate,
  onDelete,
  disabled,
}: {
  label: string;
  value: string;
  options: CategoryOption[];
  addValue: string;
  onChange: (option: CategoryOption | null) => void;
  onAddValue: (value: string) => void;
  onAdd: () => void;
  onUpdate: () => void;
  onDelete: () => void;
  disabled?: boolean;
}) {
  const selectedOption = options.find((option) => option.slug === value) ?? null;

  return (
    <div className="grid gap-1.5">
      <span className="text-[13px] font-bold uppercase text-[#620000]">{label}</span>
      <div className="grid gap-2 sm:grid-cols-[1fr_220px_auto_auto_auto]">
        <select
          value={value ?? ""}
          onChange={(event) => {
            const selected = options.find((option) => option.slug === event.target.value) ?? null;
            onChange(selected);
            onAddValue(selected?.name ?? "");
          }}
          className="h-11 rounded-md border border-[#e1b0b0] bg-white px-3 text-[15px] text-[#620000] outline-none focus:border-[#b80000]"
        >
          <option value="">Chọn danh mục</option>
          {options.map((option) => (
            <option key={`${option.scope}-${option.slug}`} value={option.slug}>
              {option.name}
            </option>
          ))}
        </select>
        <input
          type="text"
          value={addValue ?? ""}
          onChange={(event) => onAddValue(event.target.value)}
          placeholder="Thêm danh mục"
          className="h-11 rounded-md border border-[#e1b0b0] bg-white px-3 text-[15px] text-[#620000] outline-none focus:border-[#b80000]"
        />
        <button
          type="button"
          onClick={onAdd}
          disabled={disabled}
          className="inline-flex h-11 items-center justify-center rounded-md border border-[#d9baba] bg-white px-4 text-[15px] font-extrabold text-[#620000] transition-colors hover:bg-[#fff1f1] disabled:cursor-wait disabled:opacity-60"
        >
          {disabled ? "Đang thêm" : "Thêm"}
        </button>
        <button
          type="button"
          onClick={onUpdate}
          disabled={disabled || !selectedOption}
          className="inline-flex h-11 items-center justify-center rounded-md border border-[#d9baba] bg-white px-4 text-[15px] font-extrabold text-[#620000] transition-colors hover:bg-[#fff1f1] disabled:cursor-not-allowed disabled:opacity-50"
        >
          Sửa
        </button>
        <button
          type="button"
          onClick={onDelete}
          disabled={disabled || !selectedOption}
          className="inline-flex h-11 items-center justify-center rounded-md border border-[#b80000] bg-white px-4 text-[15px] font-extrabold text-[#b80000] transition-colors hover:bg-[#fff1f1] disabled:cursor-not-allowed disabled:opacity-50"
        >
          Xoá
        </button>
      </div>
    </div>
  );
}

function TextArea({
  label,
  value,
  onChange,
  placeholder,
  rows = 4,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  rows?: number;
}) {
  return (
    <div className="grid gap-1.5">
      <span className="text-[13px] font-bold uppercase text-[#620000]">{label}</span>
      <textarea
        value={value ?? ""}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        rows={rows}
        className="resize-y rounded-md border border-[#e1b0b0] bg-white px-4 py-3 text-[15px] leading-7 text-[#620000] outline-none focus:border-[#b80000]"
      />
    </div>
  );
}

function ScheduleActivitiesEditor({
  label,
  value,
  onChange,
  onStatus,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  onStatus: (message: string) => void;
}) {
  const activities = useMemo(() => scheduleTextToItems(value), [value]);
  const [draft, setDraft] = useState("");
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editorResetKey, setEditorResetKey] = useState(0);
  const getDraftHtmlRef = useRef<(() => string) | null>(null);

  const isEditing = editingIndex !== null;

  function syncActivities(nextActivities: string[]) {
    onChange(scheduleItemsToText(nextActivities));
  }

  function resetEditor() {
    setDraft("");
    setEditingIndex(null);
    setEditorResetKey((key) => key + 1);
  }

  function addOrUpdateActivity() {
    const currentDraft = getDraftHtmlRef.current?.() ?? draft;
    const blocks = richBlocks(currentDraft);
    const nextBlock = blocks[0];
    if (!nextBlock) {
      onStatus("Vui lòng nhập nội dung hoạt động.");
      return;
    }

    if (isEditing && activities[editingIndex] !== undefined) {
      const nextActivities = [...activities];
      nextActivities[editingIndex] = nextBlock;
      syncActivities(nextActivities);
      resetEditor();
      return;
    }

    syncActivities([...activities, ...blocks]);
    resetEditor();
  }

  function editActivity(index: number) {
    setDraft(activities[index] ?? "");
    setEditingIndex(index);
    setEditorResetKey((key) => key + 1);
  }

  function deleteActivity(index: number) {
    syncActivities(activities.filter((_, itemIndex) => itemIndex !== index));
    if (editingIndex === index) resetEditor();
  }

  return (
    <div className="grid gap-2">
      <span className="text-[13px] font-bold uppercase text-[#620000]">{label}</span>
      <div className="grid gap-3 rounded-md border border-[#e1b0b0] bg-[#fffafa] p-3">
        <TiptapRichTextEditor
          key={editorResetKey}
          label={isEditing ? "Editor sửa hoạt động" : "Editor thêm hoạt động"}
          value={draft}
          onChange={setDraft}
          placeholder="Nhập nội dung hoạt động"
          onStatus={onStatus}
          getHtmlRef={getDraftHtmlRef}
        />
        <div className="flex flex-wrap gap-2">
          <ActionButton
            icon={isEditing ? <Save size={17} /> : <Plus size={17} />}
            tone="quiet"
            onClick={addOrUpdateActivity}
          >
            {isEditing ? "Cập nhật hoạt động" : "Thêm hoạt động"}
          </ActionButton>
          {isEditing ? (
            <ActionButton icon={<X size={17} />} tone="quiet" onClick={resetEditor}>
              Huỷ sửa
            </ActionButton>
          ) : null}
        </div>
      </div>

      <div className="grid gap-2">
        {activities.map((activity, index) => (
          <div
            key={`${activity}-${index}`}
            className="grid gap-2 rounded-md border border-[#f0d0d0] bg-white p-3 sm:grid-cols-[auto_1fr_auto]"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#fff1f1] text-[13px] font-extrabold text-[#b80000]">
              {index + 1}
            </span>
            {looksLikeHtml(activity) ? (
              <div
                className="rich-admin-content min-w-0 text-[15px] font-semibold leading-7 text-[#620000]"
                dangerouslySetInnerHTML={{ __html: activity }}
              />
            ) : (
              <p className="min-w-0 text-[15px] font-semibold leading-7 text-[#620000]">{activity}</p>
            )}
            <span className="flex gap-2">
              <button
                type="button"
                onClick={() => editActivity(index)}
                className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-[#d9baba] bg-white text-[#620000] hover:bg-[#fff1f1]"
                aria-label="Sửa hoạt động"
              >
                <Edit3 size={15} />
              </button>
              <button
                type="button"
                onClick={() => deleteActivity(index)}
                className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-[#b80000] bg-white text-[#b80000] hover:bg-[#fff1f1]"
                aria-label="Xoá hoạt động"
              >
                <Trash2 size={15} />
              </button>
            </span>
          </div>
        ))}
        {!activities.length ? (
          <p className="rounded-md border border-dashed border-[#e1b0b0] bg-white px-4 py-5 text-center text-[14px] font-semibold text-[#9a4a4a]">
            Chưa có hoạt động nào.
          </p>
        ) : null}
      </div>
    </div>
  );
}

function htmlEscape(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function looksLikeHtml(value: string) {
  return /<\/?[a-z][\s\S]*>/i.test(value);
}

function plainTextToHtml(value: string) {
  return value
    .split(/\n{2,}|\n/)
    .map((item) => item.trim())
    .filter(Boolean)
    .map((item) => `<p>${htmlEscape(item)}</p>`)
    .join("") || "<p><br></p>";
}

function pastedTextToHtml(value: string) {
  const normalized = value.replace(/\r\n?/g, "\n").trim();
  if (!normalized) return "";

  return normalized
    .split(/\n{2,}/)
    .map((block) =>
      block
        .split("\n")
        .map((line) => htmlEscape(line.trimEnd()))
        .join("<br>"),
    )
    .filter((block) => block.replace(/<br>/g, "").trim())
    .map((block) => `<p>${block}</p>`)
    .join("");
}

const MIN_RICH_LINE_HEIGHT = 1.1;
const MAX_RICH_LINE_HEIGHT = 2.4;
const DEFAULT_RICH_LINE_HEIGHT = 1.6;
const MIN_RICH_FONT_SIZE = 8;
const MAX_RICH_FONT_SIZE = 96;
const DEFAULT_RICH_FONT_SIZE = 16;
const DEFAULT_RICH_FONT_FAMILY = "system";
const DEFAULT_RICH_TEXT_COLOR = "#620000";
const RICH_FONT_OPTIONS = [
  { label: "Mặc định", value: "system", css: "" },
  { label: "Arial", value: "arial", css: "Arial, Helvetica, sans-serif" },
  { label: "Times", value: "times", css: "\"Times New Roman\", Times, serif" },
  { label: "Georgia", value: "georgia", css: "Georgia, serif" },
  { label: "Tahoma", value: "tahoma", css: "Tahoma, Geneva, sans-serif" },
  { label: "Verdana", value: "verdana", css: "Verdana, Geneva, sans-serif" },
];

function clampRichLineHeight(value: number) {
  if (!Number.isFinite(value)) return DEFAULT_RICH_LINE_HEIGHT;
  return Math.round(Math.max(MIN_RICH_LINE_HEIGHT, Math.min(MAX_RICH_LINE_HEIGHT, value)) * 10) / 10;
}

function getRichLineHeight(value: string) {
  const fromData = value.match(/data-rich-line-height=["']([\d.]+)["']/i)?.[1];
  const fromStyle = value.match(/line-height\s*:\s*([\d.]+)/i)?.[1];
  const parsed = Number.parseFloat(fromData || fromStyle || "");
  return Number.isFinite(parsed) ? clampRichLineHeight(parsed) : DEFAULT_RICH_LINE_HEIGHT;
}

function clampRichFontSize(value: number) {
  if (!Number.isFinite(value)) return DEFAULT_RICH_FONT_SIZE;
  return Math.round(Math.max(MIN_RICH_FONT_SIZE, Math.min(MAX_RICH_FONT_SIZE, value)));
}

function getRichFontSize(value: string) {
  const fromData = value.match(/data-rich-font-size=["']([\d.]+)["']/i)?.[1];
  const fromStyle = value.match(/font-size\s*:\s*([\d.]+)px/i)?.[1];
  const parsed = Number.parseFloat(fromData || fromStyle || "");
  return Number.isFinite(parsed) ? clampRichFontSize(parsed) : DEFAULT_RICH_FONT_SIZE;
}

function getRichFontFamily(value: string) {
  const fromData = value.match(/data-rich-font-family=["']([^"']+)["']/i)?.[1];
  if (RICH_FONT_OPTIONS.some((option) => option.value === fromData)) return fromData;

  const fromStyle = value.match(/font-family\s*:\s*([^;"]+)/i)?.[1]?.toLowerCase() ?? "";
  return RICH_FONT_OPTIONS.find((option) => option.css && fromStyle.includes(option.value))?.value ?? DEFAULT_RICH_FONT_FAMILY;
}

function getRichFontCss(value: string) {
  return RICH_FONT_OPTIONS.find((option) => option.value === value)?.css ?? "";
}

function normalizeRichColor(value: string) {
  const hex = value.trim().match(/^#([0-9a-f]{3}|[0-9a-f]{6})$/i)?.[0];
  if (hex) {
    if (hex.length === 4) {
      return `#${hex[1]}${hex[1]}${hex[2]}${hex[2]}${hex[3]}${hex[3]}`.toLowerCase();
    }

    return hex.toLowerCase();
  }

  const rgb = value.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)/i);
  if (!rgb) return DEFAULT_RICH_TEXT_COLOR;

  return `#${[rgb[1], rgb[2], rgb[3]]
    .map((channel) => Math.max(0, Math.min(255, Number(channel))).toString(16).padStart(2, "0"))
    .join("")}`;
}

function getRichTextColor(value: string) {
  const fromData = value.match(/data-rich-text-color=["']([^"']+)["']/i)?.[1];
  const fromStyle = value.match(/(?:^|;)\s*color\s*:\s*([^;"]+)/i)?.[1];
  return normalizeRichColor(fromData || fromStyle || DEFAULT_RICH_TEXT_COLOR);
}

const RICH_SELECTION_HIGHLIGHT = "rich-admin-saved-selection";

const RichFontSize = Extension.create({
  name: "richFontSize",
  addGlobalAttributes() {
    return [
      {
        types: ["textStyle"],
        attributes: {
          dataRichFontFamily: {
            default: null,
            parseHTML: (element) => element.getAttribute("data-rich-font-family"),
            renderHTML: (attributes) =>
              attributes.dataRichFontFamily ? { "data-rich-font-family": attributes.dataRichFontFamily } : {},
          },
          fontSize: {
            default: null,
            parseHTML: (element) => element.style.fontSize || null,
            renderHTML: (attributes) =>
              attributes.fontSize
                ? {
                    style: `font-size: ${attributes.fontSize}`,
                    "data-rich-font-size": String(Number.parseFloat(String(attributes.fontSize))),
                  }
                : {},
          },
        },
      },
    ];
  },
});

const RichLineHeight = Extension.create({
  name: "richLineHeight",
  addGlobalAttributes() {
    return [
      {
        types: ["paragraph", "heading", "listItem"],
        attributes: {
          lineHeight: {
            default: null,
            parseHTML: (element) =>
              element.getAttribute("data-rich-line-height") || element.style.lineHeight || null,
            renderHTML: (attributes) =>
              attributes.lineHeight
                ? {
                    style: `line-height: ${attributes.lineHeight}`,
                    "data-rich-line-height": String(attributes.lineHeight),
                  }
                : {},
          },
        },
      },
    ];
  },
});

const AdminImage = Image.extend({
  addAttributes() {
    return {
      src: { default: null },
      alt: { default: null },
      title: { default: null },
      style: {
        default: null,
        parseHTML: (element) => element.getAttribute("style"),
        renderHTML: (attributes) => (attributes.style ? { style: attributes.style } : {}),
      },
      draggable: {
        default: "false",
        parseHTML: (element) => element.getAttribute("draggable") || "false",
        renderHTML: (attributes) => ({ draggable: attributes.draggable || "false" }),
      },
    };
  },
});

const AdminIframe = Node.create({
  name: "iframe",
  group: "block",
  atom: true,
  draggable: true,
  selectable: true,
  addAttributes() {
    return {
      src: { default: null },
      title: { default: null },
      style: {
        default: null,
        parseHTML: (element) => element.getAttribute("style"),
      },
      allow: {
        default: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share",
      },
      allowfullscreen: { default: "true" },
      frameborder: { default: "0" },
    };
  },
  parseHTML() {
    return [{ tag: "iframe" }];
  },
  renderHTML({ HTMLAttributes }) {
    return ["iframe", mergeAttributes(HTMLAttributes)];
  },
});

function getRichSelectionHighlightSupport() {
  if (typeof window === "undefined" || typeof CSS === "undefined") return null;

  const css = CSS as unknown as {
    highlights?: {
      set: (name: string, highlight: unknown) => void;
      delete: (name: string) => void;
    };
  };
  const HighlightConstructor = (window as unknown as {
    Highlight?: new (...ranges: Range[]) => unknown;
  }).Highlight;

  return css.highlights && HighlightConstructor
    ? { highlights: css.highlights, HighlightConstructor }
    : null;
}

function normalizeVideoUrl(value: string) {
  const iframeSrc = value.match(/src=["']([^"']+)["']/i)?.[1];
  const raw = (iframeSrc || value).trim();

  try {
    const url = new URL(raw);
    if (url.hostname.includes("youtube.com")) {
      const id = url.searchParams.get("v");
      if (id) return `https://www.youtube.com/embed/${id}`;
    }
    if (url.hostname.includes("youtu.be")) {
      const id = url.pathname.replace("/", "");
      if (id) return `https://www.youtube.com/embed/${id}`;
    }
    if (url.hostname.includes("vimeo.com")) {
      const id = url.pathname.split("/").filter(Boolean).pop();
      if (id) return `https://player.vimeo.com/video/${id}`;
    }
    return raw;
  } catch {
    return raw;
  }
}

type RichMediaElement = HTMLImageElement | HTMLIFrameElement;
type MediaDragMode = "move" | "resize";

function isHtmlElement(value: unknown): value is HTMLElement {
  return typeof HTMLElement !== "undefined" && value instanceof HTMLElement;
}

function isImageElement(value: unknown): value is HTMLImageElement {
  return typeof HTMLImageElement !== "undefined" && value instanceof HTMLImageElement;
}

function isIframeElement(value: unknown): value is HTMLIFrameElement {
  return typeof HTMLIFrameElement !== "undefined" && value instanceof HTMLIFrameElement;
}

type MediaDragSession = {
  mode: MediaDragMode;
  media: RichMediaElement;
  captureTarget: Element;
  pointerId: number;
  startX: number;
  startY: number;
  startLeft: number;
  startTop: number;
  startWidth: number;
  minWidth: number;
  maxWidth: number;
  aspectRatio: number;
};

type MediaOverlayRect = {
  left: number;
  top: number;
  width: number;
  height: number;
};

function TiptapRichTextEditor({
  label,
  value,
  onChange,
  placeholder,
  onStatus,
  getHtmlRef,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  onStatus: (message: string) => void;
  getHtmlRef?: { current: (() => string) | null };
}) {
  const fileRef = useRef<HTMLInputElement>(null);
  const editorFrameRef = useRef<HTMLDivElement>(null);
  const selectedMediaRef = useRef<RichMediaElement | null>(null);
  const onChangeRef = useRef(onChange);
  const onStatusRef = useRef(onStatus);
  const [expanded, setExpanded] = useState(false);
  const [pickerOpen, setPickerOpen] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [selectedMedia, setSelectedMedia] = useState<RichMediaElement | null>(null);
  const [mediaOverlay, setMediaOverlay] = useState<MediaOverlayRect | null>(null);
  const [lineHeight, setLineHeight] = useState(() => getRichLineHeight(value));
  const [fontSize, setFontSize] = useState(() => getRichFontSize(value));
  const [fontSizeInput, setFontSizeInput] = useState(() => `${getRichFontSize(value)}`);
  const [fontFamily, setFontFamily] = useState(() => getRichFontFamily(value));
  const [textColor, setTextColor] = useState(() => getRichTextColor(value));

  const initialContent = useMemo(() => {
    const next = value.trim();
    if (!next) return "<p></p>";
    return looksLikeHtml(next) ? next : plainTextToHtml(next);
  }, []);

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        heading: { levels: [2, 3] },
      }),
      Underline,
      TextStyle,
      Color,
      FontFamily.configure({ types: ["textStyle"] }),
      Link.configure({ openOnClick: false }),
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      RichFontSize,
      RichLineHeight,
      AdminImage.configure({ allowBase64: false }),
      AdminIframe,
    ],
    content: initialContent,
    editorProps: {
      handlePaste(_view, event) {
        const text = event.clipboardData?.getData("text/plain") ?? "";
        if (!text.trim()) return false;

        event.preventDefault();
        editor?.commands.insertContent(pastedTextToHtml(text));
        onStatusRef.current("Đã dán nội dung và chuẩn hóa khoảng cách dòng.");
        return true;
      },
    },
    onUpdate({ editor: currentEditor }) {
      selectMedia(null);
      syncToolbarWithEditor(currentEditor);
      onChangeRef.current(currentEditor.getHTML().trim());
    },
    onSelectionUpdate({ editor: currentEditor }) {
      syncToolbarWithEditor(currentEditor);
    },
  });

  const textValue = (editor?.getText() || value.replace(/<[^>]*>/g, " "))
    .replace(/\s+/g, " ")
    .trim();
  const wordsCount = textValue ? textValue.split(" ").length : 0;
  const htmlLength = editor?.getHTML().length ?? value.length;
  const selectedUploadUrl =
    isImageElement(selectedMedia) ? getUploadedMediaUrl(selectedMedia.getAttribute("src") ?? selectedMedia.src) : "";

  useEffect(() => {
    onChangeRef.current = onChange;
  }, [onChange]);

  useEffect(() => {
    onStatusRef.current = onStatus;
  }, [onStatus]);

  useEffect(() => {
    if (!editor) return;
    const next = value.trim() ? (looksLikeHtml(value) ? value : plainTextToHtml(value)) : "<p></p>";
    if (!editor.isFocused && editor.getHTML().trim() !== next.trim()) {
      editor.commands.setContent(next, { emitUpdate: false });
      syncToolbarWithEditor(editor);
      selectMedia(null);
    }
  }, [editor, value]);

  useEffect(() => {
    if (!getHtmlRef) return;
    getHtmlRef.current = () => (editor?.getHTML() ?? "").replace(/\u200b/g, "").trim();

    return () => {
      getHtmlRef.current = null;
    };
  }, [editor, getHtmlRef]);

  useEffect(() => {
    window.addEventListener("resize", syncSelectedMediaOverlay);
    return () => window.removeEventListener("resize", syncSelectedMediaOverlay);
  }, []);

  function syncToolbarWithEditor(currentEditor = editor) {
    if (!currentEditor) return;
    const html = currentEditor.getHTML();
    const textStyle = currentEditor.getAttributes("textStyle") as Record<string, unknown>;
    const paragraph = currentEditor.getAttributes("paragraph") as Record<string, unknown>;
    const heading = currentEditor.getAttributes("heading") as Record<string, unknown>;

    const nextLineHeight = Number.parseFloat(String(paragraph.lineHeight || heading.lineHeight || ""));
    const lineHeightValue = Number.isFinite(nextLineHeight) ? clampRichLineHeight(nextLineHeight) : getRichLineHeight(html);
    setLineHeight(lineHeightValue);

    const nextFontSize = Number.parseFloat(String(textStyle.fontSize || ""));
    const fontSizeValue = Number.isFinite(nextFontSize) ? clampRichFontSize(nextFontSize) : getRichFontSize(html);
    setFontSize(fontSizeValue);
    setFontSizeInput(`${fontSizeValue}`);

    const nextFamily = String(textStyle.dataRichFontFamily || "");
    setFontFamily(RICH_FONT_OPTIONS.some((option) => option.value === nextFamily) ? nextFamily : getRichFontFamily(html));

    setTextColor(normalizeRichColor(String(textStyle.color || getRichTextColor(html))));
  }

  function focusEditor() {
    editor?.chain().focus().run();
  }

  function insertHtml(html: string) {
    editor?.chain().focus().insertContent(html).run();
  }

  function selectMedia(media: RichMediaElement | null) {
    selectedMediaRef.current?.classList.remove("rich-admin-media-active");
    selectedMediaRef.current = media;
    media?.classList.add("rich-admin-media-active");
    setSelectedMedia(media);
    if (media) {
      window.requestAnimationFrame(syncSelectedMediaOverlay);
    } else {
      setMediaOverlay(null);
    }
  }

  function syncSelectedMediaOverlay() {
    const media = selectedMediaRef.current;
    const frame = editorFrameRef.current;
    const root = editor?.view.dom;

    if (!media || !frame || !root || !root.contains(media)) {
      setMediaOverlay(null);
      return;
    }

    const mediaRect = media.getBoundingClientRect();
    const frameRect = frame.getBoundingClientRect();
    setMediaOverlay({
      left: mediaRect.left - frameRect.left,
      top: mediaRect.top - frameRect.top,
      width: mediaRect.width,
      height: mediaRect.height,
    });
  }

  function pickMedia(event: MouseEvent<HTMLDivElement>) {
    const target = event.target;
    const element = isHtmlElement(target) ? target.closest("img, iframe") : null;
    if ((isImageElement(element) || isIframeElement(element)) && editor?.view.dom.contains(element)) {
      selectMedia(element);
      return;
    }
    selectMedia(null);
  }

  function persistMediaDom() {
    if (!editor) return;
    const html = editor.view.dom.innerHTML;
    editor.commands.setContent(html, { emitUpdate: true });
    window.requestAnimationFrame(syncSelectedMediaOverlay);
  }

  function resizeSelectedMedia(delta: number) {
    if (!selectedMedia || !editor) return;
    const editorWidth = editor.view.dom.getBoundingClientRect().width;
    const current = selectedMedia.getBoundingClientRect().width || editorWidth * 0.7;
    const next = Math.max(80, Math.min(editorWidth, current + delta * 4));
    selectedMedia.style.width = `${Math.round(next)}px`;
    selectedMedia.style.maxWidth = "100%";
    selectedMedia.style.height = isIframeElement(selectedMedia) ? `${Math.max(160, Math.round(next * 0.5625))}px` : "auto";
    persistMediaDom();
  }

  function alignSelectedMedia(alignment: "left" | "center" | "right") {
    if (!selectedMedia) return;
    const margin =
      alignment === "left"
        ? "18px auto 18px 0"
        : alignment === "right"
          ? "18px 0 18px auto"
          : "18px auto";

    selectedMedia.style.display = "block";
    selectedMedia.style.position = "relative";
    selectedMedia.style.left = "0";
    selectedMedia.style.top = "0";
    selectedMedia.style.maxWidth = "100%";
    selectedMedia.style.margin = margin;
    if (isImageElement(selectedMedia)) selectedMedia.style.height = "auto";
    persistMediaDom();
  }

  function removeSelectedMedia() {
    if (!selectedMedia) return;
    selectedMedia.remove();
    selectMedia(null);
    persistMediaDom();
  }

  async function deleteSelectedUploadedImage() {
    if (!selectedUploadUrl) return;
    try {
      await deleteUploadedMedia({ url: selectedUploadUrl });
      removeSelectedMedia();
      onStatus("Đã xoá file upload khỏi thư viện.");
    } catch (error) {
      onStatus(error instanceof Error ? error.message : "Không thể xoá file upload.");
    }
  }

  async function uploadEditorImage(file: File | undefined) {
    if (!file) return;
    setUploading(true);
    try {
      const result = await uploadMedia(file, file.name);
      insertHtml(
        `<img src="${result.asset.url}" alt="${htmlEscape(result.asset.alt)}" draggable="false" style="display:block;position:relative;left:0;top:0;width:70%;max-width:100%;height:auto;margin:18px auto;border-radius:16px;" />`,
      );
      onStatus("Đã upload và chèn ảnh vào nội dung.");
    } catch (error) {
      onStatus(error instanceof Error ? error.message : "Không thể upload ảnh.");
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  }

  function insertVideo() {
    const input = window.prompt("Dán link YouTube/Vimeo hoặc mã iframe:");
    if (!input?.trim()) return;
    const src = normalizeVideoUrl(input);
    insertHtml(
      `<iframe src="${htmlEscape(src)}" title="Video" style="display:block;position:relative;left:0;top:0;width:70%;max-width:100%;height:315px;margin:18px auto;border:0;border-radius:16px;" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen="true" frameborder="0"></iframe>`,
    );
    onStatus("Đã nhúng video vào nội dung.");
  }

  function applyFontSize(nextValue: number) {
    if (!editor) return;
    const next = clampRichFontSize(nextValue);
    setFontSize(next);
    setFontSizeInput(`${next}`);
    editor.chain().focus().setMark("textStyle", { fontSize: `${next}px` }).run();
  }

  function commitFontSizeInput() {
    applyFontSize(Number.parseFloat(fontSizeInput));
  }

  function applyLineHeight(nextValue: number) {
    if (!editor) return;
    const next = clampRichLineHeight(nextValue);
    setLineHeight(next);
    const chain = editor.chain().focus();
    if (editor.isActive("heading")) {
      chain.updateAttributes("heading", { lineHeight: `${next}` }).run();
    } else if (editor.isActive("listItem")) {
      chain.updateAttributes("listItem", { lineHeight: `${next}` }).run();
    } else {
      chain.updateAttributes("paragraph", { lineHeight: `${next}` }).run();
    }
  }

  function applyFontFamily(nextValue: string) {
    if (!editor) return;
    const next = RICH_FONT_OPTIONS.some((option) => option.value === nextValue) ? nextValue : DEFAULT_RICH_FONT_FAMILY;
    const css = getRichFontCss(next);
    setFontFamily(next);
    if (!css) {
      editor.chain().focus().unsetFontFamily().setMark("textStyle", { dataRichFontFamily: null }).removeEmptyTextStyle().run();
    } else {
      editor.chain().focus().setFontFamily(css).setMark("textStyle", { dataRichFontFamily: next }).run();
    }
    onStatus(`Đã đổi font chữ sang ${RICH_FONT_OPTIONS.find((option) => option.value === next)?.label ?? "Mặc định"}.`);
  }

  function applyTextColor(nextValue: string) {
    if (!editor) return;
    const next = normalizeRichColor(nextValue);
    setTextColor(next);
    editor.chain().focus().setColor(next).run();
  }

  const toolbar = (
    <div className="flex flex-wrap items-center gap-2 rounded-t-md border border-[#e1b0b0] border-b-0 bg-[#fff8f8] p-2">
      <EditorButton active={Boolean(editor?.isActive("bold"))} icon={<span className="text-[15px]">B</span>} onClick={() => editor?.chain().focus().toggleBold().run()}>
        Đậm
      </EditorButton>
      <EditorButton active={Boolean(editor?.isActive("italic"))} icon={<span className="text-[15px] italic">I</span>} onClick={() => editor?.chain().focus().toggleItalic().run()}>
        Nghiêng
      </EditorButton>
      <EditorButton active={Boolean(editor?.isActive("underline"))} icon={<span className="text-[15px] underline">U</span>} onClick={() => editor?.chain().focus().toggleUnderline().run()}>
        Gạch chân
      </EditorButton>
      <EditorButton active={Boolean(editor?.isActive("bulletList"))} icon={<List size={16} />} onClick={() => editor?.chain().focus().toggleBulletList().run()}>
        Bullet
      </EditorButton>
      <EditorButton active={Boolean(editor?.isActive("orderedList"))} icon={<ListOrdered size={16} />} onClick={() => editor?.chain().focus().toggleOrderedList().run()}>
        Số thứ tự
      </EditorButton>
      <select
        value={fontFamily}
        onChange={(event) => applyFontFamily(event.target.value)}
        className="h-9 rounded-md border border-[#e7b8b8] bg-white px-3 text-[13px] font-extrabold text-[#620000] outline-none transition-colors hover:bg-[#fff1f1] focus:border-[#b80000]"
        title="Font chữ"
      >
        {RICH_FONT_OPTIONS.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <label
        className="inline-flex h-9 items-center gap-2 rounded-md border border-[#e7b8b8] bg-white px-3 text-[13px] font-extrabold text-[#620000] transition-colors hover:bg-[#fff1f1]"
        title="Màu chữ"
      >
        <span>Màu</span>
        <input
          type="color"
          value={textColor}
          onChange={(event) => applyTextColor(event.target.value)}
          className="h-5 w-7 cursor-pointer rounded border border-[#e7b8b8] bg-transparent p-0"
          aria-label="Màu chữ"
        />
      </label>
      <div className="inline-flex h-9 items-center overflow-hidden rounded-md border border-[#e7b8b8] bg-white text-[13px] font-extrabold text-[#620000]">
        <button type="button" onClick={() => applyFontSize(fontSize - 1)} className="flex h-full items-center gap-1 px-3 transition-colors hover:bg-[#fff1f1]">
          A-
        </button>
        <label className="flex h-full min-w-16 items-center justify-center border-x border-[#e7b8b8] bg-[#fff8f8] px-1 text-[#b80000]">
          <span className="sr-only">Cỡ chữ</span>
          <input
            type="number"
            min={MIN_RICH_FONT_SIZE}
            max={MAX_RICH_FONT_SIZE}
            value={fontSizeInput}
            onChange={(event) => setFontSizeInput(event.target.value)}
            onBlur={commitFontSizeInput}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                event.preventDefault();
                commitFontSizeInput();
                event.currentTarget.blur();
              }
            }}
            className="h-full w-10 bg-transparent text-center text-[13px] font-extrabold text-[#b80000] outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
            title="Nhập cỡ chữ"
          />
          <span className="pr-1">px</span>
        </label>
        <button type="button" onClick={() => applyFontSize(fontSize + 1)} className="flex h-full items-center gap-1 px-3 transition-colors hover:bg-[#fff1f1]">
          A+
        </button>
      </div>
      <div className="inline-flex h-9 items-center overflow-hidden rounded-md border border-[#e7b8b8] bg-white text-[13px] font-extrabold text-[#620000]">
        <button type="button" onClick={() => applyLineHeight(lineHeight - 0.1)} className="flex h-full items-center gap-1 px-3 transition-colors hover:bg-[#fff1f1]">
          <span>LH-</span>
          Giãn -
        </button>
        <span className="flex h-full min-w-14 items-center justify-center border-x border-[#e7b8b8] bg-[#fff8f8] px-2 text-[#b80000]">
          {lineHeight.toFixed(1)}x
        </span>
        <button type="button" onClick={() => applyLineHeight(lineHeight + 0.1)} className="flex h-full items-center gap-1 px-3 transition-colors hover:bg-[#fff1f1]">
          <span>LH+</span>
          Giãn +
        </button>
      </div>
      <EditorButton icon={<ImagePlus size={16} />} onClick={() => setPickerOpen(true)}>
        Chèn ảnh
      </EditorButton>
      <EditorButton icon={<Video size={16} />} onClick={insertVideo}>
        Nhúng video
      </EditorButton>
      <span className="ml-auto flex items-center gap-2">
        <EditorButton icon={expanded ? <Minimize2 size={16} /> : <Maximize2 size={16} />} onClick={() => setExpanded((current) => !current)}>
          {expanded ? "Thu nhỏ" : "Phóng to"}
        </EditorButton>
      </span>
      {selectedMedia ? (
        <div className="flex w-full flex-wrap items-center gap-2 rounded-md border border-[#f0c6c6] bg-white p-2 text-[12px] font-bold text-[#620000]">
          <span className="mr-1 uppercase text-[#b80000]">Media đang chọn</span>
          <EditorButton icon={<span>-</span>} onClick={() => resizeSelectedMedia(-10)}>
            Thu nhỏ
          </EditorButton>
          <EditorButton icon={<Plus size={16} />} onClick={() => resizeSelectedMedia(10)}>
            Phóng to
          </EditorButton>
          <EditorButton icon={<span>L</span>} onClick={() => alignSelectedMedia("left")}>
            Trái
          </EditorButton>
          <EditorButton icon={<span>C</span>} onClick={() => alignSelectedMedia("center")}>
            Giữa
          </EditorButton>
          <EditorButton icon={<span>R</span>} onClick={() => alignSelectedMedia("right")}>
            Phải
          </EditorButton>
          <EditorButton icon={<Trash2 size={16} />} onClick={removeSelectedMedia}>
            Xóa
          </EditorButton>
          {selectedUploadUrl ? (
            <EditorButton icon={<Trash2 size={16} />} onClick={deleteSelectedUploadedImage}>
              Xóa file upload
            </EditorButton>
          ) : null}
        </div>
      ) : null}
      <input
        ref={fileRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/svg+xml"
        className="hidden"
        onChange={(event) => uploadEditorImage(event.target.files?.[0])}
      />
    </div>
  );

  const editorShell = (
    <div className={expanded ? "flex min-h-0 flex-1 flex-col" : "grid gap-0"}>
      {toolbar}
      <div ref={editorFrameRef} className={expanded ? "relative min-h-0 flex-1" : "relative"}>
        <div
          className={`${expanded ? "rich-admin-expanded h-full min-h-0" : "min-h-[560px]"} rich-admin-content rounded-b-md border border-[#e1b0b0] bg-white text-[16px] leading-8 text-[#620000] outline-none focus-within:border-[#b80000]`}
          onClick={pickMedia}
          onScroll={syncSelectedMediaOverlay}
        >
          {!textValue && placeholder ? (
            <span className="pointer-events-none absolute left-5 top-4 text-[15px] text-[#620000]/40">{placeholder}</span>
          ) : null}
          <EditorContent editor={editor} />
        </div>
        {selectedMedia && mediaOverlay ? (
          <div
            className="pointer-events-none absolute z-10 rounded-[16px] border-2 border-dashed border-[#b80000]"
            style={{
              left: `${mediaOverlay.left}px`,
              top: `${mediaOverlay.top}px`,
              width: `${mediaOverlay.width}px`,
              height: `${mediaOverlay.height}px`,
            }}
          >
            <button
              type="button"
              aria-label="Xóa ảnh/video"
              title="Xóa ảnh/video"
              onClick={removeSelectedMedia}
              className="pointer-events-auto absolute right-[-12px] top-[-12px] flex h-6 w-6 items-center justify-center rounded-full border-2 border-white bg-[#620000] text-white shadow-[0_3px_10px_rgba(98,0,0,0.28)]"
            >
              <X size={14} strokeWidth={3} />
            </button>
            <button
              type="button"
              aria-label="Đổi kích thước ảnh/video"
              title="Bấm để phóng to ảnh/video"
              onClick={() => resizeSelectedMedia(10)}
              className="pointer-events-auto absolute bottom-[-12px] right-[-12px] flex h-6 w-6 cursor-pointer items-center justify-center rounded-full border-2 border-white bg-[#b80000] shadow-[0_3px_10px_rgba(98,0,0,0.28)]"
            >
              <Plus size={13} className="text-white" />
            </button>
          </div>
        ) : null}
      </div>
      <div className="flex flex-wrap justify-between gap-2 rounded-b-md border-x border-b border-[#f0d0d0] bg-[#fffefa] px-3 py-2 text-[12px] font-semibold text-[#9a4a4a]">
        <span>{wordsCount} từ</span>
        <span>{htmlLength} ký tự HTML</span>
        <span>Bấm ảnh/video để căn chỉnh, đổi kích thước hoặc xoá</span>
      </div>
      <style jsx global>{`
        .rich-admin-content {
          position: relative;
        }
        .rich-admin-content .ProseMirror {
          min-height: 560px;
          padding: 1rem 1.25rem;
          outline: none;
        }
        .rich-admin-content.rich-admin-expanded .ProseMirror {
          height: 100%;
          min-height: 0;
          overflow: auto;
        }
        .rich-admin-content h2 {
          margin: 1.2rem 0 0.65rem;
          color: #b80000;
          font-size: 1.55rem;
          font-weight: 900;
          line-height: 1.25;
        }
        .rich-admin-content p {
          margin: 0 0 1rem;
        }
        .rich-admin-content p:last-child {
          margin-bottom: 0;
        }
        .rich-admin-content p:empty,
        .rich-admin-content p:has(> br:only-child) {
          min-height: 0.75rem;
          margin-bottom: 0.5rem;
        }
        .rich-admin-content ul,
        .rich-admin-content ol {
          margin: 0 0 1rem 1.4rem;
          padding-left: 1rem;
        }
        .rich-admin-content ul {
          list-style: disc;
        }
        .rich-admin-content ol {
          list-style: decimal;
        }
        .rich-admin-content li {
          display: list-item;
        }
        .rich-admin-content img,
        .rich-admin-content iframe {
          cursor: pointer;
          outline-offset: 5px;
          user-select: none;
        }
        .rich-admin-content img:hover,
        .rich-admin-content iframe:hover,
        .rich-admin-content .rich-admin-media-active {
          outline: 2px dashed #b80000;
        }
      `}</style>
    </div>
  );

  return (
    <div className="grid gap-1.5">
      <span className="text-[13px] font-bold uppercase text-[#620000]">{label}</span>
      {expanded ? null : editorShell}
      {expanded ? (
        <div className="fixed inset-0 z-[100] flex flex-col bg-[#fffefa] p-6">
          <div className="mb-4 flex items-center justify-between gap-4">
            <div>
              <p className="text-[13px] font-extrabold uppercase text-[#b80000]">Rich editor</p>
              <h3 className="text-[28px] font-extrabold text-[#620000]">{label}</h3>
            </div>
            <ActionButton icon={<Minimize2 size={17} />} tone="quiet" onClick={() => setExpanded(false)}>
              Thu nhỏ
            </ActionButton>
          </div>
          {editorShell}
        </div>
      ) : null}
      <MediaLibraryPicker
        open={pickerOpen}
        title={label}
        onClose={() => setPickerOpen(false)}
        onSelect={(asset) => {
          insertHtml(
            `<img src="${asset.url}" alt="${htmlEscape(asset.alt || asset.originalName)}" draggable="false" style="display:block;position:relative;left:0;top:0;width:70%;max-width:100%;height:auto;margin:18px auto;border-radius:16px;" />`,
          );
          onStatus("Đã chèn ảnh từ thư viện vào nội dung.");
        }}
        onDeletedAsset={(asset) => {
          const media = selectedMediaRef.current;
          const selectedUrl = isImageElement(media) ? getUploadedMediaUrl(media.getAttribute("src") ?? media.src) : "";
          if (selectedUrl === asset.url) removeSelectedMedia();
        }}
        onStatus={onStatus}
      />
      {uploading ? <p className="text-[12px] font-bold text-[#b80000]">Đang upload ảnh...</p> : null}
    </div>
  );
}

function RichTextEditor({
  label,
  value,
  onChange,
  placeholder,
  onStatus,
  getHtmlRef,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  onStatus: (message: string) => void;
  getHtmlRef?: { current: (() => string) | null };
}) {
  const editorRef = useRef<HTMLDivElement>(null);
  const editorFrameRef = useRef<HTMLDivElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const selectedMediaRef = useRef<RichMediaElement | null>(null);
  const dragSessionRef = useRef<MediaDragSession | null>(null);
  const savedSelectionRef = useRef<Range | null>(null);
  const preservingSelectionRef = useRef(false);
  const [expanded, setExpanded] = useState(false);
  const [pickerOpen, setPickerOpen] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [selectedMedia, setSelectedMedia] = useState<RichMediaElement | null>(null);
  const [mediaOverlay, setMediaOverlay] = useState<MediaOverlayRect | null>(null);
  const [lineHeight, setLineHeight] = useState(() => getRichLineHeight(value));
  const [fontSize, setFontSize] = useState(() => getRichFontSize(value));
  const [fontSizeInput, setFontSizeInput] = useState(() => `${getRichFontSize(value)}`);
  const [fontFamily, setFontFamily] = useState(() => getRichFontFamily(value));
  const [textColor, setTextColor] = useState(() => getRichTextColor(value));
  const textValue = value.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
  const wordsCount = textValue ? textValue.split(" ").length : 0;

  useEffect(() => {
    const editor = editorRef.current;
    if (!editor || document.activeElement === editor) return;
    const next = looksLikeHtml(value) ? value : plainTextToHtml(value);
    if (editor.innerHTML !== next) {
      editor.innerHTML = next;
    }
    setLineHeight(getRichLineHeight(next));
    const nextFontSize = getRichFontSize(next);
    setFontSize(nextFontSize);
    setFontSizeInput(`${nextFontSize}`);
    setFontFamily(getRichFontFamily(next));
    setTextColor(getRichTextColor(next));
  }, [value]);

  useEffect(() => {
    if (!getHtmlRef) return;
    getHtmlRef.current = () => (editorRef.current?.innerHTML ?? "").replace(/\u200b/g, "").trim();

    return () => {
      getHtmlRef.current = null;
    };
  }, [getHtmlRef]);

  useEffect(() => {
    window.addEventListener("resize", syncSelectedMediaOverlay);

    return () => {
      window.removeEventListener("resize", syncSelectedMediaOverlay);
      clearSavedSelectionHighlight();
      document.removeEventListener("pointermove", handleDocumentPointerMove);
      document.removeEventListener("pointerup", handleDocumentPointerUp);
      document.removeEventListener("pointercancel", handleDocumentPointerUp);
    };
  }, []);

  function emit() {
    const html = (editorRef.current?.innerHTML ?? "").replace(/\u200b/g, "");
    onChange(html.trim());
  }

  function isEditorRange(range: Range | null) {
    const editor = editorRef.current;
    return Boolean(editor && range && editor.contains(range.commonAncestorContainer));
  }

  function rememberEditorSelection(options: { keepExistingSelection?: boolean } = {}) {
    const selection = window.getSelection();
    const range = selection?.rangeCount ? selection.getRangeAt(0) : null;

    if (isEditorRange(range)) {
      if (options.keepExistingSelection && range?.collapsed && savedSelectionRef.current && !savedSelectionRef.current.collapsed) {
        showSavedSelectionHighlight(savedSelectionRef.current);
        return;
      }

      savedSelectionRef.current = range?.cloneRange() ?? null;
      showSavedSelectionHighlight(range);
      syncToolbarWithSelection(range);
    }
  }

  function preserveSelectionForToolbar() {
    preservingSelectionRef.current = true;
    rememberEditorSelection({ keepExistingSelection: true });
  }

  function handleEditorBlur() {
    rememberEditorSelection({ keepExistingSelection: preservingSelectionRef.current });
  }

  function showSavedSelectionHighlight(range: Range | null) {
    const support = getRichSelectionHighlightSupport();
    if (!support) return;

    if (!range || range.collapsed || !range.toString().replace(/\u200b/g, "").trim()) {
      support.highlights.delete(RICH_SELECTION_HIGHLIGHT);
      return;
    }

    support.highlights.set(RICH_SELECTION_HIGHLIGHT, new support.HighlightConstructor(range.cloneRange()));
  }

  function clearSavedSelectionHighlight() {
    getRichSelectionHighlightSupport()?.highlights.delete(RICH_SELECTION_HIGHLIGHT);
  }

  function restoreEditorSelection() {
    const selection = window.getSelection();
    const activeRange = selection?.rangeCount ? selection.getRangeAt(0) : null;
    const savedRange = savedSelectionRef.current;

    if (savedRange && !savedRange.collapsed && isEditorRange(savedRange)) {
      selection?.removeAllRanges();
      selection?.addRange(savedRange);
      showSavedSelectionHighlight(savedRange);
      return savedRange;
    }

    if (isEditorRange(activeRange)) {
      savedSelectionRef.current = activeRange?.cloneRange() ?? null;
      return activeRange;
    }

    if (!selection || !savedRange || !isEditorRange(savedRange)) return null;

    selection.removeAllRanges();
    selection.addRange(savedRange);
    showSavedSelectionHighlight(savedRange);
    return savedRange;
  }

  function handleEditorInput() {
    emit();
    rememberEditorSelection();
  }

  function getSelectionElement(range: Range | null) {
    if (!range) return null;
    const node = range.startContainer;
    const element = isHtmlElement(node) ? node : node.parentElement;
    return element && editorRef.current?.contains(element) ? element : null;
  }

  function syncToolbarWithSelection(range: Range | null) {
    const element = getSelectionElement(range);
    if (!element) return;

    const inline = element.closest("[data-rich-font-size], [style*='font-size']");
    const source = isHtmlElement(inline) ? inline : element;
    const computedSize = Number.parseFloat(window.getComputedStyle(source).fontSize);
    const nextFontSize = clampRichFontSize(computedSize);
    setFontSize(nextFontSize);
    setFontSizeInput(`${nextFontSize}`);

    const fontSource = element.closest("[data-rich-font-family]");
    if (isHtmlElement(fontSource)) {
      const nextFontFamily = fontSource.dataset.richFontFamily;
      if (nextFontFamily && RICH_FONT_OPTIONS.some((option) => option.value === nextFontFamily)) {
        setFontFamily(nextFontFamily);
      }
    }

    const colorSource = element.closest("[data-rich-text-color], [style*='color']");
    setTextColor(normalizeRichColor(window.getComputedStyle(isHtmlElement(colorSource) ? colorSource : element).color));
  }

  function selectMedia(media: RichMediaElement | null) {
    selectedMediaRef.current?.classList.remove("rich-admin-media-active");
    selectedMediaRef.current = media;
    media?.classList.add("rich-admin-media-active");
    setSelectedMedia(media);
    if (media) {
      window.requestAnimationFrame(syncSelectedMediaOverlay);
    } else {
      setMediaOverlay(null);
    }
  }

  function syncSelectedMediaOverlay() {
    const media = selectedMediaRef.current;
    const frame = editorFrameRef.current;
    const editor = editorRef.current;

    if (!media || !frame || !editor || !editor.contains(media)) {
      setMediaOverlay(null);
      return;
    }

    const mediaRect = media.getBoundingClientRect();
    const frameRect = frame.getBoundingClientRect();
    setMediaOverlay({
      left: mediaRect.left - frameRect.left,
      top: mediaRect.top - frameRect.top,
      width: mediaRect.width,
      height: mediaRect.height,
    });
  }

  function focusEditor() {
    editorRef.current?.focus();
  }

  function runCommand(command: string, commandValue?: string) {
    focusEditor();
    restoreEditorSelection();
    document.execCommand(command, false, commandValue);
    rememberEditorSelection();
    emit();
  }

  function insertHtml(html: string) {
    focusEditor();
    restoreEditorSelection();
    document.execCommand("insertHTML", false, html);
    rememberEditorSelection();
    emit();
  }

  function selectionInside(selector: string) {
    const selection = window.getSelection();
    const node = selection?.anchorNode;
    const element = isHtmlElement(node) ? node : node?.parentElement;
    return Boolean(element?.closest(selector));
  }

  function selectionClosest(selector: string) {
    const selection = window.getSelection();
    const node = selection?.anchorNode;
    const element = isHtmlElement(node) ? node : node?.parentElement;
    const closest = element?.closest(selector);
    return isHtmlElement(closest) ? closest : null;
  }

  function selectionBlock() {
    const editor = editorRef.current;
    const selection = window.getSelection();
    const node = selection?.anchorNode;
    if (!editor || !node) return null;

    const element = isHtmlElement(node) ? node : node.parentElement;
    if (!element || !editor.contains(element)) return null;
    return element.closest("li, h2, h3, p, div") as HTMLElement | null;
  }

  function listSelection(type: "ul" | "ol") {
    const editor = editorRef.current;
    if (!editor) return;

    focusEditor();
    restoreEditorSelection();
    selectMedia(null);

    const selection = window.getSelection();

    const existingList = selectionInside("ul, ol");
    if (existingList) {
      document.execCommand(type === "ul" ? "insertUnorderedList" : "insertOrderedList");
      emit();
      return;
    }

    const selectedText = selection?.toString().replace(/\u200b/g, "").trim();
    if (selection?.rangeCount && selectedText) {
      const items = selectedText
        .split(/\n+/)
        .map((item) => item.replace(/^[\s•*-]+/, "").replace(/^\d+[.)]\s*/, "").trim())
        .filter(Boolean);

      if (items.length) {
        const template = document.createElement("template");
        template.innerHTML = `<${type}>${items.map((item) => `<li>${htmlEscape(item)}</li>`).join("")}</${type}>`;
        const range = selection.getRangeAt(0);
        range.deleteContents();
        range.insertNode(template.content);
        selection.removeAllRanges();
        savedSelectionRef.current = null;
        emit();
        return;
      }
    }

    const block = selectionBlock();
    const rawText = (selectedText || block?.innerText || editor.innerText || "").replace(/\u200b/g, "");
    const items = rawText
      .split(/\n+/)
      .map((item) => item.replace(/^[\s•*-]+/, "").replace(/^\d+[.)]\s*/, "").trim())
      .filter(Boolean);

    const html = `<${type}>${(items.length ? items : ["Nội dung"]).map((item) => `<li>${htmlEscape(item)}</li>`).join("")}</${type}>`;

    if (block?.dataset.richLineHeight !== undefined) {
      block.innerHTML = html;
    } else if (block && block !== editor && editor.contains(block)) {
      block.outerHTML = html;
    } else if (editor.innerText.trim()) {
      editor.innerHTML = html;
    } else {
      document.execCommand("insertHTML", false, html);
    }

    emit();
  }

  function handleEditorPaste(event: ClipboardEvent<HTMLDivElement>) {
    const text = event.clipboardData.getData("text/plain");
    if (!text.trim()) return;

    event.preventDefault();
    selectMedia(null);
    insertHtml(pastedTextToHtml(text));
    onStatus("Đã dán nội dung và chuẩn hóa khoảng cách dòng.");
  }

  function ensureRichStyleWrapper() {
    const editor = editorRef.current;
    if (!editor) return null;

    let wrapper =
      editor.childElementCount === 1
        ? (editor.firstElementChild as HTMLElement | null)
        : null;

    if (
      !wrapper ||
      (wrapper.dataset.richLineHeight === undefined &&
        wrapper.dataset.richFontSize === undefined &&
        wrapper.dataset.richFontFamily === undefined &&
        wrapper.dataset.richTextColor === undefined)
    ) {
      const currentHtml = editor.innerHTML.trim() || "<p><br></p>";
      editor.innerHTML = `<div data-rich-style="true">${currentHtml}</div>`;
      wrapper = editor.firstElementChild as HTMLElement | null;
    }

    return wrapper;
  }

  function applyRichTextStyles(nextStyles: Partial<{ lineHeight: number; fontSize: number; fontFamily: string; color: string }>) {
    const expectsSavedSelection =
      preservingSelectionRef.current && savedSelectionRef.current && !savedSelectionRef.current.collapsed;

    if (applySelectionRichTextStyles(nextStyles)) return;

    if (expectsSavedSelection) {
      preservingSelectionRef.current = false;
      clearSavedSelectionHighlight();
      onStatus("Không tìm thấy vùng bôi đen, vui lòng chọn lại đoạn cần sửa.");
      return;
    }

    const wrapper = ensureRichStyleWrapper();
    if (!wrapper) return;

    wrapper.dataset.richStyle = "true";

    if (nextStyles.lineHeight !== undefined) {
      const nextLineHeight = clampRichLineHeight(nextStyles.lineHeight);
      wrapper.dataset.richLineHeight = `${nextLineHeight}`;
      wrapper.style.lineHeight = `${nextLineHeight}`;
      setLineHeight(nextLineHeight);
    }

    if (nextStyles.fontSize !== undefined) {
      const nextFontSize = clampRichFontSize(nextStyles.fontSize);
      wrapper.dataset.richFontSize = `${nextFontSize}`;
      wrapper.style.fontSize = `${nextFontSize}px`;
      setFontSize(nextFontSize);
      setFontSizeInput(`${nextFontSize}`);
    }

    if (nextStyles.fontFamily !== undefined) {
      const currentFontFamily = fontFamily || DEFAULT_RICH_FONT_FAMILY;
      const nextFontFamily = RICH_FONT_OPTIONS.some((option) => option.value === nextStyles.fontFamily)
        ? (nextStyles.fontFamily as string)
        : currentFontFamily;
      wrapper.dataset.richFontFamily = nextFontFamily;
      wrapper.style.fontFamily = getRichFontCss(nextFontFamily);
      setFontFamily(nextFontFamily);
    }

    if (nextStyles.color !== undefined) {
      const nextTextColor = normalizeRichColor(nextStyles.color);
      wrapper.dataset.richTextColor = nextTextColor;
      wrapper.style.color = nextTextColor;
      setTextColor(nextTextColor);
    }
    selectMedia(null);
    focusEditor();
    preservingSelectionRef.current = false;
    clearSavedSelectionHighlight();
    emit();
  }

  function applySelectionRichTextStyles(nextStyles: Partial<{ lineHeight: number; fontSize: number; fontFamily: string; color: string }>) {
    const editor = editorRef.current;
    if (!editor) return false;

    focusEditor();
    const range = restoreEditorSelection();
    const selectedText = range?.toString().replace(/\u200b/g, "").trim();
    if (!range || range.collapsed || !selectedText || !editor.contains(range.commonAncestorContainer)) return false;

    const selectionRoot = isHtmlElement(range.commonAncestorContainer)
      ? range.commonAncestorContainer
      : range.commonAncestorContainer.parentElement;
    const existingInline = selectionRoot?.closest("span[data-rich-inline-style='true']");
    const existingText = existingInline?.textContent?.replace(/\u200b/g, "").trim();
    const inline =
      isHtmlElement(existingInline) && editor.contains(existingInline) && existingText === selectedText
        ? existingInline
        : document.createElement("span");
    inline.dataset.richInlineStyle = "true";

    if (nextStyles.lineHeight !== undefined) {
      const nextLineHeight = clampRichLineHeight(nextStyles.lineHeight);
      inline.dataset.richLineHeight = `${nextLineHeight}`;
      inline.style.lineHeight = `${nextLineHeight}`;
      setLineHeight(nextLineHeight);
    }

    if (nextStyles.fontSize !== undefined) {
      const nextFontSize = clampRichFontSize(nextStyles.fontSize);
      inline.dataset.richFontSize = `${nextFontSize}`;
      inline.style.fontSize = `${nextFontSize}px`;
      setFontSize(nextFontSize);
      setFontSizeInput(`${nextFontSize}`);
    }

    if (nextStyles.fontFamily !== undefined) {
      const nextFontFamily = RICH_FONT_OPTIONS.some((option) => option.value === nextStyles.fontFamily)
        ? (nextStyles.fontFamily as string)
        : DEFAULT_RICH_FONT_FAMILY;
      inline.dataset.richFontFamily = nextFontFamily;
      inline.style.fontFamily =
        nextFontFamily === DEFAULT_RICH_FONT_FAMILY
          ? "\"Baloo Paaji 2\", Arial, Helvetica, sans-serif"
          : getRichFontCss(nextFontFamily);
      setFontFamily(nextFontFamily);
    }

    if (nextStyles.color !== undefined) {
      const nextTextColor = normalizeRichColor(nextStyles.color);
      inline.dataset.richTextColor = nextTextColor;
      inline.style.color = nextTextColor;
      setTextColor(nextTextColor);
    }

    if (!existingInline || inline !== existingInline) {
      const fragment = range.extractContents();
      inline.appendChild(fragment);
      range.insertNode(inline);
    }

    const nextRange = document.createRange();
    nextRange.selectNodeContents(inline);
    const selection = window.getSelection();
    selection?.removeAllRanges();
    selection?.addRange(nextRange);
    savedSelectionRef.current = nextRange.cloneRange();

    selectMedia(null);
    preservingSelectionRef.current = false;
    clearSavedSelectionHighlight();
    emit();
    return true;
  }

  function applyLineHeight(nextValue: number) {
    const next = clampRichLineHeight(nextValue);
    applyRichTextStyles({ lineHeight: next });
    onStatus(`Đã đặt khoảng cách dòng ${next.toFixed(1)}x.`);
  }

  function applyFontSize(nextValue: number) {
    const next = clampRichFontSize(nextValue);
    setFontSizeInput(`${next}`);
    applyRichTextStyles({ fontSize: next });
    onStatus(`Đã đặt cỡ chữ ${next}px.`);
  }

  function commitFontSizeInput() {
    const parsed = Number.parseFloat(fontSizeInput);
    if (!Number.isFinite(parsed)) {
      setFontSizeInput(`${fontSize}`);
      return;
    }

    applyFontSize(parsed);
  }

  function applyFontFamily(nextValue: string) {
    const next = RICH_FONT_OPTIONS.some((option) => option.value === nextValue) ? nextValue : DEFAULT_RICH_FONT_FAMILY;
    applyRichTextStyles({ fontFamily: next });
    onStatus(`Đã đổi font chữ sang ${RICH_FONT_OPTIONS.find((option) => option.value === next)?.label ?? "Mặc định"}.`);
  }

  function applyTextColor(nextValue: string) {
    const next = normalizeRichColor(nextValue);
    setTextColor(next);
    applyRichTextStyles({ color: next });
    onStatus("Đã đổi màu chữ.");
  }

  async function uploadEditorImage(file: File | undefined) {
    if (!file) return;

    setUploading(true);
    try {
      const result = await uploadMedia(file, label);
      insertHtml(
        `<img src="${result.asset.url}" alt="${htmlEscape(result.asset.alt)}" draggable="false" style="display:block;position:relative;left:0;top:0;width:70%;max-width:100%;height:auto;margin:18px auto;border-radius:16px;" />`,
      );
      onStatus("Đã chèn ảnh vào nội dung.");
    } catch (error) {
      onStatus(error instanceof Error ? error.message : "Không thể upload ảnh.");
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  }

  function insertVideo() {
    const input = window.prompt("Dán link YouTube/Vimeo hoặc mã iframe video:");
    if (!input?.trim()) return;

    const src = normalizeVideoUrl(input);
    insertHtml(
      `<iframe src="${htmlEscape(src)}" style="display:block;position:relative;left:0;top:0;width:70%;max-width:100%;height:360px;margin:18px auto;border:0;border-radius:16px;" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe><p><br></p>`,
    );
    onStatus("Đã nhúng video vào nội dung.");
  }

  function resizeSelectedMedia(delta: number) {
    if (!selectedMedia || !editorRef.current?.contains(selectedMedia)) return;
    selectedMedia.style.position = "relative";

    if (selectedMedia.style.width.endsWith("px")) {
      const editorWidth = editorRef.current.getBoundingClientRect().width;
      const current = selectedMedia.getBoundingClientRect().width;
      const next = Math.max(80, Math.min(editorWidth, current + delta * 4));
      selectedMedia.style.width = `${Math.round(next)}px`;
    } else {
      const current = Number.parseFloat(selectedMedia.style.width || "70");
      const next = Math.max(25, Math.min(100, current + delta));
      selectedMedia.style.width = `${next}%`;
    }

    selectedMedia.style.maxWidth = "100%";
    if (isImageElement(selectedMedia)) {
      selectedMedia.style.height = "auto";
    }
    syncSelectedMediaOverlay();
    emit();
  }

  function alignSelectedMedia(position: "left" | "center" | "right") {
    if (!selectedMedia || !editorRef.current?.contains(selectedMedia)) return;
    selectedMedia.style.display = "block";
    selectedMedia.style.position = "relative";
    selectedMedia.style.left = "0px";
    selectedMedia.style.top = "0px";
    selectedMedia.style.marginTop = "18px";
    selectedMedia.style.marginBottom = "18px";
    selectedMedia.style.marginLeft = position === "left" ? "0" : position === "center" ? "auto" : "auto";
    selectedMedia.style.marginRight = position === "right" ? "0" : position === "center" ? "auto" : "auto";
    syncSelectedMediaOverlay();
    emit();
  }

  function isEmptyRichBlock(node: ChildNode | null): node is HTMLElement {
    if (!isHtmlElement(node) || (node.tagName !== "P" && node.tagName !== "DIV")) return false;
    const text = (node.textContent ?? "").replace(/\u00a0/g, "").trim();
    return !text && !node.querySelector("img, iframe, video, table, ul, ol");
  }

  function removeSelectedMedia() {
    const media = selectedMediaRef.current;
    const editor = editorRef.current;
    if (!media || !editor?.contains(media)) return;

    const parent = media.parentElement;
    const nextSibling = media.nextSibling;
    const previousSibling = media.previousSibling;

    media.remove();

    if (isEmptyRichBlock(nextSibling)) {
      nextSibling.remove();
    } else if (isEmptyRichBlock(previousSibling)) {
      previousSibling.remove();
    }

    if (parent && parent !== editor && editor.contains(parent) && isEmptyRichBlock(parent)) {
      parent.remove();
    }

    selectMedia(null);
    focusEditor();
    emit();
    onStatus("Đã xóa ảnh/video khỏi nội dung.");
  }

  async function deleteSelectedUploadedImage() {
    const media = selectedMediaRef.current;
    const editor = editorRef.current;
    const uploadUrl = isImageElement(media) ? getUploadedMediaUrl(media.getAttribute("src") ?? media.src) : "";

    if (!media || !editor?.contains(media) || !uploadUrl) return;
    if (!window.confirm("Xóa file ảnh upload này khỏi hệ thống?")) return;

    onStatus("Đang xóa ảnh upload...");

    try {
      await deleteUploadedMedia({ url: uploadUrl });
      removeSelectedMedia();
      onStatus("Đã xóa ảnh upload và gỡ khỏi nội dung.");
    } catch (error) {
      onStatus(error instanceof Error ? error.message : "Không thể xóa ảnh upload.");
    }
  }

  function insertSoftLineBreak() {
    const editor = editorRef.current;
    const selection = window.getSelection();
    const range = selection?.rangeCount ? selection.getRangeAt(0) : null;

    if (!editor || !selection || !range || !editor.contains(range.commonAncestorContainer)) {
      insertHtml("<br>");
      return;
    }

    range.deleteContents();

    const fragment = document.createDocumentFragment();
    const br = document.createElement("br");
    const marker = document.createTextNode("\u200b");
    fragment.append(br, marker);
    range.insertNode(fragment);

    const nextRange = document.createRange();
    nextRange.setStartAfter(marker);
    nextRange.collapse(true);
    selection.removeAllRanges();
    selection.addRange(nextRange);
    emit();
  }

  function handleEditorKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if ((event.key === "Delete" || event.key === "Backspace") && selectedMediaRef.current) {
      event.preventDefault();
      removeSelectedMedia();
      return;
    }

    if (event.key === "Enter" && !event.altKey && !event.ctrlKey && !event.metaKey) {
      const heading = selectionClosest("h2");
      if (heading && editorRef.current?.contains(heading)) {
        event.preventDefault();
        selectMedia(null);

        const paragraph = document.createElement("p");
        paragraph.innerHTML = "<br>";
        heading.insertAdjacentElement("afterend", paragraph);

        const range = document.createRange();
        range.setStart(paragraph, 0);
        range.collapse(true);
        const selection = window.getSelection();
        selection?.removeAllRanges();
        selection?.addRange(range);
        emit();
        return;
      }
    }

    if (event.key === "Enter" && !event.altKey && !event.ctrlKey && !event.metaKey && !selectionInside("li")) {
      event.preventDefault();
      selectMedia(null);
      insertSoftLineBreak();
    }
  }

  function findMediaAtPoint(clientX: number, clientY: number, target?: EventTarget | null) {
    const directTarget = isHtmlElement(target) ? target.closest("img, iframe") : null;
    if (isImageElement(directTarget) || isIframeElement(directTarget)) {
      return directTarget;
    }

    const editor = editorRef.current;
    if (!editor) return null;

    const mediaItems = Array.from(editor.querySelectorAll<RichMediaElement>("img, iframe")).reverse();
    return (
      mediaItems.find((item) => {
        const rect = item.getBoundingClientRect();
        return clientX >= rect.left && clientX <= rect.right && clientY >= rect.top && clientY <= rect.bottom;
      }) ?? null
    );
  }

  function pickMedia(event: MouseEvent<HTMLDivElement>) {
    selectMedia(findMediaAtPoint(event.clientX, event.clientY, event.target));
  }

  function getMediaDragMode(event: PointerEvent<HTMLDivElement>, media: RichMediaElement): MediaDragMode {
    const rect = media.getBoundingClientRect();
    const handleSize = 26;
    return event.clientX >= rect.right - handleSize && event.clientY >= rect.bottom - handleSize ? "resize" : "move";
  }

  function beginMediaDrag(
    media: RichMediaElement,
    mode: MediaDragMode,
    pointerId: number,
    clientX: number,
    clientY: number,
    captureTarget: Element,
  ) {
    const editor = editorRef.current;
    if (!editor?.contains(media)) return;

    media.draggable = false;
    media.style.display = "block";
    media.style.position = "relative";
    media.style.maxWidth = "100%";

    const editorRect = editor.getBoundingClientRect();
    const mediaRect = media.getBoundingClientRect();
    const startWidth = mediaRect.width;
    const startHeight = mediaRect.height;

    dragSessionRef.current = {
      mode,
      media,
      captureTarget,
      pointerId,
      startX: clientX,
      startY: clientY,
      startLeft: Number.parseFloat(media.style.left || "0") || 0,
      startTop: Number.parseFloat(media.style.top || "0") || 0,
      startWidth,
      minWidth: Math.min(140, Math.max(80, editorRect.width * 0.2)),
      maxWidth: Math.max(180, editorRect.width),
      aspectRatio: startWidth / Math.max(1, startHeight),
    };

    captureTarget.setPointerCapture?.(pointerId);
    document.addEventListener("pointermove", handleDocumentPointerMove);
    document.addEventListener("pointerup", handleDocumentPointerUp);
    document.addEventListener("pointercancel", handleDocumentPointerUp);
  }

  function startMediaDrag(event: PointerEvent<HTMLDivElement>) {
    if (event.button !== 0) return;

    const media = findMediaAtPoint(event.clientX, event.clientY, event.target);
    if (!(isImageElement(media) || isIframeElement(media)) || !editorRef.current?.contains(media)) {
      selectMedia(null);
      return;
    }

    event.preventDefault();
    event.stopPropagation();

    selectMedia(media);
    beginMediaDrag(media, getMediaDragMode(event, media), event.pointerId, event.clientX, event.clientY, media);
  }

  function startSelectedMediaResize(event: PointerEvent<HTMLButtonElement>) {
    if (event.button !== 0 || !selectedMedia || !editorRef.current?.contains(selectedMedia)) return;

    event.preventDefault();
    event.stopPropagation();
    selectMedia(selectedMedia);
    beginMediaDrag(selectedMedia, "resize", event.pointerId, event.clientX, event.clientY, event.currentTarget);
  }

  function handleDocumentPointerMove(event: globalThis.PointerEvent) {
    const session = dragSessionRef.current;
    if (!session || event.pointerId !== session.pointerId) return;

    event.preventDefault();
    const dx = event.clientX - session.startX;
    const dy = event.clientY - session.startY;

    if (session.mode === "move") {
      session.media.style.left = `${Math.round(session.startLeft + dx)}px`;
      session.media.style.top = `${Math.round(session.startTop + dy)}px`;
      syncSelectedMediaOverlay();
      return;
    }

    const nextWidth = Math.max(session.minWidth, Math.min(session.maxWidth, session.startWidth + dx));
    session.media.style.width = `${Math.round(nextWidth)}px`;
    session.media.style.maxWidth = "100%";

    if (isIframeElement(session.media)) {
      session.media.style.height = `${Math.round(Math.max(160, nextWidth / session.aspectRatio))}px`;
    } else {
      session.media.style.height = "auto";
    }
    syncSelectedMediaOverlay();
  }

  function handleDocumentPointerUp(event: globalThis.PointerEvent) {
    const session = dragSessionRef.current;
    if (!session || event.pointerId !== session.pointerId) return;

    session.captureTarget.releasePointerCapture?.(event.pointerId);
    dragSessionRef.current = null;
    document.removeEventListener("pointermove", handleDocumentPointerMove);
    document.removeEventListener("pointerup", handleDocumentPointerUp);
    document.removeEventListener("pointercancel", handleDocumentPointerUp);
    syncSelectedMediaOverlay();
    emit();
  }

  const selectedUploadUrl =
    isImageElement(selectedMedia) ? getUploadedMediaUrl(selectedMedia.getAttribute("src") ?? selectedMedia.src) : "";

  const toolbar = (
    <div className="flex flex-wrap items-center gap-2 rounded-t-md border border-[#e1b0b0] border-b-0 bg-[#fff8f8] p-2">
      <EditorButton icon={<span className="text-[15px]">B</span>} onClick={() => runCommand("bold")}>
        Đậm
      </EditorButton>
      <EditorButton icon={<span className="text-[15px] italic">I</span>} onClick={() => runCommand("italic")}>
        Nghiêng
      </EditorButton>
      <EditorButton icon={<span className="text-[15px] underline">U</span>} onClick={() => runCommand("underline")}>
        Gạch chân
      </EditorButton>
      <EditorButton icon={<List size={16} />} onClick={() => listSelection("ul")}>
        Bullet
      </EditorButton>
      <EditorButton icon={<ListOrdered size={16} />} onClick={() => listSelection("ol")}>
        Số thứ tự
      </EditorButton>
      <select
        value={fontFamily}
        onMouseDown={preserveSelectionForToolbar}
        onFocus={preserveSelectionForToolbar}
        onChange={(event) => applyFontFamily(event.target.value)}
        className="h-9 rounded-md border border-[#e7b8b8] bg-white px-3 text-[13px] font-extrabold text-[#620000] outline-none transition-colors hover:bg-[#fff1f1] focus:border-[#b80000]"
        title="Font chữ"
      >
        {RICH_FONT_OPTIONS.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <label
        className="inline-flex h-9 items-center gap-2 rounded-md border border-[#e7b8b8] bg-white px-3 text-[13px] font-extrabold text-[#620000] transition-colors hover:bg-[#fff1f1]"
        title="Màu chữ"
      >
        <span>Màu</span>
        <input
          type="color"
          value={textColor}
          onMouseDown={preserveSelectionForToolbar}
          onFocus={preserveSelectionForToolbar}
          onChange={(event) => applyTextColor(event.target.value)}
          className="h-5 w-7 cursor-pointer rounded border border-[#e7b8b8] bg-transparent p-0"
          aria-label="Màu chữ"
        />
      </label>
      <div className="inline-flex h-9 items-center overflow-hidden rounded-md border border-[#e7b8b8] bg-white text-[13px] font-extrabold text-[#620000]">
        <button
          type="button"
          onMouseDown={(event) => event.preventDefault()}
          onClick={() => applyFontSize(fontSize - 1)}
          className="flex h-full items-center gap-1 px-3 transition-colors hover:bg-[#fff1f1]"
        >
          A-
        </button>
        <label className="flex h-full min-w-16 items-center justify-center border-x border-[#e7b8b8] bg-[#fff8f8] px-1 text-[#b80000]">
          <span className="sr-only">Cỡ chữ</span>
          <input
            type="number"
            min={MIN_RICH_FONT_SIZE}
            max={MAX_RICH_FONT_SIZE}
            value={fontSizeInput}
            onMouseDown={preserveSelectionForToolbar}
            onFocus={(event) => {
              preserveSelectionForToolbar();
              event.currentTarget.select();
            }}
            onChange={(event) => setFontSizeInput(event.target.value)}
            onBlur={commitFontSizeInput}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                event.preventDefault();
                commitFontSizeInput();
                event.currentTarget.blur();
              }
            }}
            className="h-full w-10 bg-transparent text-center text-[13px] font-extrabold text-[#b80000] outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
            title="Nhập cỡ chữ"
          />
          <span className="pr-1">px</span>
        </label>
        <button
          type="button"
          onMouseDown={(event) => event.preventDefault()}
          onClick={() => applyFontSize(fontSize + 1)}
          className="flex h-full items-center gap-1 px-3 transition-colors hover:bg-[#fff1f1]"
        >
          A+
        </button>
      </div>
      <div className="inline-flex h-9 items-center overflow-hidden rounded-md border border-[#e7b8b8] bg-white text-[13px] font-extrabold text-[#620000]">
        <button
          type="button"
          onMouseDown={(event) => event.preventDefault()}
          onClick={() => applyLineHeight(lineHeight - 0.1)}
          className="flex h-full items-center gap-1 px-3 transition-colors hover:bg-[#fff1f1]"
        >
          <span>LH-</span>
          Giãn -
        </button>
        <span className="flex h-full min-w-14 items-center justify-center border-x border-[#e7b8b8] bg-[#fff8f8] px-2 text-[#b80000]">
          {lineHeight.toFixed(1)}x
        </span>
        <button
          type="button"
          onMouseDown={(event) => event.preventDefault()}
          onClick={() => applyLineHeight(lineHeight + 0.1)}
          className="flex h-full items-center gap-1 px-3 transition-colors hover:bg-[#fff1f1]"
        >
          <span>LH+</span>
          Giãn +
        </button>
      </div>
      <EditorButton icon={<ImagePlus size={16} />} onClick={() => setPickerOpen(true)}>
        Chèn ảnh
      </EditorButton>
      <EditorButton icon={<Video size={16} />} onClick={insertVideo}>
        Nhúng video
      </EditorButton>
      <span className="ml-auto flex items-center gap-2">
        <EditorButton icon={expanded ? <Minimize2 size={16} /> : <Maximize2 size={16} />} onClick={() => setExpanded((current) => !current)}>
          {expanded ? "Thu nhỏ" : "Phóng to"}
        </EditorButton>
      </span>
      {selectedMedia ? (
        <div className="flex w-full flex-wrap items-center gap-2 rounded-md border border-[#f0c6c6] bg-white p-2 text-[12px] font-bold text-[#620000]">
          <span className="mr-1 uppercase text-[#b80000]">Media đang chọn</span>
          <EditorButton icon={<span>-</span>} onClick={() => resizeSelectedMedia(-10)}>
            Thu nhỏ
          </EditorButton>
          <EditorButton icon={<Plus size={16} />} onClick={() => resizeSelectedMedia(10)}>
            Phóng to
          </EditorButton>
          <EditorButton icon={<span>L</span>} onClick={() => alignSelectedMedia("left")}>
            Trái
          </EditorButton>
          <EditorButton icon={<span>C</span>} onClick={() => alignSelectedMedia("center")}>
            Giữa
          </EditorButton>
          <EditorButton icon={<span>R</span>} onClick={() => alignSelectedMedia("right")}>
            Phải
          </EditorButton>
          <EditorButton icon={<Trash2 size={16} />} onClick={removeSelectedMedia}>
            Xóa
          </EditorButton>
          {selectedUploadUrl ? (
            <EditorButton icon={<Trash2 size={16} />} onClick={deleteSelectedUploadedImage}>
              Xóa file upload
            </EditorButton>
          ) : null}
        </div>
      ) : null}
      <input
        ref={fileRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/svg+xml"
        className="hidden"
        onChange={(event) => uploadEditorImage(event.target.files?.[0])}
      />
    </div>
  );

  const editor = (
    <div className={expanded ? "flex min-h-0 flex-1 flex-col" : "grid gap-0"}>
      {toolbar}
      <div
        ref={editorFrameRef}
        className={expanded ? "relative min-h-0 flex-1" : "relative"}
      >
        <div
          ref={editorRef}
          role="textbox"
          aria-label={label}
          contentEditable
          suppressContentEditableWarning
          onInput={handleEditorInput}
          onKeyDown={handleEditorKeyDown}
          onKeyUp={() => rememberEditorSelection()}
          onPaste={handleEditorPaste}
          onClick={pickMedia}
          onMouseUp={() => rememberEditorSelection()}
          onBlur={handleEditorBlur}
          onPointerDown={startMediaDrag}
          onScroll={syncSelectedMediaOverlay}
          className={`${expanded ? "h-full min-h-0 overflow-auto" : "min-h-[560px]"} rich-admin-content rounded-b-md border border-[#e1b0b0] bg-white px-5 py-4 text-[16px] leading-8 text-[#620000] outline-none focus:border-[#b80000]`}
        />
        {selectedMedia && mediaOverlay ? (
          <div
            className="pointer-events-none absolute z-10 rounded-[16px] border-2 border-dashed border-[#b80000]"
            style={{
              left: `${mediaOverlay.left}px`,
              top: `${mediaOverlay.top}px`,
              width: `${mediaOverlay.width}px`,
              height: `${mediaOverlay.height}px`,
            }}
          >
            <button
              type="button"
              aria-label="Xóa ảnh/video"
              title="Xóa ảnh/video"
              onClick={removeSelectedMedia}
              onPointerDown={(event) => {
                event.preventDefault();
                event.stopPropagation();
              }}
              className="pointer-events-auto absolute right-[-12px] top-[-12px] flex h-6 w-6 items-center justify-center rounded-full border-2 border-white bg-[#620000] text-white shadow-[0_3px_10px_rgba(98,0,0,0.28)]"
            >
              <X size={14} strokeWidth={3} />
            </button>
            <button
              type="button"
              aria-label="Kéo để đổi kích thước ảnh/video"
              title="Kéo để đổi kích thước"
              onPointerDown={startSelectedMediaResize}
              className="pointer-events-auto absolute bottom-[-12px] right-[-12px] flex h-6 w-6 cursor-nwse-resize items-center justify-center rounded-full border-2 border-white bg-[#b80000] shadow-[0_3px_10px_rgba(98,0,0,0.28)]"
            >
              <span className="block h-2.5 w-2.5 rounded-full bg-white" />
            </button>
          </div>
        ) : null}
      </div>
      <div className="flex flex-wrap justify-between gap-2 rounded-b-md border-x border-b border-[#f0d0d0] bg-[#fffefa] px-3 py-2 text-[12px] font-semibold text-[#9a4a4a]">
        <span>{wordsCount} từ</span>
        <span>{value.length} ký tự HTML</span>
        <span>Bấm ảnh/video, kéo để đổi vị trí, kéo chấm đỏ để đổi kích thước, bấm X để xóa</span>
      </div>
      <style jsx global>{`
        ::highlight(rich-admin-saved-selection) {
          background: rgba(184, 0, 0, 0.2);
          color: inherit;
        }
        .rich-admin-content h2 {
          margin: 1.2rem 0 0.65rem;
          color: #b80000;
          font-size: 1.55rem;
          font-weight: 900;
          line-height: 1.25;
        }
        .rich-admin-content p {
          margin: 0 0 1rem;
        }
        .rich-admin-content div {
          margin: 0 0 1rem;
        }
        .rich-admin-content p:last-child,
        .rich-admin-content div:last-child {
          margin-bottom: 0;
        }
        .rich-admin-content p:empty,
        .rich-admin-content div:empty,
        .rich-admin-content p:has(> br:only-child),
        .rich-admin-content div:has(> br:only-child) {
          min-height: 0.75rem;
          margin-bottom: 0.5rem;
        }
        .rich-admin-content [data-rich-line-height] {
          margin: 0;
        }
        .rich-admin-content ul,
        .rich-admin-content ol {
          margin: 0 0 1rem 1.4rem;
          padding-left: 1rem;
        }
        .rich-admin-content ul {
          list-style: disc;
        }
        .rich-admin-content ol {
          list-style: decimal;
        }
        .rich-admin-content li {
          display: list-item;
        }
        .rich-admin-content img,
        .rich-admin-content iframe {
          cursor: pointer;
          outline-offset: 5px;
          touch-action: none;
          user-select: none;
        }
        .rich-admin-content img:hover,
        .rich-admin-content iframe:hover,
        .rich-admin-content .rich-admin-media-active {
          outline: 2px dashed #b80000;
        }
        .rich-admin-content .rich-admin-media-active {
          cursor: move;
        }
        .rich-admin-content[contenteditable="true"] iframe {
          pointer-events: none;
        }
      `}</style>
    </div>
  );

  return (
    <div className="grid gap-1.5">
      <span className="text-[13px] font-bold uppercase text-[#620000]">{label}</span>
      {expanded ? null : editor}
      {expanded ? (
        <div className="fixed inset-0 z-[100] flex flex-col bg-[#fffefa] p-6">
          <div className="mb-4 flex items-center justify-between gap-4">
            <div>
              <p className="text-[13px] font-extrabold uppercase text-[#b80000]">Rich editor</p>
              <h3 className="text-[28px] font-extrabold text-[#620000]">{label}</h3>
            </div>
            <ActionButton icon={<Minimize2 size={17} />} tone="quiet" onClick={() => setExpanded(false)}>
              Thu nhỏ
            </ActionButton>
          </div>
          {editor}
        </div>
      ) : null}
      <MediaLibraryPicker
        open={pickerOpen}
        title={label}
        onClose={() => setPickerOpen(false)}
        onSelect={(asset) => {
          insertHtml(
            `<img src="${asset.url}" alt="${htmlEscape(asset.alt || asset.originalName)}" draggable="false" style="display:block;position:relative;left:0;top:0;width:70%;max-width:100%;height:auto;margin:18px auto;border-radius:16px;" />`,
          );
          onStatus("Đã chèn ảnh từ thư viện vào nội dung.");
        }}
        onDeletedAsset={(asset) => {
          const media = selectedMediaRef.current;
          const selectedUrl = isImageElement(media) ? getUploadedMediaUrl(media.getAttribute("src") ?? media.src) : "";
          if (selectedUrl === asset.url) removeSelectedMedia();
        }}
        onStatus={onStatus}
      />
    </div>
  );
}

function EditorButton({
  children,
  icon,
  active,
  onClick,
}: {
  children: ReactNode;
  icon: ReactNode;
  active?: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onMouseDown={(event) => event.preventDefault()}
      onClick={onClick}
      className={`inline-flex h-9 items-center gap-2 rounded-md border px-3 text-[13px] font-extrabold transition-colors ${
        active
          ? "border-[#b80000] bg-[#b80000] text-white"
          : "border-[#e7b8b8] bg-white text-[#620000] hover:bg-[#fff1f1]"
      }`}
    >
      {icon}
      {children}
    </button>
  );
}

function formatBytes(value: number | null) {
  if (!value) return "";
  if (value < 1024 * 1024) return `${Math.round(value / 1024)}KB`;
  return `${(value / (1024 * 1024)).toFixed(1)}MB`;
}

function MediaLibraryPicker({
  open,
  title,
  currentAssetId,
  onClose,
  onSelect,
  onDeletedAsset,
  onStatus,
}: {
  open: boolean;
  title: string;
  currentAssetId?: number | null;
  onClose: () => void;
  onSelect: (asset: MediaAsset) => void;
  onDeletedAsset?: (asset: MediaAsset) => void;
  onStatus: (message: string) => void;
}) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [tab, setTab] = useState<"library" | "upload">("library");
  const [assets, setAssets] = useState<MediaAsset[]>([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  async function loadAssets() {
    setLoading(true);

    try {
      const data = await fetchMediaLibrary();
      setAssets(data.assets);
    } catch (error) {
      onStatus(error instanceof Error ? error.message : "Không thể tải thư viện ảnh.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (!open) return;
    setTab("library");
    void loadAssets();
  }, [open]);

  async function handleUpload(file: File | undefined) {
    if (!file) return;

    setUploading(true);
    onStatus("Đang upload ảnh...");

    try {
      await uploadMedia(file, title);
      await loadAssets();
      setTab("library");
      onStatus("Đã upload ảnh, bạn có thể chọn để chèn.");
    } catch (error) {
      onStatus(error instanceof Error ? error.message : "Không thể upload ảnh.");
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  }

  async function handleDelete(asset: MediaAsset) {
    if (!asset.isUploaded) return;
    if (!window.confirm("Xóa file ảnh upload này khỏi hệ thống?")) return;

    setDeletingId(asset.id);
    onStatus("Đang xóa ảnh upload...");

    try {
      await deleteUploadedMedia({ id: asset.id, url: asset.url });
      setAssets((current) => current.filter((item) => item.id !== asset.id));
      onDeletedAsset?.(asset);
      onStatus("Đã xóa ảnh upload.");
    } catch (error) {
      onStatus(error instanceof Error ? error.message : "Không thể xóa ảnh upload.");
    } finally {
      setDeletingId(null);
    }
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center bg-[#220000]/45 p-4">
      <div className="flex max-h-[88vh] w-full max-w-5xl flex-col overflow-hidden rounded-md border border-[#e0b4b4] bg-white shadow-[0_18px_60px_rgba(98,0,0,0.28)]">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#f0d0d0] bg-[#fff8f8] px-5 py-4">
          <div>
            <p className="text-[12px] font-extrabold uppercase text-[#b80000]">Quản lý ảnh</p>
            <h3 className="text-[22px] font-extrabold text-[#620000]">{title}</h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-[#e7b8b8] bg-white text-[#620000] hover:bg-[#fff1f1]"
            aria-label="Đóng"
          >
            <X size={18} />
          </button>
        </div>
        <div className="flex flex-wrap gap-2 border-b border-[#f0d0d0] px-5 py-3">
          <button
            type="button"
            onClick={() => setTab("library")}
            className={`h-9 rounded-md border px-4 text-[13px] font-extrabold ${
              tab === "library" ? "border-[#b80000] bg-[#b80000] text-white" : "border-[#e7b8b8] bg-white text-[#620000]"
            }`}
          >
            Ảnh đã có
          </button>
          <button
            type="button"
            onClick={() => setTab("upload")}
            className={`h-9 rounded-md border px-4 text-[13px] font-extrabold ${
              tab === "upload" ? "border-[#b80000] bg-[#b80000] text-white" : "border-[#e7b8b8] bg-white text-[#620000]"
            }`}
          >
            Upload mới
          </button>
          <button
            type="button"
            onClick={loadAssets}
            className="ml-auto inline-flex h-9 items-center gap-2 rounded-md border border-[#e7b8b8] bg-white px-3 text-[13px] font-extrabold text-[#620000] hover:bg-[#fff1f1]"
          >
            <RefreshCw size={15} />
            Tải lại
          </button>
        </div>
        {tab === "library" ? (
          <div className="min-h-0 flex-1 overflow-auto p-5">
            {loading ? (
              <p className="rounded-md border border-[#f0d0d0] bg-[#fffafa] px-4 py-8 text-center text-[14px] font-bold text-[#9a4a4a]">
                Đang tải thư viện ảnh...
              </p>
            ) : assets.length ? (
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
                {assets.map((asset) => {
                  const active = asset.id === currentAssetId;

                  return (
                    <div
                      key={asset.id}
                      className={`group overflow-hidden rounded-md border bg-[#fffafa] ${
                        active ? "border-[#b80000] ring-2 ring-[#b80000]/20" : "border-[#efd0d0]"
                      }`}
                    >
                      <button
                        type="button"
                        onClick={() => {
                          onSelect(asset);
                          onClose();
                        }}
                        className="block w-full text-left"
                      >
                        <span className="flex aspect-square items-center justify-center bg-white">
                          <img src={asset.url} alt={asset.alt || asset.originalName} className="h-full w-full object-contain p-2" />
                        </span>
                        <span className="block px-3 py-2">
                          <span className="block truncate text-[12px] font-extrabold text-[#620000]">
                            {asset.originalName || asset.fileName}
                          </span>
                          <span className="mt-0.5 block truncate text-[11px] font-semibold text-[#9a4a4a]">
                            {asset.isUploaded ? "Upload" : asset.folder || "Có sẵn"} {formatBytes(asset.sizeBytes)}
                          </span>
                        </span>
                      </button>
                      {asset.isUploaded ? (
                        <button
                          type="button"
                          disabled={deletingId === asset.id}
                          onClick={() => handleDelete(asset)}
                          className="flex h-8 w-full items-center justify-center gap-1 border-t border-[#f0d0d0] bg-white text-[12px] font-extrabold text-[#b80000] hover:bg-[#fff1f1] disabled:opacity-60"
                        >
                          <Trash2 size={13} />
                          {deletingId === asset.id ? "Đang xóa..." : "Xóa"}
                        </button>
                      ) : null}
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="rounded-md border border-[#f0d0d0] bg-[#fffafa] px-4 py-8 text-center text-[14px] font-bold text-[#9a4a4a]">
                Chưa có ảnh trong thư viện.
              </p>
            )}
          </div>
        ) : (
          <div className="p-5">
            <label className="flex min-h-[220px] cursor-pointer flex-col items-center justify-center gap-3 rounded-md border border-dashed border-[#d9baba] bg-[#fffafa] px-6 text-center transition-colors hover:bg-[#fff1f1]">
              <ImagePlus size={34} className="text-[#b80000]" />
              <span className="text-[17px] font-extrabold text-[#620000]">
                {uploading ? "Đang upload..." : "Chọn ảnh từ máy"}
              </span>
              <span className="text-[13px] font-semibold text-[#9a4a4a]">JPG, PNG, WebP hoặc SVG, tối đa 8MB</span>
              <input
                ref={fileRef}
                type="file"
                accept="image/png,image/jpeg,image/webp,image/svg+xml"
                disabled={uploading}
                onChange={(event) => handleUpload(event.target.files?.[0])}
                className="sr-only"
              />
            </label>
          </div>
        )}
      </div>
    </div>
  );
}

function MediaField({
  label,
  assetId,
  previewUrl,
  alt,
  onUploaded,
  onDeleted,
  onStatus,
}: {
  label: string;
  assetId: number | null;
  previewUrl: string;
  alt: string;
  onUploaded: (asset: { id: number; url: string }) => void;
  onDeleted: () => void;
  onStatus: (message: string) => void;
}) {
  const [pickerOpen, setPickerOpen] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const uploadUrl = getUploadedMediaUrl(previewUrl);
  const canDeleteUpload = Boolean(assetId && uploadUrl);

  async function handleFile(file: File | undefined) {
    if (!file) return;

    setUploading(true);
    onStatus("Đang upload ảnh/icon...");

    try {
      const data = await uploadMedia(file, alt || label);
      onUploaded(data.asset);
      onStatus("Đã upload ảnh/icon.");
    } catch (error) {
      onStatus(error instanceof Error ? error.message : "Không thể upload ảnh/icon.");
    } finally {
      setUploading(false);
    }
  }

  async function handleDeleteUpload() {
    if (!assetId || !uploadUrl) return;
    if (!window.confirm("Xóa file ảnh upload này khỏi hệ thống?")) return;

    setDeleting(true);
    onStatus("Đang xóa ảnh upload...");

    try {
      await deleteUploadedMedia({ id: assetId, url: uploadUrl });
      onDeleted();
      onStatus("Đã xóa ảnh upload.");
    } catch (error) {
      onStatus(error instanceof Error ? error.message : "Không thể xóa ảnh upload.");
    } finally {
      setDeleting(false);
    }
  }

  return (
    <div className="grid gap-2">
      <span className="text-[13px] font-bold uppercase text-[#620000]">{label}</span>
      <div className="grid gap-3 rounded-md border border-[#e1b0b0] bg-[#fffafa] p-3 sm:grid-cols-[116px_1fr]">
        <div className="flex h-[116px] w-[116px] items-center justify-center overflow-hidden rounded-md border border-[#efd0d0] bg-white">
          {previewUrl ? (
            <img src={previewUrl} alt={alt || label} className="h-full w-full object-contain" />
          ) : (
            <ImagePlus size={34} className="text-[#b80000]" />
          )}
        </div>
        <div className="grid gap-2">
          <button
            type="button"
            disabled={deleting}
            onClick={() => setPickerOpen(true)}
            className="flex min-h-[82px] flex-col items-center justify-center gap-2 rounded-md border border-dashed border-[#d9baba] bg-white px-4 text-center transition-colors hover:bg-[#fff1f1] disabled:cursor-not-allowed disabled:opacity-60"
          >
            <ImagePlus size={20} className="text-[#b80000]" />
            <span className="text-[15px] font-extrabold text-[#620000]">Chọn ảnh/icon</span>
            <span className="text-[13px] font-semibold text-[#9a4a4a]">Mở kho ảnh đã có hoặc upload ảnh mới</span>
          </button>
          {canDeleteUpload ? (
            <button
              type="button"
              disabled={deleting}
              onClick={handleDeleteUpload}
              className="inline-flex h-9 items-center justify-center gap-2 rounded-md border border-[#e7b8b8] bg-white px-3 text-[13px] font-extrabold text-[#b80000] transition-colors hover:bg-[#fff1f1] disabled:cursor-not-allowed disabled:opacity-60"
            >
              <Trash2 size={15} />
              {deleting ? "Đang xóa..." : "Xóa ảnh đã upload"}
            </button>
          ) : null}
        </div>
      </div>
      <MediaLibraryPicker
        open={pickerOpen}
        title={label}
        currentAssetId={assetId}
        onClose={() => setPickerOpen(false)}
        onSelect={(asset) => {
          onUploaded({ id: asset.id, url: asset.url });
          onStatus("Đã chọn ảnh từ thư viện.");
        }}
        onDeletedAsset={(asset) => {
          if (asset.id === assetId) onDeleted();
        }}
        onStatus={onStatus}
      />
    </div>
  );
}

const teacherCardPresets = [
  { label: "Mẫu 1", shape: "rounded-[32px_72px_32px_72px]", rotate: "-rotate-[1deg]" },
  { label: "Mẫu 2", shape: "rounded-[72px_32px_72px_32px]", rotate: "rotate-[1deg]" },
  { label: "Mẫu 3", shape: "rounded-[42px]", rotate: "-rotate-[0.5deg]" },
  { label: "Mẫu 4", shape: "rounded-[64px_28px_64px_28px]", rotate: "rotate-[0.8deg]" },
  { label: "Mẫu 5", shape: "rounded-[28px_64px_28px_64px]", rotate: "-rotate-[0.8deg]" },
  { label: "Mẫu 6", shape: "rounded-[46px]", rotate: "rotate-[1.2deg]" },
];

function TeacherCardStylePicker({
  shapeClass,
  rotateClass,
  colorHex,
  onChange,
}: {
  shapeClass: string;
  rotateClass: string;
  colorHex: string;
  onChange: (value: { shapeClass: string; rotateClass: string }) => void;
}) {
  return (
    <div className="grid gap-2">
      <span className="text-[13px] font-bold uppercase text-[#620000]">Mẫu card</span>
      <div className="grid gap-3 sm:grid-cols-3">
        {teacherCardPresets.map((preset) => {
          const active = preset.shape === shapeClass && preset.rotate === rotateClass;

          return (
            <button
              key={preset.label}
              type="button"
              onClick={() => onChange({ shapeClass: preset.shape, rotateClass: preset.rotate })}
              className={`relative min-h-[92px] border p-3 text-left shadow-[3px_3px_0_rgba(184,0,0,0.16)] transition-transform hover:-translate-y-0.5 ${preset.shape} ${preset.rotate} ${
                active ? "border-[#b80000] ring-2 ring-[#b80000]/20" : "border-[#f0aaaa]"
              }`}
              style={{ backgroundColor: colorHex || "#fffefa" }}
            >
              <span className="absolute inset-2 rounded-[inherit] border border-dashed border-[#b80000]/25" />
              <span className="relative z-[1] text-[14px] font-extrabold text-[#620000]">{preset.label}</span>
              <span className="relative z-[1] mt-1 block text-[11px] font-semibold text-[#9a4a4a]">
                {active ? "Đang chọn" : "Bấm để chọn"}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function TeacherCardPreview({
  title,
  description,
  imageUrl,
  colorHex,
  shapeClass,
  rotateClass,
}: {
  title: string;
  description: string;
  imageUrl: string;
  colorHex: string;
  shapeClass: string;
  rotateClass: string;
}) {
  return (
    <div className="grid gap-2">
      <span className="text-[13px] font-bold uppercase text-[#620000]">Xem trước card</span>
      <article
        className={`relative min-h-[230px] max-w-[420px] border border-[#b80000] p-6 shadow-[4px_4px_0_rgba(184,0,0,0.18)] ${shapeClass} ${rotateClass}`}
        style={{ backgroundColor: colorHex || "#fffefa" }}
      >
        <div className="pointer-events-none absolute inset-2 rounded-[inherit] border border-dashed border-[#b80000]/30" />
        <div className="relative z-[1] flex min-h-[190px] flex-col">
          {imageUrl ? (
            <img src={imageUrl} alt={title || "Ảnh giáo viên"} className="mx-auto mb-6 h-28 w-28 object-contain" />
          ) : (
            <div className="mx-auto mb-6 flex h-28 w-28 items-center justify-center rounded-full bg-white/80 text-[#b80000]">
              <ImagePlus size={34} />
            </div>
          )}
          <h3 className="text-[22px] font-extrabold leading-tight">{title || "Tiêu đề card"}</h3>
          <p className="mt-4 text-[16px] font-medium leading-7 text-[#620000]">
            {description || "Mô tả ngắn của giáo viên sẽ hiển thị tại đây."}
          </p>
        </div>
      </article>
    </div>
  );
}

function ActionButton({
  children,
  icon,
  tone = "primary",
  type = "button",
  onClick,
  disabled,
}: {
  children: ReactNode;
  icon: ReactNode;
  tone?: "primary" | "quiet" | "danger";
  type?: "button" | "submit";
  onClick?: () => void;
  disabled?: boolean;
}) {
  const className =
    tone === "danger"
      ? "border-[#b80000] bg-white text-[#b80000] hover:bg-[#fff1f1]"
      : tone === "quiet"
        ? "border-[#d9baba] bg-white text-[#620000] hover:bg-[#fffefa]"
        : "border-[#b80000] bg-[#b80000] text-white hover:bg-[#960000]";

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`inline-flex h-11 items-center justify-center gap-2 rounded-md border px-4 text-[15px] font-extrabold transition-colors disabled:cursor-wait disabled:opacity-60 ${className}`}
    >
      {icon}
      {children}
    </button>
  );
}

function getListPreview(item: any, tab: TabKey, programMode: ProgramMode, aboutMode: AboutMode) {
  const title = item.title ?? item.name ?? item.parentName ?? "Chưa đặt tên";
  const imageUrl =
    tab === "banners"
      ? item.desktopImageUrl || item.mobileImageUrl || ""
      : tab === "about" && aboutMode === "testimonials"
        ? item.avatarUrl || ""
        : item.imageUrl || "";
  const category =
    tab === "banners"
      ? "Trang chủ"
      : tab === "schedules"
        ? scheduleStatusLabel(item.status ?? "new")
        : item.category || item.categoryName || "Chưa phân loại";
  const description =
    tab === "banners"
      ? item.subtitle || item.ctaLabel || "Banner trang chủ"
      : tab === "schedules"
        ? `${item.phone || "Chưa có SĐT"} - ${formatDateTime(item.requestedAt)}`
      : tab === "about" && aboutMode === "testimonials"
        ? item.quote || "Chưa có nội dung chia sẻ."
        : item.excerpt || item.description || item.age || "Chưa có mô tả ngắn.";
  const color =
    tab === "banners"
      ? "#fffefa"
      : tab === "teaching"
      ? item.background || "#fff1f1"
      : tab === "about"
        ? item.color || "#fff1f1"
      : tab === "programs" && programMode === "classes"
        ? item.color || "#fff1f1"
        : "#fff1f1";
  const typeLabel =
    tab === "banners"
      ? "Banner"
      : tab === "schedules"
      ? "Lịch đăng ký"
      : tab === "teaching"
      ? "Phương pháp"
      : tab === "posts"
        ? item.postType === "event"
          ? "Sự kiện"
          : item.postType === "activity"
            ? "Hoạt động"
            : "Tin tức"
        : tab === "about"
          ? aboutMode === "facilities"
            ? "Cơ sở"
            : aboutMode === "teachers"
              ? "Giáo viên"
              : "Phụ huynh"
        : programMode === "classes"
          ? "Khối lớp"
          : "Chương trình";

  return { title, imageUrl, category, description, color, typeLabel };
}

export default function AdminDashboard() {
  const [tab, setTab] = useState<TabKey>("teaching");
  const [programMode, setProgramMode] = useState<ProgramMode>("classes");
  const [aboutMode, setAboutMode] = useState<AboutMode>("facilities");
  const [data, setData] = useState<LoadState>({
    banners: [],
    classes: [],
    curriculum: [],
    teaching: [],
    posts: [],
    facilities: [],
    teachers: [],
    testimonials: [],
    schedules: [],
  });
  const [selected, setSelected] = useState<number | null>(null);
  const [status, setStatus] = useState("");
  const [saving, setSaving] = useState(false);
  const [addingCategory, setAddingCategory] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [categories, setCategories] = useState<CategoryState>(emptyCategories);
  const [registrationForm, setRegistrationForm] =
    useState<RegistrationSectionForm>(emptyRegistrationSection);

  const [bannerForm, setBannerForm] = useState(emptyBanner);
  const [classForm, setClassForm] = useState(emptyClass);
  const [curriculumForm, setCurriculumForm] = useState(emptyCurriculum);
  const [teachingForm, setTeachingForm] = useState(emptyTeaching);
  const [postForm, setPostForm] = useState(emptyPost);
  const [facilityForm, setFacilityForm] = useState(emptyFacility);
  const [teacherForm, setTeacherForm] = useState(emptyTeacher);
  const [testimonialForm, setTestimonialForm] = useState(emptyTestimonial);
  const [scheduleForm, setScheduleForm] = useState<RegistrationScheduleForm>(emptySchedule);

  const currentList = useMemo(() => {
    if (tab === "registration") return [];
    if (tab === "banners") return data.banners;
    if (tab === "schedules") return data.schedules;
    if (tab === "teaching") return data.teaching;
    if (tab === "posts") return data.posts;
    if (tab === "about") {
      if (aboutMode === "facilities") return data.facilities;
      if (aboutMode === "teachers") return data.teachers;
      return data.testimonials;
    }
    return programMode === "classes" ? data.classes : data.curriculum;
  }, [aboutMode, data, programMode, tab]);

  async function loadAll() {
    setStatus("Đang tải dữ liệu...");
    const [banners, registration, schedules, classes, curriculum, teaching, posts, facilities, teachers, testimonials, categoryResponse] = await Promise.all([
      requestJson<{ slides: HeroSlide[] }>("/api/hero-slides"),
      requestJson<{ settings: RegistrationSectionSettings }>("/api/home-sections/registration"),
      requestJson<{ schedules: RegistrationSchedule[] }>("/api/registration-schedules"),
      requestJson<{ programs: ClassProgram[] }>("/api/class-programs"),
      requestJson<{ tracks: CurriculumTrack[] }>("/api/curriculum-tracks"),
      requestJson<{ methods: TeachingMethod[] }>("/api/teaching-methods"),
      requestJson<{ posts: Post[] }>("/api/posts"),
      requestJson<{ images: FacilityImage[] }>("/api/facility-images"),
      requestJson<{ teachers: TeacherTeamItem[] }>("/api/teacher-team"),
      requestJson<{ testimonials: Testimonial[] }>("/api/testimonials"),
      requestJson<{ categories: CategoryState }>("/api/categories"),
    ]);

    setData({
      banners: banners.slides,
      classes: classes.programs,
      curriculum: curriculum.tracks,
      teaching: teaching.methods,
      posts: posts.posts,
      facilities: facilities.images,
      teachers: teachers.teachers,
      testimonials: testimonials.testimonials,
      schedules: schedules.schedules,
    });
    setCategories(categoryResponse.categories);
    setRegistrationForm(registration.settings);
    setStatus("Đã tải dữ liệu.");
  }

  useEffect(() => {
    loadAll().catch((error) => setStatus(error.message));
  }, []);

  function resetSelection() {
    setSelected(null);
    setBannerForm(emptyBanner);
    setClassForm(emptyClass);
    setCurriculumForm(emptyCurriculum);
    setTeachingForm(emptyTeaching);
    setPostForm(emptyPost);
    setFacilityForm(emptyFacility);
    setTeacherForm(emptyTeacher);
    setTestimonialForm(emptyTestimonial);
    setScheduleForm(emptySchedule);
    if (tab === "registration") setRegistrationForm(emptyRegistrationSection);
    setNewCategoryName("");
  }

  function selectItem(item: any) {
    setSelected(item.id);

    if (tab === "banners") {
      setBannerForm({
        title: item.title ?? "",
        subtitle: item.subtitle ?? "",
        desktopImageId: item.desktopImageId ?? null,
        desktopImageUrl: item.desktopImageUrl ?? "",
        mobileImageId: item.mobileImageId ?? null,
        mobileImageUrl: item.mobileImageUrl ?? "",
        ctaLabel: item.ctaLabel ?? "",
        ctaHref: item.ctaHref ?? "",
      });
      return;
    }

    if (tab === "schedules") {
      setScheduleForm({
        requestedAt: toDateTimeLocal(item.requestedAt),
        status: item.status ?? "new",
        internalNote: item.internalNote ?? "",
      });
      return;
    }

    if (tab === "teaching") {
      setTeachingForm({
        slug: item.slug ?? "",
        title: item.title ?? "",
        category: item.category ?? "",
        description: item.description ?? "",
        excerpt: item.excerpt ?? "",
        imageId: item.imageId ?? null,
        imageUrl: item.imageUrl ?? "",
        backgroundHex: item.background ?? "#fffefa",
        contentText: (item.content ?? []).join("\n"),
      });
      return;
    }

    if (tab === "posts") {
      setPostForm({
        slug: item.slug ?? "",
        title: item.title ?? "",
        excerpt: item.excerpt ?? "",
        categorySlug: item.categorySlug ?? slugify(item.category ?? ""),
        categoryName: item.category ?? "",
        coverImageId: item.coverImageId ?? null,
        imageUrl: item.imageUrl ?? "",
        postType: item.postType ?? "news",
        status: "published",
        contentText: (item.content ?? []).join("\n"),
      });
      return;
    }

    if (tab === "about" && aboutMode === "facilities") {
      setFacilityForm({
        title: item.title ?? "",
        description: item.description ?? "",
        imageId: item.imageId ?? null,
        imageUrl: item.imageUrl ?? "",
      });
      return;
    }

    if (tab === "about" && aboutMode === "teachers") {
      setTeacherForm({
        title: item.title ?? "",
        description: item.description ?? "",
        imageId: item.imageId ?? null,
        imageUrl: item.imageUrl ?? "",
        colorHex: item.color ?? "#fffefa",
        shapeClass: item.shape ?? "rounded-[42px]",
        rotateClass: item.rotate ?? "",
      });
      return;
    }

    if (tab === "about" && aboutMode === "testimonials") {
      setTestimonialForm({
        parentName: item.parentName ?? "",
        studentName: item.studentName ?? "",
        avatarId: item.avatarId ?? null,
        avatarUrl: item.avatarUrl ?? "",
        quote: item.quote ?? "",
        rating: item.rating ? String(item.rating) : "5",
        reactionImageId: item.reactionImageId ?? null,
        reactionImageUrl: item.reactionImageUrl ?? "",
      });
      return;
    }

    if (programMode === "classes") {
      setClassForm({
        slug: item.slug ?? "",
        name: item.name ?? "",
        ageLabel: item.age ?? "",
        category: item.category ?? "",
        excerpt: item.excerpt ?? "",
        description: item.description ?? "",
        imageId: item.imageId ?? null,
        imageUrl: item.imageUrl ?? "",
        colorHex: item.color ?? "#fffefa",
        scheduleText: scheduleItemsToText(item.schedule ?? []),
      });
      return;
    }

    setCurriculumForm({
      slug: item.slug ?? "",
      title: item.title ?? "",
      category: item.category ?? "",
      description: item.description ?? "",
      imageId: item.imageId ?? null,
      imageUrl: item.imageUrl ?? "",
      contentText: (item.content ?? []).join("\n"),
    });
  }

  async function saveBanner(event: FormEvent) {
    event.preventDefault();
    setSaving(true);
    try {
      const body = {
        title: bannerForm.title,
        subtitle: bannerForm.subtitle,
        desktopImageId: bannerForm.desktopImageId,
        mobileImageId: bannerForm.mobileImageId,
        ctaLabel: bannerForm.ctaLabel,
        ctaHref: bannerForm.ctaHref,
      };
      await requestJson(selected ? `/api/hero-slides/${selected}` : "/api/hero-slides", {
        method: selected ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      resetSelection();
      await loadAll();
      setStatus("Đã lưu banner.");
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Không thể lưu banner.");
    } finally {
      setSaving(false);
    }
  }

  async function saveTeaching(event: FormEvent) {
    event.preventDefault();
    setSaving(true);
    try {
      const body = {
        slug: teachingForm.slug,
        title: teachingForm.title,
        category: teachingForm.category,
        description: teachingForm.description,
        excerpt: teachingForm.excerpt,
        imageId: teachingForm.imageId,
        backgroundHex: teachingForm.backgroundHex,
        content: richBlocks(teachingForm.contentText),
      };
      await requestJson(selected ? `/api/teaching-methods/${selected}` : "/api/teaching-methods", {
        method: selected ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      resetSelection();
      await loadAll();
      setStatus("Đã lưu phương pháp giảng dạy.");
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Không thể lưu.");
    } finally {
      setSaving(false);
    }
  }

  async function saveClass(event: FormEvent) {
    event.preventDefault();
    setSaving(true);
    try {
      const body = {
        slug: classForm.slug,
        name: classForm.name,
        ageLabel: classForm.ageLabel,
        category: classForm.category,
        excerpt: classForm.excerpt,
        description: classForm.description,
        colorHex: classForm.colorHex,
        imageId: classForm.imageId,
        schedule: scheduleTextToItems(classForm.scheduleText),
      };
      await requestJson(selected ? `/api/class-programs/${selected}` : "/api/class-programs", {
        method: selected ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      resetSelection();
      await loadAll();
      setStatus("Đã lưu khối lớp.");
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Không thể lưu.");
    } finally {
      setSaving(false);
    }
  }

  async function saveCurriculum(event: FormEvent) {
    event.preventDefault();
    setSaving(true);
    try {
      const body = {
        slug: curriculumForm.slug,
        title: curriculumForm.title,
        category: curriculumForm.category,
        description: curriculumForm.description,
        imageId: curriculumForm.imageId,
        content: richBlocks(curriculumForm.contentText),
      };
      await requestJson(selected ? `/api/curriculum-tracks/${selected}` : "/api/curriculum-tracks", {
        method: selected ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      resetSelection();
      await loadAll();
      setStatus("Đã lưu chương trình học.");
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Không thể lưu.");
    } finally {
      setSaving(false);
    }
  }

  async function savePost(event: FormEvent) {
    event.preventDefault();
    setSaving(true);
    try {
      const body = {
        slug: postForm.slug,
        title: postForm.title,
        excerpt: postForm.excerpt,
        categorySlug: postForm.categorySlug,
        categoryName: postForm.categoryName,
        coverImageId: postForm.coverImageId,
        postType: postForm.postType,
        status: postForm.status,
        content: richBlocks(postForm.contentText),
      };
      await requestJson(selected ? `/api/posts/${selected}` : "/api/posts", {
        method: selected ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      resetSelection();
      await loadAll();
      setStatus("Đã lưu tin tức/sự kiện.");
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Không thể lưu.");
    } finally {
      setSaving(false);
    }
  }

  async function saveFacility(event: FormEvent) {
    event.preventDefault();
    setSaving(true);
    try {
      const body = {
        title: facilityForm.title,
        description: facilityForm.description,
        imageId: facilityForm.imageId,
      };
      await requestJson(selected ? `/api/facility-images/${selected}` : "/api/facility-images", {
        method: selected ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      resetSelection();
      await loadAll();
      setStatus("Đã lưu ảnh cơ sở vật chất.");
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Không thể lưu ảnh cơ sở vật chất.");
    } finally {
      setSaving(false);
    }
  }

  async function saveTeacher(event: FormEvent) {
    event.preventDefault();
    setSaving(true);
    try {
      const body = {
        title: teacherForm.title,
        description: teacherForm.description,
        imageId: teacherForm.imageId,
        colorHex: teacherForm.colorHex,
        shapeClass: teacherForm.shapeClass,
        rotateClass: teacherForm.rotateClass,
      };
      await requestJson(selected ? `/api/teacher-team/${selected}` : "/api/teacher-team", {
        method: selected ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      resetSelection();
      await loadAll();
      setStatus("Đã lưu đội ngũ giáo viên.");
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Không thể lưu đội ngũ giáo viên.");
    } finally {
      setSaving(false);
    }
  }

  async function saveTestimonial(event: FormEvent) {
    event.preventDefault();
    setSaving(true);
    try {
      const body = {
        parentName: testimonialForm.parentName,
        studentName: testimonialForm.studentName,
        avatarId: testimonialForm.avatarId,
        quote: testimonialForm.quote,
        rating: testimonialForm.rating ? Number(testimonialForm.rating) : null,
        reactionImageId: testimonialForm.reactionImageId,
      };
      await requestJson(selected ? `/api/testimonials/${selected}` : "/api/testimonials", {
        method: selected ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      resetSelection();
      await loadAll();
      setStatus("Đã lưu chia sẻ phụ huynh.");
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Không thể lưu chia sẻ phụ huynh.");
    } finally {
      setSaving(false);
    }
  }

  async function saveRegistrationSection(event: FormEvent) {
    event.preventDefault();
    setSaving(true);
    try {
      const result = await requestJson<{ settings: RegistrationSectionSettings }>(
        "/api/home-sections/registration",
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(registrationForm),
        },
      );

      setRegistrationForm(result.settings);
      setStatus("Đã lưu khối đăng ký ưu đãi.");
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Không thể lưu khối đăng ký ưu đãi.");
    } finally {
      setSaving(false);
    }
  }

  async function saveSchedule(event: FormEvent) {
    event.preventDefault();
    if (!selected) {
      setStatus("Vui lòng chọn lịch đăng ký.");
      return;
    }

    setSaving(true);
    try {
      await requestJson(`/api/registration-schedules/${selected}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          status: scheduleForm.status,
          requestedAt: scheduleForm.requestedAt ? new Date(scheduleForm.requestedAt).toISOString() : null,
          internalNote: scheduleForm.internalNote,
        }),
      });

      resetSelection();
      await loadAll();
      setStatus("Đã cập nhật lịch đăng ký.");
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Không thể cập nhật lịch đăng ký.");
    } finally {
      setSaving(false);
    }
  }

  async function deleteSchedule() {
    if (!selectedSchedule) {
      setStatus("Vui lòng chọn lịch đăng ký cần xoá.");
      return;
    }

    const confirmed = window.confirm(
      `Xoá lịch đăng ký của "${selectedSchedule.parentName}"? Thao tác này sẽ xoá bản đăng ký khỏi danh sách.`,
    );
    if (!confirmed) return;

    setSaving(true);
    try {
      await requestJson(`/api/registration-schedules/${selectedSchedule.id}`, {
        method: "DELETE",
      });

      resetSelection();
      await loadAll();
      setStatus("Đã xoá lịch đăng ký.");
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Không thể xoá lịch đăng ký.");
    } finally {
      setSaving(false);
    }
  }

  async function archiveCurrent() {
    if (!selected) return;

    let url = `/api/teaching-methods/${selected}`;
    if (tab === "banners") {
      url = `/api/hero-slides/${selected}`;
    } else if (tab === "posts") {
      url = `/api/posts/${selected}`;
    } else if (tab === "about") {
      url =
        aboutMode === "facilities"
          ? `/api/facility-images/${selected}`
          : aboutMode === "teachers"
            ? `/api/teacher-team/${selected}`
            : `/api/testimonials/${selected}`;
    } else if (tab === "programs") {
      url = programMode === "classes" ? `/api/class-programs/${selected}` : `/api/curriculum-tracks/${selected}`;
    }

    setSaving(true);
    try {
      await requestJson(url, { method: "DELETE" });
      resetSelection();
      await loadAll();
      setStatus("Đã ẩn bản ghi.");
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Không thể xoá.");
    } finally {
      setSaving(false);
    }
  }

  function switchTab(nextTab: TabKey) {
    setTab(nextTab);
    resetSelection();
  }

  const activeCategory = useMemo(() => {
    if (tab === "teaching") {
      return {
        scope: "teaching_methods" as CategoryScope,
        options: categories.teachingMethods,
        value: slugify(teachingForm.category),
        onChange: (option: CategoryOption | null) =>
          setTeachingForm((form) => ({ ...form, category: option?.name ?? "" })),
      };
    }

    if (tab === "posts") {
      return {
        scope: "posts" as CategoryScope,
        options: categories.posts,
        value: postForm.categorySlug,
        onChange: (option: CategoryOption | null) =>
          setPostForm((form) => ({
            ...form,
            categorySlug: option?.slug ?? "",
            categoryName: option?.name ?? "",
          })),
      };
    }

    if (programMode === "classes") {
      return {
        scope: "class_programs" as CategoryScope,
        options: categories.classPrograms,
        value: slugify(classForm.category),
        onChange: (option: CategoryOption | null) =>
          setClassForm((form) => ({ ...form, category: option?.name ?? "" })),
      };
    }

    return {
      scope: "curriculum_tracks" as CategoryScope,
      options: categories.curriculumTracks,
      value: slugify(curriculumForm.category),
      onChange: (option: CategoryOption | null) =>
        setCurriculumForm((form) => ({ ...form, category: option?.name ?? "" })),
    };
  }, [categories, classForm.category, curriculumForm.category, postForm.categorySlug, programMode, tab, teachingForm.category]);

  const selectedSchedule = useMemo(
    () => data.schedules.find((item) => item.id === selected) ?? null,
    [data.schedules, selected],
  );

  async function addCurrentCategory() {
    if (!newCategoryName.trim()) {
      setStatus("Vui lòng nhập tên danh mục.");
      return;
    }

    setAddingCategory(true);
    try {
      const result = await requestJson<{ category: CategoryOption }>("/api/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          scope: activeCategory.scope,
          name: newCategoryName,
        }),
      });

      setNewCategoryName("");
      await loadAll();
      activeCategory.onChange(result.category);
      setStatus("Đã thêm danh mục.");
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Không thể thêm danh mục.");
    } finally {
      setAddingCategory(false);
    }
  }

  async function updateCurrentCategory() {
    const selectedOption = activeCategory.options.find((option) => option.slug === activeCategory.value);
    if (!selectedOption) {
      setStatus("Vui lòng chọn danh mục cần sửa.");
      return;
    }

    if (!newCategoryName.trim()) {
      setStatus("Vui lòng nhập tên danh mục mới.");
      return;
    }

    setAddingCategory(true);
    try {
      const result = await requestJson<{ category: CategoryOption }>(
        `/api/categories/${selectedOption.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            scope: activeCategory.scope,
            name: newCategoryName,
          }),
        },
      );

      await loadAll();
      activeCategory.onChange(result.category);
      setNewCategoryName(result.category.name);
      setStatus("Đã cập nhật danh mục.");
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Không thể cập nhật danh mục.");
    } finally {
      setAddingCategory(false);
    }
  }

  async function deleteCurrentCategory() {
    const selectedOption = activeCategory.options.find((option) => option.slug === activeCategory.value);
    if (!selectedOption) {
      setStatus("Vui lòng chọn danh mục cần xoá.");
      return;
    }

    const confirmed = window.confirm(`Xoá danh mục "${selectedOption.name}"?`);
    if (!confirmed) return;

    setAddingCategory(true);
    try {
      await requestJson(`/api/categories/${selectedOption.id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          scope: activeCategory.scope,
        }),
      });

      activeCategory.onChange(null);
      setNewCategoryName("");
      await loadAll();
      setStatus("Đã xoá danh mục.");
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Không thể xoá danh mục.");
    } finally {
      setAddingCategory(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#f4fbf2] text-[#620000]">
      <header className="border-b border-[#dbe7d8] bg-[#e8f3e6] px-8 py-6">
        <div className="mx-auto flex max-w-[1280px] items-center justify-between gap-6">
          <div>
            <p className="text-[13px] font-extrabold uppercase text-[#b80000]">Princeton Academy</p>
            <h1 className="mt-1 text-[34px] font-extrabold leading-tight">Quản lý nội dung</h1>
          </div>
          <ActionButton icon={<RefreshCw size={18} />} tone="quiet" onClick={() => loadAll()}>
            Tải lại
          </ActionButton>
        </div>
      </header>

      <div className="mx-auto grid max-w-[1280px] gap-6 px-8 py-8">
        <nav className="grid grid-cols-2 overflow-hidden rounded-md border border-[#cfe0cc] bg-[#e8f3e6] md:grid-cols-7">
          {[
            ["banners", "Banner Trang Chủ"],
            ["registration", "Đăng ký ưu đãi"],
            ["schedules", "Lịch đăng ký"],
            ["teaching", "Phương Pháp Giảng Dạy"],
            ["programs", "Chương Trình Học"],
            ["posts", "Tin Tức & Sự Kiện"],
            ["about", "Giới thiệu"],
          ].map(([key, label]) => (
            <button
              key={key}
              onClick={() => switchTab(key as TabKey)}
              className={`h-16 border-r border-[#cfe0cc] text-[18px] font-extrabold last:border-r-0 ${
                tab === key ? "bg-white text-[#b80000]" : "text-[#620000] hover:bg-white/60"
              }`}
            >
              {label}
            </button>
          ))}
        </nav>

        {tab === "programs" ? (
          <div className="flex gap-2">
            <button
              onClick={() => {
                setProgramMode("classes");
                resetSelection();
              }}
              className={`h-10 rounded-md border px-4 font-bold ${programMode === "classes" ? "border-[#b80000] bg-[#b80000] text-white" : "border-[#d9baba] bg-white"}`}
            >
              Khối lớp
            </button>
            <button
              onClick={() => {
                setProgramMode("curriculum");
                resetSelection();
              }}
              className={`h-10 rounded-md border px-4 font-bold ${programMode === "curriculum" ? "border-[#b80000] bg-[#b80000] text-white" : "border-[#d9baba] bg-white"}`}
            >
              Chương trình học
            </button>
          </div>
        ) : null}

        {tab === "about" ? (
          <div className="flex gap-2">
            <button
              onClick={() => {
                setAboutMode("facilities");
                resetSelection();
              }}
              className={`h-10 rounded-md border px-4 font-bold ${aboutMode === "facilities" ? "border-[#b80000] bg-[#b80000] text-white" : "border-[#d9baba] bg-white"}`}
            >
              Cơ sở vật chất
            </button>
            <button
              onClick={() => {
                setAboutMode("teachers");
                resetSelection();
              }}
              className={`h-10 rounded-md border px-4 font-bold ${aboutMode === "teachers" ? "border-[#b80000] bg-[#b80000] text-white" : "border-[#d9baba] bg-white"}`}
            >
              Đội ngũ giáo viên
            </button>
            <button
              onClick={() => {
                setAboutMode("testimonials");
                resetSelection();
              }}
              className={`h-10 rounded-md border px-4 font-bold ${aboutMode === "testimonials" ? "border-[#b80000] bg-[#b80000] text-white" : "border-[#d9baba] bg-white"}`}
            >
              Phụ huynh chia sẻ
            </button>
          </div>
        ) : null}

        <section className={tab === "registration" ? "grid gap-6" : "grid gap-6 lg:grid-cols-[390px_1fr]"}>
          {tab !== "registration" ? (
          <aside className="rounded-md border border-[#d9baba] bg-white">
            <div className="flex items-center justify-between border-b border-[#f0d9d9] px-4 py-3">
              <h2 className="text-[18px] font-extrabold">Danh sách</h2>
              {tab !== "schedules" ? (
                <ActionButton icon={<Plus size={17} />} tone="quiet" onClick={resetSelection}>
                  Mới
                </ActionButton>
              ) : null}
            </div>
            <div className="space-y-2 p-2">
              {currentList.map((item: any) => {
                const preview = getListPreview(item, tab, programMode, aboutMode);
                const isActive = selected === item.id;
                const isNewSchedule = tab === "schedules" && item.status === "new";

                return (
                  <button
                    key={item.id}
                    onClick={() => selectItem(item)}
                    className={`group relative flex w-full gap-3 rounded-[14px] border p-3 text-left transition-all hover:border-[#e8b6b6] hover:bg-[#fff8f8] hover:shadow-[0_8px_20px_rgba(98,0,0,0.08)] ${
                      isActive
                        ? "border-[#b80000] bg-[#fff1f1] shadow-[0_8px_20px_rgba(184,0,0,0.12)]"
                        : isNewSchedule
                          ? "border-[#b80000] bg-[#fff7f7] shadow-[0_8px_20px_rgba(184,0,0,0.10)]"
                          : "border-transparent bg-white"
                    }`}
                  >
                    {isNewSchedule ? (
                      <span className="absolute right-2 top-2 inline-flex h-6 w-6 items-center justify-center rounded-full bg-[#b80000] text-white shadow-[0_4px_10px_rgba(184,0,0,0.25)]">
                        <CheckCircle2 size={15} />
                      </span>
                    ) : null}
                    <span
                      className={`flex h-[58px] w-[58px] shrink-0 items-center justify-center overflow-hidden rounded-xl border text-[22px] font-extrabold text-[#b80000] ${
                        isNewSchedule ? "border-[#f0a8a8] bg-[#fff1f1]" : "border-[#f0d0d0]"
                      }`}
                      style={{ backgroundColor: preview.color }}
                    >
                      {preview.imageUrl ? (
                        <img src={preview.imageUrl} alt={preview.title} className="h-full w-full object-contain p-2" />
                      ) : (
                        preview.title.slice(0, 1).toUpperCase()
                      )}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="flex items-start justify-between gap-2">
                        <span className="max-h-[44px] overflow-hidden text-[16px] font-extrabold leading-[1.35] text-[#620000]">
                          {preview.title}
                        </span>
                        {isActive ? (
                          <span className="mt-0.5 shrink-0 rounded-full bg-[#b80000] px-2 py-1 text-[10px] font-extrabold uppercase text-white">
                            Chọn
                          </span>
                        ) : isNewSchedule ? (
                          <span className="mt-0.5 shrink-0 rounded-full bg-[#b80000] px-2 py-1 text-[10px] font-extrabold uppercase text-white">
                            Chưa xác nhận
                          </span>
                        ) : null}
                      </span>
                      <span className="mt-2 flex flex-wrap gap-1.5">
                        <span className="rounded-full bg-[#fff1f1] px-2 py-1 text-[10px] font-extrabold uppercase text-[#b80000]">
                          {preview.category}
                        </span>
                        <span className="rounded-full border border-[#efd0d0] bg-white px-2 py-1 text-[10px] font-bold text-[#9a4a4a]">
                          {preview.typeLabel}
                        </span>
                      </span>
                      <span className="mt-2 block max-h-[36px] overflow-hidden text-[12px] font-semibold leading-[18px] text-[#7e3d3d]">
                        {preview.description}
                      </span>
                      <span className="mt-2 block truncate font-mono text-[11px] font-semibold text-[#b36b6b]">
                        {item.slug ? `/${item.slug}` : `#${item.id}`}
                      </span>
                    </span>
                  </button>
                );
              })}
              {!currentList.length ? (
                <p className="px-3 py-8 text-center text-[14px] font-semibold text-[#9a4a4a]">
                  Chưa có dữ liệu.
                </p>
              ) : null}
            </div>
          </aside>
          ) : null}

          <section className="rounded-md border border-[#d9baba] bg-white p-5">
            <div className="mb-5 flex items-center justify-between gap-4">
              <div>
                <p className="text-[13px] font-extrabold uppercase text-[#b80000]">
                  {tab === "registration"
                    ? "Cấu hình"
                    : tab === "schedules"
                      ? selectedSchedule
                        ? "Đang xem"
                        : "Danh sách"
                      : selected
                        ? "Đang sửa"
                        : "Thêm mới"}
                </p>
                <h2 className="text-[24px] font-extrabold">
                  {tab === "banners"
                    ? "Banner trang chủ"
                    : tab === "registration"
                    ? "Đăng ký ưu đãi"
                    : tab === "schedules"
                    ? "Lịch đăng ký"
                    : tab === "teaching"
                    ? "Phương pháp giảng dạy"
                    : tab === "posts"
                      ? "Tin tức & sự kiện"
                      : tab === "about"
                        ? aboutMode === "facilities"
                          ? "Cơ sở vật chất"
                          : aboutMode === "teachers"
                            ? "Đội ngũ giáo viên"
                            : "Phụ huynh chia sẻ"
                      : programMode === "classes"
                        ? "Khối lớp"
                        : "Chương trình học"}
                </h2>
              </div>
              <div className="flex gap-2">
                {selectedSchedule && tab === "schedules" ? (
                  <ActionButton icon={<Trash2 size={17} />} tone="danger" onClick={deleteSchedule} disabled={saving}>
                    Xóa
                  </ActionButton>
                ) : null}
                {selected && tab !== "registration" && tab !== "schedules" ? (
                  <ActionButton icon={<Trash2 size={17} />} tone="danger" onClick={archiveCurrent} disabled={saving}>
                    Xóa
                  </ActionButton>
                ) : null}
                <ActionButton icon={<X size={17} />} tone="quiet" onClick={resetSelection}>
                  Xoá form
                </ActionButton>
              </div>
            </div>

            {tab === "registration" ? (
              <form className="grid gap-5" onSubmit={saveRegistrationSection}>
                <div className="grid gap-4 md:grid-cols-3">
                  <ToggleField
                    label="Hiển thị toàn bộ khối"
                    checked={registrationForm.isActive}
                    onChange={(value) => setRegistrationForm((form) => ({ ...form, isActive: value }))}
                  />
                  <ToggleField
                    label="Hiển thị countdown"
                    checked={registrationForm.showCountdown}
                    onChange={(value) => setRegistrationForm((form) => ({ ...form, showCountdown: value }))}
                  />
                  <ToggleField
                    label="Hiển thị ảnh ưu đãi"
                    checked={registrationForm.showPromoImage}
                    onChange={(value) => setRegistrationForm((form) => ({ ...form, showPromoImage: value }))}
                  />
                  <ToggleField
                    label="Hiển thị form"
                    checked={registrationForm.showForm}
                    onChange={(value) => setRegistrationForm((form) => ({ ...form, showForm: value }))}
                  />
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <Field
                    label="Tiêu đề"
                    value={registrationForm.title}
                    placeholder="ĐĂNG KÝ NHẬN ƯU ĐÃI NGAY"
                    onChange={(value) => setRegistrationForm((form) => ({ ...form, title: value }))}
                  />
                  <Field
                    label="Nhãn nút gửi"
                    value={registrationForm.submitLabel}
                    placeholder="Đăng ký ngay"
                    onChange={(value) => setRegistrationForm((form) => ({ ...form, submitLabel: value }))}
                  />
                  <Field
                    label="Màu nền"
                    type="color"
                    value={registrationForm.backgroundColor}
                    onChange={(value) => setRegistrationForm((form) => ({ ...form, backgroundColor: value }))}
                  />
                </div>

                <Field
                  label="Thời điểm kết thúc đếm ngược"
                  type="datetime-local"
                  value={registrationForm.countdownTargetAt}
                  onChange={(value) => setRegistrationForm((form) => ({ ...form, countdownTargetAt: value }))}
                />

                <TextArea
                  label="Nội dung xác nhận"
                  rows={5}
                  value={registrationForm.consentText}
                  onChange={(value) => setRegistrationForm((form) => ({ ...form, consentText: value }))}
                />

                <div className="grid gap-4 md:grid-cols-2">
                  <MediaField
                    label="Ảnh ưu đãi desktop"
                    assetId={registrationForm.promoDesktopImageId}
                    previewUrl={registrationForm.promoDesktopImageUrl}
                    alt={registrationForm.title}
                    onStatus={setStatus}
                    onUploaded={(asset) =>
                      setRegistrationForm((form) => ({
                        ...form,
                        promoDesktopImageId: asset.id,
                        promoDesktopImageUrl: asset.url,
                      }))
                    }
                    onDeleted={() =>
                      setRegistrationForm((form) => ({
                        ...form,
                        promoDesktopImageId: null,
                        promoDesktopImageUrl: "",
                      }))
                    }
                  />
                  <MediaField
                    label="Ảnh ưu đãi mobile"
                    assetId={registrationForm.promoMobileImageId}
                    previewUrl={registrationForm.promoMobileImageUrl}
                    alt={registrationForm.title}
                    onStatus={setStatus}
                    onUploaded={(asset) =>
                      setRegistrationForm((form) => ({
                        ...form,
                        promoMobileImageId: asset.id,
                        promoMobileImageUrl: asset.url,
                      }))
                    }
                    onDeleted={() =>
                      setRegistrationForm((form) => ({
                        ...form,
                        promoMobileImageId: null,
                        promoMobileImageUrl: "",
                      }))
                    }
                  />
                </div>

                <ActionButton
                  type="submit"
                  icon={registrationForm.isActive ? <Eye size={17} /> : <EyeOff size={17} />}
                  disabled={saving}
                >
                  Lưu khối đăng ký
                </ActionButton>
              </form>
            ) : null}

            {tab === "schedules" ? (
              selectedSchedule ? (
                <form className="grid gap-5" onSubmit={saveSchedule}>
                  <div className="grid gap-3 rounded-md border border-[#efd0d0] bg-[#fff8f8] p-4 md:grid-cols-2">
                    <div>
                      <p className="text-[12px] font-extrabold uppercase text-[#b80000]">Phụ huynh</p>
                      <p className="mt-1 text-[18px] font-extrabold">{selectedSchedule.parentName}</p>
                    </div>
                    <div>
                      <p className="text-[12px] font-extrabold uppercase text-[#b80000]">Liên hệ</p>
                      <p className="mt-1 text-[15px] font-bold">{selectedSchedule.phone}</p>
                      <p className="text-[14px] font-semibold text-[#7e3d3d]">{selectedSchedule.email || "Chưa có email"}</p>
                    </div>
                    <div>
                      <p className="text-[12px] font-extrabold uppercase text-[#b80000]">Khối lớp</p>
                      <p className="mt-1 text-[15px] font-bold">
                        {selectedSchedule.classProgramName || selectedSchedule.grade || "Chưa chọn"}
                      </p>
                    </div>
                    <div>
                      <p className="text-[12px] font-extrabold uppercase text-[#b80000]">Email xác nhận</p>
                      <p className="mt-1 text-[15px] font-bold uppercase">{selectedSchedule.emailStatus}</p>
                      {selectedSchedule.emailError ? (
                        <p className="mt-1 text-[12px] font-semibold text-red-600">{selectedSchedule.emailError}</p>
                      ) : null}
                    </div>
                    <div>
                      <p className="text-[12px] font-extrabold uppercase text-[#b80000]">Nguồn</p>
                      <p className="mt-1 text-[13px] font-semibold text-[#7e3d3d]">
                        {selectedSchedule.sourcePage || "/"} - {selectedSchedule.sourceDevice}
                      </p>
                    </div>
                    <div>
                      <p className="text-[12px] font-extrabold uppercase text-[#b80000]">Ngày tạo</p>
                      <p className="mt-1 text-[13px] font-semibold text-[#7e3d3d]">
                        {formatDateTime(selectedSchedule.createdAt)}
                      </p>
                    </div>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <Field
                      label="Thời gian tư vấn"
                      type="datetime-local"
                      value={scheduleForm.requestedAt}
                      onChange={(value) => setScheduleForm((form) => ({ ...form, requestedAt: value }))}
                    />
                    <label className="grid gap-1.5">
                      <span className="text-[13px] font-bold uppercase text-[#620000]">Trạng thái</span>
                      <select
                        value={scheduleForm.status}
                        onChange={(event) =>
                          setScheduleForm((form) => ({
                            ...form,
                            status: event.target.value as RegistrationScheduleStatus,
                          }))
                        }
                        className="h-11 rounded-md border border-[#e1b0b0] bg-white px-3 text-[15px] text-[#620000] outline-none focus:border-[#b80000]"
                      >
                        <option value="new">Mới</option>
                        <option value="confirmed">Đã xác nhận</option>
                        <option value="completed">Đã hoàn tất</option>
                        <option value="cancelled">Đã huỷ</option>
                        <option value="no_show">Không đến</option>
                      </select>
                    </label>
                  </div>

                  <TextArea
                    label="Ghi chú nội bộ"
                    rows={5}
                    value={scheduleForm.internalNote}
                    onChange={(value) => setScheduleForm((form) => ({ ...form, internalNote: value }))}
                  />

                  <ActionButton type="submit" icon={<CalendarClock size={17} />} disabled={saving}>
                    Lưu lịch đăng ký
                  </ActionButton>
                </form>
              ) : (
                <div className="rounded-md border border-dashed border-[#d9baba] bg-[#fffefa] px-5 py-10 text-center">
                  <p className="text-[18px] font-extrabold text-[#620000]">Chọn một lịch đăng ký để xem chi tiết.</p>
                  <p className="mt-2 text-[14px] font-semibold text-[#7e3d3d]">
                    Các đăng ký thành công sẽ tự xuất hiện trong danh sách bên trái.
                  </p>
                </div>
              )
            ) : null}

            {tab === "banners" ? (
              <form className="grid gap-4" onSubmit={saveBanner}>
                <div className="grid gap-4 md:grid-cols-2">
                  <Field
                    label="Tiêu đề banner"
                    value={bannerForm.title}
                    placeholder="Ưu đãi tuyển sinh"
                    onChange={(value) => setBannerForm((f) => ({ ...f, title: value }))}
                  />
                  <Field
                    label="Nhãn nút"
                    value={bannerForm.ctaLabel}
                    placeholder="Đăng ký ngay"
                    onChange={(value) => setBannerForm((f) => ({ ...f, ctaLabel: value }))}
                  />
                  <Field
                    label="Link nút"
                    value={bannerForm.ctaHref}
                    placeholder="/dang-ky"
                    onChange={(value) => setBannerForm((f) => ({ ...f, ctaHref: value }))}
                  />
                </div>
                <TextArea
                  label="Mô tả banner"
                  value={bannerForm.subtitle}
                  onChange={(value) => setBannerForm((f) => ({ ...f, subtitle: value }))}
                />
                <div className="grid gap-4 md:grid-cols-2">
                  <MediaField
                    label="Ảnh banner desktop"
                    assetId={bannerForm.desktopImageId}
                    previewUrl={bannerForm.desktopImageUrl}
                    alt={bannerForm.title}
                    onStatus={setStatus}
                    onUploaded={(asset) =>
                      setBannerForm((f) => ({ ...f, desktopImageId: asset.id, desktopImageUrl: asset.url }))
                    }
                    onDeleted={() => setBannerForm((f) => ({ ...f, desktopImageId: null, desktopImageUrl: "" }))}
                  />
                  <MediaField
                    label="Ảnh banner mobile"
                    assetId={bannerForm.mobileImageId}
                    previewUrl={bannerForm.mobileImageUrl}
                    alt={bannerForm.title}
                    onStatus={setStatus}
                    onUploaded={(asset) =>
                      setBannerForm((f) => ({ ...f, mobileImageId: asset.id, mobileImageUrl: asset.url }))
                    }
                    onDeleted={() => setBannerForm((f) => ({ ...f, mobileImageId: null, mobileImageUrl: "" }))}
                  />
                </div>
                <ActionButton type="submit" icon={selected ? <Edit3 size={17} /> : <Save size={17} />} disabled={saving}>
                  Lưu
                </ActionButton>
              </form>
            ) : null}

            {tab === "teaching" ? (
              <form className="grid gap-4" onSubmit={saveTeaching}>
                <div className="grid gap-4 md:grid-cols-2">
                  <Field label="Tiêu đề" value={teachingForm.title} onChange={(value) => setTeachingForm((f) => ({ ...f, title: value, slug: syncAutoSlug(f.slug, f.title, value) }))} />
                  <Field label="Slug" value={teachingForm.slug} onChange={(value) => setTeachingForm((f) => ({ ...f, slug: value }))} />
                  <Field label="Màu nền" type="color" value={teachingForm.backgroundHex} onChange={(value) => setTeachingForm((f) => ({ ...f, backgroundHex: value }))} />
                </div>
                <CategoryPicker
                  label="Danh mục"
                  value={activeCategory.value}
                  options={activeCategory.options}
                  addValue={newCategoryName}
                  onChange={activeCategory.onChange}
                  onAddValue={setNewCategoryName}
                  onAdd={addCurrentCategory}
                  onUpdate={updateCurrentCategory}
                  onDelete={deleteCurrentCategory}
                  disabled={addingCategory}
                />
                <MediaField
                  label="Ảnh/icon minh hoạ"
                  assetId={teachingForm.imageId}
                  previewUrl={teachingForm.imageUrl}
                  alt={teachingForm.title}
                  onStatus={setStatus}
                  onUploaded={(asset) =>
                    setTeachingForm((f) => ({ ...f, imageId: asset.id, imageUrl: asset.url }))
                  }
                  onDeleted={() => setTeachingForm((f) => ({ ...f, imageId: null, imageUrl: "" }))}
                />
                <TextArea label="Mô tả card" value={teachingForm.description} onChange={(value) => setTeachingForm((f) => ({ ...f, description: value }))} />
                <TextArea label="Tóm tắt chi tiết" value={teachingForm.excerpt} onChange={(value) => setTeachingForm((f) => ({ ...f, excerpt: value }))} />
                <TiptapRichTextEditor
                  label="Nội dung chi tiết"
                  value={teachingForm.contentText}
                  onChange={(value) => setTeachingForm((f) => ({ ...f, contentText: value }))}
                  onStatus={setStatus}
                />
                <ActionButton type="submit" icon={selected ? <Edit3 size={17} /> : <Save size={17} />} disabled={saving}>
                  Lưu
                </ActionButton>
              </form>
            ) : null}

            {tab === "programs" && programMode === "classes" ? (
              <form className="grid gap-4" onSubmit={saveClass}>
                <div className="grid gap-4 md:grid-cols-2">
                  <Field label="Tên lớp" value={classForm.name} onChange={(value) => setClassForm((f) => ({ ...f, name: value, slug: syncAutoSlug(f.slug, f.name, value) }))} />
                  <Field label="Slug" value={classForm.slug} onChange={(value) => setClassForm((f) => ({ ...f, slug: value }))} />
                  <Field label="Độ tuổi hiển thị" value={classForm.ageLabel} placeholder="2 - 3 tuổi" onChange={(value) => setClassForm((f) => ({ ...f, ageLabel: value }))} />
                  <Field label="Màu card" type="color" value={classForm.colorHex} onChange={(value) => setClassForm((f) => ({ ...f, colorHex: value }))} />
                </div>
                <CategoryPicker
                  label="Danh mục"
                  value={activeCategory.value}
                  options={activeCategory.options}
                  addValue={newCategoryName}
                  onChange={activeCategory.onChange}
                  onAddValue={setNewCategoryName}
                  onAdd={addCurrentCategory}
                  onUpdate={updateCurrentCategory}
                  onDelete={deleteCurrentCategory}
                  disabled={addingCategory}
                />
                <MediaField
                  label="Ảnh khối lớp"
                  assetId={classForm.imageId}
                  previewUrl={classForm.imageUrl}
                  alt={classForm.name}
                  onStatus={setStatus}
                  onUploaded={(asset) =>
                    setClassForm((f) => ({ ...f, imageId: asset.id, imageUrl: asset.url }))
                  }
                  onDeleted={() => setClassForm((f) => ({ ...f, imageId: null, imageUrl: "" }))}
                />
                <TextArea label="Mô tả ngắn" value={classForm.excerpt} onChange={(value) => setClassForm((f) => ({ ...f, excerpt: value }))} />
                <TiptapRichTextEditor
                  label="Mô tả chi tiết"
                  value={classForm.description}
                  onChange={(value) => setClassForm((f) => ({ ...f, description: value }))}
                  onStatus={setStatus}
                />
                <ScheduleActivitiesEditor
                  label="Lịch học"
                  value={classForm.scheduleText}
                  onChange={(value) => setClassForm((f) => ({ ...f, scheduleText: value }))}
                  onStatus={setStatus}
                />
                <ActionButton type="submit" icon={selected ? <Edit3 size={17} /> : <Save size={17} />} disabled={saving}>
                  Lưu
                </ActionButton>
              </form>
            ) : null}

            {tab === "programs" && programMode === "curriculum" ? (
              <form className="grid gap-4" onSubmit={saveCurriculum}>
                <div className="grid gap-4 md:grid-cols-2">
                  <Field label="Tiêu đề" value={curriculumForm.title} onChange={(value) => setCurriculumForm((f) => ({ ...f, title: value, slug: syncAutoSlug(f.slug, f.title, value) }))} />
                  <Field label="Slug" value={curriculumForm.slug} onChange={(value) => setCurriculumForm((f) => ({ ...f, slug: value }))} />
                </div>
                <CategoryPicker
                  label="Danh mục"
                  value={activeCategory.value}
                  options={activeCategory.options}
                  addValue={newCategoryName}
                  onChange={activeCategory.onChange}
                  onAddValue={setNewCategoryName}
                  onAdd={addCurrentCategory}
                  onUpdate={updateCurrentCategory}
                  onDelete={deleteCurrentCategory}
                  disabled={addingCategory}
                />
                <MediaField
                  label="Ảnh chương trình"
                  assetId={curriculumForm.imageId}
                  previewUrl={curriculumForm.imageUrl}
                  alt={curriculumForm.title}
                  onStatus={setStatus}
                  onUploaded={(asset) =>
                    setCurriculumForm((f) => ({ ...f, imageId: asset.id, imageUrl: asset.url }))
                  }
                  onDeleted={() => setCurriculumForm((f) => ({ ...f, imageId: null, imageUrl: "" }))}
                />
                <TextArea label="Mô tả" value={curriculumForm.description} onChange={(value) => setCurriculumForm((f) => ({ ...f, description: value }))} />
                <TiptapRichTextEditor
                  label="Nội dung chương trình"
                  value={curriculumForm.contentText}
                  onChange={(value) => setCurriculumForm((f) => ({ ...f, contentText: value }))}
                  onStatus={setStatus}
                />
                <ActionButton type="submit" icon={selected ? <Edit3 size={17} /> : <Save size={17} />} disabled={saving}>
                  Lưu
                </ActionButton>
              </form>
            ) : null}

            {tab === "posts" ? (
              <form className="grid gap-4" onSubmit={savePost}>
                <div className="grid gap-4 md:grid-cols-2">
                  <Field label="Tiêu đề" value={postForm.title} onChange={(value) => setPostForm((f) => ({ ...f, title: value, slug: syncAutoSlug(f.slug, f.title, value) }))} />
                  <Field label="Slug" value={postForm.slug} onChange={(value) => setPostForm((f) => ({ ...f, slug: value }))} />
                  <label className="grid gap-1.5">
                    <span className="text-[13px] font-bold uppercase text-[#620000]">Loại bài</span>
                    <select
                      value={postForm.postType}
                      onChange={(event) => setPostForm((f) => ({ ...f, postType: event.target.value as PostType }))}
                      className="h-11 rounded-md border border-[#e1b0b0] bg-white px-3 text-[15px] text-[#620000] outline-none focus:border-[#b80000]"
                    >
                      <option value="news">Tin tức</option>
                      <option value="event">Sự kiện</option>
                      <option value="activity">Hoạt động</option>
                    </select>
                  </label>
                </div>
                <CategoryPicker
                  label="Danh mục"
                  value={activeCategory.value}
                  options={activeCategory.options}
                  addValue={newCategoryName}
                  onChange={activeCategory.onChange}
                  onAddValue={setNewCategoryName}
                  onAdd={addCurrentCategory}
                  onUpdate={updateCurrentCategory}
                  onDelete={deleteCurrentCategory}
                  disabled={addingCategory}
                />
                <MediaField
                  label="Ảnh bìa"
                  assetId={postForm.coverImageId}
                  previewUrl={postForm.imageUrl}
                  alt={postForm.title}
                  onStatus={setStatus}
                  onUploaded={(asset) =>
                    setPostForm((f) => ({ ...f, coverImageId: asset.id, imageUrl: asset.url }))
                  }
                  onDeleted={() => setPostForm((f) => ({ ...f, coverImageId: null, imageUrl: "" }))}
                />
                <TextArea label="Tóm tắt" value={postForm.excerpt} onChange={(value) => setPostForm((f) => ({ ...f, excerpt: value }))} />
                <TiptapRichTextEditor
                  label="Nội dung tin tức/sự kiện"
                  value={postForm.contentText}
                  onChange={(value) => setPostForm((f) => ({ ...f, contentText: value }))}
                  onStatus={setStatus}
                />
                <ActionButton type="submit" icon={selected ? <Edit3 size={17} /> : <Save size={17} />} disabled={saving}>
                  Lưu
                </ActionButton>
              </form>
            ) : null}

            {tab === "about" && aboutMode === "facilities" ? (
              <form className="grid gap-4" onSubmit={saveFacility}>
                <div className="grid gap-4 md:grid-cols-2">
                  <Field
                    label="Tiêu đề ảnh"
                    value={facilityForm.title}
                    placeholder="Phòng vận động"
                    onChange={(value) => setFacilityForm((f) => ({ ...f, title: value }))}
                  />
                  <Field
                    label="Mô tả ngắn"
                    value={facilityForm.description}
                    placeholder="Không gian vận động, lớp học..."
                    onChange={(value) => setFacilityForm((f) => ({ ...f, description: value }))}
                  />
                </div>
                <MediaField
                  label="Ảnh cơ sở vật chất"
                  assetId={facilityForm.imageId}
                  previewUrl={facilityForm.imageUrl}
                  alt={facilityForm.title}
                  onStatus={setStatus}
                  onUploaded={(asset) =>
                    setFacilityForm((f) => ({ ...f, imageId: asset.id, imageUrl: asset.url }))
                  }
                  onDeleted={() => setFacilityForm((f) => ({ ...f, imageId: null, imageUrl: "" }))}
                />
                <ActionButton type="submit" icon={selected ? <Edit3 size={17} /> : <Save size={17} />} disabled={saving}>
                  Lưu
                </ActionButton>
              </form>
            ) : null}

            {tab === "about" && aboutMode === "teachers" ? (
              <form className="grid gap-4" onSubmit={saveTeacher}>
                <div className="grid gap-4 md:grid-cols-2">
                  <Field
                    label="Tiêu đề"
                    value={teacherForm.title}
                    placeholder="Giáo viên chủ nhiệm"
                    onChange={(value) => setTeacherForm((f) => ({ ...f, title: value }))}
                  />
                  <Field
                    label="Màu nền card"
                    type="color"
                    value={teacherForm.colorHex}
                    onChange={(value) => setTeacherForm((f) => ({ ...f, colorHex: value }))}
                  />
                </div>
                <TeacherCardStylePicker
                  shapeClass={teacherForm.shapeClass}
                  rotateClass={teacherForm.rotateClass}
                  colorHex={teacherForm.colorHex}
                  onChange={(value) =>
                    setTeacherForm((f) => ({
                      ...f,
                      shapeClass: value.shapeClass,
                      rotateClass: value.rotateClass,
                    }))
                  }
                />
                <MediaField
                  label="Ảnh/icon giáo viên"
                  assetId={teacherForm.imageId}
                  previewUrl={teacherForm.imageUrl}
                  alt={teacherForm.title}
                  onStatus={setStatus}
                  onUploaded={(asset) =>
                    setTeacherForm((f) => ({ ...f, imageId: asset.id, imageUrl: asset.url }))
                  }
                  onDeleted={() => setTeacherForm((f) => ({ ...f, imageId: null, imageUrl: "" }))}
                />
                <TextArea
                  label="Mô tả"
                  value={teacherForm.description}
                  onChange={(value) => setTeacherForm((f) => ({ ...f, description: value }))}
                />
                <TeacherCardPreview
                  title={teacherForm.title}
                  description={teacherForm.description}
                  imageUrl={teacherForm.imageUrl}
                  colorHex={teacherForm.colorHex}
                  shapeClass={teacherForm.shapeClass}
                  rotateClass={teacherForm.rotateClass}
                />
                <ActionButton type="submit" icon={selected ? <Edit3 size={17} /> : <Save size={17} />} disabled={saving}>
                  Lưu
                </ActionButton>
              </form>
            ) : null}

            {tab === "about" && aboutMode === "testimonials" ? (
              <form className="grid gap-4" onSubmit={saveTestimonial}>
                <div className="grid gap-4 md:grid-cols-2">
                  <Field
                    label="Tên phụ huynh"
                    value={testimonialForm.parentName}
                    placeholder="Phụ huynh T.H.G"
                    onChange={(value) => setTestimonialForm((f) => ({ ...f, parentName: value }))}
                  />
                  <Field
                    label="Tên bé"
                    value={testimonialForm.studentName}
                    placeholder="Có thể bỏ trống"
                    onChange={(value) => setTestimonialForm((f) => ({ ...f, studentName: value }))}
                  />
                  <Field
                    label="Đánh giá"
                    type="number"
                    value={testimonialForm.rating}
                    placeholder="5"
                    onChange={(value) => setTestimonialForm((f) => ({ ...f, rating: value }))}
                  />
                </div>
                <MediaField
                  label="Ảnh đại diện phụ huynh"
                  assetId={testimonialForm.avatarId}
                  previewUrl={testimonialForm.avatarUrl}
                  alt={testimonialForm.parentName}
                  onStatus={setStatus}
                  onUploaded={(asset) =>
                    setTestimonialForm((f) => ({ ...f, avatarId: asset.id, avatarUrl: asset.url }))
                  }
                  onDeleted={() => setTestimonialForm((f) => ({ ...f, avatarId: null, avatarUrl: "" }))}
                />
                <TextArea
                  label="Nội dung chia sẻ"
                  rows={8}
                  value={testimonialForm.quote}
                  onChange={(value) => setTestimonialForm((f) => ({ ...f, quote: value }))}
                />
                <ActionButton type="submit" icon={selected ? <Edit3 size={17} /> : <Save size={17} />} disabled={saving}>
                  Lưu
                </ActionButton>
              </form>
            ) : null}
          </section>
        </section>

        {status ? (
          <p className="rounded-md border border-[#d9baba] bg-white px-4 py-3 text-[14px] font-semibold text-[#620000]">
            {status}
          </p>
        ) : null}
      </div>
    </main>
  );
}
