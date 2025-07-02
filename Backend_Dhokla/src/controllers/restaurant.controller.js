import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js"
import Restaurant from "../models/restaurant.model.js";
import { uploadOnCloudinary } from '../utils/cloudinary.js';
import FoodItem from "../models/foodItem.model.js";
import User from "../models/user.model.js";

// Required Contollers
// -> adding a restaurant
// -> adding a food item
// -> updating restaurant details
// -> updating a food item
// -> deleting a food item
// -> deleting restaurant 
// -> get all restaurants
// -> get all food items
// -> updating food item Photos

const addRestaurant = asyncHandler(async (req, res) => {
   const { title, address, description  } = req.body
   const user = req.user

   if(!title){
      throw new ApiError(400, "Name is required")
   }if (!address){
      throw new ApiError(400, "Address is required")
   }

   const restaurant = await Restaurant.create({
      title: title,
      address: address,
      owner : user._id,
      description: description
   })

   await User.findByIdAndUpdate(
      user._id,
      { $push: { ownedRestaurants: restaurant._id } },
      { new: true }
   );

   if(!restaurant) throw new ApiError(404, "Failed to create restaurant")

   return res
   .status(200)
   .json(new ApiResponse(200, restaurant, "restaurant created successfully"))
})

const addFoodItem = asyncHandler(async (req, res) => { // use multer upload function in routes3

   // collecting data from req.body
   // validation and see if food item alresdy exist of same name
   // importing url of photos form localStorage and upload it to cloudinary
   // making foodItem object and saving it to database
   // returning response to user

   const { restaurantId } = req.params;
   const {
      title,
      description,
      ingredients,
      price,
      category,
      authenticity,
      spicyLevel,
      isVegetarian,
      sizes,
      variants
   } = req.body;

   if(!Restaurant.findById(restaurantId)){
      return new ApiError('valid restaurant not found');
   }

   if(title || price || category)
      return new ApiError('title, price and category are required')

   if (!req.files || req.files.length === 0) {
      throw new ApiError(400, "At least one food photo is required");
   }

   const photos = [];
   // Upload each file to Cloudinary and collect URLs
   for (const file of req.files) {
      const result = await uploadOnCloudinary(file.path);
      cloudPhotos.push(result.url);
   }

   const foodItem = await FoodItem.create({
      restaurantId: restaurantId,
      title: title,
      description: description,
      ingredients: ingredients,
      price: price,
      photos: photos,
      category: category,
      authenticity: authenticity,
      spicyLevel: spicyLevel,
      isVegetarian: isVegetarian,
      sizes: sizes,
      variants: variants
   })

   if(!foodItem){
      return new ApiError('Failed to create food item')
   }

   await Restaurant.findByIdAndUpdate(
      restaurantId,
      { $push: { foodItems: foodItem._id } },
      { new: true }
   );

   return res
   .status('200')
   .json(ApiResponse(200, foodItem, 'Food item created successfully !!!'))
})

const updateRestaurant = asyncHandler(async (req, res) => {
   const restaurantId = req.params.restaurantId;
   const { title, address, description, rating } = req.body;
   
   if (!restaurantId) {
      throw new ApiError(400, "Invalid Restaurant ID");
   }

   // Check if restaurant exists
   const restaurant = await Restaurant.findById(restaurantId);
   if (!restaurant) {
      throw new ApiError(404, "Restaurant not found");
   }

   // Update fields only if provided
   if (title) restaurant.title = title;
   if (address) restaurant.address = address;
   if (description) restaurant.description = description;
   if (rating !== undefined) restaurant.rating = rating;

   const updatedRestaurant = await restaurant.save();

   return res
      .status(200)
      .json(new ApiResponse(200, updatedRestaurant, "Restaurant updated successfully"));
})

const updateFoodItem = asyncHandler(async (req, res) => {
   const foodItemId = req.params.foodItemId;
   const { title, description, ingredients, price, isAvailable, category, authenticity, spicyLevel, isVegetarian, sizes, variants } = req.body;

   if(!foodItemId){
      throw new ApiError(400, "Invalid Food Item ID");
   }

   const foodItem = await FoodItem.findById(foodItemId);
   if(!foodItem){
      throw new ApiError(404, "Food item not found");
   }

   if(title) foodItem.title = title;
   if(description) foodItem.description = description;
   if(ingredients) foodItem.ingredients = ingredients;
   if(price) foodItem.price = price;
   if(isAvailable) foodItem.isAvailable = isAvailable;
   if(category) foodItem.category = category;
   if(authenticity) foodItem.authenticity = authenticity;
   if(spicyLevel) foodItem.spicyLevel = spicyLevel;
   if(isVegetarian) foodItem.isVegetarian = isVegetarian;
   if(sizes) foodItem.sizes = sizes;
   if(variants) foodItem.variants = variants;

   const updatedFoodItem = await foodItem.save();
   return res
   .status(200)
   .json(ApiResponse(200, updatedFoodItem, "Food item updated successfully"));
})

const deleteRestaurant = asyncHandler(async (req, res) => {
   const restaurantId = req.params.restaurantId;
   if(!restaurantId){
      throw new ApiError(400, "Invalid Restaurant ID");
   }

   const restaurant = await Restaurant.findByIdAndDelete(restaurantId);
   if (!restaurant) {
      throw new ApiError(404, "Restaurant not found");
   }
   return res
   .status(200)
   .json(ApiResponse(200, restaurant, "Restaurant deleted successfully"));
})

const deleteFoodItem = asyncHandler(async (req, res) => {
   const foodItemId = req.params.foodItemId;
   const restaurantId = req.params.restaurantId;
   if(!foodItemId){
      throw new ApiError(400, "Invalid Food Item ID");
   }
   await Restaurant.findByIdAndUpdate(
      restaurantId,
      { $pull: { foodItems: foodItem._id } },
      { new: true }
   );
   const foodItem = await FoodItem.findByIdAndDelete(foodItemId);
   if (!foodItem) {
      throw new ApiError(404, "Food item not found");
   }
   return res
   .status(200)
   .json(ApiResponse(200, foodItem, "Food item deleted successfully"));
})

const getAllRestaurants_Of_Owner = asyncHandler(async (req, res) => { //Use JWTVerify middleware in routes
   const user = req.user;

   if (user.role !== "restaurantOwner") {
      throw new ApiError(403, "Only admins can access their restaurants");
   }

   const restaurants = await Restaurant.find({ owner: user._id }).sort("-createdAt");

   return res
   .status(200)
   .json(ApiResponse(200, restaurants, "Restaurants retrieved successfully"));
})

const getAllFoodItems_Of_Restaurant = asyncHandler(async (req, res) => {
   const restaurantId = req.params.restaurantId;
   if(!restaurantId){
      throw new ApiError(400, "Invalid Restaurant ID");
   }

   const foodItems = await FoodItem.find({ restaurant: restaurantId }).sort("-createdAt");

   return res
   .status(200)
   .json(ApiResponse(200, foodItems, "Food items retrieved successfully"));
})

export {
   addRestaurant,
   addFoodItem,
   updateRestaurant,
   deleteRestaurant,
   updateFoodItem,
   deleteFoodItem,
   getAllRestaurants_Of_Owner,
   getAllFoodItems_Of_Restaurant
}