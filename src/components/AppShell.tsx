"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function AppShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const hideHeaderFooter =
    pathname === "/login" || pathname === "/register";

  return (
    <>
      {!hideHeaderFooter && <Navbar />}
      {children}
      {!hideHeaderFooter && <Footer />}
    </>
  );
}