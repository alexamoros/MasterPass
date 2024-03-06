import { useTranslation } from "react-i18next"

import { actions } from "@/lib/Constants"
import { DashboardHeader } from "@/components/Dashboard/dashboard-header"
import { DashboardShell } from "@/components/Dashboard/dashboard-shell"
import { EncryptionForm } from "@/components/Dashboard/encrypt/encrypt-form"

interface PageProps {
  params: {
    action: string
    id: string[]
    locale: string
  }
}

export default async function DashboardPage({
  params: { action, id },
}: PageProps) {
  const { t } = useTranslation()
  return (
    <DashboardShell>
      <DashboardHeader
        heading={t("dashboard:heading")}
        text={t("dashboard:text")}
      />
      <div className="grid gap-8">
        <EncryptionForm action={action as actions} id={id?.[0] ?? ""} />
      </div>
    </DashboardShell>
  )
}
