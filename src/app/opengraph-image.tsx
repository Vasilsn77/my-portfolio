import { ImageResponse } from "next/og";
import { profile } from "@/data/profile";

export const alt = `${profile.name} — ${profile.siteTagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Social share card: logo mark + name + tagline on the new dark gradient. */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          backgroundColor: "#0B0B0E",
          backgroundImage:
            "radial-gradient(circle at 12% 18%, rgba(168,85,247,0.34), transparent 45%), radial-gradient(circle at 88% 82%, rgba(79,111,239,0.34), transparent 45%)",
          color: "#E4E4E7",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 64,
              height: 64,
              borderRadius: 18,
              border: "1px solid #4F6FEF",
              background: "linear-gradient(135deg, #A855F7, #4F6FEF)",
              fontSize: 34,
              fontWeight: 700,
              color: "#FFFFFF",
            }}
          >
            {profile.monogram}
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 26,
              letterSpacing: 6,
              color: "#9A9AA8",
            }}
          >
            {profile.siteTagline.toUpperCase()}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 92, fontWeight: 700, color: "#F4F4F5" }}>
            {profile.name}
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 18,
              fontSize: 34,
              color: "#9A9AA8",
            }}
          >
            {profile.headline}
          </div>
        </div>
      </div>
    ),
    size,
  );
}
