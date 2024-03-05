import { NavItemType, SidebarNavItem } from "@/types"

export const MainNavItems: NavItemType[] = [
  { title: "common:nav1", href: "/" },
  { title: "common:nav2", href: "#features" },
]

export const dashboardSideItems: SidebarNavItem[] = [
  {
    title: "dashboard:side_item1",
    href: "/dashboard",
    icon: "folder",
  },
  {
    title: "dashboard:side_item2",
    href: "/dashboard/save/encrypt",
    icon: "save",
  },
]
