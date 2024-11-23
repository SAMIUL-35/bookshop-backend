import cors from 'cors';
import express, { Application } from 'express';

import { OrderRoutes } from './app/modules/order/order.route';
import { BookRoutes } from './app/modules/Book/book.route';

const app: Application = express();

app.use(express.json());
app.use(cors());

app.use('/api/products', BookRoutes);

app.use('/api', OrderRoutes);
app.get('/', (req, res) => {
  res.send('Hello, world!');
});

export default app;
