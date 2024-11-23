import { z } from 'zod';

const orderValidationSchema = z.object({
  email: z.string().email(),
  product: z.string().min(24, 'Product ID must be a valid ObjectId'),
  quantity: z.number().min(1, 'Quantity must be at least 1'),
  totalPrice: z.number().min(0, 'Total price cannot be negative'),
});

export { orderValidationSchema };
