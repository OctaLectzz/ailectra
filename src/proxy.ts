import { getToken } from "next-auth/jwt"
import createMiddleware from "next-intl/middleware"
import { NextRequest, NextResponse } from "next/server"
import { routing } from "./i18n/routing"

const intlMiddleware = createMiddleware(routing)

export default async function proxy(req: NextRequest) {
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET || process.env.AUTH_SECRET,
  })
  
  const isLoggedIn = !!token
  const pathname = req.nextUrl.pathname

  // Match dashboard pathnames (e.g. /dashboard)
  const isDashboard = pathname.startsWith("/dashboard")

  if (isDashboard) {
    if (!isLoggedIn) {
      return NextResponse.redirect(new URL(`/login`, req.nextUrl))
    }
  }

  return intlMiddleware(req)
}

export const config = {
  // Match all pathnames except API, public images, static files, next internals
  matcher: ["/((?!api|_next|.*\\..*).*)"],
}
