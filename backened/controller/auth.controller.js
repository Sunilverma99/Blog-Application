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
export {signUp,signIn};