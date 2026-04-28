import { Request, Response } from 'express';
import { OrderService } from '../services/orderService.js';
import { OrderStatus } from '../constants/prices.js';

export class OrderController {
  static getOrders(req: Request, res: Response) {
    try {
      const { status, search } = req.query;
      const orders = OrderService.getAll({
        status: status as OrderStatus,
        search: search as string,
      });
      res.json(orders);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  static createOrder(req: Request, res: Response) {
    try {
      const order = OrderService.create(req.body);
      res.status(201).json(order);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  static updateOrderStatus(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { status } = req.body;
      const order = OrderService.updateStatus(id, status as OrderStatus);
      res.json(order);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  static getDashboard(req: Request, res: Response) {
    try {
      const stats = OrderService.getDashboardStats();
      res.json(stats);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
}
