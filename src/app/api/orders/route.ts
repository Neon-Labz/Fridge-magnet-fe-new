import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/db";
import { Order, Product } from "@/db/schema";
import { getSession } from "@/lib/session";
import { generateOrderId } from "@/lib/utils";

export async function GET() {
  try {
    const user = await getSession();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await dbConnect();
    const query = user.role === "admin" ? {} : { userId: user._id };
    const allOrders = await Order.find(query)
      .populate("productId", "productName price")
      .sort({ createdAt: -1 })
      .lean();

    const orders = allOrders.map((o: any) => ({
      ...o,
      productName: o.productId?.productName,
      productPrice: o.productId?.price,
    }));

    return NextResponse.json({ orders });
  } catch (error) {
    console.error("Get orders error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    const body = await req.json();
    const { productId, customerName, customerEmail, customerPhone, address, qty, uploadedImages, paymentMethod, notes } = body;

    if (!productId || !customerName || !address || !qty) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const product = await Product.findById(productId).lean() as any;
    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    const totalPrice = String(Number(product.price) * qty);
    const user = await getSession();

    const order = await Order.create({
      orderId: generateOrderId(),
      productId,
      userId: user?._id || null,
      customerName,
      customerEmail: customerEmail || null,
      customerPhone: customerPhone || null,
      address,
      qty,
      uploadedImages: uploadedImages || [],
      totalPrice,
      paymentMethod: paymentMethod || "cod",
      orderStatus: "pending",
      notes: notes || null,
    });

    return NextResponse.json({ order });
  } catch (error) {
    console.error("Create order error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
