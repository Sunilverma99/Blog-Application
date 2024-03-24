import express from 'express';
import {user,userUpdate} from '../controller/user.controller.js';
import { verifyToken } from '../utlies/userverify.js';
const router =express.Router();

router.get('/user',user);
router.put('/update/:id',verifyToken,userUpdate);
export default router;