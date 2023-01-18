import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { decodeBase64 } from "./lib/buffer";

export const config = {
  matcher: ["/"],
};

export function middleware(req: NextRequest) {
  const basicAuth = req.headers.get("authorization");
  const url = req.nextUrl;

  if (basicAuth) {
    const authValue = basicAuth.split(" ")[1];
    const [user, pwd] = decodeBase64(authValue).split(":");

    if (
      user === process.env.NEXT_PUBLIC_USER &&
      pwd === process.env.NEXT_PUBLIC_PASS
    ) {
      return NextResponse.next();
    }
  }
  url.pathname = "/api/auth";

  return NextResponse.rewrite(url);
}
