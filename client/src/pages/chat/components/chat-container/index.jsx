import ChatComponent from '@/components/ChatComponent';
import ChatInput from '@/components/ChatInput';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useChatStore } from '@/store';
import { Avatar } from '@radix-ui/react-avatar';
import { ArrowLeft } from 'lucide-react';
import { useEffect } from 'react';

const ChatContainer = () => {
  const { setSelectedChat, selectedChat, setSelectedContact } = useChatStore();

  useEffect(() => {
    setSelectedContact(selectedChat?.participants[0]);
  }, [selectedChat]);

  return (
    <div className="h-screen w-screen flex flex-col bg-[#1c1d25] transition-all duration-1000 p-4">
      {/* Header Section */}
      <div className="flex items-center gap-2 mb-4">
        <Button
          variant="outline"
          size="icon"
          className="bg-transparent border-none hover:bg-transparent hover:text-white/70 transition-all duration-300"
          onClick={() => setSelectedChat([])}
        >
          <ArrowLeft size={30} />
        </Button>
        <div className="flex items-center gap-2">
          <Avatar>
            <img
              src={selectedChat?.participants[0]?.profilePicture}
              alt=""
              width={45}
            />
          </Avatar>
          <h2 className="uppercase font-bold text-3xl ">
            {selectedChat?.participants[0]?.firstName}{' '}
            {selectedChat?.participants[0]?.lastName}
          </h2>
        </div>
      </div>
      <Separator className="mb-8" />
      <ChatComponent />
      <div className="flex-1 overflow-y-auto">
        <ChatInput contact={selectedChat?.participants[0]} />
      </div>
    </div>
  );
};

export default ChatContainer;
