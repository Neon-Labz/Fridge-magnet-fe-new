"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { Eye, EyeOff, Loader2, Mail, Lock, User, Phone, MapPin, CheckCircle } from "lucide-react";

export default function RegisterPage() {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    phoneNumber: "",
    customerAddress: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [registered, setRegistered] = useState(false);
  const [registeredEmail, setRegisteredEmail] = useState("");
  const [phoneError, setPhoneError] = useState("");

  
  const validateSriLankanPhone = (phone: string): boolean => {
    if (!phone) return true; // Optional field, empty is valid
    
    // Remove spaces, hyphens, and plus signs for validation
    const cleaned = phone.replace(/[\s\-+]/g, "");
    
    // Mobile numbers: 07X XXXX XXXX (10 digits starting with 070-078)
    const mobilePattern = /^07[0-8][0-9]{7}$/;
    
    // With country code: +94 7X XXXX XXXX
    const mobileWithCodePattern = /^947[0-8][0-9]{7}$/;
    
    // Landline numbers: all valid area codes (011, 021, 023-027, 031-038, 041, 045, 047, 051-052, 054-055, 057, 063, 065-067, 081, 091)
    const landlinePattern = /^0(11|21|2[3-7]|3[1-8]|4[157]|5[1245]7|6[3567]|81|91)[0-9]{7}$/;
    
    return mobilePattern.test(cleaned) || 
           mobileWithCodePattern.test(cleaned) || 
           landlinePattern.test(cleaned);
  };

  const handlePhoneChange = (value: string) => {
    setForm({ ...form, phoneNumber: value });
    
    if (value && !validateSriLankanPhone(value)) {
      setPhoneError("Please enter a valid Sri Lankan phone number (e.g., 077 123 4567 or +94 77 123 4567)");
    } else {
      setPhoneError("");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate phone number before submission
    if (form.phoneNumber && !validateSriLankanPhone(form.phoneNumber)) {
      toast.error("Please enter a valid Sri Lankan phone number");
      return;
    }
    
    setLoading(true);
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Registration failed");
      setRegisteredEmail(form.email);
      setRegistered(true);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen hero-gradient flex">
      {/* Left panel */}
      <div className="hidden lg:flex flex-col justify-center items-center w-1/2 bg-gradient-to-br from-teal-600 to-cyan-600 p-12 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 right-20 w-40 h-40 bg-white/10 rounded-full blur-2xl" />
          <div className="absolute bottom-20 left-20 w-60 h-60 bg-cyan-400/20 rounded-full blur-2xl" />
        </div>
        <div className="relative text-center">
          <Link href="/" className="flex items-center gap-3 justify-center mb-8">
            <div className="relative w-12 h-12 rounded-2xl overflow-hidden shadow-lg">
              <Image src="/images/logo.png" alt="Magnify" fill className="object-cover" />
            </div>
            <span className="text-3xl font-black text-white">Magnify</span>
          </Link>
          <h2 className="text-3xl font-black text-white mb-4">Join Magnify Today!</h2>
          <p className="text-cyan-100 leading-relaxed max-w-xs">
            Create your account and start turning your photos into stunning magnetic art.
          </p>
          <div className="mt-10 space-y-3 text-left">
            {[
              "✅ Upload your favorite photos",
              "✅ Track your orders easily",
              "✅ Get exclusive member discounts",
              "✅ Access order history",
            ].map((item) => (
              <p key={item} className="text-cyan-100 text-sm">{item}</p>
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
                <Image src="/images/logo.png" alt="Magnify" fill className="object-cover" />
              </div>
              <span className="text-2xl font-black bg-gradient-to-r from-cyan-500 to-teal-600 bg-clip-text text-transparent">
                Magnify
              </span>
            </Link>
          </div>

          {registered ? (
            /* ── Check-your-email confirmation ── */
            <div className="bg-white rounded-3xl p-8 shadow-xl border border-cyan-50 text-center">
              <div className="flex justify-center mb-4">
                <CheckCircle size={52} className="text-teal-500" />
              </div>
              <h1 className="text-2xl font-black text-slate-900 mb-2">Check your email</h1>
              <p className="text-slate-500 text-sm mb-1">
                We sent an activation link to
              </p>
              <p className="font-bold text-slate-700 text-sm mb-6 break-all">
                {registeredEmail}
              </p>
              <p className="text-slate-400 text-xs mb-6">
                Click the link in the email to activate your account. The link expires in 24 hours.
              </p>
              <p className="text-center text-sm text-slate-500">
                Already activated?{" "}
                <Link href="/login" className="font-bold text-cyan-600 hover:text-cyan-700">
                  Sign in
                </Link>
              </p>
            </div>
          ) : (
            /* ── Registration form ── */
            <div className="bg-white rounded-3xl p-8 shadow-xl border border-cyan-50">
              <h1 className="text-2xl font-black text-slate-900 mb-1">Create Account</h1>
              <p className="text-slate-500 text-sm mb-6">Join thousands of happy customers</p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1.5">Full Name *</label>
                  <div className="relative">
                    <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      required
                      value={form.fullName}
                      onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-cyan-300 text-sm"
                      placeholder="John Doe"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1.5">Email Address *</label>
                  <div className="relative">
                    <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-cyan-300 text-sm"
                      placeholder="you@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1.5">Password *</label>
                  <div className="relative">
                    <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type={showPassword ? "text" : "password"}
                      required
                      minLength={6}
                      value={form.password}
                      onChange={(e) => setForm({ ...form, password: e.target.value })}
                      className="w-full pl-10 pr-10 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-cyan-300 text-sm"
                      placeholder="Min. 6 characters"
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

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1.5">Phone Number</label>
                  <div className="relative">
                    <Phone size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="tel"
                      value={form.phoneNumber}
                      onChange={(e) => handlePhoneChange(e.target.value)}
                      className={`w-full pl-10 pr-4 py-3 rounded-xl border ${
                        phoneError ? "border-red-300 focus:ring-red-300" : "border-slate-200 focus:ring-cyan-300"
                      } focus:outline-none focus:ring-2 text-sm`}
                      placeholder="+94 77 123 4567"
                    />
                  </div>
                  {phoneError && (
                    <p className="text-xs text-red-500 mt-1.5 ml-1">{phoneError}</p>
                  )}
                  <p className="text-xs text-slate-400 mt-1.5 ml-1">
                    Formats: 077 123 4567, +94 77 123 4567, or 011 234 5678
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1.5">Shipping Address</label>
                  <div className="relative">
                    <MapPin size={16} className="absolute left-3.5 top-3.5 text-slate-400" />
                    <textarea
                      value={form.customerAddress}
                      onChange={(e) => setForm({ ...form, customerAddress: e.target.value })}
                      rows={2}
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-cyan-300 text-sm resize-none"
                      placeholder="123 Main St, City, State 12345"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-cyan-500 to-teal-500 text-white py-3.5 rounded-xl font-black hover:shadow-lg hover:shadow-cyan-200 transition-all hover:-translate-y-0.5 disabled:opacity-60 flex items-center justify-center gap-2"
                >
                  {loading ? <><Loader2 size={18} className="animate-spin" /> Creating Account...</> : "Create Account"}
                </button>
              </form>

              <p className="text-center text-sm text-slate-500 mt-6">
                Already have an account?{" "}
                <Link href="/login" className="font-bold text-cyan-600 hover:text-cyan-700">
                  Sign in
                </Link>
              </p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
