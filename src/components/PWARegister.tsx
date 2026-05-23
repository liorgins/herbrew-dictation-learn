"use client";

import { useEffect } from "react";

/**
 * Registers the service worker on mount. Renders nothing — drop it once in the
 * root layout. The SW lives at /sw.js (see public/sw.js); without it Chrome
 * won't show the "Install app" option even though the manifest is valid.
 */
export default function PWARegister() {
  useEffect(() => {
    if (typeof navigator === "undefined" || !("serviceWorker" in navigator)) {
      return;
    }
    // Defer to next idle moment so the SW registration never blocks first paint.
    const register = () =>
      navigator.serviceWorker
        .register("/sw.js", { scope: "/" })
        .catch((err) => console.warn("SW registration failed:", err));

    if (document.readyState === "complete") register();
    else window.addEventListener("load", register, { once: true });
  }, []);

  return null;
}
