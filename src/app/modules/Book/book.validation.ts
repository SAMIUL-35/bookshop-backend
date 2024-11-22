import { z } from "zod";

// Zod validation schema
export const BookValidationSchema = z.object({
  title: z.string().nonempty("Title is required").trim(),
  author: z.string().nonempty("Author is required").trim(),
  price: z.number().min(0, "Price must be a positive number"),
  category: z.enum([
    "Fiction",
    "Science",
    "SelfDevelopment",
    "Poetry",
    "Religious",
  ]),
  description: z.string().nonempty("Description is required").trim(),
  quantity: z.number().min(0, "Quantity must be a positive number"),
  inStock: z.boolean().default(true),
});

export default BookValidationSchema;
