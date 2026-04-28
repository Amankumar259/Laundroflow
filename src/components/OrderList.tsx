import React from "react";
import { Search, Loader2 } from "lucide-react";

interface Order {
  id: string;
  customerName: string;
  phone: string;
  totalPrice: number;
  status: string;
  createdAt: string;
}

interface OrderListProps {
  orders: Order[];
  loading: boolean;
  onStatusUpdate: (id: string, status: string) => Promise<void>;
  onFilterChange: (filters: { search?: string; status?: string }) => void;
}

const NEXT_STATUS: Record<string, string[]> = {
  RECEIVED: ["PROCESSING"],
  PROCESSING: ["READY"],
  READY: ["DELIVERED"],
  DELIVERED: [],
};

export default function OrderList({
  orders,
  loading,
  onStatusUpdate,
  onFilterChange,
}: OrderListProps) {
  const safeOrders = Array.isArray(orders) ? orders : [];

  return (
    <div className="card h-full flex flex-col">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <h2 className="text-xl font-bold">Recent Orders</h2>

        <div className="flex space-x-2 w-full md:w-auto">
          {/* 🔍 Search Input (FIXED) */}
          <div className="relative flex-1 md:w-64">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              size={18}
            />
            <input
              placeholder="Search name or phone..."
              onChange={(e) => onFilterChange({ search: e.target.value })}
              className="w-full pl-12 pr-3 h-10 rounded-lg border border-gray-200 bg-white text-sm outline-none focus:ring-2 focus:ring-blue-100 transition-all"
            />
          </div>

          {/* Filter Select */}
          <select
            onChange={(e) => onFilterChange({ status: e.target.value })}
            className="w-32 h-10 rounded-lg border border-gray-200 bg-white text-sm px-3 outline-none focus:ring-2 focus:ring-blue-100 transition-all"
          >
            <option value="">All</option>
            <option value="RECEIVED">Received</option>
            <option value="PROCESSING">Processing</option>
            <option value="READY">Ready</option>
            <option value="DELIVERED">Delivered</option>
          </select>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto">
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <Loader2 className="animate-spin text-blue-600" size={32} />
          </div>
        ) : safeOrders.length === 0 ? (
          <div className="text-center py-20 text-gray-500">
            No orders found.
          </div>
        ) : (
          <table className="w-full text-left">
            <thead>
              <tr className="border-b text-sm font-medium text-gray-500">
                <th className="pb-3">Order ID</th>
                <th className="pb-3">Customer</th>
                <th className="pb-3">Total</th>
                <th className="pb-3">Status</th>
                <th className="pb-3">Action</th>
              </tr>
            </thead>

            <tbody className="divide-y">
              {safeOrders.map((order) => (
                <tr key={order.id} className="text-sm">
                  <td className="py-4 font-mono text-xs">{order.id}</td>

                  <td className="py-4">
                    <p className="font-medium">{order.customerName}</p>
                    <p className="text-xs text-gray-500">{order.phone}</p>
                  </td>

                  <td className="py-4 font-medium">${order.totalPrice}</td>

                  <td className="py-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-bold status-${order.status.toLowerCase()}`}
                    >
                      {order.status}
                    </span>
                  </td>

                  <td className="py-4">
                    {NEXT_STATUS[order.status]?.length > 0 && (
                      <select
                        className="text-xs border rounded p-1 hover:bg-gray-50 bg-white"
                        onChange={(e) =>
                          onStatusUpdate(order.id, e.target.value)
                        }
                        value=""
                      >
                        <option value="" disabled>
                          Update Status
                        </option>
                        {NEXT_STATUS[order.status].map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
