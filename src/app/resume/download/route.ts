import fs from "node:fs";
import path from "node:path";
import { NextResponse } from "next/server";

const CV_PATH = path.join(process.cwd(), "public", "cv.pdf");
const DOWNLOAD_NAME = "Vasil_S_N_Resume.pdf";

/**
 * Streams `public/cv.pdf` as a download attachment.
 *
 * Some browsers hang on a plain `<a download>` for cross-origin/CDN-served
 * PDFs; serving the bytes ourselves with an explicit Content-Disposition makes
 * the save dialog appear immediately. The inline /resume viewer keeps using
 * /cv.pdf directly (no attachment header there).
 */
export function GET() {
  if (!fs.existsSync(CV_PATH)) {
    return NextResponse.json({ error: "Resume coming soon." }, { status: 404 });
  }

  const file = fs.readFileSync(CV_PATH);

  return new Response(new Uint8Array(file), {
    status: 200,
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${DOWNLOAD_NAME}"`,
      "Cache-Control": "public, max-age=3600",
    },
  });
}
