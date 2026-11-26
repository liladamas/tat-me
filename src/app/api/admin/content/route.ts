import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET() {
  const setting = await prisma.siteSetting.findUnique({ where: { id: "main" } });
  return NextResponse.json(setting || {});
}

export async function POST(req: Request) {
  const { videoUrl, reviewsJson } = await req.json();

  await prisma.siteSetting.upsert({
    where: { id: "main" },
    update: { videoUrl, reviewsJson },
    create: { id: "main", videoUrl, reviewsJson },
  });

  return NextResponse.json({ success: true });
}