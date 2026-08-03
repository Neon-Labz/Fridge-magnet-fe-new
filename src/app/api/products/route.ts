import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/db";
import { Product } from "@/db/schema";
import { getSession } from "@/lib/session";
import { generateProductId } from "@/lib/utils";

export async function GET() {
  try {
    await dbConnect();
    const allProducts = await Product.find({ isActive: true }).sort({ createdAt: -1 }).lean();
    const products = allProducts.map((p: any) => ({ ...p, id: p._id }));
    return NextResponse.json({ products });
  } catch (error) {
    console.error("Get products error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const user = await getSession();
    if (!user || user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await dbConnect();
    const body = await req.json();
    const { productName, description, imageCount, stock, price, galleryImages } = body;

    if (!productName || !price) {
      return NextResponse.json({ error: "Product name and price are required" }, { status: 400 });
    }

    const product = await Product.create({
      productId: generateProductId(),
      productName,
      description: description || null,
      imageCount: imageCount || 1,
      stock: stock || 0,
      price: String(price),
      galleryImages: galleryImages || [],
    });

    return NextResponse.json({ product });
  } catch (error) {
    console.error("Create product error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
