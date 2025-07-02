import mongoose, {Schema} from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
   email: { 
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/\S+@\S+\.\S+/, 'Please use a valid email address']
   },

   fullName: { 
      type: String, 
      required: [true, 'Full name is required'],
      trim: true,
      minlength: [2, 'Full name must be at least 2 characters long']
   },

   password: { 
      type: String, 
      required: [true, 'Password is required'],
      minlength: [6, 'Password must be at least 6 characters'],
      select: false // Hide password by default in queries
   },

   address: [{
      street: { type: String },
      city: { type: String },
      state: { type: String },
      zip: { type: String },
      country: { type: String }
   }],

   refreshToken: { 
      type: String,
      select: false // Don't expose refresh token by default
   },

   role: {
      type: String,
      enum: ['customer', 'restaurantOwner'],
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
}, {
   timestamps: true,
   toJSON: { virtuals: true },
   toObject: { virtuals: true }
});


// Password hash middleware
userSchema.pre('save', async function (next) {
   if (!this.isModified('password')) return next();
   this.password = await bcrypt.hash(this.password, 10);
   next();
});

userSchema.methods.isPasswordCorrect = async function (password){
   return await bcrypt.compare(password, this.password)
};

userSchema.methods.generateAccessToken = function(){
   return jwt.sign(
      {
         _id: this._id,
         email: this.email,
         fullname: this.fullname
      },
      process.env.ACCESS_TOKEN_SECRET,
      {
         expiresIn: process.env.ACCESS_TOKEN_EXPIRY
      }
   )
};

userSchema.methods.generateRefreshToken = function(){
   return jwt.sign(
      {
         _id: this._id
      },
      process.env.REFRESH_TOKEN_SECRET,
      {
         expiresIn: process.env.REFRESH_TOKEN_EXPIRY
      }
   )
};

const User = mongoose.model('User', userSchema) ;
export default User