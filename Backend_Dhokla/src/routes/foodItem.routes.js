import { Router } from "express";
import { verifyJWT } from "../middleware/auth.middleware.js";
import { upload } from '../middleware/multer.middleware.js'
import {
   addFoodItem,
   updateFoodItem,
   deleteFoodItem,
   getAllFoodItems_Of_Restaurant
} from "../controllers/restaurant.controller.js"

const foodItemRouter = Router()

foodItemRouter.route('/add-food-item').post(
   upload.array('photos', 5),
   addFoodItem
)

foodItemRouter.route('/update-food-item/:foodItemId').post( // This route is temporary - Yet to attach Food ID to params
   updateFoodItem
)

foodItemRouter.route('/delete-food-item/:foodItemId').post( // This route is temporary - Yet to attach Food ID to params
   deleteFoodItem
)

foodItemRouter.route('/').post(
   getAllFoodItems_Of_Restaurant
)

export default foodItemRouter