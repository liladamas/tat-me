import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { z } from "zod";
import { computeDeposit } from "@/lib/deposit";
import { TATTOOS } from "@/data/tattoos";

const bookingSchema = z.object({
  serviceType: z.enum(["HOME", "STUDIO", "CUSTOM"]),
  tattooSlug: z.string().optional(),
  customerName: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(5),
  country: z.string(),
  city: z.string(),
  address: z.string().optional(),
  appointmentAt: z.string(),
  notes: z.string().optional(),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const data = bookingSchema.parse(body);

    let basePrice = 150;
    let travelFee = 0;
    
    if (data.tattooSlug) {
      const tattoo = TATTOOS.find(t => t.slug === data.tattooSlug);
      if (tattoo && tattoo.basePrice) {
        basePrice = tattoo.basePrice;
      }
    }

    if (data.serviceType === "HOME") {
      travelFee = 50;
    }

    const totalAmount = basePrice + travelFee;
    const { deposit, balance } = computeDeposit(totalAmount);
    const reference = `TATME-${Math.floor(10000 + Math.random() * 90000)}`;

    const booking = await prisma.booking.create({
      data: {
        reference,
        serviceType: data.serviceType,
        tattooSlug: data.tattooSlug || null,
        customerName: data.customerName,
        email: data.email,
        phone: data.phone,
        country: data.country,
        city: data.city,
        address: data.address || null,
        appointmentAt: new Date(data.appointmentAt),
        notes: data.notes || null,
        totalAmount,
        travelFee,
        currency: "USD",
        depositAmount: deposit,
        balanceAmount: balance,
        status: "AWAITING_PAYMENT",
      },
    });

    return NextResponse.json({ 
      success: true, 
      bookingReference: booking.reference,
      amountToPay: deposit 
    });

  } catch (error: any) {
    console.error("BOOKING ERROR:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Invalid booking data" },
      { status: 400 }
    );
  }
}