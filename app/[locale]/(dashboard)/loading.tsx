"use client"

import { useTranslation } from "react-i18next"

import TableSkelton from "@/components/Dashboard/Loading/table-skelton"
import { DashboardHeader } from "@/components/Dashboard/dashboard-header"
import { DashboardShell } from "@/components/Dashboard/dashboard-shell"
import { SavePasswordButton } from "@/components/Dashboard/save-password-btn"

export default async function DashboardLoading() {
  const { t } = useTranslation()
  return (
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
  )
}
