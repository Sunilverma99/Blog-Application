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
    category:{
       type:String,
       default:"uncategorized"
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
        default:"https://images.pexels.com/photos/837358/pexels-photo-837358.jpeg?auto=compress&cs=tinysrgb&w=600"
    }
},{timestamps:true});
const Post=mongoose.model("Post",postSchema);
export default Post;