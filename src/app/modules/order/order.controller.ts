import { Request, Response } from 'express';
import { ZodError, ZodIssue } from 'zod';
import { orderValidationSchema } from './order.validation';
import { OrderServices } from './order.service';

const createOrder = async (req: Request, res: Response): Promise<void> => {
  try {
    const validatedData = orderValidationSchema.parse(req.body);
    const result = await OrderServices.AddOrderIntoDB(validatedData);

    res.status(200).json({
      message: 'Order created successfully',
      success: true,
      data: result,
    });
  } catch (err: unknown) {
    if (err instanceof ZodError) {
      const transformedErrors: Record<string, unknown> = {};
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
    } else if (err instanceof Error) {
      if (err.message === 'Book not found') {
        res.status(404).json({
          message: 'Book not found',
          success: false,
          error: err.message,
        });
      } else if (err.message === 'Insufficient stock available') {
        res.status(400).json({
          message: 'Insufficient stock',
          success: false,
          error: err.message,
        });
      } else {
        res.status(500).json({
          message: 'An unexpected error occurred',
          success: false,
          error: err.message || 'Internal server error',
        });
      }
    } else {
      res.status(500).json({
        message: 'An unexpected error occurred',
        success: false,
        error: 'Unknown error',
      });
    }
  }
};

const calculateRevenue = async (req: Request, res: Response): Promise<void> => {
  try {
    const totalRevenue = await OrderServices.calculateTotalRevenue();

    res.status(200).json({
      message: 'Revenue calculated successfully',
      status: true,
      data: {
        totalRevenue,
      },
    });
  } catch (err: unknown) {
    if (err instanceof Error) {
      res.status(500).json({
        message: 'An error occurred while calculating the revenue',
        status: false,
        error: err.message || 'Internal server error',
      });
    } else {
      res.status(500).json({
        message: 'An unexpected error occurred',
        status: false,
        error: 'Unknown error',
      });
    }
  }
};

const GetAllOrders = async (req: Request, res: Response): Promise<void> => {
  try {
    const result = await OrderServices.getAllOrders();

    res.status(200).json({
      message: 'Orders retrieved successfully',
      success: true,
      data: result,
    });
  } catch (err: unknown) {
    if (err instanceof Error) {
      res.status(500).json({
        message: err.message || 'Something went wrong',
        success: false,
        error: err.message,
      });
    } else {
      res.status(500).json({
        message: 'An unexpected error occurred',
        success: false,
        error: 'Unknown error',
      });
    }
  }
};

export const OrderControllers = {
  createOrder,
  calculateRevenue,
  GetAllOrders,
};
