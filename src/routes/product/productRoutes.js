import {
  createProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
} from '../../controllers/product/productController.js';

import { body } from 'express-validator';
import express from 'express';

const router = express.Router();

router.post('/product', createProduct);

router.get('/products', getProducts);

router.get('/product/:id', getProduct);

router.put('/product/:id', updateProduct);

router.delete('/product/:id', deleteProduct);

export default router;
