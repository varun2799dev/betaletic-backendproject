import type { Request, Response } from 'express';
import Basket from '../models/Basket';
import BasketItem from '../models/BasketItem';
import Product from '../models/Product';
import Promotion from '../models/Promotion';

export const createCart = async (req: Request, res: Response): Promise<Response> => {
  const basket = await Basket.create();
  return res.status(201).json(basket);
};

export const addItemToCart = async (req: Request, res: Response): Promise<Response> => {
  const { basketId, productId, quantity } = req.body;

  const basket = await Basket.findByPk(basketId);
  const product = await Product.findByPk(productId);

  if (!basket || !product) {
    return res.status(404).json({ message: 'Not found' });
  }

  const item = await BasketItem.create({ basketId, productId, quantity });
  return res.status(201).json(item);
};

export const getCart = async (req: Request, res: Response): Promise<Response> => {
  const basket = await Basket.findByPk(req.params.id, {
    include: [
    {
      model: BasketItem,
      as: 'basketItems',
      include: [Product],
    },
  ],
});

  if (!basket) {
    return res.status(404).json({ message: 'Cart not found' });
  }

  const promotions = await Promotion.findAll();
  let total = 0;
  let totalDiscount = 0;

  const items = basket.basketItems?.map((item) => {
    const product = item.product;

    if (!product) {
      throw new Error(`Product not found for basket item with ID ${item.id}`);
    }

    const promo = promotions.find(
      (p) =>
        p.productId === item.productId &&
        p.type === 'bulk' &&
        p.minQuantity !== null &&
        p.discountPrice !== null
    );

    let itemTotal = item.quantity * product.price;

    if (
      promo &&
      promo.minQuantity !== null &&
      promo.discountPrice !== null &&
      item.quantity >= promo.minQuantity
    ) {
      const sets = Math.floor(item.quantity / promo.minQuantity);
      const remaining = item.quantity % promo.minQuantity;
      itemTotal = sets * promo.discountPrice + remaining * product.price;
    }

    total += itemTotal;

    return {
      id: item.id,
      productId: item.productId,
      quantity: item.quantity,
      product,
      itemTotal,
    };
  }) ?? [];

  const thresholdPromo = promotions.find((p) => p.type === 'threshold');

  if (thresholdPromo && total > (thresholdPromo.thresholdAmount ?? 0)) {
    totalDiscount += thresholdPromo.thresholdDiscount ?? 0;
    total -= thresholdPromo.thresholdDiscount ?? 0;
  }

  return res.json({ items, total, totalDiscount });
};
