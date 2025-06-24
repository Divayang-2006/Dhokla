import mongoose, {Schema} from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";


const userSchema = new mongoose.Schema({
   email: { type: String, required: true, unique: true },
   fullName: { type: String, required: true },
   password: { type: String, required: true },
   address: [{ type: String }],
   refreshToken: { type: String },

   role: {
      type: String,
      enum: ['customer', 'admin'],
      default: 'customer',
   },

   ownedRestaurants: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Restaurant'
   }],

   orderHistory: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Order'
   }]
}, { timestamps: true });

// Password hash middleware
userSchema.pre('save', async function (next) {
   if (!this.isModified('password')) return next();
   this.password = await bcrypt.hash(this.password, 10);
   next();
});

const User = mongoose.model('User', userSchema) ;
export default User