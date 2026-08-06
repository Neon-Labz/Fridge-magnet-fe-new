import { NextRequest, NextResponse } from "next/server";

const BACKEND = process.env.BACKEND_URL!;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { fullName, email, password, phoneNumber, customerAddress } = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    const nestRes = await fetch(`${BACKEND}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ fullName, email, password, phoneNumber, customerAddress }),
    });

    const data = await nestRes.json();

    if (!nestRes.ok) {
      return NextResponse.json(
        { error: data.message ?? "Registration failed" },
        { status: nestRes.status }
      );
    }

    // Registration no longer returns a JWT — the user must activate via email first.
    return NextResponse.json({ message: data.message });
  } catch (error) {
    console.error("Register proxy error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
