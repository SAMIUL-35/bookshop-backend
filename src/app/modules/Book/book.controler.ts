import { Request, Response } from 'express';
import BookValidationSchema from './book.validation';
import { ZodError, ZodIssue } from 'zod';
import { BookServices } from './book.service';

const AddBook = async (req: Request, res: Response): Promise<void> => {
  try {
    const validatedData = BookValidationSchema.parse(req.body);
    const result = await BookServices.AddBookIntoDB(validatedData);

    res.status(200).json({
      message: 'Book created successfully',
      success: true,
      data: result,
    });
  } catch (err: any) {
    if (err instanceof ZodError) {
      const transformedErrors: Record<string, any> = {};
      err.errors.forEach((error: ZodIssue) => {
        const field = error.path.join('.') || 'unknown';
        transformedErrors[field] = {
          message: error.message,
          name: 'ValidatorError',
          path: field,
          value: req.body[field] || null,
        };
      });

      res.status(400).json({
        message: 'Validation failed',
        success: false,
        errors: transformedErrors,
      });
    } else {
      res.status(500).json({
        message: 'An unexpected error occurred',
        success: false,
        error: err.message || 'Internal server error',
      });
    }
  }
};

const GetAllOrCategoryBooks = async (req: Request, res: Response): Promise<void> => {
  try {
    const { searchTerm } = req.query;
    const filter: Record<string, any> = {};

    if (searchTerm) {
      const regex = new RegExp(searchTerm as string, 'i');
      filter.$or = [{ title: regex }, { author: regex }, { category: regex }];
    }

    const result = await BookServices.getAllBooksFromDB(filter);

    res.status(200).json({
      message: 'Books retrieved successfully',
      success: true,
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      message: err.message || 'Something went wrong',
      success: false,
      error: err,
    });
  }
};

const GetSingleBook = async (req: Request, res: Response): Promise<void> => {
  try {
    const { productId } = req.params;
    

    const result = await BookServices.getSingleBookFromDB(productId);

    res.status(200).json({
      message: 'Book retrieved successfully',
      success: true,
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      message: err.message || 'Something went wrong',
      success: false,
      error: err,
    });
  }
};
const UpdateBook = async (req: Request, res: Response): Promise<void> => {
  try {
    const { productId } = req.params;
    const updates = req.body;

    const result = await BookServices.updateBookInDB(productId, updates);

    res.status(200).json({
      message: 'Book updated successfully',
      success: true,
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      message: 'Something went wrong',
      success: false,
      error: err.message,
    });
  }
};
const DeleteBook = async (req: Request, res: Response): Promise<void> => {
  try {
    const { productId } = req.params;

    const result = await BookServices.deleteBookFromDB(productId);

    res.status(200).json({
      message: 'Book deleted successfully',
      success: true,
      data: {},
    });
  } catch (err: any) {
    res.status(500).json({
      message: err.message || 'Something went wrong',
      success: false,
      error: err,
    });
  }
};

export const BookControllers = {
  AddBook,
  GetAllOrCategoryBooks,
  GetSingleBook,
  DeleteBook,
  UpdateBook,
};
