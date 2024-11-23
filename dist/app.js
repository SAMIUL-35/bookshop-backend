"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const order_route_1 = require("./app/modules/order/order.route");
const book_route_1 = require("./app/modules/Book/book.route");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use('/api/products', book_route_1.BookRoutes);
app.use('/api', order_route_1.OrderRoutes);
app.get('/', (req, res) => {
    res.send('Hello, world!');
});
exports.default = app;
