import ContactsContainer from '@/pages/chat/components/contacts-container';
import EmptyChatContainer from '@/pages/chat/components/empty-chat-container';
import ChatContainer from '@/pages/chat/components/chat-container';

const Chat = () => {
  const selectedMessage = false;

  return (
    <div className="flex h-screen text-white overflow-hidden">
      <ContactsContainer />
      {selectedMessage ? <ChatContainer /> : <EmptyChatContainer />}
    </div>
  );
};

export default Chat;
