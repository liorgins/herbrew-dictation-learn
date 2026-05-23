import type { MetadataRoute } from "next";

/**
 * Web App Manifest — tells the browser this site can be installed as a
 * standalone app. Next.js serves this at /manifest.webmanifest automatically.
 *
 * The combination of `display: "standalone"` + the two PNG icons + a registered
 * service worker is what enables Chrome's "Install app" option and Samsung
 * Internet's standalone home-screen launch.
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "הכתבה שלי",
    short_name: "הכתבה",
    description: "משחק הכתבה חינוכי לילדים בעברית",
    start_url: "/play",
    scope: "/",
    display: "standalone",
    orientation: "portrait",
    background_color: "#efeae2",
    theme_color: "#00a884",
    lang: "he",
    dir: "rtl",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
      {
        src: "/icon-512-maskable.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
