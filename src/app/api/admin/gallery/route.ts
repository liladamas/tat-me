import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET() {
  const tattoos = await prisma.tattoo.findMany({ orderBy: { createdAt: "desc" } });
  return NextResponse.json(tattoos);
}

export async function POST(req: Request) {
  const { title, category, price, imagePath } = await req.json();
  const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, "-") + "-" + Date.now();
  
  const newTattoo = await prisma.tattoo.create({
    data: {
      slug,
      title,
      category,
      imagePath,
      basePrice: Number(price),
      currency: "USD",
    },
  });
  
  return NextResponse.json(newTattoo);
}