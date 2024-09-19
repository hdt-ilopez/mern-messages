import {
  getUserInfo,
  login,
  logout,
  signup,
  updateProfile,
} from '../controllers/auth.controller.js';
import express from 'express';
import { verifyToken } from '../middleware/AuthMiddleware.js';

const router = express.Router();

router.post('/login', login);
router.post('/signup', signup);
router.post('/logout', logout);
router.get('/user-info', verifyToken, getUserInfo);
router.post('/update-profile', verifyToken, updateProfile);

export default router;
