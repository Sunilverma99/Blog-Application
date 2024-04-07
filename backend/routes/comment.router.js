import express from 'express';
import { Router } from 'express';
import { verifyToken } from '../utlies/userverify.js';
import { createComment ,getAllComments,likeComment,editComment, deleteComment,getComments} from '../controller/comment.controller.js';
const router=express.Router();
router.post("/comment/add-comment",verifyToken,createComment);
router.get("/comment/getAllComments/:postId",getAllComments)
router.put("/comment/countLikes/:commentId",verifyToken,likeComment)
router.put("/comment/edit-comment/:commentId",verifyToken,editComment)
router.delete("/comment/delete-comment/:commentId",verifyToken,deleteComment)
router.get("/comment/getComments",verifyToken,getComments);
export default router;