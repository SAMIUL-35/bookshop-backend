import { Request, Response } from 'express';
import BookValidationSchema from './book.validation';
import { ZodError, ZodIssue } from 'zod';
import Book from './book.model';  // Assuming you have a Book model

const AddBook = async (req: Request, res: Response): Promise<void> => {
  try {
    // Validate the input using Zod schema
    const validatedData = BookValidationSchema.parse(req.body); // This is the validated data

    // Create a new Book instance
    const bookData = new Book(validatedData); // Use validated data to create the book instance

    // Save the book to the database
    const savedBook = await bookData.save(); // Save the book and get the saved document

    // Return the saved book data
    res.status(201).json({
      message: 'Book created successfully',
      success: true,
      data: savedBook,  // Return the saved book document, which includes createdAt and updatedAt
    });
  } catch (err: any) {
    if (err instanceof ZodError) {
      // Map ZodError to the desired structure
      const transformedErrors: Record<string, any> = {};
      console.log('Validation Error Occurred');

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
            ...(error.code === 'too_small' && { min: error.minimum }), // Add min for "too_small"
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
      const stack = new Error().stack;

      res.status(500).json({
        message: 'An unexpected error occurred',
        success: false,
        stack: stack,
      });
    }
  }
};

export const BookControllers = { AddBook };
