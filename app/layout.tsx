import type { Metadata } from "next";
import { DM_Sans, DM_Serif_Display } from "next/font/google";
import "./globals.css";
import StyledComponentsRegistry from "./lib/registry";
import { GoogleAnalytics } from "@next/third-parties/google";

const dmSans = DM_Sans({
  subsets: ["latin"],
  axes: ["opsz"],
  variable: "--font-dm-sans",
  display: "swap",
});

const dmSerifDisplay = DM_Serif_Display({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  variable: "--font-dm-serif",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Teron Russell — Product Designer",
    template: "%s | Teron Russell",
  },
  description: "Chicago-based product designer with 7+ years of experience turning complex ideas into intuitive, impactful products.",
  metadataBase: new URL("https://teronrussell.com"),
  openGraph: {
    type: "website",
    siteName: "Teron Russell",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${dmSans.variable} ${dmSerifDisplay.variable}`}>
      <body>
        <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
      </body>
      <GoogleAnalytics gaId="G-F28ST98GK2" />
    </html>
  );
}
