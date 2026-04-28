import { orders, Order, OrderItem } from '../data/orders.js';
import { PRICES, STATUS_TRANSITIONS, OrderStatus } from '../constants/prices.js';

export class OrderService {
  static getAll(filters: { status?: OrderStatus; search?: string }) {
    let result = [...orders];

    if (filters.status) {
      result = result.filter((o) => o.status === filters.status);
    }

    if (filters.search) {
      const search = filters.search.toLowerCase();
      result = result.filter(
        (o) =>
          o.customerName.toLowerCase().includes(search) || o.phone.includes(search)
      );
    }

    return result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  static create(data: { customerName: string; phone: string; items: OrderItem[] }) {
    // Basic validation
    if (!data.customerName || !data.phone || !data.items || data.items.length === 0) {
      throw new Error('Missing required fields');
    }

    // Calculate price and validate types
    let total = 0;
    for (const item of data.items) {
      const price = PRICES[item.type];
      if (price === undefined) {
        throw new Error(`Invalid garment type: ${item.type}`);
      }
      if (item.quantity <= 0) {
        throw new Error('Quantity must be greater than 0');
      }
      total += price * item.quantity;
    }

    const order: Order = {
      id: `ORD-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      customerName: data.customerName,
      phone: data.phone,
      items: data.items,
      totalPrice: total,
      status: 'RECEIVED',
      createdAt: new Date().toISOString(),
      estimatedDeliveryDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days later
    };

    orders.push(order);
    return order;
  }

  static updateStatus(id: string, newStatus: OrderStatus) {
    const order = orders.find((o) => o.id === id);
    if (!order) {
      throw new Error('Order not found');
    }

    const possibleNextStatuses = STATUS_TRANSITIONS[order.status];
    if (!possibleNextStatuses.includes(newStatus)) {
      throw new Error(`Invalid status transition from ${order.status} to ${newStatus}`);
    }

    order.status = newStatus;
    return order;
  }

  static getDashboardStats() {
    const totalOrders = orders.length;
    const totalRevenue = orders.reduce((sum, o) => sum + o.totalPrice, 0);
    const ordersByStatus: Record<string, number> = {
      RECEIVED: 0,
      PROCESSING: 0,
      READY: 0,
      DELIVERED: 0,
    };

    orders.forEach((o) => {
      ordersByStatus[o.status]++;
    });

    return {
      totalOrders,
      totalRevenue,
      ordersByStatus,
    };
  }
}
