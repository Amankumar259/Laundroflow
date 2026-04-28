import axios from "axios";

const api = axios.create({
  baseURL: "/api",
});

export const OrderService = {
  getOrders: async (filters: { status?: string; search?: string } = {}) => {
    try {
      const response = await api.get("/orders", { params: filters });
      return Array.isArray(response.data) ? response.data : [];
    } catch (error) {
      console.error("Error fetching orders:", error);
      return [];
    }
  },
  createOrder: async (orderData: any) => {
    const response = await api.post("/orders", orderData);
    return response.data;
  },
  updateStatus: async (id: string, status: string) => {
    const response = await api.patch(`/orders/${id}/status`, { status });
    return response.data;
  },
  getDashboard: async () => {
    try {
      const response = await api.get("/dashboard");
      return (
        response.data || {
          totalOrders: 0,
          totalRevenue: 0,
          ordersByStatus: {
            RECEIVED: 0,
            PROCESSING: 0,
            READY: 0,
            DELIVERED: 0,
          },
        }
      );
    } catch (error) {
      console.error("Error fetching dashboard:", error);
      return {
        totalOrders: 0,
        totalRevenue: 0,
        ordersByStatus: { RECEIVED: 0, PROCESSING: 0, READY: 0, DELIVERED: 0 },
      };
    }
  },
};
