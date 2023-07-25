import {
  createProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
} from '../../controllers/product/productController.js';

import express from 'express';

const router = express.Router();

/**
 * @swagger
 * /product:
 *   post:
 *     tags:
 *      - Product
 *     description: Create a new product
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: decimal
 *               quantity:
 *                 type: number
 *     responses:
 *       201:
 *         description: Product created successfully
 *       400:
 *         description: Invalid request
 */

router.post('/product', createProduct);

/**
 * @swagger
 * /products:
 *   get:
 *     tags:
 *       - Product
 *     description: Get all products
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
 *                     description: The product ID.
 *                     example: '64b69f53db11c8ff9fc1e421'
 *                   name:
 *                     type: string
 *                     description: The product name.
 *                     example: 'Table'
 *                   description:
 *                     type: string
 *                     description: The product description.
 *                     example: 'table, size 30x40'
 *                   price:
 *                     type: decimal
 *                     description: The product price.
 *                     example: '44.59'
 *                   quantity:
 *                     type: number
 *                     description: The product quantity.
 *                     example: '200'
 *                   arrivedAt:
 *                     type: Date
 *                     description: The product's date subscription.
 *                     example: '2023-07-18T14:16:03.084Z'
 *       400:
 *         description: Invalid request
 *       404:
 *         description: Product not found
 */
router.get('/products', getProducts);

/**
 * @swagger
 * /product/{id}:
 *   get:
 *     tags:
 *      - Product
 *     description: Get a product by ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the product that we want to retrieve
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
 *                   description: The product ID.
 *                   example: '64b69f53db11c8ff9fc1e421'
 *                 name:
 *                   type: string
 *                   description: The product name.
 *                   example: 'table'
 *                 description:
 *                   type: string
 *                   description: The product description.
 *                   example: 'table 25x30'
 *                 price:
 *                   type: decimal
 *                   description: The product price.
 *                   example: '45.60'
 *                 quantity:
 *                   type: number
 *                   description: The product quantity.
 *                   example: '500'
 *                 arrivedAt:
 *                   type: Date
 *                   description: The product's date subscription.
 *                   example: '2023-07-18T14:16:03.084Z'
 *       400:
 *         description: Invalid request
 *       404:
 *         description: Product not found
 */
router.get('/product/:id', getProduct);

/**
 * @swagger
 * /product/{id}:
 *   put:
 *     tags:
 *      - Product
 *     description: Update a product by ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the product that we want to update
 *         schema:
 *           type: string
 *     requestBody:
 *       description: Product object that needs to be updated
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: decimal
 *               quantity:
 *                 type: number
 *               arrivedAt:
 *                 type: Date
 *     responses:
 *       200:
 *         description: Product updated successfully
 *       400:
 *         description: Invalid request
 *       404:
 *         description: Product not found
 */

router.put('/product/:id', updateProduct);

/**
 * @swagger
 * /product/{id}:
 *   delete:
 *     tags:
 *      - Product
 *     description: Delete a product by ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the product to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Product deleted successfully
 *       400:
 *         description: Invalid request
 *       404:
 *         description: Product not found
 */

router.delete('/product/:id', deleteProduct);

export default router;
