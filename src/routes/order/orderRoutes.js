import {
  createOrder,
  getOrders,
  getOrder,
  updateOrder,
  deleteOrder,
} from '../../controllers/order/orderController.js';

import express from 'express';

const router = express.Router();

/**
 * @swagger
 * /order:
 *   post:
 *     tags:
 *      - Order
 *     description: Create a new order
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: ObjectId
 *               productId:
 *                 type: ObjectId
 *               quantity:
 *                 type: number
 *     responses:
 *       201:
 *         description: Order created successfully
 *       400:
 *         description: Invalid request
 */

router.post('/order', createOrder);

router.get('/orders', getOrders);

router.get('/order/:id', getOrder);

router.put('/order/:id', updateOrder);

router.delete('/order/:id', deleteOrder);

export default router;
