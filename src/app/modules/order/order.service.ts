import mongoose from 'mongoose';
import Book from '../Book/book.model';
import Order from './order.model';

const AddOrderIntoDB = async (orderData: IOrder) => {
  const productId = new mongoose.Types.ObjectId(orderData.product);  
  const orderBook = await Book.findById(productId);

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

  await orderBook.save();

  const result = await Order.create(orderData);

  return result;
};

const calculateTotalRevenue = async () => {
  const result = await Order.aggregate([
    {
      $group: {
        _id: null, 
        totalRevenue: {
          $sum: { $multiply: ['$totalPrice', '$quantity'] },
        },
      },
    },
  ]);

  return result.length === 0 ? 0 : result[0].totalRevenue;
};

const getAllOrders = async () => {
  const result = await Order.find();
  return result;
};

export const OrderServices = {
  AddOrderIntoDB,
  calculateTotalRevenue,
  getAllOrders,
};
