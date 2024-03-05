"use server"

import { EmptyPlaceholder } from "@/components/Common/empty-placeholder"
import { Password } from "@/components/Dashboard/Table/password-listing"
import { DashboardHeader } from "@/components/Dashboard/dashboard-header"
import { DashboardShell } from "@/components/Dashboard/dashboard-shell"
import { SavePasswordButton } from "@/components/Dashboard/save-password-btn"
import TranslationsProvider from "@/components/translations-provider"
import initTranslations from "@/app/i18n"
import { getData } from "@/app/page.server"

const i18nNamespaces = ["common", "dashboard"]

export default async function Dashboard({ params: { locale } }) {
  const { t, resources } = await initTranslations(locale, i18nNamespaces)
  const passwords = await getData()
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
        <div>
          {Array.isArray(passwords) && passwords.length ? (
            <div className="divide-y divide-border rounded-md border">
              {passwords.map((password: any) => (
                <Password password={password} key={password.id} />
              ))}
            </div>
          ) : (
            <EmptyPlaceholder>
              <EmptyPlaceholder.Icon name="password" />
              <EmptyPlaceholder.Title>
                {t("dashboard:nopasswords")}
              </EmptyPlaceholder.Title>
              <EmptyPlaceholder.Description>
                {t("dashboard:nopasswords_description")}
              </EmptyPlaceholder.Description>
              <SavePasswordButton variant="outline" />
            </EmptyPlaceholder>
          )}
        </div>
      </DashboardShell>
    </TranslationsProvider>
  )
}
