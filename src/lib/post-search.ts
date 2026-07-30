export type PostSearchItem = {
  title: string;
  category: string;
  excerpt: string;
  content: string[];
};

export function normalizeSearchText(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[đĐ]/g, "d")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

export function getSearchTokens(query: string) {
  return normalizeSearchText(query)
    .split(/\s+/)
    .map((token) => token.trim())
    .filter((token) => token.length > 1 || /^\d+$/.test(token));
}

export function getPostSearchScore(post: PostSearchItem, query: string) {
  const normalizedQuery = normalizeSearchText(query);
  const tokens = getSearchTokens(query);
  if (!tokens.length) return 1;

  const title = normalizeSearchText(post.title);
  const category = normalizeSearchText(post.category);
  const excerpt = normalizeSearchText(post.excerpt);
  const content = normalizeSearchText(post.content.join(" "));
  const haystack = `${title} ${category} ${excerpt} ${content}`;
  let score = 0;

  if (title.includes(normalizedQuery)) score += 12;
  if (category.includes(normalizedQuery)) score += 8;
  if (excerpt.includes(normalizedQuery)) score += 5;
  if (content.includes(normalizedQuery)) score += 3;

  tokens.forEach((token) => {
    if (title.includes(token)) score += 5;
    if (category.includes(token)) score += 4;
    if (excerpt.includes(token)) score += 2;
    if (content.includes(token)) score += 1;
  });

  const matchedTokens = tokens.filter((token) => haystack.includes(token)).length;
  if (matchedTokens === tokens.length) score += 4;

  return score;
}

export function filterAndRankPosts<T extends PostSearchItem>(posts: T[], query: string) {
  if (!query.trim()) return posts;

  return posts
    .map((post, index) => ({
      post,
      index,
      score: getPostSearchScore(post, query),
    }))
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score || a.index - b.index)
    .map((item) => item.post);
}
