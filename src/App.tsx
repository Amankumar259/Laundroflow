import React, { useState, useEffect, useCallback } from 'react';
import { Shirt, LayoutDashboard, History, Settings } from 'lucide-react';
import { motion } from 'motion/react';
import { OrderService } from './services/api.js';
import Dashboard from './components/Dashboard.tsx';
import OrderForm from './components/OrderForm.tsx';
import OrderList from './components/OrderList.tsx';

export default function App() {
  const [orders, setOrders] = useState([]);
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalRevenue: 0,
    ordersByStatus: {
      RECEIVED: 0,
      PROCESSING: 0,
      READY: 0,
      DELIVERED: 0,
    },
  });
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({});

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const [ordersData, statsData] = await Promise.all([
        OrderService.getOrders(filters),
        OrderService.getDashboard(),
      ]);
      setOrders(ordersData);
      setStats(statsData);
    } catch (error) {
      console.error('Failed to fetch data:', error);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleCreateOrder = async (data: any) => {
    await OrderService.createOrder(data);
    fetchData();
  };

  const handleStatusUpdate = async (id: string, status: string) => {
    await OrderService.updateStatus(id, status);
    fetchData();
  };

  const handleFilterChange = (newFilters: any) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-white border-r p-6 flex flex-col space-y-8">
        <div className="flex items-center space-x-2 text-blue-600">
          <Shirt size={32} strokeWidth={2.5} />
          <h1 className="text-2xl font-black tracking-tight italic">LaundroFlow</h1>
        </div>
        
        <nav className="flex-1 space-y-1">
          <a href="#" className="flex items-center px-4 py-2 text-sm font-medium bg-gray-100 rounded-lg text-gray-900 border border-transparent">
            <LayoutDashboard size={18} className="mr-3" /> Dashboard
          </a>
          <a href="#" className="flex items-center px-4 py-2 text-sm font-medium text-gray-500 hover:text-gray-900 hover:bg-gray-50 rounded-lg">
            <History size={18} className="mr-3" /> History
          </a>
          <a href="#" className="flex items-center px-4 py-2 text-sm font-medium text-gray-500 hover:text-gray-900 hover:bg-gray-50 rounded-lg">
            <Settings size={18} className="mr-3" /> Settings
          </a>
        </nav>

        <div className="pt-6 border-t text-xs text-gray-400">
          © 2026 LaundroFlow v1.0
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 max-w-7xl mx-auto w-full">
        <header className="mb-8">
          <h2 className="text-3xl font-bold tracking-tight">Management Overview</h2>
          <p className="text-gray-500">Welcome back. Here's what's happening with your laundry orders today.</p>
        </header>

        <Dashboard stats={stats} />

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          <div className="xl:col-span-1">
            <OrderForm onSubmit={handleCreateOrder} />
          </div>
          <div className="xl:col-span-2">
            <OrderList 
              orders={orders} 
              loading={loading}
              onStatusUpdate={handleStatusUpdate}
              onFilterChange={handleFilterChange}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
