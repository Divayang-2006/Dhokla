import 'dotenv/config'
import mongoose from "mongoose";
import { DB_NAME } from "./constants.js";
import connectDB from "./db/index.js";
import {app} from './app.js'

connectDB()
.then(() => {
   app.listen(process.env.PORT || 8000, ()=>{
      console.log(`Server is listeing on Port: ${process.env.PORT}`)
   })
})
.catch((error) => {
   console.log("Monogo DB connection Failed !!!");
   
});