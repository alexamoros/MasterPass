import { NextResponse } from "next/server"
import { parse } from "accept-language-parser"
import { getToken } from "next-auth/jwt"
import { withAuth } from "next-auth/middleware"
import createIntlMiddleware from "next-intl/middleware"

import { locales } from "./i18n"

export default withAuth(
  async function middleware(req) {
    // Step 1: Enhanced Locale Detection
    const acceptLanguageHeader = req.headers.get("accept-language")
    const defaultLocale = acceptLanguageHeader
      ? parse(acceptLanguageHeader)[0]?.code
      : "en" // Default to English

    // Step 2: Authentication Logic
    const token = await getToken({ req })
    const isAuth = !!token

    // Step 3: Root Layout Protection for Authenticated Users
    if (isAuth) {
      const pathname = req.nextUrl.pathname

      if (pathname === "/" || pathname.startsWith(`/${defaultLocale}/`)) {
        // Redirect to dashboard if not already on it
        if (!pathname.startsWith(`/${defaultLocale}/dashboard`)) {
          return NextResponse.redirect(
            new URL(`${defaultLocale}/dashboard`, req.url)
          )
        }
      }
    }

    // Step 4: Unauthenticated Access Restriction to Dashboard
    if (
      !isAuth &&
      req.nextUrl.pathname.startsWith(`/${defaultLocale}/dashboard`)
    ) {
      return NextResponse.redirect(new URL(`/${defaultLocale}/login`, req.url))
    }

    // Step 5: Root Path Handling and Locale Redirects
    if (req.nextUrl.pathname === "/") {
      if (!locales.includes(defaultLocale)) {
        return NextResponse.redirect(new URL(`/${defaultLocale}`, req.url))
      }
    }

    // Step 6: Complex URL Handling
    const segments = req.nextUrl.pathname.split("/")
    let initialLocale = segments[1]

    if (
      segments.length > 2 &&
      !locales.includes(initialLocale) &&
      initialLocale !== "dashboard"
    ) {
      segments[1] = defaultLocale
      const updatedPath = segments.join("/")
      return NextResponse.redirect(new URL(updatedPath, req.url))
    }

    // Step 7: Conditional Internationalization Middleware
    const handleI18nRouting = createIntlMiddleware({
      locales: ["en", "es"],
      defaultLocale: defaultLocale,
      localePrefix: "always",
    })

    return handleI18nRouting(req)
  },
  {
    callbacks: {
      async authorized() {
        // This is a work-around for handling redirect on auth pages.
        // We return true here so that the middleware function above
        // is always called.
        return true
      },
    },
  }
)

// Don't invoke Middleware on some paths (clerk regular expression)
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
}
