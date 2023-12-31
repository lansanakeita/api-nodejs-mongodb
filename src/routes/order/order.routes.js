import {
  createOrder,
  deleteOrder,
  getOrder,
  getOrders,
  updateOrder,
} from '../../controllers/order/order.controller.js';

import { authorize } from '../../guards/auth.guard.js';
import express from 'express';

const router = express.Router();

/**
 * @swagger
 * /api/order:
 *   post:
 *     summary: Create a new order
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
 *               productId:
 *                 type: object
 *               quantity:
 *                 type: number
 *     responses:
 *       201:
 *         description: Order created successfully
 *       400:
 *         description: Invalid request
 */
router.post('/order', authorize, createOrder);

/**
 * @swagger
 * /api/orders:
 *   get:
 *     summary: Retrieve all orders
 *     tags:
 *       - Order
 *     description: Get all orders
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: The order ID.
 *                     example: 64b27993d8a8cd9c5751870b
 *                   productId:
 *                     type: object
 *                     description: The product id.
 *                   quantity:
 *                     type: number
 *                     description: The order quantity.
 *                     example: 20
 *       400:
 *         description: Invalid request
 *       404:
 *         description: Order not found
 */
router.get('/orders', authorize, getOrders);

/**
 * @swagger
 * /api/order/{id}:
 *   get:
 *     summary: Get a single order
 *     tags:
 *      - Order
 *     description: Get a order by ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the order that we want to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: The order ID.
 *                   example: '64b69f53db11c8ff9fc1e421'
 *                 productId:
 *                   type: object
 *                   description: The product id.
 *                   example: '64b69f53db11c8ff9fc1e421'
 *                 quantity:
 *                   type: number
 *                   description: The product quantity.
 *                   example: '500'
 *       400:
 *         description: Invalid request
 *       404:
 *         description: Order not found
 */

router.get('/order/:id', authorize, getOrder);

/**
 * @swagger
 * /api/order/{id}:
 *   put:
 *     summary: Update specific order
 *     tags:
 *      - Order
 *     description: Update a order by ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the order that we want to update
 *         schema:
 *           type: string
 *     requestBody:
 *       description: Order object that needs to be updated
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productId:
 *                 type: object
 *               description:
 *                 type: string
 *               quantity:
 *                 type: number
 *     responses:
 *       200:
 *         description: Order updated successfully
 *       400:
 *         description: Invalid request
 *       404:
 *         description: Order not found
 */

router.put('/order/:id', authorize, updateOrder);

/**
 * @swagger
 * /api/order/{id}:
 *   delete:
 *     summary: Delete a single order
 *     tags:
 *      - Order
 *     description: Delete a order by ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the order to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Order deleted successfully
 *       400:
 *         description: Invalid request
 *       404:
 *         description: Order not found
 */

router.delete('/order/:id', authorize, deleteOrder);

export default router;
