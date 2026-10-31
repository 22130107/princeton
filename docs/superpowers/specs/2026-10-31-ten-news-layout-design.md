# Design Spec: 10-News Layout (1 Big Card + 9 Small Cards in 3x3 Grid across 4 Columns)

- **Date:** 2026-10-31
- **Status:** Approved
- **Target File:** `src/components/Home/PrincetonHomeBody.tsx` & `src/lib/post-layout.ts`

---

## 1. Overview & Objective
Update the homepage news section (`LatestNews` component in `src/components/Home/PrincetonHomeBody.tsx`) to display **10 news items** organized into **4 columns**:
- **Left Column (1 Ô To)**: 1 prominent lead/hero card spanning full height of the section.
- **Right Block (9 Ô Nhỏ)**: 9 small cards organized as a **3x3 grid (3 columns x 3 rows)**.
- **Total posts displayed**: Exactly 10 posts (`posts.slice(0, 10)`).

---

## 2. Layout Structure

```
+-----------------------------------------------------------------------------------------------+
| Category Tabs: [ Tất cả ] [ Danh mục 1 ] [ Danh mục 2 ] ...                                     |
+-----------------------------------------------------------------------------------------------+
| 4 COLUMNS TOTAL:                                                                              |
| +-------------------------+ +---------------------------------------------------------------+ |
| | CỘT 1: 1 Ô TO (HERO)    | | CỘT 2, 3, 4: LƯỚI 3*3 GỒM 9 Ô NHỎ                             | |
| |                         | | +-----------------+ +-----------------+ +-----------------+   | |
| | - Aspect ~16:9 / 4:3    | | | Ô nhỏ 1         | | Ô nhỏ 2         | | Ô nhỏ 3         |   | |
| | - Category + Date       | | +-----------------+ +-----------------+ +-----------------+   | |
| | - Large 2-line title    | | | Ô nhỏ 4         | | Ô nhỏ 5         | | Ô nhỏ 6         |   | |
| | - 3-line excerpt        | | +-----------------+ +-----------------+ +-----------------+   | |
| | - Full-height alignment | | | Ô nhỏ 7         | | Ô nhỏ 8         | | Ô nhỏ 9         |   | |
| | - "Xem chi tiết ->"     | | +-----------------+ +-----------------+ +-----------------+   | |
| +-------------------------+ +---------------------------------------------------------------+ |
+-----------------------------------------------------------------------------------------------+
```

---

## 3. Component Details & Responsive Breakpoints

### 3.1 Data Partitioning (`src/lib/post-layout.ts`)
```ts
export type HomepageNewsPartition<T> = {
  featured: T | undefined;
  gridPosts: T[];
};

export function partitionHomepagePosts<T>(posts: T[]): HomepageNewsPartition<T> {
  const capped = posts.slice(0, 10);
  return {
    featured: capped[0],
    gridPosts: capped.slice(1, 10), // Up to 9 small posts
  };
}
```

### 3.2 Desktop Layout (>= 1024px)
- **Container**: `grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-6 items-stretch`.
- **Left Column (1 Ô To)**: `lg:col-span-4` (or `lg:col-span-1` in 4-col).
  - Princeton card frame: `border-2 border-[#991B1B] bg-[#fffefa] p-4 sm:p-5 shadow-[5px_5px_0_rgba(153,27,27,0.2)] flex flex-col justify-between`.
  - Cover image with `aspect-[16/10]`.
  - Category badge + Date badge.
  - Title: `text-[20px] sm:text-[23px] font-extrabold text-[#991B1B] line-clamp-2`.
  - Excerpt: `text-[13px] sm:text-[14px] text-[#5f4540] line-clamp-3`.
  - Footer: `"Xem chi tiết →"` with hover slide.
- **Right Block (9 Ô Nhỏ)**: `lg:col-span-8` (or `lg:col-span-3` in 4-col).
  - Nested Grid: `grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 lg:gap-4 items-stretch`.
  - 9 Cards:
    - Vertical card with `border-2 border-[#991B1B] bg-[#fffefa] p-3 shadow-[4px_4px_0_rgba(153,27,27,0.18)] hover:-translate-y-1 hover:shadow-[6px_6px_0_rgba(153,27,27,0.25)] flex flex-col justify-between`.
    - Compact image with `aspect-[16/10]`.
    - Category badge + Date badge (compact text-[9px] / text-[10px]).
    - Title: `text-[13px] sm:text-[14px] font-extrabold text-[#991B1B] line-clamp-2`.
    - Excerpt: `text-[11px] text-[#5f4540] line-clamp-2`.
    - Footer: `"Xem chi tiết →"` at bottom.

### 3.3 Tablet & Mobile Breakpoints
- **Mobile (< 768px)**: Stacks into 1 column (Lead story first, then the remaining posts in a single vertical stream).
- **Tablet (768px - 1023px)**: Lead story on top, then 2-column or 3-column grid underneath.

---

## 4. Verification Plan
1. Update unit tests in `src/lib/post-layout.test.ts` for 10 posts (1 featured + 9 gridPosts).
2. Run `npm test` to verify all tests pass.
3. Run `npm run build` / `npx tsc --noEmit` to ensure zero compilation or type errors.
4. Verify visual presentation across breakpoints.
