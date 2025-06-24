// models/Restaurant.js
import mongoose from "mongoose";

const restaurantSchema = new mongoose.Schema({
   owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
   address: { type: String, required: true },
   title: { type: String, required: true },
   description: String,
   rating: { type: Number, default: 0 },
   menu: [{ type: mongoose.Schema.Types.ObjectId, ref: 'FoodItem' }],
}, { timestamps: true });

const Restaurant = mongoose.model('Restaurant', restaurantSchema);
export default Restaurant;
