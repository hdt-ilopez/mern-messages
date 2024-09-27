import { Button } from './ui/button';
import { Send } from 'lucide-react';
import { Input } from './ui/input';
import { useChatStore } from '@/store';
import TimeDisplay from './TimeDisplay';
import { useState } from 'react';
import { useChat } from '@/hooks/useChat';

const ChatInput = ({ contact }) => {
  const { selectedChat } = useChatStore();
  const { sendMessage, createConversation } = useChat();
  const [message, setMessage] = useState('');

  const handleSendMessage = async () => {
    try {
      if (!selectedChat) {
        await createConversation();
      }

      await sendMessage(message);
      setMessage('');
    } catch (error) {
      console.error(error);
    }
  };

  console.log(selectedChat);

  return (
    <div className="flex flex-col justify-end h-full">
      <div className="p-4">
        {!selectedChat?.messages?.length > 0 && (
          <div className="flex flex-col justify-center items-center mb-4 gap-2">
            {' '}
            <p className="text-[#727697] font-bold">
              {' '}
              <TimeDisplay />{' '}
            </p>
            <div className="bg-[#3c4043] text-[#9aa4ad]  p-2 rounded-sm">
              <p className="capitalize">
                Texting {contact?.firstName} {contact?.lastName}
              </p>
            </div>
          </div>
        )}
        <div className="flex items-center gap-2">
          <Input
            placeholder="Text Message"
            onChange={(e) => setMessage(e.target.value)}
            value={message}
            className="rounded-full h-12 border-none bg-[#3c4043] text-white placeholder:text-[#9aa4ad]"
          />
          <Button
            variant="outline"
            size="icon"
            onClick={handleSendMessage}
            className="bg-[#3c4043] border-none hover:bg-[#4b4f52] hover:text-white rounded-full transition-all duration-300 h-12 w-12"
          >
            <Send />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatInput;
