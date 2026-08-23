"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { staggerContainer, fadeUp } from "@/lib/motion";
import { ShoppingCart, Eye, Trash2, X, Package } from "lucide-react";
import { formatPrice, formatDate } from "@/lib/utils";
import Image from "next/image";
import toast from "react-hot-toast";

interface Order {
  id: string;
  orderId: string;
  productId: string;
  customerName: string;
  customerEmail: string | null;
  customerPhone: string | null;
  address: string;
  qty: number;
  uploadedImages: string[];
  totalPrice: string;
  paymentMethod: string;
  orderStatus: string;
  notes: string | null;
  createdAt: string;
  productName: string | null;
}

const statusOptions = ["pending", "confirmed", "processing", "shipped", "delivered", "cancelled"];

const statusColors: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-700 border-yellow-200",
  confirmed: "bg-blue-100 text-blue-700 border-blue-200",
  processing: "bg-purple-100 text-purple-700 border-purple-200",
  shipped: "bg-indigo-100 text-indigo-700 border-indigo-200",
  delivered: "bg-green-100 text-green-700 border-green-200",
  cancelled: "bg-red-100 text-red-700 border-red-200",
};

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [filterStatus, setFilterStatus] = useState("all");

  const fetchOrders = () => {
    fetch("/api/orders")
      .then((r) => r.json())
      .then((d) => {
        setOrders(d.orders || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => { fetchOrders(); }, []);

  const updateStatus = async (id: string, status: string) => {
    try {
      const res = await fetch(`/api/orders/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderStatus: status }),
      });
      if (!res.ok) throw new Error("Failed to update");
      toast.success("Order status updated");
      fetchOrders();
      if (selectedOrder?.id === id) {
        setSelectedOrder((prev) => prev ? { ...prev, orderStatus: status } : null);
      }
    } catch {
      toast.error("Failed to update order");
    }
  };

  const deleteOrder = async (id: string) => {
    if (!confirm("Delete this order?")) return;
    try {
      await fetch(`/api/orders/${id}`, { method: "DELETE" });
      toast.success("Order deleted");
      setSelectedOrder(null);
      fetchOrders();
    } catch {
      toast.error("Failed to delete");
    }
  };

  const filtered = filterStatus === "all" ? orders : orders.filter((o) => o.orderStatus === filterStatus);

  return (
    <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="space-y-6">
      {/* Header */}
      <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div>
          <h2 className="text-xl font-black text-slate-900">Orders Management</h2>
          <p className="text-sm text-slate-400">{orders.length} total orders</p>
        </div>
        <div className="flex gap-2 flex-wrap">
          {["all", ...statusOptions].map((s) => (
            <button
              key={s}
              onClick={() => setFilterStatus(s)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold capitalize transition-all ${
                filterStatus === s
                  ? "bg-cyan-500 text-white shadow-sm"
                  : "bg-white text-slate-600 border border-slate-200 hover:border-cyan-300"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Table */}
      <motion.div variants={fadeUp} className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-8 space-y-3">
            {[1, 2, 3, 4].map((i) => <div key={i} className="h-16 bg-slate-50 animate-pulse rounded-xl" />)}
          </div>
        ) : filtered.length === 0 ? (
          <div className="p-16 text-center">
            <ShoppingCart size={48} className="text-slate-200 mx-auto mb-4" />
            <p className="text-slate-400">No orders found</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100">
                  {["Order ID", "Customer", "Product", "Qty", "Total", "Payment", "Status", "Date", "Actions"].map((h) => (
                    <th key={h} className="text-left px-4 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filtered.map((order) => (
                  <tr key={order.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-4 py-3">
                      <span className="font-mono text-xs font-bold text-cyan-600">{order.orderId}</span>
                    </td>
                    <td className="px-4 py-3">
                      <p className="font-semibold text-slate-800 text-sm">{order.customerName}</p>
                      <p className="text-xs text-slate-400">{order.customerEmail || "—"}</p>
                    </td>
                    <td className="px-4 py-3 text-sm text-slate-600 max-w-[120px] truncate">
                      {order.productName || "—"}
                    </td>
                    <td className="px-4 py-3 text-sm text-slate-600">{order.qty}</td>
                    <td className="px-4 py-3">
                      <span className="font-bold text-slate-800 text-sm">{formatPrice(order.totalPrice)}</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-xs font-semibold uppercase text-slate-500 bg-slate-100 px-2 py-1 rounded-full">
                        {order.paymentMethod}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <select
                        value={order.orderStatus}
                        onChange={(e) => updateStatus(order.id, e.target.value)}
                        className={`text-xs font-bold px-2 py-1 rounded-full border cursor-pointer ${
                          statusColors[order.orderStatus] || "bg-slate-100 text-slate-500 border-slate-200"
                        }`}
                      >
                        {statusOptions.map((s) => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                    </td>
                    <td className="px-4 py-3 text-xs text-slate-400 whitespace-nowrap">
                      {formatDate(order.createdAt)}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        <button
                          onClick={() => setSelectedOrder(order)}
                          className="w-8 h-8 bg-blue-50 text-cyan-600 rounded-lg flex items-center justify-center hover:bg-cyan-100 transition-colors"
                        >
                          <Eye size={14} />
                        </button>
                        <button
                          onClick={() => deleteOrder(order.id)}
                          className="w-8 h-8 bg-red-50 text-red-500 rounded-lg flex items-center justify-center hover:bg-red-100 transition-colors"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </motion.div>

      {/* Order Detail Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-3xl shadow-2xl max-w-lg w-full max-h-[85vh] overflow-y-auto"
          >
            <div className="p-6 border-b border-slate-100 flex items-center justify-between sticky top-0 bg-white rounded-t-3xl">
              <div>
                <h3 className="font-black text-slate-900">Order Details</h3>
                <p className="text-xs text-slate-400 font-mono">{selectedOrder.orderId}</p>
              </div>
              <button
                onClick={() => setSelectedOrder(null)}
                className="w-8 h-8 bg-slate-100 rounded-xl flex items-center justify-center hover:bg-slate-200 transition-colors"
              >
                <X size={16} />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-slate-50 rounded-xl p-3">
                  <p className="text-xs text-slate-400">Customer</p>
                  <p className="font-bold text-slate-800 text-sm">{selectedOrder.customerName}</p>
                </div>
                <div className="bg-slate-50 rounded-xl p-3">
                  <p className="text-xs text-slate-400">Phone</p>
                  <p className="font-bold text-slate-800 text-sm">{selectedOrder.customerPhone || "—"}</p>
                </div>
                <div className="bg-slate-50 rounded-xl p-3 col-span-2">
                  <p className="text-xs text-slate-400">Address</p>
                  <p className="font-bold text-slate-800 text-sm">{selectedOrder.address}</p>
                </div>
                <div className="bg-slate-50 rounded-xl p-3">
                  <p className="text-xs text-slate-400">Product</p>
                  <p className="font-bold text-slate-800 text-sm">{selectedOrder.productName || "—"}</p>
                </div>
                <div className="bg-slate-50 rounded-xl p-3">
                  <p className="text-xs text-slate-400">Qty × Price</p>
                  <p className="font-bold text-slate-800 text-sm">{selectedOrder.qty} × {formatPrice(Number(selectedOrder.totalPrice) / selectedOrder.qty)}</p>
                </div>
                <div className="bg-blue-50 rounded-xl p-3">
                  <p className="text-xs text-cyan-600">Total</p>
                  <p className="font-black text-cyan-700">{formatPrice(selectedOrder.totalPrice)}</p>
                </div>
                <div className="bg-slate-50 rounded-xl p-3">
                  <p className="text-xs text-slate-400">Payment</p>
                  <p className="font-bold text-slate-800 text-sm uppercase">{selectedOrder.paymentMethod}</p>
                </div>
              </div>

              {selectedOrder.notes && (
                <div className="bg-yellow-50 border border-yellow-100 rounded-xl p-3">
                  <p className="text-xs text-yellow-600 font-semibold mb-1">Notes</p>
                  <p className="text-sm text-slate-700">{selectedOrder.notes}</p>
                </div>
              )}

              {/* Uploaded Images */}
              {selectedOrder.uploadedImages && selectedOrder.uploadedImages.length > 0 && (
                <div>
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Uploaded Photos</p>
                  <div className="grid grid-cols-4 gap-2">
                    {selectedOrder.uploadedImages.map((url, i) => (
                      <div key={i} className="relative h-16 rounded-xl overflow-hidden bg-slate-100">
                        <Image src={url} alt={`Photo ${i + 1}`} fill className="object-cover" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Update Status */}
              <div>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Update Status</p>
                <div className="flex flex-wrap gap-2">
                  {statusOptions.map((s) => (
                    <button
                      key={s}
                      onClick={() => updateStatus(selectedOrder.id, s)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold capitalize border transition-all ${
                        selectedOrder.orderStatus === s
                          ? statusColors[s]
                          : "bg-white text-slate-500 border-slate-200 hover:border-cyan-300"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
}
