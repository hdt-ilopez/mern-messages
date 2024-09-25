import { useEffect, useRef, useState } from 'react';
import { messages } from '@/data'; // Initial messages data
import { useAppStore } from '@/store';
import { Button } from './ui/button';

const ChatComponent = () => {
  const { userInfo } = useAppStore();
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
  }, [isAtBottom]);

  // Initial scroll to bottom
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'auto' });
  }, []);

  return (
    <div className="max-h-[80vh] flex flex-col">
      <div
        className="flex-1 overflow-y-auto "
        ref={scrollableRef}
        onScroll={handleScroll}
      >
        {messages.map((message, index) => (
          <div
            key={index}
            className={`chat ${
              message.senderId === userInfo.id ? 'chat-end' : 'chat-start'
            } mb-2`}
          >
            <div className="chat-bubble">{message.content}</div>
          </div>
        ))}
        <div ref={bottomRef}></div>
      </div>
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
