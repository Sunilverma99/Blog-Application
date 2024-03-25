import  errHandler from "../utlies/error.js";
import Post from "../models/post.model.js"
const createPost=async(req,res,next)=>{

  if(!req.user.isAdmin){
    return next(errHandler(401,"You are not allowed to create post"));
  }
  if(req.body.title==""||req.body.content==""||!req.body.title||!req.body.content){
    return next(errHandler(400,"Title and content are required to create post"));
  }
  const slag=req.body.title.toLowerCase().split(" ").join("-").replace(/[^a-zA-Z0-9-]/g,"");
  const post={
    ...req.body,
    slag:slag,
    userId:req.user.id
  }
   const newPost=new Post(post);
   try {
       const savedPost=await newPost.save();
       res.status(200).json(savedPost);
   } catch (error) {
     next(error);
   }
}
export {createPost}