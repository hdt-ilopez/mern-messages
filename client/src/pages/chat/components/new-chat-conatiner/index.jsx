import ChatInput from '@/components/ChatInput';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { useChatStore } from '@/store';
import { ArrowLeft } from 'lucide-react';

const NewChatContainer = () => {
  const { setNewChat, contacts, selectedContact, setSelectedContact } =
    useChatStore();

  return (
    <div className="h-screen w-screen flex flex-col bg-[#1c1d25] transition-all duration-1000 p-4">
      {/* Header Section */}
      <div className="flex items-center gap-2 mb-4">
        <Button
          variant="outline"
          size="icon"
          className="bg-transparent border-none hover:bg-transparent hover:text-white/70 transition-all duration-300"
          onClick={() => setNewChat(false)}
        >
          <ArrowLeft size={30} />
        </Button>
        <h2 className="uppercase font-bold text-3xl text-[#727697]">
          New Chat
        </h2>
      </div>

      {/* Input Section */}
      <div className="flex gap-2 items-center pl-2 mb-4">
        <p className="text-lg">To: </p>
        <Input
          placeholder="Type a username to start a chat"
          className="border-none focus-visible:ring-transparent"
        />
      </div>
      <Separator />

      {/* Contacts List or Chat Content */}
      <div className="flex-1 overflow-y-auto">
        {selectedContact ? (
          <div className="flex flex-col gap-4 mt-4">
            {contacts.map((contact) => (
              <div
                key={contact._id}
                className="flex items-center gap-2 p-2 bg-[#2f303b] rounded-md cursor-pointer hover:bg-[#3a3b45] transition-all"
                onClick={() => setSelectedContact(contact)}
              >
                {contact.userName}
              </div>
            ))}
          </div>
        ) : (
          <ChatInput />
        )}
      </div>
    </div>
  );
};

export default NewChatContainer;
