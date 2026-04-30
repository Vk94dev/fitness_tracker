import mongoose from "mongoose";

const WorkoutSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
        index:true
    },
    category:{
        type:String,
        required:true
    },
    workoutName:{
        type:String,
        required:true,
    },
    sets:{
        type:Number,
       default:null
    },
    reps:{
        type:Number
    },
     weight:{
        type:Number
    },
     duration:{
        type:Number
    },
     caloriesBurned:{
        type:Number
    },
     date:{
        type:Date,
        default:Date.now,
    },
},
    {   timestamps:true }
);

export default mongoose.model("Workout",WorkoutSchema);







