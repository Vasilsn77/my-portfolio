import { ImageResponse } from "next/og";
import { profile } from "@/data/profile";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

/** Favicon: gradient "V" monogram. */
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundImage: "linear-gradient(135deg, #22D3EE 0%, #8B5CF6 100%)",
          color: "#05060A",
          fontSize: 42,
          fontWeight: 700,
          fontFamily: "Arial, sans-serif",
        }}
      >
        {profile.monogram}
      </div>
    ),
    size,
  );
}
