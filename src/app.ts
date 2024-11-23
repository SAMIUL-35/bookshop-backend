import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import { BookRoutes } from './app/modules/Book/book.route';

const app: Application = express();

//parsers
app.use(express.json());
app.use(cors());


// application routes
app.use('/api/products', BookRoutes);




export default app;
