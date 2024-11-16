import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import "./globals.css";
import { Navigation } from "./components/navigation";
import { AppFooter } from "./components/AppFooter";
import { Scroll } from "./components/Scroll";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "River Flows, Weather & Conditions | RiverRadar",
  description:
    `Get real-time updates on river flows, ` +
    `weather and conditions across the United States. Stay informed with accurate information to plan your activities.`,
};

export const viewport: Viewport = {
  initialScale: 1,
  maximumScale: 1,
  width: "device-width",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isProd = process.env.NODE_ENV === "production";

  return (
    <html lang="en">
      <Scroll />
      <body className={inter.className}>
        <Navigation />
        <main className="bg-white">{children}</main>
        <AppFooter />
      </body>
      {isProd && <GoogleAnalytics gaId="<enter_ga_id>" />}
    </html>
  );
}
