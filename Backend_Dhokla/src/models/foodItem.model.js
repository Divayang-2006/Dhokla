// models/FoodItem.js
import mongoose from "mongoose";

const foodItemSchema = new mongoose.Schema({
   restaurantId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Restaurant',
      required: [true, 'Restaurant ID is required']
   },
   title: {
      type: String,
      required: [true, 'Food item title is required'],
      trim: true,
      minlength: [2, 'Title should be at least 2 characters long']
   },
   description: {
      type: String,
      trim: true,
      maxlength: [500, 'Description can be up to 500 characters']
   },
   ingredients: [{
      type: String,
      trim: true
   }],
   price: {
      type: Number,
      required: [true, 'Price is required'],
      min: [0, 'Price must be a positive number']
   },
   photos: [{
      type: String,
      validate: {
         validator: (url) => /^https?:\/\/.+/.test(url),
         message: 'Invalid image URL'
      }
   }],
   isAvailable: {
      type: Boolean,
      default: true
   },
   category: {
      type: String,
      trim: true,
      enum: ['starter', 'main course', 'dessert', 'beverage', 'other'],
      default: 'other'
   },
   authenticity: {
      type: String,
      enum: ['Gujarati', 'Chinese', 'South Indian', 'Punjabi', 'Italian', 'Mexican', 'Continental', 'Other'],
      default: 'Other'
   },

   spicyLevel: {
      type: String,
      enum: ['Mild', 'Medium', 'Spicy', 'Extra Spicy'],
      default: 'Medium'
   },

   isVegetarian: {
      type: Boolean,
      required: true,
      default: true
   },

   sizes: [{
      size: { type: String, enum: ['Small', 'Medium', 'Large'], default: 'Medium' },
      price: { type: Number, min: 0},
      calories: { type: Number, min: 0}
   }],

   variants: [{
      name: { type: String },          // e.g., "Extra Cheese"
      additionalPrice: { type: Number, min: 0 }
   }]
}, {
   timestamps: true,
   toJSON: { virtuals: true },
   toObject: { virtuals: true }
});

const FoodItem = mongoose.model('FoodItem', foodItemSchema);
export default FoodItem
