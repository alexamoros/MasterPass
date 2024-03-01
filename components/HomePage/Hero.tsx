import Link from "next/link"
import { Lock } from "lucide-react"

import { siteConfig } from "@/config/site"

import { Button } from "../ui/button"

export const Hero = () => {
  return (
    <section className="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32">
      <div className="flex flex-col items-center justify-center lg:flex-row">
        <Lock size="25%" />
        <div className="flex flex-col items-center lg:items-start">
          <div className="mt-2 flex flex-row md:mt-0">
            <h1 className="text-2xl md:text-9xl">
              {siteConfig.name.split(" ")[0]}
            </h1>
            <h3 className="text-2xl text-gray-500 md:text-9xl">
              {siteConfig.name.split(" ")[1]}
            </h3>
          </div>
          <p className="mt-2 max-w-[85%] text-center leading-normal text-muted-foreground sm:pl-2.5 sm:text-lg sm:leading-7 md:text-start">
            {siteConfig.description}
          </p>
          <Link href={"/Login"}>
            <Button size={"lg"} className="mt-4 text-lg sm:ml-2.5">
              Get Started
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
