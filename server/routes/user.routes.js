import express from 'express';
import { verifyToken } from '../middleware/AuthMiddleware.js';
import {
  getUserContacts,
  getUserInfo,
  updateProfile,
} from '../controllers/user.controller.js';

const router = express.Router();

router.post('/update-profile', verifyToken, updateProfile);
router.get('/user-info', verifyToken, getUserInfo);
router.get('/get-contacts', verifyToken, getUserContacts);

export default router;
