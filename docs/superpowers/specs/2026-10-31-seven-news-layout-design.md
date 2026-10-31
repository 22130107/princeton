# Design Spec: 7-News Layout for Homepage (Bố cục 7 tin tức trang chủ)

- **Date:** 2026-10-31
- **Status:** Approved
- **Target File:** `src/components/Home/PrincetonHomeBody.tsx`

---

## 1. Overview & Objective
Convert the homepage news section (`LatestNews` component in `PrincetonHomeBody.tsx`) from the previous 10-box arrangement to a clean, well-balanced **7-news editorial layout (1 + 3 + 3)**.

### Goals:
- Deliver an editorial visual hierarchy: 1 Lead Story (Hero) + 3 Side Stories (Row 1) + 3 Secondary Column Cards (Row 2).
- Remove the old Row 3 (`subBoxPosts`) containing tiny 9-10 sub-boxes.
- Restrict `displayPosts` to max 7 items (`posts.slice(0, 7)`).
- Preserve all existing styling signatures: Princeton burgundy border (`#991B1B`), parchment/cream card background (`#fffefa`), crisp drop shadows (`shadow-[4px_4px_0_rgba(153,27,27,0.2)]`), hover lift effects, bilingual labels (vi/en), and responsive breakdown across breakpoints.
- Gracefully handle cases where fewer than 7 posts exist in a selected category without layout glitches or empty white spaces.

---

## 2. Layout & Grid Architecture

### Total Posts: 7
```
+-----------------------------------------------------------------------------+
| Category Filters: [ Tất cả ] [ Danh mục 1 ] [ Danh mục 2 ] ...               |
+-----------------------------------------------------------------------------+
| ROW 1 (Hero & Supporting - 4 items)                                         |
| +-------------------------------------------+ +---------------------------+ |
| | [1] Featured Lead Story (Hero)            | | [2] Side Story 1 (Horiz)  | |
| | - Aspect ratio ~16:9                      | +---------------------------+ |
| | - Category badge + Published date         | | [3] Side Story 2 (Horiz)  | |
| | - Big 2-line title                        | +---------------------------+ |
| | - 3-line excerpt                          | | [4] Side Story 3 (Horiz)  | |
| | - "Xem chi tiết ->" CTA                   | +---------------------------+ |
| +-------------------------------------------+                               |
+-----------------------------------------------------------------------------+
| ROW 2 (Secondary Grid - 3 items)                                            |
| +-------------------------+ +-------------------------+ +-----------------+ |
| | [5] Secondary Card 1    | | [6] Secondary Card 2    | | [7] Sec Card 3  | |
| | - Aspect ratio 16:10    | | - Aspect ratio 16:10    | | - Aspect 16:10  | |
| | - Category + Date       | | - Category + Date       | | - Cat + Date    | |
| | - 2-line Title          | | - 2-line Title          | | - 2-line Title  | |
| | - 2-line Excerpt        | | - 2-line Excerpt        | | - 2-line Excerpt| |
| | - "Xem chi tiết ->"     | | - "Xem chi tiết ->"     | | - "Xem chi tiết"| |
| +-------------------------+ +-------------------------+ +-----------------+ |
+-----------------------------------------------------------------------------+
```

---

## 3. Component Details & Breakpoints

### 3.1 Data Slicing
In `LatestNews`:
```tsx
const displayPosts = useMemo(() => {
  if (activeCategory === "all") {
    return posts.slice(0, 7);
  }
  const filtered = posts.filter((p) => {
    const pSlug = p.categorySlug ? slugify(p.categorySlug) : "";
    const pNameSlug = p.category ? slugify(p.category) : "";
    return pSlug === activeCategory || pNameSlug === activeCategory;
  });
  return filtered.slice(0, 7);
}, [activeCategory, posts]);

const featured = displayPosts[0];
const sidePosts = displayPosts.slice(1, 4); // Items 2, 3, 4
const secondaryPosts = displayPosts.slice(4, 7); // Items 5, 6, 7
// subBoxPosts removed completely
```

