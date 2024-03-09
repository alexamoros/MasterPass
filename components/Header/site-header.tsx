"use client"

import * as React from "react"
import Link from "next/link"
import { useTranslations } from "next-intl"

import { NavItemType } from "types"
import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { MobileNav } from "@/components/Header/mobile-nav"
import { Icons } from "@/components/icons"

import { ThemeToggle } from "../theme-toggle"

interface MainNavProps {
  items?: NavItemType[]
  children?: React.ReactNode
}

export function SiteHeader({ items, children }: MainNavProps) {
  const t = useTranslations("home")
  const [showMobileMenu, setShowMobileMenu] = React.useState<boolean>(false)

  return (
    <div className="flex justify-between gap-6 border-2 p-5 drop-shadow-md md:gap-10">
      <>
        <Link href="/" className="hidden items-center space-x-2 md:flex">
          <Icons.logo />
          <span className="hidden font-bold sm:inline-block">
            {siteConfig.name}
          </span>
        </Link>

        {items?.length ? (
          <nav className="hidden gap-6 md:flex">
            {items?.map((item, index) => (
              <Link
                key={index}
                href={item.disabled ? "#" : item.href}
                className={cn(
                  "flex items-center text-lg font-medium transition-colors hover:text-foreground/80 sm:text-sm",
                  item.disabled && "cursor-not-allowed opacity-80"
                )}
              >
                {t(item.title)}
              </Link>
            ))}
          </nav>
        ) : null}

        <button
          className="flex items-center space-x-2 md:hidden"
          onClick={() => setShowMobileMenu(!showMobileMenu)}
        >
          {showMobileMenu ? <Icons.close /> : <Icons.logo />}
          <span className="font-bold">Menu</span>
        </button>
      </>
      {showMobileMenu && items && (
        <MobileNav items={items} setShowMobileMenu={setShowMobileMenu}>
          {children}
        </MobileNav>
      )}
      <ThemeToggle />
    </div>
  )
}
