import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        match:/.+\@.+\..+/
    },
    password:{
        type:String,
         required:false,
    },
    img:{
        type:String,
         default:null
    },
    age:{
        type:Number,
        min:5,
        max:100
    },
    isVerified:{
        type:Boolean,
        default: false
    },
    otp:{
        type:String
    },
    otpExpires:{
        type:Date
    },
    date:{
        type:Date,
        default:Date.now
    },
    googleId:{
        type:String,
    },
   authProvider:{
    type:String,
    enum:["local","google"],
    default:"local",
   },
},
    {   timestamps:true }
);

export default mongoose.model("User",UserSchema);







