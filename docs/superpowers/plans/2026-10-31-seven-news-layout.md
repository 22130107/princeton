# 7-News Homepage Layout Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Transform the homepage news section (`LatestNews` component in `src/components/Home/PrincetonHomeBody.tsx`) into an editorial 7-news layout (1 Lead + 3 Side + 3 Secondary) and remove the previous 10-box layout.

**Architecture:** A pure helper function partitions the posts for the homepage into `{ featured, sidePosts, secondaryPosts }` with a hard limit of 7 posts. The React component uses this partition to render Row 1 (1 Lead Story + 3 Side Stories stacked) and Row 2 (3 Secondary Stories in a 3-column grid), with full responsive behavior and Princeton editorial styling.

**Tech Stack:** Next.js 15 (App Router), React, Tailwind CSS, TypeScript, Node.js native test runner.

## Global Constraints
- Target component: `src/components/Home/PrincetonHomeBody.tsx`.
- Visual styling must match Princeton branding: border `#991B1B`, cream card background `#fffefa`, drop shadow `shadow-[4px_4px_0_rgba(153,27,27,0.2)]`, hover lift effect.
- Limit displayed items to strictly max 7 posts (`0..7`).
- Support Vietnamese and English seamlessly.
- Graceful rendering when fewer than 7 posts are available (no broken grid or empty boxes).

---

### Task 1: Create and test post partitioning helper for 7-news layout

**Files:**
- Create: `src/lib/post-layout.ts`
- Test: `src/lib/post-layout.test.ts`

**Interfaces:**
- Produces:
  ```ts
  export type HomepageNewsPartition<T> = {
    featured: T | undefined;
    sidePosts: T[];
    secondaryPosts: T[];
  };

  export function partitionHomepagePosts<T>(posts: T[]): HomepageNewsPartition<T>;
  ```

- [ ] **Step 1: Write the failing test**
Create `src/lib/post-layout.test.ts` testing:
- Partitions 10 posts into 1 featured, 3 sidePosts, 3 secondaryPosts, discarding the rest (max 7).
- Handles empty posts array.
- Handles fewer than 4 posts (featured + remaining in sidePosts, secondaryPosts is empty).
- Handles between 4 and 7 posts.

- [ ] **Step 2: Run test to verify it fails**
Run: `npm test`
Expected: FAIL with missing module `post-layout.ts`.

- [ ] **Step 3: Write minimal implementation**
Create `src/lib/post-layout.ts`:
```ts
export type HomepageNewsPartition<T> = {
  featured: T | undefined;
  sidePosts: T[];
  secondaryPosts: T[];
};

export function partitionHomepagePosts<T>(posts: T[]): HomepageNewsPartition<T> {
  const capped = posts.slice(0, 7);
  return {
    featured: capped[0],
    sidePosts: capped.slice(1, 4),
    secondaryPosts: capped.slice(4, 7),
  };
}
```

- [ ] **Step 4: Run test to verify it passes**
Run: `npm test`
Expected: PASS (all 26+ tests pass).

- [ ] **Step 5: Commit**
```bash
git add src/lib/post-layout.ts src/lib/post-layout.test.ts
git commit -m "feat(news): add partitionHomepagePosts helper with tests for 7-post layout"
```

---

### Task 2: Update `PrincetonHomeBody.tsx` with 7-news layout

**Files:**
- Modify: `src/components/Home/PrincetonHomeBody.tsx:835-1165`

**Interfaces:**
- Consumes: `partitionHomepagePosts` from `src/lib/post-layout`
- Renders:
  - Row 1: 1 Featured lead story (`lg:col-span-8` or `lg:col-span-7`) + 3 side stories (`lg:col-span-4` or `lg:col-span-5` stacked vertically)
  - Row 2: 3 secondary cards (`grid-cols-1 md:grid-cols-2 lg:grid-cols-3`)
  - No Row 3 (remove `subBoxPosts`)

- [ ] **Step 1: Update `LatestNews` logic and remove `subBoxPosts`**
Use `partitionHomepagePosts(filteredPosts)` instead of slicing to 10 and subBoxPosts.
Ensure `aspect-[16/9]` on lead story, `aspect-[4/3]` on side stories thumbnail, and `aspect-[16/10]` on secondary stories.

- [ ] **Step 2: Update Row 1 and Row 2 layout structure**
Ensure:
- Row 1: `grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-7 items-stretch`
- Lead story: `lg:col-span-7` or `lg:col-span-8`, `flex flex-col justify-between`
- Side stories container: `lg:col-span-5` or `lg:col-span-4`, `flex flex-col gap-4 justify-between`
- Row 2: `mt-6 lg:mt-7 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-7 items-stretch`
- Remove all Row 3 `subBoxPosts` markup.

- [ ] **Step 3: Verify TypeScript and build**
Run: `npm run build` or `npx tsc --noEmit`
Expected: Zero type errors.

- [ ] **Step 4: Commit**
```bash
git add src/components/Home/PrincetonHomeBody.tsx
git commit -m "feat(home): switch news section to 7-post layout (1+3+3)"
```

---

### Task 3: Verification and End-to-End Check

**Files:**
- Review: `src/components/Home/PrincetonHomeBody.tsx`

- [ ] **Step 1: Run complete test suite**
Run: `npm test`
Expected: All tests pass.

- [ ] **Step 2: Verify responsive design and error handling**
- Verify when 0 posts exist (empty state rendered).
- Verify when 1-3 posts exist (only Row 1 rendered, no empty Row 2).
- Verify when 4-7 posts exist (Row 1 + Row 2 rendered).
- Verify mobile rendering (single column stack).
