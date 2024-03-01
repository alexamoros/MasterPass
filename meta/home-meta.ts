import { Metadata, type Viewport } from "next"

import { siteConfig } from "@/config/site"

export const homeMeta: Metadata = {
  metadataBase: new URL(process.env.NEXTAUTH_URL as string),
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "Next.js",
    "React",
    "Tailwind CSS",
    "Server Components",
    "Radix UI",
    "Password",
    "Manager",
    "Password Manager",
  ],
  authors: [
    {
      name: "M Hamza Iqbal",
      url: "https://github.com/mHamzaIqbal1998",
    },
  ],
  creator: "M Hamza Iqbal",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: "/master.png",
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: "/master.png",
    creator: "@Hamza",
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "cyan" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
}
