"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { Eye, EyeOff, Loader2, Mail, Lock } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
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
      toast.success(`Welcome back, ${data.user.fullName}! 👋`);
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
    <div className="min-h-screen hero-gradient flex">
      {/* Left panel */}
      <div className="hidden lg:flex flex-col justify-center items-center w-1/2 bg-gradient-to-br from-blue-900 to-red-700 p-12 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-40 h-40 bg-white/10 rounded-full blur-2xl" />
          <div className="absolute bottom-20 right-20 w-60 h-60 bg-teal-400/20 rounded-full blur-2xl" />
        </div>
        <div className="relative text-center">
          <Link href="/" className="flex items-center gap-3 justify-center mb-8">
            <div className="relative w-50 h-15 ">
              <Image src="/logo.png" alt="Magnify" fill className="object-cover" />
            </div>
           
          </Link>
          <h2 className="text-3xl font-black text-white mb-4">Welcome Back!</h2>
          <p className="text-blue-100 leading-relaxed max-w-xs">
            Sign in to manage your orders and create beautiful memory galleries.
          </p>
          <div className="mt-12 grid grid-cols-2 gap-4">
            {["/images/product-1.png", "/images/product-2.png", "/images/product-3.png", "/images/product-4.png"].map((img, i) => (
              <div key={i} className="relative h-28 rounded-2xl overflow-hidden shadow-lg">
                <Image src={img} alt="" fill className="object-cover opacity-80" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <div className="lg:hidden flex justify-center mb-8">
            <Link href="/" className="flex items-center gap-2">
              <div className="relative w-10 h-10 rounded-xl overflow-hidden">
                <Image src="/logo.png" alt="Magnify" fill className="object-cover" />
              </div>
              <span className="text-2xl font-black bg-gradient-to-r from-blue-500 to-red-700 bg-clip-text text-transparent">
                Magnify
              </span>
            </Link>
          </div>

          <div className="bg-white rounded-3xl p-8 shadow-xl border border-blue-50">
            <h1 className="text-2xl font-black text-slate-900 mb-1">Sign In</h1>
            <p className="text-slate-500 text-sm mb-6">Enter your credentials to continue</p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1.5">Email Address</label>
                <div className="relative">
                  <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-300 text-sm"
                    placeholder="you@example.com"
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
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                    className="w-full pl-10 pr-10 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-300 text-sm"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-blue-900 to-red-600 text-white py-3.5 rounded-xl font-black hover:shadow-lg hover:shadow-cyan-200 transition-all hover:-translate-y-0.5 disabled:opacity-60 flex items-center justify-center gap-2"
              >
                {loading ? <><Loader2 size={18} className="animate-spin" /> Signing in...</> : "Sign In"}
              </button>
            </form>

            <p className="text-center text-sm text-slate-500 mt-6">
              Don&apos;t have an account?{" "}
              <Link href="/register" className="font-bold text-blue-600 hover:text-red-500">
                Create one
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
