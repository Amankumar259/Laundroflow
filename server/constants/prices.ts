export const PRICES: Record<string, number> = {
  Shirt: 10,
  Pants: 15,
  Saree: 20,
};

export type OrderStatus = 'RECEIVED' | 'PROCESSING' | 'READY' | 'DELIVERED';

export const VALID_STATUSES: OrderStatus[] = ['RECEIVED', 'PROCESSING', 'READY', 'DELIVERED'];

export const STATUS_TRANSITIONS: Record<OrderStatus, OrderStatus[]> = {
  RECEIVED: ['PROCESSING'],
  PROCESSING: ['READY'],
  READY: ['DELIVERED'],
  DELIVERED: [],
};
