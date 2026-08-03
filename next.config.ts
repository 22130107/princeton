import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
  },
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: "/ve-chung-toi",
          destination: "/",
        },
        {
          source: "/con-duong-princeton",
          destination: "/phuong-phap-giang-day",
        },
        {
          source: "/con-duong-princeton/:slug",
          destination: "/phuong-phap-giang-day/:slug",
        },
        {
          source: "/chuong-trinh-hoc",
          destination: "/khoi-lop",
        },
        {
          source: "/chuong-trinh-hoc/:slug",
          destination: "/khoi-lop/:slug",
        },
        {
          source: "/cuoc-song-tai-princeton",
          destination: "/chuong-trinh-hoc",
        },
        {
          source: "/cuoc-song-tai-princeton/:slug",
          destination: "/chuong-trinh-hoc/:slug",
        },
        {
          source: "/ket-noi-gia-dinh",
          destination: "/gioi-thieu",
        },
        {
          source: "/hop-tac-cung-princeton",
          destination: "/tin-tuc-su-kien",
        },
        {
          source: "/hop-tac-cung-princeton/:slug",
          destination: "/tin-tuc-su-kien/:slug",
        },
        {
          source: "/uploads/:file",
          destination: "/api/media/:file",
        },
      ],
    };
  },
};

export default nextConfig;
