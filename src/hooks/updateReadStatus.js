import axios from 'axios';
import { useChat } from './useChat';

export const useUpdateReadStatus = () => {
  const { getConversations } = useChat();

  const updateReadStatus = async (messageId) => {
    const res = await axios.post(`/api/chat/message/${messageId}`, {
      withCredentials: true,
    });

    if (res.status === 200) {
      getConversations();
    }
  };
  return { updateReadStatus };
};
