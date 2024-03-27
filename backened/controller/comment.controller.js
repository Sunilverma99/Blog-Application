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

 const likeComment = async (req, res, next) => {
  try {
    const comment = await Comment.findById(req.params.commentId);
    if (!comment) {
      return next(errHandler(404, 'Comment not found'));
    }
    const userIndex = comment.likes.indexOf(req.user.id);
    if (userIndex === -1) {
      comment.numberOfLikes += 1;
      comment.likes.push(req.user.id);
    } else {
      comment.numberOfLikes -= 1;
      comment.likes.splice(userIndex, 1);
    }
    await comment.save();
    res.status(200).json(comment);
  } catch (error) {
    next(error);
  }
};
export {createComment,getAllComments,likeComment};