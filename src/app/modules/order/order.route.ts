import express from 'express';
import { OrderControllers } from './order.controller';

const router = express.Router();

router.post('/orders', OrderControllers.createOrder);
router.get('/', OrderControllers.GetAllOrders);
router.get('/orders/revenue', OrderControllers.calculateRevenue);

export const OrderRoutes = router;
