"use server";

import { cookies } from "next/headers";
import dbConnect from "@/db";
import { User } from "@/db/schema";

const SESSION_COOKIE = "magnify_session";

const sessions = new Map<string, { userId: string; expiresAt: number }>();

export async function createSession(userId: string): Promise<string> {
  const token = Math.random().toString(36).substring(2) + Date.now().toString(36);
  sessions.set(token, {
    userId,
    expiresAt: Date.now() + 7 * 24 * 60 * 60 * 1000,
  });
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 7 * 24 * 60 * 60,
    path: "/",
  });
  return token;
}

export async function getSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;
  if (!token) return null;

  const session = sessions.get(token);
  if (!session || session.expiresAt < Date.now()) {
    sessions.delete(token);
    return null;
  }

  await dbConnect();
  const user = await User.findById(session.userId).lean();
  return user || null;
}

export async function deleteSession(): Promise<void> {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;
  if (token) {
    sessions.delete(token);
    cookieStore.delete(SESSION_COOKIE);
  }
}
