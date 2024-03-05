"use client"

import TableSkelton from "@/components/Dashboard/Loading/table-skelton"
import { DashboardHeader } from "@/components/Dashboard/dashboard-header"
import { DashboardShell } from "@/components/Dashboard/dashboard-shell"
import { SavePasswordButton } from "@/components/Dashboard/save-password-btn"
import TranslationsProvider from "@/components/translations-provider"
import initTranslations from "@/app/i18n"

const i18nNamespaces = ["common", "dashboard"]

export default async function DashboardLoading({ locale }) {
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
        >
          <SavePasswordButton />
        </DashboardHeader>
        <div className="divide-border-200 divide-y rounded-md border">
          <TableSkelton />
        </div>
      </DashboardShell>
    </TranslationsProvider>
  )
}
