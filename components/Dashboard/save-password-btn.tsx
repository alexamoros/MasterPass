"use client"

import Link from "next/link"
import { useTranslations } from "next-intl"

import { cn } from "@/lib/utils"
import { ButtonProps, buttonVariants } from "@/components/ui/button"
import { Icons } from "@/components/icons"

interface SavePasswordButton extends ButtonProps {}

export function SavePasswordButton({ className, variant }: SavePasswordButton) {
  const t = useTranslations("dashboard")
  return (
    <Link
      href={"/dashboard/save/encrypt"}
      className={cn(buttonVariants({ variant }), className)}
    >
      <Icons.add className="mr-2 size-4" />
      {t("new_btn")}
    </Link>
  )
}
