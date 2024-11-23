import mongoose, {  Schema } from 'mongoose';
import { IOrder } from './order.interface';

const orderSchema: Schema = new Schema<IOrder>(
  {
    email: { type: String, required: true },
    product: { type:String, ref: 'Book', required: true }, 
    quantity: { type: Number, required: true, min: 1 },
    totalPrice: { type: Number, required: true, min: 0 },
  },
  {
    timestamps: true,
  }
);



orderSchema.set('toJSON', {
  transform: (doc, ret) => {
    delete ret.__v;
    return ret;
  },
});
const Order = mongoose.model<IOrder >('Order', orderSchema);

export default Order;
