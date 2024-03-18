import { LucideIcon } from "lucide-react"

interface Params {
  Icon: LucideIcon
  title: string
  description: string
}

export const AboutCard = ({ Icon, title, description }: Params) => {
  return (
    <div className="relative overflow-hidden rounded-lg border bg-background p-2">
      <div className="flex flex-col justify-between rounded-md p-6 sm:h-[180px] ">
        <Icon className="hidden size-12 md:block" />
        <div className="space-y-2">
          <h3 className="font-bold">{title}</h3>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
      </div>
    </div>
  )
}
