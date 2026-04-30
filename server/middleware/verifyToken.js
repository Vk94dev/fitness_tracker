import jwt from "jsonwebtoken";
import { createError } from "../error.js";

export const verifyToken = async (req,res, next)=>{
   try{
    if(!req.headers.authorization){
        return next(createError(401,"You are not authenticated"));
    }
   const token = req.headers.authorization.split(" ")[1];
   if(!token) {
    return next(createError(401,"you are not authenticated"));
   }
    jwt.verify(token,process.env.JWT,(err, decoded)=>{
        if(err){
            return res.status(403).json({message:"Invalid token"});
        }
        req.user=decoded;
     next();
    });

   }
   catch(err){
    return next(err);
   }
};



