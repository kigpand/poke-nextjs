// app/api/poke-image/route.ts
import { NextResponse } from "next/server";

const ALLOWED = new Set(["nexus.traction.one", "raw.githubusercontent.com"]);

export async function GET(req: Request) {
  const u = new URL(req.url);
  const raw = u.searchParams.get("url");
  if (!raw)
    return NextResponse.json({ error: "url required" }, { status: 400 });

  let target: URL;
  try {
    target = new URL(raw);
  } catch {
    return NextResponse.json({ error: "bad url" }, { status: 400 });
  }
  if (!["https:", "http:"].includes(target.protocol))
    return NextResponse.json({ error: "protocol" }, { status: 400 });
  if (!ALLOWED.has(target.hostname))
    return NextResponse.json({ error: "host not allowed" }, { status: 400 });

  const upstream = await fetch(target, {
    headers: {
      "User-Agent": "Mozilla/5.0 (PokemonApp Image Proxy)",
      Accept: "image/avif,image/webp,image/*,*/*;q=0.8",
    },
    cache: "no-store",
  });
  if (!upstream.ok)
    return NextResponse.json(
      { error: `upstream ${upstream.status}` },
      { status: upstream.status }
    );

  const ct = upstream.headers.get("content-type") ?? "application/octet-stream";
  if (!ct.startsWith("image/"))
    return NextResponse.json({ error: "not image" }, { status: 400 });

  const res = new NextResponse(upstream.body, {
    headers: {
      "Content-Type": ct,
      "Cache-Control":
        "public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800",
      ETag: upstream.headers.get("etag") ?? "",
      "Last-Modified": upstream.headers.get("last-modified") ?? "",
    },
  });
  return res;
}
