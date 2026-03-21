import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export const metadata: Metadata = {
  title: "הכתבה שלי – משחק הכתבה בעברית",
  description: "משחק הכתבה חינוכי לילדים בעברית בסגנון WhatsApp",
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
      </body>
    </html>
  );
}
