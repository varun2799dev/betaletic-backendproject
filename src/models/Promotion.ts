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

class Promotion extends Model<
  InferAttributes<Promotion>,
  InferCreationAttributes<Promotion>
> {
  declare id: CreationOptional<number>;
  declare type: string;

  declare productId: ForeignKey<number> | null;
  declare minQuantity: number | null;
  declare discountPrice: number | null;

  declare thresholdAmount: number | null;
  declare thresholdDiscount: number | null;

  // Optional association
  declare product?: Product;
}

Promotion.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    productId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    minQuantity: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    discountPrice: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    thresholdAmount: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    thresholdDiscount: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'promotion',
  }
);

// Optional: Setup association if you're querying with `include: [Product]`
Promotion.belongsTo(Product, { foreignKey: 'productId' });

export default Promotion;
