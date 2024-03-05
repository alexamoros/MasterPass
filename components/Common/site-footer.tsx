"use client"

import * as React from "react"
import { useTranslation } from "react-i18next"

import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { Icons } from "@/components/icons"

export function SiteFooter({ className }: React.HTMLAttributes<HTMLElement>) {
  const { t } = useTranslation()

  return (
    <footer className={cn(className)}>
      <div className="container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
          <Icons.logo />
          <p className="text-center text-sm leading-loose md:text-left">
            {t("home:built")}{" "}
            <a
              href={siteConfig.links.github}
              target="_blank"
              rel="noreferrer"
              className="font-medium underline underline-offset-4"
            >
              Alejandro Amorós López
            </a>
            . {t("home:based")}{" "}
            <a
              href="https://github.com/mHamzaIqbal1998/MasterPass"
              target="_blank"
              rel="noreferrer"
              className="font-medium underline underline-offset-4"
            >
              MasterPass
            </a>
            . {t("home:source")}{" "}
            <a
              href={siteConfig.links.github}
              target="_blank"
              rel="noreferrer"
              className="font-medium underline underline-offset-4"
            >
              GitHub
            </a>
            .
          </p>
        </div>
      </div>
    </footer>
  )
}
