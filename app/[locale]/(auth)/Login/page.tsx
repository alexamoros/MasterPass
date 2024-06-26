"use server"

import Link from "next/link"
import { getTranslations } from "next-intl/server"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { Icons } from "@/components/icons"
import { UserAuthForm } from "@/components/user-auth-form"

export default async function LoginPage() {
  const t = await getTranslations("home")
  return (
    <section className="space-y-6 pb-8  pt-[25%] sm:pt-[15%] md:pb-12 lg:py-32 lg:pt-[12%]">
      <Link
        href="/"
        className={cn(
          buttonVariants({ variant: "ghost" }),
          "absolute left-4 top-4 md:left-8 md:top-8"
        )}
      >
        <>
          <Icons.chevronLeft className="size-4" />
        </>
      </Link>
      <div className="flex flex-col items-center justify-center lg:flex-row">
        <div className="mx-auto flex w-[250px] flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <Icons.logo className="mx-auto size-6" />
            <h1 className="text-2xl font-semibold tracking-tight">
              {t("welcome")}
            </h1>
          </div>
          <UserAuthForm />
        </div>
      </div>
    </section>
  )
}
