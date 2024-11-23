import mongoose, { Document, Schema } from 'mongoose';

const orderSchema: Schema = new Schema(
  {
    email: { type: String, required: true, match: /.+\@.+\..+/ }, 
    product: { type: String, ref: 'Book', required: true }, 
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
const Order = mongoose.model<IOrder & Document>('Order', orderSchema);

export default Order;
