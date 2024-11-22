import express from 'express';
import { BookControllers } from './book.controler';


const router = express.Router();


router.post('/add-book', BookControllers.AddBook);

export const BookRoutes = router;
