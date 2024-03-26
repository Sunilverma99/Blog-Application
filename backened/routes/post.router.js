import express from "express";
import { Router } from "express";
import {createPost,getposts,deletePost} from "../controller/post.controller.js"
import { verifyToken } from "../utlies/userverify.js";
const router=express.Router();
router.post("/post/create", verifyToken ,createPost);
router.get("/post/posts",getposts);
router.delete("/post/delete-post/:postId/:userId",verifyToken,deletePost);
export default router;
