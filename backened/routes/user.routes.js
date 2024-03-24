import express from 'express';
import {user,userUpdate,userDelete,userSignOut} from '../controller/user.controller.js';
import { verifyToken } from '../utlies/userverify.js';
const router =express.Router();

router.get('/user',user);
router.put('/user/update/:id',verifyToken,userUpdate);
router.delete('/user/delete/:id',verifyToken,userDelete);
router.post("/user/signout",verifyToken,userSignOut)
export default router;