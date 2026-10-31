import assert from "node:assert/strict";
import test from "node:test";
import { partitionHomepagePosts } from "./post-layout.ts";

test("partitionHomepagePosts limits to 10 items and splits into 1 featured and 9 gridPosts", () => {
  const posts = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  const result = partitionHomepagePosts(posts);

  assert.equal(result.featured, 1);
  assert.deepEqual(result.gridPosts, [2, 3, 4, 5, 6, 7, 8, 9, 10]);
});

test("partitionHomepagePosts handles empty array", () => {
  const result = partitionHomepagePosts([]);

  assert.equal(result.featured, undefined);
  assert.deepEqual(result.gridPosts, []);
});

test("partitionHomepagePosts handles fewer than 10 items", () => {
  const posts = ["A", "B", "C", "D"];
  const result = partitionHomepagePosts(posts);

  assert.equal(result.featured, "A");
  assert.deepEqual(result.gridPosts, ["B", "C", "D"]);
});
