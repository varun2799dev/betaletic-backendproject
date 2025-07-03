import express from 'express';
import { createCart, addItemToCart, getCart } from '../controllers/cartController';

const router = express.Router();
router.post('/', createCart);
router.post('/item', addItemToCart);
router.get('/:id', getCart);
export default router;
