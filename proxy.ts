import { NextResponse, type NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";
import { getLocale, pathnameHasLocale } from "@/lib/i18n/getLocale";

const SPECIAL_FILE_PATTERN =
  /^\/(sitemap\.xml|robots\.txt|icon(?:\.[a-z]+)?|apple-icon(?:\.[a-z]+)?|opengraph-image(?:\.[a-z]+)?)$/;

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isUnlocalizedRoute =
    pathname.startsWith("/admin") ||
    pathname.startsWith("/api") ||
    SPECIAL_FILE_PATTERN.test(pathname);

  if (!isUnlocalizedRoute && !pathnameHasLocale(pathname)) {
    const locale = getLocale(request);
    const url = request.nextUrl.clone();
    url.pathname = `/${locale}${pathname}`;
    return NextResponse.redirect(url);
  }

  return updateSession(request);
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
