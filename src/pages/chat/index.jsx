import ContactsContainer from '@/pages/chat/components/contacts-container';
import EmptyChatContainer from '@/pages/chat/components/empty-chat-container';
import ChatContainer from '@/pages/chat/components/chat-container';
import { useChatStore } from '@/store';
import NewChatContainer from './components/new-chat-conatiner';
import { useMediaQuery } from 'react-responsive';

const Chat = () => {
  const { selectedChat, newChat } = useChatStore();
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });

  return (
    <div className="flex h-screen text-white overflow-hidden ">
      <ContactsContainer />
      {newChat ? (
        <NewChatContainer />
      ) : selectedChat ? (
        <ChatContainer />
      ) : isMobile ? null : (
        <EmptyChatContainer />
      )}
    </div>
  );
};

export default Chat;
