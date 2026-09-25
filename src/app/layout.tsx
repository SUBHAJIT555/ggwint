import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { QuoteProvider } from "@/providers/QuoteProvider";
import SmoothScroll from "@/providers/SmoothScroll";
import MainLayout from "@/layout/MainLayout";
import "../index.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500", "600"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
};

const siteDescription =
  "G G W INTERNATIONAL GENERAL TRADING L.L.C is your gateway to global trade, bridging markets with excellence, integrity, and innovation from the heart of Dubai.";

export const metadata: Metadata = {
  title: {
    default: "G G W INTERNATIONAL GENERAL TRADING L.L.C | Dubai, UAE",
    template: "%s | GGW International",
  },
  description: siteDescription,
  keywords: [
    "GGW International",
    "general trading Dubai",
    "construction materials UAE",
    "food stuff trading",
    "import export Dubai",
    "ISO 9001:2015",
    "global trade UAE",
    "GCC trading company",
  ],
  authors: [{ name: "G G W INTERNATIONAL GENERAL TRADING L.L.C" }],
  publisher: "G G W INTERNATIONAL GENERAL TRADING L.L.C",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  metadataBase: new URL("https://ggwint.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: "https://ggwint.com",
    title: "G G W INTERNATIONAL GENERAL TRADING L.L.C | Dubai, UAE",
    description: siteDescription,
    siteName: "GGW International",
    locale: "en_US",
    images: [
      {
        url: "/images/GGWLogo.png",
        alt: "G G W INTERNATIONAL GENERAL TRADING L.L.C — Dubai, UAE",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "G G W INTERNATIONAL GENERAL TRADING L.L.C | Dubai, UAE",
    description: siteDescription,
    images: ["/images/GGWLogo.png"],
  },
  applicationName: "GGW International",
  icons: {
    icon: [{ url: "/images/GGWIcon.png", type: "image/png" }],
    apple: [{ url: "/images/GGWIcon.png", type: "image/png" }],
  },
  appleWebApp: {
    capable: true,
    title: "GGW International",
    statusBarStyle: "default",
  },
  formatDetection: {
    telephone: true,
  },
  other: {
    language: "English",
    "geo.region": "AE-DU",
    "geo.placename": "Dubai",
    "geo.position": "25.0699544;55.1370806",
    ICBM: "25.0699544, 55.1370806",
    copyright: "G G W INTERNATIONAL GENERAL TRADING L.L.C",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className={`${inter.className} bg-canvas text-body antialiased`}>
        <SmoothScroll>
          <QuoteProvider>
            <MainLayout>{children}</MainLayout>
          </QuoteProvider>
        </SmoothScroll>
      </body>
    </html>
  );
}
