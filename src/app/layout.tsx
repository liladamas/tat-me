import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { ThemeProvider } from "@/components/ui/ThemeProvider";
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
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${playfair.variable} font-sans flex flex-col min-h-screen transition-colors duration-300`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <Navbar />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
          <WhatsAppFloat />
        </ThemeProvider>
      </body>
    </html>
  );
}