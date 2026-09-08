"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Lock, Eye, EyeOff, Loader2, CheckCircle2, ArrowLeft } from "lucide-react";
import { authApi } from "../api/auth.api";

const resetPasswordSchema = z
  .object({
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string().min(8, "Password must be at least 8 characters"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;

function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const onSubmit = async (data: ResetPasswordFormData) => {
    if (!token) {
      setError("This reset link is invalid or incomplete.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      await authApi.resetPassword(token, data.password);
      setSuccess(true);
      toast.success("Password updated successfully.");
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Unable to reset password. Please try again.";
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
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          aria-hidden
          className="absolute -bottom-32 -right-20 w-96 h-96 rounded-full bg-red-800/20 blur-3xl"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />

        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="relative z-10 w-full max-w-sm sm:max-w-md bg-white rounded-3xl shadow-2xl px-7 py-9 sm:px-10 sm:py-11 text-center"
        >
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
            <CheckCircle2 size={34} className="text-green-600" strokeWidth={2.2} />
          </div>

          <h2 className="text-2xl sm:text-3xl font-black text-blue-900 mb-2">
            Password Updated
          </h2>

          <p className="text-sm leading-6 text-slate-500">
            Your password has been reset successfully. You can now sign in with your new
            password.
          </p>

          <Link
            href="/login"
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
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="absolute -bottom-32 -right-20 w-96 h-96 rounded-full bg-red-800/20 blur-3xl"
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />

      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative z-10 w-full max-w-sm sm:max-w-md bg-white rounded-3xl shadow-2xl px-7 py-9 sm:px-10 sm:py-11"
      >
        <div className="text-center mb-7">
          <h2 className="text-2xl sm:text-3xl font-black text-blue-900 mb-2">
            Reset Password
          </h2>
          <p className="text-slate-500 text-sm leading-6">
            Enter a new password for your account.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <div
              className={`flex items-center gap-3 bg-slate-50 border rounded-xl px-4 py-3 transition-colors ${
                errors.password
                  ? "border-red-300 focus-within:border-red-500 focus-within:ring-2 focus-within:ring-red-500/15"
                  : "border-slate-200 focus-within:border-blue-900 focus-within:ring-2 focus-within:ring-blue-900/15"
              }`}
            >
              <Lock
                size={16}
                className={`shrink-0 ${errors.password ? "text-red-400" : "text-slate-400"}`}
              />
              <input
                {...register("password")}
                type={showPassword ? "text" : "password"}
                placeholder="New password"
                autoComplete="new-password"
                className="w-full bg-transparent focus:outline-none text-sm text-slate-900 placeholder:text-slate-400"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="shrink-0 text-slate-400 hover:text-slate-600"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            {errors.password && (
              <p className="mt-2 px-1 text-xs text-red-600">{errors.password.message}</p>
            )}
          </div>

          <div>
            <div
              className={`flex items-center gap-3 bg-slate-50 border rounded-xl px-4 py-3 transition-colors ${
                errors.confirmPassword
                  ? "border-red-300 focus-within:border-red-500 focus-within:ring-2 focus-within:ring-red-500/15"
                  : "border-slate-200 focus-within:border-blue-900 focus-within:ring-2 focus-within:ring-blue-900/15"
              }`}
            >
              <Lock
                size={16}
                className={`shrink-0 ${
                  errors.confirmPassword ? "text-red-400" : "text-slate-400"
                }`}
              />
              <input
                {...register("confirmPassword")}
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm new password"
                autoComplete="new-password"
                className="w-full bg-transparent focus:outline-none text-sm text-slate-900 placeholder:text-slate-400"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="shrink-0 text-slate-400 hover:text-slate-600"
                aria-label={showConfirmPassword ? "Hide password" : "Show password"}
              >
                {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="mt-2 px-1 text-xs text-red-600">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          {error && <p className="px-1 text-xs text-red-600">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-600 to-blue-900 text-white py-3.5 rounded-xl font-black text-sm hover:shadow-lg hover:shadow-blue-900/25 transition-all disabled:opacity-60 flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                Updating...
              </>
            ) : (
              "Update Password"
            )}
          </button>
        </form>

        <p className="text-center text-xs text-slate-400 mt-6">
          <Link href="/login" className="font-semibold text-blue-900 hover:text-red-600">
            Back to Sign in
          </Link>
        </p>
      </motion.div>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={null}>
      <ResetPasswordForm />
    </Suspense>
  );
}