import "@/styles/globals.css"
import { Metadata } from "next"
import { Inter as FontSans } from "next/font/google"
import i18nConfig from "@/i18nConfig"
import { homeMeta } from "@/meta"
import { Analytics } from "@vercel/analytics/react"
import { dir } from "i18next"

import { cn } from "@/lib/utils"
import { ScrollToTop } from "@/components/Common/scroll-top"
import { AuthProvider } from "@/components/auth-provider"
import ProgressProvider from "@/components/progress-indicator"
import { TailwindIndicator } from "@/components/tailwind-indicator"
import { ThemeProvider } from "@/components/theme-provider"
import TranslationsProvider from "@/components/translations-provider"

import initTranslations from "../i18n"

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const metadata: Metadata = homeMeta

interface RootLayoutProps {
  children: React.ReactNode
  params: { locale: string }
}

export async function generateStaticParams() {
  return i18nConfig.locales.map((locale) => ({ locale }))
}

const i18nNamespaces = ["home", "common", "dashboard", "encrypt_form"]

export default async function RootLayout({
  params: { locale },
  children,
}: RootLayoutProps) {
  const { resources } = await initTranslations(locale, i18nNamespaces)
  return (
    <>
      <html
        className="scroll-smooth"
        lang={locale}
        dir={dir(locale)}
        suppressHydrationWarning
      >
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
              <TranslationsProvider
                resources={resources}
                locale={locale}
                namespaces={i18nNamespaces}
              >
                <ProgressProvider>
                  {children}
                  <TailwindIndicator />
                </ProgressProvider>
              </TranslationsProvider>
            </ThemeProvider>
            <ScrollToTop />
          </AuthProvider>
          <Analytics />
        </body>
      </html>
    </>
  )
}
