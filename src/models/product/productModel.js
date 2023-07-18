import { Schema, mongoose } from 'mongoose';

const productSchema = new Schema({
  name: {
    type: String,
    required: [true],
  },
  description: {
    type: String,
    required: [true],
  },

  price: {
    type: mongoose.Types.Decimal128,
    required: [true],
  },

  quantity: {
    type: Number,
    required: [true],
  },

  arrivedAt: {
    type: Date,
    default: Date.now(),
  },
});

const Product = mongoose.model('Product', productSchema);
export default Product;
