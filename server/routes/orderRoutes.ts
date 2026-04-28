import { Router } from 'express';
import { OrderController } from '../controllers/orderController.js';

const router = Router();

router.get('/', OrderController.getOrders);
router.post('/', OrderController.createOrder);
router.patch('/:id/status', OrderController.updateOrderStatus);

export default router;
