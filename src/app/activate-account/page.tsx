"use client";

import { useEffect, useState, Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { CheckCircle, XCircle, Loader2 } from "lucide-react";

type Status = "loading" | "success" | "error";

function ActivationContent() {
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<Status>("loading");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const token = searchParams.get("token");

    if (!token) {
      setStatus("error");
      setMessage("No activation token found. Please use the link from your email.");
      return;
    }

    const activate = async () => {
      try {
        const res = await fetch(
          `/api/auth/activate?token=${encodeURIComponent(token)}`
        );
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error || "Activation failed.");
        }

        setStatus("success");
        setMessage(data.message || "Account activated successfully! You can now sign in.");
      } catch (err) {
        setStatus("error");
        setMessage(
          err instanceof Error ? err.message : "Something went wrong. Please try again."
        );
      }
    };

    activate();
  }, [searchParams]);

  return (
    <div className="bg-white rounded-3xl p-8 shadow-xl border border-cyan-50 text-center">
      {status === "loading" && (
        <>
          <div className="flex justify-center mb-4">
            <Loader2 size={52} className="text-cyan-500 animate-spin" />
          </div>
          <h1 className="text-xl font-black text-slate-900 mb-2">
            Activating your account…
          </h1>
          <p className="text-slate-500 text-sm">This will only take a moment.</p>
        </>
      )}

      {status === "success" && (
        <>
          <div className="flex justify-center mb-4">
            <CheckCircle size={52} className="text-teal-500" />
          </div>
          <h1 className="text-xl font-black text-slate-900 mb-2">
            Account Activated!
          </h1>
          <p className="text-slate-500 text-sm mb-6">{message}</p>
          <Link
            href="/login"
            className="inline-block bg-gradient-to-r from-cyan-500 to-teal-500 text-white px-8 py-3 rounded-xl font-black hover:shadow-lg hover:shadow-cyan-200 transition-all hover:-translate-y-0.5"
          >
            Sign in to your account
          </Link>
        </>
      )}

      {status === "error" && (
        <>
          <div className="flex justify-center mb-4">
            <XCircle size={52} className="text-red-500" />
          </div>
          <h1 className="text-xl font-black text-slate-900 mb-2">
            Activation Failed
          </h1>
          <p className="text-slate-500 text-sm mb-6">{message}</p>
          <div className="flex flex-col gap-3">
            <Link
              href="/register"
              className="inline-block bg-gradient-to-r from-cyan-500 to-teal-500 text-white px-8 py-3 rounded-xl font-black hover:shadow-lg hover:shadow-cyan-200 transition-all hover:-translate-y-0.5"
            >
              Register again
            </Link>
            <Link
              href="/"
              className="text-sm text-slate-500 hover:text-cyan-600 transition-colors"
            >
              Back to home
            </Link>
          </div>
        </>
      )}
    </div>
  );
}

export default function ActivateAccountPage() {
  return (
    <div className="min-h-screen hero-gradient flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <Link href="/" className="flex items-center gap-2">
            <div className="relative w-10 h-10 rounded-xl overflow-hidden shadow-md">
              <Image src="/images/logo.png" alt="Magnify" fill className="object-cover" />
            </div>
            <span className="text-2xl font-black bg-gradient-to-r from-cyan-500 to-teal-600 bg-clip-text text-transparent">
              Magnify
            </span>
          </Link>
        </div>

        <Suspense fallback={
          <div className="bg-white rounded-3xl p-8 shadow-xl border border-cyan-50 text-center">
            <div className="flex justify-center mb-4">
              <Loader2 size={52} className="text-cyan-500 animate-spin" />
            </div>
            <h1 className="text-xl font-black text-slate-900 mb-2">
              Loading…
            </h1>
            <p className="text-slate-500 text-sm">Please wait.</p>
          </div>
        }>
          <ActivationContent />
        </Suspense>
      </motion.div>
    </div>
  );
}
