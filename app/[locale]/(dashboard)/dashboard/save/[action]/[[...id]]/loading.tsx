"use client"

import { useTranslation } from "react-i18next"

import FormSkelton from "@/components/Dashboard/Loading/form-skelton"
import { DashboardHeader } from "@/components/Dashboard/dashboard-header"
import { DashboardShell } from "@/components/Dashboard/dashboard-shell"

export default function EncryptionLoading() {
  const { t } = useTranslation()
  return (
    <DashboardShell>
      <DashboardHeader
        heading={t("dashboard:heading")}
        text={t("dashboard:text")}
      />
      <div className="divide-border-200 divide-y rounded-md border">
        <FormSkelton />
      </div>
    </DashboardShell>
  )
}
