import {
  createOrder,
  getOrders,
  getOrder,
  updateOrder,
  deleteOrder,
} from '../../controllers/order/orderController.js';

import express from 'express';

const router = express.Router();

router.post('/order', createOrder);

router.get('/orders', getOrders);

router.get('/order/:id', getOrder);

router.put('/order/:id', updateOrder);

router.delete('/order/:id', deleteOrder);

export default router;
