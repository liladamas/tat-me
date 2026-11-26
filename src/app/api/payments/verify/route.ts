import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { txRef } = body;

    if (!txRef) {
      return NextResponse.json({ success: false, error: "Missing reference" }, { status: 400 });
    }

    // Because 1pay.cx uses webhooks to confirm payment, we simply check the database
    // to see if the webhook has already updated the status.
    const booking = await prisma.booking.findUnique({ where: { reference: txRef } });
    
    if (booking && booking.status === "DEPOSIT_PAID") {
        return NextResponse.json({ success: true, booking });
    }

    return NextResponse.json({ success: false, error: "Payment not yet confirmed" }, { status: 400 });

  } catch (error) {
    console.error("Verification failed:", error);
    return NextResponse.json({ success: false, error: "Verification failed" }, { status: 500 });
  }
}