import type { Metadata } from "next";
import { Inter, Noto_Sans_JP } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const notoSansJP = Noto_Sans_JP({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-noto-sans-jp"
});

export const metadata: Metadata = {
  title: "Yuriko Chat - Learn Japanese",
  description: "Chat with Yuriko Kuchiyama and learn Japanese together.",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Yuriko Chat",
  },
  formatDetection: {
    telephone: false,
  },
};
export const viewport = {
  themeColor: "#ec4899",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(inter.variable, notoSansJP.variable, "font-sans antialiased bg-background text-foreground min-h-screen selection:bg-pink-500/30 selection:text-pink-100")}
      >
        {children}
      </body>
    </html>
  );
}


