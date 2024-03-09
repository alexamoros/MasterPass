"use client"

import { useTranslations } from "next-intl"

import FormSkelton from "@/components/Dashboard/Loading/form-skelton"
import { DashboardHeader } from "@/components/Dashboard/dashboard-header"
import { DashboardShell } from "@/components/Dashboard/dashboard-shell"

export default function EncryptionLoading() {
  const t = useTranslations("dashboard")
  return (
    <DashboardShell>
      <DashboardHeader heading={t("heading")} text={t("text")} />
      <div className="divide-border-200 divide-y rounded-md border">
        <FormSkelton />
      </div>
    </DashboardShell>
  )
}
