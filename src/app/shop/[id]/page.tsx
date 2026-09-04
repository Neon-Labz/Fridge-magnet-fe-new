"use client";
import { useState, useEffect, use } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useDropzone } from "react-dropzone";
import toast from "react-hot-toast";
import { fadeUp, staggerContainer } from "@/lib/motion";
import {
  Upload,
  X,
  Frame,
  ChevronLeft,
  Loader2,
  ShoppingCart,
  ImageIcon,
  CheckCircle2,
  Package,
  Truck,
} from "lucide-react";
import { formatPrice } from "@/lib/utils";
import { productApi } from "@/app/api/product.api";
import { CartItem, Product } from "@/lib/data";

export default function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [selectedImage, setSelectedImage] = useState(0);
  const [cartCount, setCartCount] = useState(() => {
    if (typeof window === "undefined") return 0;
    return JSON.parse(sessionStorage.getItem("cart") || "[]").length;
  });

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await productApi.getProductById(id);
        setProduct(res);
      } catch (error) {
        console.error("Failed to fetch product:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { "image/*": [] },
    maxFiles: product?.imagecount || 10,
    onDrop: (acceptedFiles) => {
      const maxCount = product?.imagecount || 10;
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

  const handleAddToCart = async () => {
    if (!product) return;

    if (uploadedFiles.length === 0) {
      toast.error("Please upload at least one photo");
      return;
    }
    if (uploadedFiles.length < product.imagecount) {
      toast.error(`Please upload exactly ${product.imagecount} photos`);
      return;
    }

    setUploading(true);
    try {
      const formData = new FormData();
      uploadedFiles.forEach((file) => formData.append("files", file));

      const res = await fetch("/api/upload-r2", { method: "POST", body: formData });
      if (!res.ok) throw new Error("Upload failed");
      const { urls: imageDataUrls } = await res.json();

      const cart: CartItem[] = JSON.parse(sessionStorage.getItem("cart") || "[]");
      cart.push({
        productId: product._id,
        productName: product.productName,
        price: product.price,
        imageCount: product.imagecount,
        primaryImage: product.primaryImage,
        galleryImages: product.galleryImages,
        uploadedImageUrls: imageDataUrls,
      });
      sessionStorage.setItem("cart", JSON.stringify(cart));
      setCartCount(cart.length);
      setUploadedFiles([]);
      window.dispatchEvent(new Event("cartUpdated"));

      toast.success(
        (t) => (
          <div className="flex flex-col gap-2">
            <p className="font-semibold text-sm">Added to cart! 🛒</p>
            <div className="flex gap-2">
              <button
                onClick={() => { toast.dismiss(t.id); }}
                className="text-xs px-3 py-1.5 bg-slate-100 rounded-lg font-medium"
              >
                Keep Shopping
              </button>
              <button
                onClick={() => { toast.dismiss(t.id); router.push("/checkout"); }}
                className="text-xs px-3 py-1.5 bg-gradient-to-r from-blue-600 to-blue-900 text-white rounded-lg font-medium"
              >
                Go to Checkout
              </button>
            </div>
          </div>
        ),
        { duration: 6000 }
      );
    } catch (err) {
      console.error("Cart error:", err);
      toast.error("Failed to upload images. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center bg-gradient-to-b from-blue-50/30 to-white">
        <div className="flex flex-col items-center gap-4">
          <div className="w-14 h-14 border-4 border-blue-50 border-t-blue-900 rounded-full animate-spin" />
          <p className="text-slate-400 text-sm font-medium">Loading product…</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center bg-gradient-to-b from-blue-50/30 to-white">
        <div className="text-center px-5">
          <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <Frame size={36} className="text-blue-300" />
          </div>
          <h2 className="text-2xl font-black text-slate-700">Product Not Found</h2>
          <p className="text-slate-400 mt-2 text-sm">This product may have been removed.</p>
          <button
            onClick={() => router.push("/shop")}
            className="mt-6 px-6 py-2.5 bg-gradient-to-r from-blue-600 to-blue-900 text-white rounded-xl font-bold text-sm hover:shadow-lg transition-all"
          >
            Back to Shop
          </button>
        </div>
      </div>
    );
  }

  const maxImages = product.imagecount;
  const uploadProgress = Math.round((uploadedFiles.length / maxImages) * 100);

  return (
    <div className="bg-gradient-to-b from-blue-50/30 to-white">
      {/* Consistent left/right padding across all breakpoints */}
      <div className="max-w-7xl mx-auto px-5 sm:px-6 md:px-8 lg:px-10 xl:px-12 pt-24 sm:pt-28 pb-16 sm:pb-16 md:pb-14 lg:pb-75">
        {/* <div className="flex items-center justify-between mb-8 sm:mb-10">
          <motion.button
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={() => router.back()}
            className="flex items-center gap-1.5 text-slate-400 hover:text-blue-900 transition-colors text-sm font-medium group"
          >
            <ChevronLeft size={16} className="group-hover:-translate-x-0.5 transition-transform" />
            Back to Shop
          </motion.button>

          {cartCount > 0 && (
            <motion.button
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              onClick={() => router.push("/checkout")}
              className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-900 text-white px-4 py-2 rounded-full text-sm font-bold hover:shadow-lg transition-all"
            >
              <ShoppingCart size={15} />
              <span className="hidden xs:inline">Checkout</span>
              <span className="bg-white text-blue-900 text-xs font-black w-5 h-5 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            </motion.button>
          )}
        </div> */}

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-8 lg:gap-10 xl:gap-16"
        >
          {/* ── Left: Product Images ── */}
          <motion.div variants={fadeUp} className="space-y-4">
            <div className="relative h-64 sm:h-80 md:h-[380px] lg:h-[440px] xl:h-[480px] rounded-3xl overflow-hidden bg-gradient-to-br from-blue-50 to-blue-50 shadow-xl shadow-blue-100/50">
              {product.galleryImages && product.galleryImages.length > 0 ? (
                <Image
                  src={product.galleryImages[selectedImage].secure_url}
                  alt={product.productName}
                  fill
                  className="object-cover transition-all duration-500"
                />
              ) : (
                <div className="flex flex-col items-center justify-center h-full gap-3">
                  <Frame size={56} className="text-blue-50" />
                  <p className="text-blue-300 text-sm font-medium">No preview available</p>
                </div>
              )}
              {product.stock <= 5 && product.stock > 0 && (
                <div className="absolute top-4 right-4 bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                  Only {product.stock} left!
                </div>
              )}
              {product.stock === 0 && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-3xl">
                  <span className="bg-white text-slate-700 px-6 py-3 rounded-2xl font-black text-lg shadow-xl">
                    Out of Stock
                  </span>
                </div>
              )}
            </div>

            {product.galleryImages && product.galleryImages.length > 1 && (
              <div className="flex gap-3 overflow-x-auto p-2">
                {product.galleryImages.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className={`relative flex-shrink-0 w-20 h-20 rounded-2xl overflow-hidden border-2 transition-all duration-200 ${
                      selectedImage === i
                        ? "border-blue-900 shadow-lg shadow-blue-50/60 scale-105"
                        : "border-slate-200 hover:border-blue-50 opacity-70 hover:opacity-100"
                    }`}
                  >
                    <Image src={img.secure_url} alt={`View ${i + 1}`} fill className="object-cover" />
                  </button>
                ))}
              </div>
            )}

            <div className="flex flex-wrap justify-center md:justify-start gap-2 pt-2">
              {[
                { icon: <Package size={13} />, label: "Premium Quality" },
                { icon: <Truck size={13} />, label: "Fast Delivery" },
                { icon: <CheckCircle2 size={13} />, label: "Satisfaction Guaranteed" },
              ].map((f) => (
                <span
                  key={f.label}
                  className="flex items-center gap-1.5 bg-white border border-slate-100 text-slate-500 text-xs font-medium px-3 py-1.5 rounded-full shadow-sm"
                >
                  <span className="text-blue-900">{f.icon}</span>
                  {f.label}
                </span>
              ))}
            </div>
          </motion.div>

          {/* ── Right: Product Info + Upload ── */}
          <motion.div variants={fadeUp} className="space-y-5">

            {/* Product header */}
            <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-100 shadow-sm text-center lg:text-left">
              <p className="text-xs text-slate-400 font-mono mb-1">{product.productId}</p>
              <h1 className="text-xl sm:text-2xl font-black text-slate-900 leading-tight mb-3">
                {product.productName}
              </h1>
              {product.description && (
                <div
                  className="text-sm text-slate-500 leading-relaxed prose prose-sm max-w-none mb-4 mx-auto lg:mx-0"
                  dangerouslySetInnerHTML={{ __html: product.description }}
                />
              )}
              <div className="flex flex-wrap items-center lg:items-end justify-center lg:justify-between gap-4 pt-3 border-t border-slate-100">
                <div className="flex gap-3">
                  <div className="bg-blue-50 rounded-2xl px-4 py-2.5 text-center">
                    <p className="text-xl font-black text-red-600">{product.imagecount}</p>
                    <p className="text-xs text-blue-900 font-medium">Photos</p>
                  </div>
                  <div className="bg-teal-50 rounded-2xl px-4 py-2.5 text-center">
                    <p className="text-xl font-black text-red-600">{product.stock}</p>
                    <p className="text-xs text-blue-900 font-medium">In Stock</p>
                  </div>
                </div>
                <div className="text-center lg:text-right">
                  <p className="text-2xl sm:text-3xl font-black text-blue-900">{formatPrice(product.price)}</p>
                  <p className="text-xs text-slate-400">per set</p>
                </div>
              </div>
            </div>

            {/* Photo Upload */}
            <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-100 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 bg-blue-100 rounded-lg flex items-center justify-center">
                    <ImageIcon size={14} className="text-blue-900" />
                  </div>
                  <h2 className="text-sm font-bold text-slate-700">Upload Your Photos</h2>
                </div>
                <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                  uploadedFiles.length === maxImages
                    ? "bg-blue-100 text-red-600"
                    : "bg-blue-100 text-blue-900"
                }`}>
                  {uploadedFiles.length}/{maxImages}
                </span>
              </div>

              <div className="w-full bg-slate-100 rounded-full h-1.5 mb-4">
                <div
                  className="bg-red-600 h-1.5 rounded-full transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>

              <div
                {...getRootProps()}
                className={`border-2 border-dashed rounded-2xl p-6 sm:p-8 text-center cursor-pointer transition-all duration-200 ${
                  isDragActive
                    ? "border-blue-900 bg-blue-50 scale-[1.01]"
                    : uploadedFiles.length >= maxImages
                      ? "border-slate-200 bg-slate-50 cursor-not-allowed opacity-60"
                      : "border-slate-200 hover:border-blue-50 hover:bg-blue-50/40"
                }`}
              >
                <input {...getInputProps()} disabled={uploadedFiles.length >= maxImages} />
                <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-3">
                  <Upload size={22} className="text-blue-900" />
                </div>
                <p className="text-sm font-semibold text-slate-600">
                  {isDragActive ? "Drop your photos here!" : "Drag & drop or click to browse"}
                </p>
                <p className="text-xs text-red-600 mt-1">
                  {uploadedFiles.length >= maxImages
                    ? "Maximum photos reached"
                    : `Upload exactly ${maxImages} photos • JPG, PNG, WEBP`}
                </p>
              </div>

              {uploadedFiles.length > 0 && (
                <div className="mt-4 grid grid-cols-4 sm:grid-cols-5 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2">
                  {uploadedFiles.map((file, i) => (
                    <div key={i} className="relative group">
                      <div className="relative h-16 rounded-xl overflow-hidden bg-slate-100 ring-2 ring-transparent group-hover:ring-blue-900 transition-all">
                        <Image src={URL.createObjectURL(file)} alt={file.name} fill className="object-cover" />
                      </div>
                      <button
                        type="button"
                        onClick={() => removeFile(i)}
                        className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-red-600 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-md"
                      >
                        <X size={10} />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              <button
                type="button"
                onClick={handleAddToCart}
                disabled={uploading || product.stock === 0}
                className="mt-5 w-full bg-gradient-to-r from-blue-600 to-blue-900 text-white font-black py-4 px-6 rounded-2xl hover:shadow-xl hover:shadow-blue-50 hover:-translate-y-0.5 transition-all disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2 text-base"
              >
                {uploading ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    Uploading Photos…
                  </>
                ) : (
                  <>
                    <ShoppingCart size={18} />
                    {product.stock === 0 ? "Out of Stock" : "Buy Now"}
                  </>
                )}
              </button>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}