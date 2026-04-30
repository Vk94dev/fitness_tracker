import bcrypt, { hash } from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import  {createError} from "../error.js";
import User from "../models/User.js";
import Workout from "../models/Workout.js";
import Tutorial from "../models/Tutorial.js";
import { request } from "express";

dotenv.config();

export const UserRegister = async (req,res,next)=>{
    try{

       const {email, password,name, img} = req.body;
      // const verifyCode = Math.floor(100000 + Math.random()*900000).toString();
      // let user;


      
       if(!email || !password || !name){
        return next(createError(400,"All fields are required"));
       }
       const existingUser = await User.findOne({email}).exec();         //.exec() executes the query and returns a Promise
       if(existingUser){
        return next(createError(409,"Email is already in used"));
       }
     const salt = await bcrypt.genSalt(10);
    const hash =await bcrypt.hash(password,salt);
    const user = new User({
            name,
            email, 
            password:hash,
            img,
          });
      const createdUser = await user.save();
      const token = jwt.sign({id:createdUser._id},process.env.JWT,{
        expiresIn:"7d",
      });
      return res.status(200).json({token,user:createdUser,});
    }
    catch(err){
    return next(err);
    }
}


export const UserLogin = async (req,res,next)=>{
    try{
       const {email, password} = req.body;
       const user = await User.findOne({email}).exec();         //.exec() executes the query and returns a Promise
       if(!user){
        return next(createError(404,"user not found"));
       }
      const isPassCorrect = await bcrypt.compare(password,user.password);
      if(!isPassCorrect) {
        return next(createError(403,"Incorrect Password"));
      }
       const token = jwt.sign({id:user._id},process.env.JWT,{
        expiresIn:"7d",
      });
      return res.status(200).json({token,user});
    }
    catch(err){
    next(err);
    }
}

export const googleAuth = async (req, res)=>{
  const {name,email, password,img} = req.body;

    try{
      const existingUser = await User.findOne({email:email});
      if(!existingUser){
        const result = await User.create({
        name:name,
        email:email,
        password:password,
        img:img
        });

   const token = jwt.sign ({email:result.email, id: result._id},process.env.JWT);

     return res.status(200).send ({user:result,token:token,msg:"user login successfully"})

      }
      else{
        const existingUser = await User.findOne({email:email});
        const token = jwt.sign({email:existingUser.email, id:existingUser._id},process.env.JWT);
        return res.status(200).send({user:existingUser, token:token, msg:"user login successfully"})

      }
    }catch(error){
      console.log(error);
    }
} 


