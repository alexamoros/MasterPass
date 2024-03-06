import { notFound } from "next/navigation"

import { dashboardSideItems } from "@/lib/nav-items"
import { getCurrentUser } from "@/lib/session"
import { SiteFooter } from "@/components/Common/site-footer"
import { DashboardHeader } from "@/components/Header/dashboard-header"
import { UserAccountNav } from "@/components/Header/user-account-nav"
import { DashboardNav } from "@/components/dashboard-side-nav"

interface DashboardLayoutProps {
  children?: React.ReactNode
}

export default async function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  const user = await getCurrentUser()

  if (!user) {
    return notFound()
  }

  return (
    <div className="flex min-h-screen flex-col space-y-6">
      <header className="sticky top-0 z-40 border-b bg-background">
        <DashboardHeader>
          <UserAccountNav
            user={{
              name: user.name,
              image: user.image,
              email: user.email,
            }}
          />
        </DashboardHeader>
      </header>
      <div className="container grid flex-1 gap-12 md:grid-cols-[200px_1fr]">
        <aside className="hidden w-[200px] flex-col md:flex">
          <DashboardNav items={dashboardSideItems} />
        </aside>
        <main className="flex w-full flex-1 flex-col overflow-hidden">
          {children}
        </main>
      </div>
      <SiteFooter className="border-t" />
    </div>
  )
}