### 3.2 Row 1: Lead + Side Stories (1 + 3)
- **Container**: `grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-7 items-stretch`.
- **Lead Story (Left)**:
  - Desktop: `lg:col-span-7` or `lg:col-span-8`.
  - Outer: `group flex flex-1 flex-col justify-between border-2 border-[#991B1B] bg-[#fffefa] p-4 sm:p-5 text-[#2f1515] no-underline shadow-[5px_5px_0_rgba(153,27,27,0.2)] transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-[8px_8px_0_rgba(153,27,27,0.28)]`.
  - Image: `relative aspect-[16/9] w-full overflow-hidden bg-[#fff1f1] border border-[#ead9c9]`.
  - Metadata: category badge (red outline on `#fff1f1`) + date badge.
  - Title: `text-[22px] sm:text-[25px] lg:text-[27px] font-extrabold leading-snug text-[#991B1B] transition-colors group-hover:text-[#b80000] line-clamp-2`.
  - Excerpt: `text-[14px] font-medium leading-relaxed text-[#5f4540] line-clamp-3`.
  - Footer: `"Xem chi tiết"` with arrow icon sliding on hover.
- **Side Stories (Right)**:
  - Desktop: `lg:col-span-5` or `lg:col-span-4`.
  - Container: `flex flex-col gap-4 justify-between`.
  - Each item: horizontal card (`flex flex-1 flex-row items-stretch border-2 border-[#991B1B] bg-[#fffefa] p-3 text-[#2f1515] shadow-[4px_4px_0_rgba(153,27,27,0.2)]`).
  - Thumbnail: `w-[36%] shrink-0 aspect-[4/3] relative overflow-hidden bg-[#fff1f1] border border-[#ead9c9]`.
  - Content column: category badge, date, title (`text-[15px] sm:text-[16px] font-extrabold text-[#991B1B] line-clamp-2`), excerpt (`text-[12px] text-[#5f4540] line-clamp-2`), and `"Xem chi tiết →"` at bottom right.

### 3.3 Row 2: Secondary Grid (3 items)
- **Condition**: Renders only if `secondaryPosts.length > 0`.
- **Container**: `mt-6 lg:mt-7 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-7 items-stretch`.
- **Each Card**:
  - Vertical card: `group flex flex-col justify-between border-2 border-[#991B1B] bg-[#fffefa] p-4 text-[#2f1515] no-underline shadow-[4px_4px_0_rgba(153,27,27,0.2)] hover:-translate-y-1 hover:shadow-[7px_7px_0_rgba(153,27,27,0.28)]`.
  - Image: `aspect-[16/10] w-full overflow-hidden bg-[#fff1f1] border border-[#ead9c9]`.
  - Metadata: category badge + date badge.
  - Title: `text-[16px] sm:text-[17px] font-extrabold leading-snug text-[#991B1B] line-clamp-2`.
  - Excerpt: `text-[13px] font-medium leading-relaxed text-[#5f4540] line-clamp-2`.
  - Bottom row: separator border + `"Xem chi tiết →"`.

### 3.4 Responsive Behavior
- **Mobile (< 768px)**:
  - Row 1 stacks vertically: Featured first, then 3 side stories underneath.
  - Row 2 stacks into single column.
- **Tablet (768px - 1023px)**:
  - Row 1: Featured + side stories stacked vertically or 2-column.
  - Row 2: 2 columns with last card spanning cleanly if odd.
- **Desktop (>= 1024px)**:
  - Row 1: 8-col lead story + 4-col 3-story vertical stack.
  - Row 2: 3-column equal grid.

---

## 4. Verification Plan
1. Check TypeScript types and Next.js build compilation (`npm run build` or `npm run lint`).
2. Verify visual rendering in browser on `/`:
   - Default "Tất cả" shows up to 7 posts (1 lead + 3 side + 3 secondary).
   - Verify no leftover 8th, 9th, or 10th sub-boxes.
   - Test category switching (categories with < 7 posts behave properly without blank boxes).
   - Test hover animations, links, and responsive layouts.
