import { useAppStore, useChatStore } from '@/store';
import axios from 'axios';
import { useState } from 'react';

export const useChat = () => {
  const [loading, setLoading] = useState(false);
  const {
    selectedChat,
    messages,
    setMessages,
    selectedContact,
    setSelectedChat,
    setConversations,
  } = useChatStore();
  const { userInfo } = useAppStore();

  const createConversation = async () => {
    setLoading(true);
    const recipient = selectedContact._id;

    try {
      const res = await axios.post('/api/chat/new-conversation', {
        recipient,
        withCredentials: true,
      });

      console.log(res.data);

      if (res.data) {
        setSelectedChat(res.data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const getConversations = async () => {
    setLoading(true);

    try {
      const res = await axios.get('/api/chat/get-conversations', {
        withCredentials: true,
      });

      if (res.data) {
        setConversations(res.data);
      }
    } catch (error) {
      console.error;
    } finally {
      setLoading(false);
    }
  };

  const sendMessage = async (message) => {
    setLoading(true);

    try {
      const res = await axios.post(
        `/api/chat/send-message/${selectedChat._id}`,
        {
          message,
          recipient: selectedContact._id,
        },
        {
          withCredentials: true, // Moved withCredentials to the config object
        }
      );
      setMessages([...messages, res.data]);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const getMessages = async () => {
    setLoading(true);

    try {
      const res = await axios.get(`/api/chat/get-messages/${selectedChat._id}`);

      console.log(res);

      if (res.data?.length > 0) {
        setMessages(res.data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  return {
    loading,
    sendMessage,
    getMessages,
    createConversation,
    getConversations,
  };
};
