import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
   order_user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
   status: {
      type: String,
      enum: ['pending', 'confirmed', 'preparing', 'out_for_delivery', 'delivered'],
      default: 'pending'
   },
   restaurant_Id: { type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant', required: true },
   bill: { type: mongoose.Schema.Types.ObjectId, ref: 'Bill', required: true }
}, { timestamps: true });

const Order = mongoose.model('Order', orderSchema);
export default Order;
