import { type NextRequest, NextResponse } from "next/server";
import { APP_ENV } from "@/config/env";

type Params = { params: Promise<{ path: string[] }> };

export async function GET(request: NextRequest, { params }: Params) {
  const { path } = await params;

  const apiPath = path.join("/");
  const search = request.nextUrl.search;
  const upstreamUrl = `${APP_ENV.API_BASE_URL}/${apiPath}/${search}`;

  try {
    const response = await fetch(upstreamUrl, {
      headers: { Accept: "application/json" },
      next: { revalidate: 60 },
    });

    if (!response.ok) {
      return NextResponse.json(
        { detail: `Upstream ${response.status}` },
        { status: response.status },
      );
    }

    const data = await response.json();
    return NextResponse.json(data, {
      headers: {
        "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
      },
    });
  } catch (error) {
    console.error(`[proxy] ${upstreamUrl}`, error);
    return NextResponse.json({ detail: "Proxy error" }, { status: 502 });
  }
}
