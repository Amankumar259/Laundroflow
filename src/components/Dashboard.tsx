import React from "react";
import { Package, TrendingUp, CheckCircle, Clock } from "lucide-react";
import { motion } from "motion/react";

interface DashboardProps {
  stats: {
    totalOrders: number;
    totalRevenue: number;
    ordersByStatus: Record<string, number>;
  };
}

export default function Dashboard({ stats }: DashboardProps) {
  const statCards = [
    {
      label: "Total Orders",
      value: stats.totalOrders || 0,
      icon: Package,
      color: "text-blue-600",
    },
    {
      label: "Total Revenue",
      value: `$${stats.totalRevenue || 0}`,
      icon: TrendingUp,
      color: "text-green-600",
    },
    {
      label: "Ready for Pickup",
      value: stats.ordersByStatus?.READY || 0,
      icon: CheckCircle,
      color: "text-emerald-600",
    },
    {
      label: "In Processing",
      value: stats.ordersByStatus?.PROCESSING || 0,
      icon: Clock,
      color: "text-amber-600",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {statCards.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="card flex items-center space-x-4"
        >
          <div className={`p-3 rounded-full bg-gray-50 ${stat.color}`}>
            <stat.icon size={24} />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">{stat.label}</p>
            <p className="text-2xl font-bold">{stat.value}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
