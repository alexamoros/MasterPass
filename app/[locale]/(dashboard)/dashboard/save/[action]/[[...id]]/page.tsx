"use server"

import { getTranslations } from "next-intl/server"

import { actions } from "@/lib/Constants"
import { DashboardHeader } from "@/components/Dashboard/dashboard-header"
import { DashboardShell } from "@/components/Dashboard/dashboard-shell"
import { EncryptionForm } from "@/components/Dashboard/encrypt/encrypt-form"

interface PageProps {
  params: {
    action: string
    id: string[]
  }
}

export default async function DashboardPage({
  params: { action, id },
}: PageProps) {
  const t = await getTranslations("dashboard")
  return (
    <DashboardShell>
      <DashboardHeader heading={t("heading")} text={t("text")} />
      <div className="grid gap-8">
        <EncryptionForm action={action as actions} id={id?.[0] ?? ""} />
      </div>
    </DashboardShell>
  )
}
