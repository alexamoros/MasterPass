import { MainNavItems } from "@/lib/nav-items"
import { SiteFooter } from "@/components/Common/site-footer"
import { SiteHeader } from "@/components/Header/site-header"

interface MarketingLayoutProps {
  children: React.ReactNode
}

export default async function MarketingLayout({
  children,
}: MarketingLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader items={MainNavItems} />
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </div>
  )
}
