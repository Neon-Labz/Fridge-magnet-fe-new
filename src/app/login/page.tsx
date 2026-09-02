"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { Eye, EyeOff, Loader2, User, Lock } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ username: "", password: "", remember: false });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Login failed");
      toast.success(`Welcome back, ${data.user.fullName}`);
      if (data.user.role === "admin") {
        router.push("/admin");
      } else {
        router.push("/");
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    // Single flat color for the whole page — blue-900. Everything else floats on top of it.
    <div className="h-screen bg-blue-900 relative flex items-center justify-center overflow-hidden px-6 py-16">
      {/* Two soft red-800 glows, slowly breathing — the only background motion */}
      <motion.div
        aria-hidden
        className="absolute -top-24 -left-24 w-80 h-80 rounded-full bg-red-800/25 blur-3xl"
        animate={{ scale: [1, 1.15, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="absolute -bottom-32 -right-20 w-96 h-96 rounded-full bg-red-800/20 blur-3xl"
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />

      {/* Floating product-image spheres drifting around the card — hidden on phones, shown from sm/md up */}
      <motion.div
        aria-hidden
        className="hidden sm:block absolute top-[8%] left-[6%] md:left-[10%] w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden ring-4 ring-blue-800/40 shadow-xl"
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1, y: [0, -14, 0] }}
        transition={{
          opacity: { duration: 0.6 },
          scale: { duration: 0.6 },
          y: { duration: 6, repeat: Infinity, ease: "easeInOut" },
        }}
      >
        <Image src="/images/product-1.png" alt="" fill className="object-cover" />
        <div className="absolute inset-0 bg-blue-900/20" />
      </motion.div>

      <motion.div
        aria-hidden
        className="hidden sm:block absolute bottom-[10%] left-[8%] md:left-[13%] w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden ring-4 ring-red-700/40 shadow-xl"
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
        className="hidden md:block absolute top-[12%] right-[10%] w-28 h-28 rounded-full overflow-hidden ring-4 ring-red-700/40 shadow-xl"
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
        className="hidden sm:block absolute bottom-[8%] right-[6%] md:right-[12%] w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden ring-4 ring-blue-800/40 shadow-xl"
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
        <Link href="/" className="relative block w-40 h-12 sm:w-48 sm:h-14 mx-auto mb-7">
          <Image src="/logo.png" alt="Magnify" fill className="object-contain" priority />
        </Link>

        <div className="text-center mb-7">
          <h2 className="text-2xl sm:text-3xl font-black text-blue-900 mb-1">Welcome back</h2>
          <p className="text-slate-500 text-sm">Sign in to continue to your account.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
            {/* Username */}
            <div>
              <div className="flex items-center gap-3 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus-within:border-blue-900 focus-within:ring-2 focus-within:ring-blue-900/15 transition-colors">
                <User size={16} className="text-slate-400 shrink-0" />
                <input
                  type="text"
                  required
                  value={form.username}
                  onChange={(e) => setForm({ ...form, username: e.target.value })}
                  placeholder="User name"
                  className="w-full bg-transparent focus:outline-none text-sm text-slate-900 placeholder:text-slate-400"
                />
              </div>
            </div>

            {/* Password with inline Show/Hide */}
            <div>
              <div className="flex items-center gap-3 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus-within:border-blue-900 focus-within:ring-2 focus-within:ring-blue-900/15 transition-colors">
                <Lock size={16} className="text-slate-400 shrink-0" />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  placeholder="Password"
                  className="w-full bg-transparent focus:outline-none text-sm text-slate-900 placeholder:text-slate-400"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-slate-400 hover:text-blue-900 shrink-0"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm px-1">
              <label className="flex items-center gap-2 text-slate-600 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={form.remember}
                  onChange={(e) => setForm({ ...form, remember: e.target.checked })}
                  className="w-4 h-4 rounded accent-blue-900"
                />
                Remember me
              </label>
              <Link href="/forgot-password" className="font-semibold text-red-700 hover:text-blue-900">
                Forgot password?
              </Link>
            </div>

            {/* Only gradient element on the page: blue-600 -> blue-900 */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-900 text-white py-3.5 rounded-xl font-black text-sm hover:shadow-lg hover:shadow-blue-900/25 transition-all disabled:opacity-60 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 size={18} className="animate-spin" /> Signing in...
                </>
              ) : (
                "Sign in"
              )}
            </button>
          </form>

        <p className="text-center text-sm text-slate-500 mt-8">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="font-bold text-blue-900 hover:text-red-700">
            Sign up
          </Link>
        </p>
      </motion.div>
    </div>
  );
}