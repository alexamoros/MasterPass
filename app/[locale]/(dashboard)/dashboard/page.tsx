"use server"

import { getTranslations } from "next-intl/server"

import { EmptyPlaceholder } from "@/components/Common/empty-placeholder"
import { Password } from "@/components/Dashboard/Table/password-listing"
import { DashboardHeader } from "@/components/Dashboard/dashboard-header"
import { DashboardShell } from "@/components/Dashboard/dashboard-shell"
import { SavePasswordButton } from "@/components/Dashboard/save-password-btn"
import { getData } from "@/app/page.server"

export default async function Dashboard({ params: { locale } }) {
  const passwords = await getData()
  const t = await getTranslations("dashboard")
  return (
    <DashboardShell>
      <DashboardHeader heading={t("heading")} text={t("text")}>
        <SavePasswordButton />
      </DashboardHeader>
      <div>
        {Array.isArray(passwords) && passwords.length ? (
          <div className="divide-y divide-border rounded-md border">
            {passwords.map((password: any) => (
              <Password locale={locale} password={password} key={password.id} />
            ))}
          </div>
        ) : (
          <EmptyPlaceholder>
            <EmptyPlaceholder.Icon name="password" />
            <EmptyPlaceholder.Title>{t("nopasswords")}</EmptyPlaceholder.Title>
            <EmptyPlaceholder.Description>
              {t("nopasswords_description")}
            </EmptyPlaceholder.Description>
            <SavePasswordButton variant="outline" />
          </EmptyPlaceholder>
        )}
      </div>
    </DashboardShell>
  )
}
