import { MainNavItems } from "@/lib/nav-items"
import { SiteFooter } from "@/components/Common/site-footer"
import { SiteHeader } from "@/components/Header/site-header"
import TranslationsProvider from "@/components/translations-provider"
import initTranslations from "@/app/i18n"

interface MarketingLayoutProps {
  children: React.ReactNode
}

const i18nNamespaces = ["home", "common"]

export default async function MarketingLayout({
  children,
  params: { locale },
}: MarketingLayoutProps) {
  const { resources } = await initTranslations(locale, i18nNamespaces)
  return (
    <TranslationsProvider
      resources={resources}
      locale={locale}
      namespaces={i18nNamespaces}
    >
      <div className="flex min-h-screen flex-col">
        <SiteHeader items={MainNavItems} />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </div>
    </TranslationsProvider>
  )
}
