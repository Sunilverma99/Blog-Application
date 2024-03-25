import express from "express";
import { Router } from "express";
import {createPost,getposts} from "../controller/post.controller.js"
import { verifyToken } from "../utlies/userverify.js";
const router=express.Router();
router.post("/post/create", verifyToken ,createPost);
router.get("/posts",getposts);
export default router;
