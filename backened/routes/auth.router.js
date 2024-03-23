import express from 'express';
import { signUp ,signIn, googleLogin} from '../controller/auth.controller.js';
const router =express.Router();
router.post('/auth/signUp',signUp);
router.post('/auth/signIn',signIn);
router.post("/auth/google",googleLogin)
export default router;