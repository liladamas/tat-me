import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { bookingReference } = body;

    if (!bookingReference) {
      return NextResponse.json({ error: "Booking reference is required" }, { status: 400 });
    }

    const booking = await prisma.booking.findUnique({
      where: { reference: bookingReference },
    });

    if (!booking) {
      return NextResponse.json({ error: "Booking not found" }, { status: 404 });
    }

    const amountInCents = Math.round(Number(booking.depositAmount) * 100);

    const response = await fetch("https://api.1pay.cx/v1/payments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.ONEPAY_API_KEY}`,
      },
      body: JSON.stringify({
        amount: amountInCents,
        currency: "USD",
        reference: booking.reference,
        return_url: `${process.env.NEXT_PUBLIC_APP_URL}/checkout/callback?tx_ref=${booking.reference}`,
        description: `Tattoo Booking ${booking.reference}`,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      // 1pay.cx sometimes returns a relative URL like "/pay/xxx"
      let finalLink = data.checkoutUrl || data.url;
      
      if (finalLink && finalLink.startsWith("/")) {
        finalLink = `https://1pay.cx${finalLink}`;
      }
      
      if (finalLink) {
        return NextResponse.json({ link: finalLink });
      }
    }

    console.error("1pay.cx Initiation Error:", data);
    return NextResponse.json({ error: data.message || "Failed to create payment link" }, { status: 500 });

  } catch (error) {
    console.error("Payment initiation failed:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}