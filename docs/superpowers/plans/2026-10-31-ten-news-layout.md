# 10-News Layout (1 Big Card + 9 Small Cards in 3x3 Grid) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement a 10-news layout on the homepage: 1 big lead card on the left + 9 small cards in a 3x3 grid on the right (across 4 columns total).

**Architecture:** Pure helper `partitionHomepagePosts` limits to 10 items and returns `{ featured, gridPosts }`. `PrincetonHomeBody.tsx` renders a 12-column grid container where the left column (`lg:col-span-4`) holds the featured card, and the right column (`lg:col-span-8`) holds a 3-column x 3-row grid of 9 cards.

**Tech Stack:** Next.js 15, React, Tailwind CSS, TypeScript, Node.js native test runner.

## Global Constraints
- Target component: `src/components/Home/PrincetonHomeBody.tsx`
- Helper: `src/lib/post-layout.ts` and `src/lib/post-layout.test.ts`
- Limit to 10 items max (`0..10`).
- Maintain Princeton branding (burgundy borders, cream backgrounds, offset hard shadows).

---

### Task 1: Update `post-layout.ts` and `post-layout.test.ts` for 10-item partitioning

**Files:**
- Modify: `src/lib/post-layout.ts`
- Modify: `src/lib/post-layout.test.ts`

- [ ] **Step 1: Update failing tests for `{ featured, gridPosts }`**
- [ ] **Step 2: Run `npm test` to verify failure**
- [ ] **Step 3: Update `partitionHomepagePosts` implementation**
- [ ] **Step 4: Run `npm test` to verify pass**
- [ ] **Step 5: Commit changes**

---

### Task 2: Update `PrincetonHomeBody.tsx` with the 1 Big + 3x3 Small Cards layout

**Files:**
- Modify: `src/components/Home/PrincetonHomeBody.tsx`

- [ ] **Step 1: Replace layout markup in `PrincetonHomeBody.tsx`**
- [ ] **Step 2: Run `npx tsc --noEmit` to verify type safety**
- [ ] **Step 3: Run `npm test` to verify suite**
- [ ] **Step 4: Commit changes**

---

### Task 3: Verification

- [ ] **Step 1: Run `npm run build`**
- [ ] **Step 2: Verify responsive behavior across mobile, tablet, desktop**
