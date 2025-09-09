import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Suspense } from "react"
import SimpleCookieBanner from "@/components/simple-cookie-banner"
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"
import "./globals.css"

export const metadata: Metadata = {
  metadataBase: new URL('https://massagezen.fr'),
  title: {
    default: "MassageZen - Appareils de Massage Premium | Guides & Comparatifs",
    template: "%s | MassageZen",
  },
  description:
    "✅ Découvrez les meilleurs appareils de massage 2024 : pistolets de massage, fauteuils, coussinets chauffants. ⭐ Guides d'experts, comparatifs détaillés et avis vérifiés pour votre bien-être.",
  generator: "v0.app",
  keywords: [
    "appareil massage",
    "pistolet massage",
    "fauteuil massage",
    "coussin chauffant",
    "masseur pieds",
    "bien-être",
    "relaxation",
    "thérapie",
    "récupération musculaire",
    "massage thérapeutique",
    "guide achat massage",
    "comparatif massage",
    "avis appareil massage",
  ].join(", "),
  authors: [{ name: "MassageZen" }],
  creator: "MassageZen",
  publisher: "MassageZen",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://massagezen.fr",
    siteName: "MassageZen",
    title: "MassageZen - Appareils de Massage Premium | Guides & Comparatifs",
    description:
      "Découvrez les meilleurs appareils de massage 2024. Guides d'experts, comparatifs détaillés et avis vérifiés pour votre bien-être.",
    images: [
      {
        url: "/og-image-massagezen.png",
        width: 1200,
        height: 630,
        alt: "MassageZen - Votre expert en appareils de massage",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "MassageZen - Appareils de Massage Premium",
    description: "Guides d'experts et comparatifs des meilleurs appareils de massage 2024",
    images: ["/og-image-massagezen.png"],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <Suspense fallback={null}>{children}</Suspense>
        <SimpleCookieBanner />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
