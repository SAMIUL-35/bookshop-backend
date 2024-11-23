import { Request, Response } from 'express';
import BookValidationSchema from './book.validation';
import { ZodError, ZodIssue } from 'zod';
import { BookServices } from './book.service';

const AddBook = async (req: Request, res: Response): Promise<void> => {
  try {
    const validatedData = BookValidationSchema.parse(req.body);
    const savedBook = await BookServices.AddBookIntoDB(validatedData);

    res.status(201).json({
      message: 'Book created successfully',
      success: true,
      data: savedBook,
    });
  } catch (err: unknown) {
    if (err instanceof ZodError) {
      const transformedErrors: Record<string, unknown> = {};

      err.errors.forEach((error: ZodIssue) => {
        const field = error.path.join('.') || 'unknown';
        const type = error.code === 'too_small' ? 'min' : error.code;
        const kind = error.code === 'too_small' ? 'min' : error.code;
        transformedErrors[field] = {
          message: error.message,
          name: 'ValidatorError',
          properties: {
            message: error.message,
            type: type,
            ...(error.code === 'too_small' && { min: error.minimum }),
            ...(error.code === 'invalid_type' && {
              expectedType: error.expected,
            }),
          },
          kind: kind,
          path: field,
          value: req.body[field] || null,
        };
      });

      const stack =
        'Something went wrong\n' +
        new Error().stack?.split('\n').slice(1).join('\n');
      res.status(400).json({
        message: 'Validation failed',
        success: false,
        error: {
          name: 'ValidationError',
          errors: transformedErrors,
        },
        stack: stack,
      });
    } else {
      const errorMessage =
        err instanceof Error ? err.message : 'An unexpected error occurred';
      const stack = new Error().stack;
      res.status(500).json({
        message: errorMessage,
        success: false,
        stack: stack,
      });
    }
  }
};

const GetAllOrCategoryBooks = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { searchTerm } = req.query;
    const filter: Record<string, unknown> = {};
    if (searchTerm) {
      const regex = new RegExp(searchTerm as string, 'i');
      filter.$or = [{ title: regex }, { author: regex }, { category: regex }];
    }
    const result = await BookServices.getAllBooksFromDB(filter);

    // Check if `result` is empty
    if (!result || (Array.isArray(result) && result.length === 0)) {
      res.status(404).json({
        message: 'No books found',
        success: false,
        data: result,
      });
      return;
    }

    res.status(200).json({
      message: 'Books retrieved successfully',
      success: true,
      data: result,
    });
  } catch (err: unknown) {
    const errorMessage =
      err instanceof Error ? err.message : 'Something went wrong';
    res.status(500).json({
      message: errorMessage,
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
  } catch (err: unknown) {
    const errorMessage =
      err instanceof Error ? err.message : 'Something went wrong';
    res.status(500).json({
      message: errorMessage,
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
  } catch (err: unknown) {
    const errorMessage =
      err instanceof Error ? err.message : 'Something went wrong';
    res.status(500).json({
      message: errorMessage,
      success: false,
      error: err,
    });
  }
};

const DeleteBook = async (req: Request, res: Response): Promise<void> => {
  try {
    const { productId } = req.params;
    await BookServices.deleteBookFromDB(productId);
    res.status(200).json({
      message: 'Book deleted successfully',
      success: true,
      data: {},
    });
  } catch (err: unknown) {
    const errorMessage =
      err instanceof Error ? err.message : 'Something went wrong';
    res.status(500).json({
      message: errorMessage,
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
