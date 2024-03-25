import express from "express";
import { Router } from "express";
import {createPost} from "../controller/post.controller.js"
import { verifyToken } from "../utlies/userverify.js";
const router=express.Router();
router.post("/post/create", verifyToken ,createPost);
export default router;
