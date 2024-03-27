import express from 'express';
import { Router } from 'express';
import { verifyToken } from '../utlies/userverify.js';
import { createComment ,getAllComments,countLikes} from '../controller/comment.controller.js';
const router=express.Router();
router.post("/comment/add-comment",verifyToken,createComment);
router.get("/comment/getAllComments/:postId",getAllComments)
router.put("/comment/countLikes/:commentId",verifyToken,countLikes)
export default router;