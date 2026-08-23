"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import { CheckCircle2, ShoppingBag, Home } from "lucide-react";

function OrderSuccessContent() {
  const params = useSearchParams();
  const orderId = params.get("orderId");

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-3xl p-10 shadow-xl border border-cyan-100 max-w-md w-full text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", delay: 0.3 }}
          className="w-20 h-20 bg-gradient-to-br from-cyan-400 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-6"
        >
          <CheckCircle2 size={40} className="text-white" />
        </motion.div>

        <h1 className="text-3xl font-black text-slate-900 mb-2">Order Placed! 🎉</h1>
        {orderId && (
          <p className="text-slate-500 mb-2">
            Order ID: <span className="font-mono font-bold text-cyan-600">{orderId}</span>
          </p>
        )}
        <p className="text-slate-500 text-sm leading-relaxed mb-8">
          Thank you for your order! We&apos;ll start printing your memories and deliver them to you soon.
        </p>

        <div className="bg-blue-50 rounded-2xl p-4 mb-6 text-left">
          <p className="text-sm font-semibold text-slate-700 mb-2">What happens next?</p>
          <ul className="space-y-1.5">
            {[
              "We review your uploaded photos",
              "Our team prints your magnetic tiles",
              "Quality check & packaging",
              "Delivery to your address",
            ].map((step, i) => (
              <li key={i} className="flex items-center gap-2 text-sm text-slate-600">
                <span className="w-5 h-5 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">
                  {i + 1}
                </span>
                {step}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex gap-3">
          <Link
            href="/"
            className="flex-1 flex items-center justify-center gap-2 py-3 border-2 border-slate-200 text-slate-700 rounded-xl font-semibold text-sm hover:border-cyan-300 hover:bg-blue-50 transition-all"
          >
            <Home size={16} />
            Home
          </Link>
          <Link
            href="/shop"
            className="flex-1 flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-cyan-500 to-teal-500 text-white rounded-xl font-semibold text-sm hover:shadow-lg transition-all"
          >
            <ShoppingBag size={16} />
            Shop More
          </Link>
        </div>
      </motion.div>
    </div>
  );
}

export default function OrderSuccessPage() {
  return (
    <>
      <Navbar />
      <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="w-8 h-8 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin" /></div>}>
        <OrderSuccessContent />
      </Suspense>
    </>
  );
}
