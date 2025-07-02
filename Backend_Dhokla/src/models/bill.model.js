// models/Bill.js
import mongoose from "mongoose";

const billSchema = new mongoose.Schema({
   order_user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
   status: { type: Boolean, default: false }, // Paid or not
   foodItems: [
      {
         foodItem: { type: mongoose.Schema.Types.ObjectId, ref: 'FoodItem' },
         quantity: { type: Number, default: 1 }
      }
   ],
   amount: { type: Number, required: true }
}, { timestamps: true });


const Bill = mongoose.model('Bill', billSchema);
export default Bill
