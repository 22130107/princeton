export type HomepageNewsPartition<T> = {
  featured: T | undefined;
  sidePosts: T[];
  secondaryPosts: T[];
};

/**
 * Partitions a list of posts into an editorial 7-news layout:
 * - 1 lead story (featured)
 * - Up to 3 supporting side stories
 * - Up to 3 secondary grid stories
 * Any additional posts beyond 7 are ignored.
 */
export function partitionHomepagePosts<T>(posts: T[]): HomepageNewsPartition<T> {
  const capped = posts.slice(0, 7);
  return {
    featured: capped[0],
    sidePosts: capped.slice(1, 4),
    secondaryPosts: capped.slice(4, 7),
  };
}
