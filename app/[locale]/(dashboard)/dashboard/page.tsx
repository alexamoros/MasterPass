"use server"

import { EmptyPlaceholder } from "@/components/Common/empty-placeholder"
import { Password } from "@/components/Dashboard/Table/password-listing"
import { DashboardHeader } from "@/components/Dashboard/dashboard-header"
import { DashboardShell } from "@/components/Dashboard/dashboard-shell"
import { SavePasswordButton } from "@/components/Dashboard/save-password-btn"
import initTranslations from "@/app/i18n"
import { getData } from "@/app/page.server"

export default async function Dashboard({ params: { locale } }) {
  const { t } = await initTranslations(locale, ["dashboard"])
  const passwords = await getData()
  return (
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
  )
}
