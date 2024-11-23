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
exports.BookServices = void 0;
const book_model_1 = __importDefault(require("./book.model"));
const AddBookIntoDB = (bookData) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield book_model_1.default.create(bookData);
    return result;
});
const getAllBooksFromDB = (filter) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield book_model_1.default.find(filter);
    return result;
});
const getSingleBookFromDB = (bookId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield book_model_1.default.findById(bookId);
    if (!result)
        throw new Error('Book not found');
    return result;
});
const updateBookInDB = (bookId, updates) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield book_model_1.default.findByIdAndUpdate(bookId, updates, {
        new: true,
    });
    if (!result)
        throw new Error('Book not found');
    return result;
});
const deleteBookFromDB = (bookId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield book_model_1.default.findByIdAndDelete(bookId);
    if (!result)
        throw new Error('Book not found');
    return result;
});
exports.BookServices = {
    AddBookIntoDB,
    getAllBooksFromDB,
    getSingleBookFromDB,
    updateBookInDB,
    deleteBookFromDB,
};
