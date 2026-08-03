"use client";

import { useState, useEffect, use } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useDropzone } from "react-dropzone";
import toast from "react-hot-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { fadeUp, staggerContainer } from "@/lib/motion";
import {
  Upload,
  X,
  Frame,
  ChevronLeft,
  CreditCard,
  Truck,
  Loader2,
} from "lucide-react";
import { formatPrice } from "@/lib/utils";

interface Product {
  id: string;
  productId: string;
  productName: string;
  description: string | null;
  imageCount: number;
  stock: number;
  price: string;
  galleryImages: string[];
}

export default function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [uploadedUrls, setUploadedUrls] = useState<string[]>([]);
  const [selectedImage, setSelectedImage] = useState<number>(0);
  const [qty, setQty] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState<"cod" | "card">("cod");
  const [form, setForm] = useState({
    customerName: "",
    customerEmail: "",
    customerPhone: "",
    address: "",
    notes: "",
  });

  useEffect(() => {
    fetch(`/api/products/${id}`)
      .then((r) => r.json())
      .then((d) => {
        setProduct(d.product);
        setLoading(false);
      })
      .catch(() => setLoading(false));

    // Pre-fill if logged in
    fetch("/api/auth/me")
      .then((r) => r.json())
      .then((d) => {
        if (d.user) {
          setForm((prev) => ({
            ...prev,
            customerName: d.user.fullName || "",
            customerEmail: d.user.email || "",
            customerPhone: d.user.phone || "",
            address: d.user.shippingAddress || "",
          }));
        }
      })
      .catch(() => {});
  }, [id]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { "image/*": [] },
    maxFiles: product?.imageCount || 10,
    onDrop: (acceptedFiles) => {
      const maxCount = product?.imageCount || 10;
      const remaining = maxCount - uploadedFiles.length;
      const toAdd = acceptedFiles.slice(0, remaining);
      if (acceptedFiles.length > remaining) {
        toast.error(`Maximum ${maxCount} images allowed for this product`);
      }
      setUploadedFiles((prev) => [...prev, ...toAdd]);
    },
  });

  const removeFile = (index: number) => {
    setUploadedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const uploadImages = async (): Promise<string[]> => {
    if (uploadedFiles.length === 0) return [];
    const formData = new FormData();
    uploadedFiles.forEach((f) => formData.append("files", f));
    const res = await fetch("/api/upload", { method: "POST", body: formData });
    if (!res.ok) throw new Error("Upload failed");
    const data = await res.json();
    return data.urls as string[];
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!product) return;

    if (uploadedFiles.length === 0) {
      toast.error("Please upload at least one photo");
      return;
    }

    if (uploadedFiles.length < product.imageCount) {
      toast.error(`Please upload exactly ${product.imageCount} photos`);
      return;
    }

    setSubmitting(true);
    try {
      const urls = await uploadImages();
      setUploadedUrls(urls);

      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId: product.id,
          ...form,
          qty,
          uploadedImages: urls,
          paymentMethod,
        }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Failed to place order");
      }

      const data = await res.json();
      toast.success(`Order ${data.order.orderId} placed successfully! 🎉`);
      router.push(`/order-success?orderId=${data.order.orderId}`);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to place order");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-cyan-200 border-t-cyan-500 rounded-full animate-spin" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Frame size={48} className="text-cyan-300 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-slate-700">Product Not Found</h2>
        </div>
      </div>
    );
  }

  const totalPrice = Number(product.price) * qty;
  const maxImages = product.imageCount;

  return (
    <div className="min-h-screen bg-gradient-to-b from-cyan-50/30 to-white">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-slate-500 hover:text-cyan-600 mb-8 transition-colors text-sm font-medium"
        >
          <ChevronLeft size={18} />
          Back to Shop
        </button>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="grid lg:grid-cols-2 gap-12"
        >
          {/* Product Images */}
          <motion.div variants={fadeUp}>
            <div className="relative h-80 lg:h-[440px] rounded-3xl overflow-hidden bg-gradient-to-br from-cyan-50 to-teal-50 mb-4 shadow-xl">
              {product.galleryImages && product.galleryImages.length > 0 ? (
                <Image
                  src={product.galleryImages[selectedImage]}
                  alt={product.productName}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="flex items-center justify-center h-full">
                  <Frame size={64} className="text-cyan-200" />
                </div>
              )}
            </div>
            {product.galleryImages && product.galleryImages.length > 1 && (
              <div className="flex gap-3">
                {product.galleryImages.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className={`relative w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${
                      selectedImage === i
                        ? "border-cyan-500 shadow-lg"
                        : "border-slate-200 hover:border-cyan-300"
                    }`}
                  >
                    <Image src={img} alt={`View ${i + 1}`} fill className="object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Product info */}
            <div className="mt-6 bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="text-xs text-slate-400 font-mono">{product.productId}</p>
                  <h1 className="text-2xl font-black text-slate-900 mt-1">{product.productName}</h1>
                </div>
                <div className="text-right">
                  <p className="text-3xl font-black text-cyan-600">{formatPrice(product.price)}</p>
                  <p className="text-xs text-slate-400">per set</p>
                </div>
              </div>
              {product.description && (
                <div
                  className="text-sm text-slate-600 leading-relaxed prose prose-sm max-w-none"
                  dangerouslySetInnerHTML={{ __html: product.description }}
                />
              )}
              <div className="flex gap-3 mt-4">
                <div className="flex-1 bg-cyan-50 rounded-xl p-3 text-center">
                  <p className="text-lg font-black text-cyan-700">{product.imageCount}</p>
                  <p className="text-xs text-cyan-600">Max Photos</p>
                </div>
                <div className="flex-1 bg-teal-50 rounded-xl p-3 text-center">
                  <p className="text-lg font-black text-teal-700">{product.stock}</p>
                  <p className="text-xs text-teal-600">In Stock</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Order Form */}
          <motion.div variants={fadeUp}>
            <div className="bg-white rounded-3xl p-8 shadow-lg border border-cyan-50">
              <h2 className="text-2xl font-black text-slate-900 mb-6">Place Your Order</h2>
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Photo Upload */}
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">
                    Upload Your Photos{" "}
                    <span className="text-cyan-600 font-black">
                      ({uploadedFiles.length}/{maxImages})
                    </span>
                  </label>
                  <div
                    {...getRootProps()}
                    className={`border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition-all ${
                      isDragActive
                        ? "border-cyan-400 bg-cyan-50"
                        : uploadedFiles.length >= maxImages
                        ? "border-slate-200 bg-slate-50 cursor-not-allowed"
                        : "border-slate-200 hover:border-cyan-300 hover:bg-cyan-50/30"
                    }`}
                  >
                    <input {...getInputProps()} disabled={uploadedFiles.length >= maxImages} />
                    <Upload size={32} className="text-cyan-400 mx-auto mb-2" />
                    <p className="text-sm font-semibold text-slate-600">
                      {isDragActive ? "Drop photos here" : "Drag & drop photos or click to browse"}
                    </p>
                    <p className="text-xs text-slate-400 mt-1">
                      Upload exactly {maxImages} photos • JPG, PNG, WEBP
                    </p>
                  </div>

                  {uploadedFiles.length > 0 && (
                    <div className="mt-3 grid grid-cols-4 gap-2">
                      {uploadedFiles.map((file, i) => (
                        <div key={i} className="relative group">
                          <div className="relative h-16 rounded-xl overflow-hidden bg-slate-100">
                            <Image
                              src={URL.createObjectURL(file)}
                              alt={file.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <button
                            type="button"
                            onClick={() => removeFile(i)}
                            className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <X size={10} />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Quantity */}
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Quantity</label>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setQty(Math.max(1, qty - 1))}
                      className="w-10 h-10 rounded-xl bg-slate-100 hover:bg-cyan-100 text-slate-700 font-bold transition-colors"
                    >
                      −
                    </button>
                    <span className="w-12 text-center font-black text-lg text-slate-800">{qty}</span>
                    <button
                      type="button"
                      onClick={() => setQty(Math.min(product.stock, qty + 1))}
                      className="w-10 h-10 rounded-xl bg-slate-100 hover:bg-cyan-100 text-slate-700 font-bold transition-colors"
                    >
                      +
                    </button>
                    <span className="text-sm text-slate-500 ml-2">
                      Total: <span className="font-black text-cyan-600">{formatPrice(totalPrice)}</span>
                    </span>
                  </div>
                </div>

                {/* Personal Details */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2">
                    <label className="block text-sm font-bold text-slate-700 mb-1.5">Full Name *</label>
                    <input
                      type="text"
                      required
                      value={form.customerName}
                      onChange={(e) => setForm({ ...form, customerName: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-cyan-300 text-sm"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1.5">Email</label>
                    <input
                      type="email"
                      value={form.customerEmail}
                      onChange={(e) => setForm({ ...form, customerEmail: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-cyan-300 text-sm"
                      placeholder="john@example.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1.5">Phone</label>
                    <input
                      type="tel"
                      value={form.customerPhone}
                      onChange={(e) => setForm({ ...form, customerPhone: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-cyan-300 text-sm"
                      placeholder="+1 555 0000"
                    />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-sm font-bold text-slate-700 mb-1.5">Shipping Address *</label>
                    <textarea
                      required
                      value={form.address}
                      onChange={(e) => setForm({ ...form, address: e.target.value })}
                      rows={3}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-cyan-300 text-sm resize-none"
                      placeholder="123 Main St, City, State 12345"
                    />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-sm font-bold text-slate-700 mb-1.5">Notes (optional)</label>
                    <input
                      type="text"
                      value={form.notes}
                      onChange={(e) => setForm({ ...form, notes: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-cyan-300 text-sm"
                      placeholder="Any special instructions..."
                    />
                  </div>
                </div>

                {/* Payment Method */}
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Payment Method</label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setPaymentMethod("cod")}
                      className={`flex items-center gap-3 p-4 rounded-xl border-2 transition-all ${
                        paymentMethod === "cod"
                          ? "border-cyan-500 bg-cyan-50"
                          : "border-slate-200 hover:border-cyan-200"
                      }`}
                    >
                      <Truck size={20} className={paymentMethod === "cod" ? "text-cyan-600" : "text-slate-400"} />
                      <div className="text-left">
                        <p className="font-bold text-sm text-slate-800">Cash on Delivery</p>
                        <p className="text-xs text-slate-400">Pay when delivered</p>
                      </div>
                    </button>
                    <button
                      type="button"
                      onClick={() => setPaymentMethod("card")}
                      className={`flex items-center gap-3 p-4 rounded-xl border-2 transition-all ${
                        paymentMethod === "card"
                          ? "border-cyan-500 bg-cyan-50"
                          : "border-slate-200 hover:border-cyan-200"
                      }`}
                    >
                      <CreditCard size={20} className={paymentMethod === "card" ? "text-cyan-600" : "text-slate-400"} />
                      <div className="text-left">
                        <p className="font-bold text-sm text-slate-800">Card Payment</p>
                        <p className="text-xs text-slate-400">Pay securely online</p>
                      </div>
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={submitting || product.stock === 0}
                  className="w-full bg-gradient-to-r from-cyan-500 to-teal-500 text-white py-4 rounded-2xl font-black text-base hover:shadow-xl hover:shadow-cyan-200 transition-all hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {submitting ? (
                    <>
                      <Loader2 size={20} className="animate-spin" />
                      Placing Order...
                    </>
                  ) : (
                    `Place Order · ${formatPrice(totalPrice)}`
                  )}
                </button>
              </form>
            </div>
          </motion.div>
        </motion.div>
      </div>
      <Footer />
    </div>
  );
}
