import { Suspense } from "react";
import { prisma } from "@/lib/db";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { connection } from "next/server";

async function BookingsTable() {
  // THIS IS THE FIX: Waits for a real user request before running
  await connection();

  const cookieStore = await cookies();
  const session = cookieStore.get("admin_session");

  if (!session || session.value !== "authenticated") {
    redirect("/admin/login");
  }

  const bookings = await prisma.booking.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="bg-gray-50 dark:bg-brand-charcoal border border-gray-200 dark:border-brand-gray/20 rounded-sm overflow-x-auto shadow-lg">
      <table className="w-full text-left text-sm text-gray-600 dark:text-brand-gray">
        <thead className="bg-gray-100 dark:bg-brand-black text-brand-black dark:text-brand-white uppercase tracking-wider text-xs">
          <tr>
            <th className="px-6 py-4">Ref</th>
            <th className="px-6 py-4">Customer</th>
            <th className="px-6 py-4">Date</th>
            <th className="px-6 py-4">Type</th>
            <th className="px-6 py-4">Total</th>
            <th className="px-6 py-4">Deposit</th>
            <th className="px-6 py-4">Status</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 dark:divide-brand-black">
          {bookings.map((b) => (
            <tr key={b.id} className="hover:bg-gray-100 dark:hover:bg-brand-black/50 transition-colors">
              <td className="px-6 py-4 font-mono text-brand-burgundy font-bold">{b.reference}</td>
              <td className="px-6 py-4">
                <p className="text-brand-black dark:text-brand-white font-semibold">{b.customerName}</p>
                <p className="text-xs">{b.email}</p>
              </td>
              <td className="px-6 py-4">{new Date(b.appointmentAt).toLocaleDateString()}</td>
              <td className="px-6 py-4">
                <span className="bg-gray-200 dark:bg-brand-black px-2 py-1 rounded text-xs">{b.serviceType}</span>
              </td>
              <td className="px-6 py-4">${b.totalAmount.toString()}</td>
              <td className="px-6 py-4 text-brand-burgundy font-bold">${b.depositAmount.toString()}</td>
              <td className="px-6 py-4">
                <span className={`px-2 py-1 rounded text-xs font-bold ${
                  b.status === "DEPOSIT_PAID" ? "bg-green-500/10 text-green-600 dark:text-green-500" : "bg-yellow-500/10 text-yellow-600 dark:text-yellow-500"
                }`}>
                  {b.status}
                </span>
              </td>
            </tr>
          ))}
          {bookings.length === 0 && (
            <tr>
              <td colSpan={7} className="px-6 py-8 text-center">No bookings yet.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default function AdminBookings() {
  return (
    <div className="min-h-screen bg-brand-white dark:bg-brand-black p-8 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div className="flex items-center gap-6">
            <h1 className="text-3xl font-serif font-bold text-brand-black dark:text-brand-white">Admin Dashboard</h1>
            <div className="flex gap-4 border-l border-gray-300 dark:border-brand-gray/30 pl-6">
              <a href="/admin/bookings" className="text-brand-burgundy font-bold transition-colors">Bookings</a>
              <a href="/admin/gallery" className="text-gray-500 hover:text-brand-black dark:hover:text-brand-white font-bold transition-colors">Gallery</a>
              <a href="/admin/content" className="text-gray-500 hover:text-brand-black dark:hover:text-brand-white font-bold transition-colors">Content</a>
            </div>
          </div>
          <a href="/" className="text-gray-500 dark:text-brand-gray hover:text-brand-black dark:hover:text-brand-white transition-colors text-sm font-semibold">
            &larr; Back to Site
          </a>
        </div>
        
        <Suspense fallback={<div className="text-center py-8 text-gray-500">Loading bookings...</div>}>
          <BookingsTable />
        </Suspense>
      </div>
    </div>
  );
}