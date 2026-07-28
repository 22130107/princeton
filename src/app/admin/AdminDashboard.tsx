"use client";

import { FormEvent, type MouseEvent, type ReactNode, useEffect, useMemo, useRef, useState } from "react";
import { Edit3, Eye, FileText, ImagePlus, List, ListOrdered, Maximize2, Minimize2, Plus, RefreshCw, Save, Trash2, Video, X } from "lucide-react";

type TabKey = "banners" | "teaching" | "programs" | "posts" | "about";
type ProgramMode = "classes" | "curriculum";
type AboutMode = "facilities" | "teachers" | "testimonials";
type CategoryScope = "teaching_methods" | "class_programs" | "curriculum_tracks" | "posts";

type CategoryOption = {
  id: number;
  slug: string;
  name: string;
  scope: CategoryScope;
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

type LoadState = {
  banners: HeroSlide[];
  classes: ClassProgram[];
  curriculum: CurriculumTrack[];
  teaching: TeachingMethod[];
  posts: Post[];
  facilities: FacilityImage[];
  teachers: TeacherTeamItem[];
  testimonials: Testimonial[];
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
  ageMin: string;
  ageMax: string;
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

const emptyClass: ClassForm = {
  slug: "",
  name: "",
  ageLabel: "",
  ageMin: "",
  ageMax: "",
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

function slugify(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
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
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="h-11 rounded-md border border-[#e1b0b0] bg-white px-3 text-[15px] text-[#620000] outline-none focus:border-[#b80000]"
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
          value={value}
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
          value={addValue}
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
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        rows={rows}
        className="resize-y rounded-md border border-[#e1b0b0] bg-white px-4 py-3 text-[15px] leading-7 text-[#620000] outline-none focus:border-[#b80000]"
      />
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

function RichTextEditor({
  label,
  value,
  onChange,
  placeholder,
  onStatus,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  onStatus: (message: string) => void;
}) {
  const editorRef = useRef<HTMLDivElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const [expanded, setExpanded] = useState(false);
  const [preview, setPreview] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [selectedMedia, setSelectedMedia] = useState<RichMediaElement | null>(null);
  const textValue = value.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
  const wordsCount = textValue ? textValue.split(" ").length : 0;

  useEffect(() => {
    const editor = editorRef.current;
    if (!editor || document.activeElement === editor) return;
    const next = looksLikeHtml(value) ? value : plainTextToHtml(value);
    if (editor.innerHTML !== next) {
      editor.innerHTML = next;
    }
  }, [value]);

  function emit() {
    const html = editorRef.current?.innerHTML ?? "";
    onChange(html.trim());
  }

  function focusEditor() {
    editorRef.current?.focus();
  }

  function runCommand(command: string, commandValue?: string) {
    focusEditor();
    document.execCommand(command, false, commandValue);
    emit();
  }

  function insertHtml(html: string) {
    focusEditor();
    document.execCommand("insertHTML", false, html);
    emit();
  }

  async function uploadEditorImage(file: File | undefined) {
    if (!file) return;

    setUploading(true);
    try {
      const result = await uploadMedia(file, label);
      insertHtml(
        `<img src="${result.asset.url}" alt="${htmlEscape(result.asset.alt)}" style="display:block;width:70%;max-width:100%;height:auto;margin:18px auto;border-radius:16px;" />`,
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
      `<iframe src="${htmlEscape(src)}" style="display:block;width:70%;max-width:100%;height:360px;margin:18px auto;border:0;border-radius:16px;" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe><p><br></p>`,
    );
    onStatus("Đã nhúng video vào nội dung.");
  }

  function resizeSelectedMedia(delta: number) {
    if (!selectedMedia || !editorRef.current?.contains(selectedMedia)) return;
    const current = Number.parseFloat(selectedMedia.style.width || "70");
    const next = Math.max(25, Math.min(100, current + delta));
    selectedMedia.style.width = `${next}%`;
    selectedMedia.style.maxWidth = "100%";
    if (selectedMedia.tagName === "IMG") {
      selectedMedia.style.height = "auto";
    }
    emit();
  }

  function alignSelectedMedia(position: "left" | "center" | "right") {
    if (!selectedMedia || !editorRef.current?.contains(selectedMedia)) return;
    selectedMedia.style.display = "block";
    selectedMedia.style.marginTop = "18px";
    selectedMedia.style.marginBottom = "18px";
    selectedMedia.style.marginLeft = position === "left" ? "0" : position === "center" ? "auto" : "auto";
    selectedMedia.style.marginRight = position === "right" ? "0" : position === "center" ? "auto" : "auto";
    emit();
  }

  function pickMedia(event: MouseEvent<HTMLDivElement>) {
    const target = event.target as HTMLElement;
    const media = target.closest("img, iframe");
    setSelectedMedia(media instanceof HTMLImageElement || media instanceof HTMLIFrameElement ? media : null);
  }

  const toolbar = (
    <div className="flex flex-wrap items-center gap-2 rounded-t-md border border-[#e1b0b0] border-b-0 bg-[#fff8f8] p-2">
      <EditorButton icon={<FileText size={16} />} onClick={() => runCommand("formatBlock", "h2")}>
        Tiêu đề
      </EditorButton>
      <EditorButton icon={<span className="text-[15px]">B</span>} onClick={() => runCommand("bold")}>
        Đậm
      </EditorButton>
      <EditorButton icon={<span className="text-[15px] italic">I</span>} onClick={() => runCommand("italic")}>
        Nghiêng
      </EditorButton>
      <EditorButton icon={<span className="text-[15px] underline">U</span>} onClick={() => runCommand("underline")}>
        Gạch chân
      </EditorButton>
      <EditorButton icon={<List size={16} />} onClick={() => runCommand("insertUnorderedList")}>
        Bullet
      </EditorButton>
      <EditorButton icon={<ListOrdered size={16} />} onClick={() => runCommand("insertOrderedList")}>
        Số thứ tự
      </EditorButton>
      <EditorButton icon={<ImagePlus size={16} />} onClick={() => fileRef.current?.click()}>
        {uploading ? "Đang tải" : "Chèn ảnh"}
      </EditorButton>
      <EditorButton icon={<Video size={16} />} onClick={insertVideo}>
        Nhúng video
      </EditorButton>
      <span className="ml-auto flex items-center gap-2">
        <EditorButton icon={<Eye size={16} />} active={preview} onClick={() => setPreview((current) => !current)}>
          Preview
        </EditorButton>
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
      {preview ? (
        <div
          className={`${expanded ? "min-h-0 flex-1 overflow-auto" : "min-h-[320px]"} rich-admin-content rounded-b-md border border-[#e1b0b0] bg-white px-5 py-4 text-[16px] leading-8 text-[#620000]`}
          dangerouslySetInnerHTML={{ __html: value || `<p class="text-[#b36b6b]">${placeholder || "Chưa có nội dung."}</p>` }}
        />
      ) : (
        <div
          ref={editorRef}
          role="textbox"
          aria-label={label}
          contentEditable
          suppressContentEditableWarning
          onInput={emit}
          onClick={pickMedia}
          className={`${expanded ? "min-h-0 flex-1 overflow-auto" : "min-h-[320px]"} rich-admin-content rounded-b-md border border-[#e1b0b0] bg-white px-5 py-4 text-[16px] leading-8 text-[#620000] outline-none focus:border-[#b80000]`}
        />
      )}
      <div className="flex flex-wrap justify-between gap-2 rounded-b-md border-x border-b border-[#f0d0d0] bg-[#fffefa] px-3 py-2 text-[12px] font-semibold text-[#9a4a4a]">
        <span>{wordsCount} từ</span>
        <span>{value.length} ký tự HTML</span>
        <span>Bấm ảnh/video rồi dùng nút thu nhỏ/phóng to</span>
      </div>
      <style jsx global>{`
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
        .rich-admin-content ul,
        .rich-admin-content ol {
          margin: 0 0 1rem 1.4rem;
          padding-left: 1rem;
        }
        .rich-admin-content img,
        .rich-admin-content iframe {
          cursor: pointer;
          outline-offset: 5px;
        }
        .rich-admin-content img:hover,
        .rich-admin-content iframe:hover {
          outline: 2px dashed #b80000;
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

function MediaField({
  label,
  previewUrl,
  alt,
  onUploaded,
  onStatus,
}: {
  label: string;
  previewUrl: string;
  alt: string;
  onUploaded: (asset: { id: number; url: string }) => void;
  onStatus: (message: string) => void;
}) {
  const [uploading, setUploading] = useState(false);

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
        <label className="flex min-h-[116px] cursor-pointer flex-col items-center justify-center gap-2 rounded-md border border-dashed border-[#d9baba] bg-white px-4 text-center transition-colors hover:bg-[#fff1f1]">
          <ImagePlus size={20} className="text-[#b80000]" />
          <span className="text-[15px] font-extrabold text-[#620000]">
            {uploading ? "Đang upload..." : "Chọn ảnh/icon"}
          </span>
          <span className="text-[13px] font-semibold text-[#9a4a4a]">JPG, PNG, WebP hoặc SVG, tối đa 8MB</span>
          <input
            type="file"
            accept="image/png,image/jpeg,image/webp,image/svg+xml"
            disabled={uploading}
            onChange={(event) => handleFile(event.target.files?.[0])}
            className="sr-only"
          />
        </label>
      </div>
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
  const category = tab === "banners" ? "Trang chủ" : item.category || item.categoryName || "Chưa phân loại";
  const description =
    tab === "banners"
      ? item.subtitle || item.ctaLabel || "Banner trang chủ"
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
  });
  const [selected, setSelected] = useState<number | null>(null);
  const [status, setStatus] = useState("");
  const [saving, setSaving] = useState(false);
  const [addingCategory, setAddingCategory] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [categories, setCategories] = useState<CategoryState>(emptyCategories);

  const [bannerForm, setBannerForm] = useState(emptyBanner);
  const [classForm, setClassForm] = useState(emptyClass);
  const [curriculumForm, setCurriculumForm] = useState(emptyCurriculum);
  const [teachingForm, setTeachingForm] = useState(emptyTeaching);
  const [postForm, setPostForm] = useState(emptyPost);
  const [facilityForm, setFacilityForm] = useState(emptyFacility);
  const [teacherForm, setTeacherForm] = useState(emptyTeacher);
  const [testimonialForm, setTestimonialForm] = useState(emptyTestimonial);

  const currentList = useMemo(() => {
    if (tab === "banners") return data.banners;
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
    const [banners, classes, curriculum, teaching, posts, facilities, teachers, testimonials, categoryResponse] = await Promise.all([
      requestJson<{ slides: HeroSlide[] }>("/api/hero-slides"),
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
    });
    setCategories(categoryResponse.categories);
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
        ageMin: "",
        ageMax: "",
        category: item.category ?? "",
        excerpt: item.excerpt ?? "",
        description: item.description ?? "",
        imageId: item.imageId ?? null,
        imageUrl: item.imageUrl ?? "",
        colorHex: item.color ?? "#fffefa",
        scheduleText: (item.schedule ?? []).join("\n"),
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
        ageMin: classForm.ageMin ? Number(classForm.ageMin) : null,
        ageMax: classForm.ageMax ? Number(classForm.ageMax) : null,
        category: classForm.category,
        excerpt: classForm.excerpt,
        description: classForm.description,
        colorHex: classForm.colorHex,
        imageId: classForm.imageId,
        schedule: lines(classForm.scheduleText),
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
        <nav className="grid grid-cols-2 overflow-hidden rounded-md border border-[#cfe0cc] bg-[#e8f3e6] md:grid-cols-5">
          {[
            ["banners", "Banner Trang Chủ"],
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

        <section className="grid gap-6 lg:grid-cols-[390px_1fr]">
          <aside className="rounded-md border border-[#d9baba] bg-white">
            <div className="flex items-center justify-between border-b border-[#f0d9d9] px-4 py-3">
              <h2 className="text-[18px] font-extrabold">Danh sách</h2>
              <ActionButton icon={<Plus size={17} />} tone="quiet" onClick={resetSelection}>
                Mới
              </ActionButton>
            </div>
            <div className="space-y-2 p-2">
              {currentList.map((item: any) => {
                const preview = getListPreview(item, tab, programMode, aboutMode);
                const isActive = selected === item.id;

                return (
                  <button
                    key={item.id}
                    onClick={() => selectItem(item)}
                    className={`group flex w-full gap-3 rounded-[14px] border p-3 text-left transition-all hover:border-[#e8b6b6] hover:bg-[#fff8f8] hover:shadow-[0_8px_20px_rgba(98,0,0,0.08)] ${
                      isActive ? "border-[#b80000] bg-[#fff1f1] shadow-[0_8px_20px_rgba(184,0,0,0.12)]" : "border-transparent bg-white"
                    }`}
                  >
                    <span
                      className="flex h-[58px] w-[58px] shrink-0 items-center justify-center overflow-hidden rounded-xl border border-[#f0d0d0] text-[22px] font-extrabold text-[#b80000]"
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

          <section className="rounded-md border border-[#d9baba] bg-white p-5">
            <div className="mb-5 flex items-center justify-between gap-4">
              <div>
                <p className="text-[13px] font-extrabold uppercase text-[#b80000]">
                  {selected ? "Đang sửa" : "Thêm mới"}
                </p>
                <h2 className="text-[24px] font-extrabold">
                  {tab === "banners"
                    ? "Banner trang chủ"
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
                {selected ? (
                  <ActionButton icon={<Trash2 size={17} />} tone="danger" onClick={archiveCurrent} disabled={saving}>
                    Ẩn
                  </ActionButton>
                ) : null}
                <ActionButton icon={<X size={17} />} tone="quiet" onClick={resetSelection}>
                  Xoá form
                </ActionButton>
              </div>
            </div>

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
                    previewUrl={bannerForm.desktopImageUrl}
                    alt={bannerForm.title}
                    onStatus={setStatus}
                    onUploaded={(asset) =>
                      setBannerForm((f) => ({ ...f, desktopImageId: asset.id, desktopImageUrl: asset.url }))
                    }
                  />
                  <MediaField
                    label="Ảnh banner mobile"
                    previewUrl={bannerForm.mobileImageUrl}
                    alt={bannerForm.title}
                    onStatus={setStatus}
                    onUploaded={(asset) =>
                      setBannerForm((f) => ({ ...f, mobileImageId: asset.id, mobileImageUrl: asset.url }))
                    }
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
                  <Field label="Tiêu đề" value={teachingForm.title} onChange={(value) => setTeachingForm((f) => ({ ...f, title: value, slug: f.slug || slugify(value) }))} />
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
                  previewUrl={teachingForm.imageUrl}
                  alt={teachingForm.title}
                  onStatus={setStatus}
                  onUploaded={(asset) =>
                    setTeachingForm((f) => ({ ...f, imageId: asset.id, imageUrl: asset.url }))
                  }
                />
                <TextArea label="Mô tả card" value={teachingForm.description} onChange={(value) => setTeachingForm((f) => ({ ...f, description: value }))} />
                <TextArea label="Tóm tắt chi tiết" value={teachingForm.excerpt} onChange={(value) => setTeachingForm((f) => ({ ...f, excerpt: value }))} />
                <RichTextEditor
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
                  <Field label="Tên lớp" value={classForm.name} onChange={(value) => setClassForm((f) => ({ ...f, name: value, slug: f.slug || slugify(value) }))} />
                  <Field label="Slug" value={classForm.slug} onChange={(value) => setClassForm((f) => ({ ...f, slug: value }))} />
                  <Field label="Độ tuổi hiển thị" value={classForm.ageLabel} placeholder="2 - 3 tuổi" onChange={(value) => setClassForm((f) => ({ ...f, ageLabel: value }))} />
                  <Field label="Từ tuổi" type="number" value={classForm.ageMin} onChange={(value) => setClassForm((f) => ({ ...f, ageMin: value }))} />
                  <Field label="Đến tuổi" type="number" value={classForm.ageMax} onChange={(value) => setClassForm((f) => ({ ...f, ageMax: value }))} />
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
                  previewUrl={classForm.imageUrl}
                  alt={classForm.name}
                  onStatus={setStatus}
                  onUploaded={(asset) =>
                    setClassForm((f) => ({ ...f, imageId: asset.id, imageUrl: asset.url }))
                  }
                />
                <TextArea label="Mô tả ngắn" value={classForm.excerpt} onChange={(value) => setClassForm((f) => ({ ...f, excerpt: value }))} />
                <TextArea label="Mô tả chi tiết" value={classForm.description} onChange={(value) => setClassForm((f) => ({ ...f, description: value }))} />
                <TextArea label="Lịch học, mỗi dòng là một hoạt động" rows={6} value={classForm.scheduleText} onChange={(value) => setClassForm((f) => ({ ...f, scheduleText: value }))} />
                <ActionButton type="submit" icon={selected ? <Edit3 size={17} /> : <Save size={17} />} disabled={saving}>
                  Lưu
                </ActionButton>
              </form>
            ) : null}

            {tab === "programs" && programMode === "curriculum" ? (
              <form className="grid gap-4" onSubmit={saveCurriculum}>
                <div className="grid gap-4 md:grid-cols-2">
                  <Field label="Tiêu đề" value={curriculumForm.title} onChange={(value) => setCurriculumForm((f) => ({ ...f, title: value, slug: f.slug || slugify(value) }))} />
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
                  previewUrl={curriculumForm.imageUrl}
                  alt={curriculumForm.title}
                  onStatus={setStatus}
                  onUploaded={(asset) =>
                    setCurriculumForm((f) => ({ ...f, imageId: asset.id, imageUrl: asset.url }))
                  }
                />
                <TextArea label="Mô tả" value={curriculumForm.description} onChange={(value) => setCurriculumForm((f) => ({ ...f, description: value }))} />
                <RichTextEditor
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
                  <Field label="Tiêu đề" value={postForm.title} onChange={(value) => setPostForm((f) => ({ ...f, title: value, slug: f.slug || slugify(value) }))} />
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
                  previewUrl={postForm.imageUrl}
                  alt={postForm.title}
                  onStatus={setStatus}
                  onUploaded={(asset) =>
                    setPostForm((f) => ({ ...f, coverImageId: asset.id, imageUrl: asset.url }))
                  }
                />
                <TextArea label="Tóm tắt" value={postForm.excerpt} onChange={(value) => setPostForm((f) => ({ ...f, excerpt: value }))} />
                <RichTextEditor
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
                  previewUrl={facilityForm.imageUrl}
                  alt={facilityForm.title}
                  onStatus={setStatus}
                  onUploaded={(asset) =>
                    setFacilityForm((f) => ({ ...f, imageId: asset.id, imageUrl: asset.url }))
                  }
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
                  previewUrl={teacherForm.imageUrl}
                  alt={teacherForm.title}
                  onStatus={setStatus}
                  onUploaded={(asset) =>
                    setTeacherForm((f) => ({ ...f, imageId: asset.id, imageUrl: asset.url }))
                  }
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
                  previewUrl={testimonialForm.avatarUrl}
                  alt={testimonialForm.parentName}
                  onStatus={setStatus}
                  onUploaded={(asset) =>
                    setTestimonialForm((f) => ({ ...f, avatarId: asset.id, avatarUrl: asset.url }))
                  }
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
