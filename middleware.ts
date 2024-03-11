import { NextResponse } from "next/server"
import { parse } from "accept-language-parser"
import { getToken } from "next-auth/jwt"
import { withAuth } from "next-auth/middleware"
import createIntlMiddleware from "next-intl/middleware"

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

    // Root Layout Restrictions for Authenticated Users with Refinement
    const pathname = req.nextUrl.pathname
    if (
      isAuth &&
      (pathname === "/" || pathname.startsWith(`/${defaultLocale}/`))
    ) {
      // Only redirect if not already on the dashboard
      if (!pathname.startsWith(`/${defaultLocale}/dashboard`)) {
        return NextResponse.redirect(
          new URL(`${defaultLocale}/dashboard`, req.url)
        )
      }
    }

    //Unauthenticated Access to Dashboard
    if (
      !isAuth &&
      req.nextUrl.pathname.startsWith(`/${defaultLocale}/dashboard`)
    ) {
      return NextResponse.redirect(new URL(`/${defaultLocale}/login`, req.url))
    }

    // Step 3: Root Path Handling (Landing Page)
    if (req.nextUrl.pathname === "/") {
      const locale = acceptLanguageHeader
        ? parse(acceptLanguageHeader)[0]?.code
        : defaultLocale
      return NextResponse.redirect(new URL(`/${locale}`, req.url))
    }

    // Step 4: Conditional Internationalization Middleware
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
