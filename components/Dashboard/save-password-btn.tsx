"use client"

import Link from "next/link"
import { useTranslation } from "react-i18next"

import { cn } from "@/lib/utils"
import { ButtonProps, buttonVariants } from "@/components/ui/button"
import { Icons } from "@/components/icons"

interface SavePasswordButton extends ButtonProps {}

export function SavePasswordButton({ className, variant }: SavePasswordButton) {
  const { t } = useTranslation()
  return (
    <Link
      href={"/dashboard/save/encrypt"}
      className={cn(buttonVariants({ variant }), className)}
    >
      <Icons.add className="mr-2 h-4 w-4" />
      {t("dashboard:new_btn")}
    </Link>
  )
}
