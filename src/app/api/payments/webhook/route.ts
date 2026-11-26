import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import crypto from "crypto";

export async function POST(req: Request) {
  try {
    // 1. Get the signature header sent by Flutterwave
    const signature = req.headers.get("verif-hash");

    if (!signature) {
      return NextResponse.json({ error: "Missing signature" }, { status: 401 });
    }

    // 2. Verify it matches your secret webhook hash
    const secretHash = process.env.FLUTTERWAVE_WEBHOOK_SECRET;
    if (signature !== secretHash) {
      return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
    }

    const payload = await req.json();

    // 3. Validate that it's a successful charge
    if (payload.event === "charge.completed" && payload.data.status === "successful") {
      const txRef = payload.data.tx_ref;
      const transactionId = payload.data.id.toString();

      // 4. Check if we already processed this (Idempotency)
      const existingPayment = await prisma.payment.findUnique({
        where: { txRef },
      });

      if (existingPayment && existingPayment.status === "SUCCESSFUL") {
        return NextResponse.json({ success: true, message: "Already processed" });
      }

      // 5. Find the booking and update it
      const booking = await prisma.booking.findUnique({ where: { reference: txRef } });

      if (booking) {
        await prisma.booking.update({
          where: { reference: txRef },
          data: {
            status: "DEPOSIT_PAID",
            payment: {
              create: {
                txRef,
                flwTransactionId: transactionId,
                amount: payload.data.amount,
                currency: payload.data.currency,
                status: "SUCCESSFUL",
                verifiedAt: new Date(),
              },
            },
          },
        });
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json({ error: "Webhook handler failed" }, { status: 500 });
  }
}