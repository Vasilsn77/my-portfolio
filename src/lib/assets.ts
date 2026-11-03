/**
 * Server-only asset checks.
 *
 * Never import this from a client component — it uses `node:fs`, which is not
 * available in the browser bundle.
 */

import fs from "node:fs";
import path from "node:path";

/** Whether `public/cv.pdf` exists. Evaluated on the server (build / request). */
export function hasCvFile(): boolean {
  return fs.existsSync(path.join(process.cwd(), "public", "cv.pdf"));
}
