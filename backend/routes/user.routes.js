import express from 'express';
import {user,userUpdate,userDelete,userSignOut,getUsers,getUser} from '../controller/user.controller.js';
import { verifyToken } from '../utlies/userverify.js';
const router =express.Router();

router.get('/user',user);
router.put('/user/update/:id',verifyToken,userUpdate);
router.delete('/user/delete/:id',verifyToken,userDelete);
router.post("/user/signout",verifyToken,userSignOut)
router.get("/getAllUsers",verifyToken,getUsers)
router.get("/getUser/:id",getUser);
export default router;