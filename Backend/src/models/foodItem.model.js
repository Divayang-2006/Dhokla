// models/FoodItem.js
import mongoose from "mongoose";

const foodItemSchema = new mongoose.Schema({
   restaurantId: { type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant', required: true },
   price: { type: Number, required: true },
   photos: [{ type: String }],
   title: { type: String, required: true },
   description: String,
   ingredients: String
}, { timestamps: true });

const FoodItem = mongoose.model('FoodItem', foodItemSchema);
export default FoodItem
