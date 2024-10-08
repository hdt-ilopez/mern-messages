import express from 'express';
import { verifyToken } from '../middleware/AuthMiddleware.js';
import {
  getConversations,
  getMessages,
  newConversation,
  sendMessage,
  updateReadStatus,
  userSuggestions,
} from '../controllers/chat.controller.js';

const router = express.Router();

router.post('/user-suggestions', verifyToken, userSuggestions);
router.post('/new-conversation', verifyToken, newConversation);
router.post('/send-message/:conversationId', verifyToken, sendMessage);
router.post('/message/:messageId', verifyToken, updateReadStatus);
router.get('/get-messages/:conversationId', verifyToken, getMessages);
router.get('/get-conversations', verifyToken, getConversations);

export default router;
