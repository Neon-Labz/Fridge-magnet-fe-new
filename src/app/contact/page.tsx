"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { fadeUp, staggerContainer } from "@/lib/motion";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  Loader2,
} from "lucide-react";
import toast from "react-hot-toast";

const socialIcons = [
  {
    id: "whatsapp",
    label: "WhatsApp",
    url: "https://wa.me/94753912534",
    imagePath: null,
  },
  {
    id: "facebook",
    label: "Facebook",
    url: "https://web.facebook.com/MagnifyMagnets",
    imagePath: "/facebook.svg",
  },
  {
    id: "instagram",
    label: "Instagram",
    url: "https://www.instagram.com/magnify_magnets/",
    imagePath: "/instagram-icon.svg",
  },
  {
    id: "tiktok",
    label: "TikTok",
    url: "https://www.tiktok.com/@magnify_magnets",
    imagePath: "/tiktok-icon.svg",
  },
];

const contactDetails = [
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
];

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [sending, setSending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setSending(true);

    // Simulate sending
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setSending(false);

    toast.success("Message sent! We'll get back to you soon 📬");

    setForm({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
  };

  return (
    <div className="min-h-screen bg-white">
      <section className="relative overflow-hidden bg-white pt-18 pb-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mx-auto flex w-full max-w-7xl flex-row items-center gap-4 px-4 sm:gap-8 sm:px-6 lg:gap-16 lg:px-8"
        >
          {/* Hero Text */}
          <div className="flex w-1/2 flex-col text-left">
            <h1 className="text-[24px] font-extrabold leading-tight xs:text-[26px] sm:text-[32px] md:text-[40px] lg:text-[56px] lg:leading-[60px]">
              <span className="text-blue-900">Get in </span>
              <span className="text-[#D10A0A]">Touch</span>
            </h1>

            <span className="mt-1 mb-2 block h-1 w-6 bg-[#D10A0A] sm:mt-2 sm:mb-4 sm:w-10" />

            <p className="mt-2 max-w-full text-[12px] font-normal leading-[18px] text-[#6B7280] xs:text-[13px] sm:mt-4 sm:text-[16px] sm:leading-[26px] lg:text-[18px] lg:leading-[29px]">
              We&apos;re here to help you preserve your most cherished
              memories and answer any questions you may have.
            </p>
          </div>

          {/* Hero Image */}
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
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-10">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 items-stretch gap-8 lg:grid-cols-2 lg:gap-10"
        >
          <motion.div
            variants={fadeUp}
            className="flex h-full flex-col rounded-3xl border border-slate-100 bg-white p-5 shadow-sm sm:p-7 lg:p-8"
          >
            {/* Heading */}
            <div className="mb-6">
              <h2 className="mb-2 text-2xl font-black text-slate-900 sm:text-3xl">
                Let&apos;s talk
              </h2>

              <p className="max-w-xl text-sm leading-relaxed text-slate-500 sm:text-base">
                Our friendly team would love to hear from you. Fill out the
                form or reach us directly.
              </p>
            </div>

            {/* Contact Details */}
            <div className="flex flex-1 flex-col gap-4">
              {contactDetails.map(
                ({ icon: Icon, label, value, sub }) => (
                  <div
                    key={label}
                    className="flex items-center gap-4 rounded-2xl border border-slate-100 bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md sm:p-5"
                  >
                    <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-100 to-teal-100 sm:h-12 sm:w-12">
                      <Icon
                        size={20}
                        className="text-blue-900"
                        aria-hidden="true"
                      />
                    </div>

                    <div className="min-w-0">
                      <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 sm:text-xs">
                        {label}
                      </p>

                      <p className="break-words text-sm font-bold text-slate-800 sm:text-base">
                        {value}
                      </p>

                      <p className="text-xs text-slate-400 sm:text-sm">
                        {sub}
                      </p>
                    </div>
                  </div>
                )
              )}
            </div>

            {/* Social Media */}
            <div className="mt-6 border-t border-slate-100 pt-5">
              <p className="mb-4 text-xs font-bold uppercase tracking-[0.08em] text-[#747784]">
                Follow Us
              </p>

              <div className="flex flex-wrap gap-3">
                {socialIcons.map(
                  ({ id, label, imagePath, url }) => (
                    <a
                      key={id}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      className="flex h-11 w-11 items-center justify-center rounded-full bg-[#EDEDF2] transition-all duration-300 hover:-translate-y-1 hover:bg-[#DFE1EB] hover:shadow-md"
                    >
                      {imagePath ? (
                        <Image
                          src={imagePath}
                          alt={label}
                          width={22}
                          height={22}
                          className="object-contain"
                        />
                      ) : (
                        <svg
                          viewBox="0 0 24 24"
                          className="h-6 w-6"
                          fill="currentColor"
                          aria-hidden="true"
                        >
                          <path d="M20.52 3.48A11.77 11.77 0 0 0 12.08 0C5.56 0 .26 5.3.26 11.82c0 2.08.54 4.1 1.57 5.88L.16 24l6.44-1.64a11.8 11.8 0 0 0 5.48 1.35h.01c6.52 0 11.82-5.3 11.82-11.82a11.77 11.77 0 0 0-3.39-8.41ZM12.09 21.7h-.01a9.8 9.8 0 0 1-5-1.37l-.36-.21-3.82.97 1.02-3.72-.23-.38a9.78 9.78 0 0 1-1.5-5.17C2.19 6.4 6.62 1.97 12.09 1.97c2.65 0 5.14 1.03 7.01 2.9a9.85 9.85 0 0 1 2.91 7.01c0 5.47-4.45 9.82-9.92 9.82Zm5.4-7.35c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.95 1.17-.17.2-.35.22-.65.07-.3-.15-1.28-.47-2.44-1.51-.9-.8-1.51-1.78-1.69-2.08-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.49s1.07 2.89 1.22 3.09c.15.2 2.1 3.2 5.08 4.49.71.31 1.27.5 1.71.64.72.23 1.38.2 1.9.12.58-.09 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.07-.12-.27-.2-.57-.35Z" />
                        </svg>
                      )}
                    </a>
                  )
                )}
              </div>
            </div>
          </motion.div>
          <motion.div
            variants={fadeUp}
            className="flex h-full flex-col"
          >
            <div className="flex h-full flex-col rounded-3xl border border-blue-50 bg-white p-5 shadow-lg sm:p-7 lg:p-8">
              <h3 className="mb-6 text-xl font-black text-slate-900 sm:text-2xl">
                Send us a message
              </h3>

              <form
                onSubmit={handleSubmit}
                className="flex flex-1 flex-col space-y-5"
              >
                {/* Name + Email */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-sm font-bold text-slate-700">
                      Your Name *
                    </label>

                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          name: e.target.value,
                        })
                      }
                      className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-300"
                      placeholder="Enter your name"
                    />
                  </div>

                  <div>
                    <label className="mb-1.5 block text-sm font-bold text-slate-700">
                      Email Address *
                    </label>

                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          email: e.target.value,
                        })
                      }
                      className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-300"
                      placeholder="Enter your email address"
                    />
                  </div>
                </div>

                {/* Subject */}
                <div>
                  <label className="mb-1.5 block text-sm font-bold text-slate-700">
                    Subject *
                  </label>

                  <input
                    type="text"
                    required
                    value={form.subject}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        subject: e.target.value,
                      })
                    }
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-300"
                    placeholder="How can we help?"
                  />
                </div>

                {/* Message */}
                <div className="flex flex-1 flex-col">
                  <label className="mb-1.5 block text-sm font-bold text-slate-700">
                    Message *
                  </label>

                  <textarea
                    required
                    value={form.message}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        message: e.target.value,
                      })
                    }
                    rows={6}
                    className="min-h-[150px] flex-1 resize-none rounded-xl border border-slate-200 px-4 py-3 text-sm focus:border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-300 sm:min-h-[180px]"
                    placeholder="Tell us how we can help you..."
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={sending}
                  className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-blue-600 to-blue-900 py-4 text-base font-black text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-cyan-200 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {sending ? (
                    <>
                      <Loader2
                        size={18}
                        className="animate-spin"
                      />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send size={18} />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            </div>
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
}