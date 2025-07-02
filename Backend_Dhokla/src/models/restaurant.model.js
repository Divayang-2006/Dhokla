// models/Restaurant.js
import mongoose from "mongoose";

const restaurantSchema = new mongoose.Schema({
   owner: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'User', required: true 
   },
   address: { 
      type: String, 
      required: true 
   },
   title: { 
      type: String, 
      required: true 
   },
   description: {
      type: String,
   },
   rating: {
      ratingValue: {
         type: Number, 
         default: 0
      },
      ratingCount: {
         type: Number,
         default: 0
      }
   },
   foodItems: [{
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'FoodItem' 
   }],
}, { timestamps: true });

const Restaurant = mongoose.model('Restaurant', restaurantSchema);
export default Restaurant;
