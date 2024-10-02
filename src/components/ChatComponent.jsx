import { useEffect, useRef, useState } from 'react';
import { useAppStore, useChatStore } from '@/store';
import { Button } from './ui/button';
import { useChat } from '@/hooks/useChat';
import { useUpdateReadStatus } from '@/hooks/updateReadStatus';

const ChatComponent = () => {
  const { userInfo } = useAppStore();
  const { getMessages } = useChat();
  const { messages, selectedChat, setSelectedContact } = useChatStore();
  const { updateReadStatus } = useUpdateReadStatus();
  const [isAtBottom, setIsAtBottom] = useState(true); // Track if user is at bottom
  const [showScrollButton, setShowScrollButton] = useState(false); // Show "Scroll to Bottom" button
  const bottomRef = useRef(null);
  const scrollableRef = useRef(null);

  // Handle scroll events
  const handleScroll = () => {
    const scrollable = scrollableRef.current;
    if (!scrollable) return;
    const { scrollTop, scrollHeight, clientHeight } = scrollable;
    const isUserAtBottom = scrollHeight - scrollTop - clientHeight < 50;
    setIsAtBottom(isUserAtBottom);
    setShowScrollButton(!isUserAtBottom);
  };

  // Scroll to bottom when messages change, only if user is at bottom
  useEffect(() => {
    if (isAtBottom) {
      bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isAtBottom]);

  // Initial scroll to bottom
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'auto' });
  }, []);

  // Fetch messages when selectedChat changes
  useEffect(() => {
    if (selectedChat) {
      getMessages();
    }
  }, [selectedChat]);

  useEffect(() => {
    const latestMessage = messages[messages.length - 1];

    if (
      latestMessage &&
      latestMessage.receiverId === userInfo.id &&
      latestMessage.readStatus === false
    ) {
      updateReadStatus(latestMessage._id);
    }
  }, [messages, userInfo.id]);

  return (
    <div
      className="flex flex-col overflow-y-auto h-full max-h-[75vh] justify-end"
      ref={scrollableRef}
      onScroll={handleScroll}
    >
      {messages.length === 0 && (
        <div className="flex-grow flex items-center justify-center text-gray-500 h-24">
          No messages yet. Start the conversation!
        </div>
      )}
      {messages.map((message) => (
        <div
          key={message.id} // Assuming each message has a unique 'id'
          className={`chat mb-2 ${
            message.senderId === userInfo.id ? 'chat-end' : 'chat-start'
          }`}
        >
          <div
            className={`chat-bubble text-white ${
              message.senderId === userInfo.id ? 'bg-blue-500' : 'bg-green-600'
            }`}
          >
            {message.message}
          </div>
        </div>
      ))}
      <div ref={bottomRef} /> {/* Keeps scroll at the bottom */}
      {showScrollButton && (
        <Button
          className="fixed bottom-24 right-5 bg-purple-500 text-white px-4 py-2 rounded-full shadow-lg"
          onClick={() =>
            bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
          }
        >
          ↓ Scroll to Bottom
        </Button>
      )}
    </div>
  );
};

export default ChatComponent;
