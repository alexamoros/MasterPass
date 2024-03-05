"use client"

import I18nInstance, { createInstance } from "i18next"
import { I18nextProvider, I18nextProviderProps } from "react-i18next"

import initTranslations from "@/app/i18n"

interface TranslationsProviderProps extends I18nextProviderProps {
  locale: string
  namespaces: string[]
  resources?: any
}

export default function TranslationsProvider({
  children,
  locale,
  namespaces,
  resources,
}: TranslationsProviderProps) {
  const i18n: typeof I18nInstance = createInstance()

  initTranslations(locale, namespaces, i18n, resources)

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>
}
