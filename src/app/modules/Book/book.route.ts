import express from 'express';
import { BookControllers } from './book.controler';

const router = express.Router();

router.post('/', BookControllers.AddBook);
router.get('/', BookControllers.GetAllOrCategoryBooks);
router.get('/:productId', BookControllers.GetSingleBook);
router.put('/:productId', BookControllers.UpdateBook);
router.delete('/:productId', BookControllers.DeleteBook);

export const BookRoutes = router;
