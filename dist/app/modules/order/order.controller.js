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
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderControllers = void 0;
const zod_1 = require("zod");
const order_validation_1 = require("./order.validation");
const order_service_1 = require("./order.service");
const createOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const validatedData = order_validation_1.orderValidationSchema.parse(req.body);
        const result = yield order_service_1.OrderServices.AddOrderIntoDB(validatedData);
        res.status(200).json({
            message: 'Order created successfully',
            success: true,
            data: result,
        });
    }
    catch (err) {
        if (err instanceof zod_1.ZodError) {
            const transformedErrors = {};
            err.errors.forEach((error) => {
                const field = error.path.join('.') || 'unknown';
                transformedErrors[field] = {
                    message: error.message,
                    name: 'ValidatorError',
                    path: field,
                    value: req.body[field] || null,
                };
            });
            res.status(400).json({
                message: 'Validation failed',
                success: false,
                errors: transformedErrors,
            });
        }
        else if (err instanceof Error) {
            if (err.message === 'Book not found') {
                res.status(404).json({
                    message: 'Book not found',
                    success: false,
                    error: err.message,
                });
            }
            else if (err.message === 'Insufficient stock available') {
                res.status(400).json({
                    message: 'Insufficient stock',
                    success: false,
                    error: err.message,
                });
            }
            else {
                res.status(500).json({
                    message: 'An unexpected error occurred',
                    success: false,
                    error: err.message || 'Internal server error',
                });
            }
        }
        else {
            res.status(500).json({
                message: 'An unexpected error occurred',
                success: false,
                error: 'Unknown error',
            });
        }
    }
});
const calculateRevenue = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const totalRevenue = yield order_service_1.OrderServices.calculateTotalRevenue();
        res.status(200).json({
            message: 'Revenue calculated successfully',
            status: true,
            data: {
                totalRevenue,
            },
        });
    }
    catch (err) {
        if (err instanceof Error) {
            res.status(500).json({
                message: 'An error occurred while calculating the revenue',
                status: false,
                error: err.message || 'Internal server error',
            });
        }
        else {
            res.status(500).json({
                message: 'An unexpected error occurred',
                status: false,
                error: 'Unknown error',
            });
        }
    }
});
const GetAllOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield order_service_1.OrderServices.getAllOrders();
        res.status(200).json({
            message: 'Orders retrieved successfully',
            success: true,
            data: result,
        });
    }
    catch (err) {
        if (err instanceof Error) {
            res.status(500).json({
                message: err.message || 'Something went wrong',
                success: false,
                error: err.message,
            });
        }
        else {
            res.status(500).json({
                message: 'An unexpected error occurred',
                success: false,
                error: 'Unknown error',
            });
        }
    }
});
exports.OrderControllers = {
    createOrder,
    calculateRevenue,
    GetAllOrders,
};
