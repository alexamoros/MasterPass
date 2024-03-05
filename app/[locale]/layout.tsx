import "@/styles/globals.css"
import { Metadata } from "next"
import { Inter as FontSans } from "next/font/google"
import i18nConfig from "@/i18nConfig"
import { homeMeta } from "@/meta"
import { Analytics } from "@vercel/analytics/react"

import { cn } from "@/lib/utils"
import { ScrollToTop } from "@/components/Common/scroll-top"
import { AuthProvider } from "@/components/auth-provider"
import ProgressProvider from "@/components/progress-indicator"
import { TailwindIndicator } from "@/components/tailwind-indicator"
import { ThemeProvider } from "@/components/theme-provider"

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const metadata: Metadata = homeMeta

interface RootLayoutProps {
  children: React.ReactNode
}

export function generateStaticParams() {
  return i18nConfig.locales.map((locale) => ({ locale }))
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <>
      <html className="scroll-smooth" lang="en" suppressHydrationWarning>
        {/* eslint-disable-next-line @next/next/no-head-element */}
        <head />
        <body
          className={cn(
            "min-h-screen bg-background font-sans antialiased",
            fontSans.variable
          )}
        >
          <AuthProvider>
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
              <ProgressProvider>
                {children}
                <TailwindIndicator />
              </ProgressProvider>
            </ThemeProvider>
            <ScrollToTop />
          </AuthProvider>
          <Analytics />
        </body>
      </html>
    </>
  )
}
