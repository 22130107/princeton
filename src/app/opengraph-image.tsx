import { ImageResponse } from "next/og";

export const alt = "Princeton Academy - Mỗi ngày đến trường là một ngày hạnh phúc";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          alignItems: "center",
          background: "#f7f4f2",
          color: "#620000",
          display: "flex",
          flexDirection: "column",
          height: "100%",
          justifyContent: "center",
          padding: "72px",
          textAlign: "center",
          width: "100%",
        }}
      >
        <div style={{ color: "#b80000", display: "flex", fontSize: 28, fontWeight: 700 }}>
          HỆ THỐNG GIÁO DỤC PRINCETON
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 72,
            fontWeight: 800,
            lineHeight: 1.05,
            marginTop: 32,
            maxWidth: 980,
          }}
        >
          Mỗi ngày đến trường là một ngày hạnh phúc
        </div>
        <div style={{ display: "flex", fontSize: 28, marginTop: 36 }}>
          Môi trường mầm non hiện đại, yêu thương và giàu trải nghiệm
        </div>
      </div>
    ),
    size,
  );
}
