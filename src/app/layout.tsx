import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WhatsAppFloat from "@/components/ui/WhatsAppFloat";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });

export const metadata: Metadata = {
  title: "TAT-ME | Premium Tattoo Booking",
  description: "Discover exceptional tattoo artistry and book your next tattoo experience with TAT-ME.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" style={{ colorScheme: "dark" }} suppressHydrationWarning>
      <body className={`${inter.variable} ${playfair.variable} font-sans flex flex-col min-h-screen bg-brand-black text-brand-white transition-colors duration-300`}>
        <Navbar />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
        <WhatsAppFloat />
      </body>
    </html>
  );
}