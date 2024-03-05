import { NextResponse } from "next/server"
import i18nConfig from "@/i18nConfig.js"
import { getToken } from "next-auth/jwt"
import { withAuth } from "next-auth/middleware"
import { i18nRouter } from "next-i18n-router"

export default withAuth(
  async function middleware(req) {
    const token = await getToken({ req })
    const isAuth = !!token
    const isAuthPage =
      req.nextUrl.pathname.startsWith("/Login") ||
      req.nextUrl.pathname.startsWith("/register")

    if (isAuthPage) {
      if (isAuth) {
        return NextResponse.redirect(new URL("/dashboard", req.url))
      }

      return null
    }

    if (!isAuth) {
      let from = req.nextUrl.pathname
      if (req.nextUrl.search) {
        from += req.nextUrl.search
      }

      return NextResponse.redirect(
        new URL(`/Login?from=${encodeURIComponent(from)}`, req.url)
      )
    }

    return i18nRouter(req, i18nConfig)
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
