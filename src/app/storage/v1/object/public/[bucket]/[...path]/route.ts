import { createHash } from "crypto";
import { promises as fs } from "fs";
import path from "path";
import { readObject } from "@/lib/db/storage";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const STORAGE_ROOT =
  process.env.STORAGE_ROOT || path.join(process.cwd(), ".storage");

async function getOptimized(
  bytes: Buffer,
  width: number,
  quality: number,
  format: "webp" | "jpeg"
): Promise<{ bytes: Buffer; contentType: string }> {
  const sharp = (await import("sharp")).default;
  let pipeline = sharp(bytes, { failOn: "none" })
    .rotate()
    .resize({
      width,
      withoutEnlargement: true,
      fit: "inside",
    });

  if (format === "webp") {
    const out = await pipeline.webp({ quality, effort: 4 }).toBuffer();
    return { bytes: out, contentType: "image/webp" };
  }
  const out = await pipeline.jpeg({ quality, mozjpeg: true }).toBuffer();
  return { bytes: out, contentType: "image/jpeg" };
}

export async function GET(
  req: Request,
  ctx: { params: Promise<{ bucket: string; path: string[] }> }
): Promise<Response> {
  const { bucket, path: pathParts } = await ctx.params;
  const objectPath = pathParts.map(decodeURIComponent).join("/");
  const obj = await readObject(bucket, objectPath);
  if (!obj) {
    return new Response(JSON.stringify({ error: "Object not found" }), {
      status: 404,
      headers: { "Content-Type": "application/json" },
    });
  }

  const url = new URL(req.url);
  const widthRaw = Number(url.searchParams.get("w") || 0);
  const quality = Math.min(
    Math.max(Number(url.searchParams.get("q") || 75) || 75, 40),
    90
  );
  const format =
    (url.searchParams.get("f") || "webp").toLowerCase() === "jpeg"
      ? "jpeg"
      : "webp";
  const wantsOptimize =
    widthRaw > 0 &&
    widthRaw <= 2000 &&
    (obj.contentType.startsWith("image/") ||
      /\.(jpe?g|png|webp|gif)$/i.test(objectPath));

  if (!wantsOptimize) {
    return new Response(new Uint8Array(obj.bytes), {
      status: 200,
      headers: {
        "Content-Type": obj.contentType,
        "Cache-Control": "public, max-age=31536000, immutable",
        "Access-Control-Allow-Origin": "*",
      },
    });
  }

  const width = Math.round(widthRaw);
  const cacheKey = createHash("sha1")
    .update(`${bucket}/${objectPath}|w${width}|q${quality}|${format}`)
    .digest("hex");
  const cacheDir = path.join(STORAGE_ROOT, "_imgcache");
  const cacheFile = path.join(cacheDir, `${cacheKey}.${format === "webp" ? "webp" : "jpg"}`);

  try {
    const cached = await fs.readFile(cacheFile);
    return new Response(new Uint8Array(cached), {
      status: 200,
      headers: {
        "Content-Type": format === "webp" ? "image/webp" : "image/jpeg",
        "Cache-Control": "public, max-age=31536000, immutable",
        "Access-Control-Allow-Origin": "*",
        "X-Image-Cache": "HIT",
      },
    });
  } catch {
    // miss
  }

  try {
    const optimized = await getOptimized(obj.bytes, width, quality, format);
    await fs.mkdir(cacheDir, { recursive: true });
    await fs.writeFile(cacheFile, optimized.bytes).catch(() => {});
    return new Response(new Uint8Array(optimized.bytes), {
      status: 200,
      headers: {
        "Content-Type": optimized.contentType,
        "Cache-Control": "public, max-age=31536000, immutable",
        "Access-Control-Allow-Origin": "*",
        "X-Image-Cache": "MISS",
      },
    });
  } catch (e) {
    console.warn("[storage] optimize failed, serving original:", e);
    return new Response(new Uint8Array(obj.bytes), {
      status: 200,
      headers: {
        "Content-Type": obj.contentType,
        "Cache-Control": "public, max-age=86400",
        "Access-Control-Allow-Origin": "*",
      },
    });
  }
}
