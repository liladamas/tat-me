import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, location, rating, text } = body;

    if (!name || !rating || !text) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    await prisma.review.create({
      data: {
        name,
        location,
        rating: Number(rating),
        text,
        isVisible: false, // Admin must approve it first
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Review submission error:", error);
    return NextResponse.json({ error: "Failed to submit review" }, { status: 500 });
  }
}