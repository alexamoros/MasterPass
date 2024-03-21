// actions/get-favicon.ts
"use server"

import { JSDOM } from "jsdom"

export async function getFavicon(req: { query: any }) {
  const { url } = req.query

  try {
    const response = await fetch(url)
    const html = await response.text()
    const dom = new JSDOM(html)
    const document = dom.window.document
    let faviconElement =
      document.querySelector('link[rel="shortcut icon"]') ||
      document.querySelector('link[rel="icon"]')

    let faviconUrl = faviconElement ? faviconElement.href : null

    // Si no se encuentra el favicon en las etiquetas link, intenta acceder a favicon.ico en la raíz del sitio
    if (!faviconUrl) {
      const faviconResponse = await fetch(`${url}/favicon.ico`)
      if (faviconResponse.ok) {
        faviconUrl = `${url}/favicon.ico`
      }
    }

    // Si aún no se encuentra el favicon, intenta acceder a /images/favicon.ico
    if (!faviconUrl) {
      const faviconResponse = await fetch(`${url}/images/favicon.ico`)
      if (faviconResponse.ok) {
        faviconUrl = `${url}/images/favicon.ico`
      }
    }

    // Comprueba si la URL del favicon es relativa o absoluta
    const favicon = faviconUrl.startsWith("http")
      ? faviconUrl
      : `${url}/${faviconUrl}`

    // Devuelve solo la URL del favicon como una cadena, no el objeto JSDOM completo
    return favicon
  } catch (error) {
    return { error: error.message }
  }
}
