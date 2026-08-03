import { NextResponse } from "next/server";
import dbConnect from "@/db";
import { User, Product, Order } from "@/db/schema";
import { getSession } from "@/lib/session";

export async function GET() {
  try {
    const user = await getSession();
    if (!user || user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await dbConnect();

    const [totalCustomers, totalProducts, totalOrders, pendingOrders, recentOrders, revenueResult] =
      await Promise.all([
        User.countDocuments({ role: "customer" }),
        Product.countDocuments({ isActive: true }),
        Order.countDocuments(),
        Order.countDocuments({ orderStatus: "pending" }),
        Order.find().sort({ createdAt: -1 }).limit(5).lean(),
        Order.aggregate([{ $group: { _id: null, total: { $sum: { $toDouble: "$totalPrice" } } } }]),
      ]);

    return NextResponse.json({
      stats: {
        totalCustomers,
        totalProducts,
        totalOrders,
        totalRevenue: revenueResult[0]?.total?.toFixed(2) || "0",
        pendingOrders,
      },
      recentOrders,
    });
  } catch (error) {
    console.error("Stats error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
