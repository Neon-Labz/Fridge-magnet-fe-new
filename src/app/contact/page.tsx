"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { fadeUp, staggerContainer } from "@/lib/motion";
import { Mail, Phone, MapPin, Clock, Send, Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import Image from "next/image";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    // Simulate sending
    await new Promise((r) => setTimeout(r, 1500));
    setSending(false);
    toast.success("Message sent! We'll get back to you soon 📬");
    setForm({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Header */}
      <div className="relative pt-18 pb-4 bg-white overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-row items-center gap-4 sm:gap-8 lg:gap-16"
        >
          {/* Text block */}
          <div className="w-1/2 flex flex-col text-left">
            <h1 className="text-[24px] xs:text-[24px] sm:text-[32px] font-extrabold leading-tight md:text-[40px] lg:text-[56px] lg:leading-[60px]">
              <span className="text-blue-900">Get in</span>{" "}
              <span className="text-[#D10A0A]">Touch</span>
            </h1>
            <span className="mb-2 sm:mb-4 mt-1 sm:mt-2 block h-1 w-6 sm:w-10 bg-[#D10A0A]" />

            <p className="mt-2 sm:mt-4 max-w-full text-[12px] xs:text-[13px] font-normal leading-[18px] sm:leading-[26px] text-[#6B7280] sm:text-[16px] lg:text-[18px] lg:leading-[29px]">
              We&apos;re here to help you preserve your most cherished
              memories and answer any questions you may have.
            </p>
          </div>

          {/* Image block */}
          <div className="relative h-[140px] w-1/2 xs:h-[170px] sm:h-[300px] lg:h-[380px]">
            <Image
              src="/contact.png"
              alt="Get in touch with Magnify"
              fill
              priority
              sizes="(max-width: 1024px) 50vw, 50vw"
              className="object-contain object-center"
            />
          </div>
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-3 gap-10"
        >
          {/* Contact Info */}
          <motion.div variants={fadeUp} className="space-y-6">
            <div>
              <h2 className="text-2xl font-black text-slate-900 mb-2">Let&apos;s talk</h2>
              <p className="text-slate-500 leading-relaxed">
                Our friendly team would love to hear from you. Fill out the form or reach us directly.
              </p>
            </div>

            {[
              {
                icon: Mail,
                label: "Email",
                value: "magnifyofficials@gmail.com",
                sub: "We reply within 24 hours",
              },
              {
                icon: Phone,
                label: "Phone",
                value: "+94 75 391 253",
                sub: "Mon-Sat, 9am - 6pm",
              },
              {
                icon: MapPin,
                label: "Office",
                value: "125A, KKS Road, Kokuvil",
                sub: "Jaffna, Sri Lanka",
              },
              {
                icon: Clock,
                label: "Business Hours",
                value: "Mon – Sat: 9:00 – 18:00",
                sub: "Sunday: Closed",
              },
            ].map(({ icon: Icon, label, value, sub }) => (
              <div key={label} className="flex gap-4 p-4 bg-white rounded-2xl border border-slate-100 shadow-sm">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-teal-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Icon size={20} className="text-blue-900" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{label}</p>
                  <p className="font-bold text-slate-800">{value}</p>
                  <p className="text-xs text-slate-400">{sub}</p>
                </div>
              </div>
            ))}
          </motion.div>

          {/* Contact Form */}
          <motion.div variants={fadeUp} className="lg:col-span-2">
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-lg border border-blue-50">
              <h3 className="text-xl font-black text-slate-900 mb-6">Send us a message</h3>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1.5">Your Name *</label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-300 text-sm"
                      placeholder="Enter your name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1.5">Email Address *</label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-300 text-sm"
                      placeholder="Enter you email address"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1.5">Subject *</label>
                  <input
                    type="text"
                    required
                    value={form.subject}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-300 text-sm"
                    placeholder="How can we help?"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1.5">Message *</label>
                  <textarea
                    required
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    rows={6}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-300 text-sm resize-none"
                    placeholder="Tell us how we can help you..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={sending}
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-900 text-white py-4 rounded-2xl font-black text-base hover:shadow-xl hover:shadow-cyan-200 transition-all hover:-translate-y-0.5 disabled:opacity-60 flex items-center justify-center gap-2"
                >
                  {sending ? (
                    <><Loader2 size={18} className="animate-spin" /> Sending...</>
                  ) : (
                    <><Send size={18} /> Send Message</>
                  )}
                </button>
              </form>
            </div>
          </motion.div>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
}