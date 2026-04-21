import type { Metadata } from "next";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";

import { ServiceWorkerRegister } from "@/components/service-worker-register";

import "./globals.css";

export const metadata: Metadata = {
  title: "Build Satoshi — Ship your first Bitcoin product",
  description:
    "Guided project tracks for new Bitcoin developers. From curious to contributor in 4–8 weeks. By the Bitcoin Dev Project.",
  applicationName: "Build Satoshi",
  metadataBase: new URL("https://build-satoshi.vercel.app"),
  alternates: {
    canonical: "https://build-satoshi.vercel.app"
  },
  openGraph: {
    title: "Build Satoshi — Ship your first Bitcoin product",
    description:
      "Guided project tracks for new Bitcoin developers. From curious to contributor in 4–8 weeks. By the Bitcoin Dev Project.",
    url: "https://build-satoshi.vercel.app",
    siteName: "Build Satoshi",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Build Satoshi"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Build Satoshi — Ship your first Bitcoin product",
    description:
      "Guided project tracks for new Bitcoin developers. From curious to contributor in 4–8 weeks. By the Bitcoin Dev Project.",
    images: ["/og-image.png"]
  },
  icons: {
    icon: "/icon.svg"
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body className="min-h-screen overflow-x-hidden bg-bg font-sans text-text antialiased">
        <ServiceWorkerRegister />
        <div className="relative min-h-screen bg-[radial-gradient(circle_at_top_right,var(--btc-dim),transparent_24rem)]">
          <main className="py-8 md:py-10">{children}</main>
        </div>
      </body>
    </html>
  );
}
