import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/db";
import { Gallery } from "@/db/schema";
import { getSession } from "@/lib/session";

export async function GET() {
  try {
    await dbConnect();
    const allGallery = await Gallery.find({ isActive: true }).sort({ sortOrder: 1 }).lean();
    return NextResponse.json({ gallery: allGallery });
  } catch (error) {
    console.error("Get gallery error:", error);
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
    const { imageUrl, caption, sortOrder } = await req.json();
    const item = await Gallery.create({ imageUrl, caption, sortOrder: sortOrder || 0 });
    return NextResponse.json({ item });
  } catch (error) {
    console.error("Create gallery error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
