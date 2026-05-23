"use client";

import { useEffect, useState } from "react";

export type DisplayMode = "browser" | "standalone" | "minimal-ui" | "fullscreen";

/**
 * Reports whether the app is running as an installed PWA (`"standalone"`,
 * `"minimal-ui"`, `"fullscreen"`) or in a regular browser tab (`"browser"`).
 *
 * Reactive: if the user installs the PWA while the page is open, components
 * using this hook re-render with the new mode. Safe for SSR — returns
 * `"browser"` during render, the real value lands after mount.
 */
export function useDisplayMode(): DisplayMode {
  const [mode, setMode] = useState<DisplayMode>("browser");

  useEffect(() => {
    // Order matters: fullscreen is the "most installed" mode, browser the least.
    const modes: DisplayMode[] = ["fullscreen", "standalone", "minimal-ui"];
    const queries = modes.map((m) => window.matchMedia(`(display-mode: ${m})`));

    const compute = (): DisplayMode => {
      for (let i = 0; i < queries.length; i++) {
        if (queries[i].matches) return modes[i];
      }
      // Legacy iOS Safari (<16.4) doesn't honor display-mode media queries —
      // it exposes `navigator.standalone` instead.
      if ((navigator as Navigator & { standalone?: boolean }).standalone) {
        return "standalone";
      }
      return "browser";
    };

    setMode(compute());

    const onChange = () => setMode(compute());
    queries.forEach((q) => q.addEventListener("change", onChange));
    return () => queries.forEach((q) => q.removeEventListener("change", onChange));
  }, []);

  return mode;
}

/** Convenience: true when running as any kind of installed PWA. */
export function useIsInstalled(): boolean {
  return useDisplayMode() !== "browser";
}
