import type { MetadataRoute } from "next";
import {
  getClassPrograms,
  getCurriculumTracks,
  getNewsPosts,
  getTeachingMethods,
} from "@/lib/content";
import { buildSitemapEntries } from "@/lib/seo";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [programs, tracks, methods, posts] = await Promise.all([
    getClassPrograms(),
    getCurriculumTracks(),
    getTeachingMethods(),
    getNewsPosts(),
  ]);

  return buildSitemapEntries([
    "/",
    "/con-duong-princeton",
    "/chuong-trinh-hoc",
    "/cuoc-song-tai-princeton",
    "/ket-noi-gia-dinh",
    "/hop-tac-cung-princeton",
    "/dang-ky",
    "/lien-he",
    ...programs.map((item) => `/chuong-trinh-hoc/${item.slug}`),
    ...tracks.map((item) => `/cuoc-song-tai-princeton/${item.slug}`),
    ...methods.map((item) => `/con-duong-princeton/${item.slug}`),
    ...posts.map((item) => `/hop-tac-cung-princeton/${item.slug}`),
  ]);
}
