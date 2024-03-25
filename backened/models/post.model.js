import mongoose from "mongoose";
const postSchema=mongoose.Schema({
    userId:{
        type:String,
        required:true
    },
    title:{
        type:String,
        required:true,
        unique:true
    },
    content:{
        type:String,
        requried:true
    },
    slag:{
        type:String,
        required:true,
        unique:true
    },
    photoUrl:{
        type:String,
        default:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRec71aR6uwcdvTH4I3EIDlH0EmBLhx4iX2cA&usqp=CAU"
    }
});
const Post=mongoose.model("Post",postSchema);
export default Post;