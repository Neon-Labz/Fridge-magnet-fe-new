import { NextResponse } from "next/server";
import { cookies } from "next/headers";

const BACKEND = process.env.BACKEND_URL!;

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("magnify_token")?.value;

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Verify the caller is an admin by fetching their profile
    const profileRes = await fetch(`${BACKEND}/auth/profile`, {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    });

    if (!profileRes.ok) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { user } = await profileRes.json();
    if (user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Proxy to NestJS customers endpoint (returns all pages — fetch up to 1000)
    const nestRes = await fetch(`${BACKEND}/customers?page=1&limit=1000`, {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    });

    if (!nestRes.ok) {
      return NextResponse.json({ error: "Failed to fetch customers" }, { status: nestRes.status });
    }

    const nestData = await nestRes.json();

    // Normalise the shape the admin customers page expects
    const customers = (nestData.data ?? []).map((c: any) => ({
      id: c._id ?? c.recordId,
      fullName: c.customerName,
      email: c.emailAddress,
      phone: c.phoneNumber !== "Not provided" ? c.phoneNumber : null,
      shippingAddress: c.customerAddress !== "Not provided" ? c.customerAddress : null,
      customerId: c.customerId,
      role: "customer",
      status: c.isActive ? "active" : "pending",
      createdAt: c.createdAt,
    }));

    return NextResponse.json({ customers });
  } catch (error) {
    console.error("Customers proxy error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
