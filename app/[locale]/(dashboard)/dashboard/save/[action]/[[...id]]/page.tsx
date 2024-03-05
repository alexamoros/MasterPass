import { actions } from "@/lib/Constants"
import { DashboardHeader } from "@/components/Dashboard/dashboard-header"
import { DashboardShell } from "@/components/Dashboard/dashboard-shell"
import { EncryptionForm } from "@/components/Dashboard/encrypt/encrypt-form"
import TranslationsProvider from "@/components/translations-provider"
import initTranslations from "@/app/i18n"

interface PageProps {
  params: {
    action: string
    id: string[]
    locale: string
  }
}

const i18nNamespaces = ["home", "common", "dashboard", "encrypt_form"]

export async function page({ params: { action, id, locale } }: PageProps) {
  const { t, resources } = await initTranslations(locale, i18nNamespaces)
  return (
    <TranslationsProvider
      resources={resources}
      locale={locale}
      namespaces={i18nNamespaces}
    >
      <DashboardShell>
        <DashboardHeader
          heading={t("dashboard:heading")}
          text={t("dashboard:text")}
        />
        <div className="grid gap-8">
          <EncryptionForm action={action as actions} id={id?.[0] ?? ""} />
        </div>
      </DashboardShell>
    </TranslationsProvider>
  )
}

export default page
