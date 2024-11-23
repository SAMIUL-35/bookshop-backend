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
exports.OrderServices = void 0;
const book_model_1 = __importDefault(require("../Book/book.model"));
const order_model_1 = __importDefault(require("./order.model"));
const AddOrderIntoDB = (orderData) => __awaiter(void 0, void 0, void 0, function* () {
    const orderBook = yield book_model_1.default.findById(orderData.product);
    if (!orderBook) {
        throw new Error('Book not found');
    }
    if (orderBook.quantity < orderData.quantity) {
        throw new Error('Insufficient stock available');
    }
    orderData.totalPrice = orderData.quantity * orderBook.price;
    orderBook.quantity -= orderData.quantity;
    if (orderBook.quantity === 0) {
        orderBook.inStock = false;
    }
    yield orderBook.save();
    const result = yield order_model_1.default.create(orderData);
    return result;
});
const calculateTotalRevenue = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield order_model_1.default.aggregate([
        {
            $group: {
                _id: null,
                totalRevenue: { $sum: '$totalPrice' },
            },
        },
    ]);
    return result.length > 0 ? result[0].totalRevenue : 0;
});
const getAllOrders = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield order_model_1.default.find();
    return result;
});
exports.OrderServices = {
    AddOrderIntoDB,
    calculateTotalRevenue,
    getAllOrders,
};
