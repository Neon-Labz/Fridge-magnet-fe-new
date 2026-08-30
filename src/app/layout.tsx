import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Toaster } from "react-hot-toast";
import "./globals.css";
import { Space_Grotesk, Inter } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Magnify – Premium Magnetic Photo Tiles",
  description:
    "Print your favorite photos on premium magnetic tiles and create a gallery of memories in your home.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${inter.variable}`}>
      <body className="bg-white text-slate-900 antialiased">
        <Navbar />
        {children}
         <Footer />
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              borderRadius: "12px",
              background: "#fff",
              color: "#0f172a",
              boxShadow: "0 10px 40px rgba(6,182,212,0.15)",
              border: "1px solid #a5f3fc",
            },
          }}
        />
      </body>
    </html>
  );
}
