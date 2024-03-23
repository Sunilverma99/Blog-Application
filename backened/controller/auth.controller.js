import mongoose from "mongoose";
import User from "../models/user.model.js";
import bycript from "bcrypt"
import errHandler from "../utlies/error.js"
import jwt from "jsonwebtoken"
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

const signIn = async (req, res, next) => {
    const { email, password } = req.body;
    console.log(req.body)
    if (!email || !password) {
        return next(errHandler(400, "All fields are required"));
    }
    console.log("jello")
    try {
        const user = await User.findOne({email});
        console.log(user);
        if (!user) {
            return next(errHandler(400, "Invalid credentials"));
            console.log("33")
        }

        const isMatch = await  bycript.compareSync(password,user.password);
        console.log(isMatch);
        if (!isMatch) {
            return next(errHandler(400, "Invalid credentials"));
        }
        const { password: _, ...rest } = user._doc; // Destructure and exclude password from response
        const token = jwt.sign({ id: user._id }, process.env.JWT_TOKEN, { expiresIn: '1h' }); // Set token expiration time
        res.status(200).cookie('access_token', token, {
            httpOnly: true,
            sameSite: 'None',
            secure: true
        }).json(rest); // Send user data as response
    } catch (error) {
        console.log(error);
        next(error);
    }
};

 const googleLogin= async (req,res,next)=>{
    try {
      const user=await User.findOne({email:req.body.email});
      if(user){
        const {password:pass,...rest}=user._doc;
        const token=jwt.sign({id:user._id},process.env.JWT_TOKEN);
        res.cookie('access_token', token, {secure: true ,httpsOnly: true}).status(200).json(rest);
      }else{
        const gereratedPassword=Math.random().toString(36).slice(-8)+Math.random().toString(36).slice(-8);
        const hashPassword=await bycript.hashSync(gereratedPassword, 10);
        const newUser=new User({userName:req.body.userName.split(" ").join("").toLowerCase()+Math.random().toString(36).slice(-4),email:req.body.email,password:hashPassword,profilePhoto:req.body.photo})
        await newUser.save();
      const {password:pass,...rest}=newUser._doc;
      const token=jwt.sign({id:newUser._id},process.env.JWT_TOKEN);
      res.cookie('access_token',token,{ httpsOnly:true}).status(200).json(rest);
      }
    } catch (error) {
      next(error);
    }
  
  }


export {signUp,signIn,googleLogin};