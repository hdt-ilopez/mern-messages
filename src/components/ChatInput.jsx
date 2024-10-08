import { Button } from './ui/button';
import { Send } from 'lucide-react';
import { Input } from './ui/input';
import { useChatStore } from '@/store';
import TimeDisplay from './TimeDisplay';
import { useState } from 'react';
import { useChat } from '@/hooks/useChat';

const ChatInput = ({ contact }) => {
  const { sendMessage, createConversation, getConversations } = useChat();
  const { messages, selectedChat } = useChatStore();
  const [message, setMessage] = useState('');

  const handleSendMessage = async () => {
    try {
      let res;
      if (!selectedChat) {
        res = await createConversation(message);
      } else {
        res = await sendMessage(message);
      }

      console.log(res);

      if (res.status === 200 || res.status === 201) {
        getConversations();
        setMessage('');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="p-4">
        {(!selectedChat ||
          (selectedChat?.messages?.length === 0 &&
            (!messages || messages.length === 0))) && (
          <div className="flex flex-col justify-center items-center mb-4 gap-2">
            <p className="text-[#727697] font-bold">
              <TimeDisplay />
            </p>
            <div className="bg-[#3c4043] text-[#9aa4ad] p-2 rounded-sm">
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
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleSendMessage();
              }
            }}
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
    </>
  );
};

export default ChatInput;
