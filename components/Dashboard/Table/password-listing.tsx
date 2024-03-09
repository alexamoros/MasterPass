"use client"

import Link from "next/link"
import { PasswordTableType } from "@/types"
import { useTranslations } from "next-intl"

import { PasswordActions } from "@/components/Dashboard/Table/password-actions"

import "moment/locale/es"
import moment from "moment"

type props = {
  password: PasswordTableType
  locale: string
}

export function Password({ password, locale }: props) {
  const t = useTranslations("dashboard")
  moment.locale(locale)
  const time = moment(new Date(password.updatedAt)).fromNow()
  return (
    <div className="flex items-center justify-between p-4">
      <div className="grid gap-1">
        <Link
          href={`/dashboard/save/decrypt/${password.id}`}
          className="font-semibold hover:underline"
        >
          {password.username}
        </Link>
        <div>
          <p className="text-sm text-muted-foreground">
            {t("updated")} {time}
          </p>
        </div>
      </div>
      <PasswordActions id={password.id} username={password.username} />
    </div>
  )
}
