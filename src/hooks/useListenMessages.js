import { useEffect } from 'react';
import { useSocketContext } from '@/contexts/SocketContext';
import { useChatStore } from '@/store';
import { useChat } from './useChat';

const useListenMessages = () => {
  const { socket } = useSocketContext();
  const { messages, setMessages } = useChatStore();
  const { getConversations } = useChat();

  useEffect(() => {
    socket?.on('newMessage', (newMessage) => {
      newMessage.shouldShake = true;
      getConversations();
      setMessages([...messages, newMessage]);
    });
  }, [socket, setMessages, messages]);
};

export default useListenMessages;
