"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookValidationSchema = void 0;
const zod_1 = require("zod");
exports.BookValidationSchema = zod_1.z.object({
    title: zod_1.z.string().nonempty('Title is required').trim(),
    author: zod_1.z.string().nonempty('Author is required').trim(),
    price: zod_1.z.number().min(0, 'Price must be a positive number'),
    category: zod_1.z.enum([
        'Fiction',
        'Science',
        'SelfDevelopment',
        'Poetry',
        'Religious',
    ]),
    description: zod_1.z.string().nonempty('Description is required').trim(),
    quantity: zod_1.z.number().min(0, 'Quantity must be a positive number'),
    inStock: zod_1.z.boolean().default(true),
});
exports.default = exports.BookValidationSchema;
