
import { TBook } from './book.inertface';
import Book from './book.model';


const AddBookIntoDB = async (bookData: TBook) => {
  
  const result = await Book.create(bookData);
  return result;
};


export const BookServices = {
  AddBookIntoDB,
  
};