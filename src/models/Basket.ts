import {
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  HasManyGetAssociationsMixin,
} from 'sequelize';
import sequelize from '../database/sequelize';
import BasketItem from './BasketItem';

class Basket extends Model<
  InferAttributes<Basket, { omit: 'basketItems' }>,
  InferCreationAttributes<Basket, { omit: 'basketItems' }>
> {
  declare id: CreationOptional<number>;
  declare basketItems?: BasketItem[];

  declare getBasketItems: HasManyGetAssociationsMixin<BasketItem>;
}

Basket.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
  },
  {
    sequelize,
    modelName: 'basket',
  }
);

export default Basket;
