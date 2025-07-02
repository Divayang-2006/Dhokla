// models/Cart.js
import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
   owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
   foodItems: [
      {
         foodItem: { type: mongoose.Schema.Types.ObjectId, ref: 'FoodItem' },
         quantity: { type: Number, default: 1 }
      }
   ],
   amount: { type: Number, required: true },
}, { timestamps: true });

const Cart = mongoose.model('Cart', cartSchema);
export default Cart
