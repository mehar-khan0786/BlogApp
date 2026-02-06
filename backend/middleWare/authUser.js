import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken";


//authtication user middleware
export const isAuthenticated=async(req,res,next)=>{
    try {
        const token=req.cookies.jwt;
        console.log("midddleware ",token)
        if(!token){
            return res.status(401).json({message:"User is not authenticated"});
        }
        const decoded=jwt.verify(token,process.env.JWT_SECRET_KEY);
        const user=await User.findById(decoded.userId);
        if(!user){
            return res.statue(404).json({message:"User is not authenticated"})
        }
        req.user=user;
        next();

    }catch(error){
        console.log("error authtication",error);
        return res.status(401).json({message:"User is not authenticated"});
    }
}

//authorized middleware

export const isAdmin=(...roles)=>{
    return (req,res,next)=>{
        if(!roles.includes(req.user.role)){
             return res.status(403).json(`User with given role ${req.user.role} not allowed`);
        }
        next();
    }
}