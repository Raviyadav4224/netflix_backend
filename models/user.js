import mongoose from "mongoose";
import validator from 'validator'
import jwt from 'jsonwebtoken'
const netflixSchema=new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please write a username"]
    },
    email: {
        type: String,
        required: [true, "Please write an email"],
        validate:validator.isEmail,
        unique: true
    },
    password: {
        type: String,
        required: [true, "Please write a password"],
        minlength: 6,
        select: false 
    },
    role:{
        type:String,
        default:"user"
    },
    cartItems: [{
        id: {
            type: String,
            default: ''
        },
        count: {
            type: Number,
            default: 0
        }
    }],
    avatar: {
        public_id: {
          type: String,
          required: true,
        },
        url: {
          type: String,
          required: true,
        },
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date
})
netflixSchema.methods.getSignedToken=function () {
    return jwt.sign({id:this._id},process.env.JWT_SECRET_KEY,{
        expiresIn:"30min"
    })
}

export const User=new mongoose.model('user',netflixSchema)