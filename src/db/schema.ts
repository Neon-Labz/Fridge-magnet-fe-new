import mongoose, { Schema, model, models, Document } from "mongoose";

// User
export interface IUser extends Document {
  fullName: string;
  email: string;
  phone?: string;
  password: string;
  shippingAddress?: string;
  role: "customer" | "admin";
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String },
    password: { type: String, required: true },
    shippingAddress: { type: String },
    role: { type: String, enum: ["customer", "admin"], default: "customer" },
  },
  { timestamps: true }
);

// Product
export interface IProduct extends Document {
  productId: string;
  productName: string;
  description?: string;
  imageCount: number;
  stock: number;
  price: string;
  galleryImages: string[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const ProductSchema = new Schema<IProduct>(
  {
    productId: { type: String, required: true, unique: true },
    productName: { type: String, required: true },
    description: { type: String },
    imageCount: { type: Number, default: 1 },
    stock: { type: Number, default: 0 },
    price: { type: String, required: true },
    galleryImages: { type: [String], default: [] },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

// Order
export interface IOrder extends Document {
  orderId: string;
  productId: mongoose.Types.ObjectId;
  userId?: mongoose.Types.ObjectId;
  customerName: string;
  customerEmail?: string;
  customerPhone?: string;
  address: string;
  qty: number;
  uploadedImages: string[];
  totalPrice: string;
  paymentMethod: "cod" | "card";
  orderStatus: "pending" | "confirmed" | "processing" | "shipped" | "delivered" | "cancelled";
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

const OrderSchema = new Schema<IOrder>(
  {
    orderId: { type: String, required: true, unique: true },
    productId: { type: Schema.Types.ObjectId, ref: "Product", required: true },
    userId: { type: Schema.Types.ObjectId, ref: "User" },
    customerName: { type: String, required: true },
    customerEmail: { type: String },
    customerPhone: { type: String },
    address: { type: String, required: true },
    qty: { type: Number, default: 1 },
    uploadedImages: { type: [String], default: [] },
    totalPrice: { type: String, required: true },
    paymentMethod: { type: String, enum: ["cod", "card"], default: "cod" },
    orderStatus: {
      type: String,
      enum: ["pending", "confirmed", "processing", "shipped", "delivered", "cancelled"],
      default: "pending",
    },
    notes: { type: String },
  },
  { timestamps: true }
);

// Gallery
export interface IGallery extends Document {
  imageUrl: string;
  caption?: string;
  isActive: boolean;
  sortOrder: number;
  createdAt: Date;
}

const GallerySchema = new Schema<IGallery>(
  {
    imageUrl: { type: String, required: true },
    caption: { type: String },
    isActive: { type: Boolean, default: true },
    sortOrder: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const User = models.User || model<IUser>("User", UserSchema);
export const Product = models.Product || model<IProduct>("Product", ProductSchema);
export const Order = models.Order || model<IOrder>("Order", OrderSchema);
export const Gallery = models.Gallery || model<IGallery>("Gallery", GallerySchema);
