import mongoose from "mongoose";

const TutorialSchema = new mongoose.Schema({
   
    title:{
     type:String,
     required:true
  },
  description:{
    type:String
  },
  thumbnail:{
    type:String
  },
  video:{
    type:String
  }
},
  {
    timestamps:true
  }
);


export default mongoose.model("Tutorial",TutorialSchema);

