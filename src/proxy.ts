import { NextRequest, NextResponse } from "next/server";

/**
 * Preview/staging guard. Production hosts serve indexable pages; every other
 * host (vercel.app aliases, preview deployments) is marked noindex so it
 * cannot leak into search results. When the production domain changes, set
 * the PRODUCTION_HOST environment variable.
 */
const DEFAULT_PRODUCTION_HOSTS = [
  "fixeagleinvestments.com",
  "www.fixeagleinvestments.com",
  "localhost",
];

export default function proxy(request: NextRequest) {
  const configured = process.env.PRODUCTION_HOST;
  const hosts = configured
    ? [configured, `www.${configured}`, "localhost"]
    : DEFAULT_PRODUCTION_HOSTS;

  const host = (request.headers.get("host") ?? "").replace(/:\d+$/, "");
  const isProduction = hosts.includes(host);

  const response = NextResponse.next();
  if (!isProduction) {
    response.headers.set("X-Robots-Tag", "noindex, nofollow");
  }
  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|images/|icon.png|apple-icon.png).*)"],
};
