import type { Metadata } from "next";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import Link from "next/link";

import { PageShell } from "@/components/page-shell";
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
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function () {
                var isLocal = location.hostname === 'localhost' || location.hostname === '127.0.0.1';
                if (!isLocal || !('serviceWorker' in navigator) || !('caches' in window)) return;
                navigator.serviceWorker.getRegistrations().then(function (registrations) {
                  return Promise.all(registrations.map(function (registration) {
                    return registration.unregister();
                  }));
                }).then(function () {
                  return caches.keys();
                }).then(function (keys) {
                  return Promise.all(keys.filter(function (key) {
                    return key.indexOf('build-satoshi-') === 0;
                  }).map(function (key) {
                    return caches.delete(key);
                  }));
                }).catch(function () {});
              })();
            `
          }}
        />
      </head>
      <body className="min-h-screen overflow-x-hidden bg-bg font-sans text-text antialiased">
        <ServiceWorkerRegister />
        <div className="relative min-h-screen bg-[radial-gradient(circle_at_top_right,var(--btc-dim),transparent_24rem)]">
          <div className="sticky top-0 z-40 border-b border-border bg-[rgba(10,10,10,0.92)] backdrop-blur">
            <PageShell className="flex items-center justify-end gap-2 py-3">
              <Link href="/" className="rounded-full border border-border px-3 py-2 text-[11px] uppercase tracking-label text-text-2 transition hover:border-border-active hover:text-text">
                Home
              </Link>
              <Link href="/boss-map" className="rounded-full border border-border px-3 py-2 text-[11px] uppercase tracking-label text-text-2 transition hover:border-border-active hover:text-text">
                BOSS Map
              </Link>
              <Link href="/gallery" className="rounded-full border border-border px-3 py-2 text-[11px] uppercase tracking-label text-text-2 transition hover:border-border-active hover:text-text">
                Gallery
              </Link>
            </PageShell>
          </div>
          <main className="py-8 md:py-10">{children}</main>
        </div>
      </body>
    </html>
  );
}
