import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/db";
import { User } from "@/db/schema";
import { hashPassword } from "@/lib/auth";
import { createSession } from "@/lib/session";

export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    const body = await req.json();
    const { fullName, email, password, phone, shippingAddress } = body;

    if (!fullName || !email || !password) {
      return NextResponse.json(
        { error: "Full name, email and password are required" },
        { status: 400 }
      );
    }

    const existing = await User.findOne({ email });
    if (existing) {
      return NextResponse.json({ error: "Email already registered" }, { status: 409 });
    }

    const hashedPassword = await hashPassword(password);
    const user = await User.create({
      fullName,
      email,
      password: hashedPassword,
      phone: phone || null,
      shippingAddress: shippingAddress || null,
      role: "customer",
    });

    await createSession(String(user._id));

    return NextResponse.json({
      user: { id: user._id, fullName: user.fullName, email: user.email, role: user.role },
    });
  } catch (error) {
    console.error("Register error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
