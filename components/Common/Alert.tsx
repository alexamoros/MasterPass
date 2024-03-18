import { LucideIcon } from "lucide-react"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

type props = {
  variant: "default" | "destructive" | null | undefined
  Icon: LucideIcon
  title: string
  description: string
}
const AlertMenu = ({ title, description, variant, Icon }: props) => {
  return (
    <Alert variant={variant}>
      <Icon className="size-4" />
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>{description}</AlertDescription>
    </Alert>
  )
}

export default AlertMenu
