"use client"

import { useTranslation } from "react-i18next"

import { featureList } from "@/lib/features"

import { AboutCard } from "../Common/AboutCard"

export const Features = () => {
  const { t } = useTranslation()

  return (
    <section
      id="features"
      className="container space-y-6 bg-slate-50 py-8 dark:bg-transparent md:py-12 lg:py-24"
    >
      <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
        <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
          {t("home:features")}
        </h2>
        <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
          {t("home:features_description")}
        </p>
      </div>
      <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem]">
        {featureList.map((feature, index) => {
          return (
            <AboutCard
              Icon={feature.Icon}
              title={t(feature.title)}
              description={t(feature.description)}
              key={index}
            />
          )
        })}
      </div>
    </section>
  )
}
