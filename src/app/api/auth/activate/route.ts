import { NextRequest, NextResponse } from "next/server";

const BACKEND = process.env.BACKEND_URL!;

export async function GET(req: NextRequest) {
  try {
    const token = req.nextUrl.searchParams.get("token");

    if (!token) {
      return NextResponse.json(
        { error: "Activation token is missing." },
        { status: 400 }
      );
    }

    const nestRes = await fetch(
      `${BACKEND}/auth/activate?token=${encodeURIComponent(token)}`,
      { method: "GET" }
    );

    const data = await nestRes.json();

    if (!nestRes.ok) {
      return NextResponse.json(
        { error: data.message ?? "Activation failed." },
        { status: nestRes.status }
      );
    }

    return NextResponse.json({ message: data.message });
  } catch (error) {
    console.error("Activate proxy error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
