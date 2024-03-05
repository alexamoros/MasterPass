"use client"

import Link from "next/link"
import { PasswordTableType } from "@/types"
import { useTranslation } from "react-i18next"

import { PasswordActions } from "@/components/Dashboard/Table/password-actions"

import "moment/locale/es"
import moment from "moment"

type props = {
  password: PasswordTableType
}

export function Password({ password }: props) {
  const { t, i18n } = useTranslation()
  moment.locale(i18n.language)
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
            {t("dashboard:updated")} {time}
          </p>
        </div>
      </div>
      <PasswordActions id={password.id} username={password.username} />
    </div>
  )
}
