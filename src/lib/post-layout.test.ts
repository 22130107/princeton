import assert from "node:assert/strict";
import test from "node:test";
import { partitionHomepagePosts } from "./post-layout.ts";

test("partitionHomepagePosts limits to 7 items and splits into 1 featured, 3 side, 3 secondary", () => {
  const posts = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const result = partitionHomepagePosts(posts);

  assert.equal(result.featured, 1);
  assert.deepEqual(result.sidePosts, [2, 3, 4]);
  assert.deepEqual(result.secondaryPosts, [5, 6, 7]);
});

test("partitionHomepagePosts handles empty array", () => {
  const result = partitionHomepagePosts([]);

  assert.equal(result.featured, undefined);
  assert.deepEqual(result.sidePosts, []);
  assert.deepEqual(result.secondaryPosts, []);
});

test("partitionHomepagePosts handles fewer than 4 items", () => {
  const posts = ["A", "B", "C"];
  const result = partitionHomepagePosts(posts);

  assert.equal(result.featured, "A");
  assert.deepEqual(result.sidePosts, ["B", "C"]);
  assert.deepEqual(result.secondaryPosts, []);
});

test("partitionHomepagePosts handles between 4 and 7 items", () => {
  const posts = ["A", "B", "C", "D", "E"];
  const result = partitionHomepagePosts(posts);

  assert.equal(result.featured, "A");
  assert.deepEqual(result.sidePosts, ["B", "C", "D"]);
  assert.deepEqual(result.secondaryPosts, ["E"]);
});
