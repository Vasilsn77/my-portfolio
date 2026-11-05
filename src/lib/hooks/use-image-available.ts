"use client";

import { useEffect, useState } from "react";

/**
 * True once `src` loads successfully in the browser.
 * Starts false so a missing file never renders a broken <img>/next/image.
 */
export function useImageAvailable(src: string): boolean {
  const [available, setAvailable] = useState(false);

  useEffect(() => {
    const img = new window.Image();
    img.onload = () => setAvailable(true);
    img.onerror = () => setAvailable(false);
    img.src = src;
    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [src]);

  return available;
}
