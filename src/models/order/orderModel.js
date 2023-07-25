import { Schema, mongoose } from 'mongoose';

const orderSchema = new Schema({
  products: [
    {
      productId: { type: Schema.Types.ObjectId, ref: 'Product' },
      quantity: Number,
    },
  ],
});

const Order = mongoose.model('Order', orderSchema);
export default Order;
