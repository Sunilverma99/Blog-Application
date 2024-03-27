import express from 'express';
import { Router } from 'express';
import { verifyToken } from '../utlies/userverify.js';
import { createComment } from '../controller/comment.controller.js';
const router=express.Router();
router.post("/comment/add-comment",verifyToken,createComment);
export default router;