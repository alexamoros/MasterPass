import i18nConfig from "@/i18nConfig"
import i18n from "i18next"
import I18nInstance, { Resource, createInstance } from "i18next"
import resourcesToBackend from "i18next-resources-to-backend"
import moment from "moment"
import { initReactI18next } from "react-i18next/initReactI18next"

export default async function initTranslations(
  locale: string,
  namespaces: string[],
  resources?: Resource
) {
  const i18nInstance = i18n.createInstance()

  i18nInstance.use(initReactI18next)

  if (!resources) {
    i18nInstance.use(
      resourcesToBackend(
        (language: string, namespace: string) =>
          import(`@/locales/${language}/${namespace}.json`)
      )
    )
  }

  if (!namespaces) {
    namespaces = ["home", "common", "dashboard", "encrypt_form"]
  }

  await i18nInstance.init({
    lng: locale,
    resources,
    fallbackLng: i18nConfig.defaultLocale,
    supportedLngs: i18nConfig.locales,
    defaultNS: namespaces[0],
    fallbackNS: namespaces[0],
    ns: namespaces,
    preload: resources ? [] : i18nConfig.locales,
    interpolation: {
      format: function (value, format, lng) {
        if (value instanceof Date) return moment(value).format(format)
        return value
      },
    },
  })

  return {
    i18n: i18nInstance,
    resources: i18nInstance.services.resourceStore.data,
    t: i18nInstance.t,
  }
}
