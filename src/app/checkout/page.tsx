"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { fadeUp, staggerContainer } from "@/lib/motion";
import {
  ChevronLeft,
  CreditCard,
  Truck,
  Loader2,
  ShoppingBag,
  MapPin,
  Trash2,
  ImageIcon,
} from "lucide-react";
import { formatPrice } from "@/lib/utils";
import type { CartItem } from "@/app/shop/[id]/page";

export default function CheckoutPage() {
  const router = useRouter();
  const [cart, setCart] = useState<CartItem[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<"cod" | "card">("cod");
  const [form, setForm] = useState({
    customerName: "",
    customerEmail: "",
    customerPhone: "",
    address: "",
    notes: "",
  });

  useEffect(() => {
    const stored: CartItem[] = JSON.parse(sessionStorage.getItem("cart") || "[]");
    if (stored.length === 0) {
      toast.error("Your cart is empty.");
      router.push("/shop");
      return;
    }
    setCart(stored);

    fetch("/api/auth/me")
      .then((r) => r.json())
      .then((d) => {
        if (d.user) {
          setForm((prev) => ({
            ...prev,
            customerName: d.user.fullName || "",
            customerEmail: d.user.email || "",
            customerPhone: d.user.phone || "",
            address: d.user.shippingAddress || "",
          }));
        }
      })
      .catch(() => {});
  }, [router]);

  const removeItem = (index: number) => {
    const updated = cart.filter((_, i) => i !== index);
    setCart(updated);
    sessionStorage.setItem("cart", JSON.stringify(updated));
    if (updated.length === 0) router.push("/shop");
  };

  const totalPrice = cart.reduce((sum, item) => sum + Number(item.price), 0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) return;

    setSubmitting(true);
    try {
      const orderIds: string[] = [];

      for (const item of cart) {
        const res = await fetch("/api/orders", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            productId: item.productId,
            ...form,
            qty: 1,
            uploadedImages: item.uploadedImageUrls,
            paymentMethod,
          }),
        });

        if (!res.ok) {
          const err = await res.json();
          throw new Error(err.error || `Failed to place order for ${item.productName}`);
        }

        const data = await res.json();
        orderIds.push(data.order.orderId);
      }

      sessionStorage.removeItem("cart");
      toast.success(`${orderIds.length} order${orderIds.length > 1 ? "s" : ""} placed successfully! 🎉`);
      router.push(`/order-success?orderId=${orderIds[0]}`);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to place order");
    } finally {
      setSubmitting(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-cyan-50/30 to-white">
        <div className="w-14 h-14 border-4 border-cyan-200 border-t-cyan-500 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-cyan-50/30 to-white">
      <Navbar />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-24">
        <motion.button
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => router.push("/shop")}
          className="flex items-center gap-1.5 text-slate-400 hover:text-cyan-600 mb-10 transition-colors text-sm font-medium group"
        >
          <ChevronLeft size={16} className="group-hover:-translate-x-0.5 transition-transform" />
          Continue Shopping
        </motion.button>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="grid lg:grid-cols-[1fr_1.3fr] gap-8"
        >
          {/* ── Left: Cart Items + Summary ── */}
          <motion.div variants={fadeUp} className="space-y-4">
            <div className="flex items-center justify-between mb-1">
              <h2 className="text-xl font-black text-slate-800">Your Order</h2>
              <span className="text-xs font-bold bg-cyan-100 text-cyan-600 px-2.5 py-1 rounded-full">
                {cart.length} item{cart.length > 1 ? "s" : ""}
              </span>
            </div>

            {/* Cart items */}
            {cart.map((item, index) => (
              <div key={index} className="bg-white rounded-3xl p-5 border border-slate-100 shadow-sm">
                <div className="flex items-start gap-4">
                  {/* Uploaded photos preview */}
                  <div className="flex-shrink-0">
                    {item.uploadedImageUrls.length > 0 ? (
                      <div className="grid grid-cols-2 gap-1 w-20">
                        {item.uploadedImageUrls.slice(0, 4).map((url, i) => (
                          <div key={i} className="relative h-9 rounded-lg overflow-hidden bg-slate-100">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={url} alt="" className="w-full h-full object-cover" />
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="w-20 h-20 bg-cyan-50 rounded-2xl flex items-center justify-center">
                        <ImageIcon size={20} className="text-cyan-300" />
                      </div>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-slate-800 text-sm leading-snug">{item.productName}</p>
                    <p className="text-xs text-slate-400 mt-1">
                      {item.uploadedImageUrls.length} photo{item.uploadedImageUrls.length > 1 ? "s" : ""} uploaded
                    </p>
                    <p className="text-base font-black text-cyan-600 mt-2">{formatPrice(item.price)}</p>
                  </div>

                  <button
                    type="button"
                    onClick={() => removeItem(index)}
                    className="flex-shrink-0 w-8 h-8 rounded-xl bg-red-50 hover:bg-red-100 flex items-center justify-center transition-colors"
                  >
                    <Trash2 size={14} className="text-red-400" />
                  </button>
                </div>
              </div>
            ))}

            {/* Price summary */}
            <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-sm space-y-2.5">
              {cart.map((item, i) => (
                <div key={i} className="flex justify-between text-sm text-slate-500">
                  <span className="truncate pr-4">{item.productName}</span>
                  <span className="font-semibold text-slate-700 flex-shrink-0">{formatPrice(item.price)}</span>
                </div>
              ))}
              <div className="flex justify-between text-sm text-slate-500 pt-1">
                <span>Delivery</span>
                <span className="text-green-600 font-semibold">Free</span>
              </div>
              <div className="flex justify-between pt-3 border-t border-slate-100">
                <span className="font-bold text-slate-800">Total</span>
                <span className="text-2xl font-black text-cyan-600">{formatPrice(totalPrice.toString())}</span>
              </div>
            </div>
          </motion.div>

          {/* ── Right: Delivery + Payment ── */}
          <motion.div variants={fadeUp}>
            <form onSubmit={handleSubmit} className="space-y-5">

              {/* Delivery Details */}
              <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm">
                <div className="flex items-center gap-2 mb-5">
                  <div className="w-8 h-8 bg-teal-100 rounded-xl flex items-center justify-center">
                    <MapPin size={15} className="text-teal-600" />
                  </div>
                  <h2 className="text-lg font-black text-slate-800">Delivery Details</h2>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="col-span-2 sm:col-span-1">
                    <label className="block text-xs font-semibold text-slate-500 mb-1.5">Full Name *</label>
                    <input
                      required
                      value={form.customerName}
                      onChange={(e) => setForm({ ...form, customerName: e.target.value })}
                      placeholder="Your full name"
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-cyan-300 focus:border-cyan-400 transition-all"
                    />
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <label className="block text-xs font-semibold text-slate-500 mb-1.5">Phone *</label>
                    <input
                      required
                      value={form.customerPhone}
                      onChange={(e) => setForm({ ...form, customerPhone: e.target.value })}
                      placeholder="+94 77 000 0000"
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-cyan-300 focus:border-cyan-400 transition-all"
                    />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-xs font-semibold text-slate-500 mb-1.5">Email</label>
                    <input
                      type="email"
                      value={form.customerEmail}
                      onChange={(e) => setForm({ ...form, customerEmail: e.target.value })}
                      placeholder="you@example.com"
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-cyan-300 focus:border-cyan-400 transition-all"
                    />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-xs font-semibold text-slate-500 mb-1.5">Delivery Address *</label>
                    <textarea
                      required
                      rows={3}
                      value={form.address}
                      onChange={(e) => setForm({ ...form, address: e.target.value })}
                      placeholder="Street, city, postal code…"
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-cyan-300 focus:border-cyan-400 transition-all resize-none"
                    />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-xs font-semibold text-slate-500 mb-1.5">Order Notes</label>
                    <textarea
                      rows={2}
                      value={form.notes}
                      onChange={(e) => setForm({ ...form, notes: e.target.value })}
                      placeholder="Any special instructions…"
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-cyan-300 focus:border-cyan-400 transition-all resize-none"
                    />
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm">
                <div className="flex items-center gap-2 mb-5">
                  <div className="w-8 h-8 bg-cyan-100 rounded-xl flex items-center justify-center">
                    <CreditCard size={15} className="text-cyan-600" />
                  </div>
                  <h2 className="text-lg font-black text-slate-800">Payment Method</h2>
                </div>

                <div className="grid grid-cols-2 gap-3 mb-5">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod("cod")}
                    className={`flex items-center gap-3 p-4 rounded-2xl border-2 transition-all ${
                      paymentMethod === "cod"
                        ? "border-cyan-500 bg-cyan-50 shadow-sm"
                        : "border-slate-200 hover:border-slate-300"
                    }`}
                  >
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                      paymentMethod === "cod" ? "bg-cyan-500" : "bg-slate-100"
                    }`}>
                      <Truck size={16} className={paymentMethod === "cod" ? "text-white" : "text-slate-400"} />
                    </div>
                    <div className="text-left">
                      <p className={`text-xs font-bold ${paymentMethod === "cod" ? "text-cyan-700" : "text-slate-600"}`}>
                        Cash on Delivery
                      </p>
                      <p className="text-xs text-slate-400">Pay on arrival</p>
                    </div>
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod("card")}
                    className={`flex items-center gap-3 p-4 rounded-2xl border-2 transition-all ${
                      paymentMethod === "card"
                        ? "border-cyan-500 bg-cyan-50 shadow-sm"
                        : "border-slate-200 hover:border-slate-300"
                    }`}
                  >
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                      paymentMethod === "card" ? "bg-cyan-500" : "bg-slate-100"
                    }`}>
                      <CreditCard size={16} className={paymentMethod === "card" ? "text-white" : "text-slate-400"} />
                    </div>
                    <div className="text-left">
                      <p className={`text-xs font-bold ${paymentMethod === "card" ? "text-cyan-700" : "text-slate-600"}`}>
                        Card Payment
                      </p>
                      <p className="text-xs text-slate-400">Pay online</p>
                    </div>
                  </button>
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-gradient-to-r from-cyan-500 to-teal-500 text-white font-black py-4 px-6 rounded-2xl hover:shadow-xl hover:shadow-cyan-200/60 hover:-translate-y-0.5 transition-all disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2 text-base"
                >
                  {submitting ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      Placing {cart.length} Order{cart.length > 1 ? "s" : ""}…
                    </>
                  ) : (
                    <>
                      <ShoppingBag size={18} />
                      Place {cart.length} Order{cart.length > 1 ? "s" : ""} · {formatPrice(totalPrice.toString())}
                    </>
                  )}
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
}
