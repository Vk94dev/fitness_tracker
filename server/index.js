import express, { application } from 'express';
import * as dotenv from "dotenv";
import cors from "cors";
import mongoose from 'mongoose';
import UserRoutes from "./routes/User.js"

import path from "path";

dotenv.config();

const app = express();

app.use(cors({
    origin:["http://localhost:5173"],
    credentials: true,
     methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));
app.use(express.json({limit:"50mb"}));
app.use(express.urlencoded({extended:true}));

app.use((req, res, next) => {
  res.setHeader("Cross-Origin-Opener-Policy", "same-origin-allow-popups");
  res.setHeader("Cross-Origin-Embedder-Policy", "unsafe-none");
  next();
});

// console.log(process.env);

// app.get("/", async (req,res)=>{
//     res.status(200).json({
//         message:"hello developers trom GFG",
//     })
// })

app.use("/api/user",UserRoutes);

app.use(express.static(path.join(process.cwd(), "client/dist")));

app.get(/.*/, (req, res) => {
  res.sendFile(path.join(process.cwd(), "client/dist/index.html"));
});


// error handler
app.use((err,req,res,next)=>{
    const status = err.status || 500;
     const message = err.message || "something went wrong";
     return res.status(status).json({
        success:false, 
        status, 
        message,
     });
});


const connectDB = ()=>{
    mongoose.set("strictQuery",true);
    // mongoose
    // .connect(process.env.MONGODB_URL)
    // .then((res)=>console.log("connected to Mongodb"))
    // .catch((err)=>{
    //     console.log(err);
    // });


mongoose.connect(process.env.MONGODB_URI
    // , {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// }
)
.then(() => console.log("MongoDB Connected"))
.catch((err) => console.log(err));
}



const PORT=process.env.PORT;

const startServer = async ()=>{
    try{
        connectDB();
      app.listen(PORT, ()=> console.log("server running at port 3000"));
    }
    catch(err){
      console.log(err);
    }
};

startServer();






