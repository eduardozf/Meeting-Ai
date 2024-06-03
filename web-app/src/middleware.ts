import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // TODO colocar COOKIES dentro de um serviço
  const isAuthenticated = request.cookies.get("isAuthenticated")?.value;
  const inLoginPage = request.nextUrl.pathname.startsWith("/login");

  if (isAuthenticated && inLoginPage) {
    return Response.redirect(new URL("/upload", request.url));
  }

  if (!isAuthenticated && !inLoginPage) {
    return Response.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
