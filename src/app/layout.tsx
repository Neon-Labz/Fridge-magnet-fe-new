import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Toaster } from "react-hot-toast";
import "./globals.css";

export const metadata: Metadata = {
  title: "Magnify – Premium Magnetic Photo Tiles",
  description:
    "Print your favorite photos on premium magnetic tiles and create a gallery of memories in your home.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-white text-slate-900 antialiased">
        {children}
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
