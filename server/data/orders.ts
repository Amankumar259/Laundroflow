import { OrderStatus } from '../constants/prices.js';

export interface OrderItem {
  type: string;
  quantity: number;
}

export interface Order {
  id: string;
  customerName: string;
  phone: string;
  items: OrderItem[];
  totalPrice: number;
  status: OrderStatus;
  createdAt: string;
  estimatedDeliveryDate: string;
}

export const orders: Order[] = [];
