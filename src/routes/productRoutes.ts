import express from 'express';
import { listProducts, createProduct } from '../controllers/productController';

const router = express.Router();

router.get('/', listProducts);
router.post('/', createProduct); // Add this line

export default router;
