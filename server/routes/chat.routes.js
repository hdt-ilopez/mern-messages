import express from 'express';
import { verifyToken } from '../middleware/AuthMiddleware.js';
import { userSuggestions } from '../controllers/chat.controller.js';

const router = express.Router();

router.post('/user-suggestions', verifyToken, userSuggestions);

export default router;
