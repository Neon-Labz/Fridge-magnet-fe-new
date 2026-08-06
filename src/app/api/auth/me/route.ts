import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

const BACKEND = process.env.BACKEND_URL!;

export async function GET(_req: NextRequest) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("magnify_token")?.value;

    if (!token) {
      return NextResponse.json({ user: null }, { status: 401 });
    }

    const nestRes = await fetch(`${BACKEND}/auth/profile`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!nestRes.ok) {
      return NextResponse.json({ user: null }, { status: 401 });
    }

    const data = await nestRes.json();

    // NestJS may return the user directly OR nested under { user: ... }
    const u = data.user ?? data;

    if (!u || !u.email) {
      return NextResponse.json({ user: null }, { status: 401 });
    }

    return NextResponse.json({
      user: {
        id: u.id ?? u._id,
        fullName: u.fullName,
        email: u.email,
        role: u.role,
        status: u.isActive !== undefined ? (u.isActive ? "active" : "pending") : u.status,
        phoneNumber: u.phoneNumber,
        customerAddress: u.customerAddress,
        avatar: u.avatar,
      },
    });
  } catch (error) {
    console.error("Me proxy error:", error);
    return NextResponse.json({ user: null }, { status: 500 });
  }
}
