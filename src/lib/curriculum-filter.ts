type CategorizedTrack = {
  category: string;
};

export function filterCurriculumTracksByCategory<T extends CategorizedTrack>(
  tracks: T[],
  category?: string,
) {
  if (!category) return tracks;

  return tracks.filter((track) => track.category === category);
}
