"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { fadeUp, staggerContainer } from "@/lib/motion";
import { Frame, Search, SlidersHorizontal } from "lucide-react";
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

export default function ShopPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filtered, setFiltered] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("/api/products")
      .then((r) => r.json())
      .then((d) => {
        setProducts(d.products || []);
        setFiltered(d.products || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  useEffect(() => {
    const q = search.toLowerCase();
    setFiltered(
      products.filter(
        (p) =>
          p.productName.toLowerCase().includes(q) ||
          (p.description || "").toLowerCase().includes(q)
      )
    );
  }, [search, products]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-cyan-50/50 to-white">
      <Navbar />

      {/* Header */}
      <div className="relative pt-24 pb-16 bg-gradient-to-r from-cyan-600 to-teal-600 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-white/10 rounded-full blur-2xl" />
          <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-teal-400/20 rounded-full blur-2xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block bg-white/20 text-white px-4 py-1.5 rounded-full text-sm font-semibold mb-4">
              🧲 All Products
            </span>
            <h1 className="text-4xl lg:text-6xl font-black text-white mb-4">
              Shop Our Collection
            </h1>
            <p className="text-cyan-100 text-lg max-w-xl mx-auto">
              Transform your memories into premium magnetic photo art.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Filters */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between mb-8">
          <div className="relative flex-1 max-w-md">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-cyan-300 focus:border-cyan-400 shadow-sm"
            />
          </div>
          <div className="flex items-center gap-2 text-slate-500 text-sm">
            <SlidersHorizontal size={16} />
            <span>{filtered.length} products</span>
          </div>
        </div>

        {/* Products Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div key={i} className="bg-white rounded-3xl h-80 animate-pulse border border-slate-100" />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-24">
            <div className="w-24 h-24 bg-cyan-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <Frame size={40} className="text-cyan-300" />
            </div>
            <h3 className="text-2xl font-black text-slate-700 mb-2">No Products Found</h3>
            <p className="text-slate-400">Try adjusting your search.</p>
          </div>
        ) : (
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {filtered.map((product) => (
              <motion.div
                key={product.id}
                variants={fadeUp}
                className="group bg-white rounded-3xl overflow-hidden border border-slate-100 card-hover shadow-sm"
              >
                <div className="relative h-56 bg-gradient-to-br from-cyan-50 to-teal-50 overflow-hidden">
                  {product.galleryImages && product.galleryImages.length > 0 ? (
                    <Image
                      src={product.galleryImages[0]}
                      alt={product.productName}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      <Frame size={48} className="text-cyan-200" />
                    </div>
                  )}
                  <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-cyan-700">
                    {product.imageCount} photos
                  </div>
                  {product.stock <= 5 && product.stock > 0 && (
                    <div className="absolute top-3 right-3 bg-orange-100 text-orange-600 px-2 py-1 rounded-full text-xs font-bold">
                      Low stock
                    </div>
                  )}
                  {product.stock === 0 && (
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                      <span className="bg-white text-slate-700 px-4 py-2 rounded-full font-bold text-sm">
                        Out of Stock
                      </span>
                    </div>
                  )}
                </div>
                <div className="p-5">
                  <p className="text-xs text-slate-400 mb-1 font-mono">{product.productId}</p>
                  <h3 className="font-bold text-slate-800 mb-2 text-base leading-snug">
                    {product.productName}
                  </h3>
                  <p className="text-slate-500 text-xs mb-4 line-clamp-2">
                    {product.description
                      ? product.description.replace(/<[^>]+>/g, "")
                      : "Premium magnetic photo tile set"}
                  </p>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xl font-black text-cyan-600">
                        {formatPrice(product.price)}
                      </span>
                      <p className="text-xs text-slate-400">{product.stock} in stock</p>
                    </div>
                    <Link
                      href={`/shop/${product.id}`}
                      className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                        product.stock === 0
                          ? "bg-slate-100 text-slate-400 cursor-not-allowed"
                          : "bg-gradient-to-r from-cyan-500 to-teal-500 text-white hover:shadow-lg hover:shadow-cyan-200"
                      }`}
                    >
                      {product.stock === 0 ? "Sold Out" : "Order Now"}
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>

      <div className="py-10" />
      <Footer />
    </div>
  );
}
