import Comment from "../models/comments.model.js"
import errHandler from "../utlies/error.js"
const createComment=async(req,res,next)=>{
    if(!req.user._id!=req.body.userId){
        return next(errHandler(401,"You are not authorized to comment on this post"))
    }
    try {
        const comment=new Comment({
            userId:req.body.userId,
            postId:req.body.postId,
            comment:req.body.comment
        })
        await comment.save();
        res.status(201).json(comment);
    } catch (error) {
        next(error);
    }  
}
export {createComment};