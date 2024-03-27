import Comment from "../models/comments.model.js"
import errHandler from "../utlies/error.js"
import { ObjectId } from "mongoose";
const createComment=async(req,res,next)=>{
    const { comment, postId, userId } = req.body;

    if (userId !== req.user.id) {
      return next(
        errHandler(403, 'You are not allowed to create this comment')
      );
    }

    try {
        const Content=new Comment({
           userId,
           postId,
           comment
        })
        await Content.save();
        res.status(201).json(comment);
    } catch (error) {
        next(error);
    }  
}
const getAllComments=async(req,res,next)=>{
  try{
    console.log(req.params.postId)
  const comments=await Comment.find({postId:req.params.postId});
   console.log(comments)
      res.status(200).json(comments);
  }catch(error){
    next(error);
  }
}
export {createComment,getAllComments};