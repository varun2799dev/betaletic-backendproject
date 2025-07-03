import { Request, Response } from 'express';
import Product from '../models/Product';

// GET /products
export const listProducts = async (_req: Request, res: Response) => {
  const products = await Product.findAll();
  res.json(products);
};

// POST /products
export const createProduct = async (req: Request, res: Response) => {
  const { name, price } = req.body;

  if (!name || !price) {
    return res.status(400).json({ message: 'Name and price are required' });
  }

  try {
    const product = await Product.create({ name, price });
    res.status(201).json(product);
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
