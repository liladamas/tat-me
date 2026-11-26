"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { BUSINESS } from "@/lib/config/business";

function CallbackContent() {
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<"loading" | "success" | "failed">("loading");
  const [bookingDetails, setBookingDetails] = useState<any>(null);

  useEffect(() => {
    const verifyPayment = async () => {
      const txRef = searchParams.get("tx_ref");

      if (!txRef) {
        setStatus("failed");
        return;
      }

      try {
        // We call our own verify API which checks the database.
        // The database is updated by the 1pay.cx webhook or by the redirect.
        const res = await fetch("/api/payments/verify", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ txRef }),
        });

        const data = await res.json();

        if (data.success) {
          setStatus("success");
          setBookingDetails(data.booking);
        } else {
          setStatus("failed");
        }
      } catch (error) {
        console.error(error);
        setStatus("failed");
      }
    };

    verifyPayment();
  }, [searchParams]);

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-brand-white dark:bg-brand-black">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-burgundy mx-auto mb-4"></div>
          <p className="text-brand-black dark:text-brand-white font-serif text-xl">Verifying your payment...</p>
        </div>
      </div>
    );
  }

  if (status === "failed") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-brand-white dark:bg-brand-black px-4">
        <div className="max-w-md w-full bg-gray-50 dark:bg-brand-charcoal p-8 rounded-sm border border-red-500 text-center">
          <h2 className="text-3xl font-serif font-bold text-red-500 mb-4">Payment Pending</h2>
          <p className="text-gray-600 dark:text-brand-gray mb-8">
            We could not verify your payment yet. If you were charged, please contact us on WhatsApp immediately.
          </p>
          <a href={`https://wa.me/${BUSINESS.whatsapp.replace(/\D/g, '')}`} className="block w-full bg-brand-burgundy text-brand-white py-3 rounded-sm font-bold uppercase tracking-wider text-sm hover:bg-brand-burgundy/80 transition-colors">
            Contact Support
          </a>
        </div>
      </div>
    );
  }

  const waLink = `https://wa.me/${BUSINESS.whatsapp.replace(/\D/g, '')}?text=${encodeURIComponent(`Hello TAT-ME! I have paid my deposit. My booking reference is ${bookingDetails.reference}.`)}`;

  return (
    <div className="min-h-screen py-24 bg-brand-white dark:bg-brand-black px-4 transition-colors duration-300">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-12">
          <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
          </div>
          <h1 className="text-4xl font-serif font-bold text-brand-black dark:text-brand-white mb-2">Thank You!</h1>
          <p className="text-gray-600 dark:text-brand-gray">Your deposit has been received successfully.</p>
        </div>

        <div className="bg-gray-50 dark:bg-brand-charcoal border border-gray-200 dark:border-brand-black rounded-sm p-8 shadow-xl">
          <div className="flex justify-between items-center border-b border-gray-200 dark:border-brand-black pb-6 mb-6">
            <div>
              <h3 className="font-serif font-bold text-2xl text-brand-black dark:text-brand-white">Booking Receipt</h3>
              <p className="text-brand-burgundy font-mono text-sm">{bookingDetails.reference}</p>
            </div>
            <span className="bg-green-500/10 text-green-600 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">Paid</span>
          </div>

          <div className="space-y-4 mb-8">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500 dark:text-brand-gray">Customer Name</span>
              <span className="text-brand-black dark:text-brand-white font-semibold">{bookingDetails.customerName}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500 dark:text-brand-gray">Appointment Date</span>
              <span className="text-brand-black dark:text-brand-white font-semibold">{new Date(bookingDetails.appointmentAt).toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-sm border-t border-gray-200 dark:border-brand-black pt-4 mt-4">
              <span className="text-gray-500 dark:text-brand-gray">Total Price</span>
              <span className="text-brand-black dark:text-brand-white font-semibold">${bookingDetails.totalAmount}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-brand-burgundy font-bold">Deposit Paid (60%)</span>
              <span className="text-brand-burgundy font-bold">${bookingDetails.depositAmount}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500 dark:text-brand-gray">Remaining Balance</span>
              <span className="text-brand-black dark:text-brand-white font-semibold">${bookingDetails.balanceAmount}</span>
            </div>
          </div>

          <div className="space-y-4">
            <a 
              href={waLink}
              target="_blank" 
              rel="noreferrer"
              className="block w-full bg-[#25D366] text-white text-center py-4 rounded-sm font-bold uppercase tracking-wider text-sm hover:bg-[#128C7E] transition-colors shadow-lg"
            >
              Chat with TAT-ME on WhatsApp
            </a>
            <Link href="/" className="block w-full text-center py-3 text-gray-500 dark:text-brand-gray hover:text-brand-black dark:hover:text-brand-white text-sm font-semibold">
              Return to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CallbackPage() {
  return (
    <Suspense fallback={<div className="text-center py-32 bg-brand-black text-brand-white">Loading...</div>}>
      <CallbackContent />
    </Suspense>
  );
}