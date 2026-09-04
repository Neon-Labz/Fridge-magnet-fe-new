import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const MONGODB_URI = "mongodb://localhost:27017/fridge-magnet";

const UserSchema = new mongoose.Schema({ fullName: String, email: { type: String, unique: true }, phone: String, password: String, shippingAddress: String, role: { type: String, default: "customer" } }, { timestamps: true });
const ProductSchema = new mongoose.Schema({ productId: { type: String, unique: true }, productName: String, description: String, imageCount: { type: Number, default: 1 }, stock: { type: Number, default: 0 }, price: String, galleryImages: [String], isActive: { type: Boolean, default: true } }, { timestamps: true });
const OrderSchema = new mongoose.Schema({ orderId: { type: String, unique: true }, productId: mongoose.Schema.Types.ObjectId, userId: mongoose.Schema.Types.ObjectId, customerName: String, customerEmail: String, customerPhone: String, address: String, qty: Number, uploadedImages: [String], totalPrice: String, paymentMethod: { type: String, default: "cod" }, orderStatus: { type: String, default: "pending" }, notes: String }, { timestamps: true });
const GallerySchema = new mongoose.Schema({ imageUrl: String, caption: String, isActive: { type: Boolean, default: true }, sortOrder: { type: Number, default: 0 } }, { timestamps: true });

const User = mongoose.model("User", UserSchema);
const Product = mongoose.model("Product", ProductSchema);
const Order = mongoose.model("Order", OrderSchema);
const Gallery = mongoose.model("Gallery", GallerySchema);

async function seed() {
  await mongoose.connect(MONGODB_URI);

  await Promise.all([User.deleteMany({}), Product.deleteMany({}), Order.deleteMany({}), Gallery.deleteMany({})]);

  const hashedPassword = await bcrypt.hash("password123", 12);

  const [admin, customer1, customer2] = await User.insertMany([
    { fullName: "Admin User", email: "admin@fridgemagnet.com", phone: "0771234567", password: hashedPassword, shippingAddress: "123 Admin Street, Colombo 03", role: "admin" },
    { fullName: "John Silva", email: "john@example.com", phone: "0779876543", password: hashedPassword, shippingAddress: "45 Galle Road, Colombo 06", role: "customer" },
    { fullName: "Priya Fernando", email: "priya@example.com", phone: "0712345678", password: hashedPassword, shippingAddress: "78 Kandy Road, Kandy", role: "customer" },
  ]);

  const [product1, product2, product3] = await Product.insertMany([
    { productId: "FM-001", productName: "Classic Fridge Magnet (1 Photo)", description: "<p>A beautiful single-photo fridge magnet. High-quality print on durable magnetic material.</p>", imageCount: 1, stock: 50, price: "350.00", galleryImages: [], isActive: true },
    { productId: "FM-002", productName: "Collage Fridge Magnet (4 Photos)", description: "<p>Showcase four of your favourite moments in one stunning collage magnet.</p>", imageCount: 4, stock: 30, price: "650.00", galleryImages: [], isActive: true },
    { productId: "FM-003", productName: "Premium Magnet Set (6 Photos)", description: "<p>A premium set of six individual magnets, each printed with a different photo.</p>", imageCount: 6, stock: 20, price: "1200.00", galleryImages: [], isActive: true },
  ]);

  await Order.insertMany([
    { orderId: "ORD-20240001", productId: product1._id, userId: customer1._id, customerName: "John Silva", customerEmail: "john@example.com", customerPhone: "0779876543", address: "45 Galle Road, Colombo 06", qty: 2, uploadedImages: [], totalPrice: "700.00", paymentMethod: "cod", orderStatus: "delivered", notes: "Please pack carefully." },
    { orderId: "ORD-20240002", productId: product2._id, userId: customer2._id, customerName: "Priya Fernando", customerEmail: "priya@example.com", customerPhone: "0712345678", address: "78 Kandy Road, Kandy", qty: 1, uploadedImages: [], totalPrice: "650.00", paymentMethod: "card", orderStatus: "processing" },
    { orderId: "ORD-20240003", productId: product3._id, userId: null, customerName: "Guest Buyer", customerEmail: "guest@example.com", customerPhone: "0761112233", address: "12 Beach Road, Galle", qty: 1, uploadedImages: [], totalPrice: "1200.00", paymentMethod: "cod", orderStatus: "pending", notes: "Gift wrap please." },
  ]);

  await Gallery.insertMany([
    { imageUrl: "/images/gallery/sample1.jpg", caption: "Family vacation memories", isActive: true, sortOrder: 1 },
    { imageUrl: "/images/gallery/sample2.jpg", caption: "Wedding day special", isActive: true, sortOrder: 2 },
    { imageUrl: "/images/gallery/sample3.jpg", caption: "Birthday celebration", isActive: true, sortOrder: 3 },
  ]);

  await mongoose.disconnect();
}

seed().catch((err) => { console.error("❌ Seed failed:", err); process.exit(1); });
