import mongoose from "mongoose";
import User from "../models/user.model.js";
import bycript from "bcrypt"
const signUp=async(req,res)=>  {
    const {userName,email,password}=req.body;
    if(!userName || !email ||!password){
        res.status(422).json({error :"Please fill all the fields"})
    }
    const hashPassword= await bycript.hash(password,10);
    const newUser=new User({userName,email,password:hashPassword});
    try{
        await newUser.save();
        res.status(201).json({message:"User registered successfully"});
    }catch(err){
        res.status(500).json({error:err});
    }
}
export {signUp};