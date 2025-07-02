import { Router } from "express";
import { verifyJWT } from "../middleware/auth.middleware.js";
import restaurantRouter from "./restaurant.routes.js"
import { 
      registerUser,
      loginUser,
      logoutUser,
      refreshAccessToken,
      changeCurrentPassword,
      getCurrentUser,
      updateAccountDetails,
   } from "../controllers/user.controller.js";

   const router = Router()

   router.route("/register").post(registerUser)
   router.route("/login").post(loginUser)
   router.route("/logout").post(
      verifyJWT,
      logoutUser
   )
   router.route("/refresh-token").post(refreshAccessToken)
   router.route("/change-password").post(verifyJWT,changeCurrentPassword)
   router.route("/getCurrentUser").post(
      verifyJWT, // Use of MiddleWare is to fetch and Verify User and then it passes to the next route (Very Convient way) 
      getCurrentUser
   )
   router.route("/update-account").patch(verifyJWT,updateAccountDetails)

export default router