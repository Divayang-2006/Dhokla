import { Router } from "express";
import { verifyJWT } from "../middleware/auth.middleware.js";
import foodItemRouter from "./foodItem.routes.js"
import {
   addRestaurant,
   updateRestaurant,
   deleteRestaurant,
   getAllRestaurants_Of_Owner,
} from "../controllers/restaurant.controller.js"

const restaurantRouter = Router()

restaurantRouter.route('/add-restaurant').post(verifyJWT, addRestaurant);
restaurantRouter.route('/update-restaurant/:restaurantId').post(updateRestaurant);
restaurantRouter.route('/delete-restaurant/:restaurantId').post(deleteRestaurant);
restaurantRouter.route('/restaurants').post(verifyJWT, getAllRestaurants_Of_Owner);
restaurantRouter.route('/:restaurantId').post(foodItemRouter)

export default restaurantRouter