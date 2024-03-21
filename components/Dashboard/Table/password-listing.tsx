"use client"

import { Suspense, useEffect, useState } from "react"
import Link from "next/link"
import { PasswordTableType } from "@/types"
import { useTranslations } from "next-intl"

import { PasswordActions } from "@/components/Dashboard/Table/password-actions"

import "moment/locale/es"
import Image from "next/image"
import { getFavicon } from "@/actions/get-favicon"
import moment from "moment"

type props = {
  password: PasswordTableType
  locale: string
}

export function Password({ password, locale }: props) {
  const [favicon, setFavicon] = useState(null)
  const [loading, setLoading] = useState(true)
  const t = useTranslations("dashboard")
  moment.locale(locale)
  const time = moment(new Date(password.updatedAt)).fromNow()

  useEffect(() => {
    if (password.website) {
      getFavicon({ query: { url: password.website } })
        .then((res) => {
          setFavicon(res)
          setLoading(false)
        })
        .catch((err) => console.log(err))
    }
  }, [password.website])

  const getHostname = (url) => {
    const domain = new URL(url).hostname
    return domain.replace("www.", "")
  }

  const getInitials = (url) => {
    let hostname = getHostname(url)
    return hostname.charAt(0).toUpperCase()
  }

  return (
    <div className="flex items-center justify-between p-4">
      <div className="flex items-start gap-4">
        {favicon ? (
          <Image
            src={favicon}
            priority
            loading="eager"
            alt={`${getHostname(password.website)} favicon`}
            width="24"
            height="24"
            className="size-8 self-center rounded border-2 border-solid p-1"
          />
        ) : (
          <div className="flex size-8 items-center justify-center self-center rounded border-2 border-solid p-1">
            <p>{getInitials(password.website)}</p>
          </div>
        )}
        <div className="grid gap-1">
          <Link
            href={`/dashboard/save/decrypt/${password.id}`}
            className="font-semibold hover:underline"
          >
            {getHostname(password.website)}
          </Link>
          <div>
            <p className="text-sm text-muted-foreground">
              {t("updated")} {time}
            </p>
          </div>
        </div>
      </div>
      <PasswordActions id={password.id} username={password.username} />
    </div>
  )
}
