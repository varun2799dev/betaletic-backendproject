import {
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  ForeignKey,
} from 'sequelize';
import sequelize from '../database/sequelize';
import Product from './Product';
import Basket from './Basket';

class BasketItem extends Model<
  InferAttributes<BasketItem>,
  InferCreationAttributes<BasketItem>
> {
  declare id: CreationOptional<number>;
  declare quantity: number;

  declare productId: ForeignKey<number>;
  declare basketId: ForeignKey<number>;

  // Optional eager-loaded associations
  declare product?: Product;
  declare basket?: Basket;
}

BasketItem.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    basketId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'basketItem',
  }
);

// Associations
Basket.hasMany(BasketItem, { foreignKey: 'basketId', as: 'basketItems' });
BasketItem.belongsTo(Basket, { foreignKey: 'basketId' });

Product.hasMany(BasketItem, { foreignKey: 'productId' });
BasketItem.belongsTo(Product, { foreignKey: 'productId' });

export default BasketItem;
