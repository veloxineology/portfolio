import { NextRequest, NextResponse } from "next/server";
import { resources } from "@/lib/resources-data";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const title = searchParams.get("title");
  const password = searchParams.get("password");

  if (!title || !password) {
    return new NextResponse("Missing parameters", { status: 400 });
  }

  const resource = resources.find(
    (r) => r.title === title
  );
  if (!resource) {
    return new NextResponse("Resource not found", { status: 404 });
  }
  if (resource.password !== password) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  // Proxy the file from GitHub
  const fileRes = await fetch(resource.fileLink);
  if (!fileRes.ok) {
    return new NextResponse("Failed to fetch file", { status: 502 });
  }
  const fileBuffer = await fileRes.arrayBuffer();
  const fileName = resource.title + resource.fileLink.substring(resource.fileLink.lastIndexOf('.'));
  return new NextResponse(Buffer.from(fileBuffer), {
    status: 200,
    headers: {
      "Content-Type": fileRes.headers.get("content-type") || "application/octet-stream",
      "Content-Disposition": `attachment; filename*=UTF-8''${encodeURIComponent(fileName)}`,
    },
  });
} 