export const getUserDashboard = async (req,res,next)=>{
    try{
        const userId = req.user?.id;
        const user = await User.findById(userId);
        if(!user){
            return next(createError(404,"User not found"));
        }

        const currentDateFormatted = new Date();
        const startToday = new Date(
            currentDateFormatted.getFullYear(),
            currentDateFormatted.getMonth(),
            currentDateFormatted.getDate()
        );
        const endToday = new Date(
            currentDateFormatted.getFullYear(),
            currentDateFormatted.getMonth(),
            currentDateFormatted.getDate()+1
        );

     //calculte total calories burnt
    const totalCaloriesBurnt = await Workout.aggregate([
      { $match: { user: user._id, date: { $gte: startToday, $lt: endToday } } },
      {
        $group: {
          _id: null,
          totalCaloriesBurnt: { $sum: "$caloriesBurned" },
        },
      },
    ]);

    //Calculate total no of workouts
    const totalWorkouts = await Workout.countDocuments({
      user: userId,
      date: { $gte: startToday, $lt: endToday },
    });

    //Calculate average calories burnt per workout
    const avgCaloriesBurntPerWorkout =
      totalCaloriesBurnt.length > 0
        ? totalCaloriesBurnt[0].totalCaloriesBurnt / totalWorkouts
        : 0;

    // Fetch category of workouts
    const categoryCalories = await Workout.aggregate([
      { $match: { user: user._id, date: { $gte: startToday, $lt: endToday } } },
      {
        $group: {
          _id: "$category",
          totalCaloriesBurnt: { $sum: "$caloriesBurned" },
        },
      },
    ]);

    //Format category data for pie chart

    const pieChartData = categoryCalories.map((category, index) => ({
      id: index,
      value: category.totalCaloriesBurnt,
      label: category._id,
    }));

    const weeks = [];
    const caloriesBurnt = [];

    for (let i = 6; i >= 0; i--) {
      const date = new Date(
        currentDateFormatted.getTime() - i * 24 * 60 * 60 * 1000
      );

      weeks.push(`${date.getDate()}th`);

      const startOfDay = new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate()
      );
      const endOfDay = new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate() + 1
      );

      const weekData = await Workout.aggregate([
        {
          $match: {
            user: user._id,
            date: { $gte: startOfDay, $lt: endOfDay },
          },
        },
        {
          $group: {
            _id: { $dateToString: { format: "%Y-%m-%d", date: "$date" } },
            totalCaloriesBurnt: { $sum: "$caloriesBurned" },
          },
        },
        {
          $sort: { _id: 1 }, // Sort by date in ascending order
        },
      ]);

      caloriesBurnt.push(
        weekData[0]?.totalCaloriesBurnt ? weekData[0]?.totalCaloriesBurnt : 0
      );
    }

    return res.status(200).json({
      totalCaloriesBurnt:
        totalCaloriesBurnt.length > 0
          ? totalCaloriesBurnt[0].totalCaloriesBurnt
          : 0,
      totalWorkouts: totalWorkouts,
      avgCaloriesBurntPerWorkout: avgCaloriesBurntPerWorkout,
      totalWeeksCaloriesBurnt: {
        weeks: weeks,
        caloriesBurned: caloriesBurnt,
      },
      pieChartData: pieChartData,
    });
  }
    catch(err){
        next(err);
    }
};


export const getWorkoutsByDate = async (req,res, next)=>{
    try{
        // console.log("user",req.user);
        const userId = req.user?.id;
        // console.log(userId);
        const user = await User.findById(userId);
      
        let date = req.query.date? new Date(req.query.date): new Date();
        if(!user) {
            return next(createError(404,"User not found"));
        }
        const startOfDay =  new Date(
            date.getFullYear(),
            date.getMonth(),
            date.getDate()
        );
        const endOfDay = new Date(
            date.getFullYear(),
            date.getMonth(),
            date.getDate()+1
        );
        const todaysWorkouts = await Workout.find({
            user:userId,
            date:{$gte:startOfDay, $lt:endOfDay},
        });

       const totalCaloriesBurnt = (todaysWorkouts || []).reduce(
  (total, workout) => total + (workout.caloriesBurned || 0),
  0
);

        return res.status(200).json({todaysWorkouts,totalCaloriesBurnt});
    }
    catch(err){
        next(err);
    }
}

export const addWorkout = async (req, res, next) => {
  try {
    const userId = req.user?.id;

// const { workoutString } = req.body;

// const parts = workoutString.split("\n").filter(Boolean);

// const category = parts[0];
// const workoutName = parts[1];
// const sets = parts[2];
// const reps = parts[3];
// const weight = parts[4];
// const duration = parts[5];

// console.log("body: ",req.body);
const { category, workoutName, sets, reps, weight, duration } = req.body;


// console.log(category, workoutName, sets, reps, weight, duration);

    if (!category || !workoutName || !sets || !reps || !weight || !duration) {
      return next(createError(400, "All fields are required"));
    }

    const newWorkout = await Workout.create({
      user: userId,
      category,
      workoutName,
      sets: Number(sets),
      reps: Number(reps),
      weight: Number(weight),
      duration: Number(duration),
      caloriesBurned: Number(duration) * 5,
    });

    return res.status(201).json({
      message: "Workout added successfully",
      workout: newWorkout,
    });

  } catch (err) {
    console.error("ERROR:", err); 
    res.status(500).json({ message: err.message });
  }
};

// export const addWorkout = async (req, res, next) => {
//   try {
//     const userId = req.user?.id;
//     const { workoutString } = req.body;
//     if (!workoutString) {
//       return next(createError(400, "Workout string is missing"));
//     }
//     // Split workoutString into lines
//     const eachworkout = workoutString.split(";").map((line) => line.trim());

