import { NavItemType, SidebarNavItem } from "@/types"

export const MainNavItems: NavItemType[] = [
  { title: "nav1", href: "/" },
  { title: "nav2", href: "#features" },
]

export const dashboardSideItems: SidebarNavItem[] = [
  {
    title: "side_item1",
    href: "/dashboard",
    icon: "folder",
  },
  {
    title: "side_item2",
    href: "/dashboard/save/encrypt",
    icon: "save",
  },
]
