import { readFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";
import { SITE } from "@/lib/content";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage() {
  const logoPath = path.join(process.cwd(), "public/brand/logo-on-dark.png");
  const logoBuffer = await readFile(logoPath);
  const logoSrc = `data:image/png;base64,${logoBuffer.toString("base64")}`;

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "flex-start",
        padding: 80,
        background: "#000000",
        color: "#ffffff",
        fontFamily: "system-ui, sans-serif",
      }}
    >
      <img
        src={logoSrc}
        alt=""
        width={282}
        height={252}
        style={{
          objectFit: "contain",
          marginBottom: 32,
        }}
      />
      <div style={{ fontSize: 22, color: "#F8B040", marginBottom: 12 }}>
        {SITE.tagline}
      </div>
      <div
        style={{
          fontSize: 36,
          fontWeight: 600,
          lineHeight: 1.2,
          maxWidth: 900,
          color: "rgba(255,255,255,0.85)",
        }}
      >
        {SITE.fullName}
      </div>
    </div>,
    { ...size },
  );
}
