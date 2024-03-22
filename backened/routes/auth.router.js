import express from 'express';
import { signUp ,signIn} from '../controller/auth.controller.js';
const router =express.Router();
router.post('/auth/signUp',signUp);
router.post('/auth/signIn',signIn)
export default router;