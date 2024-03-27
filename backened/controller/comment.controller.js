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
  const comments=await Comment.find({postId:req.params.postId});
      res.status(200).json(comments);
  }catch(error){
    next(error);
  }
}

const countLikes=async(req,res,next)=>{
  if(req.user.id!==req.params.commentId){
    return next(errHandler(403,"First Please login"))
  }
  try{
    const comment=await Comment.findById(req.user.id);
      const index=comment.likes.findIndex((id)=>id===String(req.user.id));
       if(index===-1){
        comment.numberOfLikes+=1;
        comment.likes.push(req.user.id);
       }else{
        comment.numberOfLikes-=1;
        comment.likes=comment.likes.filter((id)=>id!==String(req.user.id))
       }
  }catch(error){
    next(error);
  }
}
export {createComment,getAllComments,countLikes};