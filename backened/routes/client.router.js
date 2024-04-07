import express from "express";
import {Clientside} from "../controller/Client.controller.js";
const router=express.Router();
router.post("/client",Clientside)
export default router