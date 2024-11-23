"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookControllers = void 0;
const book_validation_1 = __importDefault(require("./book.validation"));
const zod_1 = require("zod");
const book_service_1 = require("./book.service");
const AddBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const validatedData = book_validation_1.default.parse(req.body);
        const savedBook = yield book_service_1.BookServices.AddBookIntoDB(validatedData);
        res.status(201).json({
            message: 'Book created successfully',
            success: true,
            data: savedBook,
        });
    }
    catch (err) {
        if (err instanceof zod_1.ZodError) {
            const transformedErrors = {};
            err.errors.forEach((error) => {
                const field = error.path.join('.') || 'unknown';
                const type = error.code === 'too_small' ? 'min' : error.code;
                const kind = error.code === 'too_small' ? 'min' : error.code;
                transformedErrors[field] = {
                    message: error.message,
                    name: 'ValidatorError',
                    properties: Object.assign(Object.assign({ message: error.message, type: type }, (error.code === 'too_small' && { min: error.minimum })), (error.code === 'invalid_type' && {
                        expectedType: error.expected,
                    })),
                    kind: kind,
                    path: field,
                    value: req.body[field] || null,
                };
            });
            const stack = 'Something went wrong\n' +
                ((_a = new Error().stack) === null || _a === void 0 ? void 0 : _a.split('\n').slice(1).join('\n'));
            res.status(400).json({
                message: 'Validation failed',
                success: false,
                error: {
                    name: 'ValidationError',
                    errors: transformedErrors,
                },
                stack: stack,
            });
        }
        else {
            const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred';
            const stack = new Error().stack;
            res.status(500).json({
                message: errorMessage,
                success: false,
                stack: stack,
            });
        }
    }
});
const GetAllOrCategoryBooks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { searchTerm } = req.query;
        const filter = {};
        if (searchTerm) {
            const regex = new RegExp(searchTerm, 'i');
            filter.$or = [{ title: regex }, { author: regex }, { category: regex }];
        }
        const result = yield book_service_1.BookServices.getAllBooksFromDB(filter);
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
    }
    catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Something went wrong';
        res.status(500).json({
            message: errorMessage,
            success: false,
            error: err,
        });
    }
});
const GetSingleBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productId } = req.params;
        const result = yield book_service_1.BookServices.getSingleBookFromDB(productId);
        res.status(200).json({
            message: 'Book retrieved successfully',
            success: true,
            data: result,
        });
    }
    catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Something went wrong';
        res.status(500).json({
            message: errorMessage,
            success: false,
            error: err,
        });
    }
});
const UpdateBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productId } = req.params;
        const updates = req.body;
        const result = yield book_service_1.BookServices.updateBookInDB(productId, updates);
        res.status(200).json({
            message: 'Book updated successfully',
            success: true,
            data: result,
        });
    }
    catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Something went wrong';
        res.status(500).json({
            message: errorMessage,
            success: false,
            error: err,
        });
    }
});
const DeleteBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productId } = req.params;
        yield book_service_1.BookServices.deleteBookFromDB(productId);
        res.status(200).json({
            message: 'Book deleted successfully',
            success: true,
            data: {},
        });
    }
    catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Something went wrong';
        res.status(500).json({
            message: errorMessage,
            success: false,
            error: err,
        });
    }
});
exports.BookControllers = {
    AddBook,
    GetAllOrCategoryBooks,
    GetSingleBook,
    DeleteBook,
    UpdateBook,
};
