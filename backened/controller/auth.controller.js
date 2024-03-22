import mongoose from "mongoose";
import User from "../models/user.model.js";
import bycript from "bcrypt"
import errHandler from "../utlies/error.js"
const signUp=async(req,res,next)=>  {
    const {userName,email,password}=req.body;
    if(!userName || !email ||!password){
        next(errHandler(400,"All fields are requried"))
    }
    const hashPassword= await bycript.hash(password,10);
    const newUser=new User({userName,email,password:hashPassword});
    try{
        await newUser.save();
        res.status(201).json({message:"User registered successfully"});
    }catch(err){
        next(err);
        console.log(err)
    }
}
export {signUp};