import { Features } from "@/components/HomePage/Features"
import { Hero } from "@/components/HomePage/Hero"
import TranslationsProvider from "@/components/translations-provider"
import initTranslations from "@/app/i18n"

const i18nNamespaces = ["home", "common"]

export default async function IndexPage({ params: { locale } }) {
  const { resources } = await initTranslations(locale, i18nNamespaces)
  return (
    <>
      <TranslationsProvider
        resources={resources}
        locale={locale}
        namespaces={i18nNamespaces}
      >
        <Hero />
        <Features />
      </TranslationsProvider>
    </>
  )
}
