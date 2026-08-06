"use server";

import { cookies } from "next/headers";

const BACKEND = process.env.BACKEND_URL!;

export interface SessionUser {
  _id: string;
  fullName: string;
  email: string;
  role: "user" | "admin";
  isActive: boolean;
  phoneNumber?: string;
  customerAddress?: string;
  avatar?: string;
}


export async function getSession(): Promise<SessionUser | null> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("magnify_token")?.value;
    if (!token) return null;

    const res = await fetch(`${BACKEND}/auth/profile`, {
      headers: { Authorization: `Bearer ${token}` },
      // Opt out of Next.js fetch cache so we always get a fresh result.
      cache: "no-store",
    });

    if (!res.ok) return null;

    const data = await res.json();
    const u = data.user;

    return {
      _id: u.id ?? u._id,
      fullName: u.fullName ?? "",
      email: u.email,
      role: u.role === "admin" ? "admin" : "user",
      isActive: u.isActive ?? true,
      phoneNumber: u.phoneNumber,
      customerAddress: u.customerAddress,
      avatar: u.avatar,
    };
  } catch {
    return null;
  }
}

/**
 * Clears the JWT cookie (call from server actions or API routes, not directly
 * from client components — use POST /api/auth/logout instead).
 */
export async function deleteSession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete("magnify_token");
}
