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
    },
    photoUrl:{
        type:String,
        default:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQhOaaBAY_yOcJXbL4jW0I_Y5sePbzagqN2aA&s"
    },
    isAdmin:{
        type:Boolean,
        default:false
    }
},{timestamps:true})
const User=mongoose.model("User",userschema);
export default User;