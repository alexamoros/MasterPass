import FormSkelton from "@/components/Dashboard/Loading/form-skelton"
import { DashboardHeader } from "@/components/Dashboard/dashboard-header"
import { DashboardShell } from "@/components/Dashboard/dashboard-shell"
import TranslationsProvider from "@/components/translations-provider"
import initTranslations from "@/app/i18n"

const i18nNamespaces = ["home", "common", "dashboard"]

export default async function EncryptionLoading({ locale }) {
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
        <div className="divide-border-200 divide-y rounded-md border">
          <FormSkelton />
        </div>
      </DashboardShell>
    </TranslationsProvider>
  )
}