//     // Check if any workouts start with "#" to indicate categories
//     const categories = eachworkout.filter((line) => line.startsWith("#"));
//     if (categories.length === 0) {
//       return next(createError(400, "No categories found in workout string"));
//     }

//     const parsedWorkouts = [];
//     let currentCategory = "";
//     let count = 0;

//     // Loop through each line to parse workout details
//      eachworkout.forEach((line) => {
//       count++;
//       if (line.startsWith("#")) {
//         const parts = line?.split("\n").map((part) => part.trim());
//         console.log(parts);
//         if (parts.length < 5) {
//           return next(
//             createError(400, `Workout string is missing for ${count}th workout`)
//           );
//         }

//         // Update current category
//         currentCategory = parts[0].substring(1).trim();
//         // Extract workout details
//         const workoutDetails = parseWorkoutLine(parts);
//         if (workoutDetails == null) {
//           return next(createError(400, "Please enter in proper format "));
//         }

//         if (workoutDetails) {
//           // Add category to workout details
//           workoutDetails.category = currentCategory;
//           parsedWorkouts.push(workoutDetails);
//         }
//       } else {
//         return next(
//           createError(400, `Workout string is missing for ${count}th workout`)
//         );
//       }
//     });

//     // Calculate calories burnt for each workout
//    for (const workout of parsedWorkouts) {
//   workout.caloriesBurned = parseFloat(calculateCaloriesBurnt(workout));
//   await Workout.create({ ...workout, user: userId });
// }

//     return res.status(201).json({
//       message: "Workouts added successfully",
//       workouts: parsedWorkouts,
//     });
//   } catch (err) {
//     next(err);
//   }
// };




// Function to parse workout details from a line
const parseWorkoutLine = (parts) => {
  const details = {};
  console.log(parts);
  if (parts.length >= 5) {
    details.workoutName = parts[1].substring(1).trim();
    details.sets = parseInt(parts[2].split("sets")[0].substring(1).trim());
    details.reps = parseInt(
      parts[2].split("sets")[1].split("reps")[0].substring(1).trim()
    );
    details.weight = parseFloat(parts[3].split("kg")[0].substring(1).trim());
    details.duration = parseFloat(parts[4].split("min")[0].substring(1).trim());
    console.log(details);
    return details;
  }
  return null;
};

// Function to calculate calories burnt for a workout
const calculateCaloriesBurnt = (workoutDetails) => {
  const durationInMinutes = parseInt(workoutDetails.duration);
  const weightInKg = parseInt(workoutDetails.weight);
  const caloriesBurntPerMinute = 5; // Sample value, actual calculation may vary
  return durationInMinutes * caloriesBurntPerMinute * weightInKg;
};


export const deleteWorkout = async (req,res,next)=>{
  try{
    const workout = await Workout.findById(req.params.id);
    if(!workout){
      return next(createError(404,"Workout not found"));
    }

    if(workout.user.toString() !== req.user.id){
      return next(createError(403,"Not allowed"));
    }
    await workout.deleteOne();
    res.status(200).json({message:"Workout deleted"});
  }
  catch(err){
    next(err);
  }
}

export const updateWorkout = async (req, res, next) => {
  try {
    const id = req.params.id;
    const updated = await Workout.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json(updated);
  } catch (err) {
    next(err);
  }
};

export const getUserById = async (req, res, next) => {
  // console.log("user id ",req.params.id);

  try {
    const user = await User.findById(req.user.id).select("-password");


    return res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

export const addContact = async (req,res)=>{
   const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({
      message: "All fields are required",
    });
  }
try{
  const newMessage = new Contact({
    name,
    email,
    message,
  });
 await newMessage.save();


  // console.log("Received Data:", req.body);

  res.status(200).json({
    message: "Message received successfully",
  });
}catch(err){
  res.status(500).json({message:"server error"});
}
}



// export const addTutorial = async (req,res)=>{
//        try {
//     const tutorial = new Tutorial(req.body);
//     const saved = await tutorial.save();
//     res.status(200).json(saved);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// };

// export const getTutorials = async (req,res)=>{
//   try {
//     const tutorials = await Tutorial.find();
//     res.status(200).json(tutorials);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// }








