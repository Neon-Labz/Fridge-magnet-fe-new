"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { Eye, EyeOff, Loader2, Mail, Lock, User, Phone, MapPin } from "lucide-react";
import { authApi } from "../api/auth.api";

// Same cookie check used on the shop page / login page
function isLoggedIn(): boolean {
  if (typeof document === "undefined") return false;
  const match = document.cookie.match(/(?:^|;\s*)token=([^;]*)/);
  return !!match?.[1];
}

function RegisterForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect");

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    phoneNumber: "",
    customerAddress: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await authApi.register(form);
      toast.success("Account created! Verify your email before logging in.");

      if (redirect) {
        // If register auto-logs the user in (token cookie already set), go straight to the product they wanted. Otherwise send them to login, carrying the redirect forward so they land there right after signing in.
        if (isLoggedIn()) {
          router.push(redirect);
        } else {
          router.push(`/login?redirect=${encodeURIComponent(redirect)}`);
        }
      } else {
        router.push("/");
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    // Single flat color for the whole page — blue-900. Everything else floats on top of it.
    <div className="min-h-screen bg-blue-900 relative flex items-center justify-center overflow-hidden px-6 py-16">
      {/* Two soft red-800 glows, slowly breathing — the only background motion */}
      <motion.div
        aria-hidden
        className="absolute -top-24 -right-24 w-80 h-80 rounded-full bg-red-800/25 blur-3xl"
        animate={{ scale: [1, 1.15, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="absolute -bottom-32 -left-20 w-96 h-96 rounded-full bg-red-800/20 blur-3xl"
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />

      {/* Floating product-image spheres drifting around the card — hidden on phones, shown from sm/md up */}
      <motion.div
        aria-hidden
        className="hidden sm:block absolute top-[8%] right-[6%] md:right-[10%] w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden ring-4 ring-blue-800/40 shadow-xl"
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1, y: [0, -14, 0] }}
        transition={{
          opacity: { duration: 0.6 },
          scale: { duration: 0.6 },
          y: { duration: 6, repeat: Infinity, ease: "easeInOut" },
        }}
      >
        <Image src="/images/product1.png" alt="" fill className="object-cover" />
        <div className="absolute inset-0 bg-blue-900/20" />
      </motion.div>

      <motion.div
        aria-hidden
        className="hidden sm:block absolute bottom-[10%] right-[8%] md:right-[13%] w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden ring-4 ring-red-700/40 shadow-xl"
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1, y: [0, 12, 0] }}
        transition={{
          opacity: { duration: 0.6, delay: 0.15 },
          scale: { duration: 0.6, delay: 0.15 },
          y: { duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.4 },
        }}
      >
        <Image src="/images/product-2.png" alt="" fill className="object-cover" />
        <div className="absolute inset-0 bg-blue-900/15" />
      </motion.div>

      <motion.div
        aria-hidden
        className="hidden md:block absolute top-[12%] left-[10%] w-28 h-28 rounded-full overflow-hidden ring-4 ring-red-700/40 shadow-xl"
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1, y: [0, -10, 0] }}
        transition={{
          opacity: { duration: 0.6, delay: 0.3 },
          scale: { duration: 0.6, delay: 0.3 },
          y: { duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 0.2 },
        }}
      >
        <Image src="/images/product-3.png" alt="" fill className="object-cover" />
        <div className="absolute inset-0 bg-blue-900/15" />
      </motion.div>

      <motion.div
        aria-hidden
        className="hidden sm:block absolute bottom-[8%] left-[6%] md:left-[12%] w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden ring-4 ring-blue-800/40 shadow-xl"
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1, y: [0, 10, 0] }}
        transition={{
          opacity: { duration: 0.6, delay: 0.45 },
          scale: { duration: 0.6, delay: 0.45 },
          y: { duration: 6.5, repeat: Infinity, ease: "easeInOut", delay: 0.6 },
        }}
      >
        <Image src="/images/product-4.png" alt="" fill className="object-cover" />
        <div className="absolute inset-0 bg-blue-900/20" />
      </motion.div>

      {/* The card — white form floating on top of the blue-900 background */}
      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative z-10 w-full max-w-sm sm:max-w-md bg-white rounded-3xl shadow-2xl px-7 py-9 sm:px-10 sm:py-11"
      >
        <Link href="/" className="relative block w-40 h-16 sm:w-48 sm:h-14 mx-auto mb-6">
          <Image src="/logo.png" alt="Magnify" fill className="object-contain" priority />
        </Link>

        <div className="text-center mb-6">
          <h2 className="text-2xl sm:text-3xl font-black text-blue-900 mb-1">Create your account</h2>
          <p className="text-slate-500 text-sm">
            {redirect ? "Sign up to continue with your order." : "Join thousands of happy customers."}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1.5">Full name</label>
            <div className="relative">
              <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                required
                value={form.fullName}
                onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-900/20 focus:border-blue-900 text-sm text-slate-900 transition-colors"
                placeholder="Your name"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1.5">Email address</label>
            <div className="relative">
              <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="email"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-900/20 focus:border-blue-900 text-sm text-slate-900 transition-colors"
                placeholder="Your email address"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1.5">Password</label>
            <div className="relative">
              <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type={showPassword ? "text" : "password"}
                required
                minLength={6}
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                className="w-full pl-10 pr-10 py-3 rounded-lg border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-900/20 focus:border-blue-900 text-sm text-slate-900 transition-colors"
                placeholder="Min. 6 characters"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-blue-900"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1.5">
              Phone number <span className="font-normal text-slate-400">(optional)</span>
            </label>
            <div className="relative">
              <Phone size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="tel"
                value={form.phoneNumber}
                onChange={(e) => setForm({ ...form, phoneNumber: e.target.value })}
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-900/20 focus:border-blue-900 text-sm text-slate-900 transition-colors"
                placeholder="+94771234569"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1.5">
              Shipping address <span className="font-normal text-slate-400">(optional)</span>
            </label>
            <div className="relative">
              <MapPin size={16} className="absolute left-3.5 top-3.5 text-slate-400" />
              <textarea
                value={form.customerAddress}
                onChange={(e) => setForm({ ...form, customerAddress: e.target.value })}
                rows={2}
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-900/20 focus:border-blue-900 text-sm text-slate-900 transition-colors resize-none"
                placeholder="123 Main Street, Jaffna, Srilanka 40000"
              />
            </div>
          </div>

          {/* Only gradient element on the page: blue-600 -> blue-900 */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-600 to-blue-900 text-white py-3.5 rounded-lg font-black text-sm hover:shadow-lg hover:shadow-blue-900/25 transition-all disabled:opacity-60 flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 size={18} className="animate-spin" /> Creating account...
              </>
            ) : (
              "Create account"
            )}
          </button>
        </form>

        <p className="text-center text-sm text-slate-500 mt-6">
          Already have an account?{" "}
          <Link
            href={redirect ? `/login?redirect=${encodeURIComponent(redirect)}` : "/login"}
            className="font-bold text-blue-900 hover:text-red-800"
          >
            Sign in
          </Link>
        </p>
      </motion.div>
    </div>
  );
}

export default function RegisterPage() {
  return (
    <Suspense fallback={null}>
      <RegisterForm />
    </Suspense>
  );
}