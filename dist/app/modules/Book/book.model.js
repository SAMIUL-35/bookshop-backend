"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
// Define the schema
const BookSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: [true, 'Title is required'],
        trim: true,
    },
    author: {
        type: String,
        required: [true, 'Author is required'],
        trim: true,
    },
    price: {
        type: Number,
        required: [true, 'Price is required'],
        min: [0, 'Price must be a positive number'],
    },
    category: {
        type: String,
        required: [true, 'Category is required'],
        enum: ['Fiction', 'Science', 'SelfDevelopment', 'Poetry', 'Religious'],
    },
    description: {
        type: String,
        required: [true, 'Description is required'],
        trim: true,
    },
    quantity: {
        type: Number,
        required: [true, 'Quantity is required'],
        min: [0, 'Quantity must be a positive number'],
    },
    inStock: {
        type: Boolean,
        required: true,
        default: function () {
            return this.quantity > 0;
        },
    },
}, {
    timestamps: true,
});
BookSchema.set('toJSON', {
    transform: (doc, ret) => {
        delete ret.__v;
        return ret;
    },
});
const Book = (0, mongoose_1.model)('Book', BookSchema);
exports.default = Book;
