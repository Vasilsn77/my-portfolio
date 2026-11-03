import { ImageResponse } from "next/og";
import { profile } from "@/data/profile";

export const alt = `${profile.name} — ${profile.siteTagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Social share card: name + tagline on a dark gradient. */
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
          backgroundColor: "#05060A",
          backgroundImage:
            "radial-gradient(circle at 12% 18%, rgba(34,211,238,0.34), transparent 45%), radial-gradient(circle at 88% 82%, rgba(139,92,246,0.34), transparent 45%)",
          color: "#E6E8EF",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 26,
            letterSpacing: 6,
            color: "#8A90A2",
          }}
        >
          {profile.siteTagline.toUpperCase()}
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 92, fontWeight: 700 }}>
            {profile.name}
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 18,
              fontSize: 34,
              color: "#8A90A2",
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
