import { iBook } from './book.inertface';
import Book from './book.model';

const AddBookIntoDB = async (bookData: iBook) => {
  const result = await Book.create(bookData);
  return result;
};

const getAllBooksFromDB = async (filter: Record<string, unknown>) => {
  const result = await Book.find(filter);
  return result;
};

const getSingleBookFromDB = async (bookId: string) => {
  const result = await Book.findById(bookId);
  if (!result) throw new Error('Book not found');
  return result;
};

const updateBookInDB = async (bookId: string, updates: Partial<iBook>) => {
  const result = await Book.findByIdAndUpdate(bookId, updates, {
    new: true,
  });
  if (!result) throw new Error('Book not found');
  return result;
};

const deleteBookFromDB = async (bookId: string) => {
  const result = await Book.findByIdAndDelete(bookId);
  if (!result) throw new Error('Book not found');
  return result;
};

export const BookServices = {
  AddBookIntoDB,
  getAllBooksFromDB,
  getSingleBookFromDB,
  updateBookInDB,
  deleteBookFromDB,
};
