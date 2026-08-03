"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { staggerContainer, fadeUp } from "@/lib/motion";
import {
  Users,
  Package,
  ShoppingCart,
  DollarSign,
  Clock,
  TrendingUp,
} from "lucide-react";
import { formatPrice, formatDate } from "@/lib/utils";

interface Stats {
  totalCustomers: number;
  totalProducts: number;
  totalOrders: number;
  totalRevenue: string;
  pendingOrders: number;
}

interface Order {
  id: string;
  orderId: string;
  customerName: string;
  totalPrice: string;
  orderStatus: string;
  createdAt: string;
}

const statusColors: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-700",
  confirmed: "bg-blue-100 text-blue-700",
  processing: "bg-purple-100 text-purple-700",
  shipped: "bg-indigo-100 text-indigo-700",
  delivered: "bg-green-100 text-green-700",
  cancelled: "bg-red-100 text-red-700",
};

export default function AdminOverviewPage() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [recentOrders, setRecentOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/stats")
      .then((r) => r.json())
      .then((d) => {
        setStats(d.stats);
        setRecentOrders(d.recentOrders || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const statCards = [
    {
      label: "Total Revenue",
      value: formatPrice(stats?.totalRevenue || "0"),
      icon: DollarSign,
      color: "from-cyan-500 to-teal-500",
      bg: "bg-cyan-50",
      textColor: "text-cyan-700",
    },
    {
      label: "Total Orders",
      value: stats?.totalOrders?.toString() || "0",
      icon: ShoppingCart,
      color: "from-violet-500 to-purple-500",
      bg: "bg-violet-50",
      textColor: "text-violet-700",
    },
    {
      label: "Products",
      value: stats?.totalProducts?.toString() || "0",
      icon: Package,
      color: "from-orange-500 to-amber-500",
      bg: "bg-orange-50",
      textColor: "text-orange-700",
    },
    {
      label: "Customers",
      value: stats?.totalCustomers?.toString() || "0",
      icon: Users,
      color: "from-pink-500 to-rose-500",
      bg: "bg-pink-50",
      textColor: "text-pink-700",
    },
  ];

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {statCards.map((card) => (
          <motion.div
            key={card.label}
            variants={fadeUp}
            className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm card-hover"
          >
            <div className="flex items-start justify-between mb-4">
              <div className={`w-12 h-12 rounded-xl ${card.bg} flex items-center justify-center`}>
                <card.icon size={22} className={card.textColor} />
              </div>
              <div className={`text-xs font-semibold ${card.textColor} ${card.bg} px-2 py-1 rounded-full`}>
                <TrendingUp size={12} className="inline mr-1" />
                Live
              </div>
            </div>
            {loading ? (
              <div className="h-8 w-24 bg-slate-100 animate-pulse rounded-lg" />
            ) : (
              <p className="text-2xl font-black text-slate-900">{card.value}</p>
            )}
            <p className="text-sm text-slate-500 mt-1">{card.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Pending Alert */}
      {stats && stats.pendingOrders > 0 && (
        <motion.div
          variants={fadeUp}
          className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-2xl p-4 flex items-center gap-4"
        >
          <div className="w-10 h-10 bg-yellow-100 rounded-xl flex items-center justify-center flex-shrink-0">
            <Clock size={20} className="text-yellow-600" />
          </div>
          <div>
            <p className="font-bold text-yellow-800">
              {stats.pendingOrders} pending order{stats.pendingOrders > 1 ? "s" : ""} need attention
            </p>
            <p className="text-sm text-yellow-600">Review and confirm orders to keep customers happy</p>
          </div>
        </motion.div>
      )}

      {/* Recent Orders */}
      <motion.div variants={fadeUp} className="bg-white rounded-2xl border border-slate-100 shadow-sm">
        <div className="p-6 border-b border-slate-100">
          <h2 className="font-black text-slate-900">Recent Orders</h2>
          <p className="text-sm text-slate-400">Latest 5 orders across all customers</p>
        </div>

        {loading ? (
          <div className="p-6 space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-14 bg-slate-50 animate-pulse rounded-xl" />
            ))}
          </div>
        ) : recentOrders.length === 0 ? (
          <div className="p-12 text-center">
            <ShoppingCart size={40} className="text-slate-200 mx-auto mb-3" />
            <p className="text-slate-400">No orders yet</p>
          </div>
        ) : (
          <div className="divide-y divide-slate-50">
            {recentOrders.map((order) => (
              <div key={order.id} className="p-4 flex items-center gap-4 hover:bg-slate-50 transition-colors">
                <div className="w-10 h-10 bg-gradient-to-br from-cyan-100 to-teal-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <ShoppingCart size={16} className="text-cyan-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-slate-800 text-sm truncate">{order.customerName}</p>
                  <p className="text-xs text-slate-400 font-mono">{order.orderId}</p>
                </div>
                <div className="text-right">
                  <p className="font-black text-slate-800 text-sm">{formatPrice(order.totalPrice)}</p>
                  <p className="text-xs text-slate-400">{formatDate(order.createdAt)}</p>
                </div>
                <span
                  className={`text-xs font-bold px-2 py-1 rounded-full capitalize ${
                    statusColors[order.orderStatus] || "bg-slate-100 text-slate-500"
                  }`}
                >
                  {order.orderStatus}
                </span>
              </div>
            ))}
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}
