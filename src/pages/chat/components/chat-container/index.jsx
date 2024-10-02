import ChatComponent from '@/components/ChatComponent';
import ChatInput from '@/components/ChatInput';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useChatStore } from '@/store';
import { Avatar } from '@radix-ui/react-avatar';
import { ArrowLeft } from 'lucide-react';
import { useEffect } from 'react';

const ChatContainer = () => {
  const {
    setSelectedChat,
    selectedChat,
    setSelectedContact,
    setNewChat,
    setMessages,
  } = useChatStore();

  useEffect(() => {
    if (
      Array.isArray(selectedChat?.participants) &&
      selectedChat?.participants.length > 0
    ) {
      setSelectedContact(selectedChat.participants[0]);
    }
  }, [selectedChat]);

  const handleCloseChat = () => {
    setNewChat(false);
    setSelectedContact(undefined);
    setSelectedChat(undefined);
    setMessages([]);
  };

  return (
    <div className="h-screen w-screen flex flex-col bg-[#1c1d25] transition-all duration-1000 p-4">
      <div className="flex items-center gap-2 mb-4">
        <Button
          variant="outline"
          size="icon"
          className="bg-transparent border-none hover:bg-transparent hover:text-white/70 transition-all duration-300"
          onClick={handleCloseChat}
        >
          <ArrowLeft size={30} />
        </Button>
        {selectedChat &&
          Array.isArray(selectedChat?.participants) &&
          selectedChat?.participants.length > 0 && (
            <div className="flex items-center gap-2">
              <Avatar>
                <img
                  src={selectedChat?.participants[0]?.profilePicture || ''}
                  alt={`${selectedChat?.participants[0]?.firstName} ${selectedChat?.participants[0]?.lastName}`}
                  width={45}
                />
              </Avatar>
              <h2 className="uppercase font-bold text-3xl">
                {selectedChat?.participants[0]?.firstName}{' '}
                {selectedChat?.participants[0]?.lastName}
              </h2>
            </div>
          )}
      </div>

      <Separator className="bg-[#2f303b]" />
      <div className="relative h-screen">
        <div className="absolute bottom-0 w-full">
          <ChatComponent />
          <ChatInput contact={selectedChat?.participants[0]} />
        </div>
      </div>
    </div>
  );
};
export default ChatContainer;
