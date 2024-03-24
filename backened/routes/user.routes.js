import express from 'express';
import {user,userUpdate,userDelete} from '../controller/user.controller.js';
import { verifyToken } from '../utlies/userverify.js';
const router =express.Router();

router.get('/user',user);
router.put('/user/update/:id',verifyToken,userUpdate);
router.delete('/user/delete/:id',verifyToken,userDelete);
export default router;