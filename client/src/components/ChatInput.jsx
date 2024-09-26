import { Button } from './ui/button';
import { Send } from 'lucide-react';
import { Input } from './ui/input';
import { useChatStore } from '@/store';

const ChatInput = ({ selectedContact }) => {
  const { selectedChat } = useChatStore();

  return (
    <div className="flex flex-col justify-end h-full">
      <div className="p-4">
        {!selectedChat?.messages?.length > 0 && (
          <div className="flex flex-col justify-center items-center mb-4 gap-2">
            {' '}
            <p className="text-[#727697] font-bold">8:47 AM</p>
            <div className="bg-[#3c4043] text-[#9aa4ad]  p-2 rounded-sm">
              <p className="capitalize">Texting {selectedContact?.userName}</p>
            </div>
          </div>
        )}
        <div className="flex items-center gap-2">
          <Input
            placeholder="Text Message"
            className="rounded-full h-12 border-none bg-[#3c4043] text-white placeholder:text-[#9aa4ad]"
          />
          <Button
            variant="outline"
            size="icon"
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
