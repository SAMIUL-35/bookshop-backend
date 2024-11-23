"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderValidationSchema = void 0;
const zod_1 = require("zod");
const orderValidationSchema = zod_1.z.object({
    email: zod_1.z.string().email(),
    product: zod_1.z.string().min(24, 'Product ID must be a valid ObjectId'),
    quantity: zod_1.z.number().min(1, 'Quantity must be at least 1'),
    totalPrice: zod_1.z.number().min(0, 'Total price cannot be negative'),
});
exports.orderValidationSchema = orderValidationSchema;
