import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const resolvedParams = await params;
  await prisma.tattoo.delete({ where: { id: resolvedParams.id } });
  return NextResponse.json({ success: true });
}