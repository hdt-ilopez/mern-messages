import Contacts from '../model/contacts.model.js';
import Conversation from '../model/conversation.model.js';
import Message from '../model/message.model.js';
import User from '../model/user.model.js';
import { getReceiverSocketId, io } from '../socket.js';

export const userSuggestions = async (req, res) => {
  const { searchQuery } = req.body;
  const userId = req.userId;

  if (!searchQuery || searchQuery.trim() === '') {
    return res.status(400).json({ error: 'Search query is required.' });
  }

  try {
    const users = await User.find(
      {
        userName: { $regex: searchQuery, $options: 'i' },
        _id: { $ne: userId },
      },
      { profilePicture: 1, _id: 1, firstName: 1, lastName: 1, userName: 1 }
    ).limit(5);

    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error.' });
  }
};

export const newConversation = async (req, res) => {
  const userId = req.userId;
  const { recipient } = req.body;

  try {
    if (!recipient) {
      return res.status(400).send('Missing recipient');
    }

    const conversation = await Conversation.create({
      participants: [userId, recipient],
    });

    let contact = await Contacts.findOne({
      userId: userId,
      contactId: recipient,
    });

    if (!contact) {
      contact = new Contacts({
        userId: userId,
        contactId: recipient,
        blocked: false,
        favorite: false,
      });

      await contact.save();
    }

    return res.status(200).json(conversation);
  } catch (error) {
    console.error(error);
    return res.status(500).send('Internal server error');
  }
};

export const sendMessage = async (req, res) => {
  const userId = req.userId;
  const { recipient, message } = req.body;
  const { conversationId } = req.params;

  try {
    // Validate request body and params
    if (!conversationId) {
      return res.status(400).send('Missing conversation id');
    }

    if (!recipient) {
      return res.status(400).send('Missing recipient');
    }

    if (!message) {
      return res.status(400).send('Missing message');
    }

    // Find the conversation by ID
    const conversation = await Conversation.findById(conversationId);
    if (!conversation) {
      return res.status(404).send('Conversation not found');
    }

    // Create a new message
    const newMessage = new Message({
      senderId: userId,
      receiverId: recipient,
      message,
    });

    // Add the message to the conversation
    conversation.messages.push(newMessage._id);

    // Save both conversation and message concurrently
    await Promise.all([conversation.save(), newMessage.save()]);

    // Get the receiver's socket ID
    const receiverSocketId = getReceiverSocketId(recipient);
    if (receiverSocketId) {
      // Emit the new message to the receiver via Socket.IO
      io.to(receiverSocketId).emit('newMessage', newMessage);
    }

    // Respond with the new message
    return res.status(201).json(newMessage);
  } catch (error) {
    console.error('Error in sendMessage:', error);
    return res.status(500).send('Internal server error');
  }
};

export const updateReadStatus = async (req, res) => {
  const userId = req.userId; // Assuming userId is a string
  const { messageId } = req.params;

  console.log('UserId:', userId);
  console.log('MessageId:', messageId);

  try {
    const message = await Message.findById(messageId);

    console.log('Message:', message);

    if (!message) {
      return res.status(404).send('Message not found');
    }

    // Convert ObjectIds to strings for comparison
    const senderId = message.senderId.toString();
    const receiverId = message.receiverId.toString();

    console.log('SenderId:', senderId);
    console.log('ReceiverId:', receiverId);

    // Check if the user is either the sender or the receiver
    if (senderId !== userId && receiverId !== userId) {
      return res.status(403).send('User is not a participant in the message');
    }

    // Update the single read status
    message.readStatus = true;
    const newMessage = await message.save();

    console.log('New Message:', newMessage);

    return res.status(200).json(newMessage);
  } catch (error) {
    console.log(error);
    return res.status(500).send('Internal Server Error');
  }
};

export const getMessages = async (req, res) => {
  const userId = req.userId;
  const { conversationId } = req.params;

  try {
    if (!conversationId) {
      return res.status(400).send('Missing conversation id');
    }

    const conversation = await Conversation.findById(conversationId).populate({
      path: 'messages',
      options: { limit: 25, sort: { createdAt: 1 } },
    });

    if (!conversation) {
      return res.status(404).send('Conversation not found');
    }

    if (!conversation.participants.includes(userId)) {
      return res.status(403).send('You are not authorized to access this chat');
    }

    return res.status(200).json(conversation.messages);
  } catch (error) {
    console.error(error);
    return res.status(500).send('Internal server error');
  }
};

export const getConversations = async (req, res) => {
  const userId = req.userId;

  try {
    if (!userId) {
      return res.status(400).send('Missing userId');
    }

    const conversations = await Conversation.find({
      participants: userId,
    })
      .sort({ updatedAt: -1 })
      .populate({
        path: 'participants',
        select: 'profilePicture firstName lastName userName',
        match: { _id: { $ne: userId } },
      })
      .populate({
        path: 'messages',
        options: { sort: { createdAt: -1 }, limit: 1 },
      });

    if (!conversations || conversations.length === 0) {
      return res.status(200).send([]);
    }

    return res.status(200).json(conversations);
  } catch (error) {
    console.error(error);
    return res.status(500).send('Internal server error');
  }
};
