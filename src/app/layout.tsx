import type { Metadata, Viewport } from "next";
import "./globals.css";
import PWARegister from "@/components/PWARegister";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  // Paints the Android status bar / Chrome URL bar to match the app's green
  // header, so it feels seamless when installed standalone.
  themeColor: "#00a884",
  // Required for env(safe-area-inset-*) to report real notch/home-indicator
  // values in standalone PWA mode. In a regular browser tab those values
  // stay at 0, so the same CSS works for both.
  viewportFit: "cover",
  // Default browser behavior is `resizes-visual` — the soft keyboard slides
  // over the page without resizing it, which buries the chat input. Switching
  // to `resizes-content` shrinks the layout viewport when the keyboard opens,
  // so our flex column ends right above the keyboard (WhatsApp-style).
  interactiveWidget: "resizes-content",
};

export const metadata: Metadata = {
  title: "הכתבה שלי – משחק הכתבה בעברית",
  description: "משחק הכתבה חינוכי לילדים בעברית בסגנון WhatsApp",
  // iOS standalone hints — Android uses the manifest, but these make the app
  // work the same way if it's ever opened on an iPhone via Safari "Add to
  // Home Screen".
  appleWebApp: {
    capable: true,
    title: "הכתבה",
    statusBarStyle: "default",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="he" dir="rtl" className="h-full">
      <body className="h-[100dvh] bg-[#111b21] overflow-hidden">
        {children}
        <PWARegister />
      </body>
    </html>
  );
}
