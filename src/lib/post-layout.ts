export type HomepageNewsPartition<T> = {
  featured: T | undefined;
  gridPosts: T[];
};

/**
 * Partitions a list of posts into:
 * - 1 lead story (featured)
 * - Up to 9 small cards (gridPosts) arranged in a 3x3 grid
 * Any additional posts beyond 10 are ignored.
 */
export function partitionHomepagePosts<T>(posts: T[]): HomepageNewsPartition<T> {
  const capped = posts.slice(0, 10);
  return {
    featured: capped[0],
    gridPosts: capped.slice(1, 10),
  };
}
