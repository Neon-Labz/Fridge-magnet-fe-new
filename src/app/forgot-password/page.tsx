"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import {
  Mail,
  Loader2,
  CheckCircle2,
  ArrowLeft,
} from "lucide-react";
import { authApi } from "../api/auth.api";

function ForgotPasswordForm() {
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect");

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const loginUrl = redirect
    ? `/login?redirect=${encodeURIComponent(redirect)}`
    : "/login";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setError("");

    const trimmedEmail = email.trim();

    if (!trimmedEmail) {
      setError("Please enter your email address.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      setError("Please enter a valid email address.");
      return;
    }

    setLoading(true);

    try {
      await authApi.forgotPassword(trimmedEmail);

      setSuccess(true);
      toast.success("Password reset link sent successfully.");
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : "Unable to send reset link. Please try again.";

      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="h-screen bg-blue-900 relative flex items-center justify-center overflow-hidden px-6 py-16">
        <motion.div
          aria-hidden
          className="absolute -top-24 -left-24 w-80 h-80 rounded-full bg-red-800/25 blur-3xl"
          animate={{ scale: [1, 1.15, 1] }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <motion.div
          aria-hidden
          className="absolute -bottom-32 -right-20 w-96 h-96 rounded-full bg-red-800/20 blur-3xl"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{
            duration: 9,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />

        <motion.div
          aria-hidden
          className="hidden sm:block absolute top-[8%] left-[6%] md:left-[10%] w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden ring-4 ring-blue-800/40 shadow-xl"
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{
            opacity: 1,
            scale: 1,
            y: [0, -14, 0],
          }}
          transition={{
            opacity: { duration: 0.6 },
            scale: { duration: 0.6 },
            y: {
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
            },
          }}
        >
          <Image
            src="/images/product-1.png"
            alt=""
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-blue-900/20" />
        </motion.div>

        <motion.div
          aria-hidden
          className="hidden sm:block absolute bottom-[10%] left-[8%] md:left-[13%] w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden ring-4 ring-red-700/40 shadow-xl"
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{
            opacity: 1,
            scale: 1,
            y: [0, 12, 0],
          }}
          transition={{
            opacity: { duration: 0.6, delay: 0.15 },
            scale: { duration: 0.6, delay: 0.15 },
            y: {
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.4,
            },
          }}
        >
          <Image
            src="/images/product-2.png"
            alt=""
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-blue-900/15" />
        </motion.div>

        <motion.div
          aria-hidden
          className="hidden md:block absolute top-[12%] right-[10%] w-28 h-28 rounded-full overflow-hidden ring-4 ring-red-700/40 shadow-xl"
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{
            opacity: 1,
            scale: 1,
            y: [0, -10, 0],
          }}
          transition={{
            opacity: { duration: 0.6, delay: 0.3 },
            scale: { duration: 0.6, delay: 0.3 },
            y: {
              duration: 5.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.2,
            },
          }}
        >
          <Image
            src="/images/product-3.png"
            alt=""
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-blue-900/15" />
        </motion.div>

        <motion.div
          aria-hidden
          className="hidden sm:block absolute bottom-[8%] right-[6%] md:right-[12%] w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden ring-4 ring-blue-800/40 shadow-xl"
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{
            opacity: 1,
            scale: 1,
            y: [0, 10, 0],
          }}
          transition={{
            opacity: { duration: 0.6, delay: 0.45 },
            scale: { duration: 0.6, delay: 0.45 },
            y: {
              duration: 6.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.6,
            },
          }}
        >
          <Image
            src="/images/product-4.png"
            alt=""
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-blue-900/20" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="relative z-10 w-full max-w-sm sm:max-w-md bg-white rounded-3xl shadow-2xl px-7 py-9 sm:px-10 sm:py-11"
        >
          <div className="text-center">
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
              <CheckCircle2
                size={34}
                className="text-green-600"
                strokeWidth={2.2}
              />
            </div>

            <h2 className="text-2xl sm:text-3xl font-black text-blue-900 mb-2">
              Check your email
            </h2>

            <p className="text-sm leading-6 text-slate-500">
              If an account exists for{" "}
              <span className="font-semibold text-slate-700">
                {email.trim()}
              </span>
              , we&apos;ve sent you a password reset link.
            </p>
          </div>

          <div className="mt-7 rounded-xl bg-slate-50 border border-slate-200 px-4 py-3 text-center">
            <p className="text-xs text-slate-500">
              Didn&apos;t receive the email? Check your spam folder or try
              again.
            </p>
          </div>

          <Link
            href={loginUrl}
            className="mt-7 w-full bg-gradient-to-r from-blue-600 to-blue-900 text-white py-3.5 rounded-xl font-black text-sm hover:shadow-lg hover:shadow-blue-900/25 transition-all flex items-center justify-center gap-2"
          >
            <ArrowLeft size={17} />
            Back to Login
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="h-screen bg-blue-900 relative flex items-center justify-center overflow-hidden px-6 py-16">
      <motion.div
        aria-hidden
        className="absolute -top-24 -left-24 w-80 h-80 rounded-full bg-red-800/25 blur-3xl"
        animate={{ scale: [1, 1.15, 1] }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        aria-hidden
        className="absolute -bottom-32 -right-20 w-96 h-96 rounded-full bg-red-800/20 blur-3xl"
        animate={{ scale: [1, 1.1, 1] }}
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      />

      <motion.div
        aria-hidden
        className="hidden sm:block absolute top-[8%] left-[6%] md:left-[10%] w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden ring-4 ring-blue-800/40 shadow-xl"
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{
          opacity: 1,
          scale: 1,
          y: [0, -14, 0],
        }}
        transition={{
          opacity: { duration: 0.6 },
          scale: { duration: 0.6 },
          y: {
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          },
        }}
      >
        <Image
          src="/images/product-1.png"
          alt=""
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-blue-900/20" />
      </motion.div>

      <motion.div
        aria-hidden
        className="hidden sm:block absolute bottom-[10%] left-[8%] md:left-[13%] w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden ring-4 ring-red-700/40 shadow-xl"
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{
          opacity: 1,
          scale: 1,
          y: [0, 12, 0],
        }}
        transition={{
          opacity: { duration: 0.6, delay: 0.15 },
          scale: { duration: 0.6, delay: 0.15 },
          y: {
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.4,
          },
        }}
      >
        <Image
          src="/images/product-2.png"
          alt=""
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-blue-900/15" />
      </motion.div>

      <motion.div
        aria-hidden
        className="hidden md:block absolute top-[12%] right-[10%] w-28 h-28 rounded-full overflow-hidden ring-4 ring-red-700/40 shadow-xl"
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{
          opacity: 1,
          scale: 1,
          y: [0, -10, 0],
        }}
        transition={{
          opacity: { duration: 0.6, delay: 0.3 },
          scale: { duration: 0.6, delay: 0.3 },
          y: {
            duration: 5.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.2,
          },
        }}
      >
        <Image
          src="/images/product-3.png"
          alt=""
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-blue-900/15" />
      </motion.div>

      <motion.div
        aria-hidden
        className="hidden sm:block absolute bottom-[8%] right-[6%] md:right-[12%] w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden ring-4 ring-blue-800/40 shadow-xl"
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{
          opacity: 1,
          scale: 1,
          y: [0, 10, 0],
        }}
        transition={{
          opacity: { duration: 0.6, delay: 0.45 },
          scale: { duration: 0.6, delay: 0.45 },
          y: {
            duration: 6.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.6,
          },
        }}
      >
        <Image
          src="/images/product-4.png"
          alt=""
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-blue-900/20" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative z-10 w-full max-w-sm sm:max-w-md bg-white rounded-3xl shadow-2xl px-7 py-9 sm:px-10 sm:py-11"
      >
        <div className="text-center mb-7">
          <h2 className="text-2xl sm:text-3xl font-black text-blue-900 mb-2">
            Forgot password?
          </h2>

          <p className="text-slate-500 text-sm leading-6">
            Enter your email address and we&apos;ll send you a link to reset
            your password.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <div
              className={`flex items-center gap-3 bg-slate-50 border rounded-xl px-4 py-3 transition-colors ${
                error
                  ? "border-red-300 focus-within:border-red-500 focus-within:ring-2 focus-within:ring-red-500/15"
                  : "border-slate-200 focus-within:border-blue-900 focus-within:ring-2 focus-within:ring-blue-900/15"
              }`}
            >
              <Mail
                size={16}
                className={`shrink-0 ${
                  error ? "text-red-400" : "text-slate-400"
                }`}
              />

              <input
                type="email"
                required
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (error) setError("");
                }}
                placeholder="Email address"
                autoComplete="email"
                className="w-full bg-transparent focus:outline-none text-sm text-slate-900 placeholder:text-slate-400"
              />
            </div>

            {error && (
              <p className="mt-2 px-1 text-xs text-red-600">{error}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-600 to-blue-900 text-white py-3.5 rounded-xl font-black text-sm hover:shadow-lg hover:shadow-blue-900/25 transition-all disabled:opacity-60 flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                Sending reset link...
              </>
            ) : (
              "Send Reset Link"
            )}
          </button>
        </form>

        <p className="text-center text-xs text-slate-400 mt-6">
          Remember your password?{" "}
          <Link
            href={"/login"}
            className="font-semibold text-blue-900 hover:text-red-700"
          >
            Sign in
          </Link>
        </p>
      </motion.div>
    </div>
  );
}

export default function ForgotPasswordPage() {
  return (
    <Suspense fallback={null}>
      <ForgotPasswordForm />
    </Suspense>
  );
}
