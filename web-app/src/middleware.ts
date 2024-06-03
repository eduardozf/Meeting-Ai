import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const currentUser = { name: "edu" };
  // const currentUser = request.cookies.get('currentUser')?.value

  if (currentUser && !request.nextUrl.pathname.startsWith("/dashboard")) {
    return Response.redirect(new URL("/upload", request.url));
  }

  if (!currentUser && !request.nextUrl.pathname.startsWith("/login")) {
    return Response.redirect(new URL("/login", request.url));
  }
}
