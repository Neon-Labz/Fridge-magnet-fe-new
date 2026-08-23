"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { motion } from "framer-motion";
import { staggerContainer, fadeUp } from "@/lib/motion";
import { Package, Plus, X, Pencil, Trash2, Loader2, Upload, Frame } from "lucide-react";
import { formatPrice, formatDate } from "@/lib/utils";
import toast from "react-hot-toast";
import { useDropzone } from "react-dropzone";

const TiptapEditor = dynamic(() => import("@/components/TiptapEditor"), { ssr: false });

interface Product {
  id: string;
  productId: string;
  productName: string;
  description: string | null;
  imageCount: number;
  stock: number;
  price: string;
  galleryImages: string[];
  isActive: boolean;
  createdAt: string;
}

const emptyForm = {
  productName: "",
  description: "",
  imageCount: 1,
  stock: 0,
  price: "",
  galleryImages: [] as string[],
  isActive: true,
};

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<Product | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [galleryFiles, setGalleryFiles] = useState<File[]>([]);

  const fetchProducts = () => {
    fetch("/api/products")
      .then((r) => r.json())
      .then((d) => {
        setProducts(d.products || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => { fetchProducts(); }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { "image/*": [] },
    onDrop: (files) => setGalleryFiles((prev) => [...prev, ...files]),
  });

  const openCreate = () => {
    setEditing(null);
    setForm(emptyForm);
    setGalleryFiles([]);
    setShowModal(true);
  };

  const openEdit = (product: Product) => {
    setEditing(product);
    setForm({
      productName: product.productName,
      description: product.description || "",
      imageCount: product.imageCount,
      stock: product.stock,
      price: product.price,
      galleryImages: product.galleryImages || [],
      isActive: product.isActive,
    });
    setGalleryFiles([]);
    setShowModal(true);
  };

  const uploadGalleryImages = async (): Promise<string[]> => {
    if (galleryFiles.length === 0) return form.galleryImages;
    setUploading(true);
    const formData = new FormData();
    galleryFiles.forEach((f) => formData.append("files", f));
    const res = await fetch("/api/upload", { method: "POST", body: formData });
    setUploading(false);
    if (!res.ok) throw new Error("Upload failed");
    const data = await res.json();
    return [...form.galleryImages, ...(data.urls as string[])];
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const galleryImages = await uploadGalleryImages();
      const payload = { ...form, galleryImages, price: String(form.price) };

      const url = editing ? `/api/products/${editing.id}` : "/api/products";
      const method = editing ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Failed to save");
      }

      toast.success(editing ? "Product updated!" : "Product created!");
      setShowModal(false);
      fetchProducts();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to save product");
    } finally {
      setSaving(false);
    }
  };

  const deleteProduct = async (id: string) => {
    if (!confirm("Delete this product?")) return;
    try {
      await fetch(`/api/products/${id}`, { method: "DELETE" });
      toast.success("Product deleted");
      fetchProducts();
    } catch {
      toast.error("Failed to delete");
    }
  };

  const removeGalleryImage = (index: number) => {
    setForm((prev) => ({
      ...prev,
      galleryImages: prev.galleryImages.filter((_, i) => i !== index),
    }));
  };

  return (
    <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="space-y-6">
      {/* Header */}
      <motion.div variants={fadeUp} className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-black text-slate-900">Products</h2>
          <p className="text-sm text-slate-400">{products.length} total products</p>
        </div>
        <button
          onClick={openCreate}
          className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-red-600 text-white px-4 py-2.5 rounded-xl font-bold text-sm hover:shadow-lg hover:shadow-cyan-200 transition-all"
        >
          <Plus size={16} />
          Add Product
        </button>
      </motion.div>

      {/* Products Grid */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="bg-white rounded-2xl h-64 animate-pulse border border-slate-100" />
          ))}
        </div>
      ) : products.length === 0 ? (
        <motion.div variants={fadeUp} className="text-center py-24 bg-white rounded-2xl border border-slate-100">
          <Package size={48} className="text-slate-200 mx-auto mb-4" />
          <h3 className="font-black text-slate-700 mb-2">No Products</h3>
          <p className="text-slate-400 mb-4">Add your first product to get started</p>
          <button
            onClick={openCreate}
            className="bg-gradient-to-r from-blue-500 to-red-600 text-white px-6 py-3 rounded-xl font-bold"
          >
            Add Product
          </button>
        </motion.div>
      ) : (
        <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map((product) => (
            <motion.div
              key={product.id}
              variants={fadeUp}
              className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden group"
            >
              <div className="relative h-40 bg-gradient-to-br from-blue-50 to-teal-50">
                {product.galleryImages && product.galleryImages.length > 0 ? (
                  <Image
                    src={product.galleryImages[0]}
                    alt={product.productName}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <Frame size={40} className="text-cyan-200" />
                  </div>
                )}
                <div className={`absolute top-2 right-2 text-xs font-bold px-2 py-0.5 rounded-full ${product.isActive ? "bg-green-100 text-green-700" : "bg-slate-100 text-slate-500"}`}>
                  {product.isActive ? "Active" : "Inactive"}
                </div>
              </div>
              <div className="p-4">
                <p className="text-xs text-slate-400 font-mono mb-0.5">{product.productId}</p>
                <h3 className="font-black text-slate-800 text-sm mb-2 line-clamp-1">{product.productName}</h3>
                <div className="flex items-center gap-3 text-xs text-slate-500 mb-3">
                  <span>{product.imageCount} photos</span>
                  <span>•</span>
                  <span>{product.stock} in stock</span>
                  <span>•</span>
                  <span className="font-bold text-blue-600">{formatPrice(product.price)}</span>
                </div>
                <p className="text-xs text-slate-400 mb-3">{formatDate(product.createdAt)}</p>
                <div className="flex gap-2">
                  <button
                    onClick={() => openEdit(product)}
                    className="flex-1 flex items-center justify-center gap-1.5 py-2 bg-blue-50 text-red-500 rounded-xl text-xs font-bold hover:bg-blue-100 transition-colors"
                  >
                    <Pencil size={12} />
                    Edit
                  </button>
                  <button
                    onClick={() => deleteProduct(product.id)}
                    className="flex items-center justify-center w-8 py-2 bg-red-50 text-red-500 rounded-xl hover:bg-red-100 transition-colors"
                  >
                    <Trash2 size={12} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-3xl shadow-2xl max-w-xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="p-6 border-b border-slate-100 flex items-center justify-between sticky top-0 bg-white rounded-t-3xl z-10">
              <h3 className="font-black text-slate-900">
                {editing ? "Edit Product" : "Add New Product"}
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="w-8 h-8 bg-slate-100 rounded-xl flex items-center justify-center hover:bg-slate-200"
              >
                <X size={16} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1.5">Product Name *</label>
                <input
                  type="text"
                  required
                  value={form.productName}
                  onChange={(e) => setForm({ ...form, productName: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-300 text-sm"
                  placeholder="e.g., Premium 9-Tile Set"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1.5">Description</label>
                <TiptapEditor
                  content={form.description}
                  onChange={(val) => setForm({ ...form, description: val })}
                  placeholder="Describe your product..."
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1.5">Max Photos *</label>
                  <input
                    type="number"
                    required
                    min={1}
                    value={form.imageCount}
                    onChange={(e) => setForm({ ...form, imageCount: Number(e.target.value) })}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-300 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1.5">Stock *</label>
                  <input
                    type="number"
                    required
                    min={0}
                    value={form.stock}
                    onChange={(e) => setForm({ ...form, stock: Number(e.target.value) })}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-300 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1.5">Price ($) *</label>
                  <input
                    type="number"
                    required
                    min={0}
                    step="0.01"
                    value={form.price}
                    onChange={(e) => setForm({ ...form, price: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-300 text-sm"
                    placeholder="29.99"
                  />
                </div>
              </div>

              {/* Gallery Images */}
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1.5">Product Gallery Images</label>
                <div
                  {...getRootProps()}
                  className={`border-2 border-dashed rounded-xl p-4 text-center cursor-pointer transition-all ${
                    isDragActive ? "border-blue-400 bg-blue-50" : "border-slate-200 hover:border-blue-300 hover:bg-blue-50/30"
                  }`}
                >
                  <input {...getInputProps()} />
                  <Upload size={24} className="text-blue-400 mx-auto mb-1" />
                  <p className="text-sm text-slate-500">Drop images or click to upload</p>
                </div>

                {/* Existing gallery images */}
                {form.galleryImages.length > 0 && (
                  <div className="mt-3">
                    <p className="text-xs text-slate-400 mb-2">Current images:</p>
                    <div className="flex flex-wrap gap-2">
                      {form.galleryImages.map((url, i) => (
                        <div key={i} className="relative group">
                          <div className="relative w-16 h-16 rounded-lg overflow-hidden">
                            <Image src={url} alt="" fill className="object-cover" />
                          </div>
                          <button
                            type="button"
                            onClick={() => removeGalleryImage(i)}
                            className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <X size={8} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* New gallery files */}
                {galleryFiles.length > 0 && (
                  <div className="mt-3">
                    <p className="text-xs text-slate-400 mb-2">New images to upload ({galleryFiles.length}):</p>
                    <div className="flex flex-wrap gap-2">
                      {galleryFiles.map((file, i) => (
                        <div key={i} className="relative w-16 h-16 rounded-lg overflow-hidden">
                          <Image src={URL.createObjectURL(file)} alt="" fill className="object-cover" />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="isActive"
                  checked={form.isActive}
                  onChange={(e) => setForm({ ...form, isActive: e.target.checked })}
                  className="w-4 h-4 accent-blue-500"
                />
                <label htmlFor="isActive" className="text-sm font-semibold text-slate-700">
                  Product is active (visible in shop)
                </label>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 py-3 border border-slate-200 text-slate-700 rounded-xl font-bold text-sm hover:bg-slate-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving || uploading}
                  className="flex-1 py-3 bg-gradient-to-r from-blue-500 to-red-600 text-white rounded-xl font-black text-sm hover:shadow-lg hover:shadow-cyan-200 transition-all disabled:opacity-60 flex items-center justify-center gap-2"
                >
                  {(saving || uploading) ? (
                    <><Loader2 size={16} className="animate-spin" /> {uploading ? "Uploading..." : "Saving..."}</>
                  ) : (
                    editing ? "Update Product" : "Create Product"
                  )}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
}
