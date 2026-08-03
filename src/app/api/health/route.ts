import dbConnect from "@/db";
import mongoose from "mongoose";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await dbConnect();
    if (mongoose.connection.readyState !== 1) throw new Error("Not connected");
    return Response.json({ ok: true });
  } catch {
    return Response.json({ ok: false }, { status: 500 });
  }
}
