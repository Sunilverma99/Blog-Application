import mongoose from 'mongoose';
const userschema=mongoose.Schema({
    userName:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,  
    }
})
const User=mongoose.model("User",userschema);
export default User;