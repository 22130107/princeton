export type MediaImage = {
  src: string;
};

export function mediaUrl(fileName: string) {
  return `/api/media/${fileName}`;
}

export function mediaImage(fileName: string): MediaImage {
  return {
    src: mediaUrl(fileName),
  };
}
