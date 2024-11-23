"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookRoutes = void 0;
const express_1 = __importDefault(require("express"));
const book_controler_1 = require("./book.controler");
const router = express_1.default.Router();
router.post('/', book_controler_1.BookControllers.AddBook);
router.get('/', book_controler_1.BookControllers.GetAllOrCategoryBooks);
router.get('/:productId', book_controler_1.BookControllers.GetSingleBook);
router.put('/:productId', book_controler_1.BookControllers.UpdateBook);
router.delete('/:productId', book_controler_1.BookControllers.DeleteBook);
exports.BookRoutes = router;
