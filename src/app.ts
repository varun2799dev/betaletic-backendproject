import express from 'express';
import productRoutes from './routes/productRoutes';
import cartRoutes from './routes/cartRoutes';

import sequelize from './database/sequelize';
import './models/Product';
import './models/Basket';
import './models/BasketItem';
import './models/Promotion';

const app = express();
app.use(express.json());

app.use('/products', productRoutes);
app.use('/cart', cartRoutes);

sequelize.sync({ alter: true })
  .then(() => {
    console.log('✅ Database synced');
  })
  .catch((err) => {
    console.error('❌ Failed to sync database:', err);
  });

export default app;
