
import Book from '../Book/book.model';
import Order from './order.model';
import { IOrder } from './order.interface';

const AddOrderIntoDB = async (orderData: IOrder) => {
 
  const orderBook = await Book.findById(orderData.product);

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
      totalRevenue: { $sum: '$totalPrice' },
    },
  },
]);


  return result.length > 0 ? result[0].totalRevenue : 0;
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
