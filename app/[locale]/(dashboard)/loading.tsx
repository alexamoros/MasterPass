"use client"

import { useTranslations } from "next-intl"

import TableSkelton from "@/components/Dashboard/Loading/table-skelton"
import { DashboardHeader } from "@/components/Dashboard/dashboard-header"
import { DashboardShell } from "@/components/Dashboard/dashboard-shell"
import { SavePasswordButton } from "@/components/Dashboard/save-password-btn"

export default async function DashboardLoading() {
  const t = useTranslations("dashboard")
  return (
    <DashboardShell>
      <DashboardHeader heading={t("heading")} text={t("text")}>
        <SavePasswordButton />
      </DashboardHeader>
      <div className="divide-border-200 divide-y rounded-md border">
        <TableSkelton />
      </div>
    </DashboardShell>
  )
}
