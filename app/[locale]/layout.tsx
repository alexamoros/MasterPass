import "@/styles/globals.css"
import { Metadata } from "next"
import { Inter as FontSans } from "next/font/google"
import { homeMeta } from "@/meta"
import { Analytics } from "@vercel/analytics/react"
import { NextIntlClientProvider, useMessages } from "next-intl"

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
  params: { locale: string }
}

export default function RootLayout({
  params: { locale },
  children,
}: RootLayoutProps) {
  // Receive messages provided in i18n.ts
  const messages = useMessages()
  return (
    <>
      <html className="scroll-smooth" lang={locale} suppressHydrationWarning>
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
                <NextIntlClientProvider locale={locale} messages={messages}>
                  {children}
                </NextIntlClientProvider>
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